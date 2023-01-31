// A Sprite is a game object. TO create the rectangle on the screen

class Sprite {
  x: number
  y: number
  width: number
  height: number
  color: string

  constructor(x = 0, y = 0, width = 100, height = 100, color = '#f00') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  //  As shown in the class, made this methods into parent class.
  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  moveBy(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  render(ctx: CanvasRenderingContext2D ): void {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
