/* eslint-disable no-undef */
const DoLSave = ((Story, Save) => {
	"use strict";

	const DEFAULT_DETAILS = Object.freeze({
		id: Story.domId,
		autosave: null,
		slots: [null, null, null, null, null, null, null, null],
	});
	const KEY_DETAILS = "dolSaveDetails";

	// Compressed saves are indicated by {jsoncompressed:1} in their metadata
	// The '1' can act as a compression algorithm id.

	// see game/00-framework-tools/03-compression/dictionaries.js
	const COMPRESSOR_DICTIONARIES = DoLCompressorDictionaries;
	// id of the dictionary to use for saving
	const COMPRESSOR_CURRENT_DICTIONARY_ID = "v0";
	/**
	 * When saving, decompress and compare with the original.
	 * If results differ, report an error and save the uncompressed version instead.
	 */
	function shouldVerifyCompression() {
		return true;
	}

	/* Place somewhere to expose globally. */
	function isObject(obj) {
		return typeof obj === "object" && obj != null;
	}

	/* Can also call from backcomp in the future? */
	function getSaveVersion(variables) {
		if (isObject(variables)) {
			if (!variables.saveVersions) {
				return -1;
			}
			return variables.saveVersions.last();
		}
		return -2;
	}

	function marshalVersion(version) {
		return typeof version === "string"
			? version
					.replace(/[^0-9.]+/g, "")
					.split(".")
					.map(v => parseInt(v))
			: [0, 0, 0, 0];
	}

	function parseVersion(version) {
		version = marshalVersion(version);
		return version ? version[0] * 1000000 + version[1] * 10000 + version[2] * 100 + version[3] * 1 : 0;
	}

	/**
	 * The handler which the load button should call.
	 * Contains checks to determine whether the save loads or pops up a confirmation window.
	 *
	 * @param {any} slot The slot ID to get the save from. 0 to 9, or 'auto'.
	 * @param {boolean} confirm Bypass the load confirmation.
	 * @returns {void}
	 */
	function loadHandler(slot, confirm) {
		if (V.ironmanmode === true && V.passage !== "Start") {
			Wikifier.wikifyEval(`<<loadIronmanSafetyCancel ${slot}>>`);
			return;
		}
		if (V.confirmLoad === true && confirm === undefined) {
			Wikifier.wikifyEval(`<<loadConfirm ${slot}>>`);
			return;
		}
		const save = slot === "auto" ? Save.autosave.get() : Save.slots.get(slot);
		if (typeof save !== "object") {
			Errors.report("Could not find a valid save at that slot.", {});
			return;
		}
		const currVersion = parseVersion(StartConfig.version);
		/* Assume the save->variables is valid if an object. */
		const saveVersion = parseVersion(getSaveVersion(save.state.delta[0].variables));
		if (currVersion < saveVersion) {
			Wikifier.wikifyEval(`<<loadconfirmcompat ${slot}>>`);
			return;
		}
		load(slot, save);
	}

	/**
	 * Loads the given saveobj, or the save from the given slot.
	 *
	 * @param {number|string} slot The slot ID to get the save from. 0 to 9, or 'auto'.
	 * @param {object} saveObj The save object if already possessed by the callee.
	 * @param {boolean} overrides
	 * @returns {void}
	 */
	function load(slot, saveObj, overrides) {
		const save = saveObj == null ? (slot === "auto" ? Save.autosave.get() : Save.slots.get(slot)) : saveObj;
		const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
		const metadata = slot === "auto" ? saveDetails.autosave.metadata : saveDetails.slots[slot].metadata;
		/* Check if metadata for save matches the save's computed md5 hash. If it matches, the ironman save was not tampered with.
			Bypass this check if on a mobile, because they are notoriously difficult to grab saves from in the event of issues. */
		if (metadata.ironman && !Browser.isMobile.any()) {
			IronMan.update(save, metadata);
			// (if ironman mode enabled) following checks md5 signature of the save to see if the variables have been modified
			if (!IronMan.compare(metadata, save)) {
				Wikifier.wikifyEval(`<<loadIronmanCheater ${slot}>>`);
				return;
			}
		}
		if (slot === "auto") {
			Save.autosave.load();
		} else {
			Save.slots.load(slot);
		}
		if (V.ironmanmode) {
			// (ironman) remove all saves(except auto-save) with the same saveId than loaded save
			[0, 1, 2, 3, 4, 5, 6, 7].forEach(id => {
				const saveDetail = saveDetails.slots[id];
				if (saveDetail == null) return;
				if (saveDetail.metadata.saveId === metadata.saveId) {
					Save.slots.delete(id);
					deleteSaveDetails(id);
				}
			});
		}
	}

	function save(saveSlot, confirm, saveId, saveName) {
		if (saveId == null) {
			Wikifier.wikifyEval(`<<saveConfirm ${saveSlot}>>`);
		} else if ((V.confirmSave === true && confirm !== true) || (V.saveId !== saveId && saveId != null)) {
			Wikifier.wikifyEval(`<<saveConfirm ${saveSlot}>>`);
		} else {
			if (saveSlot != null) {
				updateSavesCount();
				const success = Save.slots.save(saveSlot, null, {
					saveId,
					saveName,
					ironman: V.ironmanmode,
				});
				if (success) {
					const save = Save.slots.get(saveSlot);
					// Copy save metadata (it includes the jsoncompressed indicator)
					const metadata = { ...save.metadata, saveId, saveName };
					if (V.ironmanmode) {
						Object.assign(metadata, {
							ironman: V.ironmanmode,
							signature: V.ironmanmode ? IronMan.getSignature(save) : false,
							schema: IronMan.schema,
						});
					}
					setSaveDetail(saveSlot, metadata);
					delete T.currentOverlay;
					// todo: find a better solution
					closeOverlay();
					if (V.ironmanmode === true) Engine.restart();
				}
			}
		}
	}

	function deleteSave(saveSlot, confirm) {
		if (saveSlot === "all") {
			if (confirm === undefined) {
				Wikifier.wikifyEval("<<clearSaveMenu>>");
				return;
			} else if (confirm === true) {
				Save.clear();
				deleteAllSaveDetails();
			}
		} else if (saveSlot === "auto") {
			if (V.confirmDelete === true && confirm === undefined) {
				Wikifier.wikifyEval(`<<deleteConfirm ${saveSlot}>>`);
				return;
			} else {
				Save.autosave.delete();
				deleteSaveDetails("autosave");
			}
		} else {
			if (V.confirmDelete === true && confirm === undefined) {
				Wikifier.wikifyEval(`<<deleteConfirm ${saveSlot}>>`);
				return;
			} else {
				Save.slots.delete(saveSlot);
				deleteSaveDetails(saveSlot);
			}
		}
		Wikifier.wikifyEval("<<resetSaveMenu>>");
	}

	function importSave(saveFile) {
		if (!window.FileReader) return; // Browser is not compatible

		const reader = new FileReader();

		reader.onloadend = function () {
			DeserializeGame(this.result);
		};

		reader.readAsText(saveFile[0]);
	}

	function prepareSaveDetails(forceRun) {
		const saveDetails = getSaveDetails();
		if (saveDetails == null || saveDetails.id !== Story.domId || forceRun) {
			const scSaveDetails = Save.get();
			const dolSaveDetails = Object.assign({}, DEFAULT_DETAILS);
			/* Search SugarCube's autosave property, if it exists, reflect this in the save details. */
			if (scSaveDetails.autosave != null) {
				dolSaveDetails.autosave = {
					title: scSaveDetails.autosave.title,
					date: scSaveDetails.autosave.date,
					metadata: scSaveDetails.autosave.metadata,
				};
				if (dolSaveDetails.autosave.metadata === undefined) {
					dolSaveDetails.autosave.metadata = { saveName: "" };
				}
				if (dolSaveDetails.autosave.metadata.saveName === undefined) {
					dolSaveDetails.autosave.metadata.saveName = "";
				}
			}
			/* Check whether SugarCube's save slots exist, and populate save details with them. */
			for (let i = 0; i < scSaveDetails.slots.length; i++) {
				if (scSaveDetails.slots[i] !== null) {
					dolSaveDetails.slots[i] = {
						title: scSaveDetails.slots[i].title,
						date: scSaveDetails.slots[i].date,
						metadata: scSaveDetails.slots[i].metadata,
					};
					if (dolSaveDetails.slots[i].metadata === undefined) {
						dolSaveDetails.slots[i].metadata = { saveName: "old save", saveId: 0 };
					}
					if (dolSaveDetails.slots[i].metadata.saveName === undefined) {
						dolSaveDetails.slots[i].metadata.saveName = "old save";
					}
				} else {
					dolSaveDetails.slots[i] = null;
				}
			}

			localStorage.setItem(KEY_DETAILS, JSON.stringify(dolSaveDetails));
			return true;
		}
		return false;
	}

	function setSaveDetail(saveSlot, metadata, story) {
		const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
		if (saveSlot === "autosave") {
			saveDetails.autosave = {
				id: Story.domId,
				title: Story.get(V.passage).description(),
				date: Date.now(),
				metadata,
			};
		} else {
			const slot = parseInt(saveSlot);
			saveDetails.slots[slot] = {
				id: Story.domId,
				title: Story.get(V.passage).description(),
				date: Date.now(),
				metadata,
			};
		}
		localStorage.setItem(KEY_DETAILS, JSON.stringify(saveDetails));
	}

	function getSaveDetails(saveSlot) {
		if (Object.hasOwn(localStorage, KEY_DETAILS)) {
			const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
			if (typeof saveSlot === "number") {
				if (saveDetails != null) {
					return saveDetails.slots[saveSlot];
				}
			} else {
				return saveDetails;
			}
		}
		return null;
	}

	function deleteSaveDetails(saveSlot) {
		const saveDetails = JSON.parse(localStorage.getItem(KEY_DETAILS));
		if (saveSlot === "autosave") {
			saveDetails.autosave = null;
		} else {
			const slot = parseInt(saveSlot);
			saveDetails.slots[slot] = null;
		}
		localStorage.setItem(KEY_DETAILS, JSON.stringify(saveDetails));
	}

	function deleteAllSaveDetails() {
		localStorage.setItem(KEY_DETAILS, JSON.stringify(DEFAULT_DETAILS));
	}

	function returnSaveData() {
		return Save.get();
	}

	function resetSaveMenu() {
		Wikifier.wikifyEval("<<resetSaveMenu>>");
	}

	function ironmanAutoSave() {
		const saveSlot = 8;
		updateSavesCount();
		const success = Save.slots.save(saveSlot, null, {
			saveId: V.saveId,
			saveName: V.saveName,
			ironman: V.ironmanmode,
		});
		if (success) {
			const save = Save.slots.get(saveSlot);
			const metadata = { saveId: V.saveId, saveName: V.saveName };
			if (V.ironmanmode) {
				Object.assign(metadata, {
					ironman: V.ironmanmode,
					signature: V.ironmanmode ? IronMan.getSignature(save) : false,
					schema: IronMan.schema,
				});
			}
			setSaveDetail(saveSlot, metadata);
		}
	}

	Macro.add("incrementautosave", {
		handler() {
			if (!V.ironmanmode) V.saveDetails.auto.count++;
		},
	});

	/**
	 * Compress a game state (not delta-encoded: {title, variables, prng, pull}) using most recent dictionary.
	 * Can throw an error.
	 *
	 * @param state
	 */
	function compressState(state) {
		DOL.Perflog.logWidgetStart("__DoLSave.compressState");
		try {
			const dictionary = COMPRESSOR_DICTIONARIES[COMPRESSOR_CURRENT_DICTIONARY_ID];
			const compressor = new JsonCompressor(dictionary);
			const zstate = compressor.compress(state);
			zstate.dictionary = COMPRESSOR_CURRENT_DICTIONARY_ID;
			zstate.title =
				"This save is compressed and is not compatible with old versions of Degrees of Lewdity. If you want to load this save in an older game build, use exporting.";
			zstate.variables = {};
			if (shouldVerifyCompression()) {
				// Sanity check
				const uzstate = decompressState(zstate);
				if (JSON.stringify(state) !== JSON.stringify(uzstate)) {
					throw new Error("Decompression check failed");
				}
			}
			return zstate;
		} finally {
			DOL.Perflog.logWidgetEnd("__DoLSave.compressState");
		}
	}

	/**
	 * Decompress the saved state using the dictionary it was compressed with.
	 * Can throw an error.
	 *
	 * @param zstate
	 */
	function decompressState(zstate) {
		DOL.Perflog.logWidgetStart("__DoLSave.decompressState");
		try {
			if (!("dictionary" in zstate)) throw new Error("Unable to load - compressed save has no dictionary");
			const dicid = zstate.dictionary;
			if (!(dicid in COMPRESSOR_DICTIONARIES))
				throw new Error(
					"Unable do decompress the save - the dictionary " +
						JSON.stringify(dicid) +
						" is unknown to this game version (trying to load newer save from older game?)"
				);
			const dictionary = COMPRESSOR_DICTIONARIES[dicid];
			const decompressor = new JsonDecompressor(dictionary);
			return decompressor.decompress(zstate);
		} finally {
			DOL.Perflog.logWidgetEnd("__DoLSave.decompressState");
		}
	}
	function enableCompression() {
		V.compressSave = true;
	}
	function disableCompression() {
		V.compressSave = false;
	}
	function isCompressionEnabled() {
		return V.compressSave;
	}

	/**
	 * Compress a SaveObject (the one with metadata and delta-encoded history), if the compression is enabled.
	 * If compression fails, report and error and do nothing.
	 * This function returns nothing, it modifies the saveObj parameter.
	 *
	 * @param saveObj
	 */
	function compressIfNeeded(saveObj) {
		if (!saveObj.metadata) saveObj.metadata = {};
		saveObj.metadata.jsoncompressed = 0;
		if (!isCompressionEnabled()) return;
		try {
			saveObj.state.history = saveObj.state.history.map(state => compressState(state));
			saveObj.metadata.jsoncompressed = 1;
		} catch (e) {
			DOL.Errors.report("Unable to compress - " + e);
			console.error(e);
			// Just return, the saveObj won't be modified
		}
	}
	function looksLikeCompressedSave(state) {
		return state.compressed === 1 && Array.isArray(state.values) && typeof state.values === "object" && typeof state.dictionary === "string";
	}
	/**
	 * Decompress a SaveObject (the one with metadata and delta-encoded history), if it is compressed.
	 *
	 * @param saveObj
	 */
	function decompressIfNeeded(saveObj) {
		const isCompressed = (saveObj.metadata && saveObj.metadata.jsoncompressed === 1) || looksLikeCompressedSave(saveObj.state.history[0]);
		if (!isCompressed) return;
		saveObj.state.history = saveObj.state.history.map(state => (JsonDecompressor.isCompressed(state) ? decompressState(state) : state));
	}

	return Object.freeze({
		save,
		load,
		delete: deleteSave,
		import: importSave,
		getSaves: returnSaveData,
		resetMenu: resetSaveMenu,
		getVersion: getSaveVersion,
		loadHandler,
		enableCompression,
		disableCompression,
		isCompressionEnabled,
		compressState,
		decompressState,
		compressIfNeeded,
		decompressIfNeeded,
		SaveDetails: Object.freeze({
			prepare: prepareSaveDetails,
			set: setSaveDetail,
			get: getSaveDetails,
			delete: deleteSaveDetails,
			deleteAll: deleteAllSaveDetails,
		}),
		IronMan: Object.freeze({
			autoSave: ironmanAutoSave,
		}),
		Utils: Object.freeze({
			parseVer: parseVersion,
		}),
	});
})(Story, Save);
window.DoLSave = DoLSave;

