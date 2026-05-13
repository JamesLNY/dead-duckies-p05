
let loadedCrops = {};

export default class Crop {
  constructor(x, y, type, map, breakable=true) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = TILE_IMAGES["front"][type];
    this.image_x = OBJECT_PLACEMENT[type]["x"];
    this.image_y = OBJECT_PLACEMENT[type]["y"];

    // for (let dx = 0; dx < this.image.width / TILE_SIZE; dx++) {
    //   for (let dy = 0; dy < this.image.height / TILE_SIZE; dy++) {
    //     try { // If tile doesn't exist, just ignore
    //       let tile = map.tiles[this.x - this.image_x + dx][this.y - this.image_y + dy];
    //       if (tile.layers["front"] == null) {
    //         tile.add(true, "front");
    //       }
    //     } catch {}
    //   }
    // }
    if (breakable) {
      let tile = map.tiles[this.x][this.y];
      tile.add(this, "front");
    }
  }
}
