/* eslint-disable prettier/prettier */
setup.WeatherDescriptions = {
	type: {
		clear: {
			dawn: "밝은 주황색이 하늘을 가득 채우고 있다.",
			day: "하늘은 밝고 햇빛이 내리쬐고 있다.",
			dusk: "짙은 주황색이 하늘을 물들이고 있다.",
			night: "어두운 지평선을 가로질러 별들이 밝게 빛나고 있다.",
			bloodMoon: "붉은 달 아래에서 밤하늘이 붉은색으로 불길하게 빛나고 있다.",
			transition: () => Weather.isOvercast ? "구름 조각들이 치워져가며, 눈부신 하늘이 드러난다." : null,
		},
		lightClouds: {
			dawn: "태양의 주황색 불빛이 구름들 사이로 살짝 보이고 있다.",
			day: "태양이 구름들 사이로 밝게 빛나고 있다.",
			dusk: "주황색 빛의 줄기들이 하늘을 뒤덮고 있다.",
			night: "구름들 사이로 별들이 보이고 있다.",
			bloodMoon: "구름들이 달의 으스스한 붉은 불빛을 가로질러 떠가고 있다.",
			transition: () => Weather.isOvercast ? "흐린 하늘이 흩어지며, 더 맑은 하늘이 만들어진다." : null,
		},
		heavyClouds: {
			dawn: () => "구름 낀 하늘이 떠오르는 태양에 의해 주황색으로 물들여져 있다.",
			day: () => "하늘이 흐려서 회색빛이 감돌고 있다.",
			dusk: () => "구름 낀 하늘이 주황색으로 빛나고 있다.",
			night: () => "두꺼운 구름 사이로는 별들이 거의 보이지 않는다.",
			bloodMoon: () => "하늘은 붉은 빛으로 가득 차 있다.",
			transition: () => !Weather.isOvercast ? "당신은 어두운 구름이 머리 위로 모여드는 것을 본다." : null,
		},
		lightPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "약한 비가 새벽의 이른 빛 아래 떨어지고 있다." : "약간의 눈가루가 새벽의 이른 빛 아래 날리고 있다.",
			day: () => Weather.precipitation === "rain" ? "약간의 빗방울들이 후두둑 떨어지고 있다." : "옅은 눈가루가 하늘을 가득 채우고 있다.",
			dusk: () => Weather.precipitation === "rain" ? "부드러운 보슬비가 주황색의 황혼과 함께하고 있다." : "가는 눈이 주황색의 황혼과 섞여 있다.",
			night: () => Weather.precipitation === "rain" ? "약한 비가 밤 동안 내리고 있다." : "약간의 눈이 어두운 풍경을 가득 채우고 있다.",
			bloodMoon: () => Weather.precipitation === "rain" ? "붉은 달이 약한 비 위로 비현실적인 불빛을 발하고 있다." : "달의 붉은 빛이 떨어지는 눈가루들을 비추고 있다.",
			transition: () => !Weather.isOvercast && !Weather.isFreezing ? "당신은 비구름이 저 위에서 뭉쳐지고 있다는 것을 알아차린다." : !Weather.isOvercast ? "구름들이 점점 두꺼워진다. 곧 눈이 내릴 것이다." : null,
		},
		heavyPrecipitation: {
			dawn: () => Weather.precipitation === "rain" ? "거친 폭풍우가 하루를 시작하고 있다." : "두꺼운 눈가루들이 이른 아침을 뒤덮고 있다.",
			day: () => Weather.precipitation === "rain" ? "구름 낀 하늘에서 빗줄기가 세차게 쏟아지고 있다." : "세찬 눈보라가 하늘을 가리고 있다.",
			dusk: () => Weather.precipitation === "rain" ? "세찬 빗줄기가 심해지고 있다." : "저녁이 되면서 눈이 쌓이고 있다.",
			night: () => Weather.precipitation === "rain" ? "세찬 빗줄기가 어둠을 명백히 보여주고 있다." : "세찬 눈보라가 밤을 감싸고 있다.",
			bloodMoon: () => Weather.precipitation === "rain" ? "폭우가 붉은 하늘을 반사하고 있다." : "눈이 달의 으스스한 붉은 빛을 반사하며, 세상을 비현실적인 정적으로 덮고 있다.",
			transition: () => !Weather.isOvercast && !Weather.isFreezing ? "짙은 구름들이 모이기 시작하고 있다. 비가 내릴 것이다." : !Weather.isOvercast ? "구름들이 저 위에서 모이고 있다. 곧 눈이 내릴 것이다." : null,
		},
		thunderStorm: {
			dawn: "번개폭풍이 새벽에 맹위를 떨치고 있다.",
			day: "시끄러운 천둥과 밝은 번개가 내리치고 있다.",
			dusk: "주황색의 하늘과 번개폭풍이 어우러지고 있다.",
			night: "번개의 번쩍임이 밤을 비추고 있다.",
		},
		tentaclePlains: `<span class="purple">하늘이 선명한 보랏빛 색조로 빛나고 있다.</span>`,
	},
	/* Specific tooltips based on your location */
	location: {
		lake: () => Weather.isFrozen("lake") ? "호수는 얼어 있다." : "호수는 조용하다.",
	},
	temperature: () => {
		if (Weather.temperature <= -15) {
			return `<span class="blue">바깥은 매우 춥다.</span>`;
		} else if (Weather.temperature <= -10) {
			return Weather.isSnow ? "얼얼한 추위에 세찬 눈이 더해지고 있다." : "차가운 공기가 얼얼하다.";
		} else if (Weather.temperature <= -5) {
			return Weather.isSnow ? "공기는 차갑고 바닥에는 눈이 잔뜩 쌓여 있다." : "공기가 차가워, 찌르는 듯하고 건조한 느낌이 든다.";
		} else if (Weather.temperature <= 0) {
			return Weather.isSnow ? "공기는 차갑고, 바닥은 눈으로 뒤덮여 있다." : "서리가 바닥에 형성되기 시작하고 있다.";
		} else if (Weather.temperature <= 5) {
			return Weather.isSnow ? "녹아내리는 눈이 바닥에 진창을 만들고 있다." : "차가운 바람과 함께, 냉랭한 느낌이 든다.";
		} else if (Weather.temperature <= 10) {
			return Weather.isSnow ? "남아있는 눈이 빠르게 녹고 있다." : "부드러운 바람이 불며, 쌀쌀한 느낌이 든다.";
		} else if (Weather.temperature <= 15) {
			return "공기가 차갑지만, 견딜 만 하다.";
		} else if (Weather.temperature <= 20) {
			return "공기가 온화하다.";
		} else if (Weather.temperature <= 25) {
			return "바깥 공기가 따뜻하고 쾌적하다.";
		} else if (Weather.temperature <= 30) {
			return "날씨가 덥다.";
		} else {
			return `<span class="red">바깥은 매우 덥다.</span>`;
		}
	},
	extremeTemperature: () => {
		if (!Weather.Temperature.isExtreme()) return "";
		const average = Weather.genSettings.months[Time.month - 1].temperatureRange.average;
		const extreme = Weather.genSettings.months[Time.month - 1].temperatureRange.extreme;

		if (Weather.temperature <= -18) {
			return `<span class="blue">날씨가 매우 춥다, 아마도 금년의 가장 추운 날 중 하나인 듯 하다.</span>`;
		} else if (Weather.temperature > 30) {
			return `<span class="red">날씨가 매우 무덥다. 열파가 지나가고 있는 듯 하다.</span>`;
		}

		const warm = Weather.temperature > 20 ? "덥다" : "따뜻하다";
		const cool = Weather.temperature < 7 ? "춥다" : "시원하다";
		const frigid = Weather.temperature < -15 ? "매우 춥다" : "춥다";

		// 50% lower than average low
		if (average[0] + ((extreme[0] - average[0]) * 0.5) > Weather.temperature) {
			return `<span class="teal">날씨가 계절에 맞지 않게 ${frigid}.</span>`;
		} else if (average[0] > Weather.temperature) {
			return `<span class="teal">날씨가 평년의 이 시기보다 ${cool}.</span>`
		}

		// 50% higher than average high
		if (average[1] + ((extreme[1] - average[1]) * 0.5) < Weather.temperature) {
			return `<span class="orange">날씨가 계절에 맞지 않게 ${warm}.</span>`
		} else if (average[1] < Weather.temperature) {
			return `<span class="orange">날씨가 평년의 이 시기보다 ${warm}.</span>`
		}

		return "";
	},
	bodyTemperature: () => {
		if (Weather.bodyTemperature <= 34) {
			return "당신은 심각한 저체온증에 시달리고 있다.";
		} else if (Weather.bodyTemperature <= 35) {
			return "당신은 얼어붙을 만큼 춥다고 느낀다.";
		} else if (Weather.bodyTemperature <= 35.5) {
			return "당신은 아주 춥고 자제할 수 없을 정도로 몸이 떨리고 있다.";
		} else if (Weather.bodyTemperature <= 36) {
			return "당신은 몸서리친다.";
		} else if (Weather.bodyTemperature <= 36.5) {
			return "당신은 추위를 느낀다.";
		} else if (Weather.bodyTemperature <= 37.5) {
			return "당신은 쾌적한 느낌이 든다.";
		} else if (Weather.bodyTemperature <= 38) {
			return "당신은 따스함을 느낀다.";
		} else if (Weather.bodyTemperature <= 38.5) {
			return "당신은 살짝 땀이 나며 불편함을 느낀다.";
		} else if (Weather.bodyTemperature <= 39) {
			return "당신은 덥고 땀이 나는 것을 느낀다.";
		} else if (Weather.bodyTemperature <= 39.5) {
			return "당신은 지나치게 더워 불편함을 느낀다.";
		} else if (Weather.bodyTemperature <= 40) {
			return "당신은 몸이 뜨겁다고 느낀다.";
		} else {
			return "당신은 열사병에 시달리고 있다.";
		}
	},
	bodyTemperatureChanges: () => {
		if (Math.abs(Weather.BodyTemperature.target - Weather.bodyTemperature) <= 0.5)
			return "";
		if (Weather.bodyTemperature < 35) {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "당신은 따스함이 당신 뼈의 차가움을 몰아내도록 둔다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "당신의 떨림이 가라앉고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "당신은 위험할 정도로 빠르게 몸이 차가워지고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "당신은 점점 더 추워지고 있다.";
			}
		} else if (Weather.bodyTemperature < 39) {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "당신의 몸이 빠르게 뜨거워지고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "당신의 몸이 점점 따뜻해지고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "당신의 몸이 빠르게 차가워지고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "덩신의 몸이 점점 시원해지고 있다.";
			}
		} else {
			if (Weather.BodyTemperature.target - Weather.bodyTemperature > 1) {
				return "당신의 몸이 위험할 정도로 빠르게 뜨거워지고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature > 0) {
				return "당신의 몸이 점점 더 뜨거워지고 있다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 1) {
				return "당신은 차가움이 당신 몸의 더위를 몰아내도록 둔다.";
			} else if (Weather.BodyTemperature.target - Weather.bodyTemperature < 0) {
				return "당신의 몸이 서늘해지고 있다.";
			}
		}
	},
	waterTemperature: () => {
		if (!T.inWater) return "";
		if (Weather.waterTemperature <= 5) {
			return "물이 얼어붙을 정도로 차갑게 느껴진다.";
		} else if (Weather.waterTemperature <= 15) {
			return "물이 차갑게 느껴진다.";
		} else if (Weather.waterTemperature <= 25) {
			return "물이 시원하게 느껴진다.";
		} else if (Weather.waterTemperature <= 35) {
			return "물이 따뜻하게 느껴진다.";
		} else {
			return "물이 뜨겁게 느껴진다.";
		}
	},
	clothingWarmth: warmth => {
		let output = "";
		if (warmth > 6) {
			output = "아주 따뜻하다.";
		}
		else if (warmth > 4) {
			output = "따뜻하고 포근하다.";
		}
		else if (warmth > 2) {
			output = "추위를 막는 데 도움이 될 것이다.";
		}
		else if (warmth > 0) {
			output = "가볍고 시원하다.";
		}
		else {
			output = "따뜻함을 유지하는 데에는 효과가 없다.";
		}
		return V.options.images ? output + ` (<span class="cold-resist-icon noDivider">${warmth}</span>)` : output;
	},
	shop: () => {
		if (Weather.temperature <= -5) {
			return "<span class='blue'>바깥은 매우 춥다.</span>";
		} else if (Weather.temperature <= 5) {
			return "<span class='purple'>바깥은 아주 춥다.</span>";
		} else if (Weather.temperature <= 15) {
			return "<span class='teal'>바깥은 춥다.</span>";
		} else if (Weather.temperature <= 25) {
			return "<span class='green'>바깥의 온도는 쾌적하다.</span>";
		} else {
			return "<span class='orange'>바깥은 덥다.</span>";
		}
	},
};
