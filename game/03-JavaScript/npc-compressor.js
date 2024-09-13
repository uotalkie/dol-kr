/**
 * Deprecated file, should not be deleted or edited
 * npcDecompressor is to be kept for legacy saves
 * example usage: npcDecompressor("~2sY|2qyos.a93.n");
 */
const { npcDecompressor } = (function () {
	const typeList = ["human", "dog", "cat", "pig", "wolf", "dolphin", "lizard", "bear", "boar", "creature", "horse", "fox", "hawk", "cow", "spider", "plant"];
	const beastList = ["dog", "cat", "pig", "wolf", "dolphin", "lizard", "bear", "boar", "creature", "horse", "fox", "hawk", "cow", "spider"];
	const insecurityList = ["none", "vagina", "penis", "ethics", "weak", "skill", "looks"];
	const genproList = ["mm", "fm", "hm", "mf", "ff", "hf"]; /* stores gender first, pronoun second. */
	const breastdescList = ["nipple", "budding", "tiny", "small", "pert", "modest", "full", "large", "ample", "massive", "huge", "gigantic", "enormous"];
	const sizeList = ["tiny", "small", "normal", "large"];
	const skinColourList = ["white", "black", "light", "medium", "dark", "ylight", "ymedium", "ydark", "ghostlyPale", "gyaru", "ygyaru"];
	const noClawList = ["dog", "pig", "wolf", "dolphin", "boar", "fox", "hawk", "cow", "bull"];
	const teenFDescList = [
		"slight",
		"lithe",
		"lean",
		"thin",
		"slender",
		"lissome",
		"slim",
		"taut",
		"graceful",
		"trim",
		"mousy",
		"cute",
		"fit",
		"petite",
		"toned",
		"shapely",
		"robust",
		"plump",
		"wide-eyed",
		"vulgar",
		"minor demon",
		"tutorial",
		"debug",
	];
	const teenMDescList = [
		"slight",
		"lithe",
		"lean",
		"thin",
		"slender",
		"lissome",
		"slim",
		"taut",
		"graceful",
		"trim",
		"mousy",
		"cute",
		"fit",
		"petite",
		"toned",
		"shapely",
		"robust",
		"plump",
		"wide-eyed",
		"brutish",
		"minor demon",
		"tutorial",
		"debug",
	];
	const adultFDescList = [
		"slight",
		"lithe",
		"lean",
		"thin",
		"slender",
		"lissome",
		"slim",
		"taut",
		"petite",
		"trim",
		"muscular",
		"curvy",
		"toned",
		"plump",
		"plush",
		"shapely",
		"robust",
		"voluptuous",
		"lush",
		"vulgar",
		"demon",
		"tutorial",
		"debug",
	];
	const adultMDescList = [
		"petite",
		"slight",
		"slim",
		"thin",
		"slender",
		"lanky",
		"lissome",
		"lithe",
		"trim",
		"lean",
		"taut",
		"plump",
		"toned",
		"bulky",
		"broad",
		"robust",
		"rugged",
		"muscular",
		"burly",
		"brutish",
		"demon",
		"tutorial",
		"debug",
	];
	const beastDescList = [
		"large",
		"large",
		"fat",
		"enormous",
		"bottlenose",
		"scaly",
		"brown",
		"hairy",
		"strange",
		"huge",
		"large",
		"fierce",
		"slimy",
		"girthy",
		"mighty",
		"hefty",
		"colossal",
		"humongous",
	];
	const penisDescList = {
		human: [
			"none",
			"tiny penis",
			"penis",
			"thick cock",
			"hefty cock",
			"big cock",
			"large cock",
			"veiny cock",
			"meaty cock",
			"massive cock",
			"huge cock",
			"humongous cock",
			"immense cock",
			"gigantic cock",
			"enormous cock",
		],
		beast: [
			"knotted penis",
			"spiked penis",
			"penis",
			"knotted penis",
			"strange penis",
			"penis",
			"penis",
			"penis",
			"penis",
			"equine cock",
			"knotted penis",
			"avian cock",
			"bovine cock",
			"arachnid penis",
		],
	};
	const teenHealthList = [125, 175, 150, 150, 150, 175, 150, 200, 200, 200, 125, 200, 250, 125, 250, 200, 250, 250, 200, 300, 400];
	const adultFHealthList = [125, 175, 150, 150, 150, 175, 150, 200, 125, 200, 275, 200, 250, 250, 200, 200, 250, 200, 200, 350, 600];
	const adultMHealthList = [125, 125, 150, 150, 150, 150, 175, 175, 200, 200, 200, 200, 250, 250, 250, 250, 275, 275, 275, 400, 600];
	const beastHealthList = [200, 150, 200, 300, 200, 250, 500, 300, 200, 500, 200, 150, 400];

	// base 64 conversion string.
	const table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_+";
	const base = table.length;

	/* npcDecompressor should not be deleted or edited, is to be kept for legacy saves */
	/**
	 * @description Takes in a passed coded string and turns them into a NPC with the required key values.
	 * @param {string} passedNPC The npc code as a string that you want returned as an object.
	 * @returns {object} The passed npc as an object with all relevent key's filled.
	 */
	function npcDecompressor(passedNPC) {
		const npcItems = {};
		let expandedNPC;
		let position = passedNPC.indexOf(".");
		if (passedNPC[0] === "~") expandedNPC = "0" + expandZeros(passedNPC.slice(1, position)) + passedNPC.slice(position);
		else expandedNPC = expandZeros(passedNPC.slice(0, position)) + passedNPC.slice(position);
		const cVersion = Number(expandedNPC.slice(0, 2));
		position = 2;

		// Sets the type of NPC
		let npcType = typeList[Number(expandedNPC.slice(position, position + 2))];
		const beast = !(npcType === "human" || npcType === "plant") ? beastList.indexOf(npcType) : 0;
		position += 2;

		// sets gender, pronoun, and genitals of the NPC
		const gpCombo = genproList[expandedNPC[position]];

		const gender = gpCombo[0];
		const pronoun = gpCombo[1];
		const notNone = npcType === "human" ? "clothed" : 0;
		const vagina = gender === "m" ? "none" : notNone;
		const penis = gender === "f" ? "none" : notNone;
		position++;

		const penissize = Number(expandedNPC[position]);
		position++;

		const penisdesc =
			penis === "none"
				? "none"
				: beast
				? penisDescList.beast[Number(expandedNPC.slice(position, position + 2))]
				: penisDescList.human[Number(expandedNPC.slice(position, position + 2))];
		position += 2;

		// Sets the breast size of the NPC
		const breastsize = Number(expandedNPC.slice(position, position + 2));
		const breastdesc = breastdescList[breastsize] + (breastsize > 0 ? " breast" : "");
		const breastsdesc = breastdesc + "s";
		position += 2;

		// Sets the insecurities of the NPC
		const insecurity = insecurityList[Number(expandedNPC.slice(position, position + 2))];
		position += 2;

		// Sets the physical size of the NPC
		const size = sizeList[expandedNPC[position]];
		position++;

		// sets the ages range of the npc
		const adult = Number(expandedNPC[position]);
		const teen = 1 - adult;
		position++;

		// sets the monster status or skin color depending on NPC type
		let monster, claws, skincolour;
		if (beast) {
			monster = Number(expandedNPC[position]) !== 0 ? "monster" : 0;

			// assign the correct claw type first
			if (["cow", "horse", "pig", "boar"].includes(npcType)) {
				claws = "hooves";
			} else if (["dolphin"].includes(npcType)) {
				claws = "flippers";
			} else if (["hawk"].includes(npcType)) {
				claws = "talons";
			} else {
				claws = "claws";
			}

			if (npcType === "cow" && gender === "m") npcType = "bull";

			if (monster !== 0) {
				// removes the claws on the monsters than don't keep them.
				if (noClawList.includes(npcType)) claws = null;

				switch (npcType) {
					case "horse":
						npcType = "centaur";
						break;
					case "hawk":
						npcType = "harpy";
						break;
					default:
						npcType += gender === "m" ? "boy" : "girl";
						break;
				}
			}
		} else {
			skincolour = skinColourList[Number(expandedNPC[position])];
		}
		position++;

		let health, healthmax, description, fullDescription;

		// Sets the description and health of the NPC
		if (beast) {
			health = beastHealthList[beast];
			healthmax = health;
			description = beastDescList[Number(expandedNPC.slice(position, position + 2))];
			fullDescription = description + (!monster ? (gender === "m" ? " male " : " female ") : " ") + npcType;
		} else {
			let descType;
			let healthType;

			if (teen === 1) {
				healthType = teenHealthList;
				descType = pronoun === "f" ? teenFDescList : teenMDescList;
			} else {
				healthType = pronoun === "f" ? adultFHealthList : adultMHealthList;
				descType = pronoun === "f" ? adultFDescList : adultMDescList;
			}

			description = descType[Number(expandedNPC.slice(position, position + 2))];
			health = healthType[Number(expandedNPC.slice(position, position + 2))];
			healthmax = health;

			// Sets the full description of the NPC
			const plant = npcType === "plant" ? " plant" : " ";
			const man = pronoun === "m" ? (teen === 1 ? "boy" : "man") : teen === 1 ? "girl" : "woman";
			fullDescription = description + plant + man;
		}
		position += 2;

		if (cVersion > 1) throw new Error("This should be unreachable.");

		// preg avoidance
		let pregnancyAvoidance = passedNPC.match(/\.a(\d+)/);
		pregnancyAvoidance = pregnancyAvoidance ? Number(pregnancyAvoidance[1]) : 1;

		// preg timer
		let pregnancyTimer = passedNPC.match(/\.p(-?\d+)/);
		pregnancyTimer = pregnancyTimer ? Number(pregnancyTimer[1]) : 0;

		// event timer
		let eventTimer = passedNPC.match(/\.t(\d+)/);
		eventTimer = eventTimer ? Number(eventTimer[1]) : 0;

		npcItems.type = npcType;
		npcItems.gender = gender;
		npcItems.pronoun = pronoun;
		npcItems.vagina = vagina;
		npcItems.penis = penis;
		npcItems.penissize = penissize;
		npcItems.penisdesc = penisdesc;
		npcItems.breastsize = breastsize;
		npcItems.breastdesc = breastdesc;
		npcItems.breastsdesc = breastsdesc;
		npcItems.insecurity = insecurity;
		npcItems.size = size;
		npcItems.adult = adult;
		npcItems.teen = teen;
		npcItems.monster = monster || 0;
		npcItems.claws = claws || null;
		npcItems.skincolour = skincolour || null;
		npcItems.health = health;
		npcItems.healthmax = healthmax;
		npcItems.description = description;
		npcItems.fullDescription = fullDescription;
		npcItems.pregnancyAvoidance = pregnancyAvoidance;
		npcItems.pregnancyTimer = pregnancyTimer;
		npcItems.eventTimer = eventTimer;

		if (!npcItems.claws) delete npcItems.claws;
		if (!npcItems.skincolour) delete npcItems.skincolour;

		return npcItems;
	}

	/**
	 * @description converts the passed string from base 64 to base 10.
	 * @param {string} passedStr The base 64 string that is to be converted to base 10.
	 * @returns {string} The base 10 number as a string.
	 */
	function fromBase64(passedStr) {
		if (passedStr.length === 0 || passedStr === "0") return 0;
		if (passedStr === "NaN" || passedStr === "Infinity") return Number(passedStr);
		if (passedStr[0] === "-") return -fromBase64(passedStr.slice(1));

		if (passedStr.indexOf("!") >= 0)
			return "" + fromBase64(passedStr.slice(0, passedStr.indexOf("!"))) + fromBase64(passedStr.slice(passedStr.indexOf("!") + 1));

		let num = 0;
		let r;

		while (passedStr.length) {
			r = table.indexOf(passedStr.charAt(0));
			passedStr = passedStr.substring(1);
			num *= base;
			num += r;
		}

		return num;
	}

	/**
	 * @description Converts condensed zeros back to the correct number of zeros. It then passes the result to the base 64 to base 10 converter above and finishes decompressing it.
	 * @param {*} passedString The base 64 number with compressed zeros in it.
	 * @returns {string} The passed coded string as a number in base 10 as a string.
	 */
	function expandZeros(passedString) {
		if (passedString.length === 0 || passedString === "0") return 0;
		if (passedString === "NaN" || passedString === "Infinity") return Number(passedString);
		let result = passedString;

		result = result.replace(/[a-zA-Z0-9_+]+/g, group => fromBase64(group));
		result = result.replace(/([0-9]+)>/g, (_str, p1) => "0".repeat(Number(p1) * 9));
		result = result.replace(/>/g, "9|");
		result = result.replace(/!/g, "");
		result = result.replace(/([0-9])\|/g, (_str, p1) => (p1 > 0 ? "0".repeat(Number(p1)) : "0".repeat(9)));

		return result;
	}

	return { npcDecompressor };
})();
window.npcDecompressor = npcDecompressor;
