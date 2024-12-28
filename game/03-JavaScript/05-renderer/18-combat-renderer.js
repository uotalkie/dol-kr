// @ts-check
/* globals FilterMap, CompositeLayerSpec, SpritePositions, Condom, CondomOptions, Partial, ClothedSlots, ClothingState, PositionStates, TransformationKeys, TransformationParts, Transformations, CombatClothingTypes, CombatPlayerOptions, CharacterTypes */

/**
 * @typedef CombatZIndices
 * @type {object}
 * Closeup layers
 * @property {10} closeBase
 * @property {12} closeWornUnder
 * @property {14} closeGenitals
 * @property {16} closeWorn
 * @property {18} closeCum
 * @property {20} closeNpc
 * Xray layers
 * @property {10} xrayBase
 * @property {12} xrayEjac
 * @property {14} xrayPenetrator
 * @property {15} xrayCondom
 * @property {16} xrayPenetrator2
 * @property {17} xrayCondom2
 * @property {20} xrayCum
 * Combat layers
 * @property {0} far
 * @property {50} base
 * @property {100} near
 * Hair:
 * @property {20} backHair
 * @property {81} hair
 * @property {70} head
 * Back legs:
 * @property {48} backThigh
 * @property {49} backLeg
 * @property {51} backLowerUnderwear
 * @property {52} backLegwear
 * @property {53} backFootwear
 * @property {54} backLowerWear
 * @property {55} backLowerOverwear
 * Front legs:
 * @property {65} frontThigh
 * @property {66} frontLeg
 * @property {68} frontLowerUnderwear
 * @property {69} frontLegwear
 * @property {70} frontFootwear
 * @property {71} frontLowerWear
 * @property {72} frontLowerOverwear
 * Back arms:
 * @property {30} backArm
 * Front arms:
 * @property {75} frontArm
 * @property {91} frontBoundArms
 * Transformation parts
 * @property {40} backWings
 * @property {40} backHalo
 * @property {40} backHorns
 * @property {40} backEars
 * @property {40} backTail
 * @property {90} frontWings
 * @property {84} frontHalo
 * @property {83} frontHorns
 * @property {82} frontEars
 * @property {40} frontTail
 * @property {80} frontEyes
 * @property {80} frontCheeks
 * @property {80} frontMalar
 * @property {50} frontPubes
 * @property {50} frontPits
 * @property {50} frontPlumage
 */

class CombatRenderer {
	/** @returns {CharacterTypes[]} */
	static get npcTypes() {
		return [
			"human",
			"plant",
			"wolfboy",
			"wolfgirl",
			"dogboy",
			"doggirl",
			"bearboy",
			"beargirl",
			"pigboy",
			"piggirl",
			"catboy",
			"catgirl",
			"dolphinboy",
			"dolphingirl",
			"lizardboy",
			"lizardgirl",
			"cowgirl",
			"bullboy",
			"foxboy",
			"foxgirl",
			"dog",
			"cat",
			"pig",
			"bull",
			"wolf",
			"dolphin",
			"lizard",
			"bear",
			"boar",
			"creature",
			"horse",
			"centaur",
			"fox",
			"hawk",
			"harpy",
			"cow",
			"spider",
		];
	}

	/** @returns {ClothedSlots[]} */
	static get clothedSlots() {
		return [
			"over_upper",
			"over_lower",
			"upper",
			"lower",
			"under_upper",
			"under_lower",
			"over_head",
			"head",
			"face",
			"neck",
			"hands",
			"handheld",
			"legs",
			"feet",
			"genitals",
		];
	}

