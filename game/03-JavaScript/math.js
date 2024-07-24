/**
 * Interpolates between two objects, obj1 and obj2, based on a given factor
 * If a property is a number and exists in both objects, it interpolates the values
 * The result includes all properties from both objects
 * Non-numeric properties and properties not shared between objects are copied as is
 *
 * @param {object} obj1 The first object
 * @param {object} obj2 The second object
 * @param {number} factor The interpolation factor (0 to 1).
 * @returns {object} A new object with interpolated number values and other properties from both obj1 and obj2
 */
function interpolateObject(obj1, obj2, factor) {
	const result = {};

	for (const key in obj1) {
		if (Object.hasOwn(obj1, key)) {
			if (typeof obj1[key] === "number" && Object.hasOwn(obj2, key) && typeof obj2[key] === "number") {
				result[key] = interpolate(obj1[key], obj2[key], factor);
			} else if (typeof obj1[key] === "object" && Object.hasOwn(obj2, key) && typeof obj2[key] === "object") {
				result[key] = interpolateObject(obj1[key], obj2[key], factor);
			} else {
				result[key] = obj1[key];
			}
		}
	}

	for (const key in obj2) {
		if (Object.hasOwn(obj2, key) && !Object.hasOwn(result, key)) {
			result[key] = obj2[key];
		}
	}
	return result;
}

window.interpolateObject = interpolateObject;

/**
 * Linearly interpolates between two values based on a given factor
 *
 * @param {number} value1
 * @param {number} value2
 * @param {number} factor Interpolation factor (0 to 1)
 * @returns {number}
 */
function interpolate(value1, value2, factor) {
	return value1 + (value2 - value1) * factor;
}
window.interpolate = interpolate;

function lerp(percent, start, end) {
	return Math.clamp(start + (end - start) * percent, start, end);
}
window.lerp = lerp;

function inverseLerp(value, start, end) {
	return Math.clamp((value - start) / (end - start), 0, 1);
}
window.inverseLerp = inverseLerp;

function formatDecimals(value, decimalPlaces) {
	return Number(Math.round(parseFloat(value + "e" + decimalPlaces)) + "e-" + decimalPlaces);
}
window.formatDecimals = formatDecimals;

function nCr(n, r) {
	// https://stackoverflow.com/questions/11809502/which-is-better-way-to-calculate-ncr
	if (r > n - r) {
		// because C(n, r) == C(n, n - r)
		r = n - r;
	}

	let ans = 1;
	for (let i = 1; i <= r; ++i) {
		ans *= n - r + i;
		ans /= i;
	}

	return ans;
}
window.nCr = nCr;

/**
 * Checks if x is equal or higher than min and lower or equal to max
 *
 * @param {number} x
 * @param {any} min
 * @param {any} max
 * @returns {boolean}
 */
function between(x, min, max) {
	return typeof x === "number" && x >= min && x <= max;
}
window.between = between;

/**
 * This function takes a value, and weights it by exponential curve.
 *
 * Value should be between 0.0 and 1.0 (use normalise to get a percentage of a max).
 *
 * An exponent of 1.0 returns 1 every time.
 *
 * Exponents between 1.0 and 2.0 return a curve favoring higher results (closer to 1)
 *
 * An exponent of 2.0 will return a flat line distribution, and is identical to random()
 *
 * Exponents greater than 2.0 return a curve favoring lower results (closer to 0), reaching to 0 at infinity.
 *
 * For example, see:
 * https://www.desmos.com/calculator/87hhrjfixi
 *
 * @param {number} value Value to be weighted
 * @param {number} exp Exponent used to generate the curve
 * @returns {number} value weighted against exponential curve
 */
function expCurve(value, exp) {
	return value ** exp / value;
}
window.expCurve = expCurve;

