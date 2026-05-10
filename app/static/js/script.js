import { MOVEMENT_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, TILE_IMAGES, TILE_SIZE } from './constants.js'

import Map from './map.js'
import Player from './player.js';
import Time from './time.js';
class InputHandler {
  constructor() {
    this.keys = {};
    window.addEventListener('keydown', e => {
      //this prevents the overall screen from scrolling, i added it bc i thought it was annoying
      this.keys[e.key] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', e => {
      this.keys[e.key] = false;
    });
  }
}

//doesn't need to be a class, but doing it for organization
class StardewValley {
  constructor(canvas, uiCanvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    //ui canvas to stop redrawing 
    this.uiCanvas = uiCanvas;
    this.uiCtx = this.uiCanvas.getContext('2d');
    this.uiCtx.imageSmoothingEnabled = false;

    this.map = new Map('farm');
    this.input = new InputHandler();
    this.player = new Player();
    this.time = new Time();

    //test
    this.player.inventory.addItem("wood", 50);
    this.player.inventory.addItem("stone", 25);
    this.player.inventory.addItem("axe", 1);

    this.renderHotbar();

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
        console.log(`${x}, ${y}`);
        if (!this.map.tiles[x][y].tillable) continue;
        const randomNum = Math.floor(Math.random() * 100);
        if (randomNum < 2) {
          this.map.addBigEntity(x, y, "tree");
        } else if (randomNum < 7) {
          this.map.tiles[x][y].add("stone", "middle");
        } else if (randomNum < 12) {
          this.map.tiles[x][y].add("twig", "middle");
        } else if (randomNum < 17) {
          this.map.tiles[x][y].add("weed", "middle");
        }
      }
    }
    let playerTile = this.map.getTile(this.player.x, this.player.y + 23);
    playerTile.remove("middle");
    this.map.removeBigEntity(playerTile.x, playerTile.y);
  }

  renderHotbar() {
    const SLOT_SIZE = 64;
    const SPACING = 4;

    const inventory = this.player.inventory;

    this.uiCtx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

    let totalWidth = 9 * SLOT_SIZE + 8 * SPACING;
    let startX =
      (this.uiCanvas.width - totalWidth) / 2;

    for (let i = 0; i < 9; i += 1) {
      let slot = inventory.getSlot(i);
      let x = startX + i * (SLOT_SIZE + SPACING);
      let y = 18;

      this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';

      this.uiCtx.fillRect(x, y, SLOT_SIZE, SLOT_SIZE);

      if (i === inventory.selectedSlot) {
        this.uiCtx.strokeStyle = 'yellow';
        this.uiCtx.lineWidth = 4;
        this.uiCtx.strokeRect( x, y, SLOT_SIZE, SLOT_SIZE);
      }

      if (slot.itemID === null) {
        continue;
      }

      this.uiCtx.fillStyle = 'white';
      this.uiCtx.font = '14px Arial';

      this.uiCtx.fillText(slot.itemID, x + 8, y + 22);

      this.uiCtx.fillText(slot.count, x + 8, y + 44);
    }
  }

updateHotbarInput() {
  for (let i = 1; i <= 9; i += 1) {
    if (this.input.keys[i]) {
      this.player.inventory.selectSlot(i - 1);
      this.renderHotbar();

      this.input.keys[i] = false;
    }
  }
}

loop() {
  this.updateHotbarInput();
  this.player.move(this.input.keys, this.map);
  this.map.follow(this.player);

  this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  this.map.render(this.ctx, this.player);
  this.player.render(this.ctx, this.map);

  this.time.update();
  this.time.render(this.ctx);

  requestAnimationFrame(() => this.loop());
  };
}

// window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  // StardewValley.create(canvas);

  const uiCanvas = document.getElementById('ui-canvas');
  uiCanvas.width = CANVAS_WIDTH;
  uiCanvas.height = 100;

  new StardewValley(canvas, uiCanvas);
// });