/*
	Resizes text to fit inside an element.
	Optionally add a margin.
*/

(function ($) {
	$.fn.fontResizer = function (options) {
		const settings = $.extend(
			{
				margin: 2, // Default margin before overflow
			},
			options
		);

		return this.each(function () {
			const container = $(this);
			const resizeHandler = () => {
				if (!container.data("originalSize")) {
					container.data("originalSize", parseFloat(container.css("font-size")));
				}
				const originalSize = container.data("originalSize");
				container.css("font-size", originalSize + "px");

				const contWidth = container.innerWidth();
				let totalTextWidth = 0;

				container.children().each(function () {
					totalTextWidth += $(this)[0].scrollWidth;
				});

				if (totalTextWidth === 0) {
					totalTextWidth = container[0].scrollWidth;
				}

				const desiredFontSize = ((contWidth - settings.margin) * originalSize) / totalTextWidth;
				const newFontSize = Math.min(desiredFontSize, originalSize).toFixed(2);
				container.css("font-size", newFontSize + "px");
			};

			$(window).on("resize", $.debounce(100, resizeHandler));
			setTimeout(resizeHandler, 0);
		});
	};
})(jQuery);
