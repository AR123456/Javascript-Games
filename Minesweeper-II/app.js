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
  mixedArray.push(...bombsArray, ...emptyArray);
  //   console.log(mixedArray);

  let mixedArrayRandom = shuffle(mixedArray);
  //   console.log(mixedArrayRandom);
  for (let i = 0; i < width * height; i++) {
    const square = document.createElement("div");
    square.setAttribute("id", i);
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();
function shuffle(mixedArray) {
  let currentIndex = mixedArray.length,
    mixedArrayRadomIndex;
  while (currentIndex != 0) {
    mixedArrayRadomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    [mixedArray[currentIndex], mixedArray[mixedArrayRadomIndex]] = [
      mixedArray[mixedArrayRadomIndex],
      mixedArray[currentIndex],
    ];
    console.log(mixedArray);
    return mixedArray;
  }
}
