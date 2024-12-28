/*
<<c>> and <<cap>> capitalises the first letter of anything in between. E.g. <<c>><<widgettocapitalise>><</c>>
<<allCap>> capitalises the whole content. E.g. <<allCap>>content to capitalise<</allCap>>
*/
Macro.add(["c", "cap", "allCap"], {
	tags: null,
	handler() {
		const content = Wikifier.wikifyEval(this.payload[0].contents).textContent.trim();
		this.output.append(this.name !== "allCap" ? content.toUpperFirst() : content.toUpperCase());
	},
});
