import Tile from './tile.js'

const TILE_SIZE = 32;
const X_RES = 30;
const Y_RES = 16;

window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = TILE_SIZE * X_RES;
  canvas.height = TILE_SIZE * Y_RES;
})