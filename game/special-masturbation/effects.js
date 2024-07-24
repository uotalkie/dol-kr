/*
	Old version can be found at https://gitgud.io/Vrelnir/degrees-of-lewdity/-/blob/master/game/special-masturbation/effects.twee?ref_type=7f47147b
*/
function masturbationEffects() {
	const fragment = document.createDocumentFragment();
	const br = () => document.createElement("br");
	const span = (text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};
	const otherElement = (tag, text, colour) => {
		if (T.noMasturbationOutput) return "";
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
	const selectedToy = (location, update) => {
		if (update === true) V["currentToy" + location.toLocaleUpperFirst()] = V["selectedToy" + location.toLocaleUpperFirst()];
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		if (update === false) V["currentToy" + location.toLocaleUpperFirst()] = "none";
		return toy;
	};
	const toyDisplay = (toy1, toy2, post, sep) => { if(typeof(toy2) === "string") { sep = post; post = toy2; toy2 = undefined; }
		if (toy1 && toy2) return (toy1.colour ? trColour(toy1.colour) + " " : "") + sextoyPost(toy1.name, "과") + " " + (toy2.colour ? trColour(toy2.colour) + " " : "") + sextoyPost(toy2.name, post, sep);
		if (toy1) return (toy1.colour ? trColour(toy1.colour) + " " : "") + sextoyPost(toy1.name, post, sep);
		return "";
	};

	const earSlimeDefy = () => V.earSlime.growth >= 100 && V.earSlime.defyCooldown && V.pain < V.earSlime.defyCooldown * 5;

	const otherVariables = {
		br,
		span,
		otherElement,
		genitalsExposed,
		breastsExposed,
		selectedToy,
		toyDisplay,
		earSlimeDefy,
		additionalEffect: { earSlimeDefy: [] },
	};

	if (V.player.vaginaExist) {
		otherVariables.hymenIntact = V.player.virginity.vaginal === true && V.sexStats.vagina.pregnancy.totalBirthEvents === 0;
		wikifier("vaginaWetnessCalculate");
	}
	if (V.corruptionMasturbation) {
		if (V.leftarm === "bound" && V.rightarm === "bound") {
			sWikifier(
				'슬라임이 당신에게 당신의 팔을 묶은 것을 풀라고 한다. 당신은 어떤 진척도 내지 못하고, <span class="blue">녀석은 포기한다.</span><<arousal 600 "masturbation">><<stress 6>><<gstress>><<garousal>>'
			);
			fragment.append(" ");
			V.rightaction = "mrest";
			V.leftaction = "mrest";
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else if (
			playerHeatMinArousal() + playerRutMinArousal() >= 3000 ||
			(playerHeatMinArousal() + playerRutMinArousal() >= 1000 && V.earSlime.growth >= 100 && V.earSlime.defyCooldown)
		) {
			sWikifier(
				'	귓속의 슬라임은 현재 상태에서 당신에게 자위를 강제로 시키는 것은 가치가 없다고 느끼고, <span class="blue">당신을 풀어준다.</span>'
			);
			fragment.append(" ");
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else {
			if (V.orgasmdown >= 2) {
				if (isNaN(V.corruptionMasturbationCount)) V.corruptionMasturbationCount = random(2, 6);
				if (V.corruptionMasturbationCount <= 0) {
					V.corruptionMasturbation = false;
					delete V.corruptionMasturbationCount;
					if (V.awareness < 200) {
						// Prevents the PC from continuing actions that they normally are unable to do yet
						if (V.mouth === "mpenis") {
							sWikifier(
								'<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 <<penis_ rul>> 입에서 빼서 치운다.</span>'
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mpenisentrance") {
							sWikifier('<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 <<penis_ rul>> 치운다.</span>');
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mchastityparasiteentrance") {
							sWikifier(
								'<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 기생충 정조대 자지를 치운다.</span>'
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mvaginaentrance") {
							sWikifier('<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 <<pussy_ rul>> 치운다.</span>');
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
		sWikifier("<<dynamicblock id=control-caption>><<controlcaption>><</dynamicblock>>");
		fragment.append(possessedMasturbation(span, br, sWikifier));
	}

	// Reset the record of the players current actions
	V.masturbationActions = {};

	fragment.append(masturbationEffectsVaginaAnus(otherVariables));

	fragment.append(masturbationEffectsArms("left", V.leftaction === V.rightaction, otherVariables));
	fragment.append(masturbationEffectsArms("right", false, otherVariables));

	fragment.append(masturbationEffectsMouth(otherVariables));

	if (otherVariables.additionalEffect.hands === "ballplayeffects" && V.worn.genitals.name !== "chastity parasite") {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 끝에서 튀어오른다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 당신의 <<exposedlower_ rul>> 통해 새어나온다.</span>');
			}
		} else if (V.arousal >= V.arousalmax * (3 / 5)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 귀두에서 방울진다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 당신의 <<exposedlowerPost>> 위에 짙은 자국을 만든다.</span>');
			}
		} else if (V.arousal >= V.arousalmax * (2 / 5)) {
			sWikifier("그 압력이 당신의 <<penis_ rul>> 고동치게 한다.");
		} else {
			sWikifier("그 압력이 당신의 <<penis_ rul>> 씰룩거리게 한다.");
		}
		fragment.append(" ");
	}

	if (
		V.player.penisExist &&
		otherVariables.additionalEffect.hands !== "ballplayeffects" &&
		V.arousal >= V.arousalmax * (3 / 5) &&
		V.mouth !== "mpenis" &&
		V.worn.genitals.name !== "chastity parasite"
	) {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, <span class="pink">쿠퍼액이 끝에서 튀어오른다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, 쿠퍼액이 당신의 <<exposedlower_ rul>> 통해 새어나온다.</span>');
			}
		} else {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, <span class="pink">쿠퍼액이 귀두에서 방울진다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, <span class="pink">쿠퍼액이 당신의 <<exposedlowerPost>> 위에 짙은 자국을 만든다.</span>');
			}
		}
		fragment.append(" ");
	}

	if (otherVariables.additionalEffect.earSlimeDefy.length) {
		sWikifier(
			`쾌감을 느끼기 위해 당신이 한 모든 시도는 당신의 ${formatList(
				otherVariables.additionalEffect.earSlimeDefy,
				"그리고",
				true
			)}에 직접적으로 <span class="lewd">쾌감</span>과 <span class="red">고통</span>이 교차하는 결과로 이어진다. <<gpain>>`
		);
		fragment.append(" ");
	}

	if (V.worn.genitals.name === "chastity parasite" && V.earSlime.vibration > 0) {
		if (V.earSlime.vibration > 1) wikifier("arousal", Math.clamp(25 * V.earSlime.vibration, 0, 1000), "masturbationGenital");
		if (V.earSlime.corruption < 100 && V.earSlime.vibration > 20) {
			V.earSlime.vibration = 20;
		} else if (V.earSlime.vibration > 60) {
			V.earSlime.vibration = 60;
		}

		if (V.earSlime.vibration === 1) {
			// Prevents a double message
			V.earSlime.vibration++;
		} else if (V.earSlime.vibration <= 10) {
			sWikifier('<span class="lewd">당신의 기생충 정조대가 <<penisPost>> 주위에서 부드럽게 진동한다.</span>');
		} else if (V.earSlime.vibration <= 20) {
			sWikifier('<span class="lewd">당신의 기생충 정조대가 <<penisPost>> 주위에서 진동한다.</span>');
		} else if (V.earSlime.vibration <= 30) {
			sWikifier(
				`<span class="lewd">당신의 기생충 정조대가 <<penis_ wa 'sep'>>${V.mouth === "mchastityparasiteentrance" ? "_trPost 혓바닥" : ""} 위에서 진동한다.</span>`
			);
		} else {
			sWikifier(
				`<span class="lewd">당신의 기생충 정조대가 <<penis_ wa 'sep'>>${
					V.mouth === "mchastityparasiteentrance" ? "_trPost 혓바닥" : ""
				} 위에서 강하게 진동한다.</span>`
			);
		}
		if (V.earSlime.vibration > 1) fragment.append(" ");
	}

	if (V.player.vaginaExist && V.vaginaArousalWetness >= 60) {
		if (V.worn.under_lower.vagina_exposed && V.worn.lower.vagina_exposed) {
			wikifier("vaginaFluidPassive");
			if (T.lube_released) {
				sWikifier('<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나온다.</span>');
			}
		} else if (V.worn.under_lower.vagina_exposed === 0 && V.underlowerwetstage < 3) {
			sWikifier(`<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나와 당신의 <<worn_under_lower_name_ ul>> 적신다.</span>`);
			wikifier("underlowerwet", 1);
		} else if (V.worn.lower.vagina_exposed === 0) {
			sWikifier(
				`<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나와<<if V.underlowerwet gte 60>>, 당신의 <<worn_under_lower_name_ ul>> 흠뻑 적시고 배어나와,<</if>> 당신의 <<worn_lower_name_ ul>> 적신다.</span>`
			);
		} else {
			sWikifier('<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나와 당신의 옷을 적신다.</span>');
		}
		fragment.append(" ");
	}

	if (
		random(0, 100) >= Math.clamp(135 - V.earSlime.corruption / 2, 80, 98) &&
		V.earSlime.corruption > currentSkillValue("willpower") / 10 &&
		V.corruptionMasturbation === undefined
	) {
		V.corruptionMasturbation = true;
		V.corruptionMasturbationCount = random(1, 4);
		fragment.append(span("귓속의 슬라임은 당신에게 더 재미를 보게 해주기를 원한다.", "red"));
		fragment.append(" ");
	}

	fragment.append(br());
	fragment.append(br());

	if (V.masturbationAudience) {
		fragment.append(masturbationAudience());
	}

	return fragment;
}

function masturbationEffectsArms(
	arm,
	doubleAction,
	{ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact, earSlimeDefy }
) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const armAction = arm + "action";
	const armActionDefault = armAction + "default";
	const otherArm = arm === "left" ? "right" : "left";
	const otherArmAction = otherArm + "action";

	const clearAction = defaultAction => {
		if (V[armAction] && V[armAction] !== "mrest") V.masturbationActions[armAction] = V[armAction];
		V[armActionDefault] = defaultAction !== undefined ? defaultAction : V[armAction];
		V[armAction] = 0;
		if (doubleAction) {
			V[otherArmAction + "default"] = defaultAction !== undefined ? defaultAction : V[otherArmAction];
			V[otherArmAction] = 0;
		}
	};

	if (V[armAction] === 0) return fragment;

	if (V[armAction] === "mrest") {
		if (random(0, 100) >= 91 && V.earSlime.corruption > currentSkillValue("willpower") / 10 && V.corruptionMasturbation === undefined) {
			V.corruptionMasturbation = true;
			V.corruptionMasturbationCount = random(2, 6);
			fragment.append(span("귓속의 슬라임은 당신이 계속해야 한다고 결정한다.", "red"));
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
				sWikifier(`당신은 <<worn_over_upper_name_ ul>> 끌어내려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.over_upper.state = "chest";
				sWikifier(`당신은 <<worn_over_upper_name_ ul>> 끌어올려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "mupper":
			clearAction("mrest");
			V.worn.upper.exposed = 2;
			if (V.worn.upper.open) {
				V.worn.upper.state_top = "midriff";
				sWikifier(`당신은 <<worn_upper_name_ ul>> 끌어내려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.upper.state = "chest";
				sWikifier(`당신은 <<worn_upper_name_ ul>> 끌어올려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "munder_upper":
			clearAction("mrest");
			V.worn.under_upper.exposed = 2;
			if (V.worn.under_upper.open) {
				V.worn.under_upper.state_top = "midriff";
				if (V.player.breastsize >= 3) {
					sWikifier(`당신이 <<worn_under_upper_name_ ul>> 끌어내리자 <span class="lewd">당신의 <<breasts_ ga>> 털썩 튀어나온다.</span>`);
				} else {
					sWikifier(`당신은 <<worn_under_upper_name_ ul>> 끌어내려, <span class="lewd">당신의 <<breasts_ rul>> 노출시킨다.</span>`);
				}
			} else {
				V.worn.under_upper.state = "chest";
				if (V.player.breastsize >= 3) {
					sWikifier(`당신이 <<worn_under_upper_name_ ul>> 끌어올리자 <span class="lewd">당신의 <<breasts_ ga>> 털썩 튀어나온다.</span>`);
				} else {
					sWikifier(`당신은 <<worn_under_upper_name_ ul>> 끌어올려, <span class="lewd">당신의 <<breasts_ rul>> 노출시킨다.</span>`);
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
				sWikifier(`당신은 <<worn_over_lower_name_ ul>> 잡아올려, <span class="lewd">당신의 <<exposedlower_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.over_lower.state = "thighs";
				sWikifier(`당신은 <<worn_over_lower_name_ ul>> 끌어내려, <span class="lewd">당신의 <<exposedlower_ rul>> 노출시킨다.</span>`);
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
				sWikifier(`당신은 <<worn_lower_name_ ul>> 잡아올려, <span class="lewd">당신의 <<undies_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.lower.state = "thighs";
				sWikifier(`당신은 <<worn_lower_name_ ul>> 끌어내려, <span class="lewd">당신의 <<undies_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "munder":
			clearAction("mrest");
			V.worn.under_lower.anus_exposed = 1;
			V.worn.under_lower.vagina_exposed = 1;
			V.worn.under_lower.state = "thighs";
			V.worn.under_lower.exposed = 2;
			sWikifier(`당신은 <<worn_under_lower_name_ ul>> 끌어내려, <span class="lewd">당신의 <<genitals_ rul>> 노출시킨다.</span>`);
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
			if (V.player.penisExist || V.parasite.clit.name) {
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
			fragment.append(span("당신은 당신의 보지에서 입을 치운다."));
		}
		if (V[armAction] === "mvaginatease") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("당신은 당신의 보지에서 손가락들을 치운다."));
			} else {
				fragment.append(span("당신은 당신의 보지에서 손가락을 치운다."));
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
				fragment.append(span("당신은 당신의 항문에서 손가락들을 치운다."));
			} else {
				fragment.append(span("당신은 당신의 항문에서 손가락을 치운다."));
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
	if (V[armAction] === "mpickupdildo") {
		const currentlySelectedToy = V["selectedToy" + (arm === "left" ? "Left" : "Right")];
		if (
			currentlySelectedToy === V["currentToy" + (arm === "left" ? "Right" : "Left")] ||
			currentlySelectedToy === V.currentToyVagina ||
			currentlySelectedToy === V.currentToyAnus
		) {
			// The player can only a toy in one type of action
			V[armAction] = 0;
			doubleAction = false;
		}
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

	// The player is unable to ride multiple dildo's in their vagina or anus at once
	if (doubleAction && V[armAction] === "mvaginaentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}
	if (doubleAction && V[armAction] === "manusentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}

	// The player is unable to use a dildo on their vagina/anus when using a dildo on the floor
	if (
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.leftaction) ||
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.rightaction)
	) {
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.leftaction)) {
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.rightaction)) {
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}
	if (V.vaginause === "mdildopenetrate" || V.anususe === "mdildopenetrate") {
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.leftarm)) {
			if (V.leftarm.includes("vagina")) {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("left"), '을')} 보지에서 치운다.`, "red"));
			} else {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("left"), '을')} 항문에서 치운다.`, "red"));
			}
			fragment.append(" ");
			V.leftarm = "mpickupdildo";
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.rightarm)) {
			if (V.rightarm.includes("vagina")) {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("right"), '을')} 보지에서 치운다.`, "red"));
			} else {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("right"), '을')} 항문에서 치운다.`, "red"));
			}
			fragment.append(" ");
			V.rightarm = "mpickupdildo";
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}

	if (V[armAction] === "mrest") return fragment;
	// End of Action Corrections

	// Action setup
	let handsOn = doubleAction ? 2 : 1;
	const altText = {};

	wikifier("ballsize");
	let balls = T.text_output + " ";
	wikifier("testiclesPost", "을");
	balls += T.trResult;

	// Dealing with the players actions
	switch (V[armAction]) {
		case "msemencover":
			clearAction("mrest");
			fragment.append(span("당신은 당신의 정액을 약간 모아 손가락 사이로 비빈다."));
			V[arm + "FingersSemen"] = 1;
			if (doubleAction) V[otherArm + "FingersSemen"] = 1;
			wikifier("arousal", 100, "masturbation");
			break;
		case "mchest":
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
								"당신이 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다."
						);
					} else {
						sWikifier("당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함이 점점 커지는 것을 느낀다.");
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신이 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다."
						);
					} else {
						sWikifier("당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함이 점점 커지는 것을 느낀다.");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신은 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 희롱한다. 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다."
						);
					} else {
						sWikifier("당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함이 점점 커지는 것을 느낀다.");
					}
				}
			} else {
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신의 <<nipples_ ga>> 자극에 대한 반응으로 긴장하여, 당신의 <<topPost>> 안에서 발기한 채로 서 있다. 당신은 그것을 견딜 수 있는 한 많이 희롱하고 꼬집는다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 당신의 <<breasts_ rul>> 애무하며 <<top_ ul>> 통해 당신의 젖꼭지를 꼬집는다.");
					} else {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 당신의 젖꼭지를 비빈다. 비록 당신의 <<topaside_ ga>> 사이에 있지만, 좋은 기분이 든다."
						);
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신의 <<nipples_ ga>> 자극에 대한 반응으로 긴장하여, 당신의 <<topPost>> 안에서 발기한 채로 서 있다. 당신은 당신의 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 가지고 논다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 당신의 <<breasts_ rul>> 애무하며 <<top_ ul>> 통해 당신의 젖꼭지를 꼬집는다.");
					} else {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 당신의 젖꼭지를 비빈다. 비록 당신의 <<topaside_ ga>> 사이에 있지만, 좋은 기분이 든다."
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신의 <<nipples_ ga>> 자극에 대한 반응으로 긴장하여, 당신의 <<topPost>> 안에서 발기한 채로 서 있다. 당신은 당신의 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 가지고 논다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 당신의 <<breasts_ rul>> 애무하며 <<top_ ul>> 통해 당신의 젖꼭지를 꼬집는다.");
					} else {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 당신의 젖꼭지를 비빈다. 비록 당신의 <<topaside_ ga>> 사이에 있지만, 좋은 기분이 든다."
						);
					}
				}
			}
			fragment.append(" ");
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("모유가 당신의 유두에서 흘러나와, 당신의 웃옷 안으로 흘러내린다.", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 모유를 모으기를 원한다면 웃옷을 벗어야 한다."));
					} else {
						fragment.append(span("모유가 당신의 유두에서 흘러나온다.", "lewd"));
					}
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", handsOn));
				} else {
					fragment.append(span("모유가 당신의 유두에서 흘러나오지 않는다. 다 말라버린 듯 하다."));
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mchastity": // Old usage
		case "mpenischastity":
		case "mvaginachastity":
			if (arm === "left" && ["mchastity", "mpenischastity", "mvaginachastity"].includes(V[otherArmAction])) {
				doubleAction = true;
				handsOn = 2;
			}
			altText.target = "<<genitals_ nun 1>>";
			if (V[armAction] !== "mchastity" && (!doubleAction || V[armAction] === V[otherArmAction])) {
				altText.target = V[armAction] === "mpenischastity" ? "<<penis_ nun>>" : "<<pussy_ nun>>";
			}
			sWikifier(
				`당신은 손가락을 당신의 <<worn_genitals_name>> 아래로 집어넣으려 하지만, 실패한다. 당신의 ${altText.target} 당신의 손길을 갈망하지만, 당신이 할 수 있는 것은 아무것도 없다.<<gstress>>`
			);
			wikifier("stress", handsOn);
			clearAction();
			break;
		case "mpenisentrance":
			clearAction("mpenisglans");
			V[arm + "arm"] = "mpenisentrance";
			if (doubleAction) V[otherArm + "arm"] = "mpenisentrance";

			if (earSlimeDefy()) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""}.`);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""}.`);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""}.`);
				} else {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이다 잠시 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else {
					sWikifier('<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며 기대감에 몸을 떤다.</span>');
				}
			}
			break;
		case "mchastityparasiteentrance":
			clearAction("mchastityparasiterub");
			V[arm + "arm"] = "mchastityparasiteentrance";
			if (doubleAction) V[otherArm + "arm"] = "mchastityparasiteentrance";
			if (V.earSlime.defyCooldown) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else {
					sWikifier(`당신은 손가락을 기생충 정조대 자지 위에서 움직이다 잠시 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else {
					sWikifier('<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며 기대감에 몸을 떤다.</span>');
				}
				if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">그것은 당신의 <<penisPost>> 주위에서 부드럽게 고동치기 시작한다.</span>');
				}
			}
			break;
		case "mpenisglans":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`무언가 느끼도록 당신은 당신의 포피를 거칠게 비비라고 강요된다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 쿠퍼액으로 뒤덮인 동정 포피를 열정적으로 점점 빠르게 비벼댄다. 이상한 느낌이 그 끝에서 온몸을 통해 퍼진다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span(
								"당신은 쿠퍼액으로 뒤덮인 동정 포피를 당신의 엄지손가락으로 비비며 열정적으로 그 끝을 만지작거린다. 당신이 잡아당길 수는 없어도 그것은 예민하다."
							)
						);
					} else {
						fragment.append(
							span("당신은 동정 자지의 끝부분을 손바닥 안에 잡고 당신의 엄지손가락으로 쿠퍼액으로 덮인 포피를 열정적으로 비벼댄다.")
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 쿠퍼액으로 뒤덮인 포피를 열정적으로 잡아당겼다 놓았다 하면서, 당신의 귀두 위로 계속 계속 비벼댄다. 쾌감이 그 끝에서 온몸을 통해 퍼진다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("당신은 쿠퍼액으로 뒤덮인 포피를 당신의 귀두에 대고 열정적으로 비비면서 그 사이의 소대를 희롱한다."));
					} else {
						sWikifier("당신은 쿠퍼액으로 뒤덮인 <<penis_ rul>> 당신의 손바닥 안에 잡고 포피를 당신의 귀두에 대고 비빈다.");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("당신은 동정 포피를 점점 빠르게 비벼댄다. 이상한 느낌이 그 끝에서 온몸을 통해 퍼진다.")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("당신은 동정 포피를 당신의 엄지손가락으로 비비며 그 끝을 만지작거린다. 당신이 잡아당길 수는 없어도 그것은 예민하다.")
							);
						} else {
							fragment.append(span("당신은 동정 자지의 끝부분을 손바닥 안에 잡고 당신의 엄지손가락으로 포피를 부드럽게 비빈다."));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피를 잡아당겼다 놓았다 하면서, 당신의 귀두 위로 계속 계속 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 포피를 당신의 귀두에 대고 비비면서 그 사이의 소대를 희롱한다."));
						} else {
							sWikifier("당신은 <<penis_ rul>> 당신의 손바닥 안에 잡고 포피를 당신의 귀두에 대고 비빈다.");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("당신은 동정 포피를 점점 빠르게 비벼댄다. 이상한 느낌이 그 끝에서 온몸을 통해 퍼진다.")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("당신은 동정 포피를 당신의 엄지손가락으로 비비며 그 끝을 만지작거린다. 당신이 잡아당길 수는 없어도 그것은 예민하다.")
							);
						} else {
							fragment.append(span("당신은 동정 자지의 끝부분을 손바닥 안에 잡고 당신의 엄지손가락으로 포피를 부드럽게 비빈다."));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피를 잡아당겼다 놓았다 하면서, 당신의 귀두 위로 계속 계속 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 포피를 당신의 귀두에 대고 비비면서 그 사이의 소대를 희롱한다."));
						} else {
							sWikifier("당신은 <<penis_ rul>> 당신의 손바닥 안에 잡고 포피를 당신의 귀두에 대고 비빈다.");
						}
					}
				}
			}
			break;
		case "mpenisshaft":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`무언가 느끼도록 당신은 당신의 손가락들로 거칠게 위아래로 비비라고 강요된다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span("당신이 쿠퍼액으로 뒤덮인 동정 자지를 손가락들로 거칠게 비벼대자, 음란한 따뜻함이 몸 전체에서 생겨난다.")
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("당신은 손가락들로 당신의 쿠퍼액으로 뒤덮인 동정 자지를 육봉 끝에서 끝까지 열정적으로 위아래로 비벼댄다."));
					} else {
						sWikifier("당신은 손가락들을 당신의 <<penisPost>> 아래쪽으로 움직이며, 음란한 따뜻함을 즐긴다.");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier("당신이 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 거칠게 위아래로 펌프질하자, 넘쳐나는 쿠퍼액이 그 끝에서 튀어 날아간다.");
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span("당신이 손가락들을 쿠퍼액으로 뒤덮인 육봉의 위아래로 열정적으로 움직이자, 음란한 따뜻함이 몸 전체에서 생겨난다.")
						);
					} else {
						sWikifier("당신이 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무하자, 음란한 따뜻함이 생겨난다.");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 포피가 허용하는 한 거칠게 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 육봉 끝에서 끝까지 위아래로 비벼댄다."));
						} else {
							sWikifier("당신은 손가락들을 당신의 <<penisPost>> 아래쪽으로 움직이며, 그 느낌을 즐긴다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("당신은 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 위아래로 펌프질한다.");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신이 손가락들을 당신의 육봉 위아래로 움직이면서, 살짝 자극하자 음란한 따뜻함이 생겨난다."));
						} else {
							sWikifier("당신은 천천히 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무한다.");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 포피가 허용하는 한 거칠게 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 육봉 끝에서 끝까지 위아래로 비벼댄다."));
						} else {
							sWikifier("당신은 손가락들을 당신의 <<penisPost>> 아래쪽으로 움직이며, 그 느낌을 즐긴다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("당신은 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 위아래로 펌프질한다.");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신이 손가락들을 당신의 육봉 위아래로 움직이면서, 살짝 자극하자 음란한 따뜻함이 생겨난다."));
						} else {
							sWikifier("당신은 천천히 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무한다.");
						}
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">당신은 양손을 당신의 <<penisPost>>에서 치운다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 <<hand_ rul '${arm}'>> 당신의 <<penisPost>>에서 치운다.</span>`);
			}
			break;
		case "mchastityparasiterub":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`당신은 부드럽게 기생충 자지를 애무한다.`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 10 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열정적으로" : "천천히";
				wikifier("arousal", 500, "masturbationPenis");
				V.earSlime.vibration += handsOn * 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`당신이 기생충 자지를 희롱하려 애쓰자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보내고</span>, 당신은 그것을 거의 참고 있기가 힘들다.`
					);
				} else {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 애무하자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`당신은 가능한 거칠게 기생충 자지를 희롱하며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 느껴지는 쾌감을 즐긴다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 기생충 자지를 여러 방법으로 비벼대며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 교차하는 느낌을 즐긴다.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신이 부드럽게 기생충 자지를 애무하자, 그것은 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 쾌감을 전해준다.`
						)
					);
				}
			}
			break;
		case "mchastityparasitesqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`당신은 부드럽게 기생충 자지를 쥐어짠다.`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 0.1 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열정적으로" : "천천히";
				wikifier("arousal", 500 * handsOn, "masturbationGenital");
				V.earSlime.vibration += 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`당신이 기생충 자지를 쥐어짜려 애쓰자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보내고</span>, 당신은 그것을 거의 참고 있기가 힘들다.`
					);
				} else {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 쥐어짜자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`당신은 반복적으로 기생충 자지와 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}를 쥐어짜며, 당신이 줄 수 있는 제한적인 관심을 즐긴다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(`당신은 기생충 자지를 쥐어짜며, 당신의 ${V.player.virginity.penile === true ? "동정 자지" : "자지"}도 동시에 쥐어짠다.`)
					);
				} else {
					fragment.append(
						span(
							`당신은 부드럽게 기생충 자지를 쥐어짜며, 그것이 둘러싸고 있는 ${V.player.virginity.penile === true ? "동정 자지" : "자지"}를 느낀다.`
						)
					);
				}
			}
			// Help shrink the penis only when both pregnant and with a penis size of mini, had trouble reaching micro without additional help
			if (
				playerIsPregnant() &&
				playerPregnancyProgress() >= 0.1 &&
				V.player.penissize <= -1 &&
				(!V.daily.chastityParasizeSizeReduction || V.daily.chastityParasizeSizeReduction < 150)
			) {
				V.penisgrowthtimer += 3;
				V.daily.chastityParasizeSizeReduction = (V.daily.chastityParasizeSizeReduction || 0) + 1;
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">당신은 양손을 기생충 정조대에서 치운다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 <<hand_ rul '${arm}'>> 기생충 정조대에서 치운다.</span>`);
			}
			break;
		case "mballsstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("당신은 양손을 당신의 고환에서 치운다.", "lblue"));
			} else {
				fragment.append(span(`당신은 ${handPost(arm, '을')} 당신의 고환에서 치운다.`, "lblue"));
			}
			break;
		case "mballsfondle":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 50 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`무언가 느끼도록 당신은 거칠게 ${balls} 더듬으라고 강요된다.`);
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						fragment.append(
							span(
								`당신은 양손으로 당신의 ${balls} 더듬으며 그것이 당신의 자지 밑둥에서 긴장하며 꽉 조이는 느낌을 즐긴다.`
							)
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`당신은 양손으로 당신의 ${balls} 애무하며 그 간지러운 느낌을 즐긴다.`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`당신은 양손 안의 ${balls} 이리저리 움직이며 그 무게감을 즐긴다.`));
					} else {
						fragment.append(span(`당신은 양손 안의 ${balls} 이리저리 굴린다.`));
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier(
							`당신은 <<hand_ ro '${arm}'>> ${altText.oneOfYour} 더듬으며 그것이 당신의 <<penisPost>> 밑둥에서 긴장하며 꽉 조이는 느낌을 즐긴다.`
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 애무하며 그 간지러운 느낌을 즐긴다.`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`당신은 ${handPost(arm)} 안의 ${altText.oneOfYour} 이리저리 움직이며 그 무게감을 즐긴다.`));
					} else {
						fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 쓰다듬는다.`));
					}
				}
				additionalEffect.hands = "ballplayeffects";
			}
			break;
		case "mballssqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`무언가 느끼도록 당신은 거칠게 ${balls} 쥐어짜라고 강요된다.`);
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				altText.gently = V.arousal >= V.arousalmax * (4 / 5) ? "절박하게" : V.arousal >= V.arousalmax * (3 / 5) ? "" : "부드럽게";
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 양손으로 당신의 ${balls} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 3:
							fragment.append(span(`당신은 양손으로 당신의 ${balls} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 4:
							fragment.append(span(`당신은 양손으로 ${altText.gently} 당신의 ${balls} 쥐어짠다.`));
							break;
						default:
							fragment.append(span("이 문장은 나오지 말아야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 3:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 4:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						default:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} 당신의 ${balls} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
					}
				}
				additionalEffect.hands = "ballplayeffects";
			}
			break;
		case "mballsentrance":
			clearAction("mballsfondle");
			V[arm + "arm"] = "mballs";
			if (doubleAction) V[otherArm + "arm"] = "mballs";
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다`));
							break;
						case 3:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 그것들은 당신의 손바닥에 딱 들어온다`));
							break;
						case 4:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 당신은 간신히 그것들을 양손으로 감싼다`));
							break;
						default:
							fragment.append(span("이 문장은 나오지 말아야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다.`));
							break;
						case 3:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 그것은 당신의 손바닥에 딱 들어온다`));
							break;
						case 4:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 당신은 간신히 그것을 손으로 감싼다`));
							break;
						default:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} 당신의 양쪽 ${balls} 가뿐하게 잡는다.`));
							break;
					}
				}
				fragment.append(span(`. 당신은 잠시 움직임을 멈춘다. `));
				fragment.append(span(`당신은 아무것도 느낄 수가 없었다.`, "red"));
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다.`, "blue"));
							break;
						case 3:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 그것들은 당신의 손바닥에 딱 들어온다.`, "blue"));
							break;
						case 4:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 당신은 간신히 그것들을 양손으로 감싼다.`, "blue"));
							break;
						default:
							fragment.append(span("이 문장은 나오지 말아야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다.`, "blue"));
							break;
						case 3:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 그것은 당신의 손바닥에 딱 들어온다.`, "blue"));
							break;
						case 4:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 당신은 간신히 그것을 손으로 감싼다.`, "blue"));
							break;
						default:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} 당신의 양쪽 ${balls} 가뿐하게 잡는다.`, "blue"));
							break;
					}
				}
				additionalEffect.hands = "ballplayeffects";
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
			if (V.worn.genitals.name === "chastity parasite") {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신은 가능한 거칠게 기생충 자지를 희롱하며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 느껴지는 쾌감을 즐긴다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 기생충 자지를 여러 방법으로 비벼대며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 교차하는 느낌을 즐긴다.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신이 부드럽게 기생충 자지를 애무하자, 그것은 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 쾌감을 전해준다.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 위아래로 거칠게 펌프질한다.`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신의 <<hand_ ga '${altText.hands}'>> 손가락들을 당신의 육봉 위아래로 움직이면서, 살짝 자극하자 음란한 따뜻함이 생겨난다.`));
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 부자연스러운 움직임으로 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무한다.`);
				}
			}
			break;
		case "mbreastW":
			wikifier("arousal", 200 * handsOn, "masturbationBreasts");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.player.breastsize < 2) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 민감한 젖꼭지를 견디지 못할 정도로 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다.`
					);
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함을 점점 커지게 한다.`);
				}
			} else if (V.player.breastsize < 5) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견디지 못할 정도로 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다.`
					);
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함을 점점 커지게 한다.`);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견디지 못할 정도로 희롱한다. 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다.`
					);
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 당신은 음란한 따뜻함이 점점 커지는 것을 느낀다.`);
				}
			}
			if (V.milk_amount >= 1) {
				fragment.append(" ");
				fragment.append(span("모유가 당신의 유두에서 흘러나온다.", "lewd"));
				fragment.append(wikifier("breastfeed", handsOn));
			}
			clearAction(); // Needs to run after any breastfeed widget
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
						sWikifier(`당신의 손가락들이 <<pussyPost>>에 꿈틀거리면서 들락날락하며, 갑작스럽게 날카로운 찌르기로 당신을 범한다.`);
						break;
					case 2:
						sWikifier(`당신의 클리토리스가 손가락들 사이에서 까질 듯이 비벼지며, 한 순간도 회복할 틈을 주기를 거부한다.`);
						break;
					case 3:
						sWikifier(`당신의 손가락들이 <<pussyPost>> 안에서 전율하며, 당신의 온몸을 음란한 진동으로 고문한다.`);
						break;
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> <<pussy_ rul>> 탐색하며, 안으로 들어가기 위해 서로를 향해 갑자기 움직인다.`);
						break;
					case 2:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 거칠게 <<pussy_ rul>> 손으로 쥐고, 한 손이 다른 손 위에서 떨린다.`);
						break;
					case 3:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 번갈아가며 클리토리스를 찌른다.`);
						break;
				}
			} else {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`당신의 손가락들이 <<pussy_ rul>> 희롱하며, 하나씩 연속으로 당신의 틈을 횡단한다.`);
						break;
					case 2:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 음순을 주무르며, 손가락들은 당신의 보지 입구에서 씰룩거린다.`);
						break;
					case 3:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 허벅지를 애무하며, 천천히 비틀어 연다.`);
						break;
				}
			}
			break;
		case "mpenisstopW":
			clearAction();
			if (V.worn.genitals.name === "chastity parasite") {
				altText.penis = "기생충 정조대 자지";
			} else {
				altText.penis = "<<penisPost>>";
			}
			if (doubleAction) {
				sWikifier(`당신은 양손을 당신의 ${altText.penis}에서 치운다. 양손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<hand_ rul '${arm}'>> 당신의 ${altText.penis}에서 치운다. 그 손이 떨린다.`);
			}
			break;
		case "mbreaststopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`당신은 양손을 당신의 <<breastsPost>>에서 치운다. 양손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<hand_ rul '${arm}'>> 당신의 <<breastsPost>>에서 치운다. 그 손이 떨린다.`);
			}
			break;
		case "mvaginastopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`당신은 양손을 당신의 <<pussyPost>>에서 치운다. 양손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<hand_ rul '${arm}'>> 당신의 <<pussyPost>>에서 치운다. 그 손이 떨린다.`);
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
			altText.toy = `${altText.selectedToy.colour ? trColour(altText.selectedToy.colour) : ""} ${sextoyPost(altText.selectedToy.name, '을')}`;
			// Set the default action
			if (altText.toyType.includes("stroker")) {
				V[armActionDefault] = "mpenisentrancestroker";
			} else if (altText.toyType.includes("breastpump")) {
				V[armActionDefault] = "mbreastpump";
			} else {
				V[armActionDefault] = V.player.vaginaExist ? "mvaginaentrancedildo" : "manusentrancedildo";
			}

			fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.toy} 잡는다.`));
			break;
		case "mdildostop":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 내려놓는다.`, "lblue"));
			} else {
				fragment.append(span(`당신은 ${handPost(arm, '의')} ${toyDisplay(altText.selectedToy, '을')} 내려놓는다.`, "lblue"));
			}
			break;
		case "mpenisentrancestroker":
			if (V.penisuse === 0 || V.penisuse === "stroker") {
				clearAction("mpenisstrokertease");
				V.penisuse = "stroker";
				V[arm + "arm"] = "mpenisentrancestroker";
				altText.selectedToy = selectedToy(arm);
				if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`당신은 노출된 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르다, 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르다, 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					}
				} else {
					wikifier("arousal", 50 * handsOn, "masturbationPenis");
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">당신은 노출된 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르며 기대감에 몸을 떤다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르며, 기대감에 몸을 떤다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					}
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenisstrokertease":
			clearAction("mpenisentrancestroker");
			V[arm + "arm"] = "mpenisentrancestroker";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (genitalsExposed()) {
					sWikifier(
						`당신은 당신의 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '을'
						)} 당신의 <<penisPost>>에 문지르지만, 얼굴을 찌푸린다. <span class="red">당신은 아직까지 아무것도 느낄 수가 없었다.</span>.`
					);
				} else {
					sWikifier(
						`당신은 당신의 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '을'
						)} 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.`
					);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (genitalsExposed()) {
					sWikifier(`당신은 당신의 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<penisPost>>에 문지르며, 기대감에 몸을 떤다.`);
				} else {
					sWikifier(
						`당신은 당신의 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '을'
						)} 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.`
					);
				}
			}
			break;
		case "mpenisstroker":
			clearAction();
			V[arm + "arm"] = "mpenisstroker";
			V.penisuse = "stroker";
			altText.selectedToy = selectedToy(arm);
			if (earSlimeDefy()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 25, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`무언가 느끼도록 당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로')} 당신의 <<penis_ rul>> 범하라고 강요된다.`
					);
				} else {
					sWikifier(`무언가 느끼도록 당신은 ${toyDisplay(altText.selectedToy, '으로')} 당신의 <<penis_ rul>> 범하라고 강요된다.`);
				}
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 600, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 100, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`<span class="purple">당신이 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '으로'
						)} 쿠퍼액으로 뒤덮인 <<penis_ rul>> 거칠게 범하자,</span> <span class="lewd">넘쳐나는 쿠퍼액이 그 끝에서 튀어 날아간다.</span>`
					);
				} else {
					sWikifier(
						`<span class="purple">당신이 ${toyDisplay(
							altText.selectedToy, '으로'
						)} 쿠퍼액으로 뒤덮인 <<penis_ rul>> 거칠게 범하자,</span> <span class="lewd">음란한 따뜻함이 몸 전체에서 생겨난다.</span>`
					);
				}
			} else {
				wikifier("arousal", 400, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 50, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로')} 당신의 <<penis_ rul>> 범한다.</span>`);
				} else {
					sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, '으로')} 당신의 <<penis_ rul>> 범한다.</span>`);
				}
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
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<penisPost>>에서 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 <<hand_ yi '${arm}'>> <${toyDisplay(altText.selectedToy, '을')} 당신의 <<penisPost>>에서 치운다.</span>`);
			}
			break;
		case "mbreastpump":
			clearAction("mbreastpumppump");
			V[arm + "arm"] = "mbreastpump";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mbreastpump";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="blue">당신은 당신의 ${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy, '을'
					)} <<breastsPost>> 위에 씌워, 모유를 짜 낼 준비를 한다.</span>`
				);
			} else {
				sWikifier(`<span class="blue">당신은 당신의 ${toyDisplay(altText.selectedToy, '을')} <<breastsPost>> 위에 씌워, 모유를 짜 낼 준비를 한다.</span>`);
			}
			break;
		case "mbreastpumppump":
			wikifier("arousal", 75 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 3 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toys = `당신은 <<breastsPost>>에 있는 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 사용`;
			} else {
				altText.toys = `당신은 <<breastsPost>>에 있는 ${toyDisplay(altText.selectedToy, '을')} 사용`;
			}
			if (V.lactating === 1 && V.breastfeedingdisable === "f") {
				if (V.milk_amount >= 1 && V.earSlime.focus === "pregnancy" && V.earSlime.growth >= 100 && !V.earSlime.defyCooldown) {
					wikifier("arousal", 100 * handsOn, "masturbationNipples");
					sWikifier(`${altText.toys}하고, <span class="lewd">모유가 젖꼭지에서 터져나와, 빠르게 병을 채운다.</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 4.5), "pump"));
				} else if (V.milk_amount >= 1) {
					sWikifier(`${altText.toys}하고, <span class="lewd">모유가 젖꼭지에서 병 속으로 흘러나온다.</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 3.5), "pump"));
				} else {
					sWikifier(`${altText.toys}하지만, 젖꼭지에서는 모유가 나오지 않는다. 모유가 다 말라버린게 분명하다.`);
				}
			} else {
				sWikifier(`${altText.toys}하지만, 젖꼭지에서는 모유가 나오지 않는다. 당신에게서는 아직 모유가 나오지 않는 것이 분명하다.`);
				if ((!V.daily.lactatingPressure || V.daily.lactatingPressure <= 5) && random(0, 100) >= 90) {
					if (!V.daily.lactatingPressure) V.daily.lactatingPressure = 0;
					V.daily.lactatingPressure++;
					wikifier("milkvolume", handsOn);
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mstopbreastpump":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<breastsPost>>에서 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 <<hand_ yi '${arm}'>> ${toyDisplay(altText.selectedToy, '을')} 당신의 <<breastsPost>>에서 치운다.</span>`);
			}
			break;
		case "mchestvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 2 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
				altText.hands = "양손의";
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
				altText.hands = `<<hand_ yi '${arm}'>>`;
			}
			if (breastsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationNipples");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신의 젖꼭지는 ${altText.toyDisplay} 당신이 견딜 수 있는 한 가장 세게 비비는데도 불구하고 계속 발기하면서, 그 진동으로 당신에게 끊임없는 쾌감을 주고 있다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은  ${altText.hands} ${altText.toyDisplay} 점점 단단해지는 젖꼭지를 비벼댄다.`));
				} else {
					fragment.append(
						span(
							`당신은 ${altText.hands} ${altText.toyDisplay} 젖꼭지를 누르며, 그 진동이 계속되면서 음란한 따뜻함이 점점 커지는 것을 느낀다.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 젖꼭지는 옷감을 통해 ${altText.toyDisplay} 비벼대는데도 불구하고, 당신의 <<topasidePost>> 아래에서 발기해 있다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(`당신은 <<topaside_ rul>> 통해 ${altText.hands} ${altText.toyDisplay} 점점 단단해지는 젖꼭지를 비벼댄다.`);
				} else {
					sWikifier(
						`당신은 ${altText.hands} ${altText.toyDisplay} 젖꼭지를 누른다. 당신의 <<topaside_ ga>> 사이에 있음에도 불구하고, 좋은 느낌이 든다.`
					);
				}
			}
			fragment.append(" ");
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("모유가 당신의 유두에서 흘러나와, 당신의 웃옷 안으로 흘러내린다.", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 모유를 모으기를 원한다면 웃옷을 벗어야 한다."));
					} else {
						fragment.append(span("모유가 당신의 유두에서 흘러나와, 장난감을 모유로 뒤덮는다.", "lewd"));
					}
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 1.5)));
				} else {
					fragment.append(span("모유가 당신의 유두에서 흘러나오지 않는다. 다 말라버린 듯 하다."));
				}
			}
			break;
		case "mpenisvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
			}
			if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(`당신은 진동하는 ${altText.toyDisplay} 당신의 동정 자지를 당신의 포피가 허용하는 한 거칠게 위아래로 비벼댄다.`)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span(`당신은 ${altText.toyDisplay} 당신의 동정 자지를 위아래로 비벼대고, 그 진동은 당신을 빠르게 흥분시킨다.`));
					} else {
						sWikifier(`당신은 부드럽게 <<trChangePost '${altText.toyDisplay}' '을'>><<print _trResult>> <<penisPost>> 아래에 갖다대면서, 그 느낌을 즐긴다.`);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(`당신은 진동하는 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼댄다.`);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(`당신은 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼대고, 그 진동은 빠르게 강해지는 음란한 따뜻함을 만들어낸다.`);
					} else {
						sWikifier(`당신은 부드럽게 <<trChangePost '${altText.toyDisplay}' '을'>><<print _trResult>> <<penisPost>> 아래에 갖다대면서, 그 느낌을 즐긴다.`);
					}
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`당신은 <<bottomaside_ rul>> 통해 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼댄다.`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신은 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼대고, 그 진동은 <<bottomaside_ rul>> 통하는데도 불구하고 당신을 빠르게 흥분시킨다.`
					);
				} else {
					sWikifier(
						`당신은 부드럽게 <<trChangePost '${altText.toyDisplay}' '을'>><<print _trResult>> <<penisPost>> 아래에 갖다대면서, <<bottomaside_ ga>> 사이에 있음에도 불구하고 그 느낌을 즐긴다.`
					);
				}
			}
			break;
		case "mvaginaclitvibrate":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">당신은 부드럽게 ${altText.toyDisplay} <<clit_ ul>> 누르고, 그 진동은 당신 안의 벌레들이 기어다니는 느낌과 합쳐져 당신의 발가락을 움츠러들게 한다.</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `당신은 부드럽게 ${altText.toyDisplay} <<clit_ ul>> 누르고,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						wikifier("trClothes", "face", V.worn.face.name, "name"); altText.gag = T.trResult;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = sextoyPost(selectedToy("left").name);
					} else {
						altText.gag = sextoyPost(selectedToy("right").name);
					}
					sWikifier(`${altText.start} 그 느낌 때문에 나오는 부드러운 신음소리가 당신의 입을 막고 있는 ${altText.gag}에 묻혀 나온다.`);
				} else {
					sWikifier(`${altText.start} 그 느낌 때문에 부드럽게 신음소리를 낸다.`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<exposedlower_ rul>> 통해 ${altText.toyDisplay} <<clit_ ul>> 누르며, 옷감이 사이에 있음에도 불구하고 그 느낌을 즐긴다.</span>`
				);
			}
			break;
		case "mvaginaclitvibrateparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">당신은 부드럽게 ${altText.toyDisplay} <<clitPost>> 위의 ${trParasite(V.parasite.clit.name, '을')} 누르고, 그 진동은 빨리는 느낌과 당신 안의 벌레들이 기어다니는 느낌과 모두 합쳐져 당신의 발가락을 움츠러들게 한다.</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `당신은 부드럽게 ${altText.toyDisplay} <<clitPost>> 위의 ${trParasite(V.parasite.clit.name, '을')} 누르고,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						wikifier("trClothes", "face", V.worn.face.name, "name"); altText.gag = T.trResult;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = sextoyPost(selectedToy("left").name);
					} else {
						altText.gag = sextoyPost(selectedToy("right").name);
					}
					sWikifier(`${altText.start} 그 느낌 때문에 나오는 부드러운 신음소리가 당신의 입을 막고 있는 ${altText.gag}에 묻혀 나온다.`);
				} else {
					sWikifier(`${altText.start} 그 빨리는 느낌 때문에 부드럽게 신음소리를 낸다.`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<exposedlower_ rul>> 통해 ${altText.toyDisplay} <<clitPost>> 위의 ${trParasite(V.parasite.clit.name, '을')} 누르며, 그 반응으로 그것이 당신을 더 빨려고 하는 느낌을 즐긴다.</span>`
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
				altText.toys = `당신은 ${toyDisplay(altText.selectedToy, '을')} 당신의 입까지 가져오며,`;
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`${altText.toys} 연습을 해 보기를 갈망한다.`));
				} else {
					fragment.append(span(`${altText.toys} 그것이 입술에 닿는 느낌을 즐긴다.`));
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mdildopiston":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			altText.selectedToy = selectedToy(arm);
			altText.toyDisplay = toyDisplay(altText.selectedToy, '을');
			if (currentSkillValue("oralskill") < 100) {
				altText.beginner = altText.selectedToy.name.includes("small")
					? "그 적당한 크기가 당신 같은 초보자에게는 딱 맞다고 느낀다."
					: "너무 깊숙이 밀어넣지 않도록 조심한다.";
				fragment.append(span(`당신은 조심스럽게 ${altText.toyDisplay} 입 속에서 앞뒤로 움직이고, ${altText.beginner}`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(
					span(`당신은 ${altText.toyDisplay} 입에 넣은 머리를 앞뒤로 재빠르게 움직이며, 그것이 당신의 입술과 혀를 비벼대며 주는 느낌을 즐긴다.`)
				);
			} else {
				wikifier("arousal", 200, "masturbationOral");
				fragment.append(
					span(
						`당신은 머리를 앞뒤로 재빠르게 움직이면서 솜씨좋게 ${altText.toyDisplay} 핥고 희롱하며, 그것이 주는 음란한 느낌을 한껏 즐긴다.`
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
					`당신은 ${toyDisplay(altText.selectedToy, '을')} 입 속에 넣으며, 그것을 입술 사이로 찔러넣을 때 혀로 그것을 살짝 핥는다.`
				)
			);
			break;
		case "mvaginaentrance":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarub" : "mvaginaclit");
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			V[arm + "arm"] = "mvaginaentrance";
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrance";
			}
			altText.fingers = handsOn === 2 ? "손가락들을" : "손가락을";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`<span class="blue">당신은 ${altText.fingers} 당신의 노출된 <<pussyPost>> 위로 문지르면서, 벌레들이 돌아다니는 것을 느낀다.</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`<span class="blue">당신은 ${altText.fingers} 당신의 노출된 <<pussyPost>> 위로 문지르면서 기대감에 몸을 떤다.</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`<span class="blue">당신은 ${altText.fingers} 당신의 노출된 <<pussyPost>> 위로 문지르면서, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvagina":
			if (V.vaginause === 0) {
				V.fingersInVagina += V.mVaginaFingerAdd;
				clearAction(
					V.mVaginaFingerAdd === 2 && V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4
						? "mvaginafingeraddtwo"
						: "mvaginafingeradd"
				);
				V[arm + "arm"] = "mvagina";
				V.vaginause = "mfingers";
				wikifier("arousal", V.mVaginaFingerAdd === 2 ? 250 : 200, "masturbationVagina");
				wikifier("addVaginalWetness", 1);
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 번들거리는 " : "";
				altText.finger = V.mVaginaFingerAdd === 2 ? `${altText.lubricated}손가락 두 개를` : `${altText.lubricated}손가락을`;
				if (altText.lubricated.includes("semen")) V.semenInVagina = true;
				if (hymenIntact) {
					sWikifier(`<span class="purple">당신은 당신의 온전한 처녀막에 닿을 때까지 ${altText.finger} 당신의 <<pussy_>>에 밀어넣는다.</span>`);
				} else if (V.bugsinside) {
					sWikifier(`<span class="purple">당신은 ${altText.finger} 당신의 <<pussy_>>에 밀어넣는다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`);
				} else {
					sWikifier(`<span class="purple">당신은 당신의 <<pussy_ rul>> 벌리면서 ${altText.finger} 밀어넣는다.</span>`);
				}
				fragment.append(fingersEffect(span, hymenIntact));
			} else {
				clearAction("mvaginaclit");
			}
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
			altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 번들거리는 " : "";
			altText.finger = V.mVaginaFingerAdd === 2 ? `${altText.lubricated}손가락 두 개를 더` : `${altText.lubricated}손가락 하나를 더`;

			if (V.bugsinside === 1) {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(
						`<span class="lblue">${altText.lubricated}마지막 남은 손가락을 당신 자신 안에 집어넣으며 당신은 헉 하고 숨을 들이쉰다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`
					);
				} else {
					sWikifier(
						`<span class="lblue">당신은 당신의 <<pussy_>>에 ${altText.finger} 밀어넣으며 <<pussy_ rul>> 더욱 확장한다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`
					);
				}
			} else {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(`<span class="lblue">${altText.lubricated}마지막 남은 손가락을 당신 자신 안에 집어넣으며 당신은 헉 하고 숨을 들이쉰다.</span>`);
				} else {
					sWikifier(`<span class="lblue">당신은 당신의 <<pussy_>>에 ${altText.finger} 밀어넣으며 <<pussy_ rul>> 더욱 확장한다.</span>`);
				}
			}
			fragment.append(fingersEffect(span, hymenIntact));
			break;
		case "mvaginafistadd":
			clearAction("mvaginafist");
			V.fingersInVagina = 5;
			V[arm + "arm"] = "mvaginafist";
			V.vaginause = "mvaginafist";
			wikifier("arousal", 650, "masturbationVagina");
			sWikifier(
				`<span class="lblue">마지막으로 힘을 주어, 당신은 다섯 손가락 모두를 당신의 보지에 밀어넣는다.</span> 당신은 당신의 근육이 삽입에 맞춰 벌어져 당신의 손을 감싸고 고동치는 것이 느껴진다.`
			);
			break;
		case "mvaginatease":
			clearAction();
			wikifier("arousal", 300 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.fingers = V.fingersInVagina === 1 ? "손가락으로" : "손가락으로";
			wikifier("addVaginalWetness", V.fingersInVagina);
			if (V.bugsinside) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(
							`당신이 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시자, 애액이 곤충과 벌레들과 섞여서, 함께 흘러나온다.`
						);
					} else {
						sWikifier(`당신이 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시자, 곤충과 벌레들이 흘러나온다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`당신은 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시며, 그 안의 곤충과 벌레들을 느낀다.`
					);
				} else {
					sWikifier(
						`당신은 주변의 벌레 몇 마리를 같이 눌러대며, 당신의 <<pussy_>> 입구를 <<trNumber $fingersInVagina>> ${altText.fingers} 부드럽게 쑤신다.`
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(`당신이 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시자, 애액이 흘러나온다.`);
					} else {
						sWikifier(`당신은 닿을 수 있는 가장 깊숙한 곳까지 밀어넣으며, <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤신다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`당신은 그리 깊게 넣지 않음에도 스릴을 느끼며, <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤신다.`
					);
				} else {
					sWikifier(`당신은 당신의 <<pussy_>> 입구를 <<trNumber $fingersInVagina>> ${altText.fingers} 부드럽게 쑤신다.`);
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
					sWikifier(`당신은 당신의 욱신거리는 <<pussyPost>>에 손 전체를 억지로 밀어넣는다. 애액이 당신의 손목을 타고 흘러내린다.`);
				} else {
					sWikifier(`당신은 당신의 욱신거리는 <<pussyPost>>에 손 전체를 억지로 밀어넣는다.`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`당신은 당신의 <<pussy_ rul>> 손 전체로 찔러댄다. 당신의 내벽이 손을 감싸며 움찔거린다.`);
			} else {
				sWikifier(`당신은 당신의 근육이 반복적으로 늘어나는 것을 느끼며, 당신의 <<pussyPost>> 안에서 주먹을 부드럽게 움직인다.`);
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "손가락들로" : "손가락으로";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span(`당신은 엄지손가락으로 클리토리스를 누른 채 원을 그리며 비비면서, 흥분감이 차오르는 것을 느낀다.`));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`당신은 ${altText.fingers} 클리토리스의 끝을 희롱한다.`));
			} else {
				fragment.append(span(`당신은 ${altText.fingers} 클리토리스를 비비며, 음란한 기분을 쌓아나간다.`));
			}
			break;
		case "mvaginarub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.fingers = handsOn === 2 ? "손가락들을" : "손가락을";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`당신은 ${altText.fingers} 당신의 노출된 <<pussy_>> 위에서 움직이며, 그 주변을 돌아다니는 벌레들을 느낀다.`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`당신은 ${altText.fingers} 당신의 노출된 <<pussy_>> 위에서 움직이며 기대감에 몸을 떤다.`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`당신은 ${altText.fingers} 당신의 <<pussy_>> 위에서 움직이며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "손가락들로" : "손가락으로";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(`당신은 클리토리스 위의 ${trParasite(V.parasite.clit.name, '을')} 쥐어짜며, 그것이 당신에게 더 적극적으로 쾌감을 주면서 당신의 흥분감이 차오르는 것을 느낀다.`)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`당신은 ${altText.fingers} 클리토리스 위의 ${trParasite(V.parasite.clit.name, '을')} 희롱한다.`));
			} else {
				fragment.append(span(`당신은 ${altText.fingers} 클리토리스 위의 ${trParasite(V.parasite.clit.name, '을')} 비비고, 그것이 같은 방법으로 반응하며 음란한 기분을 쌓아나간다.`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.fingersInVagina = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">당신은 당신의 양손을 <<pussy_>>에서 치운다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 당신의 <<hand_ rul '${arm}'>> <<pussy_>>에서 치운다.</span>`);
			}
			break;
		case "mvaginafingerremove":
			V.fingersInVagina -= 1;
			if (V.fingersInVagina >= 1) {
				clearAction();
				V[arm + "arm"] = "mvagina";
				if (V.vaginause === "mvaginafist") V.vaginause = "mfingers";
				sWikifier('<span class="lblue">당신은 당신의 <<pussy_>>에서 손가락을 하나 꺼낸다.</span>');
			} else {
				clearAction("mvaginarub");
				V[arm + "arm"] = "mvaginaentrance";
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">당신은 당신의 <<pussy_>>에서 손가락을 꺼낸다.</span>');
			}
			break;
		case "mvaginafistremove":
			clearAction("mvaginarub");
			V[arm + "arm"] = "mvaginaentrance";
			V.fingersInVagina = 0;
			V.vaginause = 0;
			wikifier("arousal", 1000, "masturbationVagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(
					'<span class="lblue">당신은 당신의 <<pussy_>>에서 손 전체를 꺼낸다. 애액이 흘러나오며 당신의 근육들이 항의하듯 꿈틀거리는 것이 느껴진다.</span>'
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier('<span class="lblue">당신은 당신의 <<pussy_>>에서 손 전체를 꺼내며, 뭔가 비어 있는 듯한 느낌을 받는다.</span>');
			} else {
				sWikifier('<span class="lblue">당신은 당신의 <<pussy_>>에서 손 전체를 꺼낸다. 당신의 근육들이 이완되는 것이 느껴진다.</span>');
			}
			break;
		case "mvaginaentrancedildo":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarubdildo" : "mvaginaclitdildo");
			V[arm + "arm"] = "mvaginaentrancedildo";
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을');
			if (genitalsExposed()) {
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(`<span class="blue">당신은 노출된 <<pussyPost>> 위로 당신의 ${altText.toyDisplay} 문지르며 기대감에 몸을 떤다.</span>`);
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(`<span class="blue">당신은 <<pussyPost>> 위로 당신의 ${altText.toyDisplay} 문지르며,  <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`);
			}
			break;
		case "mvaginadildo":
			clearAction("mvaginateasedildo");
			V[arm + "arm"] = "mvaginadildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginadildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "정액으로 번들거리는 " : "";
			} else {
				altText.lubricated = V[arm + "FingersSemen"] >= 1 ? "정액으로 번들거리는 " : "";
			}
			if (altText.lubricated.includes("semen")) V.semenInVagina = true;
			wikifier("arousal", 150 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 1);
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을');

			if (hymenIntact) {
				sWikifier(
					`<span class="purple">당신은 당신의 온전한 처녀막에 닿을 때까지 ${altText.lubricated}${altText.toyDisplay} 당신의 <<pussy_>>에 밀어넣는다.</span>`
				);
			} else if (V.bugsinside) {
				sWikifier(
					`<span class="purple">당신은 ${altText.lubricated}${altText.toyDisplay} 당신의 <<pussy_>>에 밀어넣는다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`
				);
			} else {
				sWikifier(
					`<span class="purple">당신은 당신의 <<pussy_ rul>> 벌리면서 ${altText.lubricated}${altText.toyDisplay} 밀어넣는다.</span>`
				);
			}
			break;
		case "mvaginateasedildo":
			clearAction();
			altText.selectedToy = selectedToy(arm);
			altText.toyPleasure = 2 + (altText.selectedToy.type.includes("vibrator") ? 5 : 3);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyPleasure += altText.selectedOtherToy.type.includes("vibrator") ? 5 : 3;
			}
			wikifier("arousal", 300 + 50 * altText.toyPleasure, "masturbationVagina");
			wikifier("addVaginalWetness", altText.toyPleasure);

			altText.wet = "";
			if (V.vaginaArousalWetness >= 40) {
				altText.wet = "젖은 ";
			} else if (V.vaginaArousalWetness >= 20) {
				altText.wet = "번들거리는 ";
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					sWikifier(`당신이 ${altText.toyDisplay} 당신의 ${altText.wet}<<pussy_ rul>> 안팎으로 쑤시자, 애액이 흘러나온다.`);
				} else {
					sWikifier(`당신은 닿을 수 있는 가장 깊숙한 곳까지 밀어넣으며, ${altText.toyDisplay} 당신의 ${altText.wet}<<pussy_ rul>> 안팎으로 쑤신다.`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`당신은 그리 깊게 넣지 않음에도 스릴을 느끼며, ${altText.toyDisplay} 당신의 ${altText.wet}<<pussy_ rul>> 안팎으로 쑤신다.`);
			} else {
				sWikifier(`당신은 당신의 ${altText.wet}<<pussy_>> 입구를 ${altText.toyDisplay} 부드럽게 쑤신다.`);
			}
			break;
		case "mvaginaclitdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(`당신은 부드럽게 당신의 ${altText.toyDisplay} 클리토리스 끝을 쓸어내지만, 당신이 점점 더 민감해지며 그것은 점점 더 단단해진다.`)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은 당신의 ${altText.toyDisplay} 클리토리스 끝을 희롱한다.`));
				} else {
					fragment.append(span(`당신은 당신의 ${altText.toyDisplay} 클리토리스를 비벼대며, 음란한 느낌을 키운다.`));
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신은 당신의 ${toyDisplay(
								altText.selectedToy, '으로'
							)} 클리토리스를 누르면서 동그라미를 그리며 비벼대고, 당신의 흥분이 커져가는 것을 느낀다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은 당신의 ${altText.toyDisplay} 클리토리스 끝을 희롱한다.`));
				} else {
					fragment.append(span(`당신은 당신의 ${altText.toyDisplay} 클리토리스를 비벼대며, 음란한 느낌을 키운다.`));
				}
			}
			break;
		case "mvaginarubdildo":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을');
				sWikifier(`당신은 노출된 <<pussyPost>> 위로 당신의 ${altText.toyDisplay} 문지르며 기대감에 몸을 떨면서, 음란한 느낌을 키운다.`);
			} else {
				sWikifier(`당신은 노출된 <<pussyPost>> 위로 당신의 ${altText.toyDisplay} 문지르며, 음란한 느낌을 키운다.`);
			}
			break;
		case "mvaginastopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="lblue">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<pussyPost>>에서 치운다.</span>`);
			} else {
				sWikifier(`<span class="lblue">당신은 <<hand_ yi '${arm}'>> ${toyDisplay(altText.selectedToy, '을')} 당신의 <<pussyPost>>에서 치운다.</span>`);
			}
			break;
		case "mvaginaentrancedildofloor":
			clearAction("mrest");
			if (V.vaginause === 0) {
				V[arm + "arm"] = 0;
				V.vaginause = "mdildopenetrate";
				V.vaginaactiondefault = "mdildopenetratebounce";
				V.currentToyVagina = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				sWikifier(`<span class="purple">당신은 <<hand_ yi '${arm}'>> ${toyDisplay(altText.selectedToy, '을')} 당신의 <<pussyPost>> 아래 바닥에 세워놓는다.</span>`);
			}
			break;
		case "manusentrance":
			clearAction("manusrub");
			wikifier("arousal", 100 * handsOn, "masturbationAss");
			V[arm + "arm"] = "manusentrance";
			if (doubleAction) V[otherArm + "arm"] = "manusentrance";
			altText.fingers = handsOn === 2 ? "손가락들을" : "손가락을";
			if (genitalsExposed()) {
				sWikifier(`<span class="blue">당신은 노출된 <<bottomPost>>까지 손을 뻗어 당신의 항문에 부드럽게 ${altText.fingers} 누른다.</span>`);
			} else {
				sWikifier(
					`<span class="blue">당신은 <<bottomPost>>까지 손을 뻗어 <<exposedlowerPost>> 위로 당신의 항문에 부드럽게 ${altText.fingers} 누른다.</span>`
				);
			}
			break;
		case "manus":
			if ([0, "manus"].includes(V.anususe)) {
				clearAction("manustease");
				wikifier("arousal", 100 * handsOn, "masturbationAnal");
				V[arm + "arm"] = "manus";
				V.anususe = "manus";
				if (doubleAction) {
					altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "정액으로 번들거리는 " : "";
					V[otherArm + "arm"] = "manus";
					sWikifier(`<span class="purple">당신은 ${altText.lubricated}손가락 두개를 당신의 <<bottomPost>> 안으로 밀어넣는다.</span>`);
				} else {
					altText.lubricated =
						(arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 번들거리는 " : "";
					sWikifier(`<span class="purple">당신은 ${altText.lubricated}손가락 하나를 당신의 <<bottomPost>> 안으로 밀어넣는다.</span>`);
				}
				if (altText.lubricated.includes("semen")) V.semenInAnus = true;
			} else {
				clearAction("manusrub");
			}
			break;
		case "manusrub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "손가락들을" : "손가락을";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`당신은 ${altText.fingers} <<bottomPost>>살 사이에 누른 채로 부드럽게 당신의 항문을 쿡쿡 찌른다.`);
					break;
				case 1:
					fragment.append(span(`당신은 동그라미를 그리며 항문을 비벼댄다.`));
					break;
				case 2:
					fragment.append(span(`당신은 ${altText.fingers} 항문에 대고 누른다. 당신은 항문이 살짝 열리는 것을 느낀다.`));
					break;
			}
			break;
		case "manustease":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "손가락들을" : "손가락을";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`당신은 ${altText.fingers} 사용해 부드럽게 당신의 <<bottomPost>> 안을 더듬는다.`);
					break;
				case 1:
					fragment.append(span(`당신은 천천히 ${altText.fingers} 당신의 항문에 넣었다 뺐다 한다.`));
					break;
				case 2:
					sWikifier(`당신은 ${altText.fingers} 사용해 당신의 <<bottom_ ul>> 범한다. 당신은 그런 곳으로 자위하는 것에 외설스러운 느낌이 든다.`);
					break;
			}
			break;
		case "manusprostate":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationAnal");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 당신의 전립선을 문지르며, 정액을 짜내면서 몸을 부르르 떤다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 당신의 전립선을 눌러, 거의 견딜 수 없을 정도로 기분 좋은 무방비한 느낌을 들게 한다."));
			} else {
				fragment.append(span("당신은 당신의 전립선을 부드럽게 찌르고, 찌를 때마다 쾌감의 물결이 당신의 몸으로 퍼져나간다."));
			}
			break;
		case "manusstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (V[otherArm + "arm"] !== "manus") V.anususe = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				V.anususe = 0;
				sWikifier(`<span class="purple">당신은 당신의 <<bottom_>>에서 양손을 뗀다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 당신의 <<bottom_>>에서 <<hand_ rul '${arm}'>> 뗀다.</span>`);
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
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을');
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">당신은 노출된 <<bottomPost>>까지 손을 뻗어 당신의 항문에 부드럽게 ${altText.toyDisplay} 누른다.</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">당신은 <<bottomPost>>까지 손을 뻗어 당신의 <<exposedlowerPost>> 위로 항문에 부드럽게 ${altText.toyDisplay} 누른다.</span>`
					);
				}
			} else {
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">당신은 노출된 <<bottomPost>>까지 손을 뻗어 당신의 항문에 부드럽게 ${toyDisplay(
							altText.selectedToy, '을'
						)} 누른다.</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">당신은 <<bottomPost>>까지 손을 뻗어 당신의 <<exposedlowerPost>> 위로 항문에 부드럽게 ${toyDisplay(
							altText.selectedToy, '을'
						)} 누른다.</span>`
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
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "정액으로 번들거리는 " : "";
				V[otherArm + "arm"] = "manusdildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="purple">당신은 ${altText.lubricated}${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy, '을'
					)} 당신의 <<bottomPost>>에 밀어넣는다.</span>`
				);
			} else {
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 번들거리는 " : "";
				sWikifier(`<span class="purple">당신은 ${altText.lubricated}${toyDisplay(altText.selectedToy, '을')} 당신의 <<bottomPost>>에 밀어넣는다.</span>`);
			}
			if (altText.lubricated.includes("semen")) V.semenInAnus = true;
			break;
		case "manusrubdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을');
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${altText.toyDisplay} <<bottomPost>>살 사이에 누른 채로 부드럽게 당신의 항문을 쿡쿡 찌른다.`);
						break;
					case 1:
						sWikifier(`당신은 ${altText.toyDisplay} 사용해 동그라미를 그리며 항문에 비벼댄다.`);
						break;
					case 2:
						sWikifier(`당신은 ${altText.toyDisplay} 항문에 대고 누른다. 당신은 항문이 살짝 열리는 것을 느낀다.`);
						break;
				}
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy, '을')} <<bottomPost>>살 사이에 누른 채로 부드럽게 당신의 항문을 쿡쿡 찌른다.`);
						break;
					case 1:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy, '을')} 사용해 동그라미를 그리며 항문에 비벼댄다.`);
						break;
					case 2:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy, '을')} 항문에 대고 누른다. 당신은 항문이 살짝 열리는 것을 느낀다.`);
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
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을');
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${altText.toyDisplay} 사용해 부드럽게 당신의 <<bottomPost>> 안을 더듬는다.`);
						break;
					case 1:
						sWikifier(`당신은 천천히 ${altText.toyDisplay} 당신의 항문에 넣었다 뺐다 한다.`);
						break;
					case 2:
						sWikifier(`당신은 ${altText.toyDisplay} 사용해 당신의 <<bottom_ ul>> 범한다. 당신은 그런 곳으로 자위하는 것에 외설스러운 느낌이 든다.`);
						break;
				}
			} else {
				switch (random(0, 2)) {
					case 0:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy, '을')} 사용해 부드럽게 당신의 <<bottomPost>> 안을 더듬는다.`);
						break;
					case 1:
						sWikifier(`당신은 천천히 ${toyDisplay(altText.selectedToy, '을')} 당신의 항문에 넣었다 뺐다 한다.`);
						break;
					case 2:
						sWikifier(`당신은 ${toyDisplay(altText.selectedToy, '을')} 사용해 당신의 <<bottom_ ul>> 범한다. 당신은 그런 곳으로 자위하는 것에 외설스러운 느낌이 든다.`);
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
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`당신은 ${altText.toyDisplay} 당신의 전립선을 문지르며, 정액을 짜내면서 몸을 부르르 떤다.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 ${altText.toyDisplay} 당신의 전립선을 눌러, 거의 견딜 수 없을 정도로 기분 좋은 무방비한 느낌을 들게 한다.`
						)
					);
				} else {
					fragment.append(
						span(`당신은 ${altText.toyDisplay} 당신의 전립선을 부드럽게 찌르고, 찌를 때마다 쾌감의 물결이 당신의 몸으로 퍼져나간다.`)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy, '으로')} 당신의 전립선을 문지르며, 정액을 짜내면서 몸을 부르르 떤다.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 ${toyDisplay(
								altText.selectedToy, '으로'
							)} 당신의 전립선을 눌러, 거의 견딜 수 없을 정도로 기분 좋은 무방비한 느낌을 들게 한다.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신은 ${toyDisplay(
								altText.selectedToy, '으로'
							)} 당신의 전립선을 부드럽게 찌르고, 찌를 때마다 쾌감의 물결이 당신의 몸으로 퍼져나간다.`
						)
					);
				}
			}
			break;
		case "manusstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<bottom_>>에서 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 <<hand_ yi '${arm}'>> ${toyDisplay(altText.selectedToy, '을')} 당신의 <<bottom_>>에서 치운다.</span>`);
			}
			break;
		case "manusentrancedildofloor":
			clearAction("mrest");
			if (V.anususe === 0) {
				V[arm + "arm"] = 0;
				V.anususe = "mdildopenetrate";
				V.anusactiondefault = "mdildopenetratebounce";
				V.currentToyAnus = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				fragment.append(span(`당신은 ${handPost(arm, '의')} ${toyDisplay(altText.selectedToy, '을')} 당신의 항문 아래 바닥에 세워놓는다.`, "purple"));
			}
			break;
		case "mmouthstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.mouth = 0;
			altText.selectedToy = selectedToy(arm, false);
			fragment.append(span(`당신은 오른손의 ${handPost(arm, '의')} ${toyDisplay(altText.selectedToy, '을')} 당신의 입에서 치운다.`, "purple"));
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
		fragment.append(" ");
		fragment.append(span("손가락이 뻑뻑하게 들어간다.", "purple"));
	} else if (V.fingersInVagina === V.vaginaFingerLimit) {
		if (hymenIntact) {
			fragment.append(" ");
			fragment.append(span("당신은 처녀막을 찢지 않고선 손가락을 더 넣을 수 없다.", "pink"));
		} else {
			fragment.append(" ");
			fragment.append(span("당신은 당신이 집어넣을 수 있는 손가락 한계에 도달했다.", "pink"));
		}
	}
	return fragment;
}

