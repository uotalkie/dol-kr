// @ts-check
/* globals CombatRenderer, CloseCombatMapper, CloseOptions, CanvasModelLayers */

/**
 * @type {CanvasModelOptions<CloseOptions>}
 */
const combatCloseVagina = {
	name: "combatCloseVagina",
	width: 64,
	height: 64,
	frames: 6,
	scale: true,
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
		vagina: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/${options.vagina.state}-base.png`;
			},
			showfn(options) {
				return !!options.showVagina;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeBase,
		},
		vaginaAroused: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/${options.vagina.state}-aroused.png`;
			},
			showfn(options) {
				return !!options.showVagina && options.vagina.state === "entrance" && V.vaginaWetness >= 75;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeBase,
		},
		penis: {
			srcfn(options) {
				if (V.position === "missionary" && options.vagina.state === "penetrated" && V.player.ballsExist) {
					options.pcPenis = options.penis.size + "-" + options.penis.type + "-penetrated";
				} else {
					options.pcPenis = options.penis.size + "-" + options.penis.type;
				}
				return `${options.src}vagina/${options.position}/${options.pcPenis}.png`;
			},
			showfn(options) {
				return !!options.showVagina && V.player.penisExist && V.worn.genitals.name !== "chastity parasite";
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: ["body"],
			z: CombatRenderer.indices.closeGenitals + 2,
		},
		vaginaCum: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/${options.vagina.cumState}-cum.png`;
			},
			showfn(options) {
				return !!options.showVagina && setup.bodyliquid.combined("vagina") >= 1;
			},
			animationfn(options) {
				return options.vagina.cumState === "vagina" ? "sex-17f-slow" : options.animKeyVagina;
			},
			z: CombatRenderer.indices.closeCum,
		},
		hirsute: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/hair/hirsute.png`;
			},
			showfn(options) {
				return !!options.showVagina && options.vagina.hirsute;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: ["hirsute"],
			z: CombatRenderer.indices.closeBase + 1,
		},
		silhouette: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/npc/shadow-${options.vagina.silhouette}.png`;
			},
			showfn(options) {
				return !!options.showVagina && !!options.vagina.silhouette;
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			z: CombatRenderer.indices.closeNpc + 3,
		},
		parasite: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/parasite-${V.earSlime.focus === "impregnation" ? "shorts" : "panties"}.png`;
			},
			showfn(options) {
				return !!options.showVagina && (V.parasite.clit.name === "parasite" || V.parasite.penis.name === "parasite");
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: ["parasitePanties"],
			z: CombatRenderer.indices.closeWorn,
		},
		panties: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/panties.png`;
			},
			showfn(options) {
				return !!options.showVagina && V.worn.under_lower.state === "totheside";
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filters: ["worn_under_lower_main"],
			z: CombatRenderer.indices.closeWorn,
		},
		chastity: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/${options.vagina.chastityDevice || "chastity-belt"}.png`;
			},
			showfn(options) {
				return !!options.showVagina && playerChastity("vagina");
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			filtersfn(options) {
				return options.vagina.chastityDevice.includes("parasite") ? ["parasitePanties"] : [];
			},
			z: CombatRenderer.indices.closeWorn,
		},
		npcCum: {
			srcfn(options) {
				return `${options.src}vagina/${options.position}/npc/npc-cum.png`;
			},
			showfn(options) {
				if (!options.showVagina) {
					return false;
				}
				if (!options.vagina.npc || options.vagina.npc === "machine") {
					return false;
				}
				if (options.vagina.npc === "beast-oral") {
					return false;
				}
				if (V.enemyarousal < V.enemyarousalmax) {
					return false;
				}
				if (options.vagina.npc === "tentacle") {
					return true;
				}
				return wearingCondom(V.vaginatarget) !== "worn" && !npcHasStrapon(V.vaginatarget) && !playerChastity("vagina");
			},
			animationfn(options) {
				return options.animKeyVagina;
			},
			z: CombatRenderer.indices.closeNpc,
		},
		npcPenetrator: vaginaPenetrator("npc", "strapon"),
		npcPenetrator2: vaginaPenetrator("npc2", "dpStrapon"),
		npcCondom: vaginaPenetratorCondom("npc"),
		npcCondom2: vaginaPenetratorCondom("npc2"),
		pubicStrip: vaginaPubes("pbstrip", 1),
		pubicHair: vaginaPubes("pblevel", 2),
	},
};

/**
 *
 * @param {string} npc
 * @param {string} strapon
 * @param {CanvasModelLayers<CloseOptions>} overrideOptions
 * @returns {CanvasModelLayers<CloseOptions>}
 */
function vaginaPenetrator(npc, strapon, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<CloseOptions>}
	 */
	const defaults = {
		srcfn(options) {
			return `${options.src}vagina/${options.position}/npc/${options.vagina[npc]}-${options.vagina.state}.png`;
		},
		showfn(options) {
			return !!options.showVagina && !!options.vagina[npc];
		},
		animationfn(options) {
			return options.animKeyVagina;
		},
		filtersfn(options) {
			const filter = npc === "npc2" ? ["vaginaNpc2"] : ["vaginaNpc"];
			return options.vagina[npc] === "tentacle" ? ["vaginaTentacle"] : filter;
		},
		desaturatefn(options) {
			return options.vagina[strapon];
		},
		brightnessfn(options) {
			return options.vagina[strapon] ? -0.25 : 0;
		},
		alphafn(options) {
			const isWraith = options.vagina[npc] === "tentacle" && ["tentacles-wraith", "tentacles-wraith-penetrated"].includes(V.tentacleColour);
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
function vaginaPenetratorCondom(npc, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<CloseOptions>}
	 */
	const defaults = {
		srcfn(options) {
			return `${options.src}vagina/${options.position}/npc/${options.vagina[npc]}-condom-${options.vagina.state}.png`;
		},
		showfn(options) {
			const target = npc === "npc2" ? V.vaginadoubletarget : V.vaginatarget;
			return !!options.showArse && !!options.vagina[npc] && !!V.NPCList[target].condom.worn;
		},
		animationfn(options) {
			return options.animKeyVagina;
		},
		alpha: 0.4,
		filters: npc === "npc2" ? ["vaginaCondom2"] : ["vaginaCondom"],
		z: CombatRenderer.indices.closeNpc + 1,
	};
	return Object.assign(defaults, overrideOptions);
}

/**
 *
 * @param {string} pubes
 * @param {number} level
 * @param {CanvasModelLayers<CloseOptions>} overrideOptions
 * @returns {CanvasModelLayers<CloseOptions>}
 */
function vaginaPubes(pubes, level, overrideOptions = {}) {
	/**
	 * @type {CanvasModelLayers<CloseOptions>}
	 */
	const defaults = {
		srcfn(options) {
			const state = options.vagina.state === "chastity" ? "entrance" : options.vagina.state;
			return `${options.src}vagina/${options.position}/hair/${state}-${pubes + V[pubes]}.png`;
		},
		showfn(options) {
			return !!options.showVagina && V.pbdisable === "f" && V[pubes] >= level;
		},
		animationfn(options) {
			return options.animKeyVagina;
		},
		brightness: -0.2,
		contrast: 0.1,
		filters: ["pbhair"],
		z: CombatRenderer.indices.closeBase,
	};
	return Object.assign(defaults, overrideOptions);
}
Renderer.CanvasModels.combatCloseVagina = combatCloseVagina;
