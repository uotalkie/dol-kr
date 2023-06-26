/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function masturbationeffects() {
	const fragment = document.createDocumentFragment();
	const br = () => document.createElement("br");
	const span = (text, colour) => {
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const otherElement = (tag, text, colour) => {
		const element = document.createElement(tag);
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump")
	);
	const selectedToy = (arm, update) => {
		if (update === true) V["currentToy" + arm.toLocaleUpperFirst()] = V["selectedToy" + arm.toLocaleUpperFirst()];
		const toy = clone(playerToys[V["currentToy" + arm.toLocaleUpperFirst()]]);
		if (update === false) V["currentToy" + arm.toLocaleUpperFirst()] = "none";
		return toy;
	};
	const toyDisplay = (toy1, toy2) => {
		if (toy1 && toy2) return (toy1.colour ? toy1.colour + " " : "") + toy1.name + " and " + (toy2.colour ? toy2.colour + "" : "") + toy2.name;
		if (toy1) return (toy1.colour ? toy1.colour + " " : "") + toy1.name;
		return "";
	};

	const otherVariables = { br, span, otherElement, genitalsExposed, breastsExposed, selectedToy, toyDisplay, additionalEffect: {} };

	if (V.player.vaginaExist) {
		otherVariables.hymenIntact = V.player.virginity.vaginal === true && V.sexStats.vagina.pregnancy.totalBirthEvents === 0;
		wikifier("vaginaWetnessCalculate");
	}
	if (V.corruptionMasturbation) {
		if (V.leftarm === "bound" && V.rightarm === "bound") {
			fragment.append(
				Wikifier.wikifyEval(
					'The slimes in your ear make you fight against the binds around your arms. You make no progress, <span class="blue">and it gives up.</span><<arousal 600 "masturbation">><<stress 6>><<gstress>><<garousal>>'
				)
			);
			fragment.append(" ");
			V.rightaction = "mrest";
			V.leftaction = "mrest";
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else if (playerHeatMinArousal() + playerRutMinArousal() >= 3000) {
			fragment.append(
				Wikifier.wikifyEval(
					'The slimes in your ear feel that it\'s not worth trying to force you to masturbate in your current state, <span class="blue">and it lets you go.</span>'
				)
			);
			fragment.append(" ");
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else {
			if (V.orgasmdown >= 2) {
				if (V.corruptionMasturbationCount === undefined || V.corruptionMasturbationCount === null) V.corruptionMasturbationCount = random(2, 6);
				V.corruptionMasturbationCount--;
				if (V.corruptionMasturbationCount === 0) {
					V.corruptionMasturbation = false;
					delete V.corruptionMasturbationCount;
					if (V.awareness < 200) {
						// Prevents the PC from continuing actions that they normally are unable to do yet
						if (V.mouth === "mpenis") {
							fragment.append(
								Wikifier.wikifyEval(
									'<span class="green">With the loss of the control from the slimes in your ear, you remove your <<penis>> from your mouth and move away.</span>'
								)
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mpenisentrance") {
							fragment.append(
								Wikifier.wikifyEval(
									'<span class="green">With the loss of the control from the slimes in your ear, you move away from your <<penis>>.</span>'
								)
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mvaginaentrance") {
							fragment.append(
								Wikifier.wikifyEval(
									'<span class="green">With the loss of the control from the slimes in your ear, you move away from your <<pussy>>.</span>'
								)
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
						}
					}
				}
			}
			if (V.corruptionMasturbation) fragment.append(masturbationSlimeControl());
		}
	}

	if (V.possessed) {
		fragment.append(Wikifier.wikifyEval("<<dynamicblock id=control-caption>><<controlcaption>><</dynamicblock>>"));
		fragment.append(possessedMasturbation(span, br));
	}

	fragment.append(masturbationeffectsPhallusFlower(otherVariables));

	fragment.append(masturbationeffectsArms("left", V.leftaction === V.rightaction, otherVariables));
	fragment.append(masturbationeffectsArms("right", false, otherVariables));

	fragment.append(masturbationeffectsMouth(otherVariables));

	if (otherVariables.additionalEffect.hands === "ballplayeffects") {
		if (V.arousal >= V.arousalmax * (4 / 5)) {
			if (genitalsExposed()) {
				fragment.append(Wikifier.wikifyEval("Your <<penis>> bucks eagerly, and precum leaps from the tip."));
			} else {
				fragment.append(Wikifier.wikifyEval("Your <<penis>> bucks eagerly, and precum seeps through your <<exposedlower>>."));
			}
		} else if (V.arousal >= V.arousalmax * (3 / 5)) {
			if (genitalsExposed()) {
				fragment.append(Wikifier.wikifyEval("Your <<penis>> bucks eagerly, and precum beads at the tip."));
			} else {
				fragment.append(Wikifier.wikifyEval("Your <<penis>> bucks eagerly, and your precum creates a dark spot on your <<exposedlower>>."));
			}
		} else if (V.arousal >= V.arousalmax * (2 / 5)) {
			fragment.append(Wikifier.wikifyEval("The pressure makes your <<penis>> throb."));
		} else {
			fragment.append(Wikifier.wikifyEval("The pressure makes your <<penis>> twitch."));
		}
		fragment.append(" ");
	}

	if (V.player.vaginaExist && V.vaginaArousalWetness >= 60) {
		if (V.worn.under_lower.vagina_exposed && V.worn.lower.vagina_exposed) {
			wikifier("vaginaFluidPassive");
			if (T.lube_released) {
				fragment.append(Wikifier.wikifyEval('<span class="pink">Juices leak from your <<pussy>>.</span>'));
			}
		} else if (V.worn.under_lower.vagina_exposed === 0 && V.underlowerwetstage < 3) {
			fragment.append(Wikifier.wikifyEval(`<span class="pink">Juices leak from your <<pussy>> and dampen your ${V.worn.under_lower.name}.</span>`));
			wikifier("underlowerwet", 1);
		} else if (V.worn.lower.vagina_exposed === 0) {
			fragment.append(
				Wikifier.wikifyEval(
					`<span class="pink">Juices leak from your <<pussy>><<if V.underlowerwet gte 60>>, soak through your ${V.worn.under_lower.name},<</if>> and dampen your ${V.worn.lower.name}.</span>`
				)
			);
		} else {
			fragment.append(Wikifier.wikifyEval('<span class="pink">Juices leak from your <<pussy>> and dampen your clothing.</span>'));
		}
		fragment.append(" ");
	}

	if (
		random(0, 100) >= Math.clamp(135 - V.corruption_slime / 2, 80, 98) &&
		V.corruption_slime > currentSkillValue("willpower") / 10 &&
		V.corruptionMasturbation === undefined
	) {
		V.corruptionMasturbation = true;
		V.corruptionMasturbationCount = random(1, 4);
		fragment.append(span("The slime in your ear decides that it wants you to have more fun.", "red"));
		fragment.append(" ");
	}

	fragment.append(br());
	fragment.append(br());

	return fragment;
}

function masturbationeffectsArms(
	arm,
	doubleAction,
	{ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }
) {
	const fragment = document.createDocumentFragment();

	const armAction = arm + "action";
	const armActionDefault = armAction + "default";
	const otherArm = arm === "left" ? "right" : "left";
	const otherArmAction = otherArm + "action";

	const clearAction = defaultAction => {
		V[armActionDefault] = defaultAction !== undefined ? defaultAction : V[armAction];
		V[armAction] = 0;
		if (doubleAction) {
			V[otherArmAction + "default"] = defaultAction !== undefined ? defaultAction : V[otherArmAction];
			V[otherArmAction] = 0;
		}
	};

	if (V[armAction] === 0) return fragment;

	if (V[armAction] === "mrest") {
		if (random(0, 100) >= 91 && V.corruption_slime > currentSkillValue("willpower") / 10 && V.corruptionMasturbation === undefined) {
			V.corruptionMasturbation = true;
			V.corruptionMasturbationCount = random(2, 6);
			fragment.append(span("The slime in your ear decides that it will continue for you.", "red"));
			fragment.append(" ");
			clearAction(0);
		} else {
			clearAction();
		}
		return fragment;
	}

	// Dealing with the players clothes, needs work; what if layer above is not exposed?
	switch (V[armAction]) {
		case "moverupper":
			clearAction("mrest");
			V.worn.over_upper.exposed = 2;
			if (V.worn.over_upper.open) {
				V.worn.over_upper.state_top = "midriff";
				fragment.append(Wikifier.wikifyEval(`You pull down your ${V.worn.over_upper.name}, <span class="lewd">exposing your <<breastsaside>>.</span>`));
			} else {
				V.worn.over_upper.state = "chest";
				fragment.append(Wikifier.wikifyEval(`You pull up your ${V.worn.over_upper.name}, <span class="lewd">exposing your <<breastsaside>>.</span>`));
			}
			fragment.append(" ");
			break;
		case "mupper":
			clearAction("mrest");
			V.worn.upper.exposed = 2;
			if (V.worn.upper.open) {
				V.worn.upper.state_top = "midriff";
				fragment.append(Wikifier.wikifyEval(`You pull up your ${V.worn.upper.name}, <span class="lewd">exposing your <<breastsaside>>.</span>`));
			} else {
				V.worn.upper.state = "chest";
				fragment.append(Wikifier.wikifyEval(`You pull up your ${V.worn.upper.name}, <span class="lewd">exposing your <<breastsaside>>.</span>`));
			}
			fragment.append(" ");
			break;
		case "munder_upper":
			clearAction("mrest");
			V.worn.under_upper.exposed = 2;
			if (V.worn.under_upper.open) {
				V.worn.under_upper.state_top = "midriff";
				if (V.player.breastsize >= 3) {
					fragment.append(
						Wikifier.wikifyEval(`You pull down your ${V.worn.under_upper.name} <span class="lewd">and your <<breasts>> flop out.</span>`)
					);
				} else {
					fragment.append(Wikifier.wikifyEval(`You pull down your ${V.worn.under_upper.name}, <span class="lewd">exposing your <<breasts>>.</span>`));
				}
			} else {
				V.worn.under_upper.state = "chest";
				if (V.player.breastsize >= 3) {
					fragment.append(
						Wikifier.wikifyEval(`You pull up your ${V.worn.under_upper.name} <span class="lewd">and your <<breasts>> flop out.</span>`)
					);
				} else {
					fragment.append(Wikifier.wikifyEval(`You pull up your ${V.worn.under_upper.name}, <span class="lewd">exposing your <<breasts>>.</span>`));
				}
			}
			fragment.append(" ");
			break;
		case "moverlower":
			clearAction("mrest");
			V.worn.over_lower.anus_exposed = 1;
			V.worn.over_lower.vagina_exposed = 1;
			V.worn.over_lower.exposed = 2;
			if (setup.clothes.over_lower[clothesIndex("over_lower", V.worn.over_lower)].skirt) {
				V.worn.over_lower.skirt_down = 0;
				fragment.append(Wikifier.wikifyEval(`You lift up your ${V.worn.over_lower.name}, <span class="lewd">exposing your <<exposedlower>>.</span>`));
			} else {
				V.worn.over_lower.state = "thighs";
				fragment.append(Wikifier.wikifyEval(`You pull down your ${V.worn.over_lower.name}, <span class="lewd">exposing your <<exposedlower>>.</span>`));
			}
			fragment.append(" ");
			break;
		case "mlower":
			clearAction("mrest");
			V.worn.lower.anus_exposed = 1;
			V.worn.lower.vagina_exposed = 1;
			V.worn.lower.exposed = 2;
			if (setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt) {
				V.worn.lower.skirt_down = 0;
				fragment.append(Wikifier.wikifyEval(`You lift up your ${V.worn.lower.name}, <span class="lewd">exposing your <<undies>>.</span>`));
			} else {
				V.worn.lower.state = "thighs";
				fragment.append(Wikifier.wikifyEval(`You pull down your ${V.worn.lower.name}, <span class="lewd">exposing your <<undies>>.</span>`));
			}
			fragment.append(" ");
			break;
		case "munder":
			clearAction("mrest");
			V.worn.under_lower.anus_exposed = 1;
			V.worn.under_lower.vagina_exposed = 1;
			V.worn.under_lower.state = "thighs";
			V.worn.under_lower.exposed = 2;
			fragment.append(Wikifier.wikifyEval(`You pull down your ${V.worn.under_lower.name}, <span class="lewd">exposing your <<genitals>>.</span>`));
			fragment.append(" ");
			break;
	}
	if (V[armAction] === 0) return fragment;

	// Action Corrections
	if (V.mouth === "mpenis" || V.mouthaction === "mpenistakein" || V.mouthaction === "mpenissuck") {
		// If your mouth is on your penis, your hands should not have access to your glans
		if (V[armAction] === "mpenisglans") {
			V[armAction] = "mpenisshaft";
			if (doubleAction) V[otherArmAction] = "mpenisshaft";
		}
	}
	if (V.vaginaaction === "mpenisflowerpenetrate" || V.vaginause === "mpenisflowerpenetrate") {
		// If the player vaginally penetrates the phallus flower
		if (V[armAction] === "mvagina") {
			if (V.player.penisExist) {
				V[armAction] = "mvaginarub";
				if (doubleAction) V[otherArmAction] = "mvaginarub";
			} else {
				V[armAction] = "mvaginaclit";
				if (doubleAction) V[otherArmAction] = "mvaginaclit";
			}
		}
		if (V.mouthaction === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
		}
		if (V.mouth === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
			V.mouth = 0;
			fragment.append(span("You move your mouth away from your pussy."));
		}
		if (V[armAction] === "mvaginatease") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("You remove your fingers from your vagina."));
			} else {
				fragment.append(span("You remove your finger from your vagina."));
			}
			fragment.append(" ");
		}
	}
	if (V.anusaction === "mpenisflowerpenetrate" || V.anususe === "mpenisflowerpenetrate") {
		// If the player anally penetrates the phallus flower
		if (V[armAction] === "manus") {
			V[armAction] = "manusrub";
			if (doubleAction) V[otherArmAction] = "manusrub";
		}
		if (V[armAction] === "manustease" || V[armAction] === "manusprostate") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("You remove your fingers from your anus."));
			} else {
				fragment.append(span("You remove your finger from your anus."));
			}
			fragment.append(" ");
		}
	}
	if (V.ballssize <= 0 && ((V[arm + "arm"] === "mballs" && V[otherArm + "arm"] === "mballs") || (doubleAction && V[armAction] === "mballsentrance"))) {
		// Tiny balls are too small for both hands
		V.rightactiondefault = "mrest";
		V.rightaction = 0;
		V.rightarm = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mpickupdildo" && V[otherArmAction] === "mpickupdildo" && V.selectedToyLeft === V.selectedToyRight) {
		// The player can only pick up a toy with one hand
		V.rightaction = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mvagina" && doubleAction) {
		// The player can only finger themself with one hand
		V.rightaction = "mvaginarub";
		doubleAction = false;
	}

	// The player can decided to put in more than 1 finger at once
	if (["mvaginafingerstarttwo", "mvaginafingeraddtwo"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 2;
		V[armAction] = V[armAction] === "mvaginafingeraddtwo" ? "mvaginafingeradd" : "mvagina";
	} else if (["mvaginafingeradd", "mvagina"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 1;
	}

	if (V[armAction] === "mrest") return fragment;
	// End of Action Corrections

	// Action setup
	const handsOn = doubleAction ? 2 : 1;
	const altText = {};

	wikifier("ballsize");
	let balls = T.text_output + " ";
	wikifier("testicles");
	balls += T.text_output;

	// Dealing with the players actions
	switch (V[armAction]) {
		case "msemencover":
			clearAction("mrest");
			fragment.append(span("You gather some of your semen and rub it between your fingers."));
			V[arm + "FingersSemen"] = 1;
			if (doubleAction) V[otherArm + "FingersSemen"] = 1;
			wikifier("arousal", 100, "masturbation");
			break;
		case "mchest":
			clearAction();
			wikifier("playWithBreasts", handsOn);
			wikifier("milkvolume", handsOn);
			wikifier("arousal", 100 * handsOn, "masturbationBreasts");

			// The text output currently does not care which hand is used or if both hands are used
			if (V.worn.over_upper.exposed >= 2 && V.worn.upper.exposed >= 2 && V.worn.under_upper.exposed >= 1) {
				wikifier("arousal", 100 * handsOn, "masturbationBreasts");
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"You tease your sensitive nipples as much as you can stand, each brush of your fingers sending jolts of excitement through you."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							Wikifier.wikifyEval(
								"You fondle your <<breasts>> while circling your fingers around the areola, occasionally giving your nipples a little tweak."
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval("You stroke your <<breasts>> and rub your nipples between your fingers, feeling the lewd warmth grow.")
						);
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							Wikifier.wikifyEval(
								"You cup your <<breasts>> and tease your sensitive nipples as much as you can stand, each brush of your fingers sending jolts of excitement through you."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							Wikifier.wikifyEval(
								"You fondle your <<breasts>> while circling your fingers around the areola, occasionally giving your nipples a little tweak."
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval("You stroke your <<breasts>> and rub your nipples between your fingers, feeling the lewd warmth grow.")
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							Wikifier.wikifyEval(
								"You cup your <<breasts>> and tease your sensitive nipples as much as you can stand. Each brush of your fingers sends jolts of excitement through you."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							Wikifier.wikifyEval(
								"You fondle your <<breasts>> while circling your fingers around the areola, occasionally giving your nipples a little tweak."
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval("You stroke your <<breasts>> and rub your nipples between your fingers, feeling the lewd warmth grow.")
						);
					}
				}
			} else {
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							Wikifier.wikifyEval(
								"Your <<nipples>> stand erect against the fabric of your <<top>>, straining for attention. You tweak and tease them as much as you can bear."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(Wikifier.wikifyEval("You fondle your <<breasts>> and tweak your nipples through your <<top>>."));
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								"You stroke your <<breasts>> and rub your nipples between your fingers. It feels good, even with your <<topaside>> in the way."
							)
						);
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							Wikifier.wikifyEval(
								"Your nipples stand erect against the fabric of your <<top>>, straining for attention. You cup your <<breasts>> and play with your sensitive buds as much as you can bear."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(Wikifier.wikifyEval("You fondle your <<breasts>> and tweak your nipples through your <<top>>."));
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								"You stroke your <<breasts>> and rub your nipples between your fingers. It feels good, even with your <<topaside>> in the way."
							)
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							Wikifier.wikifyEval(
								"Your nipples stand erect against the fabric of your <<top>>, straining for attention. You cup your <<breasts>> and play with your sensitive buds as much as you can bear."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(Wikifier.wikifyEval("You fondle your <<breasts>> and tweak your nipples through your <<top>>."));
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								"You stroke your <<breasts>> and rub your nipples between your fingers. It feels good, even with your <<topaside>> in the way."
							)
						);
					}
				}
			}
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("Milk leaks from your buds, flowing into your top", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", "You should remove your top if you want to gather any."));
					} else {
						fragment.append(span("Milk leaks from your buds.", "lewd"));
					}
					wikifier("breastfeed", handsOn);
				} else {
					fragment.append(span("No milk leaks from your buds. You must be dry."));
				}
			}
			break;
		case "mchastity":
			clearAction();
			fragment.append(
				Wikifier.wikifyEval(
					`You try to dig your fingers beneath your ${V.worn.genitals.name}, but to no avail. Your <<genitals 1>> aches for your touch, but there's nothing you can do.<<gstress>>`
				)
			);
			wikifier("stress", handsOn);
			break;
		case "mpenisentrance":
			clearAction("mpenisglans");
			V[arm + "arm"] = "mpenisentrance";
			if (doubleAction) V[otherArm + "arm"] = "mpenisentrance";

			wikifier("arousal", 100 * handsOn, "masturbationGenital");
			// The text output currently does not care which hand is used or if both hands are used
			if (!V.worn.over_lower.vagina_exposed) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You run your fingers over your <<penis>>, feeling the bulge beneath your ${V.worn.over_lower.name}.</span>`
					)
				);
			} else if (!V.worn.lower.vagina_exposed) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You run your fingers over your <<penis>>, feeling the bulge beneath your ${V.worn.lower.name}.</span>`
					)
				);
			} else if (!V.worn.under_lower.vagina_exposed) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You run your fingers over your <<penis>>, feeling the bulge beneath your ${V.worn.under_lower.name}.</span>`
					)
				);
			} else {
				fragment.append(Wikifier.wikifyEval('<span class="blue">You run your fingers over your <<penis>> and shiver in anticipation.</span>'));
			}
			break;
		case "mpenisglans":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			if (handsOn === 2) {
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span("You rub your virgin foreskin with increasing speed. Strange feelings emanate from the tip and through your body.")
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span("You rub your virgin foreskin with your thumb and play with the tip. It's sensitive even though you can't pull it back.")
						);
					} else {
						fragment.append(span("You hold your tip of your virgin penis in your palm and gently rub the foreskin with your thumb."));
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(span("You retract and relax your foreskin, rubbing it over your glans again and again."));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("You rub your foreskin against your glans and tease your frenulum."));
					} else {
						fragment.append(Wikifier.wikifyEval("You hold your <<penis>> in your palm and rub your foreskin against your glans."));
					}
				}
			} else {
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span("You rub your virgin foreskin with increasing speed. Strange feelings emanate from the tip and through your body.")
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span("You rub your virgin foreskin with your thumb and play with the tip. It's sensitive even though you can't pull it back.")
						);
					} else {
						fragment.append(span("You hold your tip of your virgin penis in your palm and gently rub the foreskin with your thumb."));
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(span("You retract and relax your foreskin, rubbing it over your glans again and again."));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("You rub your foreskin against your glans and tease your frenulum."));
					} else {
						fragment.append(Wikifier.wikifyEval("You hold your <<penis>> in your palm and rub your foreskin against your glans."));
					}
				}
			}
			break;
		case "mpenisshaft":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			if (handsOn === 2) {
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(span("You run your fingers up and down your virgin penis as roughly as your foreskin will allow."));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("You run your fingers up and down the length of your virgin penis."));
					} else {
						fragment.append(Wikifier.wikifyEval("You run your fingers against the underside of your <<penis>>, enjoying the sensation."));
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(Wikifier.wikifyEval("You pump up and down the length of your <<penis>>."));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("You run your fingers up and down your shaft, tickling slightly and generating a lewd warmth."));
					} else {
						fragment.append(Wikifier.wikifyEval("You gently caress the length of your <<penis>>."));
					}
				}
			} else {
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(span("You run your fingers up and down your virgin penis as roughly as your foreskin will allow."));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("You run your fingers up and down the length of your virgin penis."));
					} else {
						fragment.append(Wikifier.wikifyEval("You run your fingers against the underside of your <<penis>>, enjoying the sensation."));
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(Wikifier.wikifyEval("You pump up and down the length of your <<penis>>."));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("You run your fingers up and down your shaft, tickling slightly and generating a lewd warmth."));
					} else {
						fragment.append(Wikifier.wikifyEval("You gently caress the length of your <<penis>>."));
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You move your hands away from your <<penis>>.</span>'));
			} else {
				fragment.append(Wikifier.wikifyEval(`<span class="lblue">You move your ${arm} hand away from your <<penis>>.</span>`));
			}
			break;
		case "mballsstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("You move your hands away from your balls.", "lblue"));
			} else {
				fragment.append(span(`You move your ${arm} hand away from your balls.`, "lblue"));
			}
			break;
		case "mballsfondle":
			clearAction();
			wikifier("arousal", 100 * handsOn, "masturbationPenis");
			additionalEffect.hands = "ballplayeffects";
			if (handsOn === 2) {
				if (V.arousal >= V.arousalmax * (4 / 5)) {
					fragment.append(
						span(
							`You grope your ${balls} with both of your hands and enjoy the feeling of tightness as they clench up against the base of your penis.`
						)
					);
				} else if (V.arousal >= V.arousalmax * (3 / 5)) {
					fragment.append(span(`You fondle your ${balls} with both of your hands and enjoy the tickling feeling.`));
				} else if (V.arousal >= V.arousalmax * (2 / 5)) {
					fragment.append(span(`You jiggle your ${balls} around in your hands and enjoy the feeling of gravity on them.`));
				} else {
					fragment.append(span(`You roll your ${balls} around in your hands.`));
				}
			} else {
				altText.oneOfYour = V.ballssize <= 0 ? `both of your ${balls}` : additionalEffect.hands ? "the other" : `one of your ${balls}`;
				if (V.arousal >= V.arousalmax * (4 / 5)) {
					fragment.append(
						Wikifier.wikifyEval(
							`You grope ${altText.oneOfYour} with your ${arm} and enjoy the feeling of tightness as your balls clench up against the base of your <<penis>>.`
						)
					);
				} else if (V.arousal >= V.arousalmax * (3 / 5)) {
					fragment.append(span(`You fondle ${altText.oneOfYour} with your ${arm} and enjoy the tickling feeling.`));
				} else if (V.arousal >= V.arousalmax * (2 / 5)) {
					fragment.append(span(`You jiggle ${altText.oneOfYour} in your ${arm} and enjoy the feeling of gravity on it.`));
				} else {
					fragment.append(span(`You stroke ${altText.oneOfYour} with your ${arm}.`));
				}
			}
			break;
		case "mballssqueeze":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			additionalEffect.hands = "ballplayeffects";
			altText.gently = V.arousal >= V.arousalmax * (4 / 5) ? "urgently" : V.arousal >= V.arousalmax * (3 / 5) ? "" : "gently";
			if (handsOn === 2) {
				switch (V.ballssize) {
					case 1:
					case 2:
						fragment.append(span(`You cup your ${balls} with your hands and ${gently} squeeze them.`));
						break;
					case 3:
						fragment.append(span(`You cup your ${balls} with your hands and ${gently} squeeze them.`));
						break;
					case 4:
						fragment.append(span(`You ${gently} squeeze your ${balls} with your hands.`));
						break;
					default:
						fragment.append(span("This text should be unreachable.", "red"));
						break;
				}
			} else {
				altText.oneOfYour = V.ballssize <= 0 ? `both of your ${balls}` : additionalEffect.hands ? "the other" : `one of your ${balls}`;
				switch (V.ballssize) {
					case 1:
					case 2:
						fragment.append(span(`You cup ${altText.oneOfYour} with your ${arm} and ${gently} squeeze it.`));
						break;
					case 3:
						fragment.append(span(`You cup ${altText.oneOfYour} with your ${arm} and ${gently} squeeze it.`));
						break;
					case 4:
						fragment.append(span(`You cup ${altText.oneOfYour} with your ${arm} and ${gently} squeeze it.`));
						break;
					default:
						fragment.append(span(`You cup your ${balls} with your ${arm} and ${gently} squeeze them.`));
						break;
				}
			}
			break;
		case "mballsentrance":
			clearAction();
			V[arm + "arm"] = "mballs";
			if (doubleAction) V[otherArm + "arm"] = "mballs";
			additionalEffect.hands = "ballplayeffects";
			wikifier("arousal", 100 * handsOn, "masturbationPenis");
			if (handsOn === 2) {
				switch (V.ballssize) {
					case 1:
					case 2:
						fragment.append(span(`You take one of your ${balls} in each hand.`, "blue"));
						break;
					case 3:
						fragment.append(span(`You take one of your ${balls} in each hand. They fill your palms nicely.`, "blue"));
						break;
					case 4:
						fragment.append(span(`You take one of your ${balls} in each hand. You can barely get your hands around them.`, "blue"));
						break;
					default:
						fragment.append(span("This text should be unreachable.", "red"));
						break;
				}
			} else {
				altText.oneOfYour = V.ballssize <= 0 ? `both of your ${balls}` : additionalEffect.hands ? "the other" : `one of your ${balls}`;
				switch (V.ballssize) {
					case 1:
					case 2:
						fragment.append(span(`You take ${altText.oneOfYour} in your ${arm}.`, "blue"));
						break;
					case 3:
						fragment.append(span(`You take ${altText.oneOfYour} in your ${arm}. It fills your palm nicely.`, "blue"));
						break;
					case 4:
						fragment.append(span(`You take ${altText.oneOfYour} in your ${arm}. You can barely get your hand around it.`, "blue"));
						break;
					default:
						fragment.append(span(`You easily grab both of your ${balls} with your ${arm}`, "blue"));
						break;
				}
			}
			break;
		case "mpenisW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} wildly pumps up and down the length of your <<penis>>.`));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`Your ${altText.hands} runs their fingers up and down your shaft, tickling slightly and generating a lewd warmth.`));
			} else {
				fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} caresses the length of your <<penis>> with jerky motions.`));
			}
			break;
		case "mbreastW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationBreasts");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.player.breastsize < 2) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} tease your sensitive nipples more than you can stand, each brush of your fingers sending jolts of excitement through you.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} fondle your <<breasts>> while circling your fingers around the areola, occasionally giving your nipples a little tweak.`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} stroke your <<breasts>> and rub your nipples between your fingers, making a lewd warmth grow.`
						)
					);
				}
			} else if (V.player.breastsize < 5) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} cup your <<breasts>> and tease your sensitive nipples more than you can stand, each brush of your fingers sending jolts of excitement through you.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} fondle your <<breasts>> while circling your fingers around the areola, occasionally giving your nipples a little tweak.`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} stroke your <<breasts>> and rub your nipples between your fingers, making a lewd warmth grow.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} cup your <<breasts>> and tease your sensitive nipples more than you can stand. Each brush of your fingers sends jolts of excitement through you.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} fondle your <<breasts>> while circling your fingers around the areola, occasionally giving your nipples a little tweak.`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`Your ${altText.hands} stroke your <<breasts>> and rub your nipples between your fingers, feeling the lewd warmth grow.`
						)
					);
				}
			}
			if (V.milk_amount >= 1) {
				fragment.append(" ");
				fragment.append(span("Milk leaks from your buds.", "lewd"));
				wikifier(breastfeed, handsOn);
			}
			break;
		case "mvaginaW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				switch (random(1, 3)) {
					case 1:
						fragment.append(Wikifier.wikifyEval(`Your fingers writhe in and out of your <<pussy>>, violating you with sudden, sharp thrusts.`));
						break;
					case 2:
						fragment.append(Wikifier.wikifyEval(`Your clit is rubbed raw between your fingers, refusing to grant even a second for recovery.`));
						break;
					case 3:
						fragment.append(Wikifier.wikifyEval(`Your fingers quake within your <<pussy>>, wracking your whole body with lewd vibrations.`));
						break;
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				switch (random(1, 3)) {
					case 1:
						fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} probe your <<pussy>>, jerking against each other to push through.`));
						break;
					case 2:
						fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} roughly palm your <<pussy>>, one shuddering over the other.`));
						break;
					case 3:
						fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} prod your clitoris in alternation.`));
						break;
				}
			} else {
				switch (random(1, 3)) {
					case 1:
						fragment.append(Wikifier.wikifyEval(`Your fingers tease your <<pussy>>, each one sailing across your slit in succession.`));
						break;
					case 2:
						fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} knead your labia, fingers twitching against your entrance.`));
						break;
					case 3:
						fragment.append(Wikifier.wikifyEval(`Your ${altText.hands} caress your thighs, slowly prying them apart.`));
						break;
				}
			}
			break;
		case "mpenisstopW":
			clearAction();
			if (doubleAction) {
				fragment.append(Wikifier.wikifyEval(`You remove both of your hands from your <<penis>>. They shake.`));
			} else {
				fragment.append(Wikifier.wikifyEval(`You remove your ${arm} hand from your <<penis>>. It shakes.`));
			}
			break;
		case "mbreaststopW":
			clearAction();
			if (doubleAction) {
				fragment.append(Wikifier.wikifyEval(`You remove both of your hands from your <<breasts>>. They shake.`));
			} else {
				fragment.append(Wikifier.wikifyEval(`You remove your ${arm} hand from your <<breasts>>. It shakes.`));
			}
			break;
		case "mvaginastopW":
			clearAction();
			if (doubleAction) {
				fragment.append(Wikifier.wikifyEval(`You remove both of your hands from your <<pussy>>. They shake.`));
			} else {
				fragment.append(Wikifier.wikifyEval(`You remove your ${arm} hand from your <<pussy>>. It shakes.`));
			}
			break;
		case "mpickupdildo":
			// Should not use clearAction()
			V[armAction] = 0;
			V[arm + "arm"] = "mpickupdildo";
			wikifier("arousal", 100, "masturbation");

			// Set the current toy
			altText.selectedToy = selectedToy(arm, true);
			altText.toyType = altText.selectedToy.type;
			altText.toy = `${altText.selectedToy.colour || ""} ${altText.selectedToy.name}`;
			// Set the default action
			if (altText.toyType.includes("stroker")) {
				V[armActionDefault] = "mpenisentrancestroker";
			} else if (altText.toyType.includes("breastpump")) {
				V[armActionDefault] = "mbreastpump";
			} else {
				V[armActionDefault] = V.player.vaginaExist ? "mvaginaentrancedildo" : "manusentrancedildo";
			}

			fragment.append(span(`You pick up your ${altText.toy} with your ${arm} hand.`));
			break;
		case "mdildostop":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				fragment.append(span(`You let go of the ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}.`, "lblue"));
			} else {
				fragment.append(span(`You let go of the ${toyDisplay(altText.selectedToy)} in your ${arm} hand.`, "lblue"));
			}
			break;
		case "mpenisentrancestroker":
			if (V.penisuse !== 0 && V.penisuse !== "stroker") {
				clearAction();
				wikifier("arousal", 50 * handsOn, "masturbationPenis");
				V.penisuse = "stroker";
				V[arm + "arm"] = "mpenisentrancestroker";
				altText.selectedToy = selectedToy(arm);
				if (doubleAction) {
					V[arm + "arm"] = "mpenisentrancestroker";
					altText.selectedOtherToy = selectedToy(otherArm);
					if (genitalsExposed) {
						fragment.append(
							Wikifier.wikifyEval(
								`<span class="blue">You run your ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)} over your exposed <<penis>> and shiver in anticipation.</span>`
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								`<span class="blue">You run your ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy
								)} over your <<penis>>, feeling its shape beneath your <<exposedlower>>.</span>`
							)
						);
					}
				} else {
					if (genitalsExposed) {
						fragment.append(
							Wikifier.wikifyEval(
								`<span class="blue">You pick up your ${toyDisplay(
									altText.selectedToy
								)} and run it over your <<penis>>, shivering in anticipation.</span>`
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								`<span class="blue">You pick up your ${toyDisplay(
									altText.selectedToy
								)} and run it over your <<penis>>, feeling its shape beneath your <<exposedlower>>.</span>`
							)
						);
					}
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenisstroker":
			clearAction();
			wikifier("arousal", 400, "masturbationPenis");
			V[arm + "arm"] = "mpenisstroker";
			V.penisuse = "stroker";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mpenisstroker";
				wikifier("arousal", 50, "masturbationPenis");
				altText.selectedOtherToy = selectedToy(otherArm);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You fuck your <<penis>> with the ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)}.</span>`
					)
				);
			} else {
				fragment.append(Wikifier.wikifyEval(`<span class="purple">You fuck your <<penis>> with the ${toyDisplay(altText.selectedToy)}.</span>`));
			}
			break;
		case "mpenisstopstroker":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (!doubleAction && !["mpenisstroker", "mpenisentrancestroker"].includes(V[otherArm + "arm"])) V.penisuse = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				V.penisuse = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You move your ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} away from your <<penis>>.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You move your ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your <<penis>>.</span>`
					)
				);
			}
			break;
		case "mbreastpump":
			clearAction("mbreastpumppump");
			V[arm + "arm"] = "mbreastpump";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mbreastpump";
				altText.selectedOtherToy = selectedToy(otherArm);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You seal your ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)} over your <<breasts>>, preparing to milk them.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You seal your ${toyDisplay(altText.selectedToy)} over your <<breasts>>, preparing to milk them.</span>`
					)
				);
			}
			break;
		case "mbreastpumppump":
			clearAction();
			wikifier("arousal", 100 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 3 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toys = `You attempt to use your ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} on your <<breasts>>,`;
			} else {
				altText.toys = `You attempt to use your ${toyDisplay(altText.selectedToy)} on your <<breasts>>,`;
			}
			if (V.lactating === 1 && V.breastfeedingdisable === "f") {
				if (V.milk_amount >= 1) {
					fragment.append(Wikifier.wikifyEval(`${altText.toys} <span class="lewd">and milk flows from your buds into the bottle.</span>`));
					wikifier("breastfeed", Math.floor(handsOn * 2.5));
				} else {
					fragment.append(Wikifier.wikifyEval(`${altText.toys} but no milk flows from your buds. You must be dry.`));
				}
			} else {
				fragment.append(Wikifier.wikifyEval(`${altText.toys} but no milk flows from your buds. You must not be producing milk yet.`));
				if ((!V.daily.lactatingPressure || V.daily.lactatingPressure <= 5) && random(0, 100) >= 90) {
					if (!V.daily.lactatingPressure) V.daily.lactatingPressure = 0;
					V.daily.lactatingPressure++;
					wikifier("milkvolume", handsOn);
				}
			}
			break;
		case "mstopbreastpump":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You move your ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} away from your <<breasts>>.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You move your ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your <<breasts>>.</span>`
					)
				);
			}
			break;
		case "mchestvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 2 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				altText.hands = "both hands";
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				altText.hands = `your ${arm} hand`;
			}
			if (breastsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationNipples");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`Your nipples stand erect despite the ${altText.toyDisplay} being rubbed against them as hard as you can stand, vibrations sending a constant feeling of pleasure through you.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`You rub your ${altText.toyDisplay} against your hardening nipples with ${altText.hands}.`));
				} else {
					fragment.append(
						span(
							`You press your ${altText.toyDisplay} against your nipples with ${altText.hands}, feeling the lewd warmth grow as it continues to vibrate.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						Wikifier.wikifyEval(
							`Your nipples stand erect against your <<topaside>>, despite the ${altText.toyDisplay} being rubbed against them through the fabric.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						Wikifier.wikifyEval(
							`You rub your ${altText.toyDisplay} against your hardening nipples through your <<topaside>> with ${altText.hands}.`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`You press your ${altText.toys} against your nipples with ${altText.hands}. It feels good, even with your <<topaside>> in the way.`
						)
					);
				}
			}
			break;
		case "mpenisvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							Wikifier.span(`You rub your vibrating ${altText.toyDisplay} up and down your virgin penis as roughly as your foreskin will allow.`)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							Wikifier.span(`You rub your ${altText.toyDisplay} up and down your virgin penis, its vibrations quickly making you aroused.`)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								`You gently hold your vibrating ${altText.toyDisplay} against the underside of your <<penis>>, enjoying the sensation.`
							)
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(Wikifier.wikifyEval(`You rub your vibrating ${altText.toyDisplay} up and down your <<penis>>.`));
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							Wikifier.wikifyEval(
								`You rub your ${altText.toyDisplay} up and down your <<penis>>, its vibrations generating a quickly-growing lewd warmth.`
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								`You hold your vibrating ${altText.toyDisplay} against the underside of your <<penis>>, enjoying the sensation.`
							)
						);
					}
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(Wikifier.wikifyEval(`You rub your ${altText.toyDisplay} up and down your <<penis>> through your <<bottomaside>>.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						Wikifier.wikifyEval(
							`You rub your ${altText.toyDisplay} up and down your <<penis>>, its vibrations quickly making you aroused even through your <<bottomaside>>.`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`You gently hold your ${altText.toyDisplay} against the underside of your <<penis>>, enjoying the sensation despite your <<bottomaside>> being in the way.`
						)
					);
				}
			}
			break;
		case "mvaginaclitvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You gently press your ${altText.toyDisplay} against your <<clit>>, the vibrations combined with the sensation of the insects crawling around within you making your toes curl.</span>`
					)
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `You gently press your ${altText.toyDisplay} against your <<clit>>,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						altText.gag = V.worn.face.name;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = selectedToy("left").name;
					} else {
						altText.gag = selectedToy("right").name;
					}
					fragment.append(
						Wikifier.wikifyEval(`${altText.start} the soft moans elicited by the sensation muffled by the ${altText.gag} obstructing your mouth.`)
					);
				} else {
					fragment.append(Wikifier.wikifyEval(`${altText.start} moaning softly at the sensation.`));
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You press your ${altText.toyDisplay} against your <<clit>> through your <<exposedlower>>, enjoying the way it feels even through the fabric.</span>`
					)
				);
			}
			break;
		case "mdildomouthentrance":
			if (V.mouth === 0 && (otherArmAction !== "mdildomouthentrance" || random(0, 100) > 50)) {
				clearAction("mdildomouth");
				V[arm + "arm"] = "mdildomouthentrance";
				V.mouth = "mdildomouthentrance";
				V.mouthactiondefault = "mdildolick";
				wikifier("arousal", 100, "masturbationMouth");
				altText.selectedToy = selectedToy(arm);
				altText.toys = `You bring your ${toyDisplay(altText.selectedToy)} up to your mouth,`;
				if (V.oralskill < 100) {
					fragment.append(span(`${altText.toys} eager for some practice.`));
				} else {
					fragment.append(span(`${altText.toys} enjoying the sensation of it against your lips.`));
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mdildopiston":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			altText.selectedToy = selectedToy(arm);
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (V.oralskill < 100) {
				altText.beginner = altText.selectedToy.name.includes("small")
					? "its modest size perfect for a beginner like you."
					: "careful not to push it in too deep.";
				fragment.append(span(`You carefully move the ${altText.toyDisplay} back and forth in your mouth, ${altText.beginner}`));
			} else if (V.oralskill < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(
					span(`You bob your head back and forth on the ${altText.toyDisplay}, enjoying the sensation of it rubbing against your lips and tongue.`)
				);
			} else {
				wikifier("arousal", 200, "masturbationOral");
				fragment.append(
					span(
						`You skilfully lick and tease the ${altText.toyDisplay} as you quickly bob your head back and forth along it, reveling in the lewd sensations it provides.`
					)
				);
			}
			break;
		case "mdildomouth":
			clearAction("mdildopiston");
			wikifier("arousal", 200, "masturbationOral");
			V[arm + "arm"] = "mdildomouth";
			V.mouth = "mdildomouth";
			if (V.mouthactiondefault === "mdildokiss") V.mouthactiondefault = "mdildosuck";
			if (V.mouthaction === "mdildokiss") V.mouthaction = "mdildosuck";
			altText.selectedToy = selectedToy(arm);
			fragment.append(
				span(
					`You take the ${toyDisplay(altText.selectedToy)} into your mouth, briefly running your tongue along it as you thrust it between your lips.`
				)
			);
			break;
		case "mvaginaentrance":
			clearAction(V.player.penisExist ? "mvaginarub" : "mvaginaclit");
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			V[arm + "arm"] = "mvaginaentrance";
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrance";
			}
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (genitalsExposed() && V.bugsinside) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You run your ${altText.fingers} over your exposed <<pussy>>, and feel some bugs running around.</span>`
					)
				);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				fragment.append(
					Wikifier.wikifyEval(`<span class="blue">You run your ${altText.fingers} over your exposed <<pussy>> and shiver in anticipation.</span>`)
				);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You run your ${altText.fingers} over your <<pussy>>, feeling its shape beneath your <<exposedlower>>.</span>`
					)
				);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvagina":
			V.fingersInVagina += V.mVaginaFingerAdd;
			clearAction(
				V.mVaginaFingerAdd === 2 && V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4 ? "mvaginafingeraddtwo" : "mvaginafingeradd"
			);
			V[arm + "arm"] = "mvagina";
			wikifier("arousal", V.mVaginaFingerAdd === 2 ? 250 : 200, "masturbationVagina");
			wikifier("addVaginalWetness", 1);
			altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? " semen-lubricated" : "";
			altText.finger = V.mVaginaFingerAdd === 2 ? `two${altText.lubricated} fingers` : `a${altText.lubricated} finger`;
			if (hymenIntact) {
				fragment.append(
					Wikifier.wikifyEval(`<span class="purple">You push ${altText.finger}  into your <<pussy>> until you poke your unblemished hymen.</span>`)
				);
			} else if (V.bugsinside) {
				fragment.append(
					Wikifier.wikifyEval(`<span class="purple">You push ${altText.finger}  into your <<pussy>>. You feel insects crawling inside.</span>`)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(`<span class="purple">You push ${altText.finger} into your <<pussy>> which parts to allow the intrusion.</span>`)
				);
			}
			fragment.append(fingersEffect(span, hymenIntact));
			break;
		case "mvaginafingeradd":
			V.fingersInVagina += V.mVaginaFingerAdd;
			if (V.fingersInVagina === 4 && V.vaginaFingerLimit === 5) {
				clearAction("mvaginafistadd");
			} else if (V.fingersInVagina === V.vaginaFingerLimit) {
				clearAction("mvaginatease");
			} else {
				clearAction(V.mVaginaFingerAdd === 2 && V.fingersInVagina + 2 <= Math.min(4, V.vaginaFingerLimit) ? "mvaginafistadd2" : "mvaginafistadd");
			}
			wikifier("addVaginalWetness", V.fingersInVagina);
			wikifier("arousal", 200 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? " semen-lubricated" : "";
			altText.finger = V.mVaginaFingerAdd === 2 ? `two more${altText.lubricated} fingers` : `another ${altText.lubricated} finger`;

			if (V.bugsinside === 1) {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					Wikifier.wikifyEval(
						`<span class="lblue">You gasp as you fit one last ${altText.lubricated} finger inside yourself. You feel insects crawling inside.</span>`
					);
				} else {
					Wikifier.wikifyEval(
						`<span class="lblue">You stretch yourself further as you push ${altText.finger} into your <<pussy>>. You feel insects crawling inside.</span>`
					);
				}
			} else {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					Wikifier.wikifyEval(`<span class="lblue">You gasp as you fit one last ${altText.lubricated} finger inside yourself.</span>`);
				} else {
					Wikifier.wikifyEval(`<span class="lblue">You stretch yourself further as you push ${altText.finger} into your <<pussy>>.</span>`);
				}
			}
			fragment.append(fingersEffect(span, hymenIntact));
			break;
		case "mvaginafistadd":
			clearAction("mvaginafist");
			V.fingersInVagina = 5;
			V[arm + "arm"] = "mvaginafist";
			V.vaginastate = "penetrated";
			wikifier("arousal", 650, "masturbationVagina");
			fragment.append(
				Wikifier.wikifyEval(
					`<span class="lblue">With a final push, you're able to shove all five fingers into your pussy.</span> You feel your muscles part for the intrusion and pulse around your hand.`
				)
			);
			break;
		case "mvaginatease":
			clearAction();
			wikifier("arousal", 300 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.fingers = V.fingersInVagina === 1 ? "finger" : "fingers";
			wikifier("addVaginalWetness", V.fingersInVagina);
			if (V.bugsinside) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						fragment.append(
							Wikifier.wikifyEval(
								`You pump <<number $fingersInVagina>> ${altText.fingers} in and out of your <<pussy>>, coaxing out lewd fluid, along with some bugs and insects.`
							)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								`You pump <<number $fingersInVagina>> ${altText.fingers} in and out of your <<pussy>>, coaxing out some bugs and insects.`
							)
						);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					fragment.append(
						Wikifier.wikifyEval(
							`You push <<number $fingersInVagina>> ${altText.fingers} in and out of your <<pussy>>, feeling the insects and bugs inside of you.`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`You gently fuck the entrance of your <<pussy>> with <<number $fingersInVagina>> ${altText.fingers}, pushing some of the bugs around.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						fragment.append(
							Wikifier.wikifyEval(`You pump <<number $fingersInVagina>> ${altText.fingers} in and out of your <<pussy>>, coaxing out lewd fluid.`)
						);
					} else {
						fragment.append(
							Wikifier.wikifyEval(
								`You pump <<number $fingersInVagina>> ${altText.fingers} in and out of your <<pussy>>, pushing as deep as you can reach.`
							)
						);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					fragment.append(
						Wikifier.wikifyEval(
							`You push <<number $fingersInVagina>> ${altText.fingers} in and out of your <<pussy>>, feeling a thrill even without going too deep.`
						)
					);
				} else {
					fragment.append(Wikifier.wikifyEval(`You gently fuck the entrance of your <<pussy>> with <<number $fingersInVagina>> ${altText.fingers}.`));
				}
			}
			break;
		case "mvaginafist":
			clearAction();
			wikifier("arousal", 500, "masturbationVagina");
			wikifier("addVaginalWetness", 5);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					wikifier("vaginaFluidActive");
					fragment.append(Wikifier.wikifyEval(`You forcibly pound your tingling <<pussy>> with your entire hand. Your fluids drip down your wrist.`));
				} else {
					fragment.append(Wikifier.wikifyEval(`You forcibly pound your tingling <<pussy>> with your entire hand.`));
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				fragment.append(Wikifier.wikifyEval(`You thrust your entire hand inside your <<pussy>>. Your inner walls twitch around it.`));
			} else {
				fragment.append(Wikifier.wikifyEval(`You gently move your fist inside your <<pussy>>, feeling your muscles repeatedly stretch around it.`));
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span(`You press down on your clit with your thumb and rub it in a circular motion, feeling your arousal build.`));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`You tease the tip of your clit with your ${altText.fingers}.`));
			} else {
				fragment.append(span(`You rub your clit with your ${altText.fingers}, developing a lewd feeling.`));
			}
			break;
		case "mvaginarub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (genitalsExposed() && V.bugsinside) {
				fragment.append(Wikifier.wikifyEval(`You run your ${altText.fingers} over your exposed <<pussy>>, and feel some bugs running around.`));
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				fragment.append(Wikifier.wikifyEval(`You run your ${altText.fingers} over your exposed <<pussy>> and shiver in anticipation.`));
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				fragment.append(Wikifier.wikifyEval(`You run your ${altText.fingers} over your <<pussy>>, feeling its shape beneath your <<exposedlower>>.`));
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.fingersInVagina = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You move your hands away from your <<pussy>>.</span>'));
			} else {
				fragment.append(Wikifier.wikifyEval(`<span class="lblue">You move your ${arm} hand away from your <<pussy>>.</span>`));
			}
			break;
		case "mvaginafingerremove":
			V.fingersInVagina -= 1;
			if (V.fingersInVagina >= 1) {
				clearAction();
				V[arm + "arm"] = "mvagina";
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You take one finger out of your <<pussy>>.</span>'));
			} else {
				clearAction("mvaginarub");
				V[arm + "arm"] = "mvaginaentrance";
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You take your finger out of your <<pussy>>.</span>'));
			}
			break;
		case "mvaginafistremove":
			clearAction("mvaginarub");
			V[arm + "arm"] = "mvaginaentrance";
			V.fingersInVagina = 0;
			V.vaginastate = 0;
			wikifier("arousal", 1000, "masturbationVagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					Wikifier.wikifyEval(
						'<span class="lblue">You slide your whole hand out of your <<pussy>>. You feel your muscles twitching in protest as fluids drip out.</span>'
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You slide your whole hand out of your <<pussy>>, leaving you feeling empty.</span>'));
			} else {
				fragment.append(
					Wikifier.wikifyEval('<span class="lblue">You slide your whole hand out of your <<pussy>>. You feel your muscles relax.</span>')
				);
			}
			break;
		case "mvaginaentrancedildo":
			clearAction("mvaginadildo");
			V[arm + "arm"] = "mvaginaentrancedildo";
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (genitalsExposed()) {
				wikifier("addVaginalWetness", 2 * handsOn);
				fragment.append(
					Wikifier.wikifyEval(`<span class="blue">You run your ${altText.toyDisplay} over your exposed <<pussy>> and shiver in anticipation.</span>`)
				);
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You run your ${altText.toyDisplay} over your <<pussy>>, feeling its shape beneath your <<exposedlower>>.</span>`
					)
				);
			}
			break;
		case "mvaginadildo":
			clearAction("mvaginateasedildo");
			V[arm + "arm"] = "mvaginadildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginadildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "semen-lubricated" : "";
			} else {
				altText.lubricated = V[arm + "FingersSemen"] >= 1 ? "semen-lubricated" : "";
			}
			wikifier("arousal", 150 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 1);
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);

			if (hymenIntact) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You push the ${altText.lubricated} ${altText.toyDisplay} into your <<pussy>> until you poke your unblemished hymen.</span>`
					)
				);
			} else if (V.bugsinside) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You push the ${altText.lubricated} ${altText.toyDisplay} into your <<pussy>>. You feel insects crawling inside.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You push the ${altText.lubricated} ${altText.toyDisplay} into your <<pussy>> which parts to allow the intrusion.</span>`
					)
				);
			}
			break;
		case "mvaginateasedildo":
			clearAction();
			altText.selectedToy = selectedToy(arm);
			altText.toyPleasure = 2 + (selectedToy.type.includes("vibrator") ? 5 : 3);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyPleasure += selectedOtherToy.type.includes("vibrator") ? 5 : 3;
			}
			wikifier("arousal", 300 + 50 * altText.toyPleasure, "masturbationVagina");
			wikifier("addVaginalWetness", altText.toyPleasure);

			altText.wet = "";
			if (V.vaginaArousalWetness >= 40) {
				altText.wet = "wet ";
			} else if (V.vaginaArousalWetness >= 20) {
				altText.wet = "slick ";
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					fragment.append(
						Wikifier.wikifyEval(`You pump your ${altText.toyDisplay} in and out of your ${altText.wet} <<pussy>>, coaxing out lewd fluid.`)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`You pump your ${altText.toyDisplay} in and out of your ${altText.wet} <<pussy>>, pushing as deep as you can reach.`
						)
					);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				fragment.append(
					Wikifier.wikifyEval(
						`You push your ${altText.toyDisplay} in and out of your ${altText.wet} <<pussy>>, feeling a thrill even without going too deep.`
					)
				);
			} else {
				fragment.append(Wikifier.wikifyEval(`You gently fuck the entrance of your ${altText.wet} <<pussy>> with your ${altText.toyDisplay}.`));
			}
			break;
		case "mvaginaclitdildo":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(`You gently brush the top of your clit with your ${altText.toyDisplay}, but it becomes harder to do as you become more sensitive.`)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`You tease the tip of your clit with your ${altText.toyDisplay}.`));
				} else {
					fragment.append(span(`You rub your clit with your ${altText.toyDisplay}, developing a lewd feeling.`));
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`You press down on your clit with your ${toyDisplay(
								altText.selectedToy
							)} and rub it in a circular motion, feeling your arousal build.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`You tease the tip of your clit with your ${toyDisplay(altText.selectedToy)}y.`));
				} else {
					fragment.append(span(`You rub your clit with your ${toyDisplay(altText.selectedToy)}, developing a lewd feeling.`));
				}
			}
			break;
		case "mvaginastopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="lblue">You move the ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} away from your <<pussy>>.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="lblue">You move the ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your <<pussy>>.</span>`
					)
				);
			}
			break;
		case "manusentrance":
			clearAction("manusrub");
			wikifier("arousal", 100 * handsOn, "masturbationAss");
			V[arm + "arm"] = "manusentrance";
			if (doubleAction) V[otherArm + "arm"] = "manusentrance";
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (genitalsExposed()) {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You reach down to your exposed <<bottom>> and gently press a ${altText.fingers} against your anus.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="blue">You reach down to your <<bottom>> and gently press a ${altText.fingers} against your anus through your <<exposedlower>>.</span>`
					)
				);
			}
			break;
		case "manus":
			clearAction("manustease");
			wikifier("arousal", 100 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manus";
			if (doubleAction) {
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "semen-lubricated" : "";
				V[otherArm + "arm"] = "manus";
				fragment.append(Wikifier.wikifyEval(`<span class="purple">You push two ${altText.lubricated} fingers into your <<bottom>>.</span>`));
			} else {
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? " semen-lubricated" : "";
				fragment.append(Wikifier.wikifyEval(`<span class="purple">You push a ${altText.lubricated} finger into your <<bottom>>.</span>`));
			}
			break;
		case "manusrub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			switch (random(0, 2)) {
				case 0:
					fragment.append(Wikifier.wikifyEval(`You keep your ${altText.fingers} pressed between your <<bottom>> cheeks and gently prod your anus.`));
					break;
				case 1:
					fragment.append(span(`You rub your anus in a circular motion.`));
					break;
				case 2:
					fragment.append(span(`You push your ${altText.fingers} against your anus. You feel it open a little bit.`));
					break;
			}
			break;
		case "manustease":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			switch (random(0, 2)) {
				case 0:
					fragment.append(Wikifier.wikifyEval(`You gently explore inside your <<bottom>> with your ${altText.fingers}.`));
					break;
				case 1:
					fragment.append(span(`You slowly push your ${altText.fingers} into and out of your anus.`));
					break;
				case 2:
					fragment.append(
						Wikifier.wikifyEval(`You fuck your <<bottom>> with your ${altText.fingers}. You feel naughty about playing with such a place.`)
					);
					break;
			}
			break;
		case "manusprostate":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationAnal");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You stroke your prostate, milking it of semen and making you shudder."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You press against your prostate, causing an almost unbearably pleasurable feeling of vulnerability."));
			} else {
				fragment.append(span("You gently prod your prostate, each poke sending a wave of pleasure through your body."));
			}
			break;
		case "manusstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(Wikifier.wikifyEval(`<span class="purple">You move your hands away from your <<bottom>>.</span>`));
			} else {
				fragment.append(Wikifier.wikifyEval(`<span class="purple">You move your ${arm} hand away from your <<bottom>>.</span>`));
			}
			break;
		case "manusentrancedildo":
			clearAction("manusrubdildo");
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusentrancedildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "manusentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (genitalsExposed()) {
					fragment.append(
						Wikifier.wikifyEval(
							`<span class="blue">You reach down to your exposed <<bottom>> and gently press your ${altText.toyDisplay} against your anus.</span>`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`<span class="blue">You reach down to your <<bottom>> and gently press your ${altText.toyDisplay} against your anus through your <<exposedlower>>.</span>`
						)
					);
				}
			} else {
				if (genitalsExposed()) {
					fragment.append(
						Wikifier.wikifyEval(
							`<span class="blue">You reach down to your exposed <<bottom>> and gently press your ${toyDisplay(
								altText.selectedToy
							)} against your anus.</span>`
						)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`<span class="blue">You reach down to your <<bottom>> and gently press your ${toyDisplay(
								altText.selectedToy
							)} against your anus through your <<exposedlower>>.</span>`
						)
					);
				}
			}
			break;
		case "manusdildo":
			clearAction("manusteasedildo");
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusdildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? " semen-lubricated" : "";
				V[otherArm + "arm"] = "manusdildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You push your ${altText.lubricated} ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy
						)} into your <<bottom>>.</span>`
					)
				);
			} else {
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? " semen-lubricated" : "";
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You push your${altText.lubricated} ${toyDisplay(altText.selectedToy)} into your <<bottom>>.</span>`
					)
				);
			}
			break;
		case "manusrubdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						fragment.append(Wikifier.wikifyEval(`You keep your ${altText.toyDisplay} between your <<bottom>> cheeks and gently prod your anus.`));
						break;
					case 1:
						fragment.append(Wikifier.wikifyEval(`You rub your anus in a circular motion with your ${altText.toyDisplay}.`));
						break;
					case 2:
						fragment.append(Wikifier.wikifyEval(`You push your ${altText.toyDisplay} against your anus. You feel it open a little bit.`));
						break;
				}
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				switch (random(0, 2)) {
					case 0:
						fragment.append(
							Wikifier.wikifyEval(
								`You keep your ${toyDisplay(altText.selectedToy)} pressed between your <<bottom>> cheeks and gently prod your anus.`
							)
						);
						break;
					case 1:
						fragment.append(Wikifier.wikifyEval(`You rub your anus in a circular motion with your ${toyDisplay(altText.selectedToy)}.`));
						break;
					case 2:
						fragment.append(
							Wikifier.wikifyEval(`You push your ${toyDisplay(altText.selectedToy)} against your anus. You feel it open a little bit.`)
						);
						break;
				}
			}
			break;
		case "manusteasedildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						fragment.append(Wikifier.wikifyEval(`You gently explore inside your <<bottom>> with your ${altText.toyDisplay}.`));
						break;
					case 1:
						fragment.append(Wikifier.wikifyEval(`You slowly push your ${altText.toyDisplay} into and out of your anus.`));
						break;
					case 2:
						fragment.append(
							Wikifier.wikifyEval(`You fuck your <<bottom>> with your ${altText.toyDisplay}. You feel naughty about playing with such a place.`)
						);
						break;
				}
			} else {
				switch (random(0, 2)) {
					case 0:
						fragment.append(Wikifier.wikifyEval(`You gently explore inside your <<bottom>> with your ${toyDisplay(altText.selectedToy)}.`));
						break;
					case 1:
						fragment.append(Wikifier.wikifyEval(`You slowly push your ${toyDisplay(altText.selectedToy)} into and out of your <<bottom>>.`));
						break;
					case 2:
						fragment.append(
							Wikifier.wikifyEval(
								`You fuck your <<bottom>> with your ${toyDisplay(altText.selectedToy)}. You feel naughty about playing with such a place.`
							)
						);
						break;
				}
			}
			break;
		case "manusprostatedildo":
			clearAction();
			wikifier("arousal", 350 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`You stroke your prostate with your ${altText.toyDisplay}, milking it of semen and making you shudder.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`You press against your prostate with your ${altText.toyDisplay}, causing an almost unbearably pleasurable feeling of vulnerability.`
						)
					);
				} else {
					fragment.append(
						span(`You gently prod your prostate with your ${altText.toyDisplay}, each poke sending a wave of pleasure through your body.`)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`You stroke your prostate with your ${toyDisplay(altText.selectedToy)}, milking it of semen and making you shudder.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`You press against your prostate with your ${toyDisplay(
								altText.selectedToy
							)}, causing an almost unbearably pleasurable feeling of vulnerability.`
						)
					);
				} else {
					fragment.append(
						span(
							`You gently prod your prostate with your ${toyDisplay(
								altText.selectedToy
							)}, each poke sending a wave of pleasure through your body.`
						)
					);
				}
			}
			break;
		case "manusstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You move your ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} away from your <<bottom>>.</span>`
					)
				);
			} else {
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="purple">You move your ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your <<bottom>>.</span>`
					)
				);
			}
			break;
		case "mmouthstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.mouth = 0;
			altText.selectedToy = selectedToy(arm);
			fragment.append(span(`You move your ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your mouth.`, "purple"));
			break;
		default:
			clearAction("mrest");
			break;
	}
	fragment.append(" ");
	return fragment;
}

function fingersEffect(span, hymenIntact) {
	const fragment = document.createDocumentFragment();
	if (V.fingersInVagina === V.vaginaFingerLimit - 1) {
		fragment.append(span("It's a tight fit.", "purple"));
		fragment.append(" ");
	} else if (V.fingersInVagina === V.vaginaFingerLimit) {
		if (hymenIntact) {
			fragment.append(span("You can't fit any more without tearing your hymen.", "pink"));
			fragment.append(" ");
		} else {
			fragment.append(span("You've reached your limit.", "pink"));
			fragment.append(" ");
		}
	}
	return fragment;
}

function possessedMasturbation(span, br) {
	const fragment = document.createDocumentFragment();

	if (!V.combatBegun) {
		V.combatBegun = 1;
		return fragment;
	}

	let resist = 0;

	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.leftaction)) resist += 2;
	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.rightaction)) resist += 2;

	if (resist === 0) {
		fragment.append(span("You let it take you.", "pink"));
		fragment.append(Wikifier.wikifyEval("<<pain -2>><<stress -12>><<sub 2>><<lpain>><<llstress>><<set V.wraith.will += 30>>"));
	} else {
		wikifier("willpowerdifficulty", 1, Math.floor(1 + V.wraith.will), true);
		if (V.willpowerSuccess) {
			T.resistSuccess = 1;
			fragment.append(span(`You fight for control. Your ${resist === 4 ? "arms" : "arm"} locks up.`, "green"));
			wikifier("pain", resist);
			wikifier("stress", resist);
			wikifier("trauma", resist);
			wikifier("def", 2);
			wikifier("control", (Math.floor(currentSkillValue("willpower") / 24) * resist) / 10);
			V.wraith.will -= Math.floor(currentSkillValue("willpower") / 24) * resist;
			fragment.append(Wikifier.wikifyEval(`<<gpain>><<gtrauma>><<gstress>><<${resist === 4 ? "gg" : "g"}control>>`));
		} else {
			fragment.append(span("Your body does not obey.", "red"));
			["leftaction", "rightaction"].forEach(action => {
				switch (V[action]) {
					case "mbreastW":
					case "mbreaststopW":
						V[action] = "mbreastW";
						break;
					case "mvaginaW":
					case "mvaginastopW":
						V[action] = "mvaginaW";
						break;
					case "mpenisW":
					case "mpenisstopW":
						V[action] = "mpenisW";
						break;
				}
				wikifier("stress", 6);
				wikifier("trauma", 6);
				wikifier("willpower", 1);
				wikifier("def", 1);
				V.wraith.will -= Math.floor(currentSkillValue("willpower") / 40) * resist;
				fragment.append(Wikifier.wikifyEval("<<gtrauma>><<gstress>><<gwillpower>>"));
			});
		}
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationeffectsMouth({ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }) {
	const fragment = document.createDocumentFragment();

	const clearAction = defaultAction => {
		V.mouthactiondefault = defaultAction !== undefined ? defaultAction : V.mouthaction;
		V.mouthaction = 0;
	};

	if (V.mouthaction === 0 || V.mouthaction === "mrest") return fragment;

	const altText = {};

	// Dealing with the players actions
	switch (V.mouthaction) {
		case "mpenisentrance":
			if (V.penisuse === 0) {
				clearAction("mpenislick");
				V.penisuse = "mouth";
				V.mouth = "mpenisentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					fragment.append(
						Wikifier.wikifyEval(
							`<span class="red">The slime in your ear forces you to bend down. You're not sure if you're going to like what's coming.</span><<gawareness>>`
						)
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					fragment.append(
						Wikifier.wikifyEval(`<span class="blue">You get close enough to your <<penis>> to reach out and lick the tip with your tongue.</span>`)
					);
				} else {
					fragment.append(
						Wikifier.wikifyEval(
							`<span class="blue">You run your tongue over your <<penis>>, feeling the bulge beneath your <<exposedlower>>.</span>`
						)
					);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenislick":
			clearAction("mpenislick");
			if (genitalsExposed()) {
				wikifier("arousal", 200, "masturbationGenital");
				if (V.arousal >= V.arousalmax * (4 / 5)) {
					fragment.append(Wikifier.wikifyEval("Your <<penis>> twitches every time you lick it, but you don't stop."));
				} else if (V.arousal >= V.arousalmax * (3 / 5)) {
					fragment.append(Wikifier.wikifyEval("You run your tongue over your <<penis>> head, mixing your saliva with your precum."));
				} else {
					fragment.append(Wikifier.wikifyEval("You run your tongue over your <<penis>> head, focusing on your sensitive spots."));
				}
			} else {
				fragment.append(
					Wikifier.wikifyEval(`<span class="blue">You run your tongue over your <<penis>>, feeling the bulge beneath your <<exposedlower>>.</span>`)
				);
			}
			break;
		case "mpenistakein":
			clearAction(V.penisHeight === 0 ? "mpenissuck" : "mpenisdeepthroat");
			V.mouth = "mpenis";
			V.mouthstate = "penetrated";
			V.selfsuckDepth = 0;
			wikifier("arousal", 200, "masturbationGenital");
			if (V.penisHeight === 0) {
				fragment.append(Wikifier.wikifyEval(`<span class="blue">You take your <<penis>> into your mouth, sending a lewd tingle up your spine.</span>`));
			} else {
				fragment.append(
					Wikifier.wikifyEval(`<span class="blue">You take the head of your <<penis>> into your mouth, sending a lewd tingle up your spine.</span>`)
				);
			}
			break;
		case "mpenisdeepthroat":
			clearAction(V.selfsuckDepth < V.selfsuckLimit ? "mpenisdeepthroat" : "mpenissuck");
			V.selfsuckDepth++;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			fragment.append(Wikifier.wikifyEval(`You push your <<penis>> deeper into your mouth.`));
			if (V.selfsuckDepth === V.penisHeight) {
				if (V.leftarm === "mpenisentrance" && V.rightarm === "mpenisentrance") {
					altText.hands = "both hands";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				} else if (V.leftarm === "mpenisentrance") {
					altText.hands = "left hand";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
				} else if (V.rightarm === "mpenisentrance") {
					altText.hands = "right hand";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				}
				fragment.append(Wikifier.wikifyEval(`<span class="lblue">You move your ${altText.hands} away from your <<penis>> to make room.</span>`));
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			}
			break;
		case "mpenispullback":
			V.selfsuckDepth -= 1;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			if (V.selfsuckDepth >= 2) {
				clearAction();
				fragment.append(
					Wikifier.wikifyEval('<span class="lblue">You pull back hard on your <<penis>> and extract some of it from your throat.</span>')
				);
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else if (V.selfsuckDepth === 1) {
				clearAction();
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You pull back on your <<penis>> and free it from your throat.</span>'));
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else {
				clearAction("mpenisstop");
				fragment.append(Wikifier.wikifyEval('<span class="lblue">You pull back until only the head of your <<penis>> remains in your mouth.</span>'));
			}
			break;
		case "mpenismouthoff":
			clearAction("mrest");
			V.mouth = "mpenisentrance";
			V.mouthstate = 0;
			fragment.append(Wikifier.wikifyEval('<span class="lblue">You take your mouth off of your <<penis>>.</span>'));
			break;
		case "mpenissuck":
			clearAction();
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "eagerly" : "slowly";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.elfsuckDepth <= 1) {
					fragment.append(
						Wikifier.wikifyEval("You drink down precum as it flows into your mouth while you move your head back and forth on your <<penis>>.")
					);
				} else {
					fragment.append(Wikifier.wikifyEval("Precum flows down your throat as you move your head back and forth on your <<penis>>."));
				}
			} else {
				if (V.penisHeight === V.selfsuckDepth) {
					if (V.selfsuckDepth >= 2) {
						fragment.append(Wikifier.wikifyEval(`You lick the base of your <<penis>> while your throat massages the shaft.`));
					} else {
						fragment.append(Wikifier.wikifyEval(`You ${altText.eagerly} suck on your <<penis>> while licking the base.`));
					}
				} else if (V.selfsuckDepth >= 1) {
					fragment.append(Wikifier.wikifyEval(`You ${altText.eagerly} suck on your <<penis>> while licking along the shaft.`));
				} else {
					fragment.append(Wikifier.wikifyEval(`You ${altText.eagerly} suck on your <<penis>> while licking around the tip.`));
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			fragment.append(Wikifier.wikifyEval(`<span class="lblue">You move your mouth away from your <<penis>>.</span>`));
			break;
		case "mvaginaentrance":
			clearAction("mvaginalick");
			V.mouth = "mvaginaentrance";
			V.vaginause = "mouth";
			wikifier("arousal", 100, "masturbationGenital");
			if (V.awareness < 200 && V.corruptionMasturbation) {
				wikifier("awareness", 1);
				fragment.append(
					Wikifier.wikifyEval(
						`<span class="red">The slime in your ear forces you to bend down. You're not sure if you're going to like what's coming.</span><<gawareness>>`
					)
				);
				fragment.append(" ");
			}
			if (genitalsExposed()) {
				fragment.append(span(`You run your tongue over your exposed clit and shiver in anticipation.`, "blue"));
			} else {
				fragment.append(
					Wikifier.wikifyEval(`<span class="blue">You run your tongue over your <<pussy>>, feeling it beneath your <<exposedlower>>.</span>`)
				);
			}
			break;
		case "mvaginalick":
			clearAction();
			wikifier("arousal", 100, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(Wikifier.wikifyEval("You shiver in anticipation as you lick up the fluid coming from your <<pussy>>."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(Wikifier.wikifyEval("You lick your <<pussy>>, trying to reach the more difficult spots."));
			} else {
				fragment.append(Wikifier.wikifyEval("You lick your <<pussy>>."));
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 200, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You shiver in anticipation as you suck and gently rub your clit against your teeth."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You lick and suck your clit."));
			} else {
				fragment.append(span("You lick your clit."));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V.mouth = 0;
			V.vaginause = 0;
			fragment.append(Wikifier.wikifyEval('<span class="lblue">You move your mouth away from your <<pussy>>.</span>'));
			break;
		case "maphropill":
			clearAction("mrest");
			if (V.mouth === 0) {
				wikifier("drugs", 300);
				const pills = V.player.inventory.sextoys["aphrodisiac pills"][0];
				pills.uses -= 1;
				if (pills.uses <= 0) V.player.inventory.sextoys["aphrodisiac pills"].splice(0, 1);
				if (V.drugged > 0) {
					fragment.append(span("You pop an aphrodisiac pill into your mouth and swallow. The lewd warmth within you intensifies."));
				} else {
					fragment.append(span("You pop an aphrodisiac pill into your mouth and swallow. A lewd warmth begins to spread in your belly."));
				}
			}
			break;
		case "mdildolick":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);

			if (V.mouth === "mdildomouthentrance") {
				if (V.oralskill < 100) {
					fragment.append(span(`You gingerly lick the ${altText.toyDisplay}'s tip, trying your best to tease it with your tongue.`));
				} else if (V.oralskill < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(span(`You eagerly lick the ${altText.toyDisplay}'s tip, doing your best to tease it with your tongue.`));
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(`You skilfully kiss and lick the ${altText.toyDisplay}'s tip, lavishing attention upon it with your lips and tongue.`)
					);
				}
			} else {
				if (V.oralskill < 100) {
					if (altText.selectedToy.name.includes("small")) {
						fragment.append(span(`You awkwardly wiggle your tongue along the bottom of the ${altText.toyDisplay} in your mouth.`));
					} else {
						fragment.append(
							span(`You struggle to lick along the ${altText.toyDisplay}, its girth pinning your tongue to the bottom of your mouth.`)
						);
					}
				} else if (V.oralskill < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(
						span(`You wriggle your tongue along the ${altText.toyDisplay} in your mouth, trying your best to reach as much of the toy as you can.`)
					);
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(
							`You skillfully wriggle your tongue along the ${altText.toyDisplay} in your mouth, occasionally adjusting your angle to reach as much of it as possible.`
						)
					);
				}
			}
			break;
		case "mdildokiss":
			clearAction();
			wikifier("arousal", 100, "masturbationMouth");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (V.oralskill < 100) {
				fragment.append(span(`You clumsily kiss along the ${altText.toyDisplay}'s length.`));
			} else if (V.oralskill < 200) {
				wikifier("arousal", 100, "masturbationMouth");
				fragment.append(span(`You kiss along the ${altText.toyDisplay}'s length, a lewd warmth growing within you.`));
			} else {
				altText.virginity =
					V.player.virginity.oral === true
						? "hoping you'll get to experience the real thing soon."
						: "a lewd warmth growing within you as you treat it like the real thing.";
				wikifier("arousal", 200, "masturbationMouth");
				fragment.append(span(`You lovingly plant a series of kisses along the ${altText.toyDisplay}'s length, ${altText.virginity}`));
			}
			break;
		case "mdildosuck":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (V.oralskill < 100) {
				fragment.append(span(`You try your best to suck on the ${altText.toyDisplay}.`));
			} else if (V.oralskill < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(span(`You eagerly suck on the ${altText.toyDisplay}.`));
			} else {
				wikifier("arousal", 200, "masturbationOral");
				if (V.player.virginity.oral === true) {
					altText.virginity = "wondering how different a real penis would feel.";
				} else if (V.ejactrait) {
					altText.virginity = "a little disappointed you won't be getting your reward when you're done.";
				} else {
					altText.virginity = "pretending it's the real thing.";
				}
				fragment.append(span(`You skillfully suck on and tease the ${altText.toyDisplay}, ${altText.virginity}`));
			}
			break;
		default:
			clearAction("mrest");
			break;
	}

	fragment.append(" ");
	return fragment;
}

