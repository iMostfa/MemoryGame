import { MemoryGame } from './modules/gameEngine.js';

var scene;
var memoryGame;

var cards = [];
var matchedCards = [];
var cardViews = [];

var movesText = document.querySelector(".moves");

window.onload = onWindowLoad

function onWindowLoad() {
    Swal.fire({
        title: 'Eneter the number of pairs, max is 8',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Start',
        showLoaderOnConfirm: true,
        preConfirm: (number) => {
            console.log(number);
            if (!(number > 0 && number <= 8)) {
                Swal.showValidationMessage(
                    `The number should be between 1 to 8`
                )
            }

        },
        allowOutsideClick: () => false,
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            console.log(result);
            //TODO: handle if the user didn't enter a number
            startGame(result.value);
        }
    })
}

function startGame(number) {
    memoryGame = new MemoryGame(number, "");

    memoryGame.start();

    document.getElementById("container").style.visibility = "visible";

    var parentContainer = document.getElementById("parentContainer");

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

function endGame() {
    Swal.fire({
        icon: 'success',
        title: 'Congratulation',
        text: 'Your Score : ' + movesText.textContent,
        showCancelButton: false,
        confirmButtonText: 'Restart',
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("trying to restart")
            document.getElementById("parentContainer").innerHTML = ""
            cards = [];
            matchedCards = [];
            cardViews = [];
            movesText.innerHTML = `${0} Move(s)`
            document.getElementById("container").style.visibility = "hidden";

            onWindowLoad()
        }
    })
}

//toggles open and show class to display cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//add opened cards to OpenedCards list and check if cards are match or not
var openCard = function() {
    memoryGame.select(this.id, matched, unmatched) //this refrences for for the caller of the function, which is HTML card?!
};

var matched = function(openCards, moves) {

    setTimeout(function() {
        movesText.innerHTML = `${moves} Move(s)`

        openCards.forEach((cardIndex) => {
            cardViews[cardIndex].classList.add("match", "disabled");
            cardViews[cardIndex].classList.remove("show", "open", "no-event");
            matchedCards.push(cardViews)
        })

        if (matchedCards.length == cardViews.length) {
            endGame()
        }
    }, 700);

};


var unmatched = function(openCards, moves) {

    setTimeout(function() {
        movesText.innerHTML = `${moves} Move(s)`

        openCards.forEach((cardIndex) => {
            cardViews[cardIndex].classList.add("unmatched");
        })
        disable();
        setTimeout(function() {
            openCards.forEach((cardIndex) => {
                cardViews[cardIndex].classList.remove("show", "open", "no-event", "unmatched");
            })
            enable();
        }, 1000);

    }, 700);

}


var disable = function() {
    cards.forEach((card) => {
        card.classList.add('disabled');
    })
}

var enable = function() {
    cards.forEach((card) => {
        card.classList.remove('disabled');
    });

    for (var i = 0; i < matchedCards.length; i++) {
        matchedCards[i].classList.add("disabled");
    }
}