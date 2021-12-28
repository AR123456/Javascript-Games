const grid = document.querySelector(".grid");

let width = 10;
let height = 10;
let squares = [];
let isGameOver = false;

let bombAmount = 20;

// create Board function
function createBoard() {
  let mixedArray = [];
  // make array of 20 indexes
  const bombsArray = Array(bombAmount).fill("bomb");
  // empty array of the remaining squares (100-20)
  const emptyArray = Array(width * height - bombAmount).fill("valid");
  // join the 2 arrays and mix them up randomly

  const gameArray = emptyArray.concat(bombsArray);
  // mix them
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < width * height; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square);
    squares.push(square);
    //// add on click
    square.addEventListener("click", function (e) {
      // do the click function passing in the square
      click(square);
    });
  }
  // checking for bombs
  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    // if square on right or left side of grid do not check it
    // ie right or left edge  https://www.youtube.com/watch?v=W0No1JDc6vE
    const isLeftEdge = i % width === 0;
    const isRightEdge = i === width - 1;

    // checking each direction - if a square is not a bomb
    if (squares[i].classList.contains("valid")) {
      if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
        total++;
      if (
        i > 9 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains("bomb")
      )
        total++;
      if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
      if (
        i > 11 &&
        !isLeftEdge &&
        squares[i - 1 - width].classList.contains("bomb")
      )
        total++;
      if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
        total++;
      if (
        i < 90 &&
        !isLeftEdge &&
        squares[i - 1 + width].classList.contains("bomb")
      )
        total++;
      if (
        i < 88 &&
        !isRightEdge &&
        squares[i + 1 + width].classList.contains("bomb")
      )
        total++;
      if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
      squares[i].setAttribute("data", total);
    }
  }
}
createBoard();

// the click function being called in create board - we are passing in the square
function click(square) {
  let currentId = square.id;
  if (isGameOver) {
    return;
  }
  if (
    square.classList.contains("checked") ||
    square.classList.contains("flag")
  ) {
    return;
  }
  if (square.classList.contains("bomb")) {
    return;
  }
  if (square.classList.contains("bomb")) {
    console.log("clicked bomb");
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      square.innerHTML = total;
      return;
    }
    // funciton that uses recursion to fill non bomb squares chained to the square clicked
    checkSquare(square, currentId);
  }
  square.classList.add("checked");
}
// check square
function checkSquare(square, currentId) {
  //check the 8 surrounding squares of any square we are checking
  // and make sure we are not at an edge
}
