function trinit_namedNPC()
{
    if (!setup.trNamedNPCList)
	{
		/* 주의: name, title 전부 소문자로 */
        setup.trNamedNPCList = [
            {
                name:"pc",
                title:"player",
                koname:"플레이어",
                kotitle:"플레이어",
                post:1,
                titlepost:1
            },

            {
                name:"avery",
                title:["businessperson","businessman","businesswoman"],
                koname:"에이버리",
                kotitle:["비즈니스맨","비즈니스맨","비즈니스우먼"],
                post:1,
                titlepost:[0,0,0]
            },
            
            {
                name:"bailey",
                title:"caretaker",
                koname:"베일리",
                kotitle:"관리인",
                post:1,
                titlepost:0
            },
            
            {
                name:"briar",
                title:"brothel owner",
                koname:"브라이어",
                kotitle:"창관 주인",
                post:1,
                titlepost:0
            },
            
            {
                name:"charlie",
                title:"dance coach",
                koname:"찰리",
                kotitle:"춤 선생님",
                post:1,
                titlepost:0
            },

            {
                name:"darryl",
                title:"club owner",
                koname:"데릴",
                kotitle:"클럽 주인",
                post:2,
                titlepost:0
            },
            
            {
                name:"doren",
                title:"english teacher",
                koname:"도렌",
                kotitle:"영어 교사",
                post:0,
                titlepost:1
            },
            
            {
                name:"eden",
                title:["hunter","huntress"],
                koname:"에덴",
                kotitle:["사냥꾼","여사냥꾼"],
                post:0,
                titlepost:[0,0]
            },
            
            {
                name:"gwylan",
                title:"shopkeeper",
                koname:"그윌란",
                kotitle:"상점 주인",
                post:0,
                titlepost:0
            },
            
            {
                name:"harper",
                title:"doctor",
                koname:"하퍼",
                kotitle:"의사",
                post:1,
                titlepost:1
            },
            
            {
                name:"jordan",
                title:["pious","priest","priestess"],
                koname:"조던",
                kotitle:["성직자","사제","여사제"],
                post:0,
                titlepost:[1,1,1]
            },
            
            {
                name:"kylar",
                title:"loner",
                koname:"카일라",
                kotitle:"외톨이",
                post:1,
                titlepost:0
            },
            
            {
                name:"landry",
                title:"criminal",
                koname:"랜드리",
                kotitle:"범죄자",
                post:1,
                titlepost:1
            },
            
            {
                name:"leighton",
                title:["headteacher","headmaster","headmistress"],
                koname:"레이턴",
                kotitle:["교장","교장","여교장"],
                post:0,
                titlepost:[0,0,0]
            },
            
            {
                name:"mason",
                title:"swimming teacher",
                koname:"메이슨",
                kotitle:"수영 교사",
                post:0,
                titlepost:1
            },
            
            {
                name:"morgan",
                title:"sewer dweller",
                koname:"모건",
                kotitle:"하수관 거주자",
                post:0,
                titlepost:1
            },
            
            {
                name:"river",
                title:"maths teacher",
                koname:"리버",
                kotitle:"수학 교사",
                post:1,
                titlepost:1
            },
            
            {
                name:"robin",
                title:"orphan",
                koname:"로빈",
                kotitle:"고아",
                post:0,
                titlepost:1
            },
            
            {
                name:"sam",
                title:"cafe owner",
                koname:"샘",
                kotitle:"카페 주인",
                post:0,
                titlepost:0
            },
            
            {
                name:"sirris",
                title:"science teacher",
                koname:"시리스",
                kotitle:"과학 교사",
                post:1,
                titlepost:1
            },
            
            {
                name:"whitney",
                title:"bully",
                koname:"휘트니",
                kotitle:"일진",
                post:1,
                titlepost:0
            },
            
            {
                name:"winter",
                title:"history teacher",
                koname:"윈터",
                kotitle:"역사 교사",
                post:1,
                titlepost:1
            },
            
            {
                name:"black wolf",
                title:"alpha",
                koname:"검은 늑대",
                kotitle:"우두머리",
                post:1,
                titlepost:1
            },
            
            {
                name:"niki",
                title:"photographer",
                koname:"니키",
                kotitle:"사진사",
                post:1,
                titlepost:1
            },
            
            {
                name:"quinn",
                title:"mayor",
                koname:"퀸",
                kotitle:"시장",
                post:0,
                titlepost:0
            },
            
            {
                name:"remy",
                title:"farmer",
                koname:"레미",
                kotitle:"농부",
                post:1,
                titlepost:1
            },
            
            {
                name:"alex",
                title:"farmhand",
                koname:"알렉스",
                kotitle:"농장 일꾼",
                post:1,
                titlepost:0
            },
			
            {
                name:"great hawk",
                title:"terror",
                koname:"거대 매",
                kotitle:"두려운 존재",
                post:1,
                titlepost:1
            },

            {
                name:"wren",
                title:"smuggler",
                koname:"렌",
                kotitle:"밀수업자",
                post:0,
                titlepost:1
            },

            {
                name:"sydney",
                title:["faithful", "fallen"],
                koname:"시드니",
                kotitle:["신실한 신자", "타락한 신자"],
                post:1,
                titlepost:[1,1]
            },

            {
                name:"ivory wraith",
                title:["pale figure", "pretender", "writhing", "profane", "vain", "forlorn", "reflection"],
                koname:"상아 유령",
                kotitle:["창백한 형체", "요구자", "비틀린 자", "이단자", "자만한 자", "절망한 자", "반영"],
                post:0,
                titlepost:[1,1,1,1,1,1,0]
            },

            {
                name:"zephyr",
                title:["pirate", "captain"],
                koname:"제퍼",
                kotitle:["해적", "선장"],
                post:1,
                titlepost:[0,0]
            },
			
			/* EnglishPlayRoles */
            {
                name:"cass",
                title:"---",
                koname:"캐스",
                kotitle:"---",
                post:1,
                titlepost:1
            },
			
            {
                name:"taylor",
                title:"---",
                koname:"테일러",
                kotitle:"---",
                post:1,
                titlepost:1
            },
			
            {
                name:"sterling",
                title:"---",
                koname:"스털링",
                kotitle:"---",
                post:0,
                titlepost:1
            },
			
			/* Books */
            {
                name:"raul",
                title:"---",
                koname:"라울",
                kotitle:"---",
                post:0,
                titlepost:1
            },

            {
                name:"mr pinch",
                title:"---",
                koname:"핀치 씨",
                kotitle:"---",
                post:1,
                titlepost:1
            },
			
            {
                name:"ms pinch",
                title:"---",
                koname:"핀치 양",
                kotitle:"---",
                post:0,
                titlepost:1
            },

            {
                name:"lew",
                title:"---",
                koname:"루",
                kotitle:"---",
                post:1,
                titlepost:1
            },
			
			/* Todo: 다음은 npcCompressor.js에서 motherFatherList 에 있기에 일단 넣어둠. 나중에 필요없게 되면 삭제할것 */
            {
                name:"unknown",
                title:"---",
                koname:"알려지지 않음",
                kotitle:"---",
                post:0,
                titlepost:1
            },
			
            {
                name:"cum bucket",
                title:"---",
                koname:"정액 양동이",
                kotitle:"---",
                post:1,
                titlepost:1
            },
			
            {
                name:"harper's serum",
                title:"---",
                koname:"하퍼의 혈청",
                kotitle:"---",
                post:0,
                titlepost:1
            },
			
			/* Todo: 다음은 portalPanties.twee에서 있기에 일단 넣어둠. 나중에 필요없게 되면 삭제할것 */
            {
                name:"portal",
                title:"---",
                koname:"포탈",
                kotitle:"---",
                post:2,
                titlepost:1
            },
        ];
		let trNameIndex = {};
		let trTitleIndex = {};
		let temp = {};
		for(const entry of setup.trNamedNPCList)
		{
			temp.koname = entry.koname;
			temp.post = entry.post;
			trNameIndex[entry.name] = clone(temp);
			if (Array.isArray(entry.title))
			{
				let length = entry.title.length;
				for (let j = 0; j < length; j++)
				{
					temp.koname = entry.kotitle[j];
					temp.post = entry.titlepost[j];
					trTitleIndex[entry.title[j]] = clone(temp);
				}
			}
			else
			{
					temp.koname = entry.kotitle;
					temp.post = entry.titlepost;
					trTitleIndex[entry.title] = clone(temp);
			}
		}
		setup.trNamedNPCList.nameIndex = trNameIndex;
		setup.trNamedNPCList.titleIndex = trTitleIndex;
    }
}
window.trinit_namedNPC = trinit_namedNPC;

