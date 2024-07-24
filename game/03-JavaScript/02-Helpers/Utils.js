const Utils = (() => {
	function getStack() {
		let output = `:: ${V.passage}`;
		if (DOL.Stack.length >= 1) {
			output += ` [${DOL.Stack.join(", ")}]`;
		}
		return output;
	}

	function defer(func, ...params) {
		if (Engine.isIdle()) {
			$(() => func(...params));
		} else {
			$(document).one(":passageend", () => func(...params));
		}
	}

	async function exportSave(slot) {
		const item = await idb.getItem(slot);
		const saveObj = Object.assign(
			{},
			{
				id: Config.saves.id,
				state: item.data,
				version: Config.saves.version,
			}
		);
		function getDatestamp() {
			const now = new Date();
			let MM = now.getMonth() + 1;
			let DD = now.getDate();
			let hh = now.getHours();
			let mm = now.getMinutes();
			let ss = now.getSeconds();

			if (MM < 10) {
				MM = `0${MM}`;
			}
			if (DD < 10) {
				DD = `0${DD}`;
			}
			if (hh < 10) {
				hh = `0${hh}`;
			}
			if (mm < 10) {
				mm = `0${mm}`;
			}
			if (ss < 10) {
				ss = `0${ss}`;
			}

			return `${now.getFullYear()}${MM}${DD}-${hh}${mm}${ss}`;
		}
		const saveName = `${Story.domId}-${getDatestamp()}.save`;
		const encodedObj = LZString.compressToBase64(JSON.stringify(saveObj));
		saveAs(
			new Blob([encodedObj], {
				type: "text/plain;charset=UTF-8",
			}),
			saveName
		);
	}

	return Object.preventExtensions({
		GetStack: getStack,
		Defer: defer,
		exportSave,
	});
})();

window.Utils = Utils;
