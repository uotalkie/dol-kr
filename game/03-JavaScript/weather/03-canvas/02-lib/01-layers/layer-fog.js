Weather.Renderer.Layers.add({
	name: "fog",
	zIndex: 13,
	blur: false,
	effects: [
		{
			effect: "fog",
			drawCondition() {
				return !this.renderInstance.skyDisabled;
			},
			params: {
				images: {
					fog: "img/misc/sky/clouds/fog/0.png",
				},
				movement: {
					speed: 0.4,
				},
				baseAlpha: 0.9,
			},
			bindings: {
				fogFactor() {
					return Weather.fog;
				},
				weather() {
					return Weather.current;
				},
			},
		},
		{
			effect: "colorOverlay",
			compositeOperation: "source-atop",
			params: {
				color: {
					nightDark: "#000412ee",
					nightBright: "#000412dd",
					day: "#97a9e8e5",
					dawnDusk: "#7a511895",
					bloodMoon: "#4a0505ee",
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
