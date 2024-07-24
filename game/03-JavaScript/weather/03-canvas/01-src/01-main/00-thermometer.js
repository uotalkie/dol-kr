Weather.Thermometer = (() => {
	const temperature = {
		min: 34,
		max: 40,
	};
	const clippingArea = {
		min: 4, // Minimum clipping from the bottom in pixels
		max: 0, // Maximum clipping from the top in pixels
	};
	const color = {
		min: "#000dff",
		mid: "#00ff91",
		max: "#ff0000",
		warn: "#ddff00",
	};
	const size = {
		scaleFactor: 2,
	};

	let thermometerCanvas = null;
	const images = {
		baseImg: { src: Weather.tempSettings.thermometer.base },
		fillImg: { src: Weather.tempSettings.thermometer.fill },
		upImg: { src: Weather.tempSettings.thermometer.upArrow },
		downImg: { src: Weather.tempSettings.thermometer.downArrow },
		constantImg: { src: Weather.tempSettings.thermometer.constant },
	};
	const element = $("<div />", { id: "characterTemperature" });
	const tooltipElement = $("<div />", { id: "characterTemperatureTooltip" });
	const loadPromises = [];
	const enabled = true;
	let allImagesLoaded = false;

	function load() {
		Object.entries(images).map(([key, imageInfo]) => {
			const promise = new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					images[key].img = img;
					resolve();
				};
				img.onerror = reject;
				img.src = imageInfo.src;
			});
			loadPromises.push(promise);
			return 0;
		});

		Promise.all(loadPromises).then(() => {
			thermometerCanvas = new BaseCanvas(0, 0, 0.5);
			const baseImg = images.baseImg.img;
			size.width = baseImg.width * size.scaleFactor;
			size.height = baseImg.height * size.scaleFactor;
			thermometerCanvas.element.width = size.width * 2;
			thermometerCanvas.element.height = size.height;
			thermometerCanvas.ctx.imageSmoothingEnabled = false;
			element.append(thermometerCanvas.canvas);
			allImagesLoaded = true;
			update();
		});
	}

	function update() {
		if (!allImagesLoaded) return;
		const normalisedTemperature = normalise(Weather.bodyTemperature, temperature.max, temperature.min);
		const usableHeight = size.height - clippingArea.min - clippingArea.max;
		const fillHeight = interpolate(clippingArea.min, usableHeight + clippingArea.min, normalisedTemperature);

		// Adjusted to range from -1 (temperature.min) through 0 (temperature.med) to 1 (temperature.max)
		const midTemperature = (temperature.max + temperature.min) / 2;
		let colorFactor = (Weather.bodyTemperature - midTemperature) / (temperature.max - midTemperature);
		colorFactor = Math.max(-1, Math.min(1, colorFactor));
		const fillColor = ColourUtils.interpolateTripleColor(color.min, color.mid, color.max, colorFactor);

		// Reset canvas on update
		thermometerCanvas.clear();
		thermometerCanvas.ctx.globalAlpha = 1;
		thermometerCanvas.ctx.globalCompositeOperation = "source-over";
		thermometerCanvas.ctx.fillStyle = fillColor;

		// Clip the fill image based on the temperature to make it look like its filling up
		thermometerCanvas.ctx.save();
		thermometerCanvas.ctx.beginPath();
		thermometerCanvas.ctx.rect(0, size.height - fillHeight, size.width, fillHeight);
		thermometerCanvas.ctx.clip();
		thermometerCanvas.ctx.drawImage(images.fillImg.img, 0, 0, size.width, size.height);
		thermometerCanvas.ctx.restore();

		// Recolour the fill
		thermometerCanvas.ctx.save();
		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.fillRect(0, size.height - fillHeight, size.width, fillHeight);
		thermometerCanvas.ctx.globalCompositeOperation = "source-over";
		thermometerCanvas.ctx.drawImage(images.baseImg.img, 0, 0, size.width, size.height);

		// Recolour the shell, but with a low opacity
		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.globalAlpha = 0.25;
		thermometerCanvas.ctx.fillRect(0, 0, size.width, size.height);
		thermometerCanvas.ctx.restore();

		// Add the up or down arrows
		const img =
			Weather.BodyTemperature.direction !== 0 && Math.abs(Weather.BodyTemperature.target - Weather.bodyTemperature) > 0.5
				? Weather.BodyTemperature.direction > 0
					? images.upImg.img
					: images.downImg.img
				: images.constantImg.img;
		thermometerCanvas.ctx.drawImage(img, 13, 2, img.width, img.height);
		if (Weather.BodyTemperature.direction !== 0 && Math.abs(Weather.BodyTemperature.target - Weather.bodyTemperature) > 0.5) {
			if (Weather.BodyTemperature.direction > 0) {
				thermometerCanvas.ctx.fillStyle = normalisedTemperature > 0.5 ? color.max : color.mid;
			} else {
				thermometerCanvas.ctx.fillStyle = normalisedTemperature <= 0.5 ? color.max : color.mid;
			}
		} else {
			thermometerCanvas.ctx.fillStyle =
				Weather.bodyTemperature > setup.WeatherTemperature.baseBodyTemperature - 1 &&
				Weather.bodyTemperature < setup.WeatherTemperature.baseBodyTemperature + 1
					? color.mid
					: color.warn;
		}
		thermometerCanvas.ctx.globalCompositeOperation = "source-atop";
		thermometerCanvas.ctx.fillRect(13, 2, img.width, img.height);

		Weather.Tooltips.thermometer();
	}

	return Object.create({
		element,
		tooltipElement,
		enabled,
		load,
		update,
	});
})();