/* Legacy references, references to the global namespace should be avoided, and thus this is considered deprecated usage. */
window.prepareSaveDetails = DoLSave.SaveDetails.prepare;
window.setSaveDetail = DoLSave.SaveDetails.set;
window.getSaveDetails = DoLSave.SaveDetails.get;
window.deleteSaveDetails = DoLSave.SaveDetails.delete;
window.deleteAllSaveDetails = DoLSave.SaveDetails.deleteAll;
window.returnSaveDetails = DoLSave.getSaves;
window.resetSaveMenu = DoLSave.resetMenu;
window.ironmanAutoSave = DoLSave.IronMan.autoSave;
window.loadSave = DoLSave.load;
window.save = DoLSave.save;
window.deleteSave = DoLSave.delete;
window.importSave = DoLSave.import;
window.SerializeGame = Save.serialize;
window.DeserializeGame = Save.deserialize;

window.getSaveData = function () {
	const compressionWasEnabled = DoLSave.isCompressionEnabled();
	DoLSave.disableCompression();
	const input = document.getElementById("saveDataInput");
	updateExportDay();
	input.value = Save.serialize();
	if (compressionWasEnabled) DoLSave.enableCompression();
};

window.loadSaveData = function () {
	const input = document.getElementById("saveDataInput");
	const result = Save.deserialize(input.value);
	if (result === null) {
		input.value = "잘못된 세이브.";
	}
};

