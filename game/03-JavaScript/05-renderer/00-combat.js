// @ts-check
/* globals Partial, PenetratorPositions */

setup.clothingStates = [0, "chest", "midriff", "waist", "thighs", "knees", "ankles"];
setup.positions = [0, "doggy", "missionary", "wall", "stalk", "wall"];
setup.legPositions = ["up", "down", "footjob"];

class CombatSystem {
	constructor() {
		this.target = {
			pc: -1,
			npc0: 0,
			npc1: 1,
			npc2: 2,
			npc3: 3,
			npc4: 4,
			npc5: 5,
		};
		this.vaginaStates = ["vaginaentrance", "vaginaentrancedouble", "vaginaimminent", "vaginaimminentdouble", "vagina", "vaginadouble"];
		this.anusStates = ["anusentrance", "anusentrancedouble", "anus", "anusdouble"];
		this.mouthStates = ["mouthentrance", "mouthimminent", "mouth"];
	}

	get vaginaCount() {
		const states = this.vaginaStates;
		const count = V.NPCList.reduce((i, npc) => i + (npc.penis && states.includes(npc.penis) ? 1 : 0), 0);
		return count;
	}

	get anusCount() {
		const states = this.anusStates;
		const count = V.NPCList.reduce((i, npc) => i + (npc.penis && states.includes(npc.penis) ? 1 : 0), 0);
		return count;
	}

	get mouthCount() {
		const states = this.mouthStates;
		const count = V.NPCList.reduce((i, npc) => i + (npc.penis && states.includes(npc.penis) ? 1 : 0), 0);
		return count;
	}

	/**
	 * @param {number} index
	 * @param {PenetratorPositions?} position
	 */
	penetratorCountBefore(index, position) {
		let count = 0;
		for (let i = 0; i < V.NPCList.length; i++) {
			const npc = V.NPCList[i];
			if (i >= index) {
				break;
			}
			switch (position) {
				case "vagina":
					if (npc.penis && this.vaginaStates.includes(npc.penis)) {
						count++;
					}
					break;
				case "anus":
					if (npc.penis && this.anusStates.includes(npc.penis)) {
						count++;
					}
					break;
				case "mouth":
					if (npc.penis && this.mouthStates.includes(npc.penis)) {
						count++;
					}
					break;
			}
		}
		return count;
	}

	isRapid() {
		return this.anyEjaculating() && !(T.knotted || T.knotted_short);
	}

	anyEjaculating() {
		if (V.orgasmdown > 0) {
			return true;
		}
		return V.enemyarousal > V.enemyarousalmax;
	}

	isActive() {
		if (this.isRapid()) {
			return true;
		}
		if (V.NPCList.some(a => ["horse", "centaur", "pig", "boar"].includes(a.type) && a.active)) {
			return true;
		}
		return (
			this.isVaginaActive() ||
			this.isAnusActive() ||
			this.isMouthActive() ||
			this.isPenisActive() ||
			this.isArmActive() ||
			this.isThighActive() ||
			this.isChestActive() ||
			this.isFeetActive()
		);
	}

	isVaginaPenetrated() {
		const activeState = V.vaginastate && ["penetrated", "doublepenetrated", "tentacle", "tentacledeep"].includes(V.vaginastate);
		return !!activeState;
	}

	/**
	 * @param {string | undefined} [canvas]
	 */
	isVaginaActive(canvas) {
		const activeState =
			V.vaginastate &&
			[
				"penetrated",
				"doublepenetrated",
				"othervaginaentrance",
				"othervaginaimminent",
				"othervagina",
				"othermouth",
				"tentacleentrance",
				"tentacleimminent",
				"tentacle",
				"tentacledeep",
			].includes(V.vaginastate);
		const activeUse = V.vaginause === "tentaclerub" && canvas !== "close";
		if (canvas === "close" && V.vaginastate && ["othervaginaentrance", "othervagina", "entrance", "imminent"].includes(V.vaginastate)) return true;
		return activeState || activeUse;
	}

	isAnusPenetrated() {
		const activeState = V.anusstate && ["penetrated", "doublepenetrated", "tentacle", "tentacledeep"].includes(V.anusstate);
		return !!activeState;
	}

	/**
	 * @param {string | undefined} [canvas]
	 */
	isAnusActive(canvas) {
		const activeState =
			V.anusstate &&
			["penetrated", "doublepenetrated", "cheeks", "othermouth", "tentacleentrance", "tentacleimminent", "tentacle", "tentacledeep"].includes(
				V.anusstate
			);
		if (canvas === "close" && V.anusstate && ["entrance", "imminent", "othermouthentrance", "othermouthimminent"].includes(V.anusstate)) {
			return true;
		}
		const activeUse = V.anususe === "tentaclerub" && canvas !== "close";
		return activeState || activeUse;
	}

