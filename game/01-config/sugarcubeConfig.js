/* eslint-disable prefer-const */
Config.history.controls = false;
Config.saves.slots = 9;
Config.history.maxStates = 5;

/* LinkNumberify and images will enable or disable the feature completely */
/* debug will enable or disable the feature only for new games */
/* sneaky will enable the Sneaky notice banner on the opening screen and save display */
/* versionName will be displayed in the top right of the screen, leave as "" to not display anything */
const StartConfig = {
	debug: false,
	enableImages: true,
	enableLinkNumberify: true,
	version: "0.5.1.3",
	versionName: `"Head in the Clouds" edition`,
	sneaky: false,
	socialMediaEnabled: true,
	sourceLinkEnabled: false,
};
window.StartConfig = StartConfig;

State.prng.init();

window.versionUpdateCheck = true;
window.onLoadUpdateCheck = false;

let pageLoading = false;

Config.saves.isAllowed = () => {
	if (tags().includes("nosave") || V.replayScene) return false;
	return true;
};

idb.footerHTML = `<a target="_blank" class="link-external" href="https://subscribestar.adult/vrelnir" tabindex="0">Degrees of Lewdity를 지지</a>해 주시는 모든 분들께 특별히 감사드립니다`;

function onLoad(save) {
	$.event.trigger(":onloadsave", { save });

	// some flags for version update. ideally, all updating should be done here in onLoad, but we don't live in an ideal world
	pageLoading = true;
	window.onLoadUpdateCheck = true;

	// clear errors from previous save and reset imageError cache so (possibly) save-specific errors might be logged again
	Errors.Reporter.hide(true);
	Renderer.ImageErrors = {};

	// decompression should be the FIRST save modification
	DoLSave.decompressIfNeeded(save);

	// ironman is not currently supported with idb
	if (save.state.history[save.state.index].variables.ironmanmode) idb.active = false;

	// cache current date before assigning it to every frame in history
	const date = new Date();
	save.state.history.forEach(h => {
		if (h.prng && Array.isArray(h.prng.S)) {
			h.prng.S.forEach((i, index, array) => {
				if (i < 0 || i > 255) array[index] %= 256;
			});
		}
		const details = h.variables.saveDetails;
		if (details) {
			if (!details.playTime) details.playTime = 0;
			if (!details.loadCount) details.loadCount = 0;
			details.loadTime = date;
			details.loadCount++;
		}
	});
}
window.onLoad = onLoad;
Save.onLoad.add(onLoad);

/**
 * increment saves counter and update relevant statistics
 *
 * @param {object} storyVars State.variables or similar object to modify
 * @param {"slot"|"autosave"|"disk"|"serialize"} type save type
 * @param {Date} date cached date object so we don't have to run `new Date()` hundreds of times
 */
function incSavesCount(storyVars = V, type, date) {
	const details = storyVars.saveDetails;
	if (!details) return; // really ancient save that somehow didn't get updated
	switch (type) {
		case "slot":
			details.slot.count++;
			break;
		case "autosave":
			details.auto.count++;
			break;
		case "disk":
			details.exported.days = Time.days;
			details.exported.count++;
			break;
		case "serialize":
			details.exported.count++;
			break;
	}
	if (date) details.playTime += date - details.loadTime;
}

function onSave(save, details) {
	// * update feats * //
	Wikifier.wikifyEval("<<updateFeats>>");

	// * update $saveDetails wherever possible * //
	const type = details.type;
	const date = save.date;
	// start with active vars, so we can view statistics
	incSavesCount(V, type, date);
	// then saved history, so moving back and forth doesn't reset it
	State.history.forEach(h => incSavesCount(h.variables, type, date));
	// then actual save vars
	save.state.history.forEach(sh => incSavesCount(sh.variables, type, date));
	// and finally, session data, so it persists even after f5
	const session = State.getSessionState();
	if (session != null) {
		session.history.forEach(s => incSavesCount(s.variables, type, date));
		State.setSessionState(session);
	}

	// Save time and weather to localStorage
	localStorage.setItem("weather", Packer.packWeatherData());
	localStorage.setItem("time", Time.date.timeStamp.toString(36));

	// * legacy code for old saves system * //
	if (!(window.idb && window.idb.active)) {
		// eslint-disable-next-line no-undef
		prepareSaveDetails(); // defined in save.js

		// compression should be the LAST save modification
		DoLSave.compressIfNeeded(save);
	}
}
window.onSave = onSave;
Save.onSave.add(onSave);