/**
 * This function creates a random float 0.0-1.0, weighted by exponential curve.
 *
 * A value of 1.0 returns 1 every time.
 *
 * Values between 1.0 and 2.0 return a curve favoring higher results (closer to 1)
 *
 * A value of 2.0 will return a flat line distribution, and is identical to random()
 *
 * Values greater than 2.0 return a curve favoring lower results (closer to 0), reaching to 0 at infinity.
 *
 * For example, see:
 * https://www.desmos.com/calculator/87hhrjfixi
 *
 * @param {number} exp Exponent used to generate the curve
 * @returns {number} random number weighted against exponential curve
 */
function randomExp(exp) {
	return expCurve(State.random(), exp);
}
window.randomExp = randomExp;

/**
 * Normalises value to a decimal number 0.0-1.0, a percentage of the range specified in min and max.
 *
 * @param {number} value The value to be normalised
 * @param {number} max The highest value of the range
 * @param {number} min The lowest value of the range, default 0
 * @returns {number} Normalised value
 */
function normalise(value, max, min = 0) {
	const denominator = max - min;
	if (denominator === 0) {
		Errors.report("[normalise]: min and max params must be different.", { value, max, min });
		return 0;
	}
	if (denominator < 0) {
		Errors.report("[normalise]: max param must be greater than min param.", { value, max, min });
		return 0;
	}
	return Math.clamp((value - min) / denominator, 0, 1);
}
window.normalise = normalise;

/**
 * Returns a rounded number, with number of decimals based on the second parameter
 *
 * @param {number} number
 * @param {number} decimals
 * @returns {number} new number
 */
function round(number, decimals) {
	const multiplier = 10 ** decimals;
	return Math.round(number * multiplier) / multiplier;
}
window.round = round;

/**
 * Categorises a value into a specified number of categories based on its position within a given range.
 * The function automatically handles both ascending (min < max) and descending (min > max) ranges.
 *
 * @param {number} value The value to be categorized.
 * @param {number} min The start of the range.
 * @param {number} max The end of the range.
 * @param {number} parts The number of categories into which the range should be divided.
 * @returns {number} Returns the category index, ranging from 0 to parts-1.
 * Examples:
 *  categorise(15, 10, 20, 4);
 *  Result: 2
 *  Divides the range 10-20 into 4 parts, and 15 falls into the third part. (First part is 0)
 *
 *  categorise(15, 20, 10, 4);
 *  Result: 1
 *  Divides the range 20-10 into 4 parts, and 15 falls into the second part.
 *
 *  categorise(5, 0, 10, 5);
 *  Result: 0
 *  Divides the range 0-10 into 5 parts, and 5 falls right on the border of the first and second part but is rounded down.
 *
 *  categorise(18, 20, 10, 5);
 *  Result: 3
 *  Divides the range 20-10 into 5 parts, and 18 falls into the fourth part.
 */
function categorise(value, min, max, parts) {
	const normalised = normalise(value, Math.max(min, max), Math.min(min, max));
	const category = Math.floor(normalised * parts);
	return Math.clamp(min > max ? parts - 1 - category : category, 0, parts - 1);
}
window.categorise = categorise;

/**
 * Generates a random number within a specified range around a given base number.
 *
 * @param {number} num The base number.
 * @param {number} min The minimum offset subtracted from the base number.
 * @param {number} max The maximum offset added to the base number.
 * @returns {number} A random number between `num - min` and `num + max`.
 */
function boundedRandom(num, min, max) {
	const lowerBound = num - min;
	const upperBound = num + (max ?? min);
	return round(randomFloat(lowerBound, upperBound), 2);
}
window.boundedRandom = boundedRandom;

/**
 * Generates a random integer based on chance and max value
 *
 * @param {number} chance Value between 0 and 1
 * @param {number} max Integer
 */
function calculateBinomial(chance, max) {
	let result = 0;
	for (let i = 0; i < max; i++) {
		if (State.random() < chance) {
			result++;
		}
	}
	return result;
}
window.calculateBinomial = calculateBinomial;
