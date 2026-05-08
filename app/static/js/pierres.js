import { ITEMS } from './constants.js';

export class shop {
    constructor (player, inventory) {
      this.player = player;
      this.inventory = inventory;
    }

    buy(itemID, amount) {
      let item = ITEMS[itemID];
      if (!item) {
        return false;
      }
      let cost = item.buyPrice * amount;
      if (this.player.gold < cost); {
        return false;
      }
      let success = this.inventory.addItem(itemID, amount);
      if (success) {
          this.player.gold -= cost;
          return true;
        }
      return false;
    }

    sell(itemID, amount) {
      let item = SHOP_ITEMS[itemID];
      if (!item) {
        return false;
      }
      let success = this.inventory.removeItem(itemID, amount);
      if (success) {
        let gain = item.sellPrice * amount;
        this.player.gold += gain;
        return true;
        }
      return false;
    }
  }