function possessedMasturbation(span, br) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	if (!V.combatBegun) {
		V.combatBegun = 1;
		return fragment;
	}

	let resist = 0;

	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.leftaction)) resist += 2;
	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.rightaction)) resist += 2;

	if (resist === 0) {
		fragment.append(span("당신은 녀석이 당신을 조종하게 둔다.", "pink"));
		sWikifier("<<pain -2>><<stress -12>><<sub 2>><<lpain>><<llstress>><<set V.wraith.will += 30>>");
	} else {
		wikifier("willpowerdifficulty", 1, Math.floor(1 + V.wraith.will), true);
		if (V.willpowerSuccess) {
			T.resistSuccess = 1;
			fragment.append(span(`당신은 몸을 통제하기 위해 싸운다. 당신은 ${resist === 4 ? "양팔을" : "팔 하나를"} 고정시킨다.`, "green"));
			wikifier("pain", resist);
			wikifier("stress", resist);
			wikifier("trauma", resist);
			wikifier("def", 2);
			wikifier("control", (Math.floor(currentSkillValue("willpower") / 24) * resist) / 10);
			V.wraith.will -= Math.floor(currentSkillValue("willpower") / 24) * resist;
			sWikifier(`<<gpain>><<gtrauma>><<gstress>><<${resist === 4 ? "gg" : "g"}control>>`);
		} else {
			fragment.append(span("당신의 몸이 말을 듣지 않는다.", "red"));
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
				sWikifier("<<gtrauma>><<gstress>><<gwillpower>>");
			});
		}
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationEffectsMouth({
	span,
	otherElement,
	additionalEffect,
	selectedToy,
	toyDisplay,
	genitalsExposed,
	breastsExposed,
	hymenIntact,
	earSlimeDefy,
}) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = defaultAction => {
		if (V.mouthaction && V.mouthaction !== "mrest") V.masturbationActions.mouthaction = V.mouthaction;
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
					sWikifier(
						`<span class="red">귓속의 슬라임이 당신에게 허리를 굽히도록 강요한다. 당신은 앞으로 다가올 일을 좋아하게 될지 확신하지 못한다.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">당신은 당신의 <<penisPost>>에 닿을 정도로 충분히 몸을 굽혀 당신의 혀로 그 끝을 핥는다.</span>`);
				} else {
					sWikifier(
						`<span class="blue">당신은 혀를 당신의 <<penisPost>> 위로 움직${
							calculatePenisBulge() ? "이며, <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : "인다"
						}.</span>`
					);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mchastityparasiteentrance":
			if (V.penisuse === 0) {
				clearAction("mchastityparasitelick");
				V.penisuse = "mouth";
				V.mouth = "mchastityparasiteentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">귓속의 슬라임이 당신에게 허리를 굽히도록 강요한다. 당신은 앞으로 다가올 일을 좋아하게 될지 확신하지 못한다.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">당신은 당신의 기생충 정조대 자지에 닿을 정도로 충분히 몸을 굽혀 당신의 혀로 그것을 핥는다.</span>`);
				} else {
					sWikifier(
						`<span class="blue">당신은 혀를 당신의 기생충 정조대 자지 위로 움직${
							calculatePenisBulge() ? "이며, <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : "인다"
						}.</span>`
					);
				}
				if (V.earSlime.defyCooldown) {
					// Do Nothing
				} else if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">그것은 당신의 <<penisPost>> 주위에서 부드럽게 고동치기 시작한다.</span>');
				} else {
					V.earSlime.vibration += 2;
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenislick":
			clearAction("mpenislick");
			if (genitalsExposed()) {
				if (earSlimeDefy()) {
					wikifier("arousal", 100, "masturbationGenital");
					wikifier("pain", 1);
					additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
					sWikifier(`무언가 느끼도록 당신은 당신의 <<penis_ rul>> 거칠게 핥으라고 강요된다.`);
				} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
					wikifier("arousal", 400, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("당신이 핥을 때마다 당신의 <<penis_ nun>> 쿠퍼액을 과도하게 뿜어내고, 당신은 그것을 삼켜야만 했지만, 당신은 멈추지 않는다.");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("당신은 혀를 당신의 귀두 위로 움직이며, 그러면서 나오는 쿠퍼액을 삼킨다.");
					} else {
						sWikifier("당신은 혀를 당신의 귀두 위로 움직이며, 쿠퍼액을 당신의 민감한 부분과 입 전체에 펴 바른다.");
					}
				} else {
					wikifier("arousal", 200, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("당신의 <<penis_ nun>> 당신이 핥을 때마다 씰룩거리지만, 당신은 멈추지 않는다.");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("당신은 혀를 당신의 당신의 귀두 위로 움직이며, 당신의 침과 쿠퍼액을 섞는다.");
					} else {
						sWikifier("당신은 혀를 당신의 당신의 귀두 위로 움직이며, 당신의 민감한 곳들에 집중한다.");
					}
				}
			} else {
				sWikifier(
					`<span class="blue">당신은 혀를 당신의 <<penisPost>> 위로 움직${
						calculatePenisBulge() ? "이며, <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : "인다"
					}.</span>`
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
				sWikifier(`<span class="blue">당신은 당신의 <<penis_ rul>> 입에 넣어, 음란한 따끔거림을 당신의 척추를 타고 흐르게 한다.</span>`);
			} else {
				sWikifier(`<span class="blue">당신은 당신의 <<penisPost>> 귀두부분을 입에 넣어, 음란한 따끔거림을 당신의 척추를 타고 흐르게 한다.</span>`);
			}
			break;
		case "mpenisdeepthroat":
			clearAction(V.selfsuckDepth < V.selfsuckLimit ? "mpenisdeepthroat" : "mpenissuck");
			V.selfsuckDepth++;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			sWikifier(`당신은 당신의 <<penis_ rul>> 당신 입 안으로 더 깊숙이 밀어넣는다. `);
			if (V.selfsuckDepth === V.penisHeight) {
				if (V.leftarm === "mpenisentrance" && V.rightarm === "mpenisentrance") {
					altText.hands = "양손을";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				} else if (V.leftarm === "mpenisentrance") {
					altText.hands = "왼손을";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
				} else if (V.rightarm === "mpenisentrance") {
					altText.hands = "오른손을";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				}
				if (altText.hands) sWikifier(`<span class="lblue">당신은 자리를 만들기 위해 ${altText.hands} 당신의 자지에서 치운다.</span> `);
				fragment.append(deepthroateffects(span));
			}
			break;
		case "mpenispullback":
			V.selfsuckDepth -= 1;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			if (V.selfsuckDepth >= 2) {
				clearAction();
				sWikifier('<span class="lblue">당신은 당신의 <<penisPost>>에서 머리를 세게 뒤로 당겨 그것의 일부를 당신의 목구멍에서 빼낸다.</span>');
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else if (V.selfsuckDepth === 1) {
				clearAction();
				sWikifier('<span class="lblue">당신은 당신의 <<penisPost>>에서 머리를 뒤로 당겨 그것을 당신의 목구멍에서 빼낸다.</span>');
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else {
				clearAction("mpenisstop");
				sWikifier('<span class="lblue">당신은 당신의 <<penisPost>> 귀두부분만 입에 남을 때까지 머리를 뒤로 당긴다.</span>');
			}
			break;
		case "mpenismouthoff":
			clearAction("mrest");
			V.mouth = "mpenisentrance";
			V.mouthstate = 0;
			sWikifier('<span class="lblue">당신은 당신의 <<penisPost>>에서 입을 치운다.</span>');
			break;
		case "mpenissuck":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`무언가 느끼도록 당신은 당신의 <<penis_ rul>> 거칠게 빨라고 강요된다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier(
							"당신이 당신의 <<penisPost>> 위에서 머리를 앞뒤로 움직이는 동안 쿠퍼액이 입 안으로 흘러들어와 당신은 그것을 끊임없이 삼킨다. 만족스러운 따뜻함이 당신의 배를 채운다."
						);
					} else {
						sWikifier(
							"당신이 당신의 <<penisPost>> 위에서 머리를 앞뒤로 움직이는 동안 쿠퍼액의 폭포가 당신의 목구멍으로 흘러내린다. 만족스러운 따뜻함이 당신의 배를 채운다."
						);
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`당신의 목구멍이 육봉을 마사지하는 동안 당신은 당신의 <<penisPost>> 밑둥을 핥는다.`);
						} else {
							sWikifier(`당신은 ${altText.eagerly} 당신의 <<penis_ rul>> 빨면서 그 밑둥을 핥는다.`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`당신은 ${altText.eagerly} 당신의 <<penis_ rul>> 빨면서 육봉을 핥는다.`);
					} else {
						sWikifier(`당신은 ${altText.eagerly} 당신의 <<penis_ rul>> 빨면서 그 끝 주위를 핥는다.`);
					}
				}
			} else {
				wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier("당신이 당신의 <<penisPost>> 위에서 머리를 앞뒤로 움직이는 동안 쿠퍼액이 입 안으로 흘러들어와 당신은 그것을 마신다.");
					} else {
						sWikifier("당신이 당신의 <<penisPost>> 위에서 머리를 앞뒤로 움직이는 동안 쿠퍼액이 당신의 목구멍으로 흘러내린다.");
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`당신의 목구멍이 육봉을 마사지하는 동안 당신은 당신의 <<penisPost>> 밑둥을 핥는다.`);
						} else {
							sWikifier(`당신은 ${altText.eagerly} 당신의 <<penis_ rul>> 빨면서 그 밑둥을 핥는다.`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`당신은 ${altText.eagerly} 당신의 <<penis_ rul>> 빨면서 육봉을 핥는다.`);
					} else {
						sWikifier(`당신은 ${altText.eagerly} 당신의 <<penis_ rul>> 빨면서 그 끝 주위를 핥는다.`);
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">당신은 당신의 <<penisPost>>에서 입을 치운다.</span>`);
			break;
		case "mchastityparasitelick":
			clearAction();
			if (V.earSlime.defyCooldown) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 4);
				sWikifier(
					`당신이 기생충 자지를 핥자, 각각, 기생충이 <span class="lewd">쾌감</span>과 <span class="red">고통</span>의 물결을 교차해 보낸다.<<gpain>>`
				);
			} else if (V.earSlime.corruption < 100) {
				wikifier("arousal", 200, "masturbationGenital");
				V.earSlime.vibration += 2;
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 핥자, 각각, <span class="lewd">기생충이 당신의 <<penis_ rul>> 통해 쾌감의 물결을 보낸다.</span>`
					);
				} else {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 핥자, 각각, <span class="lewd">기생충이 당신의 <<penis_ rul>> 통해 작은 쾌감의 물결을 보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 500, "masturbationGenital");
				V.earSlime.vibration += 4;
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationGenital");
					sWikifier(
						`당신이 기생충 자지를 핥으려 애쓰자, 각각, 기생충이 <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보내고</span>, 당신은 그것을 거의 참고 있기가 힘들다.`
					);
				} else {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 핥자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보낸다.</span>`
					);
				}
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">당신은 기생충 정조대 자지에서 입을 치운다.</span>`);
			break;
		case "mvaginaentrance":
			if (V.vaginause === 0) {
				clearAction("mvaginalick");
				V.mouth = "mvaginaentrance";
				V.vaginause = "mouth";
				wikifier("arousal", 100, "masturbationGenital");
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">귓속의 슬라임이 당신에게 허리를 굽히도록 강요한다. 당신은 앞으로 다가올 일을 좋아하게 될지 확신하지 못한다.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					fragment.append(span(`당신은 혀를 당신의 노출된 클리토리스 위에서 움직이며 기대감에 몸을 떤다.`, "blue"));
				} else {
					sWikifier(`<span class="blue">당신은 혀를 당신의 <<pussyPost>> 위에서 움직이며,  <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mvaginalick":
			clearAction();
			wikifier("arousal", 100, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier("당신은 당신의 <<pussyPost>>에서 나오는 애액을 핥으며 기대감에 몸을 떤다.");
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier("당신은 당신의 <<pussy_ rul>> 핥으며, 더 닿기 어려운 곳까지 혀를 닿게 하려 노력한다.");
			} else {
				sWikifier("당신은 당신의 <<pussy_ rul>> 핥는다.");
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 당신의 클리토리스를 빨면서 이빨로 부드럽게 비비며 기대감에 몸을 떤다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 당신의 클리토리스를 핥으면서 빨아댄다."));
			} else {
				fragment.append(span("당신은 당신의 클리토리스를 핥는다."));
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(
						`당신은 클리토리스 위의 ${trParasite(V.parasite.clit.name, '을')} 빨면서 이빨로 부드럽게 비비며 기대감에 몸을 떨고, 그 반응으로 그것이 당신을 더 빨려고 하는 느낌을 즐긴다.`
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`당신은 클리토리스 위의 ${trParasite(V.parasite.clit.name, '을')} 핥으면서 빨아대며, 그것이 같은 방법으로 당신에게 주는 쾌감을 즐긴다.`));
			} else {
				fragment.append(span(`당신은 클리토리스 위의 ${trParasite(V.parasite.clit.name, '을')} 핥는다.`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V.mouth = 0;
			V.vaginause = 0;
			sWikifier('<span class="lblue">당신은 입을 당신의 <<pussyPost>>에서 치운다.</span>');
			break;
		case "maphropill":
			clearAction("mrest");
			if (V.mouth === 0) {
				wikifier("drugs", 300);
				const pills = V.player.inventory.sextoys["aphrodisiac pills"][0];
				pills.uses -= 1;
				if (pills.uses <= 0) V.player.inventory.sextoys["aphrodisiac pills"].splice(0, 1);
				if (V.drugged > 0) {
					fragment.append(span("당신은 미약을 하나 당신의 입 속으로 쑥 집어넣고 삼킨다. 음란한 따뜻함이 당신 속에서 커져간다."));
				} else {
					fragment.append(span("당신은 미약을 하나 당신의 입 속으로 쑥 집어넣고 삼킨다. 음란한 따뜻함이 당신의 뱃속에서 퍼지기 시작한다."));
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
			altText.toyDisplay = toyDisplay(altText.selectedToy, '을');

			if (V.mouth === "mdildomouthentrance") {
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`당신은 조심스럽게 ${toyDisplay(altText.selectedToy, '의')} 끝을 핥으며, 혀로 그것을 최선을 다해 희롱하려 노력한다.`));
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(span(`당신은 열정적으로 ${toyDisplay(altText.selectedToy, '의')} 끝을 핥으며, 혀로 그것을 최선을 다해 희롱한다.`));
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(`당신은 솜씨좋게 ${toyDisplay(altText.selectedToy, '의')} 끝에 키스하면서 핥으며, 입술과 혀로 지나칠 정도로 그것에 집중한다.`)
					);
				}
			} else {
				if (currentSkillValue("oralskill") < 100) {
					if (altText.selectedToy.name.includes("small")) {
						fragment.append(span(`당신은 어색하게 입 속에 있는 ${toyDisplay(altText.selectedToy, '의')} 아래를 따라 혀를 좌우로 움직인다.`));
					} else {
						fragment.append(
							span(`당신은 어떻게든 ${altText.toyDisplay} 따라 핥으려고 몸부림치지만, 그것의 두께가 당신의 혀를 입 아래로 눌러댄다.`)
						);
					}
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(
						span(`당신은 입 속의 ${altText.toyDisplay} 따라 혀를 좌우로 움직이며, 그 장난감의 가능한 많은 곳에 혀를 갖다대려고 노력한다.`)
					);
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(
							`당신은 솜씨좋게 입 속의 ${altText.toyDisplay} 따라 혀를 좌우로 움직이며, 가능한 많은 곳에 혀를 갖다대려고 가끔씩 머리의 각도를 조정한다.`
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
			altText.toyDisplay = toyDisplay(altText.selectedToy, '의');
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`당신은 서투르게 ${altText.toyDisplay} 육봉을 따라 키스한다.`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationMouth");
				fragment.append(span(`당신이 ${altText.toyDisplay} 육봉을 따라 키스하자, 음란한 따뜻함이 당신 속에서 커져간다.`));
			} else {
				altText.virginity =
					V.player.virginity.oral === true
						? "당신이 진짜 물건을 빨리 경험해보기를 바란다."
						: "마치 진짜 물건을 다루는 것 처럼 음란한 따뜻함이 당신 속에서 커져간다.";
				wikifier("arousal", 200, "masturbationMouth");
				fragment.append(span(`당신은 사랑스럽게 ${altText.toyDisplay} 육봉을 따라 한 줄로 키스하며, ${altText.virginity}`));
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
			altText.toyDisplay = toyDisplay(altText.selectedToy, '을');
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`당신은 최선을 다해 ${altText.toyDisplay} 빨려고 노력한다.`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(span(`당신은 열정적으로 ${altText.toyDisplay} 빤다.`));
			} else {
				wikifier("arousal", 200, "masturbationOral");
				if (V.player.virginity.oral === true) {
					altText.virginity = "진짜 자지의 느낌이 어떻게 다를지 궁금해한다.";
				} else if (V.ejactrait) {
					altText.virginity = "끝난 후 당신이 얻을 것이 없다는 사실에 약간 실망한다.";
				} else {
					altText.virginity = "그것이 진짜 물건이라고 상상한다.";
				}
				fragment.append(span(`당신은 솜씨좋게 ${altText.toyDisplay} 빨고 희롱하면서, ${altText.virginity}`));
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

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	switch (V.penisHeight) {
		case 0:
			fragment.append(span("Error: Impossible condition.", "red"));
			break;
		case 1:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("당신의 입술이 당신의 <<penisPost>> 밑둥에 닿으며 그 끝은 당신의 입 뒤쪽을 쿡쿡 찌른다.");
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		case 2:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("당신의 <<penisPost>> 귀두부분이 당신의 목구멍 입구를 쿡쿡 찌른다.");
					break;
				case 2:
					sWikifier("당신의 입술이 당신의 <<penisPost>> 밑둥에 닿자 그 머리부분이 당신의 목구멍 안을 누른다.");
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		case 3:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("당신의 <<penisPost>> 귀두부분이 당신의 목구멍 입구를 쿡쿡 찌른다.");
					break;
				case 2:
					sWikifier("당신의 <<penis_ ga>> 당신의 목구멍 벽을 확장시킨다.");
					break;
				case 3:
					sWikifier("당신의 입술이 당신의 <<penisPost>> 밑둥에 닿자 육봉이 당신의 목구멍을 가득 채운다.");
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
		fragment.append(span("당신은 밑둥까지 전부 집어넣었다."));
	} else if (V.selfsuckDepth === V.selfsuckLimit) {
		fragment.append(" ");
		fragment.append(span("당신이 더 아래까지 집어넣기에는 유연성이 부족하다."));
	}

	fragment.append(" ");
	return fragment;
}

function masturbationEffectsVaginaAnus({ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = (actionType, defaultAction) => {
		V[actionType + "actiondefault"] = defaultAction !== undefined ? defaultAction : V[actionType + "action"];
		V[actionType + "action"] = 0;
	};

	const altText = {};

	switch (V.mouthaction) {
		case "mpenisflowerlick":
			clearAction("mouth");
			wikifier("arousal", 200, "mouth");
			wikifier("drugs", 10);
			V.mouth = "mpenisflowerlick";
			V.moorPhallusPlant = 2;
			switch (random(1, 3)) {
				case 1:
					fragment.append(span("당신은 자지 모양 식물을 거의 입 안으로 집어넣지만, 갑자기 불안감을 느낀다."));
					break;
				case 2:
					fragment.append(span("당신은 자지 모양 식물의 끝을 핥으며 달콤한 액체를 삼킨다."));
					break;
				case 3:
					fragment.append(span("당신은 자지 모양 식물의 끝을 핥는다."));
					break;
			}
			if (V.vaginaaction === "mpenisflowerrub") {
				V.vaginaaction = 0;
				V.vaginaactiondefault = "mrest";
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowertakein":
			clearAction("mouth", "mpenisflowersuck");
			V.mouth = "mpenisflowersuck";
			V.mouthstate = "penetrated";
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			if (V.player.virginity.oral === true) {
				fragment.append(wikifier("takeVirginity", "'phallus plant'", "oral"));
				fragment.append(" ");
				sWikifier('당신은 그 식믈을 빨아댄다. <span class="red">그것은 아주 이상한 맛이 나면서</span>, 당신은 당신 자신이 뜨거워지는 것을 느낀다.');
			} else {
				fragment.append(span("당신은 그 식믈을 빨아댄다. 그것은 아주 달콤한 맛이 나면서, 당신은 당신 자신이 뜨거워지는 것을 느낀다."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("mouth");
			V.mouth = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("당신은 그 식물을 빨아대는 것을 그만둔다.", "lblue"));
			break;
		case "mpenisflowersuck":
			clearAction("mouth");
			wikifier("arousal", 500, "oral");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 머리를 앞뒤로 움직이며 빨아대면서 그 액체를 마시며 몸을 떤다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 그 식물을 빨아대면서 그 액체를 마신다."));
			} else {
				fragment.append(span("당신은 그 식물을 빨아댄다."));
			}
			break;
		case "mpenisflowersuckstop":
			clearAction("mouth", "mpenisflowersuck");
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			fragment.append(
				span("당신의 머리는 계속 위아래로 움직이며, 그 자지 모양 식물을 빨아댄다. 모든 힘을 다해 보지만, 당신은 당신 자신을 멈출 수가 없다.", "red")
			);
			break;
	}

	switch (V.vaginaaction) {
		case "mpenisflowerrub":
			clearAction("vagina");
			V.vaginause = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (!genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("당신의 옷이 그 사이에 있기는 하지만, 당신은 사타구니를 그 식물에 비벼댄다."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"갑작스러운 욕정의 폭발이 당신을 덮쳐, 당신은 거의 당신 자신에게 그 식물을 찔러넣을 뻔 한다. 당신은 마지막 순간에 그것을 멈추고, 부드럽게 그 식물을 당신의 보지 입구 주위에 원을 그리며 문지른다."
							)
						);
						break;
					case 2:
						sWikifier("당신은 당신의 <<if $player.penisExist>><<penis_ rul>><<else>><<clit_ ul>><</if>> 그 식물에 대고 비빈다.");
						break;
					case 3:
						fragment.append(span("당신은 당신의 보지를 그 자지 모양 식물에 대고 비빈다."));
						break;
				}
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("vagina", "mpenisflowerbounce");
			V.vaginause = "mpenisflowerpenetrate";
			V.vaginastate = "penetrated";
			wikifier("arousal", 1000, "vaginal");
			wikifier("vaginalstat");
			wikifier("drugs", 10);
			wikifier("vaginaraped");
			if (V.player.virginity.vaginal === true) {
				fragment.append(span("당신은 자신의 몸을 아래로 내려, 그 식물이 당신 안에 삽입되도록 한다."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "'phallus plant'", "vaginal"));
				fragment.append(" ");
				sWikifier(
					'당신은 당신의 <span class="red">더이상 처녀가 아닌</span> 보지가 그 식물을 받아들이기 위해 몸부림치자 거의 비명을 지를 뻔 하지만, 그 아픔은 한순간 사라진다.'
				);
			} else {
				fragment.append(span("당신은 자신의 몸을 아래로 내려, 그 식물이 당신 안에 삽입되도록 한다. 당신은 그것과 같은 것을 이전에는 느껴본 적이 없다."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("vagina");
			V.vaginause = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("당신은 당신의 질에 그 자지 모양 식물을 비벼대는 것을 그만둔다.", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("vagina");
			wikifier("arousal", 500, "vaginal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 탐욕스럽게 그 식물에 올라타, 그것에 가능한 빠르게 비벼댄다. 그 감각이 당신을 미쳐버리게 한다."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("당신은 자지 모양 식물 위에서 위아래로 몸을 흔든다. 그 감각이 당신을 미쳐버리게 한다."));
			} else {
				fragment.append(span("당신은 부드럽게 자지 모양 식물 위에서 위아래로 몸을 흔들고, 그것이 찔러올 때마다 쾌락의 파도가 당신의 몸으로 밀려들어온다."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("vagina", "mpenisflowerbounce");
			wikifier("arousal", 300, "vaginal");
			wikifier("drugs", 10);
			fragment.append(span("마치 당신의 몸이 당신을 따르지 않는 것처럼, 당신의 다리는 당신을 그 식물 위에서 들어올리는 데 실패한다.", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("vagina");
			wikifier("arousal", 300, "masturbationVagina");
			altText.selectedToy = selectedToy("vagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`당신은 탐욕스럽게 ${toyDisplay(altText.selectedToy)}에 올라타, 그것에 가능한 빠르게 비벼댄다.`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`당신은 ${toyDisplay(altText.selectedToy)} 위에서 위아래로 몸을 흔든다.`);
			} else {
				sWikifier(`당신은 부드럽게 ${toyDisplay(altText.selectedToy)} 위에서 위아래로 몸을 흔든다.`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("vagina", "mrest");
			V.vaginause = 0;
			altText.selectedToy = selectedToy("vagina", false);
			fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy)}에 당신의 질을 비벼대는 것을 그만두고 그것이 바닥에 쓰러지도록 둔다.`, "lblue"));
			break;
	}
	fragment.append(" ");

	switch (V.anusaction) {
		case "mpenisflowerrub":
			clearAction("anus");
			V.anususe = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (!genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("당신의 옷이 그 사이에 있기는 하지만, 당신은 엉덩이를 그 식물에 비벼댄다."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"당신은 거의 그 식물 전체를 당신의 항문 안에 집어넣을 뻔 하지만, 마지막 순간에 그것을 멈춘다. 당신은 부드럽게 그 식물을 당신의 항문 입구 주위에 원을 그리며 문지른다."
							)
						);
						break;
					case 2:
						sWikifier("당신은 그 식물을 당신의 <<bottomPost>>살 사이에 대고 비빈다.");
						break;
					case 3:
						fragment.append(span("당신은 당신의 항문을 그 자지 모양 식물에 대고 비빈다."));
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
			if (V.player.virginity.anal === true) {
				fragment.append(span("당신은 자신의 몸을 아래로 내려, 그 식물이 당신 안에 삽입되도록 한다."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "'phallus plant'", "anal"));
				fragment.append(" ");
				sWikifier(
					'당신은 당신의 <span class="red">더이상 처녀가 아닌</span> 항문이 그 식물을 받아들이기 위해 몸부림치자 거의 비명을 지를 뻔 하지만, 그 아픔은 한순간 사라진다.'
				);
			} else {
				fragment.append(span("당신은 자신의 몸을 아래로 내려, 그 식물이 당신 안에 삽입되도록 한다. 당신은 그것과 같은 것을 이전에는 느껴본 적이 없다."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("anus");
			V.anususe = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("당신은 당신의 항문에 그 자지 모양 식물을 비벼대는 것을 그만둔다.", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("anus");
			wikifier("arousal", 500, "anal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("당신은 거칠게 그 식물에 올라타, 그것에 가능한 빠르게 비벼댄다. 그것은 당신이 이전에 느꼈던 것들과는 다르다.."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					span(`당신은${V.player.penisExist ? " 그것으로 당신의 전립선을 찌르려 시도하면서," : ""} 그 식물에 올라타 움직인다. 그것은 당신이 이전에 느꼈던 것들과는 다르다.`)
				);
			} else {
				fragment.append(span("당신은 부드럽게 자지 모양 식물 위에서 위아래로 몸을 흔들고, 그것이 찔러올 때마다 쾌락의 파도가 당신의 몸으로 밀려들어온다."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("anus", "mpenisflowerbounce");
			wikifier("arousal", 300, "anal");
			wikifier("drugs", 10);
			fragment.append(span("마치 당신의 몸이 당신을 따르지 않는 것처럼, 당신의 다리는 당신을 그 식물 위에서 들어올리는 데 실패한다.", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("anus");
			wikifier("arousal", 300, "masturbationAnal");
			altText.selectedToy = selectedToy("anus");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`당신은 탐욕스럽게 ${toyDisplay(altText.selectedToy)}에 올라타, 그것에 가능한 빠르게 비벼댄다.`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`당신은 ${toyDisplay(altText.selectedToy)} 위에서 위아래로 몸을 흔든다.`);
			} else {
				sWikifier(`당신은 부드럽게 ${toyDisplay(altText.selectedToy)} 위에서 위아래로 몸을 흔든다.`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("anus", "mrest");
			V.anususe = 0;
			altText.selectedToy = selectedToy("anus", false);
			fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy)}에 당신의 항문을 비벼대는 것을 그만두고 그것이 바닥에 쓰러지도록 둔다.`, "lblue"));
			break;
	}

	fragment.append(" ");
	return fragment;
}

Macro.add("masturbationeffects", {
	handler() {
		const fragment = masturbationEffects();
		this.output.append(fragment);
	},
});
