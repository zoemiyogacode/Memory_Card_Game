/*
 * Variables
 */

 let card = document.getElementsByClassName("card");
 let cards = [...card];
 let deck = document.querySelector(".deck");
 let shuffledCards = [];
 let openedCards = [];
 let moves = 0;
 let movesTracker = document.querySelector(".moves");
 let matchedCards = [];
 let clock = document.querySelector(".clock");
 let min = 0;
 let sec = 0;
 let interval;

 /*
 * @description Start the game function
 * @returns {array} Displays the cards randomly on the page
 */

 function startGame() { 
 	shuffledCards = shuffle(cards);
 	 for (let i = 0; i < cards.length; i++) {
 	 	deck.innerHTML = "";
 	 	shuffledCards.forEach(function(card) {
 	 		deck.appendChild(card);
 	 	})};
}

 /*
 * @description Start the game
 */
startGame();

 /*
 * @description Predefined Shuffle function from http://stackoverflow.com/a/2450976
 */
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

 /*
 * Event listener Loop
 * @description Listens for clicks on the cards
 */

for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', displayCard);
	card.addEventListener('click', openCard);
}

/*
 * @description Display the card
 */

function displayCard() {
	this.classList.toggle('open');
	this.classList.toggle('show');
}

 /*
 * @description Add card to opened cards, move the counter and check if the cards match
 */

function openCard() {
	openedCards.push(this);	
	if(openedCards.length === 2) {
		moveCounter();
		checkCards();
	}
}

 /*
 * @description Move the counter func
 */

 function moveCounter() {
 	moves++
 	movesTracker.innerHTML = moves;
 	if(moves === 1) {
 		startClock();
 	}
 }

/*
 * @description Check if clicked card is not the same and match if has the same symbol
 */

 function checkCards() {
	let cardItem1 = openedCards[0].getElementsByTagName('i')[0];
	let cardItem2 = openedCards[1].getElementsByTagName('i')[0];
	let notSameCard = openedCards[0].getAttribute('id') !== openedCards[1].getAttribute('id');
	let sameSymbol = cardItem1.getAttribute('class') === cardItem2.getAttribute('class');
	if (notSameCard && sameSymbol) {
	matched();
	} else unmatched();
}

/*
 * @description Match the cards
 */

function matched() {
	 openedCards[0].classList.add('match', 'locked');
	 openedCards[1].classList.add('match', 'locked');
	 openedCards[0].classList.remove('show', 'open');
	 openedCards[1].classList.remove('show', 'open');
	 matchedCards.push(openedCards[0], openedCards[1]);
	 openedCards = [];
}

/*
 * @description Unmatch cards and flip them back again
 */

 function unmatched() {
 	lock();
 	setTimeout(function() {
 		openedCards[0].classList.remove('show', 'open');
 		openedCards[1].classList.remove('show', 'open');
 		openedCards = [];
 		unlock();
	},600);
}

/*
 * @description Locking cards from responding to clicks
 */

 function lock() {
 	Array.prototype.filter.call(cards, function(card) {
 		card.classList.add('locked');
    });
 }

/*
 * @description Unlocking not matched cards
 */

function unlock() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove('locked');
		for(var i = 0; i < matchedCards.length; i++){
			matchedCards[i].classList.add("locked");
		}
	});
}
 	

/*
 * @description Start counting the time 
 */

function startClock() {
 interval = setInterval(function() {
 	clock.innerHTML = "in: " + min + "min " + sec + "sec";
 	sec++;
 	if(sec === 60) {
 		min++
 		sec = 0;
 	} else if(min === 60){
 		min = 0;
 		sec = 0;
 	} 
 }, 1000);
}