// State(game state) at start of game
let state = {};

// main canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.height;
// draw function needs context
const ctx = canvas.getContext("2d");
console.log(ctx);
// new game
newGame();
//main game function
function newGame() {
  // reset game state
  state = {
    // phase - aiming, in flight celebrating
    // keep track of who the current player is
    currentPlayer: 1,
    //buildings  - array of positions and sizes
    backgroundBuildings: [],
    // buildings with windows
    buildings: [],
  };
  for (let i = 0; i < 11; i++) {
    generateBackgroundBuilding(i);
  }
  for (let i = 0; i < 8; i++) {
    generateBuilding(i);
  }
  //call draw function - paints the screen when called
  draw();
}
// draw function
function draw() {}
// event handlers
function throwBomb() {}
// calculate position of banana as it moves across the sky
function animate(timestamp) {}
