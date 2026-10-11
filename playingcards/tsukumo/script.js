let hiku = document.getElementById("pera");
let buttonA = document.getElementById("buttonA");
let buttonB = document.getElementById("buttonB");
let buttonC = document.getElementById("buttonC");
let buttonD = document.getElementById("buttonD");
let buttonE = document.getElementById("buttonE");
let text = document.getElementById("text");
let cardImage = document.getElementById("fuda");
let cards = document.getElementById("yamafuda");
let playingcards = document.getElementById("playingcards");
let tumu = document.getElementById("tumu");
let you = document.getElementById("you");
let right = document.getElementById("right");
let left = document.getElementById("left");
let behind = document.getElementById("behind");
let A = document.getElementById("handA");
let B = document.getElementById("handB");
let C = document.getElementById("handC");
let I = document.getElementById("myhand");
let shadow = document.getElementById("shadow");
let scoreboard = document.getElementById("scoreboard");
let replay = document.getElementById("replay");
let finalA = document.getElementById("finalA");
let finalB = document.getElementById("finalB");
let finalC = document.getElementById("finalC");
let myfinal = document.getElementById("myfinal");
let yamafuda;
let number = 0;
let hiitayo = [] //0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let joker = false;
let gokurosan = false;
let battle = false;
let pless = false;
let jumban = 1;
let tumare = 0;
let lose = you;
let myscore = 0;
let scoreA = 0;
let scoreB = 0;
let scoreC = 0;
let canplay = false;
let otetuki = 0;
let safe = true;
let teban = 0
let cardPathA;
let cardPathB;
let cardPathC;

let numberA;
let numberB;
let numberC;

let mycardA;
let mycardB;
let mycardC;

let cardA;
let cardB;
let cardC;

let use
let usingcard

function buttoncolor(btn,mode) {
	colors = {
		buttonABC: {
			base: "red",
			text: "yellow"
		},
		buttonD: {
			base: "blue",
			text: "lightgreen"
		},
		buttonE: {
			base: "purple",
			text: "pink"
		}
	}
	let btnname
	if (btn === buttonA || btn === buttonB || btn === buttonC) {
		btnname = "buttonABC"
	} else if (btn === buttonD) {
		btnname = "buttonD"
	} else {
		btnname = "buttonE"
	}
	if (mode) {
		btn.style.backgroundColor = colors[btnname].base;
		btn.style.color = colors[btnname].text;
		if (btn === buttonA || btn === buttonB || btn === buttonC) {
			canplay = true
		} else {
			candecide = true
		}
	} else {
		btn.style.backgroundColor = "gray";
		btn.style.color = "black";
		if (btn === buttonA || btn === buttonB || btn === buttonC) {
			canplay = false
		} else {
			candecide = false
		}
	}
}
function makeYamafuda() {
	let cards = document.getElementById("yamafuda");
	let playingcards = document.getElementById("playingcards");

	for (let i = 0; i < 12; i++) {
		let card = document.createElement("img");

		card.src = "../images/playingcards/back.png";
		card.style.visibility = "hidden";
		card.style.position = "absolute";
		card.style.zIndex = i + 2;
		card.style.width = "120px";

		let playingRect = playingcards.getBoundingClientRect();

		let startX = playingRect.left;
		let startY = playingRect.top - 20;

		let deckRect = cards.getBoundingClientRect();

		let endX = deckRect.left + (i % 27) * 30 + Math.floor((i + 1) / 28) * 200;
		let endY = deckRect.top + Math.floor((i + 1) / 9) * 100;

		card.style.left = startX + "px";
		card.style.top = startY + "px";

		cards.appendChild(card);

		setTimeout(function() {
			card.style.visibility = "visible";
			card.style.transition = "left 0.8s ease, top 0.8s ease";

			let deckRect = cards.getBoundingClientRect();

			let newX = deckRect.left + (i % 9) * 30 + Math.floor((i / 3) % 3) * 200 + Math.max((i - 9) , 0) * 90;
			let newY = deckRect.top + Math.floor(i / 9) * 300;

			card.style.left = newX + "px";
			card.style.top = newY + "px";

			if (i === 11) {
				//playingcards.style.visibility = "hidden";

				setTimeout(function() {
					[cardPathA,cardA,numberA] = decidecard();
					[cardPathB,cardB,numberB] = decidecard();
					[cardPathC,cardC,numberC] = decidecard();
					console.log(cardA,cardB,cardC);
					mycardA = yamafuda[9];
					mycardB = yamafuda[10];
					mycardC = yamafuda[11];
					mycardA.src = cardPathA;
					mycardB.src = cardPathB;
					mycardC.src = cardPathC;
					if (numberA !== 12) {
						buttoncolor(buttonA,true)
					}
					if (numberB !== 12) {
						buttoncolor(buttonB,true)
					}
					if (numberC !== 12) {
						buttoncolor(buttonC,true)
					}
				}, 1300);
			}
		}, i * 40);
	}
}

