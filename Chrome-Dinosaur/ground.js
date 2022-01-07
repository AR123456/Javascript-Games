import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";
const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300);
}

export function updateGround(delta) {
  // pass in the ground element and the CSS var of --left
  // this is moving the ground to the left
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * SPEED * -1);
    // has the ground moved all the way off the left edge of the screen
    if (getCustomProperty(ground, "--left") <= -300) {
      //loop around ad put on end of first ground pic array
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}
