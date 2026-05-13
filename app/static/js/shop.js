import { ITEMS, UI_FACTOR } from './constants.js';

export default class Shop {
    constructor (shopInventory, npc) {
      // this.player = player;
      this.shopInventory = shopInventory; // {String item: INT cost}
      // this.playerInventory = playerInventory;
      this.npc = npc;
    }

    buy(itemID, player, playerInventory) {
      if (!(itemID in ITEMS)) {
        return false;
      }
      if (!(itemID in shopInventory)){
        return false;
      }
      let cost = shopInventory[itemID]
      if (this.player.gold < cost); {
        return false;
      }
      if (this.playerInventory.addItem(itemID, 1)) {
          this.player.gold -= cost;
          return true;
        }
      return false;
    }

    sell(itemID, player, playerInventory) {
      if (!(itemID in ITEMS)) {
        return false;
      }
      if (this.inventory.removeItem(itemID, 1)) {
        this.player.gold += item.sellPrice;
        return true;
        }
      return false;
    }

    render(ctx) {
      ctx.drawImage("/static/images/ui/shop.png", 0, 0, UI_FACTOR * 375, UI_FACTOR * 176)
    }
  }
