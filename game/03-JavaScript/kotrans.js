/* Korean translation information */
window.koTrans = {
	"version": "0.1.2024.0720",
	
	"info": 
		'<br>'+
		'한국어 번역판<span class="blue"><<link "(?)">><<run koTrans.legal()>><</link>></span><br>'+
		'v<<= koTrans.version>>',
	"legal": function() 
		{ 
			Dialog.setup("번역본 저작권 정보"); 
			Dialog.wiki(
				'원본의 [["CC-BY-NC-SA 라이센스"|"https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.ko"]]에 의거 동일조건으로 아카라이브 DOL 채널([["https://arca.live/b/dolgame"]])에서 번역중입니다.'
			); 
			Dialog.open(); 
		},
	"linkinfo":
		'<div class="m-2">'+
		'<p class="gold m-0">한글 번역 채널</p>'+
		'[[아카라이브 DOL 채널|https://arca.live/b/dolgame]]'+
		'</div>'+
		'<<if StartConfig.sourceLinkEnabled>><div class="m-2">'+
		'<p class="gold m-0">한글 번역 소스코드</p>'+
		'[[github dol-kr|https://github.com/uotalkie/dol-kr]]'+
		'</div><</if>>',
	"warning":
		'<div style="background:blue;text-align: center;" class="no-numberify">'+
		'<p><h1 class="lblue">Warning</h1></p>' +
		'<p><h3 class="orange">게임 내 유해 내용정보에 대한 경고</h3></p>' +
		'<p><span class="white">지금 플레이하려고 하는 게임에서 다음과 같은 <span style="background: black">유해 내용이 제공되고 있어</span> 이에 경고합니다.</span></p>' +
		'<p>' +
		'<img src="data:image/gif;base64,R0lGODlhPQBGAMQAADEtLtbV1UxJSvHx8T87PJGPkKyrq3ZzdOPj47q5uZ6dnYSBgmhlZuTj44OBgq2rq5+dnVpXWMjHx5GPjyMfIP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA9AEYAAAX/YCWKiGSeaKqubJuOcKUQVG3feK7vvH40sENvSCzyAAFRwshsEiMixg2wSLhMCtviajLYIibhjSG+JW+CQWwNA9QIajZMWjNUEO4aICEK5GsQFTcIcnITNgeFIl56IhE2SDBZNgWCNQKKbAN/iXKTNQoVATd2MAM3lV+ZbEs2AhIxAY82DCILqmuolhRQq2uMkBELETRocQI2fLmUu72+MQZ/PAdxuxRyurjPMQh0OgTKI67YzNrb3AqzFFThMObu5TXO52sIWoU2BOQ1qfL0chJsTMBnoxo8fs3+sQlYp5C6UjGy+VM4AoEBhhRgecrHRiIviiMCljGgj409gcsQ/777h3GcnDIUIIrwOI+iN1BrAqjZdGPBQQr9PoIUMQDZOpl9AKTxg4OAAkI0h1YEEClGKwoCpPUIWnNVAI2xDI5gikNAsR1ct03gJLYQ2UsDBqxFm9DXrbJt2bzFGmeAAgZa0646ue5sqEx74aYEWnchnWIA1NDJIwDpiKtnq/4U/EtHr0M5OnVO40Xzz4ErK/DM8XkHWKtxEiTpiDI1RgkDZrVeFwBBsYEgb6CeGAOjCNC7e90lQJXB62fCG8MwXgH58YmgcVjOFN22jetCrVffQWhbd+LTv48Pj11PiTzAoddGH1K9+Ps1fFaYFd/XeaHF2dceexQAx985/3VVAf91+BFoYA39rZLgQgISuNuDBSI4H4Dp1QBecuBhGCF3GzrjVwQoVgjieiJqCGFdAZx1w4c0sujIi+aVKIJROdTYYIs5vqjKKPlJwKOPAwIpn5D+UAfMIijqZ0CUUEZQyoFBZqgKddT9g+WSWjapXpf0fOmfjlyq5yWOYA73UZoUlLRmhlm6CQWcCvpipoRoqofABBNspyebZzL5pppS7UmioXfaUF6ihPJpKCYV5JFnmZEqQliYNcCS3YhzgmrIf3EmweNsICkqx1WGIlIGAYDGKuustMZaTAS10qrOhk706murvwZrhJvCFjsEsTy84o8PJxwAxQ4HQMBPSzsgu0OtLWY9YA0aFRBAgAPb2hAIBT9Qq4O1OmhbAAHa7hBIARG0m0NkDTjArrk5oIuDAwGk4cCzORQQYwDwhktAAAcIEIADBeCLg743OOAGAP+Gi9U6ERwAwK75xIlixkRA7ApGAOMAgAQNmNAATK408BXKPPIwkFasWYwDFHlQo4PANjzA6g6h3PSNQQ4/MIDKLL+BsgQB9EtEEg4bK7UzwEhtNV8wJBDz1b8CMEEcIQAAOw==">' +
		'<img src="data:image/gif;base64,R0lGODlhPQBGAMQAAFpXWPHx8TEtLtbV1XZzdExJSj87PKyrq5GPkOPj42hlZoSBgrq5uZ+dnZ6dneTj44OBgq2rq5GPj8jHxyMfIP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA9AEYAAAX/YCWKw2SeaKqubJuOcIUIVG3feK7vfC4sAVihRywaeYWg7MhsFgkims0gYUhuBBSBknWtaICWBJALPLDKSoJcC4smFMEgRqdvKen6AWeyCfIiDAY2BAFwFEl1ihUDNQeLInc1fTVQdQFXNQKSCpB1gwUwczGHk6USkAkKOqieMA41ow6tMKUUlBS0ixODfK4jATULjLl0tri6l5k4Agm/Iqt/Q8kVx6eQB1I6iYoDzoE1Q8WkN8jdbD2WeuEAyzXU1jbUIyYSEgoA2jePins78OWuPRORYMIBCQsAFPi2jpWxgPIGSoThDwdAG+YmaqwYkRxGgRonchxXC+I7GAwm/4T8xfGiqY4iAghwsxIbTHomSYrIRLNmQ5e3QMbU1tMnRZ1vclKRcMBEBXcUihqtcPDhRydRVU7dpVScEalbk149SWICA3Q6DGgNi3Ms0gT6piwYxbak22RoKRiYu3XAkAJ0274kKwJWjb2Bp/aKY3UwyUaI647A0TgoTAaJJS82UDmj5ASLbQBYpWDUACXxCLMN4BWHugpbBIh1PM8n6xoKJMS1JGm2ZdVb7ySRhEUSv9RIjQoPYNhPXH7VctYO2SjOgJEUDgzQBj36XbZw5VTfR8KAAAYeaUtmtNsV8ukrA4SO5V563ds+1ip6X3eVHxzddSbURGMAYKBCaBBHAf9DAt7kygAEzDGeDuoQp196vyW3HxmcqYFEHpIwiKFnixyw2DAE2aOiPejFYFiH+9mnCCbzifiLf51w9R0dASwQFyIh9eIAJPzVcd0CoQX4SwIYESljNwJ4BcgvDNjgSZFGbhIMBTlOtEAbVz4Zwx6WrNLiRGzA551jXR6ljgOyhcSAAAbYGEOVbv0RQyOvJYDieiP45xgieQSQ2ZR1NTdoHASs6OijkEYq6aOtLYrVpU7ggummTGjK6ac9eLqDCg3kUMAJDQAQgYIYiVNBXjmIqgMAFUCgql8+GBjBBAg8gIAOsv2qEqx82MKDSiU8EECpONCKAAJZBPBrDr0+MNNxq0TImsOBtRpoqgzP9jrtDQhMIAACA3BGbE6hqrDNgQDYmkMvAGyBwHyxGrtDAymwSgG/J0irQwOGTPAAs6FuSUQB8A4w7rEPW+kfZ5XGWgG+2UY8sL8QFHwwEXEqCurIN/zpL8mcciOCiSiDSsUIIQAAOw==">' +
		'<img src="data:image/gif;base64,R0lGODlhPQBGAMQAANbV1T87POPj4/Hx8UxJSjEtLp6dnYSBgrq5uWhlZnZzdKyrq5GPkJ+dna2rq+Tj44OBgpGPj1pXWMjHxyMfIP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA9AEYAAAX/YCVOimSeaKqubKsqgCgfVG3feK7vfL/IiJ5wSBQiRAEcwcVsNnOBCuBGiMmu2Kx2y5UJCDjBxFYQdM/otGiQtE3GNYV6Tscabm9bpM6fw2t5NXt9ImA5Bn1/FIEUg30CO2Z8ioyOfAs6BFoIEZ0RkliUf5Z1CjqIWW01A1qieoQVBTqgXjcSW66ChFM5mll3r614o4QRp1oJeLjDwXyGYVqyNly5jX0DmcI2CdTMupc6B1o0NqjagMR8pjlWWM8U7VnVpGqqNlFZkGRd83y8OOKyYLIhp5ubdHSA4YgnI5mNA28iTrjSr44EKFuk7bglo6IWTxF+rAmn5Z+OAqw6/3qzVvIGNxFB2H3scYTiSnoiFFIwt+4GviwAJE5wSKGgzYPNsFy00c5enC0DJFZoEyDlUXRJZWC7VytHggMn3tlYoG/RuUUIr8R8mrMIDm4DcVbweKUnBZEViLpFmZeCr7OVtNgD5VZZrAIMr6LNWqEshZ9r3QacYg5w2rYPZ9RAccCTAY01/kbgaBDrtyt6a6IxWaOdBKvLkJ6WgQOB0MQiyJWjiIZuhcjHBNuadBOLbh0vgd7gW8e30+WwrxxXTce3UEXUsagKSFw2yy3/uCuvUZWQbzuho0tnCuv8laW4ZbSRq8Y97e8tKZA2X3xLkP1a3FEGLCP0N86AXYCBV+t7BmZBwIJaQJIcgfYJMOEWBpRHYIHeySWAeg5OtCGHpuFXhwD0dVdiimfQMqJ9I6q42GwxMujdXzXCchwjd+UIC2s8FjUBiD6CFwFoMxam5JI5BMnkk245CeWUPUipgwpI9qCCWEJY2aRUSxHBQAUOMDDBA3YN4aUODCRRQZhEvEmBmUquSYYJFUDADZxDyElnYXaGdl0DUQpFaKFFBODAGwjwScQtTAa6SpsUJDAAl0JAuuSQRQDQqAQMsFEEAYMWJoKjJynAwKrPUclDQQJk6eqszEmB6qxQSuCiFAaA5OuvwAYr7LAGxBMCADs=">' +
		'<img src="data:image/gif;base64,R0lGODlhPQBGAMQAAJGPkExJSnZzdDEtLtbV1Z+dnfHx8eTj47q5uT87PGhlZqyrq62rq4SBguPj44OBgp6dnZGPj1pXWMjHx////yMfIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA9AEYAAAX/ICVOgmSeaKqubKsKjig3VW3feK7vfL/IkJ5wSBRORANcwMVsMgM5CWVyC8Rk2Kx2y+3KHNDb1DYweM/otMiQtI1rDbV8nqW5qbUIfS/H194VenyDXn4VgIJdE4uMjY6PkBNmXIaIXAQKRZo1AT9alX6JWBGbpTUSkzKgNqIidqalAamAh6FZCLC5capitlgJublXtJYyC8G6vHesWALIsFIjvcwywDptFdg9AycDSxJhOMp/viLXEwc1AgbOQtEUEke0btLLeVg6RwjcFAaZ7jLi1RM3sBY1czgSvGEAj8g7gfP+FCyG8IaUAxMCHJlQYAg3BPACKIh4aGI5ClEC/8ozxEOWgRoMH+gYZ/CejJQiILK8JsJZAQoEtNEjdjKHxkUBCizqOOSBhBoJAAgduspmxWelaFJEidWU1qJds5o8yDWspq9kzW5Ca5WCNbVD2AbC8g9ujwByRR2z22MXUbJs+PIYVnUuliCCcwjAUrgVhXaJOc1qvAWyYFlZKG9B8FbtAMd/22ohgCBC5woBIqhezbo16wUEFE0TzeXpDU+Etmg+86rGrNyMZxs+Q8oGXuC6hYP+dGMxcub2hp+5sRz47jN1q+e+7mWv9OdjaXcJ8w58+O9egmYzHzy69tFJQLIPjf6MAdXz6b/PL9s9fz7e1VRBef+pYRktuBWIBv9L8wggj4KUFCdcZMiQRGFWO12IoYYV+hHAAQR0xBUAEwBQwQRPCXDAAQEAYOIpBJyA0lEkoHjiUi7WMEEmOUbHQEcELFZBAukQkICNFAygQIkvDniAiwCU5ZaKtoWo4osGFHClcD9W8CRKDlbAAAMHPIVSPD06CSVXDxyAQAAxDoAAAwRAKSadEqQpoJwTyIQSiRUUUECMgRJwgAJ6plCBAh0BIEABUJSQZwkBODOAlgca0uSZBJwYj202pKkUAQYgdSMjkTLyJGoIEDDBmxOWZUOInaIYFZQl4hDPDjaSCOVTJNQAAC5uOHADAo1AwU0SkHJzgqO6ZhgoFEsy0hEnnIvAWsMAOXEIi3PqeatJAqkQEI64PaAyGgSutevuu/C+C0FsMoQAADs=">' +
		'<img src="data:image/gif;base64,R0lGODlhPQBGAMQAADEtLtbV1fHx8XZzdExJSqyrq62rq5GPkE1JSj87POPj47q5uZ+dnWhlZuTj44SBgp6dnYOBgru5upGPj1pXWMjHxyMfIP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA9AEYAAAX/4CWKSmWeaKqubJsKY7wkVm3feK7vvE4FsUJvSCz2KiSjckkEwB43wKDgqlpdhQcAV7hQbABgbCxCks/o9ChAs028tq76IhzM7/PK7f2t3YU1YniDY1s1fDZzgBZyhI4ifRaIfmmLdjEBDTCPapGTFpVca1sEm5xnnnCUZIsFgF0BhqWnaKmRZ60igBOGFgq0tW6qoGO5I4s2s8BjtolBcWOxNQgCBhbKy5DCt8fCmIbUItbYy82ryGGj06YX4+y05sQXBDUFAxbp0hbhY+7Z8SMEEJBzD0ABcO9G+AMGEM09G/zQLDzV8EwAiAnJTHxUMRrCQRsJdVS3L2Oacb84/25z9s2GBIuaJOITNGjkhQU1CABI1/LSGWs8a65cFcRJrKDSyGmcKXKoPDRHgSTddMBkhZ00Ozm9c9QAqU33CKSJisemRVlgaxhQc7TsVjzSGIh4uPamyQAQ3B4aRkiaAbrirmUcoBTV20H6LNS1ZsFnjIeFmR1GvOUSzsZnHgqeY3aOX2mOR2iOLHkvt0fSKme+ETqYaZaot1BYjWOAyRGd4W6pK3pH69KS+ALz21sHadyTTwlUfEEzDid3chNaPgFMjt/AP2UTIWBB85mACECogR35a6LbLzwQU2AWoPLDtKf/Qz6N9PndSN/HrytrjP38QZCXa8Gdxl8aBCRgX+tyB0YTCIHyNXgGFMEZdt5TEsbQhlgWFghbhiJcZENGAKanhw1mZCcciGvckFIhTg3Ioi4JEOAdGSdeCECKM47Vi4c3NDDBkEQWaeSRSCappHMXMuHkk0BCKaUSn0xpZQ9V9mCAAAEQMBs9SwyQAgNFZLlDBA5YgOZsTBJxgAMHxGlCmcP0cIAes33JBAFj0hlJDwkIwIADDLDJxAkXBGACmFjW2QMAFNADqZMUxNnOAW3qYOYOZDgp5gkO5Njon0bM5mRVKJBJxBsULmEqEw2MISoPXSjw45W42qCgLrn2WkNQiTbgq5VSpBQCADs=">' +
		'<img src="data:image/gif;base64,R0lGODlhPQBGAMQAAJGPj5GPkD87PDEtLtbV1fHx8UxJSnZzdGhlZqyrq+Pj462rq7q5ueTj456dnZ+dnYSBgoOBgsjHx1pXWCMfIP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA9AEYAAAX/YCUq0GSeaKqubKsikignA2XfeK7vfN8fMoJvSCwOASJETuBqOp26QaGCG8Rk2Kx2y+3KCodcDHf1ms/oyoRMtRnS8HiWwb5N5OmCJAHoJyQKXgV1Nnd4XQwHAkwRAY4BEwYDCAlchBSGh1kJTAtTiAcDSFmXmZoVBZFlZw0IBoEypacyBgafcYq3srMJFA2aAkAiu6eupwECsTdjhbNqA8UUyjbMmM5rD4dC0sPLbdazaxTZcRI13N8U1aaH4hQCC2gS7tDd1N/seA45kwESEr/0SHigKAeCaerwOStwzogOAgjXOatAoKFDGw6wEJtVQMlFGww0erMzMUgoIgPC/1AYZS8hyZJYCDgAkALCPhsAcIq89xKmGQgPd7ps5tNLziWkRhItysXijZARFcZRIAEiHAU3dbBMJ9ELAQCudjABsApLRx9bN2JRAEAApgAMyhIYqCilVVpD7nKVajbnhHhpCIRBAKuXD2FRe4ogYEBA2TQNJgxI5LYHBC0bGdqapbKHhFtCu4oI8+taj2SWlIKroGD1rAUrd0DdQkyC61O2d1TqUvtdyQg4IABIAIu36ky5yZ2qWGj2md42lONhvlIO9EKPzTToXD0OsW04DDzQu6XBAo84dsPZWHnHBASPHEWY0J4faDQbwX/ckdH68U1O7UfBZXioRZEBAtoggP1z3v23RQIIXiSAA/c1yNNSW2DlDg8TQEDeIQZyQZUEM5FVVVEhMrWegyqCyGKL/l14G4xotKaaFDTGYZiMFCCWoxkMXdJchT8uRoMY6SSopBHVLOnkEE0+KaUOUQ7RGCYDCBBhEQacsMiWUCYJ5QJ3TOCPQwfEA8mZRVTpwz8BVLDAPxcdVAObRLjpGZly0unQZwFQgGeYdT4iwKBDMLCAFQ8g6pmYPpj5yAIPOMQEFYfmliekPQTQwCN+GnGHDY7yEEN9Q3gKqqZW/uNqA6z6ANFRRQwQXwDcSQjmaSIUsOuUTw5wVyrATinAhwrw0ceyzDbr7LPQRtvsKiEAADs=">' +
		'</p>' +
		'<p><span class="white">위와 같은 이유로, 해당 게임은 반드시 <span style="background: black">성인만이 플레이</span>하여야 하며 해당 게임 및 내용을 <span style="background: black">미성년자가 관람할 수 있는 곳<br>(예: 유튜브, x(트위터), 페이스북 등)에 게시</span>하는 것은 법적인 저촉을 받을 수도 있다는 것을 알려드립니다.</span></p>' +
		'<p>당신은 법적 성인이며 이 게임을 플레이하는 데 따르는 모든 책임을 당신 자신이 지겠다고 확인하시겠습니까?</p>' +
		'<p><<link "네. 나는 법적으로 성인이며 모든 책임을 자신이 지겠다고 확인합니다.">><<set _warningConfirm to true>><<replace "#settingsStart">><<settingsStart>><</replace>><<replace "#overlayButtons">><<startCaption>><</replace>><</link>><br>' +
		'<<link "아니오. 이 게임을 플레이하지 않겠습니다.">><<run koTrans.warningNoHandler()>><</link>></p>' +
		'</div>',
	"coveredStartCaption": '<<versioninfo>><<koTransInfo>><br><br><div class="my-4"><<linkinformation>></div>',
	"warningNoHandler" : function () { document.getElementById("passages").children[0].innerHTML = '<span class="redblink">' + "빨리 꺼라 ".repeat(1012) + "</span>"; document.getElementById("ui-bar-body").innerHTML = '<span class="redblink">' + "빨리 꺼라 ".repeat(99) + "</span>";},
}
DefineMacroS("koTransInfo", () => window.koTrans.info);
DefineMacroS("koTransLinkinfo", () => window.koTrans.linkinfo);
DefineMacroS("koTransWarning", () => window.koTrans.warning);
DefineMacroS("coveredStartCaption", () => window.koTrans.coveredStartCaption);

