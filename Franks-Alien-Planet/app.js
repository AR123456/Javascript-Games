window.addEventListener("load", function () {
  // when building games make sure the whole page has been loaded including style sheet and images
  // wait until the page loads to setup the canvas
  // set up canvas
  const canvas = this.document.getElementById("canvas1");
  // the drawing context object contains all methods and properties to draw and animate on HTML canvas
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  // specified user inputs
  class InputHandler {}
  // olayer lazers
  class Projectile {}
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
      this.speedY = 0;
    }
    update() {
      // move player around
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
});
