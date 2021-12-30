// game logic
// https://
// https://
//
export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};
export function createBoard(boardSize, numberOfMines) {
  //board is an array of arrays
  const board = [];
  // to create mines- array of values
  const minePositions = getMinePositions(boardSize, numberOfMines);
  console.log(minePositions);
  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      const tile = {
        element,
        x,
        y,
        // number of mines
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        //getter setter  change status based on click
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
  return board;
}

export function markTile(tile) {
  if (
    tile.status !== TILE_STATUSES.HIDDEN &&
    tile.status !== TILE_STATUSES.MARKED
  ) {
    return;
  }
  // are we marking our un marking the tile
  if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN;
  } else {
    tile.status = TILE_STATUSES.MARKED;
  }
}

export function revealTile(tile) {
  // console.log("revieal tile with a left click ");
  // only reveal tiles which are hidden
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }
  // is this a mine ?
  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }
  // else
  tile.status = TILE_STATUSES.NUMBER;
  // look for near by tiles - need access to board for this
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];
  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };
    //    if any of the postions in the position array match positionMatch are not a match

    //    if(!positions.some(p => positionMatch(p.position)))
    // witten using bind looks like this
    if (!positions.some(positionMatch.bind(null, position))) {
      // add position to the array
      positions.push(position);
    }
  }

  return positions;
}
function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}
function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
