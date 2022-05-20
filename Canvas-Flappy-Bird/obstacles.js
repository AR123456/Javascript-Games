// pipes
const obstaclesArray = [];

// creating the top and bottome pipes at the same time
class Obstacle {
  constructor() {
    // dividing by 3 gives space between pipes
    // top pipe height between 0 and 1/3 of canvas
    this.top = (Math.random() * canvas.height) / 3 + 20;
    // height of bottom pipe
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    // width of the obstacles
    this.x = canvas.width;
    this.width = 20;
    this.color = "hsla(" + hue + ",100%,50%,1)";
  }
  // draw the top and bottom obsticals
  draw() {
    ctx.fillStyle = this.color;
    // draw the rectangle takes in 4 val , x y of top left corner , width and height
    //top pipe
    ctx.fillRect(this.x, 0, this.width, this.top);
    // bottom pipe
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  // push pipes to left as game scrolls to right
  update() {
    // amount of movement for each frame of annimation
    this.x -= gamespeed;
    this.draw();
  }
}
// create new pipe every 50 game frames  the modules looks to remainder

function handleObstacles() {
  // if frame count is divisible by 50 do this to get more space between can increas in increments of 50
  if (frame % 150 === 0) {
    //every 50 frames do this - using unshift again
    obstaclesArray.unshift(new Obstacle());
  }
  // cycle array and call update method on each to draw the pipe
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  // stop array of pipes from getting too big
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
