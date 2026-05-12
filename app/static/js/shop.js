import { ITEMS } from './constants.js';

export default class Shop {
    constructor (shopInventory) {
      // this.player = player;
      this.shopInventory = shopInventory; // {String item: INT cost}
      // this.playerInventory = playerInventory;
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
  }