/* convert version string to numeric value */
const tmpver = StartConfig.version.replace(/[^0-9.]+/g, "").split(".");
window.StartConfig.version_numeric = tmpver[0] * 1000000 + tmpver[1] * 10000 + tmpver[2] * 100 + tmpver[3] * 1;

Config.saves.autosave = "autosave";

importStyles("style.css")
	.then(function () {
		console.log("External Style Sheet Active");
	})
	.catch(function () {
		console.log("External Style Sheet Missing");
	});

console.log("Game Version:", StartConfig.version);

l10nStrings.errorTitle = StartConfig.version + " Error";

// delete parser that adds unneeded line breaks -ng
Wikifier.Parser.delete("lineBreak");
Wikifier.Parser.delete("emdash");

// Runs before a passage load, returning a string redirects to the new passage name.
Config.navigation.override = function (dest) {
	const checkPassages = dest => {
		const lastVersion = DoLSave.Utils.parseVer(V.saveVersions.last());
		const currVersion = DoLSave.Utils.parseVer(StartConfig.version);
		if (lastVersion > currVersion) {
			V.bypassHeader = true;
			return "Downgrade Waiting Room";
		}
		if (dest.includes("Playground")) {
			return dest.replace("Playground", "Courtyard");
			/* Try not to include "Playground" in any passage names after this. */
		}
		switch (dest) {
			case "Downgrade Waiting Room":
				return V.passage;

			case "Pharmacy Select Custom Lenses":
				return "Pharmacy Ask Custom Lenses";

			case "Forest Shop Outfit":
			case "Forest Shop Upper":
			case "Forest Shop Lower":
			case "Forest Shop Under Outfit":
			case "Forest Shop Under Upper":
			case "Forest Shop Under Lower":
			case "Forest Shop Head":
			case "Forest Shop Face":
			case "Forest Shop Neck":
			case "Forest Shop Legs":
			case "Forest Shop Feet":
				return "Forest Shop";

			case "Cafe Fruit Salad":
			case "Cafe Autumn Ale":
			case "Cafe Summer Ale":
			case "Cafe Spring Ale":
			case "Cafe Winter Ale":
				return "Cafe Eat";

			case "Over Outfit Shop":
			case "Outfit Shop":
			case "Top Shop":
			case "Bottom Shop":
			case "Under Outfit Shop":
			case "Under Top Shop":
			case "Under Bottom Shop":
			case "Head Shop":
			case "Face Shop":
			case "Neck Shop":
			case "Hands Shop":
			case "Legs Shop":
			case "Shoe Shop":
				return "Clothing Shop";

			case "Danube Oak":
				return "Danube Challenge";

			case "Danube Oak Strip":
				return "Danube Challenge";

			case "Penis Inspection Flaunt Crossdress":
				return "Penis Inspection Flaunt No Penis";

			case "Pussy Inspection2":
				return "Pussy Inspection 2";

			case "Pussy Inspection Penis":
				return "Pussy Inspection Flaunt No Pussy";

			case "Forest Plant Sex No Tentacles":
				return "Forest Plant Sex";

			case "Forest Plant Sex No Tentacles Finish":
				return "Forest Plant Sex Finish";

			case "Forest Plant Passout No Tentacles":
				return "Forest";

			case "Moor Plant Sex No Tentacles":
				return "Moor Plant Sex";

			case "Moor Plant Sex No Tentacles Finish":
				return "Moor Plant Sex Finish";

			case "Underground Plant Molestation No Tentacles":
				return "Underground Plant Molestation";

			case "Underground Plant Molestation No Tentacles Finish":
				return "Underground Plant Molestation Finish";

			case "Evens Swimming Endure":
				return "Events Swimming Swim Endure";

			case "Domus House Work":
				return "Domus Gutters Intro";

			case "Trash Boys":
				return "Trash Compare";

			case "Trash Boys Spy":
				return "Trash Compare Spy";

			case "Trash Boys Greet":
				return "Trash Compare Greet";

			case "Trash Boys Refuse":
				return "Trash Compare Refuse";

			case "Trash Boys Compare":
				return "Trash Compare Others";

			case "Trash Boys Back Out":
				return "Trash Compare Back Out";

			case "Trash Boys Show":
				return "Trash Compare Show";

			case "Trash Boys Offer Secret":
				return "Trash Compare Penis Secret";

			case "Trash Boys Wrap It Up":
				return "Trash Compare Wrap It Up";

			case "Trash Boys Crossdressing Refuse":
				return "Trash Compare Breast Refuse";

			case "Trash Boys Crossdressing Show All":
				return "Trash Compare Breast Show All";

			case "Trash Boys Forced Strip":
				return "Trash Compare Forced Strip";

			case "Trash Boys Combat Win":
				return "Trash Compare Combat Win";

			case "Trash Boys Combat Loss":
				return "Trash Compare Combat Loss";

			case "Lake Underwater Tentacles Finish Figure":
				return "Lake Underwater Tentacles Finish";

			case "Sextoys Inventory Home":
			case "Sextoys Inventory Brothel":
			case "Sextoys Inventory Cottage":
			case "Sextoys Inventory Cabin":
				return "Sextoys Inventory";

			case "Kylar Abduction Angry":
			case "Kylar Abduction Apologise":
			case "Kylar Abduction Silent":
			case "Kylar Abduction Eden":
			case "Kylar Abduction Robin":
			case "Kylar Abduction Whitney":
			case "Kylar Abduction Sydney":
			case "Kylar Abduction Wolf":
			case "Kylar Abduction Hawk":
				return "Kylar Abduction Event Response";

			case "Robin's Chocolate Help":
				return "Robin Chocolate Help";
			case "Robin Chocolate Cover 2":
				return "Robin Chocolate Cover";

			case "School Boy's Escape":
			case "School Girl's Escape":
				return "School Changing Room Escape";

			case "School Boy's Flirt":
			case "School Girl's Flirt":
				return "School Changing Room Flirt";

			case "School Boy's Apologise":
			case "School Girl's Apologise":
				return "School Changing Room Apologise";

			case "School Boy's Strip":
			case "School Girl's Strip":
				return "School Changing Room Strip";

			case "School Boy's Refuse Molestation":
			case "School Girl's Refuse Molestation":
				return "School Changing Room Refuse Molestation";

			case "School Boy's Seduce":
			case "School Girl's Seduce":
				return "School Changing Room Seduce";

			case "School Boy's Seduce Sex":
			case "School Girl's Seduce Sex":
				return "School Changing Room Seduce Sex";

			case "School Boy's Seduce Sex Finish":
			case "School Girl's Seduce Sex Finish":
				return "School Changing Room Seduce Sex Finish";

			case "School Boy's Knees":
			case "School Girl's Knees":
				return "School Changing Room Knees";

			case "School Boy's Knees 2":
			case "School Girl's Knees 2":
				return "School Changing Room Knees 2";

			case "School Boy's Bend":
			case "School Girl's Bend":
				return "School Changing Room Bend";

			case "School Boy's Naked Refuse":
			case "School Girl's Naked Refuse":
				return "School Changing Room Naked Refuse";

			case "School Boy's Crossdress Seduce":
			case "School Girl's Crossdress Seduce":
				return "School Changing Room Crossdress Seduce";

			case "School Boy's Crossdress Sex":
			case "School Girl's Crossdress Sex":
				return "School Changing Room Crossdress Sex";

			case "School Boy's Crossdress Sex Finish":
			case "School Girl's Crossdress Sex Finish":
				return "School Changing Room Crossdress Sex Finish";

			case "School Boy's Crossdress Honest":
			case "School Girl's Crossdress Honest":
				return "School Changing Room Crossdress Honest";

			case "School Boy's Crossdress Forced":
			case "School Girl's Crossdress Forced":
				return "School Changing Room Crossdress Forced";

			case "School Boy's Herm Explain":
			case "School Girl's Herm Explain":
				return "School Changing Room Herm Explain";

			case "School Boy's Watch":
			case "School Girl's Watch":
				return "School Changing Room Watch";

			case "School Boy's Exhibitionism":
			case "School Girl's Exhibitionism":
				return "School Changing Room Exhibitionism";

			case "School Boy's Flaunt":
			case "School Girl's Flaunt":
				return "School Changing Room Flaunt";

			case "School Boy's Goad":
			case "School Girl's Goad":
				return "School Changing Room Goad";

			case "School Boy's Goad Finish":
			case "School Girl's Goad Finish":
				return "School Changing Room Goad Finish";

			case "School Boy's Run":
			case "School Girl's Run":
				return "School Changing Room Run";

			case "School Boy's Masturbation":
			case "School Girl's Masturbation":
				return "School Changing Room Masturbation";

			case "School Boy's Masturbation Finish":
			case "School Girl's Masturbation Finish":
				return "School Changing Room Masturbation Finish";

			case "School Boy's Masturbation Caught":
			case "School Girl's Masturbation Caught":
				return "School Changing Room Masturbation Caught";

			case "School Boy Locker":
			case "School Girl Locker":
				return "School Changing Room Locker";

			case "School Boy Wardrobe":
			case "School Girl Wardrobe":
				return "School Pool Wardrobe";

			case "Robin Forest Vampire":
			case "Robin Forest Vampire Tease":
			case "Robin Forest Vampire Compliment":
			case "Robin Forest Vampire Buy":
			case "Robin Forest Witch":
			case "Robin Forest Witch Tease":
			case "Robin Forest Witch Compliment":
			case "Robin Forest Witch Buy":
				return "Robin Forest Costume Intro"; /* Send the player back to the start, they won't mind. */

			case "Trash Compare Breasts Refuse":
			case "Trash Compare Penis Refuse":
				return "Trash Compare Show Refuse";
			case "Trash Compare Penis Secret":
			case "Trash Compare Breast Secret":
				return "Trash Compare Secret";
			case "Garden Voyeurism Masturbate End":
				return "Garden Voyeurism Masturbate Finish";
			case "Danube Challenge Masturbate End":
				return "Danube Challenge Masturbate Finish";
			case "Chalets Work One Rape":
				return "Chalets Work One Sex";
			case "Chalets Work One Rape Finish":
				return "Chalets Work One Sex Finish";

			case "Whitney Bully Parasite Event Submit":
			case "Whitney Bully Parasite Event Escape Attempt":
				return "Bully Parasite";

			case "Whitney Bully Parasite Event Combat":
				return "Bully Parasite Fight";

			case "Whitney Bully Parasite Event Combat Loss":
			case "Whitney Bully Parasite Event Combat Victory":
				return "Bully Parasite Fight Finish";

			case "Robin Kiyoura Start":
				return "Canteen Robin Whitney";

			case "Robin Kiyoura canteen oral":
				return "Canteen Robin Whitney Oral";

			case "Robin Kiyoura canteen oral Finish":
				return "Canteen Robin Whitney Oral Finish";

			case "Robin Kiyoura Back to Robin":
				return "Canteen Robin Whitney Talk";

			case "Robin Kiyoura canteen fight":
				return "Canteen Robin Whitney Fight";

			case "Robin Kiyoura after fight":
				return "Canteen Robin Whitney Fight 2";

			case "Robin Kiyoura weak":
				return "Canteen Robin Whitney Trauma";

			case "Robin Kiyoura cuddle":
			case "Robin Kiyoura Secret":
			case "Robin Kiyoura Didn't want to":
			case "Robin Kiyoura Enjoyed it":
				return "Canteen Robin Whitney End";

			case "Livestock Field Centaur Friendly":
			case "Livestock Field Centaur Firm":
			case "Livestock Field Friendly":
			case "Livestock Field Firm":
				return "Livestock Field Horse Intro";

			case "Livestock Field Centaur Brush":
				return "Livestock Field Horse Brush";

			case "Livestock Field Centaur Apples":
				return "Livestock Field Horse Apples";

			case "Livestock Field Horse Help 2":
			case "Livestock Field Centaur Help":
			case "Livestock Field Centaur Help 2":
				return "Livestock Field Horse Help";

			case "Livestock Field Centaur Female Vagina":
			case "Livestock Field Centaur Female":
			case "Livestock Field Centaur Male Vagina":
			case "Livestock Field Centaur Male":
			case "Livestock Field Centaur Female Vagina 2":
			case "Livestock Field Centaur Female 2":
			case "Livestock Field Centaur Male Vagina 2":
			case "Livestock Field Centaur Male 2":
			case "Livestock Field Horse Lewd":
			case "Livestock Field Horse Lewd Female":
			case "Livestock Field Horse Lewd 2":
			case "Livestock Field Horse Lewd Female 2":
			case "Livestock Field Horse Continue":
				return "Livestock Field Deviancy";

			case "Livestock Field Centaur Female Vagina 3":
			case "Livestock Field Centaur Female 3":
			case "Livestock Field Centaur Male Vagina 3":
			case "Livestock Field Centaur Male 3":
			case "Livestock Field Centaur Male Hand":
			case "Livestock Field Centaur Male Hand Vagina":
			case "Livestock Field Centaur Female Hand":
			case "Livestock Field Centaur Female Hand Vagina":
			case "Livestock Field Horse Lewd 3":
			case "Livestock Field Horse Lewd Female 3":
			case "Livestock Field Horse Lewd Hand":
			case "Livestock Field Horse Lewd Female Hand":
				return "Livestock Field Deviancy Hand";

			case "Livestock Field Centaur Male Mouth":
			case "Livestock Field Centaur Male Mouth Vagina":
			case "Livestock Field Centaur Female Mouth":
			case "Livestock Field Centaur Female Mouth Vagina":
			case "Livestock Field Horse Lewd Mouth":
			case "Livestock Field Horse Lewd Female Mouth":
				return "Livestock Field Deviancy Mouth";

			case "Livestock Field Centaur Male Seduce":
			case "Livestock Field Centaur Male Sex":
			case "Livestock Field Centaur Male Sex Finish":
			case "Livestock Field Centaur Male Vagina Seduce":
			case "Livestock Field Centaur Male Vagina Sex":
			case "Livestock Field Centaur Male Vagina Sex Finish":
			case "Livestock Field Centaur Female Vagina Seduce":
			case "Livestock Field Centaur Female Vagina Sex":
			case "Livestock Field Centaur Female Vagina Sex Finish":
			case "Livestock Field Centaur Female Seduce ":
			case "Livestock Field Centaur Female Sex":
			case "Livestock Field Centaur Female Sex Finish":
			case "Livestock Field Horse Lewd Seduce":
			case "Livestock Field Horse Lewd Female Seduce":
			case "Livestock Field Horse Lewd Sex":
			case "Livestock Field Horse Lewd Female Sex":
			case "Livestock Field Horse Lewd Sex Finish":
			case "Livestock Field Horse Lewd Female Sex Finish":
				return "Livestock Field Deviancy Sex";

			case "Beach Cave Tentacle Under Top":
				return "Beach Cave Tentacle Top";

			case "Beach Cave Rope Under Top":
			case "Beach Cave Rope Over Top":
				return "Beach Cave Rope Top";

			case "Prison Wren Intro Met":
				return "Prison Wren Intro";

			case "Museum Box":
				return "Museum Waterlogged Ivory Box";
			case "Museum Silver Ring":
				return "Museum Worn Silver Ring";
			case "Museum Gold Necklace":
				return "Museum Ornate Gold Necklace";
			case "Museum Gold Chastity Belt":
				return "Museum Golden Chastity Belt";
			case "Museum Ivory Necklace":
				return "Museum Immaculate Ivory Necklace";
			case "Museum Crystal":
				return "Museum Arousing Crystal";
			case "Museum Horn":
				return "Museum Hunting Horn";
			case "Museum Watch":
				return "Museum Old Watch";
			case "Museum Dildo":
				return "Museum Odd Medical Aid";
			case "Museum Candlestick":
				return "Museum Noble Candle Stick";
			case "Museum Arrow":
				return "Museum Mossy Forest Arrow";
			case "Museum Dagger":
				return "Museum Rusted Forest Dagger";
			case "Museum Gem":
				return "Museum Pulsing Forest Gem";
			case "Museum Hourglass":
				return "Museum Inscribed Hourglass";
			case "Museum Cup":
				return "Museum Discarded Cup";
			case "Museum Burner":
				return "Museum Incense Burner";
			case "Museum Brass Statuette":
				return "Museum Forgotten Brass Statuette";
			case "Museum Grenade":
				return "Museum Old Grenade";
			case "Museum Bell":
				return "Museum Sonorous Bell";
			case "Museum Shell":
				return "Museum Artillery Shell";
			case "Museum Mine Sign":
				return "Museum Bailey Sign";
			case "Museum Island Arrow":
				return "Museum Islander Arrow";

			default:
				return false;
		}
	};

	/* Check for passage rerouting using events */
	const passageArgs = { name: dest };
	$.event.trigger(":passageoverride", passageArgs);
	if (passageArgs.name !== dest) {
		/* Return new passage dest. Will divert the processed passage to this. */
		return passageArgs.name;
	}

	// Scene viewer redirect
	if (V.replayScene) {
		if (passageArgs.name === V.replayScene.startPassage) {
			return false;
		}
		if (passageArgs.name === "Scene Viewer End") {
			delete V.replayScene.startPassage;
			return false;
		}
		if (!V.replayScene.passages.includes(passageArgs.name)) {
			return "Scene Viewer End";
		}
	}

	if (pageLoading) {
		pageLoading = false;
		const passageOverride = checkPassages(dest);
		if (passageOverride) V.passageOverride = passageOverride;

		return passageOverride;
	}

	return false;
};
