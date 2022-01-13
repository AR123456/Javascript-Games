import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

// cactus speed needs to be same as ground
const SPEED = 0.05;
// time before generating a new cactus
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  // get all the cacti on the screen and remove them
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedScale) {
  // draw and move the cacti
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    //   note this is the same speed as ground
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);
    // is the cactus way off the edge of the screen?
    if (getCustomProperty(cactus, "--left") <= -100) {
      // its off screen so get rid of if so it dosent slow down the game
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    // need a new cacttus
    createCactus();
    // as game speeds up the cacus generation also speeds up
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale;
  }
  // constantly making this number smaller
  nextCactusTime -= delta;
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.src = "./imgs/cactus.png";
  cactus.classList.add("cactus");
  // by default all the way on the right side os screen

  setCustomProperty(cactus, "--left", 100);
  worldElem.append(cactus);
}
function randomNumberBetween(min, max) {
  // the lowest number possible is the min
  return Math.floor(Math.random() * (max - min + 1) + min);
}
