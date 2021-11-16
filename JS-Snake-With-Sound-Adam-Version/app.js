const canvas = document.getElementById("game");
// context of the canvas
const ctx = canvas.getContext("2d");
let speed = 7;
//
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
// position of x and y
let headX = 10;
let headY = 10;
//game loop runs continueusly updating screen could be done in one of 3 ways
// requestAnimationFrame
//setInterval x times per second
// setTimeOut -  using this to change how often the screen updates
function drawGame() {
  clearScreen();
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
drawGame();
