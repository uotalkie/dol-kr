// @ts-check
/* global CombatRenderer, NpcCombatMapper, NpcCanvasHelper */

/**
 * @type {CanvasModelOptions<NpcOptions>}
 */
const combatMainNpc = {
	name: "combatMainNpc",
	width: 256,
	height: 256,
	scale: true,
	frames: 4,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return Object.assign(NpcCombatMapper.generateOptions(), this.metadata);
	},
	preprocess(options) {
		const index = options.index || 0;
		NpcCombatMapper.mapNpcToOptions(index, options);
		if (V.debug) {
			// Save options for easy lookup
			CombatRenderer.options[this.name + index] = options;
		}
	},
	layers: {
		npcBodyBack: NpcCanvasHelper.genBodyLayer("back"),
		npcBodyFront: NpcCanvasHelper.genBodyLayer("front"),
		npcShadowOutline: NpcCanvasHelper.genBodyLayer("outline"),
		npcDrool: {
			srcfn(options) {
				const path = `${options.src}/${options.category}/${options.type}/drool/${options.drool.amount}.png`;
				return path;
			},
			showfn(options) {
				if (!options.show) {
					return false;
				}
				return options.drool.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				return 90;
			},
		},
		npcBalls: {
			srcfn(options) {
				const path = `${options.src}/${options.category}/${options.type}/${options.state}-balls.png`;
				return path;
			},
			showfn(options) {
				if (!options.show) {
					return false;
				}
				return options.balls.hasBalls;
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				return 49;
			},
		},
		npcHole: {
			srcfn(options) {
				const path = `${options.src}/body/penetrator/penile.png`;
				return path;
			},
			showfn(options) {
				return CombatRenderer.isPenileReceptorActive();
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				return 49;
			},
		},
		npcHoleEjaculate: {
			srcfn(options) {
				const path = `${options.src}/body/penetrator/penile-sperm.png`;
				return path;
			},
			showfn(options) {
				return CombatRenderer.isPenileReceptorEjaculationActive();
			},
			animationfn(options) {
				return options.animKey;
			},
			zfn(options) {
				return 49;
			},
		},
		npcTongue: NpcCanvasHelper.genNpcTongue(),
		npcPenetrator: NpcCanvasHelper.genPenetratorLayer(),
		npcPenetratorEjaculate: NpcCanvasHelper.genPenetratorEjaculationLayer(),
		npcCondom: NpcCanvasHelper.genCondomLayer(),
	},
};
Renderer.CanvasModels.combatMainNpc = combatMainNpc;
