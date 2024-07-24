Weather.Renderer.Effects.add({
	name: "clouds",
	defaultParameters: {
		clouds: [],
		targetCloudCount: {},
		layerIndex: 0,
		currentWeather: null,
		overlapLimit: 0.4,
	},
	init() {
		if (!this.weatherType) return;
		const bottomY = this.bottomY * this.renderInstance.settings.scale;
		const movementSpeed = this.movement.baseSpeed * this.renderInstance.settings.scale;
		const leaveSpeed = this.movement.leaveSpeed * this.renderInstance.settings.scale;

		const updateTargetCount = () => {
			if (this.currentWeather === this.weather.name) return;
			this.currentWeather = this.weather.name;

			for (const key in this.weatherType.cloudCount) {
				if (Object.hasOwn(this.weatherType.cloudCount, key)) {
					this.targetCloudCount[key] = this.weatherType.cloudCount[key]();
				}
			}
		};

		this.generateClouds = (offScreen = true, randomPosition = false) => {
			const allClouds = this.clouds.flat();
			const cloudsByType = allClouds.reduce((acc, cloud) => {
				(acc[cloud.type] = acc[cloud.type] || []).push(cloud);
				return acc;
			}, {});

			// Reset movement speed of all clouds
			allClouds.forEach(cloud => {
				cloud.movementSpeed = movementSpeed;
			});

			Object.entries(this.targetCloudCount).forEach(([type, targetCount]) => {
				const allCloudsOfType = cloudsByType[type] || [];
				const currentCount = allCloudsOfType.length;
				const cloudsNeeded = targetCount - currentCount;

				if (cloudsNeeded <= 0) {
					if (cloudsNeeded < 0) {
						// Increase movement for excessive clouds to make them leave the canvas faster
						// in case of a weather change
						allCloudsOfType.slice(-cloudsNeeded).forEach(cloud => {
							cloud.movementSpeed = leaveSpeed;
						});
					}
					return;
				}

				// Shuffle sprites to reduce duplicates (same sprite generating twice in a row)
				const shuffledSprites = [...this.types[type]].shuffle();

				// Add cloud to the least populated layer, starting with layer 0 - for a more even spread
				for (let i = 0; i < cloudsNeeded; i++) {
					const layerIndex = this.clouds
						.map((layer, index) => ({ index, count: layer.length }))
						.reduce((minLayer, layer) => (layer.count < minLayer.count ? layer : minLayer), { index: 0, count: Infinity }).index;
					const spriteIndex = i % shuffledSprites.length;
					const sprite = this.images[shuffledSprites[spriteIndex]];
					const layerSettings = this.layers[layerIndex];

					let cloud = null;
					let attempts = 0;

					do {
						let x = offScreen ? -sprite.width : random(0, this.canvas.element.width) - sprite.width / 2;
						if (offScreen && randomPosition) {
							x -= random(0, this.canvas.element.width / 2);
						}
						const y = random(
							layerSettings.height.min * this.renderInstance.settings.scale,
							Math.min(layerSettings.height.max * this.renderInstance.settings.scale, bottomY - sprite.height)
						);
						cloud = { sprite, type, x, y, z: layerIndex, movementSpeed, width: sprite.width, height: sprite.height };
						attempts++;
					} while (attempts < 5 && Weather.Renderer.Sky.isOverlappingAny(cloud, this.clouds[layerIndex], this.overlapLimit));

					this.clouds[layerIndex].push(cloud);
				}
			});
		};

		this.elapsedTime = () => {
			if (!this.currentDate) {
				this.currentDate = new DateTime(Time.date);
			}
			return this.currentDate?.compareWith(Time.date, true) / TimeConstants.secondsPerMinute;
		};

		this.reset = () => {
			this.clouds = [];
		};

		updateTargetCount();
		if (!this.clouds.length || this.elapsedTime() >= 3 * Time.minutesPerHour) {
			for (let i = 0; i < this.layers.length; i++) {
				this.clouds[i] = [];
			}
			this.currentDate = new DateTime(Time.date);
			this.generateClouds(false);
			return;
		}
		this.generateClouds(true, true);
	},
	draw() {
		const elapsedTime = this.elapsedTime();
		this.currentDate = new DateTime(Time.date);
		let cloudGeneration = false;

		for (let layerIndex = this.layers.length - 1; layerIndex >= 0; layerIndex--) {
			const cloudLayer = this.clouds[layerIndex];
			if (!cloudLayer || cloudLayer.length === 0) {
				continue;
			}
			const cloudCanvas = new this.renderInstance.Canvas();
			const layerSettings = this.layers[layerIndex];
			let i = 0;
			while (cloudLayer[i]) {
				const cloud = cloudLayer[i];
				cloud.x += (cloud.movementSpeed / (1 + layerIndex * layerSettings.speedFactor)) * elapsedTime;

				// Remove off-screen clouds
				if (cloud.x > cloudCanvas.element.width) {
					cloudLayer.splice(i, 1);
					cloudGeneration = true;
					continue;
				}

				cloudCanvas.ctx.drawImage(cloud.sprite, Math.round(cloud.x), Math.round(cloud.y), cloud.sprite.width, cloud.sprite.height);
				i++;
			}
			cloudCanvas.ctx.globalAlpha = layerSettings.alpha;
			cloudCanvas.ctx.fillStyle = layerSettings.color;
			cloudCanvas.ctx.globalCompositeOperation = "source-atop";
			cloudCanvas.fillRect();
			this.canvas.drawImage(cloudCanvas.element);
		}

		if (cloudGeneration) this.generateClouds();
	},
});

