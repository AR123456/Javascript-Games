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
  // if check lose is true stop game (return)
  if (checkLose()) return handleLose();
  lastTime = time;

  window.requestAnimationFrame(updateLoop);
}
function checkLose() {
  const birdRect = getBirdRect();
  // did the bird  go out the top or bottowm or collide with somehhing
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  // outside world in a boolean
  return outsideWorld;
}
function isCollision() {
  //
}
function handleStart() {
  title.classList.add("hide");
  // setupBird gets the bird ready for the start of game
  setupBird();
  // start the game loop up, pass in the update function
  window.requestAnimationFrame(updateLoop);
}
function handleLose() {
  //
  title.classList.remove("hide");
  subtitle.classList.remove("hide");
  subtitle.textContext = "0 Pipes ";
  // restart the game with next keypress
  document.addEventListener("keypress", handleStart, { once: true });
}
