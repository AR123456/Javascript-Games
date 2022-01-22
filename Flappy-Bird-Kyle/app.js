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

function updateLoop() {
  console.log(time);
}
function checkLose() {
  //
}
function isCollision() {
  //
}
function handleStart() {
  title.classList.add("hide");
  window.requestAnimationFrame(updateLoop);
}
function handleLose() {
  //
}
