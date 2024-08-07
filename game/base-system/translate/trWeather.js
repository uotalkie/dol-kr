function trWeather(weather, post, sep)
{
	const weatherList = {
		"clear":{ko:"맑음",post:0},
		"overcast":{ko:"흐림",post:0},
		"rain":{ko:"비",post:1},
		"snow":{ko:"눈",post:0},
		/* 0.5.0.x */
		"lightClouds":{ko:"구름 조금",post:0},
		"heavyClouds":{ko:"구름 많음",post:0},
		"lightPrecipitation":{ko:"눈비 조금",post:0},
		"heavyPrecipitation":{ko:"눈비 많음",post:0},
		"thunderStorm":{ko:"번개폭풍",post:0},
	};
	let found = weatherList[weather];
	if (found)
	{
		T.trResult = found.ko;

		if (post)
			trPost(found.post, post, sep);
	}
	else
		T.trResult = `<span class='red'>에러: trWeather: weatherList에 정의되어 있지 않음: ${weather}</span>`;

	return (found?T.trResult:undefined);
}
window.trWeather = trWeather;
DefineMacro("trWeather", trWeather);
