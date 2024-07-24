Weather.Renderer.Layers.add({
	name: "sky",
	zIndex: 0,
	effects: [
		{
			/* Night sky */
			effect: "skyGradiant",
			drawCondition() {
				return !Weather.bloodMoon && !this.renderInstance.skyDisabled;
			},
			params: {
				radius: 82,
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
				radius: 82,
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
				radius: 128,
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
		{
			/* Tentacle sky */
			effect: "gradiantGlow",
			drawCondition() {
				return V.location === "tentworld";
			},
			params: {
				fadeStartY: 192,
				color: {
					glow: "#300c36",
					dark: "#631582",
				},
			},
		},
	],
});
