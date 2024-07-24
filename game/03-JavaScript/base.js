/* eslint-disable jsdoc/require-description-complete-sentence */
// adjust mousetrap behavior, see mousetrap.js
Mousetrap.prototype.stopCallback = function (e, element, combo) {
	// game uses V.tempDisable to indicate when the keyboard shortcuts shouldn't trigger
	// e.g. when typing a name of a new outfit
	if (V.tempDisable) return true; // don't trigger shortcut actions when it's set
	return false;
};

// add binds for "next" link in combat
// eslint-disable-next-line no-undef
Mousetrap.bind(["z", "n", "enter", "space"], function () {
	$("#passages #next a.macro-link").trigger("click");
});

/*
 * Similar to <<script>>, but preprocesses the contents, so $variables are accessible.
 * The variable "output" is also exposed (unlike <<run>>, <<set>>)
 *
 * Example:
 * <<twinescript>>
 *     output.textContent = $text
 * <</twinescript>>
 */
Macro.add("twinescript", {
	skipArgs: true,
	tags: null,

	handler() {
		const output = document.createDocumentFragment();

		try {
			Scripting.evalTwineScript(this.payload[0].contents, output);
		} catch (ex) {
			return this.error(`bad evaluation: ${typeof ex === "object" ? ex.message : ex}`);
		}

		// Custom debug view setup.
		if (Config.debug) {
			this.createDebugView();
		}

		if (output.hasChildNodes()) {
			this.output.appendChild(output);
		}
	},
});

/**
 * JS version of SugarCube's <<for _index, _value range _array>>.
 * Can iterate over
 *
 * Copied from SugarCube sources.
 *
 * @param {any} range Can be String or Object.
 * @param {function(string,any):void} handler Function for each key and value pair.
 */
function rangeIterate(range, handler) {
	let list;
	switch (typeof range) {
		case "string":
			list = [];
			for (let i = 0; i < range.length; true) {
				const obj = Util.charAndPosAt(range, i);
				list.push([i, obj.char]);
				i = 1 + obj.end;
			}
			break;
		case "object":
			if (Array.isArray(range)) {
				list = range.map((val, i) => [i, val]);
			} else if (range instanceof Set) {
				list = Array.from(range).map((val, i) => [i, val]);
			} else if (range instanceof Map) {
				list = Array.from(range);
			} else if (Util.toStringTag(range) === "Object") {
				list = Object.keys(range).map(key => [key, range[key]]);
			} else {
				throw new Error(`unsupported range expression type: ${Util.toStringTag(range)}`);
			}
			break;
		default:
			throw new Error(`unsupported range expression type: ${typeof range}`);
	}
	for (let i = 0; i < list.length; i++) {
		const entry = list[i];
		handler(entry[0], entry[1]);
	}
}
window.rangeIterate = rangeIterate;

/**
 * Define macro, passing arguments to function and store them in $args, preserving & restoring previous $args.
 *
 * @param {string} macroName
 * @param {Function} macroFunction
 * @param {object=} tags
 * @param {boolean=} skipArgs
 */
function DefineMacro(macroName, macroFunction, tags, skipArgs) {
	Macro.add(macroName, {
		isWidget: true,
		tags,
		skipArgs,
		handler() {
			DOL.Perflog.logWidgetStart(macroName);
			try {
				const oldArgs = State.temporary.args;
				State.temporary.args = this.args.slice();
				macroFunction.apply(this, this.args);
				if (typeof oldArgs === "undefined") {
					delete State.temporary.args;
				} else {
					State.temporary.args = oldArgs;
				}
			} finally {
				DOL.Perflog.logWidgetEnd(macroName);
			}
		},
	});
}

/**
 * Define macro, passing arguments to function and store them in $args, preserving & restoring previous $args.
 *
 * Expectation: macroFunction returns text to wikify & print.
 *
 * @param {string} macroName
 * @param {Function} macroFunction
 * @param {object=} tags
 * @param {boolean=} skipArgs
 * @param {boolean=} maintainContext
 */
function DefineMacroS(macroName, macroFunction, tags, skipArgs, maintainContext) {
	DefineMacro(
		macroName,
		function () {
			$(this.output).wiki(macroFunction.apply(maintainContext ? this : null, this.args));
		},
		tags,
		skipArgs
	);
}

/**
 * Creates and returns the keyword describing the integrity of a clothing article.
 *
 * @param {object} worn clothing article, State.variables.worn.XXXX
 * @param {string} slot clothing article slot used
 * @returns {string} condition key word ("tattered"|"torn|"frayed"|"full")
 */
