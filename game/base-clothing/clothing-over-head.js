/* For any item that has a colour_combat tag, set it to 0 if that item ever gets its own combat sprites. */
function initOverHead() {
	setup.clothes.over_head = [
		{
			index: 0,
			name: "naked",
			name_cap: "Naked",
			variable: "naked",
			integrity: 0,
			integrity_max: 0,
			fabric_strength: 0,
			reveal: 1,
			word: "n",
			plural: 0,
			colour: 0,
			colour_options: [],
			type: ["naked"],
			gender: "n",
			warmth: 0,
			cost: 0,
			description: "naked",
			shop: [],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 0,
			cursed: 0,
			location: 0,
			iconFile: 0,
			accIcon: 0,
			mainImage: 0,
		},

		{
			index: 1,
			name: "froggy hood",
			name_cap: "Froggy hood",
			variable: "froggy",
			integrity: 300,
			integrity_max: 300,
			fabric_strength: 20,
			reveal: 500,
			word: "a",
			plural: 0,
			hood: 1,
			colour: 0,
			colour_options: [],
			colour_combat: 0,
			type: ["rainproof"],
			set: "froggy",
			gender: "n",
			warmth: 3,
			cost: 0,
			description: "Protects you from rain.",
			shop: ["clothing"],
			accessory: 0,
			accessory_colour: 0,
			accessory_colour_options: [],
			back_img: 1,
			cursed: 0,
			location: 0,
			outfitSecondary: ["over_upper", "froggy coat"],
		},
	];

	/*
		Clothes that modders add go into this array, this should be empty in the base game at all times.
		These items should have a `modder` variable with a the modders name in a short string
	*/
	setup.moddedClothes.over_head = [];

	setup.moddedClothes.over_head.forEach((x, i) => (x.index = setup.clothes.over_head.length + i));
	setup.clothes.over_head.push(...setup.moddedClothes.over_head);
}
window.initOverHead = initOverHead;
