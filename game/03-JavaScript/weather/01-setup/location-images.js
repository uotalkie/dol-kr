// @ts-check

/*
	Temporary until we have a better system for locations
	Exceptions are defined here
	Otherwise locations will match the folder name
*/
setup.Locations = {
	alex_farm: () => (V.bus === "woodland" ? "forest" : "alex_farm"),
	alley: () => {
		if (V.bus === "industrial") return "ind_alley";
		if (V.bus === "residential") return "res_alley";
		return "com_alley";
	},
	cafe: () => {
		if (V.chef_state >= 9) return "cafe_renovated";
		if (V.chef_state >= 7) return "cafe_construction";
		return "cafe";
	},
	castle: () => {
		return "tower";
	},
	chalets: () => {
		return "beach";
	},
	hotel: () => {
		return "town";
	},
	get() {
		if (typeof this[V.location] === "function") {
			return this[V.location]();
		}
		if (setup.LocationImages && Object.hasOwn(setup.LocationImages, V.location)) {
			return V.location;
		}
		return "home";
	},
};

/**
	NOTE: When adding animation frameDelay - use multiples of 50 millseconds only
	(such as 50, 100, 150, 200, 1000, 5000, etc.)
	If we want smoother animations (than 20 fps):
		- Change the updateRate in layer-location.js
 */

