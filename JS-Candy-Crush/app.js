const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

// create the game board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    // create square to put into array and add to dom
    const square = document.createElement("div");
    // make the squares dragable
    // https://www.w3schools.com/tags/att_global_draggable.asp
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable
    square.setAttribute("draggable", true);
    // give each square a uniqe id use the number of indexes in the squares array
    square.setAttribute("id", i);

    // give a random candy color
    let randomColor = Math.floor(Math.random() * candyColors.length);
    square.style.backgroundColor = candyColors[randomColor];
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();

// drag candies
// add event listeners for each of 5 stages of dragging syntax is the "event", function
squares.forEach((square) => square.addEventListener("dragstart", dragStart));
squares.forEach((square) => square.addEventListener("dragend", dragEnd));
squares.forEach((square) => square.addEventListener("dragover", dragOver));
squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
squares.forEach((square) => square.addEventListener("drop", dragDrop));

function dragStart() {
  console.log(this.id, "dragstart");
}
function dragEnd() {
  console.log(this.id, "dragend");
}
function dragOver() {
  console.log(this.id, "dragover");
}
function dragEnter() {
  console.log(this.id, "dragenter");
}
function dragLeave() {
  console.log(this.id, "dragleave");
}
function dragDrop() {
  console.log(this.id, "dragdrop");
}
