        var wordStore = ["simple","complex","gentle","mountain","building","programming","hangman"];
        var alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        
        var userText = document.getElementById("user-text");
        var screenWord = "                                                ";
        var guessWord = "";
        var maxTries = 25;
        var numberofTries = 0;
        var wordFound = false;
        var keyTyped = '';
        var i = 0;

        var targetDiv = document.getElementById("totalTries");
        targetDiv.textContent = maxTries;

        var targetDiv = document.getElementById("exhausted");
        targetDiv.textContent = numberofTries;

        var targetDiv = document.getElementById("pending");
        targetDiv.textContent = maxTries - numberofTries;

        var actualWord = wordStore[Math.floor(Math.random() * wordStore.length)];
        console.log("Actual word : " + actualWord);

        function insertGuessChar(word,pos,ch) {
            console.log("First part " + word.slice(0, pos) + "Second part " + ch + "Third Part " + word.slice(pos+1));
            return word.slice(0, pos) + ch + word.slice(pos+1);
        }
  
        console.log("Screen Word : " + screenWord);
        for (i = 0; i < actualWord.length*2; i+=2) {
            console.log("I = " + i + " Screenword " + screenWord);
            screenWord = insertGuessChar(screenWord,i,'-');
            }
        console.log("Screen Word : " + screenWord);
        
        userText.textContent = screenWord;

        for (i = 0; i < actualWord.length; i++) {
                   guessWord = insertGuessChar(guessWord,i,'-');
            }
        console.log("Guess Word : " + guessWord);


        // Next, we give JavaScript a function to execute when onkeyup event fires.
        document.onkeyup = function(event) {
        //   userText.textContent = event.key;
        keyTyped = event.key;
        if (wordFound || numberofTries >= maxTries) {
            alert ("Refresh page");
        } else {

            for (let index = 0; index < actualWord.length; index++) {
                if (actualWord[index] === keyTyped && guessWord[index] !== keyTyped) {
                    console.log("assigning ")
                   guessWord = insertGuessChar(guessWord,index,keyTyped);
                } 
                console.log("Index " + index + " Actual word letter : " + actualWord[index] + " Guess word letter : " + guessWord[index]);
            }
            console.log("Number of tries : " + numberofTries + " KEY Pressed " + keyTyped);
            console.log("Actual word : " + actualWord + "Guess word so far : " + guessWord);
            if (guessWord === actualWord) {
                console.log("Word found!!!");
                wordFound = true;

            }
            numberofTries++;

            var j = 0;
            screenWord = "                                                ";
            for (i = 0; i < actualWord.length*2; i+=2) {
                   console.log("I = " + i + " J : " + j);
                   screenWord = insertGuessChar(screenWord,i,guessWord[j]);
                   j++;
                   console.log("Screenword after : " + i + " " + screenWord);
            }
           userText.textContent = screenWord;
        }
        var targetDiv = document.getElementById("exhausted");
        targetDiv.textContent = numberofTries;

        var targetDiv = document.getElementById("pending");
        targetDiv.textContent = maxTries - numberofTries;

        for (let index = 0; index < alphabets.length; index++) {
            console.log("Alpha : " + alphabets[index] +  " upperKey : " + keyTyped.toUpperCase())
            if (alphabets[index] === keyTyped.toUpperCase()) {
                var targetDiv = document.getElementById(alphabets[index]);
                targetDiv.setAttribute("class", "strike");
                targetDiv.innerHTML = alphabets[index];
            }
        }




    };
