// State(game state) at start of game
let state = {};

// main canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.height;
// draw function needs context
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#4A3C68";
ctx.fillRect(200, 200, 440, 320);
// new game
newGame();

//main game function
function newGame() {
  // reset game state
  state = {
    // phase - aiming, in flight- bomb is moving across the sky celebrating
    phase: "aiming",
    // keep track of who the current player is
    currentPlayer: 1,
    bomb: {
      x: undefined,
      y: undefined,
      rotation: 0,
      velocity: { x: 0, y: 0 },
    },
    //buildings  - array of positions and sizes
    backgroundBuildings: [],
    // buildings with windows
    buildings: [],
    // blasts
    blastHoles: [],
  };
  for (let i = 0; i < 11; i++) {
    generateBackgroundBuilding(i);
  }
  for (let i = 0; i < 8; i++) {
    generateBuilding(i);
  }
  // position bomb in hand of gorilla
  initializeBombPosition();
  //call draw function - paints the screen when called
  draw();
}
function generateBackgroundBuilding(index) {}
function generateBuilding() {}
function initializeBombPosition() {}
// draw function
function draw() {}
// event handlers
function throwBomb() {}
// calculate position of banana as it moves across the sky
function animate(timestamp) {}