	isMouthPenetrated() {
		const activeState = V.mouthstate && ["penetrated", "tentacledeep"].includes(V.mouthstate);
		return !!activeState;
	}

	isMouthActive() {
		const activeState = V.mouthstate && ["penetrated", "kiss", "tentacleentrance", "tentacleimminent", "tentacle", "tentacledeep"].includes(V.mouthstate);
		return !!activeState;
	}

	isPenisPenetrated() {
		const activeState = V.penisstate && ["penetrated", "tentacle", "tentacledeep", "othermouth", "otheranus"].includes(V.penisstate);
		return !!activeState;
	}

	isPenisActive(canvas) {
		const activeState =
			V.penisstate &&
			["penetrated", "otheranus", "othermouth", "tentacleentrance", "tentacleimminent", "tentacle", "tentacledeep"].includes(V.penisstate);
		const activeUse = V.penisuse === "tentaclerub";
		if (
			canvas === "close" &&
			V.penisstate &&
			[
				"entrance",
				"imminent",
				"otheranusimminent",
				"otheranusentrance",
				"othermouthentrance",
				"othermouthimminent",
				"otherpenisentrance",
				"otherpenisimminent",
			].includes(V.penisstate)
		)
			return true;
		return activeState || activeUse;
	}

	isArmActive() {
		return V.rightarm === "penis" || V.leftarm === "penis";
	}

	isChestActive(canvas) {
		const activeUse = V.chestuse === "penis";
		// Why is this canvas argument here?
		if (canvas === "close" && V.cheststate && ["penis", "tentacle"].includes(V.cheststate)) {
			return true;
		}
		return !!activeUse;
	}

	isThighActive() {
		const activeUse = V.thighuse === "penis";
		return !!activeUse;
	}

	isFeetActive() {
		const activeUse = V.feetuse === "penis" || V.feetstate === "tentacle";
		return !!activeUse;
	}

	/**
	 * @returns {Partial<Penetrator>}
	 */
	getPlayerPenetratorState() {
		switch (V.penisuse) {
			case 1:
			case 0:
				return {};
			case "anusentrance":
				return {
					position: "anus",
					state: "entrance",
				};
			case "anusentrancedouble":
				return {
					position: "anus",
					state: "entrance",
				};
			case "anus":
				return {
					position: "anus",
					state: "penetrating",
				};
			case "anusdouble":
				return {
					position: "anus",
					state: "penetrating",
				};
			case "penisentrance":
				return {
					position: "penis",
					state: "entrance",
				};
			case "penisimminent":
				return {
					position: "penis",
					state: "imminent",
				};
			case "penis":
				return {
					position: "penis",
					state: "rubbing",
				};
			case "othervagina":
				return {
					position: "vagina",
					state: "entrance",
				};
			case "vaginaentrance":
				return {
					position: "vagina",
					state: "entrance",
				};
			case "vaginaentrancedouble":
				return {
					position: "vagina",
					state: "entrance",
				};
			case "vaginaimminent":
				return {
					position: "vagina",
					state: "imminent",
				};
			case "vaginaimminentdouble":
				return {
					position: "vagina",
					state: "imminent",
				};
			case "vagina":
				return {
					position: "vagina",
					state: "penetrating",
				};
			case "vaginadouble":
				return {
					position: "vagina",
					state: "penetrating",
				};
			case "mouthentrance":
				return {
					position: "mouth",
					state: "entrance",
				};
			case "mouthimminent":
				return {
					position: "mouth",
					state: "imminent",
				};
			case "mouth":
				return {
					position: "mouth",
					state: "penetrating",
				};
			case "othermouth": // "Wraps its tongue around your penis"
				return {
					position: "mouth",
					state: "entrance",
				};
			case "feet":
				return {
					position: "feet",
					state: "rubbing",
				};
			case "footjob": // Duplicate of feet
				return {
					position: "feet",
					state: "rubbing",
				};
			case "clothed": // Huh? Asking Puri - For when you need to undress NPCs before using the part.
				return {};
			case "leftarm":
				return {
					position: "leftarm",
					state: "rubbing",
				};
			case "rightarm":
				return {
					position: "rightarm",
					state: "rubbing",
				};
			case "thighs":
				return {
					position: "thighs",
					state: "rubbing",
				};
			case "cheeks":
				return {
					position: "butt",
					state: "rubbing",
				};
			case "chest":
				return {
					position: "chest",
					state: "rubbing",
				};
			case "tentacle":
				return {
					position: "penis", // May want to have tentacle as a position??
					state: "rubbing", // Tentacles could be penetratable??
				};
			// case "leftDildoAnus":
			// case "rightDildoAnus":
			// case "leftStroker":
			// case "rightStroker":
			// case "strap-on":
			// case "mouthotheranus": (wtf is this?)
			// case "idle": (Pointless to account for this)
			// case "none": (No pp)
		}
		return {};
	}