function finishgokurosan(lose) {
	A.src = "";
	B.src = "";
	C.src = "";
	I.src = "";
	cantry = true;
	gokurosan = false;
	battle = false;
	if (lose) {
		cardImage.src = "";
		tumare = 0;
		tumu.innerHTML = "重なっている枚数<br>" + tumare + "枚";
	}
	if (hiitayo.length === 54) {
		setTimeout(function() {
			finalA.textContent = scoreA + "点"
			finalB.textContent = scoreB + "点"
			finalC.textContent = scoreC + "点"
			myfinal.textContent = myscore + "点"
			shadow.style.visibility = "visible";
			scoreboard.style.visibility = "visible";
		},1000);
	}
	if (teban === 0) {
		teban = 1
		you.style.border = "1px solid black";
		left.style.border = "3px solid red";
	} else if (teban === 1) {
		teban = 2
		left.style.border = "1px solid black";
		behind.style.border = "3px solid red";
	} else if (teban === 2) {
		teban = 3
		behind.style.border = "1px solid black";
		right.style.border = "3px solid red";
	} else {
		teban = 0
		right.style.border = "1px solid black";
		you.style.border = "3px solid red";
		hiku.style.backgroundColor = "yellow";
		hiku.style.color = "red";
	}
	if (teban !== 0) {
		setTimeout(function() {
			drawcard()
		},Math.random() * 500)
	}
	
}

function loser(makeinu) {
	if (makeinu === you) {
		myscore = myscore-tumare
		you.innerHTML = "あなた<br>" + myscore + "点"
		finishgokurosan(true)
		
	} else if (makeinu === right) {
		scoreA = scoreA-tumare
		right.innerHTML = "右郎<br>" + scoreA + "点"
		finishgokurosan(true)
	} else if (makeinu === left) {
		scoreB = scoreB-tumare
		left.innerHTML = "左子<br>" + scoreB + "点"
		finishgokurosan(true)
	} else if (makeinu === behind) {
		scoreC = scoreC-tumare
		behind.innerHTML = "奥太<br>" + scoreC + "点"
		finishgokurosan(true)
	}
}

function decidecard() {
	if (hiitayo.length !== 54) {
		let card;
		let hikinaosi = true;
		while (hikinaosi) {
			card = Math.floor(Math.random() * 54) + 1;
			if (!hiitayo.includes(card)){
				hiitayo.push(card)
				hikinaosi = false;
			}
		}
		
		// 引いた時に何が出るかを決める
		let image = ["../images/playingcards/"]
		if (card<=13) {
			image.push("spade_")
		} else if (card>13 && card<=26) {
			image.push("clover_")
		} else if (card>26 && card<=39) {
			image.push("heart_")
		} else if (card>39 && card<=52) {
			image.push("diamond_")
		} else if (card===53) {
			image.push("black_JOKER")
		} else {
			image.push("red_JOKER")
		}
		if (card<=52) {
			joker = false;
			if (card%13===1) {
				image.push("A")
			} else if (card%13===11) {
				image.push("J")
			} else if (card%13===12) {
				image.push("Q")
			} else if (card%13===0) {
				image.push("K")
			} else{
				image.push(String(card%13))
			}
			/*if (card%13===5 || card%13===9 || card%13===6 || card%13===3) {
				battle=true
			} else {
				battle=false
			}
			*/
		} else {
			joker = true;
		}
			
		image.push(".png")
		let cardPath = image.join("");
		let number
		if (card === 27) { //♡A
			number = 0
		} else if (card > 52) { //JOKER
			number = 12
		} else if ((card - 1) % 13 > 9) { //絵札
			number = 11
		} else {
			number = card % 13
		}
		return [cardPath,card,number]
	}
}

