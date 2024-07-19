/* eslint-disable no-undef */
const statDisplay = {
	statChange(statType, amount, colorClass, condition = () => true) {
		amount = Number(amount);
		if (V.statdisable === "t" || !condition()) return document.createDocumentFragment();

		const fragment = document.createDocumentFragment();
		const span = document.createElement("span");
		span.className = colorClass;
		const prefix = amount < 0 ? "- " : "+ ";

		span.textContent = `${prefix.repeat(Math.abs(amount))}${statType}`;
		fragment.appendChild(document.createTextNode(" | "));
		fragment.appendChild(span);

		return fragment;
	},
	grace(amount, expectedRank) {
		amount = Number(amount);
		if (!amount || V.statdisable === "t") return "";

		let displayGrace = true;

		// Optional second variable is the rank of the NPC giving the order, or when the player is expected to meet a higher standard. Grace changes won't apply if the player's rank equals or exceeds the expected rank
		const ranks = ["prospective", "initiate", "monk", "priest", "bishop"];
		const playerRankValue = ranks.indexOf(V.temple_rank);
		const expectedRankValue = ranks.indexOf(expectedRank);

		if (expectedRankValue > 1) {
			if (playerRankValue >= expectedRankValue) displayGrace = false;

			// Below might be a more interesting way to handle it, remove the above line and uncomment the below to enable. Lollipop Scythe
			// Allows the player to gain grace in events only if they are below a certain rank
			// if (amount > 0 && playerRankValue >= expectedRankValue) displayGrace = false;
		}

		if (displayGrace) {
			return statDisplay.statChange("신앙심", amount, amount > 0 ? "green" : "red");
		}
		return "";
	},
	create(name, fn) {
		if (this[name] === undefined && !Macro.get(name)) {
			DefineMacro(name, function () {
				this.output.append(fn(...this.args));
			});
			this[name] = fn;
		} else {
			console.error(`A function with the name "${name}" already exists in statDisplay.`);
		}
	},
};
window.statDisplay = statDisplay;

statDisplay.create("lgrace", expectedRank => statDisplay.grace(-1, expectedRank));
statDisplay.create("llgrace", expectedRank => statDisplay.grace(-2, expectedRank));
statDisplay.create("lllgrace", expectedRank => statDisplay.grace(-3, expectedRank));
statDisplay.create("ggrace", expectedRank => statDisplay.grace(1, expectedRank));
statDisplay.create("gggrace", expectedRank => statDisplay.grace(2, expectedRank));
statDisplay.create("ggggrace", expectedRank => statDisplay.grace(3, expectedRank));

statDisplay.create("lstress", () => statDisplay.statChange("스트레스", -1, "green"));
statDisplay.create("llstress", () => statDisplay.statChange("스트레스", -2, "green"));
statDisplay.create("lllstress", () => statDisplay.statChange("스트레스", -3, "green"));
statDisplay.create("gstress", () => statDisplay.statChange("스트레스", 1, "red"));
statDisplay.create("ggstress", () => statDisplay.statChange("스트레스", 2, "red"));
statDisplay.create("gggstress", () => statDisplay.statChange("스트레스", 3, "red"));

statDisplay.create("ltiredness", () => statDisplay.statChange("피로", -1, "green"));
statDisplay.create("lltiredness", () => statDisplay.statChange("피로", -2, "green"));
statDisplay.create("llltiredness", () => statDisplay.statChange("피로", -3, "green"));
statDisplay.create("gtiredness", () => statDisplay.statChange("피로", 1, "red"));
statDisplay.create("ggtiredness", () => statDisplay.statChange("피로", 2, "red"));
statDisplay.create("gggtiredness", () => statDisplay.statChange("피로", 3, "red"));

statDisplay.create("larousal", () => statDisplay.statChange("흥분", -1, "green"));
statDisplay.create("llarousal", () => statDisplay.statChange("흥분", -2, "green"));
statDisplay.create("lllarousal", () => statDisplay.statChange("흥분", -3, "green"));
statDisplay.create("garousal", () => statDisplay.statChange("흥분", 1, "red"));
statDisplay.create("ggarousal", () => statDisplay.statChange("흥분", 2, "red"));
statDisplay.create("gggarousal", () => statDisplay.statChange("흥분", 3, "red"));

statDisplay.create("ltrauma", () => statDisplay.statChange("트라우마", -1, "green"));
statDisplay.create("lltrauma", () => statDisplay.statChange("트라우마", -2, "green"));
statDisplay.create("llltrauma", () => statDisplay.statChange("트라우마", -3, "green"));
statDisplay.create("gtrauma", () => statDisplay.statChange("트라우마", 1, "red"));
statDisplay.create("ggtrauma", () => statDisplay.statChange("트라우마", 2, "red"));
statDisplay.create("gggtrauma", () => statDisplay.statChange("트라우마", 3, "red"));

