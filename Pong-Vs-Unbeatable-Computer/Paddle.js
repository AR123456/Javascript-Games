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
}
