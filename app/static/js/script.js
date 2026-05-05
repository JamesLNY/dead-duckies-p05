import { MOVEMENT_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, TILE_IMAGES, TILE_SIZE } from './constants.js'

import Map from './map.js'
import Player from './player.js';

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

    this.map = new Map('farm');
    this.input = new InputHandler();
    this.player = new Player();

    this.map.loadTiles('farm').then(() => {
      this.initializeFarm();
      this.loop();
    })

    // this.initializeFarm();
    // this.loop();
  }

  // static async create(canvas) {
  //   let game = new StardewValley(canvas);
  //   await game.map.loadTiles();
  //   game.initializeFarm();
  //   game.loop();
  // }

  initializeFarm() {
    for (let x = 0; x < this.map.tiles.length; x++) {
      for (let y = 0; y < this.map.tiles[x].length; y++) {
        if (!this.map.tiles[x][y].passable) continue;
        const randomNum = Math.floor(Math.random() * 20);
        switch (randomNum) {
          case 0:
            this.map.tiles[x][y].add("stone", "middle");
            break;
          case 1:
            this.map.tiles[x][y].add("twig", "middle");
            break;
          case 2:
            this.map.tiles[x][y].add("weed", "middle");
            break;
        }
      }
    }
    this.map.getTile(this.player.x, this.player.y + 23).remove("middle");
  }

  loop() {
    this.player.move(this.input.keys, this.map);
    this.map.follow(this.player);

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.map.render(this.ctx);
    this.player.render(this.ctx, this.map);

    requestAnimationFrame(() => this.loop());
  }
}

window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  // StardewValley.create(canvas);
  new StardewValley(canvas);
})
