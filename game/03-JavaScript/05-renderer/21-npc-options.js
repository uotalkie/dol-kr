// @ts-check
/* globals CombatRenderer, CharacterTypes, AnimationSpeed, PenetratorTypes, SpritePositions, Partial, Dict, Record */

/**
 * @typedef NpcOptions
 * @property {number} index
 * @property {"img/sex"} root
 * @property {string} src Typically "img/sex/missionary"
 * @property {Dict<Partial<CompositeLayerSpec>>} filters
 * @property {SpritePositions} position
 * @property {"shadow" | "beast"} category
 * @property {CharacterTypes} type
 * @property {boolean} isBlackWolf Don't want to manipulate type, so using this flag instead
 * @property {Penetrator[]} penetrators
 * @property {Balls} balls
 * @property {Drool} drool
 * @property {Tongue} tongue
 * @property {boolean} show
 * @property {string?} state
 * @property {Colour} colour
 * @property {AnimationSpeed} speed
 * @property {string} animKey
 * @property {string} animKeyStill
 */

/**
 * @typedef Balls
 * @property {boolean} hasBalls
 * @property {string=} type
 * @property {number=} size
 */

/**
 * @typedef Drool
 * @property {boolean} show
 * @property {number} amount
 */

/**
 * @typedef Tongue
 * @property {boolean} show
 * @property {string?} position
 */

/**
 * @typedef Ejaculate
 * @property {"sperm" | "pee" | "girlcum" | "sriracha"} type
 */

/**
 * @typedef Colour
 * @property {string} hex
 */

const beastModels = ["bear", "boar", "cat", "creature", "dog", "dolphin", "fox", "hawk", "horse", "centaur", "lizard", "pig", "wolf"];

class NpcCombatMapper {
	/** @returns {NpcOptions} */
	static generateOptions() {
		return {
			position: "missionary",
			root: "img/sex",
			src: "img/sex/missionary",
			animKey: "sex-2f-idle",
			animKeyStill: "sex-2f-idle",
			speed: "idle",
			index: 0,
			type: "human",
			category: "shadow",
			show: false,
			state: null,
			drool: {
				show: false,
				amount: 0,
			},
			tongue: {
				show: false,
				position: null,
			},
			penetrators: [],
			balls: {
				hasBalls: false,
			},
			colour: {
				hex: "#ffffff",
			},
			isBlackWolf: false,
			filters: {},
		};
	}

	/**
	 *
	 * @param {number} index
	 * @param {NpcOptions} options
	 * @returns {NpcOptions}
	 */
	static mapNpcToOptions(index, options) {
		// Set position
		options.position = CombatRenderer.getPosition(V.position);

		// Set directory for images
		options.root = "img/sex";
		options.src = `${options.root}/${options.position}`;

		// Configure state
		// Maybe use active_enemy? const index = V.active_enemy.
		const npc = V.NPCList[index];
		options.category = beastModels.includes(npc.type) ? "beast" : "shadow";
		options.type = CombatRenderer.getUnderlyingNpcType(npc);
		if (npc.fullDescription === "Black Wolf") {
			options.isBlackWolf = true;
		}
		options.state = null;
		options.show = false;

		NpcCombatMapper.mapNpcToBodyOptions(index, npc, options);

		// Set animation speed
		options.animKey = NpcCombatMapper.getNpcAnimation();
		options.animKeyStill = NpcCombatMapper.getNpcIdleAnimation();
		options.speed = NpcCombatMapper.getNpcAnimationSpeed();

		// Prevent showing if state is not set.
		if (options.state == null) {
			options.show = false;
		}
		return options;
	}

	/**
	 * @returns {string}
	 */
	static getNpcAnimation() {
		const speed = NpcCombatMapper.getNpcAnimationSpeed();
		const frames = NpcCombatMapper.getNpcAnimationFrameCount();
		return `sex-${frames}f-${speed}`;
	}

