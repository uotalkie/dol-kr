Renderer.CanvasModels.lighting = {
	name: "lighting",
	width: 256,
	height: 256,
	frames: 1,
	scale: false,
	generatedOptions() {
		return [];
	},
	defaultOptions() {
		return {
			lights: {
				yOffset: 59,
				xOffset: -7,
				spotlight: {
					maxAlpha: 0.6,
					radiusX: 50,
					radiusY: 15,
				},
				glow: {
					maxAlpha: 0.6,
					radiusX: 55,
					radiusY: 100,
					yOffset: -82,
				},
				gradient: {
					enabled: true,
					height: 200,
					maxAlpha: 0.6,
				},
				flat: {
					enabled: true,
					maxAlpha: 0.6,
				},
				colors: {
					default: "#ffffff",
					angel: "#ffd700",
					demon: "#8B008B",
				},
			},
		};
	},
	preprocess(options) {},
	layers: {
		spotlight: {
			srcfn(options) {
				if (!options.lights) return "";
				const spotlightCanvas = new BaseCanvas(Renderer.CanvasModels.main.width, Renderer.CanvasModels.main.height, 1);

				const centerX = spotlightCanvas.element.width / 2;
				const centerY = spotlightCanvas.element.height / 2;

				drawRadialGradient(
					spotlightCanvas.ctx,
					centerX,
					centerY,
					options.lights.xOffset,
					options.lights.yOffset,
					options.lights.spotlight.radiusX,
					options.lights.spotlight.radiusY,
					options.lights.spotlight.maxAlpha,
					V.options.lightSpotlight
				);

				return spotlightCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn(options) {
				return V.options.characterLightEnabled;
			},
			z: ZIndices.spotlight,
		},
		glow: {
			srcfn(options) {
				if (!options.lights) return "";
				const glowCanvas = new BaseCanvas(Renderer.CanvasModels.main.width, Renderer.CanvasModels.main.height, 1);

				const centerX = glowCanvas.element.width / 2;
				const centerY = glowCanvas.element.height / 2;

				drawRadialGradient(
					glowCanvas.ctx,
					centerX,
					centerY,
					options.lights.xOffset,
					options.lights.yOffset + options.lights.glow.yOffset,
					options.lights.glow.radiusX,
					options.lights.glow.radiusY,
					options.lights.glow.maxAlpha,
					V.options.lightGlow
				);

				return glowCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn() {
				return V.options.characterLightEnabled;
			},
			z: ZIndices.glowlight,
		},
		linearGradient: {
			srcfn(options) {
				if (!options.lights) return "";
				const linearGradientCanvas = new BaseCanvas(Renderer.CanvasModels.main.width, Renderer.CanvasModels.main.height, 1);

				// Draw linear gradient
				drawLinearGradient(linearGradientCanvas.ctx, options.lights.gradient.maxAlpha, V.options.lightGradient, options.lights.gradient.height);

				return linearGradientCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn(options) {
				return V.options.characterLightEnabled && options.lights.gradient.enabled;
			},
			z: ZIndices.gradientlight,
		},
		flatColorOverlay: {
			srcfn(options) {
				if (!options.lights) return "";
				const flatColorCanvas = new BaseCanvas(Renderer.CanvasModels.main.width, Renderer.CanvasModels.main.height, 1);

				const flatColor = "#ffffff";

				// Draw flat color overlay
				drawColorOverlay(flatColorCanvas.ctx, flatColor, options.lights.flat.maxAlpha, V.options.lightFlat);

				return flatColorCanvas.element;
			},
			blendfn(options) {
				return lightBlendColor(options);
			},
			blendMode: "screen",
			showfn(options) {
				return V.options.characterLightEnabled && options.lights.flat.enabled;
			},
			z: ZIndices.flatlight,
		},
	},
};

// Utility functions

function drawRadialGradient(ctx, centerX, centerY, xOffset, yOffset, radiusX, radiusY, maxAlpha, intensity) {
	const alpha = intensity * maxAlpha;
	ctx.save();
	ctx.scale(radiusX / radiusY, 1);

	const gradient = ctx.createRadialGradient(
		(centerX + xOffset) * (radiusY / radiusX),
		centerY + yOffset,
		0,
		(centerX + xOffset) * (radiusY / radiusX),
		centerY + yOffset,
		radiusY
	);

	gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
	gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.33})`);
	gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
	ctx.fillStyle = gradient;
	ctx.filter = "blur(1px)";
	ctx.imageSmoothingEnabled = true;
	ctx.fillRect(0, 0, ctx.canvas.width * (radiusY / radiusX), ctx.canvas.height);
	ctx.restore();
}

function drawLinearGradient(ctx, maxAlpha, intensity, height) {
	const alpha = intensity * maxAlpha;
	const gradient = ctx.createLinearGradient(0, 0, 0, height);
	gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
	gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, ctx.canvas.width, height);
}

function drawColorOverlay(ctx, color, maxAlpha, intensity) {
	const alpha = Math.round(intensity * maxAlpha * 255)
		.toString(16)
		.padStart(2, "0");
	const rgbaColor = tinycolor(color + alpha).toRgbString();
	ctx.fillStyle = rgbaColor;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function lightBlendColor(options) {
	if (!V.angel && !V.demon) return false;
	const baseColor = V.angel ? options.lights.colors.angel : options.lights.colors.demon;
	const factor = Math.abs((V.angel / 6 - V.demon / 6) * V.options.lightTFColor);
	return ColourUtils.interpolateColor("#ffffff", baseColor, factor);
}
