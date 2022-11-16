//Should a name type for species be setup, say, human/wolf specific names
function generateBabyName(name, gender, childId) {
	let result = "";
	let usedNames = [];
	if(usedNames.length === 0){
		Object.values(V.children).forEach(child => {
			if(!usedNames.includes(child.name) && child.childId !== childId && child.name !== "Unnamed"){
				usedNames.push(child.name);
			}
		})
	}
	if (!!name && name !== "" && name !== "Unnamed") {
		result = name.replace(/[^a-zA-ZÀ-ÿ ]+/g, "").substring(0, 30);
		if(usedNames.includes(result)){
			result += ' - ' + childId;
		}
		return result;
	}
	let names = [];
	switch (gender) {
		case "m":
			// eslint-disable-next-line prettier/prettier
			names = ['Addison','Algernon','Allan','Alpha','Anton','Axel','Bazza','Benton','Bernard','Brand','Brett','Cale','Calvin','Carol','Chuck','Chucky','Clay','Cornelius','Crofton','Darden','Dax','Den','Deven','Digby','Don','Douglas','Driscoll','Duane','Duke','Edmund','Elsdon','Freeman','Gabby','Garland','George','Godfrey','Graeme','Grier','Hammond','Harlan','Hendrix','Herman','Hewie','Hugh','Indiana','Ingram','Jackie','Jasper','Jaxon','Jaycob','Jere','Kamden','Kelcey','Kendall','Kevin','Kian','Kieran','Kirby','Lanny','Lawson','Laz','Leland','Levi','Lindon','Linton','Lionel','Lonny','Lucas','Manley','Maverick','Merlyn','Michael','Monty','Murphy','Nate','Ned','Nowell','Odell','Ollie','Osbert','Otto','Paget','Pip','Quintin','Raymund','Ricky','Robert','Ross','Rudolph','Sammy','Scotty','Stacey','Thad','Theodore','Tommy','Trey','Tyson','Val','Vernon','Willis','Wilmer','Winton','Wisdom'];
			break;
		case "f":
			// eslint-disable-next-line prettier/prettier
			names = ['Adelyn','Alene','Alexa','Aliah','Alyson','Angelica','Annalise','Annora','Azaria','Bessie','Betsy','Bettie','Biddy','Brianne','Camellia','Camille','Camryn','Caroline','Chastity','Chelsea','Chelsey','Cindy','Clematis','Darla','Deb','Debby','Dortha','Eleanora','Eliana','Elsabeth','Elyse','Emerson','Emmeline','Erica','Ettie','Eustacia','Evelyn','Gabrielle','Georgiana','Harper','Harrietta','Haylie','Haze','Hunter','Hyacinth','Indiana','Indie','Jacquetta','Janie','Jannine','Jonquil','Kaelyn','Kam','Khloe','Kolleen','Korrine','Kourtney','Krystine','Lavena','Leeann','Lela','Lesleigh','Lindsie','Lorena','Lucile','Luvinia','Lyn','Lyssa','Madeleine','Marian','Maudie','Maureen','Maxine','Melody','Milani','Misti','Nat','Noelle','Ottoline','Paige','Pauline','Payton','Pearl','Perlie','Petronel','Phebe','Posie','Praise','Rexana','Serena','Sharalyn','Sharla','Shauna','Sky','Sybella','Tracy','Tresha','Trudi','Wallis','Wilda','Wren','Yvette'];
			break;
	}
	// eslint-disable-next-line prettier/prettier
	names.pushUnique('Aaren','Addison','Alex','Alpha','Andie','Arden','Ariel','Artie','Ashton','Aston','Aubrey','Beau','Bernie','Bertie','Beverly','Bobbie','Brooklyn','Caelan','Cameron','Carol','Cary','Casey','Channing','Charley','Cherokee','Cheyenne','Coby','Codie','Collyn','Cyan','Dale','Dallas','Dana','Darby','Dee','Derby','Devan','Devin','Emmerson','Emory','Finley','Flannery','Florence','Gabby','Garnet','Garnett','Gray','Hadyn','Harlow','Hollis','Jackie','Jade','Jae','Jaiden','Johnnie','Joyce','Justice','Kam','Kelcey','Kelsey','Leslie','Lindsey','Lorin','Lyric','Maitland','Marley','McKinley','Merlyn','Murphy','Nicky','Oakley','Odell','Pacey','Paget','Peyton','Presley','Rain','Raleigh','Reagan','Regan','Reilly','Remington','Robbie','Rory','Royale','Sage','Sam','Schuyler','Selby','Shae','Shaye','Shelly','Skylar','Sloan','Stacey','Stacy','Tayler','Tommie','Tracey','Tristen','Tristin','Val');
	names.delete(usedNames);

	result = names[random(0, names.length - 1)];
	if(!result) result = "Unnamed";
	return result;
}
window.generateBabyName = generateBabyName;

