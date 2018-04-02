/*
 * Create a list that holds all of your cards
 */

/* const cards = document.getElementsByClassName('card');

const cardsArr = [];

[].forEach.call(cards, function(card) {
	cardsArr.push(card);
	card.setAttribute('class', 'card open show');
});

const shuffledCardsArr = shuffle(cardsArr);


console.log(cards[0]); */

let cardsArr = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "anchor", "leaf", "bicycle", "diamond", "bomb", "leaf", "bomb", "bolt", "bicycle", "paper-plane-o", "cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards(array) {
	let shuffledArr = shuffle(cardsArr);
	cardsArr = shuffledArr;
	const cards = document.getElementsByClassName('card');
	for (let i=0; i<16; i++) {
		// cards[i].setAttribute('class', 'card open show');
		let el = document.createElement('i');
		el.setAttribute('class', 'fa fa-' + shuffledArr[i]);
		cards[i].removeChild(cards[i].children[0]);
		cards[i].appendChild(el);
	}
}

displayCards();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function doMove() {
	move++;
	moveEl = document.querySelector('.moves');
	moveEl.textContent = move;

	if (move >= 16) {
		let thirdStar = document.querySelector('.stars > li:nth-child(3) > i');
		thirdStar.classList.remove('fa-star');
		thirdStar.classList.add('fa-star-o');
	}
	if (move >= 26) {
		let secondStar = document.querySelector('.stars > li:nth-child(2) > i');
		secondStar.classList.remove('fa-star');
		secondStar.classList.add('fa-star-o');
	}
	if (move > 45) {
		let firstStar = document.querySelector('.stars > li:nth-child(1) > i');
		firstStar.classList.remove('fa-star');
		firstStar.classList.add('fa-star-o');
	}
}

function toggleCard(card) {
	card.classList.toggle('show');
	card.classList.toggle('open');
	addOpenCard(card);
	if (openCards.length > 1) {
		if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className) {
			match();
		} else {
			nomatch();
		}
	}
	doMove();
	card.removeEventListener('click', tgl);
}

let tgl = function(e) { toggleCard(e.target.param); };

function clickable() {
	const cards = document.getElementsByClassName('card');
	for (let i=0; i<16; i++) {
		cards[i].addEventListener('click', tgl);
		cards[i].param = cards[i];
	}
}
clickable();

let openCards = [];

function addOpenCard(card) {
	openCards.push(card);
	console.log(openCards);
	/* 
	if (card.firstElementChild.className == "fa fa-bicycle") {
		console.log("that's a bicycle");
	} */
}

var move = 0;
var pairs = 0;

function match() {
	openCards[0].setAttribute('class', 'card match');
	openCards[1].setAttribute('class', 'card match');
	console.log("It's a match.");
	openCards = [];
	pairs++;
	won();
}

function handler(e) { // prevent clicking while cards turn
	e.stopPropagation();
	e.preventDefault();
}

function hideCards() {
	openCards[0].classList.remove('show');
	openCards[0].classList.remove('open');
	openCards[0].addEventListener('click', tgl);
	openCards[1].classList.remove('show');
	openCards[1].classList.remove('open');
	openCards[1].addEventListener('click', tgl);
	openCards = [];
	document.removeEventListener('click', handler, true);
}

function nomatch() {
	document.addEventListener('click', handler, true);
	console.log("Not a match. Keep trying.");
	window.setTimeout(hideCards, 1000);
}

function won() {
	if (pairs >= 8) {
		console.log("You did it!");
		console.log("Your final score is: " + move + " moves.");
	}
}

function reload() {
	location.reload();
}

document.querySelector(".restart").addEventListener('click', reload);










