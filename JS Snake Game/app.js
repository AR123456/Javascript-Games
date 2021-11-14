import{update as updateSnake, draw as drawSnake, SNAKE_SPEED,getSnakeHead,snakeIntersection} from "./snake.js"
import {update as updateFood, draw as drawFood} from "./food.js"
 import {outsideGrid} from "./grid.js"

// game loop 
let lastRenderTime =0;
let gameOver = false;
const gameBoard = document.getElementById("game-board")



function main(currentTime){
    if (gameOver) {
      return  alert("game over")
    }
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
    checkDeath()
}
function draw(){
    // remove the extra segments from end of snake
    gameBoard.innerHTML=""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}
// check for failure state
function checkDeath(){
    // is the snake off the page or has it intersected with it body
    gameOver = outsideGrid(getSnakeHead())|| snakeIntersection()
}