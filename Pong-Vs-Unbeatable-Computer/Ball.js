// initially the velocity is .025, if this is set diffrently game may be too fast or slow
const INITIAL_VELOCITY = 0.025;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  get x() {
    // x is defined in CSS as a CSS variable
    // turn css into a javascript usable upnber
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }
  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }
  // function to find the position of the ball
  rect() {
    return this.ballElem.getBoundingClientRect();
  }
  // reset function to set x,y velocity and direction when ball is created in constructor
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x <= 0.2) ||
      Math.abs(this.direction.x >= 0.9)
    ) {
      // get the heading 0 -360 deg as a readiant - so cosin and sin can be used to determine the x and y
      const heading = randomNumberBetween(0, 2 * Math.PI);
      // unit vector for the directions
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    // this console log is an x y object
    // console.log(this.direction);
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta) {
    // update the x and y position of the ball - in % away from top left corner
    // update the velocity and direction of movement
    // take the direction we are going in and multiply it by the velocity and move the x postition that much. Multiply by the delta is important. If we have long delays between frame animations we want to move the ball in a larger increment, if a short delay move in a smaller increment
    // https://www.youtube.com/watch?v=PeY6lXPrPaA
    this.x += this.direction.x * this.velocity * delta;
    // do same for y
    this.y += this.direction.y * this.velocity * delta;
    const rect = this.rect();
    // check the balls positon (rect) and if it is outside of the upper or lowwer bounds of the window ...
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      // flip the y direction(by multiplying by -1) - this is the bounce off the top or bottom
      this.direction.y *= -1;
    }
    if (rect.right >= window.innerWidth || rect.left <= 0) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
