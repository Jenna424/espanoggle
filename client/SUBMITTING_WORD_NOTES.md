When the "ENVIAR" submit button is clicked, I should do the following:
check if the word is valid (using functions that I defined in BoggleGame.js)
If the word is valid, add the word to the palabrasFormadas object,
(which is stored in BoggleGame container class component's local state).
Each key in this object is a valid string Spanish word,
and its corresponding value is the number of points awarded for that particular word 
(number of characters in the word - 2).
I should also append the word and its numeric value to the list of played words that are displayed on the page.
If the word is not valid, maybe I'll use a Modal/HOC to display an error message.