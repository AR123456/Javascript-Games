const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const worldElem = document.querySelector("[data-world]");

// set the world div to scale based on screen size
setPixelToWorldScale();
// call the sizeing function every time the window is resized
window.addEventListener("resize", setPixelToWorldScale);
// update all the stuff on the screen
let lastTime;
function update(time) {
  // doing this for first time through to avoid problem with large delta at start of the game
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  // get the time between updates in case update is slow
  // to scale move based on time of frame rate
  // time goes up so time - last time is time between
  const delta = time - lastTime;
  //   console.log(delta);
  lastTime = time;
  //update loop
  window.requestAnimationFrame(update);
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
