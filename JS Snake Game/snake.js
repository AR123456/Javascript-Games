// js for snake

import { getInputDirection } from "./input.js";

// this controls the game speed
export const SNAKE_SPEED = 2;
// using grid system allows for us to draw the snake with a series of x,y positiosns
const snakeBody =[
    // {x:10, y:11},
    {x:11, y:11},
    // {x:12, y:11},
    // {x:13, y:11},
    // {x:14, y:11},
]

export function update(){
    console.log("update")
    const inputDirection = getInputDirection()
    // second to last position 
    for(let i = snakeBody.length-2; i>=0; i--){
        // element before the one selected
        // spread to new object ...
        snakeBody[i +1] ={ ...snakeBody[i]}
    }
    // update the head based on the direction in which we are moving
    // snakeBody[0].x +=0
    // snakeBody[0].y +=1
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
