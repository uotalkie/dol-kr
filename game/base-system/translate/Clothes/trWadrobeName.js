const nameWardrobes = {
	"orphanage" : "고아원",
	"beach changing room" : "해변 탈의실",
	"eden's cabin" : "에덴의 오두막",
	"asylum" : "정신병원",
	"alex's farm" : "알렉스의 농장",
	"strip club" : "스트립 클럽",
	"brothel" : "창관",
	"schools boy's" : "남학생 탈의실",
	"schools girl's" : "여학생 탈의실",
	"prison" : "감옥",
	"prison locker" : "감옥 사물함",
	"temple" : "사원",
	"pirate ship" : "해적선",
	"office agency changing room" : "사무 인력 탈의실",
	"great hawk's tower" : "거대 매의 탑",
};

function trWardrobeName(wardrobeName, post, sep)
{
	if (wardrobeName)
	{
		let tempArray = wardrobeName.toLowerCase().split(' ');
		let wardrobe;
		switch (tempArray[tempArray.length - 1])
		{
			case "wardrobe":
				wardrobe = " 옷장";
				tempArray.pop();
				break;
			case "locker":
				wardrobe = " 사물함";
				tempArray.pop();
				break;
			default:
				wardrobe = " 옷장";
		}
		
		let wardrobeloc = nameWardrobes[tempArray.join(" ")];
		if (!wardrobeloc)
			T.trResult = `trWardrobeName: 모르는 옷장: ${wardrobeName}`;
		else
		{
			T.trResult = wardrobeloc + wardrobe;
			if (post)
				trPost(0, post, sep);
		}
	}
	else
		T.trResult = "trWardrobeName: 모르는 옷장: [undefined]";

	return T.trResult;
}
window.trWardrobeName = trWardrobeName;
DefineMacro("trWardrobeName", trWardrobeName);

window.trWardrobesName = trWardrobeName;
DefineMacro("trWardrobesName", trWardrobeName);
