declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		combat: boolean;

		arousalmax: number;

		vaginause: number | string;
		anususe: number | string;
		mouth: number | string;
		head: number | string;
		front: number | string;
		back: number | string;
		chest: number | string;
		leftarm: number | string;
		rightarm: number | string;

		anustarget: number;
		anususe: number;
		anusstate: string | 0;
		bottomtarget: number;
		bottomuse: number;
		bottomstate: string | 0;
		chesttarget: number;
		chestuse: number;
		cheststate: string | 0;
		feettarget: number;
		feetuse: number;
		feetstate: string | 0;
		handtarget: number;
		handuse: number;
		handstate: string | 0;
		lefttarget: number;
		leftuse: number;
		leftstate: string | 0;
		mouthtarget: number;
		mouthuse: number;
		mouthstate: string | 0;
		penistarget: number;
		penisuse: number;
		penisstate: string | 0;
		righttarget: number;
		rightuse: number;
		rightstate: string | 0;
		stealtarget: number;
		stealuse: number;
		stealstate: string | 0;
		thightarget: number;
		thighuse: number;
		thighstate: string | 0;
		tooltarget: number;
		tooluse: number;
		toolstate: string | 0;
		vaginatarget: number;
		vaginause: number;
		vaginastate: string | 0;

		fingersInVagina: number;
		vaginaFingerLimit: number;
		selfsuckDepth: number;
		penisHeight: number;
		corruptionMasturbation: boolean;
		corruptionMasturbationCount: number;
		masturbationorgasmstat: number;
		masturbationOrgasmTimeStat: TimeStamp;
		masturbationorgasm: number;
		masturbationorgasmsemen: number;
		secondsSpentMasturbating: number;
		femaleclimax: number;

		currentToyLeft: any;
		currentToyRight: any;
		currentToyVagina: any;
		currentToyAnus: any;
	}
}

declare global {}

export {};
