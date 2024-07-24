/* Create the sky canvas instance */
Weather.sky = new Weather.Renderer.Sky({
	id: "canvasSkybox",
	setup: setup.SkySettings.canvas.sidebar,
	layers: [
		"sky",
		"starField",
		"sun",
		"moon",
		"cirrusClouds",
		"overcastClouds",
		"clouds",
		"horizonGlow",
		"location",
		"precipitation",
		"bloodGlow",
		"sunGlow",
		"fog",
	],
});
