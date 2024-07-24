Weather.Renderer.Layers.add({
	name: "precipitation",
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
					overlay: "img/misc/sky/effects/masks/0.png",
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
					overlay: "img/misc/sky/effects/masks/1.png",
				},
				movement: {
					speed: 0.5,
				},
				baseAlpha: 1,
			},
		},
	],
});
