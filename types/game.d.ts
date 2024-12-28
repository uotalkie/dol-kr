declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		/**
		 * Freezes all stat changes if set to true.
		 * This is not guaranteed to be set.
		 */
		statFreeze?: boolean;
		gamemode?: "normal" | "hard" | "soft";
		passage: string;
		location: string;
		phase: number | string;
		rng: number;
		danger: number;
		index: number;

		/* Time */

		timeStamp: number;
		/**
		 * Normally a number, although in some situations was assigned as potentially undefined.
		 */
		startDate: number | undefined;

		effectsmessage: number;
		loveInterest_message: number;
		loveInterestAwareMessage: 0 | 1;
		speech_attitude: "bratty" | "neutral" | "meek";
		speech_attitude_bratty_message?: 1;
		speech_attitude_meek_message?: 1;
		prof_spray_message?: 1;

		nightmareTimer?: number;
		physiquechange: 1;
		home_event_timer: number;

		renttime: number;
		babyRent: number;
		rentmoney: number;
		baileyRefusedToPayTotal: number;
		baileyRefusedToPayTotalStat: number;

		loveInterest: {
			primary: string;
			secondary: string;
		};

		robin: {
			timer: {
				customer: number;
				hurt: number;
			};
			hurtReason: "nothing";
			stayup: 0 | 1 | 2;
			moneyModifier: number;
		};
		robinpaid: undefined | 1;
		robinPayout?: 0 | 1;
		robinmoney: number;
		robindebt: number;
		robindebtlimit: number;
		robindebtevent: number;
		robineventnote?: 0 | 1;

		loft_kylar: number;
		loft_spray: number;

		whitneyromance: 0 | 1;
		bullytimer: number;
		bullytimeroutside: number;

		edenfreedom: number;
		edenshopping: number;

		sydney: {
			rank: string;
			glasses: "broken" | "glasses" | "playerbroken";
		};
		sydneyGlassesNotice: undefined | 1;

		compoundcentre: number;
		park_fame: number;

		syndromewolves: 1;
		wolfcavepatrol: 1;

		brothelVending: {
			condomsSold: number;
			condomsToRefill: number;
			total: any;
			lubeSold: number;
			lubeToRefill: number;
			products: number;
			condoms: number;
			lube: number;
			weeksRent: number;
			weeksEmpty: number;
			status: "sold";
		};
		brothelshowdata: {
			type: "none";
			missed: boolean;
			done: boolean;
			intro: boolean;
		};
		brothel_escortjob: {
			date: number;
			missed: boolean;
		};

		museuminterest: number;
		museumhorseintro?: 1 | 0;
		museumhorse?: 1;
		museumduckintro?: 1 | 0;
		museumduck?: 1;

		pound: {
			sneak: number;
			compete: number;
			tasks: any[];
		};

		farm: {
			milking: {
				alexNightEvent: boolean;
				catchChance: string /* Why tf is this a string */;
				caught: boolean;
				dayMilking: boolean;
			};
			stock?: {};
			woodland: number;
			barn: number;
			coop: number;
			kennel: number;
			still_timer: {};
			tower_guard: boolean;
			tower_guard_unpaid: number;
			tower_guard_patience: number;
		};

		photo: {
			silly: "paid" | 0;
			shoot: 0;
		};

		prof: {
			spray: number;
			net: number;
			baton: number;
			whip: number;
			pickaxe: number;
		};

		world_corruption_hard: number;
		world_corruption_soft: number;
		world_corruption_reduced: number;

		/**
		 * Controls when mousetrap should activate or not.
		 */
		tempDisable: boolean;

		chimera: ChimeraState;

		facelayer: "back" | "front";
	}

	export interface SugarCubeSetupObject {
		feats: FeatsSetupVariables;
		colours: {
			clothes: FilterMap[];
			lipstick: FilterMap[];
			condom: FilterMap[];
			blusher: FilterMap[];
			mascara: FilterMap[];
			eyeshadow: FilterMap[];
			eyes: FilterMap[];
			hair: FilterMap[];
			tentacle: FilterMap[];
			clothes_default: Partial<CompositeLayerSpec>;
			lipstick_default: Partial<CompositeLayerSpec>;
			condom_default: Partial<CompositeLayerSpec>;
			blusher_default: Partial<CompositeLayerSpec>;
			mascara_default: Partial<CompositeLayerSpec>;
			eyeshadow_default: Partial<CompositeLayerSpec>;
			eyes_default: Partial<CompositeLayerSpec>;
			hair_default: Partial<CompositeLayerSpec>;
			clothes_map: {
				[x: string]: FilterMap;
			};
			lipstick_map: {
				[x: string]: FilterMap;
			};
			blusher_map: {
				[x: string]: FilterMap;
			};
			condom_map: {
				[x: string]: FilterMap;
			};
			mascara_map: {
				[x: string]: FilterMap;
			};
			eyeshadow_map: {
				[x: string]: FilterMap;
			};
			eyes_map: {
				[x: string]: FilterMap;
			};
			hair_map: {
				[x: string]: FilterMap;
			};
			tentacle_map: {
				[x: string]: FilterMap;
			};
			hairgradients_prototypes: {
				fringe: {
					[x: string]: {
						[x: string]: HairGradient;
					};
				};
				sides: {
					[x: string]: {
						[x: string]: HairGradient;
					};
				};
			};
			sprite_prefilters: {
				[x: string]: PrefilterMap;
			};
			skin_gradients: {
				[x: string]: string[];
			};
			getSkinFilter(type: SkinColours, tone: number): Partial<CompositeLayerSpec>;
			getSkinRgb(type: SkinColours, tone: number): string;
			getSkinCSSFilter(type: SkinColours, tone: number): string;
		};
		hairstyles: {
			fringe: any[];
			sides: any[];
		};
		skinColor: {
			tanLoc: string[];
			light: SkinColourConfig;
			medium: SkinColourConfig;
			dark: SkinColourConfig;
			gyaru: SkinColourConfig;
			ylight: SkinColourConfig;
			ymedium: SkinColourConfig;
			ydark: SkinColourConfig;
			ygyaru: SkinColourConfig;
			slime: SkinColourConfig;
			ghost: SkinColourConfig;
		};
		bodyliquid: BodyLiquid;
		LocationImages: LocationImages;
		Locations: any;
	}
}

