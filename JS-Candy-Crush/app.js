const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const width = 8;
const squares = [];
let score = 0;

const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

//create your board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
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

squares.forEach((square) => square.addEventListener("dragstart", dragStart));
squares.forEach((square) => square.addEventListener("dragend", dragEnd));
squares.forEach((square) => square.addEventListener("dragover", dragOver));
squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
squares.forEach((square) => square.addEventListener("drop", dragDrop));

function dragStart() {
  colorBeingDragged = this.style.backgroundColor;
  squareIdBeingDragged = parseInt(this.id);
  // this.style.backgroundColor = ''
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.style.backgroundColor = "";
}

function dragDrop() {
  colorBeingReplaced = this.style.backgroundColor;
  squareIdBeingReplaced = parseInt(this.id);
  this.style.backgroundColor = colorBeingDragged;
  squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
}

function dragEnd() {
  //What is a valid move?
  let validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width,
  ];
  let validMove = validMoves.includes(squareIdBeingReplaced);

  if (squareIdBeingReplaced && validMove) {
    squareIdBeingReplaced = null;
  } else if (squareIdBeingReplaced && !validMove) {
    squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
  } else
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
}

//drop candies once some have been cleared
function moveIntoSquareBelow() {
  // check squares below for an empty square
  for (i = 0; i < 55; i++) {
    if (squares[i + width].style.backgroundColor === "") {
      squares[i + width].style.backgroundColor =
        squares[i].style.backgroundColor;
      squares[i].style.backgroundColor = "";
      // now add new candies into the empty spaces
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && squares[i].style.backgroundColor === "") {
        // fill the empty space with a random color
        let randomColor = Math.floor(Math.random() * candyColors.length);
        squares[i].style.backgroundColor = candyColors[randomColor];
      }
    }
  }
}

///Checking for Matches
//for row of Four
function checkRowForFour() {
  for (i = 0; i < 60; i++) {
    let rowOfFour = [i, i + 1, i + 2, i + 3];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";
    // every index to not start a row of 4 on
    const notValid = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55,
    ];
    if (notValid.includes(i)) continue;

    if (
      rowOfFour.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      score += 4;
      scoreDisplay.innerHTML = score;
      rowOfFour.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
checkRowForFour();

//for column of Four
function checkColumnForFour() {
  for (i = 0; i < 39; i++) {
    let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";

    if (
      columnOfFour.every(
        (index) =>
          squares[index].style.backgroundColor === decidedColor && !isBlank
      )
    ) {
      score += 4;
      scoreDisplay.innerHTML = score;
      columnOfFour.forEach((index) => {
        squares[index].style.backgroundColor = "";
      });
    }
  }
}
checkColumnForFour();

//for row of Three
function checkRowForThree() {
  for (i = 0; i < 61; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let decidedColor = squares[i].style.backgroundColor;
    const isBlank = squares[i].style.backgroundColor === "";
    // every index to not start a row of 3 on
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
    if (notValid.includes(i)) continue;

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

// Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
window.setInterval(function () {
  checkRowForFour();
  checkColumnForFour();
  checkRowForThree();
  checkColumnForThree();
  moveIntoSquareBelow();
}, 100);

// resume https://www.youtube.com/watch?v=XD5sZWxwJUk
//TODO add check for column of five
//TODO add button to stop

//  same game same developer in react
//https://www.youtube.com/watch?v=PBrEq9Wd6_U&t=76s
