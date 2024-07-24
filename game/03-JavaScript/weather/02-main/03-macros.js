Macro.add("skybox", {
	handler() {
		Weather.sky.skybox.appendTo(this.output);
	},
});

Macro.add("banner", {
	handler() {
		Weather.banner.skybox.appendTo(this.output);

		/* Remove the below to get rid of the chromium missing image error */
		// Use fallback image if it exists (modded game) - otherwise just use the banner canvas
		const bannerFallbackImage = new Image();
		bannerFallbackImage.src = "img/misc/banner.png";
		bannerFallbackImage.onload = () => {
			Weather.banner.skybox.empty().append($(bannerFallbackImage));
			Weather.banner.skybox.css("padding-top", 0);
		};
	},
});

Macro.add("thermometer", {
	handler() {
		Weather.Thermometer.element.appendTo(this.output);
		Weather.Thermometer.tooltipElement.appendTo(this.output);
		Weather.Thermometer.update();
	},
});

Macro.add("weatherIcon", {
	handler() {
		const iconDiv = $("<div />", { id: "weatherIcon" });
		const iconImg = $("<img />");

		const dayState = Weather.bloodMoon ? "blood" : Weather.dayState === "night" ? "night" : "day";
		const weatherState = resolveValue(Weather.type.iconType, "clear");
		const path = `img/misc/icon/weather/${dayState}_${weatherState}.png`;

		iconImg.attr("src", path);
		Weather.Tooltips.skybox(iconImg);
		iconDiv.append(iconImg);
		iconDiv.appendTo(this.output);
	},
});
