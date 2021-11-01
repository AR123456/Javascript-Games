const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let doodlerBottomSpace = 150;
let isGameOver = false;
let platformCount = 5;

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  doodler.style.left = doodlerLeftSpace + "px";
  doodler.style.bottom = doodlerBottomSpace + "px";
}
// constructor class for platform
class Platform {
  constructor(newPlatBottom) {
    // each platform will need a bottom, left spacing
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    // create the div for the platform
    this.visual = document.createElement("div");
    // need to store as a variable fist since this. will not work to add class list

    const visual = this.visual;
    // add styling
    visual.classList.add("platform");
    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    // append the grid div with the new plaform
    grid.appendChild(visual);
  }
}
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    ///gap between platforms hight of grid/platformCount
    let platGap = 600 / platformCount;
    //using for loop to increment the sizeof platform
    let newPlatBottom = 100 + i * platGap;
    // using class here to create new platform
    let newPlatform = new Platform(newPlatBottom);
  }
}

function start() {
  if (!isGameOver) {
    //   if the game is not over create the doodler
    createDoodler();
    createPlatforms();
  }
}
// TODO attach to button
start();
// restart at 13min   https://www.youtube.com/watch?v=8xPsg6yv7TU
