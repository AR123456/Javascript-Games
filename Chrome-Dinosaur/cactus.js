import { setCustomProperty } from "./updateCustomProperty.js";

// cactus speed needs to be same as ground
const SPEED = 0.05;
// time before generating a new cactus
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
}

export function updateCactus(delta, speedScale) {
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
