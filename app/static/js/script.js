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
  //James:
  //WHEN USER CHARACTER IS ADDED, CHANGE THIS TO FOLLOW THE PLAYER
  //ADD PLAYER CLASS AND MOVE THIS TO PLAYER
  //tell me when you do this so i can update this func
  move(keys) {
    if (keys['ArrowLeft']) this.x -= this.speed;
    if (keys['ArrowRight']) this.x += this.speed;
    if (keys['ArrowUp']) this.y -= this.speed;
    if (keys['ArrowDown']) this.y += this.speed;
    this.clampEdges();
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

//doesn't need to be a class, but doing it for organization
class StardewValley {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.map = new Image();
    this.map.onload = () => this.render();
    this.map.src = '/static/images/Farm.png';
    this.camera = new Camera(0, 0, 5); //speed 5 px/frame for now, can adjust later
    this.input = new InputHandler();
    this.loop();
  }

  render() {
    //comments cuz i will forget how canvas works
    //clearRect clears the canvas
    //drawImage takes image, then where in the image to start reading from, how large to read, where on the canvas to draw it, and stretching
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.map, this.camera.x, this.camera.y, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
  }

  loop() {
    this.camera.move(this.input.keys);
    this.render();
    requestAnimationFrame(() => this.loop());
  }
}

window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  canvas.width = TILE_SIZE * X_RES;
  canvas.height = TILE_SIZE * Y_RES;
  new StardewValley(canvas);
})
