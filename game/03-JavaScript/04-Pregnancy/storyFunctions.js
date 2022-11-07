//Determins how used to being pregnant the player is
window.playerVaginalPregnancyCheck = () => Math.clamp(V.sexStats.vagina.pregnancy.totalBirthEvents, 0, 4);

//`pregnancyOnly` is there intentially, please make use of it if you add to this function
window.playerBellySize = (pregnancyOnly = false) => {
	let bellySize = 0;
	let pregnancy = V.sexStats.vagina.pregnancy;
	if(pregnancy.fetus.length){
		let pregnancyProgress = Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1)
		let maxSize;
		switch(pregnancy.type){
			case "human":
				maxSize = 18 + Math.clamp(pregnancy.fetus.length,1,3);
			break;
			case "wolf":
				maxSize = 16 + Math.clamp(pregnancy.fetus.length / 2,1,4);
			break;
			default:
				maxSize = 20;
			break;
		}
		bellySize += pregnancyProgress * maxSize;
	}
	return Math.clamp(bellySize,0,20);
}

const playerEndWaterProgress = () => {
	let pregnancy = V.sexStats.vagina.pregnancy;
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

//Used only when the player is about to give birth to their children and the player can name them
const playerEndWaterBreaking = () => {
	V.sexStats.vagina.pregnancy.waterBreaking = null;
	V.sexStats.vagina.pregnancy.waterBreakingTimer = null;
}
DefineMacro("playerEndWaterBreaking", playerEndWaterBreaking);

window.wakingPregnancyEvent = (rng) => {
	const pregnancy = V.sexStats.vagina.pregnancy;
	const menstruation = V.sexStats.vagina.menstruation;
	const pills = V.sexStats.pills;
	const lastPregPill = pills.lastTaken.pregnancy;
	const pregnancyStage = pregnancy.timerEnd ? Math.clamp(pregnancy.timer / pregnancy.timerEnd, 0, 1) : false;
	let wakingEffects;

	if(playerBellySize(true) >= 8 && !pregnancy.awareOf){
		return "bellySize";
	} else if(!pregnancy.awareOfPeriodDelay && V.awareness >= 100 && V.sciencetrait >= 3 && !pregnancy.awareOf && pregnancyStage !== false && between(pregnancy.timer - (menstruation.currentDaysMax - menstruation.currentDay), 4, 8)){
		return "missedPeriod";
	} else if(between(pregnancyStage, 0.9, 1)){
		wakingEffects = "nearBirthEvent";
	} else if(between(pregnancyStage, 0.7, 0.9)){
		wakingEffects = "nearBirth";
	} else if(between(pregnancyStage, 0.4, 0.7) && rng > 50){
		wakingEffects = "midPregnancy";
	} else if(pregnancy.morningSicknessWaking >= 2){
		wakingEffects = "morningSicknessOnly";
		pregnancy.morningSicknessWaking = 0;
	} else if(pregnancy.morningSicknessWaking >= 1 && rng >= 50){
		wakingEffects = "morningSicknessPills";
		pregnancy.morningSicknessWaking = 0;
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
	const pregnancy = V.sexStats.vagina.pregnancy;
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
	} else if(pregnancy.morningSicknessGeneral >= 2 && rng >= 85){
		dailyEffects = "morningSicknessOnly";
		pregnancy.morningSicknessGeneral--;
	} else if(pregnancy.morningSicknessGeneral >= 1 && rng >= 90){
		dailyEffects = "morningSicknessPills";
		pregnancy.morningSicknessGeneral--;
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
