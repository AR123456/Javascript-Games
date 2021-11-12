const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

// create the game board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    // create square to put into array and add to dom
    const square = document.createElement("div");
    // give a random candy color
    let randomColor = Math.floor(Math.random() * candyColors.length);
    square.style.backgroundColor = candyColors[randomColor];
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();
