(() => {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();

	setup.isFools = () => (day === 1 && month === 3 && V && V.footdisable === 't');

	/* Run once, when SugarCube is guaranteed to be initialised. */
	$(document).one(':passagestart', function() {
		if (!setup.isFools()) return;
		const doggy = setup.tanImg.doggy;
		doggy.t.doggyactivebaselegs = "img/sex/doggyRed/active/body/fools/doggyactivebaselegs.png";
		doggy.f.doggyactivebaselegs = "img/sex/doggy/active/body/fools/doggyactivebaselegs.png";
		const missionary = setup.tanImg.missionary;
		missionary.t.activebaselegl = "img/sex/missionaryRed/active/body/fools/activebaselegl.png";
		missionary.t.activebaselegldown = "img/sex/missionaryRed/active/body/fools/activebaselegldown.png";
		missionary.t.activebaselegr = "img/sex/missionaryRed/active/body/fools/activebaselegr.png";
		missionary.t.activebaselegrdown = "img/sex/missionaryRed/active/body/fools/activebaselegrdown.png";
		missionary.f.activebaselegl = "img/sex/missionary/active/body/fools/activebaselegl.png";
		missionary.f.activebaselegldown = "img/sex/missionary/active/body/fools/activebaselegldown.png";
		missionary.f.activebaselegr = "img/sex/missionary/active/body/fools/activebaselegr.png";
		missionary.f.activebaselegrdown = "img/sex/missionary/active/body/fools/activebaselegrdown.png";
	});
})();
