export async function getJson(file_name) {
  let raw = await fetch(`/static/json/${file_name}`, {
    cache: 'no-store'
  })
  let parsed = await raw.json()
  return parsed;
}

export const TILE_SIZE = 16;
export const SCALE_FACTOR = 2;
export const X_RES = 30;
export const Y_RES = 16;

export const CANVAS_WIDTH = TILE_SIZE * SCALE_FACTOR * X_RES;
export const CANVAS_HEIGHT = TILE_SIZE * SCALE_FACTOR * Y_RES;

export const MOVEMENT_SPEED = 1;
export const FRAME_RATE = 16;

export const ITEMS = await getJson("items.json");