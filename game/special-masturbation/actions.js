/*
	Old version can be found at https://gitgud.io/Vrelnir/degrees-of-lewdity/-/blob/master/game/special-masturbation/actions.twee?ref_type=0c2b0126
*/
function masturbationActions() {
	const fragment = document.createDocumentFragment();

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump")
	);

	const selectedToy = location => {
		if (V["currentToy" + location.toLocaleUpperFirst()] === "none") return 0;
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		return toy;
	};
	const toyDisplay = (toy1, toy2, post, sep) => { if(typeof(toy2) === "string") { sep = post; post = toy2; toy2 = undefined; }
		if (toy1 && toy2) return (toy1.colour ? trColour(toy1.colour) + " " : "") + sextoyPost(toy1.name, "과") + " " + (toy2.colour ? trColour(toy2.colour) + " " : "") + sextoyPost(toy2.name, post, sep);
		if (toy1) return (toy1.colour ? trColour(toy1.colour) + " " : "") + sextoyPost(toy1.name, post, sep);
		return "";
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;
	const ballsExposed = () => genitalsExposed() && !playerChastity("hidden") && V.worn.genitals.name !== "chastity parasite";

	const otherVariables = { playerToys, selectedToy, toyDisplay, genitalsExposed, breastsExposed, ballsExposed };

	const generateOption = (actionVariable, option) => {
		let result = "";

		if (option.action) {
			result += "<label>";
			result += `<<radiobutton "$${actionVariable}" "${option.action}" autocheck>> `;
		}
		if (option.text) {
			if (option.colour) {
				result += `<span class="${option.colour}">${option.text}</span>`;
			} else {
				result += option.text;
			}
		}
		if (option.otherElements) {
			result += " " + option.otherElements;
		}
		if (option.action) {
			result += "</label>";
		}

		return result;
	};

	const generateListOption = (actionVariable, options) => {
		let result = "";

		result += `<label><<listbox "$${actionVariable}" autoselect>></label>`;

		options.forEach(option => {
			result += `<<option "${option.text}" ${option.action}>>`;
		});

		result += "<</listbox>></label>";

		return result;
	};

	// Display the options
	[
		masturbationActionsHands("left", otherVariables),
		masturbationActionsHands("right", otherVariables),
		masturbationActionsMouth(otherVariables),
		masturbationActionsVagina(otherVariables),
		masturbationActionsAnus(otherVariables),
	].forEach(action => {
		if (action.options && action.options.length) {
			if (!T.noMasturbationOutput) {
				fragment.append(Wikifier.wikifyEval(action.text));
				fragment.append(document.createElement("br"));
			}

			// Attempt to ensure an action is selected, set to "mrest" or the first available action if it doesnt exist
			if (action.options.find(option => option.action === V[action.actionVariable + "default"])) {
				V[action.actionVariable] = V[action.actionVariable + "default"];
			} else if (!V.corruptionMasturbation && action.options.find(option => option.action === "mrest")) {
				V[action.actionVariable] = "mrest";
			} else if (action.options[0]) {
				V[action.actionVariable] = action.options[0].action;
			} else {
				V[action.actionVariable] = 0;
			}
			if (!T.noMasturbationOutput) {
				switch (V.options.masturbationControls) {
					case "lists":
						// Demo of alternate control styles
						fragment.append(Wikifier.wikifyEval(generateListOption(action.actionVariable, action.options)));
						break;
					default:
						action.options.forEach(option => {
							fragment.append("| ");
							fragment.append(Wikifier.wikifyEval(generateOption(action.actionVariable, option)));
							fragment.append(" ");
						});
						break;
				}

				fragment.append(document.createElement("br"));
				fragment.append(document.createElement("br"));
			}
		}
	});

	if (V.arousal >= V.arousalmax && !V.possessed && !T.noMasturbationOutput) {
		fragment.append(wikifier("orgasm"));
		fragment.append(wikifier("promiscuity1"));
		V.masturbationorgasmstat++;
		V.masturbationOrgasmTimeStat = Time.date.timeStamp;
		V.masturbationorgasm++;
		if (V.femaleclimax !== 1 && !T.deniedOrgasm && V.worn.genitals.name !== "chastity parasite" && V.mouth !== "mpenis") {
			V.masturbationorgasmsemen++;
		}
		fragment.append(wikifier("purity", -1));
		if (V.corruptionMasturbation && V.corruptionMasturbationCount) V.corruptionMasturbationCount--;
	}
	fragment.append(wikifier("pass", 10, "seconds"));
	V.secondsSpentMasturbating += 10;

	// Updates the control caption at the top of the screen to include any control gained through the rest of the passage
	if (V.possessed && !T.noMasturbationOutput) {
		$(() => {
			Dynamic.render("control-caption");
		});
	}

	return fragment;
}

