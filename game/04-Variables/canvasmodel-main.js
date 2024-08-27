/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/no-undefined-types */
/* eslint-disable jsdoc/newline-after-description */
/* eslint-disable jsdoc/require-description-complete-sentence */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable no-useless-return */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */

/*
twine expression conversion (simple cases only):
replace (?<!["'\w])\$(?=\w) with V.
replace (?<!["'\w])_(?=\w) with T.
"to", "is", "gte" etc - fix manually
*/
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
/**
 * MODEL OPTIONS
 * =============
 * See also defaultOptions()
 * Be careful searching for option usages in this file: there's a lot of computed-name property accesses
 * like options["arm_"+arm] or options["arm_"+arm]
 *
 * GROUP TOGGLES:
 * -------------
 * "show_face": boolean, default true
 * "show_hair": boolean, default true
 * "show_tanlines": boolean, default true
 * "show_writings": boolean, default true
 * "show_tf": boolean, default true
 * "show_clothes": boolean, default true
 *
 * BODY OPTIONS:
 * -------------
 * "mannequin":boolean - use mannequin images
 * "breasts":""|"default"|"cleavage" - visible breasts
 * "breast_size":number - breast size tier 1..6
 * "crotch_visible":boolean - display crotch layers
 * "crotch_exposed":boolean - render crotch layers above clothes (unzipped)
 * "penis":""|"default"|"virgin" - has penis
 * "penis_size":number - penis size tier -1..5
 * "penis_parasite":""|"urchin"|"slime"|"parasite" - from $parasite.penis.name
 * "penis_condom": ""|"plain" - from $player.condom.type
 * "condom_colour": "" - from $player.condom.colour
 * "balls":boolean - has balls
 * "nipples_parasite":""|"urchin"|"slime" - from $parasite.nipples.name
 * "chest_parasite":""|"parasite" - from $parasite.breasts.name
 * "clit_parasite":""|"urchin"|"slime"|"parasite" - from $parasite.clit.name
 * "arm_left":"none"|"idle"|"cover" - left arm position ("cover" = covering breasts)
 * "arm_right":"none"|"idle"|"cover"|"hold" - right arm position ("cover" = covering crotch, "hold" = handheld item equipped)
 *
 * SKIN OPTIONS:
 * -------------
 * "skin_type": "custom"|"light"|"medium"|"dark"|"gyaru"|"light"|"medium"|"dark"|"gyaru" -
 *              key of setup.colours.skin_gradients.
 *              "custom" means that skin filters have to be configured manually
 * "skin_tone": 0..1, default tan value
 * Following options configure tanlines, value 0..1 overrides skin tone for that slot,
 * and any negative value or undefined means "no tanlines":
 *  - "skin_tone_breasts"
 *  - "skin_tone_penis"
 *  - "skin_tone_swimshorts"
 *  - "skin_tone_swimsuitTop"
 *  - "skin_tone_swimsuitBottom"
 *  - "skin_tone_bikiniTop"
 *  - "skin_tone_bikiniBottom"
 *
 * HAIR OPTIONS:
 * -------------
 * "hair_colour":string - key from setup.colours.hair_map,
 *                        or "custom" (need to configure "hair" filter manually)
 * "hair_sides_type":string - side hair style or "" for no sides
 * "hair_sides_length":string - visible side hair length stage, "short".."feet"
 * "hair_sides_position":"front"|"back"
 * "hair_fringe_type":string - fringe style or "" for no fringe
 * "hair_fringe_length":string - visible fringe length stage, "short".."feet"
 * "brows_colour":string - key rom setup.colours.hair_map,
 *                         or "custom" (need to configure "brows" filter manually)
 *                         or "" (same as hair_colour) - this is the default
 * "pbhair_colour":string - pubic hair colour, key from setup.colours.hair_map,
 *                          or "custom" (need to configure "brows" filter manually)
 *                          or "" (same as hair_colour) - this is the default
 * "pbhair_level":number - pubic hair level, 0..9, 0 for none
 * "pbhair_strip":number - pubic hair strip level, 0..3. 0 for none
 * "pbhair_balls":number - pubic hair balls level, 0..9, 0 for none
 *
 * FACE OPTIONS:
 * -------------
 * "facestyle": "default" - $facestyle variable, the img/face/XXXX one.
 * "freckles": boolean
 * "trauma": boolean - traumatised state (empty eyes, less blinking)
 * "blink": boolean - blinking enabled
 * "eyes_half": boolean - eyes half closed
 * "eyes_bloodshot":boolean - bloodshot sclera
 * "left_eye": string - colour of left eye
 * "right_eye": string - colour of right eye
 * "brows": "none"|"top"|"low"|"orgasm"|"mid"
 * "mouth": "none"|"neutral"|"cry"|"frown"|"smile"
 * "tears":number - tears level, 0..4, 0 is "no tears"
 * "blush":number - blush level, 0..5, 0 is "no blush"
 * "lipstick_colour": "" (none), key from setup.colours.lipstick_map, or "custom" ("lipstick" filter required)
 * "eyeshadow_colour": "" (none), key from setup.colours.eyeshadow_map, or "custom" ("eyeshadow" filter required)
 * "mascara_colour": "" (none), key from setup.colours.mascara_map, or "custom" ("mascara" filter required)
 * "mascara_running": number - mascara smear level, 0..4, 0 is "no smears"
 *
 * TF OPTIONS: ("disabled" & "hidden" types hide the layer)
 * ----------
 * "angel_wings_type": "disabled"|"hidden"|"default"
 * "angel_wing_right": "idle"|"cover"
 * "angel_wing_left": "idle"|"cover"
 * "angel_wings_layer": "front"|"back",
 * "angel_halo_type": "disabled"|"hidden"|"default"
 * "fallen_wings_type": "disabled"|"hidden"|"default"
 * "fallen_wing_right": "idle"|"cover"
 * "fallen_wing_left": "idle"|"cover"
 * "fallen_wings_layer": "front"|"back",
 * "fallen_halo_type": "disabled"|"hidden"|"default"
 * "demon_wings_type": "disabled"|"hidden"|"default"
 * "demon_wings_state": "idle"|"cover"|"flaunt"
 * "demon_wings_layer": "front"|"back",
 * "demon_tail_type": "disabled"|"hidden"|"default"|"classic"
 * "demon_tail_state": "idle"|"cover"|"flaunt"
 * "demon_tail_layer": "front"|"back"
 * "demon_horns_type": "disabled"|"hidden"|"default"|"classic"
 * "demon_horns_layer": "front"|"back"
 * "wolf_tail_type": "disabled"|"hidden"|"default"|"feral"
 * "wolf_tail_layer": "front"|"back"
 * "wolf_ears_type": "disabled"|"hidden"|"default"|"feral"
 * "wolf_pits_type": "disabled"|"hidden"|"default"
 * "wolf_pubes_type": "disabled"|"hidden"|"default"
 * "wolf_cheeks_type": "disabled"|"hidden"|"feral"
 * "cat_tail_type": "disabled"|"hidden"|"default"
 * "cat_tail_layer": "front"|"back"
 * "cat_ears_type": "disabled"|"hidden"|"default"
 * "cow_horns_type": "disabled"|"hidden"|"default"
 * "cow_horns_layer": "front"|"back"
 * "cow_tail_type": "disabled"|"hidden"|"default"
 * "cow_tail_layer": "front"|"back"
 * "cow_ears_type": "disabled"|"hidden"|"default"
 * "bird_wings_type": "disabled"|"hidden"|"default"
 * "bird_wing_right": "idle"|"cover"
 * "bird_wing_left": "idle"|"cover"
 * "bird_wings_layer": "front"|"back",
 * "bird_tail_type": "disabled"|"hidden"|"default"
 * "bird_tail_layer": "front"|"back"
 * "bird_eyes_type": "disabled"|"hidden"|"default"
 * "bird_malar_type": "disabled"|"hidden"|"default"
 * "bird_plumage_type": "disabled"|"hidden"|"default"
 * "bird_pubes_type": "disabled"|"hidden"|"default"
 * "fox_tail_type": "disabled"|"hidden"|"default"|
 * "fox_tail_layer": "front"|"back"
 * "fox_ears_type": "disabled"|"hidden"|"default"|
 * "fox_cheeks_type": "disabled"|"hidden"|
 *
 * BODY WRITING OPTIONS:
 * --------------------
 * For each body writing SLOT (key in $skin):
 * - "writing_SLOT" - key in setup.bodywwriting, "" for no writing
 *
 * DRIPPING FLUIDS OPTIONS:
 * -----------------------
 * "drip_vaginal": ""|"Start"|"VerySlow"|"Slow"|"Fast"|"VeryFast"
 * "drip_anal"   : ""|"Start"|"VerySlow"|"Slow"|"Fast"|"VeryFast"
 * "drip_mouth"  : ""|"Start"|"VerySlow"|"Slow"|"Fast"|"VeryFast"
 *
 * CLOTHING OPTIONS:
 * ----------------
 * For each clothing SLOT (key in $worn)
 * - "worn_SLOT":number - index of the worn item; 0 for no item
 * - "worn_SLOT_alpha":0..1 - opacity, default 1
 * - "worn_SLOT_integrity":"tattered"|"torn|"frayed"|"full" - integrity suffix attached to file name
 * - "worn_SLOT_colour":string - colour name, key from setup.colours.clothes_map
 *                               or "custom" (need to configure "worn_SLOT_custom" filter manually)
 * - "worn_SLOT_acc_colour":string - accessory colour name, key from setup.colours.clothes_map
 *                                   or "custom" (need to configure "worn_SLOT_acc_custom" filter manually)
 *
 * MISC OPTIONS:
 * -------------
 * "upper_tucked":boolean - $worn.upper tucked in $worn.lower
 * "lower_tucked":boolean - $worn.lower tucked in $worn.feet
 * "hood_down":boolean - hood is pulled down
 * "facewear_layer": "front"|"back"
 *
 * GENERATED OPTIONS (temp variables configured by the model itself in preprocess())
 * ------------------
 * "genitals_chastity":boolean - $worn.genitals type has 'chastity'
 * "handheld_position":boolean - handheld item uses the hold position arm sprite
 * "handheld_overhead":boolean - $worn.handheld type includes 'rainproof' or $worn.handheld.name includes "balloon"
 * "blink_animation":string - "blink"|"blink-trauma"|null
 * "worn_XXXX_setup":object - whole setup.clothes.XXXX object
 * "ztan_XXXX":number - Z-index of tanline level to keep brighter skin above
 * "zarms":number - Z-index of arms
 * "zupper":number - Z-index of "upper" clothing
 *
 * =============
 * MODEL FILTERS
 * =============
 * Following filters are required if related colour option is "custom",
 *  - "hair_custom"
 *  - "pbhair_custom"
 *  - "brows_custom"
 *  - "eyes_custom"
 *  - "eyeshadow_custom"
 *  - "mascara_custom"
 *  - "lipstick_custom"
 * Following filters are generated by applying sprite prefilter to custom or predefined colour
 *  - "hair"
 *  - "pbhair"
 *  - "brows"
 *  - "eyes"
 *  - "eyeshadow"
 *  - "mascara"
 *  - "lipstick"
 *
 * SKIN FILTERS - required if "skin_type" option is "custom", otherwise auto-generated from setup.colours.getSkinFilter
 * ------------
 * "body": skin filter for body
 * "breasts": skin filter for breasts
 * "penis": skin filter for penis
 * "swimshorts": skin filter for penis
 * "swimsuitTop": skin filter for penis
 * "swimsuitBottom": skin filter for penis
 * "bikiniTop": skin filter for penis
 * "bikiniBottom": skin filter for penis
 *
 * CLOTHING COLOUR FILTERS
 * -----------------------
 * For each clothing SLOT:
 * - "worn_SLOT_custom" - required is options.worn_SLOT_colour is "custom"
 * - "worn_SLOT_acc_custom" - required is options.worn_SLOT_acc_colour is "custom"
 * - "worn_SLOT" - generated from sprite prefilter and custom or predefined colour
 * - "worn_SLOT_acc" - generated from sprite prefilter and custom or predefined colour
 */
