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

// color gradient to be used in display of score
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
// fiving it a metalic shine
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#3030ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  // displaying the score
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
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
      // for game over
      ctx.font = "23px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText(
        "Game over, your score is: " + score,
        160,
        canvas.height / 2 - 10
      );
      return true;
    }
  }
}
