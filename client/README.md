## *¡Españoggle!*

###### *Una adaptación del juego Boggle al estilo español por Jenna Leopold*

So far, I have achieved the following functionality:
* When the page is initially loaded, the user cannot select any cube until the start (INICIO) button has been clicked
* Once the INICIO button is clicked, it is swapped for a timer (hourglass icon) that initiates a countdown from 60 seconds. 
Note to self: the duration of a round of Boggle is typically 3 minutes, so I can eventually change this to 180 seconds (or convert it to minutes so that it's a better user experience)
* Once the countdown begins, the user can click any cube on the Boggle board (since none has been selected yet),
and the instructions ("Haz clic en los cubos...") that were formerly displayed are swapped for the letter corresponding to the clicked cube.
* The letter corresponding to the clicked cube will appear on the screen below the board 
(formation of palabraCreada stored in BoggleBoard local state).
* Once a cube is clicked, other letter cubes cannot be selected *unless* they are contiguous (adjacent horizontally, vertically or diagonally),
or *unless* the cube you want to *deselect* is the immediately preceding cube.
- As new valid cubes are clicked, their corresponding letters are appended to the word being created (palabraCreada).
- I've implemented a "backspace" feature such that you can "erase" letters from the word you're currently forming in the *opposite* order in which the letters were added to the word, e.g., if I initially click contiguous cubes to spell the word "PISTA", but I change my mind and want to deselect the letters that comprise this word, I must click the letter cubes in the *reverse* order in which the letters were appended --
I must first click letter cube A, then T, then S, then I, then P to undo my selection.
* The submit (ENVIAR) button does *not* appear *until* the word being formed (palabraCreada) is *at least* 3 letters in length 
(to guard against submission of an invalid word that's less than 3 characters long)
* Once a word that's a minimum of 3 characters *has* been submitted, it will *only* be appended to the list of played words if the following conditions are met:
1. The word is unique, i.e., NO key/value pair of data for this word exists in the palabrasFormadas object stored in BoggleBoard's local state
1. The letter cubes that comprise the word are *not* duplicated, e.g., if you submit the word "AGUA", it will *not* be considered a valid submission if the cube corresponding to the first letter "A" is the same as that of the last letter "A"
1. Pending API key retrieval, I should check that the word submitted is, in fact, a valid Spanish word. 
Using my custom axios instance, I can make a request to a remote API in componentDidMount() lifecycle method to retrieve a list of valid Spanish words from a dictionary. Then I'll store the array of words retrieved in BoggleBoard's local state object. 
I'll normalize the palabraCreada submitted by the user, e.g., maybe convert the word to all lowercase letters, before comparing the submitted word against the dictionary entries to check if that word exists in the dictionary.
* Once the timer is up, a modal will slide onto the page (superimposed on a backdrop).
* If the user submitted valid words during the round of *Españoggle*, the Modal will:
1. display each word beside its corresponding number of points awarded
1. display the word worth the most points (la jugada mejor)
* Whether or not the user submitted any valid word, the Modal will:
1. present the grand sum of all points (Puntuación Total)
1. display a button to play again and a button to decline another round
* If the user clicks the button to play again (jugar de nuevo), she receives an alert that reads,
"Ready, set, go!" ("Preparado, listo, "¡ya!") and upon clicking OK, 
the letter cubes on the board are shuffled, the timer automatically resets itself, and a new game begins *without* the user having to click the INICIO button
* If the user clicks the button to decline another round, she receives an alert that thanks her for playing and bids her farewell 
(more like a colloquial ¡Chau! than a formal adiós). 
The cubes on the board are shuffled, but the game and timer do *not* automatically restart.
If the user wants to play again, she *must* click the INICIO button.