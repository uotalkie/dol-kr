function trPenisdesc(penisdesc, post, sep)
{
	if (penisdesc)
	{
		let tempArray = penisdesc.split(' ');
		
		if (tempArray.includes("strap-on"))
		{
			const trStrapOnDescription = {	/* npcstrapon from base-combat/npc-generation.twee */
				/* dildotype */
				"dildo":"페니스 밴드 딜도",
				"penis":"페니스 밴드 자지",
				"cock":"페니스 밴드 자지",
				"tentacle": "촉수 모양 페니스 밴드 자지",

				"beaded": "구슬 박힌",
				"horse":"말자지 모양",
				"knotted": "혹이 달린", 
				"dolphin": "돌고래 자지 모양",
				"studded": "징이 박힌",
				"fist": "주먹 모양",

				/* straponColor */
				"dark":"짙은",	/* 휘트니 전용 "dark red" 색상이 늘어나면 trColour 사용을 고려할것 */
				"black":"검은색",
				"red":"빨간색",
				"pink":"분홍색",
				"purple":"보라색",
				"fleshy":"살색",
				"blue":"파란색",
				"green":"초록색",
				"white":"흰색",
				"yellow":"노란색",
				"tan":"황갈색",
				"brown":"갈색",
				
				/* bonusdescriptor */
				"floppy": "물렁한",
				"transparent": "투명한",
				"sparkly": "반짝이는",

				/* size */
				"large":"큰",
				"massive":"거대한",
				
				/* "strap-on": "페니스 밴드" */
			};
				
			let trStrapOn = [];
			for (let i = 0; i < tempArray.length; i++)
			{
				if (tempArray[i].length == 0 || tempArray[i] == "strap-on")
					continue;
			
				let trDesc = trStrapOnDescription[tempArray[i]];
				if (trDesc)
					trStrapOn.push(trDesc);
				else
					trStrapOn.push(`<span class='red'>에러: trPenisdesc: 정의되지 않음: ${tempArray[i]}</span>`)
			}
			T.trResult = trStrapOn.join(" ");
		}
		else if (tempArray[1] === undefined)
		{
			T.trResult = "자지";
		}
		else
		{
			const trPenisAdj = {"thick":"두꺼운","hefty":"굵은","big":"큰","large":"큼지막한","veiny":"핏줄 선","meaty":"두툼한",	/* 3 */
								"massive":"거대한","huge":"커다란","humongous":"무지막지한","immense":"어마어마한","gigantic":"대형","enormous":"엄청난",	/* 4+ */
								"tiny":"조그마한", "pathetic":"한심한", "little":"자그마한", "small":"작은", "mini":"아주 작은", "micro":"정말 작은",	/* 1 */
								"knotted":"혹이 달린","spiked":"뾰족한","strange":"이상한","equine":"말", "avian": "새", "bovine": "소", "arachnid": "거미"};
			if (trPenisAdj[tempArray[0]] === undefined)
				T.trResult = `<span class='red'>에러: trPenisdesc: trPenisAdj에 ${tempArray[0]} 키가 없음 : ${penisdesc}</span>`;
			else
				T.trResult = trPenisAdj[tempArray[0]]+" 자지";
		}

		if (post)
			trPost(1, post, sep);
	}
	else
	{
		let trResult = `<span class="red">[에러: trPenisdesc]</span><br>`;
		trResult += "j= " + T.j  + ", NPCList[j].pronoun= " + (V.NPCList[T.j] === undefined ? "undefined" : V.NPCList[T.j].pronoun) + ", enemynomax= " + V.enemynomax + ", enemyno= " + V.enemyno + ", index= " + V.index + "<br>";
		trResult += "vt= " + V.vaginatarget + ", vdt= " + V.vaginadoubletarget + ", at= " + V.anustarget + ", adt= " + V.anusdoubletarget + "<br>";
		trResult += "= enemydata =<br>";
		for(const npcno = 0; npcno < V.enemynomax; npcno ++)
		{
			trResult += "#" + npcno + ": " + V.NPCList[npcno].fullDescription + ", pronoun= " + V.NPCList[npcno].pronoun + ", penis= " + V.NPCList[npcno]["penis"] + ", active= " + V.NPCList[npcno].active +  ", stance= " + V.NPCList[npcno].stance + "<br>";
		}
		
		T.trResult = trResult;
	}
	return T.trResult;
}
window.trPenisdesc = trPenisdesc;
DefineMacro("trPenisdesc", trPenisdesc);