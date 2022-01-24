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
// time time we went through the update loop based on the time being fed into it
let lastTime;

// pass in time, how long in ms since the page started running
function updateLoop(time) {
  // the first time that updateLoop runs time is NAN to get around this add this if statement
  if (lastTime == null) {
    // set the last time to current time then break out.  Skip the first render and then we will start rendering from there
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    // this return here is important
    // makes sure that time - lastTime is a number and not a large number
    return;
  }

  // console.log(time);
  // time-lastTime is the delta which is the time between diffrent annimaition frames . If there is a long time between frames need to move the bird further , if there is a short time move the bird less.  Alwasy move according to how long it has been since the last frame
  // console.log(time - lastTime);
  const delta = time - lastTime;
  // track time between calls
  lastTime = time;

  // will only one run time unless the request annimation frame is added here too. Wil update loop every time the requestAnimaitonFrame runs  - this is better than set interval for game development than  which is not as accurate or performant
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
