/**
 * @typedef {object} CookerItem
 * @property {string} name the name of the item, used by the cooker
 * @property {number} startedAt timestamp in seconds of when the item was added to the cooker,
 *                              defaults to `$timeStamp`
 * @property {number} timeBonus amount of time that is being deduced from the base cook time when
 *                              calculating the time required for the item to be ready
 * @property {number} bonusElapsed amount of time that has already been deduced when
 *                                 calculating the time required for the item to be ready
 */

/**
 * @typedef {object} CookerType
 * @property {number} lastsUntil timestamp in seconds at which the fire goes out
 * @property {number} updatedAt timestamp in seconds of the last time the cooker's fire was updated.
 *                              Used for calculating the `bonusElapsed` of items
 * @property {number} maxItems maximum amount of items the cooker can hold at once
 * @property {number} maxBurnTime the maximum lifetime of the fire at any point, in seconds
 * @property {number} cookMult how much a lit fire speeds up the cooking process - (0.5x, 2x, 3x etc)
 * @property {Object<string, number>} cookTime key value pairs of the items allowed in the cooker
 *                                              and their base required time to cook
 * @property {CookerItem[]} items the items currently in the cooker, up to `cooker.maxItems`
 */

const Cooker = (() => {
	/**
	 * @param {Partial<CookerType>} options used to overwrite default values when creating the cooker
	 * @returns {CookerType} the new cooker object
	 */
	function create(options = {}) {
		// prettier-ignore
		return Object.assign({
			lastsUntil: V.timeStamp,
			maxItems: 1,
			cookMult: 2,
			maxBurnTime: 120 * 60, // 2 hours
			cookTime: {},
			items: [],
		}, options);
	}

	/**
	 * @param {CookerType} c
	 * @returns {number} the time left before the fire goes out, in seconds
	 */
	function getBurnTime(c) {
		if (!c || c.lastsUntil == null) return Errors.report("No cooker provided to getBurnTime");
		return Math.max(c.lastsUntil - V.timeStamp, 0);
	}

	/**
	 * Adds the given time to the fire lifetime and updates the time required for all items in the cooker.
	 *
	 * Clamps the given time to the max lifetime allowed by `c.maxBurnTime`.
	 *
	 * @param {CookerType} c
	 * @param {number} time the time to add to `c.lastsUntil`, in seconds
	 */
	function addBurnTime(c, time) {
		if (!c || c.lastsUntil == null || !Number.isInteger(time)) return;
		const nowLastsUntil = Math.max(V.timeStamp, c.lastsUntil) + time;
		updateElapsedBonuses(c);
		c.lastsUntil = Math.min(nowLastsUntil, V.timeStamp + c.maxBurnTime);
		c.items.forEach(item => updateTimeBonus(c, item));
	}

	/**
	 * Adds an item to the given cooker's inventory if it accepts that item.
	 *
	 * Calculates the timeBonus for the item before adding it.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item the item to add to cooker, it's name must be a key in `c.cookTime`
	 * @returns {void}
	 */
	function cookItem(c, item) {
		if (!c || !c.items || !item || c.cookTime?.[item.name] == null) {
			return Errors.report("Failed to add item to cooker: invalid cooker or item");
		}
		if (c.items.length >= c.maxItems) return;
		updateTimeBonus(c, item);
		c.items.push(item);
	}

	/**
	 * Creates an item that can be inserted into the given cooker.
	 *
	 * @param {CookerType} c
	 * @param {string} itemName needs to be a key in `c.cookTime`
	 * @param {boolean} skipBonusCalc if set to true, does not update the timeBonus of
	 *                                on creation.
	 * @returns {CookerItem|undefined} the created item, if successful.
	 */
	function createItem(c, itemName, skipBonusCalc = false) {
		if (!c || c.cookTime?.[itemName] == null || !itemName) {
			return Errors.report(`Failed to create item ${itemName}: item not allowed in provided cooker`);
		}
		const newItem = {
			name: itemName,
			startedAt: V.timeStamp,
			timeBonus: 0,
			bonusElapsed: 0,
		};
		if (!skipBonusCalc) {
			updateTimeBonus(c, newItem);
		}
		return newItem;
	}

	/**
	 * Updates the timeBonus of the given item. To update the bonusElapsed, use `updateElapsedBonuses`.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item item in `c` getting it's bonus updated
	 */
	function updateTimeBonus(c, item) {
		item.timeBonus = getTimeBonus(c, item);
	}

	/**
	 * Updates `c.updatedAt` and every item's bonusElapsed property at once.
	 * `item.bonusElapsed` should never be updated outside of this function.
	 *
	 * @param {CookerType} c
	 */
	function updateElapsedBonuses(c) {
		if (!c || !c.items) return;
		c.items.forEach(item => {
			item.bonusElapsed += _getBonusElapsedSinceUpdated(c, item);
		});
		c.updatedAt = V.timeStamp;
	}

	/**
	 * Gets the bonus time elapsed for the given item since the cooker's fire was last updated.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item
	 * @returns {number} the bonus elapsed, in seconds
	 */
	function _getBonusElapsedSinceUpdated(c, item) {
		if (!item.timeBonus || V.timeStamp === c.updatedAt) return 0;
		const min = Math.max(item.startedAt, c.updatedAt);
		const max = Math.clamp(c.lastsUntil, item.startedAt, V.timeStamp);
		const interval = Math.floor((max - min) * (c.cookMult - 1)); // min <= max
		if (!interval) return 0;
		return item.timeBonus < 0 ? Math.max(item.timeBonus, interval) : Math.min(item.timeBonus, interval);
	}

	/**
	 * Calculates the remaining time bonus for the given item, without updating it.
	 *
	 * Considers that `item.bonusElapsed` is up to date.
	 *
	 * @param {CookerType} c
	 * @param {CookerItem} item item in `c` getting it's bonus updated
	 * @returns {number} the total time, in seconds, that the item can still skip from the
	 *                   value in `c.cookTime`
	 */
	// prettier-ignore
	function getTimeBonus(c, item) {
		const burnTime = getBurnTime(c);
		if (!burnTime) return 0;
		const cookMult = c.cookMult;
		const baseTime = c.cookTime?.[item.name];
		if (!baseTime || !cookMult || cookMult < 0) {
			Errors.report("No valid cooker provided for getTimeBonus");
			return 0;
		}
		const timeElapsedRaw = V.timeStamp - item.startedAt;
		// assumes item.bonusElapsed is up to date
		const timeLeftRaw = Math.max(baseTime - timeElapsedRaw - item.bonusElapsed, 0);
		if (!timeLeftRaw) return 0;
		/*
		 * bonus is how much time will be ignored from baseTime
		 * example: if cookMult is 3, ignores 2/3 of the time left
		 * If there's enough fire, applies the bonus to the whole time left,
		 * else considers only the time left on fire for the bonus.
		 */
		const bonusLeft = Math.min(timeLeftRaw, burnTime * cookMult) * ((cookMult - 1) / cookMult);
		return Math.floor(bonusLeft - (bonusLeft % 60)); // truncating possible seconds
	}

	/**
	 * Helper function to get all items that are "ready" in the given cooker.
	 *
	 * @param {CookerType} c
	 * @returns {CookerItem[]}
	 */
	function getItemsReady(c) {
		if (!c || !c.items) return [];
		return c.items.filter(({ name, startedAt, timeBonus, bonusElapsed }) => {
			return V.timeStamp - startedAt >= c.cookTime[name] - timeBonus - bonusElapsed;
		});
	}

	/**
	 * Helper function to get all items that are not "ready" in the given cooker.
	 *
	 * @param {CookerType} c
	 * @returns {CookerItem[]}
	 */
	function getItemsNotReady(c) {
		if (!c || !c.items) return [];
		return c.items.filter(({ name, startedAt, timeBonus, bonusElapsed }) => {
			return V.timeStamp - startedAt < c.cookTime[name] - timeBonus - bonusElapsed;
		});
	}

	return Object.freeze({
		create,

		addBurnTime,
		getBurnTime,

		createItem,
		cookItem,
		updateTimeBonus,
		getTimeBonus,

		updateElapsedBonuses,
		getItemsReady,
		getItemsNotReady,
	});
})();
window.Cooker = Cooker;