	/**
	 * @param {Npc} npc
	 * @returns {Partial<Penetrator>}
	 */
	getNpcPenetratorState(npc) {
		switch (npc.penis) {
			case "anusentrance":
				return {
					show: true,
					position: "anus",
					state: "entrance",
				};
			case "anusentrancedouble":
				return {
					show: true,
					position: "anus",
					state: "entrance",
				};
			case "anusimminent":
				return {
					show: true,
					position: "anus",
					state: "imminent",
				};
			case "anus":
				return {
					show: true,
					position: "anus",
					state: "penetrating",
				};
			case "anusdouble":
				return {
					show: true,
					position: "anus",
					state: "penetrating",
				};
			case "penisentrance":
			case "penisimminent":
			case "penis":
				return {
					show: true,
					position: "penis",
					state: "rubbing",
				};
			case "vaginaentrance":
				return {
					show: true,
					position: "vagina",
					state: "entrance",
				};
			case "vaginaentrancedouble":
				return {
					show: true,
					position: "vagina",
					state: "entrance",
				};
			case "vaginaimminent":
				return {
					show: true,
					position: "vagina",
					state: "imminent",
				};
			case "vaginaimminentdouble":
				return {
					show: true,
					position: "vagina",
					state: "imminent",
				};
			case "vagina":
				return {
					show: true,
					position: "vagina",
					state: "penetrating",
				};
			case "vaginadouble":
				return {
					show: true,
					position: "vagina",
					state: "penetrating",
				};
			case "mouthentrance":
				return {
					show: true,
					position: "mouth",
					state: "entrance",
				};
			case "mouthimminent":
				return {
					show: true,
					position: "mouth",
					state: "imminent",
				};
			case "mouth":
				return {
					show: true,
					position: "mouth",
					state: "penetrating",
				};
			case "othermouth":
				// Not sure of the usage?
				// Maybe it shouldn't be part of npc.penis
				return {};
			case "feet":
				return {
					show: true,
					position: "feet",
					state: "rubbing",
				};
			case "footjob": // Duplicate of feet
				return {
					show: true,
					position: "feet",
					state: "rubbing",
				};
			case "clothed": // Huh? Asking Puri - For when you need to undress NPCs before using the part.
				return {};
			case "leftarm":
				return {
					show: true,
					position: "leftarm",
					state: "rubbing",
				};
			case "rightarm":
				return {
					show: true,
					position: "rightarm",
					state: "rubbing",
				};
			case "thighs":
				return {
					show: true,
					position: "thighs",
					state: "rubbing",
				};
			case "cheeks":
				return {
					show: true,
					position: "butt",
					state: "rubbing",
				};
			case "chest":
				return {
					show: true,
					position: "chest",
					state: "rubbing",
				};
			// case "leftDildoAnus":
			// case "rightDildoAnus":
			// case "leftStroker":
			// case "rightStroker":
			// case "strap-on":
			// case "mouthotheranus": (wtf is this?)
			// case "idle": (Pointless to account for this)
			// case "none": (No pp)
		}
		return {};
	}

	/**
	 * @param {number} index
	 * @param {Npc} npc
	 * @returns {boolean}
	 */
	isNpcPenetratorEjaculating(index, npc) {
		if (wearingCondom(index)) {
			return false;
		}
		if (npcHasStrapon(index)) {
			return false;
		}
		const arousalMaxed = V.enemyarousal >= V.enemyarousalmax;
		return arousalMaxed;
	}

	/**
	 * @param {number=} index
	 * @returns {boolean}
	 */
	isNpcActive(index) {
		if (index == null) {
			return false;
		}
		const npc = V.NPCList[index];
		return npc.active != null;
	}

	/**
	 * @param {Npc} npc
	 * @returns {boolean}
	 */
	isNpcWearingCondom(npc) {
		return wearingCondom(npc.index || 0) !== false;
	}

	/**
	 * @param {Npc} npc
	 * @returns {boolean}
	 */
	isNpcCondomDefective(npc) {
		const state = wearingCondom(npc.index);
		return state && ["defective", "sabotaged"].includes(state);
	}
}
const combat = new CombatSystem();
// @ts-ignore
window.combat = combat;