function trinit_NPCname()
{
	if (!setup.trNPCnameList)
	{
		setup.trNPCnameList = {
			/* normal name */
			"Olivia": {koname: "올리비아", post: 1},
			"Amelia": {koname: "아멜리아", post: 1},
			"Isla": {koname: "이슬라", post: 1},
			"Ava": {koname: "아바", post: 1},
			"Mia": {koname: "미아", post: 1},
			"Grace": {koname: "그레이스", post: 1},
			"Freya": {koname: "프레이아", post: 1},
			"Lily": {koname: "릴리", post: 1},
			"Sophia": {koname: "소피아", post: 1},
			"Ivy": {koname: "아이비", post: 1},
			"Jessica": {koname: "제시카", post: 1},
			"Ashley": {koname: "애슐리", post: 1},
			"Emily": {koname: "에밀리", post: 1},
			"Sarah": {koname: "새라", post: 1},
			"Samantha": {koname: "사만다", post: 1},
			"Amanda": {koname: "아만다", post: 1},
			"Brittany": {koname: "브리타니", post: 1},
			"Elizabeth": {koname: "엘리자베스", post: 1},
			"Taylor": {koname: "테일러", post: 1},
			"Megan": {koname: "메간", post: 0},
			"Laura": {koname: "로라", post: 1},
			"Gemma": {koname: "겜마", post: 1},
			"Emma": {koname: "엠마", post: 1},
			"Rebecca": {koname: "레베카", post: 1},
			"Claire": {koname: "클레어", post: 1},
			"Victoria": {koname: "빅토리아", post: 1},
			"Rachel": {koname: "레이첼", post: 2},
			"Amy": {koname: "에이미", post: 1},
			"Jennifer": {koname: "제니퍼", post: 1},
			"Nicola": {koname: "니콜라", post: 1},
			"Katie": {koname: "케이티", post: 1},
			"Lisa": {koname: "리사", post: 1},
			"Julie": {koname: "줄리", post: 1},
			"Melissa": {koname: "멜리사", post: 1},
			"Michelle": {koname: "미셸", post: 2},
			"Kim": {koname: "킴", post: 0},
			"Angela": {koname: "안젤라", post: 1},
			"Heather": {koname: "헤더", post: 1},
			"Stephanie": {koname: "스테파니", post: 1},
			"Nicole": {koname: "니콜", post: 2},
			"Christina": {koname: "크리스티나", post: 1},
			"Susan": {koname: "수잔", post: 0},
			"Karen": {koname: "카렌", post: 0},
			"Jacqueline": {koname: "재컬린", post: 0},
			"Deborah": {koname: "데보라", post: 1},
			"Tracey": {koname: "트레이시", post: 1},
			"Jane": {koname: "제인", post: 0},
			"Helen": {koname: "헬렌", post: 0},
			"Diane": {koname: "다이앤", post: 0},
			"Sharon": {koname: "샤론", post: 0},

			"Oliver": {koname: "올리버", post: 1},
			"Noah": {koname: "노아", post: 1},
			"George": {koname: "조지", post: 1},
			"Arthur": {koname: "아더", post: 1},
			"Freddie": {koname: "프레디", post: 1},
			"Leo": {koname: "레오", post: 1},
			"Theo": {koname: "테오", post: 1},
			"Oscar": {koname: "오스카", post: 1},
			"Charlie": {koname: "찰리", post: 1},
			"Harry": {koname: "해리", post: 1},
			"Michael": {koname: "마이클", post: 2},
			"Christopher": {koname: "크리스토퍼", post: 1},
			"Matthew": {koname: "매튜", post: 1},
			"Joshua": {koname: "조슈아", post: 1},
			"Jacob": {koname: "제이콥", post: 0},
			"Nicholas": {koname: "니콜라스", post: 1},
			"Andrew": {koname: "앤드류", post: 1},
			"Daniel": {koname: "대니얼", post: 2},
			"Tyler": {koname: "타일러", post: 1},
			"Joseph": {koname: "조셉", post: 0},
			"James": {koname: "제임스", post: 1},
			"David": {koname: "데이빗", post: 0},
			"Robert": {koname: "로버트", post: 1},
			"Jack": {koname: "잭", post: 0},
			"Richard": {koname: "리차드", post: 1},
			"Paul": {koname: "폴", post: 2},
			"Mark": {koname: "마크", post: 1},
			"Thomas": {koname: "토마스", post: 1},
			"Adam": {koname: "아담", post: 0},
			"Jason": {koname: "제이슨", post: 0},
			"Connor": {koname: "코너", post: 1},
			"Jake": {koname: "제이크", post: 1},
			"John": {koname: "존", post: 0},
			"Brian": {koname: "브라이언", post: 0},
			"William": {koname: "윌리엄", post: 0},
			"Ben": {koname: "벤", post: 0},
			"Kevin": {koname: "케빈", post: 0},
			"Eric": {koname: "에릭", post: 0},
			"Jeffrey": {koname: "제프리", post: 1},
			"Jamie": {koname: "제이미", post: 1},
			"Louis": {koname: "루이스", post: 1},
			"Ryan": {koname: "라이언", post: 0},
			"Joe": {koname: "조", post: 1},
			"Stephen": {koname: "스테판", post: 0},
			"Ian": {koname: "이안", post: 0},
			"Austin": {koname: "오스틴", post: 0},
			"Kyle": {koname: "카일", post: 2},
			"Zach": {koname: "자크", post: 1},
			"Patrick": {koname: "패트릭", post: 0},
			
			/* babies */
			"Addison": {koname: "애디슨", post: 0},
			"Algernon": {koname: "앨거논", post: 0},
			"Allan": {koname: "앨런", post: 0},
			"Alpha": {koname: "알파", post: 1},
			"Anton": {koname: "안톤", post: 0},
			"Axel": {koname: "액셀", post: 2},
			"Bazza": {koname: "바자", post: 1},
			"Benton": {koname: "벤튼", post: 0},
			"Bernard": {koname: "버나드", post: 1},
			"Brand": {koname: "브랜드", post: 1},
			"Brett": {koname: "브렛", post: 0},
			"Cale": {koname: "케일", post: 2},
			"Calvin": {koname: "캘빈", post: 0},
			"Carol": {koname: "캐롤", post: 2},
			"Chuck": {koname: "척", post: 0},
			"Chucky": {koname: "처키", post: 1},
			"Clay": {koname: "클레이", post: 1},
			"Cornelius": {koname: "코넬리우스", post: 1},
			"Crofton": {koname: "크로프톤", post: 0},
			"Darden": {koname: "다든", post: 0},
			"Dax": {koname: "닥스", post: 1},
			"Den": {koname: "덴", post: 0},
			"Deven": {koname: "데벤", post: 0},
			"Digby": {koname: "딕비", post: 1},
			"Don": {koname: "던", post: 0},
			"Douglas": {koname: "더글라스", post: 1},
			"Driscoll": {koname: "드리스콜", post: 2},
			"Duane": {koname: "듀안", post: 0},
			"Duke": {koname: "듀크", post: 1},
			"Edmund": {koname: "에드문드", post: 1},
			"Elsdon": {koname: "엘스돈", post: 0},
			"Freeman": {koname: "프리먼", post: 0},
			"Gabby": {koname: "개비", post: 1},
			"Garland": {koname: "갈란드", post: 1},
			"George": {koname: "조지", post: 1},
			"Godfrey": {koname: "고드프리", post: 1},
			"Graeme": {koname: "그래미", post: 1},
			"Grier": {koname: "그라이어", post: 1},
			"Hammond": {koname: "해먼드", post: 1},
			"Harlan": {koname: "하란", post: 0},
			"Hendrix": {koname: "헨드릭스", post: 1},
			"Herman": {koname: "허먼", post: 0},
			"Hewie": {koname: "휴이", post: 1},
			"Hugh": {koname: "휴", post: 1},
			"Indiana": {koname: "인디아나", post: 1},
			"Ingram": {koname: "잉그램", post: 0},
			"Jackie": {koname: "재키", post: 1},
			"Jasper": {koname: "재스퍼", post: 1},
			"Jaxon": {koname: "잭손", post: 0},
			"Jaycob": {koname: "제이콥", post: 0},
			"Jere": {koname: "제르", post: 1},
			"Kamden": {koname: "캄덴", post: 0},
			"Kelcey": {koname: "켈시", post: 1},
			"Kendall": {koname: "켄달", post: 2},
			"Kevin": {koname: "케빈", post: 0},
			"Kian": {koname: "키안", post: 0},
			"Kieran": {koname: "키에란", post: 0},
			"Kirby": {koname: "커비", post: 1},
			"Lanny": {koname: "래니", post: 1},
			"Lawson": {koname: "로손", post: 0},
			"Laz": {koname: "라즈", post: 1},
			"Leland": {koname: "렐렌드", post: 1},
			"Levi": {koname: "레비", post: 1},
			"Lindon": {koname: "린든", post: 0},
			"Linton": {koname: "린튼", post: 0},
			"Lionel": {koname: "라이오넬", post: 2},
			"Lonny": {koname: "로니", post: 1},
			"Lucas": {koname: "루카스", post: 1},
			"Manley": {koname: "맨리", post: 1},
			"Maverick": {koname: "매버릭", post: 0},
			"Merlyn": {koname: "메를린", post: 0},
			"Michael": {koname: "마이클", post: 2},
			"Monty": {koname: "몬티", post: 1},
			"Murphy": {koname: "머피", post: 1},
			"Nate": {koname: "네이트", post: 1},
			"Ned": {koname: "네드", post: 1},
			"Nowell": {koname: "노웰", post: 2},
			"Odell": {koname: "오델", post: 2},
			"Ollie": {koname: "올리", post: 1},
			"Osbert": {koname: "오스버트", post: 1},
			"Otto": {koname: "오토", post: 1},
			"Paget": {koname: "파젯", post: 0},
			"Pip": {koname: "핍", post: 0},
			"Quintin": {koname: "퀸틴", post: 0},
			"Raymund": {koname: "레이먼드", post: 1},
			"Ricky": {koname: "릭키", post: 1},
			"Ross": {koname: "로스", post: 1},
			"Rudolph": {koname: "루돌프", post: 1},
			"Sammy": {koname: "새미", post: 1},
			"Scotty": {koname: "스코티", post: 1},
			"Stacey": {koname: "스테이시", post: 1},
			"Thad": {koname: "사드", post: 1},
			"Theodore": {koname: "시오도어", post: 1},
			"Tommy": {koname: "토미", post: 1},
			"Trey": {koname: "트레이", post: 1},
			"Tyson": {koname: "타이슨", post: 0},
			"Val": {koname: "발", post: 2},
			"Vernon": {koname: "버논", post: 0},
			"Willis": {koname: "윌리스", post: 1},
			"Wilmer": {koname: "윌머", post: 1},
			"Winton": {koname: "윈톤", post: 0},
			"Wisdom": {koname: "위즈덤", post: 0},
			
			"Adelyn": {koname: "애들린", post: 0},
			"Alene": {koname: "알린", post: 0},
			"Alexa": {koname: "알렉사", post: 1},
			"Aliah": {koname: "알리아", post: 1},
			"Alyson": {koname: "알리슨", post: 0},
			"Angelica": {koname: "안젤리카", post: 1},
			"Annalise": {koname: "애널리제", post: 1},
			"Annora": {koname: "애노라", post: 1},
			"Azaria": {koname: "아자리아", post: 1},
			"Bessie": {koname: "베시", post: 1},
			"Betsy": {koname: "벳시", post: 1},
			"Bettie": {koname: "베티", post: 1},
			"Biddy": {koname: "비디", post: 1},
			"Brianne": {koname: "브리안", post: 0},
			"Camellia": {koname: "카멜리나", post: 1},
			"Camille": {koname: "카밀", post: 2},
			"Camryn": {koname: "캠린", post: 0},
			"Caroline": {koname: "캐롤린", post: 0},
			"Chastity": {koname: "채시티", post: 1},
			"Chelsea": {koname: "첼시", post: 1},
			"Chelsey": {koname: "첼세이", post: 1},
			"Cindy": {koname: "신디", post: 1},
			"Clematis": {koname: "클레마티스", post: 1},
			"Darla": {koname: "달라", post: 1},
			"Deb": {koname: "뎁", post: 0},
			"Debby": {koname: "데비", post: 1},
			"Dortha": {koname: "도르사", post: 1},
			"Eleanora": {koname: "엘라노라", post: 1},
			"Eliana": {koname: "엘리아나", post: 1},
			"Elyse": {koname: "엘리제", post: 1},
			"Emerson": {koname: "에머슨", post: 0},
			"Emmeline": {koname: "에멜린", post: 0},
			"Erica": {koname: "에리카", post: 1},
			"Ettie": {koname: "에티", post: 1},
			"Eustacia": {koname: "유스타시아", post: 1},
			"Evelyn": {koname: "이블린", post: 0},
			"Gabrielle": {koname: "가브리엘", post: 2},
			"Georgiana": {koname: "조지아나", post: 1},
			"Harper": {koname: "하퍼", post: 1},
			"Harrietta": {koname: "해리에타", post: 1},
			"Haylie": {koname: "헤일리", post: 1},
			"Haze": {koname: "헤이즈", post: 1},
			"Hunter": {koname: "헌터", post: 1},
			"Hyacinth": {koname: "히아신스", post: 1},
			"Indie": {koname: "인디", post: 1},
			"Jacquetta": {koname: "재키타", post: 1},
			"Janie": {koname: "재니", post: 1},
			"Jannine": {koname: "재닌", post: 0},
			"Jonquil": {koname: "조퀼", post: 2},
			"Kaelyn": {koname: "케일린", post: 0},
			"Kam": {koname: "캄", post: 0},
			"Khloe": {koname: "클로에", post: 1},
			"Kolleen": {koname: "콜린", post: 0},
			"Korrine": {koname: "코린", post: 0},
			"Kourtney": {koname: "코트니", post: 1},
			"Krystine": {koname: "크리스틴", post: 0},
			"Lavena": {koname: "라베나", post: 1},
			"Leeann": {koname: "리앤", post: 0},
			"Lela": {koname: "레일라", post: 1},
			"Lesleigh": {koname: "레슬레이", post: 1},
			"Lindsie": {koname: "린지", post: 1},
			"Lorena": {koname: "로레나", post: 1},
			"Lucile": {koname: "루실", post: 2},
			"Luvinia": {koname: "루비니아", post: 1},
			"Lyn": {koname: "린", post: 0},
			"Lyssa": {koname: "리사", post: 1},
			"Madeleine": {koname: "매들린", post: 0},
			"Marian": {koname: "마리안", post: 0},
			"Maudie": {koname: "마우디", post: 1},
			"Maureen": {koname: "마우린", post: 0},
			"Maxine": {koname: "맥신", post: 0},
			"Melody": {koname: "멜로디", post: 1},
			"Milani": {koname: "밀라니", post: 1},
			"Misti": {koname: "미스티", post: 1},
			"Nat": {koname: "내트", post: 1},
			"Noelle": {koname: "노엘", post: 2},
			"Ottoline": {koname: "오토린", post: 0},
			"Paige": {koname: "페이지", post: 1},
			"Pauline": {koname: "폴린", post: 0},
			"Payton": {koname: "페이튼", post: 0},
			"Pearl": {koname: "펄", post: 2},
			"Perlie": {koname: "펄리", post: 1},
			"Petronel": {koname: "페트로넬", post: 2},
			"Phebe": {koname: "페베", post: 1},
			"Posie": {koname: "포지", post: 1},
			"Praise": {koname: "프레이즈", post: 1},
			"Rexana": {koname: "렉사나", post: 1},
			"Serena": {koname: "세레나", post: 1},
			"Sharalyn": {koname: "샤라린", post: 0},
			"Sharla": {koname: "샬라", post: 1},
			"Shauna": {koname: "샤우나", post: 1},
			"Sky": {koname: "스카이", post: 1},
			"Sybella": {koname: "사이벨라", post: 1},
			"Tracy": {koname: "트레이시", post: 1},
			"Tresha": {koname: "트레샤", post: 1},
			"Trudi": {koname: "트루디", post: 1},
			"Wallis": {koname: "왈리스", post: 1},
			"Wilda": {koname: "윌다", post: 1},
			"Wren": {koname: "렌", post: 0},
			"Yvette": {koname: "이베트", post: 1},
			
			"Aaren": {koname: "아렌", post: 0},
			"Alex": {koname: "알렉스", post: 1},
			"Andie": {koname: "앤디", post: 1},
			"Arden": {koname: "아르덴", post: 0},
			"Ariel": {koname: "에리엘", post: 2},
			"Artie": {koname: "아티", post: 1},
			"Ashton": {koname: "애쉬톤", post: 0},
			"Aston": {koname: "애스톤", post: 0},
			"Aubrey": {koname: "오브레이", post: 1},
			"Beau": {koname: "비유", post: 1},
			"Bernie": {koname: "버니", post: 1},
			"Bertie": {koname: "버티", post: 1},
			"Beverly": {koname: "베벌리", post: 1},
			"Bobbie": {koname: "보비", post: 1},
			"Brooklyn": {koname: "브루클린", post: 0},
			"Caelan": {koname: "켈란", post: 0},
			"Cameron": {koname: "캐머론", post: 0},
			"Carol": {koname: "캐롤", post: 2},
			"Cary": {koname: "캐리", post: 1},
			"Casey": {koname: "캐세이", post: 1},
			"Channing": {koname: "채닝", post: 0},
			"Charley": {koname: "찰리", post: 1},
			"Cherokee": {koname: "체로키", post: 1},
			"Cheyenne": {koname: "시엔", post: 0},
			"Coby": {koname: "코비", post: 1},
			"Codie": {koname: "코디", post: 1},
			"Collyn": {koname: "콜린", post: 0},
			"Cyan": {koname: "시안", post: 0},
			"Dale": {koname: "데일", post: 2},
			"Dallas": {koname: "달라스", post: 1},
			"Dana": {koname: "다나", post: 1},
			"Darby": {koname: "다르비", post: 1},
			"Dee": {koname: "디", post: 1},
			"Derby": {koname: "더비", post: 1},
			"Devan": {koname: "데반", post: 0},
			"Devin": {koname: "데빈", post: 0},
			"Emmerson": {koname: "에머슨", post: 0},
			"Emory": {koname: "에모리", post: 1},
			"Finley": {koname: "핀리", post: 1},
			"Flannery": {koname: "플라네리", post: 1},
			"Florence": {koname: "플로렌스", post: 1},
			"Gabby": {koname: "개비", post: 1},
			"Garnet": {koname: "가넷", post: 0},
			"Garnett": {koname: "가네트", post: 1},
			"Gray": {koname: "그레이", post: 1},
			"Hadyn": {koname: "헤이든", post: 0},
			"Harlow": {koname: "하로우", post: 1},
			"Hollis": {koname: "홀리스", post: 1},
			"Jackie": {koname: "재키", post: 1},
			"Jade": {koname: "제이드", post: 1},
			"Jae": {koname: "재", post: 1},
			"Jaiden": {koname: "제이든", post: 0},
			"Johnnie": {koname: "조니", post: 1},
			"Joyce": {koname: "조이스", post: 1},
			"Justice": {koname: "저스티스", post: 1},
			"Kam": {koname: "캄", post: 0},
			"Kelcey": {koname: "켈시", post: 1},
			"Kelsey": {koname: "켈세이", post: 1},
			"Leslie": {koname: "레슬리", post: 1},
			"Lindsey": {koname: "린지", post: 1},
			"Lorin": {koname: "로린", post: 0},
			"Lyric": {koname: "라이릭", post: 0},
			"Maitland": {koname: "메이틀랜드", post: 1},
			"Marley": {koname: "말레이", post: 1},
			"McKinley": {koname: "맥킨리", post: 1},
			"Merlyn": {koname: "멀린", post: 0},
			"Murphy": {koname: "머피", post: 1},
			"Nicky": {koname: "니키", post: 1},
			"Oakley": {koname: "오클리", post: 1},
			"Odell": {koname: "오델", post: 2},
			"Pacey": {koname: "페이시", post: 1},
			"Peyton": {koname: "페이튼", post: 0},
			"Presley": {koname: "프레슬리", post: 1},
			"Rain": {koname: "레인", post: 0},
			"Raleigh": {koname: "랄레이", post: 1},
			"Reagan": {koname: "레이건", post: 0},
			"Regan": {koname: "레간", post: 0},
			"Reilly": {koname: "레일리", post: 1},
			"Remington": {koname: "레밍턴", post: 0},
			"Robbie": {koname: "로비", post: 1},
			"Rory": {koname: "로리", post: 1},
			"Royale": {koname: "로열", post: 2},
			"Sage": {koname: "세이지", post: 1},
			"Sam": {koname: "샘", post: 0},
			"Schuyler": {koname: "슐러", post: 1},
			"Selby": {koname: "셀비", post: 1},
			"Shae": {koname: "섀", post: 1},
			"Shaye": {koname: "샤에", post: 1},
			"Shelly": {koname: "셸리", post: 1},
			"Skylar": {koname: "스킬라", post: 1},
			"Sloan": {koname: "슬로안", post: 0},
			"Stacey": {koname: "스테이시", post: 1},
			"Stacy": {koname: "스테시", post: 1},
			"Tayler": {koname: "테일러", post: 1},
			"Tommie": {koname: "토미", post: 1},
			"Tracey": {koname: "트레이시", post: 1},
			"Tristen": {koname: "트리스텐", post: 0},
			"Tristin": {koname: "트리스틴", post: 0},
		};
	}
}
window.trinit_NPCname = trinit_NPCname;

