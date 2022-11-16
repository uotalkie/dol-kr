
//Determins how used to being pregnant the player is
window.playerVaginalPregnancyCheck = () => Math.clamp(V.sexStats.vagina.pregnancy.totalBirthEvents, 0, 4);

//`pregnancyOnly` is there intentially, please make use of it if you add to this function
window.playerBellySize = (pregnancyOnly = false) => {
	if(!V.pregnancyTesting) return 0;//ToDo: Pregnancy, remove line
	let bellySize = 0;
	let vpregnancy = V.sexStats.vagina.pregnancy;
	let apregnancy = V.sexStats.anus.pregnancy;
	if(vpregnancy.fetus.length || apregnancy.fetus.length){
		let pregnancyProgress = 0;
		if(vpregnancy.timerEnd) pregnancyProgress = Math.clamp(vpregnancy.timer / vpregnancy.timerEnd, 0, 1);
		if(apregnancy.timerEnd) pregnancyProgress = Math.clamp(apregnancy.timer / apregnancy.timerEnd, 0, 1);
		let maxSize = 0;
		switch(vpregnancy.type){
			case "parasite":
				maxSize += vpregnancy.fetus.length;
			break;
			case "human":
				maxSize += 18 + Math.clamp(vpregnancy.fetus.length,1,3);
			break;
			case "wolf":
				maxSize += 16 + Math.clamp(vpregnancy.fetus.length / 2,1,4);
			break;
			default:
				maxSize += 20;
			break;
		}
		switch(apregnancy.type){
			case "parasite":
				maxSize += apregnancy.fetus.length;
			break;
			case "human":
				maxSize += 18 + Math.clamp(apregnancy.fetus.length,1,3);
			break;
			case "wolf":
				maxSize += 16 + Math.clamp(apregnancy.fetus.length / 2,1,4);
			break;
			default:
				maxSize += 20;
			break;
		}
		bellySize += pregnancyProgress * maxSize;
	}
	return Math.clamp(bellySize,0,20);
}

const playerEndWaterProgress = () => {
	let pregnancy;
	if(V.player.vaginaExist){
		pregnancy = V.sexStats.vagina.pregnancy;
	}else{
		pregnancy = V.sexStats.anus.pregnancy;
	}
	if(!pregnancy.fetus.length || pregnancy.timer < pregnancy.timerEnd) return false;
	if(!isNaN(pregnancy.waterBreakingTimer) && pregnancy.waterBreakingTimer > 0){
		pregnancy.waterBreakingTimer--;
		if(pregnancy.waterBreakingTimer <= 0){
			pregnancy.waterBreaking = true;
			return true;
		}
		return false;
	}
}
DefineMacro("playerEndWaterProgress", playerEndWaterProgress);

window.isPlayerNonparasitePregnancyEnding = () => {
	return V.sexStats.vagina.pregnancy.waterBreaking || V.sexStats.anus.pregnancy.waterBreaking || false;
}

window.nonparasitePregnancyType = () => {
	if(V.player.vaginaExist){
		return V.sexStats.vagina.pregnancy.type;
	}else{
		return V.sexStats.anus.pregnancy.type;
	}
}

//Used only when the player is about to give birth to their children and the player can name them
const playerEndWaterBreaking = () => {
	V.sexStats.vagina.pregnancy.waterBreaking = null;
	V.sexStats.vagina.pregnancy.waterBreakingTimer = null;
	V.sexStats.anus.pregnancy.waterBreaking = null;
	V.sexStats.anus.pregnancy.waterBreakingTimer = null;
}
DefineMacro("playerEndWaterBreaking", playerEndWaterBreaking);

