// Update Loop - updating computer AI and our moves will take inthe ball and paddle classes

import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
// use and interact with ball.js
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    if (isLose()) {
      handleLose();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}
// function to check to see if ball is off screen
function isLose() {
  // is ball out of bounce
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
function handleLose() {
  // increment score
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  // reset game
  ball.reset();
  computerPaddle.reset();
}
document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
window.requestAnimationFrame(update);
