// @ts-check
/* globals CombatRenderer, XrayCombatMapper, XrayOptions */

/**
 * @type {CanvasModelOptions<XrayOptions>}
 */
const combatXrayPenis = {
	name: "combatXrayPenis",
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
		base: {
			srcfn(options) {
				const base = ["machine", "tentacle"].includes(options.penis.penetratedType) ? options.penis.base + "_tentacle" : options.penis.base;
				const baseSize = options.penis.size ? "_size" + options.penis.size : "";
				return `${options.src}${options.penis.penetrated}/${base}${baseSize}.png`;
			},
			showfn(options) {
				return options.penis.penetrated === "vaginal" ? !!options.showNpcVagina : !!options.showNpcArse;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["penisPenetrated"],
			z: CombatRenderer.indices.xrayBase,
		},
		playerPenis: {
			srcfn(options) {
				const playerPenis = options.penis.playerSprite;
				const size = options.penis.size ? "_size" + options.penis.size : "";
				return `${options.src}${options.penis.penetrated}/${playerPenis}${size}.png`;
			},
			showfn(options) {
				return !!options.showPcPenis;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filtersfn(options) {
				if (playerHasStrapon()) {
					return ["worn_under_lower_main"];
				}
				if (options.penis.type === "parasite") {
					return ["parasite"];
				}
				return ["body"];
			},
			z: CombatRenderer.indices.xrayPenetrator,
		},
		playerCum: {
			srcfn(options) {
				const size = options.penis.size ? "_size" + options.penis.size : "";
				const cumAmt = options.penis.penetrated === "vaginal" ? "_cum" + V.otherFilled : "_cum";
				return `${options.src}${options.penis.penetrated}/cum/${options.penis.base}${size}${cumAmt}.png`;
			},
			showfn(options) {
				return !!options.penis.showCum && V.otherFilled >= 1;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: [],
			z: CombatRenderer.indices.xrayCum,
		},
		playerEjac: {
			srcfn(options) {
				const cumSize = options.penis.size ? "_size" + options.penis.size + "_cumming" : "";
				return `${options.src}${options.penis.penetrated}/cum/${options.penis.base}${cumSize}.png`;
			},
			showfn(options) {
				return !!options.penis.showCum && !!options.penis.isCumActive;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: [],
			z: CombatRenderer.indices.xrayEjac,
		},
		playerCondom: {
			srcfn(options) {
				const conSize = "_size" + options.penis.size;
				return `${options.src}${options.penis.penetrated}/tentacle${conSize}.png`;
			},
			showfn(options) {
				return !!options.showPcPenis && !!options.penis.condom.worn;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			alpha: 0.4,
			filters: ["playerCondom"],
			z: CombatRenderer.indices.xrayCondom,
		},
	},
};
Renderer.CanvasModels.combatXrayPenis = combatXrayPenis;
