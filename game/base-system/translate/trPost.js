/* trPostsList : "대표조사" : ["받침O", "받침X", "ㄹ받침"], */
const trPostsList = {
	 "은" : ["은", "는", "은"], "는" : ["은", "는", "은"],
	 "이" : ["이", "가", "이"], "가" : ["이", "가", "이"],
	 "을" : ["을", "를", "을"], "를" : ["을", "를", "을"],
	 "과" : ["과", "와", "과"], "와" : ["과", "와", "과"],
	 "이랑" : ["이랑", "랑", "이랑"], "랑" : ["이랑", "랑", "이랑"],
	 "아" : ["아", "야", "아"], "야" : ["아", "야", "아"],
	 "이여" : ["이여", "여", "이여"], "여" : ["이여", "여", "이여"],
	 "이야" : ["이야", "야", "이야"],
	 "으로" : ["으로", "로", "로"], "로" : ["으로", "로", "로"],
	 "으로서" : ["으로서", "로서", "로서"], "로서" : ["으로서", "로서", "로서"],
	 "으로써" : ["으로써", "로써", "로써"], "로써" : ["으로써", "로써", "로써"],
	 "으로부터" : ["으로부터", "로부터", "로부터"], "로부터" : ["으로부터", "로부터", "로부터"],
	 "이라" : ["이라", "라", "이라"], "라" : ["이라", "라", "이라"],
	 "이었" : ["이었", "였", "이었"], "였" : ["이었", "였", "이었"],
	 "이라고" : ["이라고", "라고", "이라고"], "라고" : ["이라고", "라고", "이라고"],
	 "이나" : ["이나", "나", "이나"], "나" : ["이나", "나", "이나"],
	 "이란" : ["이란", "란", "이란"], "란" : ["이란", "란", "이란"],
	 "이든가" : ["이든가", "든가", "이든가"], "든가" : ["이든가", "든가", "이든가"],
	 "이던가" : ["이던가", "던가", "이던가"], "던가" : ["이던가", "던가", "이던가"],
	 "이든지" : ["이든지", "든지", "이든지"], "든지" : ["이든지", "든지", "이든지"],
	 "이던지" : ["이던지", "던지", "이던지"], "던지" : ["이던지", "던지", "이던지"],
	 "이야말로" : ["이야말로", "야말로", "이야말로"], "야말로" : ["이야말로", "야말로", "이야말로"],
	 "이구나" : ["이구나", "구나", "이구나"], "구나" : ["이구나", "구나", "이구나"],
	 "이다" : ["이다", "다", "이다"], "다" : ["이다", "다", "이다"],
	 "이지" : ["이지", "지", "이지"], "지" : ["이지", "지", "이지"]
};

function trPost(postNum, post, sep)
{
	if (post)
	{
		if (typeof(postNum) === "number")
		{
			T.postNum = postNum;
			let trPostData = trPostsList[post];
			if (trPostData)
				T.trPost = trPostData[postNum];
			else
				T.trPost = post;
		}
		else if (typeof(postNum) === "string")
		{
			getPostNum(T.trResult);
			T.trPost = trPostsList[post][T.postNum];
		}
		else
			delete T.trPost;
		
		if (!T.trPost)
			T.trPost = "<span class='red'>에러: trPost: postNum= "+ postNum + ", post= " + post + ", sep = " + sep + "</span>";		
	}
	else
	{
		if (typeof(postNum) === "number")
			T.postNum = postNum;
		else
			getPostNum(T.trResult);
		T.trPost = "";
	}
	
	if (!sep)
		T.trResult += T.trPost;
	
	return T.trPost;
}
window.trPost = trPost;
DefineMacro("trPost", trPost);

/* getPostNum : 문자열에서 조사 번호를 찾아 _postNum에 넣는다 (0: 종성 있음 1: 종성 없음 2: 종성 ㄹ) */
function getPostNum(txt)
{
	State.temporary.postNum = 1;	// default: 종성 없음
	if (!txt || txt.length == 0) return State.temporary.postNum;

	var code = txt.charCodeAt(txt.length-1);	// 마지막 글자
	var jong;

	if (0x0AC00 <= code && code <= 0x0D7A3)		// 한글 유니코드
	{
		code -= 0x0AC00;
		jong = code % 28;

		if (jong == 0) State.temporary.postNum = 1;	// 종성 없음
		else if (jong == 8) State.temporary.postNum = 2;	// 종성 ㄹ
		else State.temporary.postNum = 0;		// 종성 있음
	}
	else if (0x30 <= code && code <= 0x39)		// 숫자
	{
		var numPost = [0, 2, 1, 0, 1, 1, 0, 2, 2, 0];
		State.temporary.postNum = numPost[code-0x30];
	}
	return State.temporary.postNum;
}
window.getPostNum = getPostNum;
DefineMacro("getPostNum", getPostNum);

/* trPostTemplate : trPost 의 템플릿 버전 */
Template.add(['un', 'nun'], function () { return ["은", "는", "은"][T.postNum]});
Template.add(['i', 'ga'], function () { return ["이", "가", "이"][T.postNum]});
Template.add(['ul', 'rul'], function () { return ["을", "를", "을"][T.postNum]});
Template.add(['gwa', 'wa'], function () { return ["과", "와", "과"][T.postNum]});
Template.add(['irang', 'rang'], function () { return ["이랑", "랑", "이랑"][T.postNum]});
Template.add(['a', 'ya'], function () { return ["아", "야", "아"][T.postNum]});
Template.add(['iyo', 'yo'], function () { return ["이여", "여", "이여"][T.postNum]});
Template.add('iya', function () { return ["이야", "야", "이야"][T.postNum]});
Template.add(['uro', 'ro'], function () { return ["으로", "로", "로"][T.postNum]});
Template.add(['uroseo', 'roseo'], function () { return ["으로서", "로서", "로서"][T.postNum]});
Template.add(['urosseo', 'rosseo'], function () { return ["으로써", "로써", "로써"][T.postNum]});
Template.add(['urobuter', 'robuter'], function () { return ["으로부터", "로부터", "로부터"][T.postNum]});
Template.add(['ira', 'ra'], function () { return ["이라", "라", "이라"][T.postNum]});
Template.add(['iut', 'yeot'], function () { return ["이었", "였", "이었"][T.postNum]});
Template.add(['irago', 'rago'], function () { return ["이라고", "라고", "이라고"][T.postNum]});
Template.add(['ina', 'na'], function () { return ["이나", "나", "이나"][T.postNum]});
Template.add(['iran', 'ran'], function () { return ["이란", "란", "이란"][T.postNum]});
Template.add(['idunga', 'dunga'], function () { return ["이든가", "든가", "이든가"][T.postNum]});
Template.add(['idonga', 'donga'], function () { return ["이던가", "던가", "이던가"][T.postNum]});
Template.add(['idunji', 'dunji'], function () { return ["이든지", "든지", "이든지"][T.postNum]});
Template.add(['idonji', 'donji'], function () { return ["이던지", "던지", "이던지"][T.postNum]});
Template.add(['iyamalro', 'yamalro'], function () { return ["이야말로", "야말로", "이야말로"][T.postNum]});
Template.add(['iguna', 'guna'], function () { return ["이구나", "구나", "이구나"][T.postNum]});
Template.add(['ida', 'da'], function () { return ["이다", "다", "이다"][T.postNum]});
Template.add(['iji', 'ji'], function () { return ["이지", "지", "이지"][T.postNum]});
Template.add('yi', "의");