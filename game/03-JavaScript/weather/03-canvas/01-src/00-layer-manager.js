Weather.Renderer.Layers = (() => {
	const layers = new Map();

	function addLayer(params) {
		const optionalParams = {
			defaultParameters: {},
		};
		params = { ...optionalParams, ...params };

		if (layers.has(params.name)) {
			console.error(new Error(`Layer with name '${params.name}' already exists and will be overwritten.`));
		}

		if (!params.effects) {
			console.error(new Error(`Layer '${params.name} contain no effects.`));
			return;
		}

		const layer = new Weather.Renderer.Layer(params.name, params.blur, params.zIndex, params.animation);
		params.effects.map(p => layer.addEffect(p.effect, p.params, p.bindings, p.drawCondition, p.compositeOperation));
		layers.set(params.name, layer);

		return layer.loadPromises;
	}

	return {
		layers,
		add: addLayer,
	};
})();
