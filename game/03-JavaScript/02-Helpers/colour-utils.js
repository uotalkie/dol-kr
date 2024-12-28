/**
 * Dev note:
 * Wanted to write a module that wasn't pulled from somewhere external.
 * This is more easily manageable at least from my view. But I did write it.
 */
const ColourUtils = (() => {
	/**
	 * Conversion helper object
	 * This is an object to contain the data used to calculate
	 * the different colour format values, so we don't need to
	 * recalculate at every step.
	 *
	 * Otherwise we would have many property variables up here,
	 * and they would be prone to state changes, and possible
	 * cascading errors.
	 */
	class ConversionObject {
		constructor(rgb) {
			/* Enforce proper RGB object by default. */
			this.rgb = Object.assign({}, { r: 0, g: 0, b: 0 }, rgb);
			this.rNorm = Math.clamp(this.rgb.r, 0, 255) / 255;
			this.gNorm = Math.clamp(this.rgb.g, 0, 255) / 255;
			this.bNorm = Math.clamp(this.rgb.b, 0, 255) / 255;
			this.cMax = Math.max(this.rNorm, this.gNorm, this.bNorm);
			this.cMin = Math.min(this.rNorm, this.gNorm, this.bNorm);
			this.delta = this.cMax - this.cMin;
		}
	}

	function getHue(rgb) {
		/* Enforce proper RGB object by default. */
		rgb = Object.assign({}, { r: 0, g: 0, b: 0 }, rgb);
		const helper = rgb instanceof ConversionObject ? rgb : new ConversionObject(rgb);
		if (helper.delta === 0) {
			return 0;
		}
		let deg = 0;
		switch (helper.cMax) {
			case helper.rNorm:
				deg = 60 * (((helper.gNorm - helper.bNorm) / helper.delta) % 6);
				break;
			case helper.gNorm:
				deg = 60 * ((helper.gNorm - helper.rNorm) / helper.delta + 2);
				break;
			case helper.bNorm:
				deg = 60 * ((helper.rNorm - helper.gNorm) / helper.delta + 4);
				break;
		}
		if (deg < 0) deg += 360; /*  */
		return deg;
	}

	function getSaturation(rgb) {
		/* Enforce proper RGB object by default. */
		rgb = Object.assign({}, { r: 0, g: 0, b: 0 }, rgb);
		const helper = rgb instanceof ConversionObject ? rgb : new ConversionObject(rgb);
		if (helper.delta === 0) return 0;
		const demoninator = 1 - Math.abs(2 * getLight(helper) - 1);
		if (demoninator === 0) return 100;
		return (helper.delta / demoninator) * 100;
	}

	function getLight(rgb) {
		/* Enforce proper RGB object by default. */
		rgb = Object.assign({}, { r: 0, g: 0, b: 0 }, rgb);
		const helper = rgb instanceof ConversionObject ? rgb : new ConversionObject(rgb);
		return (helper.cMax + helper.cMin) * 50;
	}

	function hexToInt(hex) {
		if (!hex.startsWith("0x")) {
			hex = "0x" + hex;
		}
		return Number.parseInt(hex);
	}

	function invertInt(num) {
		return num ^ 0xffffff;
	}

	function intToHex(num) {
		let str = num.toString(16);
		for (let i = str.length; i < 6; i++) {
			str = "0" + str;
		}
		return str;
	}

	function invertHex(hex) {
		return intToHex(invertInt(hexToInt(hex)));
	}

	function rgbToHex(rgb) {
		rgb = Object.assign({}, { r: 0, g: 0, b: 0 }, rgb);
		const convert = num => {
			const str = num.toString(16);
			return str.length === 1 ? "0" + str : str;
		};
		const r = convert(rgb.r);
		const g = convert(rgb.g);
		const b = convert(rgb.b);
		return r + g + b;
	}

	function rgbToHsl(rgb) {
		if (typeof rgb === "string") {
			/* Extracts each segment of a hex colour string (#ffee00), ff is the red segment, ee is the green segment and 00 is the blue segment. */
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb);
			if (result) {
				rgb = {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				};
			}
		}
		if (typeof rgb !== "object") {
			return null;
		}
		return {
			h: getHue(rgb),
			s: getSaturation(rgb),
			l: getLight(rgb),
		};
	}

	function toHslString(hsl, fallback = "hsl(0, 100%, 50%)") {
		if (!hsl) return fallback;
		return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
	}

	function hslToFilter(hsl) {
		if (!hsl) return "hue-rotate(0deg) saturate(100%) brightness(100%) contrast(100%);";
		return `hue-rotate(${hsl.h}deg) saturate(${hsl.s}%) brightness(${hsl.l}%) contrast(100%) sepia(0);`;
	}

	function partToFilter(part, fallback = { h: 0, s: 100, l: 50 }) {
		/* This will clone all properties into {}, allowing modification without consequence to the top properties. (h, s, and l) */
		const hsl = Object.assign({}, fallback, part);
		hsl.l *= 4;
		return hslToFilter(hsl);
	}

	/**
	 *
	 * @param {string} color
	 * @returns {string} hex
	 */
	function cssColorToHex(color) {
		color = color.toLowerCase();
		// Variables
		color = getComputedStyle(document.documentElement).getPropertyValue(color).trim() || color;

		// Named
		if (tinycolor.names[color]) {
			return `#${tinycolor.names[color]}`;
		}

		// Hex format (3 or 6 characters)
		if (/^#([a-fA-F0-9]{3}){1,2}$/.test(color)) {
			return color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` : color;
		}

		// hsl or hsla format
		if (/^hsl(a?)\(/.test(color)) {
			try {
				const hexColor = tinycolor().toHexFromHsl(color);
				return hexColor;
			} catch (error) {
				console.error(`Error converting HSL to Hex: ${error.message}`);
				return undefined;
			}
		}

		console.error(`Invalid color: ${color}.`);
		return undefined;
	}

	/**
	 * Interpolates between 2 colors, based on a factor
	 *
	 * @param {string} color1
	 * @param {string} color2
	 * @param {string} factor
	 * @returns {string}
	 */
	function interpolateColor(color1, color2, factor) {
		factor = Math.max(0, Math.min(factor, 1));

		// Convert hex colors to RGBA
		const parseColor = color => {
			const rgb = parseInt(color.slice(1, 7), 16);
			const r = (rgb >> 16) & 0xff;
			const g = (rgb >> 8) & 0xff;
			const b = rgb & 0xff;
			const a = color.length > 7 ? parseInt(color.slice(7), 16) / 255 : 1; // Normalize alpha to [0, 1]
			return [r, g, b, a];
		};

		const [r1, g1, b1, a1] = parseColor(color1);
		const [r2, g2, b2, a2] = parseColor(color2);

		// Interpolate RGBA
		const r = Math.round(r1 + (r2 - r1) * factor);
		const g = Math.round(g1 + (g2 - g1) * factor);
		const b = Math.round(b1 + (b2 - b1) * factor);
		const a = Math.round((a1 + (a2 - a1) * factor) * 255); // Denormalize alpha to [0, 255]

		// Convert each component to a two-digit hexadecimal string and concatenate
		let hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

		// Append alpha to hex string only if it's less than full opacity
		if (a < 255) {
			hex += a.toString(16).padStart(2, "0");
		}

		return hex;
	}

	/**
	 * Interpolates between 3 colors, based on a factor
	 * - If factor is negative, interpolates between color1 and color2.
	 * - If factor is positive, interpolates between color2 and color3.
	 *
	 * @param {string} color1
	 * @param {string} color2
	 * @param {string} color3
	 * @param {string} factor
	 * @returns {string}
	 */
	function interpolateTripleColor(color1, color2, color3, factor) {
		if (factor < 0) {
			return interpolateColor(color2, color1, Math.abs(factor));
		} else {
			return interpolateColor(color2, color3, factor);
		}
	}

	/**
	 * Interpolates between multiple colors, based on a factor
	 *
	 * @param {Array<string>} colors Array of hex colors (e.g., ['#ff0000', '#00ff00', '#0000ff'])
	 * @param {number} factor
	 * @returns {string}
	 */
	function interpolateMultiple(colors, factor) {
		factor = Math.max(0, Math.min(factor, 1));

		if (colors.length === 1) {
			return cssColorToHex(colors[0]);
		}

		const numSegments = colors.length - 1;
		const segmentFactor = factor * numSegments;
		const lowerIndex = Math.floor(segmentFactor);
		const upperIndex = Math.min(lowerIndex + 1, colors.length - 1);
		const localFactor = segmentFactor - lowerIndex;

		return interpolateColor(cssColorToHex(colors[lowerIndex]), cssColorToHex(colors[upperIndex]), localFactor);
	}

	/* Export module */
	return Object.seal({
		partToFilter,
		hslToFilter,
		toHslString,
		hexToInt,
		rgbToHsl,
		invertInt,
		rgbToHex,
		intToHex,
		invertHex,
		interpolateColor,
		interpolateTripleColor,
		interpolateMultiple,
	});
})();

Object.defineProperty(window, "ColourUtils", {
	get: () => ColourUtils,
});
