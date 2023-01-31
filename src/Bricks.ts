import Brick from './Brick';

class Bricks {
  rows: number
  columns: number
  brickWidth: number
  brickHeight: number
  brickPadding: number
  brickOffsetTop: number
  brickOffsetLeft: number
  bricks: Brick[][]

  constructor(rows = 4, columns = 5) {
    this.rows = rows;
    this.columns = columns;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    //call method
    this.setup();
  }

  // We will hold all our bricks in a two-dimensional array
  // This will loop through the rows and columns and create the new bricks
  // also make them disappear on collision
  setup(): void {
    for (let c = 0; c < this.columns; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
        const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
        const brick = new Brick(brickX, brickY);
        this.bricks[c][r] = brick
      }
    }
  }

  // method to loop through all the bricks in the array and draw them on the screen
  render(ctx: CanvasRenderingContext2D) {
    for (let c = 0; c < this.columns; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === true) {
          const brick = this.bricks[c][r]
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
