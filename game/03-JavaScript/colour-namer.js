function clamp255(val) {
	return val > 255 ? 255 : val < 0 ? 0 : val;
}

// apply___Filter functions are ported from WebKit implementation of CSS filters
// https://github.com/WebKit/webkit/blob/main/Source/WebCore/platform/graphics/texmap/TextureMapperShaderProgram.cpp

function applySepiaFilter(colour, amount) {
	amount = 1.0 - amount;
	return {
		r: clamp255((0.393 + 0.607 * amount) * colour.r + (0.769 - 0.769 * amount) * colour.g + (0.189 - 0.189 * amount) * colour.b),
		g: clamp255((0.349 - 0.349 * amount) * colour.r + (0.686 + 0.314 * amount) * colour.g + (0.168 - 0.168 * amount) * colour.b),
		b: clamp255((0.272 - 0.272 * amount) * colour.r + (0.534 - 0.534 * amount) * colour.g + (0.131 + 0.869 * amount) * colour.b),
	};
}

function applySaturateFilter(colour, amount) {
	return {
		r: clamp255((0.213 + 0.787 * amount) * colour.r + (0.715 - 0.715 * amount) * colour.g + (0.072 - 0.072 * amount) * colour.b),
		g: clamp255((0.213 - 0.213 * amount) * colour.r + (0.715 + 0.285 * amount) * colour.g + (0.072 - 0.072 * amount) * colour.b),
		b: clamp255((0.213 - 0.213 * amount) * colour.r + (0.715 - 0.715 * amount) * colour.g + (0.072 + 0.928 * amount) * colour.b),
	};
}

function applyHueRotateFilter(colour, amount) {
	const c = Math.cos((amount * Math.PI) / 180.0);
	const s = Math.sin((amount * Math.PI) / 180.0);
	return {
		r: clamp255(colour.r * (0.213 + c * 0.787 - s * 0.213) + colour.g * (0.715 - c * 0.715 - s * 0.715) + colour.b * (0.072 - c * 0.072 + s * 0.928)),
		g: clamp255(colour.r * (0.213 - c * 0.213 + s * 0.143) + colour.g * (0.715 + c * 0.285 + s * 0.14) + colour.b * (0.072 - c * 0.072 - s * 0.283)),
		b: clamp255(colour.r * (0.213 - c * 0.213 - s * 0.787) + colour.g * (0.715 - c * 0.715 + s * 0.715) + colour.b * (0.072 + c * 0.928 + s * 0.072)),
	};
}

function applyBrightnessFilter(colour, amount) {
	return { r: colour.r * amount, g: colour.g * amount, b: colour.b * amount };
}

function contrast(n, amount) {
	return clamp255((n - 128) * amount + 128);
}
function applyContrastFilter(colour, amount) {
	return {
		r: contrast(colour.r, amount),
		g: contrast(colour.g, amount),
		b: contrast(colour.b, amount),
	};
}

window.getCustomColourRGB = function (hue, saturation, brightness, contrast, sepia = 0) {
	let col = { r: 255, g: 0, b: 0 };
	col = applyHueRotateFilter(col, hue);
	col = applySaturateFilter(col, saturation);
	col = applyBrightnessFilter(col, brightness);
	col = applyContrastFilter(col, contrast);
	col = applySepiaFilter(col, sepia);
	return { r: clamp255(col.r), g: clamp255(col.g), b: clamp255(col.b) };
};
window.getCustomClothesColourCanvasFilter = function (hue, saturation, brightness, contrast, sepia = 0) {
	if (arguments.length === 1 && typeof arguments[0] === "string") {
		const match = parseCSSFilter(arguments[0]);
		if (!match) return clone(setup.colours.clothes_default);
		hue = +match[1];
		saturation = +match[2];
		brightness = +match[3];
		contrast = +match[4];
		sepia = +match[5];
	}
	let filterBrightness = 0.0;
	if (brightness >= 1.0) {
		// Slider brightness is 0..4, we consider 0..1 for colour spec
		// and everything above as extra brightness adjustment
		// In new renderer it's a shift, not multiplier, so we scale it from x1..x4 to +0..+0.21
		filterBrightness += (brightness - 1) * 0.07;
	}
	return Renderer.mergeLayerData(
		{
			blend: tinycolor(getCustomColourRGB(hue, saturation, brightness, contrast, sepia)).toHexString(),
			contrast,
			brightness: filterBrightness,
		},
		setup.colours.clothes_default
	);
};

