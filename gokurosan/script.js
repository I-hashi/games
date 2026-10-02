let hiku = document.getElementById("pera");
let button = document.getElementById("button");
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
let number = 26;
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
let cantry = false;
let otetuki = 0;
let safe = true;
let teban = 0

function makeYamafuda() {
	let cards = document.getElementById("yamafuda");
	let playingcards = document.getElementById("playingcards");
	for (let i = 0; i < 54; i++) {
		let card = document.createElement("img");
		card.style.visibility = "hidden";

		card.src = "../images/playingcards/back.png";
		card.style.position = "fixed";
		card.style.zIndex = i+2;
		let playingRect = playingcards.getBoundingClientRect();
		let startX = playingRect.left;
		let startY = playingRect.top;

		let deckRect = cards.getBoundingClientRect();
		let endX = deckRect.left + (i % 27) * 30;
		let endY = deckRect.top + Math.floor((i + 1) / 28) * 200;
			
		card.style.left = startX + "px";
		card.style.top = startY + "px";

		cards.appendChild(card);
		setTimeout(function() {

			

			setTimeout(function() {
				card.style.visibility = "visible";
				card.style.transition = "left 0.8s ease, top 0.8s ease";
				let deckRect = cards.getBoundingClientRect();

				let newX = deckRect.left + (i % 27) * 30;
				let newY = deckRect.top + Math.floor((i + 1) / 28) * 200;

				card.style.left = newX + "px";
				card.style.top = newY + "px";
				if (i === 53) {
					playingcards.style.visibility = "hidden";
					setTimeout(function() {
						cantry = true;
						hiku.style.backgroundColor = "yellow";
						hiku.style.color = "red";
					},800);
				}
			}, 20);

		}, i * 80);
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


function drawcard() {
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
			if (card%13===5 || card%13===9 || card%13===6 || card%13===3) {
				battle=true
			} else {
				battle=false
			}
			
		} else {
			joker = true;
		}
			
		image.push(".png")

		let cardPath = image.join("");
	
		let deckRect = cards.getBoundingClientRect();
		let fieldRect = cardImage.getBoundingClientRect();
		
		let movingCard = document.createElement("img");
				
		movingCard.src = "../images/playingcards/back.png";
		movingCard.classList.add("card-animation");
		
		// 山札と同じ位置に置く
		if (number===27) {
			movingCard.style.left = "50px";
			movingCard.style.top = "250px";
		} else if (number>27) {
			movingCard.style.left = deckRect.left+30*(number-27) + "px";
			movingCard.style.top = deckRect.top+200 + "px";
		} else if (number<27) {
			movingCard.style.left = deckRect.left+30*number + "px";
			movingCard.style.top = deckRect.top + "px";
		}
		console.log("number =", number);
		yamafuda[number].style.visibility = "hidden";
		document.body.appendChild(movingCard);
		cantry = false;
		hiku.style.backgroundColor = "gray"
		hiku.style.color = "black"
		
		// ブラウザに山札の位置を確定させる
		movingCard.offsetHeight;
		
		// 場へ移動
		movingCard.style.left = fieldRect.left + "px";
		movingCard.style.top = fieldRect.top + "px";
		
		// 0.8秒後に表向きにする
		setTimeout(function() {
			movingCard.src = cardPath;
		}, 800);
		
		// アニメーション用カードを消す
		setTimeout(function() {
			movingCard.remove();
			if (number === 0) {
				number = 53
			} else {
				number = number-1
			}
			cardImage.src = cardPath;
			cardImage.style.visibility = "visible";
			tumare = tumare+1
			tumu.innerHTML = "重なっている枚数<br>" + tumare + "枚"
			gokurosan = true;
			
			// CPUの手を出す
			if (battle) {
				jumban = 2;
				lose=you;

				// 右の手
				setTimeout(function() {
					A.src = "../images/hand.png";
					A.style.zIndex = jumban;
					if (jumban === 4) {
						setTimeout(function() {
							loser(lose)
						},1000);
					} else if (jumban === 5) {
						lose = right;
						whosescore = scoreA;
					}
					jumban = jumban + 1;
				}, Math.random() * 750);
		
				// 左の手
				setTimeout(function() {
					B.src = "../images/hand.png";
					B.style.transform = "rotate(180deg)";
					B.style.zIndex = jumban;
					if (jumban === 4) {
						setTimeout(function() {
							loser(lose)
						},1000);
					} else if (jumban === 5) {
						lose = left;
					}
					jumban = jumban + 1;
				}, Math.random() * 750);
		
				// 奥の手
				setTimeout(function() {
					C.src = "../images/hand.png";
					C.style.transform = "rotate(270deg)";
					C.style.zIndex = jumban;
					if (jumban === 4) {
						setTimeout(function() {
							loser(lose)
						},1000);
					} else if (jumban === 5) {
						lose = behind;
					}
					jumban = jumban + 1;
				}, Math.random() * 750);
			// ジョーカー
			} else if (joker) {
				setTimeout(function() {
					if (teban === 0) {
						myscore = (myscore-tumare)*2
						you.innerHTML = "あなた<br>" + myscore + "点"
						finishgokurosan(true)
					} else if (teban === 1) {
						scoreB = (scoreB-tumare)*2
						left.innerHTML = "左子<br>" + scoreB + "点"
						finishgokurosan(true)
					} else if (teban === 2) {
						scoreC = (scoreC-tumare)*2
						behind.innerHTML = "奥太<br>" + scoreC + "点"
						finishgokurosan(true)
					} else {
						scoreA = (scoreA-tumare)*2
						right.innerHTML = "右郎<br>" + scoreA + "点"
						finishgokurosan(true)
					}
				},1000);
			// お手付き
			} else {
				safe = true
				setTimeout(function() {
					if (safe) {
						finishgokurosan(false)
					}
				},1000);
				// 右の手
				otetuki=Math.floor(Math.random() * 20)
				if (otetuki === 0) {
					setTimeout(function() {
						if (safe) {
							A.src = "../images/hand.png";
							A.style.zIndex = 2;
							setTimeout(function() {
								loser(right)
							},1000);
							gokurosan = false;
							safe = false;
						}
					}, Math.random() * 500);
				}
				// 左の手
				otetuki=Math.floor(Math.random() * 20)
				if (otetuki === 0) {
					setTimeout(function() {
						if (safe) {
							B.src = "../images/hand.png";
							B.style.transform = "rotate(180deg)";
							B.style.zIndex = 2;
							setTimeout(function() {
								loser(left)
							},1000);
							gokurosan = false;
							safe = false;
						}
					}, Math.random() * 500);
				}
				// 奥の手
				otetuki=Math.floor(Math.random() * 20)
				if (otetuki === 0) {
					setTimeout(function() {
						if (safe){
							C.src = "../images/hand.png";
							C.style.transform = "rotate(270deg)";
							C.style.zIndex = 2;
							setTimeout(function() {
								loser(behind)
							},1000);
							gokurosan = false;
							safe = false;
						}
					}, Math.random() * 500);
				}
			}
				

		}, 1100);
	} else {
		cards.src = "../images/playingcards/none.png"
		
	}
}

