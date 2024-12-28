// @ts-check
/* global Partial, Dict, Record, CombatRenderer, Player, Bodywriting, ClothedSlots, SkinColours, ShaftTarget, isTransformationPartEnabled, isChimeraEnabled, TotalClothingStates, TransformationKeys, TransformationParts, CombatClothingTypes, AnimationSpeed, LegPositions, MachineState, CondomOptions */

/**
 * @typedef CombatPlayerOptions
 * @type {object}
 * @property {"img/sex/" | "img/sex/"} root The root directory.
 * @property {"doggy"|"missionary"} position The position.
 * @property {boolean} isDebugging Flag for debugging mode. E.G. Shows frame number.
 * @property {boolean} showPlayer Flag to show the player model.
 * @property {boolean} showFace
 * @property {boolean} showClothing Flag to show the clothing layers.
 * @property {boolean} showNPCs Flag to show the NPC model(s).
 * @property {boolean} showTan Flag to show the player model's tan.
 * Computed
 * @property {string} src The computed directory path for the position.
 * @property {AnimationSpeed} speed The speed used for animation keyframes.
 * @property {string} animKey The key used for fetching the animation configuration.
 * @property {string} animKeyStill The key used for fetching the animation configuration for true still sprites.
 * @property {string} machineAnimKey The key used for fetching the animation configuration for machine sprites like milkers/dildos.
 * @property {number} breastSize The size of the player breasts.
 * @property {boolean} breastsExposed Whether the breasts are shown.
 * @property {number} bellySize The size of the player's belly.
 * @property {"hidden" | "exposed" | "clothed"} bellyState Whether the pregnant belly is hidden, exposed, or clothed.
 * @property {string} pregnantBellyPath Path to pregnant belly folder
 * @property {Penetrator?} penetrator Typically the PC's penis, or strapon etc.
 * @property {SkinColours} skinType
 * @property {number} skinTone
 * @property {string} hairType The type of hair.
 * @property {string} hairLength The named stage of the hair length.
 * @property {string} leftEye
 * @property {string} rightEye
 * @property {boolean} sclera Only a boolean for now, if we have more than red sclera, this can be changed.
 * @property {boolean} trauma Empty eyes
 * @property {LegPositions} legBackPosition The position the back leg is in.
 * @property {LegPositions} legFrontPosition The position the front leg is in.
 * @property {"default" | "bound" | "handjob"} armBackPosition The position the back arm is in.
 * @property {"default" | "bound" | "handjob"} armFrontPosition The position the front arm is in.
 * @property {boolean} genitalsExposed
 * @property {MouthOptions} mouth
 * @property {boolean} freckles
 * @property {number} blush The volume of blush on the player, higher is more. (1 to 5, usually)
 * @property {number} tears The volume of tears the player displays, higher is more. (1 to 5, usually)
 * @property {Partial<Record<ClothedSlots, ClothingState>>} clothes Template.
 * @property {Dict<Partial<CompositeLayerSpec>>} filters The filters for layers.
 * @property {Props} props
 * @property {Machines} machines
 * @property {Tentacles} tentacles
 * @property {BodywritingOptions} bodywriting
 * @property {Dict<TransformationOptions>} transformations
 * @property {Vore} vore
 * @property {MakeupOptions} makeup
 * @property {ParasiteOptions} parasite
 */

/**
 * @typedef ParasiteOptions
 * @property {ParasiteClothingOptions} clothing
 */

/**
 * @typedef ParasiteClothingOptions
 * @property {boolean} show
 * @property {"shorts" | "panties"} type
 */

/**
 * @typedef MakeupOptions
 * @property {Lipstick} lipstick
 * @property {Eyeshadow} eyeshadow
 */

/**
 * @typedef Lipstick
 * @property {boolean} show
 * @property {"open" | "closed"} state
 * @property {string} colour
 */

/**
 * @typedef Eyeshadow
 * @property {boolean} show
 * @property {string} colour
 */

/**
 * @typedef Vore
 * @property {number} stage
 * @property {boolean} show
 */

/**
 * @typedef MouthOptions
 * @property {boolean} inOral
 * @property {boolean} open
 */

/**
 * @typedef {object} BodywritingOptions
 * @property {boolean} isEnabled
 * @property {BodywritingOption} forehead
 * @property {BodywritingOption} backCheek
 * @property {BodywritingOption} frontCheek
 * @property {BodywritingOption} backShoulder
 * @property {BodywritingOption} frontShoulder
 * @property {BodywritingOption} breasts
 * @property {BodywritingOption} back
 * @property {BodywritingOption} backBottom
 * @property {BodywritingOption} frontBottom
 * @property {BodywritingOption} pubic
 * @property {BodywritingOption} backThigh
 * @property {BodywritingOption} frontThigh
 */

/**
 * @typedef {object} BodywritingOption
 * @property {boolean} show
 * @property {string} area
 * @property {string} type
 */

/**
 * @typedef {object} Props
 * @property {Prop} wall
 * @property {Prop} bench
 * @property {Prop} examTable
 * @property {Prop} haybale
 * @property {Prop} hospitalBed
 * @property {Prop} ivBag
 * @property {TankProp} milkTank
 * @property {PilloryProp} pillory
 * @property {TankProp} semenTank
 * @property {Prop} rail
 * @property {Prop} neck_shackle
 * @property {Prop} arm_shackle
 * @property {Prop} leg_shackle
 * @property {Prop} table
 * @property {Prop} web
 * @property {Prop} leash
 */

/**
 * @typedef {object} Prop
 * @property {boolean} show
 */

/**
 * @typedef {object} TankProp
 * @property {boolean} show
 * @property {boolean} isFull
 * @property {1|2|3|4|5|6|7} volume
 */

/**
 * @typedef {object} PilloryProp
 * @property {boolean} show
 * @property {boolean} isDirty
 * @property {boolean} hasHorse
 * @property {number} tomatoes
 */

/**
 * @typedef {object} Machines
 * @property {MachinePart} vaginal
 * @property {MachinePart} anal
 * @property {MachinePart} tattoo
 * @property {MachinePart} arm_chains
 * @property {MachinePart} leg_chains
 * @property {Machine} breastMilker
 * @property {Machine} penisMilker
 */

/**
 * @typedef {object} Machine
 * @property {boolean} show
 */

/**
 * @typedef {object} MachinePart
 * @property {boolean} show
 * @property {number} health
 * @property {number} ammo
 * @property {number} hack
 * @property {string} state
 * @property {string} use
 */

/**
 * @typedef ClothingState
 * @type {object}
 * @property {ClothesItem} item The clothing item's setup with worn properties copied over.
 * @property {ClothedSlots} slot
 * @property {string?} name The name of the clothing directory.
 * @property {PositionStates?} positions The position related state, typically holding leg state information for legwear/lowerwear.
 * @property {TotalClothingStates} state The state of the clothing, the file name.
 * @property {CombatClothingTypes=} renderStep The renderer step processor used for the combat renderer.
 * @property {boolean} show Whether to show the clothing layer.
 * @property {number} alpha The percent of the alpha channel. 1 is 100%, 0 is 0%.
 * @property {boolean} isExposed Whether the clothing layer exposes beneath.
 * @property {boolean} isSkirt Whether the clothing layer is a skirt.
 * @property {boolean} isRaised Whether the clothing layer (skirt) is displaced/raised.
 * @property {boolean} isBoundable Whether the clothing layer has a bound state.
 * @property {boolean} hasAccessory Whether the clothing uses accessory layer.
 * @property {boolean} hasMainImg Whether the clothing has a main img layer, tape for example.
 * @property {boolean} hasBackImg Whether the clothing has a back img layer, typically for headwear or handhelds.
 * @property {boolean} hasBackAccessory Whether the clothing has a back acc layer, typically for headwear or handhelds.
 * @property {boolean} hasMaskImg Whether the clothing uses a mask, typically for headwear or handhelds.
 * @property {PlayerJoinedState} joined Whether the clothing requires special sprites for different limb configurations (e.g. chain linking left up-right down legs is different than chain linking left up-right up legs).
 * @property {PlayerBreastState} breasts Breast state.
 * @property {PlayerSleeveState} sleeves Sleeve state.
 */

/**
 * @typedef PositionStates
 * @property {string} front
 * @property {string} back
 */

/**
 * @typedef PlayerJoinedState
 * @property {boolean} limbs
 * @property {boolean} limbsAccessory
 */

/**
 * @typedef PlayerBreastState
 * @property {boolean} hasAccessory Whether the breasts use accessory layer.
 * @property {boolean} show
 * @property {number} size
 */

/**
 * @typedef PlayerSleeveState
 * @property {boolean} hasAccessory Whether the sleeves use accessory layer.
 * @property {boolean} show
 * @property {boolean} useSecondary
 * @property {string} state
 */

