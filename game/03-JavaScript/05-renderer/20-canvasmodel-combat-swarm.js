// @ts-check
/* global CombatRenderer, SwarmOptions, SwarmCombatMapper, AnimationSpec, Partial */

/**
 * @type {CanvasModelOptions<SwarmOptions>}
 */
const combatMainSwarm = {
	name: "combatMainSwarm",
	width: 256,
	height: 256,
	scale: true,
	frames: 4,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return Object.assign(SwarmCombatMapper.generateOptions(), this.metadata);
	},
	preprocess(options) {
		SwarmCombatMapper.getOptions(options);
		if (V.debug) {
			// Save options for easy lookup
			CombatRenderer.options[this.name] = options;
		}
	},
	layers: {
		analImminent: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/anal.png`;
				return path;
			},
			showfn(options) {
				return options.show && options.anal.imminent;
			},
			animationfn(options) {
				return options.animKeyImminent;
			},
			dx: 4,
			z: CombatRenderer.indices.base - 1,
		},
		analPenetrating: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/anal.png`;
				return path;
			},
			showfn(options) {
				return options.show && options.anal.penetrating;
			},
			animationfn(options) {
				return options.animKeyPenetrating;
			},
			z: CombatRenderer.indices.base - 1,
		},
		vaginalImminent: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/vaginal.png`;
				return path;
			},
			showfn(options) {
				return options.show && options.vaginal.imminent;
			},
			animationfn(options) {
				return options.animKeyImminent;
			},
			dx: -2,
			dy: 2,
			z: CombatRenderer.indices.base - 1,
		},
		vaginalPenetrating: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/vaginal.png`;
				return path;
			},
			showfn(options) {
				return options.show && options.vaginal.penetrating;
			},
			animationfn(options) {
				return options.animKeyPenetrating;
			},
			dx: -6,
			z: CombatRenderer.indices.base - 1,
		},
		penileImminent: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/penile.png`;
				return path;
			},
			showfn(options) {
				return options.show && options.penile.imminent;
			},
			animationfn(options) {
				return options.animKeyImminent;
			},
			dx: -2,
			dy: 2,
			z: CombatRenderer.indices.base - 1,
		},
		penilePenetrating: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/penile.png`;
				return path;
			},
			showfn(options) {
				return options.show && options.penile.penetrating;
			},
			animationfn(options) {
				return options.animKeyPenetrating;
			},
			z: CombatRenderer.indices.base - 1,
		},
		background: {
			srcfn(options) {
				const path = `${options.src}swarms/${options.type}/${options.amount}.png`;
				return path;
			},
			showfn(options) {
				return options.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.base,
		},
	},
};
Renderer.CanvasModels.combatMainSwarm = combatMainSwarm;

/** @type {Partial<AnimationSpec>} */
const swarmImminent = {
	keyframes: [
		{
			frame: 0,
			duration: 170,
		},
		{
			frame: 1,
			duration: 170,
		},
		{
			frame: 2,
			duration: 170,
		},
		{
			frame: 3,
			duration: 170,
		},
	],
};
// @ts-ignore
Renderer.Animations["swarm-4f-imminent"] = swarmImminent;

/** @type {Partial<AnimationSpec>} */
const swarmPenetrating = {
	keyframes: [
		{
			frame: 3,
			duration: 140,
		},
		{
			frame: 0,
			duration: 140,
		},
		{
			frame: 1,
			duration: 140,
		},
		{
			frame: 2,
			duration: 140,
		},
	],
};
// @ts-ignore
Renderer.Animations["swarm-4f-penetrating"] = swarmPenetrating;
