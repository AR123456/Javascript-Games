const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let doodlerBottomSpace = 150;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimerId;
let downTimerId;
function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
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
  // only mover platforms if doodler is above 200
  if (doodlerBottomSpace > 200) {
    // for each item in the platforms array
    platforms.forEach((platform) => {
      // remove 4
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + "px";
    });
  }
}
function jump() {
  // time id stops the set interval
  upTimerId = setInterval(function () {
    // jump doodler up 20
    doodlerBottomSpace += 20;
    // apply to element so it is visibel
    doodler.style.bottom = doodlerBottomSpace + "px";
  }, 30);
}
function start() {
  if (!isGameOver) {
    //   if the game is not over create the doodler
    createDoodler();
    createPlatforms();
    // put move platfroms on set interval so it moves a a frequesncy
    setInterval(movePlatforms, 30);
    jump();
  }
}
// TODO attach to button
start();