window.clearTextBox = function (id) {
	document.getElementById(id).value = "";
};

window.topTextArea = function (id) {
	const textArea = document.getElementById(id);
	textArea.scroll(0, 0);
};

window.bottomTextArea = function (id) {
	const textArea = document.getElementById(id);
	textArea.scroll(0, textArea.scrollHeight);
};

window.copySavedata = function (id) {
	const saveData = document.getElementById(id);
	saveData.focus();
	saveData.select();

	try {
		document.execCommand("copy");
	} catch (err) {
		const copyTextArea = document.getElementById("CopyTextArea");
		copyTextArea.value = "Copying Error";
		console.log("Unable to copy: ", err);
	}
};

window.updateExportDay = function () {
	if (V.saveDetails != null && State.history[0].variables.saveDetails != null) {
		V.saveDetails.exported.days = clone(Time.days);
		State.history[0].variables.saveDetails.exported.days = clone(State.history[0].variables.days);
		V.saveDetails.exported.count++;
		State.history[0].variables.saveDetails.exported.count++;
		V.saveDetails.exported.dayCount++;
		State.history[0].variables.saveDetails.exported.dayCount++;
		const sessionState = session.get("state");
		if (sessionState != null) {
			sessionState.delta[0].variables.saveDetails.exported.days = clone(Time.days);
			sessionState.delta[0].variables.saveDetails.exported.dayCount++;
			sessionState.delta[0].variables.saveDetails.exported.count++;
			session.set("state", sessionState);
		}
	}
};

