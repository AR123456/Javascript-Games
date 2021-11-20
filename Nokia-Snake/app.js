const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector(".span");
const startBtn = document.querySelector(".start");
const width = 10;
let currentIndex = 0;
let appleIndex = 0;
// divs in grid begin at 2 - hte head and 0 being the end , 1's will be the body
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

function control(e) {
  squares[currentIndex].classList.remove("snake"); /// remove snake class from current index
  if (e.keyCode === 39) {
    direction = 1; // if right arrow key is pressed snake will go right one
  } else if (e.keyCode === 38) {
    direction = -width; // if left arrow key is pressed snake will go left one
  } else if (e.keyCode === 37) {
    direction = -1; // if up arrow key is pressed snake will go up one
  } else if (e.keyCode === 40) {
    direction = +width; // if down arrow key is pressed snake will go down one
  }
}

document.addEventListener("keyup", control);
