/**
 * Used for making clothes colour customisable.
 * Structured in such a way that primary and accessory colours
 * can be updated separately without affecting the other, if applicable.
 * This function should be updated whenever a new clothing item
 * is made colour customisable with the clothing item in question.
 * Colours should be specifically chosen based on whatever best matches the original.
 *
 * @param {object} item clothes item object
 * @param {object} itemRef item prototype from setup
 */
function updateClothingColours(item, itemRef) {
	switch (item.name) {
		case "swimming goggles":
			if (item.accessory_colour === 0) item.accessory_colour = "white";
			break;
		case "winter jacket":
			if (item.colour === 0) item.colour = "black";
			if (item.accessory_colour === 0) item.accessory_colour = "tan";
			break;
		// eslint-disable-next-line no-fallthrough
		case "long leather gloves":
		case "leather dress":
		case "round shades":
		case "witch shoes":
			if (item.colour === 0) item.colour = "black";
			break;
		case "square shades":
		case "shield shades":
		case "punk shades":
			if (item.colour === 0) item.colour = "black";
			if (item.accessory_colour === 0) item.accessory_colour = "black";
			break;
		case "aviators":
			if (item.colour === 0) item.colour = "grey";
			if (item.accessory_colour === 0) item.accessory_colour = "original";
			break;
		case "glasses":
			if (item.colour === 0) item.colour = "silver";
			break;
		case "lace choker":
			if (item.colour === 0) item.colour = "black";
			break;
		case "school shirt":
			if (item.accessory_colour === 0) {
				item.accessory_colour = "light blue";
				item.accessory_colour_combat = "light blue";
			}
			break;
		case "brown leather jacket":
			if (item.colour === 0) item.colour = "brown";
			break;
		case "love locket":
			if (item.colour === 0) item.colour = "bronze";
			break;
		case "black leather jacket":
			if (item.colour === 0) item.colour = "black";
			if (item.accessory_colour === 0) item.accessory_colour = "silver";
			break;
		case "ballgown":
		case "ballgown skirt":
		case "short ballgown":
		case "short ballgown skirt":
			if (item.accessory_colour === 0) item.accessory_colour = item.colour;
			break;
		case "overall bottoms":
		case "overalls":
			if (item.colour === 0 || item.colour === "original") item.colour = "denim";
			if (item.accessory_colour === 0) item.accessory_colour = "gold";
			break;
		case "jean miniskirt":
		case "booty jorts":
		case "denim shorts":
		case "jeans":
			if (item.colour === 0 || item.colour === "original") item.colour = "denim";
			break;
		case "loose socks":
			if (item.colour === 0) item.colour = "white";
			break;
		case "argyle sweater vest":
			if (item.accessory_colour === 0) {
				item.accessory_colour = item.colour !== "custom" ? item.colour : "black";
			}
			break;
		case "cowboy hat":
			if (item.colour === 0) item.colour = "sand";
			if (item.accessory_colour === 0) item.accessory_colour = "black";
			break;
		case "futuristic bodysuit":
			if (item.accessory_colour === 0) {
				item.accessory_colour = item.colour !== "custom" ? item.colour : "black";
			}
			break;
		default:
			// Catch-all case if people forget to adjust this widget for whatever clothing item is updated. Can make weird looking clothes if "custom" is selected.
			if (item.colour === 0) item.colour = itemRef.colour_options.random();
			if (item.accessory_colour === 0) item.accessory_colour = itemRef.accessory_colour_options.random();
	}
}

// these constants should be available within the scope of these next 2 functions
const skip = [
	"integrity",
	"integrity_max",
	"colour",
	"accessory_colour",
	"exposed",
	"vagina_exposed",
	"anus_exposed",
	"anal_shield",
	"one_piece",
	"skirt_down",
	"state",
	"state_top",
	"name_cap",
	"iconFile",
	"accIcon",
	"notuck",
	"skirt",
	"description",
	"colour_options",
	"accessory_colour_options",
	"fabric_strength",
	"integrity_max",
	"bustresize",
	"sleeve_img",
	"breast_img",
	"exposed_base",
	"vagina_exposed_base",
	"anus_exposed_base",
	"state_top_base",
	"state_base",
	"word",
	"femininity",
	"strap",
	"cost",
	"shop",
	"cursed",
	"collared",
	"location",
];
const remapColours = {
	"light-pink": "light pink",
	"blue-steel": "blue steel",
};

