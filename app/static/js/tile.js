export default class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);
  }
}