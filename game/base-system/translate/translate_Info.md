대부분의 결과물은 _trResult에 저장함
조사를 분리하여 저장하는 경우 _trPost에 저장함


#폴더
*(.twee)파일
    *메크로




-----------------
# Clothes

* trClothes
    ```
    <<trClothes>>
        <<trClothes *part *clothes_name>>
        <<trClothes *part *clothes_name *name post "sep">>
        <<trClothes *part *clothes_name *[desc | description]>>

        옷의 이름이나 설명을 번역한다.
		butt_plug 도 여기서 번역될 수 있다. (내부적으로 sextoyPost 를 불러옴)

        필수사항
        - *part: 착용 부위
        - *clothes_name: 옷의 이름
        - *name: 옷의 이름을 출력한다.
        - *desc , description: 옷의 설명을 출력한다.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trClothes *upper "sundress">>                                 //  "선드레스"
        <<trClothes "upper" "sundress" "name" "을" "sep">>              //  _trResult: "선드레스", _trPost: "를"
        <<trClothes "upper" "sundress" "desc">>                         //  "뛰어 놀기에 좋다."
    ```

    ```
    <<trSearchClothes>>
        <<trSearchClothes *clothes_name>>
        <<trSearchClothes *clothes_name *name post "sep">>
        <<trSearchClothes *clothes_name *[desc | description]>>

        
        옷 타입의 지정 없이 번역한다.
        +모든 항목과 대조한다.

        필수사항
        - *clothes_name: 옷의 이름
        - *name: 옷의 이름을 출력한다.
        - *desc , description: 옷의 설명을 출력한다.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trSearchClothes "sundress">>                                  //  "선드레스"
        <<trSearchClothes "sundress" "name" "을" "sep">>                //  _trResult: "선드레스", _trPost: "를"
        <<trSearchClothes "sundress" "desc">>                           //  "뛰어 놀기에 좋다."
    ```

    ```
    <<trNpcClothes>>
        <<trNpcClothes *part *[clothes_name|npcnum]>>
        <<trNpcClothes *part *[clothes_name|npcnum] post "sep">>

        trClothes 의 NPC 버전. 옷의 이름이나 설명을 번역한다.


        필수사항
        - *part: 착용 부위 ("upper"/"lower"), 세트("set"), 혹은 전체에서 검색 ("all")
        - *clothes_name: 옷의 이름 혹은 세트명 혹은 세트의 설명
		- *npcnum: NPC의 $NPCList 번호

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

		NOTE: npcnum 을 사용할 때는 다음과 같이 사용한다.
		(원문) <<print setup.npcClothesSets.find(item => item.name === $NPCList[0].clothes.set).clothes["lower"].name>>
		(번역문) <<trNpcClothes "lower" 0 "을">>_trResult
		
        e.g.
        <<trNpcClothes "lower" "skirt">>_trResult                                 //  "스커트"
        <<trNpcClothes "set" "shirt and trousers" "을" "sep">>              //  _trResult: "셔츠와 바지", _trPost: "를"
    ```

    ```
	trIntegrityKeyword()
		옷의 해어진 상태를 번역한다.
		 
		 이것은 window.integrityKeyword (base.js) 의 한글 대용 버전이며
		 function integrityWord() (base.js) 에서 integrityKeyword 대신 사용됩니다.

    ```


* trClothesType
    ```
    <<trClothesType>>
        <<trClothesType *clothesType post>>

        옷의 타입을 번역한다.

        필수사항
        - *clothesType: 옷의 타입
        
        선택사항
        - post: 번역결과 뒤에 해당 조사를 붙인다.

        e.g.
        <<trClothesType "upper">>               //  "상의"
    ```

* trClothingTrait
    ```
    <<trClothingTrait>>
        <<trClothingTrait *clothingTrait>>

        옷의 특성을 번역한다.

        필수사항
        - *clothingTrait: 옷의 특성

        e.g.
        <<trClothingTrait "holy">>               //  "신성함"
    ```

* trWardrobeName
    ```
    <<trWardrobeName>>
        <<trWardrobeName *wardrobename post sep>>

        옷장 이름을 번역한다.

        필수사항
        - *wardrobename: 옷장 이름

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trWardrobeName "Beach Changing Room wardrobe">>               //  "해변 탈의실 옷장"
    ```

-----------------
# Creature

* trCreature
    ```
	<<trCreature>>
		<<trCreature *type *name [num] post "sep">>
		
		생물체를 번역한다.
		
		필수사항
		- *type: 생물체 타입 ("parasite", "swarm", "struggle", "tentacle", "vore"  등. 모든 리스트는 trCreature.twee 참조. "all" 로 하면 모든 생물체에서 찾는다. 생략하면 "all")
		- *name: 생물체 이름/종류명 (생략 불가)
		
        선택사항
		- num: 생물체 숫자
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.
		
        e.g.
        <<trCreature "parasite" "urchin" '을'>>_trResult               // '성게형 기생충을'
    ```

* trParasite
    ```
    <<trParasite>>
        <<trParasite *parasite post "sep">>

        기생충을 번역한다. <<trCreature "parasite">> 와 동일.

        필수사항
        - *parasite: 기생충 이름

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trParasite "urchin" '을'>>_trResult               // '성게형 기생충을'
    ```

    ```
    <<trChastityParasite>>
        <<trChastityParasite *parasite post "sep">>

        정조대 안의 기생충을 번역한다. <<trCreature "chastityparasite">> 와 동일.
		
		+ <<trParasite>>와 용도 및 방식 같음. 생략
    ```

* trStruggle
    ```
    <<trStruggle>>
        <<trStruggle *creature post "sep">>

        struggle creature (럴커, 벌레 등)을 번역한다. <<trCreature "struggle">> 와 동일.
		
		+ <<trParasite>>와 용도 및 방식 같음. 생략
    ```

* trSwarm
    ```
    <<trSwarm>>
        <<trSwarm *swarm post "sep">>

        swarm (떼. 장어, 물고기 등)을 번역한다. <<trCreature "swarm">> 와 동일.
		
		+ <<trParasite>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<trSwarmAction>>
        <<trSwarmAction *action>>

        swarm (떼. 장어, 물고기 등) 및 주인공의 움직임을 번역한다.
		
		필수사항
		- *action: swarm 혹은 주인공의 움직임

        e.g.
        <<trSwarmAction "moving towards you">>_trResult               // '당신에게로 다가온다"
    ```

* trVore
    ```
    <<trVore>>
        <<trVore *voretype post "sep">>

        보어 종류명을 번역한다.  <<trCreature "vore">> 와 동일.

		+ <<trParasite>>와 용도 및 방식 같음. 생략
    ```

* trTentacle
    ```
    <<trTentacle>>
        <<trTentacle *tentacledesc post "sep">>

        촉수의 상세를 번역한다. <<trCreature "tentacle">>_trResult 와 동일.
        # 주의: 바로 출력하기 때문에 _trResult를 사용하지 않음 (기존의 trTentacle 과 호환)

        필수사항
        - tentacledesc: 촉수의 상세

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        주의점
		- tentacledesc 에 ~ tentacle 이 들어있으면 "촉수" 가 붙음
		- tentacledesc 에 ~ tentacle 이 없으면 "촉수" 가 붙지 않음
		- 단, ~ tentacle 이 없더라도 조사가 붙으면 "촉수" 가 붙음

        e.g.
        $tentacles[_i].fullDesc = "narrow tentacle"
		$tentacles[_i].desc = "narrow"
		<<trTentacle $tentacles[_i].fullDesc>>              //"가느다란 촉수"
        <<trTentacle $tentacles[_i].fullDesc "을">>              //"가느다란 촉수를"
		<<trTentacle $tentacles[_i].desc>>              //"가느다란"
        <<trTentacle $tentacles[_i].desc "을">>              //"가느다란 촉수를"
    ```


-----------------
# Post
    + ~Post 계열은 바로 출력하기 때문에 _trResult를 사용하지 않음

* trBeasttypeFun
    ```
    <<trBeasttypeFun>>
        <<trBeasttypeFun *typename post "sep">>

            <<beasttypePost>>의 실제 종족명 번역 위젯. Post 계열이 아니므로 _trResult 필요.
        
        필수사항
        - typename: 종족명

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trBeasttypeFun "dog" "을">>_trResult                     // 개를
    ```

* beasttypePost
    ```
    <<beasttypePost>>
        <<beasttypePost [num] post "sep">>

            <<beasttype>>의 대체 위젯. 조사를 붙일 수 있다.
        

            선택사항
            - num: 원본 매크로에 사용되는 인수값.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

            e.g.
            <<beasttypePost 1 "을">>                            //<<beasttypePost 1>>을
            <<beasttypePost "을">>                              //<<beasttypePost>>을
    ```

     ```
    <<beastspluralPost>>
        <<beastspluralPost post "sep">>

            <<beastsplural>>의 대체 위젯. 조사를 붙일 수 있다.
        

            선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

            e.g.
            <<beastsplural "을">>                               //<<beastsplural>>을
    ```