document.addEventListener("DOMContentLoaded", function() {
	
		
	// 山札を表示する
	setTimeout(function() {
		makeYamafuda();
		yamafuda = cards.querySelectorAll("img");
	},1000);
	//yamafuda = cards.querySelectorAll("img");
	
	// カードを引く
	hiku.addEventListener("click", function() {
		if (cantry) {
			if (teban === 0) {
				drawcard()
	
			} else {
				text.textContent = "焦りは禁物";
			}
	
		} else {
			text.textContent = "焦りは禁物";
		}
	});
	button.addEventListener("click", function() {
		safe = true;
		if (!gokurosan) {
			text.textContent = "焦りは禁物";
			return;
		} else if (battle) {
	
			// 自分の手を出す
			I.src = "../images/myhand.png";
			I.style.transform = "rotate(90deg)";
			I.style.zIndex = jumban;
			if (jumban === 4) {
				setTimeout(function() {
					loser(lose)
				},1000);
			}
			jumban = jumban + 1;
		} else {
			// お手付き
			I.src = "../images/myhand.png";
			I.style.transform = "rotate(90deg)";
			I.style.zIndex = 2;
			setTimeout(function() {
				loser(you)
			},1000);
			gokurosan = false;
			safe = false;
		}
	
	});
	replay.addEventListener("click", function() {
		location.reload();
	});
});

function resizeGame() {
	let gameContainer = document.getElementById("gameContainer");
	let game = document.querySelector(".all");

	let scaleX = window.innerWidth / 1600;
	let scaleY = window.innerHeight / 900;

	let scale = Math.min(scaleX, scaleY);

	game.style.transform = "scale(" + scale + ")";

	gameContainer.style.width = (1600 * scale) + "px";
	gameContainer.style.height = (900 * scale) + "px";

	// 山札の位置を現在の画面に合わせ直す
	if (yamafuda) {
		let deckRect = cards.getBoundingClientRect();

		yamafuda.forEach(function(card, i) {
			if (card.style.visibility !== "hidden") {
				let x = deckRect.left + (i % 27) * 30;
				let y = deckRect.top + Math.floor((i + 1) / 28) * 200;

				card.style.left = x + "px";
				card.style.top = y + "px";
			}
		});
	}
}