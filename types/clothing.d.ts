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
		moddedClothes: {
			[x in ClothesSlots]: ClothesItem[];
		};
		clothes_all_slots: ClothedSlots[];
		clothingStates: ZeroedClothingStates[];
	}
}

declare global {
	export type ClothingStates = "chest" | "midriff" | "waist" | "thighs" | "knees" | "ankles" | "totheside";

	export type ZeroedClothingStates = 0 | ClothingStates;

	export type TotalClothingStates = ZeroedClothingStates | "default" | "full" | "bound" | "handjob" | "up" | "down" | "footjob" | "neck" | "worn";

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
		name_simple?: string;
		/**
		 * Folder name
		 */
		variable: string;
		/**
		 *
		 */
		combat?: {
			reference?: string;
			renderType?: CombatClothingTypes;
			hasMainImg?: boolean;
			hasSleeves?: boolean;
			hasSleevesAcc?: boolean;
			hasBreasts?: boolean;
			hasBreastsAcc?: boolean;
			hasJoinedLimbs?: boolean;
			hasJoinedLimbsAcc?: boolean;
			accessory?: boolean;
			mainColour?: string;
			accColour?: string;
			sleeveAccColour?: string;
			sleeveColour?: string;
			boundable?: boolean;
		};
		integrity?: number;
		integrity_max?: number;
		fabric_strength?: number;
		reveal?: number;
		bustresize?: number;
		one_piece?: number;
		strap?: number;
		open?: number;
		/**
		 * a: A skirt.
		 *
		 * n: Pyjamas.
		 *
		 * an: An outfit.
		 */
		word: "a" | "n" | "an";
		state: ZeroedClothingStates;
		state_base: 0 | string;
		state_top?: 0 | string;
		state_top_base?: 0 | string;
		skirt?: 0 | 1;
		skirt_down?: 0 | 1;
		/**
		 * 0 - Not exposed.
		 *
		 * 1 - For under_lower, this is fully exposed genitals. For under_upper, this is fully exposed breasts.
		 *
		 * 2 - Fully exposed for all else.
		 */
		exposed?: 0 | 1 | 2;
		plural: number;
		exposed: number;
		exposed_base?: number;
		vagina_exposed?: number;
		vagina_exposed_base?: number;
		anus_exposed?: number;
		anus_exposed_base?: number;
		type: string[];
		set?: string;
		gender?: string;
		femininity?: number;
		warmth: number;
		cost?: number;
		description: string;
		shop?: string[];
		/**
		 * key in setup.colours.prefilters identifying preprocessing required for canvas renderer.
		 * default is "clothes"
		 */
		prefilter?: string;
		colour: 0 | string;
		colour_options?: string[];
		colour_sidebar?: 0 | 1 | "primary";
		/**
		 * if 1, then sidebar image and colour array reference special sprites (ex. one "jar of jam" prop with images right_apple.png, right_blackberry.png, etc. and a colour array of ["apple", "blackberry"...]) instead of separate "jar of apple jam", "jar of blackberry jam", etc. items"
		 */
		colour_combat?: 0 | string;
		colourCustom?: string;
		pattern?: 0 | string;
		pattern_options?: string[];
		pattern_caption?: boolean;
		pattern_layer?: "secondary";
		accessory: number;
		accessory_colour?: 0 | string;
		accessory_colour_options?: string[];
		accessory_colour_sidebar?: 0 | 1 | string;
		accessory_colour_combat?: 0 | string;
		accessory_colourCustom?: string;
		/**
		 * if 1, then accessory files are integrity-dependent "acc_(tattered|torn|frayed|full).png"
		 */
		accessory_integrity_img?: 0 | 1;
		/**
		 * if 1, then accessory files layer under breast sprites
		 */
		accessory_layer_under?: 0 | 1;
		high_img?: 0 | 1;
		back_img?: 0 | 1 | "combat";
		back_img_acc?: 0 | 1 | "combat";
		back_img_acc_colour?: string;
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
		sleeve_img?: number;
		/**
		 * (For upper, over_upper, under_upper slots)
		 * 1 if has sleeve accessory images, named (left|right)[_cover]_acc.png".
		 * These images are not colored.
		 * Requires sleeve_img: 1.
		 */
		sleeve_acc_img?: number;
		/**
		 * (For upper, over_upper, under_upper slots)
		 * Recolouring of sleeves images:
		 * * "" (default) - depending on colour_sidebar
		 * * "no" - do not recolour image
		 * * "primary" - use primary/main colour
		 * * "secondary" - use secondary/accessory colour
		 */
		sleeve_colour?: "" | "none" | "no" | "primary" | "secondary";
		/**
		 * * 1 if has breast sprites and a unique image for every breast sprite
		 * * 0 if no breast sprites
		 * * Key represents breast size tier 0..6.
		 * * Value represents the image used:
		 *     - null if no clothed breast image exists for that breast size.
		 *     - 0..6 for clothed breast image used for that breast size.
		 */
		breast_img?: object | 1 | 0;
		cursed?: number;
		location?: number;
		iconFile?: 0 | string;
		accIcon?: 0 | string;
		outfitPrimary?: object;
		outfitSecondary?: string[];
		notuck?: number | "tie";
		has_collar?: 0 | 1;
		/**
		 * (For head slots)
		 * if 1, this item has mask.png image to cut out hair & animal ears layers
		 */
		mask_img?: 0 | 1 | "combat";
		collared?: 0 | 1;
		rearresize?: number;
		short?: 0 | 1;
		mainImage?: 0 | string;
		shopGroup?: string;
		pregType?: 0 | string;
		formfitting?: 1;
		oldVariable?: {
			name: string;
			variable: string;
		}[];
		breast_acc_img?: object | 1 | 0;
		accImage?: 0 | 1;
		breast_combat?: 0 | 1;
		anal_shield?: 0 | 1 | null;
		penis_img?: 0 | 1;
		penis_acc_img?: 0 | 1;
		no_aside?: 0 | 1;
		hideUnderLower?: string[];
		size?: number;
		altsleeve?: string;
		altposition?: string;
		altdisabled?: string[];
		zip?: 0 | 1;
		integrity_mask_img?: 0 | 1;
		hoodposition?: "down" | "up";
		altDamage?: "metal" | "plastic" | "parasite";
		penisSize?: boolean;
		hood?: 0 | 1;
		// Handheld item held over head, or alternate limb position used
		holdPosition?: "right_cover" | "left_cover" | "cover_both" | "idle" | "clutch" | "over_head" | "hold";
		coverBackImage?: 0 | 1;
		coverImage?: 0 | 1;
		leftImage?: 0 | 1;
		rightImage?: 0 | 1;
		mask_img_ponytail?: 0 | 1;
		head_type?: "veil" | "hat";
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

	function getCustomClothesColourCanvasFilter(hue: number, saturation: number, brightness: number, contrast: number, sepia = 0): CompositeLayerSpec;

	function getCustomClothesColourCanvasFilter(filter: string): CompositeLayerSpec;
}

export {};
