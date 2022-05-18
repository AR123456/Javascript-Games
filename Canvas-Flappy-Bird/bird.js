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
    //https://www.youtube.com/watch?v=lGJ9i6CYKyQ
  }
}
