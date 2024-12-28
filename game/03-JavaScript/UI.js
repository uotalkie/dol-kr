/* eslint-disable eqeqeq */
/* eslint-disable jsdoc/require-description-complete-sentence */
/* globals hasSexStat, sexStatNameMapper, heatRutSexStatModifier, drunkSexStatModifier */

function overlayShowHide(elementId) {
	const div = document.getElementById(elementId);
	if (div != null) {
		div.classList.toggle("hidden");
		if (elementId === "debugOverlay") {
			V.debugMenu[0] = !V.debugMenu[0];
		}
	}
	window.cacheDebugDiv();
}
window.overlayShowHide = overlayShowHide;

function overlayMenu(elementId, type) {
	if (type === "debug") {
		window.toggleClassDebug(elementId + "Button", "bg-color");
		V.debugMenu[1] = elementId;
		if (document.getElementById(elementId) != null) {
			if (V.debugMenu[2].length > 0) window.toggleClassDebug(elementId, "hideWhileSearching");
			else window.toggleClassDebug(elementId, "classicHide");
		}
		if ((elementId === "debugFavourites" || elementId === "debugAdd") && V.debugMenu[2] != null && V.debugMenu[2].length > 0) {
			V.debugMenu[2] = "";
			document.getElementById("searchEvents").value = "";
			window.researchEvents("");
		}
		if (elementId === "debugFavourites") {
			window.patchDebugMenu();
		}
	}
	window.cacheDebugDiv();
}
window.overlayMenu = overlayMenu;

// Links.disableNumberifyInVisibleElements.push("#passage-testing-room");

$(document).on(":passagerender", function (ev) {
	if (passage() === "GiveBirth") {
		$(ev.content)
			.find("[type=checkbox]")
			.on("propertychange change", function () {
				Wikifier.wikifyEval("<<resetPregButtons>>");
				Links.generateLinkNumbers(ev.content);
			});
	}
});

function ensureIsArray(x, check = false) {
	if (check) x = x != null ? x : [];
	if (Array.isArray(x)) return x;
	return [x];
}
window.ensureIsArray = ensureIsArray;

// feats related widgets
// This needs updating, it's poorly designed.
function closeFeats(id) {
	const div1 = document.getElementById("feat-" + id);
	const div2 = document.getElementById("closeFeat-" + id);
	div1.style.display = "none";
	div2.style.display = "none";
	let otherFeatDisplay;
	let elementId = id + 1;
	let newId = parseInt(div1.classList.value.replace("feat feat", ""));
	do {
		otherFeatDisplay = document.getElementById("feat-" + elementId);
		if (otherFeatDisplay) {
			if (otherFeatDisplay.style.display !== "none" && !isNaN(newId)) {
				otherFeatDisplay.removeAttribute("class");
				otherFeatDisplay.classList.add("feat");
				otherFeatDisplay.classList.add("feat" + newId);
				otherFeatDisplay.classList.add("feat-overlay");
				if (newId >= 3) {
					otherFeatDisplay.classList.add("hiddenFeat");
				}
				newId++;
			}
			elementId++;
		}
	} while (otherFeatDisplay);
}
window.closeFeats = closeFeats;

function getTimeNumber(t) {
	const time = new Date(t);
	const result = time.getTime();
	if (isNaN(result)) {
		return 999999999999999;
	}
	return result;
}
window.getTimeNumber = getTimeNumber;

function extendStats() {
	V.extendedStats = !V.extendedStats;
	const $captionDiv = $("#storyCaptionDiv");
	if ($captionDiv.length === 0) return;

	$captionDiv.toggleClass("statsExtended", V.extendedStats);
	Wikifier.wikifyEval("<<replace #stats>><<statsCaption>><</replace>>");
	initializeTooltips();
}
window.extendStats = extendStats;

function customColour(color, saturation, brightness, contrast, sepia) {
	return (
		// eslint-disable-next-line prettier/prettier
		"filter: hue-rotate(" + color + "deg) saturate(" + saturation + ") brightness(" + brightness + ") contrast(" + contrast + ") sepia(" + sepia + ")"
	);
}
window.customColour = customColour;

function zoom(value) {
	const slider = $("[name$='" + Util.slugify("options.zoom") + "']");
	value = Math.clamp(value || slider[0].value || 0, 50, 200);
	$("body")
		.css("zoom", value + "%")
		.css("-ms-zoom", value + "%");
	if (slider[0] !== undefined && slider[0].value != value) {
		slider[0].value = value;
		slider.trigger("change");
	}
}
window.zoom = zoom;

