// js to control food behavior 
import {onSnake, expandSnake} from "./snake.js"
import {randomGridPosition} from "./grid.js"
// let food = {x:10, y:2}
let food = getRandomFoodPosition()
// rate at which snake will grow with food eaten
const EXPANSION_RATE = 2

export function update(){
    // if the snake is on top of food
    if(onSnake(food)){
        // this is true so snake needs to grow
        expandSnake(EXPANSION_RATE)
        // food = {x:20, y:10}
        food = getRandomFoodPosition()
    }
 
}
export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
  }

// return a random poition of the food that is not on the snake
function getRandomFoodPosition(){
    let newFoodPosition 
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        // if there is no new food position or the new food position is on the snake call the function to get a new random position
         
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}