const grid = document.querySelector(".grid");

let width = 10;
let height = 10;
let squares = [];

let bombAmount = 20;

// create Board function
function createBoard() {
  let mixedArray = [];
  // make array of 20 indexes
  const bombsArray = Array(bombAmount).fill("bomb");
  // empty array of the remaining squares (100-20)
  const emptyArray = Array(width * height - bombAmount).fill("valid");
  //   console.log(bombsArray);
  //   console.log(emptyArray);
  // join the 2 arrays and mix them up randomly
  // join them
  const gameArray = emptyArray.concat(bombsArray);
  // mix them
  //   https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
  console.log(shuffledArray);
  // another way using Fisher-Yates algorith
  //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj

  for (let i = 0; i < width * height; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();

//  https://www.youtube.com/watch?v=W0No1JDc6vE