function beastTogglesCheck() {
	T.beastVars = [
		"bestialitydisable",
		"swarmdisable",
		"parasitedisable",
		"parasitepregdisable",
		"tentacledisable",
		"slimedisable",
		"voredisable",
		"spiderdisable",
		"slugdisable",
		"waspdisable",
		"beedisable",
		"lurkerdisable",
		"horsedisable",
		"plantdisable",
	];
	T.anyBeastOn = T.beastVars.some(x => V[x] === "f");
}
window.beastTogglesCheck = beastTogglesCheck;

function settingsAsphyxiation() {
	const updateText = () => {
		let val = V.asphyxiaLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "내 목 절대 건들지 마!";
				break;
			case 1:
				text = "NPC들이 당신의 목을 <span class='blue inline-colour'>잡을</span> 지도 모릅니다. 숨 쉬는 데 영향을 주진 않아요.";
				break;
			case 2:
				text = "합의된 교제 중에, NPC들이 당신의 <span class='purple inline-colour'>숨을 막히게</span> 할지도 모릅니다.";
				break;
			case 3:
				text = "합의되지 않은 교제 중에, NPC들이 당신의 <span class='red inline-colour'>목을 졸라 질식시킬지도</span> 모릅니다.";
				break;
			case 4:
				text =
					"합의되지 않은 교제 중에, NPC들이 <span class='red inline-colour'>자주</span> 당신의 <span class='red inline-colour'>목을 졸라 질식시키려</span> 시도합니다.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		jQuery("#numberslider-value-asphyxialvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-asphyxialvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsAsphyxiation = settingsAsphyxiation;

function settingsCondoms() {
	const updateText = () => {
		let val = V.condomLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "<span class='red inline-colour'>모든 사람들이 라텍스와 안전한 성교에 알레르기 반응을 보입니다.</span>";
				break;
			case 1:
				text = "단지 <span class='green inline-colour'>당신</span>만이 콘돔을 사용합니다. 그래도 당신은 NPC들에게 콘돔을 줄 수 있습니다.";
				break;
			case 2:
				text = "NPC들은 그들과 당신 사이에 <span class='blue inline-colour'>임신</span>이 가능한 경우에만 콘돔을 사용할 것입니다.";
				break;
			case 3:
				text = "NPC들은 콘돔을 가지고 있을 수 있으며 <span class='pink inline-colour'>그들이 원할 때에는 언제나</span> 사용합니다.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		jQuery("#numberslider-value-condomlvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-condomlvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsCondoms = settingsCondoms;

function settingsNudeGenderAppearance() {
	const updateText = () => {
		let val = V.NudeGenderDC;
		let text = null;
		switch (val) {
			case -1:
				text =
					"NPCs <span class='blue inline-colour'>ignore</span> genitals when perceiving gender. <span class='purple inline-colour'>Overrides some gender appearance modifiers, including the femininity factor of pregnant bellies. Player descriptions will match the behaviour chosen in the bedroom mirror.</span> <span class='red inline-colour'>Disables crossdressing warnings. NPCs will still judge gender based on your manner of dress.</span>";
				break;
			case 0:
				text = "NPC들은 당신의 성별을 파악할 때 당신의 생식기를 <span class='blue inline-colour'>무시할</span> 것입니다.";
				break;
			case 1:
				text = "NPC들은 당신의 성별을 파악할 때 당신의 생식기를 <span class='purple inline-colour'>고려할</span> 것입니다.";
				break;
			case 2:
				text = "NPC들은 당신의 생식기로 당신의 성별을 <span class='red inline-colour'>판단할</span> 것입니다.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		$("#numberslider-value-nudegenderdc").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		jQuery("#numberslider-input-nudegenderdc")
			.on("input change", function (e) {
				updateText();
			})
			.css("width", "100%");
	});
}
window.settingsNudeGenderAppearance = settingsNudeGenderAppearance;

function settingsBodywriting() {
	const updateText = () => {
		let val = V.bodywritingLvl;
		let text = null;
		switch (val) {
			case 0:
				text = "NPC들은 당신 몸에 무언가를 쓰지 <span class='green inline-colour'>않을</span> 것입니다.";
				break;
			case 1:
				text = "NPC들은 당신 몸에 무언가를 써도 되는지 <span class='blue inline-colour'>물어볼</span> 것입니다.";
				break;
			case 2:
				text = "NPC들은 당신 몸에 무언가를 <span class='purple inline-colour'>강제로</span> 쓰려 할 것입니다.";
				break;
			case 3:
				text = "NPC들은 당신 몸에 무언가를 <span class='red inline-colour'>강제로</span> 쓰고 <span class='red inline-colour'>문신으로 새기려</span> 할 것입니다.";
				break;
			default:
				text = "Error: bad value: " + val;
				val = 0;
		}
		// delete the below code when $bodywritingdisable is fully replaced by $bodywritingLvl
		V.bodywritingdisable = "f";
		if (val === 0) V.bodywritingdisable = "t";

		$("#numberslider-value-bodywritinglvl").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-bodywritinglvl").on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsBodywriting = settingsBodywriting;

function settingsNamedNpcBreastSize(id, persist) {
	const breastSizes = ["유두", "약간 솟아오른", "조그마한", "작은", "앙증맞은", "평범한", "봉긋한", "큰", "풍만한", "커다란", "매우 큰", "엄청난", "거대한"];

	const updateText = () => {
		const npc = persist ? V.per_npc[T.pNPCId] : V.NPCName[T.npcId];
		const val = npc.breastsize;

		const text = breastSizes[val];

		if (val > 0) {
			npc.breastdesc = text + " 가슴";
			npc.breastsdesc = text + " 가슴";
		} else {
			npc.breastdesc = text;
			npc.breastsdesc = text;
		}

		$("#numberslider-value-" + id).text(npc.breastsdesc);
	};

	$(() => {
		updateText();
		$("#numberslider-input-" + id).on("input change", function (e) {
			updateText();
		});
	});
}
window.settingsNamedNpcBreastSize = settingsNamedNpcBreastSize;

function settingsGenericGenders(id) {
	let slider = null; const trid = {"NPCs":"NPC들", "beasts":"짐승들", "other victims you encounter":"당신과 조우하는 다른 희생자들"};
	const updateText = () => {
		let val = null;
		let attraction = null;
		let men = null;
		let women = null;

		if (id === "beasts") {
			val = V.beastmalechance;
			slider = "beastmalechance";
		} else if (id === "NPCs") {
			val = V.malechance;
			slider = "malechance";
		} else if (id === "mlm") {
			val = V.maleChanceMale;
			slider = "malechancemale";
			attraction = "<span class='blue inline-colour'>남성에게 끌릴</span>";
			men = "남성들";
			women = "여성들";
		} else if (id === "wlw") {
			val = V.maleChanceFemale;
			slider = "malechancefemale";
			attraction = "<span class='pink inline-colour'>여성에게 끌릴</span>";
			men = "남성들";
			women = "여성들";
		} else if (id === "blm") {
			val = V.beastMaleChanceMale;
			slider = "beastmalechancemale";
			attraction = "<span class='blue inline-colour'>수컷에게 끌릴</span>";
			men = "수컷 짐승들";
			women = "암컷 짐승들";
		} else if (id === "blw") {
			val = V.beastMaleChanceFemale;
			slider = "beastmalechancefemale";
			attraction = "<span class='pink inline-colour'>암컷에게 끌릴</span>";
			men = "수컷 짐승들";
			women = "암컷 짐승들";
		} else {
			val = V.malevictimchance;
			slider = "malevictimchance";
		}

		let text = null;

		if (id === "mlm" || id === "wlw" || id === "blw" || id === "blm") {
			switch (val) {
				case 100:
					text = `<span class='gold inline-colour'>0%</span>의 <span class='pink inline-colour'>${women}</span>과 <span class='gold inline-colour'>100%</span>의 <span class='blue inline-colour'>${men}</span>이 ${attraction} 것입니다.`;
					break;
				case 0:
					text = `<span class='gold inline-colour'>100%</span>의 <span class='pink inline-colour'>${women}</span>과 <span class='gold inline-colour'>0%</span>의 <span class='blue inline-colour'>${men}</span>이 ${attraction} 것입니다.`;
					break;
				default:
					text = `<span class='gold inline-colour'>${
						100 - val
					}%</span>의 <span class='pink inline-colour'>${women}</span>과 <span class='gold inline-colour'>${val}%</span>의 <span class='blue inline-colour'>${men}</span>이 ${attraction} 것입니다.`;
					break;
			}
		} else {
			if (val === 100) {
				text = `<span class='gold inline-colour'>모든</span> ${trid[id]}은 <span class='blue inline-colour'>${id === "beasts"? "수컷":"남성"}</span>일 것입니다.`;
			} else if (val === 0) {
				text = `<span class='gold inline-colour'>모든</span> ${trid[id]}은 <span class='pink inline-colour'>${id === "beasts"? "암컷":"여성"}</span>일 것입니다.`;
			} else if (val === 50) {
				text =
					trid[id] +
					"은" +
					` <span class='blue inline-colour'>${id === "beasts"? "수컷":"남성"}</span>과 <span class='pink inline-colour'>${id === "beasts"? "암컷":"여성"}</span>으로 <span class='gold inline-colour'>동등하게</span> 나누어질 것입니다.`;
			} else if (val > 50) {
				text = `<span class='gold inline-colour'>${val}%</span>의 ${trid[id]}은 <span class='blue inline-colour'>${id === "beasts"? "수컷":"남성"}</span>일 것입니다.`;
			} else {
				text = `<span class='gold inline-colour'>${100 - val}%</span>의 ${trid[id]}은 <span class='pink inline-colour'>${id === "beasts"? "암컷":"여성"}</span>일 것입니다.`;
			}
		}

		jQuery("#numberslider-value-" + slider)
			.text("")
			.append(text)
			.addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-" + slider).on("input change", function (e) {
			updateText();
		});
	});
}

window.settingsGenericGenders = settingsGenericGenders;

function settingsMonsterChance() {
	const updateText = () => {
		const val = V.monsterchance;
		let text = null;

		switch (val) {
			case 100:
				text = "짐승들은 <span class='gold inline-colour'>항상</span> 몬스터 소년과 소녀로 나올 것입니다.";
				break;
			case 0:
				text = "환각 중에 허용되지 않는다면, 짐승들은 <span class='gold inline-colour'>절대</span> 몬스터 소년과 소녀로 나오지 않을 것입니다.";
				break;
			case 50:
				text = "모든 짐승들 중 <span class='gold inline-colour'>절반</span>은 몬스터 소년과 소녀로 대체될 것입니다.";
				break;
			default:
				text = `모든 짐승들 중 <span class='gold inline-colour'>${val}%</span>는 몬스터 소년과 소녀로 대체될 것입니다.`;
				break;
		}

		jQuery("#numberslider-value-monsterchance").text("").append(text).addClass("small-description");
	};

	$(() => {
		updateText();
		$("#numberslider-input-monsterchance").on("input change", function (e) {
			updateText();
		});
	});
}

window.settingsMonsterChance = settingsMonsterChance;

function settingsBeastGenders(singleUpdate) {
	const updateText = () => {
		const val = T.beastmalechance;
		let text = null;
		switch (val) {
			case 100:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>모든</span> 짐승들이 <span class='gold inline-colour'>이성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>모든</span> 짐승들은 <span class='blue inline-colour'>수컷</span>일 것입니다.";
				}
				break;
			case 75:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>의 짐승들이 <span class='gold inline-colour'>이성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>75%</span>의 짐승들은 <span class='blue inline-colour'>수컷</span>일 것입니다.";
				}
				break;
			case 50:
				if (T.beastMaleChanceSplit === "t") {
					text = "짐승들의 성적 선호는 <span class='gold inline-colour'>무작위로</span> 나누어질 것입니다.";
				} else {
					text =
						"짐승들은 <span class='blue inline-colour'>수컷</span>과 <span class='pink inline-colour'>암컷</span>으로 <span class='gold inline-colour'>동등하게</span> 나누어질 것입니다.";
				}
				break;
			case 25:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>의 짐승들은 <span class='gold inline-colour'>동성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>75%</span>의 짐승들은 <span class='pink inline-colour'>암컷</span>일 것입니다.";
				}
				break;
			case 0:
				if (T.beastMaleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>모든</span> 짐승들은 <span class='gold inline-colour'>동성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>모든</span> 짐승들은 <span class='pink inline-colour'>암컷</span>일 것입니다.";
				}
				break;
			default:
				if (T.beastMaleChanceSplit === "t") {
					text = "짐승들의 성적 선호는 <span class='gold inline-colour'>무작위로</span> 나누어질 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>" + V.beastmalechance + "%</span>의 짐승들은 <span class='blue inline-colour'>수컷</span>일 것입니다.";
				}
				break;
		}
		jQuery("#numberslider-value--beastmalechance").text("").append(text).addClass("small-description");
	};

	if (!singleUpdate) {
		$(() => {
			updateText();
			$("#numberslider-input--beastmalechance").on("input change", function (e) {
				updateText();
			});
		});
	} else {
		updateText();
	}
}
window.settingsBeastGenders = settingsBeastGenders;

