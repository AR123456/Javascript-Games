// State(game state) at start of game
let state = {};

// main canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// draw function needs context
const ctx = canvas.getContext("2d");

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
    // init background buildings array in
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
function generateBackgroundBuilding(index) {
  const previousBuilding = state.backgroundBuildings[index - 1];
  const x = previousBuilding
    ? previousBuilding.x + previousBuilding.width + 4
    : -30;
  // generate size
  const minWidth = 60;
  const maxWidth = 110;
  const width = minWidth + Math.random() * (maxWidth - minWidth);
  const minHeight = 80;
  const maxHeight = 350;
  const height = minHeight + Math.random() * (maxHeight - minHeight);
  state.backgroundBuildings.push({ x, width, height });
}
function generateBuilding() {}
function initializeBombPosition() {}
// draw function
function draw() {
  // flip coordinate system to upside down - down the y axis by size of browser window
  ctx.translate(0, window.innerHeight);
  // flip the x
  ctx.scale(1, -1);
  ///// call the draw functions
  drawBackground();
  drawBackgroundBuildings();
  // drawBuildings();
  // drawGorilla(1);
  // drawGorilla(2);
  // drawBomb();

  // reset/restore transformation
  ctx.restore();
}
// event handlers
function throwBomb() {}
// calculate position of banana as it moves across the sky
function animate(timestamp) {}
function drawBackground() {
  // set up gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  gradient.addColorStop(1, "#F8BA85");
  gradient.addColorStop(0, "#FFC28E");

  // draw sky
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  //  adding moon to background
  ctx.fillStyle = "rgba(255,253,253,0.61)";
  ctx.beginPath();
  ctx.arc(300, 350, 60, 0, 2 * Math.PI);
  ctx.fill();
}
function drawBackgroundBuildings() {
  // just using the building part of state so give it a meaningful variable name
  state.backgroundBuildings.forEach((building) => {
    ctx.fillStyle = "#947283";
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}
