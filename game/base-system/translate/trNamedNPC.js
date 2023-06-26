function trNamedNPCInner(name, type)
{
	let found;
	if (!type)
	{
		found = setup.trNamedNPCList.nameIndex[name];
		if (!found)
			found = setup.trNamedNPCList.titleIndex[name];
	}
	else if (type[0] === 't')
		found = setup.trNamedNPCList.titleIndex[name];
	else
		found = setup.trNamedNPCList.nameIndex[name];

	if (found)
	{
		T.trResult = found.koname;
		T.postNum = found.post;	
	}
	else
	{
		delete T.trResult;
		delete T.postNum;
	}
	return '';
}
DefineMacroS("trNamedNPCInner", trNamedNPCInner);