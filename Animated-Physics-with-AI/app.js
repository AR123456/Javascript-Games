// sizing canvas with js- load art after loading
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  // set element and drawing surface of canvas to same dimensions
  canvas.width = 1280;
  canvas.height = 720;
  ctx.fillStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";

  //OOP make it modular
  class Player {
    constructor(game) {
      this.game = game;
      // hit box position in game area- circular hit box in this game
      this.collisionX = this.game.width * 0.5;
      this.collisionY = this.game.height * 0.5;
      // size of hit box
      this.collisionRadius = 50;
      this.speedX = 0;
      this.speedY = 0;
      // distances between mouse and player
      this.dx = 0;
      this.dy = 0;
    }
    // draw method
    draw(context) {
      // draw a circle
      context.beginPath();
      context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2
      );
      context.save();
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
      // draw line off player to show direction of movement
      context.beginPath();
      context.moveTo(this.collisionX, this.collisionY);
      context.lineTo(this.game.mouse.x, this.game.mouse.y);
      context.stroke();
    }
    //  update method, make player move- call this in render on game
    update() {
      // assign dx dy
      this.dx = this.game.mouse.x - this.collisionX;
      this.dy = this.game.mouse.y - this.collisionY;
      // calculate speed of x and y
      // Math.hypot() expects y first then x
      const distance = Math.hypot(this.dy, this.dx);
      this.speedX = this.dx / distance || 0;
      this.speedY = this.dy / distance || 0;
      this.collisionX += this.speedX;
      this.collisionY += this.speedY;
    }
  }
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      // this is the Game object
      this.player = new Player(this);
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };
      //event listeners
      // es6 so addEventListener remembers game
      canvas.addEventListener("mousedown", (e) => {
        // get coordinates of click to use on game object event offset- so avalable to all of codebase
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = true;
      });
      canvas.addEventListener("mouseup", (e) => {
        // get coordinates of click to use on game object event offset- so avalable to all of codebase
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = false;
      });
      canvas.addEventListener("mousemove", (e) => {
        // only move player when mouse is pressed
        if (this.mouse.pressed) {
          //move
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      });
    }
    render(context) {
      this.player.draw(context);
      this.player.update();
    }
  }
  // create instance of game object
  const game = new Game(canvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // need to draw over and over to see so calling render from inside animation loop
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
