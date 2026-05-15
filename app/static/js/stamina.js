import { CAVNAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";

export const STAMINA_COSTS = {
    axe: 2,
    hoe: 2,
    pickaxe: 2,
    watering_can: 2,
    fishing_pole: 8,
    scythe: 0
}

export default class Stamina {
    constructor(max = 100) { //in game it is 270 but doubt we need that much
        this.max = max;
        this.curr = max;
        this.display = new Image();
        this.display.src = "/static/images/ui/energy.png";
    }
}

useEnergy(energy) {
    this.curr = Math.max(0, this.curr - energy);
}

restoreFull() {
    this.curr = this.max;
}

restoreEnergy(energy) {
    this.curr = Math.min(this.max, this.curr + energy);
}

isEmpty() {
    return this.curr <= 0;
}