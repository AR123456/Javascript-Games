// js to draw grid
    //grid size is 21 but putting into a const for scalabilty
    const GRID_SIZE = 21

export function randomGridPosition(){


    return{
        x: Math.floor(Math.random()*GRID_SIZE +1 ),
        y: Math.floor(Math.random()*GRID_SIZE+ 1)
    }
}
export function outsideGrid(position){
    // ? is snake outside of the 21 grid 
  return (
      position.x <1 || position.x >GRID_SIZE ||
      position.y <1 || position.y >GRID_SIZE 
  )
}