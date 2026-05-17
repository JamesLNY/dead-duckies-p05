import { MOVEMENT_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, TILE_IMAGES, TILE_SIZE,
         UI_FACTOR, HOTBAR_HEIGHT, HOTBAR_WIDTH } from './constants.js'

import Map from './map.js'
import Player from './player.js';
import Time from './time.js';
import NPC from './npc.js';
import Shop from './shop.js';
import MouseHandler from './mouse.js';

class InputHandler {
  constructor(game) {
    this.keys = {};
    window.addEventListener('keydown', e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.keys[e.key] = true;
        e.preventDefault();
      } else if (Number.isInteger(parseInt(e.key))) {
        if (parseInt(e.key) == 0) {
          game.player.inventory.selectSlot(9);
        } else {
          game.player.inventory.selectSlot(e.key - 1);
        }
        game.player.inventory.renderHotbar(game.hotbarCtx, game.hotbarCanvas);
      } else if (e.key == "-") {
        game.player.inventory.selectSlot(10);
        game.player.inventory.renderHotbar(game.hotbarCtx, game.hotbarCanvas);
      } else if (e.key == "=") {
        game.player.inventory.selectSlot(11);
        game.player.inventory.renderHotbar(game.hotbarCtx, game.hotbarCanvas);
      } else if (e.key == "c") {
        game.player.interact(game.map);
      } else if (e.key == "Escape") {
        game.player.inventory.toggle();
        game.player.inventory.renderInventory(game.overlayCtx, game.overlayCanvas);
      }
    });
    window.addEventListener('keyup', e => {
      this.keys[e.key] = false;
    });
  }
}

//doesn't need to be a class, but doing it for organization
class StardewValley {
  constructor(canvas, hotbarCanvas, overlayCanvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    //ui canvas to stop redrawing
    this.hotbarCanvas = hotbarCanvas;
    this.hotbarCtx = this.hotbarCanvas.getContext('2d');
    this.hotbarCtx.imageSmoothingEnabled = false;

    this.overlayCanvas = overlayCanvas;
    this.overlayCtx = this.overlayCanvas.getContext('2d');
    this.overlayCtx.imageSmoothingEnabled = false;

    this.maps = {
      farm: new Map('farm'),
      town: new Map('town'),
      seedshop: new Map('seedshop')
    };
    this.currentMap = 'farm';
    this.map = this.maps['farm'];
    //so player isnt js teleported back and forth on a warp tile
    this.justTeleported = false;

    this.input = new InputHandler(this);
    this.player = new Player();
    this.time = new Time();

    //npcs and shops
    // let pierre = this.map.addNPC(5, 5, "Pierre")

    this.pierreShop = new Shop("pierre");

    this.player.inventory.addItem("axe", 1);
    this.player.inventory.addItem("hoe", 1);
    this.player.inventory.addItem("pickaxe", 1);
    this.player.inventory.addItem("watering can", 1);
    this.player.inventory.addItem("parsnip seeds", 5);

    this.player.inventory.renderHotbar(this.hotbarCtx, this.hotbarCanvas);

    //i think this loads both maps at the same time before game starts
    //MAKE IT LOAD WHEN ACTUALLY TELEPORTED
    Promise.all([
      this.maps['farm'].loadTiles('farm'),
      this.maps['town'].loadTiles('town'),
      this.maps['seedshop'].loadTiles('seedshop')
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
    } else {
      this.justTeleported = false;
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

    let npcsToDraw = this.map.render(this.ctx, this.player);
    this.player.render(this.ctx, this.map);

    // console.log(npcsToDraw);

    npcsToDraw.forEach((npc) => {
      npc.render(this.ctx, this.map)
    });

    this.time.update(this);
    this.time.render(this.ctx);

    //redraw since it won't show up otherwise
    this.player.inventory.renderHotbar(this.hotbarCtx);
    // this.pierreShop.render(this.overlayCtx);

    requestAnimationFrame(() => this.loop());
  };
}

// window.addEventListener('load', function() {
  const canvas = document.getElementById('main-canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  // StardewValley.create(canvas);

  const hotbarCanvas = document.getElementById('hotbar-canvas');
  hotbarCanvas.width = HOTBAR_WIDTH * UI_FACTOR;
  hotbarCanvas.height = HOTBAR_HEIGHT * UI_FACTOR;

  // const inventoryCanvas = document.getElementById('inventory-canvas');
  // inventoryCanvas.width = ;

  const overlayCanvas = document.getElementById('overlay-canvas');
  overlayCanvas.width = CANVAS_WIDTH;
  overlayCanvas.height = CANVAS_HEIGHT;

  new StardewValley(canvas, hotbarCanvas, overlayCanvas);
// });
