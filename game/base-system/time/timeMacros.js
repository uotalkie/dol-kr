/* eslint-disable no-undef */
function timeAfterXHours(hours) {
	const date = new DateTime(Time.date);
	date.addSeconds(hours * DateTime.secondsPerHour);
	return ampm(date.hour, date.minute);
}
DefineMacroS("timeAfterXHours", timeAfterXHours);

function ampm(hour, minute) {
	let ampm;
	if (hour !== undefined) {
		minute = minute !== undefined ? minute : "00";
	} else {
		hour = Time.hour;
		minute = Time.minute;
	}
	if (V.options.timestyle === "ampm") {
		ampm = hour >= 12 ? "오후 " : "오전 ";
		hour = ((hour + 11) % 12) + 1;
	}
	return !ampm ? ("0" + getTimeString(hour, minute)).slice(-5) :  ampm + getTimeString(hour, minute);
}
DefineMacroS("ampm", ampm);

function advanceToHour() {
	return passTime(60 - Time.minute);
}
Macro.add("advancetohour", {
	handler() {
		const fragment = advanceToHour();
		this.output.append(fragment);
	},
});

function passTimeUntil(hour, minute) {
	const diffHour = (24 - Time.hour + hour) % 24;
	const diffMinute = (60 + Time.minute - (minute || 0)) % 60;
	return passTime(diffHour * 60 + diffMinute);
}
Macro.add("passTimeUntil", {
	handler() {
		const fragment = passTimeUntil(...this.args);
		this.output.append(fragment);
	},
});

/* Looks ugly, works, is clear. Ideally we shouldn't allow variance in the argument for <<pass>> like this.
	In the future someone can do a revision of calls to eliminate such variance. */
const secondsMapper = {
	sec: 1,
	seconds: 1,
	min: DateTime.secondsPerMinute,
	mins: DateTime.secondsPerMinute,
	minute: DateTime.secondsPerMinute,
	minutes: DateTime.secondsPerMinute,
	hour: DateTime.secondsPerHour,
	hours: DateTime.secondsPerHour,
	day: DateTime.secondsPerDay,
	days: DateTime.secondsPerDay,
	week: DateTime.secondsPerDay * 7,
	weeks: DateTime.secondsPerDay * 7,
};

/**
 * Pass an alloted time.
 *
 * @param {number} time The interval of units of time
 * @param {'sec'|'min'|'hour'|'day'|'week'} type The spans of time to pass.
 * @returns {DocumentFragment} The fragment to render elements from.
 */
function passTime(time = 0, type = "min") {
	const multiplier = secondsMapper[type] || 1;
	const fragment = Time.pass(time * multiplier);
	return fragment;
}
Macro.add("pass", {
	handler() {
		const fragment = passTime(...this.args);
		this.output.append(fragment);
	},
});

Macro.add("clock", {
	handler() {
		const minuteRot = Math.trunc((360 / 100) * ((Time.minute / 60) * 100));
		const hourRot = Math.trunc((360 / 100) * ((Time.hour / 12) * 100) + minuteRot / 12);

		const container = $("<div />", { class: "clockContainer" }).appendTo(this.output);
		const spinner = $("<div />", { class: "clockSpinner" }).appendTo(container);
		$("<div />", { class: "clockHand1" })
			.css({
				"-webkit-transform": "rotate(" + hourRot + "deg)",
				"-moz-transform": "rotate(" + hourRot + "deg)",
				transform: "rotate(" + hourRot + "deg)",
			})
			.appendTo(spinner);
		$("<div />", { class: "clockHand2" })
			.css({
				"-webkit-transform": "rotate(" + minuteRot + "deg)",
				"-moz-transform": "rotate(" + minuteRot + "deg)",
				transform: "rotate(" + minuteRot + "deg)",
			})
			.appendTo(spinner);
		$("<div />", { class: "clockCenter" }).appendTo(spinner);
	},
});

/* Text macros */

function schoolTerm() {
	if (Time.schoolTerm) {
		const date = Time.nextSchoolTermEndDate; trMonth(date.monthName); const month = T.trResult; trDaysOfWeek(date.weekDayName); const weekDayName = T.trResult;
		return "학기는 " + month + " " + date.day +"일 " + weekDayName + "에  끝난다";
	} else {
		const date = Time.nextSchoolTermStartDate; trMonth(date.monthName); const month = T.trResult; trDaysOfWeek(date.weekDayName); const weekDayName = T.trResult;
		return "학기는 " + month + " " + date.day +"일 " + weekDayName + "에  시작한다";
	}
}
DefineMacroS("schoolterm", schoolTerm);
