export const MOVEMENT_SPEED = 1;

const TILE_SIZE = 16;
const SCALE_FACTOR = 2;
const X_RES = 30;
const Y_RES = 16;

const FRAME_RATE = 16;

// Correspond with rows in player.png
const DOWN = 0;
const RIGHT = 1;
const UP = 2;
const LEFT = 3;

export class Player {
  constructor() {
    this.x = TILE_SIZE * SCALE_FACTOR * X_RES / 2;
    this.y = TILE_SIZE * SCALE_FACTOR * Y_RES / 2;

    this.facing = DOWN;
    this.moving = false;
    this.frame = 0;

    this.sprite = new Image();
    this.sprite.src = '/static/images/player.png';
  }

  move(keys) {
    if (!this.moving) {
      this.frame += FRAME_RATE;
    } else {
      this.frame = (this.frame + 1) % (4 * FRAME_RATE);
    }
    this.moving = true;
    if (keys['ArrowLeft']) {
      this.facing = LEFT;
      this.x -= MOVEMENT_SPEED;
    } else if (keys['ArrowRight']) {
      this.facing = RIGHT;
      this.x += MOVEMENT_SPEED;
    } else if (keys['ArrowUp']) {
      this.facing = UP;
      this.y -= MOVEMENT_SPEED;
    } else if (keys['ArrowDown']) {
      this.facing = DOWN;
      this.y += MOVEMENT_SPEED;
    } else { // No Longer Moving
      this.frame = 0;
      this.moving = false;
    }
  }

  render(ctx, camera) {
    ctx.drawImage(this.sprite, 
      Math.trunc(this.frame / FRAME_RATE) * TILE_SIZE, this.facing * TILE_SIZE * 2,
      TILE_SIZE, TILE_SIZE * 2, this.x - camera.x, this.y - camera.y,
      TILE_SIZE * SCALE_FACTOR, TILE_SIZE * 2 * SCALE_FACTOR
    )
  }
}