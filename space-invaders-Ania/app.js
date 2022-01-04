const squares = document.querySelectorAll(".grid div");
const resultDisplay = document.getElementById("result");
let width = 15;
let currentShooterIndex = 202;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;

// define alien invaders
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];
// draw alien inaders - add the class list invader to these squares
alienInvaders.forEach((invader) =>
  squares[currentInvaderIndex + invader].classList.add("invader")
);
// shooter

squares[currentShooterIndex].classList.add("shooter");
// move shooter along the bottom row
// use key codes for the eventlistener  37 abd 39 left and right arrows
function moveShooter(e) {
  // remove shooter from where we started so it is not a blue line with each valide key press
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.keyCode) {
    case 37:
      // 37 is move left check to see if next to l edge
      // if the index / width is not even number it is ok to move
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;

      break;
    case 39:
      // 39 is move right  check to see if far right edge
      // if index divisable by the width(15) and the number is less that 14 it is ok to move right
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}
// event listener for moving shooter
document.addEventListener("keydown", moveShooter);
// moving the aliens in a timer
function moveInvaders() {
  // define left and right edge
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
    // move down a row in the grid
    direction = width;
    // if the direction is already 15 carry on
  } else if (direction === width) {
    //carry on with same logic as above
    if (leftEdge) direction = 1;
    else direction = -1;
  }
  /// loop over the array to move the invaders
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    // remove the class list
    squares[alienInvaders[i]].classList.remove("invader");
  }
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    alienInvaders[i] += direction;
  }
  for (let i = 0; i <= alienInvaders.length - 1; i++) {
    squares[alienInvaders[i]].classList.add("invader");
  }
}
