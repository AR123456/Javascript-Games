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
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squeareIdBeingReplaced;
// drag candies
// add event listeners for each of 5 stages of dragging syntax is the "event", function
squares.forEach((square) => square.addEventListener("dragstart", dragStart));
squares.forEach((square) => square.addEventListener("dragend", dragEnd));
squares.forEach((square) => square.addEventListener("dragover", dragOver));
squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
squares.forEach((square) => square.addEventListener("drop", dragDrop));

function dragStart() {
  colorBeingDragged = this.style.backgroundColor;
  console.log(colorBeingDragged);
  // need ID to replace in dropped to square, use parseInt to make sure it is an integer
  squareIdBeingDragged = parseInt(this.id);
  console.log(this.id, "dragstart");
}

function dragOver(e) {
  e.preventDefault();
  // console.log(this.id, "dragover");
}
function dragEnter(e) {
  e.preventDefault();
  // console.log(this.id, "dragenter");
}
function dragLeave() {
  console.log(this.id, "dragleave");
}
function dragEnd() {
  console.log(this.id, "dragend");
  // what is a valid move ?
  let validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width,
  ];
  // valid move is one of the ones in the validMoves array
  let validMove = validMoves.includes(squeareIdBeingReplaced);
  if (squeareIdBeingReplaced && validMove) {
    squeareIdBeingReplaced = null;
  } else if (squeareIdBeingReplaced && !validMove) {
    squares[squeareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
    squares[squeareIdBeingDragged].style.backgroundColor = colorBeingDragged;
  } else {
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
  }
}
function dragDrop() {
  // in candy crush the colors(candies) are swapped out when the dragged one is dropped onto target one
  console.log(this.id, "dragdrop");
  colorBeingReplaced = this.backgroundColor;
  // need ID to replace in dropped to square
  squeareIdBeingReplaced = parseInt(this.id);
  // set style
  this.style.backgroundImage = colorBeingDragged;
  // set the color of the squared being dragged and dropped to that of the one it is dropped upon
  squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
}

// resume   https://www.youtube.com/watch?v=XD5sZWxwJUk