function trinit_genderNoun()
{
    if (!setup.trGenderList)
	{
        setup.trGenderList = {
            "girl":{
                ko:"소녀",
                post:1
            },

            "boy":{
                ko:"소년",
                post:0
            },

            "man":{
                ko:"남자",
                post:1
            },

            "woman":{
                ko:"여자",
                post:1
            },

            "male":{
                ko:"수컷",
                post:0
            },

            "female":{
                ko:"암컷",
                post:0
            },

            "plantgirl":{
                ko:"식물 소녀",
                post:1
            },

            "plantboy":{
                ko:"식물 소년",
                post:0
            },

            "plantman":{
                ko:"식물 남자",
                post:1
            },

            "plantwoman":{
                ko:"식물 여자",
                post:1
            },
        };
    }
}
window.trinit_genderNoun = trinit_genderNoun;

function trinit_beastsList()
{
    if (!setup.trBeasttypeList)
	{
        setup.trBeasttypeList = {
            "human":{
                ko: "인간",
                post:0
                },

            "dog":{
                ko: "개",
                post:1
                },

            "cat":{
                ko: "고양이",
                post:1
                },

            "pig":{
                ko: "돼지",
                post:1
                },

            "wolf":{
                ko: "늑대",
                post:1
                },

            "dolphin":{
                ko: "돌고래",
                post:1
                },

            "lizard":{
                ko: "도마뱀",
                post:0
                },

            "bear":{
                ko: "곰",
                post:0
                },

            "boar":{
                ko: "멧돼지",
                post:1
                },

            "creature":{
                ko: "생물체",
                post:1
                },

            "horse":{
                ko: "말",
                post:2
                },

			"fox":{
				ko: "여우",
				post:1
				},

			"centaur":{
				ko: "켄타우로스",
				post:1
				},

			"stallion":{
				ko: "말",
				post:2
				},
				
			"mare":{
				ko: "암말",
				post:2
				},

			"hawk":{
				ko: "매",
				post:1
				},
				
			"cow":{
				ko: "암소",
				post:1
				},
				
			"bull":{
				ko: "숫소",
				post:1
				},
				
				"harpy":{
				ko: "하피",
				post:1
				},
				
				"bird":{
				ko: "새",
				post:1
				},

				"plant":{
				ko: "식물",
				post:2
				},

				"spider":{
				ko: "거미",
				post:1
				},
		};
    }
}
window.trinit_beastsList = trinit_beastsList;

