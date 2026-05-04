import { TILE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, X_RES, Y_RES, SCALE_FACTOR, getJson } from './constants.js'
import Tile from './tile.js';

export default class Map {
  constructor(name) {
    this.image = new Image();
    this.image.src = `/static/images/maps/${name}.png`

    this.loadTiles(name);
  }

  async loadTiles(name) {
    this.tiles = [];
    const data = await getJson(`maps/${name}.json`);
    for (let x = 0; x < data.length; x++) {
      this.tiles.push([]);
      for (let y = 0; y < data[x].length; y++) {
        this.tiles.at(-1).push(new Tile(x, y, data[x][y]));
      }
    }
  }

  // Physical coordinate in unscaled map
  getTile(x, y) {
    x = Math.round(x / TILE_SIZE);
    y = Math.round(y / TILE_SIZE);
    return this.tiles[x][y];
  }

  clampEdges() {
    this.x = Math.max(0, Math.min(this.x, this.image.width - TILE_SIZE * X_RES));
    this.y = Math.max(0, Math.min(this.y, this.image.height - TILE_SIZE * Y_RES));
  }

  follow(player) {
    this.x = player.x - CANVAS_WIDTH / SCALE_FACTOR / 2;
    this.y = player.y - CANVAS_HEIGHT / SCALE_FACTOR / 2;
    this.clampEdges();
  }

  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y,
      X_RES * TILE_SIZE, Y_RES * TILE_SIZE, 0, 0,
      CANVAS_WIDTH, CANVAS_HEIGHT);
    let leftBound = Math.trunc(this.x / TILE_SIZE);
    let rightBound = Math.ceil((this.x + CANVAS_WIDTH) / TILE_SIZE);
    let topBound = Math.ceil(this.y / TILE_SIZE);
    let bottomBound = Math.trunc((this.y + CANVAS_HEIGHT) / TILE_SIZE);
    for (let x = leftBound; x < rightBound; x++) {
      for (let y = topBound; y < bottomBound; y++) {
        this.tiles[x][y].render();
      }
    }
  }
}
