Weather.Renderer.Effects.add({
	name: "precipitation",
	defaultParameters: {
		animationFrames: [],
		animation: null,
		position: {
			diagonalOffset: 0,
			offset: 0,
		},
	},
	init() {
		const scaledFrameWidth = this.frameWidth * this.renderInstance.settings.scale;
		const scaledFrameHeight = this.images.precipitation.height;
		const numFrames = this.images.precipitation.width / scaledFrameWidth;

		const spriteRows = Math.max(1, Math.ceil(this.canvas.element.height / scaledFrameHeight));

		const effectiveFrameWidth = scaledFrameWidth + this.position.offset;
		const spriteColumns = Math.max(1, Math.ceil((this.canvas.element.width - this.position.offset) / effectiveFrameWidth));

		const precipitationSheet = new BaseCanvas(scaledFrameWidth * numFrames * spriteColumns, scaledFrameHeight * spriteRows);
		const precipitationFrame = new BaseCanvas(scaledFrameWidth * spriteColumns, scaledFrameHeight * spriteRows);

		// Fills the canvas with looping sprites - then repeat it for every frame of the animation and draw it into a new canvas
		for (let i = 0; i < numFrames; i++) {
			precipitationFrame.clear();

			for (let r = 0; r < spriteRows; r++) {
				const rowOffset = r * this.position.diagonalOffset;
				const adjustedColumns = spriteColumns + (rowOffset < 0 ? Math.ceil(Math.abs(rowOffset) / effectiveFrameWidth) : 0);

				const y = r * scaledFrameHeight;
				for (let c = 0; c < adjustedColumns; c++) {
					// Apply this.offset to the x-coordinate calculation
					const x = c * effectiveFrameWidth + rowOffset + this.position.offset;
					const frameX = i * scaledFrameWidth;

					if (x + scaledFrameWidth > 0 && x < precipitationFrame.element.width) {
						precipitationFrame.ctx.drawImage(
							this.images.precipitation,
							frameX,
							0,
							scaledFrameWidth,
							this.images.precipitation.height,
							x,
							y,
							scaledFrameWidth,
							scaledFrameHeight
						);
					}
				}
			}

			const destX = i * scaledFrameWidth * spriteColumns;
			precipitationSheet.ctx.drawImage(
				precipitationFrame.element,
				0,
				0,
				precipitationFrame.element.width,
				precipitationFrame.element.height,
				destX,
				0,
				precipitationFrame.element.width,
				precipitationFrame.element.height
			);
		}

		const frameTotalWidth = precipitationSheet.element.width / numFrames;
		this.frameTotalWidth = precipitationSheet.element.width / numFrames;

		const animationOptions = {
			image: precipitationSheet.element,
			canvas: this.canvas,
			frameDelay: this.frameDelay, // Will never be lower than the layer updateRate
			numFrames,
			cycleDelay: 0,
			offset: frameTotalWidth,
		};

		this.animation = new Weather.Renderer.Animation(animationOptions);
		this.parentLayer.animationGroup.add(this.imagePaths.precipitation, this.animation);
		this.animation.enable();
	},
	onEnable() {
		this.animation?.enable();
	},
	onDisable() {
		this.animation?.disable();
	},
	draw() {
		if (!this.animation) return;
		this.canvas.ctx.globalAlpha = this.alpha;
		this.animation.draw();
	},
});
