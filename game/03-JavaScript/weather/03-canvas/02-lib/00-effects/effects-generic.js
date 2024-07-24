Weather.Renderer.Effects.add({
	name: "gradiantGlow",
	defaultParameters: {
		fadeStartY: 96,
	},
	init() {
		const fadeStartHeight = this.canvas.element.height - this.fadeStartY * this.renderInstance.settings.scale;
		this.gradient = this.canvas.ctx.createLinearGradient(0, this.canvas.element.height, 0, fadeStartHeight);

		// Simple ease-out for a better gradient fade
		for (let i = 0; i <= 1; i += 0.02) {
			const easeOut = i * (2 - i);
			const color = ColourUtils.interpolateColor(this.color.glow, this.color.dark, easeOut);
			this.gradient.addColorStop(i, color);
		}
	},
	draw() {
		this.canvas.ctx.fillStyle = this.gradient;
		this.canvas.fillRect();
	},
});

Weather.Renderer.Effects.add({
	name: "colorOverlay",
	draw() {
		// Color based on the moon state and phase
		const nightColor = this.bloodMoon ? this.color.bloodMoon : ColourUtils.interpolateColor(this.color.nightDark, this.color.nightBright, this.moonFactor);
		const color = ColourUtils.interpolateTripleColor(nightColor, this.color.dawnDusk, this.color.day, this.sunFactor);
		this.canvas.ctx.fillStyle = color;
		this.canvas.fillRect();
	},
});

Weather.Renderer.Effects.add({
	name: "imageOverlay",
	defaultParameters: {
		factor: 1,
	},
	init() {
		this.elapsedTime = () => {
			if (!this.currentDate) {
				this.currentDate = new DateTime(Time.date);
			}
			return this.currentDate?.compareWith(Time.date, true) / TimeConstants.secondsPerMinute;
		};

		if (!this.x || this.elapsedTime() >= 3 * Time.minutesPerHour) {
			this.x = random(0, this.images.overlay.width);
			this.currentDate = new DateTime(Time.date);
		}
		this.scaleFactor = this.canvas.element.height / this.images.overlay.height;
	},
	draw() {
		const elapsedTime = this.elapsedTime();
		this.currentDate = new DateTime(Time.date);

		if (this.movement.speed > 0) this.x += this.movement.speed * elapsedTime;
		this.x = (this.x + this.images.overlay.width) % this.images.overlay.width;

		this.canvas.ctx.globalAlpha = this.factor * this.baseAlpha;
		this.canvas.ctx.drawImage(
			this.images.overlay,
			Math.round(this.x - this.images.overlay.width * this.scaleFactor),
			0,
			this.images.overlay.width * this.scaleFactor,
			this.images.overlay.height * this.scaleFactor
		);

		if (this.x > this.canvas.element.width - this.images.overlay.width * this.scaleFactor) {
			this.canvas.ctx.drawImage(
				this.images.overlay,
				Math.round(this.x),
				0,
				this.images.overlay.width * this.scaleFactor,
				this.images.overlay.height * this.scaleFactor
			);
		}
	},
});

Weather.Renderer.Effects.add({
	name: "outerRadialGlow",
	defaultParameters: {
		cutCenter: true,
	},
	init() {
		this.scaledOuterRadius = this.outerRadius * this.renderInstance.settings.scale;
		this.radius = this.diameter / 2;
		this.colorStopMiddle = this.radius / (this.radius + this.scaledOuterRadius);
		this.glowRadius = this.radius / 2 + this.scaledOuterRadius;
	},
	draw() {
		const { x, y } = this.position;

		const gradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius + this.scaledOuterRadius);
		const color1 = ColourUtils.interpolateTripleColor(this.colorInside.dark, this.colorInside.med, this.colorInside.bright, this.factor);
		const color2 = ColourUtils.interpolateTripleColor(this.colorOutside.dark, this.colorOutside.med, this.colorOutside.bright, this.factor);

		gradient.addColorStop(0, color1);
		gradient.addColorStop(this.colorStopMiddle, color1);
		gradient.addColorStop(1, color2);

		this.canvas.ctx.fillStyle = gradient;
		this.canvas.fillRect();

		// Cut away the middle to define the inner glow
		if (!this.cutCenter) return;
		this.canvas.ctx.globalCompositeOperation = "destination-out";
		this.canvas.ctx.fillStyle = "black";
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(Math.round(x), Math.round(y), this.radius - this.innerRadius, 0, 2 * Math.PI);
		this.canvas.ctx.fill();
	},
});

Weather.Renderer.Effects.add({
	name: "innerRadialGlow",
	defaultParameters: {
		innerRadius: 5,
	},
	init() {
		this.radius = this.diameter / 2 - 1;
		// Calculate where the inner glow is most prominent
		this.glowStart = (this.radius - this.innerRadius * this.renderInstance.settings.scale) / this.radius;
	},
	draw() {
		const { x, y } = this.position;

		const gradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.radius);
		const color1 = ColourUtils.interpolateColor(this.colorOutside.min, this.colorOutside.max, this.factor);
		const color2 = ColourUtils.interpolateColor(this.colorInside.min, this.colorInside.max, this.factor);

		gradient.addColorStop(0, color2);
		gradient.addColorStop(this.glowStart, color2);
		gradient.addColorStop(1, color1);

		this.canvas.ctx.fillStyle = gradient;
		this.canvas.ctx.beginPath();
		this.canvas.ctx.arc(Math.round(x), Math.round(y), this.radius, 0, 2 * Math.PI);
		this.canvas.ctx.fill();
	},
});
