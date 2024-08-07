/* sextoy 관련 코드가 js로 만들어져 있어 js 로 제작함. pc 가 사용하는 sextoy 외에 NPC가 사용하는 sextoy 가 있는 것에 주의.
*/

/* setup.sextoys from 03-JavaScript/sexShopMenu.js */
setup.trSextoyList = {
	"dildo" : {
		index : 0,
		koname : "딜도",
		post : 1,
		desc : "15cm 길이의 딜도."
	},
	"small dildo" : {
		index : 1,
		koname : "작은 딜도",
		post : 1,
		desc : "초보자에게 괜찮은 장난감."
	},
	"anal beads" : {
		index : 2,
		koname : "항문 구슬",
		post : 2,
		desc : "애널 플레이용. 항문에 착용하거나 가지고 놀 수 있다."
	},
	"bullet vibe" : {
		index : 3,
		koname : "계란형 바이브",
		post : 1,
		desc : "이 물품이 만들어내는 진동으로 강력한 절정을 얻을 수 있다. 섹스 장난감을 처음 써보는 사람들에게 괜찮다."
	},
	"butt plug" : {
		index : 4,
		koname : "항문 마개",
		post : 1,
		desc : "애널 플레이용. 항문에 착용하거나 가지고 놀 수 있다."
	},
	"strap-on" : {
		index : 5,
		koname : "페니스 밴드",
		post : 1,
		desc : "엉덩이에 착용한다. 삽입 섹스에 사용한다."
	},
	"strap-on horse cock" : {
		index : 6,
		koname : "말자지 페니스 밴드",
		post : 1,
		desc : "진기한 말자지 모양의 성기. 엉덩이에 착용한다. 삽입 섹스에 사용한다."
	},
	"strap-on knotted cock" : {
		index : 7,
		koname : "개자지 페니스 밴드",
		post : 1,
		desc : "진기한 개자지 모양의 성기. 엉덩이에 착용한다. 삽입 섹스에 사용한다."
	},
	"lube" : {
		index : 8,
		koname : "윤활액",
		post : 0,
		desc : "성적 용도에 적합한 윤활액. 한 병당 세 번 사용 가능하다."
	},
	"stroker" : {
		index : 9,
		koname : "오나홀",
		post : 2,
		desc : "남성기 자위용 원통형 기구. 피부 비슷한 느낌이 나는 재료로 만들어졌다."
	},
	"aphrodisiac pills" : {
		index : 10,
		koname : "미약",
		post : 0,
		desc : "알약 3개가 1팩으로 포장된 미약. 설명서에는 향상된 경험을 하기 위해 성교 전에 '적절한 갯수'를 투약하라고 적혀있다."
	},
	"breast pump" : {
		index : 11,
		koname : "착유기",
		post : 1,
		desc : "휴대용 착유기."
	},
};

setup.trSextoyCategoryList = {
	"dildo" : {
		koname : "딜도",
		post : 1,
	},
	"butt_plug" : {
		koname : "항문 마개",
		post : 1,
	},
	"vibrator" : {
		koname : "바이브레이터",
		post : 1,
	},
	"strap-on" : {
		koname : "페니스 밴드",
		post : 1,
	},
	"lube" : {
		koname : "윤활액",
		post : 0,
	},
	"stroker" : {
		koname : "오나홀",
		post : 2,
	}
};

function sextoyPost(name, type, post, sep)
{
	if (name)
	{
		if (type && type.charCodeAt(0) >= 0x0AC00)	// 한글 유니코드
		{
			sep = post;
			post = type;
			type = "name";
		}

		let found = setup.trSextoyList[name.toLowerCase().replace('_',' ')];
		
		// 없으면 handtoolList 에서 검색 (ex. riding crop 등)
		if (!found)
		{
			trinit_handtoolList();
			let handtool = setup.trHandtoolList[name];
			if (handtool)
			{
				found = {};
				found.koname = handtool.ko;
				found.post = handtool.post;
			}
		}
		
		if (found)
		{
			if (type && type[0] == 'd')
				T.trResult = found.desc;
			else
				T.trResult = found.koname;
				T.postNum = found.post;
			if (post)
				trPost(found.post, post, sep);
		}
		else
			T.trResult = "<span class='red'>에러: sextoyPost: 정의되지 않음:" + name + "</span>";
	}
	return T.trResult;
}
window.sextoyPost = sextoyPost;
DefineMacroS("sextoyPost", sextoyPost);

function sextoyCategoryPost(name, post, sep)
{
	if (name)
	{
		let found = setup.trSextoyCategoryList[name];
		
		if (found)
		{
			T.trResult = found.koname;
			T.postNum = found.post;
			if (post)
				trPost(found.post, post, sep);
		}
		else
			delete T.trResult;
	}
	return T.trResult;
}
DefineMacroS("sextoyCategoryPost", sextoyCategoryPost);
