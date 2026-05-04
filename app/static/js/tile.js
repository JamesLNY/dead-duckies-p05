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
    this.entities = [];
  }

  addEntity(name) {
    this.entities.push(name);
    if (IMPASSABLE_ENTITIES.has(name)) this.passable = false;
  }

  removeEntity(name) {
    this.entities.splice(this.entities.indexOf(name), 1);
    this.passable = this.basePassable;
    entities.forEach(entity => {
      if (IMPASSABLE_ENTITIES.has(entity)) this.passable = false;
    });
  }

  highlight(ctx) {

  }

  render(ctx, hasPlayer) {
    entities.forEach(entity => {
      ctx.drawImage(entity, 0, 0, TILE_SIZE, TILE_SIZE,
        (this.x - map.x) * SCALE_FACTOR, (this.y - map.y) * SCALE_FACTOR,
        TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR
      )
    );
  }
}