function drawcard(number) {
	const drawnCard = decidecard();
	if (!drawnCard) {
		return;
	}
	const [drawnPath, , drawnNumber] = drawnCard;
	const playedIndex = Number.isInteger(number) && number >= 0 && number <= 2 ? number : 2;
	const handCards = [mycardA, mycardB, mycardC];
	const handPaths = [cardPathA, cardPathB, cardPathC];
	const handNumbers = [numberA, numberB, numberC];
	const playingRect = playingcards.getBoundingClientRect();
	const animations = [];

	for (let sourceIndex = playedIndex + 1; sourceIndex < handCards.length; sourceIndex++) {
		const sourceRect = handCards[sourceIndex].getBoundingClientRect();
		const destinationRect = handCards[sourceIndex - 1].getBoundingClientRect();
		const movingCard = document.createElement("img");
		movingCard.src = handPaths[sourceIndex];
		movingCard.classList.add("card-animation");
		movingCard.style.left = sourceRect.left + "px";
		movingCard.style.top = sourceRect.top + "px";
		document.body.appendChild(movingCard);
		animations.push({
			card: movingCard,
			left: destinationRect.left,
			top: destinationRect.top
		});

		handPaths[sourceIndex - 1] = handPaths[sourceIndex];
		handNumbers[sourceIndex - 1] = handNumbers[sourceIndex];
	}

	const rightCard = handCards[2];
	const rightRect = rightCard.getBoundingClientRect();
	const newCard = document.createElement("img");
	newCard.src = "../images/playingcards/back.png";
	newCard.classList.add("card-animation");
	newCard.style.left = playingRect.left + "px";
	newCard.style.top = playingRect.top - 20 + "px";
	document.body.appendChild(newCard);
	animations.push({
		card: newCard,
		left: rightRect.left,
		top: rightRect.top,
		reveal: drawnPath
	});

	handPaths[2] = drawnPath;
	handNumbers[2] = drawnNumber;

	for (let index = playedIndex; index < handCards.length; index++) {
		handCards[index].style.visibility = "hidden";
	}
	[cardPathA, cardPathB, cardPathC] = handPaths;
	[numberA, numberB, numberC] = handNumbers;

	for (const animation of animations) {
		animation.card.offsetHeight;
		animation.card.style.left = animation.left + "px";
		animation.card.style.top = animation.top + "px";
	}
	for (let index = playedIndex; index < handCards.length; index++) {
			handCards[index].src = handPaths[index];
	setTimeout(function() {
		for (const animation of animations) {
			animation.card.remove();
		}
		for (let index = playedIndex; index < handCards.length; index++) {
			handCards[index].style.visibility = "visible";
		}
		if (numberA !== 12) {
			buttoncolor(buttonA,true)
		}
		if (numberB !== 12) {
			buttoncolor(buttonB,true)
		}
		if (numberC !== 12) {
			buttoncolor(buttonC,true)
		}
	}, 850);
}
}
function usecard(number) {
	buttoncolor(buttonA,false)
	buttoncolor(buttonB,false)
	buttoncolor(buttonC,false)
	let mycardRect
	let itsnumber
	let fieldRect = cardImage.getBoundingClientRect();
	
	let movingCard = document.createElement("img");
	movingCard.classList.add("card-animation");

	movingCard.style.width = "120px";
	movingCard.style.height = "160px";
	
	// 山札と同じ位置に置く
	if (number === 0) {
		mycardRect = mycardA.getBoundingClientRect();
		movingCard.style.left = mycardRect.left + "px";
		movingCard.style.top = mycardRect.top + "px";
		movingCard.src = cardPathA;
		itsnumber = numberA;
	} else if (number === 1) {
		mycardRect = mycardB.getBoundingClientRect();
		movingCard.style.left = mycardRect.left + "px";
		movingCard.style.top = mycardRect.top + "px";
		movingCard.src = cardPathB;
		itsnumber = numberB;
	} else {
		mycardRect = mycardC.getBoundingClientRect();
		movingCard.style.left = mycardRect.left + "px";
		movingCard.style.top = mycardRect.top + "px";
		movingCard.src = cardPathC;
		itsnumber = numberC;
	}
	if (itsnumber === 0 || itsnumber === 2 || itsnumber === 3 || itsnumber === 4 || itsnumber === 9 || itsnumber === 10) {
		buttoncolor(buttonD,true);
		buttoncolor(buttonE,true);
		usingcard = number
	}
}
function playcard(number) {
	console.log("number =", number);
	yamafuda[number + 9].style.visibility = "hidden";
	document.body.appendChild(movingCard);
	cantry = false;
	
	// ブラウザに山札の位置を確定させる
	movingCard.offsetHeight;
	
	// 場へ移動
	movingCard.style.left = fieldRect.left + "px";
	movingCard.style.top = fieldRect.top + "px";
	
	// 0.8秒後に表向きにする
	
	// アニメーション用カードを消す
	setTimeout(function() {
		movingCard.remove();
		cardImage.src = movingCard.src;
		cardImage.style.visibility = "visible";
		let plus = itsnumber
		if (use) {
			plus = 0
			if (itsnumber === 0) {
				tumare = 0
			} else if (itsnumber === 2) {
			
			} else if (itsnumber === 4) {

			} else if (itsnumber === 9) {
				tumare = 99
			} else if (itsnumber === 10) {
				tumare = tumare - 10
			}
		} else {
			if (itsnumber === 0) {
				plus = 1
			} else if (itsnumber === 11) {
				plus = 10
			}
			tumare = tumare + itsnumber
		}
		tumu.innerHTML = "現在の数字<br>" + tumare
		drawcard(number)
	},1100);
}

