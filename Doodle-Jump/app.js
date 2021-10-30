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
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    ///gap between platforms hight of grid/platformCount
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
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
