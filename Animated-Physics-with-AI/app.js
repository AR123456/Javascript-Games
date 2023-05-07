// sizing canvas with js- load art after loading
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  // set element and drawing surface of canvas to same dimensions
  canvas.width = 1280;
  canvas.height = 720;
  //OOP make it modular
  class Player {
    constructor(game) {
      this.game = game;
    }
    // draw method
    draw(context) {
      // draw a circle
      context.beginPath();
      context.arc(400, 400, 50, 0, Math.PI * 2);
      context.fill();
    }
  }
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      // this is the Game object
      this.player = new Player(this);
    }
    render(context) {
      this.player.draw(context);
    }
  }
  // create instance of game object
  const game = new Game(canvas);
  game.render(ctx);

  function animate() {}
});