window.spermObjectToArray = (spermObject = {}) => {
	let spermArray = [];
	let trackedNPCs = [];

	for(let npc in spermObject){
		if(V.NPCNameList.includes(npc) && !setup.npcPregnancy.canImpregnatePlayer.includes(npc)) continue;
		let sperm = spermObject[npc];
		let spermType;
		switch(sperm.type){
			case "human":
				if(V.playerPregnancyHumanDisable === "t") continue;
				spermType = "human";
			break;
			case "wolf": case "wolfboy": case "wolfgirl":
				if(V.playerPregnancyBeastDisable === "t") continue;
				spermType = "wolf";
			break;
			default: continue;
		}
		if(!trackedNPCs.includes(npc)) trackedNPCs.push([spermType, npc]);
		let count = sperm.count.length < 500 ? sperm.count.length : 500;
		for(let i = 0; i < count; i++){
			let count2 = sperm.count[i][1] < 500 ? sperm.count[i][1] : 500;
			for(let j = 0; j < count2; j++){
				spermArray.push([sperm.type, npc]);
			}
		}
	}
	return [trackedNPCs, spermArray];
}

/*ToDo: Pregnancy - remove the ` || !V.pregnancyTesting` part of the check*/
const playerPregnancyAttempt = (baseMulti = 1, genital = "vagina") => {
	console.log('playerPregnancyAttempt',baseMulti, genital)
	//Male pregnancy requests the magic pubic tattoo
	if(!V.player.vaginaExist && V.skin.pubic.pen !== "magic" && V.skin.pubic.special !== "pregnancy") return false;

	let pregnancy = clone(V.sexStats[genital].pregnancy);

	if(pregnancy.fetus.length || isNaN(baseMulti) || baseMulti < 1 || !V.pregnancyTesting) return false;

	let [trackedNPCs, spermArray] = spermObjectToArray(V.sexStats[genital].sperm);

	let pills = V.sexStats.pills;
	let lastPillsTaken = pills.lastTaken.pregnancy;
	let contraceptive = lastPillsTaken === "contraceptive" ? pills.pills[lastPillsTaken].doseTaken : 0;

	if(spermArray.length === 0 || (contraceptive && (random(0,100) >= 10 || contraceptive > 1))) return false;
	let fertilityBoost = 1;
	if(lastPillsTaken === "fertility booster"){
		fertilityBoost -= Math.clamp((boosterPillsTaken * 0.2), 0, 0.7);
	}
	if(V.skin.pubic.pen === "magic" && V.skin.pubic.special === "pregnancy"){
		fertilityBoost -= 0.4;
	}
	let baseChance = Math.floor((100 - V.baseVaginalPregnancyChance) * Math.clamp(fertilityBoost, 0.1, 1) * baseMulti);
	let rng = random(0, spermArray.length - 1 > baseChance ? spermArray.length - 1 : baseChance);

	if(spermArray[rng]){
		//Player becomes pregnant
		let newPregnancy;
		
		let fatherKnown = Object.keys(trackedNPCs).length === 1;
		switch(spermArray[rng][0]){
			case "human":
				newPregnancy = pregnancyGenerator.human("pc", spermArray[rng][1], fatherKnown, genital);
			break;
			case "wolf":
				newPregnancy = pregnancyGenerator.wolf("pc", spermArray[rng][1], fatherKnown, genital);
			break;
			case "wolfboy": case "wolfgirl":
				newPregnancy = pregnancyGenerator.wolf("pc", spermArray[rng][1], fatherKnown, genital, true);
			break;
		}
		if(newPregnancy && newPregnancy.fetus.length){
			V.sexStats[genital].pregnancy = {
				...pregnancy,
				...newPregnancy,
				potentialFathers: trackedNPCs,
				waterBreakingTimer: random(0,24),
				waterBreaking: false,
				awareOf: false,
			}
			V.sexStats.vagina.menstruation.currentState = "pregnant";
			return true;
		}
	}
	return false;
}
DefineMacro("playerPregnancyAttempt", playerPregnancyAttempt);
window.playerPregnancyAttempt = (baseMulti, genital) => {if(V.pregnancyTesting) playerPregnancyAttempt(baseMulti, genital);};//V.pregnancyTesting Check should not be removed, debugging purposes only