* bodyPost
    ```
    <<breastsPost>>
        <<breastsPost post "sep">>

        <<breasts>>의 대체 위젯. 조사를 붙일 수 있다.
       

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<breastsPost "을">>                //<<breasts>>을
    ```

    ```
    <<bellyDescriptionPost>>
        <<bellyDescriptionPost *["pc"|npc|size] [force] post "sep">>

        <<bellyDescription>>의 대체 위젯. 배의 상태를 표시한다. 조사를 붙일 수 있다.
		
		필수사항
		    - *["pc"|npc|size]: 배의 소유자. 원본 매크로에 사용되는 인수값. pc 혹은 npc명 혹은 크기(숫자).
        
        선택사항
		    - force: 임신 상태에 상관없이 강제로 임신한 배 상태로 표시한다. 원본 매크로에 사용되는 인수값.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.


        <<bellyDescriptionPost "pc" "을">>               // 임신한 배를
    ```

    ```
    <<chestPost>>
	     <<chest>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<chestsimplePost>>
	     <<chestsimple>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nipplePost>>
	     <<nipple>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nipplesPost>>
	     <<nipples>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<bottomPost>>
        <<bottomPost [pluck] post "sep">>

	     <<bottom>>의 대체 위젯. <<bottomsPost>> 와는 다르므로 주의.

        선택사항
        - pluck: 원본 매크로에 사용되는 인수값.
        - post: 조사
        - sep: 조사를 분리하여 저장한다.
    ```

    ```
    <<pussyPost>>
        <<pussyPost [nosens] [pluck] post "sep">>

	     <<pussy>>의 대체 위젯.

        선택사항
        - nosens: 원본 매크로에 사용되는 인수값.
        - pluck: 원본 매크로에 사용되는 인수값.
        - post: 조사
        - sep: 조사를 분리하여 저장한다.
    ```

    ```
    <<genitalsPost>>
        <<genitalsPost [num] [pluck] post "sep">>

        <<genitals>>의 대체 위젯. 조사를 붙일 수 있다.

        선택사항
        - num: 원본 매크로에 사용되는 인수값.
		- pluck: 원본 매크로에 사용되는 인수값.
        - post: 조사
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<genitalsPost 1 "이">>                 //<<genitals 1>>이
        <<genitalsPost "이">>                   //<<genitals>>이
    ```

    ```
    <<genitalsandbreastsPost>>
	     <<genitalsandbreasts>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<clitPost>>
	     <<clit>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<penisPost>>
	     <<penis>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<penisSimplePost>>
	     <<penisSimple>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<glansPost>>
	     <<glans>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<testiclesPost>>
	     <<testicles>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<testiclePost>>
	     <<testicle>>의 대체 위젯.
        + <<breastsPost>>와 용도 및 방식 같음. 생략
    ```

    ```
	<<handPost>>
        <<handPost ["left"|"right"|"both"] post "sep">>

        왼손/오른손 표시를 쉽게 하기 위해 추가. 조사를 붙일 수 있다.

        선택사항
        - ["left"|"right"|"both"]: 왼손/오른손/양손, 없으면 그냥 손.
        - post: 조사
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<handPost "left" "이">>                 // 왼손이
        <<handPost "을">>                 // 손을
    ```

    ```
    <<mouthPost>>
	     <<mouth>>의 대체 위젯.
        + <<mouthPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<npcPenisPost>>
        <<npcPenisPost [num] post "sep">>

        <<npcPenis>>의 대체 위젯. 조사를 붙일 수 있다.

        선택사항
        - num: 원본 매크로에 사용되는 인수값.
        - post: 조사
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<npcPenisPost 1 "이">>                 //<<npcPenis 1>>이
        <<npcPenisPost "이">>                   //<<npcPenis>>이
    ```

    ```
    <<npcPenisSimplePost>>
        <<npcPenisSimple>>의 대체 위젯.
        + <<npcPenisPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<npcPenisColoredPost>>
        <<npcPenisColored>>의 대체 위젯.
        + <<npcPenisPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<npcVaginaPost>>
        <<npcVagina>>의 대체 위젯.
        + <<npcPenisPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<npcAnusPost>>
        <<npcAnus>>의 대체 위젯.
        + <<npcPenisPost>>와 용도 및 방식 같음. 생략
    ```

     ```
    <<npcGenitalsPost>>
        <<npcGenitalsPost [num] ["simple"] post "sep">>

        <<npcGenitals>>의 대체 위젯. 조사를 붙일 수 있다.

        선택사항
        - num: 원본 매크로에 사용되는 인수값.
		- simple: 원본 매크로에 사용되는 인수값. npcSimple~ 계열로 동작한다.
        - post: 조사
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<npcGenitalsPost 1 "이">>                 //<<npcGenitalsPost 1>>이
        <<npcGenitalsPost "이">>                   //<<npcGenitalsPost>>이
    ```

    ```
    <<npcChestPost>>
        <<npcChest>>의 대체 위젯.
        + <<npcPenisPost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<body_size_textPost>>
        <<body_size_textPost post "sep">>
        
        <<body_size_text>>의 대체 위젯. 조사를 붙일 수 있다.
        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<body_size_textPost "을">>               // 조그마한 신체를
    ```

* childPost
    ```
    <<childnamePost>>
        <<childnamePost [id] post "sep">>

        <<childname>>의 대체 위젯. 조사를 붙일 수 있다.


        선택사항
		- id: 아이의 id. 원본 매크로에 사용되는 인수값.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<childnamePost "을">>               //<<childname>>을
    ```

    ```
    <<childrenNamesPost>>
        <<childrenNamesPost *names post "sep">>

        <<childrenNames>>의 대체 위젯. 조사를 붙일 수 있다.

        필수사항
		- *names: 아이 이름 배열. 원본 매크로에 사용되는 인수값.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<childNamesPost _names "을">>               //<<childNames _names>>을
    ```

   ```
    <<childHePost>>
        <<childHe>>의 대체 위젯. <<childhePost>>, <<childHisPost>>, <<childhisPost>>, <<childHimPost>>, <<childhimPost>>로도 쓸 수 있다.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<childHersPost>>
        <<childHers>>의 대체 위젯. <<childhersPost>>로도 쓸 수 있다.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<childherselfPost>>
        <<childherself>>의 대체 위젯.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<childhandPost>>
        <<childhand>>의 대체 위젯.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<childhandsPost>>
        <<childhands>>의 대체 위젯.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<childhairPost>>
        <<childhair>>의 대체 위젯.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<childtypePost>>
        <<childtype>>의 대체 위젯.
        + <<childnamePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<childtoyPost>>
        <<childtoyPost *location *toyid [option] post "sep">>

        <<childtoy>>의 대체 위젯. 조사를 붙일 수 있다.

        필수사항
		- *location: 장난감 위치. 원본 매크로에 사용되는 인수값.
		- *toyid: 장난감 id 혹은 이름. 원본 매크로에 사용되는 인수값.

        선택사항
		- option: 표시 옵션. 원본 매크로에 사용되는 인수값.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<childtoyPost _location _id "을">>               //<<childtoy _location _id>>을
    ```

    ```
    <<pregnancyBabyTextPost>>
        <<pregnancyBabyTextPost [id] post "sep">>

        <<pregnancyBabyText>>의 대체 위젯. 조사를 붙일 수 있다.


        선택사항
		- id: 아이를 임신한 주체의 id. 원본 매크로에 사용되는 인수값.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<pregnancyBabyTextPost 'pc' "을">>               // 아기를
    ```

* clothesPost
    ```
    <<undertopPost>>
        <<undertopPost post "sep">>

        <<undertop>>의 대체 위젯. 조사를 붙일 수 있다.


        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<undertopPost "을">>               //<<undertop>>을
    ```

    ```
    <<groinPost>>
        <<groin>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<crotchPost>>
        <<crotch>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<undiesPost>>
        <<undies>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<bottomsPost>>
        <<bottoms>>의 대체 위젯. <<bottomPost>> 와 다르니 주의.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<underbottomsPost>>
        <<underbottoms>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<topPost>>
        <<top>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<topasidePost>>
        <<topaside>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<breastsasidePost>>
        <<breastsaside>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<bottomasidePost>>
        <<bottomaside>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<outfitPost>>
        <<outfit>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<underoutfitPost>>
        <<underoutfit>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<lewdnessPost>>
        <<lewdness>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nudityPost>>
        <<nudity>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 다만, 문장의 매끄러운 처리를 위해 <<nudityPostend>>를 문장의 끝에 붙여야 한다.
    ```

    ```
    <<nudityPostend>>
        + <<nudityPost>>가 사용된 문장의 끝에 붙여야하는 매크로.

        e.g.
        당신은 당신의 <<nudityPost "을">> 의식한다.<<nudityPostend>>
    ```

    ```
    <<allTopsPost>>
        <<allTops>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<allBottomsPost>>
        <<allBottoms>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<allTopsUnderwearPost>>
        <<allTopsUnderwear>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<allBottomsUnderwearPost>>
         <<allBottomsUnderwear>>의 대체 위젯.
       + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<exposedupperPost>>
        <<exposedupper>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<exposedlowerPost>>
        <<exposedunder>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<dressPost>>
        <<dress>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<skirtPost>>
        <<skirt>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<pantiesPost>>
        <<panties>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<braPost>>
        <<bra>>의 대체 위젯.
        + <<undertopPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<npcClothesTextPost>>
        <<npcClothesTextPost *NpcObject *part post "sep">>
        
        <<npcClothesText>>의 대체 위젯. 조사를 붙일 수 있다.

        필수사항
		- NpcObject: 원본 매크로의 인수값인 npc 객체. 보통 $NPCList[_n] 같은 식으로 들어간다.
		- part: 옷의 부위. "both", "upper", "lower" 중 하나.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<npcClothesTextPost $NPCList[_n] "upper" "을">>               // 티셔츠를
    ```


* EasyPost
	```
		+ 맨 마지막에 설명함. 하단 참조.
	```

