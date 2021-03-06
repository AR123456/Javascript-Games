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
  // console.log(minePositions);
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
// get near by elements of a tile that has been clicked on and see if any of them are mines
// start by passing the board into the revealTile function
export function revealTile(board, tile) {
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
  // else give the tile a number
  tile.status = TILE_STATUSES.NUMBER;
  // look for near by tiles - need access to board for this
  // putting in a function becuase it is complicated logic
  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((t) => t.mine);
  if (mines.length === 0) {
    // this is not a mine and there are no mines around it so reveile all of the
    // adjacent squreas that also do not have mines around them
    // recursivly call the reveal function fr all the adjecent neighbors that are empty
    // this syndax .bind  pulls in the third param automatically
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    // put the number of mines in the 3x3 grid
    tile.element.textContent = mines.length;
  }
}

export function getMinePositions(boardSize, numberOfMines) {
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
export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_STATUSES.HIDDEN ||
            tile.status === TILE_STATUSES.MARKED))
      );
    });
  });
}
export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE;
    });
  });
}
function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}
function randomNumber(size) {
  return Math.floor(Math.random() * size);
}
// function nearbyTiles(board, tile) {
// destructureing tile to x and y
function nearbyTiles(board, { x, y }) {
  // starting with empty array that willl be pushed to before we return
  const tiles = [];
  // we need all the tiles in a 3x3 grid around the tile with the staus of number -1 ofsset
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}
