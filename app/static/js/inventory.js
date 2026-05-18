import {TILE_SIZE, ITEMS, HOTBAR_HEIGHT, HOTBAR_WIDTH, UI_FACTOR, HOTBAR_SIZE, INVENTORY_HEIGHT, INVENTORY_WIDTH} from "./constants.js";

let loadedItems = {};

export class Inventory {
  constructor(size = 24) {
    this.slots = [];
    this.selectedSlot = 0;
    this.open = false;
    this.draggingSlot = null;
    this.draggingItem = null;
    this.hotbar = new Image();
    this.hotbar.src = '/static/images/ui/hotbar.png';
    this.inventoryMenu = new Image();
    this.inventoryMenu.src = '/static/images/ui/inventory.png';
    this.select = new Image();
    this.select.src = '/static/images/ui/select.png';

    let itemNames = ["axe", "fish","hoe", "mixed_seeds", "pickaxe", "scythe", "parsnip_seeds", "stone", "watering_can", "wood"];

    for (let i = 0; i < itemNames.length; i += 1) {
      let name = itemNames[i];
      let asset = new Image();
      asset.src = `/static/images/items/${name}.png`;
      loadedItems[name] = asset;
    }
    for (let i = 0; i < size; i += 1) {
      //this.slots.count = this.slots.itemID ? this.slots.count : 0;
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
    if (!(itemID in loadedItems)) {
      let asset = new Image();
      asset.src = `/static/images/items/${itemID}.png`;
      loadedItems[itemID] = asset;
    }

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

  getSlotAtPosition(mouseX, mouseY, startX, startY, columns, rows) {
    for (let i = 0; i < columns * rows; i += 1) {
      let col = i % columns;
      let row = Math.floor(i / columns);
      let x = startX + col * TILE_SIZE * UI_FACTOR;
      let y = startY + row * TILE_SIZE * UI_FACTOR;
      let size = TILE_SIZE * UI_FACTOR;
      if (mouseX >= x &&  mouseX <= x + size && mouseY >= y && mouseY <= y + size) {
        return i;
      }
    }
    return null;
  }
  startDrag(index) {
    let slot = this.slots[index];
    if (slot.itemID === null) {
      return;
    }
    this.draggingSlot = index;
    this.draggingItem = {
      itemID: slot.itemID,
      count: slot.count
    };
    slot.itemID = null;
    slot.count = 0;
  }

  endDrag(index) {
    if (this.draggingItem === null) {
      return;
    }
    let target = this.slots[index];
    if (target.itemID === null) {
      target.itemID = this.draggingItem.itemID;
      target.count = this.draggingItem.count;
    }
    else if (target.itemID === this.draggingItem.itemID) {
      let max = ITEMS[target.itemID].maxStack;
      let space = max - target.count;
      let add = Math.min(space, this.draggingItem.count);
      target.count += add;
      this.draggingItem.count -= add;
      if (this.draggingItem.count > 0) {
        this.slots[this.draggingSlot] = {
          itemID: this.draggingItem.itemID,
          count: this.draggingItem.count
        };
      }
    }

    else {
      let temp = {
        itemID: target.itemID,
        count: target.count
      };
      target.itemID = this.draggingItem.itemID;
      target.count = this.draggingItem.count;
      this.slots[this.draggingSlot] = temp;
    }
    this.draggingItem = null;
    this.draggingSlot = null;
  }

  render(ctx, startX, startY, columns, rows, selected = true) {
    for (let i = 0; i < columns * rows; i += 1) {
      let slot = this.getSlot(i);
      let col = i % columns;
      let row = Math.floor(i / columns);

      let x = startX + col * TILE_SIZE * UI_FACTOR;
      let y = startY + row * TILE_SIZE * UI_FACTOR;

      if (selected && i === this.selectedSlot) {
        ctx.drawImage(this.select, x, y, 48, 48);
      }
      if (slot.itemID === null) {
        continue;
      }

      let imageName = slot.itemID.replaceAll(" ", "_");

      if (loadedItems[imageName]) {
        ctx.drawImage(loadedItems[imageName], x + 8, y + 8, 32, 32);
      }

      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.fillText(slot.count, x + 30, y + 42);
    }
  }

  renderHotbar(hotbarCtx) {
    hotbarCtx.clearRect( 0,  0, HOTBAR_WIDTH * UI_FACTOR, HOTBAR_HEIGHT * UI_FACTOR);
    hotbarCtx.drawImage(this.hotbar, 0, 0, HOTBAR_WIDTH * UI_FACTOR, HOTBAR_HEIGHT * UI_FACTOR );
    this.render(hotbarCtx, 9, 9, HOTBAR_SIZE, 1);
  }

  renderInventory(overlayCtx, canvas) {
    overlayCtx.clearRect(0, 0, canvas.width, canvas.height);
    if (!this.open) {
      return;
    }

    let width = INVENTORY_WIDTH * UI_FACTOR;
    let height = INVENTORY_HEIGHT * UI_FACTOR;
    let startX = (canvas.width - width) / 1.3;
    let startY = (canvas.height - height) / 2;

    overlayCtx.drawImage(this.inventoryMenu, startX - 75, startY, width, height);

    let slotAreaWidth = 8 * TILE_SIZE * UI_FACTOR;
    let slotAreaHeight = 3 * TILE_SIZE * UI_FACTOR;
    let slotStartX = startX + (width - slotAreaWidth) / 4 ;
    let slotStartY = startY + (height - slotAreaHeight) / 2;

    this.render(overlayCtx, slotStartX - 110, slotStartY - 5 , 8, 3, false);
  }

  renderDraggedItem(ctx, mouseX, mouseY) {
    if (this.draggingItem === null) {
      return;
    }
    let imageName = this.draggingItem.itemID.replaceAll(" ", "_");
    if (loadedItems[imageName]) {
      ctx.drawImage(loadedItems[imageName], mouseX, mouseY, 32, 32);
    }
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText(this.draggingItem.count, mouseX + 18, mouseY + 32);
  }
}
