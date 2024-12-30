// eslint-disable-next-line no-unused-vars
function masturbationAudience() {
	const br = () => document.createElement("br");
	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};
	const fragment = document.createDocumentFragment();

	if (V.masturbationAudience >= 1) {
		const npc = random(1, Math.clamp(V.masturbationAudience, 1, 6));
		const comment = masturbationAudienceLines(npc);
		const audienceMutual = V.masturbationAudienceMutualAllowed && V.audiencearousal >= 50;
		if (V.masturbationAudience > 6) {
			sWikifier(
				`<span class="lewd">관중 한 무리가 당신을 쳐다보고 있다.${
					audienceMutual ? " 당신에게 들리는 음란한 소리들은 명백하게 그들 중 많은 사람들이 자위를 하고 있다는 것을 뜻한다." : ""
				}</span> `
			);
		}
		if (V.npc[npc - 1]) {
			sWikifier(
				`<span class="lewd"><<person${npc}>>당신은 <<combatperson_ yi>> 눈길이${V.masturbationAudience > 1 ? ", 다른 사람들과 같이," : ""} 당신을 향하고 있다는 것을 느낀다.${
					audienceMutual && V.masturbationAudience <= 6
						? ` <<He_ nun>> 당신의 움직임을${V.mouth === 0 || V.mouth === "disabled" ? " " : "일부 "} 따라하고 있다.`
						: ""
				}</span>`
			);
		} else if (V.masturbationAudience === 1) {
			sWikifier(
				`<span class="lewd"><<person${npc}>>당신은 <<persons_ yi>> 눈길이 당신을 향하고 있${
					audienceMutual ? `으며 <<he_ ga>> 당신의 움직임을${V.mouth === 0 || V.mouth === "disabled" ? " " : "일부 "} 따라하고 있다는 것을 느낀다` : "다는 것을 느낀다"
				}.</span>`
			);
		} else if (V.masturbationAudience <= 6) {
			sWikifier(`<span class="lewd"><<person${npc}>>당신은 ${V.masturbationAudience > 4 ? "많은 " : ""}눈길이 당신을 향하고 있다는 것을 느낀다.</span>`);
		}
		fragment.append(" ");
		if (comment) {
			sWikifier(comment);
		}
	}
	if (fragment.textContent) {
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationAudienceLines(npc) {
	if (!V.masturbationAudienceReactions) V.masturbationAudienceReactions = [];
	if (V.masturbationAudienceReactions.length >= 8) V.masturbationAudienceReactions.deleteAt(0);
	if (V.arousal >= V.arousalmax) {
		V.masturbationAudienceReactions.push("orgasm");
		V.audiencearousal += Math.clamp(2 * V.masturbationAudience, 2, 10);
		return masturbationAudienceLineText(npc, "orgasm");
	}

	if (!V.masturbationAudienceReactions.includes("mouthOral")) {
		/* Do nothing */
	} else if (["mpenisentrance", "mchastityparasiteentrance", "mvaginaentrance", "mpenis"].includes(V.mouth)) {
		V.masturbationAudienceReactions.push("mouthOral");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "mouthOral");
	}

	if (["mrest"].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) && random(0, 100) >= 66) {
		V.masturbationAudienceReactions.push("rest");
		if (V.audiencearousal > 10) V.audiencearousal -= 1;
		return masturbationAudienceLineText(npc, "rest");
	}

	if (
		["mpenisentrance", "mpenisglans", "mpenisshaft"].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "penis").length + 1)
	) {
		V.masturbationAudienceReactions.push("penis");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "penis");
	}

	if (
		["mchastityparasiteentrance", "mchastityparasiterub", "mchastityparasitesqueeze"].includesAny(
			V.masturbationActions.leftaction,
			V.masturbationActions.rightaction
		) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "chastitypenis").length + 1)
	) {
		V.masturbationAudienceReactions.push("chastitypenis");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "chastitypenis");
	}

	if (
		[
			"mvaginaentrance",
			"mvaginafingerstarttwo",
			"mvagina",
			"mvaginaclit",
			"mvaginarub",
			"mvaginafingeraddtwo",
			"mvaginafingeradd",
			"mvaginatease",
		].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "vagina").length + 1)
	) {
		V.masturbationAudienceReactions.push("vagina");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "vagina");
	}

	if (
		["manusentrance"].includesAny(V.leftarm, V.rightarm) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "anusEntrance").length + 1)
	) {
		V.masturbationAudienceReactions.push("anusEntrance");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "anusEntrance");
	}

	if (["manus"].includesAny(V.leftarm, V.rightarm) && random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "anus").length + 1)) {
		V.masturbationAudienceReactions.push("anus");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "anus");
	}

	if (["mbreast"].includes(V.mouth) && random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "mouthBreast").length + 1)) {
		V.masturbationAudienceReactions.push("mouthBreast");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "mouthBreast");
	}

	if (
		["mchest", "mbreastfondle", "mbreastpinch"].includesAny(V.masturbationActions.leftaction, V.masturbationActions.rightaction) &&
		random(0, 100) >= 20 * (V.masturbationAudienceReactions.filter(a => a === "chest").length + 1)
	) {
		V.masturbationAudienceReactions.push("chest");
		V.audiencearousal += 1;
		return masturbationAudienceLineText(npc, "chest");
	}

	if (V.masturbationAudienceReactions.includes("penisSize")) {
		/* Do nothing */
	} else if (V.exposed >= 2 && V.player.penisExist && !playerChastity("hidden")) {
		V.masturbationAudienceReactions.push("penisSize");
		V.audiencearousal += 1;
		switch (V.player.penissize) {
			case -2:
			case -1:
			case 0:
				wikifier("insecurity", '"penis_tiny"', 1);
				break;
			case 1:
				wikifier("insecurity", '"penis_small"', 1);
				break;
			case 2:
				break;
			case 3:
				if (V.player.gender !== "m") wikifier("insecurity", '"penis_big"', 1);
				break;
			case 4:
				wikifier("insecurity", '"penis_big"', 1);
				break;
		}
		return masturbationAudienceLineText(npc, "penisSize" + V.player.penissize);
	}

	if (V.masturbationAudienceReactions.includes("breastSize")) {
		/* Do nothing */
	} else if (V.player.breastsize === 0) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		if (V.player.gender_appearance !== "m") {
			wikifier("insecurity", '"breasts_tiny"', 1);
		}
		return masturbationAudienceLineText(npc, "breastSizeFlat");
	} else if (V.player.breastsize <= 5) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		if ((V.player.gender_appearance === "m" && V.worn.upper.exposed >= 2) || V.player.gender_appearance !== "m") {
			wikifier("insecurity", '"breasts_small"', 1);
		}
		return masturbationAudienceLineText(npc, "breastSizeSmall");
	} else if (V.player.breastsize <= 7) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		if (V.player.gender_appearance === "m") {
			wikifier("insecurity", '"breasts_big"', 1);
		}
		return masturbationAudienceLineText(npc, "breastSizeNormal");
	} else if (V.player.breastsize <= 10) {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		wikifier("insecurity", '"breasts_big"', 1);
		return masturbationAudienceLineText(npc, "breastSizeLarge");
	} else {
		V.masturbationAudienceReactions.push("breastSize");
		V.audiencearousal += 1;
		wikifier("insecurity", '"breasts_big"', 2);
		return masturbationAudienceLineText(npc, "breastSizeHuge");
	}

	return "";
}