window.updateSavesCount = function () {
	if (V.saveDetails != null && State.history[0].variables.saveDetails != null) {
		V.saveDetails.slot.count++;
		State.history[0].variables.saveDetails.slot.count++;
		V.saveDetails.slot.dayCount++;
		State.history[0].variables.saveDetails.slot.dayCount++;
		const sessionState = session.get("state");
		if (sessionState != null) {
			sessionState.delta[0].variables.saveDetails.slot.dayCount++;
			sessionState.delta[0].variables.saveDetails.slot.count++;
			session.set("state", sessionState);
		}
	}
};

window.importSettings = function (data, type) {
	let reader;
	switch (type) {
		case "text":
			V.importString = document.getElementById("settingsDataInput").value;
			Wikifier.wikifyEval('<<displaySettings "importConfirmDetails">>');
			break;
		case "file":
			reader = new FileReader();
			reader.addEventListener("load", function (e) {
				V.importString = e.target.result;
				Wikifier.wikifyEval('<<displaySettings "importConfirmDetails">>');
			});
			reader.readAsBinaryString(data[0]);
			break;
		case "function":
			importSettingsData(data);
			break;
	}
};

const importSettingsData = function (data) {
	let S = null;
	const result = data;
	if (result != null && result != null) {
		// console.log("json",JSON.parse(result));
		S = JSON.parse(result);
		if (V.passage === "Start" && S.starting != null) {
			S.starting = settingsConvert(false, "starting", S.starting);
		}
		if (S.general != null) {
			S.general = settingsConvert(false, "general", S.general);
		}

		if (V.passage === "Start" && S.starting != null) {
			const listObject = settingsObjects("starting");
			const listKey = Object.keys(listObject);
			const namedObjects = ["player", "skinColor"];

			for (let i = 0; i < listKey.length; i++) {
				if (namedObjects.includes(listKey[i]) && S.starting[listKey[i]] != null) {
					const itemKey = Object.keys(listObject[listKey[i]]);
					for (let j = 0; j < itemKey.length; j++) {
						if (V[listKey[i]][itemKey[j]] != null && S.starting[listKey[i]][itemKey[j]] != null) {
							if (validateValue(listObject[listKey[i]][itemKey[j]], S.starting[listKey[i]][itemKey[j]])) {
								V[listKey[i]][itemKey[j]] = S.starting[listKey[i]][itemKey[j]];
							}
						}
					}
				} else if (!namedObjects.includes(listKey[i])) {
					if (V[listKey[i]] != null && S.starting[listKey[i]] != null) {
						if (validateValue(listObject[listKey[i]], S.starting[listKey[i]])) {
							V[listKey[i]] = S.starting[listKey[i]];
						}
					}
				}
			}
		}

		if (S.general != null) {
			const listObject = settingsObjects("general");
			const listKey = Object.keys(listObject);
			const namedObjects = ["map", "skinColor", "shopDefaults", "options"];
			// correct swapped min/max values
			if (S.general.breastsizemin > S.general.breastsizemax) {
				const temp = S.general.breastsizemin;
				S.general.breastsizemin = S.general.breastsizemax;
				S.general.breastsizemax = temp;
			}
			if (S.general.penissizemin > S.general.penissizemax) {
				const temp = S.general.penissizemin;
				S.general.penissizemin = S.general.penissizemax;
				S.general.penissizemax = temp;
			}

			for (let i = 0; i < listKey.length; i++) {
				if (namedObjects.includes(listKey[i]) && S.general[listKey[i]] != null) {
					const itemKey = Object.keys(listObject[listKey[i]]);
					for (let j = 0; j < itemKey.length; j++) {
						if (V[listKey[i]][itemKey[j]] != null && S.general[listKey[i]][itemKey[j]] != null) {
							if (validateValue(listObject[listKey[i]][itemKey[j]], S.general[listKey[i]][itemKey[j]])) {
								V[listKey[i]][itemKey[j]] = S.general[listKey[i]][itemKey[j]];
							}
						}
					}
				} else if (!namedObjects.includes(listKey[i])) {
					if (V[listKey[i]] != null && S.general[listKey[i]] != null) {
						if (validateValue(listObject[listKey[i]], S.general[listKey[i]])) {
							V[listKey[i]] = S.general[listKey[i]];
						}
					}
				}
			}
		}

		if (S.npc != null) {
			const listObject = settingsObjects("npc");
			// eslint-disable-next-line no-var
			const listKey = Object.keys(listObject);
			// eslint-disable-next-line no-var
			for (let i = 0; i < V.NPCNameList.length; i++) {
				if (S.npc[V.NPCNameList[i]] != null) {
					// eslint-disable-next-line no-var
					for (let j = 0; j < listKey.length; j++) {
						// Overwrite to allow for "none" default value in the start passage to allow for rng to decide
						if (V.passage === "Start" && ["pronoun", "gender"].includes(listKey[j]) && S.npc[V.NPCNameList[i]][listKey[j]] === "none") {
							V.NPCName[i][listKey[j]] = S.npc[V.NPCNameList[i]][listKey[j]];
						} else if (validateValue(listObject[listKey[j]], S.npc[V.NPCNameList[i]][listKey[j]])) {
							V.NPCName[i][listKey[j]] = S.npc[V.NPCNameList[i]][listKey[j]];
						}
					}
				}
			}
		}
	}
};

