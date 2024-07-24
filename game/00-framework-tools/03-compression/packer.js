/*
	Simple data packer to compress all weather variables into a single integer
*/
const Packer = (() => {
	// Helper function to pad numbers with leading zeros
	function pad(number, width) {
		const numberStr = number.toString();
		return numberStr.length >= width ? numberStr : new Array(width - numberStr.length + 1).join("0") + numberStr;
	}

	function packWeatherData() {
		const overcast = pad(Math.round(Weather.overcast * 100), 3);
		const fog = pad(Math.round(Weather.fog * 100), 3);
		const snow = pad(V.weatherObj.snow, 3);
		const weatherIndex = pad(
			setup.WeatherGeneration.weatherTypes.findIndex(weatherType => weatherType.name === V.weatherObj.name),
			2
		);

		const packedData = weatherIndex + fog + snow + overcast;

		return parseInt(packedData, 10).toString(36); // Base 36
	}

	function unpackWeatherData(packedData) {
		packedData = parseInt(packedData, 36).toString(10).padStart(11, '0'); // Ensure the string is zero-padded to 11 digits

		const overcast = parseInt(packedData.slice(-3), 10) / 100;
		const snow = parseInt(packedData.slice(-6, -3), 10);
		const fog = parseInt(packedData.slice(-9, -6), 10) / 100;
		const weatherIndex = parseInt(packedData.slice(0, 2), 10);

		V.weatherObj.overcast = overcast;
		V.weatherObj.snow = snow;
		V.weatherObj.fog = fog;
		T.baseTemperature = snow > 15 ? -20 : 20;
		const weatherName = setup.WeatherGeneration.weatherTypes[weatherIndex].name;
		Weather.set(weatherName);
	}

	return {
		packWeatherData,
		unpackWeatherData,
	};
})();
window.Packer = Packer;