Renderer.CanvasModels["main"] = {
	name: "main",
	width: 256,
	height: 256,
	frames: 2,
	scale: true, // Can be overriden for each layer
	generatedOptions() {
		return [
			"blink_animation",
			"genitals_chastity",
			"handheld_position",
			"handheld_overhead",
			"zarms",
			...setup.clothes_all_slots.flatMap(key => [`worn_${key}_setup`]),
		]
	},
	defaultOptions() {
		return {
			// group toggles
			"show_face": true,
			"show_hair": true,
			"show_tanlines": true,
			"show_writings": true,
			"show_tf": true,
			"show_clothes": true,
			// body
			"mannequin": false,
			"breasts": "",
			"breast_size": 1,
			"crotch_visible": false,
			"crotch_exposed": false,
			"penis": "",
			"penis_size": -1,
			"penis_parasite": "",
			"penis_condom": "",
			"condom_colour": "",
			"balls": false,
			"nipples_parasite": "",
			"chest_parasite": "",
			"clit_parasite": "",
			"arm_left": "idle",
			"arm_right": "idle",
			"body_type": "m",
			// Skin & tan
			"skin_type": "light",
			"skin_tone": 0,
			"skin_tone_breasts": -0.01,
			"skin_tone_penis": -0.01,
			"skin_tone_swimshorts": -0.01,
			"skin_tone_swimsuitTop": -0.01,
			"skin_tone_swimsuitBottom": -0.01,
			"skin_tone_bikiniTop": -0.01,
			"skin_tone_bikiniBottom": -0.01,
			"skin_scars":false,
			// Hair
			"hair_colour": "red",
			"hair_colour_gradient": {
				style: "split",
				colours: ["red", "black"]
			},
			"hair_colour_style": "simple",
			"hair_sides_type": "default",
			"hair_sides_length": "short",
			"hair_sides_position": "back",
			"hair_fringe_colour": "red",
			"hair_fringe_colour_gradient": {
				style: "split",
				colours: ["red", "black"]
			},
			"hair_fringe_colour_style": "simple",
			"hair_fringe_type": "default",
			"hair_fringe_length": "short",
			"brows_colour": "",
			"brows_position": "front",
			"pbhair_colour": "",
			"pbhair_level": 0,
			"pbhair_strip": 0,
			"pbhair_balls": 0,
			// Face
			"facestyle": "default",
			"ears_position": "back",
			"freckles": false,
			"trauma": false,
			"blink": true,
			"eyes_half": false,
			"eyes_bloodshot": false,
			"left_eye": "purple",
			"right_eye": "purple",
			"brows": "none",
			"mouth": "none",
			"tears": 0,
			"blush": 0,
			"toast": 0,
			"lipstick_colour": "",
			"eyeshadow_colour": "",
			"mascara_colour": "",
			"mascara_running": 0,
			// tf
			"angel_wings_type": "disabled",
			"angel_wing_right": "idle",
			"angel_wing_left": "idle",
			"angel_wings_layer": "front",
			"angel_halo_type": "disabled",
			"angel_halo_lower": false,
			"fallen_wings_type": "disabled",
			"fallen_wing_right": "idle",
			"fallen_wing_left": "idle",
			"fallen_wings_layer": "front",
			"fallen_halo_type": "disabled",
			"demon_wings_type": "disabled",
			"demon_wings_state": "idle",
			"demon_wings_layer": "front",
			"demon_tail_type": "disabled",
			"demon_tail_state": "idle",
			"demon_tail_layer": "front",
			"demon_horns_type": "disabled",
			"demon_horns_layer": "back",
			"wolf_tail_type": "disabled",
			"wolf_tail_layer": "front",
			"wolf_ears_type": "disabled",
			"wolf_pits_type": "disabled",
			"wolf_pubes_type": "disabled",
			"wolf_cheeks_type": "disabled",
			"cat_tail_type": "disabled",
			"cat_tail_state": "idle",
			"cat_tail_layer": "front",
			"cat_ears_type": "disabled",
			"cow_horns_type": "disabled",
			"cow_horns_layer": "back",
			"cow_tail_type": "disabled",
			"cow_tail_layer": "front",
			"cow_ears_type": "disabled",
			"bird_wings_type": "disabled",
			"bird_wing_right": "idle",
			"bird_wing_left": "idle",
			"bird_wings_layer": "front",
			"bird_tail_type": "disabled",
			"bird_tail_layer": "front",
			"bird_eyes_type": "disabled",
			"bird_malar_type": "disabled",
			"bird_plumage_type": "disabled",
			"bird_pubes_type": "disabled",
			"fox_tail_type": "disabled",
			"fox_tail_layer": "front",
			"fox_ears_type": "disabled",
			"fox_cheeks_type": "disabled",
			// body writings
			"writing_forehead": "",
			"writing_left_cheek": "",
			"writing_right_cheek": "",
			"writing_breasts": "",
			"writing_left_shoulder": "",
			"writing_right_shoulder": "",
			"writing_pubic": "",
			"writing_left_thigh": "",
			"writing_right_thigh": "",
			// fluids
			"drip_vaginal": "",
			"drip_anal": "",
			"drip_mouth": "",
			"cum_chest": "",
			"cum_face": "",
			"cum_feet": "",
			"cum_leftarm": "",
			"cum_rightarm": "",
			"cum_neck": "",
			"cum_thigh": "",
			"cum_tummy": "",
			// clothing
			"worn_upper": 0,
			"worn_upper_alpha": 1,
			"worn_upper_integrity": "full",
			"worn_upper_colour": "white",
			"worn_upper_acc_colour": "white",
			"worn_upper_setup": { type: [] }, // generated option
			"worn_over_upper": 0,
			"worn_over_upper_alpha": 1,
			"worn_over_upper_integrity": "full",
			"worn_over_upper_colour": "white",
			"worn_over_upper_acc_colour": "white",
			"worn_over_upper_setup": { type: [] }, // generated option
			"worn_genitals": 0,
			"worn_genitals_alpha": 1,
			"worn_genitals_integrity": "full",
			"worn_genitals_colour": "white",
			"worn_genitals_acc_colour": "white",
			"worn_genitals_setup": { type: [] }, // generated option
			"worn_lower": 0,
			"worn_lower_alpha": 1,
			"worn_lower_integrity": "full",
			"worn_lower_colour": "white",
			"worn_lower_acc_colour": "white",
			"worn_lower_setup": { type: [] }, // generated option
			"worn_over_lower": 0,
			"worn_over_lower_alpha": 1,
			"worn_over_lower_integrity": "full",
			"worn_over_lower_colour": "white",
			"worn_over_lower_acc_colour": "white",
			"worn_over_lower_setup": { type: [] }, // generated option
			"worn_under_lower": 0,
			"worn_under_lower_alpha": 1,
			"worn_under_lower_integrity": "full",
			"worn_under_lower_colour": "white",
			"worn_under_lower_acc_colour": "white",
			"worn_under_lower_setup": { type: [] }, // generated option
			"worn_under_upper": 0,
			"worn_under_upper_alpha": 1,
			"worn_under_upper_integrity": "full",
			"worn_under_upper_colour": "white",
			"worn_under_upper_acc_colour": "white",
			"worn_under_upper_setup": { type: [] }, // generated option
			"worn_hands": 0,
			"worn_hands_alpha": 1,
			"worn_hands_integrity": "full",
			"worn_hands_colour": "white",
			"worn_hands_acc_colour": "white",
			"worn_hands_setup": { type: [] }, // generated option
			"worn_handheld": 0,
			"worn_handheld_alpha": 1,
			"worn_handheld_integrity": "full",
			"worn_handheld_colour": "white",
			"worn_handheld_acc_colour": "white",
			"worn_handheld_setup": { type: [] }, // generated option
			"worn_head": 0,
			"worn_head_alpha": 1,
			"worn_head_integrity": "full",
			"worn_head_colour": "white",
			"worn_head_acc_colour": "white",
			"worn_head_setup": { type: [] }, // generated option
			"worn_over_head": 0,
			"worn_over_head_alpha": 1,
			"worn_over_head_integrity": "full",
			"worn_over_head_colour": "white",
			"worn_over_head_acc_colour": "white",
			"worn_over_head_setup": { type: [] }, // generated option
			"worn_face": 0,
			"worn_face_alpha": 1,
			"worn_face_integrity": "full",
			"worn_face_colour": "white",
			"worn_face_acc_colour": "white",
			"worn_face_setup": { type: [] }, // generated option
			"worn_neck": 0,
			"worn_neck_alpha": 1,
			"worn_neck_integrity": "full",
			"worn_neck_colour": "white",
			"worn_neck_acc_colour": "white",
			"worn_neck_setup": { type: [] }, // generated option
			"worn_legs": 0,
			"worn_legs_alpha": 1,
			"worn_legs_integrity": "full",
			"worn_legs_colour": "white",
			"worn_legs_acc_colour": "white",
			"worn_legs_setup": { type: [] }, // generated option
			"worn_feet": 0,
			"worn_feet_alpha": 1,
			"worn_feet_integrity": "full",
			"worn_feet_colour": "white",
			"worn_feet_acc_colour": "white",
			"worn_feet_setup": { type: [] }, // generated option
			// misc
			"genitals_chastity": false, // generated option
			"handheld_overhead": false, // generated option
			"upper_tucked": false,
			"lower_tucked": false,
			"hood_down": false,
			"alt_sleeve": false,
			"acc_layer_under": false,
			"head_mask_src": "", // generated option
			"belly_mask_src": "", // generated option
			"blink_animation": "", // generated option
			"ztan_swimshorts": ZIndices.base, // generated option
			"ztan_swimsuitTop": ZIndices.base, // generated option
			"ztan_swimsuitBottom": ZIndices.base, // generated option
			"ztan_bikiniTop": ZIndices.breasts, // generated option
			"ztan_bikiniBottom": ZIndices.base, // generated option
			"zarms": ZIndices.armsidle, // generated options
			"zupper": ZIndices.upper, // generated options
			"zupperleft": ZIndices.upper_arms, // generated options
			"zupperright": ZIndices.upper_arms, // generated options
			// filters
			"filters": {},
			"lights": {
				yOffset: 59,
				xOffset: -7,
				spotlight: {
					maxAlpha: 0.6,
					radiusX: 50,
					radiusY: 15,
				},
				glow: {
					maxAlpha: 0.6,
					radiusX: 55,
					radiusY: 100,
					yOffset: -82,
				},
				gradient: {
					enabled: true,
					height: 200,
					maxAlpha: 0.6,
				},
				flat: {
					enabled: true,
					maxAlpha: 0.6,
				},
				colors: {
					default: "#ffffff",
					angel: "#ffd700",
					demon: "#8B008B",
				}
			},
		}
	},
	preprocess(options) {
		const blink = options.trauma ? "blink-trauma" : "blink";
		options.blink_animation = options.blink ? blink : "";

		// Generate skin tone & tanlines filters
		if (options.skin_type !== "custom") {
			options.filters.body = setup.colours.getSkinFilter(options.skin_type, options.skin_tone);
			options.filters.breasts = options.filters.body;
			options.filters.penis = options.filters.body;
			if (options.show_tanlines) {
				const tanslots = [
					'breasts',
					'penis',
					'swimshorts',
					'swimsuitTop',
					'swimsuitBottom',
					'bikiniTop',
					'bikiniBottom',
				].map(slotname => [slotname, options[`skin_tone_${slotname}`]])
					.filter(slot => slot[1] >= 0); // [slotname, tanvalue], only for tanvalue >= 0
				// Brightest on top
				tanslots.sort((a, b) => b[1] - a[1]);
				tanslots.forEach((slot, i) => {
					options.filters[slot[0]] = setup.colours.getSkinFilter(options.skin_type, slot[1]);
					options[`ztan_${slot[0]}`] = options[`ztan_${slot[0]}`] + 0.01 * i;
				});
			}
		}

		// Generate filters for colour-by-name properties
		/**
		 * For colour name, lookup its canvas filter and merge with sprite prefilter.
		 * @param {object} dict map in setup.colours to lookup in
		 * @param {string} key colour name
		 * @param {string} debugName used when reporting errors
		 * @param {string} customFilterName key in options.filters
		 * @param {string} prefilterName name of prefilter to apply
		 * @return {CompositeLayerParams}
		 */
		const lookupColour = (dict, key, debugName, customFilterName, prefilterName) => {
			let filter;
			if (key === "custom") {
				filter = clone(options.filters[customFilterName]);
				if (!filter) {
					console.error(`custom ${debugName} colour not configured`);
					return {};
				}
			} else if (key !== "original") {
				let record = dict[key];
				if (!record) {
					console.error(`unknown ${debugName} colour: ${key}`);
					return {};
				}
				filter = clone(record.canvasfilter);
			}

			if (prefilterName) {
				Renderer.mergeLayerData(
					filter,
					setup.colours.sprite_prefilters[prefilterName],
					true
				);
			}
			return filter;
		}

		const createHairColourGradient = (hairPart, gradient, hairType, hairLength, prefilterName) => {
			const filterPrototypeLibrary = setup.colours.hairgradients_prototypes[hairPart][gradient.style];
			const filterPrototype = filterPrototypeLibrary[hairType] || filterPrototypeLibrary.all;
			const filter = {
				blend: clone(filterPrototype),
				brightness: {
					gradient: filterPrototype.gradient,
					values: filterPrototype.values,
					adjustments: [[], []]
				},
				blendMode: "hard-light"
			};

			for (const colorIndex in filter.blend.colors) {
				filter.brightness.adjustments[colorIndex][0] = filter.blend.lengthFunctions[0](hairLength, filter.blend.colors[colorIndex][0]);
				filter.brightness.adjustments[colorIndex][1] = setup.colours.hair_map[gradient.colours[colorIndex]].canvasfilter.brightness || 0;

				filter.blend.colors[colorIndex][0] = filter.blend.lengthFunctions[0](hairLength, filter.blend.colors[colorIndex][0]);
				filter.blend.colors[colorIndex][1] = setup.colours.hair_map[gradient.colours[colorIndex]].canvasfilter.blend;
			}

			Renderer.mergeLayerData(filter, setup.colours.sprite_prefilters[prefilterName], true);

			return filter;
		}

		options.filters.left_eye = lookupColour(setup.colours.eyes_map, options.left_eye, "eyes", "eyes_custom", "eyes");
		options.filters.right_eye = lookupColour(setup.colours.eyes_map, options.right_eye, "eyes", "eyes_custom", "eyes");

		if (options.hair_colour_style === "gradient") {
			options.filters.hair = createHairColourGradient(
				"sides",
				options.hair_colour_gradient,
				options.hair_sides_type,
				hairLengthStringToNumber(options.hair_sides_length),
				"hair"
			);
		}
		if (options.hair_colour_style === "simple") {
			options.filters.hair = lookupColour(
				setup.colours.hair_map,
				options.hair_colour,
				"hair",
				"hair_custom",
				"hair"
			);
		}
		if (options.hair_fringe_colour_style === "gradient") {
			options.filters.hair_fringe = createHairColourGradient(
				"fringe",
				options.hair_fringe_colour_gradient || options.hair_colour_gradient,
				options.hair_fringe_type,
				hairLengthStringToNumber(options.hair_sides_length),
				"hair_fringe"
			);
		}
		if (options.hair_fringe_colour_style === "simple") {
			options.filters.hair_fringe = lookupColour(
				setup.colours.hair_map,
				options.hair_fringe_colour || options.hair_colour,
				"hair_fringe",
				"hair_fringe_custom",
				"hair_fringe"
			);
		}

		const empty = Renderer.emptyLayerFilter();
		options.filters.brows = lookupColour(setup.colours.hair_map, options.brows_colour || options.hair_colour, "brows", "brows_custom", "brows");
		options.filters.pbhair = lookupColour(setup.colours.hair_map, options.pbhair_colour || options.hair_colour, "pbhair", "pbhair_custom", "pbhair");
		options.filters.lipstick = (options.lipstick_colour) ? lookupColour(
			setup.colours.lipstick_map, options.lipstick_colour, "lipstick", "lipstick_custom", "lipstick"
		) : empty;
		options.filters.eyeshadow = (options.eyeshadow_colour) ? lookupColour(
			setup.colours.eyeshadow_map, options.eyeshadow_colour, "eyeshadow", "eyeshadow_custom", "eyeshadow"
		) : empty;
		options.filters.mascara = (options.mascara_colour) ? lookupColour(
			setup.colours.mascara_map, options.mascara_colour, "mascara", "mascara_custom", "mascara"
		) : empty;

		if (options.condom_colour) options.filters.condom = lookupColour(setup.colours.condom_map, options.condom_colour, "condom", "condom_custom", "condom");

		if (options.breasts_parasite === "parasite") {
			options.filters.breasts_parasite = lookupColour(setup.colours.clothes_map, "red", "breasts_parasite");
		}
		if (["parasite", "parasitem"].includes(options.clit_parasite)) {
			options.filters.clit_parasite = lookupColour(setup.colours.clothes_map, "red", "clit_parasite");
		}
		if (options.penis_parasite === "parasite") {
			options.filters.penis_parasite = lookupColour(setup.colours.clothes_map, "red", "penis_parasite");
		}

		// Clothing filters and options
		for (const slot of setup.clothes_all_slots) {
			const index = options[`worn_${slot}`];
			if (index <= 0) continue;
			/**
			 * @type {ClothesItem}
			 */
			const setupObj = setup.clothes[slot][index];
			options[`worn_${slot}_setup`] = setupObj;

			options.filters[`worn_${slot}`] = (setupObj.colour_sidebar) ? lookupColour(
				setup.colours.clothes_map,
				options[`worn_${slot}_colour`],
				`${slot} clothing`,
				`worn_${slot}_custom`,
				setupObj.prefilter
			) : empty;

			options.filters[`worn_${slot}_acc`] = (setupObj.accessory_colour_sidebar) ? lookupColour(
				setup.colours.clothes_map,
				options[`worn_${slot}_acc_colour`],
				slot + " accessory",
				`worn_${slot}_acc_custom`,
				setupObj.prefilter
			) : empty;
		}

		// Show arm and hand just below outermost clothes layer to fully show its main/breasts layer and hide others
		// -0.1 is to move arms behind sleeves; to display gloves above sleeves they get +0.2 in hand layer decls
		if (options.worn_over_upper) {
			options.zarms = ZIndices.over_upper_arms - 0.1;
		} else if (options.worn_upper) {
			if (options.arm_left === "cover") {
				if (options.upper_tucked) {
					options.zarms = ZIndices.upper_arms_tucked - 0.1;
				} else {
					options.zarms = ZIndices.upper_arms - 0.1;
				}
			} else {
				options.zarms = ZIndices.under_upper_arms - 0.1;
			}
		} else if (options.worn_under_upper) {
			options.zarms = ZIndices.under_upper_arms - 0.1;
		} else {
			options.zarms = ZIndices.armsidle
		}

		// Do not put skin above sleeves
		if (options.worn_under_upper_setup.sleeve_img === 1) {
			options.zarms = ZIndices.under_upper_arms - 0.1;
		} else if (options.worn_upper_setup.sleeve_img === 1) {
			if (options.arm_left === "cover") {
				if (options.upper_tucked) {
					options.zarms = ZIndices.upper_arms_tucked - 0.1;
				} else {
					options.zarms = ZIndices.upper_arms - 0.1;
				}
			} else {
				options.zarms = ZIndices.under_upper_arms - 0.1;
			}
		}

		options.zupper = (options.upper_tucked) ? ZIndices.upper_tucked : ZIndices.upper;
		options.zupperleft = (options.upper_tucked) ? ZIndices.upper_arms_tucked : ZIndices.upper_arms;
		options.zupperright = (options.upper_tucked) ? ZIndices.upper_arms_tucked : ZIndices.upper_arms_tucked;

		if (options.arm_right === "cover" || options.arm_right === "hold" ) options.zupperright = ZIndices.upper_arms_cover;
		if (options.arm_left === "cover") options.zupperleft = ZIndices.upper_arms_cover;
		if (options.worn_upper_setup.name === "cocoon") options.hideAll = true;

		// Generate mask images
		options.lowerMask = [];
		options.lowerBellyMask = [];
		options.lowerShadowMask = [];
		const hairTails = ["curly pigtails", "fluffy ponytail", "thick sidetail", "thick twintails", "ribbon tail", "thick sidetail", "thick ponytail", "half-up"];
		const thickTails = ["scorpion tails", "thick pigtails", "thick twintails"];
		const furCap = ["furcap f", "furcap m"];
		if (options.worn_upper_setup.mask_img === 1 && options.worn_upper_setup.name === "cocoon") {
			options.head_mask_src = "img/clothes/upper/cocoon/mask.png";
		} else if (
			options.worn_over_head_setup.mask_img === 1
				&& !(options.hood_down && options.worn_over_head_setup.hood && options.worn_over_head_setup.outfitSecondary !== undefined)
		) {
			options.head_mask_src = `img/clothes/head/${options.worn_over_head_setup.variable}/mask.png`;
		} else if (
			options.worn_head_setup.mask_img === 1
				&& !(options.hood_down && options.worn_head_setup.hood && options.worn_head_setup.outfitSecondary !== undefined)
		) {
			if (
				options.worn_head_setup.mask_img_ponytail === 1
					&& hairTails.includes(options.hair_sides_type)
					|| thickTails.includes(options.hair_sides_type)
					&& furCap.includes(options.worn_head_setup.variable)
			) {
				options.head_mask_src = `img/clothes/head/${options.worn_head_setup.variable}/mask_ponytail.png`;
			} else {
				options.head_mask_src = `img/clothes/head/${options.worn_head_setup.variable}/mask.png`;
			}
		} else {
			options.head_mask_src = null;
		}

		if (["fro", "afro pouf", "afro puffs"].includes(options.hair_sides_type) && options.hair_fringe_type === "fro") {
			options.fringe_mask_src = `img/hair/fringe/${options.hair_fringe_type}/mask.png`;
		} else {
			options.fringe_mask_src = null;
		}

		if (
			options.worn_upper_setup.type.includes("bellyHide")
				|| options.worn_lower_setup.type.includes("bellyHide")
				|| !V.worn.over_upper.type.includes("naked")
		) {
			options.belly -= 3;
		}

		const bellyDir =  "img/clothes/belly"
		if (between(options.belly, 8, 24)) {
			options.belly_mask_lower_shadow_src = `${bellyDir}/shadow_${options.belly}.png`;
			options.lowerShadowMask.push(options.belly_mask_lower_shadow_src);
			options.belly_mask_upper_shadow_src = `${bellyDir}/shadow_${options.belly}.png`;
		}

		if (between(options.belly, 15, 24)) {
			options.belly_mask_src = options.worn_upper_setup.pregType == "min" ?
				`${bellyDir}/mask_min_${options.belly}.png` : `${bellyDir}/mask_${options.belly}.png`;
				options.lowerBellyMask.push(options.belly_mask_src);

			if (V.worn.upper.outfitPrimary == undefined && options.worn_lower_setup.pregType !== "cover") {
				if (options.belly >= 19) {
					options.belly_hides_lower = true;
					options.belly_mask_clip_src = `${bellyDir}/mask_clip_${options.belly}.png`;
					options.lowerMask.push(options.belly_mask_clip_src);

					const check = options.worn_upper_setup.pregType == "split";
					const suffix = options.belly >= 22 ? "_big.png" : ".png";
					options.shirt_mask_clip_src = check ? `${bellyDir}/mask_shirt_clip${suffix}` : null;
					options.shirt_move_left_src = check ? `${bellyDir}/mask_shirt_left${suffix}` : null;
					options.shirt_move_left2_src = check ? `${bellyDir}/mask_shirt_left2.png` : null;
					options.shirt_move_right_src = check ? `${bellyDir}/mask_shirt_right.png` : null;
					options.shirt_move_right2_src = check ? `${bellyDir}/mask_shirt_right2.png` : null;
					options.shirt_move_right3_src = check ? `${bellyDir}/mask_shirt_right3.png` : null;

					if (check) options.shirt_mask_breasts_src = `${bellyDir}/mask_shirt_breasts.png`;
				} else {
					options.belly_mask_clip_src = null;
				}
			}

			if (V.worn.under_upper.outfitPrimary == undefined) {
				options.belly_hides_under_lower = true;
				options.belly_mask_under_clip_src = `${bellyDir}/mask_clip_${options.belly}.png`;
			} else {
				options.belly_mask_under_clip_src = null;
			}
		}

		const notMasc = ["f", "a"].includes(options.body_type);
		if (notMasc && options.breasts === "cleavage") {
			const suffix = between(options.breast_size, 3, 4) ? "-mid.png" : ".png";
			options.breasts_mask_src = `img/body/breasts/breasts-${options.body_type}${suffix}`
		} else {
			options.breasts_mask_src = null;
		}

		if (notMasc) {
			const check = (options.worn_upper_setup.formfitting || options.worn_under_upper_setup.formfitting);
			options.shirt_fitted_clip_src = check ? `img/clothes/masks/formfitting_${options.body_type}.png` : null;
			options.shirt_fitted_right_move_src = check ? "img/clothes/masks/formfitting_right_move.png" : null;
			options.shirt_fitted_left_move_src = check ? "img/clothes/masks/formfitting_left_move.png" : null;
		}

		if (options.lower_tucked && !options.worn_lower_setup.notuck && !options.worn_feet_setup.notuck) {
			options.feet_clip_src = `img/clothes/feet/${options.worn_feet_setup.variable}/mask.png`;
			options.lowerMask.push(options.feet_clip_src);
			options.lowerBellyMask.push(options.feet_clip_src);
			options.lowerShadowMask.push(options.feet_clip_src);
		} else {
			options.feet_clip_src = null;
		}

		options.genitals_chastity = options.worn_genitals_setup.type.includes("chastity");

		if (options.worn_handheld_setup.type.includes("rainproof")) {
			options.handheld_overhead = true;
			if (options.angel_halo_type === "default") options.angel_halo_lower = true;
		} else if (["balloon", "heart balloon", "paper fan", "torch"].includes(options.worn_handheld_setup.name)) {
			options.handheld_overhead = true;
			options.angel_halo_lower = false;
		} else {
			options.handheld_overhead = null;
			options.angel_halo_lower = false;
		}

		if (
			options.worn_handheld_setup.name != "pom poms"
				&& options.worn_handheld_setup.name != "naked"
				&& options.arm_right === "hold"
		) {
			options.handheld_position = true;
		} else {
			options.handheld_position = null;
		}

		options.genitals_chastity = options.worn_genitals_setup.type.includes("chastity");

		if (options.worn_head_setup.name === "cat hoodie hood" && options.worn_upper_setup.name === "cat hoodie") {
			options.hood_damage = true;
		} else {
			options.hood_damage = false;
		}

		if (
			options.worn_neck_setup.has_collar === 1
				&& options.worn_upper_setup.has_collar === 1
				&& !(options.worn_upper_setup.name === "dress shirt" && V.worn.upper.altposition === "alt")
		) {
			options.nocollar = true;
			options.serafuku = false
		} else if (options.worn_neck_setup.name === "sailor ribbon" && options.worn_upper_setup.name === "serafuku") {
			options.nocollar = false;
			options.serafuku = true
		} else {
			options.nocollar = false;
			options.serafuku = false
		}

		if (
			options.worn_head_setup.mask_img === 1
				&& !(options.hood_down && options.worn_head_setup.hood && options.worn_head_setup.outfitSecondary !== undefined)
		) {
			options.hood_mask = true;
		} else {
			options.hood_mask = null;
		}

		if (
			options.worn_neck_setup.name === "suspenders"
				&& options.worn_neck_setup.altposition != "alt"
				&& ["retro shorts", "retro trousers", "baseball shorts", "wide leg trousers"].includes(options.worn_lower_setup.name)
		) {
			options.high_waist_suspenders = true;
		} else {
			options.high_waist_suspenders = null;
		}

		/*clothes whose sleeves cannot be rolled up*/
		if (options.worn_upper_setup.variable === "schoolcardigan" && V.worn.upper.altposition !== "alt") {
			options.alt_sleeve_state = null;
		} else {
			options.alt_sleeve_state = true;
		}
	},
	layers: {
		"spotlight": {
			srcfn(options) {
				if (!options.lights) return "";
				const spotlightCanvas = new BaseCanvas(Renderer.CanvasModels["main"].width, Renderer.CanvasModels["main"].height, 1);

				const centerX = spotlightCanvas.element.width / 2;
				const centerY = spotlightCanvas.element.height / 2;

				drawRadialGradient(
					spotlightCanvas.ctx,
					centerX,
					centerY,
					options.lights.xOffset,
					options.lights.yOffset,
					options.lights.spotlight.radiusX,
					options.lights.spotlight.radiusY,
					options.lights.spotlight.maxAlpha,
					V.options.lightSpotlight,
				);

				return spotlightCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn(options) {
				return V.options.characterLightEnabled;
			},
			z: ZIndices.spotlight,
		},
		"glow": {
			srcfn(options) {
				if (!options.lights) return "";
				const glowCanvas = new BaseCanvas(Renderer.CanvasModels["main"].width, Renderer.CanvasModels["main"].height, 1);

				const centerX = glowCanvas.element.width / 2;
				const centerY = glowCanvas.element.height / 2;

				drawRadialGradient(
					glowCanvas.ctx,
					centerX,
					centerY,
					options.lights.xOffset,
					options.lights.yOffset + options.lights.glow.yOffset,
					options.lights.glow.radiusX,
					options.lights.glow.radiusY,
					options.lights.glow.maxAlpha,
					V.options.lightGlow,
				);

				return glowCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn() {
				return V.options.characterLightEnabled;
			},
			z: ZIndices.glowlight,
		},
		"linearGradient": {
			srcfn(options) {
				if (!options.lights) return "";
				const linearGradientCanvas = new BaseCanvas(Renderer.CanvasModels["main"].width, Renderer.CanvasModels["main"].height, 1);

				// Draw linear gradient
				drawLinearGradient(
					linearGradientCanvas.ctx,
					options.lights.gradient.maxAlpha,
					V.options.lightGradient,
					options.lights.gradient.height
				);

				return linearGradientCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn(options) {
				return V.options.characterLightEnabled && options.lights.gradient.enabled;
			},
			z: ZIndices.gradientlight,
		},
		"flatColorOverlay": {
			srcfn(options) {
				if (!options.lights) return "";
				const flatColorCanvas = new BaseCanvas(Renderer.CanvasModels["main"].width, Renderer.CanvasModels["main"].height, 1);

				const flatColor = "#ffffff";

				// Draw flat color overlay
				drawColorOverlay(
					flatColorCanvas.ctx,
					flatColor,
					options.lights.flat.maxAlpha,
					V.options.lightFlat
				);

				return flatColorCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn(options) {
				return V.options.characterLightEnabled && options.lights.flat.enabled;
			},
			z: ZIndices.flatlight,
		},
		// banner comments generated in http://patorjk.com/software/taag/#p=display&c=c&f=ANSI%20Regular&t=base
		/***
		 *    ██████   █████  ███████ ███████
		 *    ██   ██ ██   ██ ██      ██
		 *    ██████  ███████ ███████ █████
		 *    ██   ██ ██   ██      ██ ██
		 *    ██████  ██   ██ ███████ ███████
		 *
		 *
		 */
		"base": {
			show: true,
			filters: ["body"],
			z: ZIndices.base,
			animation: "idle",

			srcfn(options) {
				return options.mannequin ? "img/body/mannequin/basenoarms.png" : `img/body/basenoarms-${options.body_type}.png`;
			},
		},
		"basehead": {
			show: true,
			filters: ["body"],
			z: ZIndices.basehead,
			animation: "idle",

			srcfn(options) {
				return options.mannequin ? "img/body/mannequin/basehead.png" : "img/body/basehead.png";
			},
		},
		"breasts": {
			filters: ["breasts"],
			z: ZIndices.breasts,
			animation: "idle",

			masksrcfn(options) {
				return options.breasts_mask_src;
			},
			showfn(options) {
				return !!options.breasts;
			},
			srcfn(options) {
				if (options.breast_size <= 0) return "";

				const mannequin = (options.mannequin) ? "mannequin/" : "";
				const prefix = `img/body/${mannequin}`;
				const suffix = options.breasts === "cleavage" && options.breast_size >= 3 ? "_clothed.png" : ".png";
				return `${prefix}breasts/breasts${options.breast_size}${suffix}`;
			},
		},
		"belly": {
			filters: ["body"],
			z: ZIndices.bellyBase,
			animation: "idle",

			showfn(options) {
				return !!options.belly
			},
			srcfn(options) {
				return between(options.belly,1,24) ? `img/body/preggyBelly/pregnancy_belly_${options.belly}.png` : "";
			},
		},
		"nipples_parasite": {
			z: ZIndices.breastsparasite + 0.1,
			animation: "idle",

			showfn(options) {
				return !!options.nipples_parasite;
			},
			srcfn(options) {
				switch (options.nipples_parasite) {
					case "urchin":
						return `img/body/breasts/chestparasite${options.breast_size}.png`;
					case "slime":
						return `img/body/breasts/chestslime${options.breast_size}.png`;
					default:
						return "";
				}
			},
		},
		"breasts_parasite": {
			filters: ["breasts_parasite"],
			z: ZIndices.breastsparasite,
			animation: "idle",

			showfn(options) {
				return !!options.breasts_parasite;
			},
			srcfn(options) {
				return options.breasts_parasite === 'parasite' ? `img/body/breasts/breastsparasite${options.breast_size}.png` : "";
			},
		},
		"leftarm": {
			filters: ["body"],
			animation: "idle",

			zfn(options) {
				return (options.arm_left === "cover") ? ZIndices.arms_cover : options.zarms;
			},
			showfn(options) {
				return options.arm_left !== "none";
			},
			srcfn(options) {
				if (options.mannequin) return "img/body/mannequin/leftarmidle.png";
				if (options.arm_left === "cover") return "img/body/leftarm.png";
				return `img/body/leftarmidle-${options.body_type}.png`
			},
		},
		"rightarm": {
			filters: ["body"],
			animation: "idle",

			zfn(options) {
				return (options.arm_right === "cover" || options.arm_right === "hold") ? ZIndices.arms_cover : options.zarms;
			},
			showfn(options) {
				return options.arm_right !== "none";
			},
			srcfn(options) {
				if (options.mannequin && options.handheld_position) return "img/body/mannequin/rightarmhold.png";
				if (options.mannequin) return "img/body/mannequin/rightarmidle.png";
				if (options.arm_right === "cover") return "img/body/rightarm.png";
				if (options.handheld_position) return "img/body/rightarmhold.png";
				return `img/body/rightarmidle-${options.body_type}.png`
			},
		},

		/***
		 *    ████████  █████  ███    ██ ██      ██ ███    ██ ███████ ███████
		 *       ██    ██   ██ ████   ██ ██      ██ ████   ██ ██      ██
		 *       ██    ███████ ██ ██  ██ ██      ██ ██ ██  ██ █████   ███████
		 *       ██    ██   ██ ██  ██ ██ ██      ██ ██  ██ ██ ██           ██
		 *       ██    ██   ██ ██   ████ ███████ ██ ██   ████ ███████ ███████
		 *
		 *
		 */
		"tan_swimshorts": {
			src: "img/body/tan/under_lower/swimshorts.png",
			filters: ["swimshorts"],
			animation: "idle",

			zfn(options) {
				return options.ztan_swimshorts;
			},
			showfn(options) {
				return !options.mannequin
					&& options.show_tanlines
					&& options.skin_tone_swimshorts >= 0
					&& options.skin_tone_swimshorts !== options.skin_tone;
			},
		},
		"tan_swimsuitTop": {
			src: "img/body/tan/under_upper/swimsuit/swimsuit.png",
			filters: ["swimsuitTop"],
			animation: "idle",

			zfn(options) {
				return options.ztan_swimsuitTop;
			},
			showfn(options) {
				return !options.mannequin
					&& options.show_tanlines
					&& options.skin_tone_swimsuitTop >= 0
					&& options.skin_tone_swimsuitTop !== options.skin_tone;
			},
		},
		"tan_swimsuitBottom": {
			src: "img/body/tan/under_lower/swimsuit.png",
			filters: ["swimsuitBottom"],
			animation: "idle",

			zfn(options) {
				return options.ztan_swimsuitBottom;
			},
			showfn(options) {
				return !options.mannequin
					&& options.show_tanlines
					&& options.skin_tone_swimsuitBottom >= 0
					&& options.skin_tone_swimsuitBottom !== options.skin_tone;
			},
		},
		"tan_bikiniTop": {
			filters: ["bikiniTop"],
			animation: "idle",

			srcfn(options) {
				return `img/body/tan/under_upper/bikini/${options.breast_size}.png`;
			},
			zfn(options) {
				return options.ztan_bikiniTop;
			},
			showfn(options) {
				return !options.mannequin
					&& options.show_tanlines
					&& options.breasts
					&& options.skin_tone_bikiniTop >= 0
					&& options.skin_tone_bikiniTop !== options.skin_tone;
			},
		},
		"tan_bikiniBottom": {
			src: "img/body/tan/under_lower/bikini.png",
			filters: ["bikiniBottom"],
			animation: "idle",

			zfn(options) {
				return options.ztan_bikiniBottom;
			},
			showfn(options) {
				return !options.mannequin
					&& options.show_tanlines
					&& options.skin_tone_bikiniBottom >= 0
					&& options.skin_tone_bikiniBottom !== options.skin_tone;
			},
		},

		/***
		 *    ███████  █████   ██████ ███████
		 *    ██      ██   ██ ██      ██
		 *    █████   ███████ ██      █████
		 *    ██      ██   ██ ██      ██
		 *    ██      ██   ██  ██████ ███████
		 *
		 *
		 */
		"facebase": {
			filters: ["body"],
			z: ZIndices.facebase,
			animation: "idle",

			srcfn(options) {
				return `img/face/${options.facestyle}/base.png`;
			},
			showfn(options) {
				return options.show_face;
			},
		},
		"freckles": {
			filters: ["body"],
			z: ZIndices.freckles,

			srcfn(options) {
				return `img/face/${options.facestyle}/freckles.png`;
			},
			showfn(options) {
				return options.show_face && !!options.freckles;
			},
		},
		"ears": {
			filters: ["body"],
			z: ZIndices.ears,

			srcfn(options) {
				return `img/face/${options.facestyle}/ears.png`;
			},
			showfn(options) {
				return options.show_face && options.ears_position === "front";
			},
		},
		"eyes": {
			filters: ["body"],
			z: ZIndices.eyes,

			srcfn(options) {
				return `img/face/${options.facestyle}/eyes.png`;
			},
			showfn(options) {
				return options.show_face;
			},
		},
		"sclera": {
			z: ZIndices.sclera,

			srcfn(options) {
				return `img/face/${options.facestyle}/${options.eyes_bloodshot ? "sclerabloodshot" : "sclera"}.png`;
			},
			showfn(options) {
				return options.show_face;
			},
		},
		"left_iris": {
			filters: ["left_eye"],
			z: ZIndices.iris,
			animation: "idle",

			srcfn(options) {
				const iris = options.trauma ? "irisempty" : "iris";
				const half = options.eyes_half ? "_halfclosed" : "";
				return `img/face/${options.facestyle}/${iris}${half}_left.png`;
			},
			showfn(options) {
				return options.show_face;
			},
		},
		"right_iris": {
			filters: ["right_eye"],
			z: ZIndices.iris,
			animation: "idle",

			srcfn(options) {
				const iris = options.trauma ? "irisempty" : "iris";
				const half = options.eyes_half ? "_halfclosed" : "";
				return `img/face/${options.facestyle}/${iris}${half}_right.png`;
			},
			showfn(options) {
				return options.show_face;
			},
		},
		"eyelids": {
			show: true,
			filters: ["body"],
			z: ZIndices.eyelids,

			srcfn(options) {
				const half = options.eyes_half ? "_halfclosed" : "";
				return `img/face/${options.facestyle}/eyelids${half}.png`;
			},
			animationfn(options) {
				return options.blink_animation;
			},
		},
		"lashes": {
			z: ZIndices.lashes,

			srcfn(options) {
				const half = options.eyes_half ? "_halfclosed" : "";
				return `img/face/${options.facestyle}/lashes${half}.png`;
			},
			showfn(options) {
				return options.show_face;
			},
			animationfn(options) {
				return options.blink_animation;
			},
		},
		"makeup_eyeshadow": {
			filters: ["eyeshadow"],
			z: ZIndices.eyelids,

			srcfn(options) {
				const half = options.eyes_half ? "_halfclosed" : "";
				return `img/face/${options.facestyle}/makeup/eyeshadows${half}.png`;
			},
			animationfn(options) {
				return options.blink_animation;
			},
			showfn(options) {
				return options.show_face && !!options.eyeshadow_colour;
			},
		},
		"makeup_mascara": {
			filters: ["mascara"],
			z: ZIndices.lashes,

			srcfn(options) {
				const half = options.eyes_half ? "_halfclosed" : "";
				return `img/face/${options.facestyle}/makeup/mascara${half}.png`;
			},
			animationfn(options) {
				return  options.blink_animation;
			},
			showfn(options) {
				return options.show_face && !!options.mascara_colour;
			},
		},
		"brows": {
			filters: ["brows"],
			z: ZIndices.brow,

			srcfn(options) {
				return `img/face/${options.facestyle}/brow${options.brows}.png`;
			},
			zfn(options) {
				return options.brows_position === "back" ? ZIndices.backbrow : ZIndices.brow;
			},
			showfn(options) {
				return options.show_face && options.brows !== "none";
			},
		},
		"mouth": {
			filters: ["body"],
			z: ZIndices.mouth,

			srcfn(options) {
				return `img/face/${options.facestyle}/mouth${options.mouth}.png`;
			},
			showfn(options) {
				return options.show_face && options.mouth !== "none";
			},
		},
		"makeup_lipstick": {
			filters: ["lipstick"],
			z: ZIndices.mouth,

			srcfn(options) {
				return `img/face/${options.facestyle}/makeup/lipstick_${options.mouth}.png`;
			},
			showfn(options) {
				return options.show_face && !!options.lipstick_colour;
			},
		},
		"blush": {
			filters: ["body"],
			z: ZIndices.blush,

			srcfn(options) {
				return `img/face/${options.facestyle}/blush${options.blush}.png`;
			},
			showfn(options) {
				return options.show_face && options.blush > 0;
			},
		},
		"tears": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/face/${options.facestyle}/tear${options.tears}.png`;
			},
			showfn(options) {
				return options.show_face && options.tears > 0;
			},
		},
		"makeup_mascara_tears": {
			filters: ["mascara"],
			z: ZIndices.mascara_running,

			srcfn(options) {
				return `img/face/${options.facestyle}/makeup/mascara${options.mascara_running}.png`;
			},
			showfn(options) {
				return options.show_face && options.mascara_running > 0 && !!options.mascara_colour;
			},
		},
		"toast": {
			filters: ["toast"],
			z: ZIndices.toast,

			srcfn() {
				return V.trauma > 4000 ? 'img/misc/toast_raw.png' : 'img/misc/toast_buttered.png';
			},
			showfn(options) {
				return options.show_face && !!options.toast;
			},
		},
		"scars": {
			z: ZIndices.neck,

			srcfn() {
				return 'img/body/wraith_scars.png';
			},
			showfn(options) {
				return options.show_face && options.scars;
			},
		},
		/***
		 *    ██   ██  █████  ██ ██████
		 *    ██   ██ ██   ██ ██ ██   ██
		 *    ███████ ███████ ██ ██████
		 *    ██   ██ ██   ██ ██ ██   ██
		 *    ██   ██ ██   ██ ██ ██   ██
		 *
		 *
		 */
		"hair_sides": {
			filters: ["hair"],
			animation: "idle",

			srcfn(options) {
				return `img/hair/sides/${options.hair_sides_type}/${options.hair_sides_length}.png`;
			},
			zfn(options) {
				return options.hair_sides_position === "front" ? ZIndices.hairforwards : ZIndices.backhair;
			},
			masksrcfn(options) {
				return options.head_mask_src;
			},
			showfn(options) {
				return !!options.show_hair && !!options.hair_sides_type;
			},
		},
		"hair_fringe": {
			filters: ["hair_fringe"],
			z: ZIndices.fronthair,
			animation: "idle",

			srcfn(options) {
				return `img/hair/fringe/${options.hair_fringe_type}/${options.hair_fringe_length}.png`;
			},
			showfn(options) {
				return !!options.show_hair && !!options.hair_fringe_type;
			},
			masksrcfn(options) {
				return options.head_mask_src ? options.head_mask_src : options.fringe_mask_src;
			},
		},
		"hair_extra": { // Extra layer for thighs+ long hair for certain styles
			filters: ["hair"],
			z: ZIndices.backhair,
			animation: "idle",

			srcfn(options) {
				const hairs = [
					"default",
					"loose",
					"curl",
					"defined curl",
					"neat",
					"dreads",
					"afro pouf",
					"thick ponytail",
					"all down",
					"half-up",
					"messy ponytail"
				];

				const path = `img/hair/back/${options.hair_sides_type}`;
				if (options.hair_sides_length === "feet" && [...hairs, "space buns", "straight"].includes(options.hair_sides_type))
					return `${path}/feet.png`;
				if (options.hair_sides_length === "thighs" && hairs.includes(options.hair_sides_type))
					return `${path}/thighs.png`;
				if (options.hair_sides_length === "navel" && options.hair_sides_type === "messy ponytail")
					return `${path}/navel.png`;
				if (options.hair_sides_type === "ruffled")
					return `${path}/${options.hair_sides_length}.png`;
				return "";
			},
			masksrcfn(options) {
				return options.head_mask_src;
			},
			showfn(options) {
				return !!options.show_hair && !!options.hair_sides_type;
			},
		},
		/***
		 *     ██████ ██████   ██████  ████████  ██████ ██   ██
		 *    ██      ██   ██ ██    ██    ██    ██      ██   ██
		 *    ██      ██████  ██    ██    ██    ██      ███████
		 *    ██      ██   ██ ██    ██    ██    ██      ██   ██
		 *     ██████ ██   ██  ██████     ██     ██████ ██   ██
		 *
		 *
		 */
		"pbhair": {
			filters: ["pbhair"],
			z: ZIndices.pbhair,
			animation: "idle",

			srcfn(options) {
				return `img/hair/phair/pb${options.pbhair_level}.png`;
			},
			showfn(options) {
				// $pblevel 4 does not exist
				return options.crotch_visible
					&& options.pbhair_level > 1
					&& !options.belly_hides_under_lower
					&& options.pbhair_level !== 4;
			},
		},
		"pbhair_strip": {
			filters: ["pbhair"],
			z: ZIndices.pbhair,
			animation: "idle",

			srcfn(options) {
				return `img/hair/phair/pbstrip${options.pbhair_strip}.png`;
			},
			showfn(options) {
				return options.crotch_visible
					&& options.pbhair_strip >= 1
					&& !options.belly_hides_under_lower;
			},
		},
		"pbhair_balls": {
			filters: ["pbhair"],
			animation: "idle",

			zfn(options) {
				return options.crotch_exposed ? ZIndices.pbhairballs : ZIndices.pbhairballsunderclothes;
			},
			srcfn(options) {
				return `img/hair/phair/balls/${options.penis_size}_pb${options.pbhair_balls}.png`;
			},
			showfn(options) {
				return options.crotch_visible
					&& options.pbhair_balls > 1
					&& options.balls
					&& !options.genitals_chastity;
			},
		},
		"penis": {
			filters: ["penis"],
			animation: "idle",

			zfn(options) {
				if (!options.crotch_exposed) return ZIndices.penisunderclothes
				return (options.genitals_chastity) ? ZIndices.penis_chastity : ZIndices.penis
			},
			srcfn(options) {
				if (options.mannequin) return "img/body/mannequin/penis.png";
				if (options.genitals_chastity) {
					if (["chastity belt", "flat chastity cage", "chastity parasite"].includes(options.worn_genitals_setup.name)) return;
					if (options.worn_genitals_setup.name === "small chastity cage") return "img/body/penis/penis_chastitysmall.png";
					return "img/body/penis/penis_chastity.png";
				}
				if (!playerHasStrapon()) {
					return `img/body/${options.balls ? 'penis' : 'penisnoballs'}/${options.penis === "virgin" ? "penis_virgin" : "penis"}${options.penis_size}.png`;
				}

				return; //if the player has a strapon, then we want to hide their penis
			},
			showfn(options) {
				return options.crotch_visible && !!options.penis;
			},
		},
		"penis_parasite": {
			filters: ["penis_parasite"],
			animation: "idle",

			srcfn(options) {
				if (options.genitals_chastity) {
					if (!options.worn_genitals_setup.name.includes("cage")) return "";
					switch (options.penis_parasite) {
						case "urchin":
							return `img/clothes/genitals/${options.worn_genitals_setup.variable}/urchin.png`;
						case "slime":
							return `img/clothes/genitals/${options.worn_genitals_setup.variable}/slime.png`;
						default:
							break;
					}
				}

				switch (options.penis_parasite) {
					case "urchin":
						return `img/body/penis/penisurchin${options.penis_size}.png`;
					case "slime":
						return `img/body/penis/penisslime${options.penis_size}.png`;
					case "parasite":
						return `img/body/penis/penisparasite${options.balls ? 'balls' : ''}${options.penis_size}.png`;
					default:
						return "";
				}
			},
			showfn(options) {
				return options.crotch_visible && !!options.penis && !!options.penis_parasite;
			},
			zfn(options) {
				if (options.genitals_chastity) return options.crotch_exposed ? ZIndices.penis_chastity : ZIndices.penisunderclothes;
				if (options.crotch_exposed) return ZIndices.parasite;
				return ZIndices.underParasite;
			},
		},
		"clit_parasite": {
			filters: ["clit_parasite"],
			animation: "idle",

			srcfn(options) {
				switch (options.clit_parasite) {
					case "urchin":
						return 'img/body/cliturchin.png';
					case "slime":
						return 'img/body/clitslime.png';
					case "parasite":
						return 'img/body/parasitepanty.png';
					case "parasitem":
						return 'img/body/parasiteshorts.png';
					default:
						return "";
				}
			},
			showfn(options) {
				if (options.clit_parasite === "parasite") return !options.belly_hides_under_lower;
				return options.crotch_visible && !!options.clit_parasite && !options.chastity
			},
			zfn(options) {
				if (["parasite", "parasitem"].includes(options.clit_parasite))
					return options.crotch_exposed ? ZIndices.penis_chastity - 0.1 : ZIndices.penisunderclothes - 0.1;
				if (options.crotch_exposed) return ZIndices.parasite;
				return ZIndices.underParasite;
			},
		},
		"penis_condom": {
			alpha: 0.4,
			animation: "idle",
			filters: ["condom"],

			srcfn(options) {
				return options.penis_condom === 'plain' ? `img/body/penis/condom${options.penis_size}.png` : '';
			},
			showfn(options) {
				return options.crotch_visible
					&& !!options.penis
					&& !!options.penis_condom
					&& !options.genitals_chastity;
			},
			zfn(options) {
				return options.crotch_exposed ? ZIndices.parasite : ZIndices.underParasite;
			},
		},
		/***
		 *    ████████ ███████ ███████
		 *       ██    ██      ██
		 *       ██    █████   ███████
		 *       ██    ██           ██
		 *       ██    ██      ███████
		 *
		 *
		 */

		/***
		 *     █████  ███    ██  ██████  ███████ ██
		 *    ██   ██ ████   ██ ██       ██      ██
		 *    ███████ ██ ██  ██ ██   ███ █████   ██
		 *    ██   ██ ██  ██ ██ ██    ██ ██      ██
		 *    ██   ██ ██   ████  ██████  ███████ ███████
		 *
		 *
		 */
		"angel_wings_right": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/rightwing/${options.angel_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wing_right === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.angel_wings_layer === "back" ? ZIndices.over_head_back : ZIndices.backhair;
			},
		},
		"angel_wings_right_front": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/rightwing/${options.angel_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wing_right === "idle"
					&& options.angel_wings_type === "default"
					&& options.angel_wings_layer !== "back"
					&& !options.hideAll;
			},
			masksrcfn(options) {
				return `img/transformations/angel/rightwing/${options.angel_wings_type}_mask.png`;
			},
			zfn() {
				return ZIndices.over_head;
			},
		},
		"angel_wings_rightcover": {
			z: ZIndices.tailPenisCover,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/rightcover/${options.angel_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wing_right === "cover"
					&& !options.hideAll;
			},
		},
		"angel_wings_left": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/leftwing/${options.angel_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wing_left === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.angel_wings_layer === "back" ? ZIndices.head_back : ZIndices.backhair;
			},
		},
		"angel_wings_left_back": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/leftwing/${options.angel_wings_type}_back.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wings_type === "default"
					&& options.angel_wing_left === "idle"
					&& !options.hideAll;
			},
			zfn() {
				return ZIndices.head_back;
			},
		},
		"angel_wings_left_front": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/leftwing/${options.angel_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wing_left === "idle"
					&& options.angel_wings_type === "default"
					&& options.angel_wings_layer !== "back"
					&& !options.hideAll;
			},
			masksrcfn(options) {
				return `img/transformations/angel/leftwing/${options.angel_wings_type}_mask.png`;
			},
			zfn() {
				return ZIndices.over_head
			},
		},
		"angel_wings_leftcover": {
			z: ZIndices.tailPenisCover,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/leftcover/${options.angel_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.angel_wings_type)
					&& options.angel_wing_left === "cover"
					&& !options.hideAll;
			},
		},
		"angel_halo_back": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/backhalo/${options.angel_halo_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.angel_halo_type) && !options.hideAll;
			},
			dyfn(options) {
				return options.angel_halo_lower && isPartEnabled(options.angel_halo_type) ? 20 : 0;
			},
			zfn(options) {
				return options.angel_halo_lower && isPartEnabled(options.angel_halo_type) ? ZIndices.head_back : ZIndices.over_head_back;
			},
		},
		"angel_halo_front": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/angel/fronthalo/${options.angel_halo_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.angel_halo_type) && !options.hideAll;
			},
			dyfn(options) {
				return options.angel_halo_lower && isPartEnabled(options.angel_halo_type) ? 20 : 0;
			},
			zfn(options) {
				return options.angel_halo_lower && isPartEnabled(options.angel_halo_type) ? ZIndices.over_head : ZIndices.old_over_upper;
			},
		},

		/***
		 *    ███████  █████  ██      ██      ███████ ███    ██
		 *    ██      ██   ██ ██      ██      ██      ████   ██
		 *    █████   ███████ ██      ██      █████   ██ ██  ██
		 *    ██      ██   ██ ██      ██      ██      ██  ██ ██
		 *    ██      ██   ██ ███████ ███████ ███████ ██   ████
		 *
		 *
		 */
		"fallen_wings_right": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/rightwing/${options.fallen_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.fallen_wings_type)
					&& options.fallen_wing_right === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.fallen_wings_layer === "back" ? ZIndices.head_back : ZIndices.backhair;
			},
		},
		"fallen_wings_right_front": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/rightwing/${options.fallen_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.fallen_wings_type)
					&& options.fallen_wing_right === "idle"
					&& ["default", "fallenplus"].includes(options.fallen_wings_type)
					&& options.hair_sides_position !== "front"
					&& options.fallen_wings_layer !== "back"
					&& !options.hideAll;
			},
			masksrcfn(options) {
				return `img/transformations/fallen/rightwing/${options.fallen_wings_type}_mask.png`;
			},
			zfn() {
				return ZIndices.over_head;
			},
		},
		"fallen_wings_rightcover": {
			z: ZIndices.tailPenisCover,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/rightcover/${options.fallen_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.fallen_wings_type)
					&& options.fallen_wing_right === "cover"
					&& !options.hideAll;
			},
		},
		"fallen_wings_left": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/leftwing/${options.fallen_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.fallen_wings_type)
					&& options.fallen_wing_left === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.fallen_wings_layer === "back" ? ZIndices.head_back : ZIndices.backhair;
			},
		},
		"fallen_wings_left_front": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/leftwing/${options.fallen_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.fallen_wings_type)
					&& options.fallen_wing_left === "idle"
					&& ["default", "fallenplus"].includes(options.fallen_wings_type)
					&& options.hair_sides_position !== "front"
					&& options.fallen_wings_layer !== "back"
					&& !options.hideAll;
			},
			masksrcfn(options) {
				return `img/transformations/fallen/leftwing/${options.fallen_wings_type}_mask.png`;
			},
			zfn() {
				return ZIndices.over_head;
			},
		},
		"fallen_wings_leftcover": {
			z: ZIndices.tailPenisCover,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/leftcover/${options.fallen_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.fallen_wings_type)
					&& options.fallen_wing_left === "cover"
					&& !options.hideAll;
			},
		},
		"fallen_halo_back": {
			z: ZIndices.over_head_back,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/backbrokenhalo/${options.fallen_halo_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.fallen_halo_type) && !options.hideAll;
			},
		},
		"fallen_halo_front": {
			z: ZIndices.old_over_upper,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fallen/frontbrokenhalo/${options.fallen_halo_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.fallen_halo_type) && !options.hideAll;
			},
		},

		/***
		 *    ██████  ███████ ███    ███  ██████  ███    ██
		 *    ██   ██ ██      ████  ████ ██    ██ ████   ██
		 *    ██   ██ █████   ██ ████ ██ ██    ██ ██ ██  ██
		 *    ██   ██ ██      ██  ██  ██ ██    ██ ██  ██ ██
		 *    ██████  ███████ ██      ██  ██████  ██   ████
		 *
		 *
		 */
		"demon_wings": {
			z: ZIndices.backhair,
			filters: ["demon_wings"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/wings/${options.demon_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.demon_wings_type)
					&& !isPartEnabled(options.bird_wings_type)
					&& options.demon_wings_state === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				if (options.demon_wings_layer === "back") return ZIndices.head_back;
				if (options.demon_wings_layer === "cover") return ZIndices.tailPenisCover;
				return ZIndices.backhair
			},
		},
		"demon_wings_flaunt": {
			z: ZIndices.tailPenisCover,
			filters: ["demon_wings"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/flauntwings/${options.demon_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.demon_wings_type)
					&& options.demon_wings_state === "flaunt"
					&& !options.hideAll;
			},
		},
		"demon_wings_cover": {
			z: ZIndices.tailPenisCover,
			filters: ["demon_wings"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/leftcover/${options.demon_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.demon_wings_type)
					&& options.demon_wings_state === "cover"
					&& !options.hideAll;
			},
		},
		"demon_tail": {
			filters: ["demon_tail"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/tail/${options.demon_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.demon_tail_type)
					&& options.demon_tail_state === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				if (options.demon_tail_layer === "back") return ZIndices.tail;
				if (options.demon_tail_layer === "cover") return ZIndices.tailPenisCoverOverlay;
				return ZIndices.back_lower;
			},
		},
		"demon_tail_flaunt": {
			z: ZIndices.tailPenisCoverOverlay,
			filters: ["demon_tail"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/flaunttail/${options.demon_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.demon_tail_type)
					&& options.demon_tail_state === "flaunt"
					&& !options.hideAll;
			},
		},
		"demon_tail_cover": {
			z: ZIndices.tailPenisCoverOverlay,
			filters: ["demon_tail"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/rightcover/${options.demon_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.demon_tail_type)
					&& options.demon_tail_state === "cover"
					&& !options.hideAll;
			},
		},
		"demon_horns": {
			z: ZIndices.horns,
			filters: ["demon_horns"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/demon/horns/${options.demon_horns_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.demon_horns_type) && !options.hideAll;
			},
			zfn(options) {
				return options.demon_horns_layer === "front" ? ZIndices.over_head : ZIndices.horns;
			},
			masksrcfn(options) {
				return options.demon_horns_layer !== "front" ? options.head_mask_src : null;
			},
		},
		/***
		 *    ██     ██  ██████  ██      ███████
		 *    ██     ██ ██    ██ ██      ██
		 *    ██  █  ██ ██    ██ ██      █████
		 *    ██ ███ ██ ██    ██ ██      ██
		 *     ███ ███   ██████  ███████ ██
		 *
		 *
		 */
		"wolf_tail": {
			animation: "idle",
			filters: ["hair"],

			srcfn(options) {
				return `img/transformations/wolf/tail/${options.wolf_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.wolf_tail_type) && !options.hideAll;
			},
			zfn(options) {
				return options.wolf_tail_layer === "back" ? ZIndices.tail : ZIndices.back_lower;
			},
		},
		"wolf_ears": {
			z: ZIndices.backhair,
			animation: "idle",
			filters: ["hair"],

			srcfn(options) {
				return `img/transformations/wolf/ears/${options.wolf_ears_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.wolf_ears_type) && !options.hideAll;
			},
			masksrcfn(options) {
				return options.head_mask_src;
			},
		},
		"wolf_pits": {
			filters: ["hair"],
			z: ZIndices.hirsute,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/hirsute/pits/${options.wolf_pits_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.wolf_pits_type) && !options.hideAll;
			},
		},
		"wolf_pubes": {
			filters: ["hair"],
			z: ZIndices.hirsute,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/hirsute/pubes/${options.wolf_pubes_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.wolf_pubes_type)
					&& !options.belly_hides_under_lower
					&& !options.hideAll;
			},
		},
		"wolf_cheeks": {
			filters: ["hair"],
			z: ZIndices.lower,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/wolf/cheeks/${options.wolf_cheeks_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.wolf_cheeks_type) && !options.hideAll;
			},
		},
		/***
		 *     ██████  █████  ████████
		 *    ██      ██   ██    ██
		 *    ██      ███████    ██
		 *    ██      ██   ██    ██
		 *     ██████ ██   ██    ██
		 *
		 *
		 */

		"cat_tail": {
			animation: "idle",
			filters: ["hair"],

			srcfn(options) {
				return `img/transformations/cat/tail/${options.cat_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.cat_tail_type)
					&& options.cat_tail_state === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.cat_tail_layer === "back" ? ZIndices.tail : ZIndices.back_lower;
			},
		},
		"cat_tail_flaunt": {
			z: ZIndices.tailPenisCover,
			filters: ["hair"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/cat/flaunttail/${options.cat_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.cat_tail_type)
					&& options.cat_tail_state === "flaunt"
					&& !options.hideAll;
			},
		},
		"cat_tail_cover": {
			z: ZIndices.tailPenisCover,
			filters: ["hair"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/cat/covertail/${options.cat_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.cat_tail_type)
					&& options.cat_tail_state === "cover"
					&& !options.hideAll;
			},
		},
		"cat_ears": {
			filters: ["hair"],
			z: ZIndices.backhair,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/cat/ears/${options.cat_ears_type}.png`;
			},
			masksrcfn(options) {
				return options.head_mask_src;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.cat_ears_type) && !options.hideAll;
			},
		},
		/***
		 *     ██████  ██████  ██     ██
		 *    ██      ██    ██ ██     ██
		 *    ██      ██    ██ ██  █  ██
		 *    ██      ██    ██ ██ ███ ██
		 *     ██████  ██████   ███ ███
		 *
		 *
		 */
		"cow_horns": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/cow/horns/${options.cow_horns_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.cow_horns_type) && !options.hideAll;
			},
			zfn(options) {
				return options.cow_horns_layer === "front" ? ZIndices.over_head : ZIndices.horns;
			},
			masksrcfn(options) {
				return options.cow_horns_layer !== "front" ? options.head_mask_src : null;
			},
		},
		"cow_ears": {
			z: ZIndices.horns,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/cow/ears/${options.cow_ears_type}.png`;
			},
			masksrcfn(options) {
				return options.head_mask_src;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.cow_ears_type) && !options.hideAll;
			},
		},
		"cow_tag": {
			z: ZIndices.face,
			animation: "idle",

			srcfn() {
				return "img/transformations/cow/tag.png";
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.cow_ears_type) && !options.hideAll;
			},
		},
		"cow_tail": {
			animation: "idle",

			srcfn(options) {
				return `img/transformations/cow/tail/${options.cow_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.cow_tail_type) && !options.hideAll;
			},
			zfn(options) {
				return options.cow_tail_layer === "back" ? ZIndices.tail : ZIndices.back_lower;
			},
		},
		/***
		 *    ██████  ██ ██████  ██████
		 *    ██   ██ ██ ██   ██ ██   ██
		 *    ██████  ██ ██████  ██   ██
		 *    ██   ██ ██ ██   ██ ██   ██
		 *    ██████  ██ ██   ██ ██████
		 *
		 *
		 */

		"bird_wings_right": {
			animation: "idle",
			filters: ["hair"],

			srcfn(options) {
				return `img/transformations/bird/rightwing/${options.bird_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.bird_wings_type)
					&& options.bird_wing_right === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.bird_wings_layer === "back" ? ZIndices.head_back : ZIndices.backhair;
			},
		},
		"bird_wings_rightcover": {
			filters: ["hair"],
			z: ZIndices.tailPenisCover,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/bird/rightcover/${options.bird_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.bird_wings_type)
					&& options.bird_wing_right === "cover"
					&& !options.hideAll;
			},
		},
		"bird_wings_left": {
			animation: "idle",
			filters: ["hair"],

			srcfn(options) {
				return `img/transformations/bird/leftwing/${options.bird_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.bird_wings_type)
					&& options.bird_wing_left === "idle"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.bird_wings_layer === "back" ? ZIndices.head_back : ZIndices.backhair;
			},
		},
		"bird_wings_leftcover": {
			filters: ["hair"],
			z: ZIndices.tailPenisCover,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/bird/leftcover/${options.bird_wings_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.bird_wings_type)
					&& options.bird_wing_left === "cover"
					&& !options.hideAll;
			},
		},
		"bird_tail": {
			filters: ["hair"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/bird/tail/${options.bird_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.bird_tail_type) && !options.hideAll;
			},
			zfn(options) {
				return options.bird_tail_layer === "back" ? ZIndices.tail : ZIndices.back_lower;
			},
		},
		"bird_eyes": {
			z: ZIndices.irisacc,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/bird/eyes/${options.bird_eyes_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& options.show_face
					&& isPartEnabled(options.bird_eyes_type)
					&& !options.hideAll;
			},
		},
		"bird_malar": {
			filters: ["hair"],
			z: ZIndices.lower,
			animation: "idle",
			srcfn(options) {
				return `img/transformations/bird/malar/${options.bird_malar_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.bird_malar_type) && !options.hideAll;
			},
		},
		"bird_plumage": {
			filters: ["hair"],
			z: ZIndices.lower,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/bird/plumage/${options.bird_plumage_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.bird_plumage_type) && !options.hideAll;
			},
		},
		"bird_pubes": {
			filters: ["hair"],
			z: ZIndices.hirsute,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/bird/pubes/${options.bird_pubes_type}.png`;
			},
			showfn(options) {
				return options.show_tf
					&& isPartEnabled(options.bird_pubes_type)
					&& !options.belly_hides_under_lower
					&& !options.hideAll;
			},
		},
		/***
		 *    ███████  ██████  ██   ██
		 *    ██      ██    ██  ██ ██
		 *    █████   ██    ██   ███
		 *    ██      ██    ██  ██ ██
		 *    ██       ██████  ██   ██
		 *
		 *
		 */
		"fox_tail": {
			filters: ["hair"],
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fox/tail/${options.fox_tail_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.fox_tail_type) && !options.hideAll;
			},
			zfn(options) {
				return options.fox_tail_layer === "back" ? ZIndices.tail : ZIndices.back_lower;
			},
		},
		"fox_ears": {
			filters: ["hair"],
			z: ZIndices.backhair,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fox/ears/${options.fox_ears_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.fox_ears_type) && !options.hideAll;
			},
			masksrcfn(options) {
				return options.head_mask_src;
			},
		},
		"fox_cheeks": {
			filters: ["hair"],
			z: ZIndices.lower,
			animation: "idle",

			srcfn(options) {
				return `img/transformations/fox/cheeks/${options.fox_cheeks_type}.png`;
			},
			showfn(options) {
				return options.show_tf && isPartEnabled(options.fox_cheeks_type) && !options.hideAll;
			},
		},


		/***
		 *    ██     ██ ██████  ██ ████████ ██ ███    ██  ██████  ███████
		 *    ██     ██ ██   ██ ██    ██    ██ ████   ██ ██       ██
		 *    ██  █  ██ ██████  ██    ██    ██ ██ ██  ██ ██   ███ ███████
		 *    ██ ███ ██ ██   ██ ██    ██    ██ ██  ██ ██ ██    ██      ██
		 *     ███ ███  ██   ██ ██    ██    ██ ██   ████  ██████  ███████
		 *
		 *
		 */
		"writing_forehead": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				return getWritingImgPath('forehead', setup.bodywriting[options.writing_forehead]);
			},
			showfn(options) {
				return options.show_writings && !!options.writing_forehead;
			},
		},
		"writing_left_cheek": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				return getWritingImgPath('left_cheek', setup.bodywriting[options.writing_left_cheek]);
			},
			showfn(options) {
				return options.show_writings && !!options.writing_left_cheek;
			},
		},
		"writing_right_cheek": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				const area_name = "right_cheek"
				const writing = setup.bodywriting[options.writing_right_cheek];
				if (writing.type === "text") {
					if (writing.sprites && writing.sprites.length > 0 && writing.sprites.includes(area_name)) {
						return `img/bodywriting/text/${writing.key}/${area_name}.png`;
					}
					return `img/bodywriting/text/default/${area_name}.png`;
				}

				const arrow = writing.arrow ? "_arrow" : "";
				if (writing.type === "object") return `img/bodywriting/${writing.writing}/${area_name}${arrow}.png`;
				return '';
			},
			showfn(options) {
				return options.show_writings && !!options.writing_right_cheek;
			},
		},
		"writing_breasts": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				const area_name = "breasts"
				const writing = setup.bodywriting[options.writing_breasts];
				if (writing.type === "text") {
					if (writing.sprites && writing.sprites.length > 0 && writing.sprites.includes(area_name)) {
						return `img/bodywriting/text/${writing.key}/${area_name}.png`;
					}
					return `img/bodywriting/text/default/${area_name}1.png`;
				}
				if (writing.type === "object") {
					return `img/bodywriting/${writing.writing}/${area_name}${options.breast_size}.png`;
				}
				return '';
			},
			showfn(options) {
				return options.show_writings && !!options.writing_breasts;
			},
		},
		"writing_breasts_extra": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				const writing = setup.bodywriting[options.writing_breasts];
				if ((!writing.sprites || writing.sprites.length == 0)
						&& writing.type === "text" && options.breast_size >= 2) {
					return `img/bodywriting/text/default/breasts${options.breast_size}.png`;
				}
				return '';
			},
			showfn(options) {
				return options.show_writings && !!options.writing_breasts;
			},
		},
		"writing_left_shoulder": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				return getWritingImgPath('left_shoulder', setup.bodywriting[options.writing_left_shoulder]);
			},
			showfn(options) {
				return options.show_writings && !!options.writing_left_shoulder;
			},
		},
		"writing_right_shoulder": {
			animation: "idle",

			srcfn(options) {
				return getWritingImgPath('right_shoulder', setup.bodywriting[options.writing_right_shoulder]);
			},
			showfn(options) {
				return options.show_writings && !!options.writing_right_shoulder;
			},
			zfn(options) {
				return ["cover", "hold"].includes(options.arm_right) ? ZIndices.arms_cover + 0.1 : ZIndices.armsidle + 0.1;
			},
		},
		"writing_pubic": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				return getWritingImgPathArrow('pubic', setup.bodywriting[options.writing_pubic]);
			},
			showfn(options) {
				return options.show_writings && !!options.writing_pubic;
			},
		},
		"writing_left_thigh": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				return getWritingImgPathArrow('left_thigh', setup.bodywriting[options.writing_left_thigh]);
			},
			showfn(options) {
				return options.show_writings && !!options.writing_left_thigh;
			},
		},
		"writing_right_thigh": {
			z: ZIndices.skin,
			animation: "idle",

			srcfn(options) {
				return getWritingImgPathArrow('right_thigh', setup.bodywriting[options.writing_right_thigh]);
			},
			showfn(options) {
				return !!options.writing_right_thigh;
			},
		},

		/***
		 *    ██████  ██████  ██ ██████  ███████
		 *    ██   ██ ██   ██ ██ ██   ██ ██
		 *    ██   ██ ██████  ██ ██████  ███████
		 *    ██   ██ ██   ██ ██ ██           ██
		 *    ██████  ██   ██ ██ ██      ███████
		 *
		 *
		 */

		"drip_vaginal": {
			z: ZIndices.tears,

			srcfn(options) {
				return `img/body/cum/VaginalCumDrip${options.drip_vaginal}.png`;
			},
			showfn(options) {
				return !!options.drip_vaginal;
			},
			animationfn(options) {
				return `VaginalCumDrip${options.drip_vaginal}`;
			},
		},
		"drip_anal": {
			z: ZIndices.tears,

			srcfn(options) {
				return `img/body/cum/AnalCumDrip${options.drip_anal}.png`;
			},
			showfn(options) {
				return !!options.drip_anal;
			},
			animationfn(options) {
				return `AnalCumDrip${options.drip_anal}`;
			},
		},
		"drip_mouth": {
			z: ZIndices.semencough,

			srcfn(options) {
				return `img/body/cum/MouthCumDrip${options.drip_mouth}.png`;
			},
			showfn(options) {
				return options.show_face
					&& !!options.drip_mouth
					&& !options.worn_face_setup.type.includesAny("mask", "covered");
			},
			dxfn(options) {
				return options.facestyle === "small-eyes" ? 2 : 0;
			},
			animationfn(options) {
				return `MouthCumDrip${options.drip_mouth}`;
			},
		},
		"cum_chest": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Chest ${options.cum_chest}.png`;
			},
			showfn(options) {
				return !!options.cum_chest;
			},
		},
		"cum_face": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Face ${options.cum_face}.png`;
			},
			showfn(options) {
				return options.show_face && !!options.cum_face;
			},
		},
		"cum_feet": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Feet ${options.cum_feet}.png`;
			},
			showfn(options) {
				return !!options.cum_feet;
			},
		},
		"cum_leftarm": {
			z: ZIndices.tears,
			animation: "idle",
			srcfn(options) {
				return `img/body/cum/Left Arm ${options.cum_leftarm}.png`;
			},
			showfn(options) {
				return options.arm_left !== "none" && options.arm_left != "cover" && !!options.cum_leftarm;
			},
		},
		"cum_rightarm": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Right Arm ${options.cum_rightarm}.png`;
			},
			showfn(options) {
				return options.arm_right !== "none"
					&& options.arm_right != "cover"
					&& options.arm_right != "hold"
					&& !!options.cum_rightarm;
			},
		},
		"cum_neck": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Neck ${options.cum_neck}.png`;
			},
			showfn(options) {
				return !!options.cum_neck;
			},
		},
		"cum_thigh": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Thighs ${options.cum_thigh}.png`;
			},
			showfn(options) {
				return !!options.cum_thigh;
			},
		},
		"cum_tummy": {
			z: ZIndices.tears,
			animation: "idle",

			srcfn(options) {
				return `img/body/cum/Tummy ${options.cum_tummy}.png`;
			},
			showfn(options) {
				return !!options.cum_tummy;
			},
		},

		/***
		 *     ██████ ██       ██████  ████████ ██   ██ ███████ ███████
		 *    ██      ██      ██    ██    ██    ██   ██ ██      ██
		 *    ██      ██      ██    ██    ██    ███████ █████   ███████
		 *    ██      ██      ██    ██    ██    ██   ██ ██           ██
		 *     ██████ ███████  ██████     ██    ██   ██ ███████ ███████
		 *
		 *
		 */
		/***
		 *    ██    ██ ██████  ██████  ███████ ██████
		 *    ██    ██ ██   ██ ██   ██ ██      ██   ██
		 *    ██    ██ ██████  ██████  █████   ██████
		 *    ██    ██ ██      ██      ██      ██   ██
		 *     ██████  ██      ██      ███████ ██   ██
		 *
		 *
		 */
		"upper_main": genlayer_clothing_main('upper', {
			zfn(options) {
				return options.worn_upper_setup.name === "cocoon" ? ZIndices.over_head : options.zupper;
			},
			masksrcfn(options) {
				return (options.belly >= 7) ?
					options.shirt_mask_clip_src :
					options.worn_upper_setup.formfitting && options.shirt_fitted_clip_src;
			},
		}),
		"upper_fitted_left": genlayer_clothing_fitted_left("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		"upper_fitted_right": genlayer_clothing_fitted_right("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_fitted_right_move_src;
			},
			dxfn() {
				return 2;
			},
		}),
		"upper_belly_split_shadow": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper - 1;
			},
			masksrcfn(options) {
				return options.shirt_mask_clip_src;
			},
			dyfn(options) {
				return options.shirt_move_left_src ? 2 : 0;
			},
			dxfn() {
				return 0;
			},
			brightnessfn(options) {
				return options.shirt_move_left_src ? -0.3 : 0;
			},
		}),
		"upper_belly_split_l": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_left_src;
			},
			dxfn(options) {
				if (options.shirt_move_left_src)
					return options.belly >= 22 ? 12 : 8;
				return 0;
			},
			dyfn(options) {
				return options.shirt_move_left_src ? -2 : 0;
			},
		}),
		"upper_belly_split_l2": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_left2_src;
			},
			dxfn(options) {
				if (options.shirt_move_left2_src)
					return options.belly >= 22 ? 14 : 10;
				return 0;
			},
			dyfn() {
				return 0;
			},
		}),
		"upper_belly_split_l_shadow": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper - 1;
			},
			masksrcfn(options) {
				return options.shirt_move_left_src
			},
			dxfn(options) {
				if (options.shirt_move_left_src)
					return options.belly >= 22 ? 14 : 10;
				return 0;
			},
			dyfn(options) {
				return options.shirt_move_left_src ? -2 : 0;
			},
			brightnessfn(options) {
				return options.shirt_move_left_src ? -0.3 : 0;
			},
		}),
		"upper_belly_split_l2_shadow": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper - 1;
			},
			masksrcfn(options) {
				return options.shirt_move_left2_src;
			},
			dxfn(options) {
				if (options.shirt_move_left2_src)
					return options.belly >= 22 ? 16 : 12;
				return 0;
			},
			dyfn() {
				return 0;
			},
			brightnessfn(options) {
				return options.shirt_move_left_src ? -0.3 : 0;
			},
		}),
		"upper_belly_split_r": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_right_src;
			},
		}),
		"upper_belly_split_r2": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_right2_src;
			},
			dxfn(options) {
				if (options.shirt_move_right2_src) return -4;
			},
		}),
		"upper_belly_split_r3": genlayer_clothing_belly_split("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_right3_src;
			},
			dxfn(options) {
				if (options.shirt_move_right3_src) return -6;
			},
		}),
		"upper_belly_2": genlayer_clothing_belly_2("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.belly_mask_src;
			},
		}),
		"upper_belly": genlayer_clothing_belly("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.belly_mask_src;
			},
		}),
		"upper_belly_acc": genlayer_clothing_belly_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.belly_mask_src;
			},
		}),
		"upper_belly_split_acc_shadow": genlayer_clothing_belly_split_acc("upper", {
			zfn(options) {
				return options.zupper - 1;
			},
			masksrcfn(options) {
				return options.shirt_mask_clip_src;
			},
			dyfn(options) {
				return options.shirt_move_left_src ? 2 : 0;
			},
			dxfn() {
				return 0;
			},
			brightnessfn(options) {
				return options.shirt_move_left_src ? -0.3 : 0;
			},
		}),
		"upper_belly_split_acc_l": genlayer_clothing_belly_split_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_left_src;
			},
			dxfn(options) {
				if (options.shirt_move_left_src) return options.belly >= 22 ? 12 : 10;
				return 0;
			},
			dyfn(options) {
				return options.shirt_move_left_src ? -4 : 0;
			},
		}),
		"upper_belly_split_acc_l2": genlayer_clothing_belly_split_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_left2_src;
			},
			dxfn(options) {
				if (options.shirt_move_left2_src) return options.belly >= 22 ? 14 : 12;
				return 0;
			},
			dyfn(options) {
				return options.shirt_move_left2_src ? -2 : 0;
			},
		}),
		"upper_belly_split_acc_r": genlayer_clothing_belly_split_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_right_src;
			},
		}),
		"upper_belly_split_acc_r2": genlayer_clothing_belly_split_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_right2_src;
			},
			dxfn(options) {
				if (options.shirt_move_right2_src) return -4;
			},
		}),
		"upper_belly_split_acc_r3": genlayer_clothing_belly_split_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_move_right3_src;
			},
			dxfn(options) {
				if (options.shirt_move_right3_src) return -6;
			},
		}),
		"upper_fitted_left_acc": genlayer_clothing_fitted_left_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		"upper_fitted_right_acc": genlayer_clothing_fitted_right_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
			masksrcfn(options) {
				return options.shirt_fitted_right_move_src;
			},
			dxfn() {
				return 2;
			},
		}),
		"upper_breasts": genlayer_clothing_breasts("upper", {
			zfn(options) {
				return options.acc_layer_under ? ZIndices.upper + 1 : options.zupper;
			},
		}),
		"upper_acc": genlayer_clothing_accessory("upper", {
			zfn(options) {
				return options.arm_right === "hold" && options.sleeve_over_hold ? ZIndices.lower_high : options.zupper;
			},
			masksrcfn(options) {
				return options.belly >= 19 && options.worn_upper_setup.pregType == "split" ?
					options.shirt_mask_clip_src : options.shirt_fitted_clip_src;
			},
		}),
		"upper_breasts_acc": genlayer_clothing_breasts_acc("upper", {
			zfn(options) {
				return options.zupper;
			},
		}),
		"upper_rightarm": genlayer_clothing_arm("right", "upper", {
			zfn(options) {
				return options.zupperright;
			},
		}),
		"upper_leftarm": genlayer_clothing_arm("left", "upper", {
			zfn(options) {
				return options.zupperleft;
			},
			masksrcfn(options) {
				return options.belly_hides_lower ? options.belly_mask_clip_src : null;
			},
		}),
		"upper_leftarm_fitted": genlayer_clothing_arm_fitted("left", "upper", {
			zfn(options) {
				return options.zupperleft - 1;
			},
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		"upper_leftarm_fitted_acc": genlayer_clothing_arm_acc_fitted("left", "upper", {
			zfn(options) {
				return options.zupperleft - 1;
			},
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		"upper_rightarm_acc": genlayer_clothing_arm_acc("right", "upper", {
			zfn(options) {
				return options.zupperright;
			},
		}),
		"upper_leftarm_acc": genlayer_clothing_arm_acc("left", "upper", {
			zfn(options) {
				return options.zupperleft;
			},
		}),
		"upper_back": genlayer_clothing_back_img('upper', {
			z: ZIndices.back_lower
		}),

		/***
		 *     ██████  ██    ██ ███████ ██████  ██    ██ ██████  ██████  ███████ ██████
		 *    ██    ██ ██    ██ ██      ██   ██ ██    ██ ██   ██ ██   ██ ██      ██   ██
		 *    ██    ██ ██    ██ █████   ██████  ██    ██ ██████  ██████  █████   ██████
		 *    ██    ██  ██  ██  ██      ██   ██ ██    ██ ██      ██      ██      ██   ██
		 *     ██████    ████   ███████ ██   ██  ██████  ██      ██      ███████ ██   ██
		 *
		 *
		 */
		"over_upper_main": genlayer_clothing_main('over_upper'),
		"over_upper_breasts": genlayer_clothing_breasts("over_upper"),
		"over_upper_acc": genlayer_clothing_accessory('over_upper'),
		"over_upper_rightarm": genlayer_clothing_arm("right", "over_upper", {
			zfn(options) {
				return (options.arm_right === "cover" || options.arm_right === "hold") ?
					ZIndices.over_upper_arms_cover : ZIndices.over_upper_arms;
			},
		}),
		"over_upper_leftarm": genlayer_clothing_arm("left", "over_upper", {
			zfn(options) {
				return options.arm_left === "cover" ?
					ZIndices.over_upper_arms_cover : ZIndices.over_upper_arms;
			},
		}),
		/***
		 *     ██████  ███████ ███    ██ ██ ████████  █████  ██      ███████
		 *    ██       ██      ████   ██ ██    ██    ██   ██ ██      ██
		 *    ██   ███ █████   ██ ██  ██ ██    ██    ███████ ██      ███████
		 *    ██    ██ ██      ██  ██ ██ ██    ██    ██   ██ ██           ██
		 *     ██████  ███████ ██   ████ ██    ██    ██   ██ ███████ ███████
		 *
		 *
		 */

		"genitals": genlayer_clothing_main('genitals', {
			zfn(options) {
				return options.crotch_exposed ? ZIndices.penis_chastity + 0.1 : ZIndices.penisunderclothes + 0.1;
			},
			showfn(options) {
				return options.worn_genitals > 0
					&& options.worn_genitals_setup.mainImage !== 0
					&& !options.worn_genitals_setup.hideUnderLower.includes(options.worn_under_lower_setup.name)
					&& !options.belly_hides_under_lower;
			},
			srcfn(options) {
				let size = "";
				if (options.worn_genitals_setup.penisSize) {
					switch(options.penis_size) {
						case -2: case -1:
							size = -1;
							break;
						case 0:
							size = 0;
							break;
						case 1: case 2:
							size = 1;
							break;
						case 3: case 4:
							size = 2;
							break;
					}
				}

				const setupVar = options.worn_genitals_setup.variable;
				const integrity = options.worn_genitals_integrity;
				return `img/clothes/genitals/${setupVar}/${integrity}${size}.png`;
			},
		}),
		/***
		 *    ██       ██████  ██     ██ ███████ ██████
		 *    ██      ██    ██ ██     ██ ██      ██   ██
		 *    ██      ██    ██ ██  █  ██ █████   ██████
		 *    ██      ██    ██ ██ ███ ██ ██      ██   ██
		 *    ███████  ██████   ███ ███  ███████ ██   ██
		 *
		 *
		 */
		"lower": genlayer_clothing_main('lower', {
			zfn(options) {
				const secondary = options.worn_lower_setup.type.includes("covered") ? ZIndices.lower_cover : ZIndices.lower;
				return options.worn_lower_setup.high_img ? ZIndices.lower_high : secondary;
			},
			masksrcfn(options) {
				return options.lowerMask;
			},
		}),
		"lower_belly_2": genlayer_clothing_belly_2("lower", {
			masksrcfn(options) {
				return options.lowerBellyMask;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ? ZIndices.lower_high : ZIndices.lower_belly;
			},
		}),
		"lower_belly": genlayer_clothing_belly("lower", {
			masksrcfn(options) {
				return options.lowerBellyMask;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ? ZIndices.lower_high : ZIndices.lower_belly;
			},
		}),
		"lower_belly_shadow": genlayer_clothing_belly_shadow("lower", {
			masksrcfn(options) {
				return options.lowerShadowMask;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ? ZIndices.lower_high : ZIndices.lower_belly;
			},
		}),
		"lower_belly_acc": genlayer_clothing_belly_acc("lower", {
			masksrcfn(options) {
				return options.lowerBellyMask;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ? ZIndices.lower_high : ZIndices.lower_belly;
			},
		}),
		"lower_acc": genlayer_clothing_accessory("lower", {
			srcfn(options) {
				const secondary = options.worn_upper_setup.name === "school blouse" && options.worn_lower_setup.name.includes("pinafore") ? '_under' : '';
				const suffix = options.worn_lower_setup.accessory_integrity_img ? `_${options.worn_lower_integrity}` : secondary;

				return gray_suffix(`img/clothes/lower/${options.worn_lower_setup.variable}/acc${suffix}.png`, options.filters['worn_lower_acc'])
			},
			zfn(options) {
				if (options.worn_lower_setup.name.includes("ballgown") || options.worn_lower_setup.name.includes("pinafore"))
					return ZIndices.upper_top;
				if (options.worn_lower_setup.type.includes("covered")) return ZIndices.lower_cover;

				return ZIndices.lower;
			},
			masksrcfn(options) {
				return options.lowerMask;
			},
		}),
		"lower_penis": {
			z: ZIndices.lower_top,
			filters: ["worn_lower"],
			animation: "idle",

			//ToDo: add images for lower penis bulges. check against pregnancy belly
			srcfn(options) {
				return gray_suffix(
					`img/clothes/lower/${options.worn_lower_setup.variable}/penis.png`,
					options.filters['worn_lower']
				);
			},
			showfn(options) {
				return options.show_clothes
					&& !options.belly_hides_lower
					&& options.worn_lower > 0
					&& options.worn_lower_setup.penis_img === 1
					&& calculatePenisBulge() - 6 > 0;
			},
		},
		"lower_penis_acc": {
			z: ZIndices.lower_top,
			filters: ["worn_lower_acc"],
			animation: "idle",

			//ToDo: add images for lower penis bulges. check against pregnancy belly
			srcfn(options) {
				return gray_suffix(
					`img/clothes/lower/${options.worn_lower_setup.variable}/acc_penis.png`,
					options.filters['worn_lower_acc']
				);
			},
			showfn(options) {
				return options.show_clothes
					&& !options.belly_hides_lower
					&& options.worn_lower > 0
					&& options.worn_lower_setup.penis_acc_img === 1
					&& options.worn_lower_setup.accessory === 1
					&& calculatePenisBulge() - 6 > 0;
			},
		},
		"lower_back": genlayer_clothing_back_img('lower', {
			z: ZIndices.back_lower
		}),
		/***
		 *     ██████  ██    ██ ███████ ██████  ██       ██████  ██     ██ ███████ ██████
		 *    ██    ██ ██    ██ ██      ██   ██ ██      ██    ██ ██     ██ ██      ██   ██
		 *    ██    ██ ██    ██ █████   ██████  ██      ██    ██ ██  █  ██ █████   ██████
		 *    ██    ██  ██  ██  ██      ██   ██ ██      ██    ██ ██ ███ ██ ██      ██   ██
		 *     ██████    ████   ███████ ██   ██ ███████  ██████   ███ ███  ███████ ██   ██
		 *
		 *
		 */
		"over_lower": genlayer_clothing_main('over_lower'),
		"over_lower_acc": genlayer_clothing_accessory('over_lower'),
		"over_lower_back": genlayer_clothing_back_img('over_lower'),
		/***
		 *    ██    ██ ███    ██ ██████  ███████ ██████  ██       ██████  ██     ██ ███████ ██████
		 *    ██    ██ ████   ██ ██   ██ ██      ██   ██ ██      ██    ██ ██     ██ ██      ██   ██
		 *    ██    ██ ██ ██  ██ ██   ██ █████   ██████  ██      ██    ██ ██  █  ██ █████   ██████
		 *    ██    ██ ██  ██ ██ ██   ██ ██      ██   ██ ██      ██    ██ ██ ███ ██ ██      ██   ██
		 *     ██████  ██   ████ ██████  ███████ ██   ██ ███████  ██████   ███ ███  ███████ ██   ██
		 *
		 *
		 */
		"under_lower": genlayer_clothing_main('under_lower', {
			zfn(options) {
				return options.worn_lower_setup.high_img ?
					ZIndices.under_lower_high : ZIndices.under_lower;
			},
			masksrcfn(options) {
				return options.belly_mask_under_clip_src;
			},
		}),
		"under_lower_belly_2": genlayer_clothing_belly_2("under_lower", {
			masksrcfn(options) {
				return options.belly_mask_src;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ?
					ZIndices.under_lower_high : ZIndices.under_lower;
			},
			showfn(options) {
				return options.belly > 7
					&& options.show_clothes
					&& !options.belly_hides_under_lower
					&& options.worn_under_lower > 0
					&& options.worn_under_lower_setup.mainImage !== 0;
			},
		}),
		"under_lower_belly": genlayer_clothing_belly("under_lower", {
			masksrcfn(options) {
				return options.belly_mask_src;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ?
					ZIndices.under_lower_high : ZIndices.under_lower;
			},
			showfn(options) {
				return options.belly > 7
					&& options.show_clothes
					&& !options.belly_hides_under_lower
					&& options.worn_under_lower > 0
					&& options.worn_under_lower_setup.mainImage !== 0;
			},
		}),
		"under_lower_belly_shadow": genlayer_clothing_belly_shadow("under_lower", {
			masksrcfn(options) {
				return options.belly_mask_lower_shadow_src;
			},
			zfn() {
				return ZIndices.under_lower_top_high;
			},
			showfn(options) {
				return options.belly > 7
					&& options.show_clothes
					&& !options.belly_hides_under_lower
					&& options.worn_under_lower > 0
					&& options.worn_under_lower_setup.mainImage !== 0;
			},
		}),
		"under_lower_belly_acc": genlayer_clothing_belly_acc("under_lower", {
			masksrcfn(options) {
				return options.belly_mask_src;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ?
					ZIndices.under_lower_high : ZIndices.under_lower;
			},
			showfn(options) {
				return options.belly > 7
					&& options.show_clothes
					&& !options.belly_hides_under_lower
					&& options.worn_under_lower > 0
					&& options.worn_under_lower_setup.accessory === 1;
			},
		}),
		"under_lower_acc": genlayer_clothing_accessory('under_lower'),
		"under_lower_penis": {
			z: ZIndices.under_lower_top,
			filters: ["worn_under_lower"],
			animation: "idle",

			//ToDo: expand the existing bulk images by providing a small bulge when `calculatePenisBulge()` is less than 8 (max is 15). check against pregnancy belly
			srcfn(options) {
				return gray_suffix(
					`img/clothes/under_lower/${options.worn_under_lower_setup.variable}/penis.png`,
					options.filters['worn_under_lower']
				);
			},
			showfn(options) {
				return options.show_clothes
					&& !options.belly_hides_under_lower
					&& options.worn_under_lower > 0
					&& options.worn_under_lower_setup.penis_img === 1
					&& calculatePenisBulge() > 0;
			},
		},
		"under_lower_penis_acc": {
			z: ZIndices.under_lower_top,
			filters: ["worn_under_lower_acc"],
			animation: "idle",

			//ToDo: expand the existing bulk images by providing a small bulge when `calculatePenisBulge()` is less than 8 (max is 15). check against pregnancy belly
			srcfn(options) {
				return gray_suffix(
					`img/clothes/under_lower/${options.worn_under_lower_setup.variable}/acc_penis.png`,
					options.filters['worn_under_lower_acc']
				);
			},
			showfn(options) {
				return options.show_clothes
					&& !options.belly_hides_under_lower
					&& options.worn_under_lower > 0
					&& options.worn_under_lower_setup.penis_acc_img === 1
					&& options.worn_under_lower_setup.accessory === 1
					&& calculatePenisBulge() > 0;
			},
		},
		/***
		 *    ██    ██ ███    ██ ██████  ███████ ██████  ██    ██ ██████  ██████  ███████ ██████
		 *    ██    ██ ████   ██ ██   ██ ██      ██   ██ ██    ██ ██   ██ ██   ██ ██      ██   ██
		 *    ██    ██ ██ ██  ██ ██   ██ █████   ██████  ██    ██ ██████  ██████  █████   ██████
		 *    ██    ██ ██  ██ ██ ██   ██ ██      ██   ██ ██    ██ ██      ██      ██      ██   ██
		 *     ██████  ██   ████ ██████  ███████ ██   ██  ██████  ██      ██      ███████ ██   ██
		 *
		 *
		 */
		"under_upper": genlayer_clothing_main('under_upper', {
			masksrcfn(options) {
				if (options.belly >= 19 && options.worn_upper_setup.pregType == "split")
					return options.worn_under_upper_setup.pregType === "split"
						&& options.shirt_mask_clip_src;

				return options.worn_under_upper_setup.formfitting
					&& options.shirt_fitted_clip_src;
			}
		}),
		"under_upper_fitted_left": genlayer_clothing_fitted_left("under_upper", {
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		"under_upper_fitted_right": genlayer_clothing_fitted_right("under_upper", {
			masksrcfn(options) {
				return options.shirt_fitted_right_move_src;
			},
			dxfn() {
				return 2;
			},
		}),
		"under_upper_belly_2": genlayer_clothing_belly_2("under_upper", {
			masksrcfn(options) {
				return options.belly_mask_src;
			},
			zfn() {
				return ZIndices.under_upper_top;
			},
		}),
		"under_upper_belly": genlayer_clothing_belly("under_upper", {
			masksrcfn(options) {
				return options.belly_mask_src;
			},
			zfn() {
				return ZIndices.under_upper_top;
			},
		}),
		/*** Did not work ***/
		// "under_upper_belly_shadow": genlayer_clothing_belly_highlight("under_upper", {
		// 	masksrcfn(options) {
		// 		return options.belly_mask_upper_shadow_src;
		// 	},
		// 	zfn() {
		// 		return ZIndices.under_upper_top_high;
		// 	},
		// }),
		"under_upper_belly_acc": genlayer_clothing_belly_acc("under_upper", {
			masksrcfn(options) {
				return options.belly_mask_src;
			},
			zfn(options) {
				return options.worn_lower_setup.high_img ?
					ZIndices.under_upper_top_acc : ZIndices.under_upper_top_acc;
			},
		}),
		"under_upper_breasts": genlayer_clothing_breasts("under_upper"),
		"under_upper_acc": genlayer_clothing_accessory('under_upper'),
		"under_upper_breasts_acc": genlayer_clothing_breasts_acc('under_upper'),
		"under_upper_back": genlayer_clothing_back_img('under_upper'),
		"under_upper_rightarm": genlayer_clothing_arm("right", "under_upper", {
			zfn(options) {
				return options.arm_right === "cover" || options.arm_right === "hold" ?
					ZIndices.under_upper_arms_cover : ZIndices.under_upper_arms;
			},
		}),
		"under_upper_leftarm": genlayer_clothing_arm("left", "under_upper", {
			zfn(options) {
				return options.arm_left === "cover" ? ZIndices.under_upper_arms_cover : ZIndices.under_upper_arms;
			},
		}),
		"under_upper_leftarm_fitted": genlayer_clothing_arm_fitted("left", "under_upper", {
			zfn() {
				return ZIndices.under_upper_arms - 0.1;
			},
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		"under_upper_leftarm_fitted_acc": genlayer_clothing_arm_acc_fitted("left", "under_upper", {
			zfn() {
				return ZIndices.under_upper_arms - 0.1;
			},
			masksrcfn(options) {
				return options.shirt_fitted_left_move_src;
			},
			dxfn() {
				return -2;
			},
		}),
		/***
		 *    ██   ██  █████  ███    ██ ██████  ███████
		 *    ██   ██ ██   ██ ████   ██ ██   ██ ██
		 *    ███████ ███████ ██ ██  ██ ██   ██ ███████
		 *    ██   ██ ██   ██ ██  ██ ██ ██   ██      ██
		 *    ██   ██ ██   ██ ██   ████ ██████  ███████
		 *
		 *
		 */
		"hands": genlayer_clothing_main('hands'),
		"hands_left": {
			filters: ["worn_hands"],
			animation: "idle",

			srcfn(options) {
				const suffix = options.arm_left === "cover" ? "left_cover" : "left";
				const path = `img/clothes/hands/${options.worn_hands_setup.variable}/${suffix}.png`;
				return gray_suffix(path, options.filters['worn_hands']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_hands > 0
					&& options.worn_hands_setup.leftImage === 1
					&& options.arm_left !== "none";
			},
			zfn(options) {
				return options.arm_left === "cover" ? ZIndices.hands : options.zarms + 0.2;
			},
		},
		"hands_left_acc": {
			filters: ["worn_hands_acc"],
			animation: "idle",

			srcfn(options) {
				const suffix = options.arm_left === "cover" ? "left_cover" : "left";
				const path = `img/clothes/hands/${options.worn_hands_setup.variable}/${suffix}_acc.png`;
				return gray_suffix(path, options.filters['worn_hands_acc']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_hands > 0
					&& options.worn_hands_setup.leftImage === 1
					&& options.worn_hands_setup.accessory === 1
					&& options.arm_left !== "none";
			},
			zfn(options) {
				return options.arm_left === "cover" ? ZIndices.hands : options.zarms + 0.2;
			},
		},
		"hands_right": {
			filters: ["worn_hands"],
			animation: "idle",

			srcfn(options) {
				const hold = options.handheld_position ? "hold" : "right";
				const suffix = options.arm_right === "cover" ? "right_cover" : hold;
				const path = `img/clothes/hands/${options.worn_hands_setup.variable}/${suffix}.png`;
				return gray_suffix(path, options.filters['worn_hands']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_hands > 0
					&& options.worn_hands_setup.rightImage === 1
					&& options.arm_right !== "none";
			},
			zfn(options) {
				return (options.arm_right === "cover" || options.arm_right === "hold") ?
					ZIndices.hands : options.zarms + 0.2;
			},
		},
		"hands_right_acc": {
			filters: ["worn_hands_acc"],
			animation: "idle",

			srcfn(options) {
				const hold = options.handheld_position ? "hold" : "right";
				const suffix = options.arm_right === "cover" ? "right_cover" : hold;
				const path = `img/clothes/hands/${options.worn_hands_setup.variable}/${suffix}_acc.png`;
				return gray_suffix(path, options.filters['worn_hands_acc']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_hands > 0
					&& options.worn_hands_setup.rightImage === 1
					&& options.worn_hands_setup.accessory === 1
					&& options.arm_right !== "none";
			},
			zfn(options) {
				return (options.arm_right === "cover" || options.arm_right === "hold") ?
					ZIndices.hands : options.zarms + 0.2;
			},
		},
		/***
		 *    ██   ██  █████  ███    ██ ██████  ██   ██ ██████ ██     ██████
		 *    ██   ██ ██   ██ ████   ██ ██   ██ ██   ██ ██     ██     ██   ██
		 *    ███████ ███████ ██ ██  ██ ██   ██ ███████ ██████ ██     ██   ██
		 *    ██   ██ ██   ██ ██  ██ ██ ██   ██ ██   ██ ██     ██     ██   ██
		 *    ██   ██ ██   ██ ██   ████ ██████  ██   ██ ██████ ██████ ██████
		 *
		 *
		 */
		"handheld": genlayer_clothing_main('handheld', {
			srcfn(options) {
				const torchLevels = [100, 80, 60, 40, 20, 1, 0];
				const num = torchLevels.findIndex(x => V.catacombs_torch >= x) + 1;

				const cover = options.arm_right === "cover" ? "right_cover" : "right";
				const torch = options.worn_handheld_setup.name === "torch" && V.catacombs_torch >= 0 ? num : '';
				const path = `img/clothes/handheld/${options.worn_handheld_setup.variable}/${cover}${torch}.png`;
				return gray_suffix(path, options.filters['worn_handheld']);
			},
			showfn(options) {
				const commonChecks = options.show_clothes && options.worn_handheld > 0 && !options.hideAll;

				if (options.arm_right === "cover") return commonChecks && options.worn_handheld_setup.coverImage !== 0;
				return commonChecks && options.arm_right !== "none";
			},
			zfn(options) {
				const check = options.handheld_overhead || options.worn_handheld_setup.type.includes("prop");
				return check ? ZIndices.old_over_upper : ZIndices.handheld
			},
		}),
		"handheld_acc": genlayer_clothing_accessory('handheld', {
			srcfn(options) {
				const cover = options.arm_right === "cover" ? "right_cover" : "right";
				const path = `img/clothes/handheld/${options.worn_handheld_setup.variable}/${cover}_acc.png`;
				return gray_suffix(path, options.filters['worn_handheld_acc']);
			},
			showfn(options) {
				const commonChecks = options.show_clothes
					&& options.worn_handheld > 0
					&& options.worn_handheld_setup.accessory === 1
					&& !options.hideAll;

				if (options.arm_right === "cover") return commonChecks && options.worn_handheld_setup.coverImage !== 0;
				return commonChecks && options.arm_right !== "none";
			},
			zfn(options) {
				return options.handheld_overhead || options.worn_handheld_setup.type.includes("prop") ?
					ZIndices.old_over_upper : ZIndices.handheld;
			},
		}),
		"handheld_left": {
			srcfn(options) {
				const cover = options.arm_left === "cover" ? "left_cover" : "left";
				const path = `img/clothes/handheld/${options.worn_handheld_setup.variable}/${cover}.png`;
				return gray_suffix(path, options.filters['worn_handheld']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_handheld > 0
					&& options.worn_handheld_setup.leftImage === 1
					&& options.arm_left !== "none"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.arm_left === "cover" ? ZIndices.hands : (options.zarms + 0.2);
			},
			filtersfn() {
				return ["worn_handheld"];
			},
		},
		"handheld_left_acc": {
			srcfn(options) {
				const cover = options.arm_left === "cover" ? "left_cover" : "left";
				const path = `img/clothes/handheld/${options.worn_handheld_setup.variable}/${cover}_acc.png`;
				return gray_suffix(path, options.filters['worn_handheld_acc']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_handheld > 0
					&& options.worn_handheld_setup.leftImage === 1
					&& options.worn_handheld_setup.accessory === 1
					&& options.arm_left !== "none"
					&& !options.hideAll;
			},
			zfn(options) {
				return options.arm_left === "cover" ? ZIndices.hands : (options.zarms + 0.2);
			},
			filtersfn() {
				return ["worn_handheld_acc"];
			},
		},
		"handheld_back": genlayer_clothing_back_img('handheld',{
			z: ZIndices.over_head_back
		}),
		"handheld_back_acc": genlayer_clothing_back_img_acc('handheld', {
			z: ZIndices.over_head_back
		}),
		/***
		 *    ██   ██ ███████  █████  ██████
		 *    ██   ██ ██      ██   ██ ██   ██
		 *    ███████ █████   ███████ ██   ██
		 *    ██   ██ ██      ██   ██ ██   ██
		 *    ██   ██ ███████ ██   ██ ██████
		 *
		 *
		 */
		"head": genlayer_clothing_main('head', {
			srcfn(options) {
				const dmg = options.hood_damage ? options.worn_upper_integrity : options.worn_head_integrity;
				const path = `img/clothes/head/${options.worn_head_setup.variable}/${dmg}.png`;
				return gray_suffix(path, options.filters['worn_head']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_head > 0
					&& options.worn_head_setup.mainImage !== 0
					&& !options.hideAll;
			},
		}),
		"head_acc": genlayer_clothing_accessory('head', {
			srcfn(options) {
				const dmg = options.hood_damage ? `_${options.worn_upper_integrity}` : '';
				const path = `img/clothes/head/${options.worn_head_setup.variable}/acc${dmg}.png`;
				return gray_suffix(path, options.filters['worn_head_acc']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_head > 0
					&& options.worn_head_setup.accImage !== 0
					&& options.worn_head_setup.accessory === 1
					&& !options.hideAll;
			},
		}),
		"head_back_acc": genlayer_clothing_back_img_acc('head'),
		"head_back": genlayer_clothing_back_img('head'),
		/***
		 *     ██████  ██    ██ ███████ ██████          ██   ██ ███████  █████  ██████
		 *    ██    ██ ██    ██ ██      ██   ██         ██   ██ ██      ██   ██ ██   ██
		 *    ██    ██ ██    ██ █████   ██████          ███████ █████   ███████ ██   ██
		 *    ██    ██  ██  ██  ██      ██   ██         ██   ██ ██      ██   ██ ██   ██
		 *     ██████    ████   ███████ ██   ██ ███████ ██   ██ ███████ ██   ██ ██████
		 *
		 *
		 */
		"over_head": genlayer_clothing_main('over_head'),
		"over_head_acc": genlayer_clothing_accessory('over_head'),
		"over_head_back_acc": genlayer_clothing_back_img_acc('over_head'),
		"over_head_back": genlayer_clothing_back_img('over_head'),
		/***
		 *    ███████  █████   ██████ ███████
		 *    ██      ██   ██ ██      ██
		 *    █████   ███████ ██      █████
		 *    ██      ██   ██ ██      ██
		 *    ██      ██   ██  ██████ ███████
		 *
		 *
		 */

		"face": genlayer_clothing_main('face', {
			zfn(options) {
				const isAltPosition = !options.alt_override
					&& options.worn_face_setup.altposition !== undefined
					&& V.worn.face.altposition === "alt";
				const check = isAltPosition
					&& (options.worn_face_setup.type.includes("cool")
					|| options.worn_face_setup.type.includes("glasses"));

				if (check) return ZIndices.over_head;
				return options.facewear_layer === "front" ? ZIndices.face - 12.5 : ZIndices.face;
			},
		}),
		"face_acc": genlayer_clothing_accessory('face', {
			zfn(options) {
				const isAltPosition = !options.alt_override
					&& options.worn_face_setup.altposition !== undefined
						&& V.worn.face.altposition === "alt";
				const check = isAltPosition
					&& (options.worn_face_setup.type.includes("cool")
					|| options.worn_face_setup.type.includes("glasses"));

				if (check) return ZIndices.over_head;
				return options.facewear_layer === "front" ? ZIndices.face - 12.5 : ZIndices.face;
			},
		}),
		"face_back_acc": genlayer_clothing_back_img_acc('face'),
		"face_back": genlayer_clothing_back_img('face'),

		/***
		 *    ███    ██ ███████  ██████ ██   ██
		 *    ████   ██ ██      ██      ██  ██
		 *    ██ ██  ██ █████   ██      █████
		 *    ██  ██ ██ ██      ██      ██  ██
		 *    ██   ████ ███████  ██████ ██   ██
		 *
		 *
		 */
		"neck": genlayer_clothing_main('neck', {
			srcfn(options) {
				const isAltPosition = !options.alt_override
					&& options.worn_neck_setup.altposition !== undefined
					&& V.worn.neck.altposition === "alt";
				const collar = options.nocollar ? '_nocollar' : options.serafuku ? '_serafuku' : '';
				const alt = isAltPosition ? '_alt' : '';

				const setupVar = options.worn_neck_setup.variable;
				const integrity = options.worn_neck_integrity;
				const path = `img/clothes/neck/${setupVar}/${integrity}${collar}${alt}.png`;
				return gray_suffix(path, options.filters['worn_neck']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_neck > 0
					&& options.worn_neck_setup.mainImage !== 0
					&& !options.hideAll;
			},
			masksrcfn(options) {
				return options.high_waist_suspenders ? "img/clothes/neck/suspenders/mask.png" : null;
			},
			zfn(options) {
				return options.hood_mask ? ZIndices.collar : ZIndices.neck;
			},
		}),
		"neck_acc": genlayer_clothing_accessory('neck', {
			srcfn(options) {
				const isAltPosition = !options.alt_override
					&& options.worn_neck_setup.altposition !== undefined
					&& V.worn.neck.altposition === "alt";
				const integrity = setup.accessory_integrity_img ? `_${options.worn_neck_integrity}` : '';
				const alt = isAltPosition ? '_alt' : '';

				const setupVar = options.worn_neck_setup.variable;
				const path = `img/clothes/neck/${setupVar}/acc${integrity}${alt}.png`;
				return gray_suffix(path, options.filters['worn_neck_acc']);
			},
			showfn(options) {
				return options.show_clothes
					&& options.worn_neck > 0
					&& options.worn_neck_setup.accImage !== 0
					&& options.worn_neck_setup.accessory === 1;
			},
			zfn(options) {
				const check = options.worn_head_setup.mask_img === 1
					&&!(options.hood_down
						&& options.worn_head_setup.hood
						&& options.worn_head_setup.outfitSecondary !== undefined);
				return check ? ZIndices.collar : ZIndices.neck;
			},
			dyfn(options) {
				return options.high_waist_suspenders ? -8 : 0;
			},
		}),
		/***
		 *    ██      ███████  ██████  ███████
		 *    ██      ██      ██       ██
		 *    ██      █████   ██   ███ ███████
		 *    ██      ██      ██    ██      ██
		 *    ███████ ███████  ██████  ███████
		 *
		 *
		 */
		"legs": genlayer_clothing_main('legs', {
			zfn(options) {
				const check = options.worn_under_lower_setup.set === options.worn_under_upper_setup.set
					|| options.worn_under_lower_setup.high_img === 1;

				if (check) return ZIndices.legs;
				return ZIndices.legs_high;
			},
			masksrcfn(options) {
				return options.lowerMask;
			},
		}),
		"legs_acc": genlayer_clothing_accessory('legs', {
			zfn(options) {
				const check = options.worn_under_lower_setup.set === options.worn_under_upper_setup.set
					|| options.worn_under_lower_setup.high_img === 1;

				if (check) return ZIndices.legs;
				return ZIndices.legs_high;
			},
			masksrcfn(options) {
				return options.lowerMask;
			},
		}),
		"legs_back_acc": genlayer_clothing_back_img_acc('legs'),
		"legs_back": genlayer_clothing_back_img('legs'),
		/***
		 *    ███████ ███████ ███████ ████████
		 *    ██      ██      ██         ██
		 *    █████   █████   █████      ██
		 *    ██      ██      ██         ██
		 *    ██      ███████ ███████    ██
		 *
		 *
		 */
		"feet": genlayer_clothing_main('feet', {
			zfn(options) {
				const check = options.lower_tucked
					&& !options.worn_lower_setup.notuck
					&& !options.worn_feet_setup.notuck;

				if (check) return ZIndices.lower_tucked_feet;
				return ZIndices.feet;
			},
		}),
		"feet_acc": genlayer_clothing_accessory('feet', {
			zfn(options) {
				return options.lower_tucked ? ZIndices.lower_tucked_feet : ZIndices.feet;
			},
		}),
		"feet_back_acc": genlayer_clothing_back_img_acc('feet'),
		"feet_back": genlayer_clothing_back_img('feet'),

		// new layer template
		/*
		"": {
			srcfn(options) {
				return ""
			},
			z: ZIndices.,
			animation: "idle"
		},
		*/
	}
}

// Utility functions
function isPartEnabled(type) {
	/* TODO: Enable this check, and fix cases that have fallen prey to this design flaw of returning true for undefined.
		It is better to catch potential errors and ensure a standard is kept. */
	/* Check for undefined in case the object given was a typo. 06/10/22 Sneaky incident :trolldispair: */
	if (typeof type !== "string") {
		if (V.debug || V.options.debugdisable === "f") {
			Errors.report("isPartEnabled was given an unexpected value.", type);
		}
		// return false;
	};
	return type !== "disabled" && type !== "hidden";
}
window.isPartEnabled = isPartEnabled;

function isChimeraEnabled(type, part) {
	if (typeof V.chimera !== 'object') {
		/* No need to post errors for $chimera, only user inputs (type&part) */
		return false;
	}
	if (typeof V.chimera[type] !== 'object') {
		console.debug(`$chimera.${type} not found.`);
		return false;
	}
	if (V.chimera[type][part] == null) {
		console.debug(`$chimera.${type}.${part} not found.`);
		return false;
	}
	return !!V.chimera[type][part];
}
window.isChimeraEnabled = isChimeraEnabled;

// If the filter has hard-light blending, add _gray to path
function gray_suffix(path, filter) {
	if (!filter || filter.blendMode !== "hard-light" || !filter.blend) return path;
	return path.replace('.png', '_gray.png');
}

function getWritingImgPath(area_name, writing) {
	if (writing.type === "text") {
		if (writing.sprites && writing.sprites.length > 0 && writing.sprites.includes(area_name)) {
			return `img/bodywriting/text/${writing.key}/${area_name}.png`;
		}
		return `img/bodywriting/text/default/${area_name}.png`;
	}
	if (writing.type === "object") return `img/bodywriting/${writing.writing}/${area_name}.png`;
	return '';
}

function getWritingImgPathArrow(area_name, writing) {
	if (writing.type === "text") {
		if (writing.sprites && writing.sprites.length > 0 && writing.sprites.includes(area_name)) {
			return `img/bodywriting/text/${writing.key}/${area_name}.png`;
		}
		return `img/bodywriting/text/default/${area_name}${writing.arrow ? "_arrow" : ""}.png`;
	}
	if (writing.type === "object") return `img/bodywriting/${writing.writing}/${area_name}.png`;
	return '';
}

function drawRadialGradient(ctx, centerX, centerY, xOffset, yOffset, radiusX, radiusY, maxAlpha, intensity) {
	const alpha = intensity * maxAlpha;
	ctx.save();
	ctx.scale(radiusX / radiusY, 1);

	const gradient = ctx.createRadialGradient(
		(centerX + xOffset) * (radiusY / radiusX),
		(centerY + yOffset),
		0,
		(centerX + xOffset) * (radiusY / radiusX),
		(centerY + yOffset),
		radiusY
	);

	gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
	gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.33})`);
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
	ctx.fillStyle = gradient;
	ctx.filter = "blur(1px)";
	ctx.imageSmoothingEnabled = true;
	ctx.fillRect(0, 0, ctx.canvas.width * (radiusY / radiusX), ctx.canvas.height);
	ctx.restore();
}

