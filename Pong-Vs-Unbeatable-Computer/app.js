// Update Loop - updating computer AI and our moves will take inthe ball and paddle classes
import Ball from "./Ball.js";
// use and interact with ball.js
const ball = new Ball(document.getElementById("ball"));

function update(time) {
  // how much time has passed since time program started
  // with every frame the update function will be called
  console.log(time);
  window.requestAnimationFrame(update);
}
// putting a set time out here instead of this is not as good.
// IE setINterval(update,10)
//setInterval is not supper accrate, it may not always run every 10ms so problmes related to that.   Will also run inbetween frames, with requestAnimationFrame what happens is every time that you can change what is on the screen this funciton is going to run.  JS is smart enought to say hey you cannot change anything on screen so do not even bother running code.  So as soon as you can run something on the screen JS calls the function for us.
// as long as we keep calling window.requestAnimaitonFrame it is going to infinitely loop.
// will be called every time something on ours screen is allowed to change
window.requestAnimationFrame(update);
// https://www.youtube.com/watch?v=PeY6lXPrPaA
