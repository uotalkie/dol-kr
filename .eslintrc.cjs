module.exports = {
	root: true,

	// Keep variables sorted within groups (separated by "// ..." comment lines)
	globals: {
		// SugarCube APIs
		Browser: "readonly",
		Config: "readonly",
		DebugView: "readonly",
		Dialog: "readonly",
		Engine: "readonly",
		Fullscreen: "readonly",
		L10n: "readonly",
		l10nStrings: "readonly",
		LoadScreen: "readonly",
		Macro: "readonly",
		Save: "readonly",
		Scripting: "readonly",
		Setting: "readonly",
		setup: "readonly",
		State: "readonly",
		Story: "readonly",
		SugarCube: "readonly",
		Template: "readonly",
		UI: "readonly",
		UIBar: "readonly",
		// SugarCube functions
		clone: "readonly",
		either: "readonly",
		forget: "readonly",
		hasVisited: "readonly",
		importScripts: "readonly",
		importStyles: "readonly",
		lastVisited: "readonly",
		memorize: "readonly",
		passage: "readonly",
		previous: "readonly",
		random: "readonly",
		randomFloat: "readonly",
		recall: "readonly",
		setPageElement: "readonly",
		tags: "readonly",
		temporary: "readonly",
		time: "readonly",
		turns: "readonly",
		variables: "readonly",
		visited: "readonly",
		visitedTags: "readonly",
		// Dol shortcuts
		C: "readonly",
		DeserializeGame: "readonly",
		globals: "readonly",
		T: "readonly",
		V: "readonly",
		// DoL main namespaces
		DOL: "readonly",
		defineGlobalNamespaces: "readonly",
		Errors: "readonly",
		Versions: "readonly",
		Perflog: "readonly",
		Stack: "readonly",
		Wikifier: "readonly",
		// DoL other namespaces/objects
		Constants: "readonly",
		ConstantsLoader: "readonly",
		currentlyLoadingMap: "readonly",
		DoLHouse: "readonly",
		DolSettingsExport: "readonly",
		Dynamic: "readonly",
		IronMan: "readonly",
		Links: "readonly",
		playerDoll: "readonly",
		Renderer: "readonly",
		SexTypes: "readonly",
		StartConfig: "readonly",
		Utils: "readonly",
		ZIndices: "readonly",
		// DoL functions
		assignDefaults: "readonly",
		between: "readonly",
		clothesDataTrimmer: "readonly",
		clothesIndex: "readonly",
		clothingData: "readonly",
		combatListColor: "readonly",
		DefineMacro: "readonly",
		DefineMacroS: "readonly",
		DoLSave: "readonly",
		eCheckbox: "readonly",
		eInput: "readonly",
		elechild: "readonly",
		elechildren: "readonly",
		element: "readonly",
		ensure: "readonly",
		ensureIsArray: "readonly",
		eSelect: "readonly",
		generateBabyName: "readonly",
		getCustomClothesColourCanvasFilter: "readonly",
		getCustomColourRGB: "readonly",
		getCustomColourStyle: "readonly",
		getRandomIntInclusive: "readonly",
		getRobinLocation: "readonly",
		getSexesFromRandomGroup: "readonly",
		getTrueWarmth: "readonly",
		inDOM: "readonly",
		ironmanAutoSave: "readonly",
		loadCustomColourPreset: "readonly",
		npcEquipSet: "readonly",
		npcMakeNaked: "readonly",
		overlayShowHide: "readonly",
		parseCSSFilter: "readonly",
		pickRandomItemInArray: "readonly",
		playerHasStrapon: "readonly",
		registerGeneratedPattern: "readonly",
		registerImagePattern: "readonly",
		rgbToHsv: "readonly",
		selfOr: "readonly",
		settingsConvert: "readonly",
		settingsObjects: "readonly",
		shopClothCustomColorWheel: "readonly",
		sliderPerc: "readonly",
		stringFrom: "readonly",
		updateCustomColour: "readonly",
		updateExportDay: "readonly",
		updateMannequin: "readonly",
		updateSavesCount: "readonly",
		validateValue: "readonly",
		// DoL classes
		ObservableValue: "readonly",
		CanvasModel: "readonly",
		DollHouse: "readonly",
		FDoll: "readonly",
		// Third-party
		define: "readonly",
		iro: "readonly",
		LZString: "readonly",
		md5: "readonly",
		tinycolor: "readonly",
		// Unknown (Can't find declaration either in SugarCube docs nor in codebase)
		config: "readonly",
		saveAs: "readonly",
		schemaVersion: "readonly",
		session: "readonly",
		Util: "readonly",
		version: "readonly",
	},

	ignorePatterns: [
		"**/*.*",
		"!**/*.js",
		"!**/*.cjs",
		// Format config file
		"!.eslintrc.cjs",
		"node_modules",
		"devTools",
		"dist",
		"game/03-JavaScript/external",
	],

	parserOptions: {
		// Support back to ES2019 to cover old mobile devices with outdated WebView versions that fail on 2020 and up functions
		// ecmaVersion: "2019", (taken care of by env es2019)
		sourceType: "module",
	},

	env: {
		browser: true,
		es2019: true,
		jquery: true,
	},

	plugins: ["es"],

	extends: ["eslint:recommended", "plugin:jsdoc/recommended", "prettier-standard/prettier-file", "plugin:es/restrict-to-es2019"],

	settings: {
		jsdoc: {
			mode: "jsdoc",
		},
	},

	// Keep rules grouped by plugin and sorted alphabetically
	rules: {
		"object-shorthand": ["error", "always"],

		// SugarCube extends native objects and we follow it
		"no-extend-native": "off",

		/* eslint-plugin-jsdoc */

		// Descriptions should be sentence-like not comment-like
		"jsdoc/require-description-complete-sentence": "warn",
		"jsdoc/require-hyphen-before-param-description": ["error", "never", { tags: { property: "never" } }],
		// Adding JSDoc is preferable but not required
		"jsdoc/require-jsdoc": "off",
		"jsdoc/require-param-description": "off",
		"jsdoc/require-property-description": "off",
		"jsdoc/require-returns-description": "off",
		"jsdoc/require-returns": "off",

		/* eslint-plugin-prettier */

		"prettier/prettier": "warn",

		// Rule to fix Safari/Webkit not supporting a 4+ year old function you idiots
		"es/no-regexp-lookbehind-assertions": "error",
	},
};