function masturbationActionsHands(arm, { playerToys, selectedToy, toyDisplay, genitalsExposed, breastsExposed, ballsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: arm + "action",
	};
	const toyDropDown = limit => {
		const toys = listUniqueCarriedSextoys().filter(toy => {
			if (limit === "breastpump") return toy.type.includes("breastpump");
			return (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump");
		});
		let count = 0;

		let result = `<label><<listbox "$selectedToy${arm.toLocaleUpperFirst()}" autoselect>>`;
		toys.forEach((toy, index) => {
			if (index !== V.currentToyLeft && index !== V.currentToyRight && index !== V.currentToyVagina && index !== V.currentToyAnus) {
				result += `<<option "${toyDisplay(toy)}" ${index}>>`;
				count++;
			}
		});
		if (!count) return;

		result += "<</listbox>></label>";
		return result;
	};
	const stop = action => {
		return {
			action,
			text: "손을 치운다",
		};
	};

	const actiondefault = arm + "actiondefault";
	const otherArm = arm === "left" ? "right" : "left";
	const altText = {};

	switch (V[arm + "arm"]) {
		case 0:
			result.text = `당신은 <<hand_ ro '${arm}'>> 아무것도 하지 않고 있다.`;
			if (V.player.penisExist) {
				if (
					(V.awareness >= 400 || V.earSlime.event.includes("get your own sperm into your")) &&
					V.masturbationorgasmsemen >= 1 &&
					V[arm + "FingersSemen"] !== 1
				) {
					result.options.push({
						action: "msemencover",
						text: "당신의 손가락을 정액으로 뒤덮는다",
						colour: "sub",
						otherElements: V.earSlime.event.includes("get your own sperm into your") ? undefined : "<<combataware 5>>",
					});
				}
				if (!playerChastity("penis")) {
					result.options.push({
						action: "mpenisentrance",
						text: V.player.gender === "f" && V.parasite.clit.name === "parasite" ? "기생충 자지를 애무한다" : "자지를 애무한다",
						colour: "sub",
					});
				} else if (V.worn.genitals.name === "chastity parasite") {
					result.options.push({
						action: "mchastityparasiteentrance",
						text: "기생충 자지를 애무한다",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mpenischastity",
						text:
							V.player.gender === "f" && V.parasite.clit.name === "parasite" ? "기생충 자지를 애무하려 시도한다" : "자지를 애무하려 시도한다",
						colour: "sub",
					});
				}
				if (V.player.ballsExist && ballsExposed() && V.ballssize >= -1 && (V.ballssize >= 1 || V[otherArm + "arm"] !== "mballs")) {
					result.options.push({
						action: "mballsentrance",
						text: "불알을 애무한다",
						colour: "sub",
					});
				}
			}
			if (V.player.vaginaExist) {
				if (!playerChastity("vagina")) {
					result.options.push({
						action: "mvaginaentrance",
						text: "보지를 애무한다",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mvaginachastity",
						text: "보지를 애무하려 시도한다",
						colour: "sub",
					});
				}
			}
			if (V.awareness >= 200 && V.player.breastsize >= 3) {
				result.options.push({
					action: "mbreasthold",
					text: `${V[otherArm + "arm"] === "mbreasthold" ? " 반대쪽" : ""} 가슴을 잡는다`,
					colour: "sub",
					otherElements: "<<combataware 3>>",
				});
			} else if (V.awareness >= 100) {
				result.options.push({
					action: "mchest",
					text: "가슴을 애무한다",
					colour: "sub",
					otherElements: "<<combataware 2>>",
				});
			}
			if (V.awareness >= 200) {
				if (!playerChastity("anus")) {
					result.options.push({
						action: "manusentrance",
						text: "항문을 문지른다",
						colour: "sub",
						otherElements: "<<combataware 3>>",
					});
				}
				if (["home", "brothel", "cafe"].includes(V.location) || T.enableSexToys) {
					altText.toyDropDown = toyDropDown();
					if (altText.toyDropDown) {
						result.options.push({
							action: "mpickupdildo",
							text: "장난감을 사용한다:",
							colour: "green",
							otherElements: `${altText.toyDropDown} <<combataware 3>>`,
						});
					}
				}
			} else if (playerToys.find(toy => toy.type.includes("breastpump")) && playerNormalPregnancyTotal() && ["home", "alex_farm"].includes(V.location)) {
				// To specifically enable filling bottles for babies, location should be expanded on when required
				altText.toyDropDown = toyDropDown("breastpump");
				if (altText.toyDropDown) {
					result.options.push({
						action: "mpickupdildo",
						text: "착유기를 사용한다:",
						colour: "green",
						otherElements: `${altText.toyDropDown}`,
					});
				}
			}
			break;
		case "mpenisentrance":
			result.text = `당신은 ${V.player.penissize >= 0 ? `<<hand_ ro '${arm}'>>` : `<<handPost '${arm}'>> 엄지와 손가락으로`} <<penis_ rul>> 잡고 있다.`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mpenisglans",
					text: "귀두를 애무한다",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis" && V.selfsuckDepth === V.penisHeight)) {
				result.options.push({
					action: "mpenisshaft",
					text: "자지를 비빈다",
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstop"));
			break;
		case "mchastityparasiteentrance":
			result.text = `당신은 ${V.player.penissize >= 2 ? `<<hand_ ro '${arm}'>>` : `<<handPost '${arm}'>> 엄지와 손가락으로`} 기생충 정조대 자지를 잡고 있다.`;
			if (V.mouth !== "mpenis") {
				result.options.push({
					action: "mchastityparasiterub",
					text: "기생충 자지를 비빈다",
					colour: "sub",
				});
			}
			if (!(V.mouth === "mpenis")) {
				result.options.push({
					action: "mchastityparasitesqueeze",
					text: "기생충 자지를 쥐어짠다",
					colour: "sub",
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			break;
		case "mvaginaentrance":
			result.text = `당신은 <<hand_ ro '${arm}'>> <<pussy_ rul>> 문지르고 있다.`;
			if (genitalsExposed()) {
				/* Can't recall the intention for this commented out piece, leaving it in for now in case I recall later */
				if (V.vaginause === 0 /* && ([0, "mvaginaentrance"].includes(V[otherArm + "arm"]) || V[otherArm + "arm"].startsWith("mvagina")) */) {
					if (V.vaginaFingerLimit >= 3 && currentSkillValue("vaginalskill") >= 300) {
						result.options.push({
							action: "mvaginafingerstarttwo",
							text: "손가락 두개를 넣는다",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvagina",
						text: "손가락을 넣는다",
						colour: "sub",
					});
				}
				if (!V.parasite.clit.name) {
					result.options.push({
						action: "mvaginaclit",
						text: "클리토리스를 자극한다",
						colour: "sub",
					});
				} else if (V.parasite.clit.name !== "parasite") {
					result.options.push({
						action: "mvaginaclitparasite",
						text: `클리토리스 <<trParasite '${V.parasite.clit.name}' '을'>><<print _trResult>> 자극한다`,
						colour: "sub",
					});
				}
			}
			result.options.push({
				action: "mvaginarub",
				text: "보지를 비빈다",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvagina":
			result.text = `You have <<number $fingersInVagina>> ${V.fingersInVagina === 1 ? "finger" : "fingers"} in your <<pussy>>.${
				V.fingersInVagina === V.vaginaFingerLimit ? " You cannot fit any more." : ""
			}`;
			if (V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4 && currentSkillValue("vaginalskill") >= 300) {
				result.options.push({
					action: "mvaginafingeraddtwo",
					text: "손가락 두개를 더 넣는다",
					colour: "sub",
				});
			}
			if (V.fingersInVagina < V.vaginaFingerLimit) {
				if (V.fingersInVagina === 4) {
					result.options.push({
						action: "mvaginafistadd",
						text: "손 전체를 넣는다",
						colour: "sub",
					});
				} else {
					result.options.push({
						action: "mvaginafingeradd",
						text: "손가락을 하나 더 넣는다",
						colour: "sub",
					});
				}
			}
			if (V.fingersInVagina >= 1) {
				result.options.push({
					action: "mvaginafingerremove",
					text: "손가락을 하나 뺀다",
					colour: "sub",
				});
			}
			result.options.push({
				action: "mvaginatease",
				text: "손가락으로 보지를 애무한다",
				colour: "sub",
			});
			result.options.push(stop("mvaginastop"));
			break;
		case "mvaginafist":
			result.text = "당신의 손 전체가 당신의 <<pussyPost>> 안에 있다. 당신은 주먹 주위로 조임을 느낄 수 있다.";
			result.options.push({
				action: "mvaginafist",
				text: "보지 안에서 주먹을 움직인다",
				colour: "sub",
			});
			result.options.push({
				action: "mvaginafingerremove",
				text: "손가락을 하나 뺀다",
				colour: "sub",
			});
			if (currentSkillValue("vaginalskill") >= 700) {
				result.options.push({
					action: "mvaginafistremove",
					text: "손 전체를 뺀다",
					colour: "sub",
				});
			}
			break;
		case "mvaginaentrancedildo":
			if (!selectedToy(arm)) {
				result.text = `당신이 섹스 장난감을 선택하지 않아서 당신의 <<hand_ nun '${arm}'>> 비어있다.`;
				result.options.push(stop("mvaginastopdildo"));
			} else if (playerChastity("vagina")) {
				result.text = `당신의 <<worn_genitals_name_ i>> 보지를 막고 있다.`;
				result.options.push(stop("mvaginastopdildo"));
			} else {
				result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '으로')} <<pussy_ rul>> 비벼댄다.${
					["anal beads", "butt plug"].includes(selectedToy(arm).name) ? " 그것은 색다른 느낌이었지만, 어쨌든 당신은 그것을 즐긴다." : ""
				}`;
				if (genitalsExposed() && !["mvagina", "mvaginadildo"].includes(V[otherArm + "arm"])) {
					result.options.push({
						action: "mvaginadildo",
						text: `${toyDisplay(selectedToy(arm), '을')} 집어넣는다`,
						colour: "sub",
					});
				}
				if (V.player.vaginaExist && !playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclitdildo",
							text: "클리토리스를 자극한다",
							colour: "sub",
						});
					}
					result.options.push({
						action: "mvaginarubdildo",
						text: "보지를 비빈다",
						colour: "sub",
					});
				}
				result.options.push(stop("mvaginastopdildo"));
			}
			break;
		case "mvaginadildo":
			result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '으로')} 당신의 보지를 찔러대고 있다.`;
			result.options.push({
				action: "mvaginateasedildo",
				text: "희롱한다",
				colour: "sub",
			});
			result.options.push(stop("mvaginastopdildo"));
			break;
		case "mbreasthold":
			result.text = `당신은 <<hand_ ro '${arm}'>> 당신의 ${(arm == 'left'? "왼쪽" : "오른쪽")} 가슴을 잡고 있다.`;
			result.options.push({
				action: "mbreastfondle",
				text: "가슴을 애무한다",
				colour: "sub",
			});
			if (
				breastsExposed() &&
				(V.masochism >= 100 || (V.corruptionMasturbation && actiondefault === "mbreastpinch")) &&
				V.mouth !== "mbreast" &&
				!V.bugsinside
			) {
				result.options.push({
					action: "mbreastpinch",
					text: "젖꼭지를 꼬집는다",
					colour: "sub",
				});
			}
			result.options.push(stop("mbreaststop"));
			break;
		case "manusentrance":
			result.text = `당신은 <<hand_ ro '${arm}'>> 항문을 희롱하고 있다.`;
			if (genitalsExposed() && [0, "manus"].includes(V.anususe)) {
				result.options.push({
					action: "manus",
					text: "손가락을 넣는다",
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrub",
				text: "항문을 희롱한다",
				colour: "sub",
			});
			result.options.push(stop("manusstop"));
			break;
		case "manus":
			result.text = `당신은 <<hand_ ro '${arm}'>> 항문을 희롱하고 있다.`;
			result.options.push({
				action: "manustease",
				text: "희롱한다",
				colour: "sub",
			});
			if (V.player.penisExist) {
				result.options.push({
					action: "manusprostate",
					text: "전립선을 자극한다",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstop"));
			break;
		case "manusentrancedildo":
			result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '으로')} 당신의 항문을 희롱하고 있다.`;
			if (genitalsExposed() && !playerChastity("anus")) {
				result.options.push({
					action: "manusdildo",
					text: `${toyDisplay(selectedToy(arm), '을')} 밀어넣는다`,
					colour: "sub",
				});
			}
			result.options.push({
				action: "manusrubdildo",
				text: `${toyDisplay(selectedToy(arm), '으로')} 항문을 희롱한다`,
				colour: "sub",
			});
			result.options.push(stop("manusstopdildo"));
			break;
		case "manusdildo":
			result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '으로')} 당신의 항문을 희롱하고 있다.`;
			result.options.push({
				action: "manusteasedildo",
				text: "희롱한다",
				colour: "sub",
			});
			if (V.player.penisExist) {
				result.options.push({
					action: "manusprostatedildo",
					text: "전립선을 자극한다",
					colour: "sub",
				});
			}
			result.options.push(stop("manusstopdildo"));
			break;
		case "mpenisentrancestroker":
			result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '으로')} 귀두를 희롱하고 있다.`;
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisstroker",
					text: `${toyDisplay(selectedToy(arm))}에 삽입한다`,
					colour: "sub",
				});
				result.options.push({
					action: "mpenisstrokertease",
					text: `${toyDisplay(selectedToy(arm), '으로')} 귀두를 희롱한다`,
					colour: "sub",
				});
			}
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mpenisstroker":
			result.text = `당신의 <<penis_ ga>> <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '을')} 찔러대고 있다.`;
			result.options.push({
				action: "mpenisstroker",
				text: "자위한다",
				colour: "sub",
			});
			result.options.push(stop("mpenisstopstroker"));
			break;
		case "mbreastpump":
			result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '을')} 당신의 <<breastsPost>>에 대고 있다.`;
			result.options.push({
				action: "mbreastpumppump",
				text: "<<breasts_ rul>> 짜낸다",
				colour: "sub",
			});
			result.options.push(stop("mstopbreastpump"));
			break;
		case "mdildomouthentrance":
			result.text = `당신은 <<hand_ yi '${arm}'>> ${toyDisplay(selectedToy(arm), '을')} 당신의 입에 대고 있다.`;
			result.options.push({
				action: "mdildomouth",
				text: "입 안에 집어넣는다",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mdildomouth":
			result.text = `당신은 <<hand_ ro '${arm}'>> 입 안의 ${toyDisplay(selectedToy(arm), '을')} 잡고 있다.`;
			result.options.push({
				action: "mdildopiston",
				text: "앞뒤로 움직인다",
				colour: "sub",
			});
			result.options.push(stop("mmouthstopdildo"));
			break;
		case "mpickupdildo":
			result.text = `당신은 <<hand_ ro '${arm}'>> ${toyDisplay(selectedToy(arm), '을')} 잡고 있다.`;
			if (selectedToy(arm).type.includes("stroker")) {
				if (V.player.penisExist && (V.penisuse === 0 || V.penisuse === "stroker")) {
					result.options.push({
						action: "mpenisentrancestroker",
						text: "자지로 가져간다",
						colour: "sub",
					});
				}
				result.options.push(stop("mpenisstopstroker"));
			} else if (selectedToy(arm).type.includes("breastpump")) {
				if (breastsExposed() && V.player.breastsize >= 1) {
					result.options.push({
						action: "mbreastpump",
						text: "<<breasts_ ro>> 가져간다",
						colour: "sub",
					});
				}
				result.options.push(stop("mstopbreastpump"));
			} else {
				if (V.player.vaginaExist && V.vaginause === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "mvaginaentrancedildo",
							text: "보지로 가져간다",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("vaginalskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "mvaginaentrancedildofloor",
							text: "보지 아래의 바닥에 세워놓는다",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				if (V.anususe === 0) {
					if (V.vaginause !== "mdildopenetrate" && V.anususe !== "mdildopenetrate") {
						result.options.push({
							action: "manusentrancedildo",
							text: "항문으로 가져간다",
							colour: "sub",
						});
					}
					if (genitalsExposed() && V.awareness >= 300 && currentSkillValue("analskill") >= 300 && !selectedToy(arm).name.includes("small")) {
						result.options.push({
							action: "manusentrancedildofloor",
							text: "항문 아래의 바닥에 세워놓는다",
							colour: "sub",
							otherElements: "<<combataware 4>>",
						});
					}
				}
				switch (selectedToy(arm).name) {
					case "bullet vibe":
						if (V.player.penisExist && V.penisuse === 0 && !playerChastity("penis")) {
							result.options.push({
								action: "mpenisvibrate",
								text: "자지에 갖다댄다",
								colour: "sub",
							});
						}
						if (V.player.vaginaExist && !playerChastity("vagina")) {
							if (!V.parasite.clit.name) {
								result.options.push({
									action: "mvaginaclitvibrate",
									text: "클리토리스에 갖다댄다",
									colour: "sub",
								});
							} else if (V.parasite.clit.name !== "parasite") {
								result.options.push({
									action: "mvaginaclitvibrateparasite",
									text: `클리토리스 <<trParasite '${V.parasite.clit.name}'>><<print _trResult>>에 갖다댄다`,
									colour: "sub",
								});
							}
						}
						result.options.push({
							action: "mchestvibrate",
							text: "젖꼭지에 갖다댄다",
							colour: "sub",
						});
						break;
					case "small dildo":
					case "dildo":
						if (V.mouth === 0) {
							result.options.push({
								action: "mdildomouthentrance",
								text: "입에 갖다댄다",
								colour: "sub",
							});
							break;
						}
				}
				result.options.push(stop("mdildostop"));
			}
			break;
		case "mballs":
			result.text = `당신은 당신의 ${V.ballsText}들${V.ballssize >= 1 ? "중 하나를" : "을"} 당신의 <<hand_ ro '${arm}'>> 잡고 있다.`;
			result.options.push({
				action: "mballsfondle",
				text: "애무한다",
				colour: "sub",
			});
			result.options.push({
				action: "mballssqueeze",
				text: "쥐어짠다",
				colour: "sub",
			});
			result.options.push(stop("mballsstop"));
			break;
		case "bound":
			result.text = `당신의 <<hand_ nun '${arm}'>> 묶여있다.`;
			break;
		case "possessed":
			if (V.lactating && V.breastfeedingdisable === "f" && arm === "right") {
				result.text =
					actiondefault === "mbreastW"
						? `당신은 당신의 의사와는 무관하게, <<hand_ ro '${arm}'>> <<breasts_ rul>> 꼬집거나 짓누르고 있다.`
						: `당신의 <<hand_ nun '${arm}'>> <<breastsPost>> 위에 떠 있다.`;
				result.options.push({
					action: "mbreastW",
					text: "가슴을 애무한다",
					colour: "wraith",
				});
				result.options.push({
					action: "mbreaststopW",
					text: "손을 움직이지 않게 한다",
					colour: "brat",
				});
			} else if (V.player.penisExist && (arm === "left" || !V.player.vaginaExist)) {
				if (V.worn.genitals.name === "chastity parasite") {
					result.text =
						actiondefault === "mpenisW"
							? `당신은 당신의 의사와는 무관하게, <<hand_ ro '${arm}'>> 기생충 정조대 자지를 희롱하고 있다.`
							: `당신의 <<hand_ nun '${arm}'>> 기생충 정조대 자지 위에 떠 있다.`;
					result.options.push({
						action: "mpenisW",
						text: "기생충 자지를 비빈다",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "손을 움직이지 않게 한다",
						colour: "brat",
					});
				} else {
					result.text =
						actiondefault === "mpenisW"
							? `당신은 당신의 의사와는 무관하게, <<hand_ ro '${arm}'>> <<penis_ rul>> 쓰다듬고 있다.`
							: `당신의 <<hand_ nun '${arm}'>> <<penisPost>> 위에 떠 있다.`;
					result.options.push({
						action: "mpenisW",
						text: "육봉을 비빈다",
						colour: "wraith",
					});
					result.options.push({
						action: "mpenisstopW",
						text: "손을 움직이지 않게 한다",
						colour: "brat",
					});
				}
			} else {
				result.text =
					actiondefault === "mvaginaW"
							? `당신은 당신의 의사와는 무관하게, <<hand_ ro '${arm}'>> <<pussy_ rul>> 쓰다듬고 있다.`
							: `당신의 <<hand_ nun '${arm}'>> <<pussyPost>> 위에 떠 있다.`;
				result.options.push({
					action: "mvaginaW",
					text: "보지를 애무한다",
					colour: "wraith",
				});
				result.options.push({
					action: "mvaginastopW",
					text: "손을 움직이지 않게 한다",
					colour: "brat",
				});
			}
			break;
		default:
			break;
	}

	if (V[arm + "arm"] !== "bound") {
		if (V.worn.over_upper.exposed <= 1) result.options.push({ action: "moverupper", text: `<<worn_over_upper_name_ ul>> 벗는다` });
		if (V.worn.upper.exposed <= 1) result.options.push({ action: "mupper", text: `<<worn_upper_name_ ul>> 벗는다` });
		if (V.worn.under_upper.exposed <= 0) result.options.push({ action: "munder_upper", text: `<<worn_under_upper_name_ ul>> 벗는다` });

		if (V.worn.over_lower.exposed <= 1) result.options.push({ action: "moverlower", text: `<<worn_over_lower_name_ ul>> 벗는다` });
		if (V.worn.lower.exposed <= 1) result.options.push({ action: "mlower", text: `<<worn_lower_name_ ul>> 벗는다` });

		if (
			V.worn.under_lower.exposed <= 0 &&
			(V.worn.lower.state !== setup.clothes.lower[clothesIndex("lower", V.worn.lower)].state_base ||
				setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1 ||
				V.worn.lower.type.includes("naked"))
		) {
			result.options.push({ action: "munder", text: `<<worn_under_lower_name_ ul>> 아래로 내린다` });
		}
	}

	if (!V.possessed) result.options.push({ action: "mrest", text: "가만히 있는다" });

	return result;
}

function masturbationActionsMouth({ selectedToy, toyDisplay, genitalsExposed, breastsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "mouthaction",
	};

	if (!(V.moorPhallusPlant || V.awareness >= 200 || V.mouth !== 0)) return result;

	const stop = action => {
		return {
			action,
			text: "입을 치운다",
		};
	};
	const rest = () => {
		return {
			action: "mrest",
			text: "가만히 있는다",
		};
	};

	const corruptionCheck = V.corruptionMasturbation && V.awareness < 200;
	const awarenessCheck = V.corruptionMasturbation || V.awareness >= 200;

	const hasAphrodisiac = !!listUniqueCarriedSextoys().find(item => item.type.includes("aphrodisiacpill"));

	switch (V.mouth) {
		case "disabled":
			result.text = "당신은 입으로 아무것도 하지 않고 있다.";
			if (V.awareness >= 200 && hasAphrodisiac) {
				result.options.push({
					action: "maphropill",
					text: "미약을 삼킨다",
					otherElements: "<<combataware 3>>",
				});
			}
			result.options.push(rest());
			break;
		case 0:
			result.text = "당신은 입으로 아무것도 하지 않고 있다.";
			if (V.awareness >= 200) {
				if (hasAphrodisiac) {
					result.options.push({
						action: "maphropill",
						text: "미약을 삼킨다",
						otherElements: "<<combataware 3>>",
					});
				}
				if (
					breastsExposed() &&
					(V.leftarm === "mbreasthold" || V.rightarm === "mbreasthold") &&
					V.player.breastsize >= 8 &&
					!V.parasite.nipples.name &&
					!V.bugsinside
				) {
					result.options.push({
						action: "mbreastentrance",
						text: `당신의 ${V.leftarm === "mbreasthold" && V.rightarm === "mbreasthold" ? "양쪽 " : ""}젖꼭지를 입 안에 넣는다`,
						colour: "sub",
						otherElements: "<<combataware 3>>",
					});
				}
				if (genitalsExposed()) {
					if (V.canSelfSuckPenis && V.penisuse === 0) {
						if (V.worn.genitals.name === "chastity parasite") {
							result.options.push({
								action: "mchastityparasiteentrance",
								text: "기생충 정조대 자지를 핥는다",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						} else {
							result.options.push({
								action: "mpenisentrance",
								text: "자지를 핥는다",
								colour: "sub",
								otherElements: "<<combataware 3>>",
							});
						}
					}
					if (V.canSelfSuckVagina && V.vaginause === 0 && V.fingersInVagina === 0) {
						result.options.push({
							action: "mvaginaentrance",
							text: "보지를 핥는다",
							colour: "sub",
							otherElements: "<<combataware 3>>",
						});
					}
				}
			}
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerlick",
					text: "자지 모양 식물을 핥는다",
					colour: "sub",
				});
			}
			if (result.options.length) result.options.push(rest());
			break;
		case "mpenisentrance":
			result.text = corruptionCheck
				? '<span class="red">귓속의 슬라임이 당신의 입을 자지 앞에 두도록 강요하고 있다.</span>'
				: "당신의 입은 자신의 자지 앞에 있다.";
			if (awarenessCheck) {
				result.options.push({
					action: "mpenislick",
					text: "자지를 핥는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				result.options.push({
					action: "mpenistakein",
					text: "자지를 입에 집어넣는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mpenisstop"));
			result.options.push(rest());
			break;
		case "mchastityparasiteentrance":
			result.text = corruptionCheck
				? '<span class="red">귓속의 슬라임이 당신의 입을 기생충 정조대 자지 앞에 두도록 강요하고 있다.</span>'
				: "당신의 입은 기생충 정조대 자지 앞에 있다.";
			if (awarenessCheck) {
				result.options.push({
					action: "mchastityparasitelick",
					text: "기생충 자지를 핥는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
			}
			result.options.push(stop("mchastityparasitestop"));
			result.options.push(rest());
			break;
		case "mvaginaentrance":
			result.text = corruptionCheck
				? '<span class="red">귓속의 슬라임이 당신의 보지를 핥도록 강요하고 있다.</span>'
				: "당신의 입은 자신의 보지 앞에 있다.";
			if (awarenessCheck) {
				result.options.push({
					action: "mvaginalick",
					text: "보지를 핥는다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (!playerChastity("vagina")) {
					if (!V.parasite.clit.name) {
						result.options.push({
							action: "mvaginaclit",
							text: "클리토리스에 집중한다",
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					} else if (V.parasite.clit.name !== "parasite") {
						result.options.push({
							action: "mvaginaclitparasite",
							text: `클리토리스 <<trParasite '${V.parasite.clit.name}'>><<print _trResult>>에 집중한다`,
							colour: "sub",
							otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
						});
					}
				}
			}
			result.options.push(stop("mvaginastop"));
			break;
		case "mpenis":
			result.text = corruptionCheck
				? '<span class="red">귓속의 슬라임이 당신의 자지를 빨도록 강요하고 있다.</span>'
				: "당신은 스스로의 자지를 빨고 있다.";
			if (V.selfsuckDepth === V.selfsuckLimit) {
				result.text += `당신은 자지 전체를 입${V.selfsuckDepth >= 2 ? "과 목구멍" : ""}에 넣고 있다.`;
			} else {
				switch (V.selfsuckDepth) {
					case 0:
						result.text += "당신은 귀두를 입에 넣고 있다.";
						break;
					case 1:
						result.text += "당신의 귀두가 입의 뒤쪽에 닿아 있다.";
						break;
					case 2:
						result.text += "당신은 귀두를 목구멍 안에 넣고 있다.";
						break;
					default:
						/* Max selfsuckDepth is 3 and is captured by the above condition */
						result.text += '<span class="red">Error: Impossible condition.</span>';
						break;
				}
			}
			if (awarenessCheck) {
				result.options.push({
					action: "mpenissuck",
					text: "자지를 빤다",
					colour: "sub",
					otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
				});
				if (V.selfsuckDepth < V.selfsuckLimit) {
					result.options.push({
						action: "mpenisdeepthroat",
						text: "더 깊이 집어넣는다",
						colour: "sub",
						otherElements: !corruptionCheck ? "<<combataware 3>>" : undefined,
					});
				}
			}
			if (V.selfsuckDepth >= 1) {
				result.options.push({
					action: "mpenispullback",
					text: "뒤로 뺀다",
				});
			} else {
				result.options.push({
					action: "mpenismouthoff",
					text: "입을 거기에서 뗀다",
				});
			}
			if (V.selfsuckDepth <= 1) result.options.push(stop("mpenisstop"));
			break;
		case "mdildomouthentrance":
			result.text = `당신의 ${
				V.leftarm === "mdildomouthentrance" ? toyDisplay(selectedToy("left"), "은") : toyDisplay(selectedToy("right"), "은")
			} 당신의 입 앞에 있다.`;
			result.options.push({
				action: "mdildolick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mdildokiss",
				text: "키스한다",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mdildomouth":
			result.text = `당신의 ${V.leftarm === "mdildomouth" ? toyDisplay(selectedToy("left"), '은') : toyDisplay(selectedToy("right"), '은')} 당신의 입 안에 있다.`;
			result.options.push({
				action: "mdildolick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mdildosuck",
				text: "빤다",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mbreast":
			result.text = `당신의 ${V.leftarm === "mbreastmouthhold" && V.rightarm === "mbreastmouthhold" ? "<<nipples_ nun>>" : "<<nipple_ un>>"} 당신의 입 안에 있다.`;
			result.options.push({
				action: "mbreastlick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mbreastsuck",
				text: "빤다",
				colour: "sub",
			});
			result.options.push(rest());
			break;
		case "mpenisflowerlick":
			result.text = "당신은 자지 모양 식물을 핥고 있다.";
			result.options.push({
				action: "mpenisflowerlick",
				text: "핥는다",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowertakein",
				text: "입 안에 밀어넣는다",
				colour: "sub",
				otherElements: "<<oralvirginitywarning>>",
			});
			result.options.push(stop("mpenisflowerstop"));
			break;
		case "mpenisflowersuck":
			result.text = "당신은 자지 모양 식물을 빨고 있다.";
			result.options.push({
				action: "mpenisflowersuck",
				text: "빤다",
				colour: "sub",
			});
			result.options.push(stop("mpenisflowersuckstop"));
			break;
		default:
			break;
	}

	return result;
}

function masturbationActionsVagina({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "vaginaaction",
	};

	if (!V.player.vaginaExist || playerChastity("vagina")) return result;

	switch (V.vaginause) {
		case 0:
			result.text = `당신은 ${genitalsExposed() ? "보지로 아무것도 하지 않고 있다" : "옷을 입은 채로, 보지로 아무것도 하지 않고 있다"}.`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "자지 모양 식물을 비빈다",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "가만히 있는다",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `당신은 자지 모양 식물을 ${genitalsExposed() ? "보지" : "사타구니"}에 비벼대고 있다.`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "자지 모양 식물을 비빈다",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "자지 모양 식물에 올라탄다",
					colour: "sub",
					otherElements: "<<vaginalvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `${genitalsExposed() ? "보지를" : "사타구니를"} 치운다`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "당신은 자지 모양 식물을 보지에 넣고 위아래로 움직이고 있다.";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "자지 모양 식물 위에서 움직인다",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "보지를 치운다",
			});
			break;
		case "mdildopenetrate":
			result.text = `당신은 ${toyDisplay(selectedToy("vagina"), '을')} 보지에 넣고 위아래로 움직이고 있다.`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `${toyDisplay(selectedToy("vagina"))}에 올라탄 채로 위아래로 움직인다`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "보지를 치운다",
			});
			result.options.push({
				action: "mrest",
				text: "가만히 있는다",
			});
			break;
		default:
			break;
	}

	return result;
}

function masturbationActionsAnus({ selectedToy, toyDisplay, genitalsExposed }) {
	const result = {
		text: "",
		options: [],
		actionVariable: "anusaction",
	};

	if (playerChastity("anus")) return result;

	switch (V.anususe) {
		case 0:
			result.text = `당신은 ${genitalsExposed() ? "항문으로 아무것도 하지 않고 있다" : "옷을 입은 채로, 엉덩이로 아무것도 하지 않고 있다"}.`;
			if (V.moorPhallusPlant === 1) {
				result.options.push({
					action: "mpenisflowerrub",
					text: "자지 모양 식물을 비빈다",
					colour: "sub",
				});
			}
			if (result.options.length) {
				result.options.push({
					action: "mrest",
					text: "가만히 있는다",
				});
			}
			break;
		case "mpenisflowerrub":
			result.text = `당신은 자지 모양 식물을 ${genitalsExposed() ? "항문" : "엉덩이"}에 비벼대고 있다.`;
			result.options.push({
				action: "mpenisflowerrub",
				text: "자지 모양 식물을 비빈다",
				colour: "sub",
			});
			if (genitalsExposed()) {
				result.options.push({
					action: "mpenisflowerpenetrate",
					text: "자지 모양 식물에 올라탄다",
					colour: "sub",
					otherElements: "<<analvirginitywarning>>",
				});
			}
			result.options.push({
				action: "mpenisflowerstop",
				text: `${genitalsExposed() ? "항문을" : "엉덩이를"} 치운다`,
			});
			break;
		case "mpenisflowerpenetrate":
			result.text = "당신은 자지 모양 식물을 항문에 넣고 위아래로 움직이고 있다.";
			result.options.push({
				action: "mpenisflowerbounce",
				text: "자지 모양 식물 위에서 움직인다",
				colour: "sub",
			});
			result.options.push({
				action: "mpenisflowerpenetratestop",
				text: "항문을 치운다",
			});
			break;
		case "mdildopenetrate":
			result.text = `당신은 ${toyDisplay(selectedToy("anus"), '을')} 항문에 넣고 위아래로 움직이고 있다.`;
			result.options.push({
				action: "mdildopenetratebounce",
				text: `${toyDisplay(selectedToy("anus"))}에 올라탄 채로 위아래로 움직인다`,
				colour: "sub",
			});
			result.options.push({
				action: "mdildopenetratestop",
				text: "항문을 치운다",
			});
			result.options.push({
				action: "mrest",
				text: "가만히 있는다",
			});
			break;
		default:
			break;
	}

	return result;
}

Macro.add("masturbationactions", {
	handler() {
		const fragment = masturbationActions();
		this.output.append(fragment);
	},
});
