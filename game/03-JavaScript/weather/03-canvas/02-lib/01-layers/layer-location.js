Weather.Renderer.Layers.add({
	name: "location",
	zIndex: 9,
	animation: {
		updateRate: 50, // Updates every 50ms
	},
	// blur: {
	// 	max: 2,
	// 	factor: () => Weather.overcast,
	// },
	blur: 1.5,
	effects: [
		{
			effect: "locationImage",
			params: {
				path: "img/misc/locations",
				key: "base",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
			},
		},
		{
			effect: "locationEmissive",
			drawCondition() {
				return setup.LocationImages[setup.Locations.get()].emissive;
			},
			params: {
				path: "img/misc/locations",
				key: "emissive",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
			},
		},
		{
			effect: "locationReflective",
			drawCondition() {
				return V.options.reflections && !!setup.LocationImages[setup.Locations.get()].reflective;
			},
			params: {
				images: {
					mask: "img/misc/sky/effects/masks/gradient.png",
				},
				path: "img/misc/locations",
				key: "reflective",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
			},
		},
		// Fallback only if reflections are disabled
		{
			effect: "locationImage",
			drawCondition() {
				return !V.options.reflections && !!setup.LocationImages[setup.Locations.get()].reflective;
			},
			params: {
				name: "fallback",
				path: "img/misc/locations",
				key: "reflective",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
			},
		},
		// Draw on top
		{
			effect: "locationImage",
			drawCondition() {
				return setup.LocationImages[setup.Locations.get()].layerTop;
			},
			params: {
				path: "img/misc/locations",
			},
			bindings: {
				location() {
					const location = setup.Locations.get();
					return setup.LocationImages[location];
				},
				key() {
					return "layerTop";
				},
			},
		},
	],
});

Weather.Renderer.Layers.add({
	name: "horizonGlow",
	zIndex: 8,
	effects: [
		// City glow
		{
			effect: "gradiantGlow",
			drawCondition() {
				if (Weather.bloodMoon || !(Time.hour >= setup.SkySettings.lightsTime.on || Time.hour < setup.SkySettings.lightsTime.off)) {
					return false;
				}
				// Placeholder
				const locations = [
					"alley",
					"brothel",
					"canal",
					"compound",
					"dance_studio",
					"dilapitaded_shop",
					"estate",
					"factory",
					"home",
					"hospital",
					"kylar_manor",
					"landfill",
					"market",
					"museum",
					"office",
					"park",
					"police_station",
					"pool",
					"pub",
					"school",
					"sewers",
					"shopping_centre",
					"spa",
					"studio",
					"strip_club",
					"temple",
					"town",
				];
				return locations.includes(V.location);
			},
			params: {
				color: {
					glow: "#c9ba76d0",
					dark: "#c9ba7600",
				},
			},
		},
		// Blood moon glow
		{
			effect: "gradiantGlow",
			drawCondition() {
				return (Time.hour >= setup.SkySettings.lightsTime.on || Time.hour < setup.SkySettings.lightsTime.off) && Weather.bloodMoon;
			},
			params: {
				color: {
					glow: "#eb3b2fee",
					dark: "#eb3b2f00",
				},
			},
		},
	],
});
