const squares = document.querySelectorAll(".grid div");
const timeLeft = document.querySelector("#time-left");
const result = document.querySelector("#result");
const ending = document.querySelector(".ending-block");
const starting = document.querySelector("starting-block");
const startBtn = document.querySelector("#button");

const width = 9;
let currentIndex = 76;

squares[currentIndex].classList.add("frog");
