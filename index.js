const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const gameBox = document.querySelector('#game-box');
const winnerBox = document.querySelector('#winner-box');
const guessAgain = document.querySelector('#guess-again');

let letter;

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
    }, 3000)
}

function delayVoice() {
    setTimeout( () => {
        let msg = new SpeechSynthesisUtterance();
        let randAlphabetPosition = getRndInteger(0, alphabetArray.length);
        msg.text = alphabetArray[randAlphabetPosition];
        letter = alphabetArray[randAlphabetPosition];
        window.speechSynthesis.speak(msg);
    }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {
    start();
    delayVoice();
});

gameBox.addEventListener('click', e => {
    if(e.target.id == letter) {
        winnerBox.style.visibility = 'visible';
        // alert('You win!');
    }
    e.target.classList.add('selection');
    setTimeout( () => {
        e.target.style.visibility = "hidden"; // TODO: if you target the #game-box div, than everything disappears. needs fix.
    }, 1000)
});

let alphabet = alphabetArray.map(el => `<div class="letter" id="${el}">${el.toUpperCase()}</div>`).join('');
gameBox.innerHTML = `${alphabet}`;
