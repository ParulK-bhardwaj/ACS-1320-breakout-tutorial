import Ball from './Ball.js';
import Brick from './Brick.js';
import Paddle from './Paddle.js';

// the game is rendered on the HTML <canvas> 
const canvas = document.getElementById('myCanvas');
// variable to have 2d canvas rendering
const ctx = canvas.getContext('2d');

// ball variables
let x = canvas.width / 2;
let y = canvas.height - 30;

// paddle variables
const paddleWidth = 75;

// variable to allow user to control the paddle
let rightPressed = false;
let leftPressed = false;

// brick variables
const brickRowCount = 4;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Instatiating classes by creating new objects
const ball = new Ball(x, y);
let paddleX = (canvas.width - paddleWidth) / 2;
const paddle = new Paddle(paddleX, canvas.height - 10);

// We will hold all our bricks in a two-dimensional array
// This will loop through the rows and columns and create the new bricks
// also make them disappear on collision
let bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// function to loop through all the bricks in the array and draw them on the screen
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        const brick = new Brick(brickX, brickY);
        brick.render(ctx);
      }
    }
  }
}

// When the keydown event is fired on any of the keys on keyboard keyhandler methods will be executed
function keyDownHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = true;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler({ key }) {
  if (key === 'Right' || key === 'ArrowRight') {
    rightPressed = false;
  } else if (key === 'Left' || key === 'ArrowLeft') {
    leftPressed = false;
  }
}

// update the paddle position based on the pointer coordinates
function mouseMoveHandler({ clientX }) {
  const relativeX = clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

// Counting the score 
let score = 0;
function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// Giving the player some lives
let lives = 3;

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      const { x: brickX, y: brickY, status } = b;
      if (status === 1) {
        if (
          ball.x > brickX
            && ball.x < brickX + brickWidth
            && ball.y > brickY
            && ball.y < brickY + brickHeight
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            // Winning message
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// Main method - Draw Loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.render(ctx);
  ball.moveBall();

  paddle.render(ctx);
  drawScore();
  drawLives();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
    ball.randColor();
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    ball.randColor();
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 3;
        ball.dy = -3;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.movePaddle(7);
  } else if (leftPressed && paddle.x > 0) {
    paddle.movePaddle(-7);
  }

  requestAnimationFrame(draw);
}

draw();
// Destructring
const addEventListener = document.addEventListener
// event listeners for user control the paddle through keyboard
addEventListener('keydown', keyDownHandler, false);
addEventListener('keyup', keyUpHandler, false);
// event listeners for user control the paddle through mouse
addEventListener('mousemove', mouseMoveHandler, false);