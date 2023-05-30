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
      this.speedModifier = 3;
      this.spriteWidth = 255;
      this.spriteHeight = 255;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      // horizontal navigation
      this.frameX = 0;
      //vertical navigation
      this.frameY = 5;
      this.image = document.getElementById("bull");
    }

    // draw method
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        // this.frameX * this.spriteWidth,
        // this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      // debug mode for player
      if (this.game.debug) {
        // draw a circle for player
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
    }
    //  update method, make player move- call this in render on game
    update() {
      // sprite animation
      // assign dx dy -dist from mouse cursor to player
      this.dx = this.game.mouse.x - this.collisionX;
      this.dy = this.game.mouse.y - this.collisionY;
      // angle helps determine directions so player is always facing in the direction it is moving towards the mouse cursor
      const angle = Math.atan2(this.dy, this.dx); // + - pi
      // using a pie with 8 slices to know what angle represents what direction the player is facing
      if (angle < -2.74 || angle > 2.74) this.frameY = 6;
      else if (angle < -1.96) this.frameY = 7;
      else if (angle < -1.17) this.frameY = 0;
      else if (angle < -0.39) this.frameY = 1;
      else if (angle < 0.39) this.frameY = 2;
      else if (angle < 1.17) this.frameY = 3;
      else if (angle < 1.96) this.frameY = 4;
      else if (angle < 2.74) this.frameY = 5;

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

      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;
      // collisions with obstacles
      this.game.obstacles.forEach((obstacle) => {
        // reminder of order of values being put into array in the return of  collision check
        // return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
        // assign variable names using destructuring
        let [collision, distance, sumOfRadii, dx, dy] =
          this.game.checkCollision(this, obstacle);

        if (collision) {
          // create a vector or small 1 px line -point in the direction to push player back
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          // bounce back one px
          this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
    }
  }
  // blueprint for individual obstacle objects
  class Obstacle {
    constructor(game) {
      this.game = game;
      // randomize distance to center of collision area circle
      this.collisionX = Math.random() * this.game.width;
      this.collisionY = Math.random() * this.game.height;
      this.collisionRadius = 60;
      this.image = document.getElementById("obstacles");
      this.spriteWidth = 250;
      this.spriteHeight = 250;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      // center image on top of collsion circle
      this.spriteX = this.collisionX - this.width * 0.5;
      // - shift so collision point is on the "ground"
      this.spriteY = this.collisionY - this.height * 0.5 - 70;
      // sprite column
      this.frameX = Math.floor(Math.random() * 4);
      this.frameY = Math.floor(Math.random() * 3);
    }
    draw(context) {
      // draw image
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      if (this.game.debug) {
        // draw collision  circle
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
  }
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      // this is the Game object
      this.topMargin = 260;
      // adding debug mode
      this.debug = true;
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
      window.addEventListener("keydown", (e) => {
        // when d is pressed toggle debug move
        if (e.key === "d") this.debug = !this.debug;
      });
    }
    render(context) {
      // obstacles have access to draw method - draw first so they are behind player
      this.obstacles.forEach((obstacle) => obstacle.draw(context));
      this.player.draw(context);
      this.player.update();
    }
    // re usable collision detection method
    checkCollision(a, b) {
      // reuseable if name convention kept consistent
      // horizontal mid point
      const dx = a.collisionX - b.collisionX;
      // same for vertical
      const dy = a.collisionY - b.collisionY;
      // distance - hypotonuse
      const distance = Math.hypot(dy, dx);
      // is the distance in the radius of the collision circle?
      const sumOfRadii = a.collisionRadius + b.collisionRadius;
      // return true if there is a collision
      // return distance < sumOfRadii;

      // when there is a collision push the player back a pixle - do not allow through
      // change this to return an array - element with values needed to know location of collision

      return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
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
          // put some space around obstacles
          const distanceBuffer = 150;
          const sumOfRadii =
            testObstacle.collisionRadius +
            obstacle.collisionRadius +
            distanceBuffer;
          if (distance < sumOfRadii) {
            overlap = true;
          }
        });

        // also check that obstacle is not rendering off edge of screen
        const margin = testObstacle.collisionRadius * 2;
        if (
          !overlap &&
          testObstacle.spriteX > 0 &&
          testObstacle.spriteX < this.width - testObstacle.width &&
          testObstacle.collisionY > this.topMargin + margin &&
          testObstacle.collisionY < this.height - margin
        ) {
          this.obstacles.push(testObstacle);
        }
        attempts++;
      }
    }
  }
  // create instance of game object
  const game = new Game(canvas);
  game.init();
  // console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // need to draw over and over to see so calling render from inside animation loop
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
