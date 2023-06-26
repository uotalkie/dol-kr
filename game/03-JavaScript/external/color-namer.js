/**
 * Hex => RGB Cache
 */

var h2rs = {};

/**
 * Default `colors.json`
 */

var colors = {
  "aqua": ["#00FFFF", "hue-rotate(180deg) brightness(210%) saturate(350%) contrast(100%)", "aqua"],
  "aliceblue": ["#F0F8FF", "hue-rotate(208deg) brightness(260%) saturate(20%) contrast(100%)", "alice blue"],
  "antiquewhite": ["#FAEBD7", "hue-rotate(4deg) brightness(230%) saturate(20%) contrast(120%)", "antique white"],
  "black": ["#000000", "hue-rotate(0deg) brightness(100%) saturate(0%) contrast(170%)", "black"],
  "blue": ["#0000FF", "hue-rotate(192deg) brightness(80%) saturate(279%) contrast(300%)", "blue"],
  "cyan": ["#00FFFF", "hue-rotate(131deg) brightness(128%) saturate(249%) contrast(260%)", "cyan"],
  "omendarkblue": ["#00008B", "hue-rotate(207deg) brightness(80%) saturate(79%) contrast(300%)","dark blue"],
  "darkcyan": ["#008B8B", "hue-rotate(136deg) brightness(105%) saturate(219%) contrast(100%)", "dark cyan"],
  "darkgreen": ["#006400", "hue-rotate(55deg) brightness(100%) saturate(79%) contrast(100%)", "dark green"],
  "darkturquoise": ["#00CED1", "hue-rotate(128deg) brightness(110%) saturate(249%) contrast(190%)", "dark turquoise"],
  "deepskyblue": ["#00BFFF", "hue-rotate(140deg) brightness(110%) saturate(249%) contrast(190%)", "deep sky-blue"],
  "omengreen": ["#008000", "hue-rotate(55deg) brightness(100%) saturate(69%) contrast(100%)", "green"],
  "lime": ["#00FF00", "hue-rotate(117deg) brightness(170%) saturate(120%) contrast(110%)", "lime green"],
  "mediumblue": ["#0000CD", "hue-rotate(207deg) brightness(80%) saturate(179%) contrast(300%)", "medium blue"],
  "mediumspringgreen": ["#00FA9A", "hue-rotate(117deg) brightness(170%) saturate(100%) contrast(140%)", "medium spring-green"],
  "navy": ["#000080", "hue-rotate(207deg) brightness(80%) saturate(79%) contrast(300%)", "navy"],
  "springgreen": ["#00FF7F", "hue-rotate(117deg) brightness(175%) saturate(120%) contrast(110%)", "spring-green"],
  "teal": ["#008080", "hue-rotate(128deg) brightness(90%) saturate(249%) contrast(190%)", "teal"],
  "midnightblue": ["#191970", "hue-rotate(206deg) brightness(80%) saturate(79%) contrast(300%)", "midnight blue"],
  "dodgerblue": ["#1E90FF", "hue-rotate(140deg) brightness(107%) saturate(229%) contrast(190%)", "dodger blue"],
  "lightseagreen": ["#20B2AA", "hue-rotate(124deg) brightness(107%) saturate(229%) contrast(190%)", "light sea-green"],
  "forestgreen": ["#228B22", "hue-rotate(124deg) brightness(95%) saturate(229%) contrast(150%)", "forest-green"],
  "seagreen": ["#2E8B57", "hue-rotate(124deg) brightness(90%) saturate(229%) contrast(150%)", "sea-green"],
  "darkslategrey": ["#2F4F4F", "hue-rotate(156deg) brightness(90%) saturate(139%) contrast(300%)", "dark slate-grey"],
  "mediumlimegreen": ["#32CD32", "hue-rotate(124deg) brightness(112%) saturate(269%) contrast(190%)", "lime medium-green"],
  "mediumseagreen": ["#3CB371", "hue-rotate(124deg) brightness(112%) saturate(269%) contrast(190%)", "medium sea-green"],
  "turquoise": ["#40E0D0", "hue-rotate(131deg) brightness(122%) saturate(269%) contrast(160%)", "turquoise"],
  "royalblue": ["#4169E1", "hue-rotate(140deg) brightness(90%) saturate(229%) contrast(190%)", "royal-blue"],
  "steelblue": ["#4682B4", "hue-rotate(140deg) brightness(100%) saturate(210%) contrast(200%)", "steel-blue"],
  "darkslateblue": ["#483D8B", "hue-rotate(207deg) brightness(90%) saturate(120%) contrast(200%)", "dark slate-blue"],
  "mediumturquoise": ["#48D1CC", "hue-rotate(131deg) brightness(128%) saturate(200%) contrast(270%)", "medium-turquoise"],
  "indigo": ["#4B0082", "hue-rotate(233deg) brightness(80%) saturate(69%) contrast(200%)", "indigo"],
  "darkolivegreen": ["#556B2F", "hue-rotate(22deg) brightness(110%) saturate(100%) contrast(165%)", "dark olive-green"],
  "cadetblue": ["#5F9EA0", "hue-rotate(127deg) brightness(120%) saturate(109%) contrast(100%)", "cadet-blue"],
  "cornflowerblue": ["#6495ED", "hue-rotate(182deg) brightness(130%) saturate(109%) contrast(100%)", "cornflower-blue"],
  "mediumaquamarine": ["#66CDAA", "hue-rotate(117deg) brightness(150%) saturate(100%) contrast(110%)", "medium-aquamarine"],
  "dimgrey": ["#696969", "hue-rotate(117deg) brightness(129%) saturate(0%) contrast(210%)", "dim-grey"],
  "slateblue": ["#6A5ACD", "hue-rotate(211deg) brightness(105%) saturate(109%) contrast(160%)", "slate-blue"],
  "olivedrab": ["#6B8E23", "hue-rotate(25deg) brightness(108%) saturate(109%) contrast(120%)", "olive-drab"],
  "slategrey": ["#708090", "hue-rotate(211deg) brightness(115%) saturate(0%) contrast(100%)", "slate-grey"],
  "lightslategrey": ["#778899", "hue-rotate(211deg) brightness(119%) saturate(0%) contrast(100%)", "light slate-grey"],
  "mediumslateblue": ["#7B68EE", "hue-rotate(211deg) brightness(107%) saturate(140%) contrast(100%)", "medium slate-blue"],
  "lawngreen": ["#7CFC00", "hue-rotate(56deg) saturate(160%) brightness(150%) contrast(200%)", "lawn-green"],
  "aquamarine": ["#7FFFD4", "hue-rotate(112deg) saturate(70%) brightness(190%) contrast(140%)", "aquamarine"],
  "chartreuse": ["#7FFF00", "hue-rotate(46deg) saturate(140%) brightness(170%) contrast(140%)", "chartreuse"],
  "omengrey": ["#808080", "hue-rotate(117deg) brightness(139%) saturate(0%) contrast(210%)", "grey"],
  "maroon": ["#800000", "hue-rotate(305deg) brightness(100%) saturate(60%) contrast(177%)", "maroon"],
  "olive": ["#808000", "hue-rotate(17deg) brightness(110%) saturate(120%) contrast(127%)", "olive"],
  "omenpurple": ["#800080", "hue-rotate(230deg) brightness(95%) saturate(70%) contrast(127%)", "purple"],
  "lightskyblue": ["#87CEFA", "hue-rotate(143deg) brightness(172%) saturate(39%) contrast(220%)", "light sky-blue"],
  "skyblue": ["#87CEEB", "hue-rotate(143deg) brightness(182%) saturate(29%) contrast(200%)", "sky-blue"],
  "blueviolet": ["#8A2BE2", "hue-rotate(230deg) brightness(100%) saturate(140%) contrast(207%)", "blue-violet"],
  "darkmagenta": ["#8B008B", "hue-rotate(230deg) brightness(100%) saturate(100%) contrast(207%)", "dark magenta"],
  "darkred": ["#8B0000", "hue-rotate(279deg) brightness(100%) saturate(70%) contrast(207%)", "dark red"],
  "saddlebrown": ["#8B4513", "hue-rotate(342deg) brightness(100%) saturate(70%) contrast(207%)", "saddle-brown"],
  "darkseagreen": ["#8FBC8F", "hue-rotate(46deg) saturate(80%) brightness(160%) contrast(140%)", "dark sea-green"],
  "omenlightgreen": ["#90EE90", "hue-rotate(85deg) brightness(181%) saturate(40%) contrast(170%)", "light green"],
  "mediumpurple": ["#9370DB", "hue-rotate(230deg) brightness(125%) saturate(70%) contrast(127%)", "medium purple"],
  "darkviolet": ["#9400D3", "hue-rotate(245deg) brightness(90%) saturate(90%) contrast(137%)", "dark violet"],
  "palegreen": ["#98FB98", "hue-rotate(85deg) brightness(184%) saturate(40%) contrast(170%)", "pale green"],
  "darkorchid": ["#9932CC", "hue-rotate(245deg) brightness(99%) saturate(90%) contrast(137%)", "dark orchid"],
  "yellowgreen": ["#9ACD32", "hue-rotate(42deg) saturate(100%) brightness(170%) contrast(100%)", "yellow-green"],
  "sienna": ["#A0522D", "hue-rotate(305deg) brightness(100%) saturate(70%) contrast(117%)", "sienna"],
  "brown": ["#A52A2A", "hue-rotate(297deg) brightness(100%) saturate(70%) contrast(177%)", "brown"],
  "darkgrey": ["#A9A9A9", "hue-rotate(297deg) brightness(160%) saturate(0%) contrast(177%)", "dark grey"],
  "greenyellow": ["#ADFF2F", "hue-rotate(42deg) saturate(120%) brightness(193%) contrast(100%)", "green-yellow"],
  "omenlightblue": ["#ADD8E6", "hue-rotate(166deg) saturate(50%) brightness(205%) contrast(100%)", "light blue"],
  "paleturquoise": ["#AFEEEE", "hue-rotate(144deg) saturate(40%) brightness(200%) contrast(140%)", "pale turquoise"],
  "lightsteelblue": ["#B0C4DE", "hue-rotate(144deg) saturate(27%) brightness(180%) contrast(140%)", "light steel-blue"],
  "powderblue": ["#B0E0E6", "hue-rotate(144deg) saturate(33%) brightness(193%) contrast(140%)", "powderblue"],
  "firebrick": ["#B22222", "hue-rotate(290deg) brightness(100%) saturate(70%) contrast(207%)", "firebrick"],
  "darkgoldenrod": ["#B8860B", "hue-rotate(2deg) brightness(121%) saturate(100%) contrast(157%)", "dark golden-rod"],
  "mediumorchid": ["#BA55D3", "hue-rotate(242deg) brightness(121%) saturate(80%) contrast(157%)", "orchid"],
  "rosybrown": ["#BC8F8F", "hue-rotate(301deg) brightness(141%) saturate(30%) contrast(137%)", "rosy-brown"],
  "darkkhaki": ["#BDB76B", "hue-rotate(19deg) saturate(90%) brightness(180%) contrast(110%)", "dark khaki"],
  "silver": ["#C0C0C0", "hue-rotate(19deg) saturate(0%) brightness(190%) contrast(100%)", "silver"],
  "mediumvioletred": ["#C71585", "hue-rotate(260deg) saturate(110%) brightness(100%) contrast(170%)", "violet-red"],
  "indianred": ["#CD5C5C", "hue-rotate(349deg) saturate(140%) brightness(110%) contrast(160%)", "indian-red"],
  "peru": ["#CD853F", "hue-rotate(6deg) brightness(131%) saturate(130%) contrast(157%)", "peru-orange"],
  "chocolate": ["#D2691E", "hue-rotate(344deg) brightness(121%) saturate(100%) contrast(157%)", "chocolate"],
  "tan": ["#D2B48C", "hue-rotate(1deg) saturate(30%) brightness(173%) contrast(120%)", "tan"],
  "omenlightgrey": ["#D3D3D3", "hue-rotate(1deg) saturate(0%) brightness(190%) contrast(170%)", "light grey"],
  "thistle": ["#D8BFD8", "hue-rotate(236deg) saturate(20%) brightness(180%) contrast(170%)", "thistle"],
  "goldenrod": ["#DAA520", "hue-rotate(354deg) saturate(60%) brightness(155%) contrast(160%)", "orange-golden"],
  "orchid": ["#DA70D6", "hue-rotate(255deg) saturate(50%) brightness(145%) contrast(178%)", "orchid"],
  "palevioletred": ["#DB7093", "hue-rotate(279deg) saturate(60%) brightness(135%) contrast(160%)", "pale violet-red"],
  "crimson": ["#DC143C", "hue-rotate(312deg) saturate(130%) brightness(100%) contrast(160%)", "crimson"],
  "gainsboro": ["#DCDCDC", "hue-rotate(311deg) saturate(0%) brightness(195%) contrast(170%)", "gainsboro"],
  "plum": ["#DDA0DD", "hue-rotate(231deg) saturate(60%) brightness(160%) contrast(170%)", "plum"],
  "burlywood": ["#DEB887", "hue-rotate(356deg) saturate(40%) brightness(176%) contrast(130%)", "burlywood"],
  "lightcyan": ["#E0FFFF", "hue-rotate(131deg) brightness(195%) saturate(14%) contrast(250%)", "light cyan"],
  "lavender": ["#E6E6FA", "hue-rotate(173deg) brightness(192%) saturate(24%) contrast(250%)", "lavender"],
  "darksalmon": ["#E9967A", "hue-rotate(352deg) saturate(130%) brightness(145%) contrast(100%)", "dark salmon"],
  "palegoldenrod": ["#EEE8AA", "hue-rotate(17deg) brightness(200%) saturate(64%) contrast(150%)", "pale golden-rod"],
  "violet": ["#EE82EE", "hue-rotate(225deg) brightness(147%) saturate(130%) contrast(170%)", "violet"],
  "azure": ["#F0FFFF", "hue-rotate(131deg) brightness(195%) saturate(10%) contrast(250%)", "azure"],
  "honeydew": ["#F0FFF0", "hue-rotate(131deg) brightness(195%) saturate(10%) contrast(250%)", "honey dew"],
  "khaki": ["#F0E68C", "hue-rotate(10deg) brightness(185%) saturate(40%) contrast(250%)", "khaki"],
  "lightcoral": ["#F08080", "hue-rotate(336deg) saturate(130%) brightness(135%) contrast(100%)", "light coral"],
  "sandybrown": ["#F4A460", "hue-rotate(356deg) saturate(80%) brightness(160%) contrast(195%)", "sandy brown"],
  "beige": ["#F5F5DC", "hue-rotate(34deg) brightness(195%) saturate(14%) contrast(250%)", "beige"],
  "mintcream": ["#F5FFFA", "hue-rotate(84deg) brightness(195%) saturate(14%) contrast(250%)", "mint cream"],
  "wheat": ["#F5DEB3", "hue-rotate(333deg) brightness(185%) saturate(12%) contrast(250%)", "wheat"],
  "whitesmoke": ["#F5F5F5", "hue-rotate(333deg) brightness(205%) saturate(0%) contrast(220%)", "white smoke"],
  "ghostwhite": ["#F8F8FF", "hue-rotate(160deg) brightness(205%) saturate(5%) contrast(220%)", "ghost white"],
  "lightgoldenrodyellow": ["#FAFAD2", "hue-rotate(1deg) brightness(199%) saturate(14%) contrast(220%)", "light yellow"],
  "linen": ["#FAF0E6", "hue-rotate(335deg) brightness(199%) saturate(7%) contrast(220%)", "linen"],
  "salmon": ["#FA8072", "hue-rotate(352deg) saturate(125%) brightness(140%) contrast(180%)", "salmon"],
  "oldlace": ["#FDF5E6", "hue-rotate(345deg) brightness(199%) saturate(10%) contrast(220%)", "oldlace"],
  "bisque": ["#FFE4C4", "hue-rotate(345deg) brightness(193%) saturate(15%) contrast(220%)", "bisque"],
  "blanchedalmond": ["#FFEBCD", "hue-rotate(333deg) brightness(193%) saturate(11%) contrast(220%)", "blanche almond"],
  "coral": ["#FF7F50", "hue-rotate(335deg) saturate(130%) brightness(135%) contrast(100%)", "coral"],
  "cornsilk": ["#FFF8DC", "hue-rotate(13deg) brightness(199%) saturate(14%) contrast(220%)", "corn-silk"],
  "darkorange": ["#FF8C00", "hue-rotate(339deg) saturate(130%) brightness(140%) contrast(100%)", "dark orange"],
  "deeppink": ["#FF1493", "hue-rotate(281deg) saturate(130%) brightness(110%) contrast(160%)", "deep pink"],
  "floralwhite": ["#FFFAF0", "hue-rotate(347deg) brightness(200%) saturate(10%) contrast(220%)", "floral white"],
  "fuchsia": ["#FF00FF", "hue-rotate(259deg) saturate(130%) brightness(110%) contrast(160%)", "fuchsia"],
  "gold": ["#FFD700", "hue-rotate(10deg) brightness(187%) saturate(109%) contrast(100%)", "gold"],
  "hotpink": ["#FF69B4", "hue-rotate(271deg) saturate(100%) brightness(136%) contrast(120%)", "hot pink"],
  "ivory": ["#FFFFF0", "hue-rotate(15deg) brightness(199%) saturate(14%) contrast(220%)", "ivory"],
  "lavenderblush": ["#FFF0F5", "hue-rotate(288deg) brightness(215%) saturate(3%) contrast(220%)", "lavender blush"],
  "lemonchiffon": ["#FFFACD", "hue-rotate(24deg) brightness(200%) saturate(7%) contrast(220%)", "lemon chiffon"],
  "lightpink": ["#FFB6C1", "hue-rotate(275deg) brightness(187%) saturate(30%) contrast(130%)", "light pink"],
  "lightsalmon": ["#FFA07A", "hue-rotate(332deg) brightness(160%) saturate(60%) contrast(130%)", "light salmon"],
  "lightyellow": ["#FFFFE0", "hue-rotate(14deg) brightness(199%) saturate(19%) contrast(220%)", "pale yellow"],
  "mistyrose": ["#FFE4E1", "hue-rotate(307deg) brightness(199%) saturate(10%) contrast(220%)", "misty rose"],
  "moccasin": ["#FFE4B5", "hue-rotate(328deg) brightness(195%) saturate(10%) contrast(220%)", "moccasin"],
  "navajowhite": ["#FFDEAD", "hue-rotate(328deg) brightness(193%) saturate(12%) contrast(220%)", "navajo white"],
  "orange": ["#FFA500", "hue-rotate(345deg) brightness(159%) saturate(102%) contrast(120%)", "orange"],
  "orangered": ["#FF4500", "hue-rotate(297deg) brightness(115%) saturate(122%) contrast(160%)", "orange-red"],
  "papayawhip": ["#FFEFD5", "hue-rotate(341deg) brightness(199%) saturate(11%) contrast(220%)", "papaya whip"],
  "peachpuff": ["#FFDAB9", "hue-rotate(312deg) brightness(190%) saturate(12%) contrast(270%)", "peachpuff"],
  "omenpink": ["#FFC0CB", "hue-rotate(299deg) brightness(180%) saturate(15%) contrast(270%)", "pink"],
  "omenred": ["#FF0000", "hue-rotate(306deg) brightness(85%) saturate(190%) contrast(200%)", "red"],
  "seashell": ["#FFF5EE", "hue-rotate(1deg) brightness(199%) saturate(5%) contrast(220%)", "seashell"],
  "snow": ["#FFFAFA", "hue-rotate(1deg) brightness(205%) saturate(0%) contrast(220%)", "snow"],
  "tomato": ["#FF6347", "hue-rotate(311deg) saturate(130%) brightness(135%) contrast(100%)", "tomato"],
  "white": ["#FFFFFF", "hue-rotate(0deg) brightness(205%) saturate(0%) contrast(220%)", "white"],
  "yellow": ["#FFFF00", "hue-rotate(11deg) brightness(205%) saturate(10%) contrast(220%)", "yellow"]
}

