/*
** outfitNamePost : <<outfitCheck>> 이후 확인 가능한 _top.name, _topUnder.name, _bottom.name, _bottomUnder.name 을 번역하기 위한 매크로 위젯
*/

// outfitNamePost (part =["top"|"bottom"], outfit =[T.top|T.topUnder|T.bottom|T.bottomUnder], post, sep)
// return: T.trResult | null (입지 않은 경우)
function outfitNamePost(part, outfit, post, sep)
{
	let result = null;
	if (part && outfit)
	{
		if (outfit == T.bottom && T.outfit)
			part = "top";
		
		let layers;
		if (part == "top")
			layers = [V.worn.over_upper, V.worn.upper, V.worn.under_upper];
		else
			layers = [V.worn.over_lower, V.worn.lower, V.worn.under_lower];
		
		let index = layers.indexOf(outfit);
		if (index >= 0)
		{
			if (part == "top")
				layers = ["over_upper", "upper", "under_upper"];
			else
				layers = ["over_lower", "lower", "under_lower"];
			
			result = trClothes(layers[index], outfit.name, "name", post, sep);
		}
		else
			T.trResult = `에러: ${part}NamePost: ${outfit.name}이 ${part}에 없음`;
	}
	else
		T.trResult = `에러: outfitNamePost: part(${part}) 혹은 outfit(${outfit})이 없음`;
	return result;
}

window.topNamePost = (post, sep) => outfitNamePost("top", T.top, post, sep);
DefineMacroS("topNamePost", (post, sep) => topNamePost(post, sep) || T.trResult);

window.topUnderNamePost = (post, sep) => outfitNamePost("top", T.topUnder, post, sep);
DefineMacroS("topUnderNamePost",  (post, sep) => topUnderNamePost(post, sep) || T.trResult);

window.bottomNamePost = (post, sep) => outfitNamePost("bottom", T.bottom, post, sep);
DefineMacroS("bottomNamePost",  (post, sep) => bottomNamePost(post, sep) || T.trResult);

window.bottomUnderNamePost = (post, sep) => outfitNamePost("bottom", T.bottomUnder, post, sep);
DefineMacroS("bottomUnderNamePost",  (post, sep) => bottomUnderNamePost(post, sep) || T.trResult);
