import Brick from './Brick.js';

class Bricks {
  constructor(rows = 4, columns = 5) {
    this.rows = rows;
    this.columns = columns;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    //   call method
    this.setup();
  }

  // We will hold all our bricks in a two-dimensional array
  // This will loop through the rows and columns and create the new bricks
  // also make them disappear on collision
  setup() {
    for (let c = 0; c < this.columns; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  // method to loop through all the bricks in the array and draw them on the screen
  render(ctx) {
    for (let c = 0; c < this.columns; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
          const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          const brick = new Brick(brickX, brickY);
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
