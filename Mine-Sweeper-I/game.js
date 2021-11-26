// game logic 
const TILE_STATUSES = {
    HIDDEN:"hidden" ,
    MINE:"mine", 
    NUMBER:"number", 
    MARKED:"marked"
}
export function createBoard(boardSize, numberOfMines){
    //board is an array of arrays 
    const board =[]
    for (let x = 0; x < boardSize; x++) {
        const row =[]
        for (let y = 0; y < boardSize; y++) {
        const element = document.createElement("div")    
        const tile = {
            x,
            y,
        }     
        row.push(tile) 
        }
    board.push(row) 
    }

    return board
}