function trinit_bodypartList()
{
    if (!setup.trBodypartsList)
	{
        setup.trBodypartsList = [
			{part:"left",koPart:"왼쪽",post:0},
			{part:"right",koPart:"오른쪽",post:0},

			{part:"bottom",koPart:"엉덩이",post:1},
			{part:"penis",koPart:"자지",post:1},
			{part:"clit",koPart:"클리토리스",post:1},
			{part:"anus",koPart:"항문",post:0},
			{part:"vagina",koPart:"보지",post:1},
			{part:"vaginaoutside",koPart:"보지 바깥",post:0},
			{part:"labia",koPart:"음순",post:0},
			{part:"tummy",koPart:"배",post:1},
			{part:"back",koPart:"등",post:0},
			{part:"ear",plural:"ears",koPart:"귀",post:1},
			{part:"hair",koPart:"머리카락",post:0},
			{part:"pubic",koPart:"음부",post:1},
			{part:"mouth",plural:"mouths",koPart:"입",post:0},
			{part:"face",plural:"faces",koPart:"얼굴",post:2},
			{part:"arm",plural:"arms",koPart:"팔",post:2},
			{part:"leftarm",koPart:"왼팔",post:2},
			{part:"rightarm",koPart:"오른팔",post:2},
			{part:"forehead",plural:"foreheads",koPart:"이마",post:1},
			{part:"back",plural:"backs",koPart:"등",post:0},
			{part:"neck",plural:"necks",koPart:"목",post:0},
			{part:"cheek",plural:"cheeks",koPart:"뺨",post:0},
			{part:"hand",plural:"hands",koPart:"손",post:0},
			{part:"shoulder",plural:"shoulders",koPart:"어깨",post:1},
			{part:"breast",plural:"breasts",koPart:"유방",post:0},
			{part:"foot",plural:"feet",koPart:"발",post:2},
			{part:"leg",plural:"legs",koPart:"다리",post:1},
			{part:"nipple",plural:"nipples",koPart:"유두",post:1},
			{part:"ball",plural:"balls",koPart:"고환",post:0},
			{part:"thigh",plural:"thighs",koPart:"허벅지",post:1},
			{part:"chest",plural:"chests",koPart:"가슴",post:0},
			{part:"midriff",plural:"midriffs",koPart:"몸통",post:0},
			{part:"knee",plural:"knees",koPart:"무릎",post:0},
			{part:"waist",plural:"waists",koPart:"허리",post:0},
			{part:"ankle",plural:"ankles",koPart:"발목",post:0}
		];
		let trPartIndex = {};
		for(const entry of setup.trBodypartsList)
		{
			trPartIndex[entry.part] = entry;
			if (entry.plural)
				trPartIndex[entry.plural] = entry;
		}
		setup.trBodypartsList.partIndex = trPartIndex;
	}
}
window.trinit_bodypartList = trinit_bodypartList;