/**
 * Updates a single clothes object
 *
 * @param {string} slot equip slot
 * @param {object} item clothes item object
 * @param {boolean} debug print old and new object to the console
 */
function updateClothesItem(slot, item, debug) {
	if (!item) return; // might be old save that didn't have a new slot
	if (item.temp) return; // temp items are not meant to be proper clothes
	const itemOld = clone(item);
	// transfer new properties from itemRef to the item
	const itemRef = setup.clothes[slot][clothesIndex(slot, item)];
	for (const key in itemRef) {
		// one_piece fix for items that shouldn't have it set
		if (["school pinafore", "plaid school pinafore"].includes(item.name) && item.one_piece === 1) item.one_piece = 0;
		if (skip.includes(key)) continue;
		if (key === "hoodposition" && V.objectVersion.updateClothes >= 31) continue;
		if (key === "outfitPrimary") {
			if (itemRef.outfitPrimary !== undefined) {
				if (item.outfitPrimary === undefined) item.outfitPrimary = clone(itemRef.outfitPrimary);
				for (const k in itemRef.outfitPrimary) {
					// if one_piece is broken, everything is broken
					if (item.one_piece === "broken" || item.one_piece === "split") item.outfitPrimary[k] = item.one_piece;
					else if (k === "head" && item.hoodposition === "down") delete item.outfitPrimary[k];
					// if an item is still in one piece, it's safe to regenerate it's value from itemRef
					else if (item.outfitPrimary[k] !== "broken" && item.outfitPrimary[k] !== "split") item.outfitPrimary[k] = clone(itemRef.outfitPrimary[k]);
				}
			}
			continue;
		}
		if (key === "outfitSecondary") {
			if (itemRef[key] !== undefined) {
				if (item[key] === undefined) item[key] = clone(itemRef[key]);
				if (item.one_piece === "broken" || item.one_piece === "split") item[key][1] = item.one_piece;
			}
			continue;
		}
		item[key] = clone(itemRef[key]);
	}
	item.colour = remapColours[item.colour] || item.colour;
	item.accessory_colour = remapColours[item.accessory_colour] || item.accessory_colour;
	if (
		((item.colour === 0 || item.colour === "original") && itemRef.colour_options.length > 0) ||
		(item.accessory_colour === 0 && itemRef.accessory_colour_options.length > 0)
	)
		updateClothingColours(item, itemRef);

	// Clothing warmth
	if (item.warmth !== itemRef.warmth) item.warmth = itemRef.warmth;

	// Fix for 0.2.21.x issue
	if (item.colour_combat !== undefined && itemRef.colour_options.length === 0) item.colour = 0;
	if (item.accessory_colour_combat !== undefined && itemRef.colour_options.length === 0) item.accessory_colour = 0;
	// end of fix
	if (slot === "genitals") return;
	// put renamed clothes and updated types here
	switch (item.name) {
		case "Crop top":
			item.name = "crop top";
			break;
		case "overalls":
			if (slot === "lower") item.name = "overall bottoms";
			else if (item.outfitPrimary.lower === "overalls") item.outfitPrimary.lower = "overall bottoms";
			break;
		case "sleeveless jingle-bell dress":
			if (item.outfitPrimary.lower === "jingle-bell skirt") item.outfitPrimary.lower = "sleeveless jingle-bell skirt";
			break;
		case "Rib-knit ankle socks":
			item.name = "rib-knit ankle socks";
			break;
		case "Striped kneehighs":
			item.name = "striped kneehighs";
			break;
		case "brown leather jacket":
			item.name = "leather jacket";
			item.name_cap = "Leather jacket";
			break;
		case "black leather jacket":
			item.name = "punk leather jacket";
			item.name_cap = "Punk leather jacket";
			break;
		case "swim shirt":
			item.type = ["swim", "school", "chest_bind", "constricting", "covered"];
			break;
		case "undershirt":
		case "long johns":
			item.type = ["normal", "covered"];
			break;
		case "unitard bottom":
		case "leotard bottom":
		case "unitard":
		case "leotard":
		case "turtleneck leotard":
		case "skimpy leotard":
			item.type = ["dance", "covered"];
			break;
		case "turtleneck leotard bottom":
		case "skimpy leotard bottom":
			item.type = ["dance"];
			break;
		case "sports bra":
			item.type = ["normal", "athletic", "covered"];
			break;
		case "witch dress":
		case "scarecrow shirt":
		case "rag skirt":
		case "skeleton outfit":
		case "pom poms":
		case "futuristic bodysuit":
		case "witch skirt":
		case "scarecrow skirt":
		case "futuristic bodysuit pants":
		case "skeleton bottoms":
		case "cheerleader gloves":
			item.type = ["costume"];
			break;
		case "rag top":
		case "vampire jacket":
			item.type = ["costume", "bellyShow"];
			break;
		case "classy vampire jacket":
			item.type = ["costume", "formal"];
			break;
		case "skeleton mask":
			item.type = ["costume", "mask"];
			break;
		case "riding helmet":
		case "racing helmet":
			item.type = ["costume", "riding"];
			break;
		case "scout shorts":
		case "baseball cap":
			item.type = ["normal"];
			break;
		case "purse":
		case "backpack":
		case "messenger bag":
		case "heart purse":
			item.type = ["school", "bookbag"];
			break;
		case "boy's gym socks":
		case "girl's gym socks":
			item.type = ["school", "athletic"];
			break;
		case "padded football shirt":
			item.name = "foreign football shirt";
			item.name_cap = "Foreign football shirt";
			break;
		case "football shorts":
			item.name = "foreign football shorts";
			item.name_cap = "Foreign football shorts";
			break;
		case "football helmet":
			item.name = "foreign football helmet";
			item.name_cap = "Foreign football helmet";
			item.type = ["costume"];
			break;
		case "soccer shorts":
			item.name = "football shorts";
			item.name_cap = "Football shorts";
			break;
		case "soccer shirt":
			item.name = "football shirt";
			item.name_cap = "Football shirt";
			break;
		case "kittycat hat":
			item.name_cap = "Kittycat hat";
			break;
		case "doggy muzzle":
			item.name_cap = "Doggy muzzle";
			break;
	}
	if (debug) console.log("updateClothesItem:", slot, itemOld, clone(item));
}

