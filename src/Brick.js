import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#133337') {
    super(x, y, width, height, color) // pass arguments to Sprite!
    this.status = 1 // adds a new property
  }

  render(ctx) { // Overrides the existing render method!
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;