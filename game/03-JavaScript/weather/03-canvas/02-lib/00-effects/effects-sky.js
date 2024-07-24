/**
 * Sky gradient effect, simulating transitions between different times of day
 */
Weather.Renderer.Effects.add({
	name: "skyGradiant",
	init() {
		this.scaledRadius = this.radius * this.renderInstance.settings.scale;
	},
	draw() {
		const { x, y } = this.position;
		const sunGradient = this.canvas.ctx.createRadialGradient(x, y, 0, x, y, this.scaledRadius);

		// Interpolate between night - dawn/dusk - day
		const color1 = ColourUtils.interpolateTripleColor(this.color.colorMin.close, this.color.colorMed.close, this.color.colorMax.close, this.factor);
		const color2 = ColourUtils.interpolateTripleColor(this.color.colorMin.far, this.color.colorMed.far, this.color.colorMax.far, this.factor);

		sunGradient.addColorStop(0, color1);
		sunGradient.addColorStop(1, color2);

		this.canvas.ctx.fillStyle = sunGradient;
		this.canvas.fillRect();
	},
});

/**
 * Generates a random star-field on init() based on the starsConfig parameters.
 * Rotates the starfield on draw() based on the rotation binding.
 */
Weather.Renderer.Effects.add({
	name: "skyStarField",
	defaultParameters: {
		starSize: 2,
	},
	init() {
		this.scaledArea = this.area * this.renderInstance.settings.scale;
		this.scaledStarSize = this.starSize * this.renderInstance.settings.scale;
		this.scaledMinDistance = this.starsConfig.minDistance * this.renderInstance.settings.scale;
		this.scaledPivotX = this.pivot.x * this.renderInstance.settings.scale;
		this.scaledPivotY = this.pivot.y * this.renderInstance.settings.scale;
		// Returns a random star based on the weights from spriteOptions
		const getRandomStar = () => {
			const options = Object.entries(this.spriteOptions).map(([key, value]) => {
				return { key, weight: value.weight };
			});
			const totalWeight = options.reduce((sum, { weight }) => sum + weight, 0);
			let choice = State.random() * totalWeight;
			for (const { key, weight } of options) {
				if ((choice -= weight) < 0) {
					return key;
				}
			}
		};

		// Returns a random colour based on the starsConfig colorRange array
		const getRandomStarColor = spriteKey => {
			const spriteOption = this.spriteOptions[spriteKey];
			if (spriteOption && spriteOption.randomColor === false) {
				return "transparent";
			}
			const interpolateFrom = this.starsConfig.colorRange;
			const interpolateTo = interpolateFrom.slice(0, -1)[0];

			if (!interpolateFrom.length) return interpolateTo;
			return ColourUtils.interpolateColor(either(interpolateFrom), interpolateTo, State.random());
		};

		const radius = this.scaledArea / 2;
		this.stars = [];

		// Create all the stars
		for (let i = 0; i < this.starsConfig.count; i++) {
			let tooClose;
			let attempts = 0;
			let newStar;
			// Make sure it doesn't generate stars too close to other stars
			do {
				const distance = State.random() * radius; // Random radius
				const angle = State.random() * Math.PI * 2; // Random angle

				const spriteKey = getRandomStar();

				// Since we are generating in a circular area we have to convert the radius/distance to x/y coordinates
				newStar = {
					x: this.scaledPivotX + distance * Math.cos(angle),
					y: this.scaledPivotY + distance * Math.sin(angle),
					sprite: spriteKey === "square" ? null : this.images[spriteKey],
					color: getRandomStarColor(spriteKey),
					glowSize: this.spriteOptions[spriteKey].glowSize * this.renderInstance.settings.scale,
					glowColor: this.spriteOptions[spriteKey].glowColor,
				};

				// Check distance from existing stars
				for (const star of this.stars) {
					const dx = newStar.x - star.x;
					const dy = newStar.y - star.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < this.scaledMinDistance) {
						tooClose = true;
						break;
					}
				}

				// Give up if too many attempts
				attempts++;
				if (attempts > 100) {
					break;
				}
			} while (tooClose);

			if (!tooClose) {
				this.stars.push(newStar);
			}
		}
	},
	draw() {
		const directionMultiplier = this.rotationClockwise ? 1 : -1;
		const radians = directionMultiplier * this.rotation * (Math.PI / 180);
		const cos = Math.cos(radians);
		const sin = Math.sin(radians);
		this.canvas.ctx.globalAlpha = this.alpha;

		// Rotate the stars around the pivot point
		this.stars.forEach(star => {
			const relativeX = star.x - this.scaledPivotX;
			const relativeY = star.y - this.scaledPivotY;
			const rotatedX = Math.round(cos * relativeX - sin * relativeY + this.scaledPivotX);
			const rotatedY = Math.round(sin * relativeX + cos * relativeY + this.scaledPivotY);

			// Cull stars that are behind the moon - since the moon shadow is transparent
			const dx = rotatedX - this.moonPosition.x;
			const dy = rotatedY - this.moonPosition.y;
			const distanceFromMoonCenter = Math.sqrt(dx * dx + dy * dy);
			if (distanceFromMoonCenter < this.moonDiameter / 2 + 1) {
				return;
			}

			// Draw the stars
			this.canvas.ctx.save();
			if (star.sprite) {
				if (star.glowSize) {
					this.canvas.ctx.shadowColor = star.glowColor || star.color;
					this.canvas.ctx.shadowBlur = star.glowSize;
				}
				this.canvas.drawImage(star.sprite, rotatedX, rotatedY);

				if (star.color !== "transparent") {
					this.canvas.ctx.globalCompositeOperation = "source-atop";
					this.canvas.ctx.fillStyle = star.color;
					this.canvas.ctx.fillRect(rotatedX, rotatedY, star.sprite.width, star.sprite.height);
				}
			} else {
				this.canvas.ctx.fillStyle = star.color;
				this.canvas.ctx.fillRect(rotatedX, rotatedY, this.scaledStarSize, this.scaledStarSize);
			}
			this.canvas.ctx.restore();
		});
	},
});
