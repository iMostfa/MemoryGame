window.onload = onWindowLoad
// import { MemoryGame } from './GameEngine.js';


      class MemoryGame { 

    constructor(numberOfPairs, cardsType) { 
        this.numberOfPairs = numberOfPairs
        this.cardsType = cardsType // will support other types later 
        this.options = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,0x1F354];
        this.options = this.options
        .flatMap( emoji => [emoji, emoji])
        .reduce( function (initialValue, currentEmojiArray) { 
            return initialValue.concat(currentEmojiArray) 
            }, [])
    
        this.options = shffledData(this.options)
}


    start() { 
        this.setInitialState(this.options);
        console.log("i'm working");
    }

     setInitialState(withArray) { 
        this.totalOpend = 0  ; /* total opened cards which are not solved */
        this.currentlySelected = []
        this.currentlySelectedTitle = []
        this.cardElements = []
        this.actions = []
    
        this.state = withArray.map ( (emoji, index) => {
            //TODO: we should have an id to keep track of things ??
            return { name: emoji, isFlipped: false, index: index, markedCorrectly: false}
        })
        
    }

    select(cardTitle, cardIndex,withState, matchedCorrectlyCallback, notMatchedCallback) { 
        this.state[cardIndex].isFlipped = !withState
        console.log("card index " + cardIndex)
        this.currentlySelected.push(cardIndex)
        console.log(cardTitle)
        this.currentlySelectedTitle.push(cardTitle)


        if (this.currentlySelected.length == 2) { 
            
            var firstSelectedCard = this.currentlySelectedTitle[0]
            var secondSelectedCard = this.currentlySelectedTitle[1]

            if (firstSelectedCard == secondSelectedCard) { 
                console.log(this.currentlySelected)
                matchedCorrectlyCallback(this.currentlySelected[0], this.currentlySelected[1])
                this.currentlySelected = []
                this.currentlySelectedTitle = []
            }else { 
                 notMatchedCallback(this.currentlySelected[0], this.currentlySelected[1])
                this.currentlySelected= []
                this.currentlySelectedTitle = []

            } 
            
        }
    }
}


// Extentions


 function shffledData (array) { 
    // TODO: we need to review this https://stackoverflow.com/a/46545530/5253913

return array
.map((a) => ({sort: Math.random(), value: a}))
.sort((a, b) => a.sort - b.sort)
.map((a) => a.value)

}

function onWindowLoad() { 
    var memoryGame = new MemoryGame(4, "")

    this.memoryGame = memoryGame
    this.memoryGame.start()
    this.cardElements = []
    this.sceneElements = []
    this.actions = [ ]
    
    cardData = memoryGame.options;
    // shuffledCards = shffledData(cardData) ; 
    // setInitialState(shuffledCards) ; 

    parentContainer = document.getElementById("parentContainer") ; 

    this.memoryGame.options
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
        this.sceneElements.push(scene)

        listenToClicks(card, scene, index);
        parentContainer.appendChild(scene);
    }); 
}

function listenToClicks(card, inScene, atIndex) { 
    scene = inScene ;
    onClickAction = function onClick() {
        flip(card, atIndex, true)
          }

        this.actions.push(onClickAction)

    scene.addEventListener( 'click', onClickAction);
}
function flip(card, atIndex, thenUpdate) { 
    var index = atIndex;
    var card_ = this.cardElements[index]
    updatedState = card_.classList.toggle('is-flipped');

    

    // TODO: there must be a better way ?
    setTimeout(function (){
        if (thenUpdate) {
            updateState(updatedState,index, card);
            }
              
      }, 1000); 
  
}