	/** @returns {ClothesItem} */
	static get emptyClothing() {
		/** @type {ClothesItem} */
		const clothing = {
			index: 0,
			name: "naked",
			name_cap: "Naked",
			variable: "naked",
			state: 0,
			state_base: 0,
			integrity: 10,
			integrity_max: 10,
			fabric_strength: 20,
			reveal: 1,
			word: "a",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["naked"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "naked",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		};
		return { ...clothing };
	}

	/**
	 * @returns {CombatZIndices}
	 */
	static get indices() {
		return {
			far: 0,

			backHair: 20,

			backThigh: 48,
			backFootwear: 53,

			backArm: 30,

			base: 50,

			backLeg: 49,
			backLowerUnderwear: 51,
			backLegwear: 52,
			backLowerWear: 54,
			backLowerOverwear: 55,

			frontLeg: 66,
			frontLowerUnderwear: 68,
			frontLegwear: 69,
			frontLowerWear: 71,
			frontLowerOverwear: 72,

			backWings: 40,
			backHalo: 40,
			backHorns: 40,
			backEars: 40,
			backTail: 40,
			frontWings: 90,
			frontHalo: 84,
			frontHorns: 83,
			frontEars: 82,
			frontTail: 40,

			frontEyes: 80,
			frontCheeks: 80,
			frontMalar: 80,
			frontPlumage: 50,
			frontPubes: 50,
			frontPits: 50,

			frontThigh: 65,
			frontFootwear: 70,

			head: 70,

			frontArm: 75,

			hair: 81,
			frontBoundArms: 91,

			near: 100,

			closeBase: 10,
			closeWornUnder: 12,
			closeGenitals: 14,
			closeWorn: 16,
			closeCum: 18,
			closeNpc: 20,

			xrayBase: 10,
			xrayEjac: 12,
			xrayPenetrator: 14,
			xrayCondom: 15,
			xrayPenetrator2: 16,
			xrayCondom2: 17,
			xrayCum: 20,
		};
	}

	/**
	 * @param {Npc} npc
	 * @returns {CharacterTypes}
	 */
	static getUnderlyingNpcType(npc) {
		switch (npc.type) {
			case "catboy":
				return "cat";
			case "catgirl":
				return "cat";
			case "pigboy":
				return "pig";
			case "piggirl":
				return "pig";
			case "dogboy":
				return "dog";
			case "doggirl":
				return "dog";
			case "wolfboy":
				return "wolf";
			case "wolfgirl":
				return "wolf";
			case "bearboy":
				return "bear";
			case "beargirl":
				return "bear";
			case "dolphinboy":
				return "dolphin";
			case "dolphingirl":
				return "dolphin";
			case "lizardboy":
				return "lizard";
			case "lizardgirl":
				return "lizard";
			case "cowgirl":
				return "human";
			case "bullboy":
				return "human";
			case "foxboy":
				return "fox";
			case "foxgirl":
				return "fox";
			case "centaur":
				return "horse";
			default:
				return npc.type;
		}
	}

	/**
	 * @param {0 | "doggy" | "missionary" | "wall" | "stalk"} position
	 */
	static getPosition(position) {
		switch (position) {
			case "doggy":
				return "doggy";
			case "missionary":
				return "missionary";
			case "wall":
				return "doggy";
			case "stalk":
				Errors.report("Position was set to stalk, and the combat renderer doesn't support it yet.");
				return "missionary";
			default:
				Errors.report("Position not set to any valid values", V.position);
				return "missionary";
		}
	}

	/**
	 * For colour name, lookup its canvas filter and merge with sprite prefilter.
	 *
	 * @param {Object<string, FilterMap>} dict map in setup.colours to lookup in
	 * @param {string} key colour name.
	 * @param {string} debugName used when reporting errors
	 * @param {string | undefined} customFilter key in options.filters
	 * @param {string | undefined} prefilterName name of prefilter to apply
	 * @returns {Partial<CompositeLayerSpec>} CompositeLayerParams - Check TS docs for model.d.ts
	 */
	static lookupColour(dict, key, debugName, customFilter, prefilterName) {
		const filter = key === "custom" ? this.getCustomFilterColour(customFilter, debugName) : this.getFilterColour(key, dict, debugName);

		if (filter == null) {
			console.error("Lookup colour failed:", debugName);
			return Renderer.emptyLayerFilter();
		}

		if (prefilterName) {
			Renderer.mergeLayerData(filter, setup.colours.sprite_prefilters[prefilterName], true);
		}

		return filter;
	}

	/**
	 * @param {string} key
	 * @param {Object<string, FilterMap>} dict
	 * @param {string} debugName
	 * @returns {Partial<CompositeLayerSpec>?}
	 */
	static getFilterColour(key, dict, debugName) {
		const record = dict[key];
		if (!record) {
			console.error("unknown", debugName, "colour:", key);
			return null;
		}
		const filter = clone(record.canvasfilter);
		return filter;
	}

	/**
	 * @param {string | undefined} customFilter
	 * @param {string} debugName
	 * @returns {CompositeLayerSpec?}
	 */
	static getCustomFilterColour(customFilter, debugName) {
		if (!customFilter) return null;

		const filter = getCustomClothesColourCanvasFilter(customFilter);
		if (!filter) {
			console.error("Custom colour", debugName, "not configured");
			return null;
		}
		return filter;
	}

	/**
	 * @typedef Gradient
	 * @property {string} style
	 * @property {string[]} colours
	 */

	/**
	 * @param {"fringe" | "sides"} hairPart
	 * @param {Gradient} gradient
	 * @param {string} hairType
	 * @param {number} hairLength
	 * @param {string} prefilterName
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static createHairColourGradient(hairPart, gradient, hairType, hairLength, prefilterName) {
		const combatHair = CombatRenderer.getHairGradientType(hairType);
		const filterPrototypeLibrary = setup.colours.hairgradients_prototypes[hairPart][gradient.style];
		const filterPrototype = filterPrototypeLibrary[combatHair] || filterPrototypeLibrary.all;
		/** @type {Partial<CompositeLayerSpec>} */
		const filter = {
			// @ts-ignore
			blend: clone(filterPrototype),
			brightness: {
				// @ts-ignore
				gradient: filterPrototype.gradient,
				values: filterPrototype.values,
				// @ts-ignore
				adjustments: [[], []],
			},
			blendMode: "hard-light",
		};
		// @ts-ignore
		for (const colorIndex in filter.blend.colors) {
			// @ts-ignore
			filter.brightness.adjustments[colorIndex][0] = filter.blend.lengthFunctions[0](hairLength, filter.blend.colors[colorIndex][0]);
			// @ts-ignore
			filter.brightness.adjustments[colorIndex][1] = setup.colours.hair_map[gradient.colours[colorIndex]].canvasfilter.brightness || 0;

			// @ts-ignore
			filter.blend.colors[colorIndex][0] = filter.blend.lengthFunctions[0](hairLength, filter.blend.colors[colorIndex][0]);
			// @ts-ignore
			filter.blend.colors[colorIndex][1] = setup.colours.hair_map[gradient.colours[colorIndex]].canvasfilter.blend;
		}

		const prefilter = setup.colours.sprite_prefilters[prefilterName];
		if (prefilter == null) {
			return filter;
		}

		return Renderer.mergeLayerData(filter, setup.colours.sprite_prefilters[prefilterName], true);
	}

