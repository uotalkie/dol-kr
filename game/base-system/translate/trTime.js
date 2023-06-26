/* trTime: 시간 관련 위젯 */

function trMonth(monthFullname, post, sep)
{
	const trMonthList = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	let monthName = monthFullname.substring(0,3).toLowerCase();
	let month = trMonthList.findIndex((name)=> name === monthName);
	
	if (month >= 0)
	{
		T.trResult = (month + 1) + "월";
		trPost(2, post, sep);
	}
	else
		T.trResult = "<span class='red'> 에러: trMonth: 잘못된 인수: " + monthFullname + "</span>";
}
window.trMonth = trMonth;
DefineMacro("trMonth", trMonth);

function trDaysOfWeek(daysOfWeekFullname, post, sep)
{
	const trDaysOfWeekList = {"sun":["일","日"], "mon":["월","月"], "tue":["화","火"], "wed":["수","水"], "thu":["목","木"], "fri":["금","金"], "sat":["토","土"]};
	let daysOfWeek = daysOfWeekFullname.substring(0,3).toLowerCase();
	let trDaysOfWeek = trDaysOfWeekList[daysOfWeek];
	
	if (trDaysOfWeek)
	{
		if (post && typeof(post) !== "string")
		{
			T.trResult = trDaysOfWeek[1];
		}
		else
		{
			T.trResult = trDaysOfWeek[0] + "요일";
			trPost(2, post, sep);
		}
	}
	else
		T.trResult = "<span class='red'> 에러: trDaysOfWeek: 잘못된 인수: " + daysOfWeekFullname + "</span>";
}
window.trDaysOfWeek = trDaysOfWeek;
DefineMacro("trDaysOfWeek", trDaysOfWeek);

function trSeason(seasons, post, sep)
{
	const trSeasonList = {
		"spring":{ko:"봄",post:0},
		"summer":{ko:"여름",post:0},
		"autumn":{ko:"가을",post:2},
		"winter":{ko:"겨울",post:2},
	};
	let trSeasonArray = [];
	let trSeason;
	if (typeof(seasons) === "string")
	{
		trSeason = trSeasonList[seasons];
		if (trSeason)
		{
			trSeasonArray.push(trSeason.ko);
			T.postNum = trSeason.post;
		}
		else
			trSeasonArray.push("[에러]: trSeason에 정의되지 않음: " + seasons);
	}
	else if (Array.isArray(seasons))
	{
		for(const season of seasons)
		{
				trSeason = trSeasonList[season];
				if (trSeason)
				{
					trSeasonArray.push(trSeason.ko);
					T.postNum = trSeason.post;
				}
				else
				{
					trSeasonArray.push("[에러]: trSeason에 정의되지 않음: " + season);
					break;
				}
		}
	}
	else
		trSeasonArray.push("[에러]: trSeason: 인수가 문자열이나 배열이 아님");
	
	T.trResult = trSeasonArray.join(", ");
	trPost(T.postNum, post, sep);
}
window.trSeason = trSeason;
DefineMacro("trSeason", trSeason);
