import { updateGround, setupGround } from "./ground.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const worldElem = document.querySelector("[data-world]");

setPixelToWorldScale();

window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;
  updateGround(delta, 1);
  lastTime = time;
  updateSpeedScale(delta);

  window.requestAnimationFrame(update);
}
function updateSpeedScale() {
  //
}
function handleStart() {
  lastTime = null;
  speedScale = 1;
  setupGround();
  window.requestAnimationFrame(update);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}