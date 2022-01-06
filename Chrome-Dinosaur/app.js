const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const worldElem = document.querySelector("[data-world]");

// set the world div to scale based on screen size
setPixelToWorldScale();
// call the sizeing function every time the window is resized
window.addEventListener("resize", setPixelToWorldScale);
// update all the stuff on the screen
function update(time) {
  //update loop
}
// refresh based on refresh rate of browser and monitor
window.requestAnimationFrame(update);

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    //if the window is wider than the world ratio we need pixel scale based on width
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    // use window height for ratio
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