function integrityKeyword(worn, slot) {
	const i = worn.integrity / clothingData(slot, worn, "integrity_max");
	if (i <= 0.2) {
		return "tattered";
	} else if (i <= 0.5) {
		return "torn";
	} else if (i <= 0.9) {
		return "frayed";
	} else {
		return "full";
	}
}
window.integrityKeyword = integrityKeyword;

/**
 * Returns the integrity prefix of the clothing object.
 *
 * @param {object} worn clothing article, State.variables.worn.XXXX
 * @param {string} slot clothing article slot used
 * @returns {string} printable integrity prefix
 */
function integrityWord(worn, slot) {
	const kw = trIntegrityKeyword(worn, slot);
	// alt version for metal/plastic devices
	const alt = setup.clothes[slot][clothesIndex(slot, worn)].altDamage;
	if (alt === "parasite") {
		switch (kw) {
			case "너덜너덜한":
				T.text_output = "조각난 ";
				break;
			case "찢긴":
				T.text_output = "고르지 못한 ";
				break;
			case "해어진":
				T.text_output = "상처입은 ";
				break;
			case "full":
			default:
				T.text_output = "";
		}
	} else if (alt) {
		switch (kw) {
			case "너덜너덜한":
				T.text_output = "갈라진 ";
				break;
			case "찢긴":
				T.text_output = "긁힌 ";
				break;
			case "해어진":
				T.text_output = alt === "metal" ? "광택이 흐려진 " : "변색된 ";
				break;
			case "full":
			default:
				T.text_output = "";
		}
	} else {
		switch (kw) {
			case "너덜너덜한":
			case "찢긴":
			case "해어진":
				T.text_output = kw + " ";
				break;
			case "full":
			default:
				T.text_output = "";
		}
	}
	let colorClass;
	switch (kw) {
		case "full":
			colorClass = "green";
			break;
		case "너덜너덜한":
			colorClass = "red";
			break;
		case "찢긴":
			colorClass = "purple";
			break;
		case "해어진":
			colorClass = "teal";
			break;
		default:
			colorClass = ""; // default without color
	}
	if (T.text_output) {
		T.text_output = `<span class="${colorClass}">${T.text_output.trim()}</span> `;
	}
	return T.text_output;
}
window.integrityWord = integrityWord;
DefineMacroS("integrityWord", integrityWord);

function underlowerintegrity() {
	return integrityWord(V.worn.under_lower, "under_lower");
}
DefineMacroS("underlowerintegrity", underlowerintegrity);

function underupperintegrity() {
	return integrityWord(V.worn.under_upper, "under_upper");
}
DefineMacroS("underupperintegrity", underupperintegrity);

function overlowerintegrity() {
	return integrityWord(V.worn.over_lower, "over_lower");
}
DefineMacroS("overlowerintegrity", overlowerintegrity);

function lowerintegrity() {
	return integrityWord(V.worn.lower, "lower");
}
DefineMacroS("lowerintegrity", lowerintegrity);

function overupperintegrity() {
	return integrityWord(V.worn.over_upper, "over_upper");
}
DefineMacroS("overupperintegrity", overupperintegrity);

function upperintegrity() {
	return integrityWord(V.worn.upper, "upper");
}
DefineMacroS("upperintegrity", upperintegrity);

function genitalsintegrity() {
	return integrityWord(V.worn.genitals, "genitals");
}
DefineMacroS("genitalsintegrity", genitalsintegrity);

function faceintegrity() {
	return integrityWord(V.worn.face, "face");
}
DefineMacroS("faceintegrity", faceintegrity);

/**
 * @param {object} worn clothing article, State.variables.worn.XXXX
 * @returns {string} printable clothing colour
 */
function clothesColour(worn) {
	if (!worn.colour) return (T.text_output = "");
	if (worn.colour_sidebar) {
		// eslint-disable-next-line no-undef
		if (worn.colour === "custom") return (T.text_output = getCustomColourName(worn.colourCustom)); // defined in clothing-shop-v2.js
		return (T.text_output = worn.colour);
	}
	return (T.text_output = "");
}
window.clothesColour = clothesColour;

/**
 * set temporary vars for outfit checks
 *
 * @returns {void}
 */
