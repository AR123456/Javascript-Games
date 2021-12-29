// for Display / UI 
// 1 populate board with mines - logic and display parts
import {createBoard,markTile} from "./game.js"

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

 
const board =(createBoard(BOARD_SIZE,NUMBER_OF_MINES))
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
board.forEach(row =>{
    row.forEach(tile =>{
        boardElement.append(tile.element)
    })
})
// set BOARD_SIZE to css --size property
boardElement.style.setProperty("--size",BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES


// 2 left click on tiles reveals 
tile.element.addEventListener("click",()=>{
    // 
})

// 3 right click on tiles- marks
// note cannot use click again as event use contextmenu which is what happens on a left click
tile.element.addEventListener("contextmenu", e => {
    //the default behavior here is the context menue so prevent that
    e.preventDefault();
    markTile(tile);
})
// 4 check for win/ loss

// 2 files game logic and display logic 


