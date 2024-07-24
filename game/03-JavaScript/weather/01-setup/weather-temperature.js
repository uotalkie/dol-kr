/* Be careful when modifying the factors, as small changes can have big effects */
setup.WeatherTemperature = {
	thermometer: {
		base: "img/misc/icon/weather/thermometer.png",
		fill: "img/misc/icon/weather/thermo_filled.png",
		upArrow: "img/misc/icon/weather/arrow_up.png",
		downArrow: "img/misc/icon/weather/arrow_down.png",
		constant: "img/misc/icon/weather/constant.png",
	},
	dayMultiplier: 1.5, // Multiplier on day calculations
	seasonMultiplier: 2, // Multiplier on season calculations
	precipitationEffect: 1.5, // Effect on temperature, in degrees - per precipitationIntensity
	maxDiurnalVariation: 6.5, // Max temperature difference between day and night (if 0 overcast)
	minDiurnalVariation: 2.25, // Min temperature difference between day and night (if 1 overcast)
	snow: {
		minAccumulation: 15, // Min 15 mm for it to be considered snow on the ground
		maxAccumulation: 500, // max 500 mm of accumulated snow on the ground
		snowfallRate: 0.8, // mm per minute while snowing (snowfallRate * precipitationIntensity)
		meltingRate: 0.04, // base mm per minute when above freezing (meltingRate * temperature)
	},
	ice: {
		minThickness: {
			lake: 40, // min mm for it to be considered walkable
			fountain: 5,
		},
		maxThickness: {
			lake: 450, // max mm of accumulated ice on the lake
			fountain: 50,
		},
		freezingRate: 0.3, // mm per minute while freezing (freezingRate * temperature)
		meltingRate: 0.03, // base mm per minute when above freezing (meltingRate * temperature)
	},
	// Body temperature general
	baseBodyTemperature: 37, // The normal body temperature in degrees Celsius.
	minTemperature: 33, // Below this point will result in player passing out from hypothermia
	maxTemperature: 41, // Above this point will result in player passing out from hyperthermia
	tempApproachRate: 0.012, // Will nudge the temperature towards the base temperature by this rate (per degree celcius)

	// Heat generation
	baseHeatGeneration: 0.07, // The base rate of heat generation by the body.
	activityRate: 0.09, // How much physical activity affects heat generation.
	sunIntensityBaseModifier: 10, // At max sun intensity, it adds this to the effective outside temperature

	// Heat dissipation
	baseDissipation: 0.04, // The base rate of heat dissipation without modifiers.
	dissipationRate: 0.0035, // The curve at higher temperatures where dissipation levels out

	// Clothing
	baseInsulation: 0,
	insulationCap: 55, // Target warmth cap where its effectiveness is reduced
	insulationMultiplier: 1.1, // The effectiveness of clothing warmth
	warmthHeatModifier: 0.0005, // Modifier at higher temperatures

	// Wetness
	maxWetness: 200,
	maxClothingFactor: 0.75, // Max wetness outside of water (75%)
	wetnessFactor: 0.9, // 90% increase in dissipation at full wetness

	// Effects from temperature, in celcius
	effects: {
		lowerThresholdStart: 36,
		lowerThresholdEnd: 33,
		upperThresholdStart: 38,
		upperThresholdEnd: 41,
		lowerMaxStressGain: 3,
		upperMaxStressGain: 2,
		maxFatigueGainMultiplier: 3,
		maxPainGainMultiplier: 1.5,
		maxArousalGainMultiplier: 0.3,
	},
};
