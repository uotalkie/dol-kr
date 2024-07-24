// @ts-check

/**
 * @typedef {object} DolLocation
 * @property {string} area The place they are at.
 * @property {string | "stalking"} state The state they are in within the area.
 */

/** @type {DolLocation} */
const UnknownLocation = { area: "unknown", state: "unknown" };

/** @type {DolLocation} */
const InactiveLocation = { area: "inactive", state: "inactive" };

/** @returns {boolean} */
const isRaining = () => Weather.precipitation !== "none"; // eslint-disable-line no-unused-vars

const importantStates = ["rehearsal", "dual_rehearsal"];

/**
 * Simple location function for figuring out where Kylar is at school.
 *
 * [KylarScheduleRefactor]
 *
 * @returns {DolLocation} Location (area, state) they are at.
 */
function getKylarLocation() {
	const state = C.npc.Kylar.state;
	let location = UnknownLocation;
	switch (state) {
		case "active":
			location = getKylarActiveLocation();
			if (!importantStates.includes(location.state) && V.kylarwatched) {
				location.state = "stalking";
			}
			break;
		case "prison":
			location = getKylarPrisonLocation();
			if (!importantStates.includes(location.state) && V.kylarwatched) {
				location.state = "stalking";
			}
			break;
		case "":
			location = InactiveLocation;
			break;
		default:
			location = UnknownLocation;
			break;
	}
	return location;
}
window.getKylarLocation = getKylarLocation;

/**
 * Try to call getKylarLocation first, or ensure Kylar's state is "active"
 *
 * @returns {DolLocation} Kylar's active location
 */
function getKylarActiveLocation() {
	// Putting English play stuff here as it's more important than other things:
	if (V.schoolstate === "afternoon" && isKylarAvailableForRehearsal()) {
		if (isDoubleRehearsalAvailable()) {
			return { area: "english", state: "dual_rehearsal" };
		}
		if (V.englishPlayRoles.KylarKnown) {
			if (Weather.precipitation !== "none") {
				return { area: "library", state: "library" };
			}
			return { area: "rear_courtyard", state: "stump" };
		}
		return { area: "english", state: "rehearsal" };
	}
	if (Time.schoolTime) {
		return getKylarSchoolLocation();
	}
	// Personal timetable:
	return getKylarPersonalLocation();
}
window.getKylarActiveLocation = getKylarActiveLocation;

/** @returns {DolLocation} Kylar's location in school */
function getKylarSchoolLocation() {
	switch (V.schoolstate) {
		case "third": // PC is in English class
			return { area: "english", state: "english" };
		case "lunch":
			return getKylarLocationInLunchtime();
	}
	return UnknownLocation;
}
window.getKylarSchoolLocation = getKylarSchoolLocation;

/** @returns {DolLocation} Kylar's location in school lunchtime */
function getKylarLocationInLunchtime() {
	if (!V.daily.school.lunchEaten) {
		return { area: "canteen", state: "lunch" };
	}
	if (Weather.precipitation === "none") {
		// NOT Raining or snowing, Kylar goes to the stump in rear courtyard.
		return { area: "rear_courtyard", state: "stump" };
	}
	// Raining or snowing, Kylar goes to library.
	const libraryState = getKylarLibraryState();
	if (!["elsewhere", "inactive"].includes(libraryState)) {
		return { area: "library", state: libraryState };
	}
	return UnknownLocation;
}
window.getKylarLocationInLunchtime = getKylarLocationInLunchtime;

/** @returns {DolLocation} Kylar's active location */
function getKylarPersonalLocation() {
	// Midnight to 6:59 AM
	if (Time.hour < 7) {
		return { area: "manor_bedroom", state: "sleeping" };
	}
	// 9:00 AM to 5:59 PM
	if (Time.hour >= 9 && Time.hour < 18) {
		if (Weather.precipitation !== "none") {
			return { area: "arcade", state: "playing" };
		}
		const parkState = V.kylar.fountain === 1 ? "fountain" : "bench";
		return { area: "park", state: parkState };
	}
	return UnknownLocation;
}
window.getKylarPersonalLocation = getKylarPersonalLocation;

/** @returns {DolLocation} Kylar's active location */
function getKylarPrisonLocation() {
	/* To be implemented */
	return UnknownLocation;
}
window.getKylarPrisonLocation = getKylarPrisonLocation;

/** @returns {boolean} */
function isKylarAvailableForRehearsal() {
	return V.englishPlay === "ongoing" && V.englishPlayRoles.Kylar !== "none";
}
window.isKylarAvailableForRehearsal = isKylarAvailableForRehearsal;

/** @returns {boolean} */
function isDoubleRehearsalAvailable() {
	return (
		V.englishPlay === "ongoing" &&
		V.englishPlayReadiness >= 56 &&
		V.englishPlayRoles.SydneyKnown &&
		V.englishPlayRoles.KylarKnown &&
		V.englishPlayRoles.Kylar !== "none" &&
		!V.englishPlayDoubleRehearsal
	);
}
window.isDoubleRehearsalAvailable = isDoubleRehearsalAvailable;

/**
 * Randomly decides based primarily on Kylar's jealousy, secondarily on Sydney's love,
 * whether to stalk the PC in the library.
 *
 * At max jealousy, and max love, there should only be a 20% chance for this to be true.
 *
 * @returns {boolean}
 */
function rollKylarLibraryStalkFlag() {
	// Constants for calculation
	const coefficient = 20;
	const jealousyCoefficient = 3;
	const loveCoefficient = 1;
	const totalRolls = (jealousyCoefficient + loveCoefficient) * 100; // 400
	// Kylar stats
	const jealousy = jealousyCoefficient * C.npc.Kylar.rage;
	// Sydney stats (This normalisedLove variable should be extracted!)
	const love = getSydneyLoveNorm(); // Normalise love to be between 0.0 and 1.0.
	const adjustedLove = loveCoefficient * love * 100;
	// Calculation
	const chance = (jealousy + adjustedLove) / totalRolls; // Float between 0.0 and 1.0
	const finalChance = coefficient * chance; // Float between 0.0 and 20.0
	const roll = random(1, 100); // 1 to 100
	const result = finalChance >= roll; // Compares 0->20 with 1->100
	return result;
}
window.rollKylarLibraryStalkFlag = rollKylarLibraryStalkFlag;
