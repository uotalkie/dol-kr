Weather.WeatherGeneration = (() => {
	function isWeather(weatherType) {
		return weatherType.toLowerCase() === getWeather().name.toLowerCase();
	}

	function getWeather(date) {
		if (date) {
			// Do not modify weather obj if searching for another date than the current
			return interpolateWeather(date);
		}
		if (T.currentWeather === undefined) {
			date = new DateTime(Time.date);
			generateWeather(date);
			T.currentWeather = interpolateWeather(date);
		}
		return T.currentWeather;
	}

	// Sets weather to specified type for at least 1 hour.
	// After that, it will begin to transition into the normal weather types again.
	function setWeather(weatherType, instant = false, minutes = 60) {
		if (minutes <= 0) minutes = 1;
		const weatherTypeIndex = Weather.genSettings.weatherTypes.findIndex(wt => wt.name.toLowerCase() === weatherType.toLowerCase());
		if (weatherTypeIndex === -1 || V.weatherObj.keypointsArr.length < 1) {
			console.warn(`Could not set weather. ${weatherType} doesn't exist.`);
			return;
		}
		delete T.currentWeather;
		delete T.currentTemperature;

		const currentTimeStamp = Time.date.timeStamp;
		const nextTimeStamp = currentTimeStamp + minutes * TimeConstants.secondsPerMinute;
		// One hour of leeway, in case the next key point is close after the new one
		const leeway = TimeConstants.secondsPerHour;

		// Remove key points that are within the new key point timestamps
		while (V.weatherObj.keypointsArr.length > 0 && V.weatherObj.keypointsArr[0].timestamp <= nextTimeStamp + leeway) {
			V.weatherObj.keypointsArr.splice(0, 1);
		}

		V.weatherObj.keypointsArr.unshift({ timestamp: nextTimeStamp, value: weatherTypeIndex });
		V.weatherObj.keypointsArr.unshift({ timestamp: currentTimeStamp, value: weatherTypeIndex });

		getWeather();

		if (instant && Weather.sky.loaded.value) {
			Weather.sky.layers.get("clouds").effects[0].reset();
			Weather.sky.updateFade(true);
		}

		Weather.Observables.checkForUpdate();
	}

	function interpolateWeather(date) {
		const currentTimeStamp = date.timeStamp;

		let currentKeyPoint = null;
		let nextKeyPoint = null;

		// Get the current and next weather key points
		for (const keyPoint of V.weatherObj.keypointsArr) {
			if (keyPoint.timestamp <= currentTimeStamp) {
				currentKeyPoint = keyPoint;
			}
			if (keyPoint.timestamp > currentTimeStamp && !nextKeyPoint) {
				nextKeyPoint = keyPoint;
			}
		}

		// Failsafe if no next key point is found for the day, assume weather stays the same
		if (!nextKeyPoint && currentKeyPoint) {
			return currentKeyPoint.value;
		}

		currentKeyPoint = currentKeyPoint ?? { timestamp: currentTimeStamp, value: nextKeyPoint.value };

		const current = Weather.genSettings.weatherTypes[currentKeyPoint.value];
		const next = Weather.genSettings.weatherTypes[nextKeyPoint.value];

		// Calculate the fraction of time passed between the current and next key points
		const fraction = (currentTimeStamp - currentKeyPoint.timestamp) / (nextKeyPoint.timestamp - currentKeyPoint.timestamp);

		// Interpolate the weather value
		const interpolatedValue = Math.round(current.value + (next.value - current.value) * fraction);

		if (V.weatherObj?.name !== null) {
			const currentWeatherType = Weather.genSettings.weatherTypes.find(type => type.name === V.weatherObj.name);
			if (currentWeatherType.value === interpolatedValue) {
				return createObjectByType(currentWeatherType);
			}
		}

		if (current.value === interpolatedValue) {
			const newObj = createObjectByType(current);
			V.weatherObj.name = newObj.name;
			const targetOvercast = resolveValue(Weather.genSettings.weatherTypes.find(type => type.name === Weather.name).overcast);
			V.weatherObj.targetOvercast = targetOvercast * (Weather.bloodMoon ? setup.SkySettings.fade.overcast.bloodMoonMaxValue : 1);
			return newObj;
		}

		return findClosestWeatherType(interpolatedValue);
	}

	function findClosestWeatherType(interpolatedValue) {
		const closestTypes = Weather.genSettings.weatherTypes.reduce(
			(acc, type) => {
				const difference = Math.abs(type.value - interpolatedValue);
				if (difference < acc.minDifference) {
					return { minDifference: difference, types: [type] };
				}
				if (difference === acc.minDifference) {
					acc.types.push(type);
				}
				return acc;
			},
			{ minDifference: Number.MAX_VALUE, types: [] }
		).types;

		// Randomly choose one type if there are multiple options with the same int value
		const chosenType = closestTypes[random(0, closestTypes.length - 1)];
		const newObj = createObjectByType(chosenType);

		V.weatherObj.name = chosenType.name;
		const targetOvercast = resolveValue(Weather.genSettings.weatherTypes.find(type => type.name === Weather.name).overcast);
		V.weatherObj.targetOvercast = targetOvercast * (Weather.bloodMoon ? setup.SkySettings.fade.overcast.bloodMoonMaxValue : 1);
		return newObj;
	}

	function createObjectByType(obj) {
		return {
			defines: obj,
			name: obj.name,
			tanningModifier: obj.tanningModifier,
			precipitationIntensity: obj.precipitationIntensity,
		};
	}

	function generateWeather(currentDate) {
		const daysToGenerate = Math.max(Weather.genSettings.forecast.weather.daysToGenerate, 1);

		if (V.weatherObj.keypointsArr.length > 0) {
			const firstKeyPoint = new DateTime(V.weatherObj.keypointsArr[0].timestamp);
			const firstKeyPointDifference = (firstKeyPoint.timeStamp - currentDate.timeStamp) / TimeConstants.secondsPerDay;

			// Regenerate all keys if the first keypoint is too far in the future
			if (firstKeyPointDifference > daysToGenerate) {
				V.weatherObj.keypointsArr = [];
			}
		}

		// If there are no keypoints, generate them
		if (V.weatherObj.keypointsArr.length === 0) {
			generateWeatherKeypoints(currentDate, daysToGenerate);
			return;
		}

		// Check if additional keypoints need to be generated
		const lastKeypoint = V.weatherObj.keypointsArr[V.weatherObj.keypointsArr.length - 1];
		const lastDate = new DateTime(lastKeypoint.timestamp);
		const dayDifference = (new DateTime(currentDate).addDays(daysToGenerate).timeStamp - lastDate.timeStamp) / TimeConstants.secondsPerDay;

		// Generate new keypoints if the time difference is significant
		if (dayDifference > 0) {
			generateWeatherKeypoints(lastDate.addDays(1), dayDifference);
		}

		// Trim old keypoints that are past the current date
		while (V.weatherObj.keypointsArr.length > 1 && V.weatherObj.keypointsArr[1].timestamp <= currentDate.timeStamp) {
			V.weatherObj.keypointsArr.shift();
		}
	}

	function generateWeatherKeypoints(startDate, daysToGenerate) {
		const timeApart = Math.clamp(Weather.genSettings.forecast.weather.minTimeApartKeyPoints, 0, 1400);
		const maxKeyPointsPerDay = Math.clamp(Weather.genSettings.forecast.weather.maxKeyPointsPerDay, 1, Math.floor((24 * 60) / timeApart));
		const minKeyPointsPerDay = Math.clamp(Weather.genSettings.forecast.weather.minKeyPointsPerDay, 1, maxKeyPointsPerDay);

		// Iterate over each day to add weather keypoints
		for (let dayCount = 0; dayCount < daysToGenerate; dayCount++) {
			const date = new DateTime(startDate).addDays(dayCount);

			// Only add exceptions for current day
			const exceptions = setup.WeatherExceptions.filter(exception => {
				const exceptionDate = exception.date;
				if (!exceptionDate || typeof exceptionDate !== "function") {
					throw new Error("Could not read date from setup.WeatherExceptions");
				}
				return exceptionDate().dayDifference(date) === 0;
			});

			const numKeyPoints = random(Math.max(minKeyPointsPerDay - exceptions.length, 0), Math.max(maxKeyPointsPerDay - exceptions.length, 0));
			const dayKeypoints = [];

			// Add two keypoints. One for start and one for after the duration
			exceptions.forEach(exception => {
				const start = exception.date();
				const end = new DateTime(start).addHours(exception.duration);
				const weatherTypeIndex = Weather.genSettings.weatherTypes.findIndex(wt => wt.name === exception.weatherType);

				dayKeypoints.push({ timestamp: start.timeStamp, value: weatherTypeIndex });
				dayKeypoints.push({ timestamp: end.timeStamp, value: weatherTypeIndex });
			});

			// Generate random keypoints, ensuring they do not overlap with exceptions
			for (let i = 0; i < numKeyPoints; i++) {
				let isValid = false;
				let timestamp, time;

				while (!isValid) {
					const timeWindow = 24 * 60 - timeApart;
					time = random(timeApart, timeWindow);
					timestamp = new DateTime(date.year, date.month, date.day, Math.floor(time / 60), time % 60).timeStamp;

					isValid = !dayKeypoints.some(rt => rt.timestamp <= timestamp && timestamp <= rt.timestamp);
				}

				if (isValid) {
					const value = getRandomWeatherValue();
					dayKeypoints.push({ timestamp, value });
				}
			}

			// Sort it in case of keypoints being generated out of order
			dayKeypoints.sort((a, b) => a.timestamp - b.timestamp);
			V.weatherObj.keypointsArr.push(...dayKeypoints);
		}
	}

	function getRandomWeatherValue() {
		const currentSeason = Time.season;
		const options = Weather.genSettings.weatherTypes.map((weatherType, index) => {
			const weight = weatherType.probability?.[currentSeason] ?? 0;
			return [index, weight];
		});

		return weightedRandom(...options);
	}

	return Object.create({
		get keysObject() {
			const arr = V.weatherObj.keypointsArr;
			return arr.map(item => {
				const date = new DateTime(item.timestamp);
				const weatherName = Weather.genSettings.weatherTypes[item.value].name;
				return {
					type: weatherName,
					date: `${date.day}/${date.month} ${ampm(date.hour, date.minute)}`,
					value: item.value,
				};
			});
		},
		getWeather,
		setWeather,
		isWeather,
		generate: generateWeather,
	});
})();
