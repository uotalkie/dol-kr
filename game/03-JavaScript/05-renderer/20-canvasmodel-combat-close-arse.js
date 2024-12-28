// @ts-check
/* globals CombatRenderer, CloseCombatMapper, CloseOptions, CanvasModelLayers */

/**
 * @type {CanvasModelOptions<CloseOptions>}
 */
const combatCloseArse = {
	name: "combatCloseArse",
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
		arse: {
			srcfn(options) {
				return `${options.src}arse/${options.anus.state}-base.png`;
			},
			showfn(options) {
				return !!options.showArse;
			},
			animationfn(options) {
				return options.animKeyArse;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeBase,
		},
		npcSilhouette: {
			srcfn(options) {
				return `${options.src}arse/npc/shadow-${options.anus.silhouette}.png`;
			},
			showfn(options) {
				return !!options.showArse && !!options.anus.silhouette;
			},
			animationfn(options) {
				return options.animKeyArse;
			},
			z: CombatRenderer.indices.closeNpc + 3,
		},
		panties: {
			srcfn(options) {
				return `${options.src}arse/${options.anus.state}-panties.png`;
			},
			showfn(options) {
				return !!options.showArse && V.worn.under_lower.state === "totheside";
			},
			animationfn(options) {
				return options.animKeyArse;
			},
			filters: ["worn_under_lower_main"],
			z: CombatRenderer.indices.closeWorn,
		},
		npcPenetrator: arsePenetrator("npc", "strapon"),
		npcPenetrator2: arsePenetrator("npc2", "dpStrapon"),
		npcCondom: arsePenetratorCondom("npc"),
		npcCondom2: arsePenetratorCondom("npc2"),
	},
};

/**
 *
 * @param {string} npc
 * @param {string} strapon
 * @param {CanvasModelLayers<CloseOptions>} overrideOptions
 * @returns {CanvasModelLayers<CloseOptions>}
 */
function arsePenetrator(npc, strapon, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<CloseOptions>}
	 */
	const defaults = {
		srcfn(options) {
			return `${options.src}arse/npc/${options.anus[npc]}-${options.anus.state}.png`;
		},
		showfn(options) {
			return !!options.showArse && !!options.anus[npc];
		},
		animationfn(options) {
			return options.animKeyArse;
		},
		filtersfn(options) {
			const filter = npc === "npc2" ? ["anusNpc2"] : ["anusNpc"];
			return options.anus[npc] === "tentacle" ? ["anusTentacle"] : filter;
		},
		desaturatefn(options) {
			return !!options.anus[strapon];
		},
		brightnessfn(options) {
			return options.anus[strapon] ? -0.25 : 0;
		},
		alphafn(options) {
			const isWraith = options.anus[npc] === "tentacle" && ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour);
			return isWraith ? (V.tentacleColour === "tentacles-wraith" ? 0.4 : 0.8) : 1;
		},
		z: CombatRenderer.indices.closeNpc,
	};
	return Object.assign(defaults, overrideOptions);
}

/**
 *
 * @param {string} npc
 * @param {CanvasModelLayers<CloseOptions>} overrideOptions
 * @returns {CanvasModelLayers<CloseOptions>}
 */
function arsePenetratorCondom(npc, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<CloseOptions>}
	 */
	const defaults = {
		srcfn(options) {
			return `${options.src}arse/npc/${options.anus[npc]}-condom-${options.anus.state}.png`;
		},
		showfn(options) {
			const target = npc === "npc2" ? V.anusdoubletarget : V.anustarget;
			return !!options.showArse && !!options.anus[npc] && !!V.NPCList[target].condom.worn;
		},
		animationfn(options) {
			return options.animKeyArse;
		},
		alpha: 0.4,
		filters: npc === "npc2" ? ["anusCondom2"] : ["anusCondom"],
		z: CombatRenderer.indices.closeNpc + 1,
	};
	return Object.assign(defaults, overrideOptions);
}
Renderer.CanvasModels.combatCloseArse = combatCloseArse;
