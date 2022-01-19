export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  // helper functions to set x and y
  //getter
  get x() {
    // x is defined in CSS as a CSS variable
    // turn css into a javascript usable upnber
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }
  // setter
  set x(value) {
    //
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }
  // reset function will allow us to set x,y velocity and direction  when ball is created in the constructor
  reset() {
    this.x = 50;
    this.y = 50;
    // the length is always one in this calculation unit vector
    // https://www.youtube.com/watch?v=PeY6lXPrPaA
    // unit vector movment in direction of a
    // vector allows for direction and speed to differ and not increase oneanother
    this.direction = { x: 0 };
    // the while loop is looking at x or horizontal movement if not very far do what is in the while loop which will introduce move movement in x and y directtions
    while (
      Math.abs(this.direction.x <= 0.2) ||
      Math.abs(this.direction.x >= 0.9)
    ) {
      // get the heading 0 -360 deg as a readiant - so cosin and sin can be used to determine the x and y
      const heading = randomNumberBetween(0, 2 * Math.PI);
      // unit vector for the directions
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    // this console log is an object
    console.log(this.direction);
  }

  update(delta) {
    // update the x and y position of the ball - in % away from top left corner
    // update the velocity and direction of movement
    this.x = 5;
    this.y = 15;
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
