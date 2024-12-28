/* global statDisplay */

const statChange = (() => {
	function paramError(functionName = "", param = "", value, expectedValues = "") {
		if (typeof value === "object") value = JSON.stringify(value);
		/* Included both types of error reporting, since this often will only occur in a link */
		Errors.report(
			`Unexpected value for the function "${functionName}" in the passage "${V.passage}". Param "${param}" had unexpected value of "${value}".${
				expectedValues ? ` ${expectedValues}` : ""
			}`
		);
		throw new Error(
			`Unexpected value for the function "${functionName}". Param "${param}" had unexpected value of "${value}".${
				expectedValues ? ` ${expectedValues}` : ""
			}`
		);
	}

	function trauma(amount) {
		if (isNaN(amount)) paramError("trauma", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			if (amount >= 0) {
				let traumaMod = 1;

				if (V.rapetrait) traumaMod *= 0.7;
				if (V.bestialitytrait >= 1 && V.enemytype === "beast") traumaMod *= 0.7;
				if (V.tentacletrait >= 1 && V.enemytype === "tentacles") traumaMod *= 0.7;

				// eslint-disable-next-line prettier/prettier
				V.trauma += Math.trunc(((amount * 3) - ((amount * 1.5) * (V.control / V.controlmax))) * traumaMod)
			} else {
				// eslint-disable-next-line prettier/prettier
				V.trauma += Math.trunc((amount * 3) + ((amount * 1.5) * (V.control / V.controlmax)));
			}
		}

		V.sleeptrouble = V.trauma >= 1 ? 1 : 0;
		V.nightmares = V.trauma >= (V.traumamax / 10) * 1 ? 1 : 0;

		if (V.trauma >= (V.traumamax / 10) * 7) {
			V.anxiety = 2;
		} else if (V.trauma >= (V.traumamax / 10) * 2) {
			V.anxiety = 1;
		} else {
			V.anxiety = 0;
		}

		V.flashbacks = V.trauma >= (V.traumamax / 10) * 8 ? 1 : 0;

		if (V.trauma >= (V.traumamax / 10) * 6) {
			V.panicattacks = 2;
		} else if (V.trauma >= (V.traumamax / 10) * 4) {
			V.panicattacks = 1;
		} else {
			V.panicattacks = 0;
		}

		updateHallucinations();

		if (V.trauma >= V.traumamax) {
			V.dissociation = 2;
		} else if (V.trauma >= (V.traumamax / 10) * 9) {
			V.dissociation = 1;
		} else {
			V.dissociation = 0;
		}

		traumaClamp();
	}
	DefineMacro("trauma", trauma);

	function combattrauma(amount) {
		if (isNaN(amount)) paramError("combattrauma", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			if (amount >= 0) {
				let traumaMod = 1;

				if (V.rapetrait) traumaMod *= 0.7;
				if (V.bestialitytrait >= 1 && V.enemytype === "beast") traumaMod *= 0.7;
				if (V.tentacletrait >= 1 && V.enemytype === "tentacles") traumaMod *= 0.7;

				// eslint-disable-next-line prettier/prettier
				V.trauma += Math.trunc(((amount * 1) - ((amount * 0.5) * (V.control / V.controlmax))) * traumaMod)
			} else {
				// eslint-disable-next-line prettier/prettier
				V.trauma += Math.trunc((amount * 1) + ((amount * 0.5) * (V.control / V.controlmax)));
			}
			traumaClamp();
		}
	}
	DefineMacro("combattrauma", combattrauma);

	function straighttrauma(amount) {
		if (isNaN(amount)) paramError("straighttrauma", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.trauma += amount;
			traumaClamp();
		}
	}
	DefineMacro("straighttrauma", straighttrauma);

	function traumaClamp() {
		if (V.trauma >= V.traumamax) V.beauty -= (V.trauma - V.traumamax) / 5;
		if (V.innocencestate === 1 && V.trauma > 0) {
			V.innocencetrauma += V.trauma;
			V.trauma = 0;
		}
		V.trauma = Math.clamp(V.trauma, 0, V.traumamax);
	}
	DefineMacro("traumaclamp", traumaClamp);

	function updateHallucinations() {
		if (V.trauma >= (V.traumamax / 10) * 5 || V.awareness >= 400 || V.hallucinogen > 0 || Time.isBloodMoon() || V.worn.face.type.includes("esoteric")) {
			V.hallucinations = 2;
		} else if (V.trauma >= (V.traumamax / 10) * 3 || V.awareness >= 300) {
			V.hallucinations = 1;
		} else {
			V.hallucinations = 0;
		}
	}
	DefineMacro("updateHallucinations", updateHallucinations);

	function control(amount, combat) {
		if (isNaN(amount)) paramError("control", "amount", amount, "Expected a number.");
		if (V.gamemode === "soft") {
			V.control = V.controlmax;
			V.controlled = 1;
			return;
		}
		amount = Number(amount);
		if (amount) {
			V.control += amount * 10;
			if (combat && V.control >= V.controlstart) V.control = V.controlstart;
			V.controlled = V.control >= (V.controlmax / 5) * 2 ? 1 : 0;
		}
		V.control = Math.clamp(V.control, 0, V.controlmax);
	}
	DefineMacro("control", amount => control(amount));
	DefineMacro("combatcontrol", amount => control(amount, true));

	function corruption(amount, dailyIncrease = false) {
		if (isNaN(amount)) paramError("corruption", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount && numberOfEarSlime()) {
			V.earSlime.corruption += amount;
			V.earSlime.corruption = Math.clamp(V.earSlime.corruption, V.earSlime.growth / 2, 100);

			if (amount > 0 && V.earSlime.growth > 50 && !dailyIncrease) submissive(1);

			if (V.earSlime.corruption >= 60 && !V.earSlime.startedThreats) V.earSlime.startedThreats = true;
		}
	}
	DefineMacro("corruption", corruption);

	function semenvolume(amount) {
		if (isNaN(amount)) paramError("semenvolume", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (V.player.penisExist && amount) {
			amount *= 3;
			if (V.cow >= 6) amount *= 2;

			/* Prevents those who can only have "female climax" increase their cum volume */
			if (V.player.penissize > -2 || amount <= 0) V.semen_volume += amount;

			V.semen_volume = Math.clamp(V.semen_volume, 0, V.semen_max);
		}
	}
	DefineMacro("semenvolume", semenvolume);

	function semenAmount(amount) {
		if (isNaN(amount)) paramError("semenAmount", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.semen_amount = Math.clamp(V.semen_amount + amount, 0, V.semen_volume);
		}
	}
	DefineMacro("semen_amount", semenAmount);

	function milkvolume(amount) {
		if (isNaN(amount)) paramError("milkvolume", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			if (amount > 0) lactationPressure(V.cow >= 6 ? 2 : 1);
			if (V.lactating) {
				if (V.cow >= 6) amount *= 2;
				V.milk_volume = Math.clamp(V.milk_volume + amount, 24, V.milk_max);
			}
		}
	}
	DefineMacro("milkvolume", milkvolume);

	function milkAmount(amount) {
		if (isNaN(amount)) paramError("milkAmount", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.milk_amount = Math.clamp(V.milk_amount + amount, 0, V.milk_volume);
		}
		if (!V.milkFullPain) {
			// Do nothing
		} else if (V.milkFullPain && between(V.milk_amount / V.milk_volume, 0, 0.8)) {
			V.milkFullPain = 0;
		} else if (V.milkFullPain > 225 && between(V.milk_amount / V.milk_volume, 0.85, 0.9)) {
			V.milkFullPain = 255;
		} else if (V.milkFullPain > 250 && between(V.milk_amount / V.milk_volume, 0.9, 0.95)) {
			V.milkFullPain = 250;
		} else if (V.milkFullPain > 275 && between(V.milk_amount / V.milk_volume, 0.95, 0.98)) {
			V.milkFullPain = 275;
		}
	}
	DefineMacro("milk_amount", milkAmount);

	function lactationPressure(amount) {
		if (isNaN(amount)) paramError("lactationPressure", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.lactation_pressure = Math.clamp(V.lactation_pressure + amount, 0, 100);
		}
	}
	DefineMacro("lactation_pressure", lactationPressure);

	function stress(amount, multiplierOverride) {
		if (isNaN(amount)) paramError("stress", "amount", amount, "Expected a number.");
		if (multiplierOverride && isNaN(multiplierOverride)) paramError("stress", "multiplierOverride", multiplierOverride, "Expected a number.");
		amount = Number(amount);
		multiplierOverride = Number(multiplierOverride);
		if (amount) {
			if (multiplierOverride) {
				V.stress += amount * multiplierOverride;
			} else if (amount < 0) {
				// if stress is being lowered, and a custom multiplier was not provided, multiply it by 80
				V.stress += amount * 80;
			} else {
				let stressMod;
				if (V.drunk <= 0) {
					stressMod = 40;
				} else {
					const drunkMod = Math.clamp(Math.floor(V.drunk / 120), 0, 4);
					stressMod = 30 - drunkMod * 5;
				}
				V.stress += amount * stressMod;
			}
		}
	}
	DefineMacro("stress", stress);

	function sensitivity(amount, key) {
		if (isNaN(amount)) paramError("sensitivity", "amount", amount, "Expected a number.");
		amount = Number(amount);
		const sens = V[key + "sensitivity"];
		if (!sens) paramError("sensitivity", "key", key + "sensitivity", "Expected an existing sensitivity.");

		V[key + "sensitivity"] = Math.clamp(sens + amount, 1, 4);
	}

	DefineMacro("breast_sensitivity", amount => sensitivity(amount, "breast"));
	DefineMacro("mouth_sensitivity", amount => sensitivity(amount, "mouth"));
	DefineMacro("genital_sensitivity", amount => sensitivity(amount, "genital"));
	DefineMacro("bottom_sensitivity", amount => sensitivity(amount, "bottom"));

	function arousal(amount, source) {
		if (isNaN(amount)) paramError("arousal", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			let mod = 1;

			// Trait checks & effects
			if (amount > 0 && V.orgasmtrait) mod *= 0.6;

			// adds up to +1 to the  arousal modifier when suffocating
			if (V.choketrait) mod += (V.oxygenmax - V.oxygen) / V.oxygenmax;

			if (V.drugged > 0) {
				/*
					Multiplies the modifier by up to 2x at full bar
					Comment Akoz: I chose to make it multiply, rather than add to the modifier
					so that the aphrodisiacs become quite threatening during nonconsensual use,
					and more thrilling when used intentionally
				*/
				mod *= 1 + V.drugged / 1000;
			}

			// Apply effect according to source
			let sensitivity = 0;
			let arousal;
			switch (source) {
				case undefined:
				case "masturbation":
					// No modifier. The usual behaviour for this widget
					break;
				case "mouth":
				case "oral":
				case "lips":
				case "masturbationMouth":
				case "masturbationOral":
					sensitivity += V.mouthsensitivity;
					break;
				case "breast":
				case "breasts":
				case "chest":
				case "nipple":
				case "nipples":
				case "masturbationBreasts":
				case "masturbationNipples":
					sensitivity += V.breastsensitivity;
					if (playerIsPregnant()) sensitivity += 0.5;
					break;
				case "bottom":
				case "anus":
				case "anal":
				case "ass":
				case "butt":
				case "masturbationAnal":
				case "masturbationAss":
					sensitivity += V.bottomsensitivity;
					break;
				case "genital":
				case "genitals":
				case "penis":
				case "penile":
				case "pussy":
				case "vaginal":
				case "vagina":
				case "masturbationGenital":
				case "masturbationPenis":
				case "masturbationVagina":
					sensitivity += V.genitalsensitivity;
					if (playerIsPregnant()) sensitivity += 0.5;
					break;
				case "maso":
					V.arousalmasochism += amount * mod;
					break;
				case "time":
					arousal = Math.clamp(V.arousal + amount * mod, 0, V.arousalmax);
					if (V.trackedArousal.length > 4) {
						V.trackedArousal.deleteAt(0);
						V.trackedArousal[V.trackedArousal.length - 1] += (arousal * arousal) / (V.arousalmax * 0.8);
					}
					V.trackedArousal.push(0);
					break;
				default:
					paramError("arousal", "source", source, "Expected a string, see function for values");
					break;
			}

			// Adjusts modifier for body part sensitivity, if applicable
			if (amount > 0) {
				let sensitivityMod = (sensitivity - 1) ** 2 / 4;
				// Halve sensitivity boosts during chef job
				// todo: rebalance chef job better
				if (V.masturbation_bowl) sensitivityMod /= 2;
				mod += sensitivityMod;
			}

			// Reduce the mod if masturbating while in heat and/or rut
			if (source && source.includes("masturbation")) {
				mod *= 1 - Math.clamp(playerHeatMinArousal() + playerRutMinArousal(), 0, 4000) / 5000;
			}

			V.arousal += amount * mod * Weather.BodyTemperature.arousalModifier;
			arousalClamp();

			// Add to the tracker
			if (amount > 0) {
				V.trackedArousal[V.trackedArousal.length - 1] += Math.round(amount * mod);
				V.timeSinceArousal = 0;
			}
		}
	}
	DefineMacro("arousal", arousal);
	DefineMacro("breastarousal", amount => arousal(amount, "breasts"));
	DefineMacro("genitalarousal", amount => arousal(amount, "genitals"));

	function arousalClamp() {
		V.arousal = Math.clamp(V.arousal, minArousal(), V.arousalmax);
	}
	DefineMacro("arousalclamp", arousalClamp);

	function minArousal() {
		let result = playerHeatMinArousal() + playerRutMinArousal();

		result += Object.values(V.worn).reduce((prev, curr) => {
			if (curr.type.includes("fetish")) return prev + 150;
			return prev;
		}, 0);

		return Math.clamp(result, 0, 5000);
	}

	function tiredness(amount, source) {
		if (isNaN(amount)) paramError("tiredness", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.tiredness += Math.round(amount * Weather.BodyTemperature.fatigueModifier * (amount > 0 ? 15 : 20));
		}
	}
	DefineMacro("tiredness", tiredness);

	function pain(amount, modifier = 4) {
		if (isNaN(amount)) paramError("pain", "amount", amount, "Expected a number.");
		if (isNaN(modifier)) paramError("pain", "modifier", amount, "Expected a number.");
		amount = Number(amount);
		modifier = Number(modifier);
		if (amount) {
			let pain = amount * modifier;

			if (pain > 0) {
				// science reduction
				pain *= 1 - V.sciencetrait / 10;

				if (V.drunk >= 360) pain *= Math.min(0.95, 0.95 - 0.1 * ((V.drunk - 360) / 640));

				// Including masochism effect for all pain NG v2.7
				if (V.masochism >= 100) {
					pain *= 1 - V.masochism / 1200;
					arousal((amount * V.masochism) / 6, "maso");
				}
			}

			V.pain += pain * Weather.BodyTemperature.painModifier;
		}
		painClamp();
	}
	DefineMacro("pain", pain);

	function masopain(amount) {
		if (isNaN(amount)) paramError("masopain", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.pain += amount * (1 - V.masochism / 1200) * 4;
			arousal(amount * (0 + V.masochism / 18) * 4);
			painClamp();
		}
	}
	DefineMacro("masopain", masopain);

	function painClamp() {
		if (V.gamemode === "soft") {
			V.pain = 0;
		} else {
			V.pain = Math.clamp(V.pain, minPain(), 200);
		}
	}
	DefineMacro("painclamp", painClamp);

	function minPain() {
		let result = 0;

		if (V.lactating && V.breastfeedingdisable === "f" && V.milkFullPain > 200) {
			result += Math.ceil((V.milkFullPain - 200) / 5);
			if (!V.daily.milkFullPainMessage) {
				V.milkFullPainMessage = 1;
				V.effectsmessage = 1;
			}
		}

		if (
			V.earSlime.defyCooldown &&
			(V.worn.genitals.name === "chastity parasite" || V.parasite.penis.name === "parasite" || V.parasite.clit.name === "parasite")
		) {
			result += 25;
		}

		return Math.clamp(result, 0, 50);
	}

	function detention(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("detention", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			if (amount > 0) V.detention += amount * 10;
			V.delinquency = Math.clamp(V.delinquency + amount * 4, 0, 1000);
		}
	}
	DefineMacro("detention", detention);

	function delinquency(amount, source) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("delinquency", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			if (source === "bonus") {
				// find how many visible, non-mandatory school clothes are equipped, and add 1
				const multi = getVisibleClothesList().reduce(
					(mult, slot) => mult + (slot.type && slot.type.includes("school") && !["upper", "lower"].includes(slot.name)),
					1
				);
				V.delinquency += multi >= 1 ? amount * multi : 0;
			} else {
				V.delinquency += amount * 4;
			}
			V.delinquency = Math.clamp(V.delinquency, 0, 1000);
		}
	}
	DefineMacro("delinquency", delinquency);

	function status(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("status", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount > 0) {
			V.cool += amount;

			// ind how many visible clothes have "cool" in their type (if they have type), and add 1
			const multi = getVisibleClothesList().reduce((mult, slot) => mult + (slot.type && slot.type.includes("cool")), 1);
			V.cool += amount * multi;
		} else if (amount < 0) {
			V.cool *= 1 + amount / 100;
			V.cool--;
		}
		V.cool = Math.clamp(V.cool, 0, V.coolmax);
	}
	DefineMacro("status", status);

	function spray(amount) {
		if (isNaN(amount)) paramError("spray", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount > 0) {
			V.spray += amount;
		} else if (amount && !V.infinitespray) {
			if (V.prof.spray >= random(1, 5000)) {
				V.effectsmessage = 1;
				V.prof_spray_message = 1;
			} else {
				V.spray += amount;
				prof("spray", amount * -5);
			}
		}
		V.spray = Math.clamp(V.spray, 0, V.spraymax);
	}
	DefineMacro("spray", spray);

	function awareness(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("awareness", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			const mod = Object.values(V.worn).reduce((prev, item) => {
				if (item.type.includes("dark")) return prev + 1;
				return prev;
			}, 1);

			V.awareness = Math.clamp(V.awareness + amount * mod, -200, 1000);
		}
	}
	DefineMacro("awareness", awareness);

	function purity(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("purity", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			const mod = Object.values(V.worn).reduce((prev, item) => {
				if (item.type.includes("holy")) return prev + 1;
				return prev;
			}, 1);
			const max = V.virginityProtected || (V.player.virginity.vaginal === true && V.player.virginity.penile === true) ? 1000 : 999;
			V.purity = Math.clamp(V.purity + amount * mod, 0, max);
		}
	}
	DefineMacro("purity", purity);

	function suspicion(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("suspicion", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.suspicion = (V.suspicion || 0) + amount;
		}
	}
	DefineMacro("suspicion", suspicion);

	function asylumstatus(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("asylumstatus", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.asylumstatus = (V.asylumstatus || 0) + amount;
		}
	}
	DefineMacro("asylumstatus", asylumstatus);

	function humiliation10() {
		stress(40, 1);
		trauma(1);
	}
	DefineMacro("humiliation10", humiliation10);

	function wolfpacktrust() {
		V.wolfpacktrust++;
		return statDisplay.statChange("무리가 당신을 조금 더 신뢰하게 되었다.", 0, "green");
	}

	function wolfpackfear() {
		V.wolfpackfear++;
		return statDisplay.statChange("무리가 당신을 조금 더 두려워하게 되었다.", 0, "green");
	}

	function ferocity(amount) {
		if (isNaN(amount)) paramError("ferocity", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.wolfpackferocity = (V.wolfpackferocity || 0) + amount;
			if (amount > 0) {
				return statDisplay.statChange("흉포", Math.clamp(amount, 1, 3), "blue");
			} else if (amount < 0) {
				return statDisplay.statChange("흉포", Math.clamp(amount, -3, -1), "purple");
			}
		}
		return "";
	}

	function harmony(amount = 1) {
		if (isNaN(amount)) paramError("harmony", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.wolfpackharmony = (V.wolfpackharmony || 0) + amount;
			if (amount > 0) {
				return statDisplay.statChange("조화", Math.clamp(amount, 1, 3), "lblue");
			} else if (amount < 0) {
				return statDisplay.statChange("조화", Math.clamp(amount, -3, -1), "pink");
			}
		}
		return "";
	}

	function submissive(amount, modifier = 4) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("submissive", "amount", amount, "Expected a number.");
		if (isNaN(modifier)) paramError("submissive", "modifier", modifier, "Expected a number.");
		amount = Number(amount);
		modifier = Number(modifier);
		if (amount && modifier) {
			V.submissive = Math.clamp(V.submissive + amount * modifier, 0, 2000);
			subCheck();
		}
	}
	DefineMacro("sub", (amount, modifier) => submissive(amount, modifier));
	DefineMacro("def", (amount, modifier) => submissive(-amount, modifier));

	function subCheck() {
		if (V.speech_attitude === "bratty" && V.submissive >= 1150) {
			V.speech_attitude = "neutral";
			V.effectsmessage = 1;
			V.speech_attitude_bratty_message = 1;
		} else if (V.speech_attitude === "meek" && V.submissive <= 850) {
			V.speech_attitude = "neutral";
			V.effectsmessage = 1;
			V.speech_attitude_meek_message = 1;
		}
	}
	DefineMacro("sub_check", subCheck);

	function gainPenisInsecurity(amount = 10) {
		if (V.statFreeze) return "";
		if (isNaN(amount)) paramError("gainPenisInsecurity", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			switch (V.player.penissize) {
				case 4:
					insecurity("penis_big", amount);
					return statDisplay.ginsecurity("penis_big");
				case 3:
					if (V.player.gender !== "m") {
						insecurity("penis_big", amount);
						return statDisplay.ginsecurity("penis_big");
					}
					break;
				case 1:
					insecurity("penis_small", amount);
					return statDisplay.ginsecurity("penis_small");
				case 0:
					insecurity("penis_small", Math.floor(amount * 1.5));
					return statDisplay.ginsecurity("penis_small");
				case -1:
					insecurity("penis_small", Math.floor(amount * 2));
					return statDisplay.ginsecurity("penis_small");
				case -2:
					insecurity("penis_small", Math.floor(amount * 2.5));
					return statDisplay.ginsecurity("penis_small");
			}
		}
		return "";
	}

	function gainBreastInsecurity(amount = 5) {
		if (V.statFreeze) return "";
		if (isNaN(amount)) paramError("gainBreastInsecurity", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			if (V.player.breastsize >= 8) {
				insecurity("breasts_big", amount);
				return statDisplay.ginsecurity("breasts_big");
			} else {
				insecurity("breasts_small", Math.floor(amount));
				return statDisplay.ginsecurity("breasts_small");
			}
		}
		return "";
	}

	function insecurity(type, amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("insecurity", "amount", amount, "Expected a number.");
		if (!["penis_small", "penis_big", "breasts_small", "breasts_big", "pregnancy"].includes(type)) {
			paramError("insecurity", "type", type, 'Expected values include "penis_small", "penis_big", "breasts_small", "breasts_big", "pregnancy"');
			return;
		}
		amount = Number(amount);
		if (amount) {
			// Male players always gain insecurity when breast size is above 0
			if (V.player.gender === "m" && type === "breasts_small") type = "breasts_big";

			const insecurityPossible = {
				penis_small: V.player.penisExist && V.player.penissize <= 1,
				penis_big: V.player.penisExist && V.player.penissize >= (V.player.gender === "m" ? 4 : 3),
				breasts_small: V.player.gender === "f" && between(V.player.breastsize, 0, 4),
				breasts_big: V.player.breastsize >= (V.player.gender === "m" ? 1 : 8),
				pregnancy: playerBellySize() >= 8,
			}[type];
			const acceptance = V["acceptance_" + type];
			let insecurity = V["insecurity_" + type];
			if ((acceptance < 1000 && insecurityPossible) || amount < 0) {
				insecurity = Math.clamp(insecurity + amount, 0, 1000);
				V["insecurity_" + type] = insecurity;

				if (amount > 0) {
					switch (Math.floor(insecurity / 200)) {
						case 5:
							stress(3);
							control(-3);
							break;
						case 4:
							stress(3);
							control(-2);
							break;
						case 3:
							stress(2);
							control(-2);
							break;
						case 2:
							stress(2);
							control(-1);
							break;
						case 1:
							stress(1);
							control(-1);
							break;
						case 0:
							stress(1);
							break;
					}
					// reduce acceptance by matching amount
					V["acceptance_" + type] = Math.clamp(acceptance - amount, 0, 1000);
				}
			}
		}
	}
	DefineMacro("insecurity", insecurity);

	function acceptance(type, amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("acceptance", "amount", amount, "Expected a number.");
		if (!["penis_small", "penis_big", "breasts_small", "breasts_big", "pregnancy"].includes(type)) {
			paramError("acceptance", "type", type, 'Expected values include "penis_small", "penis_big", "breasts_small", "breasts_big", "pregnancy"');
			return;
		}
		amount = Number(amount);
		if (amount) {
			// Male players always gain insecurity when breast size is above 0
			if (V.player.gender === "m" && type === "breasts_small") type = "breasts_big";
			// eslint-disable-next-line prettier/prettier
			const insecurityMod = amount > 0 ? (Math.ceil(V["insecurity_" + type] / 200) + 1) : 1;

			// eslint-disable-next-line prettier/prettier
			V["acceptance_" + type] = Math.clamp(V["acceptance_" + type] + (amount * insecurityMod), 0, 1000);
		}
	}
	DefineMacro("acceptance", acceptance);

	function gainPenisAcceptance(amount) {
		if (V.statFreeze) return "";
		if (isNaN(amount)) paramError("gainPenisAcceptance", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount > 0) {
			let type;
			switch (V.player.penissize) {
				case 4:
					type = "penis_big";
					break;
				case 3:
					if (V.player.gender !== "m") type = "penis_big";
					break;
				case 1:
				case 0:
				case -1:
				case -2:
					type = "penis_small";
					break;
			}
			if (type && V["insecurity_" + type] > 0 && V["acceptance_" + type] < 1000) {
				acceptance(type, amount);
				if (V["acceptance_" + type] >= 1000) T.acceptanceAchieved = type;
				return statDisplay.gacceptance();
			}
		}
		return "";
	}

	function willpower(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("willpower", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.willpower = Math.clamp(V.willpower + amount * 2, 0, V.willpowermax);
		}
	}
	DefineMacro("willpower", willpower);

	function hope(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("hope", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.orphan_hope = Math.clamp(V.orphan_hope + amount * 2, -50, 50);
		}
	}
	DefineMacro("hope", hope);

	function reb(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("reb", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.orphan_reb = Math.clamp(V.orphan_reb + amount * 2, -50, 50);
		}
	}
	DefineMacro("reb", reb);

	function grace(amount, expectedRank) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("grace", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			let modifyGrace = true;

			// Optional second variable is the rank of the NPC giving the order, or when the player is expected to meet a higher standard. Grace changes won't apply if the player's rank equals or exceeds the expected rank
			const ranks = ["prospective", "initiate", "monk", "priest", "bishop"];
			const playerRankValue = ranks.indexOf(V.temple_rank);
			const expectedRankValue = ranks.indexOf(expectedRank);
			if (expectedRankValue > 1) {
				if (playerRankValue >= expectedRankValue) modifyGrace = false;

				// Below might be a more interesting way to handle it, remove the above line and uncomment the below to enable. Lollipop Scythe
				// Allows the player to gain grace in events only if they are below a certain rank
				// if (amount > 0 && playerRankValue >= expectedRankValue) modifyGrace = false;

				// Allows the player to lose grace in events only if they are at or above a certain rank
				// if (amount < 0 && playerRankValue < expectedRankValue) modifyGrace = false;
			}

			if (modifyGrace) {
				V.grace = Math.clamp((V.grace || 0) + amount, -100, 100);
				if (amount > 0) V.daily.graceUp = true;
			}
		}
	}
	DefineMacro("grace", grace);

	function livestockObey(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("livestockObey", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.livestock_obey = Math.clamp((V.livestock_obey || 0) + amount, 0, 100);
		}
	}
	DefineMacro("livestock_obey", livestockObey);

	function shame(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("shame", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.shame = Math.clamp((V.shame || 0) + amount, 0, 100);
		}
	}
	DefineMacro("shame", shame);

	function farmYield(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("farmYield", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.farm_yield = (V.farm_yield || 0) + amount;
		}
	}
	DefineMacro("farm_yield", farmYield);

	function skill(type, amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("skill", "amount", amount, "Expected a number.");
		if (
			![
				"oralskill",
				"vaginalskill",
				"penileskill",
				"handskill",
				"analskill",
				"feetskill",
				"bottomskill",
				"thighskill",
				"chestskill",
				"beauty",
				"seductionskill",
				"skulduggery",
			].includes(type)
		) {
			paramError(
				"skill",
				"type",
				type,
				'Expected values include "oralskill", "vaginalskill", "penileskill", "handskill", "analskill", "feetskill", "bottomskill", "thighskill", "chestskill", "beauty", "seductionskill" and "skulduggery"'
			);
			return;
		}
		if (type === "penileskill" && !(V.player.penisExist || playerHasStrapon())) return;
		amount = Number(amount);
		if (amount) {
			V[type] = Math.clamp(V[type] + amount, 0, V[type + "max"] || 1000);
		}
	}
	DefineMacro("oralskill", amount => skill("oralskill", amount));
	DefineMacro("vaginalskill", amount => skill("vaginalskill", amount));
	DefineMacro("penileskill", amount => skill("penileskill", amount));
	DefineMacro("handskill", amount => skill("handskill", amount));
	DefineMacro("analskill", amount => skill("analskill", amount));
	DefineMacro("feetskill", amount => skill("feetskill", amount));
	DefineMacro("bottomskill", amount => skill("bottomskill", amount));
	DefineMacro("thighskill", amount => skill("thighskill", amount));
	DefineMacro("chestskill", amount => skill("chestskill", amount));
	DefineMacro("beauty", amount => skill("beauty", amount));
	DefineMacro("seductionskill", amount => skill("seductionskill", amount));
	DefineMacro("skulduggery", amount => skill("skulduggery", amount));

	function prof(skill, amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("prof", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.prof[skill] = Math.clamp((V.prof[skill] || 0) + amount * 5, 0, 1000);
		}
	}
	DefineMacro("prof", prof);

	function lockerSuspicion(amount = 1) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("lockerSuspicion", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.locker_suspicion = (V.locker_suspicion || 0) + amount;
		}
	}
	DefineMacro("locker_suspicion", lockerSuspicion);

	function alcohol(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("alcohol", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			let mod = 1;
			if (V.backgroundTraits.includes("plantlover") && amount > 0) mod = 1.5;
			V.drunk = Math.clamp(V.drunk + amount * mod, 0, 1000);
		}
	}
	DefineMacro("alcohol", alcohol);

	function drugs(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("drugs", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			let mod = 1;
			if (V.backgroundTraits.includes("plantlover") && amount > 0) mod = 1.5;
			V.drugged = Math.clamp(V.drugged + amount * mod, 0, 1000);
		}
	}
	DefineMacro("drugs", drugs);

	function hallucinogen(amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("hallucinogen", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (amount) {
			V.hallucinogen = Math.clamp(V.hallucinogen + amount, 0, 1000);
		}
	}
	DefineMacro("hallucinogen", hallucinogen);

	function wet(type, amount) {
		if (isNaN(amount)) paramError("wet", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (!["upper", "lower", "under_upper", "under_lower", "underupper", "underlower"].includes(type)) {
			paramError("wet", "type", type, 'Expected values include "upper", "lower", "under_upper", "under_lower", "underupper" and "underlower"');
			return;
		}
		type = type.replace(/_/g, "");
		if (amount) {
			V[type + "wet"] = Math.clamp(V[type + "wet"] + amount, 0, 200);
		}
	}
	DefineMacro("upperwet", amount => wet("upper", amount));
	DefineMacro("lowerwet", amount => wet("lower", amount));
	DefineMacro("underupperwet", amount => wet("underupper", amount));
	DefineMacro("underlowerwet", amount => wet("underlower", amount));

	function worldCorruption(type, amount) {
		if (isNaN(amount)) paramError("worldCorruption", "amount", amount, "Expected a number.");
		amount = Number(amount);
		if (!["hard", "soft"].includes(type)) {
			paramError("worldCorruption", "type", type, 'Expected values include "hard" and "soft"');
			return;
		}
		if (amount) {
			if (type === "hard") {
				V.world_corruption_hard = Math.clamp(V.world_corruption_hard + amount, -30, 30);
			} else {
				V.world_corruption_soft += amount;
				let overflow = 0;
				if (V.world_corruption_soft < 0) overflow = V.world_corruption_soft;

				// Unclamp or adjust upper limit once world corruption effects are added
				V.world_corruption_soft = Math.clamp(V.world_corruption_soft, 0, 100);

				if (amount < 0) {
					if (overflow) V.world_corruption_reduced -= overflow;
					V.world_corruption_reduced -= amount;
				}
			}
		}
	}
	DefineMacro("world_corruption", worldCorruption);

	function money(amount, source, optional = {}) {
		if (isNaN(amount)) paramError("money", "amount", amount, "Expected a number.");
		if (!(typeof source === "string" || source instanceof String || source === undefined))
			paramError("money", "source", source, "Expected a string or undefined.");
		if (!(typeof optional === "object" && optional !== null)) paramError("money", "optional", optional, "Expected a object.");
		amount = Number(amount);

		if (!Number.isFinite(amount)) {
			paramError("money", "amount", amount, "Expected a valid number.");
			return;
		}
		if (!optional.recordOnly) {
			if (amount < 0 && V.money + amount < 0) {
				/* Included both types of error reporting, since this often will only occur in a link */
				Errors.report(`Unexpected use for the function "money" in the passage "${V.passage}". Player doesn't have enough money to spend.`);
				throw new Error(`Unexpected use for the function "money". Player doesn't have enough money to spend.`);
			}

			V.money += amount;
		}
		if (!source || source === "prostitution") {
			const mod = source === "prostitution" ? "Prostitution" : "";
			switch (V.location) {
				case "farm":
				case "alex_farm":
				case "alex_cottage":
					source = "farm" + mod;
					break;
				case "dance_studio":
					source = "danceStudio" + mod;
					break;
				case "moor":
				case "bog":
				case "castle":
				case "tower":
					source = "moor" + mod;
					break;
				case "riding_school":
					source = "ridingSchool" + mod;
					break;
				case "strip_club":
					source = "stripClub" + mod;
					break;
				case "forest":
				case "lake":
				case "old_temple":
				case "lake_ruin":
				case "wolf_cave":
				case "cabin":
				case "forest_shop":
				case "catacombs":
				case "churchyard":
				case "sepulchre":
					source = "forest" + mod;
					break;
				case "dilapidated_shop":
				case "adult_shop":
					source = "adultShop" + mod;
					break;
				case "town":
				case "home":
				case "police_station":
				case "oak":
				case "night_monster_lair":
				case "industrial":
				case "estate":
				case "shopping_centre":
				case "alley":
				case "park":
				case "drain":
				case "sewers":
				case "beech":
				case "sea":
				case "kylarmanor":
					source = "town" + mod;
					break;
				case "studio":
					source = "photoStudio" + mod;
					break;
				case "pirate_ship":
					source = "pirates" + mod;
					break;
				case "school":
				case "school_rear_courtyard":
				case "pool":
					source = "school" + mod;
					break;
				case "office":
				case "office_building":
				case "officeBuilding":
					source = "office" + mod;
					break;
				case "canal":
					source = "flatsCanal" + mod;
					break;
				default:
					source = V.location + mod;
					break;
			}
		}

		if (!source) source = "unknown"; // Should be unreachable, but there just in case
		// eslint-disable-next-line no-undef
		source = toCamelCase(source);

		const type = amount > 0 ? "earned" : "spent";
		amount = Math.abs(amount);

		if (!V.moneyStats[source]) V.moneyStats[source] = { earned: 0, earnedCount: 0, spent: 0, spentCount: 0 };
		V.moneyStats[source][type] += amount;
		V.moneyStats[source][type + "Count"]++;
		V.moneyStats[source][type + "TimeStamp"] = Time.date.timeStamp;
	}
	DefineMacro("money", money);

	/*
		Using a similar source to above, you'll be able to generate 'hourly rates' in the money statistics.
		See the 'Cafe' and 'Cafe Work' passages and `timeTrackingEndCafe` widget for example usage usage
	*/
	function timeTracking(source, startTracking) {
		if (!(typeof source === "string" || source instanceof String)) paramError("timeTracking", "source", source, "Expected a string.");

		if (!V.timeStats[source]) {
			V.timeStats[source] = { total: 0, trackedStart: 0 };
		}
		if (startTracking) {
			V.timeStats[source].trackedStart = Time.date.timeStamp;
		} else if (V.timeStats[source].trackedStart) {
			// Clamped to 24 hours to prevent crazy values from occuring
			V.timeStats[source].total += Math.clamp(Time.date.timeStamp - V.timeStats[source].trackedStart, 0, 3600 * 24);
			V.timeStats[source].trackedStart = 0;
		}
	}
	DefineMacro("timeTrackingStart", source => timeTracking(source, true));
	DefineMacro("timeTrackingEnd", source => timeTracking(source));

	function timeTrackingManual(source, amount, timeType = "hour") {
		if (isNaN(amount)) paramError("timeTrackingManual", "amount", amount, "Expected a number.");
		if (!(typeof source === "string" || source instanceof String)) paramError("timeTrackingManual", "source", source, "Expected a string.");
		if (!["hour", "minute", "second"].includes(timeType))
			paramError("timeTrackingManual", "timeType", timeType, "Expected a string of either 'hour', 'minute' or 'second'.");

		amount = Number(amount);
		if (Number.isFinite(amount)) {
			if (!V.timeStats[source]) {
				V.timeStats[source] = { total: 0, trackedStart: 0 };
			}
			if (timeType === "hour") amount *= 3600;
			if (timeType === "minute") amount *= 60;

			// Clamped to 24 hours to prevent crazy values from occuring
			V.timeStats[source].total += Math.clamp(amount, 0, 3600 * 24);
		}
	}
	DefineMacro("timeTrackingManual", (source, amount, timeType) => timeTrackingManual(source, amount, timeType));

	function timeTrackingTotal(source, timeType = "hour") {
		if (!(typeof source === "string" || source instanceof String)) paramError("timeTrackingTotal", "source", source, "Expected a string.");
		if (!["hour", "minute", "second"].includes(timeType))
			paramError("timeTrackingTotal", "timeType", timeType, "Expected a string of either 'hour', 'minute' or 'second'.");

		if (!V.timeStats[source]?.total || (T.timeTrackingSnapshotOveride && !V.moneyStatsSnapshot?.time[source])) return 0;

		let multiplier = 1;
		if (timeType === "hour") multiplier = 3600;
		if (timeType === "minute") multiplier = 60;

		// Override that returns a value when looking for the snapshot value
		if (T.timeTrackingSnapshotOveride && V.moneyStatsSnapshot?.time[source]) return V.moneyStatsSnapshot?.time[source].total / multiplier;

		return V.timeStats[source].total / multiplier;
	}

	function badEndTracking(source, optional = {}) {
		// Disabled during a replay
		if (V.replayScene) return false;
		const lastBadEnd = V.badEndStats.last();

		// Attempted to start tracking, but the previous tracking wasn't stopped
		if (lastBadEnd && !lastBadEnd.trackedEnd) {
			badEndTracking(lastBadEnd.source, {
				reason: "unknown",
				notes: `Not tracked in passage ${V.passage}, likely from an error`,
			});
		}

		const newBadEnd = {
			source,
			trackedStart: Time.date.timeStamp,
			trackedEnd: undefined,
		};
		if (optional.reason) newBadEnd.reasonStart = optional.reason;
		if (optional.notes) newBadEnd.notesStart = optional.notes;
		V.badEndStats.push(newBadEnd);
	}
	DefineMacro("badEndTracking", (source, optional) => badEndTracking(source, optional));

	function badEndTrackingEnd(source, optional = {}) {
		// Disabled during a replay
		if (V.replayScene) return false;
		let lastBadEnd = V.badEndStats.last();

		// Attempted to end tracking, but either tracking doesnt exist, the trackingEnd has already been set or the source doesn't match
		if (!lastBadEnd || lastBadEnd.source !== source || lastBadEnd.trackedEnd) {
			badEndTracking(source, {
				reason: "unknown",
				notes: `Not correctly tracked in passage ${V.passage}, ${V.badEndStats.length ? "likely from an error" : "likely from loading an old save"}`,
			});
			lastBadEnd = V.badEndStats.last();
		}

		lastBadEnd.trackedEnd = Time.date.timeStamp;
		if (optional.reason) lastBadEnd.reasonEnd = optional.reason;
		if (optional.notes) lastBadEnd.notesEnd = optional.notes;
	}
	DefineMacro("badEndTrackingEnd", (source, optional) => badEndTrackingEnd(source, optional));

	return {
		trauma,
		combattrauma,
		straighttrauma,
		traumaClamp,
		updateHallucinations,
		control,
		corruption,
		semenvolume,
		semenAmount,
		milkvolume,
		milkAmount,
		lactationPressure,
		stress,
		sensitivity,
		arousal,
		arousalClamp,
		minArousal,
		tiredness,
		pain,
		masopain,
		painClamp,
		minPain,
		detention,
		delinquency,
		status,
		spray,
		awareness,
		purity,
		suspicion,
		asylumstatus,
		humiliation10,
		wolfpacktrust,
		wolfpackfear,
		ferocity,
		harmony,
		submissive,
		subCheck,
		gainPenisInsecurity,
		gainBreastInsecurity,
		insecurity,
		acceptance,
		gainPenisAcceptance,
		willpower,
		hope,
		reb,
		grace,
		livestockObey,
		shame,
		farmYield,
		skill,
		prof,
		lockerSuspicion,
		alcohol,
		drugs,
		hallucinogen,
		wet,
		worldCorruption,
		money,
		timeTracking,
		timeTrackingManual,
		timeTrackingTotal,
		badEndTracking,
		badEndTrackingEnd,
	};
})();
window.statChange = statChange;
