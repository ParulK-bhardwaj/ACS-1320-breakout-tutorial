import Sprite from './Sprite';

class Brick extends Sprite {
  x: number
  y: number
  status: boolean

  constructor(x: number, y: number, width = 75, height = 20, color = '#133337') {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = true;// adds a new property
  }
}

export default Brick;
