/* "번역할 단어": { ko: "번역된 단어", post: 조사, pre: "앞단어에 붙일 조사"} */
const trMoneySources = {
	/* 03-JavaScript/ui.js의 moneyStatsProcess() */
	"dance": { ko: "댄스", post: 1, pre: "에서"},
	"tip": { ko: "팁", post: 0},
	"tips": { ko: "팁", post: 0},
	"job": { ko: "일", post: 2},
	"jobs": { ko: "일", post: 2},
	"prostitution": { ko: "매춘", post: 0, pre: "에서"},
	"library": { ko: "도서관", post: 0},
	"books": { ko: "책.대여", post: 1},
	"school": { ko: "학교", post: 1},
	"project":  { ko: "프로젝트", post: 1},
	"condoms":  { ko: "콘돔", post: 0},
	"stimulant":  { ko: "각성제", post: 1},
	"pool":  { ko: "수영장", post: 0},
	"party":  { ko: "파티", post: 1},
	"bus":  { ko: "버스", post: 1},
	"town":  { ko: "마을", post: 2},
	"avery":  { ko: "에이버리", post: 1},
	"bailey":  { ko: "베일리", post: 1},
	"rent":  { ko: "방값", post: 0},
	"robin":  { ko: "로빈", post: 0},
	"sydney":  { ko: "시드니", post: 1},
	"whitney":  { ko: "휘트니", post: 1},	
	"hairdressers":  { ko: "미용실", post: 2},
	"tailor":  { ko: "옷.수선", post: 0},
	"clothes":  { ko: "의복", post: 0},
	"sex":  { ko: "섹스", post: 1},
	"toys":  { ko: "장난감", post: 0},
	"tattoo":  { ko: "문신", post: 0},
	"furniture":  { ko: "가구", post: 1},
	"cosmetics":  { ko: "화장품", post: 0},
	"supermarket":  { ko: "수퍼마켓", post: 0},
	"shopping":  { ko: "쇼핑", post: 1},
	"flats":  { ko: "아파트", post: 1},
	"canal":  { ko: "수로", post: 1},
	"cleaning":  { ko: "청소", post: 1},
	"hookah":  { ko: "물담배.가게", post: 1},
	"cafe":  { ko: "카페", post: 1},
	"waiter":  { ko: "웨이터", post: 1},
	"chef":  { ko: "셰프", post: 1},
	"buns":  { ko: "빵", post: 0},
	"brothel":  { ko: "창관", post: 0},
	"show":  { ko: "공연", post: 0},
	"vending":  { ko: "자동", post: 0},
	"machine":  { ko: "판매기", post: 1},
	"hospital":  { ko: "병원", post: 0},
	"paternity":  { ko: "친자", post: 1, pre: "에서"},
	"test":  { ko: "검사", post: 1},
	"penis":  { ko: "음경", post: 0},
	"reduction":  { ko: "축소", post: 1},
	"enlargement":  { ko: "확대", post: 1},
	"breast":  { ko: "유방", post: 0},
	"parasite":  { ko: "기생충", post: 0},
	"parasites":  { ko: "기생충", post: 0, pre: "에서"},
	"removal":  { ko: "제거", post: 1},
	"sold":  { ko: "판매", post: 1},
	"pharmacy":  { ko: "약국", post: 0},
	"cream":  { ko: "크림", post: 0},
	"pills":  { ko: "약", post: 0},
	"pregnancy":  { ko: "임신", post: 0},
	"museum":  { ko: "박물관", post: 0},
	"antique":  { ko: "골동품", post: 0},
	"pub":  { ko: "술집", post: 0},
	"alcohol":  { ko: "술", post: 2, pre: "에서"},
	"dock":  { ko: "부두", post: 1},
	"wage":  { ko: "임금", post: 0},
	"strip":  { ko: "스트립", post: 0},
	"club":  { ko: "클럽", post: 0},
	"bartender":  { ko: "바텐더", post: 1},
	"dancer":  { ko: "댄서", post: 1},
	/* special-dance/effects.twee (tipreceive) */
	"dancing":  { ko: "댄스", post: 1},
	/* 01-config */
	"debug":  { ko: "디버그", post: 1},
	/* 04-Variables */
	"farm":  { ko: "농장", post: 0},
	"upgrades":  { ko: "업그레이드", post: 1},
	"orphanage":  { ko: "고아원", post: 0},
	"blackjack":  { ko: "블랙잭", post: 0},
	/* base-combat */
	"tutorial":  { ko: "튜토리얼", post: 2},
	"man":  { ko: "남자", post: 1},
	"woman":  { ko: "여자", post: 1},
	/* base-system */
	"thievery":  { ko: "절도", post: 1},
	"forest":  { ko: "숲", post: 0},
	"pirates":  { ko: "해적선", post: 0},
	"office":  { ko: "사무실", post: 2},
	/* overworld-plains/loc-estate */
	"estate":  { ko: "레미의.사유지", post: 1},
	"betting":  { ko: "도박.판돈", post: 1, pre: "에서"},
	/* overworld-plains/loc-moor */
	"moor":  { ko: "황무지", post: 1},
	/* overworld-plains/loc-riding */
	"riding":  { ko: "승마", post: 1},
	"lessons":  { ko: "레슨", post: 0},
	/* overworld-town/loc-adultshop */
	"lube":  { ko: "윤활제", post: 1},
	/* overworld-town/loc-alley */
	"bribe":  { ko: "뇌물", post: 2, pre: "에게"},
	/* overworld-town/loc-arcade */
	"arcade":  { ko: "오락실", post: 2},
	/* overworld-town/loc-brothel */
	"gloryhole":  { ko: "글로리홀", post: 2},
	/* overworld-town/loc-compound */
	"compound":  { ko: "단지", post: 1},
	"phials":  { ko: "최음제", post: 1},
	/* overworld-town/loc-dance-studio */
	"danube":  { ko: "다뉴브.가", post: 1},
	/* overworld-town/loc-docks */
	"gift":  { ko: "선물", post: 2},
	/* overworld-town/loc-farmers-centre */
	"factory":  { ko: "공장", post: 0},
	"produce":  { ko: "생산물", post: 2},
	/* overworld-town/loc-hospital */
	"contacts":  { ko: "콘택트렌즈", post: 1},
	"after":  { ko: "사후.피임", post: 0},
	/* overworld-town/loc-market */
	"market":  { ko: "시장", post: 0},
	"stall":  { ko: "가판대", post: 1},
	/* overworld-town/loc-police */
	"collar":  { ko: "개목걸이", post: 1},
	/* overworld-town/loc-pub */
	"pepper":  { ko: "후추", post: 1, pre: "에서"},
	"spray":  { ko: "스프레이", post: 1},
	"stolen":  { ko: "훔친", post: 0},
	"goods":  { ko: "물건", post: 0},
	/* overworld-town/loc-school */
	"pregnant":  { ko: "임신", post: 0},
	"student":  { ko: "학생", post: 0, pre: "시킨"},
	/* overworld-town/loc-shop */
	"pet":  { ko: "애완동물", post: 2},
	"shop":  { ko: "가게", post: 1},
	"toy":  { ko: "장난감", post: 0},
	/* overworld-town/loc-spa */
	"spa":  { ko: "온천", post: 0},
	/* overworld-town/loc-street */
	"police":  { ko: "경찰", post: 0},
	/* 특이 케이스 */
	"dancestudio":  { ko: "무용.학원", post: 0},
	"photostudio":  { ko: "사진.스튜디오", post: 1},
	"adultshop":  { ko: "성인용품점", post: 0},
	"pregnancytest":  { ko: "임신.테스트기", post: 1},
	"peopleofinterest": { ko: "관심이.있는.사람들", post: 2 },
	"startingmoney": { ko: "초기.소지금", post: 0 },
	"nottracked": { ko: "추적되지.않음", post: 0 },
	"unknown":  { ko: "불명", post: 0},
};

