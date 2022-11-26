window.maxParasites = (genital = "anus") => {
	switch(V.sexStats[genital].pregnancy.motherStatus){
		case 1: return 2;
		case 2: return 4;
		default: return 1;
	}
}

window.canImpregnateParasite = (genital = "anus") => {
	if(V.parasitepregdisable === "t" || (genital === "vagina" && !player.vaginaExist)) return false;
	if(V.sexStats.pills.pills["Anti-Parasite Cream"] && V.sexStats.pills.pills["Anti-Parasite Cream"].doseTaken) return false;
	let pregnancy = V.sexStats[genital].pregnancy;

	if((pregnancy.type !== null && pregnancy.type !== "parasite") || pregnancy.fetus.length >= maxParasites(genital)) return false;

	return true;
}

window.canBeMPregnant = () => !V.player.vaginaExist && V.skin.pubic.pen === "magic" && V.skin.pubic.special === "pregnancy";

const npcPregObject = (person) => {
	let result = "Invalid input";

	if(typeof person === 'string' || person instanceof String){
		if(person === "pc"){
			//pregnancy isnt required for the player
			result = {
				name: "pc",
				gender: V.player.gender,
			}
		} else if (C.npc[person]){
			result = {
				name: C.npc[person].nam,
				pregnancy: clone(C.npc[person].pregnancy),
			};
			if(C.npc[person].vagina !== "none" && C.npc[person].penis !== "none"){
				result.gender = "h";
			} else if(C.npc[person].vagina !== "none"){
				result.gender = "f";
			} else if(C.npc[person].penis !== "none"){
				result.gender = "m";
			} else {
				//No Gender detected
				return "Gender for Named NPC not found";
			}
		} else {
			//No NPC found, likely found from sperm name string
			return {
				name: person,
			};
		}
	} else {
		if(person.fullDescription){
			result = {
				name: person.fullDescription,
				pregnancy: clone(person.fullDescription.pregnancy),
			}
			if(person.vagina !== undefined && person.vagina !== "none" && person.penis !== undefined && person.penis !== "none"){
				result.gender = "h";
			} else if(person.vagina !== undefined && person.vagina !== "none"){
				result.gender = "f";
			} else if(person.penis !== undefined && person.penis !== "none"){
				result.gender = "m";
			} else {
				//No Gender detected
				return "Gender for object not found";
			}
		}
	}
	return result;
}

//When adding new types, be sure to adjust related checks in other pregnancy code that check for "human","wolf","wolfboy","wolfgirl" etc
const pregPrep = ({motherObject, parasiteType = null, genital = null}) => {
	let pregnancy;
	let fertility = 0;
	let magicTattoo = 0;
	if(!motherObject){
		return [`mother object not provided`];
	} else if(!["anus","vagina"].includes(genital)){
		return [`Invalid genital '${genital}' set`];
	} else if(motherObject.name === "pc"){
		if((genital === "vagina" && !V.player.vaginaExist)) return ["Player doesn't have a vagina for pregnancy"];

		if(V.skin.pubic.pen === "magic" && V.skin.pubic.special === "pregnancy"){
			magicTattoo = 1;
		}

		//Prevent Non-parasitic pregnancy in the anus unless the player is male with a magic tattoo
		if(genital === "anus" && canBeMPregnant()) return ["MPreg is not currently avaliable to the player"];

		pregnancy = V.sexStats[genital].pregnancy;

		//Prevent any pregnancy if a Non-parasitic pregnancy already exists
		if(pregnancy.type !== "parasite" && pregnancy.fetus.length) return ["Player currently pregnant and cannot support other types"];

		//Prevent any non-parasitic pregnancy a parasitic pregnancy already exists
		if(pregnancy.type === "parasite" && !parasiteType) return ["Player currently pregnant with parasite and cannot support other types"];

		//Prevent a parasitic pregnancy if there is not enough space
		if(parasiteType && pregnancy.fetus.length >= maxParasites(genital)) return ["Player does not have room for more parasites"];

		if(V.sexStats.pills.lastTaken.pregnancy === "fertility booster"){
			fertility = V.sexStats.pills.pills["fertility booster"].doseTaken;
		}
	} else if(!parasiteType){
		//Male NPC pregnancies unsupported right now
		if(motherObject.gender === "m") return ["MPreg not supported for male NPCs"];
		
		pregnancy = motherObject.pregnancy;

		if(!pregnancy || !pregnancy.enabled){
			return ["Pregnancy not supported or disabled by the player"];
		}
		if(pregnancy.pills === "fertility"){
			fertility = 1;
		}
	}
	return [pregnancy, fertility, magicTattoo];
}

const bodySizeCalc = (bodysize) => {
	switch(bodysize){
		case 0: return ["tiny","tiny","tiny","small","small","normal","large"][random(0,6)];
		case 1: return ["tiny","tiny","small","small","small","normal","normal","large"][random(0,7)];
		case 2: return ["tiny","small","small","normal","normal","normal","large","large"][random(0,7)];
		case 3: return ["tiny","small","normal","normal","large","large","large"][random(0,6)];
		default: return ["tiny","small","normal","large"][random(0,3)];
	}
}

