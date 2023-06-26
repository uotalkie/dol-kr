function getHe() {
	switch (V.pronoun) {
		case "m":
			T.postNum=1;return "그";
		case "f":
			T.postNum=1;return "그녀";
		case "i":
			T.postNum=0;return "녀석";
		case "n":
			T.postNum=1;return "그자";
		case "t":
			T.postNum=2;return "그들";
		default:
			Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return "그들";
	}
}
/**
 * ?he - Returns the pronoun based on whatever $pronoun is set to.
 *		  Call ?he in TwineScript after calling <<person1>> to use.
 */
/** ?He - Capitalised version of above. */
Template.add(["he", "He"], function () {
	return this.name === "He" ? getHe.call(this).toUpperFirst() : getHe.call(this);
});

function getHim() {
	switch (V.pronoun) {
		case "m":
			T.postNum=1;return "그";
		case "f":
			T.postNum=1;return "그녀";
		case "i":
			T.postNum=0;return "녀석";
		case "n":
		case "t":
			T.postNum=2;return "그들";
		default:
			Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return "그들";
	}
}
/**
 * ?him - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?him in TwineScript after calling <<person1>> to use.
 */
/** ?Him - Capitalised version of above. */
Template.add(["him", "Him"], function () {
	return this.name === "Him" ? getHim.call(this).toUpperFirst() : getHim.call(this);
});

function getHis() {
	switch (V.pronoun) {
		case "m":
			T.postNum=1;return "그";
		case "f":
			T.postNum=1;return "그녀";
		case "i":
			T.postNum=0;return "녀석";
		case "n":
			T.postNum=1;return "그자";
		case "t":
			T.postNum=2;return "그들";
		default:
			Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return "그들";
	}
}
/**
 * ?his - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?his in TwineScript after calling <<person1>> to use.
 */
/** ?His - Capitalised version of above. */
Template.add(["his", "His"], function () {
	return this.name === "His" ? getHis.call(this).toUpperFirst() : getHis.call(this);
});

function getHeIs() {
	switch (V.pronoun) {
		case "m":
		case "f":
		case "i":
		case "n":
			return getHe.call(this);
		case "t":
			return getHe.call(this);
		default:
			DOL.Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=2;return "그들";
	}
}
/**
 * ?hes - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hes in TwineScript after calling <<person1>> to use.
 */
/** ?Hes - Capitalised version of above. */
Template.add(["hes", "Hes"], function () {
	return this.name === "Hes" ? getHeIs.call(this).toUpperFirst() : getHeIs.call(this);
});

function getHers() {
	switch (V.pronoun) {
		case "m":
			T.postNum=0;return "그의 것";
		case "f":
			T.postNum=0;return "그녀의 것";
		case "i":
			T.postNum=0;return "녀석의 것";
		case "n":
			T.postNum=0;return "그자의 것";
		case "t":
			T.postNum=0;return "그들의 것";
		default:
			Errors.report(`Used ?${this.name} without selecting the NPC. Typically requires <<person1>>. ${Utils.GetStack()}`);
			T.postNum=0;return "그들의 것";
	}
}
/**
 * ?hers - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?hers in TwineScript after calling <<person1>> to use.
 */
/** ?Hers - Capitalised version of above. */
Template.add(["hers", "Hers"], function () {
	return this.name === "Hers" ? getHers.call(this).toUpperFirst() : getHers.call(this);
});

function getHimself() {
	T.postNum=0;return getHim.call(this) + " 자신";
}
/**
 * ?himself - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?himself in TwineScript after calling <<person1>> to use.
 */
/** ?Himself - Capitalised version of above. */
Template.add(["himself", "Himself"], function () {
	return this.name === "Himself" ? getHimself.call(this).toUpperFirst() : getHimself.call(this);
});

function getPeople() {
	switch (V.malechance) {
		case 100:
			T.postNum=2;return "남자들";
		case 0:
			T.postNum=2;return "여자들";
		default:
			T.postNum=2;return "남자 여자들";
	}
}
/**
 * ?people - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?people in TwineScript after calling <<person1>> to use.
 */
/** ?People - Capitalised version of above. */
Template.add(["people", "People"], function () {
	return this.name === "People" ? getPeople.call(this).toUpperFirst() : getPeople.call(this);
});

function getPeopleYoung() {
	switch (V.malechance) {
		case 100:
			T.postNum=2;return "소년들";
		case 0:
			T.postNum=2;return "소녀들";
		default:
			T.postNum=2;return "소년 소녀들";
	}
}
/**
 * ?peopley - Returns the pronoun based on whatever $pronoun is set to.
 *		   Call ?peopley in TwineScript after calling <<person1>> to use.
 */
/** ?Peopley - Capitalised version of above. */
Template.add(["peopley", "Peopley"], function () {
	return this.name === "Peopley" ? getPeopleYoung.call(this).toUpperFirst() : getPeopleYoung.call(this);
});
