import{update as updateSnake, draw as drawSnake, SNAKE_SPEED} from "./snake.js"
import {update as updateFood, draw as drawFood} from "./food.js"
 

// game loop 
let lastRenderTime =0;
const gameBoard = document.getElementById("game-board")



function main(currentTime){
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if(secondsSinceLastRender<1/SNAKE_SPEED) return

    lastRenderTime=currentTime

    //  almost all games have 2 steps 
// the  update loop that updates game logig 
// and then a function that draws or puts on screen in the correct place 
update()
 draw()
}
 window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
}
function draw(){
    // remove the extra segments from end of snake
    gameBoard.innerHTML=""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}