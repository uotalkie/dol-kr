// @ts-check
/* globals CombatRenderer, CloseCombatMapper, CloseOptions */

/**
 * @type {CanvasModelOptions<CloseOptions>}
 */
const combatClosePenis = {
	name: "combatClosePenis",
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
		base: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/base-${V.player.vaginaExist ? "herm" : "penis"}.png`;
			},
			showfn(options) {
				return !!options.showPenis;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeBase,
		},
		panties: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/panties.png`;
			},
			showfn(options) {
				return !!options.showPenis && V.worn.under_lower.state === "totheside";
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["worn_under_lower_main"],
			z: CombatRenderer.indices.closeWorn,
		},
		penis: {
			srcfn(options) {
				if (window.playerHasStrapon()) {
					options.pcPenis = V.worn.under_lower.name === "strap-on knotted cock" ? "strapon-knotted" : "strapon-dick";
				} else if (playerChastity("cage")) {
					options.pcPenis = options.penis.chastityPenis;
				} else if (["beast-oral"].includes(options.penis.npc)) {
					options.pcPenis = `${options.penis.size}-${options.penis.type}-${options.penis.state}`;
				} else {
					options.pcPenis = `${options.penis.size}-${options.penis.type}`;
				}
				return `${options.src}penis/${options.position}/${options.pcPenis}.png`;
			},
			showfn(options) {
				const concealed = (V.worn.genitals.type.includes("hidden") || V.worn.genitals.name === "chastity parasite") && !window.playerHasStrapon();
				return !!options.showPenis && !concealed;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filtersfn(options) {
				if (playerHasStrapon()) {
					return ["worn_under_lower_main"];
				}
				if (options.penis.type === "parasite") {
					return [];
				}
				return ["body"];
			},
			z: CombatRenderer.indices.closeGenitals + 4,
		},
		condom: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/${options.penis.size}-condom.png`;
			},
			showfn(options) {
				return !!options.showPenis && !!options.penis.condom;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			alpha: 0.4,
			filters: ["condom"],
			z: CombatRenderer.indices.closeGenitals + 4,
		},
		parasite: {
			srcfn(options) {
				const panties = V.earSlime.focus === "impregnation" ? "shorts" : "panties";
				const herm = V.player.vaginaExist ? "-herm" : "";
				return `${options.src}penis/${options.position}/parasite-${panties}${herm}.png`;
			},
			showfn(options) {
				return !!options.showPenis && (V.parasite.clit.name === "parasite" || V.parasite.penis.name === "parasite");
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["parasitePanties"],
			z: CombatRenderer.indices.closeWornUnder,
		},
		parasiteBalls: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/parasite-balls.png`;
			},
			showfn(options) {
				return (
					!!options.showPenis &&
					!!V.player.ballsExist &&
					V.player.gender === "m" &&
					(V.parasite.clit.name === "parasite" || V.parasite.penis.name === "parasite") &&
					["mixed", "impregnation"].includes(V.earSlime.focus)
				);
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filters: ["parasitePanties"],
			z: CombatRenderer.indices.closeWornUnder,
		},
		chastity: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/${options.penis.chastityDevice}.png`;
			},
			showfn(options) {
				return !!options.showPenis && !!playerChastity("penis");
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filtersfn(options) {
				if (options.penis.chastityDevice.includes("parasite")) {
					return ["parasitePanties"];
				}
				return ["worn_genitals_main"];
			},
			z: CombatRenderer.indices.closeWorn + 3,
		},
		penetratedNpc: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/npc/${options.penis.npc}-${options.penis.state}.png`;
			},
			showfn(options) {
				return !!options.showPenis && !!options.penis.npc;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			filtersfn(options) {
				return options.penis.npc === "tentacle" ? ["penisTentacle"] : ["penisNpc"];
			},
			alphafn(options) {
				return options.penis.npc === "tentacle" && ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour) ? 0.4 : 1;
			},
			z: CombatRenderer.indices.closeNpc,
		},
		cum: {
			srcfn(options) {
				return `${options.src}penis/${options.position}/npc/${options.penis.npc}-cum.png`;
			},
			showfn(options) {
				return !!options.showPenis && options.penis.npc === "beast-oral" && V.orgasmdown >= 1;
			},
			animationfn(options) {
				return options.animKeyPenis;
			},
			z: CombatRenderer.indices.closeCum,
		},
	},
};
Renderer.CanvasModels.combatClosePenis = combatClosePenis;