Weather.Renderer.Effects.add({
	name: "cirrus",
	defaultParameters: {
		clouds: [],
		targetCount: 0,
		currentWeather: null,
		overlapLimit: 0.3,
	},
	init() {
		const movementSpeed = this.movement.speed * this.renderInstance.settings.scale;
		const updateTargetCount = () => {
			if (this.currentWeather === this.weather.name) return;
			this.currentWeather = this.weather.name;
			this.targetCount = random(this.count.min, this.count.max);
		};

		this.generateClouds = (offScreen = true, randomPosition = false) => {
			const currentCount = this.clouds.length;
			const cloudsNeeded = this.targetCount - currentCount;

			// Shuffle sprites to reduce duplicates (same sprite generating twice in a row)
			const shuffledSprites = Object.values(this.images).shuffle();

			for (let i = 0; i < cloudsNeeded; i++) {
				const spriteIndex = i % shuffledSprites.length;
				const sprite = shuffledSprites[spriteIndex];

				let cloud = null;
				let attempts = 0;

				do {
					let x = offScreen ? -sprite.width : random(-sprite.width, this.canvas.element.width - sprite.width / 2);
					if (offScreen && randomPosition) {
						x -= random(0, this.canvas.element.width / 2);
					}
					const y = random(this.height.min * this.renderInstance.settings.scale, this.height.max * this.renderInstance.settings.scale);
					cloud = { sprite, x, y, movementSpeed, width: sprite.width, height: sprite.height };
					attempts++;
				} while (attempts < 5 && Weather.Renderer.Sky.isOverlappingAny(cloud, this.clouds, this.overlapLimit));

				this.clouds.push(cloud);
			}
		};

		this.elapsedTime = () => {
			if (!this.currentDate) {
				this.currentDate = new DateTime(Time.date);
			}
			return this.currentDate?.compareWith(Time.date, true) / TimeConstants.secondsPerMinute;
		};

		updateTargetCount();
		if (!this.clouds.length || this.elapsedTime() >= 3 * Time.minutesPerHour) {
			this.currentDate = new DateTime(Time.date);
			this.generateClouds(false);
			return;
		}
		this.generateClouds(true, true);
	},
	draw() {
		const elapsedTime = this.elapsedTime();
		this.currentDate = new DateTime(Time.date);
		let cloudGeneration = false;

		if (!this.clouds.length) {
			return;
		}

		let i = 0;
		while (this.clouds[i]) {
			const cloud = this.clouds[i];
			cloud.x += cloud.movementSpeed * elapsedTime;

			// Remove off-screen clouds
			if (cloud.x > this.canvas.element.width) {
				this.clouds.splice(i, 1);
				cloudGeneration = true;
				continue;
			}

			this.canvas.ctx.globalAlpha = this.factor * this.baseAlpha;
			this.canvas.ctx.drawImage(cloud.sprite, Math.round(cloud.x), Math.round(cloud.y), cloud.sprite.width, cloud.sprite.height);
			i++;
		}

		if (cloudGeneration) this.generateClouds();
	},
});

Weather.Renderer.Effects.add({
	name: "overcast",
	effects: [
		{
			effect: "imageOverlay",
			bindings: {
				images() {
					return {
						overlay: this.images.overcast,
					};
				},
				factor() {
					return this.overcastFactor;
				},
			},
		},
	],
	init() {
		if (this.currentWeather === this.weather.name) return;
		this.currentWeather = this.weather.name;
		this.effects[0].init();
	},
	draw() {
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);
	},
});

Weather.Renderer.Effects.add({
	name: "fog",
	effects: [
		{
			effect: "imageOverlay",
			bindings: {
				images() {
					return {
						overlay: this.images.fog,
					};
				},
				factor() {
					return this.fogFactor;
				},
			},
		},
	],
	init() {
		this.effects[0].init();
	},
	draw() {
		this.effects[0].draw();
		this.canvas.drawImage(this.effects[0].canvas.element);
	},
});
