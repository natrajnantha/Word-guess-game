# Word-guess-game
Hangman

ASTRO H A N G M A N Game
************************

This game is a word guessing game with the theame of Astronomy. All the words and hints used are based on Astronomy. 
The code maintains an internal database of the Astronomy words. The game logic generates random words and challenges the user to guess the word.
The game has 2 main jumbotron panels - 
1. Guess panel - This is where the user key is captured and the progress made on the guess word is displayed. This panel also animates a hangman when a non matching key is pressed
2. Stats panel - This panel displays the Total number of tries, number of tries completed and number of tries pending. Also the panel shows all the alphabets and 
                 strikes out the alphabet that has been used already. If the tried alphabet matches to any letter in the guess word, then the alphabet is struck in 
                 green font, else in red font. If the user presses the same alphabet, it will still reduce the number of tries indicating that the user has wasted a 
                 key. 

The Stats panel also shows a hint button, clicking which the hint will be displayed in the footer area. 
The footer area also displays if the player has won or lost. 
Win event, lose event and hint button click all plays a sound. 
Win or Loose will also show the "New Game" button on the navigation bar. When the user clicks the New game, the game will be initialized and the New game button will become invisible again.


Notes on pending enhancements - 
1. Currently there is no logic to suppress a word that has been already used in the game. In future i intend to inculde this logic
2. Fixing the footer display - If the hint is a large string, the footer currently wraps the hint message. I intended to fix it, but submitting as is for now since its a cosmetic.
3. To Enhance the code to dynamically animate the hangman. Currently the code uses static coordinates and correspondes to 11 steps only to match the 11 tries. 
4. Hook to a database after later sessions to get the words and hints database built dynamically