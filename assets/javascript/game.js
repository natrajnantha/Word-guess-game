// Declare the wordstore database in the Array. The game will generate a random number between the size of the array and will 
// use the random word as a secret word for the user to guess. This is an double dimention array that would also store a hint for
// the corresponding word in the second dimention indices. The hint will be displayed when the user clicks the hint button. 
// This is a astronomy theamed hangman game, so the astronomy words and hints will make sense for this game. 
var wordStore = [
    ['mercury', 'planet'],
    ['venus', 'planet'],
    ['earth', 'A planet'],
    ['mars', 'planet'],
    ['saturn', 'planet'],
    ['uranus', 'planet'],
    ['neptune', 'planet'],
    ['pluto', 'planet'],
    ['jupiter', 'planet'],
    ['sun', 'A star'],
    ['astroid', 'rocks that forms the belt'],
    ['comet', 'flying rocks that produce tail'],
    ['moon', 'orbits around a planet'],
    ['star', 'planets usually orbits around this'],
    ['universe', 'billions of galaxies'],
    ['hubble', 'space telescope'],
    ['andromeda', 'Its a galaxy']];

// This array stores all the allowed alphabets. Further down in the logic this array will be used to traverse thru to match the user key 
var alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var userText = document.getElementById("user-text");
var screenWord = "                                                ";
var guessWord = "";
var maxTries = 11;
var numberofTries = 0;
var wordFound = false;
var keyTyped = '';
var i = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
var targetDiv = document.getElementById("totalTries");
var randomWordIndex = 0;
var actualWord = '';
var wordHint = '';
var resultText = document.getElementById("result-text");
var resultText = document.getElementById("result-text");
var playAgainBtn = document.getElementById("playBtn");


//This function accepts 3 arguments - A word, position and a character. The character will get inserted into the word in the nth position 
//thats passed as the parameter and the resulting word is returned.
function insertGuessChar(word, pos, ch) {
    return word.slice(0, pos) + ch + word.slice(pos + 1);
}

function initializePlay() {
    screenWord = "                                                ";
    guessWord = "";
    maxTries = 11;
    numberofTries = 0;
    wordFound = false;
    keyTyped = '';
    i = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    targetDiv = document.getElementById("totalTries");
    targetDiv.textContent = maxTries;
    
    targetDiv = document.getElementById("exhausted");
    targetDiv.textContent = numberofTries;
    
    targetDiv = document.getElementById("pending");
    targetDiv.textContent = maxTries - numberofTries;
    
    randomWordIndex = Math.floor(Math.random() * wordStore.length);
    actualWord = wordStore[randomWordIndex][0];
    wordHint = wordStore[randomWordIndex][1];
    resultText = document.getElementById("result-text");
    resultText.textContent = '';

    console.log("Actual word : " + actualWord);
    
    for (i = 0; i < actualWord.length * 2; i += 2) {
        screenWord = insertGuessChar(screenWord, i, '-');
    }
    
    userText.textContent = screenWord;
    
    for (i = 0; i < actualWord.length; i++) {
        guessWord = insertGuessChar(guessWord, i, '-');
    }

    for (i = 0; i < alphabets.length; i++) {
            targetDiv = document.getElementById(alphabets[i]);
            targetDiv.setAttribute("class", "keyTryStyle");
            targetDiv.innerHTML = alphabets[i];
        }
    
    playAgainBtn.setAttribute("class","btn btn-dark d-none");
}

initializePlay();

function drawHangMan(triesUp) {
    switch (triesUp) {
        case 1:
            // Bottom line
            ctx.moveTo(20, 190);
            ctx.lineTo(150, 190);
            ctx.strokeStyle = '#ff0000';
            ctx.stroke();
            break;
        case 2:
            // Left pole line
            ctx.moveTo(20, 20);
            ctx.lineTo(20, 190);
            ctx.stroke();
            break;

        case 3:
            // Top line
            ctx.moveTo(20, 20);
            ctx.lineTo(100, 20);
            ctx.stroke();
            break;

        case 4:
            // Pole Support line
            ctx.moveTo(20, 60);
            ctx.lineTo(60, 20);
            ctx.stroke();
            break;

        case 5:
            // rope line
            ctx.moveTo(100, 20);
            ctx.lineTo(100, 50);
            ctx.stroke();
            break;

        case 6:
            // Head arc
            ctx.beginPath();
            ctx.arc(100, 50, 20, 0, 2 * Math.PI);
            ctx.stroke();
            break;

        case 7:
            // body line
            ctx.moveTo(100, 70);
            ctx.lineTo(100, 150);
            ctx.stroke();
            break;

        case 8:
            // left hand line
            ctx.moveTo(100, 80);
            ctx.lineTo(80, 120);
            ctx.stroke();
            break;

        case 9:
            // right hand line
            ctx.moveTo(100, 80);
            ctx.lineTo(120, 120);
            ctx.stroke();
            break;

        case 10:
            // left leg line
            ctx.moveTo(100, 150);
            ctx.lineTo(80, 170);
            ctx.stroke();
            break;

        case 11:
            // right leg line
            ctx.moveTo(100, 150);
            ctx.lineTo(120, 170);
            ctx.stroke();
            break;
        default:
            break;
    }
}


document.getElementById("playBtn").onclick = function() {
    initializePlay();
}

document.getElementById("hintBtn").onclick = function() {
    resultText.textContent = "Hint : " + wordHint;
}


// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {
    keyTyped = event.key.toLowerCase();
    var matchFound = false;
    if (wordFound || numberofTries >= maxTries) {
        alert("Refresh page");
    } else {

        for (let index = 0; index < actualWord.length; index++) {
            if (actualWord[index] === keyTyped && guessWord[index] !== keyTyped) {
                guessWord = insertGuessChar(guessWord, index, keyTyped);
                matchFound = true;
            }
        }
        if (guessWord === actualWord) {
            wordFound = true;

        }
        if (!matchFound) {
            numberofTries++;
        }


        var j = 0;
        screenWord = "                                                ";
        for (i = 0; i < actualWord.length * 2; i += 2) {
            screenWord = insertGuessChar(screenWord, i, guessWord[j]);
            j++;
        }
        userText.textContent = screenWord;
    }

    var targetDiv = document.getElementById("exhausted");
    targetDiv.textContent = numberofTries;

    var targetDiv = document.getElementById("pending");
    targetDiv.textContent = maxTries - numberofTries;

    for (let index = 0; index < alphabets.length; index++) {
        if (alphabets[index] === keyTyped.toUpperCase()) {
            var targetDiv = document.getElementById(alphabets[index]);
            if (matchFound) {
                targetDiv.setAttribute("class", "strikeGood");
            } else {
                targetDiv.setAttribute("class", "strikeDanger");
                drawHangMan(numberofTries);
            }
            targetDiv.innerHTML = alphabets[index];
        }
    }

    
    if (wordFound) {
        resultText.textContent = "Awesome !!!, you did it";
        playAgainBtn.setAttribute("class","btn btn-dark d-block");
    } else if (numberofTries === maxTries) { 
        resultText.textContent = "The actual word is " + actualWord;
        playAgainBtn.setAttribute("class","btn btn-dark d-block");
    }

};
