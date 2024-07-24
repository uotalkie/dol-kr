declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		options: DolSettingsOptions;

		cheatdisable: "f" | "t";
		analdisable: "f" | "t";
		analingusdisablegiving: "f" | "t";
		analingusdisablereceiving: "f" | "t";
		vaginaldoubledisable: "f" | "t";
		analdoubledisable: "f" | "t";
		pbdisable: "f" | "t";
		transformdisable: "f" | "t";
		transformdisabledivine: "f" | "t";
		breastfeedingdisable: "f" | "t";
		watersportsdisable: "f" | "t";
		footdisable: "f" | "t";
		facesitdisable: "f" | "t";
		hypnosisdisable: "f" | "t";
		forcedcrossdressingdisable: "f" | "t";
		ruinedorgasmdisable: "f" | "t";
		toydildodisable: "f" | "t";
		toywhipdisable: "f" | "t";
		toymultiplepenetration: "f" | "t";
		bodywritingLvl: 0 | 1 | 2 | 3;
		asphyxiaLvl: 0 | 1 | 2 | 3 | 4;
		NudeGenderDC: -1 | 0 | 1 | 2;

		bestialitydisable: "f" | "t";
		swarmdisable: "f" | "t";
		parasitedisable: "f" | "t";
		tentacledisable: "f" | "t";
		slimedisable: "f" | "t";
		voredisable: "f" | "t";
		spiderdisable: "f" | "t";
		slugdisable: "f" | "t";
		waspdisable: "f" | "t";
		beedisable: "f" | "t";
		lurkerdisable: "f" | "t";
		horsedisable: "f" | "t";
		plantdisable: "f" | "t";

		rentmod: number;
		clothesPrice: number;
		clothesPriceUnderwear: number;
		clothesPriceSchool: number;
		clothesPriceLewd: number;
		furniturePriceFactor: number;
		tending_yield_factor: number;

		incompletePregnancyDisable: "f" | "t";
		cycledisable: "f" | "t";
		pregnancytype: "realistic" | "fetish" | "silly";
		basePlayerPregnancyChance: number;
		baseNpcPregnancyChance: number;
		humanPregnancyMonths: number;

		condomLvl: number;
		condomChance: number;
		condomUseChanceRape: number;
		condomUseChanceCon: number;
		playerPregnancyHumanDisable: "f" | "t";
		playerPregnancyBeastDisable: "f" | "t";
		npcPregnancyDisable: "f" | "t";
		parasitepregdisable: "f" | "t";
		pregnancyspeechdisable: "f" | "t";

		breastsizemin: "Flat" | "Budding" | "Tiny" | "Small" | "Pert";
		breastsizemax: "Flat" | "Budding" | "Tiny" | "Small" | "Pert" | "Modest" | "Full" | "Large" | "Ample" | "Massive" | "Huge" | "Gigantic" | "Enormous";
		bottomsizemin: "Slender" | "Slim" | "Modest" | "Cushioned";
		bottomsizemax: "Slender" | "Slim" | "Modest" | "Cushioned" | "Soft" | "Round" | "Plump" | "Large" | "Huge";
		penissizemin: "Micro" | "Mini" | "Tiny";
		penissizemax: "Micro" | "Mini" | "Tiny" | "Small" | "Normal" | "Large" | "Enormous";
	}
}

declare global {
	export interface DolSettingsOptions {
		debugdisable: "f" | "t";
	}
}

export {};
