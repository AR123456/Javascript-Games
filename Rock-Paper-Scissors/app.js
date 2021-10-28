let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");

const scoreBorad_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const smallUserWord = "user".fontsize(3).sup();
const smallCompWord = "comp".fontsize(3).sup();

const getComputerChoice = () => {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
};
const convertToWord = (letter) => {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
};
const win = (userChoice, computerChoice) => {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  const userChoice_div = document.getElementById(userChoice);
  result_div.innerHTML = `${convertToWord(userChoice)}  ${smallUserWord}
     beats
    ${convertToWord(computerChoice)} ${smallCompWord}
     you won`;

  userChoice_div.classList.add("green-glow");
  setTimeout(() => {
    userChoice_div.classList.remove("green-glow");
  }, 500);
};
const lose = (userChoice, computerChoice) => {
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  const userChoice_div = document.getElementById(userChoice);
  result_div.innerHTML = `
    ${convertToWord(userChoice)} ${smallUserWord}
     does not beat  
    ${convertToWord(computerChoice)} ${smallCompWord}
    you lost`;

  userChoice_div.classList.add("red-glow");
  setTimeout(() => {
    userChoice_div.classList.remove("red-glow");
  }, 500);
};
const draw = (userChoice, computerChoice) => {
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  const userChoice_div = document.getElementById(userChoice);
  result_div.innerHTML = ` ${convertToWord(userChoice)}   ${smallUserWord}
 same as   
${convertToWord(computerChoice)} ${smallCompWord}
tie`;
  userChoice_div.classList.add("grey-glow");
  setTimeout(() => {
    userChoice_div.classList.remove("grey-glow");
  }, 500);
};
const game = (userChoice) => {
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
};
const main = () => {
  rock_div.addEventListener("click", () => {
    game("r");
  });

  paper_div.addEventListener("click", () => {
    game("p");
  });

  scissors_div.addEventListener("click", () => {
    game("s");
  });
};

main();
