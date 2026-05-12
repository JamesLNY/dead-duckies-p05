import { ITEMS } from "./constants.js";

const HOTBAR_SIZE = 9;
const SLOT_SIZE = 64;
const SPACING = 4;

export class Hotbar {
  render(inventory) {
  }
}

export class Inventory {
  constructor(size = 24) {
    this.slots = [];
    this.selectedSlot = 0;

    for (let i = 0; i < size; i += 1) {
      this.slots[i] = { itemID: null, count: 0 };
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
        let remove = Math.min(slot.count, remaining);
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

//debug
  getSlot(index) {
    return this.slots[index];
  }

  // Renders inventory
  render() {

  }

  renderHotbar(uiCtx, uiCanvas) {
    uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

    let totalWidth = HOTBAR_SIZE * SLOT_SIZE + (HOTBAR_SIZE - 1) * SPACING;
    let startX = (uiCanvas.width - totalWidth) / 2;

    for (let i = 0; i < HOTBAR_SIZE; i += 1) {
      let slot = this.getSlot(i);
      let x = startX + i * (SLOT_SIZE + SPACING);
      let y = 18;

      uiCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';

      uiCtx.fillRect(x, y, SLOT_SIZE, SLOT_SIZE);

      if (i === this.selectedSlot) {
        uiCtx.strokeStyle = 'yellow';
        uiCtx.lineWidth = 4;
        uiCtx.strokeRect( x, y, SLOT_SIZE, SLOT_SIZE);
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
}
