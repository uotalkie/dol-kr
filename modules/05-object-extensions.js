// Original: https://raw.githubusercontent.com/saikojosh/Object-Assign-Deep/master/objectAssignDeep.js
// Refactored and optimized by Xao 2024-01-18

/*
 * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
 *
 * You can control which properties to merge with an optional filter function.
 * Array merging can be set to concatenate arrays ('merge'), remove duplicates ('merge-deduplicate'), or replace (default).
 *
 *  * Examples:
 * // Use optional arrayBehaviour
 * obj1.deepMerge(obj2, "merge-deduplicate" });
 *
 * // Use filter to exclude number properties
 * obj1.deepMerge(obj2, (key, value) => typeof value !== "number");
 */

const ObjectAssignDeep = (function () {
	/*
	 * A unified way of returning a string that describes the type of the given variable.
	 */
	function getTypeOf(input) {
		return Object.prototype.toString.call(input).slice(8, -1).toLowerCase();
	}

	/*
	 * Branching logic which calls the correct function to clone the given value base on its type.
	 */
	function cloneValue(value) {
		switch (getTypeOf(value)) {
			case "object":
				return cloneObject(value);
			case "array":
				return value.map(cloneValue);
			case "date":
				return new Date(value.getTime());
			case "regexp":
				return new RegExp(value.source, value.flags);
			case "map":
				return new Map(value);
			case "set":
				return new Set(value);
			case "function":
				return value.bind({});
			default:
				return value;
		}
	}

	/*
	 * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
	 * its values cloned (i.e. references broken).
	 */
	function cloneObject(input) {
		return Object.keys(input).reduce((obj, key) => {
			obj[key] = cloneValue(input[key]);
			return obj;
		}, {});
	}

	function mergeObjects(target, source, options, filterFn, depth) {
		return Object.keys(source).reduce((obj, key) => {
			if (filterFn && !filterFn(key, source[key], depth)) return obj;
			obj[key] = getTypeOf(source[key]) === "object" ? mergeObjects(target[key] || {}, source[key], options, filterFn, depth + 1) : source[key];
			return obj;
		}, target);
	}

	function mergeArrays(target, source, options) {
		switch (options.arrayBehaviour) {
			case "merge-deduplicate":
				return Array.from(new Set(target.concat(source)));
			case "merge":
				return target.concat(source);
			default:
				return source.slice();
		}
	}

	function executeDeepMerge(target, objects, arrayBehaviour, filterFn, depth = 1) {
		objects.forEach(object => {
			Object.keys(object).forEach(key => {
				if (filterFn && !filterFn(key, object[key], depth)) return;

				const valueType = getTypeOf(object[key]);
				if (valueType === "object") {
					target[key] = mergeObjects(target[key] || {}, object[key], { arrayBehaviour }, filterFn, depth + 1);
				} else if (valueType === "array" && getTypeOf(target[key]) === "array") {
					target[key] = mergeArrays(target[key], object[key], { arrayBehaviour });
				} else {
					target[key] = cloneValue(object[key]);
				}
			});
		});
		return target;
	}

	return { executeDeepMerge };
})();

Object.defineProperty(Object.prototype, "deepMerge", {
	configurable: true,
	writable: true,
	value(...objects) {
		const lastArg = objects[objects.length - 1];
		const arrayBehaviour = typeof lastArg === "string" ? objects.pop() : "replace";
		const filterFn = typeof objects[objects.length - 1] === "function" ? objects.pop() : null;

		return ObjectAssignDeep.executeDeepMerge(this, objects, arrayBehaviour, filterFn);
	},
});

/**
 * Alias to deepMerge, but with no arguments, and returns the copied object
 * Usage: const newObj = objToCopy.deepCopy();
 */
Object.defineProperty(Object.prototype, "deepCopy", {
	configurable: true,
	writable: true,
	value(object) {
		return ObjectAssignDeep.executeDeepMerge({}, [this], "replace", null);
	},
});

/**
 * Searches for a value in a nested object
 * Works similar to Array find() method, but for nested objects
 *
 * @param {Function} callbackFn Criteria it needs to match
 * @returns {*} The value of the first element in the object that matches the above criteria
 * @example
 * const myObject = {
 *   level1: {
 *     level2: {
 *       level3: "value1"
 *     },
 *     anotherKey: {
 *       level3: "value2"
 *     }
 *   }
 * };
 *
 * const foundValue = myObject.find((key, value) => key === 'level2');
 * Returns Object { level3: "value1" }
 * 
 * const foundValue = myObject.find((key, value) => value.level3 === "value2");
 * Returns Object { level3: "value2" }
 */
Object.defineProperty(Object.prototype, "find", {
	configurable: true,
	writable: true,
	value(callbackFn) {
		const search = obj => {
			for (const [key, value] of Object.entries(obj)) {
				if (callbackFn(key, value)) {
					return value;
				}
				if (typeof value === "object" && value !== null) {
					const result = search(value);
					if (result) return result;
				}
			}
		};
		return search(this);
	},
});

/**
 * Recursively clears non-object properties from an object
 * Works on objects nested at any depth
 *
 * @example
 *  V.daily = {
 *	   	school: { attended: { var1: 1 } },
 *	   	whitney: { var1: 1 },
 *	   	robin: { var1: 1 },
 *		kylar: { var1: 1 },
 *		morgan: { var1: 1 },
 *		eden: { var1: 1 },
 *		alex: { var1: 1 },
 *		sydney: { var1: 1 },
 *		ex: { var1: 1 },
 *		pharm: { var1: 1 },
 *		prison: { var1: 1 },
 *		livestock: { var1: 1 },
 *  }
 *
 * V.daily.clearProperties();
 * // Will clear all properties recursively but keep the objects intact
 */
Object.defineProperty(Object.prototype, "clearProperties", {
	configurable: true,
	writable: true,
	value() {
		const clearProperties = obj => {
			for (const key in obj) {
				if (Object.hasOwn(obj, key)) {
					if (typeof obj[key] === "object" && obj[key] !== null) {
						clearProperties(obj[key]);
					} else if (typeof obj[key] !== "object") {
						delete obj[key];
					}
				}
			}
		};
		clearProperties(this);
	}
});