function outfitChecks() {
	/* Boolean variables */
	T.underOutfit = (V.worn.under_lower.outfitSecondary && V.worn.under_lower.outfitSecondary[1] === V.worn.under_upper.name) || false;
	T.middleOutfit = (V.worn.lower.outfitSecondary && V.worn.lower.outfitSecondary[1] === V.worn.upper.name) || false;
	T.overOutfit = (V.worn.over_lower.outfitSecondary && V.worn.over_lower.outfitSecondary[1] === V.worn.over_upper.name) || false;

	T.skirtExposed =
		(setup.clothes.over_lower[clothesIndex("over_lower", V.worn.over_lower)].skirt === 1 &&
			setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1) ||
		(setup.clothes.over_lower[clothesIndex("over_lower", V.worn.over_lower)].skirt === 1 && V.worn.lower.type.includes("naked")) ||
		(V.worn.over_lower.type.includes("naked") && setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt === 1);
	T.bottomExposed = V.worn.over_lower.name === "naked" && V.worn.lower.name === "naked" && !V.worn.under_lower.type.includes("covered");
	T.shirtless =
		V.worn.over_upper.name === "naked" &&
		V.worn.upper.name === "naked" &&
		!V.worn.lower.type.includes("covered") &&
		!V.worn.under_upper.type.includes("covered");

	T.topless =
		V.worn.over_upper.name === "naked" && V.worn.upper.name === "naked" && V.worn.under_upper.name === "naked" && !V.worn.lower.type.includes("covered");
	T.bottomless = V.worn.over_lower.name === "naked" && V.worn.lower.name === "naked" && V.worn.under_lower.name === "naked";
	T.overNaked = V.worn.over_lower.name === "naked" && V.worn.over_upper.name === "naked";
	T.middleNaked = T.shirtless && T.bottomExposed;
	T.underNaked = V.worn.under_lower.name === "naked" && V.worn.under_upper.name === "naked";
	T.fullyNaked = T.topless && T.bottomless;

	/* Temporary $worn[slot] variables. Generally called as _bottom.integrity or _top.name */
	const topLayers = [V.worn.over_upper, V.worn.upper, V.worn.under_upper];
	const bottomLayers = ["over_lower", "lower", "under_lower"];
	T.top = topLayers.find(item => item.name !== "naked" && (!V.worn.lower || item !== V.worn.lower || item.type.includes("covered"))) || null;
	T.topUnder = topLayers.slice(topLayers.indexOf(T.top) + 1).find(item => item.name !== "naked") || null;
	T.bottom =
		V.worn[
			bottomLayers.find(item => {
				return V.worn[item].name !== "naked" && ((T.bottomIsSkirt = setup.clothes[item][clothesIndex(item, V.worn[item])].skirt), true);
			})
		];
	if (T.bottom !== V.worn.under_lower) {
		T.bottomUnder =
			V.worn[
				bottomLayers.slice(bottomLayers.indexOf(T.bottom)).find(item => {
					return V.worn[item].name !== "naked" && ((T.bottomUnderIsSkirt = setup.clothes[item][clothesIndex(item, V.worn[item])].skirt), true);
				})
			];
	}
	T.swimwear =
		((V.worn.under_lower.type.includes("swim") && V.worn.lower.type.includes("naked")) || V.worn.lower.type.includes("swim")) &&
		(V.worn.under_upper.type.includes("swim") || V.worn.under_upper.type.includes("naked")) &&
		(V.worn.upper.type.includes("swim") || V.worn.upper.type.includes("naked"));
	T.outfit = (T.bottom?.outfitSecondary && T.bottom?.outfitSecondary[1] === T.top?.name) || null;
	if (!T.top && !T.shirtless) T.top = T.bottom;
	if (T.outfit) T.bottom = T.top;
}
window.outfitChecks = outfitChecks;
DefineMacro("outfitChecks", outfitChecks);

/**
 * @returns {boolean} whether or not any main-body clothing is out of place or wet
 */
function checkForExposedClothing() {
	return setup.clothingLayer.torso.some(clothingLayer => {
		const wetstage = V[clothingLayer.replace("_", "") + "wetstage"];
		return V.worn[clothingLayer].state !== setup.clothes[clothingLayer][clothesIndex(clothingLayer, V.worn[clothingLayer])].state_base || wetstage >= 3;
	});
}
window.checkForExposedClothing = checkForExposedClothing;