	/**
	 * @returns {string}
	 */
	static getNpcIdleAnimation() {
		return `sex-2f-idle`;
	}

	/**
	 * @returns {number}
	 */
	static getNpcAnimationFrameCount() {
		if (T.crOverrides?.animFrames) {
			return T.crOverrides.animFrames;
		}
		if (combat.isActive()) {
			return 4;
		}
		return 2;
	}

	/**
	 * @returns {AnimationSpeed}
	 */
	static getNpcAnimationSpeed() {
		if (T.crOverrides?.animSpeed) {
			return T.crOverrides.animSpeed;
		}
		if (combat.isRapid()) {
			return "vfast";
		}
		if (combat.isActive()) {
			if (V.enemytype === "machine") {
				switch (V.machine?.speed) {
					case 1:
						return "slow";
					case 2:
						return "fast";
					default:
						return "vfast";
				}
			}
			if (T.knotted || T.knotted_short) {
				return "mid";
			}
			if (V.enemyarousal >= (V.enemyarousalmax / 5) * 4) {
				return "vfast";
			}
			if (V.enemyarousal >= (V.enemyarousalmax / 5) * 3) {
				return "fast";
			}
			if (V.enemyarousal >= (V.enemyarousalmax / 5) * 1) {
				return "mid";
			}
			return "slow";
		}
		return "idle";
	}

	/**
	 * @param {number} index
	 * @param {Npc} npc
	 * @param {NpcOptions} options
	 * @returns {NpcOptions}
	 */
	static mapNpcToBodyOptions(index, npc, options) {
		options.balls = {
			hasBalls: ["pig", "boar"].includes(npc.type) && npc.penis !== "none", // Assuming balls have to be paired with penises?
		};
		options.drool = {
			show: false,
			amount: V.enemyarousal >= (V.enemyarousalmax / 5) * 3 ? 2 : 1,
		};
		options.tongue.show = typeof npc.mouth === "string" && ["mouth", "kiss", "kissentrance", "kissimminent", "anus", "anusentrance", "anusimminent", "vagina", "vaginaentrance", "vaginaimminent", "penis", "penisentrance", "penisimminent"].includes(npc.mouth);
		options.tongue.position = typeof npc.mouth === "string" ? npc.mouth : null;
		options.penetrators = options.penetrators = [];

		options.filters.skin = NpcCombatMapper.getNpcSkinFilter(npc);

		const penetrator = NpcCombatMapper.mapNpcToPenetratorOptions(index, npc, options);
		if (penetrator != null) {
			options.penetrators.push(penetrator);

			// Figure out which shadow base to use from penetrator:
			if (penetrator.position != null) {
				options.state = penetrator.position;
			}

			if (npc.stance === "top") {
				options.show = penetrator?.position != null && ["vagina", "anus", "thighs", "butt"].includes(penetrator.position);
			}

			// Add penetrator states to NPC state so the shadows can be staggered for oral.
			/*
			if (penetrator.position === "mouth") {
				options.state += "-" + penetrator.state;
			}
			*/
			// Calculate DP state from positions, if position is >= 2, add double at least, triple P not sure what to do.
			if (combat.penetratorCountBefore(index, penetrator.position) >= 2) {
				options.state += "-double";
				penetrator.state += "-double";
			}

			// Figure out whether to show the shadow man or not:
			options.show = penetrator.position != null && ["vagina", "anus", "mouth"].includes(penetrator.position);
		}

		NpcCombatMapper.mapNpcTypeToOptions(options, npc, penetrator);

		// If beast, return for now.
		if (options.category === "beast") {
			return options;
		}

		// Figure out whether the NPC is riding the PC, prepare for combat retardation
		if (V.penisuse === "otheranus" && V.penistarget === index) {
			options.show = false;
			options.state = "penis";
		}
		if (V.penisuse === "otherpenis" && V.penistarget === index) {
			options.show = false;
			options.state = "penis";
		}
		if (V.penisuse === "othervagina" && V.penistarget === index) {
			options.show = false;
			options.state = "penis";
		}

		// Since no penetrator exists on the NPC, check for their other states
		// WHY IS ANAL LIKE THIS
		if (typeof npc.penis === "string" && ["otheranusfrot", "otheranusentrance", "otheranusimminent", "otheranus"].includes(npc.penis)) {
			// options.state = options.category === "shadow" ? "default" : "under-default";
			options.show = true;
			return options;
		}

		if (options.category === "shadow" && ["penis"].includes(npc.vagina)) {
			options.state = "penis";
			options.show = true;
		}

		if (options.category !== "shadow" && ["penis", "penisimminent", "penisentrace"].includes(npc.vagina)) {
			options.state = "penis";
			options.show = true;
		}

		// Primary for being pinned:
		if (npc.stance === "top" && options.state == null) {
			// options.state = options.category === "shadow" ? "default" : "over-default";
			options.state = "vagina";
			options.show = true;
			return options;
		}

		return options;
	}

