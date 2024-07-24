// @ts-check

/**
 * Normalises Sydney's love stat, if 150 love, and max is 150,
 * will output 1.0.
 *
 * @returns {number} Between 0.0 and 1.0
 */
function getSydneyLoveNorm() {
	const sydney = C.npc.Sydney;
	const value = sydney.love;
	const max = 150; // This desperately needs to be a constant somewhere
	return normalise(value, max);
}
window.getSydneyLoveNorm = getSydneyLoveNorm;
