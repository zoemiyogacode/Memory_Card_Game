/*
 * Variables
 */

 let card = document.getElementsByClassName("card");
 let cards = [...card];
 let deck = document.querySelector(".deck");
 let shuffledCards = [];
 let openedCards = [];
 let moves = 0;

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /*
 * Event listener Loop
 * @description Listens for clicks on the cards
 */

for (let i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener('click', displayCard, openCard);
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
		if(openedCards[0] === openedCards[1]) {
			matched();
		} else {
			unmatched();
		}
	}
};

 /*
 * @description Move the counter
 */

 function moveCounter() {
 	moves++
 }