function validateValue(keys, value) {
	// console.log("validateValue", keys, value);
	const keyArray = Object.keys(keys);
	let valid = false;
	if (keyArray.length === 0) {
		valid = true;
	}
	if (keyArray.includes("min")) {
		if (keys.min <= value && keys.max >= value) {
			valid = true;
		}
	}
	if (keyArray.includes("decimals") && value != null) {
		// eslint-disable-next-line eqeqeq
		if (value.toFixed(keys.decimals) != value) {
			valid = false;
		}
	}
	if (keyArray.includes("bool")) {
		if (value === true || value === false) {
			valid = true;
		}
	}
	if (keyArray.includes("boolLetter")) {
		if (value === "t" || value === "f") {
			valid = true;
		}
	}
	if (keyArray.includes("strings") && value != null) {
		if (keys.strings.includes(value)) {
			valid = true;
		}
	}
	return valid;
}
window.validateValue = validateValue;

function exportSettings(data, type) {
	const S = {
		general: {
			map: {},
			skinColor: {},
			shopDefaults: {},
			options: {},
		},
		npc: {},
	};
	let listObject;
	let listKey;
	let namedObjects;
	if (V.passage === "Start") {
		S.starting = {
			player: {},
			skinColor: {},
		};
		listObject = settingsObjects("starting");
		listKey = Object.keys(listObject);
		namedObjects = ["player", "skinColor"];

		for (let i = 0; i < listKey.length; i++) {
			if (namedObjects.includes(listKey[i]) && V[listKey[i]] != null) {
				const itemKey = Object.keys(listObject[listKey[i]]);
				for (let j = 0; j < itemKey.length; j++) {
					if (V[listKey[i]][itemKey[j]] != null) {
						if (validateValue(listObject[listKey[i]][itemKey[j]], V[listKey[i]][itemKey[j]])) {
							S.starting[listKey[i]][itemKey[j]] = V[listKey[i]][itemKey[j]];
						}
					}
				}
			} else if (!namedObjects.includes(listKey[i])) {
				if (V[listKey[i]] != null) {
					if (validateValue(listObject[listKey[i]], V[listKey[i]])) {
						S.starting[listKey[i]] = V[listKey[i]];
					}
				}
			}
		}
	}

	listObject = settingsObjects("general");
	listKey = Object.keys(listObject);
	namedObjects = ["map", "skinColor", "shopDefaults", "options"];

	for (let i = 0; i < listKey.length; i++) {
		if (namedObjects.includes(listKey[i]) && V[listKey[i]] != null) {
			const itemKey = Object.keys(listObject[listKey[i]]);
			for (let j = 0; j < itemKey.length; j++) {
				if (V[listKey[i]][itemKey[j]] != null) {
					if (validateValue(listObject[listKey[i]][itemKey[j]], V[listKey[i]][itemKey[j]])) {
						S.general[listKey[i]][itemKey[j]] = V[listKey[i]][itemKey[j]];
					}
				}
			}
		} else if (!namedObjects.includes(listKey[i])) {
			if (V[listKey[i]] != null) {
				if (validateValue(listObject[listKey[i]], V[listKey[i]])) {
					S.general[listKey[i]] = V[listKey[i]];
				}
			}
		}
	}
	listObject = settingsObjects("npc");
	listKey = Object.keys(listObject);
	for (let i = 0; i < V.NPCNameList.length; i++) {
		S.npc[V.NPCNameList[i]] = {};
		for (let j = 0; j < listKey.length; j++) {
			// Overwrite to allow for "none" default value in the start passage to allow for rng to decide
			if (V.passage === "Start" && ["pronoun", "gender"].includes(listKey[i]) && V.NPCName[i][listKey[j]] === "none") {
				S.npc[V.NPCNameList[i]][listKey[j]] = V.NPCName[i][listKey[j]];
			} else if (validateValue(listObject[listKey[j]], V.NPCName[i][listKey[j]])) {
				S.npc[V.NPCNameList[i]][listKey[j]] = V.NPCName[i][listKey[j]];
			}
		}
	}

	if (V.passage === "Start") {
		S.starting = settingsConvert(true, "starting", S.starting);
	}
	S.general = settingsConvert(true, "general", S.general);

	// console.log(S);
	const result = JSON.stringify(S);
	if (type === "text") {
		const textArea = document.getElementById("settingsDataInput");
		textArea.value = result;
	} else if (type === "file") {
		const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
		saveAs(blob, "DolSettingsExport.txt");
	}
}
window.exportSettings = exportSettings;

