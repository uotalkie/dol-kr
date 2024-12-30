// @ts-check

/**
 * @param {object?} source The tree to traverse.
 * @param {string} key The key of the current source node.
 * @param {string[]} parents List of keys that when matched to a node's key traverses its children.
 * @param {function(object, key):object} callback
 * @returns {object}
 */
function traverse(source, key, parents, callback) {
	// Ensure node is setup correctly for later travesal or configuration
	const output = {};
	if (source == null) {
		return null;
	}
	Object.entries(source).forEach(([key, value]) => {
		const isParent = parents.includes(key) || key === "root";
		if (isParent) {
			const result = traverse(value, key, parents, callback);
			if (result == null) {
				return;
			}
			output[key] = result;
			return;
		}
		const result = callback(source, key);
		if (result == null) {
			return;
		}
		output[key] = result;
	});
	return output;
}
window.traverse = traverse;

/**
 * @param {object?} source The tree to traverse.
 * @param {object?} target The tree to compare with the source.
 * @param {string} key The key of the current source node.
 * @param {string[]} parents List of keys that when matched to a node's key traverses its children.
 * @param {function(object, object, key):object} callback
 * @returns {object}
 */
function traversePair(source, target, key, parents, callback) {
	// Ensure node is setup correctly for later travesal or configuration
	const output = {};
	if (source == null) {
		return null;
	}
	if (target == null) {
		return null;
	}
	Object.entries(source).forEach(([key, value]) => {
		const isParent = parents.includes(key) || key === "root";
		if (isParent) {
			const result = traversePair(value, target[key], key, parents, callback);
			if (result == null) {
				return;
			}
			output[key] = result;
			return;
		}
		const result = callback(source, target, key);
		if (result == null) {
			return;
		}
		output[key] = result;
	});
	return output;
}
window.traversePair = traversePair;