function updateClothes() {
	for (const slot of setup.clothes_all_slots) {
		/* === $worn section === */
		const worn = V.worn[slot];
		updateClothesItem(slot, worn);

		/* === $carried section === */
		const carried = V.carried[slot];
		updateClothesItem(slot, carried);

		/* === $wardrobes section === */

		// Check for empty wardrobe items - and remove them
		Object.keys(V.wardrobe).forEach(key => {
			if (Array.isArray(V.wardrobe[key])) {
				V.wardrobe[key] = V.wardrobe[key].filter(item => item !== undefined && item !== null && item !== "");
			}
		});

		if (V.wardrobe[slot]) {
			for (const item of V.wardrobe[slot]) updateClothesItem(slot, item);
		}
		if (V.wardrobes !== undefined) {
			for (const wardrobe in V.wardrobes) {
				if (wardrobe === "wardrobe" || wardrobe === "shopReturn" || !V.wardrobes[wardrobe][slot]) continue;
				for (const item of V.wardrobes[wardrobe][slot]) updateClothesItem(slot, item);
			}
		}

		/* === $store section === */
		if (V.store !== undefined && V.store[slot]) {
			for (const item of V.store[slot]) updateClothesItem(slot, item);
		}

		/* === $outfit section === */
		for (const outfit of V.outfit) {
			switch (outfit[slot]) {
				case "Crop top":
					outfit[slot] = "crop top";
					break;
				case "overalls":
					if (slot === "lower") outfit[slot] = "overall bottoms";
					break;
				case "sleeveless jingle-bell dress":
					if (slot === "lower") outfit[slot] = "sleeveless jingle-bell skirt";
					break;
			}
		}
	}
}
DefineMacro("updateClothes", updateClothes);

