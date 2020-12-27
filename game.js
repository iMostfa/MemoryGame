window.onload = onWindowLoad()


function onWindowLoad() { 
    cardData = provideCardsData();
    shuffledCards = shffledData(cardData) ; 
    setInitialState(shuffledCards) ; 

    parentContainer = document.getElementById("parentContainer") ; 

    shuffledCards
    .forEach( (cardData) => {
        var element = document.createElement("div");
        element.setAttribute("type", "div");
        element.setAttribute("class", "grid-item")
        element.textContent = cardData
        element.setAttribute("contenteditable", "false")
        parentContainer.appendChild(element)
    }); 
}

function setInitialState(withArray) { 
    this.state = withArray.map ( emoji => {
        //TODO: we should have an id to keep track of things ??
        return { name: emoji, isFlipped: false}
    })
    
}

function provideCardsData() { 

    //TODO: we should provide a better implemntation, with supporting for streams? 
    
    // var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
    //     0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
    //     0x1F431, 0x1F42A, 0x1F439, 0x1F424];
    var emojis = ["m","f","dde"];

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
