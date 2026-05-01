import Tile from './tile.js'
import { MOVEMENT_SPEED, Player } from './player.js';

const TILE_SIZE = 16;
const SCALE_FACTOR = 2;
const X_RES = 30;
const Y_RES = 16;

class Camera {
  constructor(x, y) {
    // measured from upper left of image
    this.x = x;
    this.y = y;
  }

  //map image is 1280x1040
  clampEdges() {
    this.x = Math.max(0, Math.min(this.x, 1280 - TILE_SIZE * X_RES));
    this.y = Math.max(0, Math.min(this.y, 1040 - TILE_SIZE * Y_RES));
  }
  
  follow(player) {
    this.x = player.x - TILE_SIZE * X_RES * SCALE_FACTOR / 2;
    this.y = player.y - TILE_SIZE * (Y_RES / 2 - 1) * SCALE_FACTOR;
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
    this.ctx.imageSmoothingEnabled = false;


    this.map = new Image();
    this.map.src = '/static/images/farm.png';

    this.camera = new Camera(0, 0);
    this.input = new InputHandler();

    this.player = new Player();

    //tile check stuff
    //using a set for O(1) lookup later
    this.impassable = new Set();
    this.selectTiles();

    //end 
    this.loop();
  }

  render() {
    //comments cuz i will forget how canvas works
    //clearRect clears the canvas
    //drawImage takes image, then where in the image to start reading from, how large to read, where on the canvas to draw it, and stretching
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.map, this.camera.x, this.camera.y,
      this.canvas.width / SCALE_FACTOR, this.canvas.height / SCALE_FACTOR, 0, 0,
      this.canvas.width, this.canvas.height);
  }

  loop() {
    this.player.move(this.input.keys);
    this.camera.follow(this.player);
    
    this.render();
    this.player.render(this.ctx, this.camera);
    
    requestAnimationFrame(() => this.loop());
  }

  //funcs im using to click on tiles, send to dev console, and add to JSON file
  tileChecks() {
    window.addEventListener('keydown', e => {
      if (e.key === 'p') {
        //... is spread operator
        console.log(JSON.stringify([...this.impassable]));
      }
    });

    this.canvas.addEventListener('click', e => {
      const tileCol = Math.floor((e.offsetX + this.camera.x) / TILE_SIZE);
      const tileRow = Math.floor((e.offsetY + this.camera.y) / TILE_SIZE);
      if (this.impassable.has(`${tileCol}, ${tileRow}`)) {
        this.impassable.delete(`${tileCol}, ${tileRow}`); 
      } 
      else {
        this.impassable.add(`${tileCol}, ${tileRow}`);
      }
    });
  }

  colorImpassable() {
    this.ctx.fillStyle = 'rgba(255, 0 0, 0.35';
    for (const tile of this.impassable) {
      const screenX = col * TILE_SIZE - this.camera.x;
      const screenY = row * TILE_SIZE - this.camera.y;

    }
  }
}

window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  canvas.width = TILE_SIZE * SCALE_FACTOR * X_RES;
  canvas.height = TILE_SIZE * SCALE_FACTOR * Y_RES;
  new StardewValley(canvas);
})