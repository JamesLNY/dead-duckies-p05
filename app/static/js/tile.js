export default class Tile {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;

    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }

    this.entities = [];
  }

  highlight() {

  }

  render(ctx, hasPlayer) {

  }
}