setup.SkySettings = {
	lightsTime: {
		on: 19,
		off: 7,
	},
	fade: {
		overcast: {
			timeToFade: 60,
			bloodMoonMaxValue: 0.85,
		},
	},
	blur: {
		minFactorToBlur: 0.4,
		fogMaxBlurValue: 1,
	},
	canvas: {
		sidebar: {
			size: [64, 192],
			scale: 0.5, // Renders the canvas in half the resolution, then scales up - set it to 1 to render in the original resolution
			orbits: {
				sun: {
					summer: {
						// Sunrise, sunset, and height of the orbit can be changed, based on the season
						// Between summer and winter the actual values are interpolated between.
						riseTime: 7, // At what time the sun reaches the horizon before rising
						setTime: 19, // At what time the sun reaches the horizon before setting
						path: {
							startX: 0,
							endX: 64,
							peakY: 40, // The y value of the top of the orbit arc
							horizon: 162, // The y value of the horizon
						},
					},
					winter: {
						riseTime: 7,
						setTime: 19,
						path: {
							startX: -7,
							endX: 64 + 7,
							peakY: 70,
							horizon: 162,
						},
					},
				},
				moon: {
					summer: {
						riseTime: 19,
						setTime: 7,
						path: {
							startX: -6,
							endX: 64 + 6,
							peakY: 50, // The y value of the top of the orbit arc
							horizon: 162, // The y value of the horizon
						},
					},
					winter: {
						riseTime: 19,
						setTime: 7,
						path: {
							startX: -6,
							endX: 64 + 6,
							peakY: 90,
							horizon: 162,
						},
					},
				},
				bloodmoon: {
					riseTime: 19,
					setTime: 7,
					path: {
						startX: -12,
						endX: 64 + 12,
						peakY: 40,
						horizon: 80,
					},
				},
			},
			blur: {
				minFactorToBlur: 0.4,
				fogMaxBlurValue: 1,
			},
		},
		banner: {
			size: [864, 256],
			scale: 0.5,
			orbits: {
				sun: {
					summer: {
						riseTime: 7,
						setTime: 19,
						path: {
							startX: 16,
							endX: 852,
							peakY: 24,
							horizon: 241,
							bottomOffset: 200,
						},
					},
					winter: {
						riseTime: 7,
						setTime: 19,
						path: {
							startX: 16,
							endX: 852,
							peakY: 24,
							horizon: 241,
							bottomOffset: 200,
						},
					},
				},
				moon: {
					summer: {
						riseTime: 19,
						setTime: 7,
						path: {
							startX: 16,
							endX: 852,
							peakY: 24,
							horizon: 241,
							bottomOffset: 200,
						},
					},
					winter: {
						riseTime: 19,
						setTime: 7,
						path: {
							startX: 16,
							endX: 852,
							peakY: 24,
							horizon: 241,
							bottomOffset: 200,
						},
					},
				},
				bloodmoon: {
					riseTime: 19,
					setTime: 7,
					path: {
						startX: -12,
						endX: 864 + 12,
						peakY: 24,
						horizon: 185,
					},
				},
			},
		},
	},
};
