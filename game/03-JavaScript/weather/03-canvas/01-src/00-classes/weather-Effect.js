Weather.Renderer.Effect = class Effect {
	constructor(effect, condition, compositeOperation, params) {
		this.params = params ?? {};
		this.id = params.id;
		this.onInit = effect.init;
		this.onDraw = effect.draw;
		this.onEnable = effect.onEnable;
		this.onDisable = effect.onDisable;
		this.parentLayer = effect.parentLayer;
		this.drawCondition = condition || (() => true);
		this.compositeOperation = compositeOperation || "source-over";
		this.images = {};
		this.imagePaths = this.params.images || effect.images;
		this.initPromise = null;
		this.alpha = this.params.alpha ?? 1;
		this.deepMerge(effect.defaultParameters, this.params);
		this.previousDrawCondition = true;

		// Add sub-effects
		this.effects = [];
		if (effect.effects) {
			let id = 1;
			effect.effects.forEach(p => {
				const childId = [...this.id, id];
				this.addEffect(p.effect, p.params, p.bindings, p.drawCondition, childId);
				id++;
			});
		}
	}

	/**
	 * Set the renderer only after the effect has been added
	 *
	 * @param {Weather.Renderer.Sky} renderer Sky renderer instance
	 */
	setRenderer(renderer) {
		this.renderInstance = renderer;
		this.canvas = new this.renderInstance.Canvas();
		for (const effect of this.effects) {
			effect.setRenderer(renderer);
		}
	}

	/**
	 * Binds a getter function to a property on the effect.
	 *
	 * @param {Function} getter Getter function
	 * @param {string} prop Property name
	 */
	bind(getter, prop) {
		Object.defineProperty(this, prop, {
			get: getter,
		});
	}

	/**
	 * Loads all images specified in the effect's image paths.
	 *
	 * @returns {Promise} A promise that resolves when all images are loaded.
	 */
	loadImages() {
		let imageLoadPromises = [];

		if (this.imagePaths && Object.keys(this.imagePaths).length > 0) {
			imageLoadPromises = Object.keys(this.imagePaths).map(name => {
				return new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = () => {
						this.images[name] = img;
						resolve(img);
					};
					img.onerror = () => reject(new Error(`Could not load image ${name} at path ${this.imagePaths[name]}`));
					img.src = this.imagePaths[name];
				});
			});
		}

		// Load images for subeffects
		const subEffectsImageLoadPromises = this.effects.map(subEffect => subEffect.loadImages());
		return Promise.all([...imageLoadPromises, ...subEffectsImageLoadPromises]);
	}

	/**
	 * Allows adding of sub-effects recursively
	 *
	 * @param {string} effectName The name of the effect to add
	 * @param {object} params Parameters for the sub-effect
	 * @param {object} bindings Bindings for the sub-effect
	 * @param {Function} condition Condition function for the sub-effect
	 * @param {Array} parentIdArray The ID array of the parent effect
	 */
	addEffect(effectName, params, bindings, condition, parentIdArray) {
		const effectConfig = Weather.Renderer.Effects.effects.get(effectName);
		if (!effectConfig) {
			console.error(new Error(`Could not add effect '${effectName}'.`));
			return;
		}
		effectConfig.parentLayer = this.parentLayer;

		// Don't override any of the functions
		params = params ?? {};
		params.deepMerge(this.params, (_, value) => typeof value !== "function");
		params.id = [...parentIdArray];
		const newEffect = new Weather.Renderer.Effect(effectConfig, condition, null, params);
		this.effects.push(newEffect);

		if (bindings) {
			for (const [prop, getter] of Object.entries(bindings)) {
				newEffect.bind(getter.bind(this), prop);
			}
		}
	}

	/**
	 * Initializes the effect. This method should be called before draw().
	 * It ensures all sub-effects are initialized and executes the effect's custom init logic
	 *
	 * @returns {Promise} A promise that resolves when the init is complete
	 */
	async init() {
		this.initPromise = (async () => {
			if (this.onInit) {
				try {
					const result = this.onInit();
					if (result instanceof Promise) {
						await result;
					}
				} catch (e) {
					console.log("p1", this);
					console.error("Error during effect '", this.parentLayer.name, "' init function. Error:", e.target ?? e);
				}
			}

			// Run subEffect init after the main init
			for (const subEffect of this.effects) {
				await subEffect.init();
			}
		})();

		return this.initPromise;
	}

	/**
	 * Draws the effect onto its canvas.
	 * It will wait for the init to complete before drawing - to assure any images loaded in init will be drawn
	 *
	 * @param canvas
	 * @param layerCanvas
	 */
	draw(canvas, layerCanvas) {
		this.canvas.clear();
		const currentDrawCondition = this.drawCondition();
		if (currentDrawCondition && !this.previousDrawCondition) {
			this.onEnable?.();
		} else if (!currentDrawCondition && this.previousDrawCondition) {
			this.onDisable?.();
		}
		this.previousDrawCondition = currentDrawCondition;

		if (!currentDrawCondition) {
			return;
		}

		try {
			this.canvas.ctx.save();
			this.onDraw(canvas, layerCanvas);
			this.canvas.ctx.restore();
		} catch (e) {
			console.error("Error during effect '", this.parentLayer.name, "' function:", e.target ?? e);
			return e;
		}
	}
};
