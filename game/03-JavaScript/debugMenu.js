/* eslint-disable eqeqeq */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
/* A standard function to reference to avoid declaring an anonymous function repeatedly. */
const stayOnPassageFn = function () {
	return V.passage;
};

setup.debugMenu = {
	cacheDebugDiv: {},
};

setup.debugMenu.eventList = {
	Main: [
		{
			link: [`test`, `Test`],
			widgets: [`<<set $molestationstart to 0>>`],
		},
		{
			link: [`CanvasModel Example`, `CanvasModel Example`],
			widgets: [``],
		},
		{
			link: [`Home`, `Bedroom`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`Wardrobe`, `Wardrobe`],
			widgets: [``],
		},
		{
			link: [`Strip`, stayOnPassageFn],
			widgets: [`<<undressclothes "wardrobe">>`],
		},
		{
			link: [`Strip to undies`, stayOnPassageFn],
			widgets: [
				`<<generalUndress wardrobe over_upper>>`,
				`<<generalUndress wardrobe over_lower>>`,
				`<<generalUndress wardrobe upper>>`,
				`<<generalUndress wardrobe lower>>`,
			],
		},
		{
			link: [`Strip all`, stayOnPassageFn],
			widgets: [`<<undress "wardrobe">>`],
		},
		{
			link: [`Pass 1 minute`, stayOnPassageFn],
			widgets: [`<<pass 1>>`],
		},
		{
			link: [`Pass 15 minutes`, stayOnPassageFn],
			widgets: [`<<pass 15>>`],
		},
		{
			link: [`Pass 20 minutes`, stayOnPassageFn],
			widgets: [`<<pass 20>>`],
		},
		{
			link: [`Pass 1 hour`, stayOnPassageFn],
			widgets: [`<<pass 60>>`],
		},
		{
			link: [`Pass 3 hours`, stayOnPassageFn],
			widgets: [`<<pass 3 hours>>`],
		},
		{
			link: [`Pass 6 hours`, stayOnPassageFn],
			widgets: [`<<pass 6 hours>>`],
		},
		{
			link: [`Pass 12 hours`, stayOnPassageFn],
			widgets: [`<<pass 12 hours>>`],
		},
		{
			link: [`Pass 18 hours`, stayOnPassageFn],
			widgets: [`<<pass 18 hours>>`],
		},
		{
			link: [`Pass 23 hours`, stayOnPassageFn],
			widgets: [`<<pass 23 hours>>`],
		},
		{
			link: [`Pass 24 hours`, stayOnPassageFn],
			widgets: [`<<pass 24 hours>>`],
		},
		{
			link: [`Enemy Trust +++`, stayOnPassageFn],
			widgets: [`<<set $enemytrust += 2000>>`, `<<set $enemyanger -= 1000>>`],
		},
		{
			link: [`Enemy Trust ---`, stayOnPassageFn],
			widgets: [`<<set $enemytrust -= 2000>>`, `<<set $enemyanger += 1000>>`],
		},
		{
			link: [`Super Punch`, stayOnPassageFn],
			widgets: [`<<set $enemyhealth to 0>>`],
		},
		{
			link: [`Super Stroke`, stayOnPassageFn],
			widgets: [() => `<<set $enemyarousal to ` + V.enemyarousalmax + `>>`],
		},
		{
			link: [`Scream`, stayOnPassageFn],
			widgets: [`<<set $alarm to 1>>`],
		},
		{
			link: [`Finish Var (doesn't always work)`, stayOnPassageFn],
			widgets: [`<<set $finish to 1>>`],
		},
		{
			link: [`Make Rape`, stayOnPassageFn],
			widgets: [`<<set $consensual to 0>>`],
		},
		{
			link: [`Make Consensual`, stayOnPassageFn],
			widgets: [`<<set $consensual to 1>>`],
		},
		{
			link: [`Enemy Arousal ---`, stayOnPassageFn],
			widgets: [`<<set $enemyarousal to 0>>`],
		},
		{
			link: [`Roll Over`, stayOnPassageFn],
			widgets: [() => `<<set $position to ` + (V.position === "doggy" ? "doggy" : "missionary") + `>>`],
			condition() {
				return V.position === "doggy" || V.position === "missionary" ? 1 : 0;
			},
		},
		{
			link: [`Replay current passage with new RNG`, ""],
			widgets: [`<<run updateSessionRNG()>>`],
		},
		{
			link: [`RNG 1`, stayOnPassageFn],
			widgets: [`<<set $rng to 1>>`],
		},
		{
			link: [`RNG 11`, stayOnPassageFn],
			widgets: [`<<set $rng to 11>>`],
		},
		{
			link: [`RNG 21`, stayOnPassageFn],
			widgets: [`<<set $rng to 21>>`],
		},
		{
			link: [`RNG 31`, stayOnPassageFn],
			widgets: [`<<set $rng to 31>>`],
		},
		{
			link: [`RNG 41`, stayOnPassageFn],
			widgets: [`<<set $rng to 41>>`],
		},
		{
			link: [`RNG 51`, stayOnPassageFn],
			widgets: [`<<set $rng to 51>>`],
		},
		{
			link: [`RNG 61`, stayOnPassageFn],
			widgets: [`<<set $rng to 61>>`],
		},
		{
			link: [`RNG 71`, stayOnPassageFn],
			widgets: [`<<set $rng to 71>>`],
		},
		{
			link: [`RNG 81`, stayOnPassageFn],
			widgets: [`<<set $rng to 81>>`],
		},
		{
			link: [`RNG 91`, stayOnPassageFn],
			widgets: [`<<set $rng to 91>>`],
		},
		{
			link: [`RNG reroll x1`, stayOnPassageFn],
			widgets: [`<<set $rng to random(1,100)>>`],
		},
		{
			link: [`RNG reroll x3`, stayOnPassageFn],
			widgets: [`<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<set $rng to random(1,100)>>`],
		},
		{
			link: [`RNG reroll x5`, stayOnPassageFn],
			widgets: [`<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<run random(1,100)>>`, `<<set $rng to random(1,100)>>`],
		},
		{
			link: [`Wear sundress`, stayOnPassageFn],
			widgets: [`<<upperwear 1>>`],
		},
		{
			link: [`Wear swimsuit`, stayOnPassageFn],
			widgets: [`<<underlowerwear 6>>`],
		},
		{
			link: [`Testing Room`, `Testing Room`],
			widgets: [`<<upperstrip>>`, `<<lowerstrip>>`, `<<underlowerstrip>>`],
		},
		{
			link: [`End Event`, stayOnPassageFn],
			widgets: [`<<endevent>>`],
		},
		{
			link: [`Escape Vore`, stayOnPassageFn],
			widgets: [`<<set $vorestage to 0>>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`Make all beasts male`, stayOnPassageFn],
			widgets: [`<<set $monsterchance to 0>>`, `<<set $beastmalechance to 100>>`],
		},
		{
			link: [`Make all beasts female`, stayOnPassageFn],
			widgets: [`<<set $monsterchance to 0>>`, `<<set $beastmalechance to 0>>`],
		},
		{
			link: [`Make all beasts cuntboys`, stayOnPassageFn],
			widgets: [`<<set $beastmalechance to 100>>`, `<<set $cbchance to 100>>`],
		},
		{
			link: [`Make all beasts dickgirls`, stayOnPassageFn],
			widgets: [`<<set $beastmalechance to 0>>`, `<<set $dgchance to 100>>`],
		},
		{
			link: [`Make all beasts monster people`, stayOnPassageFn],
			widgets: [`<<set $monsterchance to 100>>`, `<<set $monsterhallucinations to "f">>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`Spring`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 3))>>`],
		},
		{
			link: [`Summer`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 6))>>`],
		},
		{
			link: [`Autumn`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 9))>>`],
		},
		{
			link: [`Winter`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 12))>>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`Enable basic Pregnancy features`, stayOnPassageFn],
			widgets: [`<<set $pregnancyStats.parasiteDoctorEvents to 2>>`],
		},
		{
			link: [`Get Initial Mother Trait`, stayOnPassageFn],
			widgets: [`<<set $sexStats.anus.pregnancy.motherStatus to 1>>`],
		},
		{
			link: [`Fertilise New Eggs`, stayOnPassageFn],
			widgets: [`<<fertiliseParasites>>`, `<<fertiliseParasites "vagina">>`],
		},
		{
			link: [`Pregnancy Progress Day`, stayOnPassageFn],
			widgets: [`<<parasiteProgressDay>>`],
		},
		{
			link: [`Pregnancy Progress Week`, stayOnPassageFn],
			widgets: [
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
				`<<parasiteProgressDay>>`,
			],
		},
		{
			link: [() => `Set all pregnancy events to next `, stayOnPassageFn],
			widgets: [
				`<<set _pregnancy to $sexStats.anus.pregnancy>>`,
				() => (T.pregnancy[0] == null ? "" : `<<set _pregnancy.fetus[0].timeLeft to 1>>`),
				() => (T.pregnancy[1] == null ? "" : `<<set _pregnancy.fetus[1].timeLeft to 1>>`),
				() => (T.pregnancy[2] == null ? "" : `<<set _pregnancy.fetus[2].timeLeft to 1>>`),
				() => (T.pregnancy[3] == null ? "" : `<<set _pregnancy.fetus[3].timeLeft to 1>>`),
			],
		},
		{
			text_only: `\nThese still require Fertilise`,
		},
		{
			link: [`Get Pregnant with an eel`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "eels" 1000>>`],
		},
		{
			link: [`Get Pregnant with a slime`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "slimes" 1000>>`],
		},
		{
			link: [`Get Pregnant with a worm`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "worms" 1000>>`],
		},
		{
			link: [`Get Pregnant with a tentacle`, stayOnPassageFn],
			widgets: [`<<impregnateParasite "tentacle" 1000>>`],
		},
		{
			text_only: `\n`,
		},
		{
			link: [`Repair Pregnancy Objects`, stayOnPassageFn],
			widgets: [`<<prenancyObjectRepair>>`],
		},
		{
			link: [`Reset Pregnancy Objects`, stayOnPassageFn],
			widgets: [`<<unset $container>>`, `<<run delete $sexStats.anus>>`, `<<physicalAdjustmentsInit>>`, `<<containersInit>>`],
		},
		{
			text_only: `\nVaginal Pregnancy<br>(New Pregnancy will only occur if not pregnant)\n`,
			condition() {
				return V.player.penisExist === false;
			},
		},
		{
			text_only: `Player is already pregnant\n`,
			condition() {
				return V.player.penisExist === false && getPregnancyObject().fetus.length !== 0;
			},
		},
		{
			link: [`Get Pregnant with humans`, stayOnPassageFn],
			widgets: [
				() => {
					return `<<playerPregnancy "Debug Man" "human" true "vagina" undefined true>>`;
				},
			],
			condition() {
				return V.player.penisExist === false && getPregnancyObject().fetus.length === 0;
			},
		},
		{
			link: [`Get Pregnant with wolves`, stayOnPassageFn],
			widgets: [
				() => {
					return `<<playerPregnancy "Debug Wolf" "wolf" true "vagina" undefined true>>`;
				},
			],
			condition() {
				return V.player.penisExist === false && getPregnancyObject().fetus.length === 0;
			},
		},
		{
			link: [`Progress Pregnancy to the end`, stayOnPassageFn],
			widgets: [`<<set $sexStats.vagina.pregnancy.timer to $sexStats.vagina.pregnancy.timerEnd>>`],
			condition() {
				return V.player.penisExist === false && getPregnancyObject().fetus.length !== 0;
			},
		},
		{
			link: [`End pregnancy and send children to default locations`, stayOnPassageFn],
			widgets: [
				() => {
					switch (getPregnancyObject().type) {
						case "human":
							endPlayerPregnancy("hospital", "home");
							break;
						case "wolf":
							endPlayerPregnancy("wolf_cave", "wolf_cave");
							break;
						default:
							endPlayerPregnancy("unknown", "unknown");
							break;
					}
					return "";
				},
			],
			condition() {
				return V.player.penisExist === false && getPregnancyObject().fetus.length !== 0;
			},
		},
		{
			text_only: `\nNPC Pregnancies`,
		},
		{
			text_only: `(Each npc needs to be enabled for pregnancy in setup)\n`,
		},
		{
			link: [`Get Robin Pregnant with PCs children`, stayOnPassageFn],
			widgets: [`<<namedNpcPregnancy "Robin" "pc" "human" true undefined true>>`],
		},
		{
			link: [`Get Whitney Pregnant with Black wolf pups`, stayOnPassageFn],
			widgets: [`<<namedNpcPregnancy "Whitney" "Black Wolf" "wolf" true undefined true>>`],
		},
		{
			link: [`Basic NPC Compression Test`, stayOnPassageFn],
			widgets: [
				() => {
					// Copy this debug option for use with other compressor debugging.
					const testList = {};
					const invalidList = [];
					let currentNPC;

					for (let i = 0; i < 6; i++) {
						currentNPC = V.NPCList[i].fullDescription;

						if (currentNPC) {
							if (!V.NPCNameList.includes(currentNPC)) {
								testList["NPCList" + i] = V.NPCList[i];
							} else invalidList.push(currentNPC);
						}
					}

					if (Object.keys(testList).length != 0) compressionVerifier(testList, false, true);
					if (Object.keys(invalidList).length != 0) console.log("The following NPC(s) in $NPCList could not be tested: " + invalidList.join(", "));
					else if (Object.keys(testList).length === 0 && Object.keys(invalidList).length === 0)
						console.log("There are no NPCs in the NPCList to test.");

					return "";
				},
			],
		},
		{
			link: [`Enable Debug Lines`, stayOnPassageFn],
			widgets: [`<<set $debugLines to true>>`],
		},
		{
			link: [`Disable Debug Lines`, stayOnPassageFn],
			widgets: [`<<set $debugLines to false>>`],
		},
		{
			text_only: `\n`,
		},
	],
	Events: [
		{
			link: [`Sex Shop`, `Adult Shop Menu`],
			widgets: [],
		},
		{
			link: [`Sextoys Inventory`, `Sextoys Inventory`],
			widgets: [],
		},
		{
			link: [`Imprison Me`, `Underground Intro`],
			widgets: [`<<generate1>>`, `<<generate2>>`, `<<person1>>`],
		},
		{
			link: [`Imprison Me with Robin`, `Underground Intro`],
			widgets: [`<<set $phase to 1>>`],
		},
		{
			link: [`Start Robin Event`, stayOnPassageFn],
			widgets: [`<<set $robindebt to 9>>`],
		},
		{
			link: [`School Start`, `Oxford Street`],
			widgets: [`<<pass 1 day>>`],
		},
		{
			link: [`Rape Me`, `Molestation`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Double Rape Me`, `Forest Molestation`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Gang Rape Me w/ Audience`, `The Pod`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Sex Me [M]`, `Beach Day Encounter Sex`],
			widgets: [`<<endcombat>>`, `<<generateNPC 1 a m m>>`, `<<person1>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`Sex Me [F]`, `Beach Day Encounter Sex`],
			widgets: [`<<endcombat>>`, `<<generateNPC 1 a f f>>`, `<<person1>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`Gang Sex Me w/ Audience`, `Maths Lesson Gang Bang`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`DP Test`, `DP Test`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Choke Suffocate Test`, `Beach Day Encounter Sex`],
			widgets: [
				`<<endcombat>>`,
				`<<generate1>>`,
				`<<person1>>`,
				`<<set $sexstart to 1>>`,
				`<<set $oxygen to 0>>`,
				`<<set $suffocating to 3>>`,
				`<<set $NPCList[0].righthand to "throat">>`,
				`<<set $neckuse to "hand">>`,
				`<<set $askedtochoke to 1>>`,
			],
		},
		{
			link: [`Named NPC Gangbang Test`, `Named NPC Gangbang Select`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`NPC role select`, `NPC Role Select`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`NPC clothing select`, `NPC Clothing Select`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`NNPC Strapon test`, `NNPC Strapon Generator`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: [`Plantperson Test`, `Plantperson Test`],
			widgets: [`<<endcombat>>`],
		},
		{
			link: ["Hypnotist Test", "Hypnotist Test"],
			widgets: ["<<endcombat>>"],
		},
		{
			link: [`Pregnancy Belly Test`, `Pregnancy Belly Test`],
			widgets: [`<<endcombat>><<set $sexstart to 1>>`],
		},
		{
			link: [`Eels Swarm Me`, `Sea Eels`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Machine`, `Machine`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Struggle`, `Struggle`],
			widgets: [`<<endcombat>>`, `<<set $struggle_start to 1>>`],
		},
		{
			link: [`Bus Rape`, `Bus move`],
			widgets: [`<<endcombat>>`, `<<generate1>>`, `<<person1>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Whale Vore Me`, `Monster Test`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Dogs Rape Me`, "Street Dogs"],
			widgets: [
				`<<endcombat>>`,
				`<<set $molestationstart to 1>>`,
				`<<beastNEWinit 3 dog>>`,
				`<<set $outside to 1>>`,
				`<<set $location to "town">>`,
				`<<set $bus to "domus">>`,
			],
		},
		{
			link: [`Beast Gang Test (currently broken)`, `The Farm`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<set $outside to 1>>`, `<<location "forest">>`, `<<set $bus to "forest">>`],
		},
		{
			link: [`Dolphin Sex Me`, `Sea Dolphins Sex`],
			widgets: [
				`<<endcombat>>`,
				`<<set $sexstart to 1>>`,
				`<<beastNEWinit 3 dolphin>>`,
				`<<set $outside to 1>>`,
				`<<location to "sea">>`,
				`<<set $bus to "sea">>`,
			],
		},
		{
			link: [`Cow Test`, `Cow Test Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`],
		},
		{
			link: [`Tentacle Rape Me`, `Sea Tentacles`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Bailey Test`, `Bus move`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Bailey>>`, `<<person1>>`],
		},
		{
			link: [`Leighton Office Spank`, `School Detention`],
			widgets: [`<<endcombat>>`, `<<set $detention to 55>>`],
		},
		{
			link: [`Enslave Me`, `Underground Intro`],
			widgets: [`<<endcombat>>`, `<<generate1>>`, `<<generate2>>`, `<<person1>>`],
		},
		{
			link: [`Work as a dancer`, `Brothel Dance`],
			widgets: [
				`<<endcombat>>`,
				`<<danceinit>>`,
				`<<set $dancing to 1>>`,
				`<<set $venuemod to 3>>`,
				`<<stress -4>>`,
				`<<tiredness 4>>`,
				`<<set $dancelocation to "brothel">>`,
			],
		},
		{
			link: [`Eden Start`, `Eden Cabin`],
			widgets: [
				`<<endcombat>>`,
				`<<set $syndromeeden to 1>>`,
				`<<set $NPCName[$NPCNameList.indexOf("Eden")].lust to 0>>`,
				`<<set $edenshrooms to 0>>`,
				`<<set $edengarden to 0>>`,
				`<<set $edenspring to 0>>`,
				`<<set $wardrobes.edensCabin.unlocked to true>>`,
			],
		},
		{
			link: [`Kylar Basement Rape`, `Kylar Basement Rape`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Kylar>>`, `<<person1>>`],
		},
		{
			link: [`Kylar Sex`, `Street Kylar Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<set $location to "town">>`, `<<npc Kylar>>`, `<<person1>>`],
		},
		{
			link: [`Robin Sex Start`, `Bed Robin Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<npc Robin>>`, `<<person1>>`],
		},
		{
			link: [`Robin Pillory Watch`, `Robin Pillory Watch`],
			widgets: [`<<robinPunishment "pillory">>`, `<<set $robinmissing to "pillory">>`, `<<set $robinPillory.known to 1>>`],
		},
		{
			link: [`Distract Robin Crowd`, stayOnPassageFn],
			widgets: [`<<set $robinPillory.distracted to 1>>`],
		},
		{
			link: [`Briar Pay Refuse`, `Brothel Pay Refuse`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Briar>>`, `<<generate2>>`, `<<generate3>>`, `<<person1>>`],
		},
		{
			link: [`Leighton Sex`, `Head's Office Photoshoot Sex`],
			widgets: [`<<endcombat>>`, `<<set $sexstart to 1>>`, `<<set $phase to 1>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`Leighton Forced`, `Head's Office Blackmail Rape`],
			widgets: [`<<endcombat>>`, `<<set $molestationstart to 1>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`Avery Date`, `Domus Street`],
			widgets: [`<<set $averydate to 1>>`, `<<set Time.setTime(20, 0)>>`],
		},
		{
			link: [`Black Wolf Forced`, `Forest Wolf Molestation`],
			widgets: [
				/* `<<beastNNPCinit>>`, */
				`<<endcombat>>`,
				`<<npc "Black Wolf">>`,
				`<<set $molestationstart to 1>>`,
			],
		},
		{
			link: [`Police Pillory Start`, `Police Pillory Start`],
			widgets: [`<<set $crime to 5000>>`, `<<generate1>>`, `<<person1>>`],
		},
		{
			link: [`Put Whitney in the Pillory`, stayOnPassageFn],
			widgets: [`<<imprison_whitney>>`],
		},
		{
			link: [`Put Leighton in the Pillory`, stayOnPassageFn],
			widgets: [`<<imprison_leighton>>`],
		},
		{
			link: [`Clear the Pillory`, stayOnPassageFn],
			widgets: [`<<clear_pillory>>`],
		},
		{
			link: [`Put random NPC in the Pillory`, stayOnPassageFn],
			widgets: [`<<clear_pillory>><<new_npc_pillory>>`],
		},
		{
			link: [`Hole in wall`, `Temple Arcade 2`],
			widgets: [``],
		},
		{
			link: [`Brothel Punishment`, `Brothel Punishment`],
			widgets: [``],
		},
		{
			link: [`Brothel Gloryhole`, `Brothel Gloryhole`],
			widgets: [``],
		},
		{
			link: [`Clothing Shop`, `Clothing Shop`],
			widgets: [``],
		},
		{
			link: [`Forest Shop`, `Forest Shop`],
			widgets: [``],
		},
		{
			link: [`Sea`, `Sea`],
			widgets: [`<<set $sea to 0>>`],
		},
		{
			link: [`Hospital`, `Hospital Foyer`],
			widgets: [``],
		},
		{
			link: [`Wolf Pack`, `Forest Wolf Cave`],
			widgets: [`<<set $wolfpacktrust to 12>>`],
		},
		{
			link: [`Halloween`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 10, 21, 7))>>`],
		},
		{
			link: [`Full winter`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 12, 1, 7))>>`],
		},
		{
			link: [`Christmas`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 12, 18, 7))>>`],
		},
		{
			link: [`Blood moon`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, Time.month, Time.lastDayOfMonth, 21, 0))>>`, `<<set $moonstate to "evening">>`],
		},
		{
			link: [`Month is October`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.year, 10))>>`],
		},
		{
			link: [`Ambulance Rescue Wakeup`, `Ambulance rescue`],
			widgets: [`<<pass 1 hour>>`],
		},
		{
			link: [`Harper Appointment`, `Hospital Foyer`],
			widgets: [`<<set Time.setDate(Time.getNextWeekdayDate(6))>>`, `<<set Time.setTime(16)>>`],
		},
		{
			link: [`Deep forest`, `Forest`],
			widgets: [`<<set $forest to 80>>`],
		},
		{
			link: [`Street Police Extreme`, `Street Police Extreme`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`Brothel Show Swarm`, `Brothel Show Swarm`],
			widgets: [
				`<<leash 1>>`,
				`<<set $leftarm to "bound">>`,
				`<<set $rightarm to "bound">>`,
				`<<set $feetuse to "bound">>`,
				`<<set $sexstart to 1>>`,
				`<<set $rng to random(1,100)>>`,
				`<<npc Briar>>`,
				`<<person1>>`,
			],
		},
		{
			link: [`Pussy Inspection`, `Pussy Inspection`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`Penis Inspection`, `Penis Inspection`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`Breast Inspection`, `Breast Inspection`],
			widgets: [`<<pass 1 week>>`, `<<pass 1 week>>`, `<<npc Leighton>>`, `<<person1>>`],
		},
		{
			link: [`Science Class Exposure`, `Science Event3`],
			widgets: [`<<set $scienceprogression to 3>>`, `<<set $delinquency to 600>>`],
		},
		{
			link: [`History Class Pillory`, `History Lesson Pillory`],
			widgets: [``],
		},
		{
			link: [`Alley Dog`, `Alley Dog`],
			widgets: [``],
		},
		{
			link: [`NNPC Parade`, `NNPC Parade`],
			widgets: [``],
		},
		{
			link: [`Beast Parade`, `Beast Parade`],
			widgets: [``],
		},
		{
			link: [`Beast Train`, `Beast Train`],
			widgets: [``],
		},
		{
			link: [`Demon Encounter`, `Demon Start`],
			widgets: [``],
		},
		{
			link: [`Temple Initiate`, `Temple`],
			widgets: [`<<inittemple>>`],
		},
		{
			link: [`Strip Club`, `Strip Club`],
			widgets: [`<<set $id to 1>>`, `<<set $wardrobes.stripClub.unlocked to true>>`],
		},
		{
			link: [`Asylum`, `Hospital Bed`],
			widgets: [`<<set $trauma to 4900>>`],
		},
		{
			link: [`Prison`, `Police Prison Intro Bailey`],
			widgets: [`<<npc Bailey>>`, `<<generate2>>`, `<<generate3>>`, `<<generate4>>`, `<<person2>>`, `<<neckwear 1>>`, `<<crimeup 5000>>`],
		},
		{
			link: [`Remy's Farm`, `Livestock Intro`],
			widgets: [``],
		},
		{
			link: [`Farmlands`, `Farmland`],
			widgets: [``],
		},
		{
			link: [`Museum`, `Museum`],
			widgets: [``],
		},
		{
			link: [`Beach Cave`, `Beach Cave`],
			widgets: [`<<set $cave to 0>>`, `<<beach_cave_init>>`],
		},
		{
			link: [`Stall Rent`, `Stall Rent`],
			widgets: [`<<run Time.setTime(6, 0)>>`],
		},
		{
			link: [`Estate`, `Estate`],
			widgets: [`<<estate_end>>`, `<<estate_init secret>>`],
		},
		{
			link: [`Stalk me`, `Street Stalk`],
			widgets: [`<<endcombat>>`, `<<generate1>>`, `<<person1>>`, `<<set $molestationstart to 1>>`],
		},
		{
			link: [`Named NPC stalk test`, `Named NPC Stalk Select`],
			widgets: [`<<endcombat>>`, `<<set $phase to 0>>`],
		},
		{
			link: [`Bailey selling Robin`, `Orphanage`],
			widgets: [
				`<<set $renttime to 0>>`,
				`<<set $baileydefeatedchain to 3>>`,
				`<<set $robinpaid to 1>>`,
				`<<set $robinromance to 1>>`,
				`<<set $bus to "home">>`,
				`<<set $location to "home">>`,
			],
		},
		{
			link: [`Summon the Wraith`, `Wraith Test Start`],
			widgets: [
				`<<endcombat>>`,
				`<<run Time.setDate(new DateTime(Time.year, Time.month, Time.lastDayOfMonth, 21, 0))>>`,
				`<<set $moonstate to "evening">>`,
			],
		},
		{
			link: [`Possessed Fight`, `Possessed Fight Test`],
			widgets: [`<<set $control to 0>>`, `<<set $possessed to true>>`],
		},
		{
			text_only: "\n\nBeast encounters",
		},
		{
			link: ["Horse", "Livestock Field Horse Lewd Sex"],
			widgets: ["<<endcombat>>", "<<set $sexstart to 1>>"],
		},
		{
			link: ["Pig", "Livestock Job Pig Rape"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'pig'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			link: ["Boar", "Forest Boar Rape"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'boar'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			link: ["Dog", "Wolf Pack"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'dog'>>", "<<person1>>", "<<set $molestationstart to 1>>"],
		},
		{
			link: ["Fox", "Meadow Cave Sex"],
			widgets: ["<<endcombat>>", "<<beastNEWinit 1 'fox'>>", "<<person1>>", "<<set $sexstart to 1>>"],
		},
		{
			text_only: "\n\nTurn beast into: ",
		},
		{
			link: [`Creature`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "creature">>`],
		},
		{
			link: [`Dog`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "dog">>`],
		},
		{
			link: [`Wolf`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "wolf">>`],
		},
		{
			link: [`Dolphin`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "dolphin">>`],
		},
		{
			link: [`Bear`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "bear">>`],
		},
		{
			link: [`Boar`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "boar">>`],
		},
		{
			link: [`Pig`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "pig">>`],
		},
		{
			link: [`Lizard`, stayOnPassageFn],
			widgets: [`<<set _xy to $enemyno-1>>`, `<<set $NPCList[_xy].type to "lizard">>`],
		},
		{
			text_only: "\n\nSwarm Encounters:",
		},
		{
			link: [`Ruin Fish`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "fish" "container" "shaking" "shatter" "steady" 4 6>>`, `<<set $water to 1>>`],
		},
		{
			link: [`Lake Fish`, `Swarm Test`],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "fish" "swarm" "moving towards you" "encircle you" "fend off" 1 7>>`,
				`<<set $water to 1>>`,
			],
		},
		{
			link: [`Forest Snakes`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "snakes" "swarm" "slithering" "slither" "keep back" 10 0>>`],
		},
		{
			link: [`Danube Spiders`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "spiders" "sac" "slipping" "break" "steady" 1 9>>`],
		},
		{
			link: [`Bath Slimes`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "slimes" "slime mass" "moving towards you" "encircle you" "fend off" 8 0>>`],
		},
		{
			link: [`Trash Maggots`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "maggots" "swarm" "crawling" "crawl" "keep back" 2 8>>`],
		},
		{
			link: [`Science Worms`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "worms" "jar" "held above the terrarium" "fall into the terrarium" "block" 0 10>>`],
		},
		{
			link: [`Sea Eels`, `Swarm Test`],
			widgets: [
				`<<set $molestationstart to 1>>`,
				`<<swarminit "eels" "swarm" "moving towards you" "encircle you" "fend off" 1 9>>`,
				`<<set $water to 1>>`,
			],
		},
		{
			link: [`Crate Worms`, `Swarm Test`],
			widgets: [`<<set $molestationstart to 1>>`, `<<swarminit "worms" "container" "shaking" "shatter" "steady" 1 9>>`],
		},
		{
			text_only: `\nEvent Debugging:`,
		},
		{
			link: [`Test NPC Insertion`, `NPCInsertionAssert`],
			widgets: [``],
		},
		{
			link: [`Time Test`, `TimeTest`],
			widgets: [`<<set $prevPassage to $passage>>`, `<<set $timeDistortion to 5>>`],
		},
	],
	Character: [
		{
			link: [`Default allure`, stayOnPassageFn],
			widgets: [`<<set $alluretest to 0>>`],
			condition() {
				return V.alluretest >= 1;
			},
		},
		{
			link: [`Become Alluring`, stayOnPassageFn],
			widgets: [`<<set $alluretest to 1>>`],
			condition() {
				return V.alluretest < 1;
			},
		},
		{
			link: [`Become Unalluring`, stayOnPassageFn],
			widgets: [`<<set $alluretest to 2>>`],
			condition() {
				return V.alluretest < 1;
			},
		},
		{
			link: [`Hide`, stayOnPassageFn],
			widgets: [`<<dontHideRevert>>`],
			condition() {
				return V.dontHide;
			},
		},
		{
			link: [`Don't hide`, stayOnPassageFn],
			widgets: [`<<dontHideForNow>>`],
			condition() {
				return !V.dontHide;
			},
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`All Fame Up`, stayOnPassageFn],
			widgets: [
				`<<fameexhibitionism 1000 "none" true>>`,
				`<<fameprostitution 1000 "none" true>>`,
				`<<famebestiality 1000 "none" true>>`,
				`<<famerape 1000 "none" true>>`,
				`<<famesex 1000 "none" true>>`,
				`<<famepregnancy 1000 "none" true>>`,
				`<<famegood 1000 "none" true>>`,
				`<<famebusiness 1000 "none" true>>`,
				`<<famepimp 1000 "none" true>>`,
				`<<famescrap 1000 "none" true>>`,
				`<<famesocial 1000 "none" true>>`,
				`<<famemodel 1000 "none" true>>`,
			],
		},
		{
			link: [`Fame Sex Up`, stayOnPassageFn],
			widgets: [`<<famesex 2000 "none" true>>`],
		},
		{
			link: [`Timer Down`, stayOnPassageFn],
			widgets: [`<<set $timer -= 60>>`],
		},
		{
			link: [`Full Lewd Characteristics`, stayOnPassageFn],
			widgets: [`<<set $promiscuity += 100>>`, `<<set $exhibitionism += 100>>`, `<<set $deviancy += 100>>`],
		},
		{
			link: [`Exhibitionism`, stayOnPassageFn],
			widgets: [`<<set $exhibitionism += 20>>`],
		},
		{
			link: [`Promiscuity`, stayOnPassageFn],
			widgets: [`<<set $promiscuity += 20>>`],
		},
		{
			link: [`Deviancy`, stayOnPassageFn],
			widgets: [`<<set $deviancy += 20>>`],
		},
		{
			link: [`Beauty`, stayOnPassageFn],
			widgets: [`<<set $beauty += 10000>>`],
		},
		{
			link: [`Physique`, stayOnPassageFn],
			widgets: [`<<set $physique += 2000>>`],
		},
		{
			link: [`Awareness up`, stayOnPassageFn],
			widgets: [`<<set $awareness += 200>>`],
		},
		{
			link: [`Awareness down`, stayOnPassageFn],
			widgets: [`<<set $awareness -= 200>>`],
		},
		{
			link: [`Purity Up`, stayOnPassageFn],
			widgets: [`<<set $purity += 500>>`],
		},
		{
			link: [`Purity Down`, stayOnPassageFn],
			widgets: [`<<set $purity -= 500>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Pain Up`, stayOnPassageFn],
			widgets: [`<<set $pain += 50>>`],
		},
		{
			link: [`Pain Down`, stayOnPassageFn],
			widgets: [`<<set $pain -= 50>>`],
		},
		{
			link: [`Stress Up`, stayOnPassageFn],
			widgets: [`<<set $stress += 5000>>`],
		},
		{
			link: [`Stress Down`, stayOnPassageFn],
			widgets: [`<<set $stress -= 5000>>`],
		},
		{
			link: [`Trauma Way Up`, stayOnPassageFn],
			widgets: [`<<set $trauma += 2000>>`],
		},
		{
			link: [`Trauma Way Down`, stayOnPassageFn],
			widgets: [`<<set $trauma -= 2000>>`],
		},
		{
			link: [`Arousal max`, stayOnPassageFn],
			widgets: [`<<arousal $arousalmax>>`],
		},
		{
			link: [`Arousal zero`, stayOnPassageFn],
			widgets: [`<<arousal 0>>`],
		},
		{
			link: [`Booze`, stayOnPassageFn],
			widgets: [`<<alcohol 60>>`],
		},
		{
			link: [`Drugged`, stayOnPassageFn],
			widgets: [`<<set $drugged += 600>>`],
		},
		{
			link: [`Hallucinogen`, stayOnPassageFn],
			widgets: [`<<set $hallucinogen += 600>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Sunlight`, stayOnPassageFn],
			widgets: [`<<set $weather to "clear">>`],
		},
		{
			link: [`Wash`, stayOnPassageFn],
			widgets: [`<<wash>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Seduction Up`, stayOnPassageFn],
			widgets: [`<<set $seductionskill += 200>>`],
		},
		{
			link: [`Skulduggery Up`, stayOnPassageFn],
			widgets: [`<<set $skulduggery += 200>>`],
		},
		{
			link: [`Swimming Skill Up`, stayOnPassageFn],
			widgets: [`<<set $swimmingskill += 100>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Crime Up`, stayOnPassageFn],
			widgets: [`<<set $crime += 500>>`],
		},
		{
			link: [`Crime Down`, stayOnPassageFn],
			widgets: [`<<set $crime -= 500>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Reset NPC[0]'s Hand`, stayOnPassageFn],
			widgets: [`<<set $NPCList[0].lefthand to 0>>`, `<<set $NPCList[0].righthand to 0>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Chastity Belt`, stayOnPassageFn],
			widgets: [`<<genitalswear 1>>`],
		},
		{
			link: [`Chastity Cage`, stayOnPassageFn],
			widgets: [`<<genitalswear 2>>`],
		},
		{
			link: [`Collar`, stayOnPassageFn],
			widgets: [`<<leash 21>>`],
		},
		{
			link: [`Bind`, stayOnPassageFn],
			widgets: [`<<set $leftarm to "bound">>`, `<<set $rightarm to "bound">>`],
		},
		{
			link: [`UnBind`, stayOnPassageFn],
			widgets: [`<<unbind>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Breasts Up`, stayOnPassageFn],
			widgets: [`<<set $player.breastsize += 1>>`],
		},
		{
			link: [`Breasts Down`, stayOnPassageFn],
			widgets: [`<<set $player.breastsize -= 1>>`],
		},
		{
			link: [`Butt Up`, stayOnPassageFn],
			widgets: [`<<set $player.bottomsize += 1>>`],
		},
		{
			link: [`Butt Down`, stayOnPassageFn],
			widgets: [`<<set $player.bottomsize -= 1>>`],
		},
		{
			link: [`Penis Up`, stayOnPassageFn],
			widgets: [`<<set $player.penissize += 1>>`],
		},
		{
			link: [`Penis Down`, stayOnPassageFn],
			widgets: [`<<set $player.penissize -= 1>>`],
		},
		{
			link: [`Balls Up`, stayOnPassageFn],
			widgets: [`<<set $ballssize += 1>>`],
		},
		{
			link: [`Balls Down`, stayOnPassageFn],
			widgets: [`<<set $ballssize -= 1>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Money`, stayOnPassageFn],
			widgets: [`<<set $money += 500000>>`],
		},
		{
			link: [`Grow hair`, stayOnPassageFn],
			widgets: [`<<set $hairlength += 100>>`],
		},
		{
			link: [`Grow fringe`, stayOnPassageFn],
			widgets: [`<<set $fringelength += 100>>`],
		},
		{
			link: [`Chest Parasite`, stayOnPassageFn],
			widgets: [`<<parasite nipples urchin>>`],
		},
		{
			link: [`Penis Parasite`, stayOnPassageFn],
			widgets: [`<<parasite penis urchin>>`],
		},
		{
			link: [`Chastity Parasite`, stayOnPassageFn],
			widgets: [`<<set $analchastityparasite to "worms">>`],
		},
		{
			link: [`Month`, stayOnPassageFn],
			widgets: [`<<run Time.setDate(new DateTime(Time.date).addMonth(1)>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Delinquency`, stayOnPassageFn],
			widgets: [`<<set $delinquency += 1000>>`],
		},
		{
			link: [`Detention`, stayOnPassageFn],
			widgets: [`<<set $detention += 10>>`],
		},
		{
			link: [`School Skills`, stayOnPassageFn],
			widgets: [
				`<<set $school += 8000>>`,
				`<<set $science += 800>>`,
				`<<set $maths += 800>>`,
				`<<set $english += 800>>`,
				`<<set $history += 800>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
			],
		},
		{
			link: [`School Exam Skill`, stayOnPassageFn],
			widgets: [`<<set $science_exam += 1000>>`, `<<set $maths_exam += 1000>>`, `<<set $english_exam += 1000>>`, `<<set $history_exam += 1000>>`],
		},
		{
			link: [`All Skills`, stayOnPassageFn],
			widgets: [
				`<<set $school += 448>>`,
				`<<set $science += 112>>`,
				`<<set $maths += 112>>`,
				`<<set $english += 112>>`,
				`<<set $history += 112>>`,
				`<<set $skulduggery += 112>>`,
				`<<set $danceskill += 112>>`,
				`<<set $swimmingskill += 112>>`,
				`<<set $bottomskill += 112>>`,
				`<<set $seductionskill += 112>>`,
				`<<set $handskill += 112>>`,
				`<<set $feetskill += 112>>`,
				`<<set $chestskill += 112>>`,
				`<<set $thighskill += 112>>`,
				`<<set $oralskill += 112>>`,
				`<<set $analskill += 112>>`,
				`<<set $vaginalskill += 112>>`,
				`<<set $penileskill += 112>>`,
			],
		},
		{
			link: [`All Skills Super`, stayOnPassageFn],
			widgets: [
				`<<set $school += 4000>>`,
				`<<set $science += 1000>>`,
				`<<set $maths += 1000>>`,
				`<<set $english += 1000>>`,
				`<<set $history += 1000>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
				`<<set $skulduggery += 1000>>`,
				`<<set $danceskill += 1000>>`,
				`<<set $swimmingskill += 1000>>`,
				`<<set $bottomskill += 1000>>`,
				`<<set $seductionskill += 1000>>`,
				`<<set $handskill += 1000>>`,
				`<<set $feetskill += 1000>>`,
				`<<set $chestskill += 1000>>`,
				`<<set $thighskill += 1000>>`,
				`<<set $oralskill += 1000>>`,
				`<<set $analskill += 1000>>`,
				`<<set $vaginalskill += 1000>>`,
				`<<set $penileskill += 1000>>`,
			],
		},
		{
			link: [`School Status Up`, stayOnPassageFn],
			widgets: [`<<set $cool += 400>>`],
		},
		{
			link: [`School Status Down`, stayOnPassageFn],
			widgets: [`<<set $cool -= 400>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Destroy Swimming Outfits`, stayOnPassageFn],
			widgets: [`<<set $upperschoolswimsuitno to 0>>`, `<<set $lowerschoolswimsuitno to 0>>`, `<<set $schoolswimshortsno to 0>>`],
		},
		{
			link: [`Towels`, stayOnPassageFn],
			widgets: [`<<clothesontowel>>`],
		},
		{
			link: [`Towels Please`, stayOnPassageFn],
			widgets: [`<<towelup>>`],
		},
		{
			link: [`Submission`, stayOnPassageFn],
			widgets: [`<<set $submissive += 250>>`],
		},
		{
			link: [`Defiance`, stayOnPassageFn],
			widgets: [`<<set $submissive -= 250>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Robin Love`, stayOnPassageFn],
			widgets: [`<<npcincr Robin love 100>>`, `<<npcincr Robin lust 100>>`],
		},
		{
			link: [`Robin Note`, stayOnPassageFn],
			widgets: [`<<set $robinnote to 1>>`],
		},
		{
			link: [`Robin Romance`, stayOnPassageFn],
			widgets: [`<<set $robinromance to 1>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Sex Statistics Up`, stayOnPassageFn],
			widgets: [
				`<<set $orgasmstat += 2000>>`,
				`<<set $ejacstat += 2000>>`,
				`<<set $moleststat += 2000>>`,
				`<<set $rapestat += 1000>>`,
				`<<set $beastrapestat += 500>>`,
				`<<set $tentaclerapestat += 200>>`,
				`<<set $swallowedstat += 100>>`,
				`<<set $prostitutionstat += 10>>`,
			],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Almost Destroy Lowerclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.lower.integrity to 1>>`],
		},
		{
			link: [`Almost Destroy Upperclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.upper.integrity to 1>>`],
		},
		{
			link: [`Almost Destroy Underclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.under_lower.integrity to 1>>`],
		},
		{
			link: [`Almost Destroy Underupperclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.under_upper.integrity to 1>>`],
		},
		{
			link: [`Damage Lowerclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.lower.integrity -= 200>>`],
		},
		{
			link: [`Damage Upperclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.upper.integrity -= 200>>`],
		},
		{
			link: [`Damage Underupperclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.under_upper.integrity -= 200>>`],
		},
		{
			link: [`Damage Underclothes`, stayOnPassageFn],
			widgets: [`<<set $worn.under_lower.integrity -= 200>>`],
		},
		{
			link: [`Damage Chastity`, stayOnPassageFn],
			widgets: [`<<set $worn.genitals.integrity -= 5000>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Cat up`, stayOnPassageFn],
			widgets: [`<<set $cat += 1>>`],
		},
		{
			link: [`Cat build up`, stayOnPassageFn],
			widgets: [`<<set $catbuild += 80>>`],
		},
		{
			link: [`Cat off`, stayOnPassageFn],
			widgets: [`<<set $cat = 0>>`],
		},
		{
			link: [`Wolf off`, stayOnPassageFn],
			widgets: [`<<set $wolfgirl to 0>>`],
		},
		{
			link: [`Wolf up`, stayOnPassageFn],
			widgets: [`<<set $wolfgirl += 1>>`],
		},
		{
			link: [`Wolf build up`, stayOnPassageFn],
			widgets: [`<<set $wolfbuild += 40>>`],
		},
		{
			link: [`Wolf build down`, stayOnPassageFn],
			widgets: [`<<set $wolfbuild -= 40>>`],
		},
		{
			link: [`Oh For Fox Sake`, stayOnPassageFn],
			widgets: [`<<set $fox to 0>>`],
		},
		{
			link: [`Go Fox Yourself`, stayOnPassageFn],
			widgets: [`<<set $fox += 1>>`],
		},
		{
			link: [`Fox build up`, stayOnPassageFn],
			widgets: [`<<set $foxbuild += 40>>`],
		},
		{
			link: [`Fox build down`, stayOnPassageFn],
			widgets: [`<<set $foxbuild -= 40>>`],
		},
		{
			link: [`Cow build up`, stayOnPassageFn],
			widgets: [`<<set $cowbuild += 40>>`],
		},
		{
			link: [`Cow build down`, stayOnPassageFn],
			widgets: [`<<set $cowbuild -= 40>>`],
		},
		{
			link: [`Angel build up`, stayOnPassageFn],
			widgets: [`<<set $angelbuild += 40>>`],
		},
		{
			link: [`Angel build down`, stayOnPassageFn],
			widgets: [`<<set $angelbuild -= 40>>`],
		},
		{
			link: [`Demon build up`, stayOnPassageFn],
			widgets: [`<<set $demonbuild += 40>>`],
		},
		{
			link: [`Demon build down`, stayOnPassageFn],
			widgets: [`<<set $demonbuild -= 40>>`],
		},
		{
			link: [`Undertemp off`, stayOnPassageFn],
			widgets: [`<<set $undertemp to 0>>`],
		},
		{
			link: [`Goo Me`, stayOnPassageFn],
			widgets: [`<<drench "semen" "slime" 5>>`],
		},
		{
			link: [`Goo Me Small`, stayOnPassageFn],
			widgets: [`<<drench "semen" "slime" 1>>`],
		},
		{
			link: [`Drench me`, stayOnPassageFn],
			widgets: [`<<set $upperwet to 200>>`, `<<set $lowerwet to 200>>`, `<<set $underupperwet to 200>>`, `<<set $underlowerwet to 200>>`],
		},
		{
			link: [`Drench over-outfit only`, stayOnPassageFn],
			widgets: [`<<set $overupperwet to 200>>`, `<<set $overlowerwet to 200>>`],
		},
		{
			link: [`Drench middle-outfit only`, stayOnPassageFn],
			widgets: [`<<set $upperwet to 200>>`, `<<set $lowerwet to 200>>`],
		},
		{
			link: [`Drench under-outfit only`, stayOnPassageFn],
			widgets: [`<<set $underupperwet to 200>>`, `<<set $underlowerwet to 200>>`],
		},
		{
			link: [`Soak me in water`, stayOnPassageFn],
			widgets: [`<<water>>`],
		},
		{
			link: [`Bully Timer`, stayOnPassageFn],
			widgets: [`<<set $bullytimer to 100>>`, `<<set $bullytimeroutside to 100>>`],
		},
		{
			link: [`Whitney Lower Dominance`, stayOnPassageFn],
			widgets: [`<<npcincr Whitney dom -20>>`],
		},
		{
			link: [`Whitney Raise Dominance`, stayOnPassageFn],
			widgets: [`<<npcincr Whitney dom 20>>`],
		},
		{
			link: [`Whitney Love`, stayOnPassageFn],
			widgets: [`<<npcincr Whitney love 20>>`, `<<npcincr Whitney lust 20>>`],
		},
		{
			link: [`Whitney Romance`, stayOnPassageFn],
			widgets: [`<<set $whitneyromance to 1>>`],
		},
		{
			link: [`Pub Whore`, stayOnPassageFn],
			widgets: [`<<set $pubwhore += 10>>`],
		},
		{
			link: [`Make Creature`, stayOnPassageFn],
			widgets: [`<<beasttype bear>>`],
		},
		{
			link: [`Full Spray`, stayOnPassageFn],
			widgets: [`<<set $spraymax to 5>>`, `<<spray 5>>`],
		},
		{
			text_only: "\n\n",
		},
		{
			link: [`Unlock all seeds`, stayOnPassageFn],
			widgets: [`<<run unlockAllSeeds()>>`],
		},
		{
			link: [`Super Debug Character`, stayOnPassageFn],
			widgets: [
				`<<set $school += 4000>>`,
				`<<set $science += 1000>>`,
				`<<set $maths += 1000>>`,
				`<<set $english += 1000>>`,
				`<<set $history += 1000>>`,
				`<<set $sciencetrait to 4>>`,
				`<<set $mathstrait to 4>>`,
				`<<set $englishtrait to 4>>`,
				`<<set $historytrait to 4>>`,
				`<<set $skulduggery += 1000>>`,
				`<<set $danceskill += 1000>>`,
				`<<set $swimmingskill += 1000>>`,
				`<<set $bottomskill += 1000>>`,
				`<<set $seductionskill += 1000>>`,
				`<<set $handskill += 1000>>`,
				`<<set $feetskill += 1000>>`,
				`<<set $chestskill += 1000>>`,
				`<<set $thighskill += 1000>>`,
				`<<set $oralskill += 1000>>`,
				`<<set $analskill += 1000>>`,
				`<<set $vaginalskill += 1000>>`,
				`<<set $penileskill += 1000>>`,
				`<<set $promiscuity += 100>>`,
				`<<set $exhibitionism += 100>>`,
				`<<set $deviancy += 100>>`,
				`<<set $awareness to 1000>>`,
				`<<set $willpower to 1000>>`,
				`<<set $physique to 12000>>`,
				`<<set $orgasmtrait to 1>>`,
				`<<set $ejactrait to 1>>`,
				`<<set $molesttrait to 1>>`,
				`<<set $rapetrait to 1>>`,
				`<<set $bestialitytrait to 1>>`,
				`<<set $tentacletrait to 1>>`,
				`<<set $choketrait to 1>>`,
			],
		},
		{
			link: [`Unlock all pills`, stayOnPassageFn],
			widgets: [`<<run window.getAllPills()>>`],
		},
	],
	Favourites: [],
};

function returnEventList() {
	return setup.debugMenu.eventList;
}
window.returnEventList = returnEventList;

function getNameAndPassage(section, index) {
	if (typeof setup.debugMenu.eventList[section][index].link[0] === "function") T.link_name = setup.debugMenu.eventList[section][index].link[0]();
	else T.link_name = setup.debugMenu.eventList[section][index].link[0];
	if (typeof setup.debugMenu.eventList[section][index].link[1] === "function") T.link_passage = setup.debugMenu.eventList[section][index].link[1]();
	else T.link_passage = setup.debugMenu.eventList[section][index].link[1];
}
window.getNameAndPassage = getNameAndPassage;

function runWidgetsInsideLink(section, index) {
	let widget = 0;
	for (widget in setup.debugMenu.eventList[section][index].widgets)
		Wikifier.wikifyEval(
			typeof setup.debugMenu.eventList[section][index].widgets[widget] === "function"
				? setup.debugMenu.eventList[section][index].widgets[widget]()
				: setup.debugMenu.eventList[section][index].widgets[widget]
		);
}
window.runWidgetsInsideLink = runWidgetsInsideLink;

function changeBorderColor() {
	const inputVal = document.getElementById("formChangeColor");
	$(inputVal).toggleClass("searchBorderColour");
}
window.changeBorderColor = changeBorderColor;

// const categories = ["debugEventsMain", "debugEventsCharacter", "debugEventsEvents"];
const categories2 = ["debugMain", "debugCharacter", "debugEvents", "debugFavourites", "debugAdd"];

function researchEvents(defaultValue) {
	$(function () {
		let needle = defaultValue != null ? defaultValue : document.getElementById("searchEvents").value;
		const eventsList = [
			document.getElementById("debugEventsMain").getElementsByTagName("div"),
			document.getElementById("debugEventsMain").getElementsByTagName("br"),
			document.getElementById("debugEventsCharacter").getElementsByTagName("div"),
			document.getElementById("debugEventsCharacter").getElementsByTagName("br"),
			document.getElementById("debugEventsEvents").getElementsByTagName("div"),
			document.getElementById("debugEventsEvents").getElementsByTagName("br"),
		];

		if (defaultValue != null) document.getElementById("searchEvents").value = defaultValue;
		needle = needle.toLowerCase();
		for (let i1 = 0; i1 < eventsList.length; i1++) {
			for (let i2 = 0; i2 < eventsList[i1].length; i2++) {
				let haystack = eventsList[i1][i2].getAttribute("name");

				if (haystack != null) {
					haystack = haystack.toLowerCase();
					if (haystack.contains(needle) === false) eventsList[i1][i2].style.display = "none";
					else eventsList[i1][i2].style.display = "";
				}
			}
		}
		if (needle != null && needle.length > 0) {
			document.getElementById("debugMain").classList.remove("hidden");
			document.getElementById("debugCharacter").classList.remove("hidden");
			document.getElementById("debugEvents").classList.remove("hidden");
			document.getElementById("debugFavourites").classList.add("hidden");
			document.getElementById("debugAdd").classList.add("hidden");
		} else if (V.debugMenu[2] != null && V.debugMenu[2].length > 0 && needle.length === 0) {
			for (const divToHide of categories2) {
				if (divToHide !== V.debugMenu[1]) document.getElementById(divToHide).classList.add("hidden");
				else document.getElementById(divToHide).classList.remove("hidden");
			}
		}
		if ((V.debugMenu[1] === "debugAdd" || V.debugMenu[1] === "debugFavourites") && (needle === "" || needle == null)) {
			document.getElementById(V.debugMenu[1]).classList.remove("hidden");
		}
		V.debugMenu[2] = needle;
		window.toggleClassDebug(V.debugMenu[1] + "Button", "bg-color");
		window.cacheDebugDiv();
	});
}
window.researchEvents = researchEvents;

function addFavouriteIcon(section, index, id) {
	$(function () {
		if (V.debug_favourite == null) {
			V.debug_favourite = [];
		}
		window.syncFavourites();
		const input = document.createElement("input");
		const parent = document.getElementById(id);

		input.type = "image";
		input.className = "heart";
		input.src = "img/ui/heart_favourite.svg";
		for (let i = 0; i < V.debug_favourite.length; i++) {
			if (V.debug_favourite[i].link[0] === setup.debugMenu.eventList[section][index].link[0]) input.classList.toggle("liked"); // on load up if already favourite set heart red
		}
		input.setAttribute("onclick", "window.onClickFavourite('" + section + "'," + index + ",'" + id + "');");
		if (parent != null) parent.appendChild(input);
	});
}
window.addFavouriteIcon = addFavouriteIcon;

function onClickFavourite(section, index, id) {
	$(function () {
		window.syncFavourites();
		const elementClicked = document.getElementById(id).children[1];
		if (elementClicked.classList.contains("liked")) {
			for (let i = 0; i < V.debug_favourite.length; i++) {
				if (V.debug_favourite[i].link[0] === setup.debugMenu.eventList[section][index].link[0]) V.debug_favourite.splice(i, 1); // remove from favourites
			}
			setup.debugMenu.eventList.Favourites = V.debug_favourite; // sync constant to ephemere variable
			elementClicked.classList.toggle("liked"); // removes favourites css
		} else {
			const favObject = {
				link: setup.debugMenu.eventList[section][index].link,
				widgets: setup.debugMenu.eventList[section][index].widgets,
				condition: setup.debugMenu.eventList[section][index].condition != null ? setup.debugMenu.eventList[section][index].condition : 1,
			};
			V.debug_favourite.push(favObject); // constant variable
			setup.debugMenu.eventList.Favourites = V.debug_favourite;
			elementClicked.classList.toggle("liked"); // add favourites
		}
		if (section === "Favourites") {
			const toSearch = document.getElementById("Favourites-" + index).children[0].text;
			let breakSignal = 0;
			for (const cat of ["debugEventsEvents", "debugEventsMain", "debugEventsCharacter"]) {
				const divSearch = document.getElementById(cat).children;
				for (const div of divSearch) {
					if (div.getAttribute("name") === toSearch) {
						div.children[1].classList.remove("liked");
						breakSignal = 1;
						break;
					}
				}
				if (breakSignal) break;
			}
		}
		Wikifier.wikifyEval(`<<debugFavourites "replace">>`);
	});
	window.cacheDebugDiv();
}
window.onClickFavourite = onClickFavourite;

function syncFavourites() {
	setup.debugMenu.eventList.Favourites = V.debug_favourite;
}
window.syncFavourites = syncFavourites;

function cacheDebugDiv() {
	$(() => {
		const overlay = document.getElementById("debugOverlay");
		if (overlay instanceof HTMLElement) {
			const div = overlay.outerHTML;
			setup.debugMenu.cacheDebugDiv.debugOverlay = div;
		}
	});
}
window.cacheDebugDiv = cacheDebugDiv;

function loadCachedDebugDiv() {
	if (typeof setup.debugMenu.cacheDebugDiv.debugOverlay !== "undefined") {
		document.getElementById("debugOverlay").outerHTML = setup.debugMenu.cacheDebugDiv.debugOverlay;
	}
	window.patchDebugMenu();
}
window.loadCachedDebugDiv = loadCachedDebugDiv;

function debugCreateLinkAndRedirect(section, index, id) {
	$(function () {
		const target = document.getElementById(id).children[0];
		if (typeof $._data($(target).get(0), "events") === "undefined" || $._data($(target).get(0), "events").length === 0) {
			const passageTitle =
				typeof setup.debugMenu.eventList[section][index].link[0] === "function"
					? setup.debugMenu.eventList[section][index].link[0]()
					: setup.debugMenu.eventList[section][index].link[0];
			const passageName =
				typeof setup.debugMenu.eventList[section][index].link[1] === "function"
					? setup.debugMenu.eventList[section][index].link[1]()
					: setup.debugMenu.eventList[section][index].link[1];
			let widgets = "";

			for (const widget of setup.debugMenu.eventList[section][index].widgets) widgets += typeof widget === "function" ? widget() : widget;
			const newLink = new Wikifier(
				null,
				`<<link ${passageName ? "[[" + passageTitle + "|" + passageName + "]]" : '"' + passageTitle + '"'}>>${widgets}<</link>>`
			);
			newLink.output.children[0].click();
		}
	});
}
window.debugCreateLinkAndRedirect = debugCreateLinkAndRedirect;

function addonClickDivPassage(section, index, id) {
	$(function () {
		const target = document.getElementById(id).children[0];
		target.setAttribute(
			"onclick",
			"window.debugCreateLinkAndRedirect(" + "'" + section + "'" + "," + index + "," + "'" + section + "-" + index + "'" + ");"
		);
	});
}
window.addonClickDivPassage = addonClickDivPassage;

function toggleClassDebug(selected, mode) {
	$(function () {
		if (document.getElementById(selected) == null) return;
		const list = ["debugMain", "debugCharacter", "debugEvents", "debugFavourites", "debugAdd"];
		if (mode === "bg-color") {
			for (const div of list) {
				if (div + "Button" === selected) document.getElementById(selected).classList.add("bg-color-debug-selected");
				else document.getElementById(div + "Button").classList.remove("bg-color-debug-selected");
			}
		} else if (mode === "hideWhileSearching") {
			if (selected === "debugFavourites" || selected === "debugAdd") {
				for (const div of list)
					div !== "debugFavourites" || div !== "debugAdd"
						? document.getElementById(div).classList.add("hidden")
						: document.getElementById(div).classList.remove("hidden");
			} else {
				for (const div of list)
					div === "debugFavourites" || div === "debugAdd"
						? document.getElementById(div).classList.add("hidden")
						: document.getElementById(div).classList.remove("hidden");
			}
		} else if (mode === "classicHide") {
			for (const div of list)
				div !== selected ? document.getElementById(div).classList.add("hidden") : document.getElementById(div).classList.remove("hidden");
		}
	});
}
window.toggleClassDebug = toggleClassDebug;

function patchDebugMenu() {
	const catg = ["debugEventsMain", "debugEventsCharacter", "debugEventsEvents", "debugEventsFavourites"];
	let breakIfAllGood;

	for (const cat of catg) {
		let haystack = document.getElementById(cat);
		if (haystack == null) return;
		else haystack = haystack.children;
		for (let i = 0; i < haystack.length; i++) {
			const value = haystack[i].id;

			breakIfAllGood = 0;
			if (haystack[i].children.length < 1) break;
			if (haystack[i].children.length < 2) window.addFavouriteIcon(value.split("-")[0], value.split("-")[1], value);
			else breakIfAllGood += 1;
			if (haystack[i].children[0].getAttribute("onclick") == null)
				haystack[i].children[0].setAttribute(
					"onclick",
					"window.debugCreateLinkAndRedirect('" + value.split("-")[0] + "'," + value.split("-")[1] + ",'" + value + "');"
				);
			else breakIfAllGood += 1;
			if (breakIfAllGood === 2) break;
		}
	}
	document.getElementById("MainDebugInfo").innerHTML =
		"Allure: " + V.allure + "<br>Rng: " + V.rng + "<br>Danger: " + V.danger + "<br>Passage: " + V.passage + "<br>";
	window.cacheDebugDiv();
}
window.patchDebugMenu = patchDebugMenu;

function checkEventCondition() {
	$(function () {
		for (const section of ["Character", "Events", "Favourites", "Main"]) {
			const ev = setup.debugMenu.eventList[section];
			for (const i in ev) {
				if (Object.hasOwn(ev[i], "condition")) {
					if ((typeof ev[i].condition === "function" && ev[i].condition()) || (typeof ev[i].condition !== "function" && ev[i].condition)) {
						if (document.getElementById(section + "-" + i) == null) return;
						document.getElementById(section + "-" + i).classList.remove("condhide");
					} else {
						if (document.getElementById(section + "-" + i) == null) return;
						document.getElementById(section + "-" + i).classList.add("condhide");
					}
				}
			}
		}
	});
}
window.checkEventCondition = checkEventCondition;

function addDebugForm() {
	$(function () {
		let op = "";
		if (V.debug_custom_events == null) V.debug_custom_events = { Main: [], Character: [], Events: [] };
		for (const section of ["Main", "Character", "Events"]) {
			for (const ev of V.debug_custom_events[section]) op += "<option value=" + '"' + ev.link[0] + '" ' + ">" + ev.link[0] + "</option>";
		}
		if (document.getElementById("debugEventsAdd") != null)
			document.getElementById("debugEventsAdd").innerHTML =
				`
		<abbr>Event Title:</abbr>
		<div class="addevent-content-search-content" id="formChangeColor2" style="">
			<input name="addEvents" id="addEventsTitle" placeholder="Event Title..." onfocusout="" onfocus="" oninput="" />
		</div>
		<abbr title="For dynamic allocation, you can enter a function that will be saved !\nFor example stayOnPassageFn">Passage Name*:</abbr>
		<div class="addevent-content-search-content" id="formChangeColor3" style="">
			<input name="addEvents" id="addEventsPassage" placeholder="Passage name..." onfocusout="" onfocus="" oninput="" />
		</div>
		<span>Widgets:</span>
		<div class="addevent-content-search-content" style="max-height:unset;" id="formChangeColor4" style="">
			<input name="addEvents" id="addEventsWidgets" placeholder="<<set $allure = 5>><<set $rng to 3>>..." onfocusout="" onfocus="" oninput="">
		</div>
		<span>Category:</span><br>
		<select name="catlist" id="debugCatList">
			<option value="Events">Events</option>
			<option value="Main">Main</option>
			<option value="Character">Character</option>
		</select><br><br>
		<button type="button" onclick="window.submitNewDebugPassage()">Submit</button><br><br>
		<div id="debugAddResult"></div>
		<div id="debugRemovePassage">
			<h3>Remove passages from the Menu</h3>
			<select name="catlist" id="debugEvList">
			` +
				op +
				`</select><br><br>
			<button type="button" id="button-remove" onclick="window.removeDebugCustomPassage()">Remove</button><br><br>
			<div id="debugRemoveResult"></div>
		</div>
	`;
	});
}
window.addDebugForm = addDebugForm;

function submitNewDebugPassage() {
	const inputList = [
		document.getElementById("addEventsTitle"),
		document.getElementById("addEventsPassage"),
		document.getElementById("addEventsWidgets"),
		document.getElementById("debugCatList"),
	];
	let sigerror = 0;

	for (const element of inputList) {
		if ((element.id === "addEventsTitle" || element.id === "addEventsPassage" || element.id === "debugCatList") && element.value.length < 1) {
			element.setCustomValidity("Fill this value!");
			element.reportValidity();
			document.getElementById("debugAddResult").innerHTML = "";
			sigerror = 1;
		}
		if (element.id === "addEventsWidgets" && element.value.length > 0) {
			const match = element.value.match("<<.+>>{0,}");

			if (match == null || match[0] !== match.input) {
				element.setCustomValidity("Invalid widget format. Valid : <<widget @params>>");
				element.reportValidity();
				document.getElementById("debugAddResult").innerHTML = "";
				sigerror = 1;
			}
		}
	}
	for (const section of ["Character", "Events", "Favourites", "Main"]) {
		for (const ev of setup.debugMenu.eventList[section]) {
			if (Object.hasOwn(ev, "link") && ev.link[0] === inputList[0].value) {
				inputList[0].setCustomValidity("This event title already exists. It needs to be unique!");
				inputList[0].reportValidity();
				document.getElementById("debugAddResult").innerHTML = "";
				sigerror = 1;
			}
		}
	}
	if (sigerror === 0) {
		if (V.debug_custom_events == null) V.debug_custom_events = { Main: [], Character: [], Events: [] };
		const eventTitle = inputList[0].value;
		const passageName =
			inputList[1].value.match(/function{1}[ \t]{0,1}\(\)[ \t]{0,2}{.*return.*}[;]{0,1}/g) == null
				? inputList[1].value
				: eval("(" + inputList[1].value.match(/function{1}[ \t]{0,1}\(\)[ \t]{0,2}{.*return.*}[;]{0,1}/g)[0] + ")");
		const newObj = {
			link: [eventTitle, passageName],
			widgets: [inputList[2].value],
		};
		V.debug_custom_events[inputList[3].value].unshift(newObj);
		setup.debugMenu.eventList[inputList[3].value].unshift(newObj);
		document.getElementById("debugAddResult").innerHTML =
			'<span style="color: #5eac5e;">Event Added<br>Click any blue regular link in-game<br>for changes to apply.<br>(No reload, No links in debug menu)</span>';
		setup.debugMenu.cacheDebugDiv = {};
	}
}
window.submitNewDebugPassage = submitNewDebugPassage;

function syncDebugAddedEvents() {
	if (V.debug_custom_events == null) V.debug_custom_events = { Main: [], Character: [], Events: [] };
	for (const section of ["Main", "Character", "Events"]) {
		if (Object.hasOwn(V.debug_custom_events, section) === false) V.debug_custom_events[section] = [];
		for (const ev of V.debug_custom_events[section]) setup.debugMenu.eventList[section].unshift(ev);
	}
}
window.syncDebugAddedEvents = syncDebugAddedEvents;

function removeDebugCustomPassage() {
	const selectedForRemoval = document.getElementById("debugEvList").value;
	let exitCode = 0;
	for (const section of ["Main", "Character", "Events"]) {
		for (const ev in V.debug_custom_events[section]) {
			if (V.debug_custom_events[section][ev].link[0] === selectedForRemoval) V.debug_custom_events[section].splice(ev, 1);
			for (const ev2 in setup.debugMenu.eventList[section]) {
				if (Object.hasOwn(setup.debugMenu.eventList[section][ev2], "link") && setup.debugMenu.eventList[section][ev2].link[0] === selectedForRemoval) {
					setup.debugMenu.eventList[section].splice(ev2, 1);
					document.getElementById("debugRemoveResult").innerHTML =
						'<span style="color: #5eac5e;">Event Removed<br>Click any blue regular link in-game<br>for changes to apply.<br>(No reload, No links in debug menu)</span>';
					let op = "<br>";
					for (const section of ["Main", "Character", "Events"]) {
						for (const ev of V.debug_custom_events[section]) op += "<option value=" + '"' + ev.link[0] + '" ' + ">" + ev.link[0] + "</option>";
					}
					document.getElementById("debugEvList").innerHTML = op;
					setup.debugMenu.cacheDebugDiv = {};
					exitCode = 1;
					break;
				}
			}
			if (exitCode === 1) break;
		}
		if (exitCode === 1) break;
	}
}
window.removeDebugCustomPassage = removeDebugCustomPassage;
