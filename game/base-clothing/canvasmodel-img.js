/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
DefineMacro("modelprepare-player-body", function () {
	T.disabled = ["disabled", "hidden"];
	T.modeloptions.skin_type = Skin.color.natural;
	T.modeloptions.skin_tone = Skin.color.tan;

	if (V.makeup.eyeshadow != 0) {
		T.modeloptions.eyeshadow_colour = V.makeup.eyeshadow;
	}
	if (V.makeup.mascara != 0) {
		T.modeloptions.mascara_colour = V.makeup.mascara;
	}
	if (V.makeup.mascara_running != 0) {
		T.modeloptions.mascara_running = V.makeup.mascara_running;
	}
	if (V.makeup.lipstick != 0) {
		T.modeloptions.lipstick_colour = V.makeup.lipstick;
	}

	if (V.possessed) {
		T.modeloptions.left_eye = ["haunt", "despair"].includes(V.wraith.state) ? "red possessed" : "blue possessed";
		T.modeloptions.right_eye = ["haunt", "despair"].includes(V.wraith.state) ? "red possessed" : "blue possessed";
	} else {
		T.modeloptions.left_eye = V.makeup.eyelenses.left != 0 ? V.makeup.eyelenses.left : V.leftEyeColour;
		T.modeloptions.right_eye = V.makeup.eyelenses.right != 0 ? V.makeup.eyelenses.right : V.rightEyeColour;
	}

	T.modeloptions.hair_colour = V.haircolour;
	T.modeloptions.hair_fringe_colour = V.hairfringecolour;
	T.modeloptions.hair_colour_gradient = V.hairColourGradient;
	T.modeloptions.hair_fringe_colour_gradient = V.hairFringeColourGradient;
	T.modeloptions.hair_colour_style = V.hairColourStyle;
	T.modeloptions.hair_fringe_colour_style = V.hairFringeColourStyle;

	T.modeloptions.brows_colour = V.makeup.browscolour != 0 ? V.makeup.browscolour : V.naturalhaircolour;
	T.modeloptions.pbhair_colour = V.makeup.pbcolour != 0 ? V.makeup.pbcolour : V.naturalhaircolour;

	/*
			██████   █████  ███████ ███████
			██   ██ ██   ██ ██      ██
			██████  ███████ ███████ █████
			██   ██ ██   ██      ██ ██
			██████  ██   ██ ███████ ███████
		*/

	T.modeloptions.body_type = V.options.genderBody && V.options.genderBody !== "default" ? V.options.genderBody : V.player.gender_body;

	apparentbreastsizecheck();
	const breastSizeMap = {
		12: 6,
		8: 5,
		9: 5,
		10: 5,
		11: 5,
		6: 4,
		7: 4,
		4: 3,
		5: 3,
		3: 2,
		1: 1,
		2: 1,
	};

	T.modeloptions.breast_size = breastSizeMap[V.player.perceived_breastsize] || 0;
	T.modeloptions.breasts = "default";

	if (V.sexStats) {
		const bellySize = playerBellySize() || V.bellySizeDebug;
		T.modeloptions.belly = bellySize;
		T.bellySize = bellySize;
	}

	if (V.wraithSkin) {
		T.modeloptions.skin_type = "wraith";
		T.modeloptions.filters = {
			tan: {
				blend: "#ffffff",
				blendMode: "multiply",
				desaturate: true,
			},
		};
		T.modeloptions.tanningEnabled = false;
	}

	T.modeloptions.tummy_parasite = V.parasite.tummy.name;

	/*
			██   ██  █████  ██ ██████
			██   ██ ██   ██ ██ ██   ██
			███████ ███████ ██ ██████
			██   ██ ██   ██ ██ ██   ██
			██   ██ ██   ██ ██ ██   ██
		*/

	T.modeloptions.hair_sides_length = V.hairlengthstage;
	const hairstyle = setup.hairstyles.sides.find(hs => hs.variable === V.hairtype);

	if (hairstyle.alt_head_type && hairstyle.alt_head_type.includes(setup.clothes.head[clothesIndex("head", V.worn.head)].head_type)) {
		T.modeloptions.hair_sides_type = hairstyle.alt;
	} else {
		T.modeloptions.hair_sides_type = V.hairtype;
	}

	T.modeloptions.hair_sides_position = V.hairposition;
	T.modeloptions.hair_fringe_length = V.fringelengthstage;
	T.modeloptions.hair_fringe_type = V.fringetype;

	/*
			█████  ██████  ███    ███ ███████
			██   ██ ██   ██ ████  ████ ██
			███████ ██████  ██ ████ ██ ███████
			██   ██ ██   ██ ██  ██  ██      ██
			██   ██ ██   ██ ██      ██ ███████
		*/

	T.coverBreastsWithArm = false;

	if (V.leftarm !== "bound" && V.leftarm !== "grappled") {
		if (
			!V.dontHide &&
			V.libertine !== 2 &&
			V.worn.over_upper.exposed >= 1 &&
			(V.worn.upper.exposed >= 1 || V.upperwetstage >= 3) &&
			!V.worn.lower.type.includes("covered") &&
			((V.uncomfortable.underwear && !V.worn.under_upper.type.includes("naked")) ||
				(V.uncomfortable.nude && (V.worn.under_upper.exposed >= 1 || V.underupperwetstage >= 3)))
		) {
			if (
				(V.player.gender_appearance === "m" && V.player.perceived_breastsize <= 2) ||
				V.worn.under_upper.type.includes("covered") ||
				(["pool", "lake", "beach"].includes(V.location) && V.worn.under_upper.exposed < 1 && V.underupperwetstage < 3)
			) {
				T.coverBreasts = false;
				T.modeloptions.arm_left = "idle";
			} else {
				T.coverBreasts = true;
				T.modeloptions.arm_left = "cover"; // might be changed back to "idle" if covering with wings
			}
		} else {
			T.coverBreasts = false;
			T.modeloptions.arm_left = "idle";
		}
	} else {
		T.modeloptions.arm_left = "none";
	}

	if (V.rightarm !== "bound" && V.rightarm !== "grappled") {
		if (
			!V.dontHide &&
			V.libertine !== 2 &&
			V.worn.over_lower.exposed >= 1 &&
			(V.worn.lower.exposed >= 1 || V.lowerwetstage >= 3) &&
			((V.uncomfortable.underwear && !V.worn.under_lower.type.includes("naked")) ||
				(V.uncomfortable.nude && (V.worn.under_lower.exposed >= 1 || V.underlowerwetstage >= 3)))
		) {
			if (
				(["pool", "lake", "beach"].includes(V.location) && V.worn.under_lower.exposed < 1 && V.underlowerwetstage < 3) ||
				V.worn.under_lower.type.includes("covered")
			) {
				T.coverCrotch = false;
				T.modeloptions.arm_right = V.worn.handheld.name !== "naked" ? "hold" : "idle";
			} else {
				T.coverCrotch = true;
				T.modeloptions.arm_right = "cover"; // might be changed back to "idle" if covering with wings/tail
			}
		} else {
			T.coverCrotch = false;
			T.modeloptions.arm_right = V.worn.handheld.name !== "naked" ? "hold" : "idle";
		}
	} else {
		T.modeloptions.arm_right = "none";
	}

	if (V.leftarm !== "bound" && V.leftarm !== "grappled") {
		if (!T.coverBreasts) {
			if (V.exposed >= 2 && !V.dontHide && V.libertine !== 2 && V.transformationParts.traits.flaunting === "default") {
				T.modeloptions.demon_wings_state = "flaunt";
			} else {
				T.modeloptions.demon_wings_state = "idle";
			}
			T.modeloptions.angel_wing_right = "idle";
			T.modeloptions.fallen_wing_right = "idle";
			T.modeloptions.bird_wing_right = "idle";
		} else if (T.coverBreasts) {
			if (!T.disabled.includes(V.transformationParts.demon.wings)) {
				T.modeloptions.demon_wings_state = V.transformationParts.traits.flaunting === "default" ? "flaunt" : "cover";
				T.modeloptions.arm_left = "idle";
			} else if (!T.disabled.includes(V.transformationParts.angel.wings)) {
				T.modeloptions.angel_wing_right = "cover";
				T.modeloptions.arm_left = "idle";
			} else if (!T.disabled.includes(V.transformationParts.fallenAngel.wings)) {
				T.modeloptions.fallen_wing_right = "cover";
				T.modeloptions.arm_left = "idle";
			} else if (!T.disabled.includes(V.transformationParts.bird.wings)) {
				T.modeloptions.bird_wing_right = "cover";
				T.modeloptions.arm_left = "idle";
			} else {
				T.coverBreastsWithArm = true;
			}
		}
	}

	if (V.rightarm !== "bound" && V.rightarm !== "grappled") {
		if (!T.coverCrotch) {
			if (!T.disabled.includes(V.transformationParts.demon.tail)) {
				if (V.exposed >= 2 && !V.dontHide && V.libertine !== 2 && V.transformationParts.traits.flaunting === "default") {
					T.modeloptions.demon_tail_state = "flaunt";
					T.modeloptions.cat_tail_state = "flaunt";
				} else {
					T.modeloptions.demon_tail_state = "idle";
					T.modeloptions.cat_tail_state = "idle";
				}
			}
			T.modeloptions.angel_wing_left = "idle";
			T.modeloptions.fallen_wing_left = "idle";
			T.modeloptions.bird_wing_left = "idle";
		} else if (T.coverCrotch) {
			if (!T.disabled.includes(V.transformationParts.demon.tail)) {
				T.modeloptions.demon_tail_state = V.transformationParts.traits.flaunting === "default" ? "flaunt" : "cover";
				T.modeloptions.cat_tail_state = "cover";
				T.modeloptions.arm_right = V.worn.handheld.name !== "naked" ? "hold" : "idle";
			} else if (!T.disabled.includes(V.transformationParts.angel.wings)) {
				T.modeloptions.angel_wing_left = "cover";
				T.modeloptions.arm_right = V.worn.handheld.name !== "naked" ? "hold" : "idle";
			} else if (!T.disabled.includes(V.transformationParts.fallenAngel.wings)) {
				T.modeloptions.fallen_wing_left = "cover";
				T.modeloptions.arm_right = V.worn.handheld.name !== "naked" ? "hold" : "idle";
			} else if (!T.disabled.includes(V.transformationParts.bird.wings)) {
				T.modeloptions.bird_wing_left = "cover";
				T.modeloptions.arm_right = V.worn.handheld.name !== "naked" ? "hold" : "idle";
			}
		}
	}

	/*
			██     ██ ██████  ██ ████████ ██ ███    ██  ██████  ███████
			██     ██ ██   ██ ██    ██    ██ ████   ██ ██       ██
			██  █  ██ ██████  ██    ██    ██ ██ ██  ██ ██   ███ ███████
			██ ███ ██ ██   ██ ██    ██    ██ ██  ██ ██ ██    ██      ██
			███ ███  ██   ██ ██    ██    ██ ██   ████  ██████  ███████
		*/

	if (V.options.bodywritingImages === true) {
		for (const [label, value] of Object.entries(V.skin)) {
			if (value.writing) {
				T.modeloptions["writing_" + label] = setup.bodywriting_namebyindex[value.index];
			}
		}
	}

	/*
			███████  █████   ██████ ███████
			██      ██   ██ ██      ██
			█████   ███████ ██      █████
			██      ██   ██ ██      ██
			██      ██   ██  ██████ ███████
		*/

	T.modeloptions.facestyle = V.facestyle;
	T.modeloptions.freckles = V.player.freckles === true && V.makeup.concealer !== 1;
	T.modeloptions.ears_position = V.earsposition;
	T.modeloptions.toast = T.toast === true;
	T.modeloptions.scars = false;

	// Eyes
	if (V.possessed) {
		T.modeloptions.trauma = V.possessed;
	} else {
		T.modeloptions.trauma = V.trauma >= V.traumamax * 0.9;
	}
	T.modeloptions.blink = V.options.blinkingEnabled;
	T.modeloptions.eyes_bloodshot = (V.pain >= 100 && V.willpowerpain === 0) || V.tiredness >= C.tiredness.max;
	T.modeloptions.eyes_half =
		(V.options.halfClosedEnabled &&
			(V.arousal >= (V.arousalmax / 5) * 4 || V.orgasmdown >= 1) &&
			V.trauma < V.traumamax * 0.9 &&
			V.pain < 60 &&
			V.eyelidTEST === true) ||
		V.possessed ||
		V.tiredness >= C.tiredness.max * 0.75;

	// Brows
	if (V.trauma >= V.traumamax || V.possessed) {
		T.modeloptions.brows = "top";
	} else if (V.pain >= 60) {
		T.modeloptions.brows = "low";
	} else if (V.arousal >= (V.arousalmax / 5) * 4 || V.orgasmdown >= 1) {
		T.modeloptions.brows = "orgasm";
	} else if (V.pain >= 20) {
		T.modeloptions.brows = "mid";
	} else {
		T.modeloptions.brows = "top";
	}
	T.modeloptions.brows_position = V.browsposition;

	// Mouth
	if (V.trauma >= V.traumamax) {
		T.modeloptions.mouth = "neutral";
	} else if (V.pain >= 60 || V.orgasmdown >= 1 || V.possessed) {
		T.modeloptions.mouth = "cry";
	} else if ((V.exposed === 2 && V.uncomfortable.nude === true && V.dontHide === false && V.libertine !== 2) || V.pain >= 20) {
		T.modeloptions.mouth = "frown";
	} else if (V.pain >= 1 || (V.exposed === 1 && V.uncomfortable.underwear === true) || (V.combat === 1 && V.consensual !== 1)) {
		T.modeloptions.mouth = "neutral";
	} else if (V.stress >= (V.stressmax / 5) * 3 || !(V.control >= (V.controlmax / 5) * 1)) {
		T.modeloptions.mouth = "neutral";
	} else {
		T.modeloptions.mouth = "smile";
	}

	// Blush
	T.modeloptions.blush = Math.min(5, Math.floor(V.arousal / 2000) + 1);
	if (T.modeloptions.blush < 2 && V.exposed >= 2) {
		T.modeloptions.blush = 2;
	} else if (V.arousal < 100 && V.exposed < 1) {
		T.modeloptions.blush = 0;
	}
	if (
		T.modeloptions.blush < 2 &&
		!V.worn.over_upper.type.includes("naked") &&
		!V.worn.over_lower.type.includes("naked") &&
		V.worn.upper.type.includes("naked") &&
		V.worn.lower.type.includes("naked") &&
		V.worn.under_upper.type.includes("naked") &&
		V.worn.under_lower.type.includes("naked")
	) {
		T.modeloptions.blush = 2;
	}

	// Tears
	T.modeloptions.tears = painToTearsLvl(V.pain);

	/*
			████████ ███████ ███████
			██    ██      ██
			██    █████   ███████
			██    ██           ██
			██    ██      ███████
		*/

	// Wing and tail idle/cover/flaunt state is configured in the arms section above

	T.modeloptions.angel_wings_type = V.transformationParts.angel.wings;
	T.modeloptions.angel_wings_layer = V.wingslayer;
	T.modeloptions.angel_halo_type = V.transformationParts.angel.halo;

	T.modeloptions.fallen_wings_type = V.transformationParts.fallenAngel.wings;
	T.modeloptions.fallen_wings_layer = V.wingslayer;
	T.modeloptions.fallen_halo_type = V.transformationParts.fallenAngel.halo;

	T.modeloptions.demon_wings_type = V.transformationParts.demon.wings;
	T.modeloptions.demon_wings_layer = V.wingslayer;
	T.modeloptions.demon_tail_type = V.transformationParts.demon.tail;
	T.modeloptions.demon_tail_layer = V.taillayer;
	T.modeloptions.demon_horns_type = V.transformationParts.demon.horns;
	T.modeloptions.demon_horns_layer = V.hornslayer;

	T.modeloptions.wolf_tail_type = V.transformationParts.wolf.tail;
	T.modeloptions.wolf_tail_layer = V.taillayer;
	T.modeloptions.wolf_ears_type = V.transformationParts.wolf.ears;
	T.modeloptions.wolf_pits_type = V.transformationParts.wolf.pits;
	T.modeloptions.wolf_pubes_type = V.transformationParts.wolf.pubes;
	T.modeloptions.wolf_cheeks_type = V.transformationParts.wolf.cheeks;

	T.modeloptions.cat_tail_type = V.transformationParts.cat.tail;
	T.modeloptions.cat_tail_layer = V.taillayer;
	T.modeloptions.cat_ears_type = V.transformationParts.cat.ears;

	T.modeloptions.cow_horns_type = V.transformationParts.cow.horns;
	T.modeloptions.cow_horns_layer = V.hornslayer;
	T.modeloptions.cow_tail_type = V.transformationParts.cow.tail;
	T.modeloptions.cow_tail_layer = V.taillayer;
	T.modeloptions.cow_ears_type = V.transformationParts.cow.ears;

	T.modeloptions.bird_wings_type = V.transformationParts.bird.wings;
	T.modeloptions.bird_wings_layer = V.wingslayer;
	T.modeloptions.bird_tail_type = V.transformationParts.bird.tail;
	T.modeloptions.bird_tail_layer = V.taillayer;
	T.modeloptions.bird_eyes_type = V.transformationParts.bird.eyes;
	T.modeloptions.bird_malar_type = V.transformationParts.bird.malar;
	T.modeloptions.bird_plumage_type = V.transformationParts.bird.plumage;
	T.modeloptions.bird_pubes_type = V.transformationParts.bird.pubes;

	T.modeloptions.fox_tail_type = V.transformationParts.fox.tail;
	T.modeloptions.fox_tail_layer = V.taillayer;
	T.modeloptions.fox_ears_type = V.transformationParts.fox.ears;
	T.modeloptions.fox_cheeks_type = V.transformationParts.fox.cheeks;

	/*
			██████ ██   ██ ██ ███    ███ ███████ ██████   █████
			██      ██   ██ ██ ████  ████ ██      ██   ██ ██   ██
			██      ███████ ██ ██ ████ ██ █████   ██████  ███████
			██      ██   ██ ██ ██  ██  ██ ██      ██   ██ ██   ██
			██████ ██   ██ ██ ██      ██ ███████ ██   ██ ██   ██
		*/

	// Demon-cat tail
	if (isPartEnabled(T.modeloptions.cat_tail_type) && isPartEnabled(T.modeloptions.demon_tail_type) && isChimeraEnabled("demoncat", "tail")) {
		T.modeloptions.demon_tail_type = "default-cat";
		T.modeloptions.demon_tail_layer = "cover";
	}
	// Demon-harpy wings
	if (isPartEnabled(T.modeloptions.demon_wings_type) && isPartEnabled(T.modeloptions.bird_wings_type) && isChimeraEnabled("demonharpy", "wings")) {
		T.modeloptions.bird_wings_type = "default-demon";
		T.modeloptions.demon_wings_type = "hidden";
	}
	// Demon-cow horns
	if (isPartEnabled(T.modeloptions.cow_horns_type) && isPartEnabled(T.modeloptions.demon_horns_type) && isChimeraEnabled("demoncow", "horns")) {
		if (!["default", "succubus"].includes(T.modeloptions.demon_horns_type)) {
			// Force default horns if the PC has unsupported horn styles (e.g. Classic)
			T.modeloptions.demon_horns_type = "default";
		}
		T.modeloptions.cow_horns_type = "default-demon";
	}

	/*
			██████ ██████   ██████  ████████  ██████ ██   ██
			██      ██   ██ ██    ██    ██    ██      ██   ██
			██      ██████  ██    ██    ██    ██      ███████
			██      ██   ██ ██    ██    ██    ██      ██   ██
			██████ ██   ██  ██████     ██     ██████ ██   ██
		*/

	T.modeloptions.crotch_visible = true;

	if (V.pbdisable === "f") {
		T.modeloptions.pbhair_level = V.pblevel;
		T.modeloptions.pbhair_strip = V.pbstrip;
		T.modeloptions.pbhair_balls = V.pblevelballs;
	}

	if (V.player.penisExist) {
		T.modeloptions.penis_size = Math.clamp(V.player.penissize, -2, 4);
		T.modeloptions.penis = V.player.virginity.penile === true ? "virgin" : "default";
		T.modeloptions.balls = V.player.ballsExist;
		T.modeloptions.penis_parasite = V.parasite.penis.name;
		T.modeloptions.penis_condom = V.player.condom.type;
		T.modeloptions.condom_colour = V.player.condom.colour;
	}

	if (V.player.vaginaExist) {
		T.modeloptions.clit_parasite = V.parasite.clit.name;
	}

	if (T.modeloptions.penis_parasite === "parasite" || T.modeloptions.clit_parasite === "parasite") {
		// Always uses the clit image as a base
		if (V.earSlime.focus === "impregnation") {
			T.modeloptions.clit_parasite = "parasitem";
		} else {
			T.modeloptions.clit_parasite = "parasite";
		}

		if (V.player.penisExist && V.player.ballsExist && V.player.penissize >= -1) {
			T.modeloptions.penis_parasite = "parasite";
		} else {
			T.modeloptions.penis_parasite = "";
		}

		// Ensure it's always displayed
		if (V.worn.genitals.name === "chastity parasite") {
			T.modeloptions.worn = T.modeloptions.worn || {};
			T.modeloptions.worn.genitals = {
				index: clothesIndex("genitals", V.worn.genitals),
				integrity: integrityKeyword(V.worn.genitals, "genitals"),
				colour: V.worn.genitals.colour,
			};
		}
	}

	// Dripping Speeds
	const dripspeeds = ["", "Start", "VerySlow", "Slow", "Fast", "VeryFast"];

	// Vagina
	let _liquidamt = Math.clamp(setup.bodyliquid.combined("vagina"), 0, 5);
	T.modeloptions.drip_vaginal = dripspeeds[_liquidamt];

	// Anus
	_liquidamt = Math.clamp(setup.bodyliquid.combined("anus"), 0, 5);
	T.modeloptions.drip_anal = dripspeeds[_liquidamt];

	// Mouth
	_liquidamt = Math.clamp(setup.bodyliquid.combined("mouth"), 0, 5);
	T.modeloptions.drip_mouth = dripspeeds[_liquidamt];

	let _chestVisible = false;
	if (V.worn.upper.exposed >= 2 && V.worn.under_upper.exposed >= 1) {
		_chestVisible = true;
	} else if ((V.upperwetstage > 0 || V.worn.upper.type.includes("naked")) && (V.underupperwetstage > 0 || V.worn.under_upper.type.includes("naked"))) {
		_chestVisible = true;
	}

	if (_chestVisible) {
		T.modeloptions.nipples_parasite = V.parasite.nipples.name;
		T.modeloptions.breasts_parasite = V.parasite.breasts.name;
	}

	/*
			███████ ██      ██    ██ ██ ██████  ███████
			██      ██      ██    ██ ██ ██   ██ ██
			█████   ██      ██    ██ ██ ██   ██ ███████
			██      ██      ██    ██ ██ ██   ██      ██
			██      ███████  ██████  ██ ██████  ███████
		*/

	const cumsprite = {
		chest: [null, "1", "2", "3", "4,5", "4,5"],
		face: [null, "1,2", "1,2", "3,4", "3,4", "5"],
		feet: [null, null, "2,3", "2,3", "4,5", "4,5"],
		leftarm: [null, "1,2,3", "1,2,3", "1,2,3", "4,5", "4,5"],
		rightarm: [null, "1,2,3", "1,2,3", "1,2,3", "4,5", "4,5"],
		neck: [null, "1,2", "1,2", "3,4", "3,4", "5"],
		thigh: [null, "1", "2", "3", "4", "5"],
		tummy: [null, "1", "2", "3", "4", "5"],
	};
	const bodyparts = ["chest", "face", "feet", "leftarm", "rightarm", "neck", "thigh", "tummy"];
	bodyparts.forEach(bodypart => {
		const liquidamt = Math.clamp(setup.bodyliquid.combined(bodypart), 0, 5);
		T.modeloptions["cum_" + bodypart] = cumsprite[bodypart].select(liquidamt);
	});
});

