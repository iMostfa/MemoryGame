import { MemoryGame } from './modules/gameEngine.js';

var scene;
var memoryGame;

var openedCards = [];
var cards = [];
var matchedCards = [];
var cardViews = []; 


window.onload = onWindowLoad

function onWindowLoad() {
    var number = prompt("Hello, eneter the number of pairs, max is 8")
    //TODO: handle if the user didn't enter a number
    memoryGame = new MemoryGame(number, "");

    memoryGame.start();

    this.cardData = memoryGame.options;
    this.parentContainer = document.getElementById("parentContainer");

    memoryGame.options
        .forEach((cardData, index) => {
            scene = document.createElement("div"); 
            var card = document.createElement("div"); 
            scene.setAttribute("type", "div");
            scene.setAttribute("class", "scene");
            scene.appendChild(card);
            
            card.setAttribute("class", "card");
            card.setAttribute("id", index)
            card.textContent = String.fromCodePoint(cardData);
            cards.push(card);

            card.addEventListener("click", displayCard);
            card.addEventListener("click", openCard);
            cardViews.push(card)
            parentContainer.appendChild(scene);
        });
}


//toggles open and show class to display cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//add opened cards to OpenedCards list and check if cards are match or not
var  openCard = function() {
    memoryGame.select(this.id,matched,unmatched ) //this refrences for for the caller of the function, which is HTML card?!
};

var matched = function(cards) {
    cards.forEach((cardIndex) => { 
      cardViews[cardIndex].classList.add("match", "disabled");
      cardViews[cardIndex].classList.remove("show", "open", "no-event");
    })
    openedCards = [];
};


var unmatched = function(cards) {
    cards.forEach((cardIndex) => { 
       cardViews[cardIndex].classList.add("unmatched");
    })
    disable();
    setTimeout(function() {
        cards.forEach((cardIndex) => { 
         cardViews[cardIndex].classList.remove("show", "open", "no-event", "unmatched");
        })
        enable();
    }, 1000);
}


var disable = function() {
    cards.forEach((card) => { 
        card.classList.add('disabled');
     })

}

var enable = function() {

    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add("disabled");
        }
    });
}