function deepthroateffects(span) {
	const fragment = document.createDocumentFragment();
	switch (V.penisHeight) {
		case 0:
			fragment.append(span("Error: Impossible condition.", "red"));
			break;
		case 1:
			switch (V.selfsuckDepth) {
				case 1:
					fragment.append(Wikifier.wikifyEval("Your lips touch the base of your <<penis>> and the head pokes at the back of your mouth."));
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		case 2:
			switch (V.selfsuckDepth) {
				case 1:
					fragment.append(Wikifier.wikifyEval("The head of your penis is poking at the entrance to your throat."));
					break;
				case 2:
					fragment.append(Wikifier.wikifyEval("Your lips touch the base of your <<penis>> as the head pushes into your throat."));
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		case 3:
			switch (V.selfsuckDepth) {
				case 1:
					fragment.append(Wikifier.wikifyEval("The head of your penis is poking at the entrance to your throat."));
					break;
				case 2:
					fragment.append(Wikifier.wikifyEval("Your <<penis>> is stretching the walls of your throat."));
					break;
				case 3:
					fragment.append(Wikifier.wikifyEval("Your lips touch the base of your <<penis>> as the shaft fills your throat."));
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		default:
			fragment.append(span("Error: Impossible condition.", "red"));
			break;
	}
	if (V.selfsuckDepth === V.penisHeight) {
		fragment.append(" ");
		fragment.append(span("You've reached the bottom."));
	} else if (V.selfsuckDepth === V.selfsuckLimit) {
		fragment.append(" ");
		fragment.append(span("You are not flexible enough to get any lower."));
	}

	return fragment;
}

function masturbationeffectsPhallusFlower({ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }) {
	const fragment = document.createDocumentFragment();

	const clearAction = (actionType, defaultAction) => {
		V[actionType + "actiondefault"] = defaultAction !== undefined ? defaultAction : V[actionType + "action"];
		V[actionType + "action"] = 0;
	};

	switch (V.mouthaction) {
		case "mpenisflowerlick":
			clearAction("mouth");
			wikifier("arousal", 200, "mouth");
			wikifier("drugs", 10);
			V.mouth = "mpenisflowerlick";
			V.moorPhallusPlant = 2;
			switch (random(1, 3)) {
				case 1:
					fragment.append(span("You almost take the phallus plant into your mouth, but suddenly feel apprehensive."));
					break;
				case 2:
					fragment.append(span("You lick the phallus plant's tip and swallow the sweet liquid."));
					break;
				case 3:
					fragment.append(span("You lick the phallus plant's tip."));
					break;
			}
			if (V.vaginaaction === "mpenisflowerrub") V.vaginaaction = 0;
			if (V.anusaction === "mpenisflowerrub") V.anusaction = 0;
			break;
		case "mpenisflowertakein":
			clearAction("mouth", "mpenisflowersuck");
			V.mouth = "mpenisflowersuck";
			V.mouthstate = "penetrated";
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			if (V.player.virginity.oral === true) {
				fragment.append(wikifier("takeVirginity", "phallus plant", "oral"));
				fragment.append(" ");
				fragment.append(
					Wikifier.wikifyEval('You suck on the plant. <span class="red">It tastes very strange</span>, and you feel yourself heating up.')
				);
			} else {
				fragment.append(span("You suck on the plant. It tastes very sweet, and you feel yourself heating up."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("mouth");
			V.mouth = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("You stop licking the plant.", "lblue"));
			break;
		case "mpenisflowersuck":
			clearAction("mouth");
			wikifier("arousal", 500, "oral");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You shiver as you drink down the fluid while sucking and moving your head back and forward."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You're sucking on the plant while lapping up its fluid."));
			} else {
				fragment.append(span("You're sucking on the phallus plant."));
			}
			break;
		case "mpenisflowersuckstop":
			clearAction("mouth", "mpenisflowersuck");
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			fragment.append(
				span("Your head keeps bobbing up and down, sucking on the phallus plant. Try as you might, you just can't will yourself to stop.", "red")
			);
			break;
	}

	switch (V.vaginaaction) {
		case "mpenisflowerrub":
			clearAction("vagina");
			V.vaginause = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("You grind your crotch against the plant, although your clothing gets in the way."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"You nearly impale yourself on the plant, as a sudden burst of desire hits you. You stop yourself at the last moment, and gently circle the plant around your entrance."
							)
						);
						break;
					case 2:
						fragment.append(Wikifier.wikifyEval("You rub your <<if $player.penisExist>><<penis>><<else>>clit<</if>> against the plant."));
						break;
					case 3:
						fragment.append(span("You rub your vulva against the phallus plant."));
						break;
				}
			}
			if (V.anusaction === "mpenisflowerrub") V.anusaction = 0;
			break;
		case "mpenisflowerpenetrate":
			clearAction("vagina", "mpenisflowerbounce");
			V.vaginause = "mpenisflowerpenetrate";
			V.vaginastate = "penetrated";
			wikifier("arousal", 1000, "vaginal");
			wikifier("vaginalstat");
			wikifier("drugs", 10);
			wikifier("vaginaraped");
			if (V.player.virginity.oral === true) {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "phallus plant", "vaginal"));
				fragment.append(" ");
				fragment.append(
					Wikifier.wikifyEval(
						'You almost scream out as <span class="red">your no longer virgin</span> vagina struggles to accommodate the plant, but the pain is gone within moments.'
					)
				);
			} else {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you. You've never felt anything quite like it before."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("vagina");
			V.vaginause = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("You stop rubbing your vagina against the phallus plant.", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("vagina");
			wikifier("arousal", 500, "vaginal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You hungrily ride the plant, rubbing it as quickly as you can. The sensation threatens to drive you mad."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You bounce on the phallus plant. The sensation threatens to drive you mad."));
			} else {
				fragment.append(span("You gently bounce on the phallus plant, each poke sending a wave of pleasure through your body."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("vagina", "mpenisflowerbounce");
			wikifier("arousal", 300, "vaginal");
			wikifier("drugs", 10);
			fragment.append(span("Your legs fail to lift you off of the plant, as if your body isn't obeying you.", "red"));
			break;
	}

	switch (V.anusaction) {
		case "mpenisflowerrub":
			clearAction("anus");
			V.anususe = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("You grind your ass against the plant, although your clothes get in the way."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"You nearly let yourself take the whole plant into your anus, but stop yourself at the last moment. You gently circle the plant around the entrance."
							)
						);
						break;
					case 2:
						fragment.append(Wikifier.wikifyEval("You rub the phallus plant between your <<bottom>> cheeks."));
						break;
					case 3:
						fragment.append(span("You rub your anus against the phallus plant."));
						break;
				}
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("anus", "mpenisflowerbounce");
			V.anususe = "mpenisflowerpenetrate";
			wikifier("arousal", 1000, "anal");
			wikifier("analstat");
			wikifier("drugs", 10);
			if (V.player.virginity.oral === true) {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "phallus plant", "anal"));
				fragment.append(" ");
				fragment.append(
					Wikifier.wikifyEval(
						'You almost scream out as <span class="red">your no longer virgin</span> anus struggles to accommodate the plant, but the pain is gone within moments.'
					)
				);
			} else {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you. You've never felt anything quite like it before."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("anus");
			V.anususe = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("You stop rubbing your anus against the phallus plant", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("anus");
			wikifier("arousal", 500, "anal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You roughly ride the plant, rubbing it as quickly as you can. It's unlike anything you've felt before.."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					span(`You ride the plant${V.player.penisExist ? ", trying to get it to hit your prostate" : ""}. It's unlike anything you've felt before.`)
				);
			} else {
				fragment.append(span("You gently ride the phallus plant, each poke sending a wave of pleasure through your body."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("anus");
			wikifier("arousal", 300, "anal");
			wikifier("drugs", 10);
			fragment.append(span("Your legs fail to lift you off of the plant, as if your body isn't obeying you.", "red"));
			break;
	}

	return fragment;
}

Macro.add("masturbationeffectsNew", {
	handler() {
		const fragment = masturbationeffects();
		this.output.append(fragment);
	},
});
