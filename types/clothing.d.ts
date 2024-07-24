type ClothesSlots = "all" | ClothedSlots;

type ClothedSlots =
	| "over_upper"
	| "over_lower"
	| "upper"
	| "lower"
	| "under_upper"
	| "under_lower"
	| "over_head"
	| "head"
	| "face"
	| "neck"
	| "hands"
	| "handheld"
	| "legs"
	| "feet"
	| "genitals";

declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		worn: {
			[x in ClothedSlots]: ClothesItem;
		};
		store: {
			[x in ClothedSlots]: ClothesItem[];
		};
		tryOn: {
			autoReset: boolean;
			ownedStored: {
				[x in ClothedSlots]: ClothesItem?;
			};
			tryingOn: {
				[x in ClothedSlots]: ClothesItem?;
			};
			showEquip: {
				[x: string]: any;
			};
			showUnderEquip: {
				[x: string]: any;
			};
			type: any;
			value: number;
		};
		carried: {
			[x in ClothedSlots]: ClothesItem;
		};
		wardrobe: {
			[x in ClothedSlots]: ClothesItem;
		};
		wardrobes: {
			shopReturn: string;
			wardrobe: {
				NOTE: string;
				unlocked: boolean;
				shopSend: boolean;
				name: string;
			};
			changingRoom: Wardrobe;
			edensCabin: Wardrobe;
			asylum: Wardrobe;
			alexFarm: Wardrobe;
			stripClub: Wardrobe;
			brothel: Wardrobe;
			schoolBoys: Wardrobe;
			schoolGirls: Wardrobe;
			prison: Wardrobe;
		};
		outfit: {
			[x in ClothedSlots]: string;
		}[];
	}

	export interface SugarCubeSetupObject {
		clothes: {
			[x in ClothesSlots]: ClothesItem[];
		};
		clothes_all_slots: ClothedSlots;
	}
}

declare global {
		export type ClothesSlots = "clothes_all_slots" | ClothedSlots;

		export type ClothedSlots =
		| "over_upper"
		| "over_lower"
		| "upper"
		| "lower"
		| "under_upper"
		| "under_lower"
		| "over_head"
		| "head"
		| "face"
		| "neck"
		| "hands"
		| "handheld"
		| "legs"
		| "feet"
		| "genitals";
		
	export interface ClothesItem {
		index: number;
		name: string;
		name_cap: string;
		name_simple: string;
		/**
		 * Folder name
		 */
		variable: string;
		integrity: number;
		integrity_max: number;
		fabric_strength: number;
		reveal: number;
		bustresize: number;
		one_piece: number;
		strap: number;
		open: number;
		word: "a";
		state: string;
		state_base: string;
		state_top: string;
		state_top_base: string;
		plural: number;
		/**
		 * key in setup.colours.prefilters identifying preprocessing required for canvas renderer.
		 * default is "clothes"
		 */
		prefilter?: string;
		colour: string | 0;
		colour_options: string[];
		colour_sidebar: 0 | 1;
		exposed: number;
		exposed_base: number;
		vagina_exposed: number;
		vagina_exposed_base: number;
		anus_exposed: number;
		anus_exposed_base: number;
		type: string[];
		set: string;
		gender: string;
		femininity: number;
		warmth: number;
		cost: number;
		description: string;
		shop: string[];
		accessory: number;
		accessory_colour: string | 0;
		accessory_colour_options: string[];
		accessory_colour_sidebar: number;
		/**
		 * if 1, then accessory files are integrity-dependent "acc_(tattered|torn|frayed|full).png"
		 */
		accessory_integrity_img?: 0 | 1;
		/**
		 * if 1, then accessory files layer under breast sprites
		 */
		accessory_layer_under?: 0 | 1;
		high_img: 0 | 1;
		back_img: 0 | 1;
		/**
		 * Recolouring of back image
		 * * "" (default) - depending on colour_sidebar
		 * * "no" - do not recolour image
		 * * "primary" - use primary/main colour
		 * * "secondary" - use secondary/accessory colour
		 */
		back_img_colour?: "" | "no" | "primary" | "secondary";
		/**
		 * (For upper, over_upper, under_upper slots)
		 * 1 if has sleeve images, named (left|right)[_cover].png".
		 * Colouring depends on sleeve_colour property.
		 */
		sleeve_img: number;
		/**
		 * (For upper, over_upper, under_upper slots)
		 * 1 if has sleeve accessory images, named (left|right)[_cover]_acc.png".
		 * These images are not colored.
		 * Requires sleeve_img: 1.
		 */
		sleeve_acc_img: number;
		/**
		 * (For upper, over_upper, under_upper slots)
		 * Recolouring of sleeves images:
		 * * "" (default) - depending on colour_sidebar
		 * * "no" - do not recolour image
		 * * "primary" - use primary/main colour
		 * * "secondary" - use secondary/accessory colour
		 */
		sleeve_colour?: "" | "no" | "primary" | "secondary";
		/**
		 * * 1 if has breast sprites and a unique image for every breast sprite
		 * * 0 if no breast sprites
		 * * Key represents breast size tier 0..6.
		 * * Value represents the image used:
		 *     - null if no clothed breast image exists for that breast size.
		 *     - 0..6 for clothed breast image used for that breast size.
		 */
		breast_img: object | 1 | 0;
		cursed: number;
		location: number;
		iconFile: string;
		accIcon: number;
		outfitPrimary: object;
		outfitSecondary: string[];
		notuck: number;
		/**
		 * (For head slots)
		 * if 1, this item has mask.png image to cut out hair & animal ears layers
		 */
		mask_img?: number;
		// TODO list and document other options
	}

	export interface Wardrobe {
		over_upper: ClothesItem[];
		over_lower: ClothesItem[];
		upper: ClothesItem[];
		lower: ClothesItem[];
		under_upper: ClothesItem[];
		under_lower: ClothesItem[];
		over_head: ClothesItem[];
		head: ClothesItem[];
		face: ClothesItem[];
		neck: ClothesItem[];
		hands: ClothesItem[];
		handheld: ClothesItem[];
		legs: ClothesItem[];
		feet: ClothesItem[];
		genitals: ClothesItem[];
		space: number;
		isolated: boolean;
		locationRequirement: any[];
		shopSend: boolean;
		transfer: boolean;
		unlocked: boolean;
	}
}

export {};