function wardrobesUpdate() {
	/* default wardrobe object */
	const defWardrobe = {
		face: [],
		feet: [],
		hands: [],
		handheld: [],
		head: [],
		legs: [],
		lower: [],
		neck: [],
		over_head: [],
		over_lower: [],
		over_upper: [],
		genitals: [],
		under_lower: [],
		under_upper: [],
		upper: [],
		unlocked: false,
		shopSend: false,
		transfer: true,
		isolated: false,
		locationRequirement: [],
		space: 5,
	};
	/* initialise multiple wardrobes. works for both old saves and new games */
	if (V.wardrobes === undefined) {
		V.wardrobes = {
			shopReturn: "wardrobe",
			wardrobe: {
				NOTE: "DO NOT USE THIS OBJECT TO STORE CLOTHES",
				unlocked: true,
				shopSend: true,
				name: "Orphanage",
			},
			changingRoom: clone(defWardrobe),
			edensCabin: clone(defWardrobe),
			asylum: clone(defWardrobe),
			alexFarm: clone(defWardrobe),
			stripClub: clone(defWardrobe),
			brothel: clone(defWardrobe),
			schoolBoys: clone(defWardrobe),
			schoolGirls: clone(defWardrobe),
			prison: clone(defWardrobe),
		};
		/* beach */
		V.wardrobes.changingRoom.name = "Beach changing room";
		V.wardrobes.changingRoom.unlocked = true;
		/* eden's */
		V.wardrobes.edensCabin.name = "Eden's Cabin";
		V.wardrobes.edensCabin.space = 10;
		if (V.syndromeeden) V.wardrobes.edensCabin.unlocked = true;
		/* asylum */
		V.wardrobes.asylum.locationRequirement.push("asylum");
		V.wardrobes.asylum.name = "Asylum";
		V.wardrobes.asylum.transfer = false;
		V.wardrobes.asylum.isolated = true;
		/* alex's */
		V.wardrobes.alexFarm.name = "Alex's Farm";
		V.wardrobes.alexFarm.shopSend = true;
		V.wardrobes.alexFarm.space = 40;
		if (V.farm_stage >= 7) V.wardrobes.alexFarm.unlocked = true;
		/* strip club */
		V.wardrobes.stripClub.name = "Strip Club";
		V.wardrobes.stripClub.space = 10;
		if (V.stripclubdancingintro) V.wardrobes.stripClub.unlocked = true;
		/* brothel */
		V.wardrobes.brothel.name = "Brothel";
		V.wardrobes.brothel.space = 10;
		if (V.brotheljob) V.wardrobes.brothel.unlocked = true;
		/* school pool boys */
		V.wardrobes.schoolBoys.name = "Schools boy's locker";
		V.wardrobes.schoolBoys.unlocked = true;
		V.wardrobes.schoolBoys.under_lower.push(setup.clothes.under_lower[7]);
		V.wardrobes.schoolBoys.under_lower.last().colour = "blue";
		/* school pool girls */
		V.wardrobes.schoolGirls.name = "Schools girl's locker";
		V.wardrobes.schoolGirls.unlocked = true;
		V.wardrobes.schoolGirls.under_lower.push(setup.clothes.under_lower[6]);
		V.wardrobes.schoolGirls.under_lower.last().colour = "blue";
		V.wardrobes.schoolGirls.under_upper.push(setup.clothes.under_upper[2]);
		V.wardrobes.schoolGirls.under_upper.last().colour = "blue";
		/* prison */
		V.wardrobes.prison.name = "Prison locker";
		V.wardrobes.prison.transfer = false;
		V.wardrobes.prison.isolated = true;
		/* add .lastTaken prop to everything */
		if (V.worn !== undefined) Object.keys(V.worn).forEach(s => (V.worn[s].lastTaken = "wardrobe"));
		if (V.carried !== undefined) Object.keys(V.carried).forEach(s => (V.carried[s].lastTaken = "wardrobe"));
		if (V.store !== undefined) Object.keys(V.store).forEach(s => V.store[s].forEach(i => (i.lastTaken = "wardrobe")));
	}
	/* fix prison wardrobe name */
	if (V.wardrobes.prison.name === "Prison Locker") V.wardrobes.prison.name = "Prison locker";
	/* very old saves */
	if (V.objectVersion.wardrobes < 2) {
		for (const slot in setup.clothes_all_slots) {
			/* skip slots that didn't exist in old saves */
			if (V.wardrobe[slot] === undefined) continue;
			/* remove all temporary items */
			for (let j = V.wardrobe[slot].length - 1; j >= 0; j--) {
				if (V.wardrobe[slot][j].temp) V.wardrobe[slot].deleteAt(j);
			}
			for (let j = V.wardrobes.prison[slot].length - 1; j >= 0; j--) {
				if (V.wardrobes.prison[slot][j].temp) V.wardrobes.prison[slot].deleteAt(j);
			}
			for (let j = V.wardrobes.asylum[slot].length - 1; j >= 0; j--) {
				if (V.wardrobes.asylum[slot][j].temp) V.wardrobes.asylum[slot].deleteAt(j);
			}
		}
	}
	/* less old saves */
	if (V.objectVersion.wardrobes < 4) {
		/* remove unnecessary vars */
		window.clothesDataTrimmerLoop();
		/* add a slot for genitals to all wardrobes */
		if (V.wardrobe.genitals === undefined) V.wardrobe.genitals = [];
		for (const w in V.wardrobes) {
			if (w !== "wardrobe" && V.wardrobes[w].unlocked !== undefined && V.wardrobes[w].genitals === undefined) V.wardrobes[w].genitals = [];
		}
	}
	if (!V.wardrobes.temple) {
		V.wardrobes.temple = clone(defWardrobe);
		V.wardrobes.temple.unlocked = V.temple_rank === "monk";
		V.wardrobes.temple.space = 20;
	}
	if (!V.wardrobes.temple.name) {
		V.wardrobes.temple.name = "Temple";
	}
	if (!V.wardrobes.pirate) {
		V.wardrobes.pirate = clone(defWardrobe);
		V.wardrobes.pirate.unlocked = V.pirate_rank >= 0;
		V.wardrobes.pirate.space = 5;
	}
	if (!V.wardrobes.pirate.name) {
		V.wardrobes.pirate.name = "Pirate Ship";
	}
	if (V.objectVersion.wardrobes < 7) {
		Object.values(V.wardrobes).forEach(wardrobe => {
			if (wardrobe && Array.isArray(wardrobe.upper) && !wardrobe.handheld) wardrobe.handheld = [];
		});
	}

	if (!V.wardrobes.officeBuilding) {
		V.wardrobes.officeBuilding = clone(defWardrobe);
		V.wardrobes.officeBuilding.name = "Office agency changing room";
		V.wardrobes.officeBuilding.unlocked = V.officejobintro === 1;
		V.wardrobes.officeBuilding.space = 5;
	}

	if (!V.wardrobes.birdTower) {
		/* Great Hawk's tower */
		V.wardrobes.birdTower = clone(defWardrobe);
		V.wardrobes.birdTower.name = "Great Hawk's Tower";
		V.wardrobes.birdTower.unlocked = false;
		V.wardrobes.birdTower.isolated = true;
		V.wardrobes.birdTower.space = 15;
	}
	if (!V.wardrobes.birdTower.locationRequirement) {
		V.wardrobes.birdTower.locationRequirement = ["tower", "moor"];
	}

	if (!V.wardrobes.prison.locationRequirement) {
		V.wardrobes.prison.locationRequirement = ["prison"];
	}
}
DefineMacro("wardrobesUpdate", wardrobesUpdate);
