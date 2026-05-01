import Tile from './tile.js'
import Map from './map.js'

import { MOVEMENT_SPEED, Player } from './player.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js'

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

    this.loop();
  }

  loop() {
    this.player.move(this.input.keys);
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
  new StardewValley(canvas);
})
