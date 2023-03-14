window.addEventListener("load", function () {
  // when building games make sure the whole page has been loaded including style sheet and images
  // wait until the page loads to setup the canvas
  // set up canvas
  const canvas = this.document.getElementById("canvas1");
  // the drawing context object contains all methods and properties to draw and animate on HTML canvas
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  // specified user inputs - keyboard actions
  class InputHandler {
    constructor(game) {
      this.game = game;
      //apply event listener - using es6 to bind to context so JS remembers what this.game.keys is
      window.addEventListener("keydown", (e) => {
        // add on key up but only if it is not already there
        if (
          (e.key === "ArrowUp" || e.key === "ArrowDown") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        }

        console.log(this.game.keys);
      });
      // event listener to remove on keyup
      window.addEventListener("keyup", (e) => {
        // if the array contains the key being released -slice it out
        if (this.game.keys.indexOf(e.key) > -1) {
          // splice takes in the index of the key we want to remove , and the delete count
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
        console.log(this.game.keys);
      });
    }
  }
  // player lazers
  class Projectile {
    // constructor will need game object and starting x,y coordinates
    constructor(game, x, y) {
      // convert the arguments passed into class properties
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      // 3 px per frame
      this.speed = 3;
    }
  }
  // falling scresn nuts and bolts
  class Particle {}
  // main character sprite sheet animation
  class Player {
    // player needs game dimensions
    constructor(game) {
      this.game = game;
      // w and h of single sprite on sheet
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      // current speed
      this.speedY = 0;
      // max speed
      this.maxSpeed = 3;
    }
    update() {
      // player can check keypresses passed to Player from Game
      // move player upd and down
      if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes("ArrowDown"))
        this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
    }
    draw(context) {
      // player graphics
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  // enemy types
  class Enemy {}
  // inividual background layers
  class Layer {}
  // pull layer objects together to animate the game world

  class Background {}
  // score timer and other info
  class UI {}
  // main game class where all logic comes together
  class Game {
    // brain of project
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      // instantiate the input handler
      this.input = new InputHandler(this);
      // array to keep track of key presses- it is available to whole game
      this.keys = [];
    }
    update() {
      // this is the Player()'s update
      this.player.update();
    }
    draw(context) {
      // this is the PLayer()'s draw method
      this.player.draw(context);
    }
  }
  // call the Game class constructor
  const game = new Game(canvas.width, canvas.height);
  // animation loop to re draw game every 60 miliseconds
  function animate() {
    // clear the prior animation then draw this loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    // call next animation frame - pass in itself to make loop endless
    requestAnimationFrame(animate);
  }
  animate();
});