/**
 * @typedef Tentacles
 * @property {Tentacle} anus
 * @property {Tentacle} breasts
 * @property {Tentacle} feet
 * @property {ArmTentacle} backArm
 * @property {ArmTentacle} frontArm
 * @property {LegTentacle} backLeg
 * @property {LegTentacle} frontLeg
 * @property {Tentacle} mouth
 * @property {Tentacle} penis
 * @property {Tentacle} vagina
 */

/**
 * @typedef Tentacle
 * @property {boolean} show
 * @property {string?} state
 */

/**
 * @typedef ArmTentacle
 * @property {boolean} show
 * @property {string?} state
 * @property {boolean} isBound
 */

/**
 * @typedef LegTentacle
 * @property {boolean} show
 * @property {boolean} isBound
 */

/**
 * @typedef TransformationOptions
 * @property {TransformationPartOptions} wings
 * @property {TransformationPartOptions} halo
 * @property {TransformationPartOptions} horns
 * @property {TransformationPartOptions} ears
 * @property {TransformationTailPartOptions} tail
 * @property {TransformationPartOptions} eyes
 * @property {TransformationPartOptions} cheeks
 * @property {TransformationPartOptions} malar
 * @property {TransformationPartOptions} pubes
 * @property {TransformationPartOptions} pits
 * @property {TransformationPartOptions} plumage
 */

/**
 * @typedef TransformationPartOptions
 * @property {boolean} show
 * @property {string} type
 * @property {string} style
 * @property {boolean} inFront
 */

/**
 * @typedef TransformationTailPartOptions
 * @property {boolean} show
 * @property {string} type
 * @property {string} style
 * @property {string} state
 * @property {boolean} inFront
 */

/** @type {CanvasModelOptions<CombatPlayerOptions>} */
class PlayerCombatMapper {
	/** @returns {Penetrator} */
	static get defaultPenetrator() {
		/** @type {Penetrator} */
		const penetrator = {
			show: false,
			type: "human",
			size: 0,
			colour: "#ffffff",
			target: 0,
			isEjaculating: false,
			ejaculate: {
				type: "sperm",
			},
			position: null,
			state: null,
			condom: PlayerCombatMapper.defaultCondom,
		};
		return { ...penetrator };
	}

	/** @returns {CondomOptions} */
	static get defaultCondom() {
		/** @type {CondomOptions} */
		const condom = {
			show: false,
			colour: {
				blend: "#ffffff",
			},
			isDefective: false,
			volume: 0,
		};
		return { ...condom };
	}

	/** @returns {Props} */
	static get defaultProps() {
		/** @type {Props} */
		const props = {
			arm_shackle: PlayerCombatMapper.defaultProp,
			bench: PlayerCombatMapper.defaultProp,
			examTable: PlayerCombatMapper.defaultProp,
			haybale: PlayerCombatMapper.defaultProp,
			hospitalBed: PlayerCombatMapper.defaultProp,
			ivBag: PlayerCombatMapper.defaultProp,
			leash: PlayerCombatMapper.defaultProp,
			leg_shackle: PlayerCombatMapper.defaultProp,
			neck_shackle: PlayerCombatMapper.defaultProp,
			rail: PlayerCombatMapper.defaultProp,
			table: PlayerCombatMapper.defaultProp,
			wall: PlayerCombatMapper.defaultProp,
			web: PlayerCombatMapper.defaultProp,
			milkTank: PlayerCombatMapper.defaultTankProp,
			semenTank: PlayerCombatMapper.defaultTankProp,
			pillory: PlayerCombatMapper.defaultPilloryProp,
		};
		return { ...props };
	}

	/** @returns {Prop} */
	static get defaultProp() {
		/** @type {Prop} */
		const prop = {
			show: false,
		};
		return { ...prop };
	}

	/** @returns {TankProp} */
	static get defaultTankProp() {
		/** @type {TankProp} */
		const prop = {
			show: false,
			isFull: false,
			volume: 1,
		};
		return { ...prop };
	}

	/** @returns {PilloryProp} */
	static get defaultPilloryProp() {
		/** @type {PilloryProp} */
		const prop = {
			show: false,
			hasHorse: false,
			isDirty: false,
			tomatoes: 0,
		};
		return { ...prop };
	}

	/** @returns {Machines} */
	static get defaultMachines() {
		/** @type {Machines} */
		const machines = {
			anal: PlayerCombatMapper.defaultMachinePart,
			arm_chains: PlayerCombatMapper.defaultMachinePart,
			leg_chains: PlayerCombatMapper.defaultMachinePart,
			tattoo: PlayerCombatMapper.defaultMachinePart,
			vaginal: PlayerCombatMapper.defaultMachinePart,
			breastMilker: PlayerCombatMapper.defaultMachine,
			penisMilker: PlayerCombatMapper.defaultMachine,
		};
		return { ...machines };
	}

	/** @returns {Machine} */
	static get defaultMachine() {
		/** @type {Machine} */
		const machine = {
			show: false,
		};
		return { ...machine };
	}

	/** @returns {MachinePart} */
	static get defaultMachinePart() {
		/** @type {MachinePart} */
		const part = {
			ammo: 0,
			hack: 0,
			health: 0,
			show: false,
			state: "ready",
			use: "ready",
		};
		return { ...part };
	}

	/** @returns {Tentacles} */
	static get defaultTentacles() {
		/** @type {Tentacles} */
		const tentacles = {
			anus: PlayerCombatMapper.defaultTentacle,
			backArm: PlayerCombatMapper.defaultTentacleArm,
			backLeg: PlayerCombatMapper.defaultTentacleLeg,
			breasts: PlayerCombatMapper.defaultTentacle,
			feet: PlayerCombatMapper.defaultTentacle,
			frontArm: PlayerCombatMapper.defaultTentacleArm,
			frontLeg: PlayerCombatMapper.defaultTentacleLeg,
			mouth: PlayerCombatMapper.defaultTentacle,
			penis: PlayerCombatMapper.defaultTentacle,
			vagina: PlayerCombatMapper.defaultTentacle,
		};
		return { ...tentacles };
	}

	/** @returns {Tentacle} */
	static get defaultTentacle() {
		/** @type {Tentacle} */
		const tentacle = {
			show: false,
			state: null,
		};
		return { ...tentacle };
	}

	/** @returns {ArmTentacle} */
	static get defaultTentacleArm() {
		/** @type {ArmTentacle} */
		const tentacle = {
			show: false,
			isBound: false,
			state: null,
		};
		return { ...tentacle };
	}

	/** @returns {LegTentacle} */
	static get defaultTentacleLeg() {
		/** @type {LegTentacle} */
		const tentacle = {
			show: false,
			isBound: false,
		};
		return { ...tentacle };
	}

	/** @returns {BodywritingOptions} */
	static get defaultBodywritings() {
		/** @type {BodywritingOptions} */
		const bodywritings = {
			back: PlayerCombatMapper.defaultBodywriting,
			breasts: PlayerCombatMapper.defaultBodywriting,
			backBottom: PlayerCombatMapper.defaultBodywriting,
			forehead: PlayerCombatMapper.defaultBodywriting,
			backCheek: PlayerCombatMapper.defaultBodywriting,
			frontCheek: PlayerCombatMapper.defaultBodywriting,
			backShoulder: PlayerCombatMapper.defaultBodywriting,
			frontShoulder: PlayerCombatMapper.defaultBodywriting,
			frontBottom: PlayerCombatMapper.defaultBodywriting,
			pubic: PlayerCombatMapper.defaultBodywriting,
			backThigh: PlayerCombatMapper.defaultBodywriting,
			frontThigh: PlayerCombatMapper.defaultBodywriting,
			isEnabled: false,
		};
		return { ...bodywritings };
	}

	/** @returns {BodywritingOption} */
	static get defaultBodywriting() {
		/** @type {BodywritingOption} */
		const bodywriting = {
			show: false,
			area: "",
			type: "",
		};
		return { ...bodywriting };
	}

	/** @returns {ClothingState} */
	static get defaultClothing() {
		/** @type {ClothingState} */
		const clothing = {
			item: CombatRenderer.emptyClothing,
			slot: "upper",
			name: "invalid",
			positions: null,
			state: "default",
			show: false,
			alpha: 1,
			isSkirt: false,
			isRaised: false,
			isExposed: false,
			isBoundable: false,
			hasAccessory: false,
			hasMainImg: false,
			hasBackImg: false,
			hasBackAccessory: false,
			hasMaskImg: false,
			joined: {
				limbs: false,
				limbsAccessory: false,
			},
			breasts: {
				hasAccessory: false,
				show: false,
				size: 0,
			},
			sleeves: {
				hasAccessory: false,
				show: false,
				useSecondary: false,
				state: "default",
			},
		};
		return { ...clothing };
	}