* HePost
    ```
    <<HePost>>
        <<HePost [num] post "sep">>
        
        <<He>>의 대체 위젯. 조사를 붙일 수 있다.
        + <<hePost>> , <<ShePost>>, <<shePost>>, <<hisPost>>, <<HisPost>>, <<HerPost>>, <<herPost>>,
		+ <<HimPost>>, <<himPost>>, <<HesPost>>, <<hesPost>> 등도 사용할 수 있음.

        선택사항
        - num: 원본 매크로에 사용되는 인수값.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<HePost 1 "을">>               // <<He 1>>을 | <<He 1>>를
        <<HePost "을">>                 // <<He>>을 | <<He>>를
    ```

    ```
    <<HimselfPost>>
        <<Himself>>의 대체 위젯. <<himselfPost>> 도 사용할 수 있음.
        + <<HePost>>와 용도 및 방식 같음. 생략

        e.g.
        <<HimselfPost "을">>               //  그 자신을

    ```

    ```
    <<HersPost>>
        <<Hers>>의 대체 위젯. <<hersPost>> 도 사용할 수 있음.
		영어에서 남성의 소유대명사가 his로 같기 때문에 hers 를 소유대명사로 사용
        + <<HePost>>와 용도 및 방식 같음. 생략

        e.g.
        <<HersPost "을">>               //  그녀의 것을

    ```

    ```
    <<He_ShortPost>>
        <<He_Short>>의 대체 위젯.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<bHePost>>
        <<bHePost [num] post "sep">>
        
        <<bHe>>의 대체 위젯. <<HePost>>의 짐승 버전. 조사를 붙일 수 있다.
        + <<bhePost>>, <<bHisPost>>, <<bhisPost>>, <<bHimPost>>, <<bhimPost>>등도 사용할 수 있음.

        선택사항
        - num: 원본 매크로에 사용되는 인수값.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<bHePost 1 "을">>               // <<bHe 1>>을
        <<bHePost "을">>                 // <<bHe>>을
    ```

    ```
    <<bHimselfPost>>
        <<bHimself>>의 대체 위젯. <<bhimselfPost>> 도 사용할 수 있음. <<himselfPost>>의 짐승 버전.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<bHersPost>>
        <<bHers>>의 대체 위젯. <<bhersPost>> 도 사용할 수 있음.
		영어에서 남성의 소유대명사가 his로 같기 때문에 hers 를 소유대명사로 사용
        + <<bHePost>>와 용도 및 방식 같음. 생략

        e.g.
        <<bHersPost "을">>               //  그녀의 것을

    ```

    ```
    <<pShePost>>
        <<pShePost post "sep">>
        
        <<pShe>>의 대체 위젯. <<HePost>> 의 플레이어 버전. 조사를 붙일 수 있다.
        + <<pshePost>> , <<pHerPost>>, <<pherPost>>, <<phimPost>>, <<pHimPost>>, 
		<<pShesPost>>, <<pshesPost>>등도 사용할 수 있음.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<pShePost "을">>               // <<pShe>>을 | <<pShe>>를
    ```

   ```
    <<pHerselfPost>>
        <<pHerself>>의 대체 위젯. <<pherselfPost>> 도 사용할 수 있음. <<himselfPost>>의 플레이어 버전.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<phersPost>>
        <<phers>>의 대체 위젯. <<hersPost>>의 플레이어 버전.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<psirPost>>
        <<psir>>의 대체 위젯. <<pSirPost>> 도 사용할 수 있음. <<sirPost>>의 플레이어 버전.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<pmotherPost>>
        <<pmother>>의 대체 위젯. <<pMotherPost>> 도 사용할 수 있음. <<FatherPost>>의 플레이어 버전.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<ohePost>>
        <<ohe>>의 대체 위젯.
        + <<pShePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<hisselectPost>>
	     <<hisselectPost *num post sep>>

        <<hisselect>>의 대체 위젯. <<personselect *num>><<hisPost>>와 동일

        필수사항
		- num: <<hisselect>> 의 인수

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.
        + <<HePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<his1Post>>
        <<his1Post post "sep">>

        <<his1>>의 대체 위젯. 조사를 붙일 수 있다. <<person1>><<hisPost>>와 동일
        + <<his1Post>>부터 <<his6Post>>까지 사용할 수 있음.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<his1Post "의">>               // <<his1>>의
    ```

    ```
    <<farm_HePost>>
        <<farm_HePost num post "sep">>
        
        <<farm_He>>의 대체 위젯. 조사를 붙일 수 있다.
        + <<farm_hePost>> , <<farm_himPost>>, <<farm_hisPost>>등도 사용할 수 있음.
        필수사항
        - num: 원본 매크로에 사용되는 인수값.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<farm_HePost 1 "을">>               // <<farm_He 1>>을
    ```

    ```
    <<nnpc_HePost>>
        <<nnpc_HePost namedNPC post "sep">>
        
        <<nnpc_He>>의 대체 위젯. 조사를 붙일 수 있다.
        + <<nnpc_hePost>> , <<nnpc_himPost>>, <<nnpc_hisPost>>등도 사용할 수 있음.
        필수사항
        - namedNPC: 네임드 NPC.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<nnpc_HePost "Avery" "을">>               // <<nnpc_He "Avery">>을
    ```

    ```
    <<nnpc_wifePost>>
        <<nnpc_wifePost namedNPC post "sep">>
        
        <<nnpc_wife>>의 대체 위젯. 조사를 붙일 수 있다. 

        필수사항
        - namedNPC: 네임드 NPC.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<nnpc_wifePost "Avery" "을">>               // <<nnpc_wife "Avery">>을
    ```

    ```
    <<nnpc_lassPost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nnpc_genderPost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nnpc_genderyPost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nnpc_genitalsPost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nnpc_girlfriendPost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<nnpc_brotherPost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략 <<nnpc_BrotherPost>> 도 사용 가능.
    ```

    ```
    <<nnpc_titlePost>>
        + <<nnpc_wifePost>>와 용도 및 방식 같음. 생략 <<nnpc_TitlePost>> 도 사용 가능.
    ```

* kylarPost
	카일라 관련 Post 시리즈

   ```
    <<kylar_pet_namePost>>
        <<kylar_pet_namePost [cap] post "sep">>

       <<kylar_pet_name>>의 대체 위젯. 조사를 붙일 수 있다. 
        
        선택사항
			- cap: 원본 매크로의 인수. 대문자 표시용
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<kylar_pet_namePost "을">>               // <<kylar_pet_name>>을
    ```
     
    ```
    <<kylarClothesPost>>
        <<kylarClothesPost *part *clothes_name post "sep">>

       <<trNpcClothes>>에 카일라의 속옷 번역을 추가하고 ~Post 형식으로 작동하는 버전. 카일라 속옷은 (overworld-town/special-kylar/main.twee)의 <<kylarRandomUnderwear>> 에서 생성됨.

       필수사항
        - *part: 착용 부위 ("upper"/"lower"), 세트("set"), 속옷("underwear", "undies", "under_lower") 혹은 전체에서 검색 ("all")
        - *clothes_name: 옷의 이름 혹은 세트명 혹은 세트의 설명
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<kylarClothesPost "undies" "pink panties" "을">>               // 핑크 팬티를
    ```

