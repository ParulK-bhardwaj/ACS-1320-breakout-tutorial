class Point {
  constructor(x, y, value, text) {
    this.x = x;
    this.y = y;
    this.color = '#0095DD';
    this.value = value;
    this.font = '16px Arial';
    this.text = text;
  }

  // Display the text
  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}

export default Point;
