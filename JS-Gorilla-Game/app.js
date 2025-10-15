// State at start of game
let state = {};

// main canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.height;
const ctx = canvas.getContext("2d");
console.log(ctx);
// new game
newGame();
//main game function
function newGame() {
  // reset game state
  state = {};
  //call draw function
  draw();
}
// draw function
function draw() {}
// event handlers
function throwBomb() {}
function animate(timestamp) {}
