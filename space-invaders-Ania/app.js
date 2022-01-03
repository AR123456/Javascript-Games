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
  squares[currentInvaderIndex].classList.remove("shooter");
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
// e
