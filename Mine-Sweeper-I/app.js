// for Display / UI
// 1 populate board with mines - logic and display parts
import { createBoard, markTile, TILE_STATUSES, revealTile } from "./game.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);

    // 2 left click on tiles reveals
    tile.element.addEventListener("click", () => {
      //
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
// set BOARD_SIZE to css --size property
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

// 4 check for win/ loss

// 2 files game logic and display logic
