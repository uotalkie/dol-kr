declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		weekly: WeeklyVariables;
	}

	export interface SugarCubeSetupObject {
		weeklyObject: WeeklySetupVariables;
	}
}

declare global {
	export interface WeeklySetupVariables {
		theft: object;
		sewers: object;
	}

	export interface WeeklyVariables extends WeeklySetupVariables {
		kylarCreep?: number;
		edenPrey?: boolean;
		winterLakeTalk?: number;
		slimeWakeMasturbation?: boolean;
		alexNightTimeNursery?: 1;
		whitneyPub?: number;
		streetPolice?: number;
		adultShopWhitney?: boolean;
		danceJob?: boolean;
		policeHigh?: boolean;
		brothelVMLube?: boolean;

		/* There are a lot more weekly variables */

		theft: {
			danceStudio?: boolean;
			oceanBreeze?: boolean;
			stripClub?: boolean;
			clothingShop?: boolean;
			furnitureShop?: boolean;
			hairDressers?: boolean;
			tailor?: boolean;
			petShop?: boolean;
			toyShop?: boolean;
			tattooParlour?: boolean;
			ridingSchool?: boolean;
			spa?: boolean;
			schoolLibraryMoney?: boolean;
		};

		sewers: {
			antiqueCrystal?: boolean;
			antiqueWatch?: boolean;
			antiqueDildo?: boolean;
			antiqueCandlestick?: boolean;
			antiqueHorn?: boolean;
		};
	}
}

export {};
