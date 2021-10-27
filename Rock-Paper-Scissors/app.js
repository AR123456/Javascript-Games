// cashe the DOM - get ans store for future use
let userScore = 0;
let computerScore = 0;
// give the const a clear name to indicate they are DOM variables
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");

const scoreBorad_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
// get random computer choide
function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
function convertToWord(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
}
function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  const smallUserWord = "user".fontsize(3).sup();
  const smallCompWord = "comp".fontsize(3).sup();
  result_div.innerHTML = `${convertToWord(userChoice)}  ${smallUserWord}
     beats
    ${convertToWord(computerChoice)} ${smallCompWord}
     You win`;
}
function lose(userChoice, computerChoice) {
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  const smallUserWord = "user".fontsize(3).sup();
  const smallCompWord = "comp".fontsize(3).sup();
  result_div.innerHTML = `
    ${convertToWord(userChoice)} ${smallUserWord}
     does not beat  
    ${convertToWord(computerChoice)} ${smallCompWord}
    You lose`;
}
function draw(userChoice, computerChoice) {
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  const smallUserWord = "user".fontsize(3).sup();
  const smallCompWord = "comp".fontsize(3).sup();
  result_div.innerHTML = ` ${convertToWord(userChoice)}   ${smallUserWord}
 same as   
${convertToWord(computerChoice)} ${smallCompWord}
tie`;
}
function game(userChoice) {
  const computerChoice = getComputerChoice();
  //   console.log(computerChocie, userChoice);
  switch (userChoice + computerChoice) {
    case "rp":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;

    case "rs":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}
function main() {
  rock_div.addEventListener("click", function () {
    game("r");
  });

  paper_div.addEventListener("click", function () {
    game("p");
  });

  scissors_div.addEventListener("click", function () {
    game("s");
  });
}

main();
