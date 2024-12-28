// @ts-check
/* global CanvasModelLayers, KeyframeAnimationSpec, AnimationSpec, CombatRenderer, KeyframeSpec */

class NpcCanvasHelper {
	/**
	 * @param {"front" | "back" | "outline"} layer
	 * @param {CanvasModelLayers<NpcOptions>} overrideOptions
	 * @returns {CanvasModelLayers<NpcOptions>}
	 */
	static genBodyLayer(layer, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<NpcOptions>}
		 */
		const defaults = {
			srcfn(options) {
				if (layer === "front" && options.category === "shadow") {
					return `${options.src}/${options.category}/${options.type}/${options.state}.png`;
				}
				if (layer === "outline" && options.category === "shadow" && ["human", "plant"].includes(options.type)) {
					return `${options.src}/${options.category}/${options.type}/${options.state}-outline.png`;
				}
				if (options.isBlackWolf) {
					return `${options.src}/${options.category}/blackwolf/${layer}-${options.state}.png`;
				}
				return `${options.src}/${options.category}/${options.type}/${layer}-${options.state}.png`;
			},
			showfn(options) {
				if (!options.show) {
					return false;
				}
				if (options.state == null) {
					return false;
				}
				if (options.position === "doggy" && options.category === "shadow" && options.state === "penis") {
					return false;
				}
				const penetrator = options.penetrators[0];
				if (penetrator != null && penetrator.position === "mouth" && penetrator.state === "entrance") {
					return false;
				}
				if (layer === "back" && options.category !== "beast") {
					return false;
				}
				if (layer === "outline" && (options.category !== "shadow" || !["human", "plant"].includes(options.type))) {
					return false;
				}
				return true;
			},
			animationfn(options) {
				const penetrator = options.penetrators[0];

				if (penetrator != null && penetrator.position === "mouth" && penetrator.type === "human") {
					return penetrator.state !== "penetrating" ? options.animKeyStill : options.animKey;
				}
				return options.animKey;
			},
			zfn(options) {
				if (layer === "front") {
					if (options.category === "shadow") {
						if (options.state === "mouth") {
							return CombatRenderer.indices.near;
						}
						return CombatRenderer.indices.hair - 1;
					}
					if (options.state === "penis") {
						return 91;
					}
					if (options.category === "beast" && options.state?.includes("over")) {
						// Sufficiently in front in case of hair accessories/transformation parts
						return CombatRenderer.indices.frontHalo + 5;
					}
					return CombatRenderer.indices.frontLowerOverwear + 3;
				}
				if (layer === "outline") {
					return 92;
				}
				// Back layer
				if (options.category === "beast" && options.state === "under") {
					return 40;
				}
				if (options.position === "doggy") {
					return 20;
				}
				if (options.state === "penis") {
					return 90;
				}
				return 60;
			},
			dxfn(options) {
				if (options.category !== "shadow") {
					return 0;
				}
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				if (penetrator.position != null && ["vagina", "anus", "butt", "thighs"].includes(penetrator.position)) {
					switch (penetrator.state) {
						case "penetrating":
							return 0;
						case "imminent":
							return 10;
						case "entrance":
							return 20;
					}
				}
				return 0;
			},
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {CanvasModelLayers<NpcOptions>} overrideOptions
	 * @returns {CanvasModelLayers<NpcOptions>}
	 */
	static genNpcTongue(overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<NpcOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const tongue = options.tongue;
				if (tongue == null || !tongue.show || tongue.position == null) {
					return "";
				}
				let positionAlias = tongue.position;
				if (tongue.position === "mouth") positionAlias = "kiss";
				if (options.position === "missionary") {
					if (["anus", "anusentrance", "anusimminent"].includes(tongue.position)) positionAlias = "anus";
					if (["penis", "penisentrance", "penisimminent"].includes(tongue.position)) positionAlias = "penis";
					if (["vagina", "vaginaentrance", "vaginaimminent"].includes(tongue.position)) positionAlias = "vagina";
					if (["kiss", "kissentrance", "kissimminent"].includes(tongue.position)) positionAlias = "kiss";
				}
				return `${options.src}/penetrators/tongue/${positionAlias}.png`;
			},
			showfn(options) {
				return options.tongue.show;
			},
			zfn(options) {
				const tongue = options.tongue;
				if (tongue == null || !tongue.show || tongue.position == null) {
					return 51;
				}
				if (["mouth", "kiss", "kissentrance", "kissimminent"].includes(tongue.position)) return 71;
				return 51;
			},
			animationfn(options) {
				return options.animKey;
			},
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {CanvasModelLayers<NpcOptions>} overrideOptions
	 * @returns {CanvasModelLayers<NpcOptions>}
	 */
	static genPenetratorLayer(overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<NpcOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null || !penetrator.show) {
					return "";
				}
				// return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}-mask.png`;
				if (["horse", "centaur"].includes(options.type)) {
					return `${options.src}/penetrators/${penetrator.type}/${penetrator.state}.png`;
				}
				if (["knotted", "human"].includes(penetrator.type) && penetrator.position === "mouth") {
					return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}-${penetrator.state}.png`;
				}
				return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}.png`;
			},
			showfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return false;
				}
				// if (penetrator.position === "vagina" && penetrator.state === "penetrated") return false;
				// Bestial oral penetration sprites are kind of fucked, don't show unless penetrating mouth
				// Also, regular humans fallback to use the old 4f sprites, so no showing imminent sprites etc.
				if (penetrator.position === "mouth" && penetrator.state === "entrance") {
					return false;
				}
				return !!penetrator.show;
			},
			zfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				if (penetrator.position === "mouth") {
					return CombatRenderer.indices.head + 2;
				}
				if (penetrator.position === "thighs") {
					return 30;
				}
				if (penetrator.position === "feet") {
					return CombatRenderer.indices.backFootwear + 1;
				}
				if (options.position === "doggy" && penetrator.position === "rightarm") {
					return CombatRenderer.indices.backArm - 1;
				}
				if (options.position === "missionary" && penetrator.position === "rightarm") {
					return CombatRenderer.indices.frontArm - 1;
				}
				if (options.position === "doggy" && penetrator.position === "leftarm") {
					return CombatRenderer.indices.frontArm - 1;
				}
				if (options.position === "missionary" && penetrator.position === "leftarm") {
					return CombatRenderer.indices.backArm - 1;
				}
				if (penetrator.position === "vagina" && penetrator.state === null) {
					return CombatRenderer.indices.frontLowerOverwear + 1;
				}
				return 49;
			},
			animationfn(options) {
				if (options.category !== "shadow") {
					return options.animKey;
				}
				const speed = options.speed;
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return options.animKey;
				}
				if (penetrator.position === "mouth") {
					return penetrator.type === "human" && penetrator.state !== "penetrating" ? options.animKeyStill : options.animKey;
				}
				if (options.position === "missionary" && penetrator.position === "vagina") {
					return `vagina-missionary-${speed}`;
				}
				if (penetrator.position != null && ["vagina", "anus", "thighs"].includes(penetrator.position)) {
					return `equal-oscillation-${speed}`;
				}
				if (penetrator.position === "butt") {
					return `butt-rubbing-${speed}`;
				}
				if (penetrator.position === "chest") {
					return `boobjob-${speed}`;
				}
				if (penetrator.position === "feet") {
					return `footjob-${speed}`;
				}
				if (penetrator.position === "rightarm") {
					return `back-handjob-${speed}`;
				}
				return options.animKey;
			},
			dxfn(options) {
				if (options.category !== "shadow") {
					return 0;
				}
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				if (penetrator.position != null && ["vagina", "anus", "thighs"].includes(penetrator.position)) {
					switch (penetrator.state) {
						case "penetrating":
							return 0;
						case "imminent":
							return 10;
						case "entrance":
							return 20;
					}
				}
				return 0;
			},
			dyfn(options) {
				if (options.category !== "shadow") {
					return 0;
				}
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				return 0;
			},
			filtersfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator.type === "feline") {
					return ["penetrator"];
				}
				if (options.category !== "shadow") {
					return [];
				}
				return ["penetrator"];
			},
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {CanvasModelLayers<NpcOptions>} overrideOptions
	 * @returns {CanvasModelLayers<NpcOptions>}
	 */
	static genPenetratorEjaculationLayer(overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<NpcOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return "";
				}
				if (["horse", "centaur"].includes(options.type)) {
					return `${options.src}/penetrators/${penetrator.type}/${penetrator.state}-${penetrator.ejaculate.type}.png`;
				}
				if (["knotted", "human"].includes(penetrator.type) && penetrator.position === "mouth") {
					return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}-${penetrator.state}-${penetrator.ejaculate.type}.png`;
				}
				return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}-${penetrator.ejaculate.type}.png`;
			},
			showfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return false;
				}
				const result = penetrator.show && penetrator.isEjaculating;
				return !!result;
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				if (penetrator.position === "mouth") {
					return CombatRenderer.indices.head + 2;
				}
				if (penetrator.position === "thighs") {
					return 32;
				}
				if (penetrator.position === "leftarm") {
					return 48; // Behind the Z index of PC's "backarm"
				}
				return 49;
			},
		};
		return Object.assign(defaults, overrideOptions);
	}

	static genCondomLayer(overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<NpcOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null || !penetrator.show) {
					return "";
				}
				if (options.category === "shadow" && penetrator.position === "mouth") {
					return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}-${penetrator.state}-condom.png`;
				}
				// Use penetrator.condom.isDefective for alternative sprites?
				return `${options.src}/penetrators/${penetrator.type}/${penetrator.position}-condom.png`;
			},
			showfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return false;
				}
				const condom = penetrator.condom;
				return options.category === "shadow" && penetrator.show && condom.show;
			},
			animationfn(options) {
				if (options.category !== "shadow") {
					return options.animKey;
				}
				const speed = options.speed;
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return options.animKey;
				}
				if (options.position === "missionary") {
					switch (penetrator.position) {
						case "vagina":
							return `vagina-missionary-${speed}`;
						case "mouth":
							return `blowjob-missionary-${speed}`;
					}
				}
				if (penetrator.position != null && ["vagina", "anus", "thighs"].includes(penetrator.position)) {
					return `equal-oscillation-${speed}`;
				}
				if (penetrator.position === "butt") {
					return `butt-rubbing-${speed}`;
				}
				if (penetrator.position === "mouth") {
					return `blowjob-${speed}`;
				}
				if (penetrator.position === "chest") {
					return `boobjob-${speed}`;
				}
				if (penetrator.position === "feet") {
					return `footjob-${speed}`;
				}
				if (penetrator.position === "rightarm") {
					return `back-handjob-${speed}`;
				}
				return options.animKey;
			},
			filtersfn(options) {
				if (options.category !== "shadow") {
					return [];
				}
				return ["condom"];
			},
			dxfn(options) {
				if (options.category !== "shadow") {
					return 0;
				}
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				if (penetrator.position != null && ["vagina", "anus", "thighs"].includes(penetrator.position)) {
					switch (penetrator.state) {
						case "penetrating":
							return 0;
						case "imminent":
							return 10;
						case "entrance":
							return 20;
					}
				}
				if (penetrator.position === "mouth") {
					switch (penetrator.state) {
						case "penetrating":
							return 0;
						case "imminent":
							return -10;
						case "entrance":
							return -20;
					}
				}
				return 0;
			},
			zfn(options) {
				const penetrator = options.penetrators[0];
				if (penetrator == null) {
					return 0;
				}
				if (penetrator.position === "thighs") {
					return 30;
				}
				if (penetrator.position === "feet") {
					return CombatRenderer.indices.backFootwear + 1;
				}
				if (options.position === "doggy" && penetrator.position === "rightarm") {
					return CombatRenderer.indices.backArm - 1;
				}
				if (options.position === "missionary" && penetrator.position === "rightarm") {
					return CombatRenderer.indices.frontArm - 1;
				}
				if (options.position === "doggy" && penetrator.position === "leftarm") {
					return CombatRenderer.indices.frontArm - 1;
				}
				if (options.position === "missionary" && penetrator.position === "leftarm") {
					return CombatRenderer.indices.backArm - 1;
				}
				if (penetrator.position === "mouth" && penetrator.state !== "penetrating") {
					return CombatRenderer.indices.head + 1; // Put in front of head
				}
				return 49;
			},
			height: 256,
			width: 256,
		};
		return Object.assign(defaults, overrideOptions);
	}
}
window.NpcCanvasHelper = NpcCanvasHelper;

/**
 * @param {number} count
 * @param {number} duration
 * @param {number} minX
 * @param {number} maxX
 * @param {number} minY
 * @param {number} maxY
 * @returns {KeyframeAnimationSpec}
 */
function genLinearKeyFrames(count, duration, minX, maxX, minY, maxY) {
	/** @type {KeyframeAnimationSpec} */
	const spec = {
		frameCount: count,
		keyframes: [],
	};

	const diffX = maxX - minX;
	const diffY = maxY - minY;

	for (let i = 0; i < count; i++) {
		const dX = (i * diffX) / (count - 1);
		const dY = (i * diffY) / (count - 1);
		const frame = genKeyFrame(duration, dX, dY);
		spec.keyframes.push(frame);
	}

	return spec;
}
window.genLinearKeyFrames = genLinearKeyFrames;

/**
 * @param {number} duration
 * @param {number} minX
 * @param {number} maxX
 * @param {number} minY
 * @param {number} maxY
 * @returns {KeyframeAnimationSpec}
 */
function genFourOffsetKeyFrames(duration, minX, maxX, minY, maxY) {
	const count = 4;
	/** @type {KeyframeAnimationSpec} */
	const spec = {
		frameCount: count,
		keyframes: [],
	};

	const diffX = maxX - minX;
	const dX = diffX / 2;
	const diffY = maxY - minY;
	const dY = diffY / 2;

	spec.keyframes.push(genKeyFrame(duration, 0 * dX, 0 * dY));
	spec.keyframes.push(genKeyFrame(duration, 1 * dX, 1 * dY));
	spec.keyframes.push(genKeyFrame(duration, 2 * dX, 2 * dY));
	spec.keyframes.push(genKeyFrame(duration, 1 * dX, 1 * dY));

	return spec;
}
window.genFourOffsetKeyFrames = genFourOffsetKeyFrames;

/**
 * @param {number} duration
 * @param {number} minX
 * @param {number} maxX
 * @param {number} minY
 * @param {number} maxY
 * @returns {KeyframeAnimationSpec}
 */
function genFourSkewedKeyFrames(duration, minX, maxX, minY, maxY) {
	const count = 4;
	/** @type {KeyframeAnimationSpec} */
	const spec = {
		frameCount: count,
		keyframes: [],
	};

	const diffX = maxX - minX;
	const dX = diffX / 3;
	const diffY = maxY - minY;
	const dY = diffY / 3;

	spec.keyframes.push(genKeyFrame(duration, 0 * dX, 0 * dY));
	spec.keyframes.push(genKeyFrame(duration, 1 * dX, 1 * dY));
	spec.keyframes.push(genKeyFrame(duration, 3 * dX, 3 * dY));
	spec.keyframes.push(genKeyFrame(duration, 2 * dX, 2 * dY));

	return spec;
}
window.genFourSkewedKeyFrames = genFourSkewedKeyFrames;

/**
 * @param {number} duration
 * @param {number} dx
 * @param {number} dy
 * @returns {KeyframeSpec}
 */
function genKeyFrame(duration, dx, dy) {
	return {
		frame: 0,
		duration,
		dx,
		dy,
	};
}

Renderer.Animations["equal-oscillation-idle"] = genLinearKeyFrames(2, 1000, 0, 12, 0, 0);
/** @type {AnimationSpec} */
const eoSlow = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 330,
			dx: 0,
		},
		{
			frame: 1,
			duration: 330,
			dx: 6,
			dy: 2,
		},
		{
			frame: 2,
			duration: 330,
			dx: 12,
			dy: 2,
		},
		{
			frame: 3,
			duration: 330,
			dx: 8,
			dy: 2,
		},
	],
};
Renderer.Animations["equal-oscillation-slow"] = eoSlow;
Renderer.Animations["equal-oscillation-mid"] = genFourOffsetKeyFrames(170, 0, 12, 0, 0);
Renderer.Animations["equal-oscillation-fast"] = genFourOffsetKeyFrames(110, 0, 12, 0, 0);
Renderer.Animations["equal-oscillation-vfast"] = genFourOffsetKeyFrames(80, 0, 12, 0, 0);

Renderer.Animations["butt-rubbing-idle"] = genLinearKeyFrames(2, 1000, 0, -1, 0, 0);

/**
 * @type {KeyframeAnimationSpec}
 */
const buttRubbingSlow = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 330,
			dx: 0,
			dy: 0,
		},
		{
			frame: 0,
			duration: 330,
			dx: -4,
			dy: -2,
		},
		{
			frame: 0,
			duration: 330,
			dx: -2,
			dy: 0,
		},
		{
			frame: 0,
			duration: 330,
			dx: 2,
			dy: 0,
		},
	],
};
Renderer.Animations["butt-rubbing-slow"] = buttRubbingSlow;

/**
 * @type {KeyframeAnimationSpec}
 */
const buttRubbingMid = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 170,
			dx: 0,
			dy: 0,
		},
		{
			frame: 0,
			duration: 170,
			dx: -4,
			dy: -2,
		},
		{
			frame: 0,
			duration: 170,
			dx: -2,
			dy: 0,
		},
		{
			frame: 0,
			duration: 170,
			dx: 2,
			dy: 0,
		},
	],
};
Renderer.Animations["butt-rubbing-mid"] = buttRubbingMid;

/**
 * @type {KeyframeAnimationSpec}
 */
const buttRubbingFast = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 110,
			dx: 0,
			dy: 0,
		},
		{
			frame: 0,
			duration: 110,
			dx: -2,
			dy: -1,
		},
		{
			frame: 0,
			duration: 110,
			dx: -1,
			dy: 0,
		},
		{
			frame: 0,
			duration: 110,
			dx: 1,
			dy: 0,
		},
	],
};
Renderer.Animations["butt-rubbing-fast"] = buttRubbingFast;

/**
 * @type {KeyframeAnimationSpec}
 */
const buttRubbingVeryFast = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 80,
			dx: 0,
			dy: 0,
		},
		{
			frame: 0,
			duration: 80,
			dx: -2,
			dy: -1,
		},
		{
			frame: 0,
			duration: 80,
			dx: -1,
			dy: 0,
		},
		{
			frame: 0,
			duration: 80,
			dx: 1,
			dy: 0,
		},
	],
};
Renderer.Animations["butt-rubbing-vfast"] = buttRubbingVeryFast;

Renderer.Animations["blowjob-idle"] = genLinearKeyFrames(2, 1000, 0, 12, 0, 0);

/**
 * @type {KeyframeAnimationSpec}
 */
const blowjobSlow = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 330,
			dx: 0,
		},
		{
			frame: 0,
			duration: 330,
			dx: 4,
		},
		{
			frame: 0,
			duration: 330,
			dx: 12,
		},
		{
			frame: 0,
			duration: 330,
			dx: 6,
		},
	],
};
Renderer.Animations["blowjob-slow"] = blowjobSlow;

/**
 * @type {KeyframeAnimationSpec}
 */
const blowjobMid = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 170,
			dx: 0,
		},
		{
			frame: 0,
			duration: 170,
			dx: 4,
		},
		{
			frame: 0,
			duration: 170,
			dx: 12,
		},
		{
			frame: 0,
			duration: 170,
			dx: 6,
		},
	],
};
Renderer.Animations["blowjob-mid"] = blowjobMid;

/**
 * @type {KeyframeAnimationSpec}
 */
const blowjobFast = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 110,
			dx: 0,
		},
		{
			frame: 0,
			duration: 110,
			dx: 4,
		},
		{
			frame: 0,
			duration: 110,
			dx: 16,
		},
		{
			frame: 0,
			duration: 110,
			dx: 6,
		},
	],
};
Renderer.Animations["blowjob-fast"] = blowjobFast;

/**
 * @type {KeyframeAnimationSpec}
 */
const blowjobVeryFast = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 80,
			dx: 0,
		},
		{
			frame: 0,
			duration: 80,
			dx: 4,
		},
		{
			frame: 0,
			duration: 80,
			dx: 16,
		},
		{
			frame: 0,
			duration: 80,
			dx: 6,
		},
	],
};
Renderer.Animations["blowjob-vfast"] = blowjobVeryFast;

Renderer.Animations["boobjob-idle"] = genLinearKeyFrames(2, 1000, 0, 4, 0, 0);
Renderer.Animations["boobjob-slow"] = genFourSkewedKeyFrames(330, 0, 12, 0, 0);
Renderer.Animations["boobjob-mid"] = genFourSkewedKeyFrames(170, 0, 12, 0, 0);
Renderer.Animations["boobjob-fast"] = genFourSkewedKeyFrames(110, 0, 12, 0, 0);
Renderer.Animations["boobjob-vfast"] = genFourSkewedKeyFrames(80, 0, 12, 0, 0);

Renderer.Animations["footjob-idle"] = genLinearKeyFrames(2, 1000, 0, 4, 0, 0);
Renderer.Animations["footjob-slow"] = genFourOffsetKeyFrames(330, 0, 4, 0, 0);
Renderer.Animations["footjob-mid"] = genFourOffsetKeyFrames(170, 0, 4, 0, 0);
Renderer.Animations["footjob-fast"] = genFourOffsetKeyFrames(110, 0, 4, 0, 0);
Renderer.Animations["footjob-vfast"] = genFourOffsetKeyFrames(80, 0, 4, 0, 0);

Renderer.Animations["back-handjob-idle"] = genLinearKeyFrames(2, 1000, 0, 0, 0, 0);

/**
 * @type {KeyframeAnimationSpec}
 */
const backHandjobSlow = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 330,
		},
		{
			frame: 0,
			duration: 330,
		},
		{
			frame: 0,
			duration: 330,
		},
		{
			frame: 0,
			duration: 330,
			dx: 2,
		},
	],
};
Renderer.Animations["back-handjob-slow"] = backHandjobSlow;

/**
 * @type {KeyframeAnimationSpec}
 */
const backHandjobMid = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 170,
		},
		{
			frame: 0,
			duration: 170,
		},
		{
			frame: 0,
			duration: 170,
		},
		{
			frame: 0,
			duration: 170,
			dx: 2,
		},
	],
};
Renderer.Animations["back-handjob-mid"] = backHandjobMid;

/**
 * @type {KeyframeAnimationSpec}
 */
const backHandjobFast = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 110,
		},
		{
			frame: 0,
			duration: 110,
		},
		{
			frame: 0,
			duration: 110,
		},
		{
			frame: 0,
			duration: 110,
			dx: 2,
		},
	],
};
Renderer.Animations["back-handjob-fast"] = backHandjobFast;

/**
 * @type {KeyframeAnimationSpec}
 */
const backHandjobVeryFast = {
	frameCount: 4,
	keyframes: [
		{
			frame: 0,
			duration: 80,
		},
		{
			frame: 0,
			duration: 80,
		},
		{
			frame: 0,
			duration: 80,
		},
		{
			frame: 0,
			duration: 80,
			dx: 2,
		},
	],
};
Renderer.Animations["back-handjob-vfast"] = backHandjobVeryFast;

Renderer.Animations["vagina-missionary-idle"] = genLinearKeyFrames(2, 1000, 0, 4, 0, 0);
Renderer.Animations["vagina-missionary-slow"] = genFourOffsetKeyFrames(330, 0, 4, 0, 0);
Renderer.Animations["vagina-missionary-mid"] = genFourOffsetKeyFrames(170, 0, 4, 0, 0);
Renderer.Animations["vagina-missionary-fast"] = genFourOffsetKeyFrames(110, 0, 4, 0, 0);
Renderer.Animations["vagina-missionary-vfast"] = genFourOffsetKeyFrames(80, 0, 4, 0, 0);

Renderer.Animations["blowjob-missionary-idle"] = genLinearKeyFrames(2, 1000, 0, 12, 0, -6);
Renderer.Animations["blowjob-missionary-slow"] = genFourSkewedKeyFrames(330, 0, 12, 0, -6);
Renderer.Animations["blowjob-missionary-mid"] = genFourSkewedKeyFrames(170, 0, 12, 0, -6);
Renderer.Animations["blowjob-missionary-fast"] = genFourSkewedKeyFrames(110, 0, 12, 0, -6);
Renderer.Animations["blowjob-missionary-vfast"] = genFourSkewedKeyFrames(80, 0, 12, 0, -6);

/**
 * @type {KeyframeAnimationSpec}
 */
const eyelashesDoggyIdle = {
	frameCount: 1,
	keyframes: [
		{
			frame: 4,
			duration: 1000,
			dx: -2,
			dy: 0,
		},
	],
};
Renderer.Animations["eyelashes-doggy-idle"] = eyelashesDoggyIdle;

/**
 * @type {KeyframeAnimationSpec}
 */
const eyelidsDoggyIdle = {
	frameCount: 1,
	keyframes: [
		{
			frame: 4,
			duration: 1000,
			dx: -2,
			dy: 0,
		},
	],
};
Renderer.Animations["eyelids-doggy-idle"] = eyelidsDoggyIdle;

/**
 * @type {KeyframeAnimationSpec}
 */
const eyesBirdIdle = {
	frameCount: 1,
	keyframes: [
		{
			frame: 2,
			duration: 1000,
			dx: 0,
			dy: 0,
		},
	],
};
Renderer.Animations["eyes-bird-idle"] = eyesBirdIdle;
