const canvas = document.getElementById("game");
// context of the canvas
const ctx = canvas.getContext("2d");
//n this will grow the snake
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
let speed = 3;
//
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
// position of x and y
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let score = 0;
// create audio constructor for sounds
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
const gulpSound = new Audio("gulp.mp3");

//game loop runs continueusly updating screen could be done in one of 3 ways
// requestAnimationFrame
//setInterval x times per second
// setTimeOut -  using this to change how often the screen updates
function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    // game is over
    return;
  }
  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  // increase the difficulty of the game based on score
  if (score > 2) {
    speed === 5;
  }
  if (score > 5) {
    speed === 7;
  }
  setTimeout(drawGame, 1000 / speed);
}
function isGameOver() {
  let gameOver = false;
  // if Velocity is 0 the game has not started yet
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls using if statement ,  maybe switch case would be better
  // left wall is hit
  if (headX < 0) {
    gameOver = true;
  }
  // right wall
  else if (headX === tileCount) {
    gameOver = true;
  }
  // top wall hit
  else if (headY < 0) {
    gameOver = true;
    // hit bottom wall  tile count is 20 for 20x20 grid
  } else if (headY === tileCount) {
    gameOver = true;
  }
  // colison with snake body
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    // are any of the parts in the same spot as the head
    if (part.x === headX && part.y === headY) {
      // velocity check needed or else game is over immediatly
      gameOver = true;
      // break out for loop
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Veranda";
    // var gradiant = ctx.createLinearGradient(0, 0, canvas.width, 0);
    // gradiant.addColorStop("0", "magenta");
    // gradiant.addColorStop("0.5", "blue");
    // gradiant.addColorStop("1.0", "red");
    // fill with gradient
    // ctx.fillStyle = gradiant;
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px verdana";
  ctx.fillText("score: " + score, canvas.width - 50, 10);
}
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = "orange";
  // location on page and size
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  // put the new part where the head was
  snakeParts.push(new SnakePart(headX, headY));
  // if (snakeParts.length > tailLength) {
  //   // remove snake part
  //   snakeParts.shift();
  // }
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthes item from snake parts array
  }
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
function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    // move the food to a new position
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    // play the sound
    gulpSound.play();
  }
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
