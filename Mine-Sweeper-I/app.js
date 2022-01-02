// for Display / UI
// 1 populate board with mines - logic and display parts
import {
  createBoard,
  markTile,
  TILE_STATUSES,
  revealTile,
  checkWin,
  checkLose,
} from "./game.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;
const messageText = document.querySelector(".subtext");
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);

    // 2 left click on tiles reveals
    tile.element.addEventListener("click", () => {
      //reveal the tile function
      // get near by elements of a tile that has been clicked on and see if any of them are mines
      // start by passing the board into the revealTile function here and int the game.js file
      revealTile(board, tile);
      checkGameEnd();
    });

    // 3 right click on tiles- marks-marks mean there is a mine there
    // note cannot use click again as event use contextmenu which is what happens on a left click
    tile.element.addEventListener("contextmenu", (e) => {
      //the default behavior here is the context menue so prevent that
      e.preventDefault();
      markTile(tile);
      // dislay the number of mines left
      listMinesLeft();
    });
  });
});

function listMinesLeft() {
  // count up the tiles that are marked and display them
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

// 4 check for win/ loss
function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    // https://www.youtube.com/watch?v=kBMnD_aElCQ
    // taking advantage of event propigation to remove event listeners
    // remove ability to continue to click on tiles and reveal things
    // pass in the capture phase which occurs before the bubble phase
    //geeksforgeeks.org/phases-of-javascript-event/
    // Capturing Phase is when event goes down to the element. Target phase is when event reach the element and Bubbling phase is when the event bubbles up from the element.
    // written this way it will fire before  the bubble event above so we will never get to the event that listens for the click to reveal the tiles
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
  }
  if (lose) {
    messageText.textContent = "You Lose";
  }
}
function stopProp(e) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
  e.stopImmediatePropagation();
}
// 2 files game logic and display logic
// set BOARD_SIZE to css --size property
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;
