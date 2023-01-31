import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x = 0, y = 0, width = 75, height = 10, color = '#0095DD') {
    super(x, y, width, height, color);
    this.x = x;
  }

  movePaddle(dx) {
    this.x += dx;
  }

  moveBy(x) {
    this.x = x;
  }
}

export default Paddle;