function settingsNpcGenders(singleUpdate) {
	const updateText = () => {
		const val = T.malechance;
		let text = null;
		switch (val) {
			case 100:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>모든</span> NPC들이 <span class='gold inline-colour'>이성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>모든</span> NPC들은 <span class='blue inline-colour'>남성</span>일 것입니다.";
				}
				break;
			case 75:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>의 NPC들이 <span class='gold inline-colour'>이성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>75%</span>의 NPC들은 <span class='blue inline-colour'>남성</span>일 것입니다.";
				}
				break;
			case 50:
				if (T.maleChanceSplit === "t") {
					text = "NPC들의 성적 선호는 <span class='gold inline-colour'>무작위로</span> 나누어질 것입니다.";
				} else {
					text =
						"NPC들은 <span class='blue inline-colour'>남성</span>과 <span class='pink inline-colour'>여성</span>으로 <span class='gold inline-colour'>동등하게</span> 나누어질 것입니다.";
				}
				break;
			case 25:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>75%</span>의 NPC들이 <span class='gold inline-colour'>동성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>75%</span>의 NPC들은 <span class='pink inline-colour'>여성</span>일 것입니다.";
				}
				break;
			case 0:
				if (T.maleChanceSplit === "t") {
					text = "<span class='gold inline-colour'>모든</span> NPC들이 <span class='gold inline-colour'>동성</span>을 선호할 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>모든</span> NPC들은 <span class='pink inline-colour'>여성</span>일 것입니다.";
				}
				break;
			default:
				if (T.maleChanceSplit === "t") {
					text = "NPC들의 성적 선호는 <span class='gold inline-colour'>무작위로</span> 나누어질 것입니다.";
				} else {
					text = "<span class='gold inline-colour'>" + V.malechance + "%</span>의 NPC들은 <span class='blue inline-colour'>남성</span>일 것입니다.";
				}
				break;
		}
		jQuery("#numberslider-value--malechance").text("").append(text).addClass("small-description");
	};

	if (!singleUpdate) {
		$(() => {
			updateText();
			$("#numberslider-input--malechance").on("input change", function (e) {
				updateText();
			});
		});
	} else {
		updateText();
	}
}
window.settingsNpcGenders = settingsNpcGenders;

