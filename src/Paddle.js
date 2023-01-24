import Sprite from './sprite.js';

class Paddle extends Sprite {
  constructor(x = 0, y = 0, width = 75, height = 10, color = '#0095DD') {
    super(x, y, width, height, color); 
    this.x = x
  }

  movePaddle(dx) {
    this.x += dx;
  }

  mouseMove(x) {
    this.x = x;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;