function getToyName(index, capitalise = false) {
	const toy = T.playerToys[index];
	if (toy == null) {
		let msg = "Could not find the player's toy name.";
		if (index === "none") msg = "An attempt to access a toy with the wrong hand was made.";
		Errors.report(msg, { index });
		return "toy duck";
	}
	const name = capitalise ? toy.namecap : toy.name;
	return toy.colour ? toy.colour + " " + name : name;
}
window.getToyName = getToyName;
DefineMacroS("toyName", getToyName);