function trinit_handtoolList()
{
	if (!setup.trHandtoolList)
	{
		setup.trHandtoolList = {
			"marker" : {
				ko: "마커펜",
				post: 0
			},
			"lipstick" : {
				ko: "립스틱",
				post: 0
			},
			"mud" : {
				ko: "진흙",
				post: 0
			},
			"pen" : {
				ko: "펜",
				post: 0
			},
			"pendant" : {
				ko: "펜던트",
				post: 1
			},
			"bundle of herbs" : {
				ko: "약초 묶음",
				post: 0
			},
			/* 이 아래는 메이크업인데 새로 위젯 짜기 귀찮으니 그냥 전용함 */
			"eyeshadow" : {
				ko: "아이섀도우",
				post: 1
			},
			"mascara" : {
				ko: "마스카라",
				post: 1
			},
			"hairdye" : {
				ko: "염색약",
				post: 0
			},
			"hair dye" : {
				ko: "염색약",
				post: 0
			},
			
			/* combat-spank */
			"paddle" : {
				ko: "체벌용 주걱",
				post: 0
			},
			
			/* sextoys from window.getSexToysofType() of 03-Javascript/sextoys.js */
			"dildo" : {
				ko: "딜도",
				post: 1
			},
			"length of anal beads" : {
				ko: "항문 구슬",
				post: 2
			},
			"riding crop" : {
				ko: "말채찍",
				post: 0
			},
			"flog" : {
				ko: "채찍",
				post: 0
			},
			"stroker" : {
				ko: "오나홀",
				post: 2
			},
			"vibrator" : {
				ko: "바이브레이터",
				post: 1
			},
			"bullet vibe" : {
				ko: "계란형 바이브",
				post: 1
			},

		};
	}
}
window.trinit_handtoolList = trinit_handtoolList;