* otherPost
    ```
    <<charlesPost>>
        <<charlesPost post "sep">>

        <<charles>>의 대체 위젯. 조사를 붙일 수 있다.
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<charlesPost "을">>               // <<charles>>을
    ```

    ```
    <<aPost>>
        <<a>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<theownerPost>>
        <<theowner>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<someonePost>>
        <<someone>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<someonesPost>>
        <<someones>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<theirPost>>
        <<their>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<spousePost>>
        <<spouse>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<fatherPost>>
        <<father>>의 대체 위젯. <<FatherPost>> 로도 사용 가능.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<mummyPost>>
        <<mummy>>의 대체 위젯. <<MummyPost>> 로도 사용 가능.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<actorPost>>
        <<actor>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<girlPost>>
        <<girl>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<girlsPost>>
        <<girls>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<girlfriendPost>>
        <<girlfriend>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<wifePost>>
        <<wife>>의 대체 위젯. <<WifePost>> 로도 사용가능.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<victimgirlPost>>
         <<victimgirl>>의 대체 위젯.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<victimgirlsPost>>
        <<victimgirls>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<lassPost>>
        <<lass>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<genderPost>>
        <<gender>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<gender_posturePost>>
        <<gender_posture>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<bitchPost>>
        <<bitch>>의 대체 위젯. <<whorePost>> 로도 사용가능.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<slutPost>>
        <<slut>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<semenPost>>
        <<semen>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<prostatePost>>
        <<prostate>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<personpenisPost>>
        <<personpenis>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<walletPost>>
        <<wallet>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<sirPost>>
        <<sir>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<monkPost>>
        <<monk>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<monksPost>>
        <<monks>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<monks_and_nunsPost>>
        <<monks_and_nuns>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<priestPost>>
        <<priest>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<priestsPost>>
        <<priests>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<farm_text_manyPost>>
        <<farm_text_manyPost [type] post "sep">>

        <<farm_text_many>>의 대체 위젯. 조사를 붙일 수 있다.
        
        선택사항
            - type: 원본 매크로에 사용되는 인수값.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<farm_text_manyPost "dog" "을">>               // <<farm_text_manyPost "dog">>을
    ```

    ```
    <<farm_textPost>>
        <<farm_text>>의 대체 위젯.
        + <<farm_text_manyPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<MasterPost>>
        <<Master>>의 대체 위젯. <<masterPost>>로도 사용가능.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<daughterPost>>
        <<daughter>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<malePost>>
        <<male>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<daylight>>
        <<daylight>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<ppackbrotherPost>>
        <<ppackbrother>>의 대체 위젯. <<pPackbrotherPost>>, <<ppackbrothersPost>>, <<pPackbrothersPost>>로도 사용가능.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<pheatPost>>
        <<pheat>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<wolf_cave_pluralPost>>
        <<wolf_cave_plural>>의 대체 위젯.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<wolf_cave_singularPost>>
		<<wolf_cave_singularPost [pronoun] post "sep">>
        <<wolf_cave_singular>>의 대체 위젯. 조사를 붙일 수 있다.
        
        선택사항
            - pronoun: 원본 매크로에 사용되는 인수값.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<wolf_cave_singular "f" "을">>               // 늑대 소녀를
    ```

    ```
    <<beast_jaws_textPost>>
        <<beast_jaws_text>>의 대체 위젯. <<beast_Jaws_textPost>>로도 사용가능.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```
    
    ```
    <<beast_teeth_textPost>>
        <<beast_teeth_text>>의 대체 위젯.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<handtoolPost>>
        <<handtoolPost *toolname post "sep">>

        손에 쥐고 있는 도구를 번역힌다. 조사를 붙일 수 있다.
		
		필수사항
		- *toolname: 도구 이름. 펜 등의 낙서도구, 아이섀도우, 마스카라, 염색약 등의 화장품, 섹스 장난감 (NPC사용) 등.
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.


        NOTE: NPC 가 들고 있는 섹스 장난감만을 번역한다. 플레이어용은 <<sextoyPost>> 참조.
        e.g.
        <<handtoolPost "pen" "을">>               // 펜을
    ```

    ```
    <<lefttoolPost>>
        <<leftoolPost *[num] post "sep">>

       특정 NPC 번호의 왼손에 쥐고 있는 도구를 번역힌다. 조사를 붙일 수 있다.
	   오른손 버전으로 <<righttoolPost>> 사용가능.
		
		필수사항
		- *num: NPC 객체 번호. <<lefttoolPost [num] post sep>> = <<handtoolPost $NPCList[num].lefttool post sep>>
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.


        NOTE: NPC 가 들고 있는 섹스 장난감만을 번역한다. 플레이어용은 <<sextoyPost>> 참조.
    ```
    
    ```
    <<underworld_nicknamePost>>
        <<underworld_nickname>>의 대체 위젯.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```
     
    ```
    <<overworld_nicknamePost>>
        <<overworld_nickname>>의 대체 위젯.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```
     
    ```
    <<pcpetnamePost>>
       <<pcpetnamePost [fromWho [mod]] post "sep">>

       <<pcpetname>>의 대체 위젯. 조사를 붙일 수 있다. <<pcPetnamePost>>로도 사용가능.
        
        선택사항
            - fromWho: 애칭을 말하는 사람. 원본 매크로에 사용되는 인수값.
            - mod: fromWho의 상태에 따라 사용되는 추가인수. 원본 매크로에 사용되는 인수값.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<pcpetnamePost "Wraith" "을">>               // <<pcpetname "Wraith">>을
    ```
     
    ```
    <<foxnicknamePost>>
       <<foxnickname>>의 대체 위젯.
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```
    
    ```
    <<tattooPost>>
       <<tattooPost *part post "sep">>

       <<tattoo>>의 대체 위젯. 조사를 붙일 수 있다.
		
		필수사항
		- *part: <<tattoo>> 의 인수. 몸의 부위.
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<tattooPost "forehead" "을">>               // <<tattoo "forehead">>을
    ```

   ```
    <<plant_detailsPost>>
        <<plant_detailsPost [arg] post "sep">>

        <<plant_details>>의 대체 위젯. 조사를 붙일 수 있다. <<Plant_detailsPost>>로도 사용가능.
        
        선택사항
            - arg: 원본 매크로에 사용되는 인수값.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<plant_detailsPost "forest" "을">>               // <<plant_details "forest">>을
    ```
 
    ```
    <<tower_creature_textPost>>
        + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<anusandButtPlugPost>>
        <<anusandButtPlugPost post "sep">>

        <<andButtPlug>>의 대체 위젯. 조사를 붙일 수 있다. 
		<<andButtPlug>> 앞에 anus 가 붙으면 anus<<andButtPlug>>의 anus까지 포함하여 <<anusandButtPlugPost>> 를 사용.
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<anusandButtPlugPost "을">>               // 항문과 항문 마개를
    ```

   ```
    <<bottomandButtPlugPost>>
        <<bottomandButtPlugPost post "sep">>

       <<andButtPlug>>의 대체 위젯. 조사를 붙일 수 있다. 
		<<andButtPlug>> 앞에 <<bottom>> 이 붙으면 <<bottom>><<andButtPlug>>의 <<bottom>>까지 포함하여 <<bottomandButtPlugPost>> 를 사용.
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<bottomandButtPlugPost "을">>               // <<bottomPost "과">> 항문 마개를
    ```

   ```
    <<pound_textPost>>
        <<pound_textPost post "sep">>

       <<pound_text>>의 대체 위젯. 조사를 붙일 수 있다. 
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<pound_textPost "을">>               // <<pound_text>>을
    ```

   ```
    <<virginPost>>
        virgin을 처녀/동정으로 나누어 번역하기 위해 추가. 성별에 따라 달리 표현해야 할 때만 사용할것.
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<getfluidsfromgroupPost>>
        <<getfluidsfromgroupPost *sexID post "sep">>

       <<getfluidsfromgroup>>의 대체 위젯. 조사를 붙일 수 있다. 
        
		필수사항
			- sexID: 액체의 생성자 ID. 원본 매크로의 인수.
		
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<getfluidsfromgroupPost _sexID "을">>               // 정액을
    ```

     ```
    <<bastardPost>>
        + <<bastard>>의 대체 위젯. <<charlesPost>>와 용도 및 방식 같음. 생략
    ```

   ```
    <<condomDescPost>>
        <<condomDescPost *["player"|npcID] [article] post "sep">>

       <<condomDesc>>의 대체 위젯. 조사를 붙일 수 있다. 
        
		필수사항
			- npcID: 사용하는 NPC의 ID, 혹은 player. 원본 매크로의 인수.
		
        선택사항
            - article: 관사(a, the) 혹은 it. 원본 매크로의 인수.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<condomDescPost _npcID "을">>               // 노란색 콘돔을
    ```

   ```
    <<office_managerPost>>
       + <<charlesPost>>와 용도 및 방식 같음. 생략
    ```


* personPost
    ```
    <<personPost>>
        <<personPost post "sep">>

        <<person>>의 대체 위젯. 조사를 붙일 수 있다.

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.
        
        e.g.
        <<personPost "을">>               // <<person>>을 | <<person>>를
    ```

    ```
    <<personsPost>>
        <<persons>>의 대체 위젯.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<personsimplePost>>
        <<personsimple>>의 대체 위젯.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<combatpersonPost>>
        <<combatperson>>의 대체 위젯. <<combatpersonsPost>>, <<combatPersonPost>>로도 사용가능.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<peoplePost>>
        <<people>>의 대체 위젯.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<peopleyPost>>
         <<peopley>>의 대체 위젯.
       + <<personPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<personyPost>>
        <<persony>>의 대체 위젯.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<groupPost>>
        <<group>>의 대체 위젯.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```


    ```
    <<fullGroupPost>>
        <<fullGroup>>의 대체 위젯.
        + <<fullGroup>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<enumeratedGroupPost>>
        <<enumeratedGroup>>의 대체 위젯.
        + <<personPost>>와 용도 및 방식 같음. 생략
    ```
* prisonPost
	교도소 관련 Post 시리즈. 위젯 원본은 overworld-town/loc-prison/widgets.twee 에 있으므로 해당 파일이 변경되면 확인할 것
    ```
	<<trPrisonPerson>>
		<<trPrisonPerson *id *role cap post 'sep'>>

        <<*_guardPost>> <<*_inmatePost>>의 기초 위젯. 조사를 붙일 수 있다.

		필수사항
		- id: NPC 객체번호. <<*_guard>> <<*_inmate>> 의 원래 옵션.
		- role: NPC 의 역할. "relaxed guard" 등.

		선택사항
		- cap: 대문자 표시 여부.  <<*_guard>> <<*_inmate>> 의 원래 옵션.
		- post: 번역 결과의 뒤에 조사를 붙인다.
		- sep: 조사를 분리하여 저장한다.

		e.g.
		<<trPrisonPerson 0 "relaxed guard" "이">>_trResult              // "너그러운 간수가"
    ```

    ```
    <<relaxed_guardPost>>
		<<relaxed_guardPost *id post sep>>
       <<relaxed_guard>>의 대체 위젯.

		필수사항
		- id: NPC 객체번호. <<*_guard>> <<*_inmate>> 의 원래 옵션.
		- role: NPC 의 역할. "relaxed guard" 등.

		선택사항
		- post: 번역 결과의 뒤에 조사를 붙인다.
		- sep: 조사를 분리하여 저장한다.

		e.g.
		<<relaxed_guardPost 0 "이">>              // "너그러운 간수가"
    ```

    ```
    <<anxious_guardPost>>
        <<anxious_guard>>의 대체 위젯.
        + <<relaxed_guardPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<veteran_guardPost>>
        <<veteran_guard>>의 대체 위젯.
        + <<relaxed_guardPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<methodical_guardPost>>
        <<methodical_guard>>의 대체 위젯.
        + <<relaxed_guardPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<tattooed_inmatePost>>
        <<tattooed_inmate>>의 대체 위젯.
        + <<relaxed_guardPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<scarred_inmatePost>>
        <<scarred_inmate>>의 대체 위젯.
        + <<relaxed_guardPost>>와 용도 및 방식 같음. 생략
    ```

* putpost
    ```
	<<putpost>>
		<<putpost *target *post 'sep'>>

		단어 뒤에 조사를 붙인다.
		+ 현재 잡다한 단어 번역에 전용되거나 어떤 단어에 간단하게 조사를 붙일 때 사용하고 있다.
		+ 현재 사용되는 단어들은 해당 파일의 _putpostList에 정의되어 있음.
		+ 그냥 target 에 한글과 post 에 조사를 넣으면 적절한 조사를 붙여주도록 되어 있다.

		필수사항
		- target: 조사를 붙일 대상
		- post: 번역 결과의 뒤에 조사를 붙인다.

		선택사항
		- sep: 조사를 분리하여 저장한다.

		e.g.
		<<putpost "man" "이">>              // "남자가"
    ```

* sextoyPost
    ```
	<<sextoyPost>>
		<<sextoyPost *name type post 'sep'>>

		섹스 장난감을 번역한다. 조사를 붙일 수 있다.

		필수사항
		- name: 장난감 이름

		선택사항
		- type: 표시할 내용. "name" - 이름, "desc" - 설명. 생략시 이름 표시.
		- post: 번역결과의 뒤에 조사를 붙인다.
		- sep: 조사를 분리하여 저장한다.

		NOTE: 플레이어가 소지한 장난감은 <<sextoyPost>>로 번역되고, 착용한 장난감은 strap-on은 <<trClothes "under_lower">>, butt plug는 <<trClothes "butt_plug">> 에서 번역됨.
		          NPC 가 손에 든 장난감은 <<handtoolPost>> 에서 번역되고 착용한 strap-on은 <<trPenisdesc>>에서 번역됨.
		e.g.
		<<sextoyPost "dildo" "name" "을">>              // "딜도를"
    ```

