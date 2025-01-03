function init_trClothes()
{
	if (!setup.trClothes)
	{
		setup.trClothes = {};
		init_trFace();
		init_trFeet();
		init_trGenitals();
		init_trHandheld();
		init_trHands();
		init_trHead();
		init_trLegs();
		init_trLower();
		init_trNeck();
		init_trOverHead();
		init_trOverLower();
		init_trOverUpper();
		init_trUnderLower();
		init_trUnderUpper();
		init_trUpper();
		
		let trClothesAllNameIndex = {};
		let trClothesParts = Object.getOwnPropertyNames(setup.trClothes);
		let trClothesNameIndex, trClothesVarIndex;
		for (const trClothesType of trClothesParts)
		{
			trClothesNameIndex = {};
			trClothesVarIndex = {};
			for (const trClothesData of setup.trClothes[trClothesType])
			{
				trClothesNameIndex[trClothesData.name] = trClothesData;
				trClothesVarIndex[trClothesData.variable] = trClothesData;
			}
			setup.trClothes[trClothesType].nameIndex = trClothesNameIndex;
			setup.trClothes[trClothesType].varIndex = trClothesVarIndex;
			Object.assign(trClothesAllNameIndex, trClothesNameIndex);
		}
		setup.trClothes.nameIndex = trClothesAllNameIndex;
	}
}
window.init_trClothes = init_trClothes;

function trClothes(part, name, mode, post, sep)
{
	if (part && name)
	{
		name = name.toLowerCase();
		if (!mode || mode.substring(0,1).search("[가-힣]") >= 0)
		{
			sep = post;
			post = mode;
			mode = "name";
		}
		if (part == "chastity")
			part = "genitals";
		
		if (!setup.trClothes)
			init_trClothes();
		
		if (part == "butt_plug")	// sextoy 전용 part
			sextoyPost(name, mode, post, sep);
		else if (part == "all")
			trSearchClothes(name, mode, post, sep);
		else if (mode[0] == 'p')	// pattern
		{
			let found = setup.trClothes.handheld.pattern[name];
			T.trResult = (found? found : "");
		}
		else if (!setup.trClothes[part])
			T.trResult = `에러: trClothes: ${part}라는 부위가 잘못되었습니다`;
		else
		{
			let trTemp;
			if (name == "piece of fabric")
			{
				trTemp = {name_ko:"옷 조각", post:0, description:"옷 조각"};
			}
			else
			{
				trTemp = setup.trClothes[part].nameIndex[name];
				if (!trTemp)
					trTemp = setup.trClothes[part].varIndex[name];
			}

			if (trTemp)
			{
				if (mode[0] == 'd')	// desc
					T.trResult = trTemp.description;
				else
				{
					T.trResult = trTemp.name_ko;
					if (post)
						trPost(trTemp.post, post, sep);
				}
			}
			else
				T.trResult = `에러: trClothes: ${part}에서 ${name}을 찾을 수 없습니다`;
		}
	}
	else
		T.trResult = `에러: trClothes: part 혹은 name이 잘못되었습니다. part=${part}, name=${name}`;
	return T.trResult;
}
window.trClothes = trClothes;
DefineMacro("trClothes", trClothes);

function trSearchClothes(name, mode, post, sep)
{
	if (name)
	{
		name = name.toLowerCase();
		
		if (!mode || mode.substring(0,1).search("[가-힣]") >= 0)
		{
			sep = post;
			post = mode;
			mode = "name";
		}

		if (!setup.trClothes)
			init_trClothes();
		
		let trTemp;
		if (name == "piece of fabric")
			trTemp = {name_ko:"옷 조각", post:0, description:"옷 조각"};
		else
		{
			
			trTemp = setup.trClothes.nameIndex[name];
		}

		if (trTemp)
		{
			if (mode[0] == 'd')	// desc
				T.trResult = trTemp.description;
			else
			{
				T.trResult = trTemp.name_ko;

				if (post)
					trPost(trTemp.post, post, sep);
			}
		}
		else
		{
			if (setup.trSextoyList[name.toLowerCase().replace('_',' ')])
				sextoyPost(name, mode, post, sep);
			else
				T.trResult = `에러: trSearchClothes: ${name}을 찾을 수 없습니다`;
			
		}
	}
	else
		T.trResult = `에러: trSearchClothes: name이 잘못되었습니다`;
	
	return T.trResult;
}
window.trSearchClothes = trSearchClothes;
DefineMacro("trSearchClothes", trSearchClothes);

/* <<trNpcClothes *part *name post sep>> */
function trNpcClothes(part, name, post, sep)
{
	if (part)
	{
		if (!["all", "set", "upper", "lower"].includes(part))
		{
			sep = post;
			post = name;
			name = part;
			part = "all";
		}

		if (typeof(name) == "number")
			name = setup.npcClothesSets.find(item => item.name === V.NPCList[name].clothes.set).clothes[part].name;

		if (name)
		{
			if (!setup.trNpcClothes)
				init_trNpcClothes();
			
			let found;
			if (part != "all")
			{
				found = setup.trNpcClothes[part].nameIndex[name];
				if (!found && part == "set")
					found = setup.trNpcClothes[part].descIndex[name];
			}
			else
			{
				found = setup.trNpcClothes.nameIndex[name];
				if (!found)
					found = setup.trNpcClothes.set.descIndex[name];
			}
			
			if (found)
			{
				T.trResult = found.name_ko;
				if (post)
					trPost(found.post, post, sep);
			}
			else
				T.trResult = `에러: trNpcClothes.${part}에 ${name}이 정의되어 있지 않음`;
		}
		else
			T.trResult = `에러: trNpcClothes: name이 잘못되었습니다`;
	}
	else
		T.trResult = `에러: trNpcClothes: part가 잘못되었습니다`;
	
	return T.trResult;
}
window.trNpcClothes = trNpcClothes;
DefineMacro("trNpcClothes", trNpcClothes);

/**
 * window.integrityKeyword (base.js) 의 한글 버전
 * @param worn clothing article, State.variables.worn.XXXX
 * @return {string} condition key word ("tattered"|"torn|"frayed"|"full")
 */
window.trIntegrityKeyword = function(worn, slot) {
	const i = worn.integrity/clothingData(slot,worn,'integrity_max');
	if (i <= 0.2) {
		return "너덜너덜한"
	} else if (i <= 0.5) {
		return "찢긴"
	} else if (i <= 0.9) {
		return "해어진"
	} else {
		return "full"
	}
}