window.wakingPregnancyEvent = (rng) => {
	let pregnancy;
	if(V.player.vaginaExist){
		pregnancy = V.sexStats.vagina.pregnancy;
	}else{
		pregnancy = V.sexStats.anus.pregnancy;
	}
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let wakingEffects;

	if(playerBellySize(true) >= 8 && !pregnancy.awareOf){
		return "bellySize";
	} else if(!menstruation.awareOfPeriodDelay && V.awareness >= 100 && V.sciencetrait >= 3 && !pregnancy.awareOf && pregnancyStage !== false && between(pregnancy.timer - (menstruation.currentDaysMax - menstruation.currentDay), 4, 8)){
		return "missedPeriod";
	} else if(between(pregnancyStage, 0.9, 1)){
		wakingEffects = "nearBirthEvent";
	} else if(between(pregnancyStage, 0.7, 0.9)){
		wakingEffects = "nearBirth";
	} else if(between(pregnancyStage, 0.4, 0.7) && rng > 50){
		wakingEffects = "midPregnancy";
	} else if(V.pregnancyStats.morningSicknessWaking >= 2){
		wakingEffects = "morningSicknessOnly";
		V.pregnancyStats.morningSicknessWaking = 0;
	} else if(V.pregnancyStats.morningSicknessWaking >= 1 && rng >= 50){
		wakingEffects = "morningSicknessPills";
		V.pregnancyStats.morningSicknessWaking = 0;
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 2 && rng >= 50){
		wakingEffects = "morningSicknessPills";
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 1 && rng >= 75){
		wakingEffects = "mildIssues";
	}

	switch(wakingEffects){
		case "mildIssues": return ["nothing","nothing","lightHeaded","lightHeaded","dizzy","dizzy","dizzy","mildNausea"];
		case "morningSicknessPills": return ["lightHeaded","dizzy","dizzy","dizzy","mildNausea","mildNausea","mildNausea","nausea","headache"];
		case "morningSicknessOnly": return ["lightHeaded","dizzy","sensitiveBreasts","mildNausea","headache","nausea","nausea","nausea","nausea","dryheaving","dryheaving","dryheaving"];
		case "midPregnancy":
			let wakingEffect = ["tired"];
			if(V.submissive >= 1000){
				wakingEffect.push("crying");
			} else {
				wakingEffect.push("angry");
			}
			switch(pregnancy.type){
				case "wolf": wakingEffect.push("meatCraving"); break;
				default: wakingEffect.push("foodCraving"); break;
			}
			return wakingEffect;
		case "nearBirth": return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup"];
		case "nearBirthEvent": return ["lightBabyKick","babyKick","babyMovement","babyHiccup","earlyContractions","earlyContractions"];
	}
	return false;
}

window.dailyPregnancyEvent = (rng) => {
	let pregnancy;
	if(V.player.vaginaExist){
		pregnancy = V.sexStats.vagina.pregnancy;
	}else{
		pregnancy = V.sexStats.anus.pregnancy;
	}
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let dailyEffects;

	if((between(pregnancyStage, 0.9, 0.95) && rng > 80) || (between(pregnancyStage, 0.95, 1) && rng >= 75)){
		dailyEffects = "nearBirthEvent";
	} else if((between(pregnancyStage, 0.7, 0.8) && rng > 85) || (between(pregnancyStage, 0.8, 0.9) && rng >= 80)){
		dailyEffects = "nearBirth";
	} else if((between(pregnancyStage, 0.4, 0.5) && rng > 90) || (between(pregnancyStage, 0.5, 0.7) && rng >= 85)){
		dailyEffects = "midPregnancy";
	} else if(V.pregnancyStats.morningSicknessGeneral >= 2 && rng >= 85){
		dailyEffects = "morningSicknessOnly";
		V.pregnancyStats.morningSicknessGeneral--;
	} else if(V.pregnancyStats.morningSicknessGeneral >= 1 && rng >= 90){
		dailyEffects = "morningSicknessPills";
		V.pregnancyStats.morningSicknessGeneral--;
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 2 && rng >= 90){
		dailyEffects = "morningSicknessPills";
	} else if(["contraceptive","fertility booster"].includes(lastPregPill) && pills.pills[lastPregPill].doseTaken >= 1 && rng >= 95){
		dailyEffects = "mildIssues";
	} else if(menstruation.currentState === "normal" && (menstruation.currentDay < 3 || menstruation.currentDay >= menstruation.currentDaysMax - 1 && rng >= 80)){
		dailyEffects = "periodIssues";
	}

	switch(dailyEffects){
		case "periodIssues": return ["nothing","cramping","bloated","lightHeaded","mildNausea","nausea"];
		case "mildIssues": return ["nothing","lightHeaded","lightHeaded","dizzy","dizzy","dizzy","dizzy","mildNausea"];
		case "morningSicknessPills": return ["lightHeaded","dizzy","dizzy","dizzy","mildNausea","mildNausea","mildNausea","nausea","headache"];
		case "morningSicknessOnly": return ["lightHeaded","dizzy","sensitiveBreasts","mildNausea","headache","nausea","nausea","nausea","nausea","dryheaving","dryheaving","dryheaving"];
		case "midPregnancy":
			let dailyEffect = ["tired"];
			if(V.submissive >= 1000){
				dailyEffect.push("crying");
			} else {
				dailyEffect.push("angry");
			}
			switch(pregnancy.type){
				case "wolf": dailyEffect.push("meatCraving"); break;
				default: dailyEffect.push("foodCraving"); break;
			}
			return dailyEffect;
		case "nearBirth": return ["lightBabyKick", "babyKick", "babyMovement", "babyHiccup"];
		case "nearBirthEvent": return ["lightBabyKick","babyKick","babyMovement","babyHiccup","earlyContractions","earlyContractions"];
	}
	return false;
}