* sydneyPost
	시드니 관련 Post 시리즈. 위젯 원본은 overworld-town/special-sydney/widgets.twee 에 있으므로 해당 파일이 변경되면 확인할 것
	
    ```
	<<sydneyGenitalsPost>>
		<<sydneyGenitalsPost short post 'sep'>>

		<<sydneyGenitals>>의 대체 위젯. 조사를 붙일 수 있다.

		선택사항
		- short: 원본 매크로에 사용되는 인수값
		- post: 번역 결과의 뒤에 조사를 붙인다.
		- sep: 조사를 분리하여 저장한다.

		e.g.
		<<sydenyGenitals "이">>              // "자지가"
    ```
	
    ```
	<<sydneymumPost>>
		<<sydneymumPost post 'sep'>>

		<<sydneymum>>의 대체 위젯. 조사를 붙일 수 있다. <<sydneyMumPost>>로도 사용가능.

		선택사항
		- post: 번역 결과의 뒤에 조사를 붙인다.
		- sep: 조사를 분리하여 저장한다.

		e.g.
		<<sydneymumPost "이">>              // "엄마가"
    ```

    ```
    <<sydneymotherPost>>
        <<sydneymother>>의 대체 위젯. <<sydneyMotherPost>>로도 사용가능.
        + <<sydneymumPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<sydneyOtherParentPost>>
        <<sydneyOtherParent>>의 대체 위젯.
        + <<sydneymumPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<sydneyGlassesPost>>
        <<sydneyGlasses>>의 대체 위젯.
        + <<sydneymumPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<sydneySwimwearPost>>
        <<sydneySwimwear>>의 대체 위젯.
        + <<sydneymumPost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<sydneyBeachGenderPost>>
        <<sydneyBeachGender>>의 대체 위젯.
        + <<sydneymumPost>>와 용도 및 방식 같음. 생략
    ```
-----------------
# Slime

* slimeEvent.twee
    ```
    <<trSlimeEvent>>
        <<trSlimeEvent>>

        슬라임 이밴트를 번역한다.
        # 바로 출력하기 때문에 _trResult를 사용하지 않음
    ```
	
-----------------
# Other

* trBeastdesc
    ```
    <<trBeastdesc>>     // 개선 필요
        <<trBeastdesc *beastdesc post "sep">>

        짐승의 상세를 번역한다.

        필수사항
        - beastdesc: 짐승의 상세

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trBeastdesc 'large dog girl' '을'>>_trResult             // '큰 개 소녀를'
    ```

    ```
    <<trBeastClaws>>
        <<rBeastClaws *claws post "sep">>

        짐승의 발톱를 번역한다.

        필수사항
        - claws: 짐승의 상세

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trBeastClaws 'claws' '을'>> _trResult            // '발톱을'
    ```

* trBodypart
    ```
    <<trBodypart>>
        <<trBodypart *bodyPart post "sep">>

        몸의 부위를 번역한다.

        필수사항
        - *bodyPart: 몸의 부위

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trBodypart 'left_arm' '을'>>_trResult              // '왼팔을'
    ```
	
	
    ```
    <<trBodysize>>
        <<trBodysize *bodySize>>

        몸의 크기를 번역한다.

        필수사항
        - *bodySize: 몸의 크기


        e.g.
        <<trBodysize 'normal'>>_trResult              // '평범함'
    ```

* trBodyWriting
    ```
    <<trBodyWriting>>
        <<trBodyWriting *bodywriting post "sep">>

        바디라이팅을 번역한다.

        필수사항
        - *bodywriting: 바디라이팅 내용

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trBodyWriting "heart">>_trResult                //  "하트"
    ```
* trBodyWritingCategory
    ```
    <<trBodyWritingCategory>>
        <<trBodyWritingCategory *category>>

        문신 종류를 번역한다.

        필수사항
        - *catgory 종류명

        e.g.
        <<trBodyWritingCategory "Masochism">>_trResult               //  "마조히즘"
    ```

* trBreastsdesc
    ```
    <<trBreastsdesc>>
        <<trBreastsdesc *Breastdesc post "sep">>

        가슴의 상세를 번역한다.

        필수사항
        - *Breastdesc: 가슴의 상세

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trBreastsdesc "budding breasts" "을">>_trResult              //"약간 솟아오른 유방을"
    ```

* trColour
    ```
    <<trColour>>
        <<trColour *colour post sep>>

        색을 번역한다.

        필수사항
        - *colour: 번역할 색

        e.g.
        <<trColour 'red'>>
    ```
 
   ```
    trColourJS
        trColourJS(colour, post, sep)
        <<trColour>>의 js 인터페이스. 이름 바뀔 수 있음. TODO: 리팩토링될 수 있음.
    ```

* trFurniture
    ```
    <<trFurniture>>
        <<trFurniture *furniture type post sep>>
        
        가구를 번역한다.

        필수사항
        - furniture: 가구의 이름

        선택사항
		- type : 번역될 내용이 종류. "name"은 이름, "desc" 는 설명. 생략된 경우 "name"
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trFurniture "chair" "name" "을">>             // "나무 의자를"
    ```

* trHairtype
    ```
    <<trHairtype>>
        <<trHairtype *hairtype>>
        
        머리카락의 타입을 번역한다.

        필수사항
        - hairtype: 머리카락의 타입

        e.g.
        <<trHairtype "braid left">>             // "왼쪽으로 땋은 머리"
    ```

* trList
    ```
    <<trList>>
        <<trList *list [method]>>
        
        배열을 번역하여 _trList 변수에 저장한다.

        필수사항
        - list: 번역할 배열

		선택사항
		- method: 번역할 위젯. 생략시 "putpost" 가 사용됨
		
		note
		- 이 위젯은 formatList 로 출력하는 것을 전제로 제작되었습니다.

        e.g.
        <<trList _boygirlArray>><<print formatList(_trList)>>             // "소년이나 소녀" (putpost 사용)
		<<trList _redyellowArray "trColour">><<print formatList(_trList)>>	// "빨간색이나 노란색" (trColour 사용)
    ```

* trListboxItems
	```
	<<trListboxItemsFromArray>>
		<<trListboxItemsFromArray *arrayname>>
		
		<<listbox>> 에 배열이 들어갈 때 배열을 번역하여 _trListboxItems 에 설정한다.
		
		필수사항
		- arrayname 원본 배열 이름 (따옴표를 붙여줄것)
		- 해당 arrayname 에 대한 번역표가 trListboxItems.twee 의 <<trListboxItemsInit>> 매크로 안에 존재할것
		- 혹은 기존 매크로로 번역할 수 있는 것이면 매크로를 <<trListboxItemsInit>>에 지정하면 해당 매크로를 사용하여 번역함.
		
		e.g. 1 (번역표)
		/* 원본 */
		<<set _options to ["Everyone","Strangers","Animals",...]>>
		
		<<listbox ...>>
			<<optionsfrom _options>>	
		<</listbox>>
		
		/* 번역표 */
		"_options" :
		{
			"Everyone":"모두",
			"Strangers":"낯선 사람",
			"Animals":"동물",
			...
		},
		
		/* 번역 */
		<<set _options to ["Everyone","Strangers","Animals",...]>>
		
		<<trListboxItemsFromArray "_options">><<listbox ...>>	/* listbox 앞에 배열이름을 따옴표로 붙여서 매크로 부름 */
			<<optionsfrom _trListboxItems>>	/* 원래 배열 대신 _trListboxItems 를 사용 */
		<</listbox>>
		
		e.g. 2 (번역 매크로)
		/* 원본 */
		<<set _bodyPartOptions to ["Forehead","Left cheek","Right cheek",...]>>

		<<listbox ...>>
			<<optionsfrom _bodyPartOptions>>
		<</listbox>>
		
		/* 번역표 */
		"_bodyPartOptions" : "trBodypart",	/* 번역 매크로 이름 */
		
		/* 번역 */
		<<set _bodyPartOptions to ["Forehead","Left cheek","Right cheek",...]>>

		<<trListboxItemsFromArray "_bodyPartOptions">><<listbox ...>>
			<<optionsfrom _trListboxItems>>
		<</listbox>>
		
		note
		- listbox 에 들어가는 옵션이 배열 ([] 안에 정의되는 것) 이 아니라 오브젝트 모음 ({} 안에 "이름":"값" 형식으로 정의되는 것)
			인 경우 그냥 앞의 "이름"만 번역하면 되므로 trListboxItemsFromArray 를 사용할 필요가 없음.
		
	```

* trNamedNPC
    ```
    <<trNamedNPC>>
        <<trNamedNPC [*npcName | *npcTitle] post "sep">>
        <<trNamedNPC [*npcName | *npcTitle] "name" post "sep">>
        <<trNamedNPC [*npcName | *npcTitle] "title" post "sep">>

        namedNPC를 번역한다.
        
        필수사항
        - *npcName: 번역할 NamedNPC의 이름
        - *npcTitle: 번역할 NamedNPC의 타이틀

        선택사항
        - name: 해당 NPC의 이름을 출력한다.
        - title: 해당 NPC의 타이틀을 출력한다.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trNamedNPC "River">>                          // '리버'
        <<trNamedNPC "maths teacher">>                  // '수학 교사'
        <<trNamedNPC "River" "title">>                  // '수학 교사' 
        <<trNamedNPC "River" '을'>>                     // '리버를'    
    ```

