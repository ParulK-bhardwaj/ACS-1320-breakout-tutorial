import Ball from './Ball';
import Bricks from './Bricks';
import Paddle from './Paddle';
import Point from './Point';

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  paddleWidth: number
  paddleHeight: number
  paddleX: number
  rightPressed: boolean
  leftPressed: boolean
  ball: Ball
  bricksBlock: Bricks
  paddle: Paddle
  score: number
  lives: number
  scoreDisplay: Point
  livesDisplay: Point

  constructor(canvas: HTMLCanvasElement, ctx:CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    // ball variables
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;

    // paddle variables
    this.paddleWidth = 75;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;

    // variables to allow user to control the paddle
    // At the start of the game no key is pressed so false
    this.rightPressed = false;
    this.leftPressed = false;

    // Instatiating classes by creating new objects
    this.ball = new Ball(this.x, this.y);
    this.bricksBlock = new Bricks();
    this.paddle = new Paddle(this.paddleX, this.canvas.height - 10);
    // At the start of the game score is 0
    this.score = 0;
    this.scoreDisplay = new Point(8, 20, this.score, 'Score');
    // At the start of the game, a player is given 3 lives
    this.lives = 3;
    this.livesDisplay = new Point(this.canvas.width - 65, 20, this.lives, 'Lives');
  }

  // When the keydown event is fired on any of the keys on keyboard
  // keyhandler methods will be executed
  keyDownHandler({ key }: {key: string}) {
    if (key === 'Right' || key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler({ key } : {key: string}) {
    if (key === 'Right' || key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  // update the paddle position based on the pointer coordinates
  mouseMoveHandler({ clientX }: {clientX: number}) {
    const relativeX = clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
      this.paddle.moveBy(this.paddle.x);
    }
  }

  // This method detects collision between bricks and ball
  collisionDetection() {
    for (let c = 0; c < this.bricksBlock.columns; c += 1) {
      for (let r = 0; r < this.bricksBlock.rows; r += 1) {
        const b = this.bricksBlock.bricks[c][r];
        // const { x: brickX, y: brickY, status } = b;
        if (b.status === true) {
          // Change the direction of the ball
          if (
            this.ball.x > b.x
              && this.ball.x < b.x + this.bricksBlock.brickWidth
              && this.ball.y > b.y
              && this.ball.y < b.y + this.bricksBlock.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            b.status = false;
            // Stetch Challange : Ball's color changes on collision
            this.ball.randColor();
            // Score increases everytime a brick get hit by ball
            this.scoreDisplay.value += 1;
            if (this.scoreDisplay.value === this.bricksBlock.rows * this.bricksBlock.columns) {
              // Winning message
              // eslint-disable-next-line no-alert
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  // Main method - Draw Loop
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricksBlock.render(this.ctx);
    this.ball.render(this.ctx);
    this.ball.moveBy(this.ball.dx, this.ball.dy);
    this.paddle.render(this.ctx);
    this.scoreDisplay.render(this.ctx);
    this.livesDisplay.render(this.ctx);
    this.collisionDetection();

    // eslint-disable-next-line max-len
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
      // Strecth challenge: Ball changes color when touches the canvas left right boundry
      this.ball.randColor();
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
      // Strecth challenge: Ball changes color when touches the canvas top bottom boundry
      this.ball.randColor();
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesDisplay.value -= 1;
        if (!this.livesDisplay.value) {
          // eslint-disable-next-line no-alert
          alert('GAME OVER');
          document.location.reload();
        } else {
          // resets ball and Paddle coordinates
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 3;
          this.ball.dy = -3;
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }

    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.movePaddle(7);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.movePaddle(-7);
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  eventSetup() {
    const { addEventListener } = document;
    // event listeners for user control the paddle through keyboard
    // Bind creates a new function that will force the this inside the function
    // to be the parameter passed to bind(). Thanks Marcia for introducing this new method.
    addEventListener('keydown', this.keyDownHandler.bind(this), false);
    addEventListener('keyup', this.keyUpHandler.bind(this), false);
    // event listeners for user control the paddle through mouse
    addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }
}

export default Game;