statDisplay.create("llewdity", () => statDisplay.statChange("음란함", -1, "lewd"));
statDisplay.create("lllewdity", () => statDisplay.statChange("음란함", -2, "lewd"));
statDisplay.create("llllewdity", () => statDisplay.statChange("음란함", -3, "lewd"));
statDisplay.create("glewdity", () => statDisplay.statChange("음란함", 1, "lewd"));
statDisplay.create("gglewdity", () => statDisplay.statChange("음란함", 2, "lewd"));
statDisplay.create("ggglewdity", () => statDisplay.statChange("음란함", 3, "lewd"));

statDisplay.create("lpain", () => statDisplay.statChange("고통", -1, "green"));
statDisplay.create("llpain", () => statDisplay.statChange("고통", -2, "green"));
statDisplay.create("lllpain", () => statDisplay.statChange("고통", -3, "green"));
statDisplay.create("gpain", () => statDisplay.statChange("고통", 1, "red"));
statDisplay.create("ggpain", () => statDisplay.statChange("고통", 2, "red"));
statDisplay.create("gggpain", () => statDisplay.statChange("고통", 3, "red"));

statDisplay.create("lpurity", () => statDisplay.statChange("순결도", -1, "red"));
statDisplay.create("llpurity", () => statDisplay.statChange("순결도", -2, "red"));
statDisplay.create("lllpurity", () => statDisplay.statChange("순결도", -3, "red"));
statDisplay.create("gpurity", () => statDisplay.statChange("순결도", 1, "green"));
statDisplay.create("ggpurity", () => statDisplay.statChange("순결도", 2, "green"));
statDisplay.create("gggpurity", () => statDisplay.statChange("순결도", 3, "green"));

statDisplay.create("ldelinquency", () => statDisplay.statChange("불량", -1, "green"));
statDisplay.create("lldelinquency", () => statDisplay.statChange("불량", -2, "green"));
statDisplay.create("llldelinquency", () => statDisplay.statChange("불량", -3, "green"));
statDisplay.create("gdelinquency", () => statDisplay.statChange("불량", 1, "red"));
statDisplay.create("ggdelinquency", () => statDisplay.statChange("불량", 2, "red"));
statDisplay.create("gggdelinquency", () => statDisplay.statChange("불량", 3, "red"));

statDisplay.create("lcool", () => statDisplay.statChange("평판", -1, "red"));
statDisplay.create("llcool", () => statDisplay.statChange("평판", -2, "red"));
statDisplay.create("lllcool", () => statDisplay.statChange("평판", -3, "red"));
statDisplay.create("gcool", () => statDisplay.statChange("평판", 1, "green"));
statDisplay.create("ggcool", () => statDisplay.statChange("평판", 2, "green"));
statDisplay.create("gggcool", () => statDisplay.statChange("평판", 3, "green"));

statDisplay.create("lsaltiness", () => statDisplay.statChange("소금기", -1, "red"));
statDisplay.create("llsaltiness", () => statDisplay.statChange("소금기", -2, "red"));
statDisplay.create("lllsaltiness", () => statDisplay.statChange("소금기", -3, "red"));
statDisplay.create("gsaltiness", () => statDisplay.statChange("소금기", 1, "green"));
statDisplay.create("ggsaltiness", () => statDisplay.statChange("소금기", 2, "green"));
statDisplay.create("gggsaltiness", () => statDisplay.statChange("소금기", 3, "green"));

statDisplay.create("lchaos", () => statDisplay.statChange("혼란", -1, "red"));
statDisplay.create("llchaos", () => statDisplay.statChange("혼란", -2, "red"));
statDisplay.create("lllchaos", () => statDisplay.statChange("혼란", -3, "red"));
statDisplay.create("gchaos", () => statDisplay.statChange("혼란", 1, "green"));
statDisplay.create("ggchaos", () => statDisplay.statChange("혼란", 2, "green"));
statDisplay.create("gggchaos", () => statDisplay.statChange("혼란", 3, "green"));

statDisplay.create("ltrust", () => statDisplay.statChange("신뢰", -1, "red"));
statDisplay.create("lltrust", () => statDisplay.statChange("신뢰", -2, "red"));
statDisplay.create("llltrust", () => statDisplay.statChange("신뢰", -3, "red"));
statDisplay.create("gtrust", () => statDisplay.statChange("신뢰", 1, "green"));
statDisplay.create("ggtrust", () => statDisplay.statChange("신뢰", 2, "green"));
statDisplay.create("gggtrust", () => statDisplay.statChange("신뢰", 3, "green"));

statDisplay.create("loxygen", () => statDisplay.statChange("공기", -1, "blue"));
statDisplay.create("goxygen", () => statDisplay.statChange("공기", 1, "teal"));