	/**
	 * @typedef {object} NpcTypeConfiguration
	 * @property {boolean} show
	 * @property {boolean=} hasOverSprite
	 * @property {boolean=} hasFrontSprite
	 * @property {boolean=} hasUnderSprite
	 * @property {Partial<Record<SpritePositions, NpcTypePositionConfiguration>>=} positions
	 */

	/**
	 * @typedef NpcTypePositionConfiguration
	 * @property {boolean=} hasOverSprite
	 * @property {boolean=} hasFrontSprite
	 * @property {boolean=} hasUnderSprite
	 */

	/**
	 * @returns {Partial<Record<CharacterTypes, NpcTypeConfiguration>>}
	 */
	static getNpcBeastTypeConfigurations() {
		return {
			bear: {
				show: true,
				hasFrontSprite: true,
				hasOverSprite: true,
				hasUnderSprite: true,
			},
			boar: {
				show: true,
				hasFrontSprite: true,
				hasOverSprite: true,
			},
			bull: {
				show: false,
			},
			cat: {
				show: true,
				hasOverSprite: true,
				hasUnderSprite: true,
			},
			centaur: {
				show: true,
				hasOverSprite: true,
			},
			cow: {
				show: false,
			},
			creature: {
				show: true,
				positions: {
					doggy: {
						hasOverSprite: true,
						hasUnderSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
			dog: {
				show: true,
				positions: {
					doggy: {
						hasFrontSprite: true,
						hasOverSprite: true,
						hasUnderSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
			dolphin: {
				show: true,
				positions: {
					doggy: {
						hasFrontSprite: true,
						hasOverSprite: true,
						hasUnderSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
			fox: {
				show: true,
				positions: {
					doggy: {
						hasFrontSprite: true,
						hasOverSprite: true,
						hasUnderSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
			harpy: {
				show: false,
			},
			hawk: {
				show: true,
				positions: {
					doggy: {
						hasOverSprite: true,
					},
				},
			},
			horse: {
				show: true,
				hasOverSprite: true,
				hasUnderSprite: true,
			},
			lizard: {
				show: true,
				positions: {
					doggy: {
						hasFrontSprite: true,
						hasOverSprite: true,
						hasUnderSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
			pig: {
				show: true,
				positions: {
					doggy: {
						hasFrontSprite: true,
						hasOverSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
			spider: {
				show: false,
			},
			wolf: {
				show: true,
				positions: {
					doggy: {
						hasFrontSprite: true,
						hasOverSprite: true,
						hasUnderSprite: true,
					},
					missionary: {
						hasOverSprite: true,
					},
				},
			},
		};
	}

	/**
	 * @param {SpritePositions} position
	 * @param {NpcTypeConfiguration} configuration
	 * @returns {boolean}
	 */
	static hasOverSprite(position, configuration) {
		if (configuration.positions && configuration.positions[position]?.hasOverSprite === true) {
			return true;
		}
		return !!configuration.hasOverSprite;
	}

	/**
	 * @param {SpritePositions} position
	 * @param {NpcTypeConfiguration} configuration
	 * @returns {boolean}
	 */
	static hasUnderSprite(position, configuration) {
		if (configuration.positions && configuration.positions[position]?.hasUnderSprite === true) {
			return true;
		}
		return !!configuration.hasUnderSprite;
	}

	/**
	 * @param {SpritePositions} position
	 * @param {NpcTypeConfiguration} configuration
	 * @returns {boolean}
	 */
	static hasFrontSprite(position, configuration) {
		if (configuration.positions && configuration.positions[position]?.hasFrontSprite === true) {
			return true;
		}
		return !!configuration.hasFrontSprite;
	}

	/**
	 * @param {Npc} npc
	 * @param {Penetrator?} penetrator
	 * @returns {boolean}
	 */
	static isOverPositioned(npc, penetrator) {
		if (["horse", "centaur"].includes(npc.type)) {
			return true;
		}
		if (penetrator?.position && ["vagina", "butt", "anus", "thighs"].includes(penetrator.position)) {
			return true;
		}
		if (penetrator?.position && ["feet", "leftarm", "rightarm"].includes(penetrator.position)) {
			return false;
		}
		if (npc.stance === "top") {
			return true;
		}
		return false;
	}

	/**
	 * @param {Npc} npc
	 * @returns {boolean}
	 */
	static isUnderPositioned(npc) {
		if (V.penisuse === "othervagina" && V.penistarget === npc.index) {
			return true;
		}
		if (V.penisuse === "otheranus" && V.penistarget === npc.index) {
			return true;
		}
		return false;
	}

	/**
	 * @param {Npc} npc
	 * @param {Penetrator?} penetrator
	 * @returns {boolean}
	 */
	static isFrontPositioned(npc, penetrator) {
		if (npc.stance === "topface") {
			return true;
		}
		if (penetrator?.position && ["mouth"].includes(penetrator.position)) {
			return true;
		}
		return false;
	}

	/**
	 * @param {NpcOptions} options
	 * @param {Npc} npc
	 * @param {Penetrator?} penetrator
	 * @returns {NpcOptions}
	 */
	static mapNpcTypeToOptions(options, npc, penetrator) {
		const configurations = NpcCombatMapper.getNpcBeastTypeConfigurations();
		const configuration = configurations[npc.type];

		// Humanoid
		if (configuration == null) {
			options.show = penetrator?.position != null && ["thighs", "vagina", "anus", "mouth"].includes(penetrator.position);
			options.state = penetrator?.position ?? null;
			return options;
		}

		// Beast
		options.show = false;

		if (!configuration.show) {
			options.show = false;
			options.state = null;
			return options;
		}

		if (NpcCombatMapper.hasUnderSprite(options.position, configuration) && NpcCombatMapper.isUnderPositioned(npc)) {
			options.show = true;
			options.state = "under";
			return options;
		}

		if (NpcCombatMapper.hasOverSprite(options.position, configuration) && NpcCombatMapper.isOverPositioned(npc, penetrator)) {
			options.drool.show = ["pig", "boar"].includes(npc.type) && NpcCombatMapper.isOverPositioned(npc, penetrator);
			options.show = true;
			options.state = ["horse", "centaur"].includes(npc.type) && penetrator?.state === "penetrating" ? "over-penetrated" : "over";
			return options;
		}

		if (NpcCombatMapper.hasFrontSprite(options.position, configuration) && NpcCombatMapper.isFrontPositioned(npc, penetrator)) {
			options.show = true;
			options.state = "front";
			return options;
		}

		return options;
	}

	/**
	 * @param {Npc} npc
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static getNpcSkinFilter(npc) {
		return setup.colours.getSkinFilter(npc.skincolour === "ghost" ? "ghost" : npc.skincolour === "white" ? "light" : "dark", 0);
	}

	/**
	 * @param {Npc} npc
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static getNpcPenetratorFilter(npc) {
		// Get any special colours, strapon, etc.
		if (npc.strapon) {
			// Figure out a filter for each strapon colour:
			switch (npc.strapon.color) {
				case "fleshy":
					return NpcCombatMapper.getNpcSkinFilter(npc);
				case "black":
					return {
						blend: "#504949",
						blendMode: "multiply",
						desaturate: true,
					};
				case "blue":
					return {
						blend: "#3973ac",
						blendMode: "multiply",
						desaturate: true,
					};
				case "green":
					return {
						blend: "#007400",
						blendMode: "multiply",
						desaturate: true,
					};
				case "pink":
					return {
						blend: "#ff80aa",
						blendMode: "multiply",
						desaturate: true,
					};
				case "purple":
					return {
						blend: "#ab66ff",
						blendMode: "multiply",
						desaturate: true,
					};
				case "red":
					return {
						blend: "#f53d43",
						blendMode: "multiply",
						desaturate: true,
					};
			}
		}
		return NpcCombatMapper.getNpcSkinFilter(npc);
	}

	/**
	 * @param {number} index
	 * @param {Npc} npc
	 * @param {NpcOptions} options
	 * @returns {Penetrator?}
	 */
	static mapNpcToPenetratorOptions(index, npc, options) {
		/** @type {Penetrator} */
		const penetrator = {
			show: false,
			type: NpcCombatMapper.getPenetratorType(npc),
			colour: npc.skincolour,
			target: combat.target.pc,
			isEjaculating: combat.isNpcPenetratorEjaculating(index, npc),
			ejaculate: {
				type: "sperm",
			},
			size: 0,
			position: null,
			state: null,
			condom: CombatRenderer.getCondomOptions(npc.condom),
		};

		Object.assign(penetrator, combat.getNpcPenetratorState(npc));

		options.filters.penetrator = NpcCombatMapper.getNpcPenetratorFilter(npc);
		options.filters.condom = penetrator.condom.colour;

		// Pig is in top/top-face position, but combat doesn't say the penis is at the mouth explicitly. This clause forces this state.
		if (["pig", "boar"].includes(npc.type)) {
			// If penetrator position is set, try to avoid fallbacks
			if (penetrator.position != null) {
				return penetrator;
			}
			if (npc.stance === "topface") {
				penetrator.show = npc.penis !== "none";
				penetrator.position = "mouth";
				penetrator.state = "entrance";
				return penetrator;
			}
			if (npc.stance === "top") {
				penetrator.show = npc.penis !== "none";
				penetrator.position = "vagina";
				// Pigs/boars have a layer adjustment, entrance doesn't cut it.
				penetrator.state = null;
				return penetrator;
			}
		}

		if (["horse", "centaur"].includes(npc.type)) {
			if (options.position === "missionary") {
				return null;
			}
			penetrator.show = npc.penis !== "none";
			penetrator.state = [V.anusstate, V.vaginastate].includes("penetrated") ? "penetrating" : "entrance";
			return penetrator;
		}

		if (!penetrator.show) {
			return null;
		}

		return penetrator;
	}

	/**
	 * @param {Npc} npc
	 * @returns {PenetratorTypes}
	 */
	static getPenetratorType(npc) {
		if (["dog", "doggirl", "dogboy", "wolf", "wolfgirl", "wolfboy", "fox", "foxgirl", "foxboy", "bear", "beargirl", "bearboy"].includes(npc.type)) {
			return "knotted";
		}
		if (["horse", "centaur"].includes(npc.type)) {
			return "equine";
		}
		// Previously called 'pointed'
		if (["cat", "catgirl", "catboy", "hawk", "harpy"].includes(npc.type)) {
			return "feline";
		}
		if (["pig", "piggirl", "pigboy", "boar", "boargirl", "boarboy"].includes(npc.type)) {
			return "sus";
		}
		return "human";
	}
}
window.NpcCombatMapper = NpcCombatMapper;
