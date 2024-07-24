Weather.Renderer.Layers.add({
	name: "bannerSky",
	zIndex: 0,
	effects: [
		{
			/* Night sky */
			effect: "skyGradiant",
			drawCondition() {
				return !Weather.bloodMoon && !this.renderInstance.skyDisabled;
			},
			params: {
				radius: 256,
			},
			bindings: {
				color() {
					// Make it brighter when moon is lit
					const colorCloseMin = ColourUtils.interpolateColor("#00001c00", "#1c1c6100", this.renderInstance.moonBrightnessFactor);
					const colorClose = ColourUtils.interpolateColor("#00001c", "#1c1c61", this.renderInstance.moonBrightnessFactor);
					return {
						colorMin: { close: colorCloseMin, far: "#00001c00" },
						colorMed: { close: colorClose, far: "#00001c" },
						colorMax: { close: colorClose, far: "#00001c" },
					};
				},
				position() {
					return this.renderInstance.orbitals.moon.position;
				},
				factor() {
					return this.renderInstance.orbitals.moon.factor;
				},
			},
		},
		{
			/* Blood sky */
			effect: "skyGradiant",
			drawCondition() {
				return Weather.bloodMoon && !this.renderInstance.skyDisabled;
			},
			params: {
				color: {
					colorMin: { close: "#4d000000", far: "#21070700" },
					colorMed: { close: "#4d0000", far: "#210707" },
					colorMax: { close: "#4d0000", far: "#210707" },
				},
				radius: 256,
			},
			bindings: {
				position() {
					return this.renderInstance.orbitals.bloodMoon.position;
				},
				factor() {
					return this.renderInstance.orbitals.bloodMoon.factor;
				},
			},
		},
		{
			/* Day sky */
			effect: "skyGradiant",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			params: {
				color: {
					colorMin: { close: "#14145200", far: "#00001c00" },
					colorMed: { close: "#d47d12", far: "#6c6d94" },
					colorMax: { close: "#d4d7ff", far: "#4692d4" },
				},
				radius: 384,
			},
			bindings: {
				position() {
					return this.renderInstance.orbitals.sun.position;
				},
				factor() {
					return this.renderInstance.orbitals.sun.factor;
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "bannerStarField",
	zIndex: 1,
	blur: {
		max: 3,
		factor: () => normalise(Weather.overcast, 1, 0.4),
	},
	effects: [
		{
			effect: "skyStarField",
			drawCondition() {
				return this.renderInstance.orbitals.sun.factor < 0.75 && !this.renderInstance.skyDisabled;
			},
			params: {
				area: 1000,
				starsConfig: {
					minDistance: 10, // Min distance between stars in pixels
					count: 850,
					colorRange: ["#8272cc", "#b872f2", "#5f98b3", "#ffffff"],
				},
				pivot: { x: 432, y: 128 },
				rotationClockwise: true, // Set false for anti-clockwise
				opacity: {
					night: 0.85,
					day: 0,
					bloodMoon: 0.5,
				},
				spriteOptions: {
					square: {
						weight: 10, // Chance of square non-sprite 2x2 stars
					},
					star0: {
						weight: 0.2,
						glowSize: 5,
					},
					star1: {
						weight: 0.2,
						glowSize: 5,
					},
					star2: {
						weight: 0.08,
						glowSize: 5,
					},
					star3: {
						weight: 0.015,
						glowSize: 7,
						glowColor: "#ffffff",
					},
					star4: {
						weight: 0.01,
						randomColor: false,
						glowSize: 6,
						glowColor: "#4a3da4aa",
					},
				},
				// Chance of these appearing is set in the weights above
				images: {
					star0: "img/misc/sky/stars/star_0.png",
					star1: "img/misc/sky/stars/star_1.png",
					star2: "img/misc/sky/stars/star_2.png",
					star3: "img/misc/sky/stars/star_3.png",
					star4: "img/misc/sky/stars/star_4.png",
				},
			},
			bindings: {
				alpha() {
					const factor = this.renderInstance.orbitals.sun.factor;
					const nightAlpha = Weather.bloodMoon ? this.opacity.bloodMoon : this.opacity.night;
					return interpolate(nightAlpha, this.opacity.day, Math.clamp(factor + 0.4, 0, 1));
				},
				rotation() {
					return Time.date.fractionOfDay * 360;
				},
				moonPosition() {
					return this.renderInstance.orbitals.moon.position;
				},
				moonDiameter() {
					return this.renderInstance.layers.get("moon").effects[0].images.orbital.width;
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "bannerSunGlow",
	zIndex: 12,
	effects: [
		{
			effect: "outerRadialGlow",
			drawCondition() {
				return this.renderInstance.orbitals.sun.factor > -0.7 && !Weather.isOvercast && !this.renderInstance.skyDisabled;
			},
			params: {
				outerRadius: 82, // The radius of the outer glow
				colorInside: { dark: "#fd634d00", med: "#faff8710", bright: "#fbffdb70" },
				colorOutside: { dark: "#fd634d00", med: "#faff8700", bright: "#fbffdb00" },
				cutCenter: false,
				diameter: 32,
			},
			bindings: {
				position() {
					return this.renderInstance.orbitals.sun.position;
				},
				factor() {
					return this.renderInstance.orbitals.sun.factor;
				},
			},
		},
	],
});

/* eslint-disable no-undef */
Weather.Renderer.Layers.add({
	name: "bannerClouds",
	zIndex: 6,
	blur: 1.5,
	effects: [
		{
			effect: "clouds",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			params: {
				images: {
					cloud0: "img/misc/sky/clouds/0.png",
					cloud1: "img/misc/sky/clouds/1.png",
					cloud2: "img/misc/sky/clouds/2.png",
					cloud3: "img/misc/sky/clouds/3.png",
					cloud4: "img/misc/sky/clouds/4.png",
					cloud5: "img/misc/sky/clouds/5.png",
				},
				types: {
					small: ["cloud0", "cloud1", "cloud2"],
					large: ["cloud3", "cloud4", "cloud5"],
				},
				bottomY: 216, // Don't generate clouds below this point (horizon)
				layers: [
					{
						speedFactor: 1,
						color: "#ffffff00",
						alpha: 1,
						height: {
							min: 48,
							max: 102,
						},
					},
					{
						speedFactor: 1.3,
						color: "#8190c777",
						alpha: 1,
						height: {
							min: 56,
							max: 116,
						},
					},
					{
						speedFactor: 1.6,
						color: "#7686c2aa",
						alpha: 1,
						height: {
							min: 64,
							max: 132,
						},
					},
				],
				movement: {
					baseSpeed: 0.5,
					leaveSpeed: 1,
				},
			},
			bindings: {
				weather() {
					return Weather.current;
				},
				weatherType() {
					return Weather.type;
				},
			},
		},
		{
			effect: "colorOverlay",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#00001cea",
					nightBright: "#0d0d26da",
					day: "#00000000",
					dawnDusk: "#a36d22a5",
					bloodMoon: "#380101e5",
				},
			},
			bindings: {
				sunFactor() {
					return this.renderInstance.orbitals.sun.factor;
				},
				moonFactor() {
					return this.renderInstance.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "bannerOvercastClouds",
	zIndex: 5,
	effects: [
		{
			effect: "overcast",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			params: {
				images: {
					overcast: "img/misc/sky/clouds/overcast/1.png",
				},
				movement: {
					speed: 0.2,
				},
				baseAlpha: 1,
			},
			bindings: {
				overcastFactor() {
					return Weather.overcast;
				},
				weather() {
					return Weather.current;
				},
			},
		},
		{
			effect: "colorOverlay",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#000412ee",
					nightBright: "#000412dd",
					day: "#97a9e8aa",
					dawnDusk: "#7a511895",
					bloodMoon: "#380101e5",
				},
			},
			bindings: {
				sunFactor() {
					return this.renderInstance.orbitals.sun.factor * interpolate(1, 0.8, Math.max(0, normalise(this.renderInstance.orbitals.sun.factor, 1, 0)));
				},
				moonFactor() {
					return this.renderInstance.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "bannerCirrusClouds",
	zIndex: 4,
	blur: {
		max: 2,
		factor: () => Weather.overcast,
	},
	effects: [
		{
			effect: "cirrus",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			params: {
				images: {
					cloud0: "img/misc/sky/clouds/cirrus/0.png",
					cloud1: "img/misc/sky/clouds/cirrus/1.png",
					cloud2: "img/misc/sky/clouds/cirrus/2.png",
				},
				height: {
					min: -12,
					max: 64,
				},
				count: {
					min: 1,
					max: 3,
				},
				movement: {
					speed: 0.2,
				},
				minAlpha: 0.25,
				baseAlpha: 0.8,
			},
			bindings: {
				weather() {
					return Weather.current;
				},
				weatherType() {
					return Weather.type;
				},
				factor() {
					return interpolate(this.minAlpha, 1, normalise(Math.min(this.renderInstance.orbitals.sun.factor, 0), 0, -1));
				},
			},
		},
		{
			effect: "colorOverlay",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#00001ce6",
					nightBright: "#000412cc",
					day: "#ffe9d300",
					dawnDusk: "#a36d22a5",
					bloodMoon: "#380101e5",
				},
			},
			bindings: {
				sunFactor() {
					return this.renderInstance.orbitals.sun.factor;
				},
				moonFactor() {
					return this.renderInstance.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "bannerPrecipitation",
	zIndex: 10,
	animation: {
		updateRate: 50, // Updates every 50ms
	},
	effects: [
		/* Rain */
		{
			effect: "precipitation",
			drawCondition(a) {
				return !this.renderInstance.skyDisabled && Weather.isOvercast && Weather.precipitationIntensity > 1 && Weather.precipitation === "rain";
			},
			params: {
				frameWidth: 42,
				images: {
					precipitation: "img/misc/sky/effects/rain.png",
				},
				position: {
					diagonalOffset: -8,
					offset: -8,
				},
				frameDelay: 100,
			},
			bindings: {
				onFrame() {
					return this.renderInstance.drawLayers("precipitation");
				},
				alpha() {
					return Math.clamp(this.renderInstance.orbitals.sun.factor + 1, 0.7, 1);
				},
			},
		},
		/* Sparse rain */
		{
			effect: "precipitation",
			drawCondition() {
				return (
					!this.renderInstance.skyDisabled &&
					Weather.overcast > 0.25 &&
					Weather.precipitationIntensity > 0 &&
					Weather.precipitationIntensity <= 1 &&
					Weather.precipitation === "rain"
				);
			},
			params: {
				frameWidth: 42,
				images: {
					precipitation: "img/misc/sky/effects/rain_sparse.png",
				},
				position: {
					diagonalOffset: -8,
					offset: -8,
				},
				frameDelay: 150,
			},
			bindings: {
				onFrame() {
					return this.renderInstance.drawLayers("precipitation");
				},
				alpha() {
					return Math.clamp(this.renderInstance.orbitals.sun.factor + 1, 0.7, 1);
				},
			},
		},
		/* Snow */
		{
			effect: "precipitation",
			drawCondition() {
				return !this.renderInstance.skyDisabled && Weather.isOvercast && Weather.precipitationIntensity > 1 && Weather.precipitation === "snow";
			},
			params: {
				frameWidth: 32,
				images: {
					precipitation: "img/misc/sky/effects/snow.png",
				},
				position: {
					diagonalOffset: 0,
					offset: 0,
				},
				frameDelay: 150,
			},
			bindings: {
				onFrame() {
					return this.renderInstance.drawLayers("precipitation");
				},
				alpha() {
					return Math.clamp(this.renderInstance.orbitals.sun.factor + 1, 0.6, 1);
				},
			},
		},
		/* Sparse Snow */
		{
			effect: "precipitation",
			drawCondition() {
				return (
					!this.renderInstance.skyDisabled &&
					Weather.overcast > 0.25 &&
					Weather.precipitationIntensity > 0 &&
					Weather.precipitationIntensity <= 1 &&
					Weather.precipitation === "snow"
				);
			},
			params: {
				frameWidth: 32,
				images: {
					precipitation: "img/misc/sky/effects/snow_sparse.png",
				},
				position: {
					diagonalOffset: 0,
					offset: 0,
				},
				frameDelay: 200,
			},
			bindings: {
				onFrame() {
					return this.renderInstance.drawLayers("precipitation");
				},
				alpha() {
					return Math.clamp(this.renderInstance.orbitals.sun.factor + 1, 0.6, 1);
				},
			},
		},
		{
			effect: "colorOverlay",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#000412bb",
					nightBright: "#00041299",
					day: "#97a9e8aa",
					dawnDusk: "#7a511895",
					bloodMoon: "#c70000cc",
				},
			},
			bindings: {
				sunFactor() {
					return this.renderInstance.orbitals.sun.factor * interpolate(1, 0.8, Math.max(0, normalise(this.renderInstance.orbitals.sun.factor, 1, 0)));
				},
				moonFactor() {
					return this.renderInstance.moonBrightnessFactor;
				},
				bloodMoon() {
					return Weather.bloodMoon;
				},
			},
		},
		{
			effect: "imageOverlay",
			drawCondition() {
				return !this.renderInstance.skyDisabled && Weather.overcast > 0.5 && Weather.precipitationIntensity >= 1 && Weather.precipitation === "rain";
			},
			compositeOperation: "destination-out",
			params: {
				images: {
					overlay: "img/misc/sky/effects/masks/3.png",
				},
				movement: {
					speed: 0.5,
				},
				baseAlpha: 1,
			},
		},
		{
			effect: "imageOverlay",
			drawCondition() {
				return !this.renderInstance.skyDisabled && Weather.overcast > 0.5 && Weather.precipitationIntensity >= 1 && Weather.precipitation === "snow";
			},
			compositeOperation: "destination-out",
			params: {
				images: {
					overlay: "img/misc/sky/effects/masks/4.png",
				},
				movement: {
					speed: 0.5,
				},
				baseAlpha: 0.8,
			},
		},
	],
});