function getBirdBurnTime() {
	if (!V.bird.firepit) return 0;
	T.birdBurnTime = Math.floor(Cooker.getBurnTime(V.bird.firepit) / 60); // minutes
	return T.birdBurnTime;
}
window.getBirdBurnTime = getBirdBurnTime;

function upgradeBirdFirepit() {
	const level = V.bird.upgrades?.firepit;
	if (!Number.isInteger(level) || level < 1) return;
	let maxBurnTime = 1480 * 60; // 24h40min
	switch (level) {
		case 1:
			maxBurnTime = 360 * 60; // 6h
			break;
		case 2:
			maxBurnTime = 740 * 60; // 12h20min
			break;
	}
	// update the elapsed bonus for all items, so cookMult can correctly calculate timeBonus after upgrading
	Cooker.updateElapsedBonuses(V.bird.firepit);
	Object.assign(V.bird.firepit, {
		maxBurnTime,
		maxItems: V.bird.upgrades.rack * 2,
		cookMult: level + 1,
	});
	// 2/3 of max hours
	const burnTime = Math.floor((maxBurnTime / 3600) * (2 / 3)) * 3600;
	Cooker.addBurnTime(V.bird.firepit, burnTime);
}
window.upgradeBirdFirepit = upgradeBirdFirepit;
