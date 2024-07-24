/* eslint-disable no-unmodified-loop-condition */

Weather.Temperature = (() => {
	// Sets current temperate (at start of day) to this temperature
	// However, the actual temperature might vary, since it interpolates to the next day's temperature during the day
	// After this is set it will still interpolate to the next temperature, which shifts midnight
	// To keep a certain temperature for a longer duration without too much interpolation - set the temperature for the day after too by using the optional date parameter.
	function set(temperature, date) {
		date = new DateTime(date ?? Time.date);
		if (V.weatherObj.monthlyTemperatures.length < 1) return;
		const modifiers = calculateModifiers(temperature, date);
		V.weatherObj.monthlyTemperatures[0].t[date.day - 1] = temperature - modifiers;
		const baseTemperature = interpolateDailyTemperature(date);
		T.baseTemperature = round(baseTemperature, 2);
	}

	/**
	 * Adds a specified temperature to the current temperature for the date or the current date if none is provided.
	 *
	 * @param {number} temperature
	 * @param {DateTime} date
	 */
	function add(temperature, date) {
		date = new DateTime(date ?? Time.date);
		if (V.weatherObj.monthlyTemperatures.length < 1) return;
		V.weatherObj.monthlyTemperatures[0].t[date.day - 1] += temperature;
		const baseTemperature = interpolateDailyTemperature(date);
		T.baseTemperature = round(baseTemperature, 2);
	}

	/**
	 * Converts Celsius to Fahrenheit.
	 *
	 * @param {number} temperature
	 */
	function toFahrenheit(temperature) {
		return round((temperature * 9) / 5 + 32, 2);
	}

	/**
	 * Converts Celsius to Fahrenheit.
	 *
	 * @param {number} temperature
	 */
	function toCelsius(temperature) {
		return round(((temperature - 32) * 5) / 9, 2);
	}

	/**
	 * Checks if the current outside temperature is below freezing.
	 */
	function isFreezing() {
		return getCelsius() < 0;
	}

	/**
	 * Retrieves the base temperature for a specified date (or the current date if none is provided).
	 *
	 * @param {DateTime} date
	 */
	function getBaseTemperature(date) {
		if (T.baseTemperature === undefined) {
			// Will only generate if the array doesn't already exist, or if the month doesn't match
			generateMonthlyTemperatures();
			const baseTemperature = interpolateDailyTemperature(date);
			T.baseTemperature = round(baseTemperature, 2);
		}
		return T.baseTemperature;
	}

	/*
		Returns the current outside temperature.
	*/
	function getCelsius() {
		// Use override if set
		if (T.temperatureOverride?.outside) return T.temperatureOverride.outside;
		// Generate new keys if it's not set already
		if (T.currentTemperature === undefined) {
			const date = new DateTime(Time.date);
			const baseTemperature = getBaseTemperature(date);
			const modifiers = calculateModifiers(baseTemperature, date);
			T.currentTemperature = round(baseTemperature + modifiers, 2);
		}
		return T.currentTemperature;
	}

	/*
		The water temperature uses the base temperature, without modifiers
		The exponential function will cause the water temperature to always try to be above lowerLimit,
		and below upperLimit - and flatten the curve when it's close to the limits.
		
	*/
	function getWaterTemperature() {
		// Can override water - in that case, use that value
		if (T.temperatureOverride?.water) return T.temperatureOverride.water;

		// Location overrides - until location rework
		switch (V.location) {
			case "pool":
				return 28;
			case "cabin": // Eden's cabin pool
				return 37;
			case "hotel": // Avery date
				return 37;
		}

		const date = new DateTime(Time.date);
		const baseTemperature = getBaseTemperature(date);
		const lowerLimit = -1;
		const upperLimit = 28;
		const midPoint = 10;
		const k = 0.15; // Curve smoothness

		const temperatureDifference = baseTemperature - midPoint;
		const adjustment = k * temperatureDifference;

		// Exponential function
		const waterTemperature = lowerLimit + (upperLimit - lowerLimit) / (1 + Math.exp(-adjustment));
		return round(waterTemperature, 2);
	}

	/*
		Modifies the inside-temperature slightly depending on the outside temperature.
		It uses a logarithmic function to simulate heating / AC being turned on when the temperature varies enough.
		Lowering the modifierFactor makes the deviation from the target temperature less pronounced. (lower deviation from target)
	*/
	function getInsideTemperature() {
		// Use override if set
		if (T.temperatureOverride?.inside) return T.temperatureOverride.inside;
		const date = new DateTime(Time.date);
		const baseTemperature = getBaseTemperature(date);
		const targetTemperature = 23;
		const modifierFactor = 0.4;

		// Location modifiers placeholder
		let locationModifier = 0;
		switch (V.location) {
			case "pool":
				locationModifier = 7;
		}

		// Logarithmic function for more effect at extremes (low and high temperatures)
		const deviation = Math.abs(baseTemperature - targetTemperature);
		const modifier = Math.pow(Math.log1p(deviation), 2) * Math.sign(baseTemperature - targetTemperature) * modifierFactor;

		return round(targetTemperature + modifier + locationModifier, 2);
	}

	/*
		Interpolates the temperature across the day between two temperature points.
	*/
	function interpolateDailyTemperature(date) {
		// Check for monthly data mismatch
		if (!V.weatherObj.monthlyTemperatures.some(monthObj => monthObj.m === date.month)) {
			console.error("Warning: Cannot interpolate between dates outside the current monthlyTemperature array.");
			return V.weatherObj.monthlyTemperatures[0].t[0];
		}
		// Calculate the temperature for tomorrow, adjusting for month boundaries
		const tomorrowDate = new DateTime(date).addDays(1);
		const tomorrowKey = date.month !== tomorrowDate.month ? 1 : 0;

		const todayTemp = V.weatherObj.monthlyTemperatures[0].t[date.day - 1];
		const tomorrowTemp = V.weatherObj.monthlyTemperatures[tomorrowKey].t[tomorrowDate.day - 1] || todayTemp;

		// Apply linear interpolation
		const deltaTemp = tomorrowTemp - todayTemp;
		return todayTemp + deltaTemp * date.fractionOfDay;
	}

	/*
		Calculates additional temperature modifiers based on sun, season, current weather conditions, and location.
	*/
	function calculateModifiers(baseTemperature, date) {
		const precipitationModifier = calculatePrecipitationModifier(baseTemperature);
		const dayModifier = calculateDayModifier(date) * setup.WeatherTemperature.dayMultiplier;
		const locationModifier = getLocationModifier();
		return round(precipitationModifier + dayModifier + locationModifier, 2);
	}

	function calculatePrecipitationModifier(baseTemperature) {
		if (baseTemperature <= 0) return 0;
		return Weather.type.precipitationIntensity * setup.WeatherTemperature.precipitationEffect;
	}

	function calculateDayModifier(date) {
		const factor = Weather.sky?.orbitals?.sun.getFactor(date) ?? 0;
		return factor * getWeatherModifier();
	}

	function getWeatherModifier() {
		const maxVariation = setup.WeatherTemperature.maxDiurnalVariation * 0.5;
		const minVariation = setup.WeatherTemperature.minDiurnalVariation * 0.5;
		return interpolate(minVariation, maxVariation, 1 - Weather.overcast);
	}

	function getLocationModifier() {
		// Location modifiers placeholder
		// Placeholder
		const townLocations = [
			"alley",
			"brothel",
			"canal",
			"compound",
			"dance_studio",
			"dilapitaded_shop",
			"estate",
			"factory",
			"home",
			"hospital",
			"kylar_manor",
			"landfill",
			"market",
			"museum",
			"office",
			"park",
			"police_station",
			"pool",
			"pub",
			"school",
			"sewers",
			"shopping_centre",
			"spa",
			"studio",
			"strip_club",
			"temple",
			"town",
		];
		// +3 in town
		if (townLocations.includes(V.location)) {
			return 3;
		}
		return 0;
	}

	/*
		Generate new temperature key points for the month.
		It is hardcoded to always generate 2 months, in order to take into account the month transitions.
	*/
	function generateMonthlyTemperatures() {
		const date = Time.date;
		if (V.weatherObj.monthlyTemperatures.length === 2 && V.weatherObj.monthlyTemperatures[0].m === date.month) return;
		// Remove past months and adjust array for the current time
		while (V.weatherObj.monthlyTemperatures.length > 0 && V.weatherObj.monthlyTemperatures[0].m !== date.month) {
			V.weatherObj.monthlyTemperatures.shift();
		}

		// Ensure current and next month data are present
		while (V.weatherObj.monthlyTemperatures.length < 2) {
			let monthDate = new DateTime(date);
			// Move to the next month if the current is already handled
			if (V.weatherObj.monthlyTemperatures.length > 0) {
				monthDate = monthDate.addMonths(1);
			}
			V.weatherObj.monthlyTemperatures.push(generateDailyTemperatures(monthDate));
		}
	}

	/*
		Generate an array of daily temperatures for a given month based on key points.
	*/
	function generateDailyTemperatures(date) {
		const keyPointsMap = generateTemperatureKeyPoints(date);

		let lastTemp;
		if (V.weatherObj.monthlyTemperatures.length > 0) {
			// If there's existing data, get the last temperature from the previous month
			const prevMonthData = V.weatherObj.monthlyTemperatures[V.weatherObj.monthlyTemperatures.length - 1];
			lastTemp = prevMonthData.t[prevMonthData.t.length - 1];
		} else {
			// Use the last value from the key points map if there's no prior data
			lastTemp = Array.from(keyPointsMap.values()).pop();
		}
		const monthlyTemperatures = [];
		let lastDay = 0;
		for (const [day, temp] of keyPointsMap) {
			// Interpolate temperatures between this and the last recorded key point
			const interpolatedTemps = interpolateBetweenTemperatureKeys(lastDay, day, lastTemp, temp);
			// Fill in the daily temperatures between the last and current key point
			for (let d = lastDay; d < day; d++) {
				monthlyTemperatures[d] = round(interpolatedTemps[d], 2);
			}
			lastDay = day;
			lastTemp = temp;
		}
		return { m: date.month, t: monthlyTemperatures };
	}

	/*
		Generate temperature key points within a month.
	*/
	function generateTemperatureKeyPoints(date) {
		const timeApart = Math.clamp(Weather.genSettings.forecast.temperature.minTimeApartKeyPoints, 0, 27);
		const maxDays = Math.clamp(Weather.genSettings.forecast.temperature.maxKeyPointsPerMonth, 1, Math.floor(28 / timeApart));
		const minDays = Math.clamp(Weather.genSettings.forecast.temperature.minKeyPointsPerMonth, 1, maxDays);
		const maxExtremes = Weather.genSettings.forecast.temperature.extremeMaxKeyPointsPerMonth;

		const temperatureRange = Weather.genSettings.months[date.month - 1].temperatureRange;
		const daysInMonth = DateTime.getDaysOfMonthFromYear(date.year)[date.month - 1];
		const numberOfKeyPoints = random(minDays - 1, maxDays - 1);
		const keyPoints = new Map();
		let extremeKeyPoints = calculateBinomial(Weather.genSettings.months[date.month - 1].extremeChance, maxExtremes);

		// Calculate the chances for direction based on temperature range
		const lowerDiff = temperatureRange.average[0] - temperatureRange.extreme[0];
		const upperDiff = temperatureRange.extreme[1] - temperatureRange.average[1];
		const chanceBelow = lowerDiff / (lowerDiff + upperDiff);
		const extremeDirection = State.random() < chanceBelow ? -1 : 1;

		// Add exceptions to the key points
		setup.WeatherExceptions.filter(exception => {
			const exceptionDate = exception.date();
			return exception.temperature && exceptionDate.year === date.year && exceptionDate.month === date.month;
		}).forEach(exception => {
			const temperature = boundedRandom(exception.temperature, 1);
			keyPoints.set(exception.date().day - 1, temperature);
		});

		while (keyPoints.size < numberOfKeyPoints) {
			// Generate random days within the month ensuring they are spaced according to the configured minimum time apart
			const randomDay = random(timeApart, daysInMonth - timeApart);

			// Ensure new day is sufficiently far from existing key points (and not an exception)
			if (Array.from(keyPoints.keys()).every(kp => Math.abs(kp - randomDay) >= timeApart)) {
				// Add extreme keypoints
				if (extremeKeyPoints) {
					extremeKeyPoints--;

					let extremeTemp;
					// Only add ranges outside of normal temperature
					do {
						extremeTemp = getRandomTemperature(temperatureRange.extreme);
					} while (
						(extremeDirection <= 0 && extremeTemp >= temperatureRange.average[0]) ||
						(extremeDirection >= 0 && extremeTemp <= temperatureRange.average[1])
					);
					keyPoints.set(randomDay, extremeTemp);
					continue;
				}
				keyPoints.set(randomDay, getRandomTemperature(temperatureRange.average));
			}
		}
		// Add the last key point at the end of the month, if it does not exist
		if (!keyPoints.has(daysInMonth)) {
			keyPoints.set(daysInMonth, getRandomTemperature(temperatureRange.average));
		}
		// Order it by date
		return new Map([...keyPoints.entries()].sort((a, b) => a[0] - b[0]));
	}

	function getRandomTemperature([minTemp, maxTemp]) {
		return randomFloat(minTemp, maxTemp);
	}

	/*
		Interpolates between two temperature keys
	*/
	function interpolateBetweenTemperatureKeys(startPoint, endPoint, startTemp, endTemp) {
		const temperatures = {};
		const deltaTemp = endTemp - startTemp;
		const deltaPoint = endPoint - startPoint;

		// Linear interpolation
		for (let point = startPoint; point <= endPoint; point++) {
			const t = (point - startPoint) / deltaPoint;
			temperatures[point] = startTemp + t * deltaTemp;
		}

		return temperatures;
	}

	return Object.create({
		isFreezing,
		getBaseTemperature,
		getCelsius,
		getInsideTemperature,
		getWaterTemperature,
		toFahrenheit,
		toCelsius,
		set,
		add,
		override: {
			increase: {
				inside(value, tooltip) {
					T.temperatureOverride = {
						inside: (T.temperatureOverride?.inside ?? Weather.insideTemperature) + value,
						insideTooltip: tooltip ? `<span class="orange">${tooltip}</span>` : "",
					};
				},
				outside(value, tooltip) {
					T.temperatureOverride = {
						outside: (T.temperatureOverride?.outside ?? Weather.temperature) + value,
						outsideTooltip: tooltip ? `<span class="orange">${tooltip}</span>` : "",
					};
				},
				water(value, tooltip) {
					T.temperatureOverride = {
						water: (T.temperatureOverride?.water ?? Weather.waterTemperature) + value,
						waterTooltip: tooltip ? `<span class="orange">${tooltip}</span>` : "",
					};
				},
			},
			decrease: {
				inside(value, tooltip) {
					T.temperatureOverride = {
						inside: (T.temperatureOverride?.inside ?? Weather.insideTemperature) - value,
						insideTooltip: tooltip ? `<span class="teal">${tooltip}</span>` : "",
					};
				},
				outside(value, tooltip) {
					T.temperatureOverride = {
						outside: (T.temperatureOverride?.outside ?? Weather.temperature) - value,
						outsideTooltip: tooltip ? `<span class="teal">${tooltip}</span>` : "",
					};
				},
				water(value, tooltip) {
					T.temperatureOverride = {
						water: (T.temperatureOverride?.water ?? Weather.waterTemperature) - value,
						waterTooltip: tooltip ? `<span class="teal">${tooltip}</span>` : "",
					};
				},
			},
			get outside() {
				return T.temperatureOverride?.outside;
			},
			set outside(value) {
				T.temperatureOverride = { outside: value };
			},
			get inside() {
				return T.temperatureOverride?.inside;
			},
			set inside(value) {
				T.temperatureOverride = { inside: value };
			},
			get water() {
				return T.temperatureOverride?.water;
			},
			set water(value) {
				T.temperatureOverride = { water: value };
			},
		},
		isExtreme() {
			return (
				Weather.genSettings.months[Time.month - 1].temperatureRange.average[0] > Weather.temperature ||
				Weather.genSettings.months[Time.month - 1].temperatureRange.average[1] < Weather.temperature
			);
		},
	});
})();
