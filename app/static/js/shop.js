import { ITEMS, UI_FACTOR, CANVAS_HEIGHT, CANVAS_WIDTH, SHOPS } from './constants.js';
import { renderWrappedText, getItemTitle } from './text.js';
import { Inventory } from './inventory.js';
import Gold from './gold.js';

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
      this.itemTitles = []; // to prevent running getItemTitle method on each render
      Object.keys(this.shopInventory).forEach((item, i) => {
        this.sprites.push(new Image());
        this.sprites[i].src = `/static/images/items/${item}.png`;
        this.itemTitles.push(getItemTitle(Object.keys(this.shopInventory)[i]))
      });


      // console.log(this.sprites);
    }

    buy(itemID, player, playerInventory) {
      if (!(itemID in ITEMS)) {
        return false;
      }
      if (!(itemID in shopInventory)){
        return false;
      }
      let cost = shopInventory[itemID]
      if (this.player.gold.amount < cost) {
        return false;
      }
      if (this.playerInventory.addItem(itemID, 1)) {
          this.player.gold.amount -= cost;
          return true;
        }
      return false;
    }

    sell(itemID, player, playerInventory) {
      if (!(itemID in ITEMS)) {
        return false;
      }
      if (this.inventory.removeItem(itemID, 1)) {
        this.player.gold.amount += item.sellPrice;
        return true;
        }
      return false;
    }

    moveUp() {
      if (this.itemsStart > 0) {
        this.itemsStart--;
      }
    }

    moveDown() {
      if (this.itemsStart < this.itemTitles.length - 4) {
        this.itemsStart++;
      }
    }

    render(ctx, playerInventory) {
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

      playerInventory.renderInventory(ctx, xStart + 148 * overlayScale, yStart + 121 * overlayScale, overlayScale);

      ctx.textAlign = "left";
      ctx.letterSpacing = "1px";
      ctx.font = `${fontSize}px thin`
      ctx.fillStyle = "black";
      renderWrappedText(ctx, this.shopText, xStart + 5 * overlayScale, yStart + 85 * overlayScale + fontSize / 2 + 2, 63 * overlayScale, 10 * overlayScale)

      ctx.font = `${fontSize}px bold`
      ctx.fillStyle = "#56160c";
      ctx.letterSpacing = "2px";

      for (let i = 0; i < 4; i++) {

        ctx.textAlign = "left";

        ctx.drawImage(this.sprites[this.itemsStart + i],
          xStart + 94 * overlayScale, yStart + 12 * overlayScale + i * 27 * overlayScale,
          16 * overlayScale, 16 * overlayScale
        )
        ctx.fillText(this.itemTitles[this.itemsStart + i],
          xStart + 114 * overlayScale, yStart + 23 * overlayScale + i * 27 * overlayScale
        )

        ctx.textAlign = "right";

        ctx.fillText(Object.values(this.shopInventory)[this.itemsStart + i],
          xStart + 340 * overlayScale, yStart + 23 * overlayScale + i * 27 * overlayScale
        )
      }

    }
  }
