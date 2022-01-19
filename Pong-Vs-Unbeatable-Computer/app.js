// Update Loop - updating computer AI and our moves will take inthe ball and paddle classes
import Ball from "./Ball.js";
// use and interact with ball.js
const ball = new Ball(document.getElementById("ball"));
let lastTime;

function update(time) {
  // how much time has passed since time program started
  // with every frame the update function will be called
  // the time is incrementing with each render, sot take the time and convert it
  // to a delta   delta = amount of time passed from prior frame to current frame
  // https://www.youtube.com/watch?v=PeY6lXPrPaA
  // the very first time we run this the lastTime will be null so need to check for that, hense the if statment
  if (lastTime != null) {
    // do all the important code we have a delta sinnce lastTime is not null so good to go
    const delta = time - lastTime;
    // Update code stuff here
    console.log(delta);
  }

  //   const delta = time - lastTime;
  lastTime = time;

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
