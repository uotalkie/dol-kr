declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {}

	export interface SugarCubeSetupObject {
		plants: Dict<PlantSetup>;
		tending: {
			plot_base: Plot;
			plot_sizes: string[];
			wateringTimes: {
				[key: PlotSize]: number;
			};
		};
	}
}

declare global {
	export type Season = "spring" | "summer" | "autumn" | "winter";

	export type PlotSize = "small" | "medium" | "large";

	export interface PlantSetup {
		index: number;
		name: string;
		plural: string;
		singular?: string; // *
		handheld: string;
		handheld_gift?: string; // *
		recipe_name?: string; // *
		seed_name?: string; // *
		plant_cost: number;
		difficulty: number;
		bed: string;
		type: string;
		days: number;
		multiplier: number;
		special: any[];
		season: Season[];
		ingredients: any[];
		icon: string;
	}

	export interface Plot {
		plant: string;
		stage: number;
		days: number;
		water: number;
		till: number;
	}
}

export {};