const ambiguousWords = [
	"danceStudio", "photoStudio", "adultShop", "PregnancyTest",
	"peopleOfInterest", "startingMoney", "notTracked"
];

function trMoneySource(source, post, sep)
{
	if (typeof(source) === "string")
	{
		let trArray = [];
		let found;
		let i;
		
		for(const word of ambiguousWords)
		{
			i = source.indexOf(word);
			if (i >= 0)
			{	console.log("i = " + i);
				let replaceword = word.toLowerCase();
				if (i > 0)
					replaceword.toUpperFirst();
				source = source.replace(word, replaceword);	console.log(`word = ${word}, replaceword = ${replaceword}, new source = ${source}`);
			}
		}

		{
			let wordArray = source.replace(/([A-Z])/g, " $1").toLowerCase().split(" ");
			for( const word of wordArray)
			{
				found = trMoneySources[word];
				if (!found)
					trArray.push({ko: `에러:.${word}.찾을.수.없음`, post:0});
				else
					trArray.push(found);
			}
			
			for(i = 0; i < trArray.length; i++)
			{
				if (trArray[i].pre && i > 0)
				{
					T.trResult = trArray[i-1].ko;
					trPost(trArray[i-1].post, trArray[i].pre);
					trArray[i-1].ko = T.trResult;
				}
			}
		}
		T.trResult = "";
		for(i = 0; i < trArray.length; i++)
		{
			if (i != 0)
				T.trResult += ".";
			T.trResult += trArray[i].ko;
		}
		if (post)
			trPost(post, sep);
	}
	else
		T.trResult = `에러:.source가.string이.아님.(${source}:${typeof(source)})`;
	return T.trResult;
}
window.trMoneySource = trMoneySource;
DefineMacroS("trMoneySource", trMoneySource);