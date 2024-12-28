// @ts-check
/* globals CombatClothingTypes, ClothingStates, ZeroedClothingStates, ClothingRendererStepState, SpritePositions, Partial, Record */

/**
 * @typedef {Partial<Record<SpritePositions, Partial<Record<ClothingStates, ClothingRendererStepState>>>>} RendererStepOptions
 */

class ClothingRendererStep {
	/**
	 * @param {CombatClothingTypes} type
	 * @param {RendererStepOptions} states
	 */
	static create(type, states) {
		if (!(type in ClothingRendererStep.instances)) {
			ClothingRendererStep.instances[type] = new ClothingRendererStep(type, states);
		}
		return ClothingRendererStep.instances[type];
	}

	/**
	 * @param {CombatClothingTypes} type
	 * @param {RendererStepOptions} states
	 */
	constructor(type, states) {
		this.type = type;
		this.states = states;
	}

	/**
	 * @param {SpritePositions} position
	 * @param {ZeroedClothingStates} state
	 * @returns {boolean}
	 */
	isStateLayered(position, state) {
		if (state === 0) {
			return false;
		}
		const states = this.states[position];
		if (states == null) {
			return false;
		}
		const selected = states[state];
		if (selected == null) {
			return false;
		}
		return !!selected.layered;
	}

	/**
	 * @param {SpritePositions} position
	 * @param {ZeroedClothingStates} state
	 * @returns {boolean}
	 */
	isStateLegged(position, state) {
		if (state === 0) {
			return false;
		}
		const states = this.states[position];
		if (states == null) {
			return false;
		}
		const selected = states[state];
		if (selected == null) {
			return false;
		}
		return !!selected.legged;
	}

	/**
	 * @param {SpritePositions} position
	 * @param {ZeroedClothingStates} state
	 * @returns {boolean}
	 */
	shouldShow(position, state) {
		if (state === 0) {
			return false;
		}
		const states = this.states[position];
		if (states == null) {
			return false;
		}
		const keys = Object.keys(states);
		return keys.includes(state);
	}
}
/** @type {Partial<Record<CombatClothingTypes, ClothingRendererStep>>} */
ClothingRendererStep.instances = {};
// @ts-ignore
window.ClothingRendererStep = ClothingRendererStep;

ClothingRendererStep.create("skirt", {
	missionary: {
		chest: {
			layered: false,
			legged: false,
		},
		midriff: {
			layered: false,
			legged: false,
		},
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		chest: {
			layered: false,
			legged: false,
		},
		midriff: {
			layered: false,
			legged: false,
		},
		waist: {
			layered: true,
			legged: false,
		},
		thighs: {
			layered: true,
			legged: false,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("longskirt", {
	missionary: {
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("trousers", {
	missionary: {
		chest: {
			layered: false,
			legged: false,
		},
		midriff: {
			layered: false,
			legged: false,
		},
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		chest: {
			layered: false,
			legged: false,
		},
		midriff: {
			layered: false,
			legged: false,
		},
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("shorts", {
	missionary: {
		chest: {
			layered: false,
			legged: false,
		},
		midriff: {
			layered: false,
			legged: false,
		},
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		chest: {
			layered: false,
			legged: false,
		},
		midriff: {
			layered: false,
			legged: false,
		},
		waist: {
			layered: true,
			legged: false,
		},
		thighs: {
			layered: true,
			legged: false,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("waisthighs", {
	missionary: {
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		waist: {
			layered: true,
			legged: true,
		},
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("thighhighs", {
	missionary: {
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		thighs: {
			layered: true,
			legged: true,
		},
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("kneehighs", {
	missionary: {
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		knees: {
			layered: true,
			legged: true,
		},
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("ankled", {
	missionary: {
		ankles: {
			layered: true,
			legged: true,
		},
	},
	doggy: {
		ankles: {
			layered: true,
			legged: true,
		},
	},
});

ClothingRendererStep.create("strapon", {
	missionary: {
		waist: {
			layered: false,
			legged: true,
		},
		thighs: {
			layered: false,
			legged: true,
		},
		knees: {
			layered: false,
			legged: true,
		},
		ankles: {
			layered: false,
			legged: true,
		},
	},
	doggy: {
		waist: {
			layered: false,
			legged: false,
		},
		thighs: {
			layered: false,
			legged: false,
		},
		knees: {
			layered: false,
			legged: false,
		},
		ankles: {
			layered: false,
			legged: true,
		},
	},
});
