/**
 * Renders an orbital object, such as the sun or moon, at a specified position.
 * Changes position on draw() based on the position binding.
 */
Weather.Renderer.Effects.add({
	name: "skyOrbital",
	images: { orbital: "img/misc/sky/sun.png" },
	draw() {
		const x = this.position.x - this.images.orbital.width / 2;
		const y = this.position.y - this.images.orbital.height / 2;
		this.canvas.ctx.drawImage(this.images.orbital, Math.round(x), Math.round(y), this.images.orbital.width, this.images.orbital.height);
	},
});

/**
 * The moon, including the moon shadow effects, and glow.
 * init() generates the effects - usually once per day.
 * draw() simply positions it in the canvas, with the right glow color (based on dayFactor)
 */
Weather.Renderer.Effects.add({
	name: "moonWithPhases",
	images: { orbital: "img/misc/sky/moon.png" },
	effects: [
		{
			effect: "moonPhase",
			bindings: {
				position() {
					return this.position;
				},
				diameter() {
					return this.images.orbital.width;
				},
				moonPhaseFraction() {
					return this.moonPhaseFraction;
				},
			},
		},
	],
	init() {
		this.scaledGlow = this.glow.size * this.renderInstance.settings.scale;
	},
	draw() {
		const x = this.position.x - this.images.orbital.width / 2;
		const y = this.position.y - this.images.orbital.height / 2;

		// Outer glow
		this.canvas.ctx.shadowBlur = this.scaledGlow;
		this.canvas.ctx.shadowColor = ColourUtils.interpolateColor(this.glow.colorNight, this.glow.colorDay, this.dayFactor);

		// Shadow opacity
		const opacity = interpolate(this.opacity.min, this.opacity.max, normalise(this.dayFactor, 1, -1));
		this.canvas.ctx.globalAlpha = opacity;

		// Draw the shadow
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);

		// Draw the texture on top of the shadow
		this.canvas.ctx.globalAlpha = interpolate(this.shadow.opacity.min / opacity, this.shadow.opacity.max / opacity, normalise(this.dayFactor, 1, -1));
		this.canvas.ctx.globalCompositeOperation = "destination-over";
		this.canvas.ctx.drawImage(this.images.orbital, Math.round(x), Math.round(y), this.images.orbital.width, this.images.orbital.height);
	},
});

/**
 * Adds the moon texture, shadow and glow together
 */
Weather.Renderer.Effects.add({
	name: "moonPhase",
	effects: [
		{
			effect: "innerRadialGlow",
			params: {
				innerRadius: 4,
				colorInside: { min: "#ffffff00", max: "#ffffff00" },
				colorOutside: { min: "#ffffffee", max: "#ffffffee" },
				factor: 1,
			},
			bindings: {
				position() {
					return this.position;
				},
				diameter() {
					return this.images.orbital.width;
				},
			},
		},
		{
			effect: "moonShadow",
			params: {},
			bindings: {
				position() {
					return this.position;
				},
				diameter() {
					return this.images.orbital.width;
				},
				moonPhaseFraction() {
					return this.moonPhaseFraction;
				},
			},
		},
	],
	draw() {
		const x = this.position.x - this.images.orbital.width / 2;
		const y = this.position.y - this.images.orbital.height / 2;

		// Draw texture
		this.canvas.ctx.drawImage(this.images.orbital, Math.round(x), Math.round(y), this.images.orbital.width, this.images.orbital.height);

		// Draw basic inner glow
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);

		// Draw the moon shadow (phase)
		this.effects[1].draw();
		this.canvas.ctx.globalCompositeOperation = "destination-out";
		this.canvas.drawImage(this.effects[1].canvas.element);
	},
});

/**
 * Simulates the moon shadow, based on the moon-phase.
 * init() creates the moon shadow effect - usually once per day.
 * draw() simply draws it to the canvas at the right position.
 */
Weather.Renderer.Effects.add({
	name: "moonShadow",
	init() {
		// Need an offscreen canvas
		this.shadowCanvas = new this.renderInstance.Canvas();
		const centerPos = {
			x: this.shadowCanvas.element.width / 2,
			y: this.shadowCanvas.element.height / 2,
		};

		this.radius = this.diameter / 2 + 2; // + 2 to prevent any visible edges
		let moonPhaseFraction = this.moonPhaseFraction;

		// Rotate based on angle
		this.shadowCanvas.ctx.translate(centerPos.x, centerPos.y);
		this.shadowCanvas.ctx.rotate((this.shadow.angle * Math.PI) / 180);
		this.shadowCanvas.ctx.translate(-centerPos.x, -centerPos.y);

		this.shadowCanvas.ctx.fillStyle = "black";
		this.shadowCanvas.ctx.beginPath();

		let antiClockwise = false;
		let flippedRadius = this.radius;

		// Calculate the shadow arc offset based on the moon-phase
		if (moonPhaseFraction > 0.5) {
			antiClockwise = true;
			moonPhaseFraction = 1 - moonPhaseFraction;
			flippedRadius = -this.radius;
		}
		const fraction = moonPhaseFraction * 4;

		// Offset depends on if it's before or after half-moon
		const offset = fraction <= 1 ? flippedRadius * 2 * (1 - fraction) : flippedRadius * 2 * (0.5 - Math.abs(0.5 - fraction));

		if (fraction === 0) {
			// New moon
			this.shadowCanvas.ctx.arc(centerPos.x, centerPos.y, this.radius, 0, 2 * Math.PI);
		} else if (fraction === 2) {
			// Full moon
			return;
		} else {
			// Other phases
			this.shadowCanvas.ctx.moveTo(centerPos.x, centerPos.y - this.radius);
			if (fraction < 2) {
				this.shadowCanvas.ctx.arc(centerPos.x, centerPos.y, this.radius, Math.PI / 2, (3 * Math.PI) / 2, antiClockwise);
			} else {
				this.shadowCanvas.ctx.arc(centerPos.x, centerPos.y, this.radius, (3 * Math.PI) / 2, Math.PI / 2, !antiClockwise);
			}
			this.shadowCanvas.ctx.quadraticCurveTo(centerPos.x + offset, centerPos.y, centerPos.x, centerPos.y + this.radius);
		}

		this.shadowCanvas.ctx.closePath();
		this.shadowCanvas.ctx.fill();
	},
	draw() {
		const x = this.position.x - this.shadowCanvas.element.width / 2;
		const y = this.position.y - this.shadowCanvas.element.height / 2;
		this.canvas.drawImage(this.shadowCanvas.element, Math.round(x), Math.round(y));
	},
});
