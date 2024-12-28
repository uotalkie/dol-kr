// @ts-check
/* globals CombatRenderer, XrayCombatMapper, XrayOptions, CanvasModelLayers */

/**
 * @type {CanvasModelOptions<XrayOptions>}
 */
const combatXrayArse = {
	name: "combatXrayArse",
	width: 256,
	height: 120,
	scale: true,
	frames: 8,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return { ...XrayCombatMapper.generateOptions(), ...this.metadata };
	},
	preprocess(options) {
		XrayCombatMapper.mapXrayOptions(options);
		if (V.debug) {
			// Save options for easy lookup
			CombatRenderer.options[this.name] = options;
		}
	},
	layers: {
		arse: {
			srcfn(options) {
				const baseSize = options.anus.size ? "_size" + options.anus.size : "";
				const baseSizeDP = options.anus.doublePen ? "_dp" + options.anus.size2 : "";
				return `${options.src}anal/${options.anus.base}${baseSize}${baseSizeDP}.png`;
			},
			showfn(options) {
				return !!options.showPcArse;
			},
			animationfn(options) {
				return options.animKeyArse;
			},
			filters: [],
			z: CombatRenderer.indices.xrayBase,
		},
		penetrator: xrayArsePenetrator("npc"),
		penetrator2: xrayArsePenetrator("npc2"),
		condom: xrayArseCondom("npc"),
		condom2: xrayArseCondom("npc2"),
		cum: {
			srcfn(options) {
				const baseSize = options.anus.size ? "_size" + options.anus.size : "";
				const cumAmt = options.anus.penetratorSprite.includes("horse") ? "_cum_horse" : "_cum";
				return `${options.src}anal/cum/${options.anus.base}${baseSize}${cumAmt}.png`;
			},
			showfn(options) {
				return !!options.anus.showCum && !!options.anus.show && options.anus.base !== "knotting";
			},
			animationfn(options) {
				return options.animKeyArse;
			},
			filters: [],
			z: CombatRenderer.indices.xrayCum,
		},
		ejaculating: {
			srcfn(options) {
				const cumSize = options.anus.size ? "_size" + options.anus.size + "_cumming" : "";
				return `${options.src}anal/cum/${options.anus.base}${cumSize}.png`;
			},
			showfn(options) {
				return !!options.anus.showCum && !!options.anus.isCumActive;
			},
			animationfn(options) {
				return options.animKeyArse;
			},
			filters: [],
			z: CombatRenderer.indices.xrayEjac,
		},
	},
};

/**
 * @param {string} npc
 * @param {CanvasModelLayers<XrayOptions>} overrideOptions
 * @returns {CanvasModelLayers<XrayOptions>}
 */
function xrayArsePenetrator(npc, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<XrayOptions>}
	 */
	const defaults = {
		srcfn(options) {
			const penSize = "_size" + options.anus.size;
			const dp = options.anus.doublePen && npc === "npc2" ? "_dp" : "";
			return `${options.src}anal/${options.anus.penetratorSprite}${penSize}${dp}.png`;
		},
		showfn(options) {
			return !!options.showNpcPenis && !!options.anus.show && options.anus[npc] !== undefined;
		},
		animationfn(options) {
			return options.animKeyArse;
		},
		filters: npc === "npc2" ? ["anusPenetrator2"] : ["anusPenetrator"],
		desaturatefn(options) {
			return !!options.anus[npc + "Strapon"];
		},
		brightnessfn(options) {
			return options.anus[npc + "Strapon"] ? -0.25 : 0;
		},
		z: npc === "npc2" ? CombatRenderer.indices.xrayPenetrator2 : CombatRenderer.indices.xrayPenetrator,
	};
	return Object.assign(defaults, overrideOptions);
}

/**
 * @param {string} npc
 * @param {CanvasModelLayers<XrayOptions>} overrideOptions
 * @returns {CanvasModelLayers<XrayOptions>}
 */
function xrayArseCondom(npc, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<XrayOptions>}
	 */
	const defaults = {
		srcfn(options) {
			const conSize = "_size" + options.anus.size;
			const dp = options.anus.doublePen && npc === "npc2" ? "_dp" : "";
			return `${options.src}anal/tentacle${conSize}${dp}.png`;
		},
		showfn(options) {
			const target = npc === "npc2" ? V.anusdoubletarget : V.anustarget;
			return !!options.showNpcPenis && !!options.anus.show && options.anus[npc] !== undefined && !!V.NPCList[target].condom.worn;
		},
		animationfn(options) {
			return options.animKeyArse;
		},
		alpha: 0.4,
		filters: npc === "npc2" ? ["anusCondom2"] : ["anusCondom"],
		z: npc === "npc2" ? CombatRenderer.indices.xrayCondom2 : CombatRenderer.indices.xrayCondom,
	};
	return Object.assign(defaults, overrideOptions);
}
Renderer.CanvasModels.combatXrayArse = combatXrayArse;
