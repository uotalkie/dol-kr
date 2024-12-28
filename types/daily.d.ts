declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		daily: {
			dawnCheck: any;
			noonCheck: any;
			kylar: any;
			school: {
				attended(attended: any): unknown;
				lunchEaten: boolean;
			};
			milkFullPainMessage: boolean;
			graceUp: boolean;
		};
	}
}

export {};
