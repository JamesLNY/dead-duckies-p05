let impassable = new Set();
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const map = new Image();
map.src = '/static/images/farm.png';

const X = 0;
const Y = 1;
const TILE_SIZE = 16;

let paint = true;
let held = false;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(map, 0, 0, 1280, 1040, 0, 0, 1280, 1040);

  ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
  for (const tile of impassable) {
    let parsed = tile.split(',');
    ctx.fillRect(parsed[X] * TILE_SIZE, parsed[Y] * TILE_SIZE, 16, 16);
  }
}

function draw(e) {
  render();
  const tileCol = Math.floor((e.offsetX) / TILE_SIZE);
  const tileRow = Math.floor((e.offsetY) / TILE_SIZE);
  if (paint) {
    impassable.add(`${tileCol}, ${tileRow}`);
  } else {
    impassable.delete(`${tileCol}, ${tileRow}`);
  }
}

window.addEventListener('load', function() {
  canvas.width = 1280;
  canvas.height = 1040;
  render();
})

window.addEventListener('keydown', e => {
  if (e.key === 'p') {
    console.log(JSON.stringify([...impassable]));
  } else if (e.key === 's') {
    let a = document.createElement("a");
    let json = JSON.stringify([...impassable], null, 2);
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
