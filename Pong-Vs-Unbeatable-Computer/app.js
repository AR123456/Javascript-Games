// Update Loop - updating computer AI and our moves will take inthe ball and paddle classes
import Ball from "./Ball.js";
// use and interact with ball.js
const ball = new Ball(document.getElementById("ball"));
let lastTime;

function update(time) {
  if (lastTime != null) {
    // do all the important code we have a delta sinnce lastTime is not null so good to go
    const delta = time - lastTime;
    // Update code stuff here
    // console.log(delta);
    // pass in the delta so that game operations are based off of it.
    ball.update(delta);
  }

  lastTime = time;

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