function trinit_clothingtraitList()	// deprecated?
{
	if (!setup.trClothingtraitList)
	{
		setup.trClothingtraitList = {
			/* shopTraitDescription from overworld-town/loc-shop/widgets.twee */
			"normal":"일반",
			"formal":"격식",
			"school":"학교",
			"glasses":"안경",
			"cool":"유행",
			"swim":"수영복",
			"diving":"잠수복",
			"dance":"댄스복",
			"costume":"코스튬",
			"serving":"서빙",
			"fetish":"페티쉬",
			"sleep":"잠옷",
			"mask":"마스크",
			"holy":"신성함",
			"dark":"불경함",
			"binding":"구속",
			"stealthy":"은밀함",
			"sticky_fingers":"끈적한 손가락",
			"sticky fingers":"끈적한 손가락",
			"rainproof":"생활방수",
			"tanlines":"선탠라인",
			"tan lines":"선탠라인",
			"bimbo":"스페셜",
			"himbo":"스페셜",
			"special":"스페셜",
			"heels":"높은 굽",
			"high heeled":"높은 굽",
			"rugged":"튼튼함",
			"chest_bind":"가슴 감음",
			"chest binding":"가슴 감음",
			"eerie":"으스스함",
			"shade":"햇빛 가리개",
			"asylum":"정신병원",
			"prison":"교도소",
			"sticky":"달라붙음",
			"strap-on":"페니스 밴드",
			"covered":"커버",
			"naked":"노출",
			"athletic":"운동복",
			"maid":"메이드",
			"riding":"승마복",
			"chastity":"정조대",
			"cage":"우리",
			"shrinking":"줄어들음",
			"hidden":"숨겨짐",
			"gag":"재갈",
			"leash":"목줄",
			"event":"이벤트",
			"pushup":"보정",
			"push up":"보정",
			"push up":"보정",
			"bellyhide":"배 숨김",
			"belly hiding":"배 숨김",
			"bellyshow":"배 보임",
			"belly showing":"배 보임",
			"constricting":"타이트함",
			"bookbag":"책가방",
			"waterproof":"완전방수",
			"maternity":"임산복",
			"esoteric":"비전",
			"unstealthy":"숨기 힘듬",

			/* 존재하지만 shopTraitDescription에 없는 특성 */
			"rag":"누더기",
			"blindfold":"안대",
			"shackle":"족쇄",
			"prop":"소품",
			
			/* 왜인지 모르지만 머리 스타일도 clothingtrait 에서 처리하므로 여기 기술. 나눠지면 그에 따라 분리할것 */
			"loose":"풀린머리",
			"short":"짧은머리",
			"curly":"곱슬머리",
			"sleek":"곧은머리",
			"textured":"아프로-질감",
			"wavy":"물결머리",
			"pigtails":"피그테일",
			"buns":"번",
			"braids":"땋은머리",
			"ponytail":"포니테일",
		};
	}
}
window.trinit_clothingtraitList = trinit_clothingtraitList;

