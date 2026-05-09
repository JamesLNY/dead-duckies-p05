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
export const TIME_CONVERSION = 240; // HIGHER = Slower Time

export const ITEMS = await getJson("items.json");

const MIDDLE_LAYER_ENTITIES = [
  "stone",
  "twig",
  "weed"
];

const FRONT_LAYER_ENTITIES = [
  "tree",
];

export const TILE_IMAGES = {
  "back": {},
  "middle": {},
  "front": {}
};

MIDDLE_LAYER_ENTITIES.forEach((entity) => {
  TILE_IMAGES["middle"][entity] = new Image();
  TILE_IMAGES["middle"][entity].src = `/static/images/middle-layer/${entity}.png`;
})

FRONT_LAYER_ENTITIES.forEach((entity) => {
  TILE_IMAGES["front"][entity] = new Image();
  TILE_IMAGES["front"][entity].src = `/static/images/front-layer/${entity}.png`;
})

// Base Tile in Image File
export const OBJECT_PLACEMENT = {
  "tree": {
    "x": 1,
    "y": 4
  }
}