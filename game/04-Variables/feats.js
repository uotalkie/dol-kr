/*
	Key points
	series: "seriesName", //Will only show the first locked feat in a series to the player
	softLockable: true, //Will disable the unlocking of the feat if softmode is enabled
	pregnancyLockable: true, //Will disable the unlocking of the feat if certain pregnancy settings are too low
	hidden: true, //Will hide the feat at all times unless unlocked, best for feats for unreleased content
*/
setup.feats = {
	"Pocket Change": {
		title: "잔돈",
		desc: "£1,000 가졌다.",
		difficulty: 1,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Money Maker": {
		title: "큰손",
		desc: "£10,000 가졌다.",
		difficulty: 1,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	Tycoon: {
		title: "거물",
		desc: "£100,000 가졌다.",
		difficulty: 2,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	Millionaire: {
		title: "백만장자",
		desc: "£1,000,000 가졌다.",
		difficulty: 3,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	"It Belongs in a Museum": {
		title: "이건 박물관으로 가야해!",
		desc: "모든 유물을 찾았다",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Fully Covered": {
		title: "완전히 뒤덮임",
		desc: "물 말고 다른 것으로 흠뻑 젖었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
	},
	"Being a Boy": {
		title: "남자아이의 삶",
		desc: "소년으로 50일을 달성했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being a Girl": {
		title: "여자아이의 삶",
		desc: "소녀로 50일을 달성했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being a Hermaphrodite": {
		title: "후타나리의 삶",
		desc: "후타나리로 50일을 달성했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being an Orphan": {
		title: "고아의 삶",
		desc: "150일을 달성했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Stressful Challenge": {
		title: "스트레스 챌린지",
		desc: "의식을 잃지 않고 50일을 달성했다.",
		difficulty: 2,
		series: "challenge",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Long Stressful Challenge": {
		title: "기나긴 스트레스 챌린지",
		desc: "의식을 잃지 않고 150일을 달성했다.",
		difficulty: 3,
		series: "challenge",
		filter: ["All", "General"],
		softLockable: true,
	},
	Billboard: {
		title: "광고판",
		desc: "광고를 그려넣고, 그 대가를 받았다.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	"A Living Canvas": {
		title: "살아있는 캔버스",
		desc: "몸 구석구석에 잉크가 묻었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	Farmhand: {
		title: "농장 일꾼",
		desc: "알렉스가 농장을 확장하는 걸 도왔다.",
		difficulty: 2,
		series: "alex",
		filter: ["All", "General"],
	},
	Farmer: {
		title: "농부",
		desc: "농장에 예전의 영광을 돌려놓았다.",
		difficulty: 3,
		series: "alex",
		filter: ["All", "General"],
	},
	Cultivator: {
		title: "경작자",
		desc: "알렉스의 농장에서 모든 경작지를 경작했다.",
		difficulty: 3,
		series: "alex",
		filter: ["All", "General"],
	},
	"The Rival Farm": {
		title: "라이벌 농장",
		desc: "농장 확장 하나를 끝까지 업그레이드했다.",
		difficulty: 2,
		series: "farm",
		filter: ["All", "General"],
	},
	"The Rival Estate": {
		title: "라이벌 대농장",
		desc: "농장을 완전히 확장했다.",
		difficulty: 3,
		series: "farm",
		filter: ["All", "General"],
	},
	"Heroic Victory": {
		title: "영웅적인 승리",
		desc: "레미에게서 아홉 경작지를 지키고, 하나도 잃지 않았다.",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
	},
	"Five in a Row": {
		title: "5연승",
		desc: "블랙잭을 5번 연속으로 이겼다.",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	Distinction: {
		title: "우수함",
		desc: "학교 시험에서 우수한 성적을 거뒀다.",
		difficulty: 1,
		series: "distinction",
		filter: ["All", "General"],
	},
	Distinctive: {
		title: "더 우수함",
		desc: "학교 시험에서 5회 우수한 성적을 거뒀다.",
		difficulty: 2,
		series: "distinction",
		filter: ["All", "General"],
	},
	Distinguished: {
		title: "탁월함",
		desc: "학교 시험에서 15회 우수한 성적을 거뒀다.",
		difficulty: 3,
		series: "distinction",
		filter: ["All", "General"],
	},
	"Science Fair Winner": {
		title: "과학전람회 우승자",
		desc: "과학으로 사람들을 현혹했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Maths Competition Winner": {
		title: "수학 경시대회 우승자",
		desc: "비열한 방법을 썼든 아니든.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Rich Hearts": {
		title: "부유한 마음들",
		desc: "영어 수업 중의 연극 무대에서 연기를 잘 했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Most Aware": {
		title: "인식이 뛰어남",
		desc: "당신은 다른 사람들은 보지 못하는 것들을 본다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"Most Innocent": {
		title: "가장 순수함",
		desc: "모든게 괜찮다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"No More Control": {
		title: "통제불능",
		desc: "어찌 이보다 더 음란해질 수 있겠는가!",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Thief: {
		title: "도둑",
		desc: "이제 어떻게 물건들을 손에 넣을 수 있는지 안다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"May I have this Dance?": {
		title: "한 곡 추시겠어요?",
		desc: "당신의 몸놀림에 저항할 자는 없다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Aquanaut: {
		title: "잠수부",
		desc: "보물 사냥꾼들을 위해.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Seductress: {
		title: "요부",
		desc: "사람들을 장악할 수 있다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"Green Fingered": {
		title: "초록 손가락",
		desc: "무릎을 꿇은채로 정말 많은 걸 할 수 있다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Majordomo: {
		title: "집사",
		desc: "어떤 쓰레기도 당신의 눈길을 피해갈 수 없다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Swift: {
		title: "재빠름",
		desc: "바람과 같이.",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Alluring: {
		title: "색기 넘침",
		desc: "시선을 끄는 건 쉬운 일이다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
		softLockable: true,
	},
	"Sex Specialist": {
		title: "섹스 스페셜리스트",
		desc: "다른 이들을 가게 만드는 데에는 도가 텄다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Perfect Record": {
		title: "완벽한 성적표",
		desc: "공부로는 따라올 자가 없다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Perfect Sub": {
		title: "완벽한 순종",
		desc: "순종의 절정.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Defying the Odds": {
		title: "역경에의 도전",
		desc: "반항의 절정.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Hawker: {
		title: "행상인",
		desc: "지구가 준 이익.",
		difficulty: 1,
		series: "market",
		filter: ["All", "Stats"],
	},
	Vendor: {
		title: "노점상",
		desc: "장사 실력을 증명했다.",
		difficulty: 2,
		series: "market",
		filter: ["All", "Stats"],
	},
	Merchant: {
		title: "상인",
		desc: "시장을 지배했다.",
		difficulty: 2,
		series: "market",
		filter: ["All", "Stats"],
	},
	"Twisted Desire": {
		title: "뒤틀린 욕구",
		desc: "고통은 선택이다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Served Hot": {
		title: "뜨겁게 제공합니다",
		desc: "그들을 아프게 할 것이고, 당신은 그것을 좋아한다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Sadomasochist: {
		title: "새도마조히스트",
		desc: "당신은 고통을 원한다. 주는 것도, 받는 것도.",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Shining Reputation": {
		title: "빛나는 명성",
		desc: "유명하다, 올바른 쪽으로만.",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Social Butterfly": {
		title: "사회적 나비",
		desc: "당신은 모두의 관심 한가운데에 있다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Anti-Social Moth": {
		title: "비사회적 나방",
		desc: "누가 친구가 필요하다는 거지?",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Teachers Pet": {
		title: "선생님의 총아",
		desc: "반에서 제일가는 학생이다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Teachers Nightmare": {
		title: "선생님의 악몽",
		desc: "당신은 공포 그 자체다!",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Robin the Lover": {
		title: "연인 로빈",
		desc: "로빈에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Robin's Song": {
		title: "로빈의 노래",
		desc: "로빈이 크로스드레싱 하는 것을 편안하게 느끼도록 도와줬다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Whitney the Tsundere": {
		title: "일진 휘트니",
		desc: "휘트니에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Delinquent Antics": {
		title: "불량스런 장난",
		desc: "수업 중간에 휘트니를 가버리게 만들었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Giddy Up": {
		title: "이랴",
		desc: "휘트니를 수영장에 던져넣었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Kylar the Obsessed": {
		title: "집착자 카일라",
		desc: "카일라에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Eden the Lonely": {
		title: "외톨이 에덴",
		desc: "에덴에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Avery the Moneybags": {
		title: "물주 에이버리",
		desc: "에이버리에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Leighton the Shady": {
		title: "수상한 레이턴",
		desc: "레이턴에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Alex the Robust": {
		title: "원기 왕성한 알렉스",
		desc: "알렉스에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Great Hawk the Terror": {
		title: "두려운 거대 매",
		desc: "당신은 훌륭한 배우자가 될 것이다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Feather Trick": {
		title: "깃털 마법",
		desc: "거대 매와 사냥할 때 한번의 하강으로 럴커 셋을 잡았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Wren the Sly": {
		title: "밀수꾼 렌",
		desc: "렌에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Great Wolf the Alpha": {
		title: "우두머리 검은 늑대",
		desc: "늑대에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Sydney the Pure Hearted": {
		title: "순결한 마음의 시드니",
		desc: "시드니가 당신에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Harper the Hypnotist": {
		title: "최면술사 하퍼",
		desc: "하퍼에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Morgan the Lost": {
		title: "잊혀진 모건",
		desc: "모건에게 순결을 바쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Love Triangles": {
		title: "삼각관계",
		desc: "도대체 누굴 골라야 할까.",
		difficulty: 2,
		series: "love triangles",
		filter: ["All", "Social"],
	},
	"Love Trapezoids": {
		title: "사각관계",
		desc: "셋은 당신에게는 부족했다.",
		difficulty: 3,
		series: "love triangles",
		filter: ["All", "Social"],
	},
	"Ballroom Show-off": {
		title: "무도회 과시자",
		desc: "에이버리와 대회에서 우승했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Under the Table": {
		title: "책상 밑에서",
		desc: "술 마시기 대회에서 자신의 패기를 입증했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Pub Crawl Victors": {
		title: "술집 순례 우승자",
		desc: "직장 동료들과 대회에서 우승했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Mason's Secret": {
		title: "메이슨의 비밀",
		desc: "메이슨이 꺼려하는 비밀을 공유하도록 만들었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Mason's Shame": {
		title: "메이슨의 수치",
		desc: "메이슨을 라커 안에서 절정시켰다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Animal Tender": {
		title: "동물 돌보미",
		desc: "알렉스의 농장에 있는 모든 동물들로부터 존중받았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"I Spy": {
		title: "나는 훔쳐본다",
		desc: "샤워 중인 알렉스를 훔쳐봤다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"First Kiss": {
		title: "첫 키스",
		desc: "연애 상대에게 첫 키스를 주었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"A Crime Most Foul": {
		title: "가장 나쁜 범죄",
		desc: "한번 늦고, 영원히 창피당했다.",
		difficulty: 2,
		series: "",
		hint: "Hint: 쓰여진 처벌을 영구적으로 만든다.",
		filter: ["All", "Social"],
	},
	Longing: {
		title: "갈망",
		desc: "카일라의 집에서 도망쳤다.",
		difficulty: 3,
		series: "",
		hint: "Hint: 카일라를 억제된 광기로 내몬다.",
		filter: ["All", "Social"],
	},
	"Pagan Rite": {
		title: "이교도 의식",
		desc: "카일라의 부모에 대해 알게 되었다.",
		difficulty: 1,
		series: "",
		hint: "Hint: 카일라의 저택에 대한 비밀을 찾는다.",
		filter: ["All", "Social"],
	},
	Neko: {
		title: "야옹~",
		desc: "관심을 끌기 위해 가르랑거렸다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Wolf: {
		title: "만월의 울부짖음",
		desc: "무리의 일원이 되고 싶다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Cattle: {
		title: "황소와 관계를...",
		desc: "착유될 준비가 됐다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Harpy: {
		title: "독수리처럼 날다",
		desc: "커다란 그림자를 드리우고 있다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Fox: {
		title: "교활한 여우",
		desc: "도둑질 잘하는 조그만 악당.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Angel: {
		title: "천사처럼 걷기",
		desc: "추락하지 않도록 노력하자.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	"Fallen Angel": {
		title: "추락하고, 추락하고, 추락하고...",
		desc: "잔혹하게 더럽혀짐.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Demon: {
		title: "악마같은 모습",
		desc: "엄청난 음란함의 원인.",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	"A Special Trait": {
		title: "특수 도전과제",
		desc: "특수 도전과제를 하나 달성했다.",
		difficulty: 2,
		series: "special trait",
		hint: "Hint: 무언가 특별하다.",
		filter: ["All", "Special"],
	},
	"A Special Trait Collector": {
		title: "특수 도전과제 수집가",
		desc: "모든 특수 도전과제를 획득했다.",
		difficulty: 3,
		hint: "Hint: 무언가 더욱 특별하다.",
		series: "special trait",
		filter: ["All", "Special"],
	},
	"Broodmother Host": {
		title: "번식엄마 숙주",
		desc: "수없이 많은 작은 생물들의 숙주가 되었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 무언가를 남긴다.",
	},
	"Top Broodmother Host": {
		title: "최고 번식엄마 숙주",
		desc: "완벽히 생물들의 숙주가 되었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 무언가 엄청난 것을 남긴다.",
	},
	"Broodmother Zoologist": {
		title: "번식엄마 동물학자",
		desc: "기생충 노트를 전부 채웠다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 남겨진 모든 것들을, 세심하고 자세히 적는다.",
	},
	"Miracle of Life": {
		title: "생명의 신비",
		desc: "당신의 첫 아이를 낳았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		pregnancyLockable: true,
	},
	"First Fatherhood": {
		title: "초보 아빠",
		desc: "당신의 첫 아이의 아빠가 되었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
	},
	"Hail Mary": {
		title: "성모 마리아",
		desc: "처녀인 상태로 아이를 낳았다.",
		difficulty: 4,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 무언가를 얻지만 무언가 다른 것의 결과로 얻지 않는다.",
		pregnancyLockable: true,
		pregnancySillyLockable: true,
	},
	"Bicycle Mother": {
		title: "자전거 엄마",
		desc: "아빠가 누군지 모르는 아이를 낳았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 누가 했는지 알아?",
	},
	"Life Comes in Threes": {
		title: "인생은 셋씩 오지",
		desc: "세 쌍둥이를 낳았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 같은 종류 셋.",
		pregnancyLockable: true,
	},
	"Life begins when you least expect": {
		title: "생명은 당신이 가장 기대하지 않을 때 시작한다",
		desc: "남자로서 아이를 낳았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 마법이 생성되지 않아야 할 것이 생성되는 것을 돕는다.",
	},
	"Diversity of Life": {
		title: "생명의 다양성",
		desc: "여러 다른 종의 아이들을 낳았다.",
		difficulty: 4,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: 여러 유형의 생명들.",
		pregnancyLockable: true,
	},
	/* "Broken Dam":{ //Not in the code right now
		title: "무너진 댐",
		desc: "찢어진 콘돔 때문에 임신했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: ."
	}, */
	/* "Seed Spreader":{  ToDo: Pregnancy: uncomment once you can impregnate more that 3 named npc's
		title: "씨뿌리는 자",
		desc: "NPC 세 명을 하루 안에 임신시켰다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "Hint: ."
	}, */
	"Producer of Lewd Fluids": {
		title: "애액 생산자",
		desc: "이제 저 촉수들은 누가 위인지 알 것이다.",
		difficulty: 1,
		series: "lewd fluids",
		filter: ["All", "Special"],
		hint: "Hint: 촉수들은 당신을 질투한다.",
	},
	"Literally Buckets": {
		title: "말 그대로 양동이째로",
		desc: "촉수의 신.",
		difficulty: 2,
		series: "lewd fluids",
		filter: ["All", "Special"],
		hint: "Hint: 욕조를 [편집됨]으로 가득 채운다.",
	},
	"Feeling Full": {
		title: "가득찬 느낌",
		desc: "음란한 액체가 잔뜩 쌓였다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 잔뜩 먹은 뒤.",
	},
	"Head Chief": {
		title: "주방장",
		desc: "다들 당신의 빵을 사랑한다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 다른 사람들을 위해 빵을 굽는다.",
	},
	"Locked In Gold": {
		title: "황금에 갇히다",
		desc: "그런다고 좌절감으로부터 지켜주진 않는다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 잃을 바에는 가둬놓는게 낫다.",
	},
	"Bailey's Trouble Maker": {
		title: "베일리의 골칫거리",
		desc: "베일리를 가게 만들었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 집에서 말썽을 일으킨다.",
	},
	"Leighton's Nightmare": {
		title: "레이턴의 악몽",
		desc: "레이턴을 가게 만들었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 학교에서 말썽을 일으킨다.",
	},
	"Alex's Partner": {
		title: "알렉스의 파트너",
		desc: "알렉스를 가게 만들었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 농장에서 재미를 좀 본다.",
	},
	"Harper's Bane": {
		title: "하퍼의 골칫거리",
		desc: "하퍼가 자신의 혈청을 마시게 만들었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 자기가 만든 약을 직접 맛보게 해준다.",
	},
	Laughingstock: {
		title: "웃음거리",
		desc: "누군가를 공개굴욕형으로 보냈다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 누군가에게 굴욕감을 준다.",
	},
	"You're the Laughingstock": {
		title: "네가 웃음거리다",
		desc: "공개굴욕형에 처해졌다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 범죄자가 된다.",
	},
	"The Endless Deep": {
		title: "무저갱",
		desc: "계속 바다로 수영했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 세상의 끝으로.",
	},
	"Wet and Ruined": {
		title: "축축하고 폐허가 된",
		desc: "폐허가 된 성을 발견했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 수렁에서 길을 잃는다.",
	},
	"Terror's Equal": {
		title: "두려운 존재와 동급",
		desc: "탑을 인상적인 사냥 전리품들로 채웠다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 하늘의 두려운 존재에 걸맞는 허영심을 부린다.",
		softLockable: true,
	},
	"Birds of a Feather": {
		title: "같은 깃털을 가진 새들은...",
		desc: "...같은 곳에 모인다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 다른 종의 고아를 구출한다.",
	},
	"Head of the Pack": {
		title: "무리의 우두머리",
		desc: "늑대들의 우두머리가 되었다.",
		difficulty: 2,
		series: "wolves",
		filter: ["All", "Special"],
		hint: "Hint: 우두머리가 된다.",
	},
	"Top of the Food Chain": {
		title: "먹이사슬의 정점",
		desc: "모두가 그 끔찍한 울부짖음을 두려워한다.",
		difficulty: 2,
		series: "wolves",
		filter: ["All", "Special"],
		hint: "Hint: 리더쉽을 증명한다.",
	},
	"Illicit Science": {
		title: "불법 과학",
		desc: "단지를 찾아냈다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 법을 준수하는 이들로부터 숨겨진 비밀이 있다.",
	},
	"Mouth Sealed Shut": {
		title: "입을 굳게 닫고",
		desc: "심문에서 살아남는다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 입 간수를 잘 한다.",
	},
	"Neck Deep": {
		title: "깊이 빠진",
		desc: "미약에 빠졌다가 살아남았다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 가장 음란한 물질을 견뎌낸다.",
	},
	Seedy: {
		title: "씨앗이 가득한",
		desc: "씨앗은 정말로 작지만, 당신에게선 숨지 못한다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 자연의 비밀을 수확한다.",
		softLockable: true,
	},
	"Pride of the Farm": {
		title: "농장의 자랑",
		desc: "누구보다 많이 생산했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 우월한 생산량.",
	},
	"Dawn to Dusk": {
		title: "새벽부터 황혼까지",
		desc: "하루종일 농장에서 일했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 정직한 농장 일꾼.",
	},
	"Runaway Cattle": {
		title: "도망친 가축",
		desc: "레미의 농장에서 탈출했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 그 어떤 우리도 당신을 가둬놓을 수 없다.",
		softLockable: true,
	},
	"Equine Rescue": {
		title: "말 구조대",
		desc: "말 친구들에게 구조되었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 밭에서 쓰러지지만, 그로 인한 결과를 피한다.",
	},
	"A Thunderous Response": {
		title: "천둥 같은 반응",
		desc: "중심가에서 소동을 일으켰다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 군중을 분열시킨다.",
	},
	"A Lewd Adventure": {
		title: "음란한 모험",
		desc: "발가벗고 도시 속을 모험했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 대담한 모험에 나선다.",
		softLockable: true,
	},
	"Sour Dealing": {
		title: "잘못된 거래",
		desc: "너무 깊이 들어간 패거리로부터 구출되었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 부도덕한 지인을 몇 만든다.",
		softLockable: true,
	},
	"Rear Passenger": {
		title: "뒷좌석 승객",
		desc: "엉덩이로 차를 거의 부술 뻔했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 교통 안전법을 위반한다.",
	},
	"Cornered Rogue": {
		title: "진퇴양난의 도둑",
		desc: "짓궂은 여우로부터 옷을 되찾았다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 짓궂은 도둑을 한 수 앞지른다.",
		softLockable: true,
	},
	"Pain Rider": {
		title: "탑승자의 고통",
		desc: "윈터의 삼각목마 시연을 완수한다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 삼각목마를 끝까지 탄다.",
		softLockable: true,
	},
	Submerged: {
		title: "잠수",
		desc: "윈터의 물고문 의자 시연을 완수한다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 끝까지 물에 잠긴다.",
		softLockable: true,
	},
	"Farm Protector": {
		title: "농장의 보호자",
		desc: "라이벌 농장에서 고용한 어깨들로부터 농장을 보호했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 침입자들은 한 대씩 걷어차일 것이다.",
		softLockable: true,
	},
	"A Knot to Remember": {
		title: "기억에 남을만한 혹",
		desc: "근처의 사람들과 함께 들판에서 개를 받아들였다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 가장 이상성욕적인 모습을 보인다.",
	},
	"Wrong Size": {
		title: "틀린 사이즈",
		desc: "남학생들과 여학생들의 옷을 바꿨다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 소문을 종식시킨다.",
	},
	"Idle Hands": {
		title: "놀고 있던 손",
		desc: "안마사로 일하면서 손님을 털었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 숙련된 손은 쓸모가 많다.",
	},
	"Stolen Technology": {
		title: "훔친 기술",
		desc: "창관의 섹스 기계를 수리했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 브라이어에겐 모두를 위한 무언가가 있다.",
		softLockable: true,
	},
	Spelunking: {
		title: "동굴탐험",
		desc: "해변 근처에 있는 오래된 밀수꾼의 동굴을 찾았다.",
		difficulty: 1,
		series: "beach cave",
		filter: ["All", "Discoveries"],
		hint: "Hint: 오래된 밀수꾼의 경로를 찾는다.",
		softLockable: true,
	},
	"X Marks the Spot": {
		title: "X표시 지점",
		desc: "밀수꾼의 동굴에서 보물지도를 찾았다.",
		difficulty: 2,
		series: "beach cave",
		filter: ["All", "Discoveries"],
		hint: "Hint: 숨겨진 깊은 곳.",
		softLockable: true,
	},
	"Buried Treasure": {
		title: "매장된 보물",
		desc: "보물지도를 따라서, 보물을 발견했다.",
		difficulty: 3,
		series: "beach cave",
		filter: ["All", "Discoveries"],
		hint: "Hint: 지도를 따라간다.",
		softLockable: true,
	},
	"Abnormal Mollusc": {
		title:"비정상적인 연체동물",
		desc: "거대한 민달팽이로부터 탈출했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 파도 아래에 숨는다.",
		softLockable: true,
	},
	Leverage: {
		title: "영향력",
		desc: "밀수꾼의 소굴에서 위협받았다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 악당에게서 저항한다.",
		softLockable: true,
	},
	Flurry: {
		title: "눈보라",
		desc: "눈덩이를 던지는 비행청소년으로부터 로빈을 지켰다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 눈싸움에서 이긴다.",
	},
	"Under the Ice": {
		title:"얼음 아래",
		desc: "얼어붙은 호수에서 탈출했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 부수고 탈출한다.",
		softLockable: true,
	},
	"A Festive Home": {
		title: "집에서 즐기는 행사",
		desc: "고아들에게 선물을 주었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 고아들에게 겨울의 환호를 가져다준다.",
	},
	"In Red Light": {
		title: "붉은 빛 속에서",
		desc: "야생 블러드 레몬을 수확했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 이상한 과일은 이상한 빛에서 자란다",
		softLockable: true,
	},
	"Oh Bother": {
		title: "다다익선",
		desc: "야생 벌집을 수확했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 달고 끈적하다.",
		softLockable: true,
	},
	"Employee Benefits": {
		title: "직원혜택",
		desc: "낮에 금을 발견하고, 밤에 가져갔다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 금을 찾고, 나중에 훔친다.",
		softLockable: true,
	},
	"Not Like the Movies": {
		title: "영화 같지 않아",
		desc: "유사에 대한 지식을 얻었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 가라앉은 황야의 지혜.",
		softLockable: true,
	},
	Slippery: {
		title: "약삭빠름",
		desc: "레미의 하수인들에게서 탈출했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 레미의 하수인들에게서 탈출한다.",
		softLockable: true,
	},
	"High Reflection": {
		title: "높은 반사율",
		desc: "거울을 성벽 폐허의 꼭대기에 돌려놓았다",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 눈이 부신 폐허에 있다.",
		softLockable: true,
	},
	Schism: {
		title: "종파 분립",
		desc: "물에 잠긴 역사를 목격했다.",
		difficulty: 3,
		series: "",
		hint: "Hint: 물에 쓸려간 역사를 목격한다.",
		filter: ["All", "Discoveries"],
		softLockable: true,
	},
	"Catch the Wind": {
		title: "바람 잡기",
		desc: "비행하는 법을 배웠다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 나는 법을 배운다.",
		softLockable: true,
	},
	"Trading Dignity": {
		title: "존엄성 거래",
		desc: "레미의 하수인들을 입으로 만족시켰다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 일방적인 거래를 한다.",
		softLockable: true,
	},
	"Playing with Fire": {
		title: "불장난",
		desc: "렌을 당신 앞에서 절정시켰다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 도박사의 요구를 견딘다.",
		softLockable: true,
	},
	Firestarter: {
		title: "방화범",
		desc: "렌이 불을 붙이도록 설득하였다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 파괴적인 경품을 딴다.",
		softLockable: true,
	},
	Dealing: {
		title: "거래",
		desc: "부도덕한 회사에 농작물을 팔았다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 알렉스의 이상한 농작물을 판다.",
		softLockable: true,
	},
	"To Watch the Fields": {
		title: "농작지 감시하기",
		desc: "농장에 경비원을 고용했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 도울 사람을 고용한다.",
		softLockable: true,
	},
	"Reliable Employer": {
		title: "믿을만한 고용주",
		desc: "S-랭크 경비원을 고용했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 경비원 한 사람의 잠재력을 끌어내도록 돕는다.",
		softLockable: true,
	},
	"Into the Sunset": {
		title: "노을 속으로",
		desc: "말 탄 레미의 하수인들에게서 도망쳤다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 말 탄 추적자들에게서 도망친다.",
		softLockable: true,
	},
	"Bent Copper": {
		title: "비리 경찰",
		desc: "부패한 뒷거래를 중지시켰다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 사회봉사 중에 경계를 게을리하지 않는다.",
		softLockable: true,
	},
	"Social Contract": {
		title: "사회 계약",
		desc: "사회봉사를 끝마쳤다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 사회에 진 빚을 갚는다.",
		softLockable: true,
	},
	Institutionalised: {
		title: "교화됨",
		desc: "형량을 마치고 감옥에서 풀려났다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 당신의 형량을 마친다.",
		softLockable: true,
	},
	Breaker: {
		title: "부수는 자",
		desc: "교도소의 전기충격 목걸이를 무력화했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 반항적으로 방해한다.",
		softLockable: true,
	},
	"Time and Pressure": {
		title: "시간과 압력",
		desc: "교도소 벽을 파들어갔다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 어떤 벽도 충분히 두껍지 않다.",
		softLockable: true,
	},
	"More than a Number": {
		title: "단순한 숫자가 아니다",
		desc: "교도소에서 다섯 명의 이름을 알게 됐다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 창살 뒤에서 친구를 사귄다.",
		softLockable: true,
	},
	"Friends in the Sky": {
		title: "하늘의 친구들",
		desc: "감시자들과 친구가 되었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 잃어버렸던 것을 되찾는다.",
		softLockable: true,
	},
	"Not Meant to be Caged": {
		title: "갇혀있을 운명이 아니다",
		desc: "교도소를 탈출하였다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 당신의 형량을 짧게 줄인다.",
		softLockable: true,
	},
	"Slip Through the Backdoor": {
		title: "뒷문으로 빠져나가다",
		desc: "베일리의 목록을 지우고 처벌을 피했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 깨끗이 지우고 처벌을 모면한다.",
	},
	"Life of the Party": {
		title: "파티의 스타 춤꾼",
		desc: "파티에서 댄스로 깊은 인상을 주었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 찰리의 친구들에게 깊은 인상을 준다.",
		softLockable: true,
	},
	"Belle of the Ball": {
		title: "무도회의 미녀",
		desc: "상류층 파티에서 댄스로 깊은 인상을 주었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 상류층에게 깊은 인상을 준다.",
		softLockable: true,
	},
	"Breaking the Stone": {
		title: "돌을 부숴라",
		desc: "다뉴브 저택 아래의 의식을 저지했다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 당신의 댄스 연줄로 의식에 접근해서 저지한다.",
		softLockable: true,
	},
	"Pound Alpha": {
		title: "보호소의 우두머리",
		desc: "개 보호소에서 존중심을 최고까지 올렸다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 그 개들에게 누가 대장인지를 보인다.",
		softLockable: true,
	},
	"Pound Runt": {
		title: "보호소의 최약자",
		desc: "개 보호소에서 존중심을 최저까지 낮췄다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 개들에게 항복한다.",
		softLockable: true,
	},
	"Pounded Pound": {
		title: "보호없는 보호소",
		desc: "베일리에게 개 보호소에서 일어나는 일을 알렸다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 개 보호소의 비리를 찾는다.",
		softLockable: true,
	},
	"Pound Liberator": {
		title: "보호소의 해방자",
		desc: "검은 개를 구했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 개 보호소의 특별한 죄수를 풀어준다.",
		softLockable: true,
	},
	"The Value of Pain": {
		title: "고통의 가치",
		desc: "악마로서 사냥하는 중 고아를 구했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 선행을 베푼다, 악마의 방법으로.",
		softLockable: true,
	},
	"Free Booze": {
		title: "공짜 술",
		desc: "젊은이들의 술을 전부 마셨고, 강간에 저항했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 황무지에서 술을 왕창 마신다.",
		softLockable: true,
	},
	"Bewitching Echoes": {
		title: "홀린 듯한 반응",
		desc: "부카케 쇼 중에 광란을 일으켰다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 악마의 쇼를 최상의 방법으로 망쳐놓는다.",
		softLockable: true,
	},
	"Dark Delvings": {
		title: "어둠의 탐구",
		desc: "흰색 크리스탈을 얻었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 고대 유적에 침입한다.",
		softLockable: true,
	},
	"Lurker Beyond": {
		title: "저 너머의 럴커",
		desc: "촉수의 숲에서 럴커를 물리쳤다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 다른 세계의 괴물을 물리친다.",
		softLockable: true,
	},
	"Down Below": {
		title: "저 아래",
		desc: "광산의 노예생활에서 탈출했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 오래된 업계에서 탈출한다.",
		softLockable: true,
	},
	"Bridging the Past": {
		title: "과거와의 연결",
		desc: "수로를 건너는 다리를 만들었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 다리를 복구한다.",
		softLockable: true,
	},
	"Safe Trail": {
		title: "안전한 오솔길",
		desc: "숲을 지나는 길을 복구했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 길을 복구한다.",
		softLockable: true,
	},
	"Field Work": {
		title: "현장 연구",
		desc: "호수에 고고학 연구 사무소를 만들었다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 윈터의 소원을 이룬다.",
		softLockable: true,
	},
	"Concrete Woodland": {
		title: "정돈된 삼림지",
		desc: "주거지의 잡목림을 복구했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 잡목림을 복구하라.",
		softLockable: true,
	},
	"School Green": {
		title: "학교 잔디밭",
		desc: "학교 잔디밭을 복구하라.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 잔디밭을 복구한다.",
		softLockable: true,
	},
	"Hookah Master": {
		title: "물담배 마스터",
		desc: "물담배 판매점을 물려받았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 물담배 연기 속을 뒤져본다.",
		softLockable: true,
	},
	"Sins of the Past": {
		title: "과거의 죄악",
		desc: "시장의 비밀을 발견했다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 시장의 컴퓨터에 접속한다.",
		softLockable: true,
	},
	"Panic Room": {
		title: "대피실",
		desc: "아파트의 보안 시스템에서 탈출했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 바브 가의 철저한 보안을 알아낸다.",
		softLockable: true,
	},
	"Lost World": {
		title: "잃어버린 세계",
		desc: "역사 속으로 사라진 섬을 발견했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 안개로 감싸인 섬이 기다린다.",
		softLockable: true,
	},
	"Prehistoric Landscape": {
		title: "선사시대 풍경",
		desc: "섬의 모든 지역을 발견했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 안개로 감싸인 섬을 탐험하라.",
		softLockable: true,
	},
	"Face of a Guardian": {
		title: "수호자의 얼굴",
		desc: "당신만의 섬사람 가면을 만들었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 미개척지 목공술을 연습한다.",
		softLockable: true,
	},
	"Wild Monarch": {
		title: "야생의 군주",
		desc: "왕좌를 만들었다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 허영심 가득한 미개척지 목공술을 연습한다.",
		softLockable: true,
	},
	Naturalised: {
		title: "귀화",
		desc: "잡히지 않고, 섬사람의 성에 잠입했다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 변장하고 외국의 요새에 들어간다.",
		softLockable: true,
	},
	"Gilded Spear": {
		title: "금빛 창",
		desc: "금빛 창을 회수했다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 섬의 근원에서, 기다리고 있다.",
		softLockable: true,
	},
	"Defy the Night": {
		title: "밤을 견디다",
		desc: "고통의 시련이 끝날 때 까지 견뎠다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 사원에서의 계급을 올린다.",
		softLockable: true,
	},
	"Withering Truth": {
		title: "희미해지는 진실",
		desc: "주교를 만났다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 고해를 통해, 계시를 받는다.",
		softLockable: true,
	},
	"Lost Heirloom": {
		title: "잃어버린 가보",
		desc: "금 나침반을 되찾았다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 해외에서 잃어버린 것이 있다.",
		softLockable: true,
	},
	"Backroom Deals": {
		title: "밀실 거래",
		desc: "고위급 인물들간의 게임을 목격했다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 도시의 상류층과 데이트를 한다.",
		softLockable: true,
	},
	"Max Those Shots": {
		title: "다다익선",
		desc: "정말 많은 수의 후추 스프레이를 갖고 있다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 최선의 방어는 공격이다.",
		softLockable: true,
	},
	"Opened Pandoras Box": {
		title: "열린 판도라의 상자",
		desc: "성인용품점이 다시 열리도록 도와줬다.",
		difficulty: 1,
		series: "Adult Shop",
		filter: ["All", "Discoveries"],
		hint: "Hint: 장난감 상자를 열 필요가 있을까?",
	},
	"Opened Pandoras Cocks": {
		title: "열린 판도라의 꼭지",
		desc: "당신이 없었으면 성인용품점은 존재하지 않았을 것이다.",
		difficulty: 3,
		series: "Adult Shop",
		filter: ["All", "Discoveries"],
		hint: "Hint: 장난감 상자를 그렇게 빨리 열 필요가 있었을까?",
	},
	"Brothel Provider": {
		title: "창관 공급자",
		desc: "성인용품을 팔기 위한 자동판매기를 설치하였다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "Hint: 장사를 할 수 있도록 브라이어를 설득한다.",
	},
	"Ear Slime Lover": {
		title: "귀 슬라임 성애자",
		desc: "당신의 최고의 친구다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 당신 귀에서의 속삭임.",
	},
	"Ear Slime Amalgam": {
		title: "귀 슬라임 혼합물",
		desc: "당신의 가장 친한 친구와 하나가 되었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 꽃피울 시간과 사랑을 준다.",
	},
	"The Path to Redemption": {
		title: "구원의 길",
		desc: "내면의 악마로부터 인간성을 되찾는다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 잃은 것을 되찾는다.",
		softLockable: true,
	},
	"A New Life": {
		title: "새로운 삶",
		desc: "혜택을 가지고 시작한다.",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 빠르게 시작한다.",
	},
	Negotiator: {
		title: "중재자",
		desc: "한 번의 팁으로 £500 이상을 벌었다.",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 잔뜩 벌어들인다.",
	},
	"Curious Attire": {
		title: "별난 옷",
		desc: "모든 특별한 옷들을 해금했다.",
		difficulty: 2,
		series: "",
		filter: ["All", "Special"],
		hint: "Hint: 모든 옷을 입을 수 있다.",
		softLockable: true,
	},
	"My Collection of Feats": {
		title: "나의 도전과제 컬렉션",
		desc: "너무 많아서 셀 수가 없다.",
		difficulty: 3,
		series: "collection",
		filter: ["All", "Special"],
		hint: "Hint: 무언가의 컬렉션.",
	},
	"My Timeless Collection of Feats": {
		title: "나의 영원한 도전과제 컬렉션",
		desc: "시간 그 자체보다 더 귀중한 도전과제들.",
		difficulty: 5,
		series: "collection",
		filter: ["All", "Special"],
		hint: "Hint: 시간과 노력.",
	},
};

async function featsMergePre() {
	// Replace getting the count with a better method that gets included with the sugarcube format
	T.saveDataImportCount = 0;
	const localStorageSaves = DoLSave.getSaves();

	const result = () => {
		if (!T.saveDataImportCount) {
			$("#featsBeginText").html(`0 saves detected, did you make a local save before trying this?`);
		} else if ((T.saveDataImportCount >= 10 && Browser.isMobile.any()) || T.saveDataImportCount >= 25) {
			$("#featsBeginText").html(`${T.saveDataImportCount} saves detected, this might take some time on a slower device.`);
		} else {
			$("#featsBeginText").html(`Only ${T.saveDataImportCount} saves detected, this shouldn't take too long.`);
		}
		$("#featsBeginLoadingText").addClass("hidden");
		$("#featsBeginButton").removeClass("hidden");
	};

	// Count the local storage saves
	if (localStorageSaves.autosave) T.saveDataImportCount++;
	if (localStorageSaves.slots) {
		localStorageSaves.slots.forEach(slot => {
			if (slot) T.saveDataImportCount++;
		});
	}

	// Count the index db saves
	try {
		// eslint-disable-next-line no-undef
		idb.getSaveDetails()
			.then(saveDataDetails => {
				T.saveDataImportCount += saveDataDetails.length;
			})
			.finally(() => {
				result();
			});
	} catch {
		result();
	}
}
DefineMacro("featsMergePre", featsMergePre);

function featsMerge() {
	if (window.featsMerge) return;
	window.featsMerge = true;

	const savesToLoad = T.saveDataImportCount;
	const loadingBar = $("#featsLoadingMeter .greenbar");
	const loadingText = $("#featsLoadingText");
	let featData = localStorage.getItem("dolFeats");
	if (featData) {
		featData = JSON.parse(featData);
	} else {
		featData = {};
	}

	const loadFeats = (data = {}) => {
		Object.entries(data).forEach(([key, date]) => {
			if (!featData[key] || new Date(date).getTime() < new Date(featData[key]).getTime()) {
				featData[key] = date;
			}
		});
	};

	const result = () => {
		let points = 0;
		Object.keys(featData).forEach(key => {
			if (setup.feats[key]) points += setup.feats[key].difficulty;
		});
		featData.points = points;

		V.feats.allSaves = featData;
		localStorage.setItem("dolFeats", JSON.stringify(featData));

		loadingBar.css("width", "100%");
		loadingText.html("All feat data imported.");
		$("#featsFinishButton").removeClass("hidden");

		delete window.featsMerge;
	};

	// Read the local storage saves
	let localSavesChecked = 0;
	const localStorageSaves = clone(DoLSave.getSaves());
	if (localStorageSaves) {
		if (localStorageSaves.autosave) {
			localStorageSaves.autosave.state.history = State.deltaDecode(localStorageSaves.autosave.state.delta);
			DoLSave.decompressIfNeeded(localStorageSaves.autosave);

			if (
				localStorageSaves.autosave.state.history &&
				localStorageSaves.autosave.state.history[0] &&
				localStorageSaves.autosave.state.history[0].variables
			) {
				const variables = localStorageSaves.autosave.state.history[0].variables;
				if (variables.feats) {
					loadFeats(variables.feats.allSaves);
					loadFeats(variables.feats.currentSave);
				}
			}
			localSavesChecked++;
			loadingBar.css("width", `${(localSavesChecked / savesToLoad) * 100}%`);
		}
		if (localStorageSaves.slots) {
			localStorageSaves.slots.forEach(slot => {
				if (slot) {
					slot.state.history = State.deltaDecode(slot.state.delta);
					DoLSave.decompressIfNeeded(slot);
					if (slot.state.history && slot.state.history[0] && slot.state.history[0].variables) {
						const variables = slot.state.history[0].variables;
						if (variables.feats) {
							loadFeats(variables.feats.allSaves);
							loadFeats(variables.feats.currentSave);
						}
					}
					localSavesChecked++;
					loadingBar.css("width", `${(localSavesChecked / savesToLoad) * 100}%`);
				}
			});
		}
	}

	// Read the index db saves
	try {
		// eslint-disable-next-line no-undef
		idb.getAllSaves()
			.then(saves =>
				saves.forEach((slot, index) => {
					if (slot.data && Array.isArray(slot.data.history)) {
						slot.data.history.forEach(saveData => {
							if (saveData.variables && saveData.variables.feats) {
								loadFeats(saveData.variables.feats.allSaves);
								loadFeats(saveData.variables.feats.currentSave);
							}
						});
					}
					loadingBar.css("width", `${((localSavesChecked + index + 1) / savesToLoad) * 100}%`);
					loadingText.html(`${index + 1} out of ${savesToLoad} saves checked.`);
				})
			)
			.finally(() => {
				result();
			});
	} catch {
		result();
	}
}
DefineMacro("featsMerge", featsMerge);

// eslint-disable-next-line no-unused-vars
function earnHourlyFeats() {
	if (V.feats.locked || V.cheatdisable === "f" || V.debug || V.gamemode === "soft" || V.alluremod < 1 || V.replayScene) return false;

	const fragment = document.createDocumentFragment();

	const earnFeat = featName => {
		if (!V.feats.currentSave[featName]) fragment.append(wikifier("earnFeat", `"${featName}"`));
	};

	// Feats that can only be earned after 50 days
	if (Time.days >= 50) {
		switch (V.player.gender) {
			case "m":
				earnFeat("Being a Boy");
				break;
			case "f":
				earnFeat("Being a Girl");
				break;
			case "h":
				earnFeat("Being a Hermaphrodite");
				break;
		}

		if (Time.days >= 150) earnFeat("Being an Orphan");

		if (!V.passoutstat) {
			earnFeat("Stressful Challenge");
			if (Time.days >= 150) earnFeat("Long Stressful Challenge");
		}
	}

	if (V.awareness >= 500) earnFeat("Most Aware");
	if (V.awareness <= -199) earnFeat("Most Innocent");
	if (V.promiscuity >= 100 && V.deviancy >= 100 && V.exhibitionism >= 100) earnFeat("No More Control");

	if (
		(!V.player.vaginaExist || V.vaginalskill >= 1000) &&
		(!V.player.penisExist || V.penileskill >= 1000) &&
		V.oralskill >= 1000 &&
		(V.analskill >= 1000 || V.analdisable === "t") &&
		V.handskill >= 1000 &&
		V.feetskill >= 1000 &&
		V.bottomskill >= 1000 &&
		V.thighskill >= 1000 &&
		V.chestskill >= 1000
	) {
		earnFeat("Sex Specialist");
	}

	if (V.submissive >= 2000) earnFeat("Perfect Sub");
	if (V.submissive <= 0) earnFeat("Defying the Odds");
	if (V.museumAntiques.museumCount === V.museumAntiques.maxCount) earnFeat("It Belongs in a Museum");

	// LI Romance
	const loveCount = (V.robinromance ? 1 : 0) + (V.whitneyromance ? 1 : 0) + (V.kylarenglish ? 1 : 0) + (V.sydneyromance ? 1 : 0);
	if (loveCount >= 3) earnFeat("Love Triangles");
	if (loveCount >= 4) earnFeat("Love Trapezoids");

	if (V.cat >= 6) earnFeat("Neko");
	if (V.wolfgirl >= 6) earnFeat("Wolf");
	if (V.angel >= 6) earnFeat("Angel");
	if (V.fallenangel >= 2) earnFeat("Fallen Angel");
	if (V.demon >= 6) earnFeat("Demon");
	if (V.cow >= 6) earnFeat("Cattle");
	if (V.harpy >= 6) earnFeat("Harpy");
	if (V.fox >= 6) earnFeat("Fox");

	const specialTraits =
		(V.orgasmtrait >= 1 ? 1 : 0) +
		(V.ejactrait >= 1 ? 1 : 0) +
		(V.molesttrait >= 1 ? 1 : 0) +
		(V.rapetrait >= 1 ? 1 : 0) +
		(V.bestialitytrait >= 1 ? 1 : 0) +
		(V.tentacletrait >= 1 ? 1 : 0) +
		(V.voretrait >= 1 ? 1 : 0) +
		(V.milkdranktrait >= 1 ? 1 : 0) +
		(V.choketrait >= 1 ? 1 : 0);
	if (specialTraits >= 1) earnFeat("A Special Trait");
	if (specialTraits >= 9) earnFeat("A Special Trait Collector");

	if (V.sexStats.anus.pregnancy.motherStatus >= 2 || V.sexStats.vagina.pregnancy.motherStatus >= 2) earnFeat("Broodmother Host");
	if (
		V.pregnancyStats.parasiteTypesSeen &&
		V.pregnancyStats.parasiteTypesSeen.length >= 14 &&
		V.pregnancyStats.parasiteVariantsSeen.length >= 2 &&
		V.pregnancyStats.parasiteBook === 3
	) {
		// typesSeen: fish, snake, slime, spider, maggot, worm, eel, wasp, bee, lurker, squid, slug, tentacle, vine
		// variantsSeen: pale, metal
		earnFeat("Broodmother Zoologist");
	}

	if (V.spraymax >= 7) earnFeat("Max Those Shots");
	if ((V.semen_volume >= 2000 && V.semen_amount >= V.semen_volume) || (V.milk_volume >= 2000 && V.milk_amount >= V.milk_volume)) earnFeat("Feeling Full");
	if (V.cool >= 400) earnFeat("Social Butterfly");
	if (V.cool <= 2 && !V.backgroundTraits.includes("nerd")) earnFeat("Anti-Social Moth");
	if (V.delinquency <= 0) earnFeat("Teachers Pet");
	if (V.delinquency >= 1000) earnFeat("Teachers Nightmare");

	if (
		V.skin.forehead.writing &&
		V.skin.left_cheek.writing &&
		V.skin.right_cheek.writing &&
		V.skin.left_shoulder.writing &&
		V.skin.right_shoulder.writing &&
		V.skin.breasts.writing &&
		V.skin.back.writing &&
		V.skin.pubic.writing &&
		V.skin.left_thigh.writing &&
		V.skin.right_thigh.writing
	) {
		earnFeat("A Living Canvas");
	}

	if (V.produce_sold >= 100) earnFeat("Hawker");
	if (V.produce_sold >= 1000) earnFeat("Vendor");
	if (V.produce_sold >= 5000) earnFeat("Merchant");
	if (V.plants_known.length >= 17) earnFeat("Seedy");
	if (V.daily.ex.road === 1 && V.daily.ex.cream === 1 && V.daily.ex.flyover === 1) earnFeat("A Lewd Adventure");
	if (V.athletics >= 1000) earnFeat("Swift");

	if (V.farm_stage >= 2 && V.farm.beasts.horses >= 20 && V.farm.beasts.cattle >= 20 && V.farm.beasts.dogs >= 20 && V.farm.beasts.pigs >= 20) {
		earnFeat("Animal Tender");
	}

	if (V.masochism_level >= 4 && V.sadism_level >= 4) earnFeat("Sadomasochist");
	if (V.masochism_level >= 4) earnFeat("Twisted Desire");
	if (V.sadism_level >= 4) earnFeat("Served Hot");

	// V.fame.pimp has been excluded, should be added back in if enabled
	if (
		V.fame.sex <= 29 &&
		V.fame.prostitution <= 29 &&
		V.fame.rape <= 29 &&
		V.fame.bestiality <= 29 &&
		V.fame.exhibitionism <= 29 &&
		V.fame.pregnancy <= 29 &&
		V.fame.impreg <= 29 &&
		V.fame.scrap >= 1000 &&
		V.fame.good >= 1000 &&
		V.fame.business >= 1000 &&
		V.fame.social >= 1000 &&
		V.fame.model >= 1000
	) {
		earnFeat("Shining Reputation");
	}

	if (
		Object.values(V.children).reduce((prev, curr) => {
			if (curr.mother === "pc") prev.pushUnique(curr.type);
			return prev;
		}, []).length >= Object.keys(pregnancyGenerator).filter(type => setup.pregnancy.typesEnabled.includes(type)).length
	) {
		earnFeat("Diversity of Life");
	}

	if (V.money >= 100000) earnFeat("Pocket Change");
	if (V.money >= 1000000) earnFeat("Money Maker");
	if (V.money >= 10000000) earnFeat("Tycoon");
	if (V.money >= 100000000) earnFeat("Millionaire");

	if (
		V.liquidoutsidecount >= 100 &&
		(V.analdisable === "t" || setup.bodyliquid.combined("anus") >= 5) &&
		(!V.player.vaginaExist || setup.bodyliquid.combined("vagina") >= 5) &&
		setup.bodyliquid.combined("mouth") >= 5
	) {
		earnFeat("Fully Covered");
	}

	if (V.skulduggery >= 1000) earnFeat("Thief");
	if (V.danceskill >= 1000) earnFeat("May I have this Dance?");
	if (V.swimmingskill >= 1000) earnFeat("Aquanaut");
	if (V.seductionskill >= 1000) earnFeat("Seductress");
	if (V.tending >= 1000) earnFeat("Green Fingered");
	if (V.housekeeping >= 1000) earnFeat("Majordomo");
	if (V.baseAllure >= 7000 && V.outside === 1 && !Time.isBloodMoon()) earnFeat("Alluring");
	if (V.science >= 1000 && V.maths >= 1000 && V.english >= 1000 && V.history >= 1000) earnFeat("Perfect Record");
	if (V.earSlime.corruption >= 100) earnFeat("Ear Slime Lover");
	if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 200) earnFeat("Ear Slime Amalgam");

	// To earn the feat "Curious Attire"
	fragment.append(wikifier("specialClothesUpdate"));

	// Should be last
	let currentMax = 0;
	for (let i = 0; i < Object.keys(setup.feats).length; i++) {
		currentMax += setup.feats[Object.keys(setup.feats)[i]].difficulty;
	}
	if (V.feats.allSaves.points >= Math.floor(currentMax * 0.5)) earnFeat("My Collection of Feats");
	if (V.feats.allSaves.points >= Math.floor(currentMax * 0.95)) earnFeat("My Timeless Collection of Feats");

	return fragment;
}
