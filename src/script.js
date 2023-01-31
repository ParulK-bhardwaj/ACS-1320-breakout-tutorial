import Game from './Game.js';

// the game is rendered on the HTML <canvas>
const canvas = document.getElementById('myCanvas');
// variable to have 2d canvas rendering
const ctx = canvas.getContext('2d');

// instantiate Game
const game = new Game(canvas, ctx);
