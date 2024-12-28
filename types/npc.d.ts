declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		NPCList: [Npc, Npc, Npc, Npc, Npc, Npc];

		enemytype: string;

		kylarwatched: boolean;
		kylar: {
			timer: any;
			riddle: number;
			fountain: 0 | 1;
		};
	}
}

declare global {
	export type HumanoidTypes =
		| "human"
		| "dogboy"
		| "doggirl"
		| "wolfboy"
		| "wolfgirl"
		| "bearboy"
		| "beargirl"
		| "pigboy"
		| "piggirl"
		| "catboy"
		| "catgirl"
		| "dolphinboy"
		| "dolphingirl"
		| "lizardboy"
		| "lizardgirl"
		| "cowgirl"
		| "bullboy"
		| "foxboy"
		| "foxgirl";

	export type BestialTypes =
		| "dog"
		| "cat"
		| "pig"
		| "bull"
		| "wolf"
		| "dolphin"
		| "lizard"
		| "bear"
		| "boar"
		| "creature"
		| "horse"
		| "centaur"
		| "fox"
		| "hawk"
		| "harpy"
		| "cow"
		| "spider";

	export type PlantTypes = "plant";

	export type CharacterTypes = HumanoidTypes | BestialTypes | PlantTypes;

	export interface Npc {
		virginity: any;
		outfits: any;
		/**
		 * The name... NaM
		 */
		nam: string;
		init: 0 | 1;
		intro: 0 | 1;
		state: "active" | "prison" | "";
		type: CharacterTypes;
		description: string;
		fullDescription: string;
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

		stance: "top" | "topface";
		ballssize: number;
		bottomsize: number;
		breastdesc: string;
		breastsdesc: string;
		breastsize: number;
		penis:
			| "anusentrance"
			| "anusimminent"
			| "anus"
			| "anusentrancedouble"
			| "anusdouble"
			| "penisentrance"
			| "penisimminent"
			| "penis"
			| "vaginaentrance"
			| "vaginaimminent"
			| "vagina"
			| "vaginaentrancedouble"
			| "vaginaimminentdouble"
			| "vaginadouble"
			| "mouthentrance"
			| "mouthimminent"
			| "mouth"
			| "othermouth"
			| "feet"
			| "footjob"
			| "leftarm"
			| "rightarm"
			| "thighs"
			| "cheeks"
			| "chest"
			| "clothed"
			| "none"
			| 0;
		penisdesc: string;
		penissize: number;
		vagina: "penisentrance" | "penisimminent" | "penis" | "clothed" | "none";

		condom: Condom;

		strapon?: {
			state: "worn";
			color: "black" | "red" | "pink" | "purple" | "fleshy" | "blue" | "green";
			description: string;
			size: number;
		};

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
		active: "active" | boolean | undefined;
		index?: number;

		mouth?: string | 0;
		lefthand?: string | 0;
		righthand?: string | 0;
	}
}

export {};
