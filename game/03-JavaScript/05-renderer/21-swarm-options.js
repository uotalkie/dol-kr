// @ts-check
/* globals SwarmOptions, SwarmTypes, SwarmPenetrationOptions, AnimationSpeed */

class SwarmCombatMapper {
	/**
	 * @returns {SwarmOptions}
	 */
	static generateOptions() {
		/** @type {SwarmOptions} */
		return {
			show: false,
			src: "img/sex/",
			root: "img/sex/",
			position: "doggy",
			animKey: "sex-2f-idle",
			animKeyImminent: "sex-2f-idle",
			animKeyPenetrating: "sex-2f-idle",
			type: "worms",
			amount: 0,
			vaginal: {
				imminent: false,
				penetrating: false,
			},
			penile: {
				imminent: false,
				penetrating: false,
			},
			anal: {
				imminent: false,
				penetrating: false,
			},
		};
	}

	/**
	 * @param {SwarmOptions} options
	 * @returns {SwarmOptions}
	 */
	static getOptions(options) {
		const active = Object.keys(V.swarm.amount).length > 0;
		if (!active) {
			return options;
		}
		options.src = options.root + options.position + "/";
		options.animKey = "sex-4f-mid";
		options.animKeyImminent = "swarm-4f-imminent";
		options.animKeyPenetrating = "swarm-4f-penetrating";
		options.vaginal = SwarmCombatMapper.isVaginalActive();
		options.penile = SwarmCombatMapper.isPenileActive();
		options.anal = SwarmCombatMapper.isAnalActive();
		options.show = options.position === "doggy" && options.amount > 0;
		options.type = SwarmCombatMapper.getSwarmType();
		options.amount = SwarmCombatMapper.getSwarmAmount();
		return options;
	}

	/** @returns {SwarmPenetrationOptions} */
	static isVaginalActive() {
		const hasImminent = V.swarm.amount.genital[0] >= 1;
		const hasPenetrating = V.swarm.amount.genital[1] >= 1;
		const hasVagina = V.player.vaginaExist;
		const hasChastity = V.worn.genitals.name === "chastity belt";
		return {
			imminent: (hasVagina || hasChastity) && hasImminent && !hasPenetrating,
			penetrating: (hasVagina || hasChastity) && hasPenetrating,
		};
	}

	/** @returns {SwarmPenetrationOptions} */
	static isPenileActive() {
		const hasImminent = V.swarm.amount.genital[0] >= 1;
		const hasPenetrating = V.swarm.amount.genital[1] >= 1;
		const hasPenis = V.player.penisExist;
		const hasChastity = V.worn.genitals.name === "chastity belt";
		return {
			imminent: hasPenis && !hasChastity && hasImminent && !hasPenetrating,
			penetrating: hasPenis && !hasChastity && hasPenetrating,
		};
	}

	/** @returns {SwarmPenetrationOptions} */
	static isAnalActive() {
		const hasImminent = V.swarm.amount.butt[0] >= 1;
		const hasPenetrating = V.swarm.amount.butt[1] >= 1;
		return {
			imminent: hasImminent && !hasPenetrating,
			penetrating: hasPenetrating,
		};
	}

	/**
	 * @returns {string}
	 */
	static getAnimation() {
		const speed = SwarmCombatMapper.getAnimationSpeed();
		const frames = SwarmCombatMapper.getAnimationFrameCount();
		if (combat.isActive()) {
			return `sex-${frames}f-${speed}`;
		}
		return `sex-${frames}f-${speed}`;
	}

	/**
	 * @returns {number}
	 */
	static getAnimationFrameCount() {
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
	static getAnimationSpeed() {
		if (T.crOverrides?.animSpeed) {
			return T.crOverrides.animSpeed;
		}
		if (combat.isRapid()) {
			return "vfast";
		}
		if (combat.isActive()) {
			return "mid";
		}
		return "idle";
	}

	/**
	 * @returns {SwarmTypes}
	 */
	static getSwarmType() {
		return T.swarmcreature;
	}

	/**
	 * @returns {number}
	 */
	static getSwarmAmount() {
		if (T.swarmactive <= 0) {
			return 0;
		}
		if (T.swarmactive <= 1) {
			return 1;
		}
		if (T.swarmactive <= 2) {
			return 2;
		}
		if (T.swarmactive <= 3) {
			return 3;
		}
		if (T.swarmactive <= 4) {
			return 4;
		}
		if (T.swarmactive <= 9) {
			return 5;
		}
		return 6;
	}
}
window.SwarmCombatMapper = SwarmCombatMapper;