function settingsObjects(type) {
	let result;
	/* boolLetter type also requires the bool type aswell */
	switch (type) {
		case "starting":
			result = {
				bodysize: { min: 0, max: 3, decimals: 0, randomize: "characterAppearance" },
				breastsensitivity: { min: 1, max: 3, decimals: 0, randomize: "characterTrait" },
				genitalsensitivity: { min: 1, max: 3, decimals: 0, randomize: "characterTrait" },
				mouthsensitivity: { min: 1, max: 3, decimals: 0, randomize: "characterTrait" },
				bottomsensitivity: { min: 1, max: 3, decimals: 0, randomize: "characterTrait" },
				eyeselect: {
					strings: ["purple", "dark blue", "light blue", "amber", "hazel", "green", "lime green", "red", "pink", "grey", "light grey", "random"],
					randomize: "characterAppearance",
				},
				hairselect: {
					strings: [
						"red",
						"jetblack",
						"black",
						"brown",
						"softbrown",
						"lightbrown",
						"burntorange",
						"blond",
						"softblond",
						"platinumblond",
						"ashyblond",
						"strawberryblond",
						"ginger",
						"random",
					],
					randomize: "characterAppearance",
				},
				hairlength: { min: 0, max: 400, decimals: 0, randomize: "characterAppearance" },
				awareselect: {
					strings: ["innocent", "knowledgeable"],
					randomize: "characterTrait",
				},
				background: {
					strings: [
						"waif",
						"nerd",
						"athlete",
						"delinquent",
						"promiscuous",
						"exhibitionist",
						"deviant",
						"beautiful",
						"crossdresser",
						"lustful",
						"greenthumb",
						"plantlover",
					],
					randomize: "characterTrait",
				},
				gamemode: { strings: ["normal", "soft", "hard"] },
				startingseason: { strings: ["autumn", "winter", "spring", "summer", "random"], randomize: "gameplay" },
				ironmanmode: { bool: false },
				player: {
					gender: { strings: ["m", "f", "h"], randomize: "characterAppearance" },
					gender_body: { strings: ["m", "f", "a"], randomize: "characterAppearance" },
					ballsExist: { bool: true, randomize: "characterAppearance" },
					freckles: { bool: true, strings: ["random"], randomize: "characterAppearance" },
					breastsize: { min: 0, max: 4, decimals: 0, randomize: "characterAppearance" },
					penissize: { min: 0, max: 3, decimals: 0, randomize: "characterAppearance" },
					bottomsize: { min: 0, max: 3, decimals: 0, randomize: "characterAppearance" },
				},
				skinColor: {
					natural: {
						strings: ["light", "medium", "dark", "gyaru", "ylight", "ymedium", "ydark", "ygyaru"],
						randomize: "characterAppearance",
					},
					range: { min: 0, max: 100, decimals: 0, randomize: "characterAppearance" },
				},
			};
			break;
		case "general":
			result = {
				malechance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				dgchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				cbchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				malevictimchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				homochance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				npcVirginityChance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				npcVirginityChanceAdult: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				breast_mod: { min: -12, max: 12, decimals: 0, randomize: "encounter" },
				penis_mod: { min: -8, max: 8, decimals: 0, randomize: "encounter" },
				whitechance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				blackchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				straponchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				alluremod: { min: 0.2, max: 2, decimals: 1, randomize: "gameplay" },
				clothesPrice: { min: 1, max: 10, decimals: 1, randomize: "gameplay" },
				clothesPriceUnderwear: { min: 1, max: 2, decimals: 1, randomize: "gameplay" },
				clothesPriceSchool: { min: 1, max: 2, decimals: 1, randomize: "gameplay" },
				clothesPriceLewd: { min: 0.1, max: 2, decimals: 1, randomize: "gameplay" },
				tending_yield_factor: { min: 1, max: 10, decimals: 1, randomize: "gameplay" },
				rentmod: { min: 0.1, max: 3, decimals: 1, randomize: "gameplay" },
				beastmalechance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				monsterchance: { min: 0, max: 100, decimals: 0, randomize: "encounter" },
				monsterhallucinations: { boolLetter: true, bool: true, randomize: "encounter" },
				blackwolfmonster: { min: 0, max: 2, decimals: 0, randomize: "encounter" },
				greathawkmonster: { min: 0, max: 2, decimals: 0, randomize: "encounter" },
				bestialitydisable: { boolLetter: true, bool: true },
				swarmdisable: { boolLetter: true, bool: true },
				slimedisable: { boolLetter: true, bool: true },
				voredisable: { boolLetter: true, bool: true },
				tentacledisable: { boolLetter: true, bool: true },
				analdisable: { boolLetter: true, bool: true },
				analdoubledisable: { boolLetter: true, bool: true },
				analingusdisablegiving: { boolLetter: true, bool: true },
				analingusdisablereceiving: { boolLetter: true, bool: true },
				vaginaldoubledisable: { boolLetter: true, bool: true },
				transformdisable: { boolLetter: true, bool: true },
				transformdisabledivine: { boolLetter: true, bool: true },
				hirsutedisable: { boolLetter: true, bool: true },
				pbdisable: { boolLetter: true, bool: true },
				breastfeedingdisable: { boolLetter: true, bool: true },
				parasitepregdisable: { boolLetter: true, bool: true },
				watersportsdisable: { boolLetter: true, bool: true },
				facesitdisable: { boolLetter: true, bool: true },
				spiderdisable: { boolLetter: true, bool: true },
				bodywritingdisable: { boolLetter: true, bool: true },
				parasitedisable: { boolLetter: true, bool: true },
				slugdisable: { boolLetter: true, bool: true },
				waspdisable: { boolLetter: true, bool: true },
				beedisable: { boolLetter: true, bool: true },
				lurkerdisable: { boolLetter: true, bool: true },
				horsedisable: { boolLetter: true, bool: true },
				pregnancyspeechdisable: { boolLetter: true, bool: true },
				plantdisable: { boolLetter: true, bool: true },
				footdisable: { boolLetter: true, bool: true },
				toydildodisable: { boolLetter: true, bool: true },
				toywhipdisable: { boolLetter: true, bool: true },
				speechpregnancydisable: { boolLetter: true, bool: true },
				ruffledisable: { boolLetter: true, bool: true },
				asphyxiaLvl: { min: 0, max: 4, decimals: 0 },
				NudeGenderDC: { min: 0, max: 2, decimals: 0 },
				breastsizemin: { min: 0, max: 4, decimals: 0 },
				breastsizemax: { min: 0, max: 12, decimals: 0 },
				bottomsizemax: { min: 0, max: 9, decimals: 0 },
				penissizemax: { min: -2, max: 4, decimals: 0 },
				penissizemin: { min: -2, max: 0, decimals: 0 },
				basePlayerPregnancyChance: { min: 0, max: 96, decimals: 0, randomize: "gameplay" },
				baseNpcPregnancyChance: { min: 0, max: 16, decimals: 0, randomize: "gameplay" },
				humanPregnancyMonths: { min: 1, max: 9, decimals: 0 },
				wolfPregnancyWeeks: { min: 2, max: 12, decimals: 0 },
				playerPregnancyHumanDisable: { boolLetter: true, bool: true },
				playerPregnancyBeastDisable: { boolLetter: true, bool: true },
				npcPregnancyDisable: { boolLetter: true, bool: true },
				cycledisable: { boolLetter: true, bool: true },
				pregnancytype: { strings: ["realistic", "fetish"] },
				condomLvl: { min: 0, max: 3, decimals: 0, randomize: "gameplay" },
				checkstyle: {
					strings: ["percentage", "words", "skillname"],
					randomize: "gameplay",
				},
				debugdisable: { boolLetter: true, bool: true },
				statdisable: { boolLetter: true, bool: true },
				cheatdisabletoggle: { boolLetter: true, bool: true },
				confirmSave: { bool: true },
				confirmLoad: { bool: true },
				confirmDelete: { bool: true },
				reducedLineHeight: { bool: true },
				multipleWardrobes: { strings: [false, "isolated"] }, //, "all"
				outfitEditorPerPage: { min: 5, max: 20, decimals: 0 }, //, "all"
				options: {
					neverNudeMenus: { bool: true },
					showCaptionText: { bool: true },
					sidebarStats: { strings: ["disabled", "limited", "all"] },
					sidebarTime: { strings: ["disabled", "top", "bottom"] },
					combatControls: { strings: ["radio", "columnRadio", "lists", "limitedLists"] },
					mapMovement: { bool: true },
					mapTop: { bool: true },
					mapMarkers: { bool: true },
					images: { min: 0, max: 1, decimals: 0 },
					combatImages: { min: 0, max: 1, decimals: 0 },
					bodywritingImages: { bool: true },
					silhouetteEnabled: { bool: true },
					tanImgEnabled: { bool: true },
					tanningEnabled: { bool: true },
					sidebarAnimations: { bool: true },
					blinkingEnabled: { bool: true },
					combatAnimations: { bool: true },
					halfClosedEnabled: { bool: true },
					characterLightEnabled: { bool: true },
					lightSpotlight: { min: 0, max: 1, decimals: 2 },
					lightGradient: { min: 0, max: 1, decimals: 2 },
					lightGlow: { min: 0, max: 1, decimals: 2 },
					lightFlat: { min: 0, max: 1, decimals: 2 },
					lightCombat: { min: 0, max: 1, decimals: 2 },
					lightTFColor: { min: 0, max: 1, decimals: 2 },
					maxStates: { min: 1, max: 20, decimals: 0 },
					newWardrobeStyle: { bool: true },
					useNarrowMarket: { bool: true },
					skipStatisticsConfirmation: { bool: true },
					passageCount: { strings: ["disabled", "changes", "total"] },
					playtime: { bool: true },
					numberify_enabled: { min: 0, max: 1, decimals: 0 },
					timestyle: { strings: ["military", "ampm"] },
					tipdisable: { boolLetter: true, bool: true },
					pepperSprayDisplay: { strings: ["none", "sprays", "compact"] },
					condomsDisplay: { strings: ["none", "standard"] },
					closeButtonMobile: { bool: true },
					oldclock: { bool: true },
					showDebugRenderer: { bool: true },
					numpad: { bool: true },
					traitOverlayFormat: { strings: ["table", "reducedTable", "list"] },
					font: { strings: ["", "Arial", "Verdana", "TimesNewRoman", "Georgia", "Garamond", "CourierNew", "LucidaConsole", "Monaco", "ComicSans"] },
					passageLineHeight: { strings: [0, 1, 1.25, 1.5, 1.75, 2] },
					overlayLineHeight: { strings: [0, 1, 1.25, 1.5, 1.75, 2] },
					sidebarLineHeight: { strings: [0, 1, 1.25, 1.5, 1.75, 2] },
					passageFontSize: { strings: [0, 10, 12, 14, 16, 18, 20] },
					overlayFontSize: { strings: [0, 10, 12, 14, 16, 18, 20] },
					sidebarFontSize: { strings: [0, 12, 14, 16, 18, 20] },
				},
				shopDefaults: {
					alwaysBackToShopButton: { bool: true },
					color: {
						strings: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom", "random"],
					},
					colourItems: { strings: ["disable", "random", "default"] },
					compactMode: { bool: true },
					disableReturn: { bool: true },
					highContrast: { bool: true },
					mannequinGender: { strings: ["same", "opposite", "male", "female"] },
					mannequinGenderFromClothes: { bool: true },
					noHelp: { bool: true },
					noTraits: { bool: true },
					secColor: {
						strings: ["black", "blue", "brown", "green", "pink", "purple", "red", "tangerine", "teal", "white", "yellow", "custom", "random"],
					},
				},
			};
			break;
		case "npc":
			result = {
				pronoun: { strings: ["m", "f"] },
				gender: { strings: ["m", "f"] },
				penissize: { min: 0, max: 4, decimals: 0 },
				breastsize: { min: 0, max: 12, decimals: 0 },
			};
			break;
	}
	return result;
}
window.settingsObjects = settingsObjects;

