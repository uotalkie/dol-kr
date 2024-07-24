interface ImageLocation {
    folder: string;
    base?: ImageSetting | { [key: string]: ImageSetting };
    emissive?: EmissiveSetting | { [key: string]: EmissiveSetting };
    reflective?: ReflectiveSetting;
    layerTop?: ImageSetting | { [key: string]: ImageSetting };
}

interface AnimationSetting {
    frameDelay: number | (() => number);
    cycleDelay?: number | (() => number);
    startDelay?: number | (() => number);
    startFrame?: number | (() => number);
    slider?: boolean | (() => boolean);
    frames?: number | (() => number);
}

interface ImageSetting {
    image: string;
    condition?: boolean | (() => boolean);
    waitForAnimation?: string;
    alwaysDisplay?: boolean;
    animation?: string | AnimationSetting;
    frame?: number | (() => number);
}

interface EmissiveSetting {
    image: string;
    condition?: boolean | (() => boolean);
    waitForAnimation?: string;
    alwaysDisplay?: boolean;
    animation?: string | AnimationSetting;
    color?: string;
    size?: number;
    blur?: number;
    strength?: number;
    intensity?: number | (() => number);
}

interface ReflectiveSetting {
    mask?: MaskSetting;
    [key: string]: ReflectiveProperty;
}

interface MaskSetting {
    image: string;
    alpha?: number | (() => number);
	horizon?: number | (() => number);
	waveShiftFactor?: number | (() => number);
	animationCondition?: boolean | (() => boolean);
	verticalDirection?: number | (() => number);
	verticalFactor?: number | (() => number);
	verticalSpeed?: number | (() => number);
	amplitude?: number | (() => number);
	frequency?: number | (() => number);
}

interface ReflectiveProperty {
    image: string;
	condition?: boolean | (() => boolean);
    alpha?: number | (() => number);
    gradientMask?: boolean | (() => boolean);
    alwaysDisplay?: boolean | (() => boolean);
	compositeOperation?: string | (() => string);
	animation?: string | AnimationSetting;
}
declare global {
	export interface LocationImages {
        [locationKey: string]: ImageLocation;
    }
}

export {};