// It's a copy of this function from dolls/battleTestControls/controls.js
window.rgbToHsv = function (colour) {
	let rr, gg, bb, h, s;
	const rabs = colour.r / 255;
	const gabs = colour.g / 255;
	const babs = colour.b / 255;
	const v = Math.max(rabs, gabs, babs);
	const diff = v - Math.min(rabs, gabs, babs);
	const diffc = c => (v - c) / 6 / diff + 1 / 2;
	const percentRoundFn = num => Math.round(num * 100) / 100;
	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rr = diffc(rabs);
		gg = diffc(gabs);
		bb = diffc(babs);

		if (rabs === v) {
			h = bb - gg;
		} else if (gabs === v) {
			h = 1 / 3 + rr - bb;
		} else if (babs === v) {
			h = 2 / 3 + gg - rr;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}
	return {
		h: Math.round(h * 360),
		s: percentRoundFn(s * 100),
		v: percentRoundFn(v * 100),
	};
};

// return [ match, hue, saturation, brightness, contrast, sepia ]
window.parseCSSFilter = function (filter) {
	// extract values from filter string
	const result = filter.match(
		/(?:filter: hue-rotate\((-?\d{1,3})(?:deg\))? *(?:saturate\()([\d.]+)\))? *(?:brightness\(([\d.]+)\))? *(?:contrast\(([\d.]+)\))? *(?:sepia\(([\d.]+)\))?/
	);
	if (result[1] === undefined) result[1] = 0;
	if (result[2] === undefined) result[2] = 1;
	if (result[3] === undefined) result[3] = 1;
	if (result[4] === undefined) result[4] = 1;
	if (result[5] === undefined) result[5] = 0;
	return result;
};

window.getCustomColourName = function (hue, saturation, brightness, contrast) {
	if (arguments.length === 1 && typeof arguments[0] === "string") {
		const match = parseCSSFilter(arguments[0]);
		if (!match) return "custom";

		hue = match[1];
		saturation = match[2];
		brightness = match[3];
		contrast = match[4];
	}

	const rgb = getCustomColourRGB(hue, saturation, brightness, contrast);
	T.customRGB = `rgb(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)});`;
	const hsv = rgbToHsv(rgb);

	// very specific colours
	if (hsv.h >= 6 && hsv.h <= 11 && hsv.s > 60 && hsv.s < 80 && hsv.v > 85) return "coral";
	else if (hsv.h >= 20 && hsv.h <= 45 && hsv.s > 25 && hsv.s < 45 && hsv.v > 90) return "sand";
	// general desaturated colours
	else if (hsv.v <= 30 && hsv.s <= 20) return "black";
	else if (hsv.s < 10 && hsv.v > 90) return "white";
	else if (hsv.s < 12) {
		if (hsv.v >= 70) return "light grey";
		else if (hsv.v >= 50) return "grey";
		else return "dark grey";
	}
	// full rainbow action
	else {
		let main, aux;

		if (hsv.h <= 8 || hsv.h >= 345) main = "red";
		else if (hsv.h <= 44) main = "orange";
		else if (hsv.h <= 55) main = "yellow";
		else if (hsv.h <= 66) main = "chartreuse";
		else if (hsv.h <= 74) main = "lime";
		else if (hsv.h <= 150) main = "green";
		else if (hsv.h <= 165) main = "aquamarine";
		else if (hsv.h <= 180) main = "cyan";
		else if (hsv.h <= 215) main = "blue";
		else if (hsv.h <= 245) main = "indigo";
		else if (hsv.h <= 260) main = "violet";
		else if (hsv.h <= 285) main = "purple";
		else if (hsv.h <= 315) main = "magenta";
		else main = "rose";

		if (hsv.s < 60 && hsv.v > 80) aux = "light";
		else if (hsv.v <= 50) aux = "dark";
		else if (
			hsv.v > 50 &&
			((hsv.h <= 100 && hsv.h >= 330 && hsv.s < 40) ||
				(hsv.h > 100 && hsv.h < 110 && hsv.s < 30) ||
				(hsv.h >= 100 && hsv.h < 150 && hsv.s < 20) ||
				(hsv.h >= 150 && hsv.h < 200 && hsv.s < 25) ||
				(hsv.h >= 200 && hsv.h < 330 && hsv.s < 30))
		)
			aux = "greyish";

		if (main === "orange" && (hsv.s < 70 || hsv.v < 70)) main = "brown";
		else if (main === "yellow" && hsv.v < 90) main = "brown";

		let colour = aux ? aux + " " + main : main;

		if (main === "brown" && (aux === "greyish" || aux === "light" || (hsv.s < 25 && hsv.v < 70))) colour = "beige";
		else if (colour === "greyish green" || (aux !== "light" && main === "chartreuse")) colour = "olive";
		else if (aux === "light" && (main === "red" || main === "rose" || main === "magenta")) colour = "pink";
		else if (colour === "dark indigo") colour = "navy";
		else if (colour === "dark cyan") colour = "teal";

		return colour;
	}
};
