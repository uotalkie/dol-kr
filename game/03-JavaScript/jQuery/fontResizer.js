/*
	Resizes text to fit inside an element.
	Optionally add a margin.
*/

(function ($) {
	$.fn.fontResizer = function (options) {
		const settings = $.extend(
			{
				margin: 2, // Default margin before overflow
				defaultSize: 16,
			},
			options
		);

		function resizeFont(container, contWidth, totalTextWidth, maxFontSize) {
			if (totalTextWidth + settings.margin > contWidth) {
				const fontSize = (((contWidth - settings.margin) * maxFontSize) / totalTextWidth).toFixed(2);
				container.css("font-size", fontSize + "px");
			}
		}

		return this.each(function () {
			const container = $(this);

			const resizeHandler = () => {
				setTimeout(() => {
					const contWidth = container.innerWidth();
					let totalTextWidth = 0;

					container.children().each(function () {
						totalTextWidth += $(this)[0].scrollWidth;
					});

					if (totalTextWidth === 0) {
						totalTextWidth = container[0].scrollWidth;
					}

					const maxFontSize = parseInt(container.css("font-size"));
					resizeFont(container, contWidth, totalTextWidth, maxFontSize);
				}, 0);
			};

			$(window).on("load resize", resizeHandler);
			resizeHandler();
		});
	};
})(jQuery);
