My Notes for Implementing a Cube-Clicking Feature
I want to implement the following functionality:

- At the start of the game, all cubes are clickable (naturally).

- When the user clicks on a cube that was NOT previously clicked on, this should:
1). Add the cube to the clickedCubes array, which is stored in the local state of the BoggleGame container class component
2). PREVENT a cube that is NOT horizontally, vertically or diagonally adjacent to the clicked cube from being clicked
(i.e. disable the buttons that represent these noncontiguous cubes, but keep contiguous cubes clickable).
3). Append the clicked cube's letter to the wordBuilder string
4). Change the color of cube to indicate that it has been clicked and its letter is used in wordBuilder string!

-When the user clicks on the last cube that WAS previously clicked on, this should:
1). Remove the cube from the clickedCubes array to indicate that its letter should NOT be included in the word being built
2). Remove the clicked cube's letter from the wordBuilder string
3). Change the color of the cube back to its default color