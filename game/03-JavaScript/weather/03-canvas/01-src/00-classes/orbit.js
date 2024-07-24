class Orbital {
	constructor(setup, settings, date, expandFactor = 0.1) {
		this.setup = setup;
		this.settings = settings;
		// expandFactor is used to contract or expand the duration between sunrise and sunset
		this.expandFactor = expandFactor;
		this.bottomOffset = (this.settings.path.bottomOffset ?? 100) * setup.scale;
		this.setPosition(date);
	}

	/**
	 * @param {DateTime} date
	 */
	setPosition(date) {
		const position = this.getPosition(date);
		this.position = position;
		this.factor = this.getFactor(date);
	}

	getPosition(date) {
		const currentTime = Time.getSecondsSinceMidnight(date);

		const riseTimeInSeconds = this.settings.riseTime * TimeConstants.secondsPerHour;
		const setTimeInSeconds = this.settings.setTime * TimeConstants.secondsPerHour;
		const adjustedSetTime = setTimeInSeconds < riseTimeInSeconds ? setTimeInSeconds + TimeConstants.secondsPerDay : setTimeInSeconds;
		const expandedDuration = (adjustedSetTime - riseTimeInSeconds) / (1 - 2 * this.expandFactor);

		const elapsed =
			currentTime < riseTimeInSeconds
				? (currentTime + TimeConstants.secondsPerDay - riseTimeInSeconds + this.expandFactor * expandedDuration) % TimeConstants.secondsPerDay
				: (currentTime - riseTimeInSeconds + this.expandFactor * expandedDuration) % TimeConstants.secondsPerDay;

		const timePercent = Math.clamp(elapsed / expandedDuration, 0, 1);
		const adjustedTimePercent = (timePercent - this.expandFactor) / (1 - 2 * this.expandFactor);

		const horizon = this.settings.path.horizon * this.setup.scale;
		const startX = this.settings.path.startX * this.setup.scale;
		const bottomY = horizon + this.bottomOffset;
		const endX = this.settings.path.endX * this.setup.scale;
		const peakY = this.settings.path.peakY * this.setup.scale;
		const amplitude = (peakY - bottomY) / 2;
		const baselineY = bottomY + amplitude;
		const factor = 1 - 4 * Math.pow(adjustedTimePercent - 0.5, 2);

		// Use a simple lerp for the x position while y uses a parabolic function for a simplified arc
		return {
			x: lerp(adjustedTimePercent, startX, endX),
			y: baselineY + amplitude * factor,
			bottom: bottomY + amplitude,
		};
	}

	getFactor(date) {
		const position = this.getPosition(date);
		const steepness = 5;
		const horizon = this.settings.path.horizon * this.setup.scale;
		const peakY = this.settings.path.peakY * this.setup.scale;
		const x = (position.y - horizon) / (peakY - horizon);
		return 2 * Math.pow(1 / (1 + Math.exp(-steepness * x)), 1) - 1;
	}
}
window.Orbital = Orbital;
