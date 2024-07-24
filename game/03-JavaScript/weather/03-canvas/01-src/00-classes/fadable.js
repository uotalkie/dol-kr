class Fadable {
	constructor(settings, date, initFactor) {
		this.settings = settings;
		this.factor = initFactor;
		this.currentDate = new DateTime(date);
	}

	setTime(date) {
		this.elapsedTime = this.currentDate?.compareWith(date, true) / TimeConstants.secondsPerMinute;
		this.currentDate = new DateTime(date);
	}

	setFadeFactor(date, fadeTarget, instant = false) {
		this.setTime(date);
		if (instant) {
			this.factor = fadeTarget;
			return;
		}
		const fadeChange = (1 / this.settings.timeToFade) * this.elapsedTime;
		const fadeDirection = Math.sign(fadeTarget - this.factor);

		if (fadeDirection !== 0) {
			this.factor += fadeChange * fadeDirection;

			// Ensure factor does not overshoot fadeTarget
			if ((fadeDirection > 0 && this.factor > fadeTarget) || (fadeDirection < 0 && this.factor < fadeTarget)) {
				this.factor = fadeTarget;
			}
			this.factor = Math.clamp(this.factor, 0, 1);
		}
	}
}
window.Fadable = Fadable;