/**
 * Export `color`
 */

/**
 * Get a color from a hex value
 *
 * @param {String} hex
 * @param {Object} color_map
 * @return {String} color
 * @api public
 */
window.colorNamer = function(hex, color_map) {
	color_map = color_map || colors;
	var rgb = h2r(hex);
	var min = Infinity;
	var closest = null;

	for (var color in color_map) {
		var rgb2 = h2r(color_map[color][0])

		// distance formula
		var dist = Math.pow((rgb.r - rgb2.r) * .299, 2)
			+ Math.pow((rgb.g - rgb2.g) * .587, 2)
			+ Math.pow((rgb.b - rgb2.b) * .114, 2);

		if (dist <= min) {
			closest = color;
			min = dist;
		}
	}

	return closest;
}

window.colorNameTranslate = function(name, mode) {
  return (mode == "spaced name") ? colors[name][2] : (mode == "hex") ? colors[name][0] : colors[name][1]
}

/**
 * Hex to RGB
 *
 * @param {String} hex
 * @return {Object} rbg
 */

function h2r(hex) {
  hex = '#' == hex[0] ? hex.slice(1) : hex;
  if (h2rs[hex]) return h2rs[hex];
  var int = parseInt(hex, 16);
  var r = (int >> 16) & 255;
  var g = (int >> 8) & 255;
  var b = int & 255;
  return h2rs[hex] = { r: r, g: g, b: b };
}
