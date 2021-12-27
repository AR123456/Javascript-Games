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
  // console.log(shuffledArray);
  // another way using Fisher-Yates algorith
  //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj

  for (let i = 0; i < width * height; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    // give the square a class name
    square.classList.add(shuffledArray[i]);
    grid.appendChild(square);
    squares.push(square);
    //// add on click
    square.addEventListener("click", function (e) {
      // do the click function passing in the square
      click(square);
    });
  }
  // putting numbers into squares that are the bombs neighbors
  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    // if square on right or left side of grid do not check it
    // ie right or left edge  https://www.youtube.com/watch?v=W0No1JDc6vE
    const isLeftEdge = i % width === 0;
    const isRightEdge = i === width - 1;

    // checking each direction - if a square is not a bomb
    if (squares[i].classList.contains("valid")) {
      // check square to the west  https://www.youtube.com/watch?v=W0No1JDc6vE
      // if the square is not on the left edge && square to its east is a bomb increment total
      if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) {
        total++;
      }
      // check square to the north east  https://www.youtube.com/watch?v=W0No1JDc6vE
      // if the square at least in the 10 index && not on the far right edge &&
      //square + 10 - width(10) has a bomb incrment total
      if (
        i > 9 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains("bomb")
      ) {
        total++;
      }
      // check north   https://www.youtube.com/watch?v=W0No1JDc6vE
      // if the square is at least 11 && square index - 10 has bomb increment
      if (i > 10 && squares[i - width].classList.contains("bomb")) {
        total++;
      }
      //check north west   https://www.youtube.com/watch?v=W0No1JDc6vE
      if (
        i > 11 &&
        !isLeftEdge &&
        squares[i - 1 - width].classList.contains("bomb")
      ) {
        total++;
      }
      // check east   https://www.youtube.com/watch?v=W0No1JDc6vE
      if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb")) {
        total++;
      }
      // south west  https://www.youtube.com/watch?v=W0No1JDc6vE
      if (
        i < 90 &&
        !isLeftEdge &&
        squares[i - 1 + width].classList.contains("bomb")
      ) {
        total++;
      }
      //south east  https://www.youtube.com/watch?v=W0No1JDc6vE
      if (
        i < 88 &&
        !isRightEdge &&
        squares[i + 1 + width].classList.contains("bomb")
      ) {
        total++;
      }
      // south    https://www.youtube.com/watch?v=W0No1JDc6vE
      if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
      // this sets the data attribute with the incremented total
      squares[i].setAttribute("data", total);
      // console.log(squares[i]);
    }
  }
}
createBoard();

// the click function being called in create board - we are passing in the square
function click(square) {
  console.log("click");
}
