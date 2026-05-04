export async function getJson(file_name) {
  let raw = await fetch(`/static/json/${file_name}`, {
    cache: 'no-store'
  })
  let parsed = await raw.json()
  return parsed;
}

// Specifically for editor.html
const TILE_SIZE = 16;
const MAP_WIDTH = 1280;
const MAP_HEIGHT = 1040;
const MODIFYING_ATTRIBUTE = "passable";
const DEFAULT_VALUE = true;

const map = new Image();
map.src = '/static/images/maps/farm.png';

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// let tiles = [];
// for (let x = 0; x < MAP_WIDTH / TILE_SIZE; x++) {
//   tiles.push([]);
//   for (let y = 0; y < MAP_HEIGHT / TILE_SIZE; y++) {
//     tiles.at(-1).push({
//       "passable": true,
//       "tillable": true, // Only for farm map
//       "teleporter": false,
//       "destination": null // Otherwise {"map": <mapName>, "tile": [<x>, <y>]}
//     })
//   }
// }

let tiles = await getJson("maps/farm.json");

let paint = true;
let held = false;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(map, 0, 0, MAP_WIDTH, MAP_HEIGHT, 0, 0, MAP_WIDTH, MAP_HEIGHT);

  ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
  for (let x = 0; x < MAP_WIDTH / TILE_SIZE; x++) {
    for (let y = 0; y < MAP_HEIGHT / TILE_SIZE; y++) {
      if (tiles[x][y][MODIFYING_ATTRIBUTE] != DEFAULT_VALUE) {
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

function draw(e) {
  render();
  const x = Math.floor((e.offsetX) / TILE_SIZE);
  const y = Math.floor((e.offsetY) / TILE_SIZE);
  if (paint) {
    tiles[x][y][MODIFYING_ATTRIBUTE] = !DEFAULT_VALUE;
  } else {
    tiles[x][y][MODIFYING_ATTRIBUTE] = DEFAULT_VALUE;
  }
}

window.addEventListener('load', function() {
  canvas.width = MAP_WIDTH;
  canvas.height = MAP_HEIGHT;
  render();
})

window.addEventListener('keydown', e => {
  if (e.key === 'p') {
    console.log(JSON.stringify(tiles));
  } else if (e.key === 's') {
    let a = document.createElement("a");
    let json = JSON.stringify(tiles, null, 2);
    let file = new Blob([json], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = "thing.json";
    a.click();
  } else if (e.key === 't') {
    paint = !paint;
  }
})

canvas.addEventListener('mousedown', e => {
  held = true;
  draw(e);
});

canvas.addEventListener('mousemove', e => {
  if (held) draw(e);
});

canvas.addEventListener('mouseup', e => {
  held = false;
});
