function trinit_colorList()
{
	if (!setup.trColour)
	{
		setup.trColour = {
			/* 특수 색상 */
			"twotoned" : "투톤 색조",
			"ghost" : "유령같은 반투명색",
			"no" : "빡빡",

			/* setup.colours.hair (04-Variables/colours.js) */
			"random" : "랜덤",
			"red" : "빨간색",
			"jetblack":"흑옥색",
			"black" : "검은색",
			"blond" : "금발",
			"blonde" : "금발",
			"softblond" : "부드러운 금발",
			"platinumblond" : "백금색",
			"golden" : "황금색",
			"ashyblond" : "에쉬 블론드",
			"strawberryblond" : "스트로베리 블론드",
			"darkbrown" : "짙은 갈색",
			"brown" : "갈색",
			"softbrown" : "부드러운 갈색",
			"lightbrown" : "연한 갈색",
			"burntorange" : "번트 오렌지색",
			"ginger" : "생강색",
			"bloodorange" : "블러드 오렌지색",
			"blue" : "파란색",
			"deepblue" : "깊은 파란색",
			"neonblue" : "네온 파란색",
			"green" : "초록색",
			"darklime" : "짙은 라임색",
			"toxicgreen" : "톡식 그린색",
			"teal" : "청록색",
			"pink" : "분홍색",
			"brightpink" : "밝은 분홍색",
			"hotpink" : "핫핑크색",
			"softpink" : "부드러운 분홍색",
			"crimson" : "진홍색",
			"purple" : "보라색",
			"mediumpurple" : "중간 보라색",
			"brightpurple" : "밝은 보라색",
			"white" : "흰색",
			"snowwhite" : "순백색",

			/* setup.colours.eyes */
			/*"random" : "랜덤",*/
			/*"purple" : "보라색",*/
			"darkblue" : "짙은 파란색",
			"lightblue" : "연한 파란색",
			"amber" : "호박색",
			"hazel" : "적갈색",
			/*"green" : "초록색",*/
			"limegreen": "라임 초록색",
			"lightgreen" : "연한 초록색",
			/*"red" : "빨간색",*/
			/*"pink" : "분홍색",*/
			"grey" : "회색",
			"gray" : "회색",
			"lightgrey" : "연한 회색",
			"redpossessed" : "귀신들린 빨간색",
			"bluepossessed" : "귀신들린 파란색",

			/* setup.colours.clothes */
			/*"blue" : "파란색",*/
			/*"lightblue" : "연한 파란색",*/
			/*"neonblue" : "네온 파란색",*/
			/*"white" : "흰색",*/
			"palewhite" : "옅은 흰색",
			/*"red" : "빨간색",*/
			"jewelred" : "보석 빨간색",
			/*"green" : "초록색",*/
			/*"lightgreen" : "연한 초록색",*/
			/*"black" : "검은색",*/
			/*"pink" : "분홍색",*/
			"lightpink" : "연한 분홍색",
			/*"purple" : "보라색",*/
			"lilac" : "라일락색",
			"tangerine" : "귤색",
			"paletangerine" : "옅은 귤색",
			/*"teal" : "청록색",*/
			"yellow" : "노란색",
			"paleyellow" : "옅은 노란색",
			/*"brown" : "갈색",*/
			/*"softbrown" : "부드러운 갈색",*/
			"tan": "황갈색",
			"fleshy": "살색",
			/*"grey" : "회색",*/
			"sand" : "모래색",
			"off-white": "어두운 흰색",
			"navy" : "남색",
			"navyblue" : "곤색",
			"denim" : "데님 파란색",
			"olive" : "올리브색",
			"wine": "포도색",
			"russet" : "러셋 적갈색",
			"apocalypse": "아포칼립스색", /* ??? */
			"steel": "철색",
			"bluesteel": "강청색",
			"bronze": "청동색",
			"gold": "금색",
			"silver": "은색",
			"sterlingsilver": "순은색",

			/* setup.colours.lipstick */
			/*"red" : "빨간색",*/
			/*"blue" : "파란색",*/
			/*"green" : "초록색",*/
			/*"purple" : "보라색",*/
			"orange" : "주황색",
			"lime": "라임색",
			/*"pink" : "분홍색",*/
			/*"lightpink" : "연한 분홍색",*/
			"darkred" : "짙은 빨간색",
			/*"black" : "검은색",*/

			/* setup.colours.eyeshadow */
			/*"red" : "빨간색",*/
			/*"pink" : "분홍색",*/
			/*"lightpink" : "연한 분홍색",*/
			/*"green" : "초록색",*/
			/*"lightgreen" : "연한 초록색",*/
			/*"blue" : "파란색",*/
			/*"lightblue" : "연한 파란색",*/
			/*"purple" : "보라색",*/
			/*"orange" : "주황색",*/
			/*"yellow" : "노란색",*/
			/*"brown" : "갈색",*/
			/*"lightbrown" : "연한 갈색",*/
			/*"darkbrown" : "짙은 갈색",*/
			/*"black" : "검은색",*/
			/*"white" : "흰색",*/
			/*"silver": "은색",*/

			/* setup.colours.mascara */
			/*"black" : "검은색",*/
			"blackwaterproof" : "검은색 (방수)",
			"black(waterproof)" : "검은색 (방수)",

			/* setup.colours.condom */
			"lblue" : "연한 파란색",
			"plain" : "평범한 색",


			/* window.getCustomColourName (03-JavaScript/colour-namer.js) */
			/* very specific colours */
			"custom" : "커스텀",
			"coral" : "산호색",
			/*"sand" : "모래색",*/
			
			/* general desaturated colours */
			/*"black" : "검은색",*/
			/*"white" : "흰색",*/
			/*"lightgrey" : "연한 회색",*/
			/*"grey" : "회색",*/
			"darkgrey" : "짙은 회색",

			/* full rainbow action */
			/*"red" : "빨간색",*/
			/*"orange" : "주황색",*/
			/*"yellow" : "노란색",*/
			"charteuse": "연두색",
			"chartreuse": "연두색",
			/*"lime": "라임색",*/
			/*"green" : "초록색",*/
			"aquamarine": "옥색",
			"cyan": "비취색",
			/*"blue" : "파란색",*/
			"indigo": "군청색",
			"violet": "자주색",
			/*"purple" : "보라색",*/
			"magenta": "자홍색",
			"rose": "장미색",

			"beige" : "베이지색",
			/*"olive" : "올리브색",*/
			/*"pink" : "분홍색",*/
			/*"navy" : "남색",*/
			/*"teal" : "청록색",*/
			
			

			/* special NPC hair colour (04-Variables/npcNamed.twee) */
			"mousy" : "칙칙한 갈색",
		};
	}
}
window.trinit_colorList = trinit_colorList;