statDisplay.create("lcontrol", () => statDisplay.statChange("통제력", -1, "red"));
statDisplay.create("llcontrol", () => statDisplay.statChange("통제력", -2, "red"));
statDisplay.create("lllcontrol", () => statDisplay.statChange("통제력", -3, "red"));
statDisplay.create("gcontrol", () => statDisplay.statChange("통제력", 1, "green"));
statDisplay.create("ggcontrol", () => statDisplay.statChange("통제력", 2, "green"));
statDisplay.create("gggcontrol", () => statDisplay.statChange("통제력", 3, "green"));
statDisplay.create("lcombatcontrol", () => statDisplay.statChange("통제력", -1, "red"));
statDisplay.create("llcombatcontrol", () => statDisplay.statChange("통제력", -2, "red"));
statDisplay.create("lllcombatcontrol", () => statDisplay.statChange("통제력", -3, "red"));
statDisplay.create("gcombatcontrol", () => statDisplay.statChange("통제력", 1, "green", () => V.control < V.controlstart));
statDisplay.create("ggcombatcontrol", () => statDisplay.statChange("통제력", 2, "green", () => V.control < V.controlstart));
statDisplay.create("gggcombatcontrol", () => statDisplay.statChange("통제력", 3, "green", () => V.control < V.controlstart));

statDisplay.create("gmystery", () => statDisplay.statChange("????", 1, "red"));
statDisplay.create("gschool", () => statDisplay.statChange("학교", 1, "green"));

statDisplay.create("gswimming", () => statDisplay.statChange("수영", 1, "green"));
statDisplay.create("ggswimming", () => statDisplay.statChange("수영", 2, "green"));
statDisplay.create("gggswimming", () => statDisplay.statChange("수영", 3, "green"));

statDisplay.create("gathletics", () => statDisplay.statChange("운동", 1, "green"));
statDisplay.create("ggathletics", () => statDisplay.statChange("운동", 2, "green"));
statDisplay.create("gggathletics", () => statDisplay.statChange("운동", 3, "green"));

statDisplay.create("gdanceskill", () => statDisplay.statChange("춤 기술", 1, "green"));
statDisplay.create("ggdanceskill", () => statDisplay.statChange("춤 기술", 2, "green"));
statDisplay.create("gggdanceskill", () => statDisplay.statChange("춤 기술", 3, "green"));

statDisplay.create("gtending", () => statDisplay.statChange("관리", 1, "green"));
statDisplay.create("ggtending", () => statDisplay.statChange("관리", 2, "green"));
statDisplay.create("gggtending", () => statDisplay.statChange("관리", 3, "green"));

statDisplay.create("ltreasure", () => statDisplay.statChange("보물 찾을 확률 감소", 0, "purple"));
statDisplay.create("gtreasure", () => statDisplay.statChange("보물 찾을 확률 증가", 0, "green"));

statDisplay.create("lharass", () => statDisplay.statChange("희롱 확률 감소", 0, "teal"));
statDisplay.create("gharass", () => statDisplay.statChange("희롱 확률 증가", 0, "pink"));
statDisplay.create("noharass", () => statDisplay.statChange("희롱 확률 없음", 0, "green"));

statDisplay.create("llove", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 사랑` : "사랑", -1, "red"));
statDisplay.create("lllove", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 사랑` : "사랑", -2, "red"));
statDisplay.create("llllove", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 사랑` : "사랑", -3, "red"));
statDisplay.create("glove", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 사랑` : "사랑", 1, "green"));
statDisplay.create("gglove", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 사랑` : "사랑", 2, "green"));
statDisplay.create("ggglove", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 사랑` : "사랑", 3, "green"));

