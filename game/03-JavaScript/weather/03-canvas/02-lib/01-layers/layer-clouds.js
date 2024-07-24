Weather.Renderer.Layers.add({
	name: "clouds",
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
				bottomY: 152, // Don't generate clouds below this point (horizon)
				layers: [
					{
						speedFactor: 1,
						color: "#ffffff00",
						alpha: 1,
						height: {
							min: 48,
							max: 82,
						},
					},
					{
						speedFactor: 1.3,
						color: "#8190c777",
						alpha: 1,
						height: {
							min: 56,
							max: 96,
						},
					},
					{
						speedFactor: 1.6,
						color: "#7686c2aa",
						alpha: 1,
						height: {
							min: 64,
							max: 112,
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
	name: "overcastClouds",
	zIndex: 5,
	effects: [
		{
			effect: "overcast",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			params: {
				images: {
					overcast: "img/misc/sky/clouds/overcast/0.png",
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
	name: "cirrusClouds",
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
					max: 42,
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
