// create and handle the player

// class is the blueprint to create many similare objects
class Bird {
  // constuctor is required and holds the blueprint info
  constructor() {
    this.x = 150;
    this.y = 200;
    // velocity y - how fast the bird falls and rises
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    // wt is the force pulling player down unless wings are flapped
    this.weight = 1;
  }
  // custom method give to the class
  // calculate position and speed of player with each annimation frame
  update() {
    /// velcity y increase, the longer if falls the faster it falls
    this.vy += this.weight;
    this.y += this.vy;
  }
  // safeguard so player dosent leave screen
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  // every time we flap wings give player a push up
  flap() {
    this.vy -= 2;
  }
}
// create instance of the class a
// new keyword will call constrcutor and create object accrording to what is in the class constructor
// this object has full access to the methods created inside of the constructor
const bird = new Bird();
