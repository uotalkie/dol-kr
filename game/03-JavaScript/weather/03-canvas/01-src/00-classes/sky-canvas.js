Weather.Renderer.Sky = class {
	constructor(settings) {
		this.Canvas = class extends BaseCanvas {
			constructor(width, height) {
				const scaledWidth = width ?? settings.setup.size[0];
				const scaledHeight = height ?? settings.setup.size[1];
				super(scaledWidth, scaledHeight, settings.setup.scale);
			}
		};

		const requiredParams = ["id", "setup", "layers"];
		requiredParams.forEach(param => {
			if (!settings || !settings[param]) {
				throw new Error(`Error creating new Sky instance: Missing parameter: '${param}'`);
			}
		});

		this.skybox = $("<div />", { id: settings.id });
		this.settings = settings.setup;
		this.layerList = settings.layers;
		this.resizable = settings.resizable;

		this.mainLayer = new this.Canvas();
		this.mainLayer.element.width = this.settings.size[0];
		this.mainLayer.element.height = this.settings.size[1];

		if (this.resizable) {
			// Only trigger the resize event if the actual element is resized
			new ResizeObserver(e => {
				this.mainLayer.resize(e[0].contentRect.right, e[0].contentRect.bottom);
			}).observe(this.skybox[0]);
		}

		this.layers = new Map();
		this.orbitals = {};
		this.fadables = {};

		this.loaded = new ObservableValue(false);

		this.skybox.append(this.mainLayer.canvas);
	}

	/**
	 * @param {object} objA Position object {x, y, width, height}
	 * @param {object} objB Position object {x, y, width, height}
	 * @param {number} modifier 0-1
	 * @returns {boolean}
	 */
	static isOverlapping(objA, objB, modifier = 1) {
		const xOverlap = Math.max(0, Math.min(objA.x + objA.width, objB.x + objB.width) - Math.max(objA.x, objB.x));
		const yOverlap = Math.max(0, Math.min(objA.y + objA.height, objB.y + objB.height) - Math.max(objA.y, objB.y));

		const intersectionArea = xOverlap * yOverlap;
		const minOverlapArea = objA.width * objA.height * modifier;
		return intersectionArea >= minOverlapArea;
	}

	static isOverlappingAny(objA, objList, modifier) {
		if (!objList.length) return false;
		for (const objB of objList) {
			if (this.isOverlapping(objA, objB, modifier)) {
				return true;
			}
		}
		return false;
	}

	sortLayersByZIndex() {
		const sortedLayers = new Map([...this.layers.entries()].sort((a, b) => a[1].zIndex - b[1].zIndex));
		this.layers.clear();
		sortedLayers.forEach((value, key) => {
			this.layers.set(key, value);
		});
	}

	/**
	 * Executes once - when page is loaded
	 */
	initialize() {
		this.initSun();
		this.initMoon();
		this.initFadables();
		this.setupLayers();
		this.setupCanvas();
	}

	setupLayers() {
		// Add selected layers
		Weather.Renderer.Layers.layers.forEach((value, key) => {
			if (this.layerList.includes(key)) {
				this.layers.set(key, value);
			}
		});
	}

	async setupCanvas() {
		const loadPromises = Array.from(this.layers.values()).flatMap(layer => layer.loadPromises);

		// Sequentially await each promise in loadPromises
		for (const loadPromise of loadPromises) {
			try {
				await loadPromise;
			} catch (error) {
				console.warn(error);
			}
		}

		this.sortLayersByZIndex();
		await this.initEffects();
		this.drawLayers();
		this.loaded.value = true;
	}

	initSun() {
		const sunOrbitSettings = this.settings.orbits.sun;
		this.orbitals.sun = new Orbital(this.settings, interpolateObject(sunOrbitSettings.summer, sunOrbitSettings.winter, Time.date.seasonFactor), Time.date);
	}

	initMoon() {
		const moonOrbitSettings = this.settings.orbits.moon;
		this.orbitals.moon = new Orbital(
			this.settings,
			interpolateObject(moonOrbitSettings.summer, moonOrbitSettings.winter, Time.date.seasonFactor),
			Time.date
		);

		const bloodMoonOrbitSettings = this.settings.orbits.bloodmoon;
		this.orbitals.bloodMoon = new Orbital(this.settings, bloodMoonOrbitSettings, Time.date);
	}

	initFadables() {
		const overcastSettings = setup.SkySettings.fade.overcast;
		this.fadables.overcast = new Fadable(overcastSettings, Time.date, Weather.overcast);
	}

	async initEffects() {
		for (const layer of this.layers.values()) {
			layer.setRenderer(this);
			await layer.init();
		}
	}

	/**
	 * Only recalculate the draw functions on the animated layer if a name is specified
	 * All other layers redraw their previous canvas
	 * If no layerName is specified - recalculate draw functions for all layers
	 *
	 * @param {string} args
	 */
	async drawLayers(...args) {
		const tempCanvas = new this.Canvas();
		for (const layer of this.layers.values()) {
			if (args.length === 0 || args.includes(layer.name)) {
				try {
					const errors = await layer.drawEffects(tempCanvas);
					if (errors && errors.length > 0) {
						console.error(`Errors drawing layer '${layer.name}':`, errors);
					}
				} catch (error) {
					console.error(`Error drawing layer '${layer.name}':`, error.message);
				}
			}
			layer.drawLayer(tempCanvas);
		}

		this.mainLayer.ctx.imageSmoothingEnabled = false;
		this.mainLayer.clear();
		this.mainLayer.ctx.drawImage(tempCanvas.element, 0, 0, this.mainLayer.element.width, this.mainLayer.element.height);
	}

	stopAll() {
		for (const layer of this.layers.values()) {
			layer.animationGroup?.stop();
			layer.animationGroup?.reset();
		}
	}

	updateOrbits() {
		this.orbitals.sun.setPosition(Time.date);
		if (Weather.bloodMoon) {
			this.orbitals.bloodMoon.setPosition(Time.date);
		} else {
			this.orbitals.moon.setPosition(Time.date);
		}
	}

	updateFade(instant = false) {
		const overcastTarget = V.weatherObj.targetOvercast ?? 0;
		this.fadables.overcast.setFadeFactor(Time.date, overcastTarget, instant);
		V.weatherObj.overcast = round(this.fadables.overcast.factor, 2);
	}

	get dayFactor() {
		return this.orbitals.sun?.factor ?? 0;
	}

	// Returns 1 when moon is fully lit - and 0 when its fully dark
	get moonBrightnessFactor() {
		return 1 - 2 * Math.abs(Time.date.moonPhaseFraction - 0.5);
	}

	get blur() {
		return Weather.fog;
	}

	get skyDisabled() {
		return V.location === "tentworld"; //todo move to Weather
	}

	setMoonPhase() {
		this.layers.get("moon").init();
	}
};