declare global {
	export type SkinColoursSimple = "custom" | "light" | "medium" | "dark" | "gyaru";
	export type SkinColours = SkinColoursSimple | "ylight" | "ymedium" | "ydark" | "ygyaru" | "slime" | "ghost";

	export interface SkinColourConfig {
		hStart: number;
		hEnd: number;
		sStart: number;
		sEnd: number;
		bStart: number;
		bEnd: number;
	}

	export interface HairGradient {
		gradient: string;
		values: number[];
		lengthFunctions: ((length: number, value: string) => string)[];
		colors: (string | number)[][];
	}

	export interface FilterMap {
		canvasfilter: Partial<CompositeLayerSpec>;
		csstext: string;
		name: string;
		name_cap: string;
		variable: string;
		natural?: boolean;
		lens?: boolean;
		dye?: boolean;
	}

	export interface PrefilterMap {
		brightness: number;
		contrast: number;
		desaturate: boolean;
	}

	export interface FeatsSetupVariables {
		[x: string]: FeatObject;
	}

	export interface FeatObject {
		title: string;
		desc: string;
		difficulty: number;
		series: string;
		filter: string[];
		hint?: string;
		pregnancyLockable?: boolean;
		pregnancySillyLockable?: boolean;
		softLockable?: boolean;
	}

	export interface ChimeraState {
		demoncat?: {
			tail?: boolean;
		};
		demoncow?: {
			horns?: boolean;
		};
		demonharpy?: {
			wings?: boolean;
		};
	}
}

export {};
