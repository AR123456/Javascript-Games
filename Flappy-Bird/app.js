const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector(".ground");

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;
let isGameOver = false;
// move bird to bottom center of sky div
function startGame() {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
  //
}
// run startGame every 20 ms
let gameTimerId = setInterval(startGame, 20);
// use clearInterval to stop it from running
// clearInterval(timerId);
// jump up aginst gravity

function control(e) {
  //space bar
  if (e.keyCode === 32) {
    jump();
  }
}

function jump() {
  // each time the jump function is called adding 50px but not if it would cause bird to jump off page
  if (birdBottom < 500) birdBottom += 50;
  bird.style.bottom = birdBottom + "px";
  // console.log(birdBottom);
}
document.addEventListener("keyup", control);

function generateObstacle() {
  let obstacleLeft = 500;
  let randomHeight = Math.random() * 60;
  // console.log(randomHeight);
  let obstacleBottom = randomHeight;
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  if (!isGameOver) gameDisplay.appendChild(obstacle);
  obstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  //   moving the obstacle
  function moveObstacle() {
    obstacleLeft -= 2;
    obstacle.style.left = obstacleLeft + "px";
    console.log(obstacleLeft);
    if (obstacleLeft === -60) {
      clearTimeout(timerId);
      gameDisplay.removeChild(obstacle);
    }
    // bird colides with obstacle or bird hits ground
    if (
      (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220) ||
      birdBottom === 0
    ) {
      gameOver();
      clearInterval(timerId);
    }
  }
  // move obstacle every 20ms
  let timerId = setInterval(moveObstacle, 20);
  // genrate more obstacles by putting generateObstacle in setTimeout
  if (!isGameOver) setTimeout(generateObstacle, 3000);
}

generateObstacle();
function gameOver() {
  console.log("game over");
  clearInterval(gameTimerId);
  isGameOver = true;
  document.removeEventListener("keyup", control);
}