/* l10nStrings */
l10nStrings.errorTitle = StartConfig.version + "-" + koTrans.version + " Error";
l10nStrings.restartTitle = "게임 재시작";
l10nStrings.restartPrompt = "정말 재시작하시겠습니까? 저장되지 않은 진행상황은 사라지게 됩니다.";
l10nStrings.cancel = "취소";
l10nStrings.ok = "확인";



l10nStrings.savesHeaderSaveLoad = "세이브/로드";
l10nStrings.savesHeaderIDName = "ID/이름";
l10nStrings.savesHeaderDetails = "상세";
l10nStrings.savesTitle = "세이브";
l10nStrings.savesDisallowed = "이 경로에서는 세이브가 금지되어 있습니다.";
l10nStrings.savesLabelAuto = "자동저장";
l10nStrings.savesLabelDelete = "삭제";
// l10nStrings.savesLabelExport = "Save to Disk…";
// l10nStrings.savesLabelImport = "Load from Disk…";
l10nStrings.savesLabelLoad = "로드";
l10nStrings.savesLabelClear = "모든 세이브를 삭제";
l10nStrings.savesLabelSave = "저장";
l10nStrings.savesLabelSlot = "슬롯";
// l10nStrings.savesUnavailable = "No save slots found…";
// l10nStrings.savesUnknownDate = "unknown";
l10nStrings.savesDescTitle = "제목: ";
l10nStrings.savesDescName = "세이브 이름: ";
l10nStrings.savesDescId = "세이브 Id: ";
l10nStrings.savesDescDate = ", 날짜: ";
l10nStrings.savesPagerJump = " 가장 최근의 수동 저장으로 이동 ";
l10nStrings.savesPagerPage = "페이지: ";
l10nStrings.savesPagerSavesPerPage = " 페이지당 세이브 수: ";
l10nStrings.savesOptionsConfirmOn = " 다음의 경우 확인 필요: ";
l10nStrings.savesOptionsUseLegacy = " 기존의 세이브 저장 공간 사용: ";
l10nStrings.savesWarningSaveOnSlot = "에 저장하시겠습니까?";
l10nStrings.savesWarningOverwriteSlot = "에 덮어쓰시겠습니까?";
l10nStrings.savesWarningOverwriteID = "세이브 ID가 일치하지 않습니다. 덮어쓰시겠습니까?";
l10nStrings.savesWarningDeleteInSlot = " 삭제하시겠습니까?";
l10nStrings.savesWarningLoad = "에서 로드하시겠습니까?";
l10nStrings.savesWarningDeleteAll = "주의 - 정말로 모든 세이브를 삭제하시겠습니까?";

