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

// this code needs to be avalible before the animate() loop///////////////
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
  // if BB image one scrolled all the way to the left so no longer visible, then move it and hide it behind r edge
  // canvas draws rectacles from the top left corner and goes to right bottom coordinate defined by the w and h of the rectangle element
  // so if setting x to be equal to right edege of canvas by saying x is equal to canvas width the background rectangle
  // is drawn from that point to the right, there for is competle hidden behind the right canvas
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  // else move background one to the left along the x axis by the amount of pixels defined in the game speed variable
  else BG.x1 -= gamespeed;
  // if else to handle the second image
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;

  // draw the image using shorthand here - this is x1
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  // draw x2, this creates the illusion of endless background
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // call the handle background function - do this first so that pipes and birds are on top of the background layer
  handleBackground();
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
