const squares = document.querySelectorAll(".grid div");
const timeLeft = document.querySelector("#time-left");
const result = document.querySelector("#result");
const ending = document.querySelector(".ending-block");
const starting = document.querySelector("starting-block");
const startBtn = document.querySelector("#button");

const width = 9;
let currentIndex = 76;
let timerId;

squares[currentIndex].classList.add("frog");
// switch cases for moving with keys
function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");
  switch (e.keyCode) {
    // left 37
    case 37:
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    // up 38
    case 38:
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    // right 39
    case 39:
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    //down 40
    case 40:
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  squares[currentIndex].classList.add("frog");
  //   lose();
  //   window();
}
document.addEventListener("keyup", moveFrog);
// https://www.youtube.com/watch?v=lhNdUVh3qCc
