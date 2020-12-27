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
        
        listenToClicks(card, scene, index);
        parentContainer.appendChild(scene);
    }); 
}

function listenToClicks(card, inScene, atIndex) { 
    scene = inScene 
    scene.addEventListener( 'click', function() {
        flip(card, atIndex)
          });
}
function flip(card, atIndex) { 
    var index = atIndex;
    updatedState = card.classList.toggle('is-flipped');
    updateState(updatedState,index);

}
function updateState(newState, atIndex) {
    console.log("there's a card is being flipped for index")
    var s = newState + " " + atIndex
    console.log(s)
}
function setInitialState(withArray) { 
    this.state = withArray.map ( (emoji, index) => {
        //TODO: we should have an id to keep track of things ??
        return { name: emoji, isFlipped: false, index: index, markedCorrectly: true}
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
