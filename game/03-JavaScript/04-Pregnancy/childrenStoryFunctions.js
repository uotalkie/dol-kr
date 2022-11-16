
const setChildFirstWord = (childId, word, playerAbsent = false) => {

	if (!childId && V.childSelected) childId = V.childSelected.childId;
	if(!childId && !V.childSelected) return false;

	let child = V.children[childId];

	//First word already set
	if(child.localVariables.firstWord) return false;

	if(!word){
		let wordList = ["mama", "mommy", "dada", "daddy", "papa", "no", "nana", "yes", "uh oh", "bye", "bye-bye", "hello"];
		if(random(0,10000) === 0){
			wordList.push("Brouzof");
		}
		word = wordList[random(0, wordList.length - 1)];
	};
	child.localVariables.firstWord = {
		word: word,
		date: {"day":V.monthday, "month":V.month.toUpperFirst(), "year":V.year},
		playerAbsent: playerAbsent,
	};
	return true;
}
DefineMacro("setChildFirstWord", setChildFirstWord);
