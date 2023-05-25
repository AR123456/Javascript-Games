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
      // modify the speed of player
      this.speedModifier = 5;
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
      // only if distance is more
      if (distance > this.speedModifier) {
        this.speedX = this.dx / distance || 0;
        this.speedY = this.dy / distance || 0;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }

      this.collisionX += this.speedX * this.speedModifier;
      this.collisionY += this.speedY * this.speedModifier;
    }
  }
  // blueprint for individual obstacle objects
  class Obstacle {
    constructor(game) {
      this.game = game;
      // randomize distance to center of collision area circle
      this.collisionX = Math.random() * this.game.width;
      this.collisionY = Math.random() * this.game.height;
      this.collisionRadius = 100;
      this.image = document.getElementById("obstacles");
    }
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
    }
  }
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      // this is the Game object
      this.player = new Player(this);
      this.numberOfObstacles = 10;
      // array to hold obstacles created
      this.obstacles = [];
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
      // obstacles have access to draw method
      this.obstacles.forEach((obstacle) => obstacle.draw(context));
    }
    init() {
      // 5 randomly created obstacles - the old way
      // for (let i = 0; i < this.numberOfObstacles; i++) {
      //   // this is the entire game object
      //   this.obstacles.push(new Obstacle(this));
      // }
      // new way circle packing algorithm - this is a brute force algorithm
      // only add circle to array if it does not overlap - danger while loop <guard rail only try 500 times
      let attempts = 0;
      while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
        let testObstacle = new Obstacle(this);
        let overlap = false;
        // console.log(testObstacle);
        // compare the test obstacle to other obstacles in the array to check for overlap
        // center point radei
        this.obstacles.forEach((obstacle) => {
          const dx = testObstacle.collisionX - obstacle.collisionX;
          const dy = testObstacle.collisionY - obstacle.collisionY;
          const distance = Math.hypot(dy, dx);
          const sumOfRadii =
            testObstacle.collisionRadius + obstacle.collisionRadius;
          if (distance < sumOfRadii) {
            overlap = true;
          }
        });
        if (!overlap) {
          this.obstacles.push(testObstacle);
        }
        attempts++;
      }
    }
  }
  // create instance of game object
  const game = new Game(canvas);
  game.init();
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // need to draw over and over to see so calling render from inside animation loop
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
