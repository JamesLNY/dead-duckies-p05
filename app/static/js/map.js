import { TILE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, X_RES, Y_RES, SCALE_FACTOR } from './constants.js'

export default class Map {
  constructor(name) {
    this.image = new Image();
    this.image.src = `/static/images/maps/${name}.png`

    this.tiles = []; // Will be a 2D Array;
  }
  clampEdges() {
    this.x = Math.max(0, Math.min(this.x, 1280 - TILE_SIZE * X_RES));
    this.y = Math.max(0, Math.min(this.y, 1040 - TILE_SIZE * Y_RES));
  }
  follow(player) {
    this.x = player.x - CANVAS_WIDTH / 2;
    this.y = player.y - CANVAS_HEIGHT / 2 - SCALE_FACTOR * TILE_SIZE;
    this.clampEdges();
  }
  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y,
      X_RES * TILE_SIZE, Y_RES * TILE_SIZE, 0, 0,
      CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
