Weather.Tooltips = (() => {
	function skybox(element = Weather.sky.skybox) {
		// Maybe not hardcode this here
		const key = V.location === "tentworld" ? "tentaclePlains" : Weather.name;
		const weatherState = Weather.TooltipDescriptions.type[key];

		if (!weatherState) return;
		const transition = weatherState.transition ? weatherState.transition() : null;
		const weatherDescription = transition || (typeof weatherState === "string" ? weatherState : resolveValue(weatherState[Weather.skyState], ""));

		const tempDescription = Weather.TooltipDescriptions.temperature();
		const debug = V.debug
			? `<br><br><span class="teal">DEBUG:</span>
			<br><span class="blue">Passage:</span> <span class="yellow">${V.passage}</span>
			<br><span class="blue">Time:</span> <span class="yellow">${ampm()}</span>
			<br><span class="blue">Weather:</span> <span class="yellow">${Weather.name}</span>
			<br><span class="blue">Outside temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.temperature)}</span>
			<br><span class="blue">Inside temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.insideTemperature)}</span>
			<br><span class="blue">Water temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.waterTemperature)}</span>
			<br><span class="blue">Body temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)}</span>
			<br><span class="blue">Sun intensity:</span> <span class="yellow">${round(Weather.sunIntensity * 100, 2)}% (${V.outside ? "outside" : "inside"})</span>
			<br><span class="blue">Overcast amount:</span> <span class="yellow">${round(Weather.overcast * 100, 2)}%</span>
			<br><span class="blue">Fog amount:</span> <span class="yellow">${round(Weather.fog * 100, 2)}%</span>
			<br><span class="blue">Snow ground accumulation:</span> <span class="yellow">${V.weatherObj.snow}mm</span>
			<br><span class="blue">Lake ice thickness:</span> <span class="yellow">${V.weatherObj.ice.lake ?? 0}mm</span>`
			: "";
		element.tooltip({
			message: `${weatherDescription}<br>${tempDescription}${debug}`,
			delay: 200,
			position: "cursor",
		});
	}

	function thermometer() {
		const tempDescription = Weather.TooltipDescriptions.bodyTemperature();
		const waterDescription = Weather.TooltipDescriptions.waterTemperature();
		const tempChangeDescription = Weather.TooltipDescriptions.bodyTemperatureChanges();
		const overrideDescription = T.inWater
			? T.temperatureOverride?.waterTooltip
			: V.outside
			? T.temperatureOverride?.outsideTooltip
			: T.temperatureOverride?.insideTooltip;
		const fatigueModifier = categorise(Weather.BodyTemperature.fatigueModifier, 1, Weather.tempSettings.effects.maxFatigueGainMultiplier, 4);
		const arousalModifier = categorise(Weather.BodyTemperature.arousalModifier, 1, Weather.tempSettings.effects.maxArousalGainMultiplier, 4);
		const painModifier = categorise(Weather.BodyTemperature.painModifier, 1, Weather.tempSettings.effects.maxPainGainMultiplier, 4);
		const stressModifier = categorise(Weather.BodyTemperature.stressModifier, 0, Weather.tempSettings.effects.lowerMaxStressGain, 4);

		const arousalOutput = arousalModifier > 0 ? `<span class="teal">${"- ".repeat(Math.abs(arousalModifier))}Arousal gains</span><br>` : "";
		const fatigueOutput = fatigueModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(fatigueModifier))}Fatigue gains</span><br>` : "";
		const painOutput = painModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(painModifier))}Pain gains</span><br>` : "";
		const stressOutput = stressModifier > 0 ? `<span class="red">${"+ ".repeat(Math.abs(stressModifier))}Stress gains</span><br>` : "";
		const modifiers =
			arousalOutput || fatigueOutput || painOutput || stressOutput ? "<br>" + arousalOutput + fatigueOutput + painOutput + stressOutput : "";

		const direction = Weather.BodyTemperature.direction > 0 ? "(increasing)" : Weather.BodyTemperature.direction < 0 ? "(decreasing)" : "";
		// eslint-disable-next-line prettier/prettier
		const debug = V.debug ? `<br><br><span class="teal">DEBUG:</span><br><span class="blue">Passage:</span> <span class="yellow">${V.passage}</span>
			<br><span class="blue">Time:</span> <span class="yellow">${ampm()}</span>
			<br><span class="blue">Body temperature:</span> <span class="yellow">${Weather.toSelectedString(Weather.bodyTemperature)} ${direction}</span>
			<br><span class="blue">Body wetness:</span> <span class="yellow">${Math.round(Weather.wetness * 100)}%</span>
			<br><span class="blue">Clothing warmth:</span> <span class="yellow">${Weather.BodyTemperature.getWarmth()}</span>
			<br><span class="blue">Target temperature (current clothing)</span> <span class="yellow">${Weather.toSelectedString(Weather.BodyTemperature.target)}</span>`
			: "";
		Weather.Thermometer.tooltipElement.tooltip({
			message:
				tempDescription +
				(waterDescription ? "<br>" + waterDescription : "") +
				(tempChangeDescription ? "<br>" + tempChangeDescription : "") +
				(overrideDescription ? "<br>" + overrideDescription : "") +
				modifiers +
				debug,
			delay: 200,
			position: "cursor",
		});
	}

	return {
		skybox,
		thermometer,
	};
})();
