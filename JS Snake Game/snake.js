// js for snake

import { getInputDirection } from "./input.js";

 
export const SNAKE_SPEED = 2;
// using grid system allows for us to draw the snake with a series of x,y positiosns
const snakeBody =[{x:11, y:11}]
let newSegments =0 

export function update(){
   addSegments()
    const inputDirection = getInputDirection()
    // second to last position 
    for(let i = snakeBody.length-2; i>=0; i--){

        snakeBody[i +1] ={ ...snakeBody[i]}
    }
       snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}
// pass in the gameBoard so that we can draw the snake to it
export function draw(gameBoard){
    console.log("draw")
    //loop through each segement of the snake body
    snakeBody.forEach(segment =>{
        // put the div that is the segment at a particulare x,y coordinate
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })
}
export function expandSnake(amount){
    newSegments += amount
}
     export function onSnake(position, {ignoreHead = false} = {}){
return snakeBody.some((segment, index)=>{
    if(ignoreHead && index ===0) return false
    return equalPositions(segment,position)
})
  }
export function getSnakeHead(){
    // the first position in the array 
    return snakeBody[0]
}
// is the head of the snake touching any of the other snake body parts
// or is the head position === to any of the other position array index values 
export function snakeIntersection(){
    return onSnake(snakeBody[0],{ignoreHead:true})
}
function equalPositions(pos1,pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}
function addSegments(){
    for (let i = 0; i < newSegments; i++) {
        // add segments to the bottom of the snake - duplicate the last postion onto the snakee
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
      }
      //remove the super long tail 
    newSegments =0
}

//  restart    https://www.youtube.com/watch?v=QTcIXok9wNY