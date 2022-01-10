const dinoElem = document.querySelector("[data-dino]");

// could add more const here to control arc of jump ect.
const JUMP_SPEED = 0.45;
const GRAVITY = 0.011;
// ossolate between the 2 dion png's to make it look like they are moving
// 2 pics
const DINO_FRAME_COUNT = 2;
// the speed at which the pics change in mili seconds
const FRAME_TIME = 100;
let isJumping, dinoFrame, currentFrameTime;

export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
}
export function updateDino(delta, speedScale) {
  // run
  handleRun(delta, speedScale);
  //jump
  handleJump();
}
function handleRun(delta, speedScale) {
  // the image to show when in the air or jumping
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`;
    return;
  }
  // not jumping here so we are running
  //ossilate the animation
  // is the currentFrametime greater than the const (100) FRAME_TIME ?
  // if it is then swap frames (pngs)
  if (currentFrameTime >= FRAME_TIME) {
    //swtich to other pic
    // modulo ensures looping back automatically
    // update frame to next frame
    // updating this way would work if we had more frames in the annimation vs hard coding 0 and 2 for dinoFrame and DINO_FRAME_COUNT
    // console.log("before", dinoFrame);
    // 0 + 1 % 2
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    // console.log("after", dinoFrame);
    // this works due to naming convention dino-run-1 or -0.png
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
    // reset to 0
    currentFrameTime -= FRAME_TIME;
  }
  // slowly speed up the dinos run increment the currentFrameTime
  currentFrameTime += delta * speedScale;
}

function handleJump() {}