setup.LocationImages = {
	adult_shop: {
		folder: "adult_shop",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			windows: {
				condition: () => V.adultshopstate !== "closed" && (Time.dayState === "dusk" || Time.dayState === "night"),
				image: "emissive_windows.png",
				color: "#cf51ca",
				size: 2,
				intensity: 1.5,
			},
			heart: {
				condition: () => V.adultshopstate !== "closed" && (Time.dayState === "dusk" || Time.dayState === "night"),
				image: "emissive_heart.png",
				color: "#ff4fd6",
				animation: {
					frameDelay: 800,
					cycleDelay: () => 600,
				},
				size: 1,
			},
			red: {
				condition: () => V.adultshopstate !== "closed" && (Time.dayState === "dusk" || Time.dayState === "night"),
				image: "emissive_red.png",
				color: "#ff1d2f",
				size: 1,
			},
		},
	},
	alex_cottage: {
		folder: "alex_cottage",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	alex_farm: {
		folder: "alex_farm",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	arcade: {
		folder: "arcade",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			red: {
				image: "emissive_red.png",
				color: "#e36c59",
				size: 5,
			},
			yellow: {
				image: "emissive_yellow.png",
				condition: () => Weather.lightsOn,
				color: "#dcdb99cc",
				size: 5,
			},
			green: {
				image: "emissive_green.png",
				condition: () => Weather.lightsOn,
				color: "#4bc248",
				size: 5,
			},
			orange: {
				image: "emissive_orange.png",
				condition: () => Weather.lightsOn,
				color: "#f59442",
				size: 5,
			},
			purple: {
				image: "emissive_purple.png",
				condition: () => Weather.lightsOn,
				color: "#cf51ca",
				size: 5,
			},
			blue: {
				image: "emissive_blue.png",
				condition: () => Weather.lightsOn,
				color: "#4f6edb",
				size: 5,
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalFactor: 3.5,
				amplitude: 35,
				verticalSpeed: 0.05,
			},
			overlay: {
				image: "water.png",
				compositeOperation: "overlay",
				alpha: 0.4,
			},
		},
	},
	asylum: {
		folder: "asylum",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			clockMinute: {
				condition: () => V.hallucinations < 1,
				image: "clock1.png",
				frame: () => {
					const numFrames = 8;
					const segmentSize = 60 / numFrames;
					return Math.floor(((Time.minute + segmentSize / 2) / segmentSize) % numFrames);
				},
			},
			clockHour: {
				condition: () => V.hallucinations < 1,
				image: "clock2.png",
				frame: () => {
					const numFrames = 8;
					const segmentSize = 12 / numFrames;
					return Math.floor((((Time.hour % 12) + segmentSize / 2) / segmentSize) % numFrames);
				},
			},
			clockHallucinationMinute: {
				condition: () => V.hallucinations >= 1,
				image: "clock1.png",
				animation: {
					frameDelay: 100,
					cycleDelay: () => 0,
				},
			},
			clockHallucinationHour: {
				condition: () => V.hallucinations >= 1,
				image: "clock2.png",
				animation: {
					frameDelay: 1000,
					cycleDelay: () => 0,
				},
			},
		},
	},
	banner: {
		folder: "banner",
		base: {
			default: {
				condition: () => !Weather.bloodMoon,
				image: "banner_text.png",
			},
			bloodmoon: {
				condition: () => Weather.bloodMoon,
				image: "banner_text_bloodmoon.png",
			},
		},
		emissive: {
			night: {
				image: "banner_text.png",
				condition: () => !Weather.bloodMoon && Weather.banner.orbitals.sun.factor < 0,
				color: "#ffffff40",
				size: 4,
				blur: 0,
				intensity: 0.6,
			},
			bloodmoon: {
				image: "banner_text_bloodmoon.png",
				condition: () => Weather.bloodMoon && Weather.banner.orbitals.sun.factor < 0,
				color: "#ffffff40",
				size: 4,
				blur: 0,
				intensity: 0.4,
			},
			snow: {
				condition: () => !Weather.bloodMoon && Weather.isSnow,
				image: "banner_snow.png",
				color: "#c8d5ff50",
				blur: 0,
				size: 4,
				intensity: 0.9,
			},
			snow_blood: {
				condition: () => Weather.bloodMoon && Weather.isSnow,
				image: "banner_snow_blood.png",
				color: "#b80d2c99",
				blur: 0,
				size: 6,
				intensity: 0.9,
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
			},
			ice: {
				condition: () => Weather.isSnow,
				image: "ice.png",
				alpha: 0.8,
			},
			overlay: {
				image: "water.png",
				compositeOperation: () => (Weather.isSnow ? "screen" : "overlay"),
				alpha: () => (V.weatherObj.snow > 450 ? 0.5 : 0.4),
			},
		},
		layerTop: {
			snow: {
				condition: () => V.weatherObj.snow > 450,
				image: "snow.png",
			},
		},
	},
	beach: {
		folder: "beach",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			foam: {
				image: "waves.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 1000,
				},
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalFactor: 3.5,
				amplitude: 35,
			},
			waves: {
				image: "waves.png",
				alpha: 0.5,
				alwaysDisplay: false,
				compositeOperation: "overlay",
				animation: "foam",
			},
			overlay: {
				image: "water.png",
				compositeOperation: "overlay",
				alpha: 0.4,
			},
		},
		layerTop: {
			tree: {
				image: "tree.png",
				animation: {
					frameDelay: 350,
					cycleDelay: () => 3250,
				},
			},
		},
	},
	bog: {
		folder: "bog",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 2000,
					cycleDelay: () => 1000,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 2000,
					cycleDelay: () => 1000,
				},
			},
		},
		emissive: {
			bloodmoon: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood.png",
				color: "#e63e3e66",
				size: 15,
			},
			lights: {
				image: "emissive.png",
				condition: () => !Weather.bloodMoon && Time.dayState === "night" && Time.season !== "autumn" && Time.season !== "winter",
				color: "#deae66",
				size: 4,
				animation: {
					frameDelay: 250,
				},
			},
		},
	},
	brothel: {
		folder: "brothel",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			size: 5,
		},
	},
	cabin: {
		folder: "cabin",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	cafe: {
		folder: "cafe",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalFactor: 3.5,
				amplitude: 35,
			},
			overlay: {
				image: "water.png",
				compositeOperation: "overlay",
				alpha: 0.5,
			},
		},
	},
	cafe_construction: {
		folder: "cafe_construction",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalFactor: 3.5,
				amplitude: 35,
			},
			overlay: {
				image: "water.png",
				compositeOperation: "overlay",
				alpha: 0.5,
			},
		},
	},
	cafe_renovated: {
		folder: "cafe_renovated",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalFactor: 3.5,
				amplitude: 35,
			},
			overlay: {
				image: "water.png",
				compositeOperation: "overlay",
				alpha: 0.5,
			},
		},
	},
	canal: {
		folder: "canal",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			drip: {
				condition: () => Weather.isSnow,
				image: "drip.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalSpeed: 0.1,
				verticalFactor: 3,
				amplitude: 6,
			},
			overlay: {
				image: "water.png",
				condition: () => !Weather.isSnow,
				compositeOperation: "overlay",
				alpha: 0.5,
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				alpha: 0.9,
			},
		},
	},
	churchyard: {
		folder: "churchyard",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			color: "#a8b5ff",
			size: 2,
		},
	},
	com_alley: {
		folder: "com_alley",
		base: {
			default: {
				condition: () => !Weather.bloodMoon && !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(5, 30) * 1000,
				},
			},
			blood: {
				condition: () => Weather.bloodMoon && !Weather.isSnow,
				image: "bloodmoon.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(10, 60) * 1000,
				},
			},
			snow: {
				condition: () => !Weather.bloodMoon && Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	compound: {
		folder: "compound",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			smoke: {
				condition: () => !Weather.bloodMoon,
				image: "smoke.png",
				animation: {
					frameDelay: 300,
					cycleDelay: 0,
				},
			},
		},
	},
	dance_studio: {
		folder: "dance_studio",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	dilapidated_shop: {
		folder: "dilapidated_shop",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	docks: {
		folder: "docks",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			boat: {
				// Not at same time as cruiser
				waitForAnimation: "cruiser",
				image: "boat.png",
				animation: {
					frameDelay: 6000,
					cycleDelay: () => random(2, 20) * 1000,
					startFrame: () => random(1, 24),
				},
			},
			cruiser: {
				condition: () => Time.dayState !== "night",
				// Not at same time as boat
				waitForAnimation: "boat",
				image: "cruiser.png",
				animation: {
					frameDelay: 9000,
					cycleDelay: () => random(2, 20) * 1000,
					startFrame: () => (random(0, 1) ? random(0, 24) : 0),
				},
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalFactor: 4,
				amplitude: 20,
				frequency: 15,
			},
			overlay: {
				image: "water.png",
				compositeOperation: "overlay",
				alpha: 0.4,
			},
			waves: {
				condition: () => Weather.value >= 3, // light precipitation or above
				image: "waves.png",
				alpha: 0.8,
				alwaysDisplay: false,
				compositeOperation: "overlay",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 1000,
				},
			},
			waves2: {
				image: "waves.png",
				condition: () => Weather.value >= 4, // heavy precipitation or above
				alpha: 0.8,
				alwaysDisplay: false,
				compositeOperation: "overlay",
				animation: {
					startDelay: 3000,
					frameDelay: 200,
					cycleDelay: () => 1000,
				},
			},
		},
	},
	drain: {
		folder: "drain",
		base: {
			default: {
				image: "base.png",
			},
			drain: {
				condition: () => !Weather.isFreezing,
				image: "drain.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
			},
			water: {
				image: "water.png",
				animation: {
					frameDelay: 1000,
					cycleDelay: () => 2000,
				},
			},
		},
		// reflective: {
		// 	mask: {
		// 		image: "reflective.png",
		// 	},
		// 	water: {
		// 		image: "water.png",
		// 		animation: {
		// 			frameDelay: 1000,
		// 			cycleDelay: () => 2000,
		// 		},
		// 	},
		// },
	},
	estate: {
		folder: "estate",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			condition: () => Weather.lightsOn,
			image: "emissive.png",
		},
	},
	factory: {
		folder: "factory",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			lorry_back: {
				condition: () => Time.dayState !== "night" && Time.dayState !== "day",
				image: "lorry_back.png",
			},
			lorry_front: {
				condition: () => Time.dayState !== "night",
				image: "lorry_front.png",
			},
			gate: {
				condition: () => Time.dayState !== "night",
				image: "gate.png",
			},
			inside: {
				condition: () => Time.dayState !== "night",
				image: "inside.png",
				waitForAnimation: "lorry_moving",
				animation: {
					frameDelay: 150,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
			lorry_moving: {
				condition: () => Time.dayState !== "night",
				image: "lorry_moving.png",
				waitForAnimation: "inside",
				animation: {
					frameDelay: 150,
					cycleDelay: () => random(10, 30) * 1000,
				},
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				condition: () => Weather.lightsOn,
				size: 3,
				color: "#e7eb81",
			},
			stop_lights: {
				image: "lights_emissive.png",
				alwaysDisplay: true,
				animation: "lorry_moving",
				size: 5,
				color: "#e34d4d",
			},
			lorry_lights: {
				image: "lorry_emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDisplay: false,
				animation: "lorry_moving",
				size: 10,
				color: "#f7e092",
			},
			lorry_back_lights: {
				image: "lorry_back_emissive.png",
				alwaysDisplay: false,
				animation: "lorry_moving",
				size: 4,
				color: "#e34d4d",
			},
			inside_lights: {
				image: "inside_emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDisplay: false,
				animation: "inside",
				color: "#e6cc77",
			},
		},
	},
	farm: {
		folder: "farm",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	flats: {
		folder: "flats",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			water: {
				image: "sea.png",
			},
			power: {
				image: "powerlines.png",
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDisplay: false,
				color: "#deae66",
				intensity: 0.8,
				size: 2,
			},
			streetLight: {
				condition: () => Weather.lightsOn,
				image: "streetlight.png",
				color: "#e8d39d",
				size: 4,
			},
			streetGlow: {
				condition: () => Weather.lightsOn,
				image: "streetglow.png",
				intensity: 0.5,
				color: "#deae6655",
				size: 2,
			},
		},
		// reflective: {
		// 	image: "reflective.png",
		// },
	},
	forest: {
		folder: "forest",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			birds_light: {
				condition: () => !Weather.bloodMoon,
				image: "birds_light.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
			bloodmoon: {
				condition: () => Weather.bloodMoon,
				image: "bloodmoon.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(2, 7) * 1000,
				},
			},
		},
		emissive: {
			blood0: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood0.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(2, 7) * 1000,
				},
				color: "#e63e3e",
			},
			blood1: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood1.png",
				animation: {
					frameDelay: 2000,
					cycleDelay: () => random(4, 10) * 1000,
				},
				color: "#e63e3e",
			},
			blood2: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood2.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(4, 11) * 1000,
				},
				color: "#e63e3e",
			},
			blood3: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood3.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(3, 12) * 1000,
				},
				color: "#e63e3e",
			},
		},
	},
	forest_shop: {
		folder: "forest_shop",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	home: {
		folder: "home",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			smoke: {
				condition: () => !Weather.bloodMoon,
				image: "smoke.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 3000,
					startDelay: () => 3000,
				},
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	hospital: {
		folder: "hospital",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	ind_alley: {
		folder: "ind_alley",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(4, 15) * 1000,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(4, 15) * 1000,
				},
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66",
			strength: 2,
		},
	},
	island: {
		folder: "island",
		base: {
			default: {
				image: "base.png",
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				verticalDirection: 1,
			},
			overlay: {
				image: "water.png",
				animation: {
					frameDelay: 500,
				},
			},
		},
	},
	kylar_manor: {
		folder: "kylar_manor",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#fbff86dd",
			size: 4,
			intensity: 0.8,
		},
	},
	lake: {
		folder: "lake",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			deer: {
				condition: () => !Weather.isSnow && Time.dayState === "dawn",
				image: "deer.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 12000,
				},
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				condition: () => Weather.lightsOn && Time.season !== "winter" && Time.season !== "autumn",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
				color: "#deae66",
				strength: 2,
			},
			blood0: {
				condition: () => Weather.bloodMoon,
				image: "blood0.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(2, 7) * 1000,
				},
				color: "#e63e3e",
			},
			blood1: {
				condition: () => Weather.bloodMoon,
				image: "blood1.png",
				animation: {
					frameDelay: 2000,
					cycleDelay: () => random(4, 10) * 1000,
				},
				color: "#e63e3e",
			},
			blood2: {
				condition: () => Weather.bloodMoon,
				image: "blood2.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(4, 11) * 1000,
				},
				color: "#e63e3e",
			},
		},
		reflective: {
			mask: {
				animationCondition: () => !Weather.isFrozen("lake"),
				image: "reflective.png",
				horizon: 18,
				blur: 0.4,
				verticalDirection: 1,
			},
			water: {
				condition: () => !Weather.isFrozen("lake"),
				image: "water.png",
				alpha: () => (!Weather.isFrozen("lake") ? 0.35 : 0.8),
			},
			glimmer: {
				condition: () => V.options.reflections && !Weather.isFrozen("lake"),
				image: "glimmer.png",
				compositeOperation: "overlay",
				alpha: 0.5,
				gradientMask: true,
				animation: {
					slider: true,
					frames: 150,
					frameDelay: 150,
				},
			},
			ice: {
				condition: () => Weather.isFrozen("lake"),
				image: "ice.png",
			},
		},
	},
	lake_ruin: {
		folder: "lake_ruin",
		base: {
			default: {
				condition: () => !Weather.bloodMoon && !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 3000,
					cycleDelay: () => 5000,
				},
			},
			snow: {
				condition: () => !Weather.bloodMoon && Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 3000,
					cycleDelay: () => 5000,
				},
			},
			bloodmoon: {
				condition: () => Weather.bloodMoon && Weather.isSnow,
				image: "bloodmoon.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
			},
			bloodmoon_snow: {
				condition: () => Weather.bloodMoon && !Weather.isSnow,
				image: "bloodmoon_snow.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
			},
		},
		emissive: {
			blood: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood.png",
				animation: "bloodmoon",
				color: "#e63e3e",
			},
		},
		reflective: {
			mask: {
				condition: () => !Weather.bloodMoon,
				image: "reflective.png",
			},
			water: {
				condition: () => !Weather.bloodMoon,
				image: "water.png",
				alpha: 0.5,
				animation: {
					frameDelay: 1000,
					cycleDelay: () => 0,
				},
			},
		},
		// 	bloodMoon: {
		// 		condition: () => Weather.bloodMoon,
		// 		image: "reflective_blood.png",
		// 	},
		// 	horizon: 112,
		// },
	},
	landfill: {
		folder: "landfill",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	market: {
		folder: "market",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	meadow: {
		folder: "meadow",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			wind: {
				image: "wind.png",
				animation: {
					frameDelay: 100,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				condition: () => !Weather.bloodMoon && Time.dayState === "night" && Time.season !== "autumn" && Time.season !== "winter",
				color: "#deae66",
				size: 4,
				animation: {
					frameDelay: 200,
				},
			},
		},
	},
	moor: {
		folder: "moor",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			grass: {
				image: "grass.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(1, 8) * 1000,
				},
			},
			wind: {
				image: "wind.png",
				animation: {
					frameDelay: 100,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
		},
		// reflective: {
		// 	image: "reflective.png",
		// 	horizon: 112,
		// },
	},
	museum: {
		folder: "museum",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			grass: {
				condition: () => Time.season === "autumn",
				image: "grass_autumn.png",
			},
		},
	},
	night_monster_lair: {
		folder: "night_monster_lair",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			beast: {
				image: "beast.png",
				condition: () => Time.dayState === "morning",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(1, 5) * 1000,
				},
			},
			drip: {
				image: "drip.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 4000,
				},
			},
			flies: {
				image: "drip.png",
				condition: () => Time.dayState !== "morning",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
			},
			rat: {
				image: "rat.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(10, 30) * 1000,
				},
			},
		},
	},
	oak: {
		folder: "oak",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	office: {
		folder: "office",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			grass: {
				condition: () => Time.season === "autumn",
				image: "grass_autumn.png",
			},
		},
		emissive: {
			default: {
				condition: () => Weather.lightsOn,
				image: "emissive.png",
			},
			evening: {
				condition: () => Weather.lightsOn && Time.dayState === "dusk",
				image: "emissive_evening.png",
			},
			redBlinkingLight: {
				image: "red.png",
				color: "#ff5058",
				size: 3,
				animation: {
					frameDelay: 1000,
					cycleDelay: () => 1000,
				},
			},
		},
	},
	old_temple: {
		folder: "old_temple",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#ff633f",
			size: 4,
		},
	},
	park: {
		folder: "park",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			fountain: {
				image: "fountain.png",
				condition: () => !Weather.isFrozen("fountain"),
				animation: {
					frameDelay: 200,
					cycleDelay: () => 0,
				},
			},
			treebirds: {
				condition: () => !Weather.isSnow && Time.dayState !== "night",
				// Not at same time as flyingbird
				waitForAnimation: "flyingbird",
				image: "treebirds.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(2, 10) * 1000,
				},
			},
			flyingbird: {
				condition: () => !Weather.isSnow && (Time.dayState === "dawn" || Time.dayState === "dusk"),
				// Not at same time as treebirds
				waitForAnimation: "treebirds",
				image: "flyingbird.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => random(10, 30) * 1000,
				},
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
			color: "#deae66a5",
		},
	},
	police_station: {
		folder: "police_station",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			grass: {
				image: "grass_autumn.png",
				condition: () => !Weather.isSnow && Time.season === "autumn",
			},
			car: {
				image: "car.png",
				condition: () => Time.dayState === "night" || (Time.hour > 11 && Time.hour < 14),
			},
		},
		emissive: {
			image: "emissive.png",
			condition: () => Weather.lightsOn,
		},
	},
	pool: {
		folder: "pool",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => 0,
				},
			},
		},
	},
	pound: {
		folder: "pound",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			cage: {
				condition: () => !Weather.bloodMoon,
				image: "cage.png",
				animation: {
					frameDelay: 500,
					cycleDelay: () => random(3, 15) * 1000,
				},
			},
		},
	},
	prison: {
		folder: "prison",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			water: {
				image: "water.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 0,
				},
			},
		},
	},
	promenade: {
		folder: "promenade",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 5000,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 5000,
				},
			},
		},
		emissive: {
			condition: () => Weather.lightsOn,
			image: "emissive.png",
		},
	},
	pub: {
		folder: "pub",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			condition: () => Weather.lightsOn,
			image: "emissive.png",
			color: "#deae66",
			strength: 3,
		},
	},
	res_alley: {
		folder: "res_alley",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 1000,
					cycleDelay: () => random(4, 15) * 1000,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 1000,
					cycleDelay: () => random(4, 15) * 1000,
				},
			},
		},
	},
	riding_school: {
		folder: "riding_school",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 0,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 0,
				},
			},
		},
	},
	school: {
		folder: "school",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			autumn: {
				condition: () => !Weather.isSnow && Time.season === "autumn",
				image: "grass_autumn.png",
			},
		},
	},
	school_rear_courtyard: {
		folder: "school_rear_courtyard",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			summer: {
				image: "summer.png",
				condition: () => !Weather.isSnow && Time.season === "summer",
			},
		},
	},
	sea: {
		folder: "sea",
		reflective: {
			mask: {
				image: "reflective.png",
				alpha: 1,
				compositeOperation: "overlay"
			},
			overlay: {
				image: "water.png",
				alpha: 0.4,
				animation: {
					slider: () => V.options.reflections,
					frames: 300,
					frameDelay: 300,
				},
			},
			glimmer: {
				condition: () => V.options.reflections,
				image: "glimmer.png",
				compositeOperation: "soft-light",
				alpha: 0.5,
				gradientMask: true,
				animation: {
					slider: true,
					frames: 150,
					frameDelay: 150,
				},
			},
		},
	},
	sewers: {
		folder: "sewers",
		base: {
			default: {
				image: "base.png",
			},
		},
	},
	pirate_ship: {
		folder: "pirate_ship",
		base: {
			overlay: {
				image: "water.png",
			},
			waves: {
				image: "waves.png",
				animation: {
					frameDelay: 450,
				},
			},
		},
		reflective: {
			mask: {
				image: "reflective.png",
				alpha: 0.5,
			},
		},
		layerTop: {
			ship: {
				image: "ship.png",
				animation: {
					frameDelay: 750,
				},
			},
		},
	},
	sepulchre: {
		folder: "sepulchre",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			eyes: {
				image: "eyes.png",
				condition: () => Weather.lightsOn,
				color: "#e15151",
			},
			gem: {
				image: "gem.png",
				color: "#5b6ee1",
			},
		},
	},
	shopping_centre: {
		folder: "shopping_centre",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	spa: {
		folder: "spa",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 0,
				},
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
				animation: {
					frameDelay: 200,
					cycleDelay: () => 0,
				},
			},
		},
		emissive: {
			emissive_dawn: {
				image: "emissive_dawn.png",
				condition: () => Time.dayState === "dawn",
				color: "#e6de57",
				size: 10,
			},
			light: {
				image: "emissive_lights.png",
				condition: () => Weather.lightsOn,
				color: "#e6de57dd",
				size: 20,
				animation: {
					frameDelay: 2000,
					cycleDelay: () => 2000,
				},
			},
		},
	},
	strip_club: {
		folder: "strip_club",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			windows: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_windows.png",
				size: 2,
			},
			green: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_green.png",
				color: "#74ff9099",
				size: 2,
			},
			pink1: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_pink1.png",
				color: "#ff4fd6",
				size: 0,
			},
			pink2: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_pink.png",
				color: "#fe99ff99",
				size: 4,
			},
			purple: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_purple.png",
				color: "#a91dff",
				size: 0,
			},
			red: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_red.png",
				color: "#ff1d2f",
				size: 0,
			},
			blue: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_blue.png",
				color: "#a6f8ff",
				size: 0,
			},
			lady: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_lady_pose.png",
				animation: {
					frameDelay: 1000,
					cycleDelay: () => 1000,
				},
				color: "#ff60a099",
				size: 3,
			},
			hair: {
				condition: () => Time.dayState === "dusk" || Time.dayState === "night",
				image: "emissive_lady_hair.png",
				color: "#d8294899",
				size: 3,
			},
		},
	},
	studio: {
		folder: "studio",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			default: {
				image: "emissive.png",
				condition: () => Weather.lightsOn && between(Time.hour, 18, 23),
			},
		},
	},
	temple: {
		folder: "temple",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
		emissive: {
			window_blue: {
				image: "emissive_blue_window.png",
				condition: () => Weather.lightsOn,
				size: 0,
				intensity: 0.7,
			},
			window_orange: {
				image: "emissive_orange_window.png",
				condition: () => Weather.lightsOn,
				size: 0,
				intensity: 0.7,
			},
			orange: {
				image: "emissive_orange.png",
				condition: () => Weather.lightsOn,
				color: "#dfaf70ee",
				size: 4,
			},
			blue: {
				image: "emissive_blue.png",
				condition: () => Weather.lightsOn,
				color: "#7d98e9",
				size: 2,
			},
			grey: {
				image: "emissive_grey.png",
				condition: () => Weather.lightsOn,
				color: "#dbe4b9",
				size: 4,
			},
		},
	},
	tentworld: {
		folder: "tentworld",
		base: {
			default: {
				image: "base.png",
				animation: {
					frameDelay: 500,
					cycleDelay: () => 0,
				},
			},
			movingtent: {
				image: "moving_tentacle.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(1, 9) * 1000,
				},
			},
		},
	},
	tower: {
		folder: "tower",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			wind: {
				image: "wind.png",
				animation: {
					frameDelay: 100,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
		},
		emissive: {
			bonfire: {
				condition: () => getBirdBurnTime() > 0,
				image: "bonfire.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(0, 700),
				},
				color: "#deae66",
				size: 5,
				intensity: () => getBirdBurnTime() / 360,
			},
			emissive_blood: {
				condition: () => Weather.bloodMoon,
				image: "emissive_blood.png",
				color: "#e63e3e66",
				size: 5,
			},
		},
	},
	town: {
		folder: "town",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
			drivingCar: {
				condition: () => !Weather.bloodMoon,
				image: "drivingcar.png",
				waitForAnimation: "flickeringLights",
				alwaysDisplay: false,
				animation: {
					frameDelay: 150,
					cycleDelay: () => random(5, 15) * 1000,
				},
			},
			parkedCar: {
				condition: () => !Weather.bloodMoon,
				image: "parkedcar.png",
			},
			cat: {
				condition: () => Time.dayState === "night",
				image: "cat.png",
				animation: {
					frameDelay: 300,
					cycleDelay: () => random(3, 9) * 1000,
				},
			},
		},
		emissive: {
			lights: {
				image: "emissive.png",
				condition: () => Weather.lightsOn,
				alwaysDisplay: false,
				animation: "drivingCar",
				color: "#deae66",
				size: 4,
			},
			flickeringLights: {
				waitForAnimation: "drivingCar",
				condition: grp => {
					// Do not draw if car animation is running
					return Weather.lightsOn && !grp?.animations?.get("drivingCar")?.inCycle;
				},
				image: "emissive_flicker.png",
				color: "#deae66",
				size: 4,
				animation: {
					frameDelay: 250,
					cycleDelay: () => random(2, 20) * 1000,
				},
			},
		},
	},
	underground: {
		folder: "underground",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
	wolf_cave: {
		folder: "wolf_cave",
		base: {
			default: {
				condition: () => !Weather.isSnow,
				image: "base.png",
			},
			snow: {
				condition: () => Weather.isSnow,
				image: "snow.png",
			},
		},
	},
};
