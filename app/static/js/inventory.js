import { TILE_SIZE, ITEMS, HOTBAR_HEIGHT, HOTBAR_WIDTH, UI_FACTOR, HOTBAR_SIZE } from "./constants.js";

export class Inventory {
  constructor(size = 24) {
    this.slots = [];
    this.selectedSlot = 0;
    this.hotbar = new Image();
    this.hotbar.src = '/static/images/ui/hotbar.png';
    this.select = new Image();
    this.select.src = '/static/images/ui/select.png'

    for (let i = 0; i < size; i += 1) {
      this.slots[i] = {itemID: null, count: 0};
    }
  }

  selectSlot(index) {
    if (index >= 0 && index < HOTBAR_SIZE) {
      this.selectedSlot = parseInt(index);
    }
  }

  getSelectedSlot() {
    return this.slots[this.selectedSlot];
  }

  getSelectedItemID() {
    return this.slots[this.selectedSlot].itemID;
  }

  getSlot(index) {
    return this.slots[index];
  }

  addItem(itemID, amount) {
    let remaining = amount;
    for (let i = 0; i < this.slots.length; i += 1) {
      let slot = this.slots[i];
      if (slot.itemID === itemID) {
        let max = ITEMS[itemID].maxStack;
        let space = max - slot.count;
        if (space > 0) {
          let add = Math.min(space, remaining);
          slot.count += add;
          remaining -= add;
        }
      }
    }

    for (let i = 0; i < this.slots.length; i += 1) {
      let slot = this.slots[i];
      if (slot.itemID === null) {
        let max = ITEMS[itemID].maxStack;
        let add = Math.min(max, remaining);
        slot.itemID = itemID;
        slot.count = add;
        remaining -= add;
      }
      if (remaining === 0) {
        break;
      }
    }

    return remaining === 0;
  }

  removeItem(itemID, amount) {
    let remaining = amount;
    for (let i = 0; i < this.slots.length; i += 1) {
      let slot = this.slots[i];
      if (slot.itemID === itemID) {
        let remove = Math.min(slot.count,remaining);
        slot.count -= remove;
        remaining -= remove;
        if (slot.count === 0) {
          slot.itemID = null;
        }
      }
      if (remaining === 0) {
        break;
      }
    }
    return remaining === 0;
  }

  //this takes coordinates of upper left corner
  render(uiCtx, startX, startY, columns, rows, selected = true) {
    for (let i = 0; i < columns * rows; i += 1) {
      let slot = this.getSlot(i);
      let col = i % columns;
      let row = Math.floor(i / columns);

      let x = startX + col * TILE_SIZE * UI_FACTOR;
      let y = startY + row * TILE_SIZE * UI_FACTOR;

      if (selected && i === this.selectedSlot) {
        uiCtx.drawImage(this.select, x, y, 48, 48);
      }
      if (slot.itemID === null) {
        continue;
      }

      uiCtx.fillStyle = 'white';
      uiCtx.font = '14px Arial';
      uiCtx.fillText(slot.itemID, x + 8, y + 22);
      uiCtx.fillText(slot.count, x + 8, y + 44);
    }
  }

  renderHotbar(uiCtx, uiCanvas) {
    //const in here since uiCanvas is only in renderHotbar
    uiCtx.clearRect(0, 0, HOTBAR_WIDTH * UI_FACTOR, HOTBAR_HEIGHT * UI_FACTOR);
    uiCtx.drawImage(this.hotbar, 0, 0, HOTBAR_WIDTH * UI_FACTOR, HOTBAR_HEIGHT * UI_FACTOR);
    this.render(uiCtx, 9, 9, HOTBAR_SIZE, 1);
  }
}
