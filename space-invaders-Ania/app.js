const squares = document.querySelectorAll(".grid div");
const resultDisplay = document.getElementById("result");
let width = 15;
let currentShooterIndex = 202;
let currentINvaderIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;

// define alien invaders
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];
// draw alien inaders - add the class list invader to these squares
alienInvaders.forEach((invader) =>
  squares[currentINvaderIndex + invader].classList.add("invader")
);