* trNPCdesc
    ```
    <<trNPCdesc>>
        <<trNPCdesc *NPCdesc>>
        <<trNPCdesc *NPCfulldesc post "sep">>

        NPC의 상세(Adj)를 번역한다.
        +인수가 _NPCdesc에 없는 경우 인수 그대로 출력한다.

        필수사항
        - *NPCdesc: NPC의 상세
        - *NPCfulldesc: NPC의 모든 상세

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trNPCdesc "shapely">>                         //  "균형잡힌"
        <<trNPCdesc "shapely girl" "을">>               //  "균형잡힌 소녀를"
        <<trNPCdesc "Robin" "을">>                      //  "로빈을"
    ```

    ```
    <<trNPCname>>
        <<trNPCname [NPCname | NPCnum]>>
        <<trNPCname [NPCname | NPCnum] post "sep">>

        NPC의 이름을 번역한다.

        필수사항
        - NPCname: NPC의 이름
        - NPCnum: $NPCList 상의 번호 (0-5)
        - 주어지지 않은 경우 0번 이름으로 가정함

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trNPCname "Olivia">>_trResult                         //  "올리비아"
        <<trNPCname "Robin" "을">>_trResult                     //  "로빈을"
    ```

* trNumber
    ```
    <<trNumber>>
        <<trNumber *number "silent">>

        <<number>> 위젯의 대체 버전. 숫자를 문자로 바꿔준다.

        필수사항
        - number: 숫자

        선택사항
        - silent: 지정되면 _trResult 에만 저장되며 표시하지 않는다.

        note.
		- 이 번역 매크로는 뒤에 단위가 붙는 것을 전제로 만들어졌으므로 단위가 없이 사용할 경우 (열셋) 조심할 것. e.g. <<trNumber 13>> 명 // 열세 명
		- 원본 버전이 silent 옵션을 사용하므로 이 매크로 역시 tr~ 매크로지만 ~Post 매크로처럼 _trResult 없이도 표시함.
		
        e.g.
        <<trNumber 3>> 사람                         //  "세 사람" 
        <<trNumber -69>>                     //  "마이너스 예순 아홉"
    ```

   ```
    <<trNumberHanja>>
        <<trNumberHanja *number "silent">>

        <<trNumber>> 와 같지만 한자식 읽기 버전. 생략.

        e.g.
        <<trNumberHanja 30>> 분                         //  "삼십 분" 
    ```

* trPenisdesc
    ```
    <<trPenisdesc>>
        <<trPenisdesc *Penisdesc post "sep">>

        남성기의 상세를 번역한다.

        필수사항
        - *Penisdesc: 남성기의 상세

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trPenisdesc "tiny penis" "을">>             //"조그마한 자지를"
    ```


* trPill
    ```
    <<trPill>>
        <<trPill *PillType>>

        약의 타입을 번역합니다.

        필수사항
        - *PillType: 약의 타입

        e.g.
        <<trPill "Growth">>     // 성장약
    ```


* trPlants
    ```
    <<trPlants>>
        <<trPlants *plantName ["name"|"plural"|"unit"] post "sep">>
        <<trPlants *plantPlural ["name"|"plural"|"unit"] post "sep">>

        식물을 번역한다.

        필수사항
        - *plantName: 식물의 이름
        - *plantPlural: 식물의 복수형 단어

        선택사항
        - 'name': 식물의 이름을 이용해서 번역
        - 'plural': 식물의 복수형태 단어를 이용해서 번역
        - 'unit': 식물의 단위를 번역
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trPlants 'daisy' '을'>>_trResult		// '데이지를'
        <<trPlants 'daisies' 'name' '을'>>_trResult              // '데이지를'
        <<trPlants 'daisies' '을'>>_trResult                     // '데이지들을'
        <<trPlants 'daisy' 'plural' '을'>>_trResult              // '데이지들을'
        <<trPlants 'daisies' 'unit'>>_trResult                     // '송이'
    ```


* trPost
    ```
    <<trPost>>
        <<trPost *postNum *post "sep">>
        
        조사를 번역하여 _trResult의 뒤에 붙인다.

        필수사항
        - *postNum: 종성이 있을 경우 (단, ㄹ 제외) 0, 종성이 없을 경우 1, 종성이 ㄹ일 경우 2.
        - *post: 종성이 있을 경우의 일반 조사 (예: "은", "을", "으로" 등)

        선택사항
        - sep: 조사를 _trPost에 따로 저장한다.

        e.g.
        /* _trResult = "가나다" */
        <<trPost 0 '은'>>                   //  '가다나은'
        /* _trResult = "abc" */
        <<trPost 1 '을'>>                   //  'abc를'
        /* _trResult = "123" */
        <<trPost 1 '이' 'sep'>>             //  _trReulst:'123', _trPost: "가"
    ```

    ```
    <<getPostNum>>
        <<getPostNum *txt>>
        
        문자열에서 조사 번호를 찾아 _postNum에 넣는다

        필수사항
        - *txt: 문자열

        주의점
        - 현재 한글과 숫자만 가능

        e.g.

        <<getPostNum '가'>>                   //  _postNum = 1
		<<getPostNum '가능'>>                   //  _postNum = 0
		<<getPostNum '팔'>>                   //  _postNum = 2
		<<getPostNum '11'>>                   //  _postNum = 2 (십일)
		<<getPostNum 'ABC'>>                   //  _postNum = undefined
		<<getPostNum>>                   //  _postNum = undefined
    ```

    ```
	trPostTemplate :  원본 0.3.7.x 부터 추가된 템플릿(Template) 을 지원하기 위해 추가된 조사 템플릿 모음
		?[템플릿_명사]?[템플릿_조사]
		
		템플릿 명사에 맞는 조사를 출력한다. 종류는 EasyPost (하단 참조) 에서 사용하는 것과 동일.
			?un/?nun - 은/는
			?i/?ga - 이/가
			 ?ul/?rul - 을/를
			 ?gwa/?wa - 과/와
			?irang/?rang - 이랑/랑
			?a/?ya - 아/야
			?iyo/?yo - 이여/여
			?iya ( ?ya 는 아/야 에서 이미 사용하고 있어서 ?iya로 통일시킴) - 이야/야
			?uro/?ro - 으로/로
			?uroseo/?roseo - 으로서/로서
			?urosseo/?rosseo - 으로써/로써
			?urobuter/?robuter - 으로부터/로부터
			?ira/?ra - 이라/라
			?iut/?yeot - 이었/였
			?irago/?rago - 이라고/라고
			?ina/?na - 이나/나
			?iran/?ran - 이란/란
			?idunga/?dunga - 이든가/든가
			?idonga/?donga - 이던가/던가
			?idunji/?dunji - 이든지/든지
			?idonji/?donji - 이던지/던지
			?iyamalro/?yamalro - 이야말로/야말로
			?iguna/?guna - 이구나/구나
			?ida/?da - 이다/다
			?iji/?ji - 이지/지
			?yi - 의
	
		사용법
		1. 먼저 추가된 템플릿의 개조가 필요하다. 템플릿은 03-JavaScript/03-Templates 에 정의되어 있다.
			- 원본
				Template.add('vulva', () =>
					either("vulva", "quim", "flange", "pussy"));
			- 번역/개조본
				Template.add('vulva', () =>
					{T.trResult = either("외음부", "음부", "보지 테두리", "보지"); getPostNum(T.trResult); return T.trResult;});
			- 둘째줄 앞에 "{T.trResult =", 뒤의 ) 두개 사이에 "; getPostNum(T.trResult); return T.trResult;}" 를 넣으면 된다.
		2. 이러면 조사 종류가 _postNum 에 저장된다.
		3. 템플릿을 사용하는 방법은 ?[템플릿_이름] 식으로 쓰면 되며, ?[템플릿_명사]?[템플릿_조사] 처럼 바로 템플릿 조사를 붙여주면 끝.
			- e.g
				?vulva?rul			//보지를

    ```


* trRole
    ```
    <<trRole>>
        <<trRole *role post "sep">>
        
        역할(role)을 번역한다.

        필수사항
        - *role: NPC의 역할

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trRole "guard" '이' >>_trResult             //  간수가
    ```

* trTime
	__주의: 만약 인수가 Time.day 처럼 일반 sugarcube 변수가 아닌 경우 역따옴표( ` ` )를 사용하여 처리하여야 함 __

    ```
    <<trMonth>>
        <<trMonth *monthName post "sep">>

        월 이름을 번역한다.

        필수사항
        - *monthName: 번역할 월 이름

        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trMonth "July">>                //  7월
    ```

    ```
    <<trDaysOfWeek>>
        <<trDaysOfWeek *daysOfWeekName [isHanja | post "sep"]>>

        요일명을 번역한다.

        필수사항
        - *daysOfWeekName: 번역할 요일명

        선택사항
			- isHanja: 문자열이 아닌 인수를 넣으면 한자로 표시한다. 일자 간이 표시로 사용할 경우에만 사용하기에 이 경우 조사처리는 하지 않는다.
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trDaysOfWeek "Sunday">>                //  일요일
		<<trDaysOfWeek "Mon" 1>>                //  月
    ```

    ```
    <<trSeason>>
        <<trSeason *season post "sep">>

        계절을 번역한다.

        필수사항
        - *season: 계절 혹은 계절 배열. 배열인 경우 쉼표로 붙여서 표시한다.

        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trSeason "spring">>                //  봄
        <<trSeason ["autumn", "winter"] "과">>                //  가을, 겨울과
    ```

* trToyName
    ```
    <<trToyName>>
        <<trToyName [toyName] post "sep">>
        
        아이 장난감을 번역한다. 섹스 장난감이 아닌 것에 주의.

        선택사항
		- toyName: 번역할 장난감 이름/세트/옵션명. 생략시 _toyName 변수를 사용한다.
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trToyName "Teddy Bear" '이' >>_trResult             //  테디베어가
    ```


