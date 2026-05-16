import { TILE_SIZE, CROPS, SCALE_FACTOR } from './constants.js'

let loadedCrops = {};

export default class Crop {
  constructor(x, y, map) {
    this.type = null;
    this.tile = map.tiles[x][y];
    
    this.tile.add("tilled", "back");
    this.tile.add(this, "middle");
    this.x = x;
    this.y = y;
    this.watered = false;
  }

  water() {
    this.tile.add("watered", "back");
    this.watered = true;
  }

  dry() {
    this.tile.add("tilled", "back");
    this.watered = false;
  }

  plant(type) {
    this.type = type;
    if (type in loadedCrops) {
      this.image = loadedCrops[type];
    } else {
      let asset = new Image();
      asset.src = `/static/images/middle-layer/crops/${type}.png`;
      loadedCrops[type] = asset;
      this.image = asset;
    }
    this.growthTime = CROPS[type]["growthTime"];
    this.progress = 0;
  }

  update() {
    if (this.progress < this.growthTime) {
      this.progress++;
    }
  }

  remove() {
    this.tile.remove("back");
    this.tile.remove("middle");
  }

  harvest() {
    
  }

  render(ctx, map) {
    if (this.type != null) {
      ctx.drawImage(this.image, this.progress * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE,
        (this.x * TILE_SIZE - map.x) * SCALE_FACTOR,
        (this.y * TILE_SIZE - map.y) * SCALE_FACTOR,
        TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR)
    }
  }
}
