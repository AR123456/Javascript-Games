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
// remove an invader when shot
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}
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
  remove();
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
    // check the taken down array , if not in that array ok ot add invader class
    if (!alienInvadersTakenDown.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
  // check for game over - the invaders are on same row as shooter
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    //game over
    resultDisplay.textContent = "Game over";
    squares[currentShooterIndex].classList.add("boom");
    clearInterval(invaderId);
  }
  // checkk to see if any alien has missed the shooter but gotton to shooters row game is over (in one of the last 15 squares of the grid)
  for (let i = 0; i < alienInvaders.length - 1; i++) {
    if (alienInvaders[i] > squares.length - (width - 1)) {
      resultDisplay.textContent = "Game over";

      clearInterval(invaderId);
    }
  }
  // check for win
  // if same number taken down as number in array you win
  if (alienInvadersTakenDown.length === alienInvaders.length) {
    // win
    resultDisplay.textContent = "You win";
    clearInterval(invaderId);
  }
}
// invoke the function every 1/2 second
invaderId = setInterval(moveInvaders, 500);
// shooting the invaders

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    //remove the class to give the appearance of moving up
    squares[currentLaserIndex].classList.remove("laser");
    // removing the width removes the row
    currentLaserIndex -= width;
    // make new row appear
    squares[currentLaserIndex].classList.add("laser");
    // check to see if invader hit
    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");
      // using setTime out to remove the boom
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        250
      );
      clearInterval(laserId);
      // use array to track aliens taken down
      const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
      alienInvadersTakenDown.push(alienTakenDown);
      result++;
      resultDisplay.textContent = result;
    }
    // if the laser is within the first 15 ( ) remove it from grid
    if (currentLaserIndex < width) {
      clearInterval(laserId);
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("laser"),
        100
      );
    }
  }
  // add on key up to space bar to shoot
  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 32) {
      laserId = setInterval(moveLaser, 100);
    }
  });
  // switch(e.keyCode){
  //   case "32":
  //     laserId = setInterval(moveLaser, 100)
  // }
}
document.addEventListener("keyup", shoot);
