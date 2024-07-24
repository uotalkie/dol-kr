declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		debug: 0 | 1;
		event?: {
			buffer: EventNpc[];
			schema: number;
		};
		/** @deprecated */
		eventslot?: number;
		/** @deprecated */
		eventtime?: number;
	}
}

declare global {
	export interface Window {
		EventSystem: EventData;
	}

	export interface EventNpc {
		slot: number;
		time: number;
		area: string[];
	}
}

export {};
