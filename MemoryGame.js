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
        setInitialState(this.options)
    }

     setInitialState(withArray) { 
        this.totalOpend = 0  ; /* total opened cards which are not solved */
        this.currentlySelected = []
        this.cardElements = []
        this.actions = []
    
        this.state = withArray.map ( (emoji, index) => {
            //TODO: we should have an id to keep track of things ??
            return { name: emoji, isFlipped: false, index: index, markedCorrectly: false}
        })
        
    }

    select(cardIndex,withState, matchedCorrectlyCallback, notMatchedCallback) { 
        this.state[cardIndex].isFlipped = !withState
        this.currentlySelected.push(cardIndex)

        if (this.currentlySelected.length == 2) { 
            var firstSelectedIndex = currentlySelected[0]
            var secondSelectedIndex = currentlySelected[1]

            var firstSelectedCard = cardElements[firstSelectedIndex]
            var secondSelectedCard = cardElements[secondSelectedIndex]

            if (firstSelectedCard.textContent == secondSelectedCard.textContent) { 
                matchedCorrectlyCallback()
                this.currentlySelected = []
            }else { 
                console.log("wrong options, selected two cards again")
                notMatchedCallback()
                this.currentlySelected= []
            } 
            
        }
    }
}

exports.MemoryGame = MemoryGame

// Extentions


function shffledData(array) { 
    // TODO: we need to review this https://stackoverflow.com/a/46545530/5253913

return array
.map((a) => ({sort: Math.random(), value: a}))
.sort((a, b) => a.sort - b.sort)
.map((a) => a.value)

}

