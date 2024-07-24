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
			glasses: "broken" | "glasses" | "playerbroken";
		};
		sydneyGlassesNotice: undefined | 1;

		compoundcentre: number;
		park_fame: number;

		syndromewolves: 1;
		wolfcavepatrol: 1;

		brothelVending: {
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
			compete: number;
			tasks: any[];
		};

		farm: {
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
	}

	export interface SugarCubeSetupObject {
		feats: FeatsSetupVariables;
		LocationImages: LocationImages;
		Locations: any;
	}
}

declare global {
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
}

export {};
