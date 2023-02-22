const gameContainer = document.getElementById('game-container');
const snake = document.getElementById('snake');
const food = document.getElementById('food');

let snakeX = 0;
let snakeY = 0;
let foodX = 100;
let foodY = 100;
let dx = 0;
let dy = 0;

function gameLoop() {
  // update the snake position
  snakeX += dx;
  snakeY += dy;

  // check for collision with food
  if (snakeX === foodX && snakeY === foodY) {
    // move the food to a new random location
    foodX = Math.floor(Math.random() * 380);
    foodY = Math.floor(Math.random() * 380);
    food.style.left = `${foodX}px`;
    food.style.top = `${foodY}px`;
  }

  // update the snake position on the game board
  snake.style.left = `${snakeX}px`;
  snake.style.top = `${snakeY}px`;

  // check for collision with game board walls
  if (snakeX < 0 || snakeX > 380 || snakeY < 0 || snakeY > 380) {
    clearInterval(gameLoopId);
    alert('Game Over');
  }
}

const gameLoopId = setInterval(gameLoop, 100);

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowLeft') {
    dx = -20;
    dy = 0;
  } else if (event.code === 'ArrowRight') {
    dx = 20;
    dy = 0;
  } else if (event.code === 'ArrowUp') {
    dx = 0;
    dy = -20;
  } else if (event.code === 'ArrowDown') {
    dx = 0;
    dy = 20;
  }
});
