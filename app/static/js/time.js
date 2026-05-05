import { TILE_SIZE, SCALE_FACTOR, CANVAS_WIDTH, CANVAS_HEIGHT, FRAME_RATE, X_RES, Y_RES} from "./constants.js";

export default class Time {
  // currData, numTicks, currTime
  constructor() {
    this.currYear = 1
    this.currDay = 1
    this.currTime = 0 //600-2600 (mod 2400 for display)
    this.numTicks = 0
    this.display = new Image()
    this.display.src = "/static/images/clock.png"
  }

  getTime() {
    return currTime
  }

  nextDay() {
    currDay++
    if (currDay == 29) {
      currYear++
      currDay = 1
    }
  } 
  // Overlay on top of upper right of canvas (Only update when time changes)
  render(ctx) {
    let hour = Math.floor(this.currTime / 60 + 6) % 12
    if (hour == 0) {
      hour = 12
    }
    let min = this.currTime % 60 / 10
    let time = String(hour) + ":" + String(min) + "0"
    if (this.currTime < 360 || this.currTime >= 1080) {
      time += " am"
    }
    else {
      time += " pm"
    }
    ctx.drawImage(this.display,
      .8 * CANVAS_WIDTH, .01 * CANVAS_HEIGHT,
      .19 * CANVAS_WIDTH, .19 * CANVAS_WIDTH / 1.8
    )
    ctx.font = "25px thin";
    ctx.fillText(time, (.8 + .19 * .42) * CANVAS_WIDTH, (.01 + .19 * .89) * CANVAS_HEIGHT)
  }

  // called upon each frame load
  update() {
    this.numTicks++
    if (this.numTicks % 10 == 0) {
      this.currTime += 10
    }
  }
}