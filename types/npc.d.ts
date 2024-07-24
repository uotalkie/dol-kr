declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		NPCList: [Npc, Npc, Npc, Npc, Npc, Npc];

		enemytype: string;

		kylarwatched: boolean;
		kylar: {
			fountain: 0 | 1;
		};
	}
}

declare global {
	export interface Npc {
		/**
		 * The name... NaM
		 */
		nam: string;
		init: 0 | 1;
		intro: 0 | 1;
		state: "active" | "prison" | "";
		type: "human";
		description: string;
		title: string;

		/**
		 * The sex of the NPC. Not gender.
		 */
		gender: "m" | "f";
		/**
		 * The gender of the NPC.
		 *
		 * - m: male
		 * - f: female
		 * - i: Ivory Wraith
		 */
		pronoun: "m" | "f" | "i";
		pronouns: {
			boy: string;
			he: string;
			hers: string;
			him: string;
			himself: string;
			his: string;
			man: string;
			men: string;
		};

		pregnancy: {};
		pregnancyAvoidance: number;

		adult: 0 | 1;
		teen: 0 | 1;

		insecurity: string;
		skincolour: string;
		eyeColour: string;
		hairColour: string;

		ballssize: number;
		bottomsize: number;
		breastdesc: string;
		breastsdesc: string;
		breastsize: number;
		penis: "clothed" | "none" | 0;
		penisdesc: string;
		penissize: number;
		vagina: "clothed" | "none";

		chastity: {
			penis: string;
			vagina: string;
			anus: string;
		};

		love: number;
		lust: number;
		trauma: number;
		dom: number;
		rage: number;
		trust: number;
		purity: number;
		corruption: number;

		/* These options were not found immediately on game start */
		active?: boolean;
		index?: number;

		mouth?: string | 0;
		lefthand?: string | 0;
		righthand?: string | 0;
	}
}

export {};
