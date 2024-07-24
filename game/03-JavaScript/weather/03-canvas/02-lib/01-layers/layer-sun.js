Weather.Renderer.Layers.add({
	name: "sun",
	zIndex: 2,
	blur: {
		max: 5,
		factor: () => normalise(Weather.overcast, 1, 0.1),
	},
	effects: [
		{
			effect: "skyOrbital",
			drawCondition() {
				return this.renderInstance.orbitals.sun.factor > -0.5 && !this.renderInstance.skyDisabled;
			},
			params: {
				images: { orbital: "img/misc/sky/sun.png" },
			},
			bindings: {
				position() {
					return this.renderInstance.orbitals.sun.position;
				},
			},
		},
		{
			effect: "outerRadialGlow",
			drawCondition() {
				return this.renderInstance.orbitals.sun.factor > -0.5 && !this.renderInstance.skyDisabled;
			},
			params: {
				outerRadius: 24, // The radius of the outer glow
				colorInside: { dark: "#f07218ee", med: "#f07218ee", bright: "#f2fad766" },
				colorOutside: { dark: "#f0721800", med: "#f0721800", bright: "#f2fad700" },
			},
			bindings: {
				position() {
					return this.renderInstance.orbitals.sun.position;
				},
				factor() {
					return this.renderInstance.orbitals.sun.factor;
				},
				diameter() {
					// Reference this layer and above effect image
					return this.renderInstance.layers.get("sun").effects[0].images.orbital.width;
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "sunGlow",
	zIndex: 12,
	effects: [
		{
			effect: "outerRadialGlow",
			drawCondition() {
				return this.renderInstance.orbitals.sun.factor > -0.7 && !Weather.isOvercast && !this.renderInstance.skyDisabled;
			},
			params: {
				outerRadius: 64, // The radius of the outer glow
				colorInside: { dark: "#fd634d00", med: "#faff8710", bright: "#fbffdb55" },
				colorOutside: { dark: "#fd634d00", med: "#faff8700", bright: "#fbffdb00" },
				cutCenter: false,
				diameter: 28,
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
