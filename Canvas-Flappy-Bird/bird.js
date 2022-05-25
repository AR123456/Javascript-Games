const dragonSprite = new Image();
// the dragon png sprite sheet
dragonSprite.src = "./dragon.png";

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    // one frame of the spritesheet
    this.originaWidth = 941;
    this.originaHeight = 680;
    // this.width = 20;
    // this.height = 20;
    // adjust height and width to match that of the dragon.png the sprite sheet
    this.width = this.originaWidth / 20;
    this.height = this.originaHeight / 20;
    this.weight = 1;
  }
  update() {
    let curve = Math.sin(angle) * 20;
    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (spacePressed && this.y > this.height * 3) this.flap();
    // or should this be
    // if (spacePressed) this.flap();
  }
  draw() {
    ctx.fillStyle = "red";
    // the hit box
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // pass in the required 9 items into this canvas function the long version
    // syntax   ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    ctx.drawImage(
      dragonSprite,
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 20,
      this.y - 12,
      this.width * 1.7,
      this.height * 1.7
    );
  }
  flap() {
    this.vy -= 2;
  }
}

const bird = new Bird();