function trinit_colorAuxList()
{
	if (!setup.trColourAux)
	{
		setup.trColourAux = {
			"light": "연한",
			"dark": "짙은",
			"greyish": "칙칙한",
			"bright": "밝은",
			"pale": "옅은",
			"soft": "부드러운",
		};
	}
}
window.trinit_colorAuxList = trinit_colorAuxList;

function trinit_colorList2()
{
	if (!setup.trColour2)
	{
		/* 03-JavaScript/external/colour-namer.js */
		setup.trColour2 = [
			{ variable:"aqua", name:"aqua", koname:"물색"},
			{ variable:"aliceblue", name:"alice blue", koname:"옅은 감색"},
			{ variable:"antiquewhite", name:"antique white", koname:"크림색"},
			{ variable:"black", name:"black", koname:"검은색"},
			{ variable:"blue", name:"blue", koname:"파란색"},
			{ variable:"cyan", name:"cyan", koname:"비취색"},
			{ variable:"omendarkblue", name:"dark blue", koname:"짙은 파란색"},
			{ variable:"darkcyan", name:"dark cyan", koname:"짙은 비취색"},
			{ variable:"darkgreen", name:"dark green", koname:"짙은 초록색"},
			{ variable:"darkturquoise", name:"dark turquoise", koname:"짙은 터키색"},
			{ variable:"deepskyblue", name:"deep sky-blue", koname:"깊은 하늘색"},
			{ variable:"omengreen", name:"green", koname:"초록색"},
			{ variable:"lime", name:"lime green", koname:"라임 초록색"},
			{ variable:"mediumblue", name:"medium blue", koname:"중간 파란색"},
			{ variable:"mediumspringgreen", name:"medium spring-green", koname:"중간 춘록색"},
			{ variable:"navy", name:"navy", koname:"남색"},
			{ variable:"springgreen", name:"spring-green", koname:"춘록색"},
			{ variable:"teal", name:"teal", koname:"청록색"},
			{ variable:"midnightblue", name:"midnight blue", koname:"암청색"},
			{ variable:"dodgerblue", name:"dodger blue", koname:"다저 파란색"},
			{ variable:"lightseagreen", name:"light sea-green", koname:"연한 해록색"},
			{ variable:"forestgreen", name:"forest-green", koname:"숲색"},
			{ variable:"seagreen", name:"sea-green", koname:"해록색"},
			{ variable:"darkslategrey", name:"dark slate-grey", koname:"짙은 청회색"},
			{ variable:"mediumlimegreen", name:"lime medium-green", koname:"중간 라임 초록색"},
			{ variable:"mediumseagreen", name:"medium sea-green", koname:"중간 해록색"},
			{ variable:"turquoise", name:"turquoise", koname:"터키색"},
			{ variable:"royalblue", name:"royal-blue", koname:"감청색"},
			{ variable:"steelblue", name:"steel-blue", koname:"강청색"},
			{ variable:"darkslateblue", name:"dark slate-blue", koname:"짙은 감청색"},
			{ variable:"mediumturquoise", name:"medium-turquoise", koname:"중간 터키색"},
			{ variable:"indigo", name:"indigo", koname:"군청색"},
			{ variable:"darkolivegreen", name:"dark olive-green", koname:"짙은 올리브 초록색"},
			{ variable:"cadetblue", name:"cadet-blue", koname:"회청색"},
			{ variable:"cornflowerblue", name:"cornflower-blue", koname:"수레국화색"},
			{ variable:"mediumaquamarine", name:"medium-aquamarine", koname:"중간 옥색"},
			{ variable:"dimgrey", name:"dim-grey", koname:"흐린 회색"},
			{ variable:"slateblue", name:"slate-blue", koname:"감청색"},
			{ variable:"olivedrab", name:"olive-drab", koname:"암록색"},
			{ variable:"slategrey", name:"slate-grey", koname:"청회색"},
			{ variable:"lightslategrey", name:"light slate-grey", koname:"연한 청회색"},
			{ variable:"mediumslateblue", name:"medium slate-blue", koname:"중간 청회색"},
			{ variable:"lawngreen", name:"lawn-green", koname:"잔디색"},
			{ variable:"aquamarine", name:"aquamarine", koname:"옥색"},
			{ variable:"chartreuse", name:"chartreuse", koname:"연두색"},
			{ variable:"omengrey", name:"grey", koname:"회색"},
			{ variable:"maroon", name:"maroon", koname:"고동색"},
			{ variable:"olive", name:"olive", koname:"올리브색"},
			{ variable:"omenpurple", name:"purple", koname:"보라색"},
			{ variable:"lightskyblue", name:"light sky-blue", koname:"연한 하늘색"},
			{ variable:"skyblue", name:"sky-blue", koname:"하늘색"},
			{ variable:"blueviolet", name:"blue-violet", koname:"남보라색"},
			{ variable:"darkmagenta", name:"dark magenta", koname:"짙은 자홍색"},
			{ variable:"darkred", name:"dark red", koname:"짙은 빨간색"},
			{ variable:"saddlebrown", name:"saddle-brown", koname:"가죽 갈색"},
			{ variable:"darkseagreen", name:"dark sea-green", koname:"짙은 해록색"},
			{ variable:"omenlightgreen", name:"light green", koname:"연한 초록색"},
			{ variable:"mediumpurple", name:"medium purple", koname:"중간 보라색"},
			{ variable:"darkviolet", name:"dark violet", koname:"짙은 자주색"},
			{ variable:"palegreen", name:"pale green", koname:"옅은 초록색"},
			{ variable:"darkorchid", name:"dark orchid", koname:"짙은 난초색"},
			{ variable:"yellowgreen", name:"yellow-green", koname:"황록색"},
			{ variable:"sienna", name:"sienna", koname:"적갈색"},
			{ variable:"brown", name:"brown", koname:"갈색"},
			{ variable:"darkgrey", name:"dark grey", koname:"짙은 회색"},
			{ variable:"greenyellow", name:"green-yellow", koname:"녹황색"},
			{ variable:"omenlightblue", name:"light blue", koname:"연한 파란색"},
			{ variable:"paleturquoise", name:"pale turquoise", koname:"옅은 터키색"},
			{ variable:"lightsteelblue", name:"light steel-blue", koname:"연한 강청색"},
			{ variable:"powderblue", name:"powderblue", koname:"연파랑색"},
			{ variable:"firebrick", name:"firebrick", koname:"벽돌색"},
			{ variable:"darkgoldenrod", name:"dark golden-rod", koname:"짙은 선황색"},
			{ variable:"mediumorchid", name:"orchid", koname:"난초색"},
			{ variable:"rosybrown", name:"rosy-brown", koname:"회적색"},
			{ variable:"darkkhaki", name:"dark khaki", koname:"짙은 카키색"},
			{ variable:"silver", name:"silver", koname:"은색"},
			{ variable:"mediumvioletred", name:"violet-red", koname:"적보라색"},
			{ variable:"indianred", name:"indian-red", koname:"검붉은색"},
			{ variable:"peru", name:"peru-orange", koname:"페루 오렌지색"},
			{ variable:"chocolate", name:"chocolate", koname:"초콜렛색"},
			{ variable:"tan", name:"tan", koname:"황갈색"},
			{ variable:"omenlightgrey", name:"light grey", koname:"연한 회색"},
			{ variable:"thistle", name:"thistle", koname:"엉겅퀴색"},
			{ variable:"goldenrod", name:"orange-golden", koname:"골든 오렌지색"},
			{ variable:"orchid", name:"orchid", koname:"난초색"},
			{ variable:"palevioletred", name:"pale violet-red", koname:"옅은 적보라색"},
			{ variable:"crimson", name:"crimson", koname:"진홍색"},
			{ variable:"gainsboro", name:"gainsboro", koname:"게인스보로색"},
			{ variable:"plum", name:"plum", koname:"자두색"},
			{ variable:"burlywood", name:"burlywood", koname:"벌리우드색"},
			{ variable:"lightcyan", name:"light cyan", koname:"연한 비취색"},
			{ variable:"lavender", name:"lavender", koname:"라벤더색"},
			{ variable:"darksalmon", name:"dark salmon", koname:"짙은 연어색"},
			{ variable:"palegoldenrod", name:"pale golden-rod", koname:"옅은 선황색"},
			{ variable:"violet", name:"violet", koname:"자주색"},
			{ variable:"azure", name:"azure", koname:"바다색"},
			{ variable:"honeydew", name:"honey dew", koname:"멜론색"},
			{ variable:"khaki", name:"khaki", koname:"카키색"},
			{ variable:"lightcoral", name:"light coral", koname:"연한 산호색"},
			{ variable:"sandybrown", name:"sandy brown", koname:"모래빛 갈색"},
			{ variable:"beige", name:"beige", koname:"베이지색"},
			{ variable:"mintcream", name:"mint cream", koname:"민트색"},
			{ variable:"wheat", name:"wheat", koname:"밀색"},
			{ variable:"whitesmoke", name:"white smoke", koname:"하얀 연기색"},
			{ variable:"ghostwhite", name:"ghost white", koname:"옅은 흰색"},
			{ variable:"lightgoldenrodyellow", name:"light yellow", koname:"연한 노란색"},
			{ variable:"linen", name:"linen", koname:"린넨색"},
			{ variable:"salmon", name:"salmon", koname:"연어색"},
			{ variable:"oldlace", name:"oldlace", koname:"올드레이스색"},
			{ variable:"bisque", name:"bisque", koname:"비스크색"},
			{ variable:"blanchedalmond", name:"blanche almond", koname:"블렌치드 아몬드색"},
			{ variable:"coral", name:"coral", koname:"산호색"},
			{ variable:"cornsilk", name:"corn-silk", koname:"콘실크색"},
			{ variable:"darkorange", name:"dark orange", koname:"짙은 주황색"},
			{ variable:"deeppink", name:"deep pink", koname:"짙은 분홍색"},
			{ variable:"floralwhite", name:"floral white", koname:"플로랄 화이트색"},
			{ variable:"fuchsia", name:"fuchsia", koname:"푸크시아색"},
			{ variable:"gold", name:"gold", koname:"금색"},
			{ variable:"hotpink", name:"hot pink", koname:"핫핑크색"},
			{ variable:"ivory", name:"ivory", koname:"아이보리색"},
			{ variable:"lavenderblush", name:"lavender blush", koname:"라벤더 블러쉬색"},
			{ variable:"lemonchiffon", name:"lemon chiffon", koname:"레몬 시폰색"},
			{ variable:"lightpink", name:"light pink", koname:"연한 핑크색"},
			{ variable:"lightsalmon", name:"light salmon", koname:"연한 연어색"},
			{ variable:"lightyellow", name:"pale yellow", koname:"옅은 노란색"},
			{ variable:"mistyrose", name:"misty rose", koname:"옅은 장미색"},
			{ variable:"moccasin", name:"moccasin", koname:"모카신색"},
			{ variable:"navajowhite", name:"navajo white", koname:"나바호 백색"},
			{ variable:"orange", name:"orange", koname:"주황색"},
			{ variable:"orangered", name:"orange-red", koname:"다홍색"},
			{ variable:"papayawhip", name:"papaya whip", koname:"파파야윕색"},
			{ variable:"peachpuff", name:"peachpuff", koname:"피치퍼프색"},
			{ variable:"omenpink", name:"pink", koname:"분홍색"},
			{ variable:"omenred", name:"red", koname:"빨간색"},
			{ variable:"seashell", name:"seashell", koname:"조개색"},
			{ variable:"snow", name:"snow", koname:"스노우색"},
			{ variable:"tomato", name:"tomato", koname:"토마토색"},
			{ variable:"white", name:"white", koname:"흰색"},
			{ variable:"yellow", name:"yellow", koname:"노란색"},
		];
	}
}
window.trinit_colorList2 = trinit_colorList2;