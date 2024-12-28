class Transformations {
	static get defaults() {
		return Object.freeze({
			demon: {
				colour: { h: 275, s: 100, l: 30 },
			},
		});
	}
}
window.Transformations = Transformations;
