import { updateBird, setupBird, getBirdRect } from "./bird.js";
import {
  updatePipes,
  setupPipes,
  getPassedPipesCount,
  getPipeRects,
} from "./pipe.js";
document.addEventListener("keypress", handleStart, { once: true });
const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");

let lastTime;

function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);

    return;
  }
  // time between the animation frames tracked with delta
  const delta = time - lastTime;
  updateBird(delta);
  lastTime = time;

  window.requestAnimationFrame(updateLoop);
}
function checkLose() {
  //
}
function isCollision() {
  //
}
function handleStart() {
  title.classList.add("hide");
  // start the game loop up, pas in the update function
  window.requestAnimationFrame(updateLoop);
}
function handleLose() {
  //
}
