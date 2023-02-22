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

function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!xDown || !yDown) {
    return;
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 10;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 40;
const CANVAS_WIDTH = TILE_SIZE * BOARD_WIDTH;
const CANVAS_HEIGHT = TILE_SIZE * BOARD_HEIGHT;

let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let dx = TILE_SIZE;
let dy = 0;
let score = 0;
let gameIsRunning = true;

function drawSnakePart(snakePart) {
  ctx.fillStyle = 'green';
  ctx.fillRect(snakePart.x * TILE_SIZE, snakePart.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT)
  };
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  clearCanvas();
  drawSnake();
  drawFood();
  drawScore();
  moveSnake();
  checkCollision();
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
    endGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function endGame() {
  gameIsRunning = false;
  alert(`Game Over! Your score is ${score}.`);
}

function handleOrientation(event) {
  if (!gameIsRunning) {
    return;
  }
  const { gamma, beta } = event;
  if (gamma > 0) {
    dx = TILE_SIZE;
    dy = 
