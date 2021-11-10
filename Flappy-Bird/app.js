const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector(".ground");

let birdLeft = 200;
let birdBottom = 100;
let gravity = 2;

// move bird to bottom center of sky div
function startGame() {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
  //
}
// run startGame every 20 ms
let timerId = setInterval(startGame, 20);
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
  console.log(birdBottom);
}
document.addEventListener("keyup", control);

function generateObstacle() {
  let obstacleLeft = 500;
  let randomHeight = Math.random() * 60;
  console.log(randomHeight);
  let obstacleBottom = randomHeight;
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameDisplay.appendChild(obstacle);
  obstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  //   moving the obstacle
  function moveObstacle() {
    obstacleLeft -= 2;
    obstacle.style.left = obstacleLeft + "px";
  }
  // move obstacle every 20ms
  let timerId = setInterval(moveObstacle, 20);
}

generateObstacle();
// https://www.youtube.com/watch?v=8xPsg6yv7TU
