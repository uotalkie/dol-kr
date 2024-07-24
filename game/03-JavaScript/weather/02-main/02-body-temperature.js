/**
 * Manages the body temperature of the player in the game.
 * Simulates the body's regulation of heat generation to maintain the base body temperature
 *
 * Heat dissipation and generation are affected by:
 * - Heat dissipation:
 *   - Air temperature: Increases as the difference between body and air temperature widens.
 *   - Clothing: Reduces dissipation based on insulation factor.
 *   - Wetness: Increases heat dissipation
 * - Heat generation:
 *   - Base value: The body's base heat generation, adjusting according to the difference from the base body temperature.
 *   - Activity: Increases with physical activity. Typically 0.2, but varies with sleep or exercise.
 *
 * Effects from low temperatures:
 *   - Lowered arousal gains
 *   - Higher pain gains
 *   - Stress increase every minute
 *
 * Effects from high temperatures:
 *   - Higher fatigue gains
 *   - Slight stress increase every minute
 *
 * Limitations:
 * - The current implementation of heat generation from exercise is only based on the duration of the exercise.
 *   It does not account for the intensity of the activity beyond the addition of physique and athletics.
 *   To represent different levels of activity intensity, a future rework may be needed for these stats.
 * - The heat generation from activity assumes the time passed post-exercise.
 *   If only 1 minute is passed, it is assumed that there is only 1 minute of exercise, as it resets after time has passed.
 *   The different activity states are:
 *     - Sleep: 0 (no heat generation)
 *     - Normal activity: 0.2 (slight heat generation)
 *     - Exercise (either physique or athletics): 0.5
 *     - Heavy exercise (both physique and athletics): 0.7
 */

