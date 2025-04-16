// @ts-check

class MultiCanvasModel {
	/**
	 * @param {string} key
	 * @param {string} id
	 * @param {string} slot
	 * @returns {MultiCanvasModel}
	 */
	static create(key, id, slot) {
		const model = CanvasModel.create(id, slot);
		model.options = model.defaultOptions();
		const multi = new MultiCanvasModel(slot, model);
		this.ensureStorage();
		T.multiCombatModels[key] = multi;
		return multi;
	}

	static ensureStorage() {
		if (T.multiCombatModels != null && typeof T.multiCombatModels === "object") {
			return;
		}
		T.multiCombatModels = {};
	}

	/**
	 * @param {string} slot
	 * @param {CanvasModel} model
	 * @param {boolean=} isAnimated
	 */
	constructor(slot, model, isAnimated = true) {
		// Setup defaults
		this.models = {
			[slot]: model,
		};
		this.layers = [];
		this.canvas = model.createCanvas(!isAnimated);
		this.animatingCanvas = null;
		this.width = model.width;
		this.height = model.height;
		this.animated = isAnimated;
		this.listener = Renderer.defaultListener;
	}

	/**
	 * @param {string} id
	 * @param {string} slot
	 * @param {object=} metadata
	 */
	add(id, slot, metadata) {
		const model = CanvasModel.create(id, slot);
		model.options = model.defaultOptions();
		model.metadata = metadata;
		this.models[slot] = model;
		// Maybe check these newly added models with the first model configuration?
		// Perhaps someone may have messed up widths and heights accidentally?
		return model;
	}

	/**
	 * @param {CanvasRenderingContext2D} context
	 */
	setCanvasContext(context) {
		this.canvas = context;
	}

	compile() {
		this.layers = [];
		// Compile all models
		// At end, compile layers into central variable.
		const models = this.models;
		for (const slot in models) {
			if (!Object.hasOwn(models, slot)) {
				continue;
			}
			const model = models[slot];
			const layers = model.compile(Object.assign(model.options, model.metadata));
			this.layers.push(...layers);
		}
		return this.layers;
	}

	/**
	 * @param {Renderer.RendererListener=} listener
	 */
	animate(listener) {
		this.animated = true;
		if (listener != null) this.listener = listener;
		this.redraw();
	}

	/**
	 * @param {Renderer.RendererListener=} listener
	 */
	play(listener) {
		this.animated = false;
		if (listener != null) this.listener = listener;
		this.redraw();
	}

	/**
	 * Recompiles the canvas models' layers, and schedules them on the renderer system.
	 */
	redraw() {
		if (!this.canvas) {
			Errors.report("MultiCanvasModel.redraw() called but model was never rendered!");
			return;
		}
		if (this.animated) {
			this.animatingCanvas = Renderer.animateLayers(this.canvas, this.compile(), this.listener, true);
			return;
		}
		return Renderer.composeLayers(this.canvas, this.compile(), this.canvas.canvas.width / this.width, this.listener);
	}

	reset() {
		const models = this.models;
		for (const slot in models) {
			if (!Object.hasOwn(models, slot)) {
				continue;
			}
			const model = models[slot];
			model.reset();
			model.options = model.defaultOptions();
			model.preprocess(model.options);
		}
	}

	refresh() {
		this.reset();
		this.redraw();
	}

	refreshAnimation() {
		if (this.animatingCanvas == null) {
			return;
		}
		this.animatingCanvas.invalidateCaches();
		this.animatingCanvas.redraw();
	}
}
/** @type {string} */
MultiCanvasModel.debugLastInit = "Unspecified";
// @ts-ignore
window.MultiCanvasModel = MultiCanvasModel;

Macro.add("setup-multi-canvas", {
	handler() {
		const key = this.args[0];
		const id = this.args[1];
		const slot = this.args[2];
		MultiCanvasModel.ensureStorage();
		if (key in T.multiCombatModels) {
			Errors.report("MultiCanvasModel already exists: Likely due to two animateCombat uses in the same passage", {
				key,
				stack: Utils.GetStack(),
				last: MultiCanvasModel.debugLastInit,
			});
		}
		MultiCanvasModel.debugLastInit = Utils.GetStack();
		const model = MultiCanvasModel.create(key, id, slot);
		this.output.append(model.canvas.canvas);
	},
});

Macro.add("add-multi-canvas", {
	handler() {
		const key = this.args[0];
		const id = this.args[1];
		const slot = this.args[2];
		const metadata = this.args[3];
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels[key];
		if (model == null) {
			Errors.report("No MultiCanvasModel found with given key.", {
				key,
			});
			return;
		}
		model.add(id, slot, metadata);
	},
});

Macro.add("start-multi-canvas-rendering", {
	handler() {
		const key = this.args[0];
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels[key];
		if (model == null) {
			Errors.report("No MultiCanvasModel found with given key.", {
				key,
			});
			return;
		}
		if (!V.options.combatAnimations) {
			model.play();
			return;
		}
		model.animate();
	},
});

Macro.add("reset-multi-canvas", {
	handler() {
		const key = this.args[0];
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels[key];
		if (model == null) {
			Errors.report("No MultiCanvasModel found with given key.", {
				key,
			});
			return;
		}
		model.reset();
	},
});

Macro.add("refresh-multi-canvas", {
	handler() {
		const key = this.args[0];
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels[key];
		if (model == null) {
			Errors.report("No MultiCanvasModel found with given key.", {
				key,
			});
			return;
		}
		model.refresh();
	},
});
