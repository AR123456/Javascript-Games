window.addEventListener("load", function () {
  // load page then set up canvas
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 700;
  canvas.height = 500;

  // keyboard actions
  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowUp" || e.key === "ArrowDown") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === " ") {
          this.game.player.shootTop();
        } else if (e.key === "d") {
          // toggle debug mode
          this.game.debug = !this.game.debug;
        }
      });
      window.addEventListener("keyup", (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
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
      this.speed = 3;
      this.markedForDeletion = false;
      this.image = document.getElementById("projectile");
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
      // context.fillStyle = "yellow";
      // context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y);
    }
  }
  // paticles are broken bits flying off enemies when they are hit
  class Particle {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById("gears");
    }
  }
  // main character
  class Player {
    // player needs game dimensions
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      // helper vars for drawing image from sprite
      this.frameX = 0; // cycle sprite sheet horizontaly
      this.frameY = 0; // row of sprite sheet 0 or 1 1 will be for power up state
      this.speedY = 0;
      this.maxFrame = 37;
      this.maxSpeed = 3;
      this.projectiles = [];
      this.image = document.getElementById("player");
      // handle power ups
      this.powerUp = false;
      this.powerUpTimer = 0;
      this.powerUpLimit = 10000;
    }
    update(deltaTime) {
      if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes("ArrowDown"))
        this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      // vertical boundaries - dont allow player off top or bottom edge of screen by more than 1/2 its size
      if (this.y > this.game.height - this.height * 0.5)
        this.y = this.game.height - this.height * 0.5;
      else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
      // handle projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
      // sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      // power up
      if (this.powerUp) {
        // timer is up so remove powerup
        if (this.powerUpTimer > this.powerUpLimit) {
          this.powerUpTimer = 0;
          this.powerUp = false;
          // put player back in default animation
          this.frameY = 0;
        } else {
          this.powerUpTimer += deltaTime;
          // move to power up row animation on sprite sheet
          this.frameY = 1;
          // add more ammo on top on default refresh rate
          this.game.ammo += 0.1;
        }
      }
    }
    draw(context) {
      // context.fillStyle = "black";
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      // draw projectiles first so that the come out behind the player
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
      context.drawImage(
        this.image, // the player
        this.frameX * this.width, //source x  - column
        this.frameY * this.height, //source y -row
        this.width, //width of single player of area to crop out of source image
        this.height, // height 0f single player of area to crop out of source image
        this.x, // destination where to draw the image-players current position
        this.y, // destination where to draw the image-players current position
        this.width, // destination width of single player
        this.height // destination height of single player
      );
    }

    shootTop() {
      if (this.game.ammo > 0) {
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 30)
        );
        this.game.ammo--;
      }
      if (this.powerUp) this.shootBottom();
    }
    // tail lazers
    shootBottom() {
      if (this.game.ammo > 0) {
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 175)
        );
      }
    }
    // powerup
    enterPowerUp() {
      // could use state design pattern but since not many states just doing this way
      // if multiple collisions reset timer to 0 for the most recent one
      this.powerUpTimer = 0;
      // set powerUp property on player object to true
      this.powerUp = true;
      // recharge ammo to max value
      this.game.ammo = this.game.maxAmmo;
    }
  }
  // enemy types
  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * 1.5 - 1.5;
      this.markedForDeletion = false;
      //  moving this to each child class so they can be different
      // this.lives = 5;
      // this.score = this.lives;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 37;
    }
    update() {
      // account for game speed so speed matches scrolling game world and can be changed dynamically
      this.x += this.speedX - this.game.speed;
      if (this.x + this.width < 0) this.markedForDeletion = true;
      // sprite animation - move along sprite sheet horizonatlly
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else this.frameX = 0;
    }
    draw(context) {
      // context.fillStyle = "red";
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      // context.fillStyle = "black";
      context.drawImage(
        this.image,
        this.frameX * this.width, // souce x cycle horizontaly  row
        this.frameY * this.height, // source y
        this.width, // source width
        this.height, // source hight
        this.x,
        this.y,
        this.width,
        this.height
      );
      if (this.game.debug) {
        context.font = "20px Helvetica";
        context.fillText(this.lives, this.x, this.y);
      }
    }
  }
  // first enemy
  class Angler1 extends Enemy {
    constructor(game) {
      // get all the stuff from Enemy first
      super(game);
      this.width = 228;
      this.height = 169;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.image = document.getElementById("angler1");
      // randomize looping the 3 animations
      this.frameY = Math.floor(Math.random() * 3);
      this.lives = 2;
      this.score = this.lives;
    }
  }
  // second enemy
  class Angler2 extends Enemy {
    constructor(game) {
      // get all the stuff from Enemy first
      super(game);
      this.width = 213;
      this.height = 165;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.image = document.getElementById("angler2");
      // randomize looping the 3 animations
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 3;
      this.score = this.lives;
    }
  }
  // third enemy
  class LuckyFish extends Enemy {
    constructor(game) {
      // get all the stuff from Enemy first
      super(game);
      this.width = 99;
      this.height = 95;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.image = document.getElementById("lucky");
      // randomize looping the 3 animations
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 3;
      this.score = 15;
      this.type = "lucky";
    }
  }
  // inividual background layers
  class Layer {
    constructor(game, image, speedModifier) {
      this.game = game;
      this.image = image;
      this.speedModifier = speedModifier;
      this.width = 1768;
      this.height = 500;
      this.x = 0;
      this.y = 0;
    }
    update() {
      // move background layers right to left as game scrolls- when it moves off canvas set back to 0
      if (this.x <= -this.width) this.x = 0;
      // vairable speeds for different layers
      this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y);
      // draw second identical image slightly to the right so scroll off screen is seamless
      // start second image where first image ends so add to x
      context.drawImage(this.image, this.x + this.width, this.y);
    }
  }
  // pull layer objects together to animate the game world
  class Background {
    constructor(game) {
      this.game = game;
      this.image1 = document.getElementById("layer1");
      this.image2 = document.getElementById("layer2");
      this.image3 = document.getElementById("layer3");
      this.image4 = document.getElementById("layer4");
      // create new instance of layer class - for each layer
      this.layer1 = new Layer(this.game, this.image1, 0.2);
      this.layer2 = new Layer(this.game, this.image2, 0.4);
      // this layer should scroll at same speed as game object
      this.layer3 = new Layer(this.game, this.image3, 1);
      this.layer4 = new Layer(this.game, this.image4, 1.5);
      // hold  background layers in this array
      this.layers = [this.layer1, this.layer2, this.layer3];
    }
    // move all layer objects
    update() {
      // loop the layers
      this.layers.forEach((layer) => layer.update());
    }
    // draw layer objects
    draw(context) {
      this.layers.forEach((layer) => layer.draw(context));
    }
  }
  // score timer and other info
  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      // TODO this is not coming accross as Bangers
      // this.fontFamily = "Helvetica";
      this.fontFamily = "Bangers";
      this.color = "white";
    }
    draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.font = this.fontSize = "px " + this.fontFamily;
      // score
      context.fillText("Score: " + this.game.score, 20, 40);
      // ammo

      // just show seconds
      const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
      context.fillText("Timer: " + formattedTime, 20, 100);
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
        // TODO why not effect to changing the font size here?
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
      // if in power up change power bar color
      if (this.game.player.powerUp) context.fillStyle = "red"; // or #ffffbd
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
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
      // instantiate Background class so the layers appear
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      // replenish ammo every 1/2 second
      this.ammoInterval = 500;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10;
      // put time limit on game
      this.gameTime = 0;
      this.timeLimit = 50000;
      this.speed = 1;
      this.debug = true;
    }

    update(deltaTime) {
      // how many milisec have passed since game began
      if (!this.gameOver) this.gameTime += deltaTime;
      if (this.gameTime > this.timeLimit) this.gameOver = true;
      this.background.update();
      // because layer4 needs to go in front of the player calling its update here
      this.background.layer4.update();
      // player needs delta time for power ups
      this.player.update(deltaTime);
      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) this.ammo++;
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update();
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          // check is type lucky ? if call enterPowerUp from player class
          if ((enemy.type = "lucky")) this.player.enterPowerUp();
          // penalty for hitting enemys that are not lucky
          else this.score--;
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            projectile.markedForDeletion = true;
            if (enemy.lives <= 0) {
              enemy.markedForDeletion = true;
              if (!this.gameOver) this.score += enemy.score;
              if (this.score > this.winningScore) this.gameOver = true;
            }
          }
        });
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.ui.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      // now after the other stuff drawn on screen add layer4 so it is closest to user
      this.background.layer4.draw(context);
    }
    addEnemy() {
      // randomize adding enemies types 0 -1
      const randomize = Math.random();
      if (randomize < 0.3) this.enemies.push(new Angler1(this));
      if (randomize < 0.6) this.enemies.push(new Angler2(this));
      else this.enemies.push(new LuckyFish(this));
    }
    checkCollision(rect1, rect2) {
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
