//When adding new types, be sure to adjust related checks in other pregnancy code that check for "human","wolf","wolfboy","wolfgirl" etc
const pregPrep = (mother, father) => {
	let pregnancy;
	let fertility = 0;
	let magicTattoo = false;
	let alwaysIdentical = mother === father;
	if(!mother) {
		return [null];
	} else if(mother === "pc"){
		pregnancy = V.sexStats.vagina.pregnancy;
		if(!V.player.vaginaExist || pregnancy.fetus.length){
			return [null];
		}
		if(V.sexStats.pills.lastTaken.pregnancy === "fertility booster"){
			fertility = V.sexStats.pills.pills["fertility booster"].doseTaken;
		}
		if(V.skin.pubic.type === "magic" && V.skin.pubic.special === "pregnancy"){
			magicTattoo = true;
		}
	} else {
		if(!C.npc[mother] || C.npc[mother].vagina === "none"){
			/*Only female named npc's are supported*/
			return [null];
		}
		pregnancy = C.npc[mother].pregnancy;
		if(!pregnancy){
			//Pregnancy not supported or disabled by the player
			return [null];
		}
		if(pregnancy.pills === "fertility"){
			fertility = 1;
		}
	}
	return [pregnancy, fertility, magicTattoo, alwaysIdentical];
}

const bodySizeCalc = (devlevel) => {
	switch(devlevel){
		case 6: return ["tiny","tiny","tiny","small","small","normal","large"].pluck();
		case 10: return ["tiny","tiny","small","small","small","normal","normal","large"].pluck();
		case 12: return ["tiny","small","small","normal","normal","normal","large","large"].pluck();
		case 16: return ["tiny","small","normal","normal","large","large","large"].pluck();
		default: return ["tiny","small","normal","large"].pluck();
	}
}

const sizeName = (devlevel) => {
	switch(devlevel){
		case 6: return "tiny";
		case 10: return "small";
		case 12: return "normal";
		case 16: return "large";
		default: return "normal";
	}
}

const babyBase = ({mother = null, motherKnown = true, father = null, fatherKnown = false, birthId = null, type = null, gender = "f", identical = null, size = null, hairColour = null, monster = null, skinColour = null, clothes = null}) => {
	return {
		"type": type,
		"mother": mother,
		"motherKnown": mother && motherKnown,
		"father": father || null,
		"fatherKnown": father && fatherKnown,
		"born": {"day":null, "month":null, "year":null},
		"concieved": {"day":V.monthday, "month":V.month.toUpperFirst(), "year":V.year},
		"gender": gender,
		"features": {"size":size, "hairColour":hairColour, "identical":identical, "monster":monster, "clothes":clothes, "skinColour": skinColour},
		"name":null,
		"birthId": birthId,
		"childId": null,
		"location": null,
		"birthLocation": null,
		"localVariables":{},
	};
}

window.pregnancyGenerator = {
	human: (mother, father, fatherKnown = false) => {
		let [pregnancy, fertility, magicTattoo, alwaysIdentical] = pregPrep(mother, father);
		if(pregnancy){
			let result = {fetus: [], type: "human", timer: 0};
			let count = 1;
			let identical = alwaysIdentical || random(0,100) > 66;
			let twinBoost = 20 * fertility;
			let tripletBoost = 5 * fertility;
			if(magicTattoo){
				twinBoost += 20;
				tripletBoost += 10;
			}
			if(random(0,100) > 94 - twinBoost) count++;
			if(random(0,100) > 98 - tripletBoost) count++;
			/*Ready for the cloning of PurityGuy to begin*/
			for(let i = 0; i < count; i++){
				if(identical && result.fetus.length){
					result.push(result[0]);
				} else {
					let gender = random(0,100) > 50 ? "f" : "m";
					if((mother.gender === "h" || father.gender === "h") && (mother === father || random(0,100) >= 75)) gender = "h";
					let baby = babyBase({
						mother: mother,
						father: father,
						fatherKnown: fatherKnown,
						type: "human",
						gender: gender,
						identical: count > 1 ? identical : null,
						size: alwaysIdentical ? sizeName(V.devlevel) : bodySizeCalc(V.devlevel),
						hairColour: alwaysIdentical ? V.naturalhaircolour : [V.naturalhaircolour, V.naturalhaircolour, V.naturalhaircolour, V.naturalhaircolour, "red", "jetblack","black", "brown" ,"burntorange" ,"platinumblond" ,"strawberryblond" ,"ginger" ,"ashyblond" ,"blond"].pluck(),
						skinColour: V.skinColor.natural,
						clothes: "naked",
					});
					result.fetus.push(baby);
				}
			}
			result.timerEnd = random(255,305) - (count * 10);

			return result;
		}
		return null;
	},
	wolf: (mother, father, fatherKnown = false, monster = false) => {
		let [pregnancy, fertility, magicTattoo] = pregPrep(mother);
		if(pregnancy){
			let result = {fetus: [], type: "wolf", timer: 0};
			for(let i = 0; i < 8; i++){
				let furColour = ["gray", "brown", "tan", "white"];
				if(mother === "Black Wolf" || father === "Black Wolf"){
					furColour.concat(["black","black","black"]);
				}
				let gender = random(0,100) > 50 ? "f" : "m";
				if((mother === "pc" || father === "pc") && V.player.gender === "h" && random(0,100) >= 75) gender = "h";
				let baby = babyBase({
					mother: mother,
					father: father,
					fatherKnown: fatherKnown,
					type: "wolf",
					monster: monster ? "monster" : 0,
					gender: gender,
					size: bodySizeCalc(V.devlevel),
					hairColour: furColour.pluck(),
				});
				result.fetus.push(baby);
				if(i > 4 && random(0,100) > 100 - (i * Math.clamp(4 - fertility,0,4)) && !magicTattoo) break;
			}
			result.timerEnd = random(70,110);

			return result;
		}
		return null;
	},
}