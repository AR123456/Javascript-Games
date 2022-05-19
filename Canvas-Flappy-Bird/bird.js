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
    // this will have the bird move up and down sligtly
    // cycling between -1 and + 1 over and over - trigonometry
    let curve = Math.sin(angle) * 20;

    // if to keep on canvas and puts space between bottom and bird
    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      /// velcity y increase, the longer if falls the faster it falls
      this.vy += this.weight;
      // slow the speed at which player speed increases down a little bit
      this.vy *= 0.9;
      this.y += this.vy;
    }
    // limit to keep from going off the top of the canvas
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      // set velocity to 0 so player dosent stick to the top
      this.vy = 0;
    }
    // if spacebar pressed is true call flap method also add some wobble at the top
    if (spacePressed && this.y > this.height * 3) this.flap();
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
