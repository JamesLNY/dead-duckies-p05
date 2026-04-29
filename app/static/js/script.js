import Tile from './tile.js'

const TILE_SIZE = 32;
const X_RES = 30;
const Y_RES = 16;

//speed a variable rn but can js hardcode
class Camera {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed; 
  }

  //map image is 1280x1040 
  clampEdges() {
    this.x = Math.max(0, Math.min(this.x, 1280 - TILE_SIZE * X_RES));
    this.y = Math.max(0, Math.min(this.y, 1040 - TILE_SIZE * Y_RES));
  }

  //keys pressed stored in keys object
  //makes scrolling smoother 
  //also i didn't add a control so faster computers will scroll faster
  //not sure if that's a big issue but i can fix it if it's noticeable
  move(keys) {
    if (keys['ArrowLeft']) this.x -= this.speed;
    if (keys['ArrowRight']) this.x += this.speed;
    if (keys['ArrowUp']) this.y -= this.speed;
    if (keys['ArrowDown']) this.y += this.speed;
    this.clampEdges();
  }
}

class Map {
  constructor()  {
    this.width = 1280;
    this.height = 1040;
  }
}

class InputHandler {
  constructor() {
    this.keys = {};
    window.addEventListener('keydown', e => {
      //i didn't add a preventDefault
      //lmk if it's an issue though and i'll fix
      this.keys[e.key] = true;
    });
    window.addEventListener('keyup', e => {
      this.keys[e.key] = false;
    });
  }
}

class StarDewValley { 
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = new Image();
    this.map.src = '/static/images/farm.png';
    this.map.onload = () => this.render(); 
    //render func not done yet
    

  }
}

window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = TILE_SIZE * X_RES;
  canvas.height = TILE_SIZE * Y_RES;
})