// computers max speed
const SPEED = 0.02;
// Paddle constructor
export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
  }

  //setting postion of player paddle with getter and setter
  get position() {
    // just like with the ball except --position is the CSS var for the paddle (from the top)
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  update(delta, ballHeight) {
    //paddle needs to follow where ball is on screen need to limit the computer to a max speed or it would always win.
    // incremtht position by speee*delta
    // up down determined by the postion of the ball relative to paddle and go that way
    this.position += SPEED * delta * (ballHeight - this.position);
    //
  }
}
