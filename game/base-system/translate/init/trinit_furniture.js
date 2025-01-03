function trinit_furniture()
{
	if (!setup.trFurniture)
	{
		setup.trFurniture = {
			/* 03-Javascript/furniture.js furnitureInit() */
		
			/* ------------- CHAIRS ------------- */
			'chair': {
				name: "chair",
				koName: "의자",
				post: 1,
				description: "오래된, 중고 의자. 흔들거리고 불편하다.",
			},
			'stool': {
				name: "stools",
				koName: "등받이 없는 의자",
				post: 1,
				description: "등받이가 없는 의자 세트. 불편하지만, 없는 것 보다는 낫다.",
			},
			'woodenchair': {
				name: "wooden chairs",
				koName: "나무 의자",
				post: 1,
				description: "일반적인 나무 의자 세트. 가장 편안하다고는 할 수 없다.",
			},
			'swivelchair': {
				name: "swivel chairs",
				koName: "회전 의자",
				post: 1,
				description: "회전 의자 한 쌍. 편안하고 인체공학적이다.",
			},
			'shellchair': {
				name: "shell chairs",
				koName: "조개형 의자",
				post: 1,
				description: "조개 모양 등받이가 달린 바퀴 달린 의자 세트. 호화롭다.",
			},
			'armchair': {
				name: "armchairs",
				koName: "팔걸이 의자",
				post: 1,
				description: "팔걸이 의자 세트. 부드럽고, 편안하고, 그리고 비싸다.",
			},
			'egg': {
				name: "egg armchairs",
				koName: "달걀형 팔걸이 의자",
				post: 1,
				description: "이국적인 색상의, 오목한 등받이가 있는 팔걸이 의자. 설치하려면 꽤 힘들다.",
			},
		
			/* ------------- TABLES ------------- */
			'woodentable': {
				name: "wooden table",
				koName: "나무 탁자",
				post: 1,
				description: "일하거나 모임을 가질 때 사용할 수 있다. 의자만 추가하면.",
			},
			'marbletable': {
				name: "marble-topped table",
				koName: "대리석 상판 탁자",
				post: 1,
				description: "꼬여있는 모양의 일반적인 나무 탁자.",
			},
			
			/* ------------- DESKS ------------- */
			"desk": {
				name: "basic desk",
				koName: "기본적인 책상",
				post: 0,
				description: "오래된, 물려받은 책상. 지난날 고아들이 흠집을 내어와서 훼손되어 있다.",
			},
			"deskGlass": {
				name: "glass desk",
				koName: "유리 책상",
				post: 0,
				description: "매끈한, 현대식 책상. 깨질 수 있다.",
			},
			"deskMidcentury": {
				name: "mid-century modern desk",
				koName: "미드 센추리 모던 책상",
				post: 0,
				description: "모더니즘 풍의 단순한 모양의 책상. 20세기 중반에 유행했다.",
			},
			"deskAntique": {
				name: "antique desk",
				koName: "고풍스러운 책상",
				post: 0,
				description: "화려하게 장식된, 고풍스러운 책상. 평생 버틸 수 있도록 만들어졌다.",
			},

			/* ------------- BEDS ------------- */
			'bed': {
				name: "basic bed",
				koName: "싸구려 침대",
				post: 1,
				description: "낡고, 형편없는 침대. 불편하다.",
			},
			'singlebed': {
				name: "single bed",
				koName: "싱글 침대",
				post: 1,
				description: "1인용 침대.",
			},
			'singlebeddeluxe': {
				name: "deluxe single bed",
				koName: "호화로운 싱글 침대",
				post: 1,
				description: "인체공학적으로 디자인된 침대. 아주 편안하다.",
			},
			'doublebed': {
				name: "double bed",
				koName: "더블 침대",
				post: 1,
				description: "일반적인 침대. 두 사람이 잘 수 있다.",
			},
			'doublebeddeluxe': {
				name: "deluxe double bed",
				koName: "호화로운 더블 침대",
				post: 1,
				description: "부드러운 매트리스가 깔린 아름다운 침대. 아주 편안하며, 두 사람이 잘 수 있다.",
			},
			'doublebedexotic': {
				name: "exotic double bed",
				koName: "이국적인 더블 침대",
				post: 1,
				description: "현대적인, 미니멀리스트 스타일의 침대. 아주 편안하며, 두 사람이 잘 수 있다.",
			},
			'doublebedwicker': {
				name: "wicker double bed",
				koName: "등나무 더블 침대",
				post: 1,
				description: "진짜 등나무로 만들어진 침대. 아주 편안하며, 두 사람이 잘 수 있다.",
			},
		
			/* ------------- MISC ------------- */
			'plantpot': {
				name: "plant pot",
				koName: "화분",
				post: 0,
				description: "좋은 흙이 담긴 질그릇 화분. 꽃이 미리 심어진 채로 판매된다. 창문 턱에 놓아둘 수 있다.",
				},
			'bunnysucculent': {
				name: "bunny succulent",
				koName: "토끼 귀 다육식물",
				post: 2,
				description: "작은 다육식물을 위한 시멘트 화분. 토끼 귀 다육식물이라 알려진, '모니라리아 오브코니카'라는 다육식물이 미리 심어져 있다.",
				},
			'jar': {
				name: "jar",
				koName: "유리병",
				post: 0,
				description: "원통 모양의 유리병. 창문 턱에 놓아둘 수 있다.",
			},
			'ominousjar': {
				name: "ominous jar",
				koName: "불길한 유리병",
				post: 0,
				description: "원통 모양의 유리병. 창문 턱에 놓아둘 수 있다.",
			},
			/* ------------- DECORATIONS ------------- */
			'calendar': {
				name: "calendar",
				koName: "달력",
				post: 0,
				description: "이 달력의 날짜들에는 숫자가 붙어 있다.",
			},
			'painting': {
				name: "painting",
				koName: "그림",
				post: 0,
				description: "이것은 사실 그림이 아니다. 이것은 일러스트다. ",
			},
			'banner': {
				name: "banner",
				koName: "현수막",
				post: 0,
				description: "옛 영화의 주인공이 가운데에서 포즈를 취하고 있다.",
			},
			'bannerlewd': {
				name: "lewd banner",
				koName: "음란한 현수막",
				post: 0,
				description: "촉수가 그려진 현수막.",
			},
			'bannerfestive': {
				name: "festive banner",
				koName: "축제 현수막",
				post: 0,
				description: "지금 열리고 있든 열리고 있지 않든, 어쩄거나 멋져 보인다.",
			},
			'bearplushie': {
				name: "large bear plushie",
				koName: "커다란 곰 인형",
				post: 0,
				description: "부드럽고, 꼭 껴안고 싶어지며 영원히 친구가 되어 준다.",
			},
			'owlplushie': {
				name: "owl plushie",
				koName: "올빼미 인형",
				post: 0,
				description: "커다란 눈으로 세계를 주시한다.",
			},
			/* ------------- WARDROBES ------------- */
			/*  starter - 20 clothing slots for every type
				spacious - 30 clothing slots for every type
				organised - 40 clothing slots for every type */
			'wardrobe': {
				name: "creaky wardrobe",
				koName: "삐걱거리는 옷장",
				post: 0,
				description: "낡고, 삐걱거리는 옷장. 많이 수납하지 못한다.",
			},
			'wardrobebasic': {
				name: "wardrobe",
				koName: "옷장",
				post: 0,
				description: "기본적인 옷장.",
			},
			'armoire': {
				name: "armoire",
				koName: "장식장",
				post: 0,
				description: "널찍한 나무 장식장.",
			},
			'organiser': {
				name: "organiser wardrobe",
				koName: "오거나이저 옷장",
				post: 0,
				description: "엄청난 공간을 자랑하는 옷장.",
			},
			'carved': {
				name: "carved armoire",
				koName: "조각된 장식장",
				post: 0,
				description: "손으로 조각되어 있으며, 여러 서랍과 옷을 거는 막대가 있다.",
			},
			/* --------------- POSTERS --------------- */
			'poster': {
				name: "blank poster",
				koName: "백지 포스터",
				post: 1,
				description: "이 포스터에는 현재 아무 내용이 없다.",
			},
			/* ------------- WALLPAPERS -------------- */
			'wallpaper': {
				name: "blank wallpaper",
				koName: "백지 벽지",
				post: 1,
				description: "이 벽지에는 현재 아무 내용이 없다.",
			},
			
			/* overworld-town/loc-shop/furniture.twee _availableHangings */
			"vines": {
				name: "vines",
				koName: "덩굴",
				post: 2,
				description: "",
			},
			"tentacles": {
				name: "tentacles",
				koName: "촉수",
				post: 1,
				description: "",
			},
			"plainwhite": {
				name: "plainwhite",
				koName: "평범한 하얀색",
				post: 0,
				description: "",
			},
			"cowgirls": {
				name: "cowgirls",
				koName: "암소 소녀들",
				post: 2,
				description: "",
			},
			"cow_girls": {
				name: "cow_girls",
				koName: "암소 소녀들",
				post: 2,
				description: "",
			},
			"hearts": {
				name: "hearts",
				koName: "하트들",
				post: 2,
				description: "",
			},
			"trees": {
				name: "trees",
				koName: "나무들",
				post: 2,
				description: "",
			},
			"crosses": {
				name: "crosses",
				koName: "십자가들",
				post: 2,
				description: "",
			},
			"cowgirl": {
				name: "cowgirl",
				koName: "암소 소녀",
				post: 1,
				description: "",
			},
			"cow_girl": {
				name: "cow_girl",
				koName: "암소 소녀",
				post: 1,
				description: "",
			},
			"cat": {
				name: "cat",
				koName: "고양이",
				post: 1,
				description: "",
			},
			"puppy": {
				name: "puppy",
				koName: "강아지",
				post: 1,
				description: "",
			},
		};
		let trNameIndex = {};
		let keys = Object.keys(setup.trFurniture);
		for(const key of keys)
		{
			let entry = setup.trFurniture[key];
			trNameIndex[entry.name] = entry;
		}
		Object.assign(setup.trFurniture, trNameIndex);
	}
}
window.trinit_furniture = trinit_furniture;