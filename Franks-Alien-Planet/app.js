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
        } else if (e.key === " ") {
          this.game.player.shootTop();
        }
      });
      // event listener to remove on keyup
      window.addEventListener("keyup", (e) => {
        // if the array contains the key being released -slice it out
        if (this.game.keys.indexOf(e.key) > -1) {
          // splice takes in the index of the key we want to remove , and the delete count
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
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
      this.markedForDeletion = false;
    }
    update() {
      this.x += this.speed;
      // if the projectile moves out of game area horizontally remove it
      if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
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
      // hold active projectile objects
      this.projectiles = [];
    }
    update() {
      // player can check keypresses passed to Player from Game
      // move player upd and down
      if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes("ArrowDown"))
        this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      // handle projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });
      // use filter method to remove projectiles from array - filter out not marked for deletion
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
    }
    draw(context) {
      // player graphics
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      // handle projectiles
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
    }
    // custom methods on Player class for attack modes
    shootTop() {
      // put some logic in place to dwindle shooting power that can be slowly replenished
      if (this.game.ammo > 0) {
        // shoot projectiles from mouth of seahorse - pass in players position
        this.projectiles.push(
          //  adding to x and y contoles where projectiles start in relation to player
          new Projectile(this.game, this.x + 80, this.y + 30)
        );
        this.game.ammo--;
      }
    }
  }
  // enemy types
  // some Enemys will offer powerups
  class Enemy {
    constructor(game) {
      // will have sub classes of enemies but all enemies will need this stuff
      this.game = game;
      // horizontal entry point
      this.x = this.game.width;
      // ransomized horizontal speed was 1.5- 0.5
      this.speedX = Math.random() * 1.5 - 1.5;

      this.markedForDeletion = false;
      this.lives = 5;
      this.score = this.lives;
    }
    update() {
      // move enemies from right to left
      this.x += this.speedX;
      // if enemy gets to left edge of screen remove it
      if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = "black";
      context.font = "20px Helvetica";
      context.fillText(this.lives, this.x, this.y);
    }
  }
  class Angler1 extends Enemy {
    constructor(game) {
      // get all the stuff from Enemy first
      super(game);
      this.width = 228 * 0.2;
      this.height = 169 * 0.2;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
    }
  }
  // inividual background layers
  class Layer {}
  // pull layer objects together to animate the game world

  class Background {}
  // score timer and other info
  class UI {
    // show user how much ammo they have
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = "Helvetica";
      this.color = "white";
    }
    draw(context) {
      context.save();
      this.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.font = this.fontSize = "px " + this.fontFamily;
      // score
      context.fillText("Score: " + this.game.score, 20, 40);
      // ammo

      for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }
      // timer
      context.fillText("Timer: " + this.game.gameTime, 20, 100);
      // game over message
      if (this.game.gameOver) {
        context.textAlign = "center";
        let message1;
        let message2;
        if (this.game.score > this.game.winningScore) {
          message1 = "You Win ! ";
          message2 = "Well done ";
        } else {
          message1 = "You lost";
          message2 = "Try again next time";
        }
        // draw the messages
        context.font = "50px" + this.fontFamily;
        context.fillText(
          message1,
          this.game.width * 0.5,
          this.game.height * 0.5 - 40
        );
        context.font = "25px" + this.fontFamily;
        context.fillText(
          message2,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      }
      context.restore();
    }
  }
  // main game class where all logic comes together
  class Game {
    // brain of project
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      // instantiate the input handler
      this.input = new InputHandler(this);
      // user interface - "this" is game
      this.ui = new UI(this);
      // array to keep track of key presses- it is available to whole game
      this.keys = [];
      // all active enimies
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.ammo = 20;
      // limit how much ammo can accumulate
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      // replenish ammo every 1/2 second
      this.ammoInterval = 500;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10;
      // put time limit on game
      this.gameTime = 0;
      this.timeLimit = 5000;
    }

    update(deltaTime) {
      // how many milisec have passed since game began
      if (!this.gameOver) this.gameTime += deltaTime;
      // if game gets to the time limit it is over
      if (this.gameTime > this.timeLimit) this.gameOver = true;
      // this is the Player()'s update
      this.player.update();
      // trigger replenish ammo
      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) this.ammo++;
        // after adding to ammo set timer back to 0
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        // call update method for every enemy in array
        enemy.update();
        // check for collison with player
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
        }
        // check for collision with projectiles
        this.player.projectiles.forEach((projectile) => {
          /// check for collison
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            projectile.markedForDeletion = true;
            if (enemy.lives <= 0) {
              enemy.markedForDeletion = true;
              // different scores for different enemies
              this.score += enemy.score;
              if (this.score > this.winningScore) this.gameOver = true;
            }
          }
        });
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      // add enemies to UI
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        // call add enemy method
        this.addEnemy();
        // reset to 0 for next time
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      // this is the PLayer()'s draw method
      this.player.draw(context);
      this.ui.draw(context);
      this.enemies.forEach((enemy) => {
        // call draw on each enemy
        enemy.draw(context);
      });
    }
    // add enemy method here of game clas
    addEnemy() {
      // note that "this" is game
      this.enemies.push(new Angler1(this));
    }
    // collsion detection method -takes 2 objects
    checkCollision(rect1, rect2) {
      // return true if they collide
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      );
    }
  }
  // call the Game class constructor
  const game = new Game(canvas.width, canvas.height);

  // store values of time stamp from previous animation loop
  let lastTime = 0;
  // animation loop to re draw game every 60 miliseconds
  // pass timeStamp to animate for deltaTime
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime);
    // re assign timeStamp to lastTime so it can be used to calculate deltaTime in next loop
    lastTime = timeStamp;
    // clear the prior animation then draw this loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // passing deltaTime to game to run periotic stuff
    game.update(deltaTime);
    game.draw(ctx);

    // call next animation frame - pass in itself to make loop endless
    // requestAnimationFrane can  pass time stamp in an arg to the function it calls
    requestAnimationFrame(animate);
  }
  // passing 0 as the first timestamp
  animate(0);
});