// Checks current settings page for data attributes
// Run only when settings tab is changed (probably in "displaySettings" widget)
// data-target is the target element that needs to be clicked for the value to be updated
// data-disabledif is the conditional statement (e.g. data-disabledif="V.per_npc[T.pNPCId].gender==='f'")

function settingsDisableElement() {
	$(() => {
		$("[data-disabledif]").each(function () {
			const updateButtonsActive = () => {
				$(() => {
					try {
						const evalStr = "'use strict'; return " + disabledif;
						// eslint-disable-next-line no-new-func
						const cond = Function(evalStr)();
						const style = cond ? "var(--500)" : "";
						orig.css("color", style).children().css("color", style);
						orig.find("input").prop("disabled", cond);
					} catch (e) {
						console.log(e);
					}
				});
			};
			const orig = $(this);
			const disabledif = orig.data("disabledif");
			[orig.data("target")].flat().forEach(e => $("[name$='" + Util.slugify(e) + "']").on("click", updateButtonsActive));
			if (disabledif) {
				updateButtonsActive();
			}
		});
	});
}
window.settingsDisableElement = settingsDisableElement;

// Adds event listeners to input on current page
// mainly used for options overlay
function onInputChanged(func) {
	if (!func || typeof func !== "function") return;
	$(() => {
		$("input, select").on("change", function () {
			func();
		});
	});
}
window.onInputChanged = onInputChanged;

