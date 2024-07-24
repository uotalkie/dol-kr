declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		player: Player;

		pain: number;
		arousal: number;
		tiredness: number;
		stress: number;
		trauma: number;
		control: number;

		arousalmax: number;
		tirednessmax: number;
		stressmax: number;
		traumamax: number;
		controlmax: number;

		oxygen: number;
		oxygenmax: number;

		purity: number;
		willpower: number;
		willpowermax: number;
		submissive: number;
		beauty: number;
		delinquency: number;
		detention: number;
		cool: number;
		coolmax: number;
		masochism: number;
		drugged: number;
		hallucinogen: number;
		drunk: number;
		awareness: number;
		suspicion: number;
		shame: number;

		exhibitionism: number;
		promiscuity: number;
		deviancy: number;

		innocencestate: 0 | 1;
		innocencetrauma: number;

		controlstart: number;

		arousalmasochism: number;
		trackedArousal: int[];
		timeSinceArousal: number;

		/**
		 * Wtf is this
		 */
		masturbation_bowl: string;

		/* Player states */

		lactating: boolean;
		possessed: boolean;
		virginityProtected: boolean;

		anxiety: 0 | 1 | 2;
		nightmares: 0 | 1;
		sleeptrouble: 0 | 1;
		flashbacks: 0 | 1;
		hallucinations: 0 | 1 | 2;
		panicattacks: 0 | 1 | 2;
		dissociation: 0 | 1 | 2;
		controlled: 0 | 1;

		/* Institution modifiers - Only vaguely related to player (grace), others can be moved to game.d.ts? */

		orphan_hope: number;
		orphan_reb: number;

		locker_suspicion: number;

		grace: number;
		temple_rank: "prospective" | "initiate" | "monk" | "priest" | "bishop";

		livestock_obey: number;
		farm_yield: number;

		asylumstatus: number;

		wolfpacktrust: number;
		wolfpackfear: number;
		wolfpackferocity: number;
		wolfpackharmony: number;

		/* Player weapons */

		spray: number;
		spraymax: number;
		infinitespray: boolean;

		/* Other things */

		orgasmtrait: number;
		choketrait: number;
		rapetrait: number;
		bestialitytrait: number;
		tentacletrait: number;

		/* Personal school traits */

		mathstrait: number;
		sciencetrait: number;
		englishtrait: number;
		historytrait: number;

		backgroundTraits: string[];

		/* Volumes, lactation and similar things */

		semen_volume: number;
		semen_amount: number;
		semen_max: number;

		milk_volume: number;
		milk_amount: number;
		milk_max: number;

		milkFullPain: number;
		milkFullPainMessage: 0 | 1;
		lactation_pressure: number;

		body_temperature: "cold" | "chilly" | "comfy" | "hot" | "warm";

		/* Player sensitivities */

		mouthsensitivity: number;
		breastsensitivity: number;
		bottomsensitivity: number;
		genitalsensitivity: number;

		/* Transformations */

		cow: number;

		/* Gay ear slime stuff */

		earSlime: EarSlimeState;

		parasite: {
			penis: ParasiteState;
			clit: ParasiteState;
			parasite: ParasiteState;
			tummy: ParasiteState;
			left_ear: ParasiteState;
			right_ear: ParasiteState;
			left_thigh: ParasiteState;
			right_thigh: ParasiteState;
			left_arm: ParasiteState;
			right_arm: ParasiteState;
		};
	}
}

declare global {
	export interface Player {
		penisExist: boolean;
		vaginaExist: boolean;
		penissize: number;
		penis: string;
		vagina: string;
		gender: "m" | "f";

		virginity: {
			penile: boolean;
			vaginal: boolean;
			anal: boolean;
			temple: boolean;
			handholding: boolean;
			kiss: boolean;
		};
	}

	export interface EarSlimeState {
		corruption: number;
		growth: number;
		startedThreats: boolean;
		defyCooldown: boolean;
	}

	export interface ParasiteState {
		name: "parasite";
	}
}

export {};