const sizeName = (bodysize) => {
	switch(bodysize){
		case 0: return "tiny";
		case 1: return "small";
		case 2: return "normal";
		case 3: return "large";
		default: return "normal";
	}
}

const eyeColourCalc = (name) => {
	if(name === "pc"){
		return V.eyeselected;
	}else if(C.npc[name] && C.npc[name].eyeColour){
		return C.npc[name].eyeColour;
	} else {
		return ["purple", "dark blue", "light blue", "amber", "hazel", "green", "lime green", "red", "pink", "grey", "light grey"][random(0,10)];
	}
}

const hairColourCalc = (name) => {
	if(name === "pc"){
		return V.naturalhaircolour;
	}else if(C.npc[name] && C.npc[name].hairColour){
		return C.npc[name].hairColour;
	} else {
		return ["red", "jetblack", "black", "brown", "softbrown", "lightbrown", "burntorange", "blond", "softblond", "platinumblond", "ashyblond", "strawberryblond", "ginger", "dark brown"][random(0,13)];
	}
}

const skinColourCalc = (name) => {
	if(name === "pc"){
		return V.skinColor.natural;
	}else if(C.npc[name] && C.npc[name].skinColour){
		return C.npc[name].skinColour;
	} else {
		return ["light", "medium", "dark", "ylight", "ymedium", "ydark"][random(0,5)];
	}
}

const babyBase = ({mother = null, motherKnown = true, father = null, fatherKnown = false, birthId = null, type = null, gender = "f", identical = null, size = null, hairColour = null, eyeColour = null, monster = null, skinColour = null, clothes = null}) => {
	return {
		"type": type,
		"mother": mother,
		"motherKnown": mother && motherKnown,
		"father": father || null,
		"fatherKnown": father && fatherKnown,
		"born": {"day":null, "month":null, "year":null},
		"concieved": {"day":V.monthday, "month":V.month.toUpperFirst(), "year":V.year},
		"gender": gender,
		"features": {"size":size, "hairColour":hairColour, "eyeColour":eyeColour, "identical":identical, "monster":monster, "clothes":clothes, "skinColour": skinColour},
		"name":null,
		"birthId": birthId,
		"childId": null,
		"location": null,
		"birthLocation": null,
		"localVariables":{},
	};
}