function trinit_roleList()
{
	if (!setup.trRoleList)
	{
		setup.trRoleList =  {
			"normal":{ko : "일반인", post : 0}, 

			/* town */
			"waiter":{ko : "웨이터", post : 1},
			"waitress":{ko : "웨이트리스", post : 1},
			"janitor":{ko : "관리인", post : 0},
			"scientist":{ko : "과학자", post : 1},
			"manager":{ko : "매니저", post : 1},
			"dancer":{ko : "댄서", post : 1},

			/* prison */
			"guard":{ko : "간수", post : 1}, 
			"inmate":{ko : "수감자", post : 1}, 
			
			/* Bailey */
			"thug":{ko : "폭력배", post : 1}, 
			
			/* pharmacy */
			"nurse":{ko : "간호사", post : 1}, 
			
			/* shadowed */
			"man":{ko : "남자", post : 1}, 
			"woman":{ko : "여자", post : 1}, 
			
			/* temple */
			"initiate":{ko : "수련생", post : 0}, 
			"cultist":{ko : "광신도", post : 1}, 
			
			/* pirate */
			"pirate":{ko : "해적", post : 0}, 
			
			/* island */
			"islander":{ko : "섬사람", post : 0}, 
			"old islander":{ko : "늙은 섬사람", post : 0}, 
			"sleeper":{ko : "잠이 든 사람", post : 0}, 
		};
	}
}
window.trinit_roleList = trinit_roleList;

function trinit_childToySelectionList()
{
	if (!setup.trChildToySelectionList)
	{
		setup.trChildToySelectionList = {
			/* baby rattles */
			"babyrattle" : {ko : "아기 딸랑이", post : 1},
			"baby rattle" : {ko : "아기 딸랑이", post : 1},
			"baby rattles" : {ko : "아기 딸랑이", post : 1},
			"pink baby rattle" : {ko : "분홍색 아기 딸랑이", post : 1},
			"blue baby rattle" : {ko : "파란색 아기 딸랑이", post : 1},
			"green baby rattle" : {ko : "초록색 아기 딸랑이", post : 1},
			"red baby rattle" : {ko : "빨간색 아기 딸랑이", post : 1},
			"yellow baby rattle" : {ko : "노란색 아기 딸랑이", post : 1},
			
			"pink" : {ko : "분홍색", post : 0},
			"blue" : {ko : "파란색", post : 0},
			"green" : {ko : "초록색", post : 0},
			"red" : {ko : "빨간색", post : 0},
			"yellow" : {ko : "노란색", post : 0},
			
			/* teddy bears */
			"teddybear" : {ko : "테디베어", post : 1},
			"teddy bear" : {ko : "테디베어", post : 1},
			"teddy bears" : {ko : "테디베어", post : 1},
			"mr teddy" : {ko : "테디 아저씨", post : 1},
			"mrs teddy" : {ko : "테디 아줌마", post : 1},
			"clown" : {ko : "어릿광대", post : 1},
			"green robot" : {ko : "초록색 로봇", post : 0},
			"red robot" : {ko : "빨간색 로봇", post : 0},
			"baby doll" : {ko : "아기 인형", post : 0},
		
			/* toy cars */
			"toycar" : {ko : "장난감 자동차", post : 1},
			"toy car" : {ko : "장난감 자동차", post : 1},
			"toy cars" : {ko : "장난감 자동차", post : 1},
			"pink mini toy car" : {ko : "분홍색 미니 장난감 자동차", post : 1},
			"blue race toy car" : {ko : "파란색 레이싱 장난감 자동차", post : 1},
			"green race toy car" : {ko : "초록색 레이싱 장난감 자동차", post : 1},
			"hot rod toy car" : {ko : "몬스터 트럭 장난감 자동차", post : 1},
			"limousine toy car" : {ko : "리무진 장난감 자동차", post : 1},
			
			"pink mini" : {ko : "분홍색 미니", post : 1},
			"blue race car" : {ko : "파란색 레이싱 자동차", post : 1},
			"green race car" : {ko : "초록색색 레이싱 자동차", post : 1},
			"hot rod" : {ko : "몬스터 트럭", post : 0},
			"limousine" : {ko : "리무진", post : 0},
			
			/* chew toys */
			"chewtoy" : {ko : "씹는 장난감", post : 0},
			"chew toy" : {ko : "씹는 장난감", post : 0},
			"chew toys" : {ko : "씹는 장난감", post : 0},
			"chew bone" : {ko : "씹는 뼈", post : 1},
			"chew ball" : {ko : "씹는 공", post : 0},
			"squeaky sheep" : {ko : "소리나는 양", post : 0},
			"squeaky chicken" : {ko : "소리나는 닭", post : 0},
			"rope" : {ko : "씹는 로프", post : 1},
			
			/* dummy */
			"dummy" : {ko : "공갈젖꼭지", post : 1},
			"dummies" : {ko : "공갈젖꼭지", post : 1},
			"pink dummy" : {ko : "분홍색 공갈젖꼭지", post : 1},
			"blue dummy" : {ko : "파란색 공갈젖꼭지", post : 1},
			"green dummy" : {ko : "초록색 공갈젖꼭지", post : 1},
			"red dummy" : {ko : "빨간색 공갈젖꼭지", post : 1},
			"yellow dummy" : {ko : "노란색 공갈젖꼭지", post : 1},
			"white dummy" : {ko : "흰색 공갈젖꼭지", post : 1},
			"see through dummy" : {ko : "반투명한 공갈젖꼭지", post : 1},
			
			"white" : {ko : "흰색", post : 0},
			"see through" : {ko : "반투명", post : 0},
		};
	
	}
}
window.trinit_childToySelectionList = trinit_childToySelectionList;

