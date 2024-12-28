// @ts-check
/* globals CombatRenderer, CloseCombatMapper, CloseOptions */

/**
 * @type {CanvasModelOptions<CloseOptions>}
 */
const combatCloseChest = {
	name: "combatCloseChest",
	width: 64,
	height: 64,
	scale: true,
	frames: 6,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return { ...CloseCombatMapper.generateOptions(), ...this.metadata };
	},
	preprocess(options) {
		CloseCombatMapper.mapCloseOptions(options);
		if (V.debug) {
			// Save options for easy lookup
			CombatRenderer.options[this.name] = options;
		}
	},
	layers: {
		chest: {
			srcfn(options) {
				return `${options.src}chest/${options.chest.base}.png`;
			},
			showfn(options) {
				return !!options.showChest;
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeBase,
		},
		breasts: {
			srcfn(options) {
				return `${options.src}chest/${options.chest.breasts}-job.png`;
			},
			showfn(options) {
				return !!options.showChest && options.chest.base === "base-job" && V.player.breastsize > 0;
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeNpc + 1,
		},
		npc: {
			srcfn(options) {
				return `${options.src}chest/npc/${options.chest.npc}.png`;
			},
			showfn(options) {
				return !!options.showChest && ["penis", "tentacle"].includes(V.chestuse.toString());
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filtersfn(options) {
				return options.chest.npc === "tentacle" ? ["chestTentacle"] : ["chestNpc"];
			},
			alphafn(options) {
				const isWraith = ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour);
				return options.chest.npc === "tentacle" && isWraith ? 0.8 : 1;
			},
			brightnessfn(options) {
				const isWraith = ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour);
				return options.chest.npc === "tentacle" && isWraith ? 0.2 : 0;
			},
			z: CombatRenderer.indices.closeNpc,
		},
		npcCondom: {
			srcfn(options) {
				return `${options.src}chest/npc/penis-condom.png`;
			},
			showfn(options) {
				return !!options.showChest && options.chest.npc === "penis" && !!options.chest.condom;
			},
			animationfn(options) {
				return options.animKeyChest;
			},
			filters: ["chestCondom"],
			alpha: 0.4,
			z: CombatRenderer.indices.closeNpc,
		},
	},
};
Renderer.CanvasModels.combatCloseChest = combatCloseChest;
