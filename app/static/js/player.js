import BigEntity from "./big-entity.js";
import { TILE_SIZE, ENTITIES, SCALE_FACTOR, CANVAS_WIDTH, CANVAS_HEIGHT, FRAME_RATE, MOVEMENT_SPEED } from "./constants.js";
import { Inventory } from './inventory.js';
import NPC from "./npc.js"
import Crop from "./npc.js"

// Correspond with rows in player.png
const DOWN = 0;
const RIGHT = 1;
const UP = 2;
const LEFT = 3;

function passable(tile) {
  return tile != null && tile.passable;
}

export default class Player {
  constructor() {
    this.x = TILE_SIZE * 9;
    this.y = TILE_SIZE * 10;

    this.facing = DOWN;
    this.moving = false;
    this.frame = 0;

    this.inventory = new Inventory();

    this.sprite = new Image();
    this.sprite.src = '/static/images/player.png';
  }

  move(keys, map) {
    if (!this.moving) {
      this.frame += FRAME_RATE;
    } else {
      this.frame = (this.frame + 1) % (4 * FRAME_RATE);
    }

    let x = this.x, y = this.y;

    this.moving = true;
    if (keys['ArrowLeft']) {
      this.facing = LEFT;
      x -= MOVEMENT_SPEED;

      if (!passable(map.getTile(x - TILE_SIZE * 0.25, y + TILE_SIZE)) ||
          !passable(map.getTile(x - TILE_SIZE * 0.25, y + 23))) return;
    } else if (keys['ArrowRight']) {
      this.facing = RIGHT;
      x += MOVEMENT_SPEED;

      if (!passable(map.getTile(x + TILE_SIZE * 0.25, y + TILE_SIZE)) ||
          !passable(map.getTile(x + TILE_SIZE * 0.25, y + 23))) return;
    } else if (keys['ArrowUp']) {
      this.facing = UP;
      y -= MOVEMENT_SPEED;

      if (!passable(map.getTile(x - TILE_SIZE * 0.25, y + TILE_SIZE)) ||
          !passable(map.getTile(x + TILE_SIZE * 0.25, y + TILE_SIZE))) return;
    } else if (keys['ArrowDown']) {
      this.facing = DOWN;
      y += MOVEMENT_SPEED;

      if (!passable(map.getTile(x - TILE_SIZE * 0.25, y + 23)) ||
          !passable(map.getTile(x + TILE_SIZE * 0.25, y + 23))) return;
    } else { // No Longer Moving
      this.frame = 0;
      this.moving = false;
    }

    // if (this.moving && map.getTile(x, y + TILE_SIZE).passable) {
      this.x = x;
      this.y = y;
    // }
  }

  interact(map) {
    let item = this.inventory.getSelectedItemID();
    let tile = this.getTile(map);
    let entity = tile.layers["middle"];
    if (tile.layers["back"] == "tilled" && item == "pickaxe") {
      tile.layers["middle"].remove();
    } else if (item == "hoe") {
      if (entity == null && tile.tillable) {
        
      }
    } else {
      if (entity instanceof NPC) {
        console.log("Meeting npc");
      } else if (entity != null) {
        if (ENTITIES[entity]["tools"].includes(item)) {
          tile.remove("middle");
          for (const [key, value] of Object.entries(ENTITIES[entity]["drops"])) {
            this.inventory.addItem(key, value);
          }
        }
      }
      entity = tile.layers["front"];
      if (entity instanceof BigEntity) {
        if (ENTITIES[entity.type]["tools"].includes(item)) {
          map.removeBigEntity(tile.x, tile.y);
          for (const [key, value] of Object.entries(ENTITIES[entity.type]["drops"])) {
            this.inventory.addItem(key, value);
          }
        }
      }
    }
  }

  getTile(map) {
    let tile;
    switch (this.facing) {
      case LEFT:
        tile = map.getTile(this.x - TILE_SIZE * 0.5, this.y + TILE_SIZE * 1.25);
        break;
      case RIGHT:
        tile = map.getTile(this.x + TILE_SIZE * 0.5, this.y + TILE_SIZE * 1.25);
        break;
      case UP:
        tile = map.getTile(this.x, this.y);
        break;
      case DOWN:
        tile = map.getTile(this.x, this.y + TILE_SIZE * 1.5 + MOVEMENT_SPEED);
        break;
    }
    return tile;
  }

  render(ctx, map) {
    ctx.drawImage(this.sprite,
      Math.trunc(this.frame / FRAME_RATE) * TILE_SIZE, this.facing * TILE_SIZE * 2, // Original Image
      TILE_SIZE, TILE_SIZE * 2,
      (this.x - map.x) * SCALE_FACTOR, (this.y - map.y) * SCALE_FACTOR,
      TILE_SIZE * SCALE_FACTOR, TILE_SIZE * 2 * SCALE_FACTOR
    )
    let tile = this.getTile(map);
    if (tile) tile.highlight(ctx, map);
  }
}