/*ToDo: NPC Pregnancy - run in time.twee, should only run once per day, update where required*/
const npcPregnancyCycle = () => {
	for(const npcName in V.NPCNameList){
		let npc = C.npc[npcName];
		let pregnancy = npc.pregnancy;
		if(!pregnancy || pregnancy.enabled === undefined) return false;

		if(pregnancy.fetus.length){
			let multiplier = 1;
			switch(pregnancy.type){
				case "human": multiplier = (1/(1/9*V.humanPregnancyMonths)); break;
				case "wolf": multiplier = (1/(1/12*V.wolfPregnancyWeeks)); break;
			}
			pregnancy.timer += parseFloat(multiplier.toFixed(3));
			if(pregnancy.timer > pregnancy.timerEnd * 0.2 && !pregnancy.npcAwareOf){
				pregnancy.npcAwareOf = true;
			}
			if(pregnancy.timer > pregnancy.timerEnd){
				if(pregnancy.timer >= pregnancy.timerEnd + (14 * multiplier)){
					/*ToDo: NPC Pregnancy*/
					/*Player has not seen the npc recently, sort out the pregnancy in another way*/
				} else {
					/*Can deal with the npc in the next event*/
					pregnancy.waterBreaking = true;
				}
			}
		} else if(pregnancy.enabled && V.npcPregnancyDisable === "f") {
			pregnancy.cycleDay++;
			if(pregnancy.cycleDay >= pregnancy.cycleDaysTotal){
				pregnancy.cycleDay = 1;
			} else if(between(pregnancy.cycleDay, pregnancy.cycleDangerousDay - 1, pregnancy.cycleDangerousDay + 1)){
				npcPregnancyAttempt(npcName);
			}
		}
	} 
}

const npcPregnancyAttempt = (npcName) => {
	if(!C.npc[npcName] || C.npc[npcName].vagina === "none"){
		return false;
	}
	let namedNpc = C.npc[npcName];
	let pregnancy = namedNpc.pregnancy;
	if(pregnancy || !pregnancy.enabled || pregnancy.fetus.length){
		//Pregnancy not supported or disabled by the player, or when they are already pregnant
		return false;
	}
	let [trackedNPCs, spermArray] = spermObjectToArray(pregnancy.sperm);

	let fertility = pregnancy.pills === "fertility" ? 0.8 : 1;
	let contraceptive = pregnancy.pills === "contraceptive";

	let baseChance = Math.floor((20 - V.baseNpcPregnancyChance) * fertility);
	let rng = random(0,(spermArray.length > baseChance ? spermArray.length : baseChance))
	if(contraceptive && random(0,100) >= 10){
		/*NPC doesn't get pregnant due to contraceptive*/
	} else if(spermArray[rng]){
		/*NPC gets pregnant*/
		let newPregnancy;
		let fatherKnown = Object.keys(trackedNPCs).length === 1;
		switch(spermArray[rng][0]){
			case "human":
				newPregnancy = pregnancyGenerator.human(npcName, spermArray[rng][1], fatherKnown, "vagina");
			break;
			case "wolf":
				newPregnancy = pregnancyGenerator.wolf(npcName, spermArray[rng][1], fatherKnown, "vagina");
			break;
			case "wolfboy": case "wolfgirl":
				newPregnancy = pregnancyGenerator.wolf(npcName, spermArray[rng][1], fatherKnown, "vagina", true);
			break;
		}
		if(newPregnancy && newPregnancy.fetus.length){
			namedNpc.pregnancy = {
				...namedNpc.pregnancy,
				...newPregnancy,
				potentialFathers: trackedNPCs,
				npcAwareOf: false,
				pcAwareOf: false,
			}
			return true;
		}
	}
	return false;
}

