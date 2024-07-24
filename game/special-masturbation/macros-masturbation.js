function getToyName(index, capitalise = false, post = undefined, sep = undefined) {
	const toy = T.playerToys[index]; if (typeof (capitalise) === "string") {sep = post; post = capitalise; capitalise = false;}
	if (toy == null) {
		let msg = "Could not find the player's toy name.";
		if (index === "none") msg = "An attempt to access a toy with the wrong hand was made.";
		Errors.report(msg, { index });
		return "장난감 오리";
	}
	const name = capitalise ? toy.name : toy.name;
	return toy.colour ? trColour(toy.colour) + " " + sextoyPost(name, post, sep) : sextoyPost(name, post, sep);
}
window.getToyName = getToyName;
DefineMacroS("toyName", getToyName);

// May require updating when new masturbation scenes are added
function skipToOrgasm(modifiers = "") {
	if (T.noMasturbationOutput) return;
	const startArousal = V.arousal;
	let count = 0;
	T.noMasturbationOutput = true;
	do {
		count++;
		if (T.corruptionMasturbation) masturbationSlimeControl();
		masturbationEffects();
		masturbationActions();
		if (modifiers.includes("timer")) V.timer -= 1;

		// Other scene modifiers
		if (modifiers) {
			if (modifiers.includes("arousal50")) wikifier("arousal", 50, "genitals");
			if (modifiers.includes("arousal100")) wikifier("arousal", 100, "genitals");
			if (modifiers.includes("robinWatching")) masturbationRobinWatching();
			if (modifiers.includes("edenPush") && masturbationEdenPush()) break;
			if (modifiers.includes("whitneySeat")) wikifier("npcincr", "Whitney", "lust", 1);
			if (modifiers.includes("robinSeat")) wikifier("npcincr", "Robin", "lust", 1);
			if (modifiers.includes("kylarSeat") && V.orgasmdown >= 1) wikifier("npcincr", "Kylar", "lust", 5);
			if (modifiers.includes("officePhase")) V.masturbationPhase++;
			if (modifiers.includes("detentionPaddle")) masturbationDetentionPaddle();
			if (modifiers.includes("privateShow")) masturbationPrivateShow();
			if (modifiers.includes("studentAudience")) masturbationAudienceSkip("student");
			if (modifiers.includes("audience")) masturbationAudienceSkip();
		}
	} while (count < 100 && (V.arousal > startArousal || count <= 6) && V.arousal < V.arousalmax && (V.timer > 0 || !modifiers.includes("timer")));
}
DefineMacroS("skipToOrgasm", skipToOrgasm);

function masturbationRobinWatching() {
	if (V.daily.robin.masturbation) {
		if (V.timer > 0) V.timer -= 1;
	} else if (
		C.npc.Robin.init === 1 &&
		!V.daily.robin.masturbation &&
		random(0, 100) >= 91 &&
		T.robin_location === "orphanage" &&
		T.robin.lust >= 2 &&
		T.robin.love >= 50 &&
		T.robin.trauma < 20
	) {
		V.daily.robin.masturbation = true;
		if (V.robinromance && T.robin.lust >= 30 && T.robin.love >= 80 && V.daily.test) {
			V.timer = 20;
			V.robinWatchingMasturbation = 1;
			V.robinWatchingMasturbationCount = (V.robinWatchingMasturbationCount || 0) + 1;
		} else if (V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1) {
			wikifier("arousal", 500);
			wikifier("npcincr", "Robin", "lust", 2);
		} else {
			wikifier("arousal", 200);
			wikifier("npcincr", "Robin", "lust", 1);
		}
	}
}

function masturbationEdenPush() {
	if (!V.edenpush && V.danger >= 9900 - V.allure && (between(Time.hour, 6, 11) || Time.hour > 14)) {
		V.edenpush = 2;
		return true;
	}
}

function masturbationDetentionPaddle() {
	if (V.orgasmdown >= 1) {
		// Do nothing
	} else if (random(1, 2) === 1) {
		wikifier("arousal", 100, "genitals");
	} else {
		wikifier("arousal", 100);
	}
}

function masturbationPrivateShow() {
	if (random(1, 5) === 1) {
		wikifier("arousal", 100, "genitals");
		wikifier("fameexhibitionism", 2, "pic");
	} else {
		wikifier("arousal", 100);
	}
}

function masturbationAudienceCalc() {
	const rng = random(10, 500);
	// eslint-disable-next-line prettier/prettier
	const result = rng < ((V.masturbationAudience * 5) + (V.orgasmcurrent * 10));
	return result;
}
window.masturbationAudienceCalc = masturbationAudienceCalc;

function masturbationAudienceIncrement(type) {
	V.masturbationAudience++;
	const generateType = type === "student" ? "generatey" : "generate";
	if (V.masturbationAudience <= 6) wikifier(generateType + V.masturbationAudience);
}
DefineMacro("masturbationAudienceIncrement", masturbationAudienceIncrement);

function masturbationAudienceSkip(type) {
	if (masturbationAudienceCalc()) masturbationAudienceIncrement(type);
}