/* Converts specific settings to so they don't look so chaotic to players */
function settingsConvert(exportType, type, settings) {
	const listObject = settingsObjects(type);
	const result = settings;
	const keys = Object.keys(listObject);
	for (let i = 0; i < keys.length; i++) {
		if (result[keys[i]] === undefined) continue;
		if (["map", "skinColor", "player", "shopDefaults", "options"].includes(keys[i])) {
			const itemKey = Object.keys(listObject[keys[i]]);
			for (let j = 0; j < itemKey.length; j++) {
				if (result[keys[i]][itemKey[j]] === undefined) continue;
				const keyArray = Object.keys(listObject[keys[i]][itemKey[j]]);
				if (exportType) {
					if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
						if (result[keys[i]][itemKey[j]] === "t") {
							result[keys[i]][itemKey[j]] = true;
						} else if (result[keys[i]][itemKey[j]] === "f") {
							result[keys[i]][itemKey[j]] = false;
						}
					}
				} else {
					if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
						if (result[keys[i]][itemKey[j]] === true) {
							result[keys[i]][itemKey[j]] = "t";
						} else if (result[keys[i]][itemKey[j]] === false) {
							result[keys[i]][itemKey[j]] = "f";
						}
					}
				}
			}
		} else {
			const keyArray = Object.keys(listObject[keys[i]]);
			if (exportType) {
				if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
					if (result[keys[i]] === "t") {
						result[keys[i]] = true;
					} else if (result[keys[i]] === "f") {
						result[keys[i]] = false;
					}
				}
			} else {
				if (keyArray.includes("boolLetter") && keyArray.includes("bool")) {
					if (result[keys[i]] === true) {
						result[keys[i]] = "t";
					} else if (result[keys[i]] === false) {
						result[keys[i]] = "f";
					}
				}
			}
		}
	}
	return result;
}
window.settingsConvert = settingsConvert;

window.loadExternalExportFile = function () {
	importScripts("DolSettingsExport.json")
		.then(function () {
			const textArea = document.getElementById("settingsDataInput");
			textArea.value = JSON.stringify(DolSettingsExport);
		})
		.catch(function () {
			// console.log(err);
			const button = document.getElementById("LoadExternalExportFile");
			button.value = "Error Loading";
		});
};

