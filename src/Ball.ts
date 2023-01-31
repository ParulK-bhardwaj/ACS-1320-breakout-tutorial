import Sprite from './Sprite';

class Ball extends Sprite {
  radius: number
  x: number
  y: number
  color: string
  dx: number
  dy: number

  constructor(x = 0, y = 0, radius = 10, color = '#51a094') {
    super(x, y, 0, 0, color);
    this.color = color;
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  // Stretch Challenge - randColor Method to select random hex color for ball
  randColor() {
    this.color = `#${(Math.floor(Math.random() * 0x1000000) + 0x1000000).toString(16).substring(1)}`;
  }

  render(ctx: CanvasRenderingContext2D) { // Overrides the existing render method!
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