* trVirginity
    ```
    <<trVirginity>>
        <<trVirginity *NPCdesc>>
        <<trVirginity *Boolean>>

        순결성의 유무, 혹은 빼앗아간 NPC의 상세를 번역한다.

        필수사항
        - NPCdesc: 순결을 빼앗아간 NPC의 상세
        - Boolean: 순결성 (true , false)
    ```

    ```
    <<trNPCVirginity>>
        <<trNPCVirginity *NPCdesc>>

        플레이어가 순결을 빼앗은 NPC의 상세를 번역한다.

        필수사항
        - NPCdesc: 순결을 빼앗은 NPC의 상세 리스트
    ```

* trWeather
    ```
    <<trWeather>>
        <<trWeather *weather post "sep">>

        날씨를 번역한다.

        필수사항
        - *weather: 날씨

        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

        e.g.
        <<trWeather "rain">>                //  "비"
    ```

-----------------
# 기타 명사 매크로
   - 사용 횟수가 너무 적어 새로 만들지 않고 기존 매크로를 변경시켜 사용하는 매크로들. 조사를 받거나 조사 표현이 가능한 것만 기재한다.
   
* 03-JavaScript/04-Pregnancy/storyFunctions.js
    ```
    pregnancyNameCorrection()
        <<print pregnancyNameCorrection(...)>>(조사 매크로)
		임신시킨 자의 이름을 표시한다. _postNum에 조사 번호를 넣기 때문에 조사 매크로로 조사를 표현할 수 있다.
		
		e.g.
		<<print pregnancyNameCorrection("Avery")>>?ga	// 에이버리가
    ```

* base-combat/audience.twee
    ```
    <<ahe>>
        + 구경꾼. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

* base-combat/audienceswarm.twee
    ```
    <<aHe>>
        + 구경꾼. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

* base-combat/struggle.twee
    ```
    <<struggle_name>>
        <<struggle_name *arg post "sep">>

        struggle 크리쳐의 fulldesc를 번역한다. 

        필수사항
        - *arg: 원본 struggle_name 의 인수

        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<struggle_name "mouth" "을">>             // "윙윙거리는 럴커를"
    ```

    ```
    <<struggle_bodypart>>
        + <<trBodypart>>와 비슷하지만 Post 시리즈처럼 바로 출력한다. 용도 및 방식 같음. 생략
    ```

    ```
    <<struggle_appendage>>
        <<struggle_appendage *[num] post "sep">>
		
		struggle 크리쳐의 부속지를 번역한다. 

		필수사항
		- *num: <<struggle_appendage>> 의 인수
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

    ```

    ```
    <<struggle_skin>>
        <<struggle_skin *[num] post "sep">>
		
		struggle 크리쳐의 피부를 번역한다. 

		필수사항
		- *num: <<struggle_skin>> 의 인수
        
        선택사항
            - post: 번역결과의 뒤에 조사를 붙인다.
            - sep: 조사를 분리하여 저장한다.

    ```


* base-system/text.twee
    ```
    <<npcHairColour>>
		<<npcHairColour *npcID post "sep">>
		
		npc의 머리색을 번역한다.
		
		필수사항
		- *npcID: 원본 npcHairColour의 인수
		
        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.

        e.g.
        <<npcHairColour "Sydney" "으로">>             // "백금색으로"
    ```

    ```
    <<printChastity>>
		<<printChastity post "sep">>
		
		당신의 정조대를 번역한다. <<worn_genitals_name>> 과 동일.
		
        선택사항
        - post: 번역결과의 뒤에 조사를 붙인다.
        - sep: 조사를 분리하여 저장한다.
    ```


* base-system/widget.twee
    ```
    <<A_pillory_person>>
        + 공개굴욕형. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<a_pillory_person>>
        + 공개굴욕형. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<The_pillory_person>>
        + 공개굴욕형. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<the_pillory_person>>
        + 공개굴욕형. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<pillory_type>>
        + 공개굴욕형. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

* overworld-plains/loc-livestock/widget.twee
    ```
    <<livestock_cows>>
        + 암소들. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

    ```
    <<livestock_horse>>
        + 말. <<pShePost>>와 용도 및 방식 같음. 생략
    ```

-----------------
# 기타
	- 동사 매크로중 몇몇은 영어와 한글의 차이 때문에 추가 옵션을 받는 매크로가 존재한다.
	
* base-system/text.twee
    ```
	<<strokes>> 
		원래는 "애무한다" 로 표시되지만 마지막 옵션에 "and" 가 추가되면 "애무하고" 로 표시됨
    ```

    ```
	<<npcUndressText>> 
		원래는 "벗긴다" 로 표시되지만 마지막 옵션에 "and" 가 추가되면 "벗기고", "but" 이 추가되면 "벗기려 하지만" 으로 표시됨
    ```

* base-system/widjets.js
    ```
	formatList()
		formatList(*arr, conjunction = "그리고", useOxfordComma = false, separator=", ")
			
		문자열 배열 내의 문자열을 열거한다. 
		참고- 이 함수는 <Array>.formatList() (modules/02-array-extensions.js 모듈에서 확장)의 사용을 쉽게 하기 위해 만들어진 함수이며,
		원본인 <Array>.formatList()는 인자를 Object 의 key-value 쌍으로 받는다.
		
		필수사항
		- *arr: 출력하려는 문자열 배열
		
        선택사항
        - conjunction: 문자열을 이어주는 접속사. 원래 아무 단어나 들어갈 수 있지만 한글번역판에서는 
			"그리고" 와 "그리고"가 아닌 (ex. "또는" "혹은" 등) 접속사로 구분한다.
        - useOxfordComma: 마지막과 마지막 전 단어 사이에 separator 를 넣을지를 선택한다.
			(ex. useOxfordComma = false: 사과, 귤과 수박 | useOxfordComma = true: 사과, 귤, 그리고 수박)
		- separator: 문자열이 셋 이상 (useOxfordComma = true인 경우 둘 이상)일 때 문자열을 나눠주는 기호.
			보통 쉼표+빈칸을 사용.
		 
		 현재 (useOxfordComma = false)인 경우 conjunction이 "그리고" 인 경우 조사는 과/와 를 사용하며, 그렇지 않은 경우 이나/나 를 사용한다.
		 (ex. conjunction = "그리고": 사과, 귤과 수박 | conjunction = "또는": 사과, 귤이나 수박)

		formatList() 가 불렸을 경우 위와 같이 처리를 하고 마지막 단어의 조사 번호를 _postNum 에 저장하게 되어 있다.
		
		사용법 (함수로 사용)
		- 위젯형: <<set _trResult to formatList(_fruits)>><<trPost _postNum "을">><<print _trResult>>
		- 템플릿형: <<print formatList(_fruits)>>?ul
		
		사용법 (배열의 메소드로 사용)
		- 위젯형: <<set _trResult to _fruits.formatList()>><<trPost _postNum "을">><<print _trResult>>
		- 템플릿형: <<print _fruits.formatList()>>?ul
    ```


-----------------
# EasyPost

위의 매크로들을 좀 더 직관적으로 쉽게 사용하기 위해 추가한 매크로 군입니다.
원본버전 0.3.10.4부터 새로운 형식의 EasyPost 쪽을 사용하도록 권장합니다. 
이전 형식도 당분간은 사용 가능합니다만 새로운 형식이 정착되면 삭제할 예정입니다.

* 규칙
	이전 형식: <<(영문의 위젯명)(언더바)(조사|어미) [옵션]>>
	새로운 형식: <<(영문의 위젯명)(언더바)(빈칸)(조사|어미) [옵션]>>	// 조사/어미 사이에 한 칸을 띄우시면 됩니다. 나머지는 동일
		이전 형식과 다르게 한글로 쓰셔도 됩니다. <<he_ nun>>, <<he_ un>>, <<he_ "는">>, <<he_ "은">>, <<he_ 는>>, <<he_ 은>> 은 전부 똑같이 취급됩니다.
    ```
	- <<(명사 | 대명사)_ (조사 | 어미) [옵션]>>
		예: <<He_ nun>> - 그는, <<weather_ ga "rain">> - 비가
	- 조사/어미 종류는 trinit_post 에 정의된 것에 준해 만들었음
		은/는 - un/nun
		이/가 - i/ga
		을/를 -  ul/rul
		과/와 -  gwa/wa
		이랑/랑 - irang/rang
		아/야 - a/ya
		이여/여 - iyo/yo
		이야/야 - iya ( ya 는 아/야 에서 이미 사용하고 있어서 iya로 통일시킴)
		으로/로 - uro/ro
		으로서/로서 - uroseo/roseo
		으로써/로써 - urosseo/rosseo
		으로부터/로부터 - urobuter/robuter
		이라/라 - ira/ra
		이었/였 - iut/yeot	// 0.3.10.4 에 추가
		이라고/라고 - irago/rago
		이나/나 - ina/na
		이란/란 - iran/ran
		이든가/든가 - idunga/dunga
		이던가/던가 - idonga/donga
		이든지/든지 - idunji/dunji
		이던지/던지 - idonji/donji
		이야말로/야말로 - iyamalro/yamalro
		이구나/구나 - iguna/guna
		이다/다 - ida/da
		이지/지	- iji/ji
		의 - yi
	- 붙는 조사/어미는 명사/대명사의 영어발음에 준해 붙임
		예: He_ nun - 히_는, bottom_ un - 바텀_은
	- 옷의 경우 $worn.(위치).name 식의 사용이 대부분으로 보여 이를 대체하는 매크로만 만들었음
		예: $worn.under_lower.name은 - <<worn_under_lower_name_ un>>
    ```

* 예시
    ```
	원본: <<He>> ripped your $worn.under_lower.name and shove <<his>> <<penis>> into your <<pussy>>.
	기존번역: <<HePost "은">> 당신의 <<trClothes "under_lower" $worn.under_lower.name "name" "을">>_trResult 찢고 <<hisPost "의">> <<penisPost "을">> 당신의 <<pussyPost "으로">> 집어넣는다.
	EasyPost: <<He_ nun>> 당신의 <<worn_under_lower_name_ ul>> 찢고 <<his_ yi>> <<penis_ rul>> 당신의 <<pussy_ ro>> 집어넣는다.
	출력: 그는 당신의 평범한 팬티를 찢고 그의 조그마한 자지를 당신의 보지로 집어넣는다.
    ```

