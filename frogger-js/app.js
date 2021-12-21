const squares = document.querySelectorAll(".grid div");
const timeLeft = document.querySelector("#time-left");
const result = document.querySelector("#result");
const ending = document.querySelector(".ending-block");
const starting = document.querySelector(".starting-block");
const startBtn = document.querySelector("#button");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");

const width = 9;
let currentIndex = 76;
let currentTime = 20;
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
  lose();
  window();
}
function autoMoveCars() {
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
}
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carsLeft.classList.remove("c1");
      carsLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carsLeft.classList.remove("c2");
      carsLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carsLeft.classList.remove("c3");
      carsLeft.classList.add("c1");
      break;
  }
}
function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carsRight.classList.remove("c1");
      carsRight.classList.add("c3");
      break;
    case carRight.classList.contains("c2"):
      carsRight.classList.remove("c2");
      carsRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carsRight.classList.remove("c3");
      carsRight.classList.add("c2");
      break;
  }
}
function autoMoveLogs() {
  logsLeft.forEach((logLeft) => moveCarLeft(logLeft));
  logsRight.forEach((logRight) => moveCarRight(logRight));
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

//logs going right
function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
}

// to win
function win() {
  if (squares[4].classList.contains("frog")) {
    result.innerHTML = "You won";
    squares[currentIndex].classList.remove("frog");
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
  }
}
// to lose
function lose() {
  if (
    currentTime === 0 ||
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l5") ||
    squares[currentIndex].classList.contains("l4")
  ) {
    result.innerHTML = "You lost";
    squares[currentIndex].classList.remove("frog");
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
  }
}
// move frog left 
function moveWithLogLeft(){
  if(currentIndex >= 27 && currentIndex<35){
    squares[currentIndex].classList.remove("frog")
    currentIndex +=1;
    squares[currentIndex].classList.add("frog")
  }
}

// move frog right 
function moveWithLogRight(){
  if(currentIndex >18 && currentIndex <=26){
    squares[currentIndex].classList.remove("frog")
    currentIndex -=;
    squares[currentIndex].classList.add("frog")
  }
}
// move cars, logs and fog
function movePieces(){
  currentTime --;
  timeLeft.textContent=currentTime;
  autoMoveCars()
  autoMoveLogs()
  moveWithLogLeft()
  moveWithLogRight()
  lose()
}

// start game 
startBtn.addEventListener("click",()=>{
  if(timerId){
    clearInterval(timerId)
  }else{
    timerId = setInterval(movePieces, 1000)
    document.addEventListener("keyup", moveFrog)
  }
})

 
