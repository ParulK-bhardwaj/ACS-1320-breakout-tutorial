import Sprite from './Sprite';

class Paddle extends Sprite {
  x: number
  y: number
  constructor(x = 0, y = 0, width = 75, height = 10, color = '#0095DD') {
    super(x, y, width, height, color);
    this.x = x;
  }

  movePaddle(dx: number): void {
    this.x += dx;
  }

  moveBy(x: number): void {
    this.x = x;
  }
}

export default Paddle;