DefineMacro("modelprepare-player-clothes", function () {
	T.modeloptions.breasts =
		!V.worn.upper.type.includes("naked") || !V.worn.under_upper.type.includes("naked") || T.coverBreastsWithArm ? "cleavage" : "default";

	if (V.worn.under_upper.type.includes("chest_bind")) {
		T.modeloptions.breast_size = 1;
	}

	if (V.worn.lower.exposed >= 2 && V.worn.under_lower.exposed >= 1 && !V.worn.legs.name.includes("tights")) {
		T.modeloptions.crotch_visible = true;
		T.modeloptions.crotch_exposed = true;
	} else if ((V.lowerwetstage > 0 || V.worn.lower.type.includes("naked")) && (V.underlowerwetstage > 0 || V.worn.under_lower.type.includes("naked"))) {
		T.modeloptions.crotch_visible = true;
		T.modeloptions.crotch_exposed = false;
	} else {
		T.modeloptions.crotch_visible = false;
	}

	T.modeloptions.hood_down = V.worn.upper.hoodposition === "down";

	if (
		((V.worn.over_head.hood === 1 && V.worn.over_head.mask_img !== 1) || (V.worn.head.hood === 1 && V.worn.head.mask_img !== 1)) &&
		V.worn.upper.hoodposition === "down"
	) {
		T.modeloptions.hair_sides_length = "short";
		T.modeloptions.hair_fringe_length = "short";
	}

	T.modeloptions.facewear_layer = V.facelayer;
	T.modeloptions.upper_tucked = V.upperTucked && !setup.clothes.upper[clothesIndex("upper", V.worn.upper)].notuck && V.worn.upper.outfitPrimary === undefined;
	T.modeloptions.lower_tucked = !V.worn.feet.notuck && !V.worn.lower.notuck && V.lowerTucked;

	Object.assign(T.modeloptions, getClothingOptions());
	const overrides = V.modeloptionsOverride;
	if (Object.keys(overrides).length > 0) {
		for (const [key, value] of Object.entries(overrides)) {
			T.modeloptions[key] = value;
		}
	}
});
