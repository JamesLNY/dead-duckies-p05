import { TILE_SIZE, SCALE_FACTOR, TILE_IMAGES } from "./constants.js";

const IMPASSABLE_ENTITIES = new Set([
  "twig",
  "weed",
  "stone"
])

export default class Tile {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;

    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }

    this.basePassable = this.passable;

    this.layers = {
      "back": null,
      "middle": null,
      "front": null
    };
  }

  add(entity, layer) {
    this.layers[layer] = entity;
    if (layer == "middle" && IMPASSABLE_ENTITIES.has(entity)) this.passable = false;
  }

  remove(layer) {
    this.layers[layer] = null;
    if (layer == "middle") this.passable = this.basePassable;
  }

  highlight(ctx, map) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
    ctx.fillRect((this.x * TILE_SIZE - map.x) * SCALE_FACTOR,
      (this.y * TILE_SIZE - map.y) * SCALE_FACTOR,
      TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR);
  }

  render(ctx, map) {
    // if (!this.passable) this.highlight(ctx, map);
    for (const [key, value] of Object.entries(this.layers)) {
      if (value == null) continue;
      ctx.drawImage(TILE_IMAGES[key][value], 0, 0, TILE_SIZE, TILE_SIZE,
        (this.x * TILE_SIZE - map.x) * SCALE_FACTOR,
        (this.y * TILE_SIZE - map.y) * SCALE_FACTOR,
        TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR
      )
    }
  }
}