l10nStrings.savesDisallowedReplay = "리플레이 씬 뷰어가 현재 작동중이므로, 세이브를 할 수 없습니다.";
l10nStrings.savesExportReminder = "여기에서의 세이브는 당신의 브라우저 캐시가 지워지면 사라집니다. 세이브가 사라지는 상황을 방지하기 위해 내보내기 기능을 사용하시기를 권장합니다.";

// l10nStrings.identity = "game";
// l10nStrings.savesIncapable = "{_warningIntroLacking} the capabilities required to support saves, so saves have been disabled for this session.";
// l10nStrings._warningIntroLacking = "Your browser either lacks or has disabled";
// l10nStrings._warningOutroDegraded = ", so this {identity} is running in a degraded mode. You may be able to continue, however, some parts may not work properly.";

// l10nStrings.aborting = "Aborting";
// l10nStrings.close = "Close";
// l10nStrings.errorToggle = "Toggle the error view";
// l10nStrings.errorNonexistentPassage = "the passage "{passage}" does not exist";
// l10nStrings.errorSaveDiskLoadFailed = "failed to load save file from disk";
// l10nStrings.errorSaveMissingData = "save is missing required data. Either the loaded file is not a save or the save has become corrupted";
// l10nStrings.errorSaveIdMismatch = "save is from the wrong {identity}";
// l10nStrings.warningNoWebStorage = "{_warningIntroLacking} the Web Storage API{_warningOutroDegraded}";
// l10nStrings.warningDegraded = "{_warningIntroLacking} some of the capabilities required by this {identity}{_warningOutroDegraded}";
// l10nStrings.debugBarToggle = "Toggle the debug bar";
// l10nStrings.debugBarNoWatches = "— no watches set —";
// l10nStrings.debugBarAddWatch = "Add watch";
// l10nStrings.debugBarDeleteWatch = "Delete watch";
// l10nStrings.debugBarWatchAll = "Watch all";
// l10nStrings.debugBarWatchNone = "Delete all";
// l10nStrings.debugBarLabelAdd = "Add";
// l10nStrings.debugBarLabelWatch = "Watch";
// l10nStrings.debugBarLabelTurn = "Turn";
// l10nStrings.debugBarLabelViews = "Views";
// l10nStrings.debugBarViewsToggle = "Toggle the debug views";
// l10nStrings.debugBarWatchToggle = "Toggle the watch panel";
// l10nStrings.uiBarToggle = "Toggle the UI bar";
// l10nStrings.uiBarBackward = "Go backward within the {identity} history";
// l10nStrings.uiBarForward = "Go forward within the {identity} history";
// l10nStrings.uiBarJumpto = "Jump to a specific point within the {identity} history";
// l10nStrings.jumptoTitle = "Jump To";
// l10nStrings.jumptoTurn = "Turn";
// l10nStrings.jumptoUnavailable = "No jump points currently available…";
// l10nStrings.settingsTitle = "Settings";
// l10nStrings.settingsOff = "Off";
// l10nStrings.settingsOn = "On";
// l10nStrings.settingsReset = "Reset to Defaults";
// l10nStrings.shareTitle = "Share";
// l10nStrings.alertTitle = "Alert";
// l10nStrings.autoloadTitle = "Autoload";
// l10nStrings.autoloadCancel = "Go to start";
// l10nStrings.autoloadOk = "Load autosave";
// l10nStrings.autoloadPrompt = "An autosave exists. Load it now or go to the start?";
// l10nStrings.macroBackText = "Back";
// l10nStrings.macroReturnText = "Return";
