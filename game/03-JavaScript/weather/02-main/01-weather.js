const Weather = (() => {
	/* Helper functions */

	function generateKeyPoints({ date, minKeys, maxKeys, timeApart, rangeValue, totalSteps }) {
		const numberOfKeyPoints = Weather.activeRenderer.rng.randomInt(minKeys - 1, maxKeys - 1);
		const keyPoints = new Map();

		while (keyPoints.size < numberOfKeyPoints) {
			const randomUnit = Weather.activeRenderer.rng.randomInt(timeApart + 1, totalSteps - timeApart);

			const isFarEnough = Array.from(keyPoints.keys()).every(kp => Math.abs(kp - randomUnit) >= timeApart);
			if (isFarEnough) {
				keyPoints.set(randomUnit, rangeValue(date));
			}
		}
		// Add the last key point
		keyPoints.set(totalSteps + 1, rangeValue(date));
		return new Map([...keyPoints.entries()].sort((a, b) => a[0] - b[0]));
	}

	function getSunIntensity(time) {
		time ??= Time.date;
		const sunIntensity = Weather.genSettings.months[time.month - 1].sunIntensity * Weather.activeRenderer?.orbitals.sun.getFactor(time);
		const weatherModifier = V.outside ? Weather.current.tanningModifier : 0;
		const locationModifier = V.location === "forest" ? 0.2 : 1;
		return V.outside ? Math.max(sunIntensity * weatherModifier * locationModifier, 0) : 0;
	}

	function setAccumulatedSnow(minutes) {
		const precipitationIntensity = Weather.type.precipitationIntensity;
		// Don't affect snow if override is set
		const temperature = Weather.temperature - (T.weatherOverride?.outside ?? 0);
		const snowfallRate = Weather.tempSettings.snow.snowfallRate;
		const meltingRate = Weather.tempSettings.snow.meltingRate;
		const maxSnow = Weather.tempSettings.snow.maxAccumulation;

		let accumulatedSnow = V.weatherObj.snow || 0;

		if (Weather.isFreezing && precipitationIntensity > 0) {
			// Accumulate snow
			accumulatedSnow += minutes * snowfallRate * precipitationIntensity;
			accumulatedSnow = Math.min(accumulatedSnow, maxSnow);
		} else if (temperature > 0) {
			// Melt snow
			accumulatedSnow -= minutes * meltingRate * temperature;
			accumulatedSnow = Math.max(accumulatedSnow, 0);
		}

		V.weatherObj.snow = Math.round(accumulatedSnow);
	}

	function setIceThickness(minutes) {
		// Don't affect ice if override is set
		const temperature = Weather.temperature - (T.weatherOverride?.outside ?? 0);
		const freezingRate = Weather.tempSettings.ice.freezingRate;
		const meltingRate = Weather.tempSettings.ice.meltingRate;
		const maxThickness = Weather.tempSettings.ice.maxThickness;
		for (const body of Object.keys(maxThickness)) {
			V.weatherObj.ice[body] = V.weatherObj.ice[body] || 0;
			if (Weather.isFreezing) {
				V.weatherObj.ice[body] += minutes * freezingRate * Math.abs(temperature);
				V.weatherObj.ice[body] = Math.min(V.weatherObj.ice[body], maxThickness[body]);
			} else if (temperature > 0) {
				V.weatherObj.ice[body] -= minutes * meltingRate * temperature;
				V.weatherObj.ice[body] = Math.max(V.weatherObj.ice[body], 0);
			}
			V.weatherObj.ice[body] = Math.round(V.weatherObj.ice[body]);
		}
	}

	return {
		generateKeyPoints,
		setAccumulatedSnow,
		setIceThickness,
		getSunIntensity,
		toFahrenheit: temperature => Weather.Temperature.toFahrenheit(temperature),
		toSelected: celsius => {
			return V.options.fahrenheit ? Weather.Temperature.toFahrenheit(celsius) : celsius;
		},
		toSelectedString: (celsius, decimals = 2) => {
			return V.options.fahrenheit ? `${round(Weather.Temperature.toFahrenheit(celsius), decimals)}°F` : `${round(celsius, decimals)}°C`;
		},
		setTemperature: temperature => Weather.Temperature.set(temperature),
		addTemperature: temperature => Weather.Temperature.add(temperature),
		set: (weatherType, instant, minutes) => Weather.WeatherGeneration.setWeather(weatherType, instant, minutes),
		get: date => Weather.WeatherGeneration.getWeather(date),
		is: weatherType => Weather.WeatherGeneration.isWeather(weatherType),
		isFrozen(key) {
			return V.weatherObj.ice[key] > Weather.tempSettings.ice.minThickness[key];
		},
		get genSettings() {
			return setup.WeatherGeneration;
		},
		get tempSettings() {
			return setup.WeatherTemperature;
		},
		get TooltipDescriptions() {
			return setup.WeatherDescriptions;
		},
		get weatherType() {
			if (Weather.bloodMoon) return "bloodMoon";
			return Weather.current;
		},
		get current() {
			return Weather.WeatherGeneration.getWeather();
		},
		get name() {
			return Weather.WeatherGeneration.getWeather().name;
		},
		get type() {
			return Weather.WeatherGeneration.getWeather().defines;
		},
		get value() {
			return Weather.WeatherGeneration.getWeather().defines.value;
		},
		get isOvercast() {
			return V.weatherObj.overcast > 0.5;
		},
		get overcast() {
			return V.weatherObj.overcast;
		},
		get sunIntensity() {
			return getSunIntensity();
		},
		get precipitation() {
			if (Weather.WeatherGeneration.getWeather().precipitationIntensity === 0) return "none";
			return Weather.isFreezing ? "snow" : "rain";
		},
		get precipitationIntensity() {
			return Weather.WeatherGeneration.getWeather().precipitationIntensity;
		},
		get temperature() {
			return Weather.Temperature.getCelsius();
		},
		get isFreezing() {
			return Weather.Temperature.isFreezing();
		},
		get isSnow() {
			return !Weather.skyDisabled && V.weatherObj.snow > setup.WeatherTemperature.snow.minAccumulation;
		},
		get insideTemperature() {
			return Weather.Temperature.getInsideTemperature();
		},
		get waterTemperature() {
			return Weather.Temperature.getWaterTemperature();
		},
		get bodyTemperature() {
			return Weather.BodyTemperature.get();
		},
		set bodyTemperature(value) {
			Weather.BodyTemperature.set(value);
		},
		get wetness() {
			return Weather.BodyTemperature.wetness;
		},
		get bloodMoon() {
			const sunRise = Weather.activeRenderer?.orbitals.bloodMoon?.settings.riseTime - 1;
			const sunSet = Weather.activeRenderer?.orbitals.bloodMoon?.settings.setTime + 1;
			return (Time.date.day === Time.date.lastDayOfMonth && Time.date.hour >= sunRise) || (Time.date.day === 1 && Time.date.hour < sunSet);
		},
		get dayState() {
			const sunRise = Weather.activeRenderer?.orbitals.sun.settings.riseTime;
			const sunSet = Weather.activeRenderer?.orbitals.sun.settings.setTime;
			const hour = Time.hour;
			return hour < sunRise - 0.75 || hour >= sunSet + 0.75 ? "night" : hour >= sunSet - 0.5 ? "dusk" : hour >= sunRise + 1 ? "day" : "dawn";
		},
		get skyState() {
			if (Weather.bloodMoon) return "bloodMoon";
			return this.dayState;
		},
		get fog() {
			return V.weatherObj.fog;
		},
		set fog(value) {
			V.weatherObj.fog = value;
			Weather.activeRenderer.drawLayers();
		},
		get lightsOn() {
			return !Weather.bloodMoon && (Time.hour >= setup.SkySettings.lightsTime.on || Time.hour < setup.SkySettings.lightsTime.off);
		},
		get starSeed() {
			if (!V.weatherObj.starSeed) {
				V.weatherObj.starSeed = btoa(Math.round(Math.random() * 10000) + 1000);
			}
			return V.weatherObj.starSeed;
		},
		set starSeed(value) {
			V.weatherObj.starSeed = value;
		},
		get activeRenderer() {
			return this._activeRenderer;
		},
		set activeRenderer(value) {
			this._activeRenderer = value;
		},
		Renderer: {},
	};
})();
window.Weather = Weather;
