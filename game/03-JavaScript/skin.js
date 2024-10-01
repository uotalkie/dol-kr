/* Move to player class later */

const Sunscreen = (() => {
	function getDuration() {
		return TimeConstants.secondsPerDay;
	}

	function apply() {
		const { sunscreen } = V.player.skin;
		if (sunscreen.usesLeft <= 0) return;
		sunscreen.lastsUntil = V.timeStamp + getDuration();
		sunscreen.usesLeft = Math.max(0, sunscreen.usesLeft - 1);
	}

	function isApplied() {
		const { sunscreen } = V.player.skin;
		if (sunscreen.lastsUntil && V.timeStamp < sunscreen.lastsUntil) return true;
		delete sunscreen.lastsUntil;
		return false;
	}

	return {
		/** Total duration of one use of sunscreen, in seconds */
		get duration() {
			return getDuration();
		},
		get bottle() {
			return {
				price: 1500,
				uses: 15,
			};
		},
		apply,
		remove() {
			delete V.player.skin.sunscreen.lastsUntil;
		},
		isApplied,
		get timeLeft() {
			const { lastsUntil } = V.player.skin.sunscreen;
			return lastsUntil ? Math.max(0, lastsUntil - V.timeStamp) : 0;
		},
		/** @returns {number} */
		get usesLeft() {
			return V.player.skin.sunscreen.usesLeft;
		},
		/** @param {number} [uses] */
		addUses(uses) {
			V.player.skin.sunscreen.usesLeft += uses ?? this.bottle.uses;
		},
	};
})();