* 현재 등록된 매크로
	- trClothes 계열
		```
		<<worn_(착용부위)_name_ (조사)>> 시리즈. 옵션으로 "sep" 인자를 받도록 함
		<<worn_(착용부위)_name>> 시리즈. 조사 없이 이름만 가져오게 함
		NOTE: 플레이어가 착용중인 buttplug 는 butt_plug, 플레이어가 착용중인 strap-on 은 under_lower 부위
		```
	- beasttypePost 계열
		```
		<<beasttype_ (조사)>>, <<beastsplural_ (조사)>>
		```
	- bodyPost 계열
		```
		<<breasts_ (조사)>>, <<bellyDescription_ (조사)>>, <<nipple_ (조사)>>, <<nipples_ (조사)>>, <<bottom_ (조사)>>, <<pussy_ (조사)>>, <<genitals_ (조사)>>, <<genitalsandbreasts_ (조사)>>,
		<<clit_ (조사)>>, <<penis_ (조사)>>, <<penisSimple_ (조사)>>, <<glans_ (조사)>>, <<testicles_ (조사)>>, <<testicle_ (조사)>>, <<hand_ (조사)>>, <<mouth_ (조사)>>,  
		<<npcPenis_ (조사)>>, <<npcPenisSimple_ (조사)>>, <<npcVagina_ (조사)>>, <<npcAnus_ (조사)>>, <<npcGenitals_ (조사)>>, 
		```
	- childPost 계열
		```
		<<childname_ (조사)>>, <<childrenNames_ (조사)>>, <<childHe_ (조사)>>, <<childhe_ (조사)>>, <<childHis_ (조사)>>, <<childhis_ (조사)>>, <<childHim_ (조사)>>, <<childhim_ (조사)>>,
		<<childHers_ (조사)>>, <<childhers_ (조사)>>, <<childherself_ (조사)>>, <<childhand_ (조사)>>, <<childhands_ (조사)>>, <<childhair_ (조사)>>, <<childtype_ (조사)>>, <<childtoy_ (조사)>>,
		<<pregnancyBabyText_ (조사)>>
		```
	- clothesPost 계열
		```
		<<undertop_ (조사)>>, <<groin_ (조사)>>, <<crotch_ (조사)>>, <<undies_ (조사)>>, <<bottoms_ (조사)>>, <<underbottoms_ (조사)>>, <<top_ (조사)>>, 
		<<topaside_ (조사)>>, <<breastsaside_ (조사)>>, <<bottomaside_ (조사)>>, <<outfit_ (조사)>>, <<underoutfit_ (조사)>>, <<lewdness_ (조사)>>, <<nudity_ (조사)>> (문장 끝에 <<nudityPostend>>를 반드시 넣을것), 
		<<allTops_ (조사)>>, <<allBottoms_ (조사)>>, <<allTopsUnderwear_ (조사)>>, <<allBottomsUnderwear_ (조사)>>, <<exposedupper_ (조사)>>, <<exposedlower_ (조사)>>, 
		<<dress_ (조사)>>, <<skirt_ (조사)>>, <<panties_ (조사)>>, <<bra_ (조사)>>, <<npcClothesText_ (조사)>>, 
		```
	- HePost 계열
		```
		<<He_ (조사)>>, <<He_Short_ (조사)>>, <<he_ (조사)>>, <<Him_ (조사)>>, <<him_ (조사)>>, <<Hers_ (조사)>>, <<hers_ (조사)>>, <<Himself_ (조사)>>, <<himself_ (조사)>>, 
		<<bHe_ (조사)>>, <<bhe_ (조사)>>, <<bHimself_ (조사)>>, <<bhimself_ (조사)>>, <<bHim_ (조사)>>, <<bhim_ (조사)>>, <<bHers_ (조사)>>, <<bhers_ (조사)>>, 
		<<pShe_ (조사)>>, <<pshe_ (조사)>>, <<pher_ (조사)>>, <<pHer_ (조사)>>, <<pHerself_ (조사)>>, <<pherself_ (조사)>>, <<phers_ (조사)>>, <<phim_ (조사)>>, <<ohe_ (조사)>>, 
		<<farm_He_ (조사)>>, <<farm_he_ (조사)>>, <<nnpc_He_ (조사)>>, <<nnpc_he_ (조사)>>, <<nnpc_Him_ (조사)>>, <<nnpc_him_ (조사)>>, <<nnpc_himself_ (조사)>>, 
		<<nnpc_wife_ (조사)>>, <<nnpc_lass_ (조사)>>, <<nnpc_gender_ (조사)>>, <<nnpc_gendery_ (조사)>>, <<nnpc_genitals_ (조사)>>, <<nnpc_girlfriend_ (조사)>>,
		<<nnpc_brother_ (조사)>>, <<nnpc_Brother_ (조사)>>, <<nnpc_title_ (조사)>>, <<nnpc_Title_ (조사)>>, 
		<<His_ (조사)>>, <<his_ (조사)>>, <<bhis_ (조사)>>, <<Bhis_ (조사)>>, <<hisselect_ (조사)>>, <<his1_ (조사)>> ~ <<his6_ (조사)>>, <<farm_His_ (조사)>>, <<farm_his_ (조사)>>, 
		<<nnpc_His_ (조사)>>, <<nnpc_his_ (조사)>>
		```
	- otherPost 계열
		```
		<<charles_ (조사)>>, <<theowner_ (조사)>>, <<someone_ (조사)>>, <<spouse_ (조사)>>, <<father_ (조사)>>, <<Father_ (조사)>>, <<mummy_ (조사)>>, <<Mummy_ (조사)>>, 
		<<girl_ (조사)>>, <<girls_ (조사)>>, <<girlfriend_ (조사)>>, <<wife_ (조사)>>,
		<<victimgirl_ (조사)>>, <<victimgirls_ (조사)>>, <<lass_ (조사)>>, <<gender_ (조사)>>, <<bitch_ (조사)>>, <<whore_ (조사)>>, <<slut_ (조사)>>, <<semen_ (조사)>>, <<prostate_ (조사)>>, 
		<<personpenis_ (조사)>>, <<wallet_ (조사)>>, <<sir_ (조사)>>, <<psir_ (조사)>>, <<pSir_ (조사)>>, <<pmother_ (조사)>>, <<pMother_ (조사)>>, <<monk_ (조사)>>, <<monks_ (조사)>>, <<monks_and_nuns_ (조사)>>, 
		<<priest_ (조사)>>, <<priests_ (조사)>>,
		<<farm_text_many_ (조사)>>, <<farm_text_ (조사)>>, <<Master_ (조사)>>, <<master_ (조사)>>, <<daughter_ (조사)>>, <<male_ (조사)>>, <<daylight_ (조사)>>, 
		<<ppackbrother_ (조사)>>, <<pPackbrother_ (조사)>>, <<ppackbrothers_ (조사)>>, <<pPackbrothers_ (조사)>>, 
		<<pheat_ (조사)>>, <<wolf_cave_plural_ (조사)>>, <<wolf_cave_singular_ (조사)>>, <<beast_jaws_text_ (조사)>>, <<beast_Jaws_text_ (조사)>>, <<beast_teeth_text_ (조사)>>,
		<<handtool_ (조사)>>, <<lefttool_ (조사)>>, <<righttool_ (조사)>>, <<struggle_appendage_ (조사)>>, <<plant_details_ (조사)>>, <<Plant_details_ (조사)>>, <<tower_creature_text_ (조사)>>, <<pound_text_ (조사)>>,
		<<kylar_pet_name_ (조사)>>, <<virgin_ (조사)>>, <<getfluidsfromgroup_ (조사)>>, <<condomDesc_ (조사)>>, <<office_manager_ (조사)>>,
		<<someones_ (조사)>>,  <<their_ (조사)>>, 
		```
	- personPost 계열
		```
		<<person_ (조사)>>, <<personsimple_ (조사)>>, <<combatperson_ (조사)>>, <<combatPerson_ (조사)>>,<<people_ (조사)>>, <<peopley_ (조사)>>, <<persony_ (조사)>>, <<group_ (조사)>>,
		<<fullGroup_ (조사)>>,<<enumeratedGroup_ (조사)>>,
		<<persons_ (조사)>>, <<combatpersons_ (조사)>>, <<combatPersons_ (조사)>>
		```
	- putpost 계열
		```
		<<putpost_ (조사)>>
		```
	- creature 계열
		```
		<<creature_ (조사)>>,  <<tentacle_ (조사)>>, <<vorecreature_ (조사)>>, <<struggle_creature_ (조사)>>,
		<<struggle_mouth_creature_ (조사)>>, <<struggle_vagina_creature_ (조사)>>, <<struggle_penis_creature_ (조사)>>, <<struggle_anus_creature_ (조사)>>, <<struggle_chest_creature_ (조사)>>, 
		<<swarmtype_ (조사)>>, <<swarmname_ (조사)>>, <<swarm_(조사)>>, 
		<<swarmmove>>, <<swarmspill>>, <<swarmsteady>> 는 서술어 번역이라 조사가 필요없음
		```
	- 기타
		```
		<<beastdesc_ (조사)>>, <<bodypart_ (조사)>>, <<bodywriting_ (조사)>>, <<breastsdesc_ (조사)>>, <<namedNPC_ (조사)>>,
		<<NPCdesc_ (조사)>>, <<NPCname_ (조사)>>, <<penisdesc_ (조사)>>, <<plants_ (조사)>>, <<plants_plural_ (조사)>>, 
		<<toyName_ (조사)>>, <<weather_ (조사)>>, <<sextoy_ (조사)>>, 
		<<relaxed_guard_ (조사)>>, <<anxious_guard_ (조사)>>, <<veteran_guard_ (조사)>>, <<methodical_guard_ (조사)>>, <<tattooed_inmate_ (조사)>>, <<scarred_inmate_ (조사)>>, 
		```