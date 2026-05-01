import { ITEMS } from './items.js';

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
    if ()
  }
}
