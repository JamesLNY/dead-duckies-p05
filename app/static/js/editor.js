// key bindings
// t - add tile/remove tile mode
// s - download JSON
// p - print tile to console

async function getJson(file_name) {
  let raw = await fetch(`/static/json/${file_name}`, {
    cache: 'no-store'
  })
  let parsed = await raw.json()
  return parsed;
}

const TILE_SIZE = 16;
// const MAP_WIDTH = 1280;
// const MAP_HEIGHT = 1040;
// const MODIFYING_ATTRIBUTE = "passable";
// const DEFAULT_VALUE = true;
const PROPERTIES = {
  passable: {defaultValue: true, color: 'rgba(255, 0, 0, 0.35)'},
  tillable: {defaultValue: true, color: 'rgba(0, 255, 0, 0.35)'},
  teleporter: {defaultValue: false, color: 'rgba(0, 0, 255, 0.35)'}
};

const propertySelect = document.getElementById('property-select');
const mapSelect = document.getElementById('map-select');

let currentProperty = 'passable';
let currentMap = 'farm';

let map = new Image();
map.src = '/static/images/maps/farm.png'

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

//this initializes initial json for a map
// let tiles = [];
// for (let x = 0; x < map.width / TILE_SIZE; x++) {
//   tiles.push([]);
//   for (let y = 0; y < map.height / TILE_SIZE; y++) {
//     tiles.at(-1).push({
//       "passable": true,
//       "tillable": true, // Only for farm map
//       "teleporter": false,
//       "destination": null // Otherwise {"map": <mapName>, "tile": [<x>, <y>]}
//     })
//   }
// }
// console.log(tiles);

let tiles = await getJson('maps/farm.json');

//this converts every impassable tile into an untillable one
// async function tillableHelper() {
//   for (const col of tiles) {
//     for (const tile of col) {
//       if (!tile.passable) {
//         tile.tillable = false;
//       }
//     }
//   }
//   render();
// }

// tillableHelper();


let paint = true;
let held = false;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(map, 0, 0, map.width, map.height, 0, 0, map.width, map.height);

  for (const [key, def] of Object.entries(PROPERTIES)) {
    ctx.fillStyle = def.color;
    for (let x = 0; x < map.width / TILE_SIZE; x++) {
      for (let y = 0; y < map.height / TILE_SIZE; y++) {
        if (tiles[x][y][key] != def.defaultValue) {
          ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  // ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
  // for (let x = 0; x < MAP_WIDTH / TILE_SIZE; x++) {
  //   for (let y = 0; y < MAP_HEIGHT / TILE_SIZE; y++) {
  //     if (tiles[x][y][MODIFYING_ATTRIBUTE] != DEFAULT_VALUE) {
  //       ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  //     }
  //   }
  // }
  }
}

function draw(e) {
  const x = Math.floor((e.offsetX) / TILE_SIZE);
  const y = Math.floor((e.offsetY) / TILE_SIZE);
  console.log(`${x}, ${y}`);
  if (currentProperty === 'setwarp') {
    if (!tiles[x][y].teleporter) {
      return;
    }
    held = false;
    const destination = prompt('destination map?');
    if (!destination) return;
    const destX = parseInt(prompt('destination x?'));
    if (isNaN(destX)) return;
    const destY = parseInt(prompt("destination y?"));
    if (isNaN(destY)) return;
    tiles[x][y].destination = { map: destination, x: destX, y: destY};
    console.log('yay dis worked');
    render();
    return;
  }
  if (paint) {
    tiles[x][y][currentProperty] = !PROPERTIES[currentProperty].defaultValue;
  } else {
    tiles[x][y][currentProperty] = PROPERTIES[currentProperty].defaultValue;
  }
  render();
}


window.addEventListener('load', function() {
  map.onload = () => {
    canvas.width = map.width;
    canvas.height = map.height;
    ctx.imageSmoothingEnabled = false;
    render();
  }
  map.src = '/static/images/maps/farm.png'
});

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
});

propertySelect.addEventListener('change', () => {
  currentProperty = propertySelect.value;
});

mapSelect.addEventListener('change', async () => {
  currentMap = mapSelect.value;
  tiles = await getJson(`maps/${currentMap}.json`);
  map = new Image()
  map.onload = () => {
    canvas.width = map.width;
    canvas.height = map.height;
    ctx.imageSmoothingEnabled = false;
    render();
  };
  map.src = `/static/images/maps/${currentMap}.png`
});

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
