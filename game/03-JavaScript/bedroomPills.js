/* eslint-disable dot-notation */
/*
 * if display_condition is 1, item is displayed, else it's not
 * current max doses for Harper/Asylum pills is 1; 2 for every other pills
 * place the widgets that need to be run inside effects array
 * if you feel lost just ask away :)
 * take_condition == 1 means the "Take Pill" button is not greyed out and is clickable
 * display_condition controls whether or not pill should be displayed in the pill menu
 */

/*
--- Please change this comment as needed when the format of setup.pills changes ---
This is the setup.pills array.
It contains a list of all the possible pills.
A single pill object contains multiple 'properties' which define the pill.

 * name:'example pill' - The name displayed in the medicine drawer screen. Auto-capitalises first word. Capitalise other words if desired.
 * description: 'this pill is green.' - The description displayed when the pill is selected.
 * onTakeMessage: 'You swallow the green pill.' - Text displayed when a pill is taken.
 * warning_label: 'Warning: example pill may cause explosive decompression.' - Warning label displayed in text box. <span class="hpi_notice_label"> is used in several of these.
 * indicators: - Array of indicators. Example: `<span class="hpi_indic_green">+ Control</span>`
 * icon: 'img/misc...blahblah' - file path of the png icon for this pill.
 *
 * autoTake: - Code or statement that determines if this pill is set to auto-take ??? **
 * doseTaken: - Code or statement showing how many doses were taken already. **
 * owned: - Code or statement to determined the number owned. **
 * overdose: - Code or statement to determine overdose. **
 * display_condition: - Code or statement to determine if the pill displays in list. **
 * take_condition: - Code or statement to determine if the take button displays for this pill - can a dose currently be taken. **
 *
 * type: "various" - Type of pill. Pill code uses this to determine what the effects are and where they apply. Example: "bottom" or "breast"
 * subtype: "various" - Action the pill has on bodypart 'type'. Optional for the asylum & harper meds apparently. Example: "reduction" or "growth"
 * shape: "pill" or "galenic" - Helps to properly space the icon.
 * effects: - Array of effects - can be used to issue quick macros for setting results. Example: `<<control 25>>`
*/
setup.pills = [
	{
		name: "bottom reduction",
		description:
			"1정 당 500mg의 프라베롤을 함유하고 있으며, 이 성분은 특히 둔부의 트리글리세리드에 작용하여 천천히 분해시킵니다.",
		onTakeMessage: "당신은 당신의 엉덩이 크기를 줄이기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우 심각한 부작용을 일으킬 수 있습니다. 다른 호르몬 치료와 병행해 투여하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "bottom",
		subtype: "reduction",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/bottomReduction.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["bottom growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["bottom blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "bottom growth",
		description:
			"이 약에 함유되어 있는 성분인 닌트롭테클록신의 개발은, 우리의 가장 뛰어난 약학자인 반셀 박사의 기술력으로 실현되었습니다. 이것은 둔부와 엉덩이의 무게 증강에 작용하는 아주 특별한 호르몬 분비를 증가시킵니다. 1정당 190mg이 함유되어 있습니다. ",
		onTakeMessage: "당신은 당신의 엉덩이 크기를 늘리기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우 심각한 부작용을 일으킬 수 있습니다. 확신이 들지 않을 시에는 의사와 상의하십시오. 다른 호르몬 치료와 병행해 투여하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "bottom",
		subtype: "growth",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/bottomGrowth.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["bottom reduction"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["bottom blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "bottom blocker",
		description:
			"1정 당 200mg의 프라베롤-NG2를 함유하고 있으며, 이 성분은 특히 둔부의 트리글리세리드에 작용하여 천천히 분해시킵니다. 적정 용량을 투여하면 지방의 증가와 분해의 균형을 맞출 수 있습니다.",
		onTakeMessage: "당신은 당신의 엉덩이 크기를 유지하기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"<span class='hpi_notice_label'>주의사항: 이 약의 투약중 어떤 부작용도 보고되어 있지 않습니다. 24시간 내에 1정 이상 투약하는 것은 효과가 없을 것입니다</span>",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "bottom",
		subtype: "blocker",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/bottomBlocker.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 &&
				V.sexStats.pills["pills"]["bottom growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["bottom reduction"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "breast reduction",
		description:
			"1정 당 500mg의 프라베롤 (NG2)를 함유하고 있으며, 이 성분은 특히 유방의 트리글리세리드에 작용하여 천천히 분해시킵니다.",
		onTakeMessage: "당신은 당신의 가슴 크기를 줄이기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우 심각한 부작용을 일으킬 수 있습니다. 확신이 들지 않을 시에는 의사와 상의하십시오. 다른 호르몬 치료와 병행해 투여하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "breast",
		subtype: "reduction",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/breastReduction.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["breast growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["breast blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "breast growth",
		description:
			"호르몬 mRNA 요법 제제입니다. 유방의 성장을 유발하는 특정 호르몬의 자연적인 분비를 위한 5mg의 다이파르딘이 함유되어 있습니다. mRNA가 유방 내의 세포조직들을 증식시키며, 지방을 저장하는 능력을 늘려, 효과적으로 유방 크기를 키우는 새로운 종류의 호르몬을 당신의 세포들이 분비하는데 도움을 줄 것입니다.",
		onTakeMessage: "당신은 당신의 가슴 크기를 늘리기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우 심각한 부작용을 일으킬 수 있습니다. 확신이 들지 않을 시에는 의사와 상의하십시오. 다른 호르몬 치료와 병행해 투여하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "breast",
		subtype: "growth",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/breastGrowth.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["breast reduction"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["breast blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "breast blocker",
		description:
			"선택적 에스트로겐 수용체 조절자 (SERM)가, 유방의 성장에 관여하는 단백질 수용체를 차단합니다; 269mg의 테트라오제알포스티글이 함유되어 있습니다.",
		onTakeMessage: "당신은 당신의 가슴 크기를 유지하기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			'<span class="hpi_notice_label">주의사항: 이 약의 투약중 어떤 부작용도 보고되어 있지 않습니다. 24시간 내에 1정 이상 투약하는 것은 효과가 없을 것입니다</span>',
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "breast",
		subtype: "blocker",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/breastBlocker.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 &&
				V.sexStats.pills["pills"]["breast growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["breast reduction"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "penis reduction",
		description:
			"1정 당 제한된 항-안드로겐 효과가 있는 50mg의 칠리우스토제를 함유하고 있습니다. 추가로 450mg의 피린이 발기 조직의 두께와 양을 감소시킵니다.",
		onTakeMessage: "당신은 당신의 자지 크기를 줄이기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우 심각한 부작용을 일으킬 수 있습니다. 확신이 들지 않을 시에는 의사와 상의하십시오. 다른 호르몬 치료와 병행해 투여하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "penis",
		subtype: "reduction",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/penisReduction.png",
		display_condition() {
			return V.player.penisExist && this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["penis growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["penis blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "penis growth",
		description:
			"1정 당 780mg의 컴닉톤딜, 240mg의 이포폴과 149mg의 운데카노산 테스토스테론을 함유하고 있습니다. 이 두 성분은 안드로겐의 작용을 가능하게 하고 활성화시켜, 남성기의 자연적 성장을 촉진합니다.",
		onTakeMessage: "당신은 당신의 자지 크기를 늘리기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우 심각한 부작용을 일으킬 수 있습니다. 확신이 들지 않을 시에는 의사와 상의하십시오. 다른 호르몬 치료와 병행해 투여하지 마십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "penis",
		subtype: "growth",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/penisGrowth.png",
		display_condition() {
			return V.player.penisExist && this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 &&
				V.sexStats.pills["pills"]["penis reduction"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["penis blocker"].doseTaken === 0
				? 1
				: 0;
		},
		effects: [],
	},
	{
		name: "penis blocker",
		description:
			"370mg의 딘트라임을 함유한 항-안드로겐 호르몬 요법 제제로 신체의 안드로스테론과 테스토스테론을 차단하여, 효과적으로 남성기의 성장을 방해합니다.",
		onTakeMessage: "당신은 당신의 자지 크기를 유지하기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			'<span class="hpi_notice_label">주의사항: 이 약의 투약중 어떤 부작용도 보고되어 있지 않습니다. 24시간 내에 1정 이상 투약하는 것은 효과가 없을 것입니다</span>',
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "penis",
		subtype: "blocker",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/penisBlocker.png",
		display_condition() {
			return V.player.penisExist && this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return (
				this.doseTaken() === 0 &&
				V.sexStats.pills["pills"]["penis growth"].doseTaken === 0 &&
				V.sexStats.pills["pills"]["penis reduction"].doseTaken === 0
			);
		},
		effects: [],
	},
	{
		name: "fertility booster",
		description:
			"1정 당 50mg의 에스트로겐 유사물질인, 클로미펜 시트르산염을 함유하고 있습니다. 이 약은 또한 시상하부에 작용하여 배란을 촉진하는 데 필요한 호르몬을 분비시킵니다. 대부분의 경우 효과적으로 난소에서 난자생성을 유도시킵니다.",
		onTakeMessage: "당신은 당신의 생식력을 늘리기 위해 약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 적정용량을 복용하는 동안, 임신 초기와 비슷한 증상을 포함한 약한 부작용이 일어날 수 있습니다. 일일 최대용량을 초과해 복용할 경우 심각한 합병증을 일으킬 수 있습니다. 확신이 들지 않을 시에는, 의사와 상의하십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					V.sexStats.pills["pills"][this.name].doseTaken + "일 동안" + (V.sexStats.pills["pills"][this.name].doseTaken > 1 ? "" : "") + " 유효"
				);
			} else {
				return "해당사항 없음";
			}
		},
		hpi_take_every_morning() {
			return this.autoTake() ? "필요시에 먹는다" : "그만 먹는다";
		},
		type: "pregnancy",
		subtype: "fertility booster",
		shape: "pill",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/fertility_booster.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 && V.sexStats.pills["pills"]["contraceptive"].doseTaken === 0 ? 1 : 0;
		},
		effects: [],
	},
	{
		name: "contraceptive",
		description:
			"24mg의 에치닐에스트라디올(합성 에스트로겐)과 31mg의 합성 프로게스토겐이 복합된 에스트로프로게스트라피츠가 거의-완벽한 피임 효과를 발휘합니다.",
		onTakeMessage: "당신은 피임약을 먹는다. 당신은 이 약이 광고처럼 효과적이기를 바란다.",
		warning_label:
			"주의사항: 적정용량을 복용하는 동안 약한 부작용이 일어날 수 있습니다. 일일 최대용량을 초과해 복용할 경우 심각한 합병증을 일으킬 수 있습니다. 확신이 들지 않을 시에는, 의사와 상의하십시오.",
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					V.sexStats.pills["pills"][this.name].doseTaken + "일 동안" + (V.sexStats.pills["pills"][this.name].doseTaken > 1 ? "" : "") + " 유효"
				);
			} else {
				return "해당사항 없음";
			}
		},
		hpi_take_every_morning() {
			return this.autoTake() ? "필요시에 먹는다" : "그만 먹는다";
		},
		type: "pregnancy",
		subtype: "contraceptive",
		shape: "galenic",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/contraceptive_pills.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 2 && V.sexStats.pills["pills"]["fertility booster"].doseTaken === 0 ? 1 : 0;
		},
		effects: [],
	},
	{
		name: "Anti-Parasite Cream",
		description:
			"퍼메트린을 함유한 기생충 기피제입니다. 바르는 경우, 새로운 기생충 감염을 막을 수 있지만, 이미 감염된 기생충에는 효과가 없습니다. 바른 후 14일 동안 효과가 지속됩니다.",
		onTakeMessage: "당신은 크림을 당신의 성기 주위에 바른다. 당신은 이것이 기생충이 새끼를 낳는 것을 막아주기를 바란다.",
		warning_label:
			"주의사항: 바를 곳에 손이 닿지 않거나 바른 후 알레르기 반응이 일어나는 경우 의사와 상의하십시오. 크림이 입이나 눈에 들어갔을 경우 즉시 의사에게 가십시오.",
		autoTake() {
			return false;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		hpi_take_pills() {
			return "피부에 바른다";
		},
		hpi_doseTaken() {
			if (V.sexStats.pills["pills"][this.name].doseTaken) {
				return (
					V.sexStats.pills["pills"][this.name].doseTaken + "일 동안" + (V.sexStats.pills["pills"][this.name].doseTaken > 1 ? "" : "") + " 유효"
				);
			} else {
				return "해당사항 없음";
			}
		},
		hpi_take_every_morning() {
			return "";
		},
		type: "parasite",
		subtype: "Anti-Parasite Cream",
		shape: "cream",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/antiParasiteCream.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() === 0 ? 1 : 0;
		},
		effects: [],
	},
	{
		name: "asylum's prescription",
		description: "강력한 항정신병 치료제.",
		onTakeMessage: "당신은 정신병원에서 처방된 약을 먹는다. 당신은 정신이 흐릿해지는 것을 느낀다.",
		warning_label:
			"<span class='hpi_notice_label'>주의사항: 이 약의 임상단계에서 어떤 부작용도 보고되어 있지 않으며, 모든 안전 규정을 통과하였습니다. <span class='hpi_blur unselectable'>이 제약 회사는 거의 나를 끝내버리려고 하는 것 같아. 부작용이 보고되어 있지 않아 ? 누구한테 농담하고 있는 거야 ?!</span></span>",
		indicators: ["<span class='hpi_indic_green'>++ 통제력</span>", "<span class='hpi_indic_blue'>- 성지식</span>"],
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "asylum",
		shape: "galenic",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/strong pills.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 1 && V.asylummedicated === 0 ? 1 : 0;
		},
		effects: [`<<awareness -5>>`, `<<control 25>>`, `<<set $asylummedicated += 1>>`],
	},
	{
		name: "Dr Harper's prescription",
		description: "항정신병 치료제.",
		onTakeMessage: "당신은 하퍼 선생님이 처방해 준 약을 먹는다. 당신은 정신이 흐릿해지는 것을 느낀다.",
		warning_label:
			"주의사항: 일일 최대용량을 초과해 복용할 경우의 부작용은 충분히 연구되어 있지 않습니다. 투여시 주의를 요합니다. <span class='hpi_blur'></span>",
		indicators: ["<span class='hpi_indic_green'>+ 통제력</span>", "<span class='hpi_indic_blue'>- 성지식</span>"],
		autoTake() {
			return V.sexStats.pills["pills"][this.name].autoTake;
		},
		doseTaken() {
			return V.sexStats.pills["pills"][this.name].doseTaken;
		},
		owned() {
			return V.sexStats.pills["pills"][this.name].owned;
		},
		type: "harper",
		shape: "galenic",
		overdose() {
			return V.sexStats.pills["pills"][this.name].overdose;
		},
		icon: "img/misc/icon/pills.png",
		display_condition() {
			return this.owned() > 0 ? 1 : 0;
		},
		take_condition() {
			return this.doseTaken() < 1 && V.medicated === 0 ? 1 : 0;
		},
		effects: [`<<awareness -1>>`, `<<control 10>>`, `<<set $medicated += 1>>`],
	},
];

function generateHomePillsInventory() {
	$(function () {
		T.disableGridClick = false;
		for (const item of setup.pills) {
			if (item.display_condition() === 1) window.addElementToGrid(item);
		}
	});
}
window.generateHomePillsInventory = generateHomePillsInventory;

function addElementToGrid(item) {
	$(function () {
		const hpiGridContainer = document.getElementById("homeMainPillContainer");

		const itemName = item.name[0].toUpperCase() + item.name.slice(1); Wikifier.wikifyEval('<<trPill "' + item.name + '">>' ); const item_koname = T.trResult;
		hpiGridContainer.innerHTML =
			hpiGridContainer.innerHTML +
			`
			<div class="hpi_item">
				<div class="hpi_icon"><img class="icon" src="` +
			item.icon +
			`"</img></div>
				<div class="hpi_name" id="hpi_name_` +
			itemName +
			`" >` +
			item_koname +
			(item.autoTake() === true ? `<span class="hpi_auto_label"> [자동]</span>` : "") +
			`</div>
				<div class="hpi_count" onmouseenter="T.disableGridClick = true" onmouseleave="T.disableGridClick = false">` +
			item.owned() +
			`</div>
			</div>
			`;
		hpiGridContainer.lastElementChild.setAttribute("onclick", "window.onHomePillItemClick(" + "`" + item.name + "`" + ")");
	});
}
window.addElementToGrid = addElementToGrid;

function onHomePillItemClick(itemName) {
	if (!T.disableGridClick) {
		document.getElementById("homeDescPillContainer").style.display = "grid";
		for (const item of setup.pills) {
			if (item.name === itemName) {
				document.getElementById("hpi_desc").outerHTML =
					`<div id="hpi_desc">` +
					item.description +
					`
					<div class="hpi_warning_label">` +
					item.warning_label +
					`</div>
					<div id="hpi_desc_action">
						<a id="hpi_take_pills" onclick="window.onTakeClick(` +
					"`" +
					item.name +
					"`," +
					"`" +
					item.type +
					"`" +
					`)" class="hpi_take_pills">약을 먹는다</a>
						<a id="hpi_take_every_morning" onclick="window.onAutoTakeClick(` +
					"`" +
					item.name +
					"`," +
					"`" +
					item.type +
					"`" +
					`)">매일 아침 먹는다</a>
					</div>
				</div>
				`;
				window.initPillContextButtons(item);
				document.getElementById("hpi_desc_img").innerHTML =
					`<img` +
					(item.shape === "galenic" ? ` style="margin-left: 17%;"` : "") +
					` src="` +
					item.icon +
					`"></img>` +
					`<div id="hpi_indicator" class="hpi_indicator"></div>`;
				window.addIndicators(item);
			}
		}
	}
}
window.onHomePillItemClick = onHomePillItemClick;

function addIndicators(item) {
	// Indicators are the "++Control" and "+Awareness" etc. We add them under the pill icon.
	if (item.indicators != null && item.indicators.length > 0 && V.statdisable !== "t") {
		for (const indicator of item.indicators) document.getElementById("hpi_indicator").innerHTML += indicator;
	}
}
window.addIndicators = addIndicators;

function initPillContextButtons(item) {
	// create button to "Take everyone morning" / "Stop taking them" (every morning)
	if (item.hpi_take_every_morning) {
		document.getElementById("hpi_take_every_morning").innerHTML = item.hpi_take_every_morning();
	} else {
		document.getElementById("hpi_take_every_morning").innerHTML = item.autoTake() ? "매일 먹지 않는다" : "매일 아침 먹는다";
	}

	// special case if pill type is "asylum" or "harper"
	if (item.type === "asylum" || item.type === "harper") {
		document.getElementById("hpi_take_every_morning").className = "hidden"; // prevent 'Take every Morning' option to be displayed for those type of pills
		document.getElementById("hpi_take_pills").classList.add("hpi_take_me_single"); // readapt css since there's only one button now
	}
	//  Add 'Take pill' button
	document.getElementById("hpi_take_pills").innerHTML = item.hpi_take_pills ? item.hpi_take_pills() : "약을 먹는다";

	// If the button doesnt exist, create it. If it exists, display the right dose Taken for that pill
	if (document.getElementById("hpi_doseTaken") != null) {
		if (item.hpi_doseTaken) {
			document.getElementById("hpi_doseTaken").outerHTML =
				"<span id='hpi_doseTaken' style='font-size: 0.88em;color: #979797;'> [" + item.hpi_doseTaken() + "]</span>";
		} else {
			// todo: replace style with a proper css class
			document.getElementById("hpi_doseTaken").outerHTML =
				"<span id='hpi_doseTaken' style='font-size: 0.88em;color: #979797;'> [" + item.doseTaken() + " 알 먹었다]</span>";
		}
		// Display today taken doses for specific pill
	} else {
		if (item.hpi_doseTaken) {
			document.getElementById("hpi_take_pills").outerHTML +=
				`<span id="hpi_doseTaken" style="font-size: 0.88em;color: #979797;"> [` + item.hpi_doseTaken() + `]</span>`; // Display today taken doses for specific pill
		} else {
			document.getElementById("hpi_take_pills").outerHTML +=
				`<span id="hpi_doseTaken" style="font-size: 0.88em;color: #979797;"> [` + item.doseTaken() + ` 알 먹었다]</span>`; // Display today taken doses for specific pill
		}
	}
	// Check if the player meets the criteria to take the pill.
	if (item.take_condition() === 0) {
		document.getElementById("hpi_take_pills").classList.add("hpi_greyed_out"); // grey the "Take Pill" button out
		document.getElementById("hpi_take_pills").onclick = ""; // disable "Take Pill" onclick event.
	}
}
window.initPillContextButtons = initPillContextButtons;

function setLastTaken(type, subtype, fullname = null) {
	if (fullname != null) {
		for (const p of setup.pills) {
			if (p.name === fullname) {
				type = p.type;
				subtype = p.subtype;
			}
		}
	}
	V.sexStats.pills.lastTaken[type] = subtype;
}
window.setLastTaken = setLastTaken;

function redetermineMostTaken(type, subtype, fullname = null) {
	const result = { blocker: 0, growth: 0, reduction: 0 };
	if (fullname != null) {
		for (const p of setup.pills) {
			if (p.name === fullname) {
				type = p.type;
				subtype = p.subtype;
			}
		}
	}
	if (!["breast", "bottom", "penis"].includes(type)) return;
	for (const pill of setup.pills) {
		if (pill.type === type && ["blocker", "growth", "reduction"].includes(pill.subtype)) {
			result[pill.subtype] = pill.doseTaken();
		}
	}
	const ret = result.growth - result.reduction;
	if (ret === 0 && (result.growth > 0 || result.reduction > 0)) {
		// We enter here when growth and reduction pills neutralised each others
		if (result.blocker > 0) return (V.sexStats.pills.mostTaken[type] = "blocker");
		else return (V.sexStats.pills.mostTaken[type] = ["growth", "reduction"].random());
	} else if (ret === 0 && result.blocker > 0)
		// we enter here when player didn't take any growth/blocker but took blockers
		return (V.sexStats.pills.mostTaken[type] = "blocker");
	else if (ret !== 0) {
		// we enter here when there's unbalance between growth/reduction
		if (ret < 0)
			// if reduction won
			return ret + result.blocker >= 0 ? (V.sexStats.pills.mostTaken[type] = "blocker") : (V.sexStats.pills.mostTaken[type] = "reduction");
		// determine if blocker win
		else if (ret > 0)
			// if growth won
			return ret - result.blocker <= 0 ? (V.sexStats.pills.mostTaken[type] = "blocker") : (V.sexStats.pills.mostTaken[type] = "growth"); // determine if blocker win
	}
}
window.redetermineMostTaken = redetermineMostTaken;

function onTakeClick(itemName) {
	V.sexStats.pills["pills"][itemName].owned -= 1;

	switch (itemName) {
		case "Anti-Parasite Cream":
			V.sexStats.pills["pills"][itemName].doseTaken += 14;
			break;
		default:
			V.sexStats.pills["pills"][itemName].doseTaken += 1;
			break; // Stat for specific pill consumptionbreak;
	}

	V.pillsConsumed = typeof V.pillsConsumed === "undefined" || V.pillsConsumed == null ? 1 : V.pillsConsumed + 1; // Stat for total pills consumption
	for (const item of setup.pills) {
		if (item.name === itemName) {
			for (const widget of item.effects) // run the widgets associated with a pill
				Wikifier.wikifyEval(typeof widget === "function" ? widget() : widget);
			V.sexStats.pills.lastTaken[item.type] = item.subtype; // keep track of the category of pill we last took
			V.sexStats.pills.mostTaken[item.type] = window.redetermineMostTaken(item.type, item.subtype);
			if (item.doseTaken() > 1 && item.name.contains("blocker") === false) {
				switch (item.type) {
					case "parasite":
						break;
					case "pregnancy":
						Engine.play("PillCollectionSecondDosePregnancy");
						return;
					default:
						Engine.play("PillCollectionSecondDose");
						return;
				}
			}
			V.lastPillTakenDescription = item.onTakeMessage;
		}
	}
	Engine.play("Take Pill From Medicine Drawer");
}
window.onTakeClick = onTakeClick;

function onAutoTakeClick(itemName, itemType) {
	for (const item in setup.pills) {
		if (setup.pills[item].name === itemName) {
			V.sexStats.pills["pills"][itemName].autoTake = !V.sexStats.pills["pills"][itemName].autoTake; // toggle auto take
			window.initPillContextButtons(setup.pills[item]); // change "Take every morning" button to "Stop taking them"
		} else if (["breast", "penis", "bottom", "pregnancy"].includes(itemType) && setup.pills[item].type === itemType)
			V.sexStats.pills["pills"][setup.pills[item].name].autoTake = false; // disable auto takes for other similar pills(bottom/penis/breast etc)
	}
	window.syncAutoTakeDisplayedState();
}
window.onAutoTakeClick = onAutoTakeClick;

function syncAutoTakeDisplayedState() {
	// Add or remove [Auto] tag from pill names in the pills menu
	for (const item of setup.pills) {
		const capitalisedName = item.name[0].toUpperCase() + item.name.slice(1); Wikifier.wikifyEval('<<trPill "' + item.name + '">>' ); const item_koname = T.trResult;
		if (document.getElementById("hpi_name_" + capitalisedName) != null) {
			document.getElementById("hpi_name_" + capitalisedName).innerHTML = item_koname;
			document.getElementById("hpi_name_" + capitalisedName).innerHTML += item.autoTake() === true ? "<span class='hpi_auto_label'> [자동]</span>" : "";
		}
	}
}
window.syncAutoTakeDisplayedState = syncAutoTakeDisplayedState;

function onSecondDoseTakenSetVars() {
	// If player take two doses of anything but blocker/pregnancy/harper/asylum pills, determine the risk stat and
	let doseTaken = { bottom: 0, penis: 0, breast: 0 };

	T.risk = 0;
	T.pillAmountOfCategoriesUsed = 0;
	for (const item of setup.pills) {
		// determine how many pills of each have been taken.
		if (["bottom", "penis", "breast"].contains(item.type)) doseTaken[item.type] += item.doseTaken();
	}
	const sumValues = obj => Object.values(obj).reduce((a, b) => a + b); // count every doses
	let i = -1;
	const doseTakenSum = sumValues(doseTaken); // store the count in this variable
	while (++i < doseTakenSum)
		// for each dose count, increase the overall risk.
		T.risk += random(3, 10); // For each dose found, add 3-10 risk points.
	doseTaken = [
		["bottom", doseTaken["bottom"]],
		["penis", doseTaken["penis"]],
		["breast", doseTaken["breast"]],
	]; // Changed object to array as it's easier to sort.
	for (const array of doseTaken) {
		if (array[1] > 0) T.pillAmountOfCategoriesUsed += 1; // How many different categories of pills we took ?
	}
	i = -1;
	while (++i < doseTaken.length - 1) {
		// sort categories that got the most doses
		if (doseTaken[i][1] < doseTaken[i + 1][1]) {
			const tmp = doseTaken[i];

			doseTaken[i] = doseTaken[i + 1];
			doseTaken[i + 1] = tmp;
			i = -1;
		}
	}
	i = doseTaken[0][1] > doseTaken[1][1] ? 1 : doseTaken[0][1] === doseTaken[1][1] ? 2 : doseTaken[0][1] === doseTaken[2][1] ? 3 : 1; // determine how many have same value
	const chosen = random(0, i - 1);
	V.pillCat = doseTaken[chosen][0]; // select random category among the 1st ones
	T.secondaryPill = chosen > 0 ? doseTaken[chosen - 1][0] : doseTaken[chosen + 1][0]; // select second category
}
window.onSecondDoseTakenSetVars = onSecondDoseTakenSetVars;

function backCompPillsInventory() {
	/* Return immediately if $sexStats doesn't exist. */
	if (typeof V.sexStats === "undefined") return;
	const oPills = V.sexStats.pills;
	const pills = {};
	if (typeof oPills === "object") {
		/* If our $sexStats.pills is an object and has this property, it is ready for production. */
		/* Man on the internet said this is right */
		if (typeof oPills.mostTaken === "object") return;
		try {
			pillsObjectRepair(oPills, pills);
		} catch (error) {
			Errors.report("Compatibility patch for pills object failed: " + error, { oPills, pills });
		}
	}
	Object.assign(pills, {
		"bottom reduction": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"bottom growth": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"bottom blocker": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"breast reduction": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"breast growth": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"breast blocker": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"penis reduction": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"penis growth": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"penis blocker": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"anti-parasite": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"fertility booster": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		contraceptive: { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"asylum's prescription": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"Dr Harper's prescription": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
		"Anti-Parasite Cream": { autoTake: false, doseTaken: 0, owned: 0, overdose: 0 },
	});
	if (typeof oPills === "undefined") {
		/* If our $sexStats.pills was empty, simply set the object in preparation to assign. */
		V.sexStats.pills = {};
	}
	Object.assign(V.sexStats.pills, {
		boughtOnce: pills.boughtOnce === true,
		lastTaken: { bottom: "", breast: "", penis: "", pregnancy: "" },
		mostTaken: { bottom: "", breast: "", penis: "", pregnancy: "" },
		pills,
	});
}
window.backCompPillsInventory = backCompPillsInventory;

function pillsObjectRepair(oPills, pills) {
	/* if the variable already exist, and is not of the new version(new version has "mostTaken" property that's why we check it),
	then we try to  port the old one to the new one */
	if (typeof oPills.bottom === "object") {
		Object.assign(pills, {
			"bottom reduction": { autoTake: oPills.bottom.autoTake === "reduction", owned: oPills.bottom.owned.reduction },
			"bottom growth": { autoTake: oPills.bottom.autoTake === "growth", owned: oPills.bottom.owned.growth },
			"bottom blocker": { autoTake: oPills.bottom.autoTake === "blocker", owned: oPills.bottom.owned.blocker },
		});
		delete oPills.bottom;
	}
	if (typeof oPills.breast === "object") {
		Object.assign(pills, {
			"breast reduction": { autoTake: oPills.breast.autoTake === "reduction", owned: oPills.breast.owned.reduction },
			"breast growth": { autoTake: oPills.breast.autoTake === "growth", owned: oPills.breast.owned.growth },
			"breast blocker": { autoTake: oPills.breast.autoTake === "blocker", owned: oPills.breast.owned.blocker },
		});
		delete oPills.breast;
	}
	if (typeof oPills.penis === "object") {
		Object.assign(pills, {
			"penis reduction": { autoTake: oPills.penis.autoTake === "reduction", owned: oPills.penis.owned.reduction },
			"penis growth": { autoTake: oPills.penis.autoTake === "growth", owned: oPills.penis.owned.growth },
			"penis blocker": { autoTake: oPills.penis.autoTake === "blocker", owned: oPills.penis.owned.blocker },
		});
		delete oPills.penis;
	}
	if (typeof V.asylumpills === "number") {
		Object.assign(pills, {
			"asylum's prescription": { owned: Number.isInteger(V.asylumpills) ? V.asylumpills : 0 },
		});
		delete V.asylumpills;
	}
	if (typeof V.pills === "number") {
		Object.assign(pills, {
			"Dr Harper's prescription": { owned: Number.isInteger(V.pills) ? V.pills : 0 },
		});
		delete V.pills;
	}
}

function determineAutoTakePill(category) {
	T.autoTakeDetermined = null;
	for (const pill of setup.pills) {
		if (pill.type === category && pill.autoTake() === true) {
			T.autoTakeDetermined = pill.name;
			return;
		}
	}
}
window.determineAutoTakePill = determineAutoTakePill;

function resetAllDoseTaken() {
	for (const pill in V.sexStats.pills["pills"]) {
		switch (pill) {
			case "Anti-Parasite Cream":
			case "fertility booster":
			case "contraceptive":
				if (V.sexStats.pills["pills"][pill].doseTaken > 0) {
					V.sexStats.pills["pills"][pill].doseTaken--;
				}
				break;
			default:
				V.sexStats.pills["pills"][pill].doseTaken = 0;
				break;
		}
	}
}
window.resetAllDoseTaken = resetAllDoseTaken;

function resetLastTaken() {
	V.sexStats.pills.lastTaken = { bottom: "", breast: "", penis: "", pregnancy: "" };
}
window.resetLastTaken = resetLastTaken;

function resetMostTaken() {
	V.sexStats.pills.mostTaken = { bottom: "", breast: "", penis: "", pregnancy: "" };
}
window.resetMostTaken = resetMostTaken;

function getAllPills() {
	for (const item of Object.keys(V.sexStats.pills.pills)) V.sexStats.pills.pills[item].owned = 14;
}
window.getAllPills = getAllPills;
