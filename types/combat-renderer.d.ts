declare module "twine-sugarcube" {
	export interface SugarCubeTemporaryVariables {
		multiCombatModels: {
			[x: string]: MultiCanvasModel;
		};
	}
}

declare global {
	export type SpritePositions = "doggy" | "missionary";

	export type CombatClothingTypes = "skirt" | "longskirt" | "trousers" | "shorts" | "waisthighs" | "thighhighs" | "kneehighs" | "ankled" | "strapon";

	export type PenetratorTypes = "human" | "strapon" | "knotted" | "equine" | "feline" | "sus";

	export type PenetratorPositions = "vagina" | "anus" | "butt" | "thighs" | "chest" | "chest" | "mouth" | "leftarm" | "rightarm" | "feet" | "penis";

	export type NpcStates = PenetratorPositions;

	export type PenetratorStates = "penetrating" | "imminent" | "entrance" | "rubbing";

	export type SwarmTypes = "fish" | "eels" | "spiders" | "worms" | "snakes" | "maggots" | "slime";

	export interface Penetrator {
		type: PenetratorTypes;
		size: number;
		colour: string;
		target: number;
		position: PenetratorPositions?;
		state: PenetratorStates?;
		isEjaculating: boolean;
		ejaculate: Ejaculate;
		condom: CondomOptions;
		show: boolean;
	}

	export interface Condom {
		colour: string;
		state: string;
		type: string;
		willUse: boolean;
		worn: boolean;
	}

	export interface CondomOptions {
		show: boolean;
		isDefective: boolean;
		volume: number;
		colour: Partial<CompositeLayerSpec>;
	}

	export interface SwarmPenetrationOptions {
		imminent: boolean;
		penetrating: boolean;
	}

	export interface SwarmOptions {
		show: boolean;
		src: string;
		root: string;
		position: SpritePositions;
		animKey: string;
		animKeyImminent: string;
		animKeyPenetrating: string;
		type: SwarmTypes;
		amount: number;
		vaginal: SwarmPenetrationOptions;
		penile: SwarmPenetrationOptions;
		anal: SwarmPenetrationOptions;
	}

	export interface ClothingRendererStepState {
		layered?: boolean;
		legged?: boolean;
	}

	export interface CombatOverrides {
		legBackPosition?: "up" | "down" | "footjob";
		legFrontPosition?: "up" | "down" | "footjob";
	}

	interface Window {
		CloseCombatMapper?: typeof CloseCombatMapper;
		XrayCombatMapper?: typeof XrayCombatMapper;
		CombatRenderer?: typeof CombatRenderer;
		PlayerCombatMapper?: typeof PlayerCombatMapper;
		PlayerCanvasHelper?: typeof PlayerCanvasHelper;
		NpcCombatMapper?: typeof NpcCombatMapper;
		NpcCanvasHelper?: typeof NpcCanvasHelper;
		SwarmCombatMapper?: typeof SwarmCombatMapper;
		CombatEditor?: typeof CombatEditor;
	}

	interface CanvasModelLayers<T extends Options> {
		show?: boolean;
		showfn?(options: T): boolean;
		src?: string;
		srcfn?(options: T): string;
		z?: number;
		zfn?(options: T): number;
		alpha?: number;
		alphafn?(options: T): number;
		desaturate?: boolean;
		desaturatefn?(options: T): boolean;
		brightness?: number;
		brightnessfn?(options: T): number;
		contrast?: number;
		contrastfn?(options: T): number;
		blendMode?: string;
		blendModefn?(options: T): string;
		blend?: string;
		blendfn?(options: T): string;
		masksrc?: string | HTMLCanvasElement | MaskObject;
		masksrcfn?(options: T): string | HTMLCanvasElement | MaskObject | null;
		animation?: string;
		animationfn?(options: T): string;
		frames?: number;
		framesfn?(options: T): number;
		filters?: string[];
		filtersfn?(options: T): string[] | object[];
		dx?: number;
		dxfn?(options: T): number;
		dy?: number;
		dyfn?(options: T): number;
		/**
		 * Set in the renderer by each keyframe. Used in conjunction with dx to calculate position of the layer per frame.
		 */
		frameDx?: number;
		/**
		 * Set in the renderer by each keyframe. Used in conjunction with dx to calculate position of the layer per frame.
		 */
		frameDy?: number;
		width?: number;
		widthfn?(options: T): number;
		height?: number;
		heightfn?(options: T): number;
	}

	interface CanvasModelOptions<T extends Options> {
		name: string;
		width: number;
		height: number;
		frames: number;
		metadata?: object;
		scale?: boolean;
		layers: {
			[x: string]: CanvasModelLayers<T>;
		};
		generatedOptions(): string[];
		defaultOptions(): T;
		preprocess(options: T): void;
	}

	interface CanvasModel<T extends Options> {
		defaultOptions(): T;
		createCanvas(cssAnimated: boolean): CanvasRenderingContext2D;
		reset(): void;
		showLayer(name: string, filters: object): void;
		hideLayer(name: string): void;
		render(canvas: CanvasRenderingContext2D, options: T, listener: CanvasListener): void;
		animate(canvas: CanvasRenderingContext2D, options: T, listener: CanvasListener): AnimatingCanvas;
		redraw(): void | Renderer.AnimatingCanvas;
		preprocess(options: T): void;
		compile(options: T): CompositeLayerSpec[];
	}
}

export {};
