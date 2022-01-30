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
  const delta = time - lastTime;
  updateBird(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}
function checkLose() {
  const birdRect = getBirdRect();
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  return outsideWorld;
}
function isCollision() {
  //
}
function handleStart() {
  title.classList.add("hide");
  setupBird();
  // need to do this so that we do not carry over the previous value
  // without this there is a huge dela diff if a user doesnt immediatly play again
  lastTime = null;
  window.requestAnimationFrame(updateLoop);
}
function handleLose() {
  // wrapping is setTime out to handle the repeaded pressing of the space bar that happens while playing and potentally losing and restarting game too quickly
  setTimeout(() => {
    title.classList.remove("hide");
    subtitle.classList.remove("hide");
    subtitle.textContext = "0 Pipes ";
    document.addEventListener("keypress", handleStart, { once: true });
  }, 100);
}