function masturbationAudienceLineText(npc, lineType = "") {
	if (T.noMasturbationOutput) return "";
	const compatibleNamedNpcs = [];
	const npcSelected = V.NPCList[npc - 1];
	const namedNpc = compatibleNamedNpcs.includes(npcSelected.fullDescription) ? npcSelected.fullDescription : "";
	const resultArray = [];
	switch (lineType + namedNpc) {
		case "orgasm":
			resultArray.push(`"가버릴 때 네 얼굴은 정말 귀엽네."`, `"멈추지 마. 난 네가 한번 더 하고 싶어한다는 것을 알고 있어."`);
			if (V.masturbationAudience > 1) {
				resultArray.push(`"<<pshe_ ga>> 얼마나 몸을 많이 떨고 있는지 봐. 꽤나 강렬한 절정이었을 게 분명해."`);
			}
			if (V.masturbationAudience >= 3 && V.masturbationAudienceReactions >= 3) {
				resultArray.push(`"우리를 위해 가버리라고, 변태야. 모두에게 네가 얼마나 음란한지 보여줘."`, `"사람들 앞에서 가버리는 것을 즐기는거야?"`);
			}
			if (["mpenisentrance", "mpenis"].includes(V.mouth)) resultArray.push(`"너 자신의 정액은 얼마나 맛있어?"`);
			if (["mvaginaentrance"].includes(V.mouth)) resultArray.push(`"너 자신의 애액은 얼마나 맛있어?"`);
			if (V.masturbationAudienceReactions.filter(a => a === "orgasm").length > 2) {
				if (V.masturbationAudience > 1) {
					resultArray.push(`"이 <<slut_ un>> 쉬지도 않고 계속 가버리네!"`);
				}
				resultArray.push(`"그렇게 자주 가버리는 건 어떤 느낌일까!"`);
			}
			if (V.masturbationorgasm >= 5) {
				if (V.masturbationAudience > 1) {
					resultArray.push(`"이 <<slut_ i>> ${V.masturbationAudience >= 4 ? "모두가" : "우리가"} 보는 앞에서 계속 가버리고 있다고?"`);
				} else {
					resultArray.push(`"내 앞에서 가버리는 것을 좋아하는 게 분명해."`);
				}
			}
			return resultArray.random();
		case "mouthOral":
			if (V.masturbationAudience > 1) {
				return `"씨발, 이 <<slut_ yi>> 몸은 정말 유연한데!"`;
			} else {
				return `"씨발, 너 얼마나 몸이 유연한 거야?"`;
			}
		case "rest":
			if (V.masturbationActions.leftaction === "mrest" && V.masturbationActions.rightaction === "mrest") {
				if (V.audiencearousal <= 0 && V.exposed <= 0) {
					// Likely needs to be re-written to fit the context, should not show in the first release
					return [`너 괜찮니?`, `너 도움이 필요하니?`].random();
				} else {
					return [
						`왜 멈추는 거야? ${V.masturbationAudience > 1 ? "우리들" : "내"} 앞에서 계속 자위해 보라고.`,
						`벌써 지친 거야? 내가 도와줄까?`,
					].random();
				}
			} else {
				return [
					`그 비어있는 손을 사용해서 더 자위할 거야?`,
					`너는 이미 한 손으로 자위를 하고 있잖아, 하지만 두 손으로 하는 게 더 좋다고.`,
				].random();
			}
		case "penis":
			resultArray.push(`"이봐, 더 세게 쥐어짜 보라고."`);
			if (V.masturbationAudience >= 4) {
				resultArray.push(
					`"<<pshe_ ga>> <<pherself_ ul>> 얼마나 빨리 문질러대는지 보라고."`,
					`"그거 기분 좋아? 내 말은, 네 자지를 모두들 앞에서 만지는 것 말야."`,
					`"쿠퍼액이 좀 떨어지는 것이 보이는 것 같은데."`,
					`"바로 그거야, 모두에게 네가 어떻게 자위하는 지 보여주라고."`
				);
			} else {
				resultArray.push(
					`"${V.masturbationAudience > 1 ? "우리들" : "내"} 앞에서 그걸 그렇게 문질러대는 게 재미있어?"`,
					`"그거 기분 좋아? 내 말은, 네 자지를 ${V.masturbationAudience > 1 ? "우리들" : "내"} 앞에서 만지는 것 말야."`,
					`"<<pher_ yi>> 자지에서 쿠퍼액이 떨어지고 있는 거야?"`
				);
			}
			return resultArray.random();
		case "chastitypenis":
			resultArray.push(`"네가 자위하고 있는 물건이 도대체 뭐야?"`);
			if (V.mouth === 0 || V.mouth === "disabled") {
				resultArray.push(`"그걸 쥐어짜는 것 만으로 침을 흘리고 있는 거야?"`);
			}
			if (V.masturbationAudience >= 4) {
				resultArray.push(
					`"<<pshes_ ga>> 그걸 얼마나 세게 쥐어짜는지 보라고."`,
					`"너 정말 기분 좋은 것 처럼 보이네. 그러니까 너 정말 <<slutPost>> 같아 보여."`,
					`"바로 그거야, 모두에게 네가 어떻게 자위하는 지 보여주라고."`
				);
			} else {
				resultArray.push(
					`"${V.masturbationAudience > 1 ? "우리들" : "내"} 앞에서 그걸 그렇게 쥐어짜는 게 재미있어?"`,
					`"그거 기분 좋아? 내 말은, 그 물건을 ${V.masturbationAudience > 1 ? "우리들" : "내"} 앞에서 만지는 것 말야."`,
				);
			}
			return resultArray.random();
		case "vagina":
			if (V.masturbationAudience >= 4) {
				resultArray.push(
					`"<<pShe_ ga>> 얼마나 젖었는지 좀 봐."`,
					`"관중들을 그렇게나 간절히 원했던 거야?"`,
					`"<<pHer_ yi>> 클리토리스가 정말 딱딱해졌어."`,
					`"그래 <<girl_ a>>, 모두에게 네가 보지로 어떻게 자위하는지 보여주라고."`
				);
			} else {
				resultArray.push(
					`"네가 얼마나 젖었는지 좀 봐."`,
					`"${V.masturbationAudience > 1 ? "우리가" : "내가"} 봐 주기를 그렇게나 간절히 원했던 거야?"`,
					`"네 클리토리스가 정말 딱딱해졌어."`,
					`"그래 <<girl_ a>>, ${V.masturbationAudience > 1 ? "우리에게" : "내게"} 네가 보지로 어떻게 자위하는지 보여주라고."`
				);
			}
			if (V.fingersInVagina <= 0) resultArray.push(`"이봐, 손가락들 좀 넣어보라고."`);
			if (between(V.fingersInVagina, 1, 3))
				resultArray.push(
					`"그게 ${V.masturbationAudience > 1 ? "<<pshe_ ga>>" : "네가"} ${
						V.masturbationAudience > 1 ? " <<pherPost>> 안에 넣을 수 있는 손가락 전부야? 처녀인가 보네." : "넣을 수 있는 손가락 전부야?"
					}"`,
					`"이봐, 손가락 좀 더 넣어 봐. 거기에 더 넣을 수 있다는 것 알고 있다고."`,
					`"이리 오면 내가 손가락보다 더 좋은 걸 넣어주지."`
				);
			if (V.fingersInVagina >= 5) {
				resultArray.push(
					`"${V.masturbationAudience > 1 ? "<<pshe_ ga>>" : "네가"} ${
						V.masturbationAudience > 1 ? "<<pher_ yi>>" : ""
					} 주먹 전체를 그 안에 넣을 수 있을 줄은 몰랐는데, 내가 틀렸나 보네. 정말 많이 들어가는군."`
				);
			}
			if (V.fingersInVagina >= 1) resultArray.push(`"네 보지에서 나오는 음란한 소리가 우리 모두에게 들리고 있어, <<girl_ a>>.`);
			return resultArray.random();
		case "anusEntrance":
			resultArray.push(
				`"${V.masturbationAudience > 1 ? "<<pher_ ga>>" : "네가"} ${V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"} 엉덩이를 만지는 게 잘 보여."`,
				`"이렇게 때려보고 싶은 엉덩이를 지금까지 한 번도 본 적이 없어."`,
				`"이봐, 손가락 좀 넣어 봐."`,
				`"${V.masturbationAudience > 1 ? "우리에게" : "내게"} 네가 어떻게 엉덩이로 자위하는지 보여주라고, <<slut_ a>>."`
			);
			if (npcSelected && npcSelected.penis && npcSelected.penis !== "none") {
				resultArray.push(`"씨발, 저 엉덩이살 사이에 내 자지를 비벼보고 싶어."`);
			}
			return resultArray.random();
		case "anus":
			return [
				`"그게 끝이야? 이봐, 그것보다 더 넣을 수 있잖아."`,
				`"항문으로 자위하는 게 그렇게 좋아? <<slutPost>> 같으니라고."`,
				`"${V.masturbationAudience > 1 ? "<<pShe_ nun>>" : "너는"} 그 항문으로 경험을 많이 쌓았던 게 틀림없어."`,
				`"네가 손가락보다 더한 것을 원한다면, 내가 도와주지."`,
				`"제기랄, ${V.masturbationAudience > 1 ? "<<pshe_ ga>>" : "네가"} 진짜로 ${
					V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"
				} 주먹을 안에 집어넣을 줄이야. 그 항문에 지금까지 얼마나 많은 것들이 들어갔었던 거야?"`,
			].random();
		case "mouthBreast":
			resultArray.push(
				`"자신의 젖꼭지를 빨고 있다니, 멍청한 <<slutPost>> 같으니라고."`,
				`"자산의 커다란 젖가슴을 빠는 것이 얼마나 쉬운지 과시하고 있는 거야? 너 정말 변태구나."`,
				`"나도 그 젖꼭지들 좀 빨아도 될까?"`
			);
			if (V.lactating && V.breastfeedingdisable === "f") {
				resultArray.push(`"<<pshe_ ga>> 얼마나 열심히 <<pherself_ yi>> 젖을 짜내고 있는지 좀 봐."`);
			}
			return resultArray.random();
		case "chest":
			resultArray.push(
				`"그 젖꼭지 좀 쥐어짜봐, <<slut_ a>>."`,
				`"${V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"} 젖꼭지가 얼마나 딱딱해졌는지 좀 봐."`,
				`"네 가슴을 모두가 볼 수 있도록 과시한다고? 너 진짜로 변태구나."`,
				`"나도 그 젖꼭지 좀 비벼봐도 될까?"`
			);
			if (npcSelected && npcSelected.penis && npcSelected.penis !== "none") {
				resultArray.push(`"씨발, 내 자지를 저 젖탱이 사이에다 비벼보고 싶어."`);
			}
			return resultArray.random();
		case "penisSize-2": // empty case on purpose
		case "penisSize-1":
			return [
				`"정말 귀여운 클리토리스네!"`,
				`"엄지손가락과 다른 손가락 하나 이상으로 자위하기는 힘들 거라고 생각해."`,
				`"저런 한심한 자지는 지금까지 본 적이 없어."`,
			]
				.random()
				.concat(`<<ginsecurity "penis_tiny">>`);
		case "penisSize0":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes_ yi>>" : "네"} 자지는 정말 조그마하구나!"`,
				`"그게 저렇게 작다니 믿을 수가 없어!"`,
				`"저런 한심한 자지는 지금까지 본 적이 없어."`,
			]
				.random()
				.concat(`<<ginsecurity "penis_tiny">>`);
		case "penisSize1":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes_ yi>>" : "네"} 자지는 정말 작구나!"`,
				`"정말 작고, 귀여운 자지네."`,
				`"나는 ${V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"} 자지가 더 클 거라 생각했는데."`,
			]
				.random()
				.concat('<<ginsecurity "penis_small">>');
		case "penisSize2":
			return [
				`"${V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"} 귀여운 자지 사진을 찍었으면 좋겠어."`,
				`"부끄러워하지 마, 모두가 네 자지가 얼마나 아름다운지 알아야 한다고."`,
				`"네 자지 사진이 찍히고 싶지 않다면, <<slutPost>>처럼 행동하지 않는 게 좋을 거야."`,
			].random();
		case "penisSize3":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes_ yi>>" : "네"} 자지는 내 생각보다 큰데."`,
				`"부끄러워하지 마, 너는 네 자지에 대해 자랑스러워해야 한다고."`,
				`"${V.masturbationAudience > 1 ? "<<pHer_ yi>>" : "네"} 자지 크기는 완벽해."`,
			]
				.random()
				.concat(V.player.gender !== "m" ? `<<ginsecurity "penis_big">>` : "");
		case "penisSize4":
			return [
				`"${V.masturbationAudience > 1 ? "<<pShes_ yi>>" : "네"} 자지 정말 크다!"`,
				`"${V.masturbationAudience > 1 ? "<<pHer_ yi>>" : "네"} 자지는 희한하게 크네."`,
				`"저런 거대한 자지는 지금까지 본 적이 없어."`,
			]
				.random()
				.concat('<<ginsecurity "penis_big">>');
		case "breastSizeFlat":
			if (V.player.gender_appearance === "m") {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"소년들은 귀여운 젖꼭지를 가지고 있지."`,
						`"네 그 매끈한 가슴은 아름다워."`,
						`"부끄러워하지 마, 네 젖꼭지에는 전혀 음란한 게 없어."`,
					].random();
				} else {
					return [
						`"윗도리 좀 벗어 봐, 그 멋진 가슴을 보고 싶다고."`,
						`"<<pher_ yi>> 상의 안에 있는 것의 사진을 찍었으면 좋겠어."`,
						`"네가 옷을 입고 있어도, 나는 네가 사랑스러운 가슴을 가지고 있다는 것을 알 수 있어."`,
					].random();
				}
			} else {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"네 평평한 가슴은 맛있어 보이네."`,
						`"${V.masturbationAudience > 1 ? "<<pHer_ yi>>" : "네"} 가슴은 정말 평평해서, ${
							V.masturbationAudience > 1 ? "<<pshe_ ga>>" : "네가"
						} 남자라고 해도 믿을 것 같아."`,
						`"내가 <<pher_ yi>> 귀여운 가슴을 찍어놓는 게 좋을까? 나중에 유용해질 것 같은데."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_tiny">>`);
				} else {
					return [
						`"<<pher_ yi>> 상의 아래를 보고 싶어."`,
						`"다른 소녀들이 네 평평한 가슴을 가지고 놀리지 않니?"`,
						`"걱정 마, 너는 젖가슴이 없어도 귀여우니까."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_tiny">>`);
				}
			}
		case "breastSizeSmall":
			if (V.player.gender_appearance === "m") {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"네 연약한 가슴은 꼭 여자 같아."`,
						`"저 작은 젖꼭지들 좀 봐. 다른 소년들이 너를 괴롭혔을 것에 틀림없어."`,
						`"부끄러워하지 마, 네 젖꼭지에는 전혀 음란한 게 없어, 그게 여자 것 같다고 하더라도 말야."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_small">>`);
				} else {
					return [
						`"윗도리 좀 벗어 봐, 그 멋진 가슴을 보고 싶다고."`,
						`"<<pher_ yi>> 상의 안에 있는 것의 사진을 찍었으면 좋겠어."`,
						`"네가 옷을 입고 있어도, 나는 네가 사랑스러운 가슴을 가지고 있다는 것을 알 수 있어."`,
					].random();
				}
			} else {
				if (V.worn.upper.exposed >= 2) {
					return [
						`"<<pHer_ yi>> 조그마한 젖가슴은 정말 귀여워."`,
						`"이제 네 젖가슴이 커지더라도, 작고 귀여웠을 때의 증거는 내가 가지고 있을 거야."`,
						`"네 작은 젖가슴을 부끄러워하지 마, 네 젖가슴은 사랑스러워."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_small">>`);
				} else {
					return [
						`"<<pher_ yi>> <<worn_upper_name>> 아래로 <<pher_ yi>> 조그마한 젖가슴의 윤곽이 보여."`,
						`"윗도리 좀 벗어 봐, 네 젖가슴을 더 잘 보고 싶다고."`,
						`"<<pher_ yi>> 작은 젖가슴을 보고 싶어, 분명 훌륭할 거야."`,
					]
						.random()
						.concat(`<<ginsecurity "breasts_small">>`);
				}
			}
		case "breastSizeNormal":
			if (V.worn.upper.exposed >= 2) {
				return [`"네 젖가슴은 정말 사진이 잘 받는걸."`, `"네 젖가슴은 매혹적이야."`, `"네 젖가슴 사진은 나중에 유용하게 쓰일 거야."`]
					.random()
					.concat(V.player.gender === "m" ? `<<ginsecurity "breasts_big">>` : "");
			} else {
				return [
					`"${V.masturbationAudience > 1 ? "<<pher_ yi>> 윗도리 좀 벗겨" : "네 윗도리 좀 벗어"} 봐, ${
						V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"
					} 젖가슴을 더 잘 보고 싶다고."`,
					`"부끄러워하지 마, 네 젖가슴이 아직 드러난 것도 아니잖아."`,
					`"옷으로 가려져 있지 않아도, 나는 ${V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"} 젖가슴이 얼마나 사랑스러운 지 알겠어."`,
				]
					.random()
					.concat(V.player.gender === "m" ? `<<ginsecurity "breasts_big">>` : "");
			}
		case "breastSizeLarge":
			if (V.worn.upper.exposed >= 2) {
				return [
					`"${V.masturbationAudience > 1 ? "<<pHer_ yi>>" : "네"} 젖가슴이 정말 아름답게 흔들리네."`,
					`"그거 정말 인상적인 젖가슴이잖아."`,
					`"부끄러워하지 마, 너는 그런 커다란 젖가슴을 자랑스러워해야 한다고.`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			} else {
				return [
					`"${V.masturbationAudience > 1 ? "<<pher_ yi>>" : "네"} 젖가슴이 정말 보이는 것 만큼 커다란 거야? 알아볼 방법은 하나밖에 없지."`,
					`"윗도리 좀 벗어 봐. 네 커다란 젖가슴을 보고, 나중에 그걸 회상해보고 싶으니까."`,
					`"저렇게 커다란 젖가슴은 옷 아래 있어도 음란해 보이는군."`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			}
		case "breastSizeHuge":
			if (V.worn.upper.exposed >= 2) {
				return [
					`"그거 정말 거대한 젖통이네."`,
					`"너는 그걸로 도시의 모든 아기들을 먹일 수도 있을 거야."`,
					`"사진을 찍어 증거로 삼아둬야 겠어, 그렇게 하지 않으면 누구도 젖가슴이 저렇게 크다는 것을 믿지 않을 거야."`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			} else {
				return [
					`"확실히, 이렇게 큰 젖가슴을 가짜로 만들지는 못하겠지."`,
					`"윗도리 좀 벗어 봐, 그 거대한 젖통 좀 보고 싶다고."`,
					`"저렇게 거대한 젖가슴은 옷 아래 있어도 음란해 보이는군."`,
				]
					.random()
					.concat(`<<ginsecurity "breasts_big">>`);
			}
	}
}