	/** @returns {MakeupOptions} */
	static get defaultMakeup() {
		/** @type {MakeupOptions} */
		const makeup = {
			eyeshadow: {
				show: false,
				colour: "white",
			},
			lipstick: {
				show: false,
				state: "closed",
				colour: "white",
			},
		};
		return { ...makeup };
	}

	/** @returns {CombatPlayerOptions} */
	static generateOptions() {
		return {
			root: "img/sex/",
			position: "missionary",
			isDebugging: false,
			showPlayer: true,
			showFace: true,
			showClothing: true,
			showNPCs: true,
			mouth: {
				inOral: false,
				open: false,
			},
			speed: "idle",
			hairType: "default",
			filters: {
				worn: {},
			},
			showTan: true,
			src: "img/sex/missionary/",
			legBackPosition: "down",
			legFrontPosition: "down",
			armBackPosition: "default",
			armFrontPosition: "default",
			animKey: "sex-2f-idle",
			animKeyStill: "sex-2f-idle",
			machineAnimKey: "machine-4f-slow",
			freckles: false,
			blush: 0,
			breastsExposed: false,
			breastSize: 0,
			bellyState: "hidden",
			pregnantBellyPath: "base",
			bellySize: 0,
			genitalsExposed: false,
			hairLength: "short",
			leftEye: "blue",
			rightEye: "blue",
			sclera: false,
			trauma: false,
			skinTone: 0,
			skinType: "light",
			tears: 0,
			vore: {
				stage: 0,
				show: false,
			},
			makeup: PlayerCombatMapper.defaultMakeup,
			clothes: {},
			transformations: {},
			penetrator: PlayerCombatMapper.defaultPenetrator,
			props: PlayerCombatMapper.defaultProps,
			machines: PlayerCombatMapper.defaultMachines,
			tentacles: PlayerCombatMapper.defaultTentacles,
			bodywriting: PlayerCombatMapper.defaultBodywritings,
			parasite: {
				clothing: {
					show: false,
					type: "panties",
				},
			},
		};
	}

