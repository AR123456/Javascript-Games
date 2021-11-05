const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let startPoint = 150;
let doodlerBottomSpace = startPoint;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimerId;
let downTimerId;
let isJumping = true;

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  // when doodler created put him on the first platform
  // position of platform in the 0 space in array
  doodlerLeftSpace = platforms[0].left;
  doodler.style.left = doodlerLeftSpace + "px";
  doodler.style.bottom = doodlerBottomSpace + "px";
}
// constructor class for platform
class Platform {
  constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement("div");
    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    grid.appendChild(visual);
  }
}
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
    let newPlatform = new Platform(newPlatBottom);
    platforms.push(newPlatform);
    // console.log(platforms);
  }
}
function movePlatforms() {
  if (doodlerBottomSpace > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + "px";
    });
  }
}
function jump() {
  clearInterval(downTimerId);
  // set is jumping to true
  isJumping = true;
  upTimerId = setInterval(function () {
    doodlerBottomSpace += 20;
    doodler.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace > startPoint + 200) {
      fall();
    }
  }, 30);
}
function fall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(function () {
    doodlerBottomSpace -= 5;
    doodler.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace <= 0) {
      gameOver();
    }
    // check for colision with a platform - meaning doodler should jump again
    platforms.forEach((platform) => {
      // is bottom edge of doodler sharing same space as inside the platform?
      if (
        doodlerBottomSpace >= platform.bottom &&
        doodlerBottomSpace <= platform.bottom + 15 &&
        doodlerLeftSpace + 60 >= platform.left &&
        doodlerLeftSpace <= platform.left + 85 &&
        !isJumping
      )
        console.log("landed on a platform so jump again  ");
      startPoint = doodlerBottomSpace;
      jump();
    });
  }, 30);
}
function gameOver() {
  isGameOver = true;
  clearInterval(upTimerId);
  clearInterval(downTimerId);
}
// controle with arrow keys
function control(e) {
  if (e.key === "ArrowLeft") {
    // move left
  } else if (e.key === "ArrowRight") {
    // move right
  } else if (e.key === "ArrowUp") {
    // moveStraight up
  }
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createDoodler();

    setInterval(movePlatforms, 30);
    jump();
  }
}
// doodler is jumping and never falling fix this before moving on
// restart at  https://www.youtube.com/watch?v=8xPsg6yv7TU
// TODO attach to button
start();
