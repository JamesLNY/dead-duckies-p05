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
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.map = new Map('farm');
    this.input = new InputHandler();
    this.player = new Player();
    this.time = new Time();

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

    for (let i = 0; i < 9; i += 1) {
      let slot = inventory.getSlot(i);

      let x = 20 + i * (SLOT_SIZE + SPACING);
      let y = CANVAS_HEIGHT - SLOT_SIZE - 20;

      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(x, y, SLOT_SIZE, SLOT_SIZE);

      if (i === inventory.selectedSlot) {
        this.ctx.strokeStyle = 'yellow';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, SLOT_SIZE, SLOT_SIZE);
      }

      if (slot.itemID === null) {
        continue;
      }

      this.ctx.fillStyle = 'white';
      this.ctx.font = '14px Arial';

      this.ctx.fillText(slot.itemID, x + 8, y + 22);
      this.ctx.fillText(slot.count, x + 8, y + 44);
    }
  }

  loop() {
    for (let i = 1; i <= 9; i += 1) {
      if (this.input.keys[i]) {
      this.player.inventory.selectSlot(i - 1);
     }
    }

    this.player.move(this.input.keys, this.map);
    this.map.follow(this.player);

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.map.render(this.ctx, this.player);
    this.player.render(this.ctx, this.map);
    this.time.update();
    this.time.render(this.ctx);
    this.renderHotbar();

    requestAnimationFrame(() => this.loop());
  }
}

const canvas = document.getElementById('main-canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// StardewValley.create(canvas);
new StardewValley(canvas);
