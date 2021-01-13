class MemoryGame {

    constructor(numberOfPairs, cardsType) {
        this.numberOfPairs = numberOfPairs
        this.cardsType = cardsType // will support other types later 
        this.options = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355];
        this.options =
            shffledData(this.options)
            .slice(0, numberOfPairs);

        this.options = this.options.concat(this.options)
        this.options = shffledData(this.options)
        this.openedCards = [];
        this.started = false;
        this.moves = 0;
    }

    start() {
        this.setInitialState(this.options);
        this.started = true

    }


    setInitialState(withArray) {
        this.state = withArray.map((emoji, index) => {
            return { name: emoji, index: index, markedCorrectly: false }
        })

    }

    updateState(cardIndex, withState) {
        //TODO user can later use the game using CLI
        if (this.started) {
            this.state[cardIndex].markedCorrectly = withState
        } else {
            console.log("you can't update the state without starting the game")
        }
    }

    select(index, machedCallback, unmatchedCallback) {
        var card = this.state[index]
        this.openedCards.push(card);
        var len = this.openedCards.length;
        if (len === 2) {
            this.moves++;
            if (this.openedCards[0].name == this.openedCards[1].name) {
                machedCallback([this.openedCards[0].index, this.openedCards[1].index], this.moves)
                this.updateState(this.openedCards[0].index, true)
                this.updateState(this.openedCards[1].index, true)
            } else {
                unmatchedCallback([this.openedCards[0].index, this.openedCards[1].index], this.moves)
                this.updateState(this.openedCards[0].index, false);
                this.updateState(this.openedCards[1].index, false);
            }
            this.openedCards = [];
        } else {
            if (len > 2) {
                //TODO: should assert here
            } else {
                console.log("please Select one more card")
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