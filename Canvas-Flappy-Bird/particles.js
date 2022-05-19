// generative art

// particlesArray holds objects
const particlesArray = [];

// bird comming from bird js
class Particle {
  constructor() {
    // blueprint
    // begin the partices from where the bird is
    this.x = bird.x;
    this.y = bird.y;
    //  size of particle random number betwee 3 and 10
    this.size = Math.floor(Math.random() * 7 + 3);
    // the speed that the particles float up (like smoke ) vertical rand number between  0.5 and - 0.5
    this.speedY = Math.random() * 1 - 0.5;
    // using red for now
    this.color = "red";
  }
  // will calculate positon for each particle for each frame of annimation
  update() {
    // getting gamespeed from main.js particles will move left as game scrolls by
    this.x -= gamespeed;
    // moving up and down slightly and spread
    this.y += this.speedY;
  }
  // draw will
  draw() {
    //
    ctx.fillStyle = this.color;
    // to start drawing
    ctx.beginPath();
    // draw circle
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // add color to path
    ctx.fill();
  }
}
//
function handleParticles() {
  // useing unshift array method and passing in new Prarticle
  particlesArray.unshift(new Particle());
  // cycle through the array and for each run methods
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  // if particles array gets this big, remove some
  if (particlesArray.length > 200) {
    // cycle through and call pop to remove particles
    for (let i = 0; i < 20; i++) {
      // remove the last el from the array splice is an alternative to pop
      particlesArray.pop(particlesArray[i]);
    }
  }
}