/*
	Skin.tanningBonus: Value between 0 and 1. The bonus exists until time has been passed.
*/
const Skin = (() => {
	// Constants
	const defaultModel = ["main", "sidebar"];
	const defaultLayer = { layers: [], slots: {} };
	const tanningMultiplier = 9; // Increase to make the tanning function even out more sharply (as the tan level increases)
	const scalingFactor = 0.033; // Decrease for slower tanning gain from sun intensity
	const tanningLossPerMinute = 0.000695; // ~1 per day - ~100 days from 100% to 0%
	const maxLayerGroups = 6;

	// Properties
	const cachedLayers = null;
	let accumulatedValue = 0;

	/**
	 * Only run this from time.js
	 *
	 * TANNING GAIN/DECAY:
	 * - Logarithmic gain: Tanning gain slows down the higher it is.
	 * - The logarithmic curve is based on the worn layer group at the time of tanning - so having a high value on a different group won't affect the current one.
	 * - If the total tanning value exceeds 100, the gain will be capped at 100, and any excess will be treated as tanning loss (to all groups except the one that gets the tanning gain)
	 * - Tanning decay is linear over time.
	 * - If a group gains tanning during the same time - only that group won't lose tanning.
	 * - If a group loses tanning to below 0, that group will be removed.
	 * - If tanning loss is higher than a group's value (causing it to be removed), the remainder will be distributed as a loss to the other layers.
	 * - If more than 60 minutes pass at once - divide the tanning calculations into 60-minute chunks.
	 *   This is to follow the logarithmic curve more closely, and more realistically follow the day/night sun intensity cycle.
	 * - Limit of 10 layer groups. If 10 groups exist, and we want to add another one, remove the group with the lowest value, and distribute its value to the remaining groups.
	 *
	 * RENDERING:
	 * - Canvas needs to be rendered once in order for the layers to be saved for the tanning masks. (see limitations below)
	 * - Layer groups are created after the canvas has been readied for renderering (but before its rendered), in a new postprocess function.
	 * - Each layer group consist of the clothes being worn at the time of tanning - minus head, and handheld.
	 * - Layer groups are converted to their own canvas masks.
	 * - Animations are removed for all layers except for arms, and upper. (to avoid moving tan-lines)
	 * - Canvas masks are cached to avoid reloading them unecessarily.
	 * - They are re-cached only if the src layer has been changed. (E.g. if hand position goes from idle to cover)
	 * - If no clothes are applied when tanning - an empty layer group (with an empty mask) will be applied instead - causing the whole body to get tanned.
	 * - If there are multiple layer groups - apply the one with the highest value first. The remaining layers are applied on top, with their respective alpha value.
	 *
	 * @param {number} minutes
	 */
	function applyTanningGain(minutes) {
		// Use event to wait for renderer before applying gain
		$(document).one(":passageend", () => {
			const model = Renderer.locateModel(...defaultModel);
			const savedLayers = V.player.skin.layers;
			const nextTime = new DateTime(Time.date);

			if (!model.tanningLayers?.layers) {
				console.warn("applyTanningGain: CanvasModel not found.");
				return;
			}

			// If more than 60 minutes have passed, process tanning in chunks
			while (minutes > 0) {
				const chunkMinutes = Math.min(60, minutes);
				minutes -= chunkMinutes;

				const gainAmount = chunkMinutes * getTanningFactor(Skin.tanningBed).result;
				if (gainAmount === 0) continue;

				const currentTan = getTanningValue(savedLayers);
				const current = getCurrentLayers(model, savedLayers);
				const selectedLayers = setLayers(savedLayers, current);

				const logFactorGain = 1 / Math.log1p((selectedLayers.value / 100) * tanningMultiplier + 1);
				let tanningGain = gainAmount * logFactorGain * scalingFactor;

				// Handle tanning gain and ensure the total tanning value does not exceed 100
				if (currentTan + tanningGain >= 100) {
					lowerTanningInLayers(savedLayers, currentTan + tanningGain - 100, savedLayers.indexOf(selectedLayers));
					tanningGain = 100 - currentTan;
				}

				// Apply tanning gain if there's any
				if (tanningGain > 0) {
					selectedLayers.value += tanningGain;
					accumulatedValue += tanningGain;
				}

				nextTime.addMinutes(chunkMinutes);
			}

			// Distribute lowest if layers become more than maxLayerGroups
			if (savedLayers.length > maxLayerGroups) {
				const lowestValueGroup = savedLayers.reduce((min, group) => (group.value < min.value ? group : min), savedLayers[0]);
				const index = savedLayers.indexOf(lowestValueGroup);
				if (index !== -1) {
					const [removedGroup] = savedLayers.splice(index, 1);
					const valueToDistribute = removedGroup.value / savedLayers.length;
					savedLayers.forEach(group => (group.value += valueToDistribute));
				}
			}

			// Reset bonus and other modifiers after time passes
			Skin.tanningBonus = 0;
			Skin.tanningBed = false;

			if (accumulatedValue > 0.1) {
				Skin.recache();
			}
		});
	}

	function applyTanningLoss(minutes) {
		const savedLayers = V.player.skin.layers;
		const totalTanningLoss = minutes * tanningLossPerMinute;

		// Reduce tanning on all layers equally
		if (savedLayers.length > 0) {
			lowerTanningInLayers(savedLayers, totalTanningLoss);
		}
		if (totalTanningLoss > 0.1) Skin.recache();
	}

	function lowerTanningInLayers(groups, totalTanningLoss, skipIndex = -1) {
		const totalValue = groups.reduce((sum, group, index) => sum + (index !== skipIndex ? group.value : 0), 0);

		// If reduction is to 0 or below, remove all layers, unless skipped
		if (totalTanningLoss >= totalValue) {
			groups.splice(0, groups.length, ...(skipIndex !== -1 ? [groups[skipIndex]] : []));
			return;
		}

		let remainingLoss = totalTanningLoss;
		let totalDistributedLoss = 0;
		// Distribute the loss among the layers until the remaining loss is zero
		// Adjust for floating point errors
		while (round(remainingLoss, 8) > 0) {
			let layerCount = 0;
			const lossPerLayer = remainingLoss / (groups.length - (skipIndex >= 0 ? 1 : 0));
			for (let i = groups.length - 1; i >= 0; i--) {
				const group = groups[i];

				if (groups.indexOf(group) === skipIndex) continue;

				if (group.value > 0) {
					layerCount++;
					const actualLoss = Math.min(lossPerLayer, group.value);
					const roundedLoss = round(group.value - actualLoss, 8);
					remainingLoss -= actualLoss;
					totalDistributedLoss += group.value - roundedLoss;
					group.value = roundedLoss;
				}

				// Remove group if it drops to 0
				if (group.value <= 0) {
					remainingLoss += -group.value;
					groups.splice(i, 1);
				} else {
					group.value = round(group.value, 8);
				}
			}
			if (layerCount === 0) {
				break;
			}
		}
		// Distribute the remaining value from rounding into the first element
		const adjustment = round(totalTanningLoss - totalDistributedLoss, 8);
		if (groups.length > 0) {
			groups[0].value = round(groups[0].value + adjustment, 8);
		}
	}

	function getCurrentLayers(model, savedLayers) {
		const index = tryGetMatchingLayer(savedLayers, model.tanningLayers);
		if (index !== null) {
			return { index, layers: savedLayers[index].layers, slots: savedLayers[index].slots };
		}
		return { index: null, layers: model.tanningLayers.layers, slots: model.tanningLayers.slots };
	}

	function tryGetMatchingLayer(groups, targetLayer) {
		for (let i = 0; i < groups.length; i++) {
			if (groups[i].slots.isEqual(targetLayer.slots)) {
				return i;
			}
		}
		return null;
	}

	function getTanningValue(groups) {
		return groups.reduce((sum, obj) => sum + (obj.value ?? 0), 0);
	}

	function setLayers(savedLayers, currentLayers, index) {
		index ??= currentLayers.index;
		if (!currentLayers) {
			console.warn("setTanning: Could not find clothing groups");
			return null;
		}
		if (index == null) {
			savedLayers.push({
				layers: currentLayers.layers,
				slots: currentLayers.slots,
				value: 0,
			});
			index = savedLayers.length - 1;
		}
		return savedLayers[index];
	}

	/**
	 * Returns tanning factor based on:
	 * sunIntensity (intensity from month of the year)
	 * weatherModifier (based on weather)
	 * locationModifier (based on location)
	 * clothingModifier (based on clothing)
	 * sunscreenModifier (based on used sunscreen)
	 * dayFactor (based on sun position in the sky) - always 0 at night
	 *
	 * @param {boolean} ignoreOutside Forces outside check
	 */
	function getTanningFactor(ignoreOutside) {
		const outside = ignoreOutside ? 0 : V.outside;
		const sunIntensity = (ignoreOutside ? 1 : Weather.getSunIntensity()) * (1 + Skin.tanningBonus);
		// Reduces tanning effect even with only 1 shading clothing item
		const clothingModifier = Object.values(V.worn).some(item => item.type.includes("shade")) ? 0.1 : 1;
		// sunscreen prevents tanning gains entirely
		const sunscreenModifier = Skin.Sunscreen.isApplied() ? 0 : 1;

		const result = round(sunIntensity * clothingModifier * sunscreenModifier, 2);
		return {
			sun: sunIntensity,
			month: Weather.genSettings.months[Time.date.month - 1].sunIntensity,
			weather: outside ? Weather.current.tanningModifier : 1,
			location: V.location === "forest" ? 0.2 : 1,
			dayFactor: outside ? Time.date.simplifiedDayFactor : 1,
			clothing: clothingModifier,
			sunscreen: sunscreenModifier,
			result,
		};
	}

	function tanningGainOutput(modifier, minutes) {
		if (V.statdisable !== "f") return "";
		const factor = modifier * minutes;
		if (factor === 0) {
			return statDisplay.statChange("선탠 효과 없음", 0, "blue");
		}
		return statDisplay.statChange("선탠", factor >= 50 ? 3 : factor >= 20 ? 2 : 1, "green");
	}

	function tanningPenaltiesOutput(modifiers) {
		const reasons = [];

		if (modifiers.sunscreen === 0) {
			return `<span class="blue">선크림이 당신의 피부가 타는 것을 막아주고 있다.</span><br>`;
		}

		if (V.outside) {
			const month = modifiers.month <= 0.6;
			const dayState = Weather.sky.dayFactor <= 0.6;
			const output = month ? Time.monthName : dayState ? "해가 낮게 떠 있음" : "날씨";
			if (modifiers.sun <= 0.3) reasons.push(`햇빛이 거의 없음 (${output})`);
			else if (modifiers.sun <= 0.7) reasons.push(`햇빛이 충분하지 않음 (${output})`);

			if (modifiers.weather < 1) reasons.push("구름이 있음");
		}
		if (modifiers.clothing < 1) reasons.push("옷으로 가려짐");

		if (reasons.length === 0) return "";
		return `<span class="teal">당신의 선탠은 다음과 같은 이유로 방해받고 있습니다:</span><br><span class="orange">${reasons.join("<br>")}</span><br>`;
	}
	return {
		cachedLayers,
		applyTanningGain,
		applyTanningLoss,
		getTanningFactor,
		tanningGainOutput,
		tanningPenaltiesOutput,
		get tanningLayers() {
			return V.player.skin.layers;
		},
		get tanningBonus() {
			return V.player.skin.tanningBonus ?? 0;
		},
		set tanningBonus(value) {
			V.player.skin.tanningBonus = Math.clamp(value, 0, 1);
		},
		get tanningBed() {
			return V.player.skin.tanningBed ?? false;
		},
		set tanningBed(value) {
			V.player.skin.tanningBed = !!value;
		},
		get totalTan() {
			const layers = V.player.skin.layers;
			return getTanningValue(layers);
		},
		get color() {
			return {
				get natural() {
					return V.player.skin.color || "light";
				},
				set natural(value) {
					V.player.skin.color = value;
				},
				get tan() {
					const layers = V.player.skin.layers;
					return getTanningValue(layers);
				},
				set tan(value) {
					Skin.color.setTan(value);
				},
				setTan(value, wholeBody = true) {
					Skin.recache();
					value = Math.clamp(value, 0, 100);
					const savedLayers = V.player.skin.layers;
					const totalTan = getTanningValue(savedLayers);

					if (totalTan === value) return;
					if (totalTan > value) {
						const tanningLoss = totalTan - value;
						lowerTanningInLayers(savedLayers, tanningLoss);
					} else {
						let group = {};
						if (wholeBody) {
							group = defaultLayer;
						} else {
							const model = Renderer.locateModel(...defaultModel);
							group = getCurrentLayers(model, savedLayers);
						}
						const tanningGain = value - totalTan;
						const selectedLayer = setLayers(savedLayers, group, tryGetMatchingLayer(savedLayers, group));
						selectedLayer.value += tanningGain;
					}
				},
			};
		},
		recache() {
			Skin.cachedLayers = null;
			accumulatedValue = 0;
		},
		getImageCount() {
			// return V.player.skin.layers.reduce((count, layerGroup) => count + layerGroup.groups.length, 0);
		},
		// todo Only for red images. Remove after combat rework
		cssColorFilter(type) {
			return setup.colours.getSkinCSSFilter(type ?? Skin.color.natural, Skin.totalTan);
		},
		Sunscreen,
	};
})();
window.Skin = Skin;

DefineMacro("tanningGainOutput", function () {
	this.output.append(Skin.tanningGainOutput(...this.args));
});

DefineMacroS("tanningPenaltiesOutput", Skin.tanningPenaltiesOutput);
