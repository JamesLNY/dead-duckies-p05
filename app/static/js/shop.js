import { ITEMS, UI_FACTOR, CANVAS_HEIGHT, CANVAS_WIDTH, SHOPS } from './constants.js';
import renderWrappedText from './text.js'

export default class Shop {
    constructor (npc) {
      this.shopInventory = SHOPS[npc]["inventory"]; // {String item: INT cost}
      this.npc = npc;
      this.shopText = SHOPS[npc]["text"]

      this.display = new Image();
      this.display.src = "/static/images/ui/shop.png";
      this.portrait = new Image();
      this.portrait.src = `/static/images/portraits/${npc}.png`;

      this.itemsStart = 0; // starting index for 4 displayed items

      this.sprites = [];
      Object.keys(this.shopInventory).forEach((item, i) => {
        this.sprites.push(new Image());
        this.sprites[i].src = `/static/images/items/${item}.png`;
      });
      console.log(this.sprites);
    }

    buy(itemID, player, playerInventory) {
      if (!(itemID in ITEMS)) {
        return false;
      }
      if (!(itemID in shopInventory)){
        return false;
      }
      let cost = shopInventory[itemID]
      if (this.player.gold < cost) {
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

    moveUp() {

    }

    moveDown() {

    }

    render(ctx) {
      // top left corner for shop menu render
      let xStart = (CANVAS_WIDTH / 2) - 375;
      let yStart = (CANVAS_HEIGHT / 2) - 136;
      let overlayScale = 2;
      let fontSize = 12 * overlayScale;

      ctx.drawImage(this.display, 
        xStart, yStart, 
        375 * overlayScale, 136 * overlayScale
      );
      ctx.drawImage(this.portrait, 
        xStart + 10 * overlayScale, yStart + 7 * overlayScale,
        64 * overlayScale, 64 * overlayScale
      );

      ctx.font = `${fontSize}px thin`
      renderWrappedText(ctx, this.shopText, xStart + 5 * overlayScale, yStart + 85 * overlayScale + fontSize / 2 + 2, 63 * overlayScale, 10 * overlayScale)

      for (let i = 0; i < 4; i++) {

      }
    }
  }
