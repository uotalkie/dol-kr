class BaseCanvas {
	constructor(width, height, scale = 1) {
		this.canvas = $("<canvas/>");
		this.element = this.canvas[0];
		this.scale = scale;
		this.ctx = this.element.getContext("2d");

		const scaledWidth = width * this.scale;
		const scaledHeight = height * this.scale;
		this.element.width = scaledWidth;
		this.element.height = scaledHeight;
	}

	reset() {
		this.clear();
		this.ctx.reset();
	}

	resize(width, height) {
		this.element.width = width;
		this.element.height = height;
		this.ctx = this.element.getContext("2d");
	}

	/* Aliases */
	clear() {
		this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	}

	fillRect() {
		this.ctx.fillRect(0, 0, this.element.width, this.element.height);
	}

	drawImage(image, x = 0, y = 0) {
		this.ctx.drawImage(image, x, y);
	}
}
window.BaseCanvas = BaseCanvas;
