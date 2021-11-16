const canvas = document.getElementById("game");
// context of the canvas
const ctx = canvas.getContext("2d");
let speed = 3;
//
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
// position of x and y
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;

//game loop runs continueusly updating screen could be done in one of 3 ways
// requestAnimationFrame
//setInterval x times per second
// setTimeOut -  using this to change how often the screen updates
function drawGame() {
  clearScreen();
  changeSnakePosition();
  drawApple();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
}
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = "orange";
  // location on page and size
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
  // left right
  headX = headX + xVelocity;
  // updown
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  // cannot go up if you are alrady going down
  // if you are requesting to go up but are already moving down
  if (event.keyCode == 38) {
    // checking down
    if (yVelocity == 1) {
      return;
    }
    yVelocity = -1;
    xVelocity = 0;
  }
  // down
  if (event.keyCode == 40) {
    // if you are requesting to go down but already moving up
    if (yVelocity == -1) {
      return;
    }
    yVelocity = 1;
    xVelocity = 0;
  }
  //left

  if (event.keyCode == 37) {
    // if you are requesting to go left but are already moving right
    if (xVelocity == 1) {
      return;
    }
    yVelocity = 0;
    xVelocity = -1;
  }
  //right
  if (event.keyCode == 39) {
    // if you are requesitng to go right but are already moving left
    if (xVelocity == -1) {
      return;
    }
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
