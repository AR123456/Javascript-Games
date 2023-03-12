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
      this.width = 120;
      this.height = 150;
      this.x=20;
      this.y=100;
    }
    update(){
    }
    draw(){}
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
  class Game {}
});