	/**
	 * @param {CombatPlayerOptions} options
	 */
	static generateBodyFilters(options) {
		options.skinType = V.player.skin.color;
		options.skinTone = options.skinType !== "custom" ? Skin.color.tan : 0;

		const skinFilter = setup.colours.getSkinFilter(options.skinType, options.skinTone);
		options.filters.body = skinFilter;
		options.filters.breasts = skinFilter;
		options.filters.penis = skinFilter;

		if (options.showTan) {
			const tanslots = ["breasts", "penis", "swimshorts", "swimsuitTop", "swimsuitBottom", "bikiniTop", "bikiniBottom"]
				.map(slotname => [slotname, options["skin_tone_" + slotname]])
				.filter(slot => slot[1] >= 0);
			// Brightest on top
			tanslots.sort((a, b) => b[1] - a[1]);
			tanslots.forEach((slot, i) => {
				options.filters[slot[0]] = setup.colours.getSkinFilter(options.skinType, slot[1]);
				options["ztan_" + slot[0]] = options["ztan_" + slot[0]] + 0.01 * i;
			});
		}
	}

	/** @returns {string} */
	static getHairSideType() {
		const style = setup.hairstyles.sides.find(hs => hs.variable === V.hairtype);
		if (style == null) {
			return V.hairtype;
		}
		const isAlt = style.alt_head_type?.includes(setup.clothes.head[clothesIndex("head", V.worn.head)].head_type);
		return isAlt ? style.alt : V.hairtype;
	}

