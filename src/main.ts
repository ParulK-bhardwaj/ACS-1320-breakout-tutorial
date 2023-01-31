import Game from './Game';

// the game is rendered on the HTML <canvas>
const canvas = <HTMLCanvasElement> document.getElementById('myCanvas');
// variable to have 2d canvas rendering
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

// instantiate Game
const game = new Game(canvas, ctx);

// call game methods
game.eventSetup();
game.draw();
