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
    // buildings with windows - build with for loop
    buildings: [],
    // blasts
    blastHoles: [],
    // scale to screen-value depends on size of generated buildings
    // so after city is generated call function to calculate scale
    scale: 1,
  };

  for (let i = 0; i < 11; i++) {
    // init background buildings array in
    generateBackgroundBuilding(i);
  }

  for (let i = 0; i < 8; i++) {
    generateBuilding(i);
  }
  // call after gen building/position of gorilla is known
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
function generateBuilding(index) {
  const previousBuilding = state.buildings[index - 1];
  const x = previousBuilding
    ? previousBuilding.x + previousBuilding.width + 4
    : 0;
  const minWidth = 80;
  // main buildings are a bit wider
  const maxWidth = 130;
  const width = minWidth + Math.random() * (maxWidth - minWidth);
  // need relatively higher buildings between gorillas so they serve as obstacles
  // gorillas always stand on same building one on left index 1  the one on r index 6 ( for array length of 8)
  const platformWithGorilla = index === 1 || index === 6;

  const minHeight = 40;
  const maxHeight = 300;
  const minHeightGorilla = 30;
  const maxHeightGorilla = 150;
  // if the building index is 1 or 6 set its height based on the range for buildings with a gorilla on them , else use the other range (non gorilla buildings)
  const height = platformWithGorilla
    ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
    : minHeight + Math.random() * (maxHeight - minHeight);
  // adding lights to buildings using array of true false
  const lightsOn = [];
  for (let i = 0; i < 50; i++) {
    const light = Math.random() <= 0.33 ? true : false;
    lightsOn.push(light);
  }
  // push buildings to state object
  state.buildings.push({ x, width, height, lightsOn });
}
function initializeBombPosition() {
  // depends on position of gorilla on building, so index 1 or second to last
  const building =
    state.currentPlayer === 1 ? state.buildings.at(1) : state.buildings.at(-2);
  // mid point of buildings
  const gorillaX = building.x + building.width / 2;
  const gorillaY = building.height;
  // gorilla hand depending on which player
  const gorillaHandOffsetX = state.currentPlayer === 1 ? -28 : 28;
  const gorillaHandOffsetY = 107;
  // position of bomb in hand
  state.bomb.x = gorillaX + gorillaHandOffsetX;
  state.bomb.y = gorillaY + gorillaHandOffsetY;
  // velocity
  state.bomb.velocity.x = 0;
  state.bomb.velocity.y = 0;
}
// draw function
function draw() {
  // flip coordinate system to upside down - down the y axis by size of browser window
  ctx.translate(0, window.innerHeight);
  // flip the x
  ctx.scale(1, -1);
  ///// call the draw functions
  drawBackground();
  drawBackgroundBuildings();
  drawBuildings();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();

  // reset/restore transformation
  ctx.restore();
}
function drawBomb() {
  // translate the coord system, move origin to center of bomb position S
  ctx.save();
  ctx.translate(state.bomb.x, state.bomb.y);
  // draw circle
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, 2 * Math.PI);
  ctx.fill();
  // restore transformation
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
function drawBuildings() {
  //  starts same way as drawing the background buildings
  state.buildings.forEach((building) => {
    ctx.fillStyle = "#4A3C68";
    ctx.fillRect(building.x, 0, building.width, building.height);
    // draw windows
    const windowWidth = 10;
    const windowHeight = 12;
    // use gap to position 1st window and space between windows
    const gap = 15;
    // determine number of floors - lowest floor will overflow screen but will be un seen
    const numberOfFloors = Math.ceil(
      (building.height - gap) / (windowHeight + gap)
    );
    // rooms per floor - round down so no window only partially fits building
    const numberOfRoomsPerFloor = Math.floor(
      (building.width - gap) / (windowWidth + gap)
    );
    // iterate to make grid
    for (let floor = 0; floor < numberOfFloors; floor++) {
      for (let room = 0; room < numberOfRoomsPerFloor; room++) {
        // determine which lights are on map floor and room index to lightsOn boolean index
        if (building.lightsOn[floor * numberOfRoomsPerFloor + room]) {
          ctx.save();
          // for ease flip the coordinate system so window is top left
          ctx.translate(building.x + gap, building.height - gap);
          ctx.scale(1, -1);
          // paint- draw rectangle
          const x = room * (windowWidth + gap);
          const y = floor * (windowHeight + gap);
          ctx.fillStyle = "#ebb6a2";
          ctx.fillRect(x, y, windowWidth, windowHeight);

          // must restore ctx so that the flip of coord system is just for windows
          ctx.restore();
        }
      }
    }
  });
}
function drawGorillaBody() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(-7, 0);
  ctx.lineTo(-20, 0);
  ctx.lineTo(-17, 18);
  ctx.lineTo(-20, 44);
  ctx.lineTo(-11, 77);
  ctx.lineTo(0, 84);
  ctx.lineTo(11, 77);
  ctx.lineTo(20, 44);
  ctx.lineTo(17, 18);
  ctx.lineTo(20, 0);
  ctx.lineTo(7, 0);
  ctx.fill();
}
function drawGorillaLeftArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;
  ctx.beginPath();
  // shoulder of gorilla
  ctx.moveTo(-14, 50);
  // check to see if the gorilla is aiming- gorilla on l is aiming by default
  if (state.phase === "aiming" && state.currentPlayer === 1 && player === 1) {
    // left hand goes up
    ctx.quadraticCurveTo(-44, 63, -28, 107);
  } else if (state.phase === "celebrating" && state.currentPlayer === player) {
    ctx.quadraticCurveTo(-44, 63, -28, 107);
  } else {
    ctx.quadraticCurveTo(-44, 45, -28, 12);
  }
  ctx.stroke();
}
function drawGorillaRightArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;
  ctx.beginPath();
  // move to shoulder of gorilla
  ctx.moveTo(+14, 50);
  // check to see if the gorilla is aiming- gorilla on r is aiming by default
  if (state.phase === "aiming" && state.currentPlayer === 2 && player === 2) {
    ctx.quadraticCurveTo(+44, 63, +28, 107);
  } else if (state.phase === "celebrating" && state.currentPlayer === player) {
    ctx.quadraticCurveTo(+44, 63, +28, 107);
  } else {
    ctx.quadraticCurveTo(+44, 45, +28, 12);
  }
  ctx.stroke();
}
function drawGorillaFace(player) {
  // face starts as an arc
  ctx.fillStyle = "lightgray";
  ctx.beginPath();
  ctx.arc(0, 63, 9, 0, 2 * Math.PI);

  // 2 more circles - mirrors of one another
  ctx.moveTo(-3.5, 70);
  ctx.arc(-3.5, 70, 4, 0, 2 * Math.PI);
  ctx.moveTo(+3.5, 70);
  ctx.arc(+3.5, 70, 4, 0, 2 * Math.PI);
  ctx.fill();
  // eyes
  ctx.fillStyle = "black";
  ctx.beginPath();
  // ctx.arc(x,y,radius,startAngle, 2*Math.PI);
  ctx.arc(-3.5, 70, 1.4, 0, 2 * Math.PI);
  ctx.arc(+3.5, 70, 1.4, 0, 2 * Math.PI);
  ctx.fill();
  // stroke width for nose and mouth
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1.4;
  // nose
  ctx.beginPath();
  ctx.moveTo(-3.5, 66.5);
  ctx.lineTo(-1.5, 65);
  ctx.moveTo(3.5, 66.5);
  ctx.lineTo(1.5, 65);
  ctx.stroke();
  // mouth - fighting and celebrating
  ctx.beginPath();
  if (state.phase === "celebrating" && state.currentPlayer === player) {
    ctx.moveTo(-5, 60);
    ctx.quadraticCurveTo(0, 56, 5, 60);
  } else {
    // show fighting
    ctx.moveTo(-5, 56);
    ctx.quadraticCurveTo(0, 60, 5, 56);
  }
  ctx.stroke();
}
function drawGorilla(player) {
  //  takes in player one or two
  ctx.save();
  // building at index 1 or second to last index
  const building =
    player === 1 ? state.buildings.at(1) : state.buildings.at(-2);
  ctx.translate(building.x + building.width / 2, building.height);
  drawGorillaBody();
  drawGorillaLeftArm(player);
  drawGorillaRightArm(player);
  drawGorillaFace(player);
  ctx.restore();
}