const endPlayerPregnancy = (location) => {
	let type;
	if(V.player.vaginaExist){
		type = "vagina"
	}else{
		type = "anus"
	}
	let pregnancy = V.sexStats[type].pregnancy;
	let menstruation = V.sexStats.vagina.menstruation;

	if(!pregnancy || !pregnancy.fetus.length) return false;

	giveBirthToChildren("pc", location);

	if(pregnancy.potentialFathers.filter(npc => npc[0] === pregnancy.type).length >= 5) Wikifier.wikifyEval('<<earnFeat "Bicycle Mother">>');

	switch(pregnancy.type){
		case "human":
			V.pregnancyStats.humanToysUnlocked = true;
			menstruation.recoveryTime = random(2,3) * V.humanPregnancyMonths;
			if(pregnancy.fetus.length === 3) Wikifier.wikifyEval('<<earnFeat "Life Comes in Threes">>');
		break;
		case "wolf":
			V.pregnancyStats.wolfToysUnlocked = true;
			menstruation.recoveryTime = random(1,2) * V.wolfPregnancyWeeks;
		break;
	}
	let birthEvents = clone(pregnancy.totalBirthEvents || 0) + 1;

	if((V.player.virginity.anal === true && !V.player.vaginaExist) || (V.player.virginity.vaginal === true && V.player.vaginaExist)) Wikifier.wikifyEval('<<earnFeat "Miracle of Life">>');
	if(!V.player.vaginaExist) Wikifier.wikifyEval('<<earnFeat "Life begins when you least expect">>');

	V.sexStats[type].pregnancy = {
		...pregnancy,
		totalBirthEvents: birthEvents,
		fetus: [],
		waterBreaking: false,
		waterBreakingTimer: null,
		type: null,
		bellySize: 0,
		timer: null,
		timerEnd: null,
		awareOf: null,
		potentialFathers: [],
	}

	V.sexStats.vagina.menstruation = {
		...menstruation,
		currentState: "recovering",
		recoveryTimeStart: menstruation.recoveryTime,
		recoveryStage: 0,
		periodEnabled: false,
		awareOfPeriodDelay: false,
	}
	return true;
}
DefineMacro("endPlayerPregnancy", endPlayerPregnancy);
window.endPlayerPregnancy = (location) => {if(V.pregnancyTesting && location) endPlayerPregnancy(location);};//V.pregnancyTesting Check should not be removed, debugging purposes only

const endNPCPregnancy = (npcName, location) => {
	if(!C.npc[npcName] || C.npc[npcName].vagina === "none" || C.npc[npcName].pregnancy.enabled === undefined){
		return false;
	}
	let pregnancy = C.npc[npcName].pregnancy;

	if(!pregnancy || pregnancy.enabled === undefined || !pregnancy.fetus.length) return false;

	giveBirthToChildren(npcName, location);
	switch(pregnancy.type){
		case "human":
			V.pregnancyStats.humanToysUnlocked = true;
			menstruation.recoveryTime = random(2,3) * V.humanPregnancyMonths;
		break;
		case "wolf":
			V.pregnancyStats.wolfToysUnlocked = true;
			menstruation.recoveryTime = random(1,2) * V.wolfPregnancyWeeks;
		break;
	}
	let birthEvents = clone(pregnancy.totalBirthEvents) + 1;
	let cycleDay = clone(pregnancy.cycleDaysTotal) - 3;

	V.NPCName[V.NPCNameList.indexOf(npcName)].pregnancy = {
		...pregnancy,
		fetus: [],
		bellySize: 0,
		birthEvents: birthEvents,
		timer: null,
		timerEnd: null,
		waterBreaking: false,
		npcAwareOf: null,
		pcAwareOf: null,
		type: null,
		potentialFathers: [],
		cycleDay: cycleDay,
	}

	V.pregnancyStats.npcTotalBirthEvents++;
	return true;
}
DefineMacro("endNPCPregnancy", endNPCPregnancy);
window.endNPCPregnancy = (npcName, location) => {if(V.pregnancyTesting && npcName && location) endNPCPregnancy(npcName, location);};//V.pregnancyTesting Check should not be removed, debugging purposes only

const giveBirthToChildren = (mother, location) => {
	let pregnancy;
	if(mother === "pc"){
		if(V.player.vaginaExist){
			pregnancy = V.sexStats.vagina.pregnancy;
		}else{
			pregnancy = V.sexStats.anus.pregnancy;
		}
	} else if(C.npc[mother]) {
		pregnancy = C.npc[mother].pregnancy;
	}
	if(!pregnancy || !pregnancy.fetus.length) return false;

	pregnancy.fetus.forEach(childObject => {
		pregnancy.givenBirth++;
		let childId = (mother + String(pregnancy.givenBirth).padStart(3,"0")).replace(' ','');
		V.children[childId] = {
			...childObject,
			name: generateBabyName(childObject.name, childObject.gender),
			born: {day: clone(V.monthday), month: clone(V.month.toUpperFirst()), year: clone(V.year)},
			birthId: 1,
			childId: childId,
			location: location,
			birthLocation: location,
		}
		if(childObject.mother === "pc"){
			V.pregnancyStats.playerChildren++;
			switch(childObject.type){
				case "human": V.pregnancyStats.humanChildren++; break;
				case "wolf": V.pregnancyStats.wolfChildren++; break;
			}
		} else if(childObject.father === "pc"){
			V.pregnancyStats.npcChildren++;
		} else {
			V.pregnancyStats.npcChildrenUnrelatedToPlayer++;
		}
	})
	return true;
}
