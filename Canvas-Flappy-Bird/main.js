const canvas = document.getElementById("canvas1");
// to use the built in canvas methods
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// globals
// flip true false on press
let spacePressed = false;
// math.sin methond will use this to make bird go slightly up and down when idle
let angle = 0;

// cycle through rgb using hue property
let hue = 0;
// track frame count of annimation lopp
// can add periodic trggers using this
// like new enamy every 500 frames
let frame = 0;
// increase with ever obsical passed
let score = 0;
// set speed  use to move obstical , partical and background at same speed
// or add multipliers to move at paralax speed
// https://www.w3schools.com/howto/howto_css_parallax.asp
let gameSpeed = 2;

function animate() {
  // clear canvas between animation frames
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // player
  // ctx.fillRect(10, canvas.height - 90, 50, 50);
  // now use the bird constructor for bird.js
  bird.update();
  bird.draw();
  // recursion for animage to call iteself and thus loop
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
});