window.randomizeSettings = function (filter) {
	const settingsResult = {};
	const settingContainers = ["player", "skinColor"];
	const randomizeSettingLoop = function (settingsObject, mainObject, subObject) {
		if (mainObject && !settingsResult[mainObject]) {
			settingsResult[mainObject] = {};
		}
		if (subObject) {
			if (!settingsResult[mainObject][subObject]) settingsResult[mainObject][subObject] = {};
		}
		Object.entries(settingsObject).forEach(setting => {
			if (settingContainers.includes(setting[0])) {
				randomizeSettingLoop(setting[1], mainObject, setting[0]);
			} else if ((!filter && setting[1].randomize) || (filter && filter === setting[1].randomize)) {
				if (subObject) {
					settingsResult[mainObject][subObject][setting[0]] = randomizeSettingSet(setting[1]);
				} else {
					settingsResult[mainObject][setting[0]] = randomizeSettingSet(setting[1]);
				}
			}
		});
	};
	const randomNumber = function (min, max, decimals = 0) {
		const decimalsMult = Math.pow(10, decimals);
		const minMult = min * decimalsMult;
		const maxMult = max * decimalsMult;
		const rn = (Math.floor(Math.random() * (maxMult - minMult)) + minMult) / decimalsMult;
		return parseFloat(rn.toFixed(decimals));
	};
	const randomizeSettingSet = function (setting) {
		let result;
		const keys = Object.keys(setting);
		if (keys.includes("min")) {
			result = randomNumber(setting.min, setting.max, setting.decimals);
		}
		if (keys.includes("strings")) {
			result = setting.strings.pluck();
		}
		if (keys.includes("boolLetter")) {
			result = ["t", "f"].pluck();
		}
		if (keys.includes("bool")) {
			result = [true, false].pluck();
		}
		return result;
	};
	if (V.passage === "Start") {
		randomizeSettingLoop(settingsObjects("starting"), "starting");
	}
	randomizeSettingLoop(settingsObjects("general"), "general");

	return JSON.stringify(settingsResult);
};

// !!Hack warning!! Don't use it maybe?
window.updateMoment = function () {
	// change last (and only) moment in local history
	State.history[State.history.length - 1].variables = JSON.parse(JSON.stringify(V));
	// prepare the moment object with modified history
	const moment = State.marshalForSave();
	// replace moment.history with moment.delta, because that's what SugarCube expects to find
	// this is a bad thing to do probably btw, because while history and delta appear to look very similar,
	// they're not always the same thing, SugarCube actually decodes delta into history (see: https://github.com/tmedwards/sugarcube-2/blob/36a8e1600160817c44866205bc4d2b7730b2e70c/src/state.js#L527)
	// but for my purpose it works (i think?)
	// delete Object.assign(moment, {delta: moment.history}).history;
	// delta-encode the state
	delete Object.assign(moment, { delta: State.deltaEncode(moment.history) }).history;
	// replace saved moment in session with the new one
	const gameName = Story.domId;
	sessionStorage[gameName + ".state"] = JSON.stringify(moment);
	// it appears that this line is not necessary for it to work
	// SugarCube.session._engine[gameName + ".state"] = JSON.stringify(moment);

	// Voilà! F5 will reload the current state now without going to another passage!
};

window.isJsonString = function (s) {
	try {
		JSON.parse(s);
	} catch (e) {
		return false;
	}
	return true;
};

/**
 * Recursively traverses an object, reporting an error for any NaN values or null objects\
 * Example: `let result = recurseNaN(a, "a");`.
 *
 * @param {object} obj The head of the object tree.
 * @param {string} path A string to indicate the path, put the object name in quotes.
 * @param {object} result An object to store the results in. - leave blank.
 * @param {Set} hist A set used for Cycle history. - leave blank.
 */

function recurseNaN(obj, path, result = null, hist = null) {
	result = Object.assign({ nulls: [], nan: [], cycle: [] }, result);
	if (hist == null) hist = new Set([obj]);
	/* let result = {"nulls" : [], "nan" : [], "cycle" : []}; */
	for (const [key, val] of Object.entries(obj)) {
		const newPath = `${path}.${key}`;
		if (Number.isNaN(val)) {
			result.nan.push(newPath);
			continue;
		}
		if (typeof val === "object") {
			if (val === null) {
				result.nulls.push(newPath);
				continue;
			}
		} else {
			continue;
		}
		if (hist.has(val)) {
			result.cycle.push(newPath);
			continue;
		}
		hist.add(val);
		recurseNaN(val, `${newPath}`, result, hist);
	}
	return result;
}
window.recurseNaN = recurseNaN;

/**
 * Recursively traverse target object, finding and returning an object containing all the NaN vars inside.
 *
 * Use with objectAssignDeep to re-assign 0 to all bad NaN'd vars.  Use with caution.
 *
 * @param {object} target The object to traverse.  Defaults to V ($).
 * @returns {object} An object containing all the properties/sub-props that were NaN.
 */
function scanNaNs(target = V) {
	// If this gets set to true during function, a NaN was hit within scope.
	let isMutated = false;
	const current = Object.create({});
	// Loop through all properties of the target for NaNs and objects to scan.
	for (const [key, value] of Object.entries(target)) {
		// If value is an object, scan that property.
		if (value && typeof value === "object") {
			const resp = scanNaNs(value);
			// If scanNaNs returns a non-null object, there was a NaN somewhere, so make sure to update current obj.
			if (resp && typeof resp === "object") {
				current[key] = resp;
				isMutated = true;
			}
		} else if (typeof value === "number") {
			// Does what it says on the tin, make sure you only test numbers.
			if (isNaN(value)) {
				// Set property to a default value, likely zero.
				current[key] = 0;
				isMutated = true;
			}
		}
	}
	// Return a fully realised object, indicating there were NaNs, or null, which can be ignored.
	// isMutated controls whether we have encountered NaNs, remember to update where necessary.
	return isMutated ? current : null;
}
window.scanNaNs = scanNaNs;