window.pregnancyGenerator = {
	human: (mother, father, fatherKnown = false, genital = "vagina") => {
		let motherObject = npcPregObject(mother);
		let fatherObject = npcPregObject(father);
		if(typeof motherObject === 'string' || motherObject instanceof String) return motherObject;
		if(typeof fatherObject === 'string' || fatherObject instanceof String) return fatherObject;

		const [pregnancy, fertility, magicTattoo] = pregPrep({motherObject, genital});
		if(typeof pregnancy === 'string' || pregnancy instanceof String) {
			return pregnancy;
		} else if(pregnancy){
			let result = {fetus: [], type: "human", timer: 0};
			let count = 1;
			const alwaysIdentical = motherObject.name === fatherObject.name;
			let identical = alwaysIdentical || random(0,100) > 66;
			let twinBoost = (20 * fertility) + (20 * magicTattoo);
			let tripletBoost = (5 * fertility) + (10 * magicTattoo);

			if(random(0,100) > 94 - twinBoost) count++;
			if(random(0,100) > 98 - tripletBoost) count++;
			/*Ready for the cloning of PurityGuy to begin*/
			for(let i = 0; i < count; i++){
				if(identical && result.fetus.length){
					result.fetus.push(result[0]);
					continue;
				}
				let gender = random(0,100) > 50 ? "f" : "m";
				if((motherObject.gender === "h" || fatherObject.gender === "h") && (motherObject.name === fatherObject.name || random(0,100) >= 75)) gender = "h";
				let baby = babyBase({
					mother: motherObject.name,
					father: fatherObject.name,
					fatherKnown: fatherKnown,
					type: "human",
					gender: gender,
					identical: count > 1 ? identical : null,
					size: alwaysIdentical ? sizeName(V.bodysize) : bodySizeCalc(V.bodysize),
					eyeColour: [eyeColourCalc(motherObject.name), eyeColourCalc(fatherObject.name)][random(0,1)],
					hairColour: [hairColourCalc(motherObject.name), hairColourCalc(fatherObject.name)][random(0,1)],
					skinColour: [skinColourCalc(motherObject.name), skinColourCalc(fatherObject.name)][random(0,1)],
					clothes: "naked",
				});
				result.fetus.push(baby);
			}
			result.timerEnd = random(255,305) - (count * 10);

			return result;
		}
		return false;
	},
	wolf: (mother, father, fatherKnown = false, genital = "vagina", monster = false) => {
		let motherObject = npcPregObject(mother);
		let fatherObject = npcPregObject(father);
		if(typeof motherObject === 'string' || motherObject instanceof String) return motherObject;
		if(typeof fatherObject === 'string' || fatherObject instanceof String) return fatherObject;

		const [pregnancy, fertility, magicTattoo] = pregPrep({motherObject, genital});
		if(typeof pregnancy === 'string' || pregnancy instanceof String) return pregnancy;

		if(pregnancy){
			let result = {fetus: [], type: "wolf", timer: 0};
			let furColour = ["gray", "brown", "tan", "white"];
			if(motherObject.name === "Black Wolf" || fatherObject.name === "Black Wolf"){
				furColour.concat(["black","black","black"]);
			}
			for(let i = 0; i < 8; i++){
				let gender = random(0,100) > 50 ? "f" : "m";
				if((motherObject.gender === "h" || fatherObject.gender === "h") && (motherObject.name === fatherObject.name || random(0,100) >= 75)) gender = "h";
				if((mother === "pc" || father === "pc") && V.player.gender === "h" && random(0,100) >= 75) gender = "h";
				let baby = babyBase({
					mother: motherObject.name,
					father: fatherObject.name,
					fatherKnown: fatherKnown,
					type: "wolf",
					monster: monster ? "monster" : 0,
					gender: gender,
					size: bodySizeCalc(V.bodysize),
					eyeColour: [eyeColourCalc(motherObject.name), eyeColourCalc(fatherObject.name)][random(0,1)],
					hairColour: furColour[random(0,furColour.length - 1)],
				});
				result.fetus.push(baby);
				if(i > 4 && random(0,100) > 100 - (i * Math.clamp(4 - fertility,0,4)) && !magicTattoo) break;
			}
			result.timerEnd = random(70,110);

			return result;
		}
		return false;
	},
	parasite: ({mother = null, parasiteType = null, hermParasite = null, genital = "anus"}) => {
		let motherObject = npcPregObject(mother);
		if(typeof motherObject === 'string' || motherObject instanceof String) return motherObject;

		const [pregnancy, fertility, magicTattoo] = pregPrep({motherObject, parasiteType, genital});
		if(typeof pregnancy === 'string' || pregnancy instanceof String) return pregnancy;

		if(pregnancy){
			/*
				creature: the type of creature it is. "Lurker", "Slime", "Pale Tentacle", etc
				fertilised: whether it's fertilised or not. Parasites need to be fertilised before they can be birthed
				daysLeft: how long until it can be birthed. Birthing is possible when it's 3 or less, but significantly more likely at 0
				timeLeft: how long until it prompts a daily event. Speed impacts how fast it goes down
				stats.growth: how long it takes to birth, and how much the parasite is worth when selling
				stats.speed: how often it prompts a daily event. Also determines the parasite's activity
			*/
			let result = {fetus: clone(pregnancy.fetus), type: "parasite"};
			let parasite = {
				creature: parasiteType,
				fertilised: !!hermParasite,
				daysLeft: 1,
				timeLeft: null,
				stats:{
					growth: random(7,14),
					speed: random(60,360)
				}
			}
			if(hermParasite){
				parasite.daysLeft = Math.floor(hermParasite.stats.growth * 0.8);
				parasite.stats.growth = Math.floor(hermParasite.stats.growth * 0.8);
				parasite.stats.speed = Math.floor(hermParasite.stats.speed * 0.8);
			} else {
				if(parasiteType.includes("Pale")){
					//Pale parasites have significantly better activity
					parasite.stats.speed *= 0.6;
				} else if(parasiteType.includes("Tentacle") || parasiteType.includes("Vine")){
					//Tentacles and vines have better activity. Done in an elseif so pale tentacles don't get the calculation twice
					parasite.stats.speed *= 0.9;
				}
				if(parasiteType.includes("Vine") && random(0,100) > 99){
					//Vine Vine easter egg lol
					parasite.creature += " Vine";
					parasite.stats.growth--;
				}
				if(parasiteType.includes("Lurker")){
					//Lurkers have better activity, but sell for less and take longer to birth
					parasite.stats.growth += 14;
					for(let i = 0; i < 3; i++){
						if(parasite.stats.speed >= 100){
							parasite.stats.speed -= 50;
						}
					}
				}
			}

			let genderCheck = random(0,100);
			if(genderCheck < 70){
				//Female parasites are most likely
				parasite.stats.gender = "Female";
			} else if(genderCheck > 90 && maxParasites(genital) > 1 && !pregnancy.fetus.find(currentParasite => currentParasite.stats.gender === "Hermaphrodite")) {
				//You can only get a futa if you're ready for a futa and don't currently have one
				parasite.stats.gender = "Hermaphrodite";
				parasite.stats.lastEgg = Math.floor(parasite.stats.growth / 3);
			} else {
				parasite.stats.gender = "Male";
			}
			result.fetus.push(clone(parasite));
			
			return result;
		}
		return false;
	}
}