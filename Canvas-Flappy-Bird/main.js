const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
// globals
let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  handleCollisions();
  // this will stop the game
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}
animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
});

// collison detection and what happens after
const bang = new Image();
// png with transparent backgound
bang.src = "bang.png";
// detect collions by cycling through array
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    //square colission detection formula
    /// player object is bird
    // need to check both the top and bottom pipe
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      //collision detected
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      return true;
    }
  }
}
