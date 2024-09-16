/* global statDisplay */

const statChange = (() => {
	function paramError(functionName = "", param = "", value, expectedValues = "") {
		if (typeof value === "object") value = JSON.stringify(value);
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
			// Do not apply sensitivity boosts during chef job
			if (sensitivity >= 1 && !V.masturbation_bowl) {
				mod += (sensitivity - 1) * (sensitivity >= 2 ? 0.5 : 1);
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
				case 1:
					insecurity("penis_small", amount);
					return statDisplay.ginsecurity("penis_small");
				case 0:
				case -1:
				case -2:
					insecurity("penis_tiny", amount);
					return statDisplay.ginsecurity("penis_tiny");
			}
		}
		return "";
	}

	function insecurity(type, amount) {
		if (V.statFreeze) return;
		if (isNaN(amount)) paramError("insecurity", "amount", amount, "Expected a number.");
		if (!["penis_tiny", "penis_small", "penis_big", "breasts_tiny", "breasts_small", "breasts_big", "pregnancy"].includes(type)) {
			paramError(
				"insecurity",
				"type",
				type,
				'Expected values include "penis_tiny", "penis_small", "penis_big", "breasts_tiny", "breasts_small", "breasts_big", "pregnancy"'
			);
			return;
		}
		amount = Number(amount);
		if (amount) {
			const insecurityPossible = {
				penis_tiny: V.player.penisExist && V.player.penissize <= 0,
				penis_small: V.player.penisExist && V.player.penissize === 1,
				penis_big: V.player.penisExist && V.player.penissize >= 4,
				breasts_tiny: V.player.gender !== "m",
				breasts_small: true,
				breasts_big: true,
				pregnancy: playerBellySize() >= 8,
			}[type];
			const acceptance = V["acceptance_" + type];
			let insecurity = V["insecurity_" + type];
			if (acceptance < 1000 && insecurityPossible) {
				insecurity = Math.clamp(insecurity + amount, 0, 1000);
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
				V["insecurity_" + type] = insecurity;
				if (amount > 0) {
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
		if (!["penis_tiny", "penis_small", "penis_big", "breasts_tiny", "breasts_small", "breasts_big", "pregnancy"].includes(type)) {
			paramError(
				"acceptance",
				"type",
				type,
				'Expected values include "penis_tiny", "penis_small", "penis_big", "breasts_tiny", "breasts_small", "breasts_big", "pregnancy"'
			);
			return;
		}
		amount = Number(amount);
		if (amount) {
			V["acceptance_" + type] = Math.clamp(V["acceptance_" + type] + amount * 6, 0, 1000);
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
				case 1:
					type = "penis_small";
					break;
				case 0:
				case -1:
				case -2:
					type = "penis_tiny";
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
	};
})();
window.statChange = statChange;
