const dinoElem = document.querySelector("[data-dino]");

// could add more const here to control arc of jump ect.
const JUMP_SPEED = 0.45;
const GRAVITY = 0.011;
// ossolate between the 2 dion png's to make it look like they are moving
// 2 pics
const DINO_FRAME_COUNT = 2;
// the speed at which the pics change in mili seconds
const FRAME_TIME = 100;
export function updateDino(delta, speedScale) {
  // run
  handleRun();
  //jump
  handelJump();
}

export function setupDino() {
  isJumping;
}
function handleRun() {
  if (isJumping) {
  }
}
