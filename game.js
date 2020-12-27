window.onload = onWindowLoad()


function onWindowLoad() { 

    cardData = provideCardsData();
    shuffledCards = shffledData(cardData) ; 
    setInitialState(shuffledCards) ; 

    parentContainer = document.getElementById("parentContainer") ; 

    shuffledCards
    .forEach( (cardData, index) => {
        var scene = document.createElement("div");
        var card = document.createElement("div");

        scene.setAttribute("type", "div");
        scene.setAttribute("class", "scene");
        scene.appendChild(card);

        card.setAttribute("class", "card is-flipped")

        var front = document.createElement("div");
        var back = document.createElement("div");

        front.setAttribute("class", "front cardFace");
        back.setAttribute("class", "back cardFace");
        front.textContent = String.fromCodePoint(cardData);
        back.textContent = "back";
        card.appendChild(front);
        card.appendChild(back);
        
        this.cardElements.push(card)
        listenToClicks(card, scene, index);
        parentContainer.appendChild(scene);
    }); 
}

function listenToClicks(card, inScene, atIndex) { 
    scene = inScene ;
    scene.addEventListener( 'click', function() {
        flip(card, atIndex, true)
          });
}
function flip(card, atIndex, thenUpdate) { 
    var index = atIndex;
    updatedState = card.classList.toggle('is-flipped');

    

    // TODO: there must be a better way ?
    setTimeout(function (){

        if (thenUpdate) {
            updateState(updatedState,index, card);
            }
              
      }, 1000); 
  
}

//TODO: clean not needed work
function updateState(newState, atIndex, inCard) {
 
    this.state[atIndex].isFlipped = !newState
    currentlySelected.push(atIndex)

    //check if the currentlySelected reach 2
        //if yes, check if two elements at cardselements equal in text Content, if no, close both of them
        if (currentlySelected.length == 2) { 
            var firstSelectedIndex = currentlySelected[0]
            var secondSelectedIndex = currentlySelected[1]

            var firstSelectedCard = cardElements[firstSelectedIndex]
            var secondSelectedCard = cardElements[secondSelectedIndex]

            if (firstSelectedCard.textContent == secondSelectedCard.textContent) { 
                console.log("wow match")
                this.currentlySelected = []
            } else { 
                console.log("cleaning")
                flip(firstSelectedCard, firstSelectedIndex)
                flip(secondSelectedCard, secondSelectedIndex)
                this.currentlySelected = []
            }
        }
    

}
function setInitialState(withArray) { 
    this.totalOpend = 0  ; /* total opened cards which are not solved */
    this.currentlySelected = []
    this.cardElements = []

    this.state = withArray.map ( (emoji, index) => {
        //TODO: we should have an id to keep track of things ??
        return { name: emoji, isFlipped: false, index: index, markedCorrectly: false}
    })
    
}

function provideCardsData() { 

    //TODO: we should provide a better implemntation, with supporting for streams? 
    
    var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
        0x1F354];
    // var emojis = ["m","f","dde"];

  return emojis
  .flatMap( emoji => [emoji, emoji])
  .reduce( function (initialValue, currentEmojiArray) { 
    return initialValue.concat(currentEmojiArray) 
  }, [])


}


// Extentions


function shffledData(array) { 
        // TODO: we need to review this https://stackoverflow.com/a/46545530/5253913

    return array
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    
}
