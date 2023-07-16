// sizing canvas with js- load art after loading
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  // set element and drawing surface of canvas to same dimensions
  canvas.width = 1280;
  canvas.height = 720;
  ctx.fillStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  // font drawing and re drawing are resource intensive
  ctx.font = "40px Helvetica";
  ctx.textAlign = "center";
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
      // center image on top of collision circle
      this.spriteX = this.collisionX - this.width * 0.5;
      // - shift so collision point is on the "ground"
      this.spriteY = this.collisionY - this.height * 0.5 - 70;
      // sprite column
      this.frameX = Math.floor(Math.random() * 4);
      this.frameY = Math.floor(Math.random() * 3);
    }
    draw(context) {
      // draw obstacle image
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
      this.spriteX;
      this.spriteY;
      // egg hatching logic
      this.hatchTimer = 0;
      this.hatchInterval = 3000;
      //  hatched eggs so they can be removed
      this.markedForDeletion = false;
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
        const displayTimer = (this.hatchTimer * 0.001).toFixed(0);
        context.fillText(
          displayTimer,
          this.collisionX,
          this.collisionY - this.collisionRadius * 2.5
        );
      }
    }
    update(deltaTime) {
      // keep the debug circle collision area with the egg- declared in the constructor
      // adjust this later for egg shape
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 30;
      ///////////////collisions
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
      //////////////////////////hatching
      if (this.hatchTimer > this.hatchInterval) {
        // the egg has hatched so push larva to a new array
        this.game.hatchlings.push(
          new Larva(this.game, this.collisionX, this.collisionY)
        );
        this.markedForDeletion = true;
        // for efficiency restructure the array here when something actually gets marked vs checking for the markedForDeletion in every animation frame - this custom method is defined in the main game class below
        this.game.removeGameObjects();
      } else {
        this.hatchTimer += deltaTime;
      }
    }
  }
  // eggs hatch into Larva that player protects by pushing to safe area
  class Larva {
    constructor(game, x, y) {
      // larva appear at same position as the egg they hatched from
      this.game = game;
      this.collisionX = x;
      this.collisionY = y;
      this.collisionRadius = 30;
      this.image = document.getElementById("larva");
      this.spriteWidth = 150;
      this.spriteHeight = 150;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      // vertical speed
      this.speedY = 1 + Math.random();
      // randomize drawing the 2 sprites on the sprite sheet
      this.frameX = 0;
      this.frameY = Math.floor(Math.random() * 2);
    }
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
      //TODO make this a re usable helper
      if (this.game.debug) {
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
      this.collisionY -= this.speedY;
      // changing the position of the larva
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 50;
      // larva are safe if the reach the mushroom forest
      if (this.collisionY < this.game.topMargin) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
        // if larva are protected and reach safety increment score
        this.game.score++;
        // swarm of 3 fireflys
        for (let i = 0; i < 3; i++) {
          this.game.particles.push(
            new Firefly(this.game, this.collisionX, this.collisionY, "yellow")
          );
        }
      }
      /////////////collision with objects
      //TODO can this be a re usable function slide around 2:09 , 2:26
      // larva will avoid player and obstacles, player will be able to push larva around
      let collisionObjects = [
        this.game.player,
        ...this.game.obstacles,
        // ...this.game.enemies,
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
      /////////////// collision with enemies
      this.game.enemies.forEach((enemy) => {
        // [collision, distance, sumOfRadii, dx, dy] index 0 is the collision
        if (this.game.checkCollision(this, enemy)[0]) {
          this.markedForDeletion = true;
          // filter larva out of hatchlings array
          this.game.removeGameObjects();
          // track hatchlings lost
          this.game.lostHatchlings++;
          // swarm of 3 sparks
          for (let i = 0; i < 3; i++) {
            this.game.particles.push(
              new Spark(this.game, this.collisionX, this.collisionY, "blue")
            );
          }
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
        // re use object if you can vs creating new that later needs to be destroyed
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
  // super or parent class
  class Particle {
    constructor(game, x, y, color) {
      // convert arguments to class properties
      this.game = game;
      this.collisionX = x;
      this.collisionY = y;
      this.color = color;
      // this is resource intensive because we will be creating thousands of random particles in the game - use object pooling to get around this
      this.radius = Math.floor(Math.random() * 10 + 5);
      // vertical speed
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 2 + 0.5;
      // trig for floating and swirling
      this.angle = 0;
      //how fast the angle is increasing
      this.va = Math.random() * 0.1 + 0.01;

      this.markedForDeletion = false;
    }
    // share draw method for all Fireflys and sparks
    draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.beginPath();
      //Math.PI*2 is a full circle in radiants
      context.arc(
        this.collisionX,
        this.collisionY,
        this.radius,
        0,
        Math.PI * 2
      );
      context.fill();
      context.stroke();
      context.restore();
    }
  }
  //child or sub class
  class Firefly extends Particle {
    // will use the draw method and constructor from the parent (Particel) class
    update() {
      // float up and sway right and left
      //increase angle by the angle velocity each animation frame
      this.angle += this.va;
      // x can be positive or negative so can go right or left
      // using cos to get a wavy motion
      this.collisionX += Math.cos(this.angle) * this.speedX;
      // float up
      this.collisionY -= this.speedY;
      // if the firefly moves past top edge of game area remove it
      if (this.collisionY < 0 - this.radius) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
      }
    }
  }
  //child or sub class
  class Spark extends Particle {
    // will use the draw method and constructor from the parent (Particel) class
    update() {
      this.angle += this.va * 0.5;
      this.collisionX -= Math.cos(this.angle) * this.speedX;
      this.collisionY -= Math.sin(this.angle) * this.speedY;
      //shrink the sparks
      if (this.radius > 0.1) this.radius -= 0.05;
      if (this.radius < 0.2) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
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
      // holder for hatchlings- when egg hatches push larva here
      this.hatchlings = [];
      // holder for active particles
      this.particles = [];
      // to give the illusion of depth by putting into an array then sort based on vertical coordinates
      this.gameObjects = [];
      // keeping track of game score
      this.score = 0;
      this.lostHatchlings = 0;
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };
      //event listeners es6 so addEventListener remembers game
      canvas.addEventListener("mousedown", (e) => {
        // get coordinates of click to use on game object event offset- so available to all of codebase
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = true;
      });
      canvas.addEventListener("mouseup", (e) => {
        // get coordinates of click to use on game object event offset- so available to all of codebase
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = false;
      });
      canvas.addEventListener("mousemove", (e) => {
        // only move player when mouse is pressed
        if (this.mouse.pressed) {
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
        // animate the next frame clear paint
        context.clearRect(0, 0, this.width, this.height);
        // expand into game oject this order puts player behind eggs and obstacles
        this.gameObjects = [
          this.player,
          ...this.eggs,
          ...this.obstacles,
          ...this.enemies,
          ...this.hatchlings,
          ...this.particles,
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
          object.update(deltaTime);
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
      // draw status text
      context.save();
      context.textAlign = "left";
      context.fillText(`Score ${this.score}`, 25, 50);
      if (this.debug) {
        context.fillText(`Lost ${this.lostHatchlings}`, 25, 100);
      }
      context.restore();
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
      // when there is a collision push the player back a pixel - do not allow through
      // array - values needed to know location of collision
      return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
    }
    // periodically add a new egg to game
    addEgg() {
      // in game object so need this keyword
      this.eggs.push(new Egg(this));
    }
    // game class to add enemy
    addEnemy() {
      //push a new enemy object into the array
      this.enemies.push(new Enemy(this));
    }
    // method to remove things marked for deletion
    removeGameObjects() {
      // return array with marked for deletion filtered out
      this.eggs = this.eggs.filter((object) => !object.markedForDeletion);
      this.hatchlings = this.hatchlings.filter(
        (object) => !object.markedForDeletion
      );
      this.particles = this.particles.filter(
        (object) => !object.markedForDeletion
      );
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
        // check for overlap center point radi
        this.obstacles.forEach((obstacle) => {
          const dx = testObstacle.collisionX - obstacle.collisionX;
          const dy = testObstacle.collisionY - obstacle.collisionY;
          const distance = Math.hypot(dy, dx);
          // space around obstacles
          const distanceBuffer = 150;
          const sumOfRadii =
            testObstacle.collisionRadius +
            obstacle.collisionRadius +
            distanceBuffer;
          if (distance < sumOfRadii) {
            overlap = true;
          }
        });
        //check that obstacle is not rendering off screen
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
    // reassign back to current timeStamp
    lastTime = timeStamp;
    // call render from inside animation loop
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  // on first loop time stamp needs to be 0
  animate(0);
});
