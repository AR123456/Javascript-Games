// Update Loop - updating computer AI and our moves will take inthe ball and paddle classes
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
// use and interact with ball.js
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
let lastTime;

function update(time) {
  if (lastTime != null) {
    // do all the important code we have a delta sinnce lastTime is not null so good to go
    const delta = time - lastTime;
    // Update code stuff here
    // console.log(delta);
    // pass in the delta so that game operations are based off of it.
    ball.update(delta);
    // the player paddle dosent need an update function , just using mouse move for that
    // update function for the computer paddle comping from Paddle.js
    // need to pass in delta for scaleing to game and ball.y so paddle knows where the ball is
    computerPaddle.update(delta, ball.y);
  }

  lastTime = time;

  window.requestAnimationFrame(update);
}
// use the mouse to set the player paddle postion using the y postion
document.addEventListener("mousemove", (e) => {
  // in the CSS this is set as 50% and here in JS it is a pixle value so divide by innerHeight of window * 100 to create a percentage
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
window.requestAnimationFrame(update);
