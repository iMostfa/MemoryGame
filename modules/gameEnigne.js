class MemoryGame {

    constructor(numberOfPairs, cardsType) {
        this.numberOfPairs = numberOfPairs
        this.cardsType = cardsType // will support other types later 
        this.options = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355];
        this.options = this.options.concat(this.options)
        this.options = shffledData(this.options)
    }


    start() {
        this.setInitialState(this.options);
        console.log("i'm working");
    }

    setInitialState(withArray) {
        this.totalOpend = 0; /* total opened cards which are not solved */
        this.currentlySelected = []
        this.currentlySelectedTitle = []
        this.cardElements = []
        this.actions = []

        this.state = withArray.map((emoji, index) => {
            //TODO: we should have an id to keep track of things ??
            return { name: emoji, index: index, markedCorrectly: false }
        })

    }

    select(cardTitle, cardIndex, matchedCorrectlyCallback, notMatchedCallback) {
        //this.state[cardIndex].isFlipped = !withState
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
            } else {
                notMatchedCallback(this.currentlySelected[0], this.currentlySelected[1])
                this.currentlySelected = []
                this.currentlySelectedTitle = []

            }

        }
    }
}


function shffledData(array) {
    return array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

}

export { MemoryGame };