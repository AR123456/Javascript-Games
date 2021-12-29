// for Display / UI 
// 1 populate board with mines - logic and display parts
import {createBoard} from "./game.js"

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;
 
const board =(createBoard(BOARD_SIZE,NUMBER_OF_MINES))
const boardElement = document.querySelector(".board")

board.forEach(row =>{
    row.forEach(tile =>{
        boardElement.append(tile.element)
    })
})
// set BOARD_SIZE to css --size property
boardElement.style.setProperty("--size",BOARD_SIZE)



// 2 left click on tiles reviels 


// 3 right click on tiles- marks
// 4 check for win/ loss

// 2 files game logic and display logic 


