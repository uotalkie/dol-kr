/**
 * ?stroke - Selects from various adjectives and verbs to return
 *            a phrase such as: "passionately caress".
 */
Template.add("stroke", function () {
	const adjective = V.consensual === 1 ? either("열정적으로", "부드럽게") : either("소극적으로");
	const verb = V.consensual === 1 ? either("쓰다듬는다", "어루만진다", "만진다", "애무한다", "껴안는다") : either("쓰다듬는다", "만진다");
	return `${adjective} ${verb}`;
});

/* ?alongside */ /* (...와) 함께 */
Template.add("alongside", () =>
	either("함께", "함께", "박자를 맞추어", "상관없이", "리듬에 맞추어", "함께 쳐대면서", "함께 찔러대면서")
);

/* ?orgasmMoans */
Template.add("orgasmMoans", () => either("신음하고", "끄응 하는 소리를 내고", "헐떡거리고", "한숨을 쉬고", "비명소리를 내고", "흐느끼고", "웃고"));
