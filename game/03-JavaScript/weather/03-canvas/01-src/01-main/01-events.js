/* Initialize sky canvas on loading a save */
$(document).on(":onloadsave", () => {
	if (!Weather.sky?.loaded.value) return;
	Weather.activeRenderer = Weather.sky;
	Weather.sky.initialize();
});

/* Clear all layers on restart */
$(document).on(":enginerestart", () => {
	Weather.sky?.stopAll();
});

/* Initialise banner canvas on passageend in order to load Time and localStorage correctly */
$(document).on(":passageend", () => {
	if (State.passage === "Start" && !Weather.banner?.loaded.value) {
		// Load localStorage weather object if it exists - then set the weatherObj
		// Otherwise set a default time state
		const weatherData = localStorage.getItem("weather");
		const timeData = localStorage.getItem("time");
		let startTime = new DateTime(2022, 8, 10, 23, 45);
		if (weatherData) {
			Weather.WeatherGeneration.generate(Time.date);
			Packer.unpackWeatherData(weatherData);
			startTime = new DateTime(parseInt(timeData, 36));
		}
		Time.set(startTime);
		Weather.banner.initialize();
	}
});

/* Initialize sky canvas on page refresh */
$(document).on(":passagestart", () => {
	// Setup banner for start menu
	if (["Start", "Clothes Testing", "Renderer Test Page", "Tips"].includes(State.passage)) {
		if (State.passage === "Start") {
			// Set temporary weatherObj for Start menu
			V.weatherObj = {
				name: "lightClouds",
				snow: 0,
				ice: {},
				fog: 0,
				overcast: 0,
				targetOvercast: 0,
				monthlyTemperatures: [],
				keypointsArr: [],
			};
			Time.set(0);

			// Setup banner canvas
			if (!Weather.banner?.loaded.value) {
				Weather.banner = new Weather.Renderer.Sky({
					id: "canvasBanner",
					setup: setup.SkySettings.canvas.banner,
					layers: [
						"bannerSky",
						"sun",
						"bannerSunGlow",
						"moon",
						"bannerCirrusClouds",
						"bannerOvercastClouds",
						"bannerClouds",
						"bannerStarField",
						"bloodGlow",
						"bannerPrecipitation",
						"location",
					],
					resizable: true,
				});
			}

			Weather.activeRenderer = Weather.banner;
			return;
		}
		// Do nothing if still in start menu
		if (V.location === "banner") return;
	}

	// Do nothing if still in start menu
	if (["Start", "Clothes Testing", "Renderer Test Page", "Tips"].includes(State.passage) && V.location === "banner") return;

	// Remove banner canvas if no longer on start menu
	if (State.passage !== "Start" && Weather.banner) {
		Weather.banner.stopAll();
		delete Weather.banner;
	}

	// Return if sidebar has already been initialised
	if (!V.weatherObj || Weather.sky?.loaded.value) return;

	Weather.activeRenderer = Weather.sky;
	Weather.sky.initialize();
});

$(document).one(":passagerender", () => {
	Weather.Thermometer.load();
});
