const birdElem = document.querySelector("[data-bird]");
const BIRD_SPEED = 0.5;
// 125 mili seconds
const JUMP_DURATION = 125;
//set to largest number possible
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird() {
  //this is the start function setting bird place on screen at game start
  // put the bird in the middle of the screen
  setTop(window.innerHeight / 2);
  // add an event listener on keydown but need to remove the prior event first. to avoid componunding event listeners
  document.removeEventListener("keydown", handleJump);
  document.addEventListener("keydown", handleJump);
}
export function updateBird(delta) {
  // bird falls by default, pass in the speed and use delta to account for frame changes
  if (timeSinceLastJump < JUMP_DURATION) {
    // make bird go up intead of down
    setTop(getTop() - BIRD_SPEED * delta);
  } else {
    // move the bird down
    setTop(getTop() + BIRD_SPEED * delta);
  }

  timeSinceLastJump += delta;

  console.log(getTop());
}
export function getBirdRect() {
  //return the position of bird on the screen
  // top left bottom rignt
  return birdElem.getBoundingClientRect();
}
function setTop(top) {
  // take in the top values to set the bird top in the css
  birdElem.style.setProperty("--bird-top", top);
}
function getTop() {
  // the birdEle property is actually computed so need to use this syntax to get it
  // need to make sure this returns a number
  return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"));
}
function handleJump(e) {
  // check to see if the code is the space bar
  if (e.code !== "Space") return;
  timeSinceLastJump = 0;
}
