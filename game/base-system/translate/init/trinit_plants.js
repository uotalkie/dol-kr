function trinit_plants()
{
	if (!setup.trPlants)
	{
		setup.trPlants = [
				{
					name: "red_rose",
					singular: "red_rose",
					plural: "red roses",
					name_ko: "붉은 장미",
					post:1,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "white_rose",
					singular: "white_rose",
					plural: "white roses",
					name_ko: "백장미",
					post:1,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "orchid",
					singular: "orchid",
					plural: "orchids",
					name_ko: "난초",
					post:1,
					unit_ko: "촉",
					unit_post:0,
				},

				{
					name: "daisy",
					singular: "daisy",
					plural: "daisies",
					name_ko: "데이지",
					post:1,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "tulip",
					singular: "tulip",
					plural: "tulips",
					name_ko: "튤립",
					post:0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "lotus",
					singular: "lotus",
					plural: "lotus",
					name_ko: "연꽃",
					post:0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "lily",
					singular: "lily",
					plural: "lilies",
					name_ko: "백합",
					post:0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "poppy",
					singular: "poppy",
					plural: "poppies",
					name_ko: "양귀비",
					post:1,
					unit_ko: "송이",
					unit_post:1,
				},
				
				{
					name: "apple",
					singular: "apple",
					plural: "apples",
					name_ko: "사과",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "orange",
					singular: "orange",
					plural: "oranges",
					name_ko: "오렌지",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "banana",
					singular: "banana",
					plural: "bananas",
					name_ko: "바나나",
					post:1,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "lemon",
					singular: "lemon",
					plural: "lemons",
					name_ko: "레몬",
					post:0,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "blood_lemon",
					singular: "blood_lemon",
					plural: "blood lemons",
					name_ko: "블러드 레몬",
					post:0,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "pear",
					singular: "pear",
					plural: "pears",
					name_ko: "배",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "strawberry",
					singular: "strawberry",
					plural: "strawberries",
					name_ko: "딸기",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "peach",
					singular: "peach",
					plural: "peaches",
					name_ko: "복숭아",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "plum",
					singular: "plum",
					plural: "plums",
					name_ko: "자두",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "mushroom",
					singular: "mushroom",
					plural: "mushrooms",
					name_ko: "버섯",
					post:0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "wolfshroom",
					singular: "wolfshroom",
					plural: "wolfshrooms",
					name_ko: "늑대 버섯",
					post:0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "wild_honeycomb",
					singular: "wild_honeycomb",
					plural: "wild honeycombs",
					name_ko: "야생 벌집",
					post:0,
					unit_ko: "개",
					unit_post:1,
			},

				{
					name: "wild_carrot",
					singular: "wild_carrot",
					plural: "carrots",
					name_ko: "야생 당근",
					post: 0,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "onion",
					singular: "onion",
					plural: "onions",
					name_ko: "양파",
					post: 1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "garlic_bulb",
					singular: "garlic_bulb",
					plural: "garlic bulbs",
					name_ko: "마늘",
					post: 2,
					unit_ko: "통",
					unit_post:0,
				},

				{
					name: "potato",
					singular: "potato",
					plural: "potatoes",
					name_ko: "감자",
					post: 1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "strange_flower",
					singular: "strange_flower",
					plural: "strange flowers",
					name_ko: "이상한 꽃",
					post: 0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "truffle",
					singular: "truffle",
					plural: "truffles",
					name_ko: "송로버섯",
					post: 0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "bottle_of_milk",
					singular: "bottle_of_milk",
					plural: "bottles of milk",
					name_ko: "우유를 넣은 병",
					post: 0,
					unit_ko: "병",
					unit_post:0,
				},

				{
					name: "egg",
					singular: "egg",
					plural: "eggs",
					name_ko: "계란",
					post: 0,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "chicken_egg",
					singular: "chicken_egg",
					plural: "chicken eggs",
					name_ko: "계란",
					post: 0,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "bottle_of_breast_milk",
					singular: "bottle_of_breast_milk",
					plural: "bottles of breast milk",
					name_ko: "모유를 넣은 병",
					post: 0,
					unit_ko: "병",
					unit_post:0,
				},

				{
					name: "bottle_of_semen",
					singular: "bottle_of_semen",
					plural: "bottles of semen",
					name_ko: "정액을 넣은 병",
					post: 0,
					unit_ko: "병",
					unit_post:0,
				},

				{
					name: "cabbage",
					singular: "cabbage",
					plural: "cabbages",
					name_ko: "양배추",
					post: 1,
					unit_ko: "포기",
					unit_post:1,
				},

				{
					name: "turnip",
					singular: "turnip",
					plural: "turnips",
					name_ko: "순무",
					post: 1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "broccoli",
					singular: "broccoli",
					plural: "broccoli",
					name_ko: "브로콜리",
					post: 1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "ghostshroom",
					singular: "ghostshroom",
					plural: "ghostshrooms",
					name_ko: "유령버섯",
					post: 0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "blackberry",
					singular: "blackberry",
					plural: "blackberries",
					name_ko: "블랙베리",
					post: 1,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "carnation",
					singular: "carnation",
					plural: "carnations",
					name_ko: "카네이션",
					post: 0,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "bird_egg",
					singular: "bird_egg",
					plural: "bird eggs",
					name_ko: "새 알",
					post: 2,
					unit_ko: "개",
					unit_post:1,
				},

				{
					name: "baby_bottle_of_breast_milk",
					singular: "baby bottle of breast milk",
					plural: "baby bottles of breast milk",
					name_ko: "모유를 넣은 젖병",
					post: 0,
					unit_ko: "병",
					unit_post:0,
				},

				{
					name: "plumeria",
					singular: "plumeria",
					plural: "plumerias",
					name_ko: "플루메리아",
					post:1,
					unit_ko: "송이",
					unit_post:1,
				},

				{
					name: "oyster_pearl",
					singular: "oyster pearl",
					plural: "oyster pearls",
					name_ko: "진주",
					post:1,
					unit_ko: "개",
					unit_post:1,
				},
		];
	}
}
window.trinit_plants = trinit_plants;
