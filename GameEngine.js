

//   export default class MemoryGame { 

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
//         this.setInitialState(this.options);
//         console.log("i'm working");
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


//  function shffledData (array) { 
//     // TODO: we need to review this https://stackoverflow.com/a/46545530/5253913

// return array
// .map((a) => ({sort: Math.random(), value: a}))
// .sort((a, b) => a.sort - b.sort)
// .map((a) => a.value)

// }