function processedSvg(width, height) {
	const svgElem = jQuery(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
		.attr("xmlns", "http://www.w3.org/2000/svg")
		.attr("viewBox", "0 0 " + width + " " + height)
		// eslint-disable-next-line object-shorthand
		.css({ width: width, height: height })
		.wiki(this.payload[0].contents.replace(/^\n/, ""));

	const supportedChildElements = ["img", "image", "a", "rect"];
	const commonAttributes = ["class", "x", "y", "width", "height", "style", "onclick"];

	// Some browsers really don't like working with svg elements unless you specify their namespace upon creation, raw insertion won't render.
	const fixSVGNameSpace = (type, elem, newParent = null) => {
		if (type === "img") type = "image";

		const oldElem = $(elem);
		const newElem = document.createElementNS("http://www.w3.org/2000/svg", type);

		// Set common attributes of new svg namespaced element
		for (const attr of commonAttributes) {
			if (oldElem.attr(attr)) newElem.setAttribute(attr, oldElem.attr(attr));
		}

		// Set unique attributes of specific types of elements
		switch (type) {
			case "image":
				newElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", oldElem.attr("href") || oldElem.attr("xlink:href") || "");
				break;
			case "rect":
				// No unique properties
				break;
			case "a":
				newElem.setAttributeNS("http://www.w3.org/1999/xlink", "title", oldElem.attr("alt") || oldElem.attr("xlink:alt") || "");
				newElem.setAttributeNS("http://www.w3.org/1999/xlink", "alt", oldElem.attr("title") || oldElem.attr("xlink:title") || "");
				break;
			default:
				break;
		}

		if (newParent) newParent.appendChild(newElem);
		else oldElem.replaceWith(newElem);

		// Recursively process nested children if they exist
		for (const htmlElem of supportedChildElements) {
			$(oldElem)
				.children(htmlElem)
				.each((i, elem) => {
					fixSVGNameSpace(htmlElem, elem, newElem);
				});
		}
	};

	// Because the payload got processed as HTML, fix the namespacing and rendering issues to make it a proper SVG again
	$(document).one(":passagerender", function (ev) {
		for (const htmlElem of supportedChildElements) {
			$(ev.content)
				.find("svg " + htmlElem)
				.each((i, elem) => {
					fixSVGNameSpace(htmlElem, elem);
				});
		}
	});

	// This macro works a little different because we can't rely on the normal wikify method to properly translate SVG elements.
	// We need to manually edit the output variable.
	svgElem.appendTo(this.output);

	return "";
}
DefineMacroS("svg", processedSvg, null, false, true);

function numberify(selector) {
	$(() => Links.generateLinkNumbers($(selector)));
	return "";
}
DefineMacroS("numberify", numberify);

function saveDataCompare(save1, save2) {
	const result = {};
	const keys = Object.keys(save1);
	keys.forEach(key => {
		const save1Json = JSON.stringify(save1[key]);
		const save2Json = JSON.stringify(save2[key]);
		if (save1Json !== save2Json) {
			result[key] = [save1[key], save2[key]];
		}
	});
	return result;
}
window.saveDataCompare = saveDataCompare;

// For the optional numpad to the right of the screen
function mobClick(index) {
	if (index <= Links.currentLinks.length) Links.currentLinks[index - 1].click();
}
window.mobClick = mobClick;
function mobBtnHide() {
	$(".mob-btn").hide();
	$(".mob-btn-h").show();
}
window.mobBtnHide = mobBtnHide;
function mobBtnShow() {
	$(".mob-btn").show();
	$(".mob-btn-h").hide();
}
window.mobBtnShow = mobBtnShow;

/**
 * Selects a random item from an array of weighted options. Each option is an array with
 * two elements: the item, and its weight.
 * Works similar to eventpool, but more generic and lightweight, and works with any data types.
 *
 * Options with a higher weight have a higher chance of being chosen.
 *
 * @param {Array} options Each option is an array where the first item is a value, and the second item is its weight.
 * @returns {*} The selected item
 * @example
 *     console.log(weightedRandom(["apple", 1], ["banana", 2], ["cherry", 3]));  // Relative probability for these will be: apple: 16.67%, banana: 33.33%, cherry: 50%
 */
function weightedRandom(...options) {
	if (!Array.isArray(options) || options.length === 0) {
		throw new Error("Options must be a non-empty array.");
	}
	let totalWeight = 0;
	const processedOptions = options.map(([value, weight]) => {
		if (typeof weight !== "number") {
			throw new Error("Weight must be a number.");
		}
		totalWeight += weight;
		return [value, totalWeight];
	});

	const random = State.random() * totalWeight;
	for (const [value, cumulativeWeight] of processedOptions) {
		if (cumulativeWeight >= random) {
			return value;
		}
	}
	console.error("weightedRandom: Unreachable code reached. Returning " + options[0][0]);
	return options[0][0];
}
window.weightedRandom = weightedRandom;

/**
 * Resolves the provided value by checking if it is a function or a direct value.
 * If the value is a function, the function is invoked and its result is returned.
 * If it is not a function, the value itself is returned.
 * If the value is undefined, a specified default value is returned instead.
 *
 * @param {Function|any} value The value to resolve, which can be a function or any value
 * @param {number} defaultValue The default value to use if the provided value is undefined
 * @returns {number} The resolved value, either from the function call or directly
 */
function resolveValue(value, defaultValue = undefined) {
	if (typeof value === "function") {
		return value();
	}
	return value ?? defaultValue;
}
window.resolveValue = resolveValue;

/**
 * This macro sets $rng. If the variable $rngOverride is set, $rng will always be set to that.
 * Set $rngOverride in the console for bugtesting purposes. Remember to unset it after testing is finished.
 * With two arguments, it sets $rng to a random value between the first arg and the second arg. This can be used to guarantee $rng is set to a specific value.
 * With one argument, it sets $rng to a random value between 1 and the arg.
 * With no arguments, it sets $rng to a random value between 1 and 100.
 */
Macro.add("rng", {
	handler() {
		if (typeof V.rngOverride === "number" && V.debug === 1) {
			console.log(`rng override: ${V.rngOverride}`);
			V.rng = V.rngOverride;
		} else {
			let min = 1;
			let max = 100;

			if (this.args.length === 2) {
				[min, max] = this.args;
			} else if (this.args.length === 1) {
				max = this.args[0];
			}
			if (typeof min === "number" && typeof max === "number") {
				V.rng = random(min, max);
			} else {
				throw new Error(`invalid arguments: ${min} | ${max}`);
			}
		}
	},
});

/**
 * Returns the object, or a blank object if null. Replaces ?. operator.
 *
 * @param {object} obj
 * @returns {object} - Either the passed arg or {}
 */
const nullable = obj => obj || {};
window.nullable = nullable;

/**
 * This inputs an icon img tag, using the given filename.
 * Files are all in img/misc/icon/
 * Example: <<icon "bed.png">>
 * <<icon "bed.png" "nowhitespace">> does not add a trailing whitespace for formatting.
 * <<icon "bed.png" "infront">> will cause the icon to layer ontop of the next one
 */
Macro.add("icon", {
	handler() {
		if (!V.options.images) return;
		const name = typeof this.args[0] === "string" ? this.args[0] : "error";
		const iconImg = document.createElement("img");
		iconImg.className = "icon" + (this.args.includes("infront") ? " infront" : "");
		iconImg.src = "img/misc/icon/" + name;
		this.output.append(iconImg);
		// append a whitespace for compatibility with old icon behavior
		if (!this.args.includes("nowhitespace")) this.output.append(" ");
	},
});

/**
 * Adds a foldout, which can be expanded and collapsed
 * It uses the first element in the content as a header (which can be clicked on), and all other elements as the body (which gets expanded/collapsed)
 * First argument defines whether it starts expanded or not.
 * Second argument defines the variable where the foldout state is saved (if no variable is defined, the foldout will reset to default if you leave the page)
 * Example: <<foldout true "_tempVar">><div>header here</div>body here<</foldout>>
 */
Macro.add("foldout", {
	tags: null,
	handler() {
		if (window.foldoutStates == null) {
			window.foldoutStates = {};
		}
		function setFoldoutState(state, transition = 0) {
			if (state) {
				toggle.addClass("extended");
				body.slideDown(transition);
			} else {
				toggle.removeClass("extended");
				body.slideUp(transition);
			}
			window.foldoutStates[varname] = foldoutState;
		}
		const def = this.args[0] !== undefined ? this.args[0] : true;
		const varname = this.args[1] || "_lastAction";
		let foldoutState = window.foldoutStates[varname] != null ? window.foldoutStates[varname] : def;
		const content = this.payload[0].contents;

		const e = $("<div>").addClass("foldout").append(Wikifier.wikifyEval(content));
		const header = e.children().first().addClass("foldoutHeader");
		const toggle = $("<span>").addClass("foldoutToggle").appendTo(header);
		const body = e.contents().not(header).wrapAll("<div>").parent().addClass("foldoutBody").insertAfter(header);

		setFoldoutState(foldoutState);

		header.on("click", function () {
			foldoutState = !foldoutState;
			setFoldoutState(foldoutState, 100);
		});
		e.appendTo(this.output);
	},
});

/* global ClothedSlots */

/**
 * @param {ClothedSlots} slot
 */
function carriedClear(slot) {
	const slotFound = slot in V.carried;
	if (!slotFound) {
		return;
	}

	V.carried[slot] = clone(setup.clothes[slot][0]);
}
window.carriedClear = carriedClear;

Macro.add("carriedClear", {
	handler() {
		carriedClear(this.args[0]);
	},
});
