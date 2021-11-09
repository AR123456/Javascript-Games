const bird = document.querySelector(".bird");
const gameDispaly = document.querySelector(".game-container");
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
function jump() {
  // each time the jump function is called adding 50px
  birdBottom += 50;
  bird.style.bottom = birdBottom + "px";
}
document.addEventListener("keyup", jump);
