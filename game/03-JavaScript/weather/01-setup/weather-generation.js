/**
 * Temperature Explanation:
 * 	Temperature calculations work by setting a number of key-points per month.
 * 	Key-points represent specific days where the temperature is defined, and temperatures for other days are interpolated between these points.
 * 	The number of key-points is selected randomly within a specified range set below in 'months'.
 *
 * Weather Explanation:
 *	Determines the current weather condition based on a series of key-points, similar to temperature.
 *	Instead of several key points per month - it instead uses 1 to several key points per day. (set in settings below)
 *	This leads to a more realistic weather pattern. It interpolates between weather types realistically (e.g. to go from clear to heavy rain - it must first be cloudy)
 *  Every season has its own probability for each weather type, set in weatherTypes, below.
 *
 */
setup.WeatherGeneration = {
	forecast: {
		weather: {
			/* Will generate random number of key points between the min and max value */
			daysToGenerate: 20, // How many days of forecast to generate ahead of the current day. Do not set too low or it will generate new key points too often.
			minTimeApartKeyPoints: 140, // Minimum time between each keypoint, in minutes
			minKeyPointsPerDay: 1, // Mininum number of key points per day. Must be at least 1
			maxKeyPointsPerDay: 4, // Maximum number of key points per day.
		},
		temperature: {
			// Generates at least 1 month ahead, dynamically
			minTimeApartKeyPoints: 3, // Minimum time between each keypoint, in days
			minKeyPointsPerMonth: 4, // Minimum number of key points per month. Must be at least 1
			maxKeyPointsPerMonth: 6, // Maximum number of key points per month.
			extremeMaxKeyPointsPerMonth: 2,
		},
	},
	months: [
		{
			// Jan
			temperatureRange: {
				average: [-9, 7], // Range of temperature for a specific month. A range of [5, 15] means that it will generate temperatures between that range for that specific month.
				extreme: [-25, 11],
			},
			extremeChance: 0.3,
			sunIntensity: 0.1, // Modifies tanning changes from sun exposure
		},
		{
			// Feb
			temperatureRange: {
				average: [-8, 8],
				extreme: [-21, 15],
			},
			extremeChance: 0.25,
			sunIntensity: 0.2,
		},
		{
			// Mar
			temperatureRange: {
				average: [-3, 11],
				extreme: [-18, 20],
			},
			extremeChance: 0.2,
			sunIntensity: 0.3,
		},
		{
			// Apr
			temperatureRange: {
				average: [0, 15],
				extreme: [-10, 28],
			},
			extremeChance: 0.25,
			sunIntensity: 0.5,
		},
		{
			// May
			temperatureRange: {
				average: [7, 19],
				extreme: [0, 32],
			},
			extremeChance: 0.3,
			sunIntensity: 0.7,
		},
		{
			// Jun
			temperatureRange: {
				average: [11, 23],
				extreme: [3, 36],
			},
			extremeChance: 0.35,
			sunIntensity: 1,
		},
		{
			// Jul
			temperatureRange: {
				average: [14, 27],
				extreme: [8, 40],
			},
			extremeChance: 0.4,
			sunIntensity: 1,
		},
		{
			// Aug
			temperatureRange: {
				average: [14, 24],
				extreme: [6, 38],
			},
			extremeChance: 0.35,
			sunIntensity: 0.8,
		},
		{
			// Sep
			temperatureRange: {
				average: [11, 20],
				extreme: [0, 32],
			},
			extremeChance: 0.3,
			sunIntensity: 0.7,
		},
		{
			// Oct
			temperatureRange: {
				average: [5, 16],
				extreme: [-5, 28],
			},
			extremeChance: 0.25,
			sunIntensity: 0.5,
		},
		{
			// Nov
			temperatureRange: {
				average: [-5, 10],
				extreme: [-10, 19],
			},
			extremeChance: 0.2,
			sunIntensity: 0.3,
		},
		{
			// Dec
			temperatureRange: {
				average: [-8, 6],
				extreme: [-20, 13],
			},
			extremeChance: 0.25,
			sunIntensity: 0.1,
		},
	],
	weatherTypes: [
		{
			name: "clear",
			iconType: "clear", // Determines which icon to use for the minimised sidebar
			value: 0, // Value determines how to interpolate between different weather types. It always interpolates to a adjacent value first.
			probability: {
				// Weighted probabilities per month - there are compared to the other weather types, and not to the other seasons.
				summer: 0.7,
				winter: 0.3,
				spring: 0.5,
				autumn: 0.4,
			},
			cloudCount: {
				// Visual only - determines how many clouds spawn at once in the sidebar of each type
				small: () => random(0, 2),
				large: () => 0,
			},
			// Modifies the tanning factor, based on cloud coverage. A modifier of 1 has no penalties.
			tanningModifier: 1,
			// Determines how overcast the sky should be. (Between 0 and 1)
			overcast: () => 0,
			// Determines the intensity of the precipitation. A bigger value accumulates snow faster during winter.
			precipitationIntensity: 0,
			// Determines how dark the clouds should be when it's overcast
			visibility: 1,
		},
		{
			name: "lightClouds",
			iconType: "clouds",
			value: 1,
			probability: {
				summer: 0.5,
				winter: 0.4,
				spring: 0.5,
				autumn: 0.4,
			},
			cloudCount: {
				small: () => random(1, 3),
				large: () => random(0, 1),
			},
			tanningModifier: 0.5,
			overcast: () => randomFloat(0, 0.3),
			precipitationIntensity: 0,
			visibility: 1,
		},
		{
			name: "heavyClouds",
			iconType: "clouds",
			value: 2,
			probability: {
				summer: 0.1,
				winter: 0.4,
				spring: 0.2,
				autumn: 0.3,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(0, 4),
			},
			tanningModifier: 0.2,
			overcast: () => randomFloat(0.5, 0.8),
			precipitationIntensity: 0,
			visibility: 0.8,
		},
		{
			name: "lightPrecipitation",
			iconType: () => "light_" + Weather.precipitation,
			value: 3,
			probability: {
				summer: 0.05,
				winter: 0.1,
				spring: 0.05,
				autumn: 0.15,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(1, 5),
			},
			tanningModifier: 0.2,
			overcast: () => randomFloat(0.8, 1),
			precipitationIntensity: 1,
			visibility: 0.7,
		},
		{
			name: "heavyPrecipitation",
			iconType: () => "heavy_" + Weather.precipitation,
			value: 4,
			probability: {
				summer: 0.05,
				winter: 0.1,
				spring: 0.05,
				autumn: 0.1,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(2, 5),
			},
			tanningModifier: 0.1,
			overcast: () => 1,
			precipitationIntensity: 1.5,
			visibility: 0.4,
		},
		{
			name: "thunderStorm",
			value: 4,
			probability: {
				// Disabled for now since it's not implemented yet
				summer: 0, // 0.02,
				winter: 0, // 0.005,
				spring: 0, // 0.015,
				autumn: 0, // 0.01,
			},
			cloudCount: {
				small: () => 0,
				large: () => random(3, 5),
			},
			tanningModifier: 0,
			overcast: () => 1,
			precipitationIntensity: 2,
			visibility: 0.3,
		},
	],
};
