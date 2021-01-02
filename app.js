import { MemoryGame } from './modules/gameEnigne.js';

var scene;
var memoryGame;
var openedCards = [];
var cards = [];
var matchedCards = [];


window.onload = onWindowLoad

function onWindowLoad() {
    memoryGame = new MemoryGame(4, "");

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
            card.textContent = String.fromCodePoint(cardData);
            cards.push(card);

            card.addEventListener("click", displayCard);
            card.addEventListener("click", cardOpen);

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
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    console.log(len)
    if (len === 2) {
        if (openedCards[0].textContent === openedCards[1].textContent) {
            matched();
        } else {
            unmatched();
        }
    }
};

function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        openedCards = [];
        enable();
    }, 1000);
}


function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add("disabled");
        }
    });
}