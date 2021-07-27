const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let letter;
let numbersArray = [];
let childName;

const gameBox = document.querySelector('#game-box');
const winnerBox = document.querySelector('#winner-box');
const guessAgain = document.querySelector('#guess-again');
const repeatButton = document.querySelector('#repeat');
const restartButton = document.querySelector('#restart');
const singButton = document.querySelector('#sing');

// class Game {
//     constructor(length, playerName) {
//         this.length = this.length;
//         this.playerName = this.playerName;

//     }
// }

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function interval() {
    if(i < alphabetArray.length) {
        document.querySelector(`#${alphabetArray[i]}`).classList.add('start');
        i++;
    } else {
        i = 0;
    };
};

function start() {
    setInterval(interval , 100);
    alphabetArray.forEach(e => {
        document.querySelector(`#${e}`).classList.remove('start');
        document.querySelector(`#${e}`).style.visibility = 'visible';
    });
};

function wrongGuess() {
    guessAgain.style.visibility = "visible";
    setTimeout( () => {
        guessAgain.style.visibility = "hidden";
    }, 800)
};

function voice(toSpeech) { // TODO: check that the input is a string
    let msg = new SpeechSynthesisUtterance();
    msg.text = toSpeech;
    window.speechSynthesis.speak(msg);
};

function delayVoice() {
    setTimeout( () => {
        let msg = new SpeechSynthesisUtterance();
        let randAlphabetPosition = getRndInteger(0, alphabetArray.length);
        msg.text = alphabetArray[randAlphabetPosition];
        letter = alphabetArray[randAlphabetPosition];
        window.speechSynthesis.speak(msg);
    }, 3000);
};

function repeatLetter() {
    voice(letter);
};

function restartGame() {
    letter = null;
    start();
    winnerBox.style.visibility = 'hidden';
}

function createNumberArray(maxNum) {
    for(i = 1; i <= maxNum; i++) {
        numbersArray.push(i);
    };
};

function startNumberGame() {
    let numbers = numbersArray.map(el => `<div class="letter" id="${el}">${el}</div>`).join('');
    gameBox.innerHTML = `${numbers}`;
};

document.addEventListener('DOMContentLoaded', () => {
    start();
    delayVoice();
});

gameBox.addEventListener('click', e => {
    let wrongGuessesArray = [
        'You silly goose',
        'Try again stinky',
        'Keep going',
        `That's not a ${letter}`,
        'Better luck next time',
        'Cheeky boom boom',
        'You can do better'
    ];
    if(e.target.id == letter) {
        winnerBox.style.visibility = 'visible';
        voice('Correct');
    } else {
        let getRandVoiceLine = wrongGuessesArray[getRndInteger(0, wrongGuessesArray.length)];
        voice(getRandVoiceLine);
        wrongGuess();
    }
    e.target.classList.add('selection');
    setTimeout( () => {
        e.target.style.visibility = "hidden"; // TODO: if you target the #game-box div, than everything disappears. needs fix.
    }, 1000)
});

repeatButton.addEventListener('click', () => {
    repeatLetter();
});

restartButton.addEventListener('click', () => {
    restartGame();
    delayVoice();
});

singButton.addEventListener('click', () => { //Doesn't sync with voice at all
    alphabetArray.forEach(e => {
        document.querySelector(`#${e}`).classList.add('start');
        voice(e);
        document.querySelector(`#${e}`).classList.remove('start');
    })
})

let alphabet = alphabetArray.map(el => `<div class="letter" id="${el}">${el.toUpperCase()}</div>`).join('');
gameBox.innerHTML = `${alphabet}`;

