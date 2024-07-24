Weather.Renderer.Effects = (() => {
	const effects = new Map();

	function addEffect(params) {
		const optionalParams = {
			defaultParameters: {},
		};
		params = { ...optionalParams, ...params };

		if (effects.has(params.name)) {
			console.error("Effects", `Effect with name '${params.name}', already exists, and will be overwritten.`);
		}
		effects.set(params.name, params);
	}

	return {
		effects,
		add: addEffect,
	};
})();