	/** @returns {string} */
	static getHairFringeType() {
		const style = setup.hairstyles.fringe.find(hs => hs.variable === V.fringetype);
		if (style == null) {
			return V.fringetype;
		}
		const isAlt = style.alt_head_type?.includes(setup.clothes.head[clothesIndex("head", V.worn.head)].head_type);
		return isAlt ? style.alt : V.fringetype;
	}

	/**
	 * @param {SpritePositions} position
	 * @param {string} frontPosition
	 * @param {string} backPosition
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} defaults
	 * @returns {PositionStates?}
	 */
	static getPositionStates(position, frontPosition, backPosition, slot, defaults) {
		if (!["lower", "under_lower", "over_lower", "legs", "feet"].includes(slot)) {
			return null;
		}

		// For lowerwear, we want to normalise leg positions into either [ Up | Down ]
		// Except for missionary, where the front leg can be [ Up | Down | Footjob ]
		if (["lower", "under_lower", "over_lower", "legs", "feet"].includes(slot)) {
			if (position === "doggy" && frontPosition === "footjob") {
				frontPosition = "up";
			}
			if (backPosition === "footjob") {
				backPosition = "up";
			}
		}
		return {
			front: frontPosition,
			back: backPosition,
		};
	}

	/**
	 * @param {ClothedSlots} slot
	 * @returns {ClothesItem}
	 */
	static getClothingBySlot(slot) {
		const active = V.worn[slot];
		if (active == null) {
			return CombatRenderer.emptyClothing;
		}
		const setupCategory = setup.clothes[slot];
		const defaults = setupCategory == null ? CombatRenderer.emptyClothing : setupCategory[active.index];
		const combat = Object.assign({}, defaults.combat, active.combat);
		const result = Object.assign({}, defaults, active);
		result.combat = combat;
		return result;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @returns {ClothesItem}
	 */
	static getClothingSetupBySlot(slot) {
		const active = V.worn[slot];
		if (active == null) {
			return CombatRenderer.emptyClothing;
		}
		const category = setup.clothes[slot];
		return category == null ? CombatRenderer.emptyClothing : category[active.index];
	}

	/**
	 * @param {ClothedSlots} slot
	 * @returns {number}
	 */
	static getAlpha(slot) {
		// Wetness
		let alpha = 1;
		// Stage could be 0 to 200.
		const stage = V[slot + "wet"];
		if (typeof stage === "number") {
			const normalised = normalise(200 - stage, 200, 0);
			alpha = normalised / 2 + 0.5;
		}
		return alpha;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} defaults
	 * @returns {boolean}
	 */
	static getAccessoryState(slot, defaults) {
		const source = CombatRenderer.getSourceClothing(slot, defaults);
		if (source.combat?.accessory !== undefined) {
			return !!source.combat.accessory;
		}
		return source.accessory !== 0;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} defaults
	 * @returns {CombatClothingTypes | undefined}
	 */
	static getClothingRenderType(slot, defaults) {
		const source = CombatRenderer.getSourceClothing(slot, defaults);
		return source.combat?.renderType;
	}

	/**
	 * If combatImg is used to override the sprite images, this function aims to follow the redirects until
	 * reaching the clothing item that correctly matches the sprite configuration.
	 *
	 * For example, our current item uses accessory layers, but uses a redirected sprite key which doesn't use accessory layers,
	 * we want to use the accessory configuration of the redirected item, otherwise the renderer will try to display -acc files.
	 *
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} item
	 * @param {string[]} failsafe
	 * @returns {ClothesItem}
	 */
	static getSourceClothing(slot, item, failsafe = []) {
		const reference = item.combat?.reference;
		// Check to ensure no loops
		if (failsafe.includes(item.variable)) {
			console.error("getSourceClothing ran into a potential infinite loop:", item.variable, failsafe);
			return item;
		}
		failsafe.push(item.variable);
		// Main code
		if (reference == null) {
			return item;
		}
		// Check combatImg's redirect for a possible clothing item:
		const source = setup.clothes[slot].find(c => c.variable === reference);
		if (source == null) {
			return item;
		}
		// If this redirect item has combatImg, we'll want to look again:
		if (source.combat != null && source.combat.reference != null) {
			return CombatRenderer.getSourceClothing(slot, source, failsafe);
		}
		return source;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {ClothesItem} item
	 * @param {function(ClothesItem): boolean} predicate
	 * @param {string[]} failsafe
	 * @returns {ClothesItem}
	 */
	static findClothingByProperty(slot, item, predicate, failsafe = []) {
		const reference = item.combat?.reference;
		// Check to ensure no loops
		if (failsafe.includes(item.variable)) {
			console.error("getSourceClothing ran into a potential infinite loop:", item.variable, failsafe);
			return item;
		}
		failsafe.push(item.variable);
		// Main code
		if (predicate(item)) {
			return item;
		}
		// Check combatImg's redirect for a possible clothing item:
		const source = setup.clothes[slot].find(c => c.variable === reference);
		if (source == null) {
			return item;
		}
		// If this redirect item has combatImg, we'll want to look again:
		if (source.combat != null && source.combat.reference != null) {
			return CombatRenderer.findClothingByProperty(slot, source, predicate, failsafe);
		}
		return source;
	}

	/**
	 * @param {ClothingState} clothing
	 * @param {boolean=} globalShow
	 */
	static isClothingShown(clothing, globalShow = false) {
		// Global clothing visibility
		if (!globalShow) return false;
		// Name is the identifier for clothing sprites, if null, problem occurred.
		if (clothing?.name == null) return false;
		// Per clothing show flag.
		return clothing.show;
	}

	/**
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static getHairFilter() {
		if (V.hairColourStyle === "simple") {
			return CombatRenderer.lookupColour(setup.colours.hair_map, V.haircolour, "hair", "hair_custom", "hair");
		}
		if (["wide flaps", "hime", "curtain", "mohawk"].includes(V.fringetype)) {
			return CombatRenderer.createHairColourGradient(
				"fringe",
				V.hairFringeColourGradient,
				CombatRenderer.getHairFringeType(),
				hairLengthStringToNumber(V.fringelengthstage),
				"hair"
			);
		}
		return CombatRenderer.createHairColourGradient(
			"sides",
			V.hairColourGradient,
			CombatRenderer.getHairSideType(),
			hairLengthStringToNumber(V.hairlengthstage),
			"hair"
		);
	}

	/**
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static getFringeFilter() {
		if (V.hairFringeColourStyle === "simple") {
			return CombatRenderer.lookupColour(setup.colours.hair_map, V.hairfringecolour || V.haircolour, "hair_fringe", "hair_fringe_custom", "hair_fringe");
		}
		return CombatRenderer.createHairColourGradient(
			"fringe",
			V.hairFringeColourGradient || V.hairColourGradient,
			CombatRenderer.getHairFringeType(),
			hairLengthStringToNumber(V.fringelengthstage),
			"fringe"
		);
	}

	static getFringeType() {
		if (V.hairtype === "short") {
			return "short";
		}
		if (V.fringetype === "wide flaps") {
			return "wide-flaps";
		}
		if (V.fringetype === "hime") {
			return "hime";
		}
		if (V.fringetype === "curtain") {
			return "curtain";
		}
		if (V.fringetype === "mohawk") {
			return "mohawk";
		}
		if (V.fringetype === "buzzcut") {
			return "buzzcut";
		}
		if (V.hairtype === "layered bob") {
			return "layered-bob";
		}
		return "default";
	}

	/**
	 * @param {string} hairType
	 */
	static getHairGradientType(hairType) {
		if (V.fringetype === "mohawk") {
			return V.position === "missionary" ? "combatMohawk" : "combatMohawkDoggy";
		}
		return hairType;
	}

	/**
	 * @param {TransformationKeys} transformation
	 * @param {TransformationParts} part
	 * @returns {Partial<CompositeLayerSpec>}
	 */
	static getTransformationFilter(transformation, part) {
		const active = V.transformationParts[transformation];
		const defaults = Transformations.defaults[transformation] || {
			colour: { h: 0, s: 100, l: 30 },
		};
		if (transformation === "bird" && ["tail", "wings", "malar", "plumage", "pubes"].includes(part)) {
			return CombatRenderer.getHairFilter();
		}
		if (["cat", "wolf"].includes(transformation) && ["ears", "tail", "pubes", "pits"].includes(part)) {
			return CombatRenderer.getHairFilter();
		}
		if (transformation === "fox" && ["ears", "tail", "cheeks", "pubes"].includes(part)) {
			return CombatRenderer.getHairFilter();
		}
		// No filter possible as part(s) cannot be recoloured
		if (
			["angel", "fallenAngel", "cow"].includes(transformation) ||
			(transformation === "wolf" && part === "cheeks") ||
			(transformation === "bird" && part === "eyes")
		) {
			return Renderer.emptyLayerFilter();
		}
		return {
			blend: ColourUtils.toHslString(active[part + "_colour"], ColourUtils.toHslString(defaults.colour)),
			blendMode: "hard-light",
			brightness: 0,
			contrast: 1,
			desaturate: false,
		};
	}

	/**
	 * @returns {boolean}
	 */
	static isPenileReceptorActive() {
		if (V.penisstate === "othermouth") {
			return true;
		}
		if (V.enemytype === "beast") {
			return false;
		}
		const result = V.penisstate && ["penetrated", "otheranus"].includes(V.penisstate);
		return !!result;
	}

	static isPenileReceptorEjaculationActive() {
		if (!this.isPenileReceptorActive()) {
			return false;
		}
		return V.orgasmdown >= 1 && V.orgasmcount <= 24 && V.femaleclimax !== 1 && wearingCondom("player") !== "worn" && !playerHasStrapon();
	}

	/**
	 * @param {Condom | false | undefined} condom
	 * @returns {CondomOptions}
	 */
	static getCondomOptions(condom) {
		if (!condom) {
			return {
				show: false,
				isDefective: false,
				volume: 0,
				colour: {},
			};
		}
		return {
			show: condom.worn,
			isDefective: ["defective", "sabotaged"].includes(condom.state),
			volume: 0,
			colour: {
				blend: this.getCondomColour(condom.colour),
				blendMode: "hard-light",
				desaturate: true,
				brightness: 0.4,
				contrast: 1.0,
			},
		};
	}

	/**
	 * @param {string} colour
	 */
	static getCondomColour(colour) {
		const data = setup.colours.condom_map[colour];
		return data.canvasfilter.blend;
	}
}
CombatRenderer.options = {};
window.CombatRenderer = CombatRenderer;
