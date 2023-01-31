class Point {
  x: number
  y: number
  color: string
  value: number
  font: string
  text: string

  constructor(x: number, y: number, value: number, text: string) {
    this.x = x;
    this.y = y;
    this.color = '#0095DD';
    this.value = value;
    this.font = '16px Arial';
    this.text = text;
  }

  // Display the text
  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}

export default Point;
