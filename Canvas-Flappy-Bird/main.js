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

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
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
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollisions();
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

const bang = new Image();
bang.src = "bang.png";
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);

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
// adding backgound image
const background = new Image();
background.src = "BG.png";
// drawing 2 images that scroll left as game moves right
// as soon as one background slides off the right it is then ready to start sliding from the left side
const BG = {
  // js object with propertyies
  // position on horizantal x  for first image
  x1: 0,
  // position on horazontal x for second image ( hides behind r edge of canvas )
  x2: canvas.width,
  // this is top edge so y will always be 0
  y: 0,
  // getting width and height from the canvas
  width: canvas.width,
  height: canvas.height,
};
//
function handleBackground() {
  //
  if (BG.x1 <= -BG.width) BG.x1 = BG.width;
}
