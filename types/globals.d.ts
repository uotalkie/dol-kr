import { SugarCubeStoryVariables, SugarCubeTemporaryVariables } from "twine-sugarcube";

type NpcNames =
	| "Avery"
	| "Bailey"
	| "Briar"
	| "Charlie"
	| "Darryl"
	| "Doren"
	| "Eden"
	| "Gwylan"
	| "Harper"
	| "Jordan"
	| "Kylar"
	| "Landry"
	| "Leighton"
	| "Mason"
	| "Morgan"
	| "River"
	| "Robin"
	| "Sam"
	| "Sirris"
	| "Whitney"
	| "Winter"
	| "Black Wolf"
	| "Niki"
	| "Quinn"
	| "Remy"
	| "Alex"
	| "Great Hawk"
	| "Wren"
	| "Sydney"
	| "Ivory Wraith"
	| "Zephyr";

declare global {
	const V: SugarCubeStoryVariables;
	const T: SugarCubeTemporaryVariables;
	const C: {
		npc: {
			[key in NpcNames]: Npc;
		};
	};
	const DOL: {
		Stack: string[];
	};
	const EventSystem: EventData;

	const Browser: {
		isMobile: {
			any(): boolean;
		};
	};

	const L10n: any;

	let throwError: Function;

	let DefineMacro: Function;
}

export {};