statDisplay.create("llust", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 욕정` : "욕정", -1, "teal"));
statDisplay.create("lllust", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 욕정` : "욕정", -2, "teal"));
statDisplay.create("llllust", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 욕정` : "욕정", -3, "teal"));
statDisplay.create("glust", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 욕정` : "욕정", 1, "lewd"));
statDisplay.create("gglust", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 욕정` : "욕정", 2, "lewd"));
statDisplay.create("ggglust", npc => statDisplay.statChange(npc ? `${trNPCname(npc, '의')} 욕정` : "욕정", 3, "lewd"));

statDisplay.create("lrtrauma", override => statDisplay.statChange("로빈의 트라우마", -1, "green", () => C.npc.Robin.trauma > 0 || override));
statDisplay.create("llrtrauma", override => statDisplay.statChange("로빈의 트라우마", -2, "green", () => C.npc.Robin.trauma > 0 || override));
statDisplay.create("lllrtrauma", override => statDisplay.statChange("로빈의 트라우마", -3, "green", () => C.npc.Robin.trauma > 0 || override));
statDisplay.create("grtrauma", override => statDisplay.statChange("로빈의 트라우마", 1, "red", () => C.npc.Robin.trauma >= 20 || override));
statDisplay.create("ggrtrauma", override => statDisplay.statChange("로빈의 트라우마", 2, "red", () => C.npc.Robin.trauma >= 20 || override));
statDisplay.create("gggrtrauma", override => statDisplay.statChange("로빈의 트라우마", 3, "red", () => C.npc.Robin.trauma >= 20 || override));

statDisplay.create("lattention", () => statDisplay.statChange("주목", -1, "lewd"));
statDisplay.create("llattention", () => statDisplay.statChange("주목", -2, "lewd"));
statDisplay.create("lllattention", () => statDisplay.statChange("주목", -3, "lewd"));
statDisplay.create("gattention", loc => statDisplay.statChange("주목", 1, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));
statDisplay.create("ggattention", loc => statDisplay.statChange("주목", 2, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));
statDisplay.create("gggattention", loc => statDisplay.statChange("주목", 3, "lewd", () => !loc || (loc === "prison" && !V.daily.prison.attentionDay)));

statDisplay.create("laggro", () => statDisplay.statChange("레미의 침략", -1, "green", () => V.farm));
statDisplay.create("llaggro", () => statDisplay.statChange("레미의 침략", -2, "green", () => V.farm));
statDisplay.create("lllaggro", () => statDisplay.statChange("레미의 침략", -3, "green", () => V.farm));
statDisplay.create("gaggro", () => statDisplay.statChange("레미의 침략", 1, "red", () => V.farm));
statDisplay.create("ggaggro", () => statDisplay.statChange("레미의 침략", 2, "red", () => V.farm));
statDisplay.create("gggaggro", () => statDisplay.statChange("레미의 침략", 3, "red", () => V.farm));

statDisplay.create("lksuspicion", () => statDisplay.statChange("질투", -1, "green"));
statDisplay.create("llksuspicion", () => statDisplay.statChange("질투", -2, "green"));
statDisplay.create("lllksuspicion", () => statDisplay.statChange("질투", -3, "green"));
statDisplay.create("gksuspicion", () => statDisplay.statChange("질투", 1, "red"));
statDisplay.create("ggksuspicion", () => statDisplay.statChange("질투", 2, "red"));
statDisplay.create("gggksuspicion", () => statDisplay.statChange("질투", 3, "red"));

statDisplay.create("lsuspicion", () => statDisplay.statChange("의심", -1, "green"));
statDisplay.create("llsuspicion", () => statDisplay.statChange("의심", -2, "green"));
statDisplay.create("lllsuspicion", () => statDisplay.statChange("의심", -3, "green"));
statDisplay.create("gsuspicion", () => statDisplay.statChange("의심", 1, "red"));
statDisplay.create("ggsuspicion", () => statDisplay.statChange("의심", 2, "red"));
statDisplay.create("gggsuspicion", () => statDisplay.statChange("의심", 3, "red"));

statDisplay.create("larage", () => statDisplay.statChange("분노", -1, "green", () => V.averyragerevealed));
statDisplay.create("llarage", () => statDisplay.statChange("분노", -2, "green", () => V.averyragerevealed));
statDisplay.create("lllarage", () => statDisplay.statChange("분노", -3, "green", () => V.averyragerevealed));
statDisplay.create("garage", () => statDisplay.statChange("분노", 1, "red", () => V.averyragerevealed));
statDisplay.create("ggarage", () => statDisplay.statChange("분노", 2, "red", () => V.averyragerevealed));
statDisplay.create("gggarage", () => statDisplay.statChange("분노", 3, "red", () => V.averyragerevealed));

statDisplay.create("lendear", () => statDisplay.statChange("귀여움", -1, "pink"));
statDisplay.create("llendear", () => statDisplay.statChange("귀여움", -2, "pink"));
statDisplay.create("lllendear", () => statDisplay.statChange("귀여움", -3, "pink"));
statDisplay.create("gendear", () => statDisplay.statChange("귀여움", 1, "teal"));
statDisplay.create("ggendear", () => statDisplay.statChange("귀여움", 2, "teal"));
statDisplay.create("gggendear", () => statDisplay.statChange("귀여움", 3, "teal"));

statDisplay.create("lhope", () => statDisplay.statChange("희망", -1, "pink"));
statDisplay.create("llhope", () => statDisplay.statChange("희망", -2, "pink"));
statDisplay.create("lllhope", () => statDisplay.statChange("희망", -3, "pink"));
statDisplay.create("ghope", () => statDisplay.statChange("희망", 1, "teal"));
statDisplay.create("gghope", () => statDisplay.statChange("희망", 2, "teal"));
statDisplay.create("ggghope", () => statDisplay.statChange("희망", 3, "teal"));

statDisplay.create("lreb", () => statDisplay.statChange("반항심", -1, "blue"));
statDisplay.create("llreb", () => statDisplay.statChange("반항심", -2, "blue"));
statDisplay.create("lllreb", () => statDisplay.statChange("반항심", -3, "blue"));
statDisplay.create("greb", () => statDisplay.statChange("반항심", 1, "def"));
statDisplay.create("ggreb", () => statDisplay.statChange("반항심", 2, "def"));
statDisplay.create("gggreb", () => statDisplay.statChange("반항심", 3, "def"));

statDisplay.create("ghandskill", () => statDisplay.statChange("손 기술", 1, "green"));
statDisplay.create("goralskill", () => statDisplay.statChange("입 기술", 1, "green"));
statDisplay.create("gthighskill", () => statDisplay.statChange("허벅지 기술", 1, "green"));
statDisplay.create("gbottomskill", () => statDisplay.statChange("엉덩이 기술", 1, "green"));
statDisplay.create("gvaginalskill", () => statDisplay.statChange("보지 기술", 1, "green"));
statDisplay.create("gpenileskill", () => statDisplay.statChange("자지 기술", 1, "green"));
statDisplay.create("ganalskill", () => statDisplay.statChange("항문 기술", 1, "green"));
statDisplay.create("gfeetskill", () => statDisplay.statChange("발 기술", 1, "green"));
statDisplay.create("gchestskill", () => statDisplay.statChange("가슴 기술", 1, "green"));

statDisplay.create("lstockholm", () => statDisplay.statChange("스톡홀름 증후군", -1, "lblue"));
statDisplay.create("llstockholm", () => statDisplay.statChange("스톡홀름 증후군", -2, "lblue"));
statDisplay.create("lllstockholm", () => statDisplay.statChange("스톡홀름 증후군", -3, "lblue"));
statDisplay.create("gstockholm", () => statDisplay.statChange("스톡홀름 증후군", 1, "blue"));
statDisplay.create("ggstockholm", () => statDisplay.statChange("스톡홀름 증후군", 2, "blue"));
statDisplay.create("gggstockholm", () => statDisplay.statChange("스톡홀름 증후군", 3, "blue"));

statDisplay.create("lshame", () => statDisplay.statChange("수치", -1, "green"));
statDisplay.create("llshame", () => statDisplay.statChange("수치", -2, "green"));
statDisplay.create("lllshame", () => statDisplay.statChange("수치", -3, "green"));
statDisplay.create("gshame", () => statDisplay.statChange("수치", 1, "red"));
statDisplay.create("ggshame", () => statDisplay.statChange("수치", 2, "red"));
statDisplay.create("gggshame", () => statDisplay.statChange("수치", 3, "red"));

statDisplay.create("lfarm", () => statDisplay.statChange("농장 생산량", -1, "red"));
statDisplay.create("llfarm", () => statDisplay.statChange("농장 생산량", -2, "red"));
statDisplay.create("lllfarm", () => statDisplay.statChange("농장 생산량", -3, "red"));
statDisplay.create("gfarm", () => statDisplay.statChange("농장 생산량", 1, "green"));
statDisplay.create("ggfarm", () => statDisplay.statChange("농장 생산량", 2, "green"));
statDisplay.create("gggfarm", () => statDisplay.statChange("농장 생산량", 3, "green"));

statDisplay.create("gnet", () => statDisplay.statChange("그물 숙련도", 1, "green"));
statDisplay.create("gbaton", () => statDisplay.statChange("봉 숙련도", 1, "green"));
statDisplay.create("ggbaton", () => statDisplay.statChange("봉 숙련도", 2, "green"));
statDisplay.create("gggbaton", () => statDisplay.statChange("봉 숙련도", 3, "green"));
statDisplay.create("gwhip", () => statDisplay.statChange("채찍 숙련도", 1, "green"));
statDisplay.create("ggwhip", () => statDisplay.statChange("채찍 숙련도", 2, "green"));
statDisplay.create("gggwhip", () => statDisplay.statChange("채찍 숙련도", 3, "green"));

statDisplay.create("lsecurity", () => statDisplay.statChange("보안", -1, "green"));
statDisplay.create("llsecurity", () => statDisplay.statChange("보안", -2, "green"));
statDisplay.create("lllsecurity", () => statDisplay.statChange("보안", -3, "green"));
statDisplay.create("gsecurity", () => statDisplay.statChange("보안", 1, "red"));
statDisplay.create("ggsecurity", () => statDisplay.statChange("보안", 2, "red"));
statDisplay.create("gggsecurity", () => statDisplay.statChange("보안", 3, "red"));

statDisplay.create("limpatience", () => statDisplay.statChange("조바심", -1, "green"));
statDisplay.create("llimpatience", () => statDisplay.statChange("조바심", -2, "green"));
statDisplay.create("lllimpatience", () => statDisplay.statChange("조바심", -3, "green"));
statDisplay.create("gimpatience", () => statDisplay.statChange("조바심", 1, "red"));
statDisplay.create("ggimpatience", () => statDisplay.statChange("조바심", 2, "red"));
statDisplay.create("gggimpatience", () => statDisplay.statChange("조바심", 3, "red"));

statDisplay.create("linterest", () => statDisplay.statChange("관심", -1, "red"));
statDisplay.create("llinterest", () => statDisplay.statChange("관심", -2, "red"));
statDisplay.create("lllinterest", () => statDisplay.statChange("관심", -3, "red"));
statDisplay.create("ginterest", () => statDisplay.statChange("관심", 1, "green"));
statDisplay.create("gginterest", () => statDisplay.statChange("관심", 2, "green"));
statDisplay.create("ggginterest", () => statDisplay.statChange("관심", 3, "green"));

statDisplay.create("ldaring", () => statDisplay.statChange("대담성", -1, "red"));
statDisplay.create("lldaring", () => statDisplay.statChange("대담성", -2, "red"));
statDisplay.create("llldaring", () => statDisplay.statChange("대담성", -3, "red"));
statDisplay.create("gdaring", () => statDisplay.statChange("대담성", 1, "green"));
statDisplay.create("ggdaring", () => statDisplay.statChange("대담성", 2, "green"));
statDisplay.create("gggdaring", () => statDisplay.statChange("대담성", 3, "green"));

statDisplay.create("gknowledge", () => statDisplay.statChange("지식", 1, "green"));
statDisplay.create("gbodywriting", () => statDisplay.statChange("신체낙서", 1, "purple"));
statDisplay.create("ggbodywriting", () => statDisplay.statChange("신체낙서", 2, "purple"));
statDisplay.create("gggbodywriting", () => statDisplay.statChange("신체낙서", 3, "purple"));
statDisplay.create("ghallucinogens", () => statDisplay.statChange("환각제", 1, "lewd"));
statDisplay.create("gghallucinogens", () => statDisplay.statChange("환각제", 2, "lewd"));
statDisplay.create("ggghallucinogens", () => statDisplay.statChange("환각제", 3, "lewd"));

statDisplay.create("lobey", () => statDisplay.statChange("순종", -1, "red"));
statDisplay.create("llobey", () => statDisplay.statChange("순종", -2, "red"));
statDisplay.create("lllobey", () => statDisplay.statChange("순종", -3, "red"));
statDisplay.create("gobey", () => statDisplay.statChange("순종", 1, "pink"));
statDisplay.create("ggobey", () => statDisplay.statChange("순종", 2, "pink"));
statDisplay.create("gggobey", () => statDisplay.statChange("순종", 3, "pink"));

statDisplay.create("lhunger", () => statDisplay.statChange("배고픔", -1, "green"));
statDisplay.create("llhunger", () => statDisplay.statChange("배고픔", -2, "green"));
statDisplay.create("lllhunger", () => statDisplay.statChange("배고픔", -3, "green"));
statDisplay.create("ghunger", () => statDisplay.statChange("배고픔", 1, "red"));
statDisplay.create("gghunger", () => statDisplay.statChange("배고픔", 2, "red"));
statDisplay.create("ggghunger", () => statDisplay.statChange("배고픔", 3, "red"));

statDisplay.create("gacceptance", () => statDisplay.statChange("수용", 1, "green"));
statDisplay.create("ginsecurity", type => {
	if (type === "breasts_tiny" && V.player.gender === "m") return "";
	if (V["acceptance_" + type] <= 999) return statDisplay.statChange("불안감", 1, "red");
	return "";
});

statDisplay.create("gwillpower", () => statDisplay.statChange("의지력", 1, "green"));
statDisplay.create("ggwillpower", () => statDisplay.statChange("의지력", 2, "green"));
statDisplay.create("gggwillpower", () => statDisplay.statChange("의지력", 3, "green"));

statDisplay.create("lphysique", () => statDisplay.statChange("체격", -1, "red"));
statDisplay.create("llphysique", () => statDisplay.statChange("체격", -2, "red"));
statDisplay.create("lllphysique", () => statDisplay.statChange("체격", -3, "red"));
statDisplay.create("gphysique", () => statDisplay.statChange("체격", 1, "green"));
statDisplay.create("ggphysique", () => statDisplay.statChange("체격", 2, "green"));
statDisplay.create("gggphysique", () => statDisplay.statChange("체격", 3, "green"));

statDisplay.create("gtanned", () => statDisplay.statChange("선탠", 1, "green"));
statDisplay.create("ggtanned", () => statDisplay.statChange("선탠", 2, "green"));
statDisplay.create("gggtanned", () => statDisplay.statChange("선탠", 3, "green"));

// Conditions that modify variables like this should preferably not be in the same widget as text output
statDisplay.create("lcorruption", threat => {
	if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
	return statDisplay.statChange("오염도", -1, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
});
statDisplay.create("llcorruption", threat => {
	if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
	return statDisplay.statChange("오염도", -2, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
});
statDisplay.create("lllcorruption", threat => {
	if (V.earSlime.startedThreats && !threat) V.earSlime.startedThreats = true;
	return statDisplay.statChange("오염도", -3, "teal", () => V.earSlime.corruption > V.earSlime.growth / 2);
});
statDisplay.create("gcorruption", () => statDisplay.statChange("오염도", 1, "pink", () => V.earSlime.corruption < 100));
statDisplay.create("ggcorruption", () => statDisplay.statChange("오염도", 2, "pink", () => V.earSlime.corruption < 100));
statDisplay.create("gggcorruption", () => statDisplay.statChange("오염도", 3, "pink", () => V.earSlime.corruption < 100));

statDisplay.create("lawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("순수함", 1, "blue");
	}
	return statDisplay.statChange("성지식", -1, "blue");
});
statDisplay.create("llawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("순수함", 2, "blue");
	}
	return statDisplay.statChange("성지식", -2, "blue");
});
statDisplay.create("lllawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("순수함", 3, "blue");
	}
	return statDisplay.statChange("성지식", -3, "blue");
});
statDisplay.create("gawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("순수함", -1, "blue");
	}
	return statDisplay.statChange("성지식", 1, "lblue");
});
statDisplay.create("ggawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("순수함", -2, "blue");
	}
	return statDisplay.statChange("성지식", 2, "lblue");
});
statDisplay.create("gggawareness", () => {
	if (V.innocencestate === 1) {
		return statDisplay.statChange("순수함", -3, "blue");
	}
	return statDisplay.statChange("성지식", 3, "lblue");
});

statDisplay.create("lspurity", () => {
	const result = document.createDocumentFragment();
	if (C.npc.Sydney.purity >= 1) {
		result.append(statDisplay.statChange("시드니의 순결도", -1, "purple"));
	} else {
		result.append(statDisplay.statChange("시드니의 타락도", 1, "purple"));
	}
	if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
		result.append(statDisplay.statChange("욕정", 1, "lewd"));
	}
	T.warnstate = -1;
	return result;
});
statDisplay.create("llspurity", () => {
	const result = document.createDocumentFragment();
	if (C.npc.Sydney.purity >= 1) {
		result.append(statDisplay.statChange("시드니의 순결도", -2, "purple"));
	} else {
		result.append(statDisplay.statChange("시드니의 타락도", 2, "purple"));
	}
	if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
		result.append(statDisplay.statChange("욕정", 1, "lewd"));
	}
	T.warnstate = -2;
	return result;
});
statDisplay.create("lllspurity", () => {
	const result = document.createDocumentFragment();
	if (C.npc.Sydney.purity >= 1) {
		result.append(statDisplay.statChange("시드니의 순결도", -3, "purple"));
	} else {
		result.append(statDisplay.statChange("시드니의 타락도", 3, "purple"));
	}
	if (C.npc.Sydney.purity <= 50 && T.lustincrdisplay !== 1) {
		result.append(statDisplay.statChange("욕정", 1, "lewd"));
	}
	T.warnstate = -3;
	return result;
});
statDisplay.create("gspurity", () => {
	T.warnstate = 1;
	if (C.npc.Sydney.purity >= 1) {
		return statDisplay.statChange("시드니의 순결도", 1, "teal");
	}
	return statDisplay.statChange("시드니의 타락도", -1, "teal");
});
statDisplay.create("ggspurity", () => {
	T.warnstate = 2;
	if (C.npc.Sydney.purity >= 1) {
		return statDisplay.statChange("시드니의 순결도", 2, "teal");
	}
	return statDisplay.statChange("시드니의 타락도", -2, "teal");
});
statDisplay.create("gggspurity", () => {
	T.warnstate = 3;
	if (C.npc.Sydney.purity >= 1) {
		return statDisplay.statChange("시드니의 순결도", 3, "teal");
	}
	return statDisplay.statChange("시드니의 타락도", -3, "teal");
});
statDisplay.create("lslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("시드니의 욕정", -1, "teal");
});
statDisplay.create("llslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("시드니의 욕정", -2, "teal");
});
statDisplay.create("lllslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("시드니의 욕정", -3, "teal");
});
statDisplay.create("gslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("시드니의 욕정", 1, "lewd");
});
statDisplay.create("ggslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("시드니의 욕정", 2, "lewd");
});
statDisplay.create("gggslust", () => {
	T.lustincrdisplay = 1;
	return statDisplay.statChange("시드니의 욕정", 3, "lewd");
});

statDisplay.create("lscience", () => statDisplay.statChange("과학", -1, "red"));
statDisplay.create("gscience", () => {
	const result = statDisplay.statChange("과학", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("science_star"));
	return result;
});
statDisplay.create("ggscience", () => {
	const result = statDisplay.statChange("과학", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("science_star"));
	return result;
});
statDisplay.create("gggscience", () => {
	const result = statDisplay.statChange("과학", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("science_star"));
	return result;
});

statDisplay.create("lmaths", () => statDisplay.statChange("수학", -1, "red"));
statDisplay.create("gmaths", () => {
	const result = statDisplay.statChange("수학", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("maths_star"));
	return result;
});
statDisplay.create("ggmaths", () => {
	const result = statDisplay.statChange("수학", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("maths_star"));
	return result;
});
statDisplay.create("gggmaths", () => {
	const result = statDisplay.statChange("수학", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("maths_star"));
	return result;
});

statDisplay.create("lenglish", () => statDisplay.statChange("영어", -1, "red"));
statDisplay.create("genglish", () => {
	const result = statDisplay.statChange("영어", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("english_star"));
	return result;
});
statDisplay.create("ggenglish", () => {
	const result = statDisplay.statChange("영어", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("english_star"));
	return result;
});
statDisplay.create("gggenglish", () => {
	const result = statDisplay.statChange("영어", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("english_star"));
	return result;
});

statDisplay.create("lhistory", () => statDisplay.statChange("역사", -1, "red"));
statDisplay.create("ghistory", () => {
	const result = statDisplay.statChange("역사", 1, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("history_star"));
	return result;
});
statDisplay.create("gghistory", () => {
	const result = statDisplay.statChange("역사", 2, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("history_star"));
	return result;
});
statDisplay.create("ggghistory", () => {
	const result = statDisplay.statChange("역사", 3, "green");
	result.append(" ");
	result.appendChild(gainSchoolStar("history_star"));
	return result;
});

statDisplay.create("ghousekeeping", (amount, silent = false) => {
	if (V.statsdisable === "t") return "";
	if (amount === undefined || V.housekeeping < amount) {
		return statDisplay.statChange("정리정돈", 1, "green");
	} else if (silent === "silent") {
		return "";
	} else if (V.housekeeping >= amount) {
		return " 정리정돈 기술을 향상시키기에는 당신은 기술이 너무 좋다.";
	}
	return "";
});
statDisplay.create("gghousekeeping", amount => statDisplay.statChange("정리정돈", 2, "green", () => amount === undefined || V.housekeeping < amount));
statDisplay.create("ggghousekeeping", amount => statDisplay.statChange("정리정돈", 3, "green", () => amount === undefined || V.housekeeping < amount));

statDisplay.create("ldom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("로빈의 자신감", -1, "lblue");
	} else if (npc) targetName = npc;
	else if (V.npc.length >= 2) targetName = V.npc[0];
	return statDisplay.statChange(`${trNPCname(targetName, '의')} 지배도`, -1, "lblue");
});
statDisplay.create("lldom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("로빈의 자신감", -2, "lblue");
	} else if (npc) targetName = npc;
	else if (V.npc.length >= 2) targetName = V.npc[0];
	return statDisplay.statChange(`${trNPCname(targetName, '의')} 지배도`, -2, "lblue");
});
statDisplay.create("llldom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("로빈의 자신감", -3, "lblue");
	} else if (npc) targetName = npc;
	else if (V.npc.length >= 2) targetName = V.npc[0];
	return statDisplay.statChange(`${trNPCname(targetName, '의')} 지배도`, -3, "lblue");
});
statDisplay.create("gdom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("로빈의 자신감", 1, "purple");
	} else if (npc) targetName = npc;
	else if (V.npc.length >= 2) targetName = V.npc[0];
	return statDisplay.statChange(`${trNPCname(targetName, '의')} 지배도`, 1, "purple");
});
statDisplay.create("ggdom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("로빈의 자신감", 2, "purple");
	} else if (npc) targetName = npc;
	else if (V.npc.length >= 2) targetName = V.npc[0];
	return statDisplay.statChange(`${trNPCname(targetName, '의')} 지배도`, 2, "purple");
});
statDisplay.create("gggdom", npc => {
	let targetName = "";
	if ((V.npc.includes("Robin") && !npc) || npc === "Robin") {
		return statDisplay.statChange("로빈의 자신감", 3, "purple");
	} else if (npc) targetName = npc;
	else if (V.npc.length >= 2) targetName = V.npc[0];
	return statDisplay.statChange(`${trNPCname(targetName, '의')} 지배도`, 3, "purple");
});

statDisplay.create("lrespect", () => statDisplay.statChange("존중", -1, "red"));
statDisplay.create("llrespect", () => statDisplay.statChange("존중", -2, "red"));
statDisplay.create("lllrespect", () => statDisplay.statChange("존중", -3, "red"));
statDisplay.create("grespect", arg =>
	statDisplay.statChange("존중", 1, "green", () => arg === undefined || (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
);
statDisplay.create("ggrespect", arg =>
	statDisplay.statChange("존중", 2, "green", () => arg === undefined || (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
);
statDisplay.create("gggrespect", arg =>
	statDisplay.statChange("존중", 3, "green", () => arg === undefined || (arg === "scum" && V.pirate_rank !== 0) || (arg === "mate" && V.pirate_rank !== 1))
);

statDisplay.create("ladeviancy", () => statDisplay.statChange("알렉스의 이상성욕", -1, "green"));
statDisplay.create("lladeviancy", () => statDisplay.statChange("알렉스의 이상성욕", -2, "green"));
statDisplay.create("llladeviancy", () => statDisplay.statChange("알렉스의 이상성욕", -3, "green"));
statDisplay.create("gadeviancy", () => statDisplay.statChange("알렉스의 이상성욕", 1, "red"));
statDisplay.create("ggadeviancy", () => statDisplay.statChange("알렉스의 이상성욕", 2, "red"));
statDisplay.create("gggadeviancy", () => statDisplay.statChange("알렉스의 이상성욕", 3, "red"));

// These rely on the 'statChange' function in 'stat-changes.js'
statDisplay.create("gharmony", (amount = 1) => statChange.harmony(amount));
statDisplay.create("lharmony", (amount = 1) => statChange.harmony(-amount));
statDisplay.create("gferocity", (amount = 1) => statChange.ferocity(amount));
statDisplay.create("lferocity", (amount = 1) => statChange.ferocity(-amount));
statDisplay.create("incgpenisinsecurity", amount => statChange.gainPenisInsecurity(amount));
statDisplay.create("incggpenisinsecurity", () => statChange.gainPenisInsecurity(20));
statDisplay.create("gpenisacceptance", statChange.gainPenisAcceptance);
statDisplay.create("wolfpacktrust", statChange.wolfpacktrust);
statDisplay.create("wolfpackfear", statChange.wolfpackfear);
