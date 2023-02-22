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
const gameContainer = document.getElementById('game-container');

gameContainer.addEventListener('touchstart', handleTouchStart);
gameContainer.addEventListener('touchmove', handleTouchMove);

let xDown = null;
let yDown = null;
// Game constants and variables
const gameBoard = document.getElementById('game-board');
const width = gameBoard.offsetWidth;
const height = gameBoard.offsetHeight;
const tileSize = 10;
const rows = height / tileSize;
const cols = width / tileSize;
let snake = [{x: cols/2, y: rows/2}];
let dx = 1;
let dy = 0;
let foodX;
let foodY;
let score = 0;
let intervalId;

// Initialize the game
function init() {
  // Add the snake to the game board
  drawSnake();
  
  // Add the first food to the game board
  generateFood();
  
  // Start the game loop
  intervalId = setInterval(gameLoop, 100);
}

// Generate a new food position
function generateFood() {
  foodX = Math.floor(Math.random() * cols) + 1;
  foodY = Math.floor(Math.random() * rows) + 1;
  
  // Check if the food is on top of the snake
  if (snake.some(segment => segment.x === foodX && segment.y === foodY)) {
    generateFood();
  }
  
  // Add the food to the game board
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = foodY;
  foodElement.style.gridColumnStart = foodX;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

// Main game loop
function gameLoop() {
  // Move the snake
  moveSnake();
  
  // Check for collision with walls
  if (snake[0].x < 1 || snake[0].x > cols || snake[0].y < 1 || snake[0].y > rows) {
    clearInterval(intervalId);
    alert(`Game over! Your score is ${score}.`);
  }
  
  // Check for collision with food
  if (snake[0].x === foodX && snake[0].y === foodY) {
    // Increase the score and update the score display
    score++;
    document.getElementById('score').textContent = score;
    
    // Remove the old food from the game board
    gameBoard.removeChild(gameBoard.querySelector('.food'));
    
    // Add a new segment to the snake
    const tail = snake[snake.length - 1];
    snake.push({x: tail.x - dx, y: tail.y - dy});
    
    // Generate a new food
    generateFood();
  }
  
  // Check for collision with the rest of the snake
  if (snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y
)) {
clearInterval(intervalId);
alert(`Game over! Your score is ${score}.`);
    
}

// Redraw the snake
drawSnake();
}

// Move the snake
function moveSnake() {
// Move the head of the snake
snake[0].x += dx;
snake[0].y += dy;

// Move the rest of the snake
for (let i = snake.length - 1; i > 0; i--) {
snake[i].x = snake[i - 1].x;
snake[i].y = snake[i - 1].y;
}
}

// Draw the snake on the game board
function drawSnake() {

  // Remove the old snake segments from the game board
gameBoard.querySelectorAll('.snake').forEach(segment => segment.remove());

// Draw the new snake segments on the game board
snake.forEach(segment => {
const snakeElement = document.createElement('div');
snakeElement.style.gridRowStart = segment.y;
snakeElement.style.gridColumnStart = segment.x;
snakeElement.classList.add('snake');
gameBoard.appendChild(snakeElement);
});
}

// Handle sensor input
function handleSensorInput(event) {
const {x, y, z} = event.accelerationIncludingGravity;

// Check if the device is tilted enough to move the snake horizontally
if (Math.abs(x) > Math.abs(y) && Math.abs(x) > 5) {
if (x > 0) {
// Move the snake right
if (dx === 0) {
dx = 1;
dy = 0;
}
} else {
// Move the snake left
if (dx === 0) {
dx = -1;
dy = 0;
}
}
}

// Check if the device is tilted enough to move the snake vertically
if (Math.abs(y) > Math.abs(x) && Math.abs(y) > 5) {
if (y > 0) {
// Move the snake down
if (dy === 0) {
dx = 0;
dy = 1;
}
} else {
// Move the snake up
if (dy === 0) {
dx = 0;
dy = -1;
}
}
}
}

// Add an event listener for sensor input
window.addEventListener('devicemotion', handleSensorInput);

// Start the game
init();