Weather.BodyTemperature = (() => {
	const settings = Weather.tempSettings;
	/**
	 * Calculates the level of activity based on the current state of the body.
	 * Determines the heat generation rate by considering activities like sleeping, exercising, and normal activity.
	 *
	 * @returns {number} The current activity level, influencing heat generation.
	 */
	function activityLevel() {
		if (T.bodyActivity?.sleep) return 0;
		if (T.bodyActivity?.athletics && T.bodyActivity?.physique) return 0.7;
		if (T.bodyActivity?.athletics || T.bodyActivity?.physique) return 0.5;
		return 0.2;
	}

	/**
	 * Adds an activity to the body's current state.
	 *
	 * @param {string} activity The activity to be added (e.g., 'athletics', 'physique', 'sleep').
	 */
	function addActivity(activity) {
		if (T.bodyActivity === undefined) resetActivity();
		if (activity in T.bodyActivity) {
			T.bodyActivity[activity] = 1;
		} else {
			console.error(`addActivity(): ${activity} doesn't exist.`);
		}
	}

	/**
	 * Resets the activity states to default values.
	 */
	function resetActivity() {
		T.bodyActivity = {
			athletics: 0,
			physique: 0,
			sleep: 0,
		};
	}

	/**
	 * Updates the body temperature based on air temperature and time elapsed.
	 * Called from time.js
	 *
	 * @param {number} temperature The current air temperature.
	 * @param {number} minutes The time elapsed in minutes.
	 */
	function update(temperature, minutes) {
		if (T.bodyActivity === undefined) resetActivity();

		if (T.inWater && V.outside) {
			temperature = Weather.waterTemperature;
		}

		const scaledMinutes = Math.min(minutes, 60 + Math.sqrt(Math.max(minutes - 60, 0)));
		this.set(calculateTemperatureChange(Weather.BodyTemperature.get(), temperature, scaledMinutes, getTotalWarmth()));
		resetActivity();

		if (Weather.BodyTemperature.get() < Weather.tempSettings.minTemperature) {
			V.passout = "cold";
		} else if (Weather.BodyTemperature.get() > Weather.tempSettings.maxTemperature) {
			V.passout = "heat";
		} else {
			delete V.passout;
		}
	}

	function getRestingPoint(iterations = 6, warmth = undefined, bodyTemperature, outside) {
		let ambientTemperature = outside || V.outside ? Weather.temperature : Weather.insideTemperature;

		if (T.inWater) {
			ambientTemperature = Weather.waterTemperature;
		}
		let temp = bodyTemperature ?? Weather.BodyTemperature.get();

		for (let i = 0; i < iterations; i++) {
			temp = calculateTemperatureChange(temp, ambientTemperature, 15, warmth);
		}

		return temp;
	}

	function calculateTemperatureChange(currentTemperature, airTemperature, minutes, warmth) {
		const generation = calculateHeatGeneration(currentTemperature, airTemperature);
		const dissipation = calculateHeatDissipation(airTemperature, warmth);
		const newTemperature = currentTemperature + (generation - dissipation) * minutes;
		const baseDifference = newTemperature - settings.baseBodyTemperature;
		// Nudge the temperature slowly towards the base temperature
		return newTemperature + baseDifference * -settings.tempApproachRate * minutes;
	}

	/**
	 * Pending a wetness refactor (evaporation depending on temperature?)
	 * Goal is to replace $upperwet, etc. with clothing having its own wetness
	 * Currently uses a simplified model
	 * Max wetness is 80% outside of water
	 */
	function calculateWetness() {
		if (T.inWater) return 1; // 100% wet if in water
		if (V.outside && Weather.precipitation === "rain" && T.bottomless && T.topless) return 0.7;
		const upper = (Math.max(V.overupperwet ?? 0, V.upperwet ?? 0, V.underupperwet ?? 0) / settings.maxWetness) * (settings.maxClothingFactor / 2);
		const lower = (Math.max(V.overlowerwet ?? 0, V.lowerwet ?? 0, V.underlowerwet ?? 0) / settings.maxWetness) * (settings.maxClothingFactor / 2);
		return Math.min(upper + lower, settings.maxClothingFactor);
	}

	/**
	 * Calculates the adjusted dissipation factor based on the difference between body and air temperatures.
	 * Assumes that insulation becomes more effective as the temperature difference increases.
	 * The closer the air temperature is to the body temperature - the less effective clothes are:
	 * This is to not penalise the player too much from wearing a lot of clothes, especially in room temperature
	 *
	 * @param {number} outsideTemperature The current air temperature.
	 * @param temperature
	 * @param warmth
	 * @returns {number} The adjusted insulation factor.
	 */
	function calculateHeatDissipation(temperature, warmth) {
		const temperatureDifference = Math.max(0, Weather.BodyTemperature.get() - temperature);

		// Base dissipation
		const dissipation = temperatureDifference * settings.dissipationRate;
		const totalDissipation = settings.baseDissipation + dissipation;

		// Insulation reduces dissipation
		const insulationModifier = Math.exp((-(warmth ?? getTotalWarmth()) * settings.insulationMultiplier) / settings.insulationCap);

		// Wetness increases dissipation - but not if inside warm water
		const wetnessMultiplier = T.inWater && Weather.waterTemperature >= settings.baseBodyTemperature ? 1 : 1 + calculateWetness() * settings.wetnessFactor;

		// Adjust dissipation based on insulation and temperature difference.
		return totalDissipation * insulationModifier * wetnessMultiplier;
	}

	/**
	 * Calculates heat generation based on the current activity level and difference from the base body temperature.
	 * Increases heat generation if body temperature is below base and decreases if above.
	 *
	 * @param bodyTemperature
	 * @param outsideTemperature
	 */
	function calculateHeatGeneration(bodyTemperature, outsideTemperature) {
		outsideTemperature += settings.sunIntensityBaseModifier * Weather.sunIntensity;
		const outsideTemperatureDifference = Math.max(0, outsideTemperature - Weather.BodyTemperature.get());

		const baseGeneration = settings.baseHeatGeneration + outsideTemperatureDifference * (getTotalWarmth() * settings.warmthHeatModifier);
		// Sun intensity increases heat
		const activityHeatGeneration = settings.activityRate * activityLevel();
		const bodyTemperatureDifference = bodyTemperature - settings.baseBodyTemperature;
		return baseGeneration + activityHeatGeneration - 0.01 * bodyTemperatureDifference;
	}

	function temperatureFactor() {
		if (Weather.BodyTemperature.get() <= settings.effects.lowerThresholdStart) {
			return 1 - normalise(Weather.BodyTemperature.get(), settings.effects.lowerThresholdStart, settings.effects.lowerThresholdEnd);
		}

		if (Weather.BodyTemperature.get() >= settings.effects.upperThresholdStart) {
			return normalise(Weather.BodyTemperature.get(), settings.effects.upperThresholdEnd, settings.effects.upperThresholdStart);
		}
		return 0;
	}

	function baseInsulation() {
		// Add modifiers here, based on TFs?
		return settings.baseInsulation;
	}

	function getWarmth() {
		return (
			baseInsulation() +
			Object.values(V.worn).reduce((acc, item) => {
				return acc + (item.warmth || 0);
			}, 0)
		);
	}

	function getTotalWarmth() {
		// Total warmth is warmth, but with added modifiers (like from traits)
		return getWarmth();
	}

	return Object.create({
		get() {
			if (isNaN(V.player.bodyTemperature)) return 37;
			return V.player.bodyTemperature;
		},
		set(value) {
			if (isNaN(value)) console.warn("Tried to set temperature to a non-number value", value);
			V.player.bodyTemperature = Number(value);
		},
		isDecreasing() {
			return Weather.BodyTemperature.direction < 0;
		},
		isIncreasing() {
			return Weather.BodyTemperature.direction > 0;
		},
		get current() {
			return this.get();
		},
		get direction() {
			return Math.sign(Weather.BodyTemperature.target - this.get());
		},
		get target() {
			if (!T.temperatureRestingPoint) {
				T.temperatureRestingPoint = getRestingPoint(8);
			}
			return T.temperatureRestingPoint;
		},
		get wetness() {
			return calculateWetness();
		},
		// For compatibility with /base-combat/ - since I don't want to touch it
		get state() {
			if (this.get() < 35) return "cold";
			if (this.get() < 36.5) return "chilly";
			if (this.get() < 37.5) return "comfy";
			if (this.get() < 39) return "warm";
			return "hot";
		},
		get fatigueModifier() {
			const factor = temperatureFactor();
			return this.get() > settings.baseBodyTemperature ? interpolate(1, settings.effects.maxFatigueGainMultiplier, factor) : 1;
		},
		get arousalModifier() {
			const factor = temperatureFactor();
			return this.get() < settings.baseBodyTemperature ? interpolate(1, settings.effects.maxArousalGainMultiplier, factor) : 1;
		},
		get painModifier() {
			const factor = temperatureFactor();
			return this.get() < settings.baseBodyTemperature ? interpolate(1, settings.effects.maxPainGainMultiplier, factor) : 1;
		},
		get stressModifier() {
			const factor = temperatureFactor();
			if (this.get() > settings.baseBodyTemperature) return interpolate(0, settings.effects.upperMaxStressGain, factor);
			return interpolate(0, settings.effects.lowerMaxStressGain, factor);
		},
		addActivity,
		update,
		activityLevel,
		calculateHeatGeneration,
		calculateHeatDissipation,
		getTotalWarmth,
		getWarmth,
		getRestingPoint,
	});
})();
