const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
let score = 0;
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
// Dragging the Candy
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;
// drag candies
// add event listeners for each of 5 stages of dragging syntax is the "event", function

squares.forEach((square) => square.addEventListener("dragstart", dragStart));
squares.forEach((square) => square.addEventListener("dragend", dragEnd));
squares.forEach((square) => square.addEventListener("dragover", dragOver));
squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
squares.forEach((square) => square.addEventListener("drop", dragDrop));

function dragStart() {
  colorBeingDragged = this.style.backgroundColor;
  // console.log(colorBeingDragged);
  // need ID to replace in dropped to square, use parseInt to make sure it is an integer
  squareIdBeingDragged = parseInt(this.id);
  // console.log(this.id, "dragstart");
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
function dragDrop() {
  // in candy crush the colors(candies) are swapped out when the dragged one is dropped onto target one
  // console.log(this.id, "dragdrop");
  colorBeingReplaced = this.style.backgroundColor;
  // need ID to replace in dropped to square
  squareIdBeingReplaced = parseInt(this.id);
  // set style
  this.style.backgroundColor = colorBeingDragged;
  // set the color of the squared being dragged and dropped to that of the one it is dropped upon
  squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
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
  let validMove = validMoves.includes(squareIdBeingReplaced);

  if (squareIdBeingReplaced && validMove) {
    squareIdBeingReplaced = null;
  } else if (squareIdBeingReplaced && !validMove) {
    squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
  } else
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
}

/// check for matches
// check for fow of Three
function checkRowForThree() {
  // looping over all the rows
  for (let i = 0; i < 61; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";
    if (
      rowOfThree.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      score += 3;
      scoreDisplay.innerHTML = score;
      rowOfThree.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
checkRowForThree();
// check columns for 3 in a row
//for column of Three
function checkColumnForThree() {
  for (i = 0; i < 47; i++) {
    let columnOfThree = [i, i + width, i + width * 2];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      columnOfThree.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      score += 3;
      scoreDisplay.innerHTML = score;
      columnOfThree.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
checkColumnForThree();

window.setInterval(function () {
  checkRowForThree();
  checkColumnForThree();
}, 100);
// resume   https://www.youtube.com/watch?v=XD5sZWxwJUk
