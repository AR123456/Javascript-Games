// State(game state) at start of game
let state = {};

// main canvas element and its drawing context
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// draw function needs context
const ctx = canvas.getContext("2d");
// consts for js
// left info panel
const angle1DOM = document.querySelector("#info-left .angle");
const velocity1DOM = document.querySelector("#info-left .velocity");
// right info panel
const angle2DOM = document.querySelector("#info-right .angle");
const velocity2DOM = document.querySelector("#info-right .velocity");
// bomb grab area
const bombGrabAreaDOM = document.querySelector("#bomb-grab-area");
// winner
const congratulationsDOM = document.getElementById("congratulations");
const winnerDOM = document.getElementById("winner");
let isDragging = false;
let dragStartX = undefined;
let dragStartY = undefined;
let deltaX, deltaY;
let previousAnimationTimestamp = undefined;
const blastHoles = 18;
const blastHoleRadius = 18;

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
  // buildings generated but before bomb is positioned now calc scale
  calculateScale();
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

function calculateScale() {
  // calc total width of city, add width of last building
  const lastBuilding = state.buildings.at(-1);
  // ratio  of width of city to window
  const totalWidthOfTheCity = lastBuilding.x + lastBuilding.width;

  state.scale = window.innerWidth / totalWidthOfTheCity;
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
  // reset velocity
  state.bomb.velocity.x = 0;
  state.bomb.velocity.y = 0;
  // reset rotation
  state.bomb.rotation = 0;
  // position the html grab area with the bomb
  const grabAreaRadius = 15;
  const left = state.bomb.x * state.scale - grabAreaRadius;
  const bottom = state.bomb.y * state.scale - grabAreaRadius;
  bombGrabAreaDOM.style.left = `${left}px`;
  bombGrabAreaDOM.style.bottom = `${bottom}px`;
}
// draw function
function draw() {
  ctx.save();
  // flip coordinate system to upside down - down the y axis by size of browser window
  ctx.translate(0, window.innerHeight);
  // flip the x
  ctx.scale(1, -1);
  // use the calculated scale
  ctx.scale(state.scale, state.scale);
  ///// call the draw functions
  drawBackground();
  drawBackgroundBuildings();
  // drawBuildings();
  drawBuildingsWithBlastHoles();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();

  // reset/restore transformation
  ctx.restore();
}
function drawBomb() {
  ctx.save();
  ctx.translate(state.bomb.x, state.bomb.y);

  if (state.phase === "aiming") {
    // move bomb with mouse while aiming
    ctx.translate(-state.bomb.velocity.x / 6.25, -state.bomb.velocity.y / 6.25);
    // show trajectory
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.setLineDash([3, 8]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(state.bomb.velocity.x, state.bomb.velocity.y);
    ctx.stroke();
    // draw circle
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fill();
  } else if (state.phase === "in flight") {
    // rotating banana
    ctx.fillStyle = "white";
    ctx.rotate(state.bomb.rotation);
    ctx.beginPath();
    ctx.moveTo(-8, -2);
    ctx.quadraticCurveTo(0, 12, 8, -2);
    ctx.quadraticCurveTo(0, 2, -8, -2);
    ctx.fill();
  } else {
    // default case is circle
    // draw circle
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fill();
  }

  // restore transformation
  ctx.restore();
}

function throwBomb() {
  // mouse up kicks this off
  state.phase = "in flight";
  previousAnimationTimestamp = undefined;
  requestAnimationFrame(animate);
}
function moveBomb(elapsedTime) {
  // slow the bomb down
  const multiplier = elapsedTime / 200;
  // adjust trajectory by gravity
  state.bomb.velocity.y -= 20 * multiplier;
  //calculate new position
  state.bomb.x += state.bomb.velocity.x * multiplier;
  state.bomb.y += state.bomb.velocity.y * multiplier;
  // rotate according to the direction
  const direction = state.currentPlayer === 1 ? -1 : +1;
  state.bomb.rotation += direction * 5 * multiplier;
}
function checkFrameHit() {
  if (
    state.bomb.y < 0 ||
    state.bomb.x < 0 ||
    state.bomb.x > window.innerWidth / state.scale
  ) {
    return true;
  }
}
function checkBuildingHit() {
  // iterate over the buildings array and determine if bomb is touching one of them
  for (let i = 0; i < state.buildings.length; i++) {
    const building = state.buildings[i];
    if (
      state.bomb.x + 4 > building.x &&
      state.bomb.x - 4 < building.x + building.width &&
      state.bomb.y - 4 < 0 + building.height
    ) {
      //is the bomb in an area with impact already ?
      for (let j = 0; j < state.blastHoles.length; j++) {
        const blastHole = state.blastHoles[j];

        //how far is this blastHole from center of prior
        const horizontalDistance = state.bomb.x - blastHole.x;
        const verticalDistance = (state.bomb.y = blastHole.y);
        const distance = Math.sqrt(
          horizontalDistance ** 2 + verticalDistance ** 2
        );
        console.log(blastHoleRadius);
        if (distance < blastHoleRadius) {
          // this is an a repeat blast
          return false;
        }
      }
      // this is a hit save the point of impact into the array
      state.blastHoles.push({ x: state.bomb.x, y: state.bomb.y });

      return true;
    }
  }
}
// calculate position of banana as it moves across the sky
function animate(timestamp) {
  //throwBomb kicked this off - each frame moves the bomb a little
  // first cycle has no previous time so account for that
  if (previousAnimationTimestamp === undefined) {
    previousAnimationTimestamp = timestamp;
    requestAnimationFrame(animate);
    return;
  }
  // time passed between animation cycles
  const elapsedTime = timestamp - previousAnimationTimestamp;
  // call moveBomb 10 times for each animation cycle
  const hitDetectionPrecision = 10;
  for (let i = 0; i < hitDetectionPrecision; i++) {
    moveBomb(elapsedTime / hitDetectionPrecision);
  }

  // hit detection - off screen or hit a building
  const miss = checkFrameHit() || checkBuildingHit();
  // did bomb hit enemy
  // const hit = false;
  const hit = checkGorillaHit();
  // check miss bomb goes off screen or hits building
  if (miss) {
    state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
    state.phase = "aiming";
    initializeBombPosition();
    draw();
    // stop animation
    return;
  }
  if (hit) {
    //TODO  bug here with hit get upside down in middle of screen
    state.phase = "celebrating";
    announceWinner();
    draw();
    // stop animation
    return;
  }
  draw();
  //continue the loop -
  // previous is timestamp at end of this loop
  previousAnimationTimestamp = timestamp;
  requestAnimationFrame(animate);
}
function drawBackground() {
  const background = ctx.createLinearGradient(
    0,
    0,
    0,
    window.innerHeight / state.scale
  );
  // set up gradient
  background.addColorStop(1, "#F8BA85");
  background.addColorStop(0, "#FFC28E");

  // draw sky
  ctx.fillStyle = background;
  ctx.fillRect(
    0,
    0,
    // account for dynamic scale
    window.innerWidth / state.scale,
    window.innerHeight / state.scale
  );
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
    ctx.quadraticCurveTo(
      -44,
      63,
      -28 - state.bomb.velocity.x / 6.25,
      107 - state.bomb.velocity.y / 6.25
    );
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
    ctx.quadraticCurveTo(
      +44,
      63,
      +28 - state.bomb.velocity.x / 6.25,
      107 - state.bomb.velocity.y / 6.25
    );
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
  // this function paints the body of the gorilla as a single path
  // can use isPointInPath canvas method
  drawGorillaBody();
  drawGorillaLeftArm(player);
  drawGorillaRightArm(player);
  drawGorillaFace(player);
  ctx.restore();
}
function setInfo(deltaX, deltaY) {
  // the trig to calc velocity ect
  const hypotenuse = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  // convert to Radians
  const angleInRadians = Math.asin(deltaY / hypotenuse);
  const angleInDegrees = (angleInRadians / Math.PI) * 160;
  if (state.currentPlayer === 1) {
    angle1DOM.innerText = Math.round(angleInDegrees);
    velocity1DOM.innerText = Math.round(hypotenuse);
  } else {
    angle2DOM.innerText = Math.round(angleInDegrees);
    velocity2DOM.innerText = Math.round(hypotenuse);
  }
}
function drawBuildingsWithBlastHoles() {
  ctx.save();
  state.blastHoles.forEach((blastHole) => {
    ctx.beginPath();
    // part of path clockwise behavior
    ctx.rect(
      0,
      0,
      window.innerWidth / state.scale,
      window.innerHeight / state.scale
    );
    // arc default is to draw clockwise, 6th param "true" makes it go counterclockwise
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    ctx.arc(blastHole.x, blastHole.y, blastHoleRadius, 0, 2 * Math.PI, true);
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
    ctx.clip();
  });
  drawBuildings();
  ctx.restore();
}
function checkGorillaHit() {
  const enemyPlayer = state.currentPlayer === 1 ? 2 : 1;
  // which building is enemy on
  const enemyBuilding =
    enemyPlayer === 1 ? state.buildings.at(1) : state.buildings.at(-2);
  ctx.save();
  // need to translate coordinate system to top of that building
  ctx.translate(
    enemyBuilding.x + enemyBuilding.width / 2,
    enemyBuilding.height
  );
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
  drawGorillaBody();
  // hit to body
  let hit = ctx.isPointInPath(state.bomb.x, state.bomb.y);
  // also need to check the gorillas arms
  drawGorillaLeftArm(enemyPlayer);
  //arm is a path so need isPoint in stroke method - works because we are checking every px
  // this is true if enemy is hit in body or arm
  hit ||= ctx.isPointInStroke(state.bomb.x, state.bomb.y);

  drawGorillaRightArm(enemyPlayer);
  // this is true if enemy is hit in body or arm
  hit ||= ctx.isPointInStroke(state.bomb.x, state.bomb.y);
  ctx.restore();
  //  sending this to the animate function
  return hit;
}
// event handler
bombGrabAreaDOM.addEventListener("mousedown", function (e) {
  // we only care about this if aiming
  if (state.phase === "aiming") {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    document.body.style.cursor = "grabbing";
  }
});

window.addEventListener("mousemove", function (e) {
  //  only track when we are dragging
  if (isDragging) {
    let deltaX = e.clientX - dragStartX;
    let deltaY = e.clientY - dragStartY;
    state.bomb.velocity.x = -deltaX;
    state.bomb.velocity.y = deltaY;
    setInfo(deltaX, deltaY);
    draw();
  }
});

window.addEventListener("mouseup", function (e) {
  if (isDragging) {
    isDragging = false;
    this.document.body.style.cursor = "default";
    throwBomb();
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  calculateScale();
  initializeBombPosition();
  draw();
});
