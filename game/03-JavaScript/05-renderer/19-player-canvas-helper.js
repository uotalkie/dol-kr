// @ts-check
/* global CombatRenderer, CombatPlayerOptions, CanvasModelLayers, TransformationKeys, BodywritingOption, ClothingRendererStep, ClothedSlots */

class PlayerCanvasHelper {
	/**
	 * @param {string} id
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genBodywritingLayer(id, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				/** @type {BodywritingOption} */
				const bodywriting = options.bodywriting[id];
				const path = `${options.src}bodywriting/${bodywriting.area}/${bodywriting.type}.png`;
				return path;
			},
			masksrcfn(options) {
				/** @type {BodywritingOption} */
				const bodywriting = options.bodywriting[id];
				if (bodywriting.type === "left-shoulder") {
					// Pull basic mask from arm
					if (PlayerCanvasHelper.isBestialHandjob(options, "front")) {
						return {
							path: `${options.src}body/arms/front-${options.armFrontPosition}-bestial.png`,
							convert: true,
						};
					}
					return {
						path: `${options.src}body/arms/front-${options.armFrontPosition}.png`,
						convert: true,
					};
				}
				return null;
			},
			showfn(options) {
				/** @type {BodywritingOption} */
				const bodywriting = options.bodywriting[id];
				return !!bodywriting.show;
			},
			animationfn(options) {
				return options.animKey;
			},
			z: CombatRenderer.indices.base,
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {"front" | "back"} layer
	 * @param {boolean} isAccessory
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genClothingLayerLowerStep(slot, layer, isAccessory, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				return PlayerCanvasHelper.genClothingLayerLowerSrc(slot, layer, isAccessory, options);
			},
			showfn(options) {
				return PlayerCanvasHelper.genClothingLayerLowerShow(options, slot, layer, isAccessory);
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return 1;
				}
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				if (isAccessory) {
					return [`worn_${slot}_acc`];
				}
				return [`worn_${slot}_main`];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {"front" | "back"} layer
	 * @param {boolean} isAccessory
	 * @param {object} options
	 * @returns {string}
	 */
	static genClothingLayerLowerSrc(slot, layer, isAccessory, options) {
		const clothes = options.clothes[slot];
		if (clothes == null) {
			Errors.report("Clothing object was undefined", {
				slot,
				layer,
				isAccessory,
			});
			return "";
		}
		if (clothes?.name == null || clothes.renderStep == null) return "";
		const step = ClothingRendererStep.instances[clothes.renderStep];
		if (step == null) {
			// Fallback
			Errors.report("Step key not found in ClothingRendererStep", {
				slot,
				layer,
				isAccessory,
				name: clothes.name,
			});
			return "";
		}
		const states = [];
		// @ts-ignore
		if (step.isStateLayered(options.position, clothes.state)) {
			states.push(layer);
		}
		// @ts-ignore
		if (clothes.positions != null && step.isStateLegged(options.position, clothes.state)) {
			states.push(clothes.positions[layer]);
		}
		states.push(clothes.state);
		if (options.position === "doggy" && clothes.isRaised) {
			states.push("raised");
		}
		if (isAccessory) {
			states.push("acc");
		}
		const state = states.join("-");
		const path = `${options.src}clothing/${slot}/${clothes.name}/${state}.png`;
		return path;
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @param {ClothedSlots} slot
	 * @param {"front" | "back"} layer
	 * @param {boolean} isAccessory
	 * @returns {boolean}
	 */
	static genClothingLayerLowerShow(options, slot, layer, isAccessory) {
		const clothes = options.clothes[slot];
		if (clothes == null) {
			Errors.report("Clothing object was undefined", {
				slot,
				layer,
				isAccessory,
			});
			return false;
		}
		if (clothes.renderStep == null) {
			return false;
		}
		const step = ClothingRendererStep.instances[clothes.renderStep];
		if (step == null) {
			// Fallback
			Errors.report("Step key not found in ClothingRendererStep", {
				slot,
				layer,
				isAccessory,
				name: clothes.name,
			});
			return false;
		}
		if (isAccessory && !clothes.hasAccessory) {
			return false;
		}
		// @ts-ignore
		const stepShow = step.shouldShow(options.position, clothes.state);
		const isClothingShown = CombatRenderer.isClothingShown(clothes, options.showClothing);
		const hasMainImg = clothes.hasMainImg;
		return !!stepShow && !!isClothingShown && !!hasMainImg;
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genClothingLayer(slot, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null || clothes.name == null) return "";
				const path = `${options.src}clothing/${slot}/${clothes.name}/${clothes.state}.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.hasMainImg;
				return !!show;
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					return 1;
				}
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const filter = `worn_${slot}_main`;
				return [filter];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genBreastsLayer(slot, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const clothes = options.clothes[slot];
				if (clothes?.name == null) return "";
				const path = `${options.src}clothing/${slot}/${clothes.name}/breasts/${clothes.breasts.size}.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.breasts.show;
				return !!show;
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					return 1;
				}
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const filter = `worn_${slot}_main`;
				return [filter];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 *
	 * @param {string} slot
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genBreastsAccLayer(slot, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const clothes = options.clothes[slot];
				if (clothes?.name == null) return "";
				const path = `${options.src}clothing/${slot}/${clothes.name}/breasts/${clothes.breasts.size}-acc.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					Errors.report("Clothing object was undefined");
					return false;
				}
				const show = CombatRenderer.isClothingShown(clothes, options.showClothing) && clothes.breasts.hasAccessory;
				return !!show;
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const filter = `worn_${slot}_acc`;
				return [filter];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {ClothedSlots} slot
	 * @param {"front" | "back"} layer
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genClothingSleeves(slot, layer, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const clothes = options.clothes[slot];
				if (clothes?.name == null) return "";
				if (layer === "front" && PlayerCanvasHelper.isBestialHandjob(options, "front")) {
					return `${options.src}clothing/${slot}/${clothes.name}/sleeves/front-stroke.png`;
				}
				const position = layer === "front" ? options.armFrontPosition : options.armBackPosition;
				const path = `${options.src}clothing/${slot}/${clothes.name}/sleeves/${layer}-${position}.png`;
				return path;
			},
			showfn(options) {
				if (options.props.pillory.show) {
					return false;
				}
				const clothes = options.clothes[slot];
				const show = options.showClothing && clothes != null && clothes.show && clothes.sleeves.show;
				return !!show;
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null) {
					return 1;
				}
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const filter = `worn_${slot}_sleeve`;
				const clothes = options.clothes[slot];
				if (clothes == null) {
					return [];
				}
				if (clothes.sleeves.useSecondary) {
					return [`worn_${slot}_acc`];
				}
				return [filter];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 *
	 * @param {string} slot
	 * @param {"front" | "back"} layer
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genClothingSleevesAcc(slot, layer, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const clothes = options.clothes[slot];
				if (clothes?.name == null) return "";
				const position = layer === "front" ? options.armFrontPosition : options.armBackPosition;
				const path = `${options.src}clothing/${slot}/${clothes.name}/sleeves/${layer}-${position}-acc.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes[slot];
				const show = options.showClothing && clothes != null && clothes.show && clothes.sleeves.hasAccessory;
				return !!show;
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const filter = `worn_${slot}_sleeve_acc`;
				return [filter];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 *
	 * @param {string} slot
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genClothingAccLayer(slot, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const clothes = options.clothes[slot];
				if (clothes == null || clothes.name == null) return "";
				const path = `${options.src}clothing/${slot}/${clothes.name}/${clothes.state}-acc.png`;
				return path;
			},
			showfn(options) {
				const clothes = options.clothes[slot];
				const show = options.showClothing && clothes != null && clothes.show && clothes.hasAccessory;
				return !!show;
			},
			alphafn(options) {
				const clothes = options.clothes[slot];
				const alpha = clothes.alpha;
				return alpha;
			},
			animationfn(options) {
				return options.animKey;
			},
			filtersfn(options) {
				const filter = `worn_${slot}_acc`;
				return [filter];
			},
			z: CombatRenderer.indices[slot],
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {TransformationKeys} transformation
	 * @param {"front" | "back"} layer
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genTransformationTailLayer(transformation, layer, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				const value = options.transformations[transformation].tail;
				const path = `${options.src}body/transformations/${value.type}/tail/${layer}-${value.state}-${value.style}.png`;
				return path;
			},
			showfn(options) {
				const value = options.transformations[transformation].tail;
				const show = value.show;
				return show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: [transformation + "Tail"],
			zfn(options) {
				const value = options.transformations[transformation].tail;
				let z = CombatRenderer.indices[layer + "Tail"];
				if (value.inFront) {
					z += 1;
				}
				return z;
			},
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {TransformationKeys} transformation
	 * @param {TransformationParts} part
	 * @param {"front" | "back"} layer
	 * @param {CanvasModelLayers<CombatPlayerOptions>} overrideOptions
	 * @returns {CanvasModelLayers<CombatPlayerOptions>}
	 */
	static genTransformationLayer(transformation, part, layer, overrideOptions = {}) {
		/**
		 * @type {CanvasModelLayers<CombatPlayerOptions>}
		 */
		const defaults = {
			srcfn(options) {
				/** @type {TransformationPartOptions} */
				const value = options.transformations[transformation][part];
				const path = `${options.src}body/transformations/${value.type}/${part}/${layer}-${value.style}.png`;
				return path;
			},
			showfn(options) {
				const value = options.transformations[transformation][part];
				const show = value.show;
				return show;
			},
			animationfn(options) {
				return options.animKey;
			},
			filters: [transformation + part.toUpperFirst()],
			zfn(options) {
				/** @type {TransformationPartOptions} */
				const value = options.transformations[transformation][part];
				let z = CombatRenderer.indices[layer + part.toUpperFirst()];
				if (value.inFront) {
					z += 1;
				}
				return z;
			},
		};
		return Object.assign(defaults, overrideOptions);
	}

	/**
	 * @param {CombatPlayerOptions} options
	 * @param {"front" | "back"} side
	 * @returns {boolean}
	 */
	static isBestialHandjob(options, side) {
		switch (side) {
			case "front":
				return options.position === "missionary" ? PlayerCanvasHelper.isRightBestialHandjob() : PlayerCanvasHelper.isLeftBestialHandjob();
			case "back":
				return options.position === "missionary" ? PlayerCanvasHelper.isLeftBestialHandjob() : PlayerCanvasHelper.isRightBestialHandjob();
			default:
				return false;
		}
	}

	/**
	 * @returns {boolean}
	 */
	static isLeftBestialHandjob() {
		const arm = V.leftarm;
		if (arm !== "penis") {
			return false;
		}
		const target = V.lefttarget;
		const npc = V.NPCList[target];
		return ["pig", "boar", "pigboy", "boarboy"].includes(npc.type);
	}

	/**
	 * @returns {boolean}
	 */
	static isRightBestialHandjob() {
		const arm = V.rightarm;
		if (arm !== "penis") {
			return false;
		}
		const target = V.righttarget;
		const npc = V.NPCList[target];
		return ["pig", "boar", "pigboy", "boarboy"].includes(npc.type);
	}
}
window.PlayerCanvasHelper = PlayerCanvasHelper;
