// Paddle constructor
export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
  }
}

// psudo code - detect the position of the moving and if any part of the paddle makes contact with the ball bounce it back in the opposite direction
// x will alway be the same for the player vs computer so really just need to know the y for the bounce
// track when the ball makes contact with the player vs computer paddle side of the wall and if it does that increment the socre for opposite player
