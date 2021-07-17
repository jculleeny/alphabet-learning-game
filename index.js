const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let letter;

const gameBox = document.querySelector('#game-box');
const winnerBox = document.querySelector('#winner-box');
const guessAgain = document.querySelector('#guess-again');


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
    let i = 0;
    setInterval(interval , 100);
    alphabetArray.forEach(e => {
        document.querySelector(`#${e}`).classList.remove('start');
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

let alphabet = alphabetArray.map(el => `<div class="letter" id="${el}">${el.toUpperCase()}</div>`).join('');
gameBox.innerHTML = `${alphabet}`;