function closeOverlay() {
	wikifier("journalNotesTextareaSave");
	updateOptions();
	T.buttons.reset();
	$("#customOverlay").addClass("hidden").parent().addClass("hidden");
	$.event.trigger(":oncloseoverlay", [T.currentOverlay]);
	delete T.currentOverlay;
	delete V.tempDisable;
}
window.closeOverlay = closeOverlay;

function journalNotesReplacer(name) {
	return name.replace(/[^a-zA-Z0-9가-힣\u4e00-\u9fa5' _-]+/g, "");
}
window.journalNotesReplacer = journalNotesReplacer;

function updatehistorycontrols() {
	// if undefined, initiate new variable based on engine config
	if (V.options.maxStates === undefined) V.options.maxStates = Config.history.maxStates;
	else Config.history.maxStates = V.options.maxStates; // update engine config

	// enable fast rng re-roll on "keypad *" for debug and testing
	if (V.debug || V.cheatdisable === "f" || V.testing) Links.disableRNGReload = false;
	else Links.disableRNGReload = true;

	// option to still record history without showing the controls, for better debugging
	if (V.options.maxStates === 1 || !V.options.historyControls || V.ironmanmode) {
		// hide nav panel when it's useless or set to not be displayed
		Config.history.controls = false;
		jQuery("#ui-bar-history").hide();
	} else if (Config.history.maxStates > 1) {
		// or unhide it otherwise, if config allows
		Config.history.controls = true;
		jQuery("#ui-bar-history").show();
	}
}
window.updatehistorycontrols = updatehistorycontrols;
DefineMacro("updatehistorycontrols", updatehistorycontrols);

/*
	Refreshes the game when exiting options menu - applying the options object after State has been restored.
	It is done this way to prevent exploits by re-rendering the same passage
*/
function updateOptions() {
	if (T.currentOverlay === "options" && T.optionsRefresh && V.passage !== "Start") {
		updatehistorycontrols();
		const optionsData = clone(V.options);
		const tmpButtons = T.buttons;
		const tmpKey = T.key; /* numberify_enabled workaround */ T.optionsRefresh = false;

		if (!State.restore(true)) return; // don't do anything if state couldn't be restored
		V.options = optionsData; /* numberify_enabled workaround */ Links.enabled=V.options.numberify_enabled?true:false;
		State.show();

		T.key = tmpKey;
		T.buttons = tmpButtons;
		T.buttons.setupTabs();
		if (T.key !== "options") {
			T.buttons.setActive(T.buttons.activeTab);
		}
		Weather.Observables.checkForUpdate();
	}
}
window.updateOptions = updateOptions;

$(document).on("click", "#cbtToggleMenu .cbtToggle", function (e) {
	$("#cbtToggleMenu").toggleClass("visible");
});

function elementExists(selector) {
	return document.querySelector(selector) !== null;
}
window.elementExists = elementExists;

window.getCharacterViewerDate = () => {
	const textArea = document.getElementById("characterViewerDataInput");
	textArea.value = JSON.stringify(V.characterViewer);
};

window.loadCharacterViewerDate = () => {
	const textArea = document.getElementById("characterViewerDataInput");
	let data;
	try {
		data = JSON.parse(textArea.value);
	} catch (e) {
		textArea.value = "Invalid JSON";
	}
	const original = clone(V.characterViewer);

	if (typeof data === "object" && !Array.isArray(data) && data !== null) {
		V.characterViewer = {
			...original,
			...data.clothesEquipped,
			...data.clothesIntegrity,
			...data.bodyState,
			...data.colours,
			...data.skinColour,
			...data.controls,
		};
		State.display(V.passage);
	} else {
		textArea.value = "Invalid Import";
	}
};

function updateCaptionTooltip() {
	const elementId = "#characterTooltip";
	const element = $(elementId);
	const content = $("<div>");
	const canvas = $("#img canvas");
	const fragment = document.createDocumentFragment();
	const updateTooltip = () => {
		if (V.intro) return;
		fragment.append(wikifier("clothingCaptionText"));
		content.append(fragment);
		element.tooltip({
			message: content,
			delay: 200,
			position: "cursor",
		});
	};

	let isMouseOverElement = false;

	// Workaround for trickle-through on the canvas
	// So that the contextmenu works while having tooltips in an element below it (to define the area where tooltip shows up)
	const checkMousePosition = e => {
		if (!e || typeof e.clientX !== "number" || typeof e.clientY !== "number") {
			return;
		}
		const isCurrentlyOverElement = $(document.elementsFromPoint(e.clientX, e.clientY)).is("#characterTooltip");

		// Only trigger events if the status has changed
		if (isCurrentlyOverElement && !isMouseOverElement) {
			element.trigger("mouseenter");
			canvas.css("cursor", "help");
			isMouseOverElement = true;
		} else if (!isCurrentlyOverElement && isMouseOverElement) {
			element.trigger("mouseleave");
			$(".tooltip-popup").remove();
			canvas.css("cursor", "");
			isMouseOverElement = false;
		}

		// If the mouse is currently over the element, trigger mousemove as well
		if (isCurrentlyOverElement) {
			element.trigger({
				type: "mousemove",
				pageX: e.pageX,
				pageY: e.pageY,
			});
		}
	};

	updateTooltip();
	$(document).off(":passageend", updateCaptionTooltip);
	$(document).on(":passageend", updateCaptionTooltip);
	// Add event listeners only when the mouse is over the canvas
	canvas.on("mouseenter", () => {
		$(document).on("mousemove", checkMousePosition);
	});

	canvas.on("mouseleave", () => {
		$(document).off("mousemove", checkMousePosition);
		if (isMouseOverElement) {
			// Cleanup if mouse leaves the canvas while over the tooltip element
			element.trigger("mouseleave");
			$(".tooltip-popup").remove();
			canvas.css("cursor", "");
			isMouseOverElement = false;
		}
	});
}
$(() => updateCaptionTooltip());
window.updateCaptionTooltip = updateCaptionTooltip;

function returnTimeFormat() {
	if (!V || !V.options) return "en-GB";
	return V.options.dateFormat;
}
window.returnTimeFormat = returnTimeFormat;

/* Temporary until npc rework */
function sensitivityString(value) {	/* Todo: 현재 이 위젯은 치트메뉴에서만 사용하는 것 같은데 다른 곳에서 사용되는 경우가 생기면 trintegrityKeyword 처럼 따로 분리할 것 */
	if (value >= 3.5) return "예민함";	// "sensitive"
	if (value >= 2.5) return "민감함";	// "tender"
	if (value >= 1.5) return "섬세함";	// "receptive"
	return "평범함";	// "normal"
}

window.sensitivityString = sensitivityString;

function moneyStatsProcess(stats) {
	const keys = [];
	Object.entries(stats).forEach(([type, value]) => {
		if (!T.moneyStatsDetailed) {
			let compressTo;
			if (type.includes("DanceTip")) {
				compressTo = "danceTips";
			} else if (type.includes("DanceJob")) {
				compressTo = "danceJobs";
			} else if (type.includes("Prostitution")) {
				compressTo = "prostitution";
			} else {
				switch (type) {
					case "libraryBooks":
					case "schoolProject":
					case "schoolCondoms":
					case "schoolStimulant":
					case "schoolPoolParty":
						compressTo = "school";
						break;
					case "bus":
						compressTo = "town";
						break;
					case "avery":
					case "bailey":
					case "baileyRent":
					case "robin":
					case "sydney":
					case "whitney":
						compressTo = "peopleOfInterest";
						break;
					case "hairdressers":
					case "tailor":
					case "clothes":
					case "sexToys":
					case "tattoo":
					case "furniture":
					case "cosmetics":
					case "supermarket":
						compressTo = "shopping";
						break;
					case "flatsCanal":
					case "flatsCleaning":
					case "flatsHookah":
						compressTo = "flats";
						break;
					case "cafeWaiter":
					case "cafeChef":
					case "cafeBuns":
						compressTo = "cafe";
						break;
					case "brothelShow":
					case "brothelVendingMachine":
					case "brothelCondoms":
						compressTo = "brothel";
						break;
					case "hospitalPaternityTest":
					case "hospitalPenisReduction":
					case "hospitalPenisEnlargement":
					case "hospitalBreastReduction":
					case "hospitalBreastEnlargement":
					case "hospitalParasiteRemoval":
					case "hospitalParasitesSold":
						compressTo = "hospital";
						break;
					case "pharmacyCondoms":
					case "pharmacyCream":
					case "pharmacyPills":
					case "pharmacyPregnancyTest":
						compressTo = "pharmacy";
						break;
					case "museumAntique":
						compressTo = "museum";
						break;
					case "pubAlcohol":
						compressTo = "pub";
						break;
					case "dockWage":
						compressTo = "docks";
						break;
					case "stripClubBartender":
					case "stripClubDancer":
						compressTo = "stripClub";
						break;
				}
			}

			if (compressTo) {
				if (!stats[compressTo]) {
					stats[compressTo] = { earned: 0, earnedCount: 0, spent: 0, spentCount: 0 };
				}
				if (value.earned) {
					stats[compressTo].earned = (stats[compressTo].earned || 0) + value.earned;
					stats[compressTo].earnedCount = (stats[compressTo].earnedCount || 0) + value.earnedCount;
					stats[compressTo].earnedTimeStamp = Math.max(0, stats[compressTo].earnedTimeStamp || 0, value.earnedTimeStamp || 0);
				}
				if (value.spent) {
					stats[compressTo].spent = (stats[compressTo].spent || 0) + value.spent;
					stats[compressTo].spentCount = (stats[compressTo].spentCount || 0) + value.spentCount;
					stats[compressTo].spentTimeStamp = Math.max(0, stats[compressTo].spentTimeStamp || 0, value.spentTimeStamp || 0);
				}
				delete stats[type];
				keys.pushUnique(compressTo);
				return;
			}
		}
		keys.pushUnique(type);
	});
	const total = { earned: 0, earnedCount: 0, spent: 0, spentCount: 0 };
	Object.values(stats).forEach(stat => {
		if (stat.earned) total.earned += stat.earned;
		if (stat.earnedCount) total.earnedCount += stat.earnedCount;
		if (stat.spent) total.spent += stat.spent;
		if (stat.spentCount) total.spentCount += stat.spentCount;

		if (stat.earnedTimeStamp) total.earnedTimeStamp = Math.max(stat.earnedTimeStamp, total.earnedTimeStamp || 0);
		if (stat.spentTimeStamp) total.spentTimeStamp = Math.max(stat.spentTimeStamp, total.spentTimeStamp || 0);
	});

	return [keys, stats, total];
}
window.moneyStatsProcess = moneyStatsProcess;

/**
 * If hasSexStat() modifiers are allowing the player to see an aditional option, return the css class for the largest individual modifier.
 * If the modifiers are not high enough to show a new option, don't return a class.
 * Passing in 0 or nothing for requiredLevel returns the classes for the largest modifier regardless of if the player is being shown an aditional option.
 *
 * Returns the sexStat Modifer CSS classes drunk-text / jitter-text and the level of the effect (drunk-1, jitter-2...)
 *
 * When text animations are turned off, this will only return drunk-text or jitter-text without the animation level.
 *
 * @param {string} input
 * @param {number} requiredLevel
 */
function getLargestSexStatModifierCssClasses(input, requiredLevel = 0) {
	const statName = sexStatNameMapper(input);
	// check if stat name is valid.
	if (statName == null) {
		Errors.report(`[getLargestSexStatModifierCssClasses]: input '${statName}' null.`, {
			Stacktrace: Utils.GetStack(),
			statName,
		});
		return "";
	}

	const drunkSexStatModifierValue = drunkSexStatModifier(V[statName]);
	const heatRutSexStatModifierValue = heatRutSexStatModifier(statName);

	// If there is a modifier, and either requiredLevel is 0 or the modifiers put the player up a level of the sexStat.
	if (
		drunkSexStatModifierValue + heatRutSexStatModifierValue > 0 &&
		(requiredLevel === 0 || (!hasSexStat(statName, requiredLevel, false) && hasSexStat(statName, requiredLevel, true)))
	) {
		const modifiers = [
			{ value: drunkSexStatModifierValue, class: "drunk" },
			{ value: heatRutSexStatModifierValue, class: "jitter" },
		];

		// Gets the largest modifier.
		const largestModifier = modifiers.reduce((max, current) => (current.value > max.value ? current : max), modifiers[0]);

		// Gets the base class for effect.
		let modifierClasses = `${largestModifier.class}-text`;

		if (V.options.textAnimations) {
			// Sets the animation based on how large the modifier is.
			if (largestModifier.value > 20) {
				modifierClasses += ` ${largestModifier.class}-3`;
			} else if (largestModifier.value > 10) {
				modifierClasses += ` ${largestModifier.class}-2`;
			} else {
				modifierClasses += ` ${largestModifier.class}-1`;
			}

			modifierClasses += ` animation-offset-${Math.floor(Math.random() * 10)}`;
		}

		return modifierClasses;
	} else {
		return "";
	}
}
window.getLargestSexStatModifierCssClasses = getLargestSexStatModifierCssClasses;

/**
 * Used to display the drunk text, with with animations if enabled, otherwise just the glow effect.
 *
 * @returns {string}
 */
function basicDrunkCss() {
	return V.options.textAnimations ? "drunk-text drunk-1" : "drunk-text";
}
window.basicDrunkCss = basicDrunkCss;

/**
 * Used to display the jitter text, with with animations if enabled, otherwise just the glow effect.
 *
 * @returns {string}
 */
function basicJitterCss() {
	return V.options.textAnimations ? "jitter-text drunk-1" : "jitter-text";
}
window.basicJitterCss = basicJitterCss;
