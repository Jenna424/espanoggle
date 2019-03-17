BoggleGame container class component's local state holds the following data, which changes throughout the course of my app:
1). The board: the result of calling buildBoard(), which is an array of arrays. 
The 3 elements of each nested array are JS objects, in which each object contains key/value pairs of data for row number (r), column number (c) and string letter that landed face-up on the die (letterLanded)
2). Submitted words: an array of JS word objects. 
The key in each word object = the actual string word played, and its corresponding value = points earned for that word
3). initialCountdown: 120 seconds
4). status: 'new' upon initialization (can ultimately be 'in progress' or 'over')
5). clickedChars: initialized as an empty array, 
ultimately contains information about which letters on the board the user clicked to try forming a word