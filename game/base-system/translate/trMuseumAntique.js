function trMuseumAntique(name, post, sep)
{
	if (!setup.trMuseumAntique)
		trinit_museumAntique();

	let found;
	let ret;

	if (typeof(name) === "string" && name.substring(0,1).search("[가-힣]") >= 0)
	{
		found = {};
		found.koName = name;
		found.post = getPostNum(name);
	}
	else
		found = setup.trMuseumAntique[name];
	
	if (found)
	{
		T.trResult = found.koName;
		if (post)
			trPost(found.post, post, sep);
		ret = T.trResult;
	}
	else
		T.trResult = `<span class="red">에러: trMuseumAntique: 정의되어 있지 않음: ${name}</span>`;
	
	return ret;
}
window.trMuseumAntique = trMuseumAntique;
DefineMacro("trMuseumAntique", trMuseumAntique);