function trinit_hairtype()
{
	/* base-hair/hair-styles.twee */
	/* variable 과 name 이 다를 경우 둘 다 등재할것 */
	if (!setup.trHairtypeList)
	{
		setup.trHairtypeList = { 
			"default": "자연스러운",
			"natural": "자연스러운",
	
			/*Side Styles*/
			"afro": "아프로",
			"fro": "아프로",
			"afro pouf": "아프로 푸프",
			"afro puffs": "아프로 퍼프",
			"all down": "전부 내린",
			"bedhead": "뻗친머리",
			"braid left": "왼쪽으로 땋은",
			"braid right": "오른쪽으로 땋은",
			"bubble tails": "버블테일",
			"crescent tails": "크레센트 테일",
			"curl": "곱슬머리",
			"curly": "곱슬머리",
			"curly pigtails": "곱슬머리 피그테일",
			"curly side up": "옆을 올린 곱슬머리",
			"defined curl": "디파인드 컬",
			"defined curls": "디파인드 컬",
			"draggletail": "지저분한 포니테일",
			"messy ponytail": "지저분한 포니테일",
			"dreads": "레게머리",
			"drill ringlets": "드릴 링렛",
			"flat ponytail": "플랫 포니테일",
			"fluffy ponytail": "복슬복슬한 포니테일",
			"french bob": "프렌치 단발머리",
			"half-up": "반묶음",
			"half-up twintail": "반묶음 트윈테일",
			"half up twintail": "반묶음 트윈테일",
			"heart braid": "하트모양 땋은머리",
			"heart braids": "하트모양 땋은머리",
			"jellyfish ponytail": "해파리 포니테일",
			"jellyfish twintails": "해파리 트윈테일",
			"layered bob": "레이어드 단발머리",
			"left fishtail": "왼쪽 피쉬테일",
			"loop braid": "도넛모양 땋은머리",
			"loop braids": "도넛모양 땋은머리",
			"loose": "루즈",
			"low tails": "로우테일",
			"messy": "지저분한",
			"messy bun": "지저분한 번",
			"neat": "니트",
			"pigtails": "피그테일",
			"ponytail": "포니테일",
			"princess twintails": "공주님 트윈테일",
			"princess wave": "공주님 웨이브",
			"ribbon tail": "리본테일",	
			"right fishtail": "오른쪽 피쉬테일",
			"ruffled": "헝클어진",
			"sailor buns": "경단머리",
			"shaved": "짧게 깎은",
			"scorpion tails": "전갈머리",
			"short": "짧은",
			"short spiky": "짧은 뾰족머리",
			"straight bob": "스트레이트 단발머리",
			"sidecut": "사이드컷",
			"side tail left": "왼쪽 사이드테일",
			"sidetail left": "왼쪽 사이드테일",
			"side tail right": "오른쪽 사이드테일",
			"sidetail right": "오른쪽 사이드테일",
			"sleek": "곧은머리",
			"space buns": "스페이스 번",
			"straight": "스트레이트",
			"swept left": "왼쪽으로 쏠린",
			"thick pigtails": "두꺼운 피그테일",
			"thick ponytail": "두꺼운 포니테일",
			"side thicktail": "두꺼운 사이드테일",
			"thick sidetail": "두꺼운 사이드테일",
			"thick twintails": "두꺼운 트윈테일",
			"twin braids": "양쪽으로 땋은",
			"twin fishtails": "트윈 피쉬테일",
			"twintails": "트윈테일",
			"twin double braids": "양쪽으로 이중으로 땋은",
	
			/*Fringe Styles */
			"aerial": "안테나머리",
			"blunt sidelocks": "블런트록",
			"blunt locks": "블런트록",
			"bowl cut": "바가지머리",
			"bowl": "바가지머리",
			/*"bedhead": "뻗친머리",*/
			"buzzcut": "빡빡머리",
			"curtain": "커튼",
			/*"drill ringlets": "드릴 링렛",	중복*/
			"dreadlocks": "꼰머리",
			"dread bun": "드레드 번",
			"emo": "이모",
			"emo left": "왼쪽 이모",
			"emo right": "오른쪽 이모",
			"flat": "납작한",
			"framed": "테두리",
			/*"fro": "아프로",	중복*/
			"front braids": "앞으로 땋은",
			"hime": "히메",
			/*"loose": "루즈",	중복*/
			/*"messy": "지저분한",	중복*/
			"messy curls": "지저분한 컬",
			"middle part": "중간 가르마",
			"middlepart": "중간 가르마",
			"milkmaid braid": "밀크메이드 땋기머리",
			"milkmaid": "밀크메이드 땋기머리",
			"mohawk": "모히칸",
			"overgrown": "너무 자란",
			"parted": "가르마",
			/* "princess wave": "공주님 웨이브", */
			"quiff": "고수머리",
			"ringlet curl": "링렛 컬",
			"ringlet curls": "링렛 컬",
			"ringlets": "링렛",
			/*"ruffled": "헝클어진",	중복*/
			"sectioned": "섹션",
			/*"sidecut": "사이드컷",	중복*/
			"side braid": "옆으로 땋은",
			"sideswept braid": "옆으로 땋은",
			"side-pinned": "사이드핀",
			"short air vents": "짧은 공깃구멍",
			/*"sleek": "곧은머리",*/
			"split": "반씩 가른",
			/*"straight": "스트레이트",	중복*/
			"straight curl": "스트레이트 컬",
			"straight curls": "스트레이트 컬",
			"straight tails": "스트레이트 테일",	
			"swept back": "뒤로 쓸어넘긴",
			"swept left": "왼쪽으로 쓸어넘긴",
			"thin flaps": "얇게 휘날리는",
			"tied back": "뒤로 묶은",
			"trident": "삼지창",
			"wide flaps": "넓게 휘날리는",
			"loose antenna": "느슨한 바보털",
		};
	}
}
window.trinit_hairtype = trinit_hairtype;