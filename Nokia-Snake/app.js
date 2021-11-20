const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector("span");
const startBtn = document.querySelector(".start");

const width = 10;
let currentIndex = 0; //so first div in our grid
let appleIndex = 0; //so first div in our grid
// divs in grid begin at 2 is the  head and 0 being the end , 1 will be the body
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

//start game function
function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(interval);
  score = 0;
  randomApple();
  direction = 1;
  scoreDisplay.innerText = score;
  intervalTime = 1000;
  progresive;
  currentSnake = [2, 1, 0];
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcomes, intervalTime); // moveOutcomes will deal with collisons,wins and score setting
}
//function that deals with move outcomes
function moveOutcomes() {
  // snake hits border
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    clearInterval(interval);
  }
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  // dealing with the snake hitting the apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function control(e) {
  squares[currentIndex].classList.remove("snake"); /// remove snake class from current index
  if (e.keyCode === 39) {
    direction = 1; // if right arrow key is pressed snake will go right one
    console.log("right", currentSnake);
  } else if (e.keyCode === 38) {
    direction = -width; // if left arrow key is pressed snake will go left one
    console.log("left", currentSnake);
  } else if (e.keyCode === 37) {
    direction = -1; // if up arrow key is pressed snake will go up one
    console.log("up", currentSnake);
  } else if (e.keyCode === 40) {
    console.log("down", currentSnake);
    direction = +width; // if down arrow key is pressed snake will go down one
  }
}
function randomApple() {
  //   do {
  //     appleIndex = Math.floor(Math.random() * squares.length);
  //   } while (squares[appleIndex].classList.contains("snake"));
  //   squares[appleIndex].classList.add("apple");
  console.log("make a new apple");
}
document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