//TODO: clean not needed work
function updateState(newState, atIndex, inCard) {
    // select(cardTitle, cardIndex,withState, matchedCorrectlyCallback, notMatchedCallback) { 

    this.memoryGame.select(inCard.textContent,
        atIndex,
        newState,
        (firstIndex, secondIndex) => {
            console.log("right cards!!")
            console.log(firstIndex, secondIndex)
    
        var firstSelectedIndex = firstIndex
        var secondSelectedIndex = secondIndex
        var firstSelectedCard = sceneElements[firstIndex]
        var secondSelectedCard = sceneElements[secondIndex]
            console.log(this.actions[firstSelectedIndex])
        
        // //TODO: to be able to remove a function from event listner we have to a get a refrance for it, which is weried ?
        firstSelectedCard.removeEventListener('click', this.actions[firstSelectedIndex], false);
        secondSelectedCard.removeEventListener('click', this.actions[secondSelectedIndex], false);
        console.log(firstSelectedCard)
        console.log(secondSelectedCard)

    },
        (firstIndex, secondIndex) => { 
            console.log("wrong cards!!")
            console.log(firstIndex, secondIndex)
             var card_ = this.cardElements[firstIndex]
            updatedState = card_.classList.toggle('is-flipped');

            var card2_ = this.cardElements[secondIndex]
            updatedState2 = card2_.classList.toggle('is-flipped');
        } 
    ) ; 
    
    // this.state[atIndex].isFlipped = !newState
    // currentlySelected.push(atIndex)

    // //check if the currentlySelected reach 2
    //     //if yes, check if two elements at cardselements equal in text Content, if no, close both of them
    //     if (currentlySelected.length == 2) { 
    //         var firstSelectedIndex = currentlySelected[0]
    //         var secondSelectedIndex = currentlySelected[1]

    //         var firstSelectedCard = cardElements[firstSelectedIndex]
    //         var secondSelectedCard = cardElements[secondSelectedIndex]

    //         if (firstSelectedCard.textContent == secondSelectedCard.textContent) { 
    //             console.log("wow match")
                
    //             //TODO: to be able to remove a function from event listner we have to a get a refrance for it, which is weried ?
    //             firstSelectedCard.removeEventListener('click', this.actions[firstSelectedIndex], false);
    //             firstSelectedCard.removeEventListener('click', this.actions[secondSelectedIndex], false);


    //             this.currentlySelected = []
    //         } else { 
    //             console.log("cleaning")
    //             flip(firstSelectedCard, firstSelectedIndex)
    //             flip(secondSelectedCard, secondSelectedIndex)
    //             this.currentlySelected = []
    //         }
    //     }
    

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





//MARK - GAME MODEL


// class MemoryGame { 

//     constructor(numberOfPairs, cardsType) { 
//         this.numberOfPairs = numberOfPairs
//         this.cardsType = cardsType // will support other types later 
//         this.options = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,0x1F354];
//         this.options = this.options
//         .flatMap( emoji => [emoji, emoji])
//         .reduce( function (initialValue, currentEmojiArray) { 
//             return initialValue.concat(currentEmojiArray) 
//             }, [])
    
//         this.options = shffledData(this.options)
// }


//     start() { 
//         this.setInitialState(this.options)
//     }

//      setInitialState(withArray) { 
//         this.totalOpend = 0  ; /* total opened cards which are not solved */
//         this.currentlySelected = []
//         this.currentlySelectedTitle = []
//         this.cardElements = []
//         this.actions = []
    
//         this.state = withArray.map ( (emoji, index) => {
//             //TODO: we should have an id to keep track of things ??
//             return { name: emoji, isFlipped: false, index: index, markedCorrectly: false}
//         })
        
//     }

//     select(cardTitle, cardIndex,withState, matchedCorrectlyCallback, notMatchedCallback) { 
//         this.state[cardIndex].isFlipped = !withState
//         console.log("card index " + cardIndex)
//         this.currentlySelected.push(cardIndex)
//         console.log(cardTitle)
//         this.currentlySelectedTitle.push(cardTitle)


//         if (this.currentlySelected.length == 2) { 
            
//             var firstSelectedCard = this.currentlySelectedTitle[0]
//             var secondSelectedCard = this.currentlySelectedTitle[1]

//             if (firstSelectedCard == secondSelectedCard) { 
//                 console.log(this.currentlySelected)
//                 matchedCorrectlyCallback(this.currentlySelected[0], this.currentlySelected[1])
//                 this.currentlySelected = []
//                 this.currentlySelectedTitle = []
//             }else { 
//                  notMatchedCallback(this.currentlySelected[0], this.currentlySelected[1])
//                 this.currentlySelected= []
//                 this.currentlySelectedTitle = []

//             } 
            
//         }
//     }
// }


// // Extentions


// function shffledData(array) { 
//     // TODO: we need to review this https://stackoverflow.com/a/46545530/5253913

// return array
// .map((a) => ({sort: Math.random(), value: a}))
// .sort((a, b) => a.sort - b.sort)
// .map((a) => a.value)

// }

