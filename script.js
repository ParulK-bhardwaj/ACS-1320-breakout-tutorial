// the game is rendered on the HTML <canvas> 
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// ball variables
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let color = '#0095DD';

// paddle variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// variable to allow user to control the paddle
let rightPressed = false;
let leftPressed = false;

// brick variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// We will hold all our bricks in a two-dimensional array
// This will loop through the rows and columns and create the new bricks
// also make them disappear on collision
const bricks = [];
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
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
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
    paddleX = relativeX - paddleWidth / 2;
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
          x > brickX
            && x < brickX + brickWidth
            && y > brickY
            && y < brickY + brickHeight
        ) {
          dy = -dy;
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

// ranColor Method to select random hex color for ball
function randColor() {
  return (
    `#${
      (Math.floor(Math.random() * 0x1000000) + 0x1000000)
        .toString(16).substring(1)}`
  );
}

// Method to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    color = randColor();
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    color = randColor();
  }

  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// method to draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// Main method - Draw Loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
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