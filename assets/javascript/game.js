var wordStore = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "astroid", "galaxy", "andromeda", "moon", "hubble", "star", "universe"];
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
targetDiv.textContent = maxTries;

var targetDiv = document.getElementById("exhausted");
targetDiv.textContent = numberofTries;

var targetDiv = document.getElementById("pending");
targetDiv.textContent = maxTries - numberofTries;

var actualWord = wordStore[Math.floor(Math.random() * wordStore.length)];
console.log("Actual word : " + actualWord);

function insertGuessChar(word, pos, ch) {
    console.log("First part " + word.slice(0, pos) + "Second part " + ch + "Third Part " + word.slice(pos + 1));
    return word.slice(0, pos) + ch + word.slice(pos + 1);
}

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



for (i = 0; i < actualWord.length * 2; i += 2) {
    screenWord = insertGuessChar(screenWord, i, '-');
}

userText.textContent = screenWord;

for (i = 0; i < actualWord.length; i++) {
    guessWord = insertGuessChar(guessWord, i, '-');
}


// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {
    keyTyped = event.key;
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

    var resultText = document.getElementById("result-text");
    if (wordFound) {
        resultText.textContent = "Awesome !!!, you did it";
    } else if (numberofTries === maxTries) { 
        resultText.textContent = "The actual word is " + actualWord + ". Better luck next time";
    }
        





};
