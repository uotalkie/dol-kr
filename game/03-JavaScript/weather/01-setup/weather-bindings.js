/*
	Bind a value to the sky canvas.
	If the value changes - it will update the specified layer(s)

*/
setup.WeatherBindings = {
	options: {
		variable: () => V.options.weatherUpdate,
		layers: ["all"],
	},
	save: {
		variable: () => T.saveLoaded,
		layers: ["all"],
	},
	time: {
		variable: () => Time.date.timeStamp,
		layers: ["all"],
	},
	weather: {
		variable: () => Weather.name,
		layers: ["clouds", "cirrusClouds", "overcastClouds", "all"],
	},
	precipitation: {
		variable: () => Weather.name,
		layers: ["precipitation"],
	},
	location: {
		variable: () => V.location,
		layers: ["location"],
	},
	tentworld: {
		variable: () => V.location === "tentworld",
		layers: ["all"],
	},
	bus: {
		variable: () => V.bus,
		layers: ["location"],
	},
	bloodmoon: {
		variable: () => Weather.bloodMoon,
		layers: ["location"],
	},
	snow: {
		variable: () => Weather.isSnow,
		layers: ["location"],
	},
	dayState: {
		variable: () => Time.dayState,
		layers: ["location"],
	},
	lightsOn: {
		variable: () => Weather.lightsOn,
		layers: ["location"],
	},
	fireOn: {
		variable: () => {
			if (V.bird.firepit === undefined) return null;
			const step = V.bird.firepit.maxBurnTime / 60 / 5; // (max value / parts)
			return Math.round(getBirdBurnTime() / step) * step;
		},
		layers: ["location"],
	},
};