document.addEventListener("DOMContentLoaded", function() {
	
		
	// 山札を表示する
	setTimeout(function() {
		makeYamafuda();
		yamafuda = cards.querySelectorAll("img");
	},1000);
	//yamafuda = cards.querySelectorAll("img");
	
	buttonA.addEventListener("click", function() {
		if (numberA !== 12 && canplay) {
			playcard(0);
		}
	});

	buttonB.addEventListener("click", function() {
		if (numberB !== 12 && canplay) {
			playcard(1);
		}
	});

	buttonC.addEventListener("click", function() {
		if (numberC !== 12 && canplay) {
			playcard(2);
		}
	});

	buttonD.addEventListener("click", function() {
		if (candecide) {
			use = true;
			buttoncolor(buttonD,false);
			buttoncolor(buttonE,false);
			playcard(usingcard);
		}
	});

	buttonE.addEventListener("click", function() {
		if (candecide) {
			use = false;
			buttoncolor(buttonD,false);
			buttoncolor(buttonE,false);
			playcard(usingcard);
		}
	});

	replay.addEventListener("click", function() {
		location.reload();
	});
});

/*
function resizeGame() {
	let game = document.querySelector(".all");

	let margin = 20;

	let scaleX = (window.innerWidth - margin * 2) / 1800;
	let scaleY = (window.innerHeight - margin * 2) / 900;

	let scale = Math.min(scaleX, scaleY);

	game.style.transform = "scale(" + scale + ")";

	let width = 1800 * scale;
	let height = 900 * scale;

	game.style.left = ((window.innerWidth - width) / 2) + "px";
	game.style.top = ((window.innerHeight - height) / 2) + "px";

	window.gameScale = scale;
}

window.addEventListener("resize", resizeGame);

resizeGame();

*/
