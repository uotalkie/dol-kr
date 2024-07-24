Config.passages.onProcess = function (passage) {
	/* Current passage */
	if (passage.title === State.passage) {
		/* Major areas only */
		if (setup.passOutAreas.includes(passage.title)) {
			/* Passout from temperature extremes */
			if (V.passout) {
				T.passout = V.passout;
				delete V.passout;
				passage.text = "<<passouttemperature>>";
			}
		}
	}
	return passage.text;
};
