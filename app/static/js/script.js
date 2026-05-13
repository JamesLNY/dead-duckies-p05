import { MOVEMENT_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, TILE_IMAGES, TILE_SIZE,
         UI_FACTOR, HOTBAR_HEIGHT, HOTBAR_WIDTH } from './constants.js'

import Map from './map.js'
import Player from './player.js';
import Time from './time.js';
import NPC from './npc.js';
import Shop from './shop.js';

class InputHandler {
  constructor(game) {
    this.keys = {};
    window.addEventListener('keydown', e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.keys[e.key] = true;
        e.preventDefault();
      } else if (Number.isInteger(parseInt(e.key))) {
        if (parseInt(e.key) == 0) {
          game.player.inventory.selectSlot(10);
        } else {
          game.player.inventory.selectSlot(e.key - 1);
        }
        game.player.inventory.renderHotbar(game.uiCtx, game.uiCanvas);
      } else if (e.key == "-") {
        game.player.inventory.selectSlot(11);
        game.player.inventory.renderHotbar(game.uiCtx, game.uiCanvas);
      } else if (e.key == "=") {
        game.player.inventory.selectSlot(12);
        game.player.inventory.renderHotbar(game.uiCtx, game.uiCanvas);
      } else if (e.key == "c") {
        game.player.interact(game.map);
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

    this.maps = {
      farm: new Map('farm'),
      town: new Map('town'),
      // town: new Map('town'),
    };
    this.currentMap = 'farm';
    this.map = this.maps['farm'];
    //so player isnt js teleported back and forth on a warp tile
    this.justTeleported = false;

    this.input = new InputHandler(this);
    this.player = new Player();
    this.time = new Time();

    //npcs and shops
    this.pierre = new NPC("Pierre");
    this.willy = new NPC("Willy");

    this.pierreShop = new Shop({"seed": 25})

    //test
    this.player.inventory.addItem("axe", 1);
    this.player.inventory.addItem("hoe", 1)

    this.player.inventory.renderHotbar(this.uiCtx, this.uiCanvas);

    //i think this loads both maps at the same time before game starts
    Promise.all([
      this.maps['farm'].loadTiles('farm'),
      this.maps['town'].loadTiles('town'),
    ]).then(() => {
      this.initializeFarm();
      this.loop();
    });
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

checkTeleport() {
  const tile = this.map.getTile(this.player.x, this.player.y + 23);
  if (tile && tile.teleporter && tile.destination) {
    if (!this.justTeleported) {
      this.justTeleported = true;
      this.currentMap = tile.destination.map;
      this.map = this.maps[tile.destination.map];
      this.player.x = tile.destination.x * TILE_SIZE;
      this.player.y = tile.destination.y * TILE_SIZE;
    }
    else {
      this.justTeleported = false;
    }
  }
}

pauseLoop() {

}

loop() {
  // this.updateHotbarInput();
  this.player.move(this.input.keys, this.map);
  this.checkTeleport();

  this.map.follow(this.player);

  this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  this.map.render(this.ctx, this.player);
  this.player.render(this.ctx, this.map);

  this.time.update();
  this.time.render(this.ctx);

  //redraw since it won't show up otherwise
  this.player.inventory.renderHotbar(this.uiCtx, this.uiCanvas);

  requestAnimationFrame(() => this.loop());
  };
}

// window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  // StardewValley.create(canvas);

  const uiCanvas = document.getElementById('ui-canvas');
  uiCanvas.width = HOTBAR_WIDTH * UI_FACTOR;
  uiCanvas.height = HOTBAR_HEIGHT * UI_FACTOR;

  new StardewValley(canvas, uiCanvas);
// });