function drawLinearGradient(ctx, maxAlpha, intensity, height) {
	const alpha = intensity * maxAlpha;
	const gradient = ctx.createLinearGradient(0, 0, 0, height);
	gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, ctx.canvas.width, height);
}

function drawColorOverlay(ctx, color, maxAlpha, intensity) {
	const alpha = Math.round((intensity * maxAlpha) * 255).toString(16).padStart(2, "0")
	const rgbaColor = tinycolor(color + alpha).toRgbString();
	ctx.fillStyle = rgbaColor;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function lightBlendColor(options) {
	if(!V.angel && !V.demon) return false;
	const baseColor = V.angel ? options.lights.colors.angel : options.lights.colors.demon;
	const factor = Math.abs((V.angel / 6 - V.demon / 6) * V.options.lightTFColor);
	return ColourUtils.interpolateColor("#ffffff", baseColor, factor);
}

// Layer generating functions.
function getClothingPathBreastsAcc(slot, options) {
	const worn = `worn_${slot}`;

	const breastImg = options[`${worn}_setup`].breast_img;
	const breastAccImg = options[`${worn}_setup`].breast_acc_img;
	const breastSize = typeof breastAccImg === 'object' ? breastAccImg[options.breast_size] : typeof breastImg === 'object' ? breastImg[options.breast_size] : Math.min(options.breast_size, 6);
	const path = `img/clothes/${slot}/${options[`${worn}_setup`].variable}/${breastSize}_acc.png`;
	return gray_suffix(path, options.filters[`${worn}_acc`]);
}

function filterFnArm(slot, options) {
	switch (options[`worn_${slot}_setup`].sleeve_colour) {
		case undefined:
		case "":
		case "primary":
			return [`worn_${slot}`];
		case "secondary":
			return [`worn_${slot}_acc`];
		case "no":
		default:
			return [];
	}
}

function filterFnArmAcc(slot, options) {
	switch (options[`worn_${slot}_setup`].accessory_colour_sidebar) {
		case undefined:
		case "":
		case "primary":
			return [`worn_${slot}`];
		case "secondary":
			return [`worn_${slot}_acc`];
		case "no":
		default:
			return [];
	}
}

function genlayer_clothing_basic(slot, overrideOptions) {
	return Object.assign({
		animation: "idle",

		alphafn(options) {
			return options[`worn_${slot}_alpha`];
		},
	}, overrideOptions);
}

function genlayer_clothing_main(slot, overrideOptions) {
	return genlayer_clothing_basic(slot, Object.assign({
		z: ZIndices[slot],
		filters: [`worn_${slot}`],

		showfn(options) {
			return options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].mainImage !== 0;
		},
		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isHoodDown = options.hood_down
				&& setup.hoodposition !== undefined
				&& setup.outfitPrimary.head !== undefined;
			const isAltPosition = !options.alt_override && setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("full");

			const end = isHoodDown ? '_down' : isAltPosition ? '_alt' : '';
			const path = `img/clothes/${slot}/${setup.variable}/${options[`worn_${slot}_integrity`]}${end}.png`;

			return gray_suffix(path, options.filters[`worn_${slot}`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_fitted_left(slot, overrideOptions) {
	return genlayer_clothing_main(slot, Object.assign({
		showfn(options) {
			return options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].mainImage !== 0
				&& options[`worn_${slot}_setup`].formfitting === 1
				&& ["f", "a"].includes(options.body_type);
		},
	}, overrideOptions));
}

function genlayer_clothing_fitted_right(slot, overrideOptions) {
	return genlayer_clothing_main(slot, Object.assign({
		showfn(options) {
			return options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].mainImage !== 0
				&& options[`worn_${slot}_setup`].formfitting === 1
				&& options.body_type == "f";
		},
	}, overrideOptions));
}

function genlayer_clothing_fitted_left_acc(slot, overrideOptions) {
	const setup = `worn_${slot}_setup`;
	return genlayer_clothing_main(slot, Object.assign({
		showfn(options) {
			return options[`worn_${slot}`] > 0
				&& options[setup].accImage !== 0
				&& options[setup].accessory === 1
				&& options[setup].formfitting === 1
				&& ["f", "a"].includes(options.body_type);
		},

		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isHoodDown = options.hood_down
				&& setup.hoodposition !== undefined
				&& setup.outfitPrimary.head !== undefined;
			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("acc");

			const special = setup.accessory_integrity_img ? `_${options[`worn_${slot}_integrity`]}` : '';
			const end = isHoodDown ? '_down' : isAltPosition ? '_alt' : '';
			const path = `img/clothes/${slot}/${setup.variable}/acc${special}${end}.png`;

			return gray_suffix(path, options.filters[`worn_${slot}_acc`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_fitted_right_acc(slot, overrideOptions) {
	const setup = `worn_${slot}_setup`;
	return genlayer_clothing_main(slot, Object.assign({
		showfn(options) {
			return options[`worn_${slot}`] > 0
				&& options[setup].accImage !== 0
				&& options[setup].accessory === 1
				&& options[setup].formfitting === 1
				&& options.body_type == "f";
		},

		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isHoodDown = options.hood_down
				&& setup.hoodposition !== undefined
				&& setup.outfitPrimary.head !== undefined;
			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("acc");

			const special = setup.accessory_integrity_img ? `_${options[`worn_${slot}_integrity`]}` : '';
			const end = isHoodDown ? '_down' : isAltPosition ? '_alt' : '';
			const path = `img/clothes/${slot}/${setup.variable}/acc${special}${end}.png`;

			return gray_suffix(path, options.filters[`worn_${slot}_acc`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_accessory(slot, overrideOptions) {
	return genlayer_clothing_main(slot, Object.assign({
		filters: [`worn_${slot}_acc`],

		showfn(options) {
			return options.show_clothes
			&& options[`worn_${slot}`] > 0
			&& options[`worn_${slot}_setup`].accImage !== 0
			&& options[`worn_${slot}_setup`].accessory === 1;
		},
		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isHoodDown = options.hood_down
				&& setup.hoodposition !== undefined
				&& setup.outfitPrimary.head !== undefined;
			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("acc");

			const special = setup.accessory_integrity_img ? `_${options[`worn_${slot}_integrity`]}` : '';
			const end = isHoodDown ? '_down' : isAltPosition ? '_alt' : '';
			const path = `img/clothes/${slot}/${setup.variable}/acc${special}${end}.png`;

			return gray_suffix(path, options.filters[`worn_${slot}_acc`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_breasts(slot, overrideOptions) {
	const setup = `worn_${slot}_setup`;
	return genlayer_clothing_main(slot, Object.assign({
		masksrcfn(options) {
			if (options.belly >= 19) return options.shirt_mask_breasts_src;

			const variable = options[setup].variable;
			const integrity = options[`worn_${slot}_integrity`];
			if (options[setup].mask_img === 1) return `img/clothes/${slot}/${variable}/mask_${integrity}.png`;
			return null;
		},
		showfn(options) {
			let breastImg = options[setup].breast_img;
			if (typeof breastImg === 'object' && breastImg[options.breast_size] !== null) breastImg = 1;
			return options.show_clothes && options[`worn_${slot}`] > 0 && breastImg === 1;
		},

		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];
			const breastImg = setup.breast_img;

			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("breasts");

			const breastSize = typeof breastImg === 'object' ? breastImg[options.breast_size] : Math.min(options.breast_size, 6);
			const end = isAltPosition ? '_alt' : '';
			const path = `img/clothes/${slot}/${setup.variable}/${breastSize}${end}.png`;
			return gray_suffix(path, options.filters[`worn_${slot}`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_belly(slot, overrideOptions) {
	return genlayer_clothing_main(slot, Object.assign({
		z: ZIndices.bellyClothes,
		showfn(options) {
			const commonChecks = options.belly > 7
				&& options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].mainImage !== 0;

			if (slot.includes("lower")) return commonChecks && !options.belly_hides_lower;
			if (slot == "under_upper") return commonChecks;
			return commonChecks && !options.shirt_mask_clip_src;
		},
		dxfn(options) {
			if (options.belly >= 24) return 10;
			if (options.belly >= 23) return 8;
			if (options.belly >= 22) return 6;
			if (options.belly >= 19) return 4;
			if (options.belly >= 15) return 2;
			return 0;
		},

		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("full");

			const integrity = options[`worn_${slot}_integrity`];
			const end = isAltPosition ? '_alt' : '';
			const path = `img/clothes/${slot}/${setup.variable}/${integrity}${end}.png`;
			return gray_suffix(path, options.filters[`worn_${slot}`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_belly_2(slot, overrideOptions) {
	return genlayer_clothing_belly(slot, Object.assign({
		dxfn(options) {
			if (options.belly >= 22) return 6;
			if (options.belly >= 19) return 4;
			if (options.belly >= 15) return 2;
			return 0;
		},
	}, overrideOptions));
}

function genlayer_clothing_belly_split(slot, overrideOptions) {
	return genlayer_clothing_belly(slot, Object.assign({
		showfn(options) {
			return options.belly > 7
				&& options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].mainImage !== 0;
		},
		dxfn(options) {
			if (options.shirt_move_right_src) return -2;
		},
	}, overrideOptions));
}

function genlayer_clothing_belly_split_acc(slot, overrideOptions) {
	const worn = `worn_${slot}`;

	return genlayer_clothing_belly(slot, Object.assign({
		filters: [`${worn}_acc`],

		showfn(options) {
			return options.belly > 7
				&& options.show_clothes
				&& options[worn] > 0
				&& options[`${worn}_setup`].accessory === 1
				&& options[`${worn}_setup`].mainImage !== 0;
		},
		dxfn(options) {
			if (options.shirt_move_right_src) return -2;
		},

		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isHoodDown = options.hood_down
				&& setup.hoodposition !== undefined
				&& setup.outfitPrimary.head !== undefined;
			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("acc");

			const integrity = setup.accessory_integrity_img ? `_${options[`worn_${slot}_integrity`]}` : '';
			const end = isAltPosition ? '_alt' : '';
			const hoodDown = isHoodDown ? '_down' : end;

			const path = `img/clothes/${slot}/${setup.variable}/acc${integrity}${hoodDown}.png`;
			return gray_suffix(path, options.filters[`worn_${slot}_acc`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_belly_shadow(slot, overrideOptions) {
	const worn = `worn_${slot}`;

	return genlayer_clothing_main(slot, Object.assign({
		z: ZIndices.bellyClothesShadow,
		srcfn(options) {
			return gray_suffix(
				`img/clothes/${slot}/${options[`${worn}_setup`].variable}/${options[`${worn}_integrity`]}.png`,
				options.filters[worn]
			);
		},
		showfn(options) {
			return options.belly > 7
				&& options.show_clothes
				&& options[worn] > 0
				&& options[`${worn}_setup`].mainImage !== 0;
		},
		brightnessfn(options) {
			return between(options.belly, 8, 24) ? -0.25 : 0;
		},
	}, overrideOptions));
}

function genlayer_clothing_belly_acc(slot, overrideOptions) {
	const worn = `worn_${slot}`;

	return genlayer_clothing_belly(slot, Object.assign({
		z: ZIndices[slot],
		filters: [`${worn}_acc`],

		showfn(options) {
			const commonChecks = options.belly > 7
				&& options[worn] > 0
				&& options[`${worn}_setup`].accessory === 1
				&& options[`${worn}_setup`].mainImage !== 0
				&& options.show_clothes;

			if (slot.includes("lower")) return commonChecks && !options.belly_hides_lower;
			if (slot.includes("upper")) return commonChecks
				&& options.worn_upper_setup.pregType != "min"
				&& !options.shirt_mask_clip_src;
			return commonChecks;
		},
		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isHoodDown = options.hood_down
				&& setup.hoodposition !== undefined
				&& setup.outfitPrimary.head !== undefined;
			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("acc");

			const integrity = setup.accessory_integrity_img ? `_${options[`worn_${slot}_integrity`]}` : '';
			const end = isAltPosition ? '_alt' : '';
			const hoodDown = isHoodDown ? '_down' : end;

			const path = `img/clothes/${slot}/${setup.variable}/acc${integrity}${hoodDown}.png`;
			return gray_suffix(path, options.filters[`worn_${slot}_acc`]);
		},
	}, overrideOptions));
}

function genlayer_clothing_breasts_acc(slot, overrideOptions) {
	const worn = `worn_${slot}`;

	return genlayer_clothing_main(slot, Object.assign({
		filters: [`${worn}_acc`],

		srcfn(options) {
			return getClothingPathBreastsAcc(slot, options);
		},
		showfn(options) {
			const breastAccImg = options[`${worn}_setup`].breast_acc_img;
			const breastImg = options[`${worn}_setup`].breast_img;
			let breastAcc = 0;

			if (breastAccImg === 1 && typeof breastImg === 'object' && breastImg[options.breast_size] !== null)
				breastAcc = 1;
			else if (typeof breastAccImg === 'object' && options[`${worn}_setup`].breast_acc_img[options.breast_size] !== null)
				breastAcc = 1;

			return options.show_clothes
				&& options[worn] > 0
				&& breastAcc === 1
		},
	}, overrideOptions));
}

function genlayer_clothing_back_img(slot, overrideOptions) {
	const setup = `worn_${slot}_setup`;

	return genlayer_clothing_basic(slot, Object.assign({
		z: ZIndices['over_head_back'],

		filtersfn(options) {
			switch (options[setup].back_img_colour) {
				case "none":
					return [];
				case "":
				case undefined:
				case "primary":
					return [`worn_${slot}`];
				case "secondary":
					return [`worn_${slot}_acc`];
			}
		},
		showfn(options) {
			const check = slot === "handheld"
				&& ["none", "cover"].includes(options.arm_right)
				&& options.worn_handheld_setup.coverBackImage === 0;
			if (!options.show_clothes || check) return false;

			const isHoodDown = options.hood_down
				&& options[setup].hood
				&& options[setup].outfitSecondary !== undefined;
			return options[`worn_${slot}`] > 0 && options[setup].back_img === 1 && !isHoodDown;
		},
		srcfn(options) {
			const isAltPosition = !options.alt_override
				&& options[setup].altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !options[setup]?.altdisabled.includes("back");

			const prefix = isAltPosition ? 'back_alt' : 'back';
			const suffix = options[setup].back_integrity_img ? `_${options[`worn_${slot}_integrity`]}` : '';

			const path = `img/clothes/${slot}/${options[setup].variable}/${prefix}${suffix}.png`;
			return gray_suffix(path, options.filters[this.filtersfn(options)[0]]);
		},
	}, overrideOptions));
}

function genlayer_clothing_back_img_acc(slot, overrideOptions) {
	const setup = `worn_${slot}_setup`;

	return genlayer_clothing_basic(slot, Object.assign({
		z: ZIndices['head_back'],

		filtersfn(options) {
			switch (options[setup].back_img_acc_colour) {
				case "none":
					return [];
				case "":
				case undefined:
				case "primary":
					return [`worn_${slot}`];
				case "secondary":
					return [`worn_${slot}_acc`]
			}
		},
		showfn(options) {
			if (!options.show_clothes || (slot === "handheld" && options.arm_right !== "hold")) return false;

			const isHoodDown = options.hood_down
				&& options[setup].hood
				&& options[setup].outfitSecondary !== undefined;
			return options[`worn_${slot}`] > 0 && options[setup].back_img_acc === 1 && !isHoodDown;
		},
		srcfn(options) {
			const isAltPosition = !options.alt_override
				&& options[setup].altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !options[setup]?.altdisabled.includes("back");

			const suffix = isAltPosition ? 'back_alt' : 'back';
			const path = `img/clothes/${slot}/${options[setup].variable}/${suffix}_acc.png`;
			return gray_suffix(path, options.filters[this.filtersfn(options)[0]]);
		},
	}, overrideOptions));
}

/**
 * Does not setup z-index, it should be in overrideOptions
 *
 * @param {"left"|"right"} arm
 * @param {string} slot
 * @param {object?} overrideOptions
 */
function genlayer_clothing_arm(arm, slot, overrideOptions) {
	return genlayer_clothing_basic(slot, Object.assign({
		filtersfn(options) {
			return filterFnArm(slot, options);
		},
		showfn(options) {
			return options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].sleeve_img === 1
				&& options[`arm_${arm}`] !== "none";
		},
		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === 'alt'
				&& !setup?.altdisabled.includes('sleeves');
			const isAltSleeve = !options.alt_override
				&& options.alt_sleeve_state
				&& V.worn[slot]?.altsleeve === 'alt';

			const held = options.handheld_position && arm === 'right' ? 'hold' : arm;
			const cover = options[`arm_${arm}`] === 'cover' ? `${arm}_cover` : held;
			const alt = isAltPosition ? "_alt" : '';
			const sleeve = isAltSleeve ? '_rolled' : '';

			const path =  `img/clothes/${slot}/${setup.variable}/${cover}${alt}${sleeve}.png`;
			return gray_suffix(path, options.filters[this.filtersfn(options)[0]]);
		},
	}, overrideOptions));
}

/**
 * Does not setup z-index, it should be in overrideOptions
 *
 * @param {"left"|"right"} arm
 * @param {string} slot
 * @param {object?} overrideOptions
 */
function genlayer_clothing_arm_fitted(arm, slot, overrideOptions) {
	return genlayer_clothing_basic(slot, Object.assign({
		filtersfn(options) {
			return filterFnArm(slot, options);
		},
		showfn(options) {
			return options.show_clothes
				&& options["worn_" + slot] > 0
				&& options["worn_" + slot + "_setup"].sleeve_img === 1
				&& ["f", "a"].includes(options.body_type)
				&& options.arm_left === "idle"
				&& !(options.belly > 7)
				&& options["arm_" + arm] !== "none";
		},
		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === 'alt'
				&& !setup?.altdisabled.includes('sleeves');
			const isAltSleeve = !options.alt_override
				&& options.alt_sleeve_state
				&& V.worn[slot]?.altsleeve === 'alt';

			const held = options.handheld_position && arm === 'right' ? 'hold' : arm;
			const cover = options[`arm_${arm}`] === 'cover' ? `${arm}_cover` : held;
			const alt = isAltPosition ? "_alt" : '';
			const sleeve = isAltSleeve ? '_rolled' : '';

			const path =  `img/clothes/${slot}/${setup.variable}/${cover}${alt}${sleeve}.png`;
			return gray_suffix(path, options.filters[this.filtersfn(options)[0]]);
		},
	}, overrideOptions));
}

/**
 * Does not setup z-index, it should be in overrideOptions
 *
 * @param {"left"|"right"} arm
 * @param {string} slot
 * @param {object?} overrideOptions
 */
function genlayer_clothing_arm_acc(arm, slot, overrideOptions) {
	return genlayer_clothing_basic(slot, Object.assign({
		filtersfn(options) {
			return filterFnArmAcc(slot, options);
		},
		showfn(options) {
			return options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].sleeve_img === 1
				&& options[`worn_${slot}_setup`].sleeve_acc_img === 1
				&& options[`arm_${arm}`] !== "none";
		},
		srcfn(options) {
			const setup = options[`worn_${slot}_setup`];

			const isAltPosition = !options.alt_override
				&& setup.altposition !== undefined
				&& V.worn[slot]?.altposition === "alt"
				&& !setup?.altdisabled.includes("sleeves")
				&& !setup?.altdisabled.includes("sleeve_acc");

			let filename = `${arm}_cover_acc`;
			if (options[`arm_${arm}`] !== "cover") {
				filename = (options.handheld_position && arm === "right") ? 'hold' : arm;
				filename += (isAltPosition) ? '_alt_acc' : '_acc';
			}

			const path = `img/clothes/${slot}/${setup.variable}/${filename}.png`;
			return gray_suffix(path, options.filters[this.filtersfn(options)[0]]);
		},
	}, overrideOptions));
}

/**
 * Does not setup z-index, it should be in overrideOptions
 *
 * @param {"left"|"right"} arm
 * @param {string} slot
 * @param {object?} overrideOptions
 */
function genlayer_clothing_arm_acc_fitted(arm, slot, overrideOptions) {
	return genlayer_clothing_basic(slot, Object.assign({
		filtersfn(options) {
			return filterFnArmAcc(slot, options);
		},
		showfn(options) {
			return options.show_clothes
				&& options[`worn_${slot}`] > 0
				&& options[`worn_${slot}_setup`].sleeve_img === 1
				&& options[`worn_${slot}_setup`].sleeve_acc_img === 1
				&& ["f", "a"].includes(options.body_type)
				&& options.arm_left === "idle"
				&& !(options.belly > 7)
				&& options[`arm_${arm}`] !== "none";
		},
		srcfn(options) {
			const hold = options.handheld_position && arm === "right" ? "hold" : arm;
			const cover = options[`arm_${arm}`] === "cover" ? `${arm}_cover` : hold;

			const path = `img/clothes/${slot}/${options[`worn_${slot}_setup`].variable}/${cover}_acc.png`;
			return gray_suffix(path, options.filters[this.filtersfn(options)[0]]);
		},
	}, overrideOptions))
}

/* Events */
$(document).on(":onloadsave", () => {
	if (!Renderer.lastModel) return;
	Renderer.refresh(Renderer.lastModel);
});
$(document).on(":oncloseoverlay", () => {
	if (!Renderer.lastModel) return;
	Renderer.refresh(Renderer.lastModel);
});
