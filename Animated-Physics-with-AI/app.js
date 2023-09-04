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
      this.collisionRadius = 30;
      this.speedX = 0;
      this.speedY = 0;
      // distances between mouse and player
      this.dx = 0;
      this.dy = 0;
      // modify the speed of player
      this.speedModifier = 3;
      this.spriteWidth = 255;
      this.spriteHeight = 256;
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
    // Player draw method
    draw(context) {
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
      // angle helps determine directions so player is always facing
      // in the direction it is moving towards the mouse cursor
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
      // add horizontal boundaries to game area
      if (this.collisionX < this.collisionRadius)
        this.collisionX = this.collisionRadius;
      else if (this.collisionX > this.game.width - this.collisionRadius)
        this.collisionX = this.game.width - this.collisionRadius;
      // vertical boundaries
      if (this.collisionY < this.game.topMargin + this.collisionRadius)
        this.collisionY = this.game.topMargin + this.collisionRadius;
      else if (this.collisionY > this.game.height - this.collisionRadius)
        this.collisionY = this.game.height - this.collisionRadius;
      // collisions with obstacles
      this.game.obstacles.forEach((obstacle) => {
        // order of values being put into array in the return of  collision check
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
      this.collisionRadius = 40;
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
      // draw ofstacel image
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
    update() {
      // could animate sprite sheets of obstacles here
    }
  }
  // adding the Egg
  class Egg {
    constructor(game) {
      this.game = game;
      this.collisionRadius = 40;
      this.margin = this.collisionRadius * 2;
      this.collisionX =
        this.margin + Math.random() * (this.game.width - this.margin * 2);
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin - this.margin);
      this.image = document.getElementById("egg");
      this.spriteHeight = 110;
      this.spriteWidth = 135;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      // adjust this later for eg shape - moving this to update method but need to declare here
      // this.spriteX = this.collisionX - this.width * 0.5;
      // this.spriteY = this.collisionY - this.height * 0.5 - 30;
      this.spriteX;
      this.spriteY;
    }
    draw(context) {
      context.drawImage(this.image, this.spriteX, this.spriteY);
      //TODO make this a re usable helper
      if (this.game.debug) {
        // draw a circle for egg
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
    update() {
      // keep the debug circle collison area with the egg- declaired in the constructor
      // adjust this later for eg shape
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 30;
      //TODO can this be a re usable function slide around 2:09
      // eggs can be pushed around
      // array of objects that eggs can interact with
      // adding enemies here makes them solid and impassable so enemies pass eggs around
      let collisionObjects = [
        this.game.player,
        ...this.game.obstacles,
        ...this.game.enemies,
      ];
      // for every player and individual objects
      collisionObjects.forEach((object) => {
        // destructure the object into these variables
        let [collision, distance, sumOfRadii, dx, dy] =
          this.game.checkCollision(this, object);
        // if there is a collision use the variable to determine how far and in what direction to push egg
        // distance is hypotenuse
        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
    }
  }
  class Enemy {
    constructor(game) {
      this.game = game;
      this.collisionRadius = 30;

      this.speedX = Math.random() * 3 + 0.5;
      this.image = document.getElementById("toad");
      this.spriteWidth = 140;
      this.spriteHeight = 260;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.collisionX =
        this.game.width + this.width + Math.random() * this.game.width * 0.5;
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin);
      // position of sprite sheet image in relation to collision circle coordinate
      this.spriteX;
      this.spriteY;
    }
    draw(context) {
      context.drawImage(this.image, this.spriteX, this.spriteY);
      //TODO make this a re usable helper
      if (this.game.debug) {
        // draw a circle for egg
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
    update() {
      // center and offset the drawn enemies
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height + 40;
      //move enemy to left by random speed
      this.collisionX -= this.speedX;
      // keep from moving off right side of screen
      if (this.spriteX + this.width < 0) {
        // re use object if you can vs creating new that later needs to be distroyed
        this.collisionX =
          this.game.width + this.width + Math.random() * this.game.width * 0.5;
        this.collisionY =
          this.game.topMargin +
          Math.random() * (this.game.height - this.game.topMargin);
      }
      //TODO can this be a re usable function slide around 2:09
      // re using this code from the egg class to make enemies treat obstacles and player as solid impassable object and slide around them
      // adding eggs to the collisionsObjects here makes them solid and impassable obstacles for enemies
      // let collisionObjects = [
      //   this.game.player,
      //   ...this.game.obstacles,
      //   ...this.game.eggs,
      // ];
      let collisionObjects = [this.game.player, ...this.game.obstacles];
      // for every player and indivitual objects
      collisionObjects.forEach((object) => {
        // destructure the object into these variables
        let [collision, distance, sumOfRadii, dx, dy] =
          this.game.checkCollision(this, object);
        // if there is a collision use the variable to determine how far and in what direction to push egg
        // distance is hypotenuse
        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });

      ///
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
      // helpers to use deltaTime to set frame rate
      this.fps = 70;
      // starts at 0
      this.timer = 0;
      // when interval is reached, timer will be reset back to 0
      this.interval = 1000 / this.fps;
      this.eggTimer = 0;
      this.eggInterval = 1000;
      this.numberOfObstacles = 10;
      this.maxEggs = 20;
      // array to hold obstacles created
      this.obstacles = [];
      // hold eggs created
      this.eggs = [];
      // enemy objects
      this.enemies = [];
      // to give the illusion of depth by putting into an array then sort based on vertical coordinates
      this.gameObjects = [];
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
    render(context, deltaTime) {
      // to give the illusion of depth by putting into an array then sort based on vertical coordinates
      // if the timer is more that the interval
      if (this.timer > this.interval) {
        // animate the next frame
        // clear paint
        context.clearRect(0, 0, this.width, this.height);
        // expand into game oject this order puts player behind eggs and obstacles
        this.gameObjects = [
          this.player,
          ...this.eggs,
          ...this.obstacles,
          ...this.enemies,
        ];
        // sort by vertical position - do this before drawing
        // if nothing is passed into sort method JS will turn into string and sort by unicode value
        this.gameObjects.sort((a, b) => {
          // sort based on the center point of collision area
          return a.collisionY - b.collisionY;
          // could also sort by value of bottom of sprite image which would be the value of spriteY + sprite hight
        });
        this.gameObjects.forEach((object) => {
          object.draw(context);
          object.update();
        });

        this.timer = 0;
      }
      // increase timer by delta time
      this.timer += deltaTime;
      // add eggs periodically
      if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs) {
        this.addEgg();
        this.eggTimer = 0;
      } else {
        this.eggTimer += deltaTime;
      }
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

    // method to periodically add a new egg to game
    addEgg() {
      // in game object so need this keyword
      this.eggs.push(new Egg(this));
    }
    // game class to add enemy
    addEnemy() {
      //push a new enemy object into the array
      this.enemies.push(new Enemy(this));
    }
    init() {
      // create enemies
      for (let i = 0; i < 3; i++) {
        this.addEnemy();
      }
      //  circle packing algorithm - this is a brute force algorithm
      // only add circle to array if it does not overlap - danger while loop <guard rail only try 500 times
      let attempts = 0;
      while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
        let testObstacle = new Obstacle(this);
        let overlap = false;
        // console.log(testObstacle);
        // compare the test obstacle to other obstacles in the array to check for overlap
        // center point radi
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
        const margin = testObstacle.collisionRadius * 3;
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
  // ref to time stamp of previous animation loop
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    // them reassign back to current timeStamp
    lastTime = timeStamp;

    // need to draw over and over to see so calling render from inside animation loop
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  // on first loop time stamp needs to be 0
  animate(0);
});
