export class GuessingGame {
    constructor (maxNumber) {
        this.newGame(maxNumber);
    }
    
    get max() {
        return this.maxNum;
    }
            
    get guessLimit() {
        return this.maxGuesses;
    };
    
    get userHistory() {
        return this.userGuesses;
    }
    
    newGame(maxNumber) {
        this.maxNum = maxNumber;
        this.maxGuesses = Math.ceil(Math.log2(maxNumber));
        this.userGuesses = [];
        this.guesses = [];

        this.secretNum = Math.ceil(Math.random() * maxNumber);
        
        this.guessMin = 1;
        this.guessMax = maxNumber;
    };
    
    madeGuess(guess) {
        if (guess === undefined || guess === "") {
            return;
        }

        guess = parseInt(guess);
        
        if (guess < 1) {
            guess = 1;
        }
        else if (guess > this.maxNum) {
            guess = this.maxNum;
        }
        
        let rval = "";
        let repeat = false;
        
        
        if (this.secretNum > guess) {
            rval = "HIGHER";
        }
        else if (this.secretNum < guess) {
            rval = "LOWER";
        }
        else {
            rval = "GOT IT!";
        }
        
        // If the user has not already guessed this number, add it to the list
        if (this.userGuesses.find(x => x.val === guess) === undefined) {            
            this.userGuesses.push({val: guess, prompt: rval});
        }
        
        return rval;
    };
    
    makeGuess() {
        if (this.guessMin > this.guessMax) {
            return -1;
        }
        
        this.guess = Math.floor((this.guessMax - this.guessMin) / 2);
        
        return this.guess;
    }
    
    get guessHistory() {
        return this.guesses;
    }
    
    guessHigher() {
        this.guessMin = this.guess + 1;
        
        return this.makeGuess();
    }
    
    guessLower() {
        this.guessMax = this.guess - 1;
        
        return this.makeGuess();
    }
}

export function updateDisplay(val, disp) {
    $(disp).text(val); 
}