	/**
	 * @param {CombatPlayerOptions=} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapPlayerToOptions(options) {
		if (options == null) {
			options = PlayerCombatMapper.generateOptions();
		}

		options.isDebugging = !!V.debug;

		// Set position
		options.position = CombatRenderer.getPosition(V.position);

		// Set directory for images
		options.src = options.root + options.position + "/";

		// Set hair properties
		PlayerCombatMapper.generateHairFilters(options);

		// Set breast exposed, for example, an NPC had pushed clothing aside to make tits fall out
		options.breastsExposed = true;

		// Copied from <<leg_position>> - Centralise usage later. Added footjob state
		options.legBackPosition = PlayerCombatMapper.mapPcToLegBackPosition(options);
		options.legFrontPosition = PlayerCombatMapper.mapPcToLegFrontPosition(options);

		// Mouth configuration
		options.mouth.inOral = combat.isMouthActive();
		options.mouth.open = PlayerCombatMapper.getMouthState();

		// Set values for freckles, blush, and tears
		options.freckles = !!V.player.freckles;
		options.blush = Math.floor(Math.clamp(V.arousal / 2000 + 1, 0, 5));
		options.tears = painToTearsLvl(V.pain);

		// Ensure breast size is calculated before clothing options.
		const breastSize = Math.round(V.player.perceived_breastsize / 3);
		options.breastSize = Math.clamp(breastSize, 0, 4);

		// Ditto for belly size.
		options.bellySize = playerBellySize();

		// Clothing options
		PlayerCombatMapper.mapPcToClothingOptions(V.player, options);

		// Ensure body options comes after clothing options
		PlayerCombatMapper.mapPcToBodyOptions(V.player, options);

		PlayerCombatMapper.mapToTransformationOptions(options);

		if (V.player.penisExist) {
			options.penetrator = PlayerCombatMapper.mapPcToPenetratorOptions(V.player, options);
		}

		options.bellyState = PlayerCombatMapper.isBellyExposed(options);

		// Temporary default folder until more clothing items get preg belly variants
		options.pregnantBellyPath = options.bellyState === "clothed" ? "clothed/default" : "base";

		CombatRenderer.generateBodyFilters(options);

		// Eyes
		if (V.possessed) {
			options.trauma = V.possessed;
			options.leftEye = ["haunt", "despair"].includes(V.wraith.state) ? "red possessed" : "blue possessed";
			options.rightEye = ["haunt", "despair"].includes(V.wraith.state) ? "red possessed" : "blue possessed";
		} else {
			options.trauma = V.trauma >= V.traumamax * 0.9;
			options.leftEye = V.makeup.eyelenses.left || V.leftEyeColour || "blue";
			options.rightEye = V.makeup.eyelenses.right || V.rightEyeColour || "blue";
		}

		options.filters.leftEye = CombatRenderer.lookupColour(setup.colours.eyes_map, options.leftEye, "leftEye", undefined, "eyes");
		options.filters.rightEye = CombatRenderer.lookupColour(setup.colours.eyes_map, options.rightEye, "rightEye", undefined, "eyes");

		options.sclera = V.pain >= 100 || V.tiredness >= C.tiredness.max;

		// Set makeup
		options.makeup = PlayerCombatMapper.genMakeup();

		// Set props
		PlayerCombatMapper.mapToPropsOptions(options);

		// Set machine
		PlayerCombatMapper.mapToMachineOptions(options);

		// Set tentacles
		PlayerCombatMapper.mapToTentacleOptions(options);

		// Vore stuff
		options.vore.show = options.position === "doggy" && V.vorestage > 0 && V.vorestage <= 7;
		options.vore.stage = V.vorestage || 0;

		// Parasite stuff
		if (V.parasite.penis.name === "parasite" || V.parasite.clit.name === "parasite") {
			options.parasite.clothing.show = true;
			options.parasite.clothing.type = V.earSlime.focus === "impregnation" ? "shorts" : "panties";
			/** @type {Partial<CompositeLayerSpec>} */
			options.filters.parasiteClothing = {
				blend: "#f00",
				blendMode: "hard-light",
			};
		}

		// Set animation speed
		options.animKey = PlayerCombatMapper.getPcAnimation(options);
		options.animKeyStill = PlayerCombatMapper.getPcAnimation(options);
		options.machineAnimKey = PlayerCombatMapper.getMachineAnimationSpeed(options);
		options.speed = PlayerCombatMapper.getPcAnimationSpeed(options);

		PlayerCombatMapper.genMakeupFilters(options);

		return options;
	}

	static getMouthState() {
		return combat.isActive() && V.arousalmax / V.arousal > 0.6;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {string}
	 */
	static getPcAnimation(options) {
		const speed = PlayerCombatMapper.getPcAnimationSpeed(options);
		const frames = PlayerCombatMapper.getPcAnimationFrameCount(options);
		return `sex-${frames}f-${speed}`;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {number}
	 */
	static getPcAnimationFrameCount(options) {
		if (T.crOverrides?.animFrames) {
			return T.crOverrides.animFrames;
		}
		if (options.props.semenTank.show || options.props.milkTank.show) {
			return 2;
		}
		if (combat.isActive()) {
			return 4;
		}
		return 2;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {AnimationSpeed}
	 */
	static getPcAnimationSpeed(options) {
		if (T.crOverrides?.animSpeed) {
			return T.crOverrides.animSpeed;
		}
		if (options.props.semenTank.show || options.props.milkTank.show) {
			return "idle";
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
					case 3:
						return "vfast";
					default:
						return "vfast";
				}
			} else {
				if (T.knotted || T.knotted_short) return "mid";
				if (V.enemyarousal >= (V.enemyarousalmax / 5) * 4) return "vfast";
				if (V.enemyarousal >= (V.enemyarousalmax / 5) * 3) return "fast";
				if (V.enemyarousal >= (V.enemyarousalmax / 5) * 1) return "mid";
				return "slow";
			}
		}
		return "idle";
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {string}
	 */
	static getMachineAnimationSpeed(options) {
		if (options.machines.penisMilker.show || options.machines.breastMilker.show) {
			return "machine-2f-slow";
		}
		if (combat.isActive()) {
			switch (V.machine?.speed) {
				case 1:
					return "machine-4f-slow";
				case 2:
					return "machine-4f-fast";
				case 3:
					return "machine-4f-vfast";
				default:
					return "machine-4f-vfast";
			}
		}
		return "machine-4f-slow";
	}

	/**
	 * @returns {MakeupOptions}
	 */
	static genMakeup() {
		if (V.makeup == null) {
			return PlayerCombatMapper.defaultMakeup;
		}
		return {
			eyeshadow: PlayerCombatMapper.genEyeshadow(),
			lipstick: PlayerCombatMapper.genLipstick(),
		};
	}

	/**
	 * @returns {Eyeshadow}
	 */
	static genEyeshadow() {
		const colour = V.makeup.eyeshadow;
		// Gen filters for eyeshadow

		return {
			show: !!colour,
			colour,
		};
	}

	/**
	 * @returns {Lipstick}
	 */
	static genLipstick() {
		const colour = V.makeup.lipstick;
		return {
			show: !!colour,
			state: PlayerCombatMapper.getMouthState() ? "open" : "closed",
			colour,
		};
	}

	/**
	 * @param {CombatPlayerOptions} options
	 */
	static genMakeupFilters(options) {
		options.filters ||= {};

		const eyeshadow = options.makeup.eyeshadow;
		options.filters.eyeshadow = eyeshadow.show
			? CombatRenderer.lookupColour(setup.colours.eyeshadow_map, eyeshadow.colour, "eyeshadow", "eyeshadow_custom", "eyeshadow")
			: Renderer.emptyLayerFilter();

		const lipstick = options.makeup.lipstick;
		options.filters.lipstick = lipstick.show
			? CombatRenderer.lookupColour(setup.colours.lipstick_map, lipstick.colour, "lipstick", "lipstick_custom", "lipstick")
			: Renderer.emptyLayerFilter();
	}

	/**
	 *
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapToPropsOptions(options) {
		/**
		 * @param {number} source
		 * @returns {1 | 2 | 3 | 4 | 5 | 6 | 7}
		 */
		function mapVolume(source) {
			if (source >= 3000) {
				return 7;
			}
			if (source >= 2000) {
				return 6;
			}
			if (source >= 1500) {
				return 5;
			}
			if (source >= 1000) {
				return 4;
			}
			if (source >= 500) {
				return 3;
			}
			if (source >= 200) {
				return 2;
			}
			return 1;
		}

		/**
		 * @param {string} id
		 * @param {number} volume
		 * @returns {TankProp}
		 */
		function createTank(id, volume) {
			const level = mapVolume(volume);
			return {
				show: V.prop.includes(id),
				isFull: level === 7,
				volume: level,
			};
		}

		/**
		 * @param {string} id
		 * @returns {Prop}
		 */
		function createProp(id) {
			return {
				show: V.prop.includes(id),
			};
		}

		/**
		 * @returns {Prop}
		 */
		function createWall() {
			return {
				show: V.position === "wall" && V.walltype === "wall",
			};
		}

		/**
		 * @returns {PilloryProp}
		 */
		function createPillory() {
			const audience = V.pilloryaudience || 0;
			const tomatoes = V.walltype === "pillory" ? Math.clamp(audience - 1, 1, 4) : 0;
			return {
				show: V.position === "wall" && !!V.walltype && ["cleanpillory", "horse_pillory", "pillory"].includes(V.walltype),
				isDirty: V.walltype === "pillory",
				hasHorse: V.walltype === "horse_pillory",
				tomatoes,
			};
		}

		options.props = {
			wall: createWall(),
			bench: createProp("bench"),
			examTable: createProp("examtable"),
			haybale: createProp("haybale"),
			hospitalBed: createProp("hospitalbed"),
			ivBag: createProp("ivbag"),
			milkTank: createTank("milk", T.barn_milk),
			pillory: createPillory(),
			semenTank: createTank("semen", T.barn_semen),
			rail: createProp("rails"),
			neck_shackle: createProp("neck_shackle"),
			arm_shackle: createProp("arm_shackle"),
			leg_shackle: createProp("leg_shackle"),
			table: createProp("table"),
			web: createProp("web"),
			leash: {
				show: V.worn.neck.collared === 1,
			},
		};

		return options;
	}

	/**
	 *
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapToMachineOptions(options) {
		/**
		 * @param {string} id
		 * @returns {Prop}
		 */
		function createMachineProp(id) {
			return {
				show: V.prop.includes(id),
			};
		}

		/**
		 * @param {string} id
		 * @returns {MachinePart}
		 */
		function createMachinePart(id) {
			const defaults = PlayerCombatMapper.defaultMachinePart;
			if (!V.machine) {
				return defaults;
			}
			/** @type {MachineState} */
			const machine = V.machine[id];
			if (machine == null) {
				return defaults;
			}
			let show = true;
			if (["vaginal", "anal"].includes(id) && !["penetrated", "entrance", "imminent"].includes(machine.state)) {
				show = false;
			}
			if (id === "tattoo") {
				show = machine.state !== "inert";
			}
			return {
				show,
				health: machine.health || defaults.health,
				ammo: machine.ammo || defaults.ammo,
				hack: machine.hack || defaults.hack,
				state: machine.state || defaults.state,
				use: machine.use || defaults.use,
			};
		}

		options.machines = {
			penisMilker: createMachineProp("penis_pump"),
			breastMilker: createMachineProp("breast_pump"),
			vaginal: createMachinePart("vaginal"),
			anal: createMachinePart("anal"),
			tattoo: createMachinePart("tattoo"),
			arm_chains: createMachinePart("arm_chains"),
			leg_chains: createMachinePart("leg_chains"),
		};

		return options;
	}

	/**
	 * @returns {TentacleState[]}
	 */
	static getTentacles() {
		const count = V.tentacles.active;
		const tentacles = [];
		for (let i = 0; i < count; i++) {
			const tentacle = V.tentacles[i];
			tentacles.push(tentacle);
		}
		return tentacles;
	}

	/**
	 * @param {...Object<string, string>} parts
	 * @returns {string?}
	 */
	static getTentacleHeadPosition(...parts) {
		const count = V.tentacles.max;
		// const count = V.tentacles.active;
		for (let i = 0; i < count; i++) {
			/** @type {TentacleState?} */
			const tentacle = V.tentacles[i];

			if (tentacle == null) {
				continue;
			}

			if (tentacle.tentaclehealth <= 0 && tentacle.head === "finished") {
				continue;
			}

			const part = parts.find(part => tentacle.head in part);
			if (part) {
				return part[tentacle.head];
			}
		}
		return null;
	}

	/**
	 * @param {ShaftTarget} target
	 * @returns {TentacleState?}
	 */
	static getTentacleByShaft(target) {
		const count = V.tentacles.max;
		// const count = V.tentacles.active;
		for (let i = 0; i < count; i++) {
			/** @type {TentacleState?} */
			const tentacle = V.tentacles[i];

			if (tentacle == null) {
				continue;
			}

			if (tentacle.tentaclehealth <= 0 && tentacle.shaft === "finished") {
				continue;
			}

			if (tentacle.shaft === target) {
				return tentacle;
			}
		}
		return null;
	}

	/**
	 *
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapToTentacleOptions(options) {
		/**
		 * @param {Dict<string>=} parts
		 * @returns {Tentacle}
		 */
		function getState(parts) {
			const state = PlayerCombatMapper.getTentacleHeadPosition(parts || {});
			return {
				state,
				show: state != null,
			};
		}

		/**
		 * @param {ShaftTarget} target
		 * @param {Dict<string>} parts
		 * @returns {ArmTentacle}
		 */
		function getArmState(target, parts) {
			const state = PlayerCombatMapper.getTentacleHeadPosition(parts);
			const tentacle = PlayerCombatMapper.getTentacleByShaft(target);
			const isBound = tentacle != null && V[target] === "grappled";
			return {
				show: state != null || isBound,
				state,
				isBound,
			};
		}

		/**
		 * @param {ShaftTarget} target
		 * @returns {LegTentacle}
		 */
		function getLegState(target) {
			const tentacle = PlayerCombatMapper.getTentacleByShaft(target);
			const isBound = tentacle != null && V[target] === "grappled";
			return {
				show: isBound,
				isBound,
			};
		}

		options.filters.tentacles = PlayerCombatMapper.getTentacleFilter();

		/** @type {Partial<Tentacles>} */
		const tentacles = options.tentacles;

		if (V.mouthstate !== 0 || V.mouthuse !== 0) {
			tentacles.mouth = getState({ mouthentrance: "oral-entrance", mouthimminent: "oral-imminent", mouth: "oral", mouthdeep: "oral" });
		}
		tentacles.breasts = getState();
		// Tentacle code requires that I check the states.
		if (V.penisstate !== 0 || V.penisuse !== 0) {
			tentacles.penis = getState({
				penisentrance: "penis-entrance-0",
				penisimminent: "penis-imminent",
				penis: "penis",
				penisdeep: "penis",
				penisrub: "penis",
			});
		}
		if (V.vaginastate !== 0 || V.vaginause !== 0) {
			tentacles.vagina = getState({
				vaginaentrance: "vagina-entrance",
				vaginaimminent: "vagina-imminent",
				vagina: "vagina",
				vaginadeep: "vagina",
				vaginarub: "vagina-rub",
			});
		}
		if (V.anusstate !== 0 || V.anususe !== 0) {
			tentacles.anus = getState({ anusentrance: "anal-entrance", anusimminent: "anal-imminent", anus: "anal", anusrub: "anal-rub", anusdeep: "anal" });
		}
		if (V.feetstate !== 0 || V.feetuse !== 0) {
			tentacles.feet = getState({ finished: "footjob", feet: "footjob" });
		}

		switch (options.position) {
			case "doggy":
				tentacles.backArm = getArmState("rightarm", { rightarm: "handjob-right" });
				tentacles.frontArm = getArmState("leftarm", { leftarm: "handjob-left" });
				break;
			case "missionary":
				tentacles.backArm = getArmState("leftarm", { leftarm: "handjob-left" });
				tentacles.frontArm = getArmState("rightarm", { rightarm: "handjob-right" });
				tentacles.backLeg = getLegState("leftleg");
				tentacles.frontLeg = getLegState("rightleg");
				break;
		}

		return options;
	}

	/**
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static getTentacleFilter() {
		switch (V.tentacleColour) {
			case "tentacles-blue":
				return {
					blend: "#1431dc",
					blendMode: "hard-light",
				};
			case "tentacles-vines":
				return {
					blend: "#18a058",
					blendMode: "hard-light",
				};
			case "tentacles-roots":
				return {
					blend: "#8d4d19",
					blendMode: "hard-light",
				};
			case "tentacles-red":
				return {
					blend: "#d80e04",
					blendMode: "hard-light",
				};
			case "tentacles-purple":
				return {
					blend: "#b509a8",
					blendMode: "hard-light",
				};
			case "tentacles-peach":
				return {
					blend: "#f99889",
					blendMode: "hard-light",
				};
			case "tentacles-wraith":
				return {
					blend: "#bbb",
					blendMode: "hard-light",
					alpha: 0.6,
				};
			case "tentacles-wraith-penetrated":
				return {
					blend: "#bbb",
					blendMode: "hard-light",
					alpha: 0.6,
				};
			default:
				return {
					blend: "#67006d",
					blendMode: "hard-light",
				};
		}
	}

	/**
	 *
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapPcToArmPosition(options) {
		if (options.position === "missionary") {
			options.armBackPosition = PlayerCombatMapper.getArmState(V.leftarm);
			options.armFrontPosition = PlayerCombatMapper.getArmState(V.rightarm);
			return options;
		}
		options.armBackPosition = PlayerCombatMapper.getArmState(V.rightarm);
		options.armFrontPosition = PlayerCombatMapper.getArmState(V.leftarm);
		return options;
	}

	/**
	 * @param {object} arm
	 * @returns {"bound" | "handjob" | "default"}
	 */
	static getArmState(arm) {
		if (["bound", "grappled", "behind"].includes(arm)) {
			return "bound";
		}
		if (
			[
				"penis",
				"tentacle0",
				"tentacle1",
				"tentacle2",
				"tentacle3",
				"tentacle4",
				"tentacle5",
				"tentacle6",
				"tentacle7",
				"tentacle8",
				"tentacle9",
				"tentacle10",
				"tentacle11",
				"tentacle12",
				"tentacle13",
				"tentacle14",
				"tentacle15",
				"tentacle16",
				"tentacle17",
				"tentacle18",
				"tentacle19",
				"tentacle20",
			].includes(arm)
		) {
			return "handjob";
		}
		return "default";
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {"up" | "down" | "footjob"}
	 */
	static mapPcToLegFrontPosition(options) {
		// Overrides
		if (T.crOverrides?.legFrontPosition) {
			return T.crOverrides.legFrontPosition;
		}
		// General
		if (options.position === "missionary") {
			if (V.feetuse === "penis" || V.feetstate === "tentacle") {
				return "footjob";
			}
			if (V.NPCList.some(a => ["horse", "centaur"].includes(a.type))) {
				return "down";
			}
			if (V.NPCList.some(a => ["dog", "pig", "boar"].includes(a.type))) {
				return "up";
			}
			if (PlayerCombatMapper.getTentacleByShaft("rightleg") !== null && V.rightleg === "grappled") {
				return "up";
			}
			if ((typeof V.vaginastate === "string" && ["othermouth", "othermouthentrance", "othermouthimminent"].includes(V.vaginastate)) || V.vaginause === "othermouth") {
				return "up";
			}
		}
		if (V.feetuse === "penis" || V.feetstate === "tentacle") {
			return "up";
		}
		if (V.machine && V.machine.tattoo && ["left_thigh", "right_thigh"].includes(V.machine.tattoo.use)) {
			return "up";
		}
		if (options.position === "doggy") {
			return "down";
		}
		const parts = [V.anususe, V.vaginause, V.thighuse];
		if (parts.includes("penis") || parts.includes(1) || parts.includes("machine")) {
			return "up";
		}
		if (combat.vaginaCount >= 2 || combat.anusCount >= 2) {
			return "up";
		}
		return "down";
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {"up" | "down" | "footjob"}
	 */
	static mapPcToLegBackPosition(options) {
		// Overrides
		if (T.crOverrides?.legBackPosition) {
			return T.crOverrides.legBackPosition;
		}
		// General
		if (options.position === "missionary") {
			if (V.feetuse === "penis" || V.feetstate === "tentacle") {
				return "up";
			}
			if (V.NPCList.some(a => a.type === "horse" && NpcCombatMapper.isUnderPositioned(a))) {
				return "down";
			}
			if (V.NPCList.some(a => ["horse", "centaur", "dog", "pig", "boar"].includes(a.type))) {
				return "up";
			}
			if (PlayerCombatMapper.getTentacleByShaft("leftleg") !== null && V.leftleg === "grappled") {
				return "up";
			}
			if ((typeof V.vaginastate === "string" && ["othermouth", "othermouthentrance", "othermouthimminent"].includes(V.vaginastate)) || V.vaginause === "othermouth") {
				return "up";
			}
		}
		if (V.feetuse === "penis" || V.feetstate === "tentacle") {
			return "up";
		}
		if (V.machine && V.machine.tattoo && ["left_thigh", "right_thigh"].includes(V.machine.tattoo.use)) {
			return "up";
		}
		if (options.position === "doggy") {
			return "down";
		}
		const parts = [V.anususe, V.vaginause, V.thighuse];
		if (parts.includes("penis") || parts.includes(1) || parts.includes("machine")) {
			return "up";
		}
		if (combat.vaginaCount >= 2 || combat.anusCount >= 2) {
			return "up";
		}
		return "down";
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @param {ClothingState} clothing
	 * @returns {TotalClothingStates[]}
	 */
	static getExposedStates(options, clothing) {
		/** @type {TotalClothingStates[]} */
		const exposedStates = ["neck", "midriff", "thighs", "knees", "ankles", "totheside"];
		const areLegsUp = ["up", "footjob"].includes(options.legBackPosition) || ["up", "footjob"].includes(options.legFrontPosition);
		if (clothing.isSkirt && options.position === "missionary" && areLegsUp) {
			exposedStates.pushUnique("waist");
		}
		return exposedStates;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {"hidden" | "exposed" | "clothed"}
	 */
	static isBellyExposed(options) {
		const upper = options.clothes.upper;
		const upperExposed = !upper?.show || PlayerCombatMapper.isClothingExposed(options, upper);
		const lower = options.clothes.lower;
		const lowerExposed = !lower?.show || PlayerCombatMapper.isClothingExposed(options, lower);

		if (options.bellySize <= 7 && !V.worn.upper?.type.includesAny("naked", "bellyShow") && !upperExposed && !lowerExposed) {
			return "hidden";
		}
		if (V.worn.upper?.type.includesAny("naked", "bellyShow") || upperExposed) {
			return "exposed";
		}
		return "clothed";
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @param {ClothingState} clothing
	 * @returns {boolean}
	 */
	static isClothingExposed(options, clothing) {
		return clothing.isExposed || PlayerCombatMapper.getExposedStates(options, clothing).includes(clothing.state);
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {boolean}
	 */
	static isPenisExposed(options) {
		const lower = options.clothes.lower;
		const lowerExposed = !lower?.show || PlayerCombatMapper.isClothingExposed(options, lower);

		const underLower = options.clothes.under_lower;
		const underLowerExposed = !underLower?.show || PlayerCombatMapper.isClothingExposed(options, underLower);

		const overLower = options.clothes.over_lower;
		const overLowerExposed = !overLower?.show || PlayerCombatMapper.isClothingExposed(options, overLower);

		const clothingExposed = lowerExposed && underLowerExposed && overLowerExposed;

		return clothingExposed;
	}

	/**
	 *
	 * @param {Player} pc
	 * @param {CombatPlayerOptions} options
	 * @returns {Penetrator?}
	 */
	static mapPcToPenetratorOptions(pc, options) {
		const hasPenetrator = pc.penisExist || playerHasStrapon();
		const isExposed = PlayerCombatMapper.isPenisExposed(options);
		const hasChastityBelt = ["chastitybeltfetish", "goldchastitybelt", "chastitybelt", "flatchastitycage"].includes(V.worn.genitals.variable);
		const isEjaculating = V.orgasmdown > 0 &&
			V.penisstate !== "penetrated" &&
			V.orgasmcount < 25 &&
			V.femaleclimax !== 1 &&
			!hasChastityBelt &&
			!playerHasStrapon() &&
			wearingCondom("player") !== "worn" &&
			(V.parasite.penis.name === "parasite" || V.parasite.penis.name == null);
		/** @type {Penetrator} */
		const penetrator = {
			show: hasPenetrator && isExposed && !hasChastityBelt,
			type: playerHasStrapon() ? "strapon" : "human",
			size: pc.penissize,
			colour: pc.skin.color,
			target: V.penistarget,
			isEjaculating,
			ejaculate: {
				type: "sperm",
			},
			position: null,
			state: null,
			condom: CombatRenderer.getCondomOptions(V.player.condom),
		};

		Object.assign(penetrator, combat.getPlayerPenetratorState());

		return penetrator;
	}

	/**
	 *
	 * @param {Player} pc
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapPcToClothingOptions(pc, options) {
		// Clothing filters and options
		for (const slot of setup.clothes_all_slots) {
			const clothes = PlayerCombatMapper.mapPcToClothingOption(slot, pc, options);
			options.clothes = options.clothes || {};
			options.clothes[slot] = clothes;
		}
		return options;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {Player} pc
	 * @param {CombatPlayerOptions} options
	 * @returns {ClothingState}
	 */
	static mapPcToClothingOption(slot, pc, options) {
		if (!CombatRenderer.clothedSlots.includes(slot)) {
			return PlayerCombatMapper.defaultClothing;
		}
		const defaults = setup.clothes[slot][V.worn[slot].index];
		const clothing = CombatRenderer.getClothingBySlot(slot);
		const source = CombatRenderer.getSourceClothing(slot, defaults);

		const name = source.variable;

		/** @type {TotalClothingStates} */
		const state = clothing.state;
		let show = name != null;

		if (slot === "upper" && (state === 0 || (typeof state === "string" && !["midriff", "chest", "waist"].includes(state)))) {
			show = false;
		}

		if (slot === "under_upper" && (state === 0 || (typeof state === "string" && !["midriff", "chest", "waist"].includes(state)))) {
			show = false;
		}

		PlayerCombatMapper.generateClothingFilter(slot, clothing, options);

		if (defaults.index === 0 || name === "naked") {
			// Clothing is naked.
			show = false;
		}

		/**
		 * @type {ClothingState}
		 */
		const clothes = {
			item: clothing,
			slot,
			name,
			positions: CombatRenderer.getPositionStates(options.position, options.legFrontPosition, options.legBackPosition, slot, defaults),
			state: state || "full",
			show,
			alpha: CombatRenderer.getAlpha(slot),
			isSkirt: defaults.skirt === 1,
			isRaised: defaults.skirt === 1 && clothing.skirt_down === 0 && state === "waist",
			isExposed: !!clothing.exposed,
			isBoundable: !!clothing.combat?.boundable,
			hasAccessory: CombatRenderer.getAccessoryState(slot, defaults),
			hasMainImg: clothing.combat?.hasMainImg !== false,
			hasBackImg: !!defaults.back_img && [1, "combat"].includes(defaults.back_img),
			hasBackAccessory: !!defaults.back_img_acc && [1, "combat"].includes(defaults.back_img_acc),
			hasMaskImg: !!defaults.mask_img && [1, "combat"].includes(defaults.mask_img),
			joined: PlayerCombatMapper.genClothingJoinedLimbs(slot, clothing),
			breasts: PlayerCombatMapper.genClothingBreastOptions(slot, clothing, options.breastSize),
			sleeves: PlayerCombatMapper.genClothingSleeveOptions(slot, clothing),
			renderStep: source.combat?.renderType,
		};
		return clothes;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 */
	static genClothingJoinedLimbs(slot, clothing) {
		return {
			limbs:
				["lower", "feet", "legs", "under_lower", "upper", "under_upper", "hands"].includes(slot) && PlayerCombatMapper.hasJoinedLimbs(slot, clothing),
			limbsAccessory:
				["lower", "feet", "legs", "under_lower", "upper", "under_upper", "hands"].includes(slot) &&
				PlayerCombatMapper.hasJoinedLimbsAcc(slot, clothing),
		};
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 */
	static genClothingSleeveOptions(slot, clothing) {
		return {
			hasAccessory: ["upper", "under_upper", "over_upper"].includes(slot) && PlayerCombatMapper.hasSleevesAcc(slot, clothing),
			show: ["upper", "under_upper", "over_upper"].includes(slot) && PlayerCombatMapper.hasSleeves(slot, clothing),
			state: "default",
			useSecondary: PlayerCombatMapper.getSleeveColourType(slot, clothing) === "secondary",
		};
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 * @returns {"primary" | "secondary"}
	 */
	static getSleeveColourType(slot, clothing) {
		const found = CombatRenderer.findClothingByProperty(slot, clothing, item => item.sleeve_colour != null);
		if (found.sleeve_colour === "secondary") {
			return "secondary";
		}
		return "primary";
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 * @returns {boolean}
	 */
	static hasSleeves(slot, clothing) {
		// Has combat.hasSleeves property
		// Find clothing item recursively through reference.
		// Checks each level starting from the top, based on given method.
		const found = CombatRenderer.findClothingByProperty(slot, clothing, item => {
			if (item.combat == null || item.combat.hasSleeves == null) {
				return item.sleeve_img != null;
			}
			return item.combat.hasSleeves != null;
		});
		// Check the returned item for the sleeves property.
		if (found.combat == null || found.combat.hasSleeves == null) {
			return !!found.sleeve_img;
		}
		return found.combat.hasSleeves;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 * @returns {boolean}
	 */
	static hasSleevesAcc(slot, clothing) {
		// Has combat.hasSleevesAcc property
		// Find clothing item recursively through reference.
		// Checks each level starting from the top, based on given method.
		const found = CombatRenderer.findClothingByProperty(slot, clothing, item => {
			if (item.combat == null || item.combat.hasSleevesAcc == null) {
				return item.sleeve_acc_img != null;
			}
			return item.combat.hasSleevesAcc != null;
		});
		// Check the returned item for the sleeves acc property.
		if (found.combat == null || found.combat.hasSleevesAcc == null) {
			return !!found.sleeve_acc_img;
		}
		return found.combat.hasSleevesAcc;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 * @returns {boolean}
	 */
	static hasJoinedLimbs(slot, clothing) {
		const found = CombatRenderer.findClothingByProperty(slot, clothing, item => item.combat?.hasJoinedLimbs === true);

		return found?.combat?.hasJoinedLimbs === true && clothing.combat?.hasMainImg !== false;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 * @returns {boolean}
	 */
	static hasJoinedLimbsAcc(slot, clothing) {
		const found = CombatRenderer.findClothingByProperty(slot, clothing, item => item.combat?.hasJoinedLimbsAcc === true);

		return found?.combat?.hasJoinedLimbsAcc === true && clothing.combat?.accessory !== false;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} source
	 * @param {number} breastSize
	 */
	static genClothingBreastOptions(slot, source, breastSize) {
		return {
			hasAccessory: ["upper", "under_upper", "over_upper"].includes(slot) && PlayerCombatMapper.hasBreastsAcc(slot, source),
			show: ["upper", "under_upper", "over_upper"].includes(slot) && PlayerCombatMapper.hasBreasts(slot, source),
			size: breastSize,
		};
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} source
	 * @returns {boolean}
	 */
	static hasBreasts(slot, source) {
		// Has combat.hasBreasts property
		// Find clothing item recursively through reference.
		// Checks each level starting from the top, based on given method.
		const found = CombatRenderer.findClothingByProperty(slot, source, item => {
			if (item.combat == null || item.combat.hasBreasts == null) {
				return item.breast_img != null;
			}
			return item.combat.hasBreasts != null;
		});
		// Check the returned item for the breasts property.
		if (found.combat == null || found.combat.hasBreasts == null) {
			return !!found.breast_img;
		}
		return found.combat.hasBreasts;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} source
	 * @returns {boolean}
	 */
	static hasBreastsAcc(slot, source) {
		// Has combat.hasBreastsAcc property
		// Find clothing item recursively through reference.
		// Checks each level starting from the top, based on given method.
		const found = CombatRenderer.findClothingByProperty(slot, source, item => {
			if (item.combat == null || item.combat.hasBreastsAcc == null) {
				return item.breast_acc_img != null;
			}
			return item.combat.hasBreastsAcc != null;
		});
		// Check the returned item for the breast acc property.
		if (found.combat == null || found.combat.hasBreastsAcc == null) {
			return !!found.breast_acc_img;
		}
		return found.combat.hasBreastsAcc;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} clothing
	 * @param {CombatPlayerOptions} options
	 */
	static generateClothingFilter(slot, clothing, options) {
		const mainFilterKey = `worn_${slot}_main`;
		const sleeveFilterKey = `worn_${slot}_sleeve`;
		const accFilterKey = `worn_${slot}_acc`;
		const sleeveAccFilterKey = `worn_${slot}_sleeve_acc`;

		options.filters ||= {};

		if (clothing.combat?.mainColour && !["primary", "secondary"].includes(clothing.combat?.mainColour)) {
			options.filters[mainFilterKey] = PlayerCombatMapper.genFilterWithHex(clothing.combat.mainColour);
		} else if (clothing.combat?.mainColour && clothing.combat?.mainColour === "secondary") {
			const accColour = clothing.combat?.accColour || clothing.accessory_colour;
			const accDebugName = slot + " accessory";
			const accCustomFilter = clothing.accessory_colourCustom;
			options.filters[mainFilterKey] = accColour
				? CombatRenderer.lookupColour(setup.colours.clothes_map, accColour, accDebugName, accCustomFilter, clothing.prefilter)
				: Renderer.emptyLayerFilter();
		} else {
			const colour = clothing.colour;
			const debugName = slot + " clothing";
			const customFilter = clothing.colourCustom;
			options.filters[mainFilterKey] = colour
				? CombatRenderer.lookupColour(setup.colours.clothes_map, colour, debugName, customFilter, clothing.prefilter)
				: Renderer.emptyLayerFilter();
		}

		if (clothing.combat?.accColour && !["primary", "secondary"].includes(clothing.combat?.accColour)) {
			options.filters[accFilterKey] = PlayerCombatMapper.genFilterWithHex(clothing.combat.accColour);
		} else if (clothing.combat?.accColour && clothing.combat?.accColour === "primary") {
			const colour = clothing.colour;
			const debugName = slot + " clothing";
			const customFilter = clothing.colourCustom;
			options.filters[accFilterKey] = colour
				? CombatRenderer.lookupColour(setup.colours.clothes_map, colour, debugName, customFilter, clothing.prefilter)
				: Renderer.emptyLayerFilter();
		} else {
			const accColour = clothing.combat?.accColour || clothing.accessory_colour;
			const accDebugName = slot + " accessory";
			const accCustomFilter = clothing.accessory_colourCustom;
			options.filters[accFilterKey] = accColour
				? CombatRenderer.lookupColour(setup.colours.clothes_map, accColour, accDebugName, accCustomFilter, clothing.prefilter)
				: Renderer.emptyLayerFilter();
		}

		if (clothing.combat?.sleeveColour && clothing.combat?.sleeveColour !== "primary") {
			options.filters[sleeveFilterKey] = PlayerCombatMapper.genFilterWithHex(clothing.combat.sleeveColour);
		} else if (clothing.combat?.mainColour && !clothing.combat?.sleeveColour) {
			options.filters[sleeveFilterKey] = PlayerCombatMapper.genFilterWithHex(clothing.combat.mainColour);
		} else {
			const colour = clothing.colour;
			const debugName = slot + " clothing";
			const customFilter = clothing.colourCustom;
			options.filters[sleeveFilterKey] = colour
				? CombatRenderer.lookupColour(setup.colours.clothes_map, colour, debugName, customFilter, clothing.prefilter)
				: Renderer.emptyLayerFilter();
		}

		if (clothing.combat?.sleeveAccColour && clothing.combat?.sleeveAccColour !== "primary") {
			options.filters[sleeveAccFilterKey] = PlayerCombatMapper.genFilterWithHex(clothing.combat.sleeveAccColour);
		} else if (clothing.combat?.accColour && !clothing.combat?.sleeveAccColour) {
			options.filters[sleeveAccFilterKey] = PlayerCombatMapper.genFilterWithHex(clothing.combat.accColour);
		} else {
			const accColour = clothing.combat?.accColour || clothing.accessory_colour;
			const accDebugName = slot + " accessory";
			const accCustomFilter = clothing.accessory_colourCustom;
			options.filters[sleeveAccFilterKey] = accColour
				? CombatRenderer.lookupColour(setup.colours.clothes_map, accColour, accDebugName, accCustomFilter, clothing.prefilter)
				: Renderer.emptyLayerFilter();
		}
		return options;
	}

	/**
	 * @param {string} hex
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static genFilterWithHex(hex) {
		return Renderer.mergeLayerData(
			{
				blend: hex,
				contrast: 1,
				brightness: 0,
			},
			setup.colours.clothes_default
		);
	}

	/**
	 * @param {Player} pc
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapPcToBodyOptions(pc, options) {
		PlayerCombatMapper.mapPcToArmPosition(options);
		PlayerCombatMapper.mapPcToBodywritingOptions(pc, options);
		return options;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @returns {CombatPlayerOptions}
	 */
	static mapToTransformationOptions(options) {
		/**
		 * @param {TransformationKeys} type
		 * @param {TransformationParts} part
		 */
		function generateTransformationFilter(type, part) {
			const parts = V.transformationParts[type];
			if (part in parts) {
				options.filters[type + part.toUpperFirst()] = CombatRenderer.getTransformationFilter(type, part);
			}
		}

		/** @type {TransformationKeys[]} */
		const transformations = ["angel", "bird", "cat", "cow", "demon", "fallenAngel", "fox", "wolf"];
		options.transformations = options.transformations || {};
		transformations.forEach(transformation => {
			options.transformations[transformation] = {
				wings: PlayerCombatMapper.mapToTransformationWingOptions(transformation),
				halo: PlayerCombatMapper.mapToTransformationHaloOptions(transformation),
				horns: PlayerCombatMapper.mapToTransformationHornOptions(transformation),
				ears: PlayerCombatMapper.mapToTransformationEarOptions(transformation),
				tail: PlayerCombatMapper.mapToTransformationTailOptions(options, transformation),
				eyes: PlayerCombatMapper.mapToTransformationEyeOptions(transformation),
				cheeks: PlayerCombatMapper.mapToTransformationCheekOptions(transformation),
				malar: PlayerCombatMapper.mapToTransformationMalarOptions(transformation),
				pubes: PlayerCombatMapper.mapToTransformationPubeOptions(transformation),
				pits: PlayerCombatMapper.mapToTransformationPitOptions(transformation),
				plumage: PlayerCombatMapper.mapToTransformationPlumageOptions(transformation),
			};
			generateTransformationFilter(transformation, "wings");
			generateTransformationFilter(transformation, "halo");
			generateTransformationFilter(transformation, "horns");
			generateTransformationFilter(transformation, "ears");
			generateTransformationFilter(transformation, "tail");
			generateTransformationFilter(transformation, "eyes");
			generateTransformationFilter(transformation, "cheeks");
			generateTransformationFilter(transformation, "malar");
			generateTransformationFilter(transformation, "pubes");
			generateTransformationFilter(transformation, "pits");
			generateTransformationFilter(transformation, "plumage");
		});
		return options;
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationWingOptions(type) {
		const parts = V.transformationParts[type];
		if (!("wings" in parts) || parts.wings === "disabled" || parts.wings === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		switch (type) {
			case "bird":
				if (PlayerCombatMapper.isChimeraPartEnabled("demon", "bird", "demonharpy", "wings")) {
					return {
						show: true,
						type,
						style: "demon",
						inFront: true,
					};
				}
				break;
		}
		return {
			show: true,
			type,
			style: parts.wings,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationHaloOptions(type) {
		const parts = V.transformationParts[type];
		if (!("halo" in parts) || parts.halo === "disabled" || parts.halo === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.halo,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationHornOptions(type) {
		const parts = V.transformationParts[type];
		if (!("horns" in parts) || parts.horns === "disabled" || parts.horns === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		switch (type) {
			case "cow":
				if (PlayerCombatMapper.isChimeraPartEnabled("demon", "cow", "demoncow", "horns")) {
					return {
						show: true,
						type,
						style: "demon",
						inFront: true,
					};
				}
				break;
		}
		return {
			show: true,
			type,
			style: parts.horns,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationEarOptions(type) {
		const parts = V.transformationParts[type];
		if (!("ears" in parts) || parts.ears === "disabled" || parts.ears === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.ears,
			inFront: false,
		};
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @param {TransformationKeys} type
	 * @returns {TransformationTailPartOptions}
	 */
	static mapToTransformationTailOptions(options, type) {
		const parts = V.transformationParts[type];
		if (!("tail" in parts) || parts.tail === "disabled" || parts.tail === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				state: "default",
				inFront: false,
			};
		}
		const style = ["default", "classic", "cat", "succubus"].includes(parts.tail) ? parts.tail : "default";
		switch (type) {
			case "demon":
				if (PlayerCombatMapper.isChimeraPartEnabled("demon", "cat", "demoncat", "tail")) {
					return {
						show: true,
						type,
						style: "cat",
						state: "default",
						inFront: false,
					};
				}
				break;
		}
		if (["demon"].includes(type) && V.enemytype === "man" && (V.anusstate === "penetrated" || V.vaginastate === "penetrated")) {
			return {
				show: true,
				type,
				style,
				state: "sex",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style,
			state: "default",
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationEyeOptions(type) {
		const parts = V.transformationParts[type];
		if (!("eyes" in parts) || parts.eyes === "disabled" || parts.eyes === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.eyes,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationCheekOptions(type) {
		const parts = V.transformationParts[type];
		if (!("cheeks" in parts) || parts.cheeks === "disabled" || parts.cheeks === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.cheeks,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationMalarOptions(type) {
		const parts = V.transformationParts[type];
		if (!("malar" in parts) || parts.malar === "disabled" || parts.malar === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.malar,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationPubeOptions(type) {
		const parts = V.transformationParts[type];
		if (!("pubes" in parts) || parts.pubes === "disabled" || parts.pubes === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.pubes,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationPitOptions(type) {
		const parts = V.transformationParts[type];
		if (!("pits" in parts) || parts.pits === "disabled" || parts.pits === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.pits,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} type
	 * @returns {TransformationPartOptions}
	 */
	static mapToTransformationPlumageOptions(type) {
		const parts = V.transformationParts[type];
		if (!("plumage" in parts) || parts.plumage === "disabled" || parts.plumage === "hidden") {
			return {
				show: false,
				type,
				style: "disabled",
				inFront: false,
			};
		}
		return {
			show: true,
			type,
			style: parts.plumage,
			inFront: false,
		};
	}

	/**
	 * @param {TransformationKeys} one
	 * @param {TransformationKeys} two
	 * @param {"demoncow" | "demoncat" | "demonharpy"} chimera
	 * @param {TransformationParts} part
	 * @returns {boolean}
	 */
	static isChimeraPartEnabled(one, two, chimera, part) {
		if (!isChimeraEnabled(chimera, part)) {
			return false;
		}
		if (!isTransformationPartEnabled(one, part)) {
			return false;
		}
		if (!isTransformationPartEnabled(two, part)) {
			return false;
		}
		return true;
	}

	/**
	 * @param {Player} pc
	 * @param {CombatPlayerOptions} options
	 */
	static mapPcToBodywritingOptions(pc, options) {
		/**
		 * @param {string} path
		 * @returns {string}
		 */
		function sanitise(path) {
			return path.replace("_", "-");
		}

		/**
		 * @param {string} id
		 * @param {function(string, Bodywriting): BodywritingOption?} mapper
		 * @returns {BodywritingOption}
		 */
		function getState(id, mapper) {
			/** @type {Bodywriting=} */
			const bodywriting = V.skin[id];

			const defaultState = {
				show: false,
				area: "text",
				type: sanitise(id),
			};

			if (bodywriting == null || !bodywriting.writing) {
				return defaultState;
			}

			const options = mapper(id, bodywriting);
			return options || defaultState;
		}

		/**
		 * @param {string} id
		 * @param {Bodywriting} bodywriting
		 * @returns {BodywritingOption?}
		 */
		function simpleText(id, bodywriting) {
			if (bodywriting.type !== "text") {
				return null;
			}
			return {
				show: true,
				area: "text",
				type: sanitise(id),
			};
		}

		/**
		 * @param {string} id
		 * @param {Bodywriting} bodywriting
		 * @returns {BodywritingOption?}
		 */
		function hidden(id, bodywriting) {
			return {
				show: false,
				area: bodywriting.writing,
				type: sanitise(id),
			};
		}

		options.bodywriting = options.bodywriting || {
			isEnabled: V.options.bodywritingImages === true,
			forehead: {
				show: false,
				type: "forehead",
			},
			breasts: getState("breasts", simpleText),
			back: getState("back", simpleText),
		};

		switch (options.position) {
			case "missionary":
				options.bodywriting.frontCheek = getState("right_cheek", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						return {
							show: true,
							area: "text",
							type: sanitise(id),
						};
					}
					if (bodywriting.type === "object") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				options.bodywriting.backCheek = getState("left_cheek", hidden);
				options.bodywriting.frontShoulder = getState("right_shoulder", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						return {
							show: true,
							area: "text",
							type: sanitise(id),
						};
					}
					if (bodywriting.type !== "object") {
						return null;
					}
					if (V.rightarm === "bound" || V.rightarm === "grappled" || V.rightarm === "behind") {
						return hidden(id, bodywriting);
					}
					return {
						show: true,
						area: bodywriting.writing,
						type: sanitise(id),
					};
				});
				options.bodywriting.backShoulder = getState("left_shoulder", hidden);
				options.bodywriting.frontBottom = getState("right_bottom", hidden);
				options.bodywriting.backBottom = getState("left_bottom", hidden);
				options.bodywriting.pubic = getState("pubic", (id, bodywriting) => {
					if (bodywriting.type === "text") {
						return {
							show: true,
							area: "text",
							type: sanitise(id),
						};
					}
					if (bodywriting.type === "object" && bodywriting.special !== "islander") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				options.bodywriting.frontThigh = getState("right_thigh", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						let type = id;
						if (["up", "down"].includes(options.legBackPosition)) {
							type += "-" + options.legBackPosition;
						}
						if (bodywriting.arrow === 1) {
							type += "-arrow";
						}
						return {
							show: true,
							area: "text",
							type: sanitise(type),
						};
					}
					if (bodywriting.writing === "cross") {
						return null;
					}
					if (bodywriting.type === "object") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				options.bodywriting.backThigh = getState("left_thigh", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						let type = id;
						if (["up", "down"].includes(options.legBackPosition)) {
							type += "-" + options.legBackPosition;
						}
						if (bodywriting.arrow === 1) {
							type += "-arrow";
						}
						return {
							show: true,
							area: "text",
							type: sanitise(type),
						};
					}
					if (bodywriting.type === "object") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				break;
			case "doggy":
				options.bodywriting.frontCheek = getState("left_cheek", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						return {
							show: true,
							area: "text",
							type: sanitise(id),
						};
					}
					if (bodywriting.type === "object") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				options.bodywriting.backCheek = getState("right_cheek", hidden);
				options.bodywriting.frontShoulder = getState("left_shoulder", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						return {
							show: true,
							area: "text",
							type: sanitise(id),
						};
					}
					if (bodywriting.type !== "object") {
						return null;
					}
					if (V.leftarm === "bound" || V.rightarm === "grappled" || V.leftarm === "behind") {
						return {
							show: true,
							area: bodywriting.writing,
							type: "left-shoulder-bound",
						};
					}
					return {
						show: true,
						area: bodywriting.writing,
						type: sanitise(id),
					};
				});
				options.bodywriting.backShoulder = getState("right_shoulder", hidden);
				options.bodywriting.frontBottom = getState("left_bottom", simpleText);
				options.bodywriting.backBottom = getState("right_bottom", hidden);
				options.bodywriting.pubic = getState("pubic", (id, bodywriting) => {
					if (bodywriting.type === "text") {
						return {
							show: true,
							area: "text",
							type: sanitise(id),
						};
					}
					if (bodywriting.type === "object" && bodywriting.special !== "islander") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				options.bodywriting.frontThigh = getState("left_thigh", simpleText);
				options.bodywriting.backThigh = getState("right_thigh", (id, bodywriting) => {
					if (bodywriting.type === "text" || bodywriting.special === "islander") {
						return {
							show: true,
							area: "text",
							type: sanitise(bodywriting.arrow === 1 ? id + "-arrow" : id),
						};
					}
					if (bodywriting.type === "object") {
						return {
							show: true,
							area: bodywriting.writing,
							type: sanitise(id),
						};
					}
					return null;
				});
				break;
		}
		return options;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 */
	static generateHairFilters(options) {
		options.filters.hair = CombatRenderer.getHairFilter();
		options.filters.fringe = CombatRenderer.getFringeFilter();
		options.hairLength = V.hairlengthstage;
		options.hairType = CombatRenderer.getFringeType();
	}
}
window.PlayerCombatMapper = PlayerCombatMapper;
