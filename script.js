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
  }

  const xUp = event.touches[0].clientX;
  const yUp = event.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // swipe left or right
    if (xDiff > 0) {
      dx = -20;
      dy = 0;
    } else {
      dx = 20;
      dy = 0;
    }
  } else {
    // swipe up or down
    if (yDiff > 0) {
      dx = 0;
      dy = -20;
    } else {
      dx = 0;
      dy = 20;
    }
  }

  // reset the touch start position
  xDown = null;
  yDown = null;
}

let pinchStartDistance = null;

gameContainer.addEventListener('gesturestart', handleGestureStart);
gameContainer.addEventListener('gesturechange', handleGestureChange);

function handleGestureStart(event) {
  pinchStartDistance = calculatePinchDistance(event);
}

function handleGestureChange(event) {
  const pinchDistance = calculatePinchDistance(event);

  if (pinchStartDistance && pinchDistance) {
    if (pinchDistance > pinchStartDistance) {
      // zoom in
      gameContainer.style.transform = `scale(${pinchDistance / pinchStartDistance})`;
    } else if (pinchDistance < pinchStartDistance) {
      // zoom out
      gameContainer.style.transform = `scale(${pinchStartDistance / pinchDistance})`;
    }
  }
}

function calculatePinchDistance(event) {
  if (event.touches.length === 2) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    return Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  }
  return null;
}

