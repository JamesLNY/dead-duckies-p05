export default class Time {
  // currData, numTicks, currTime
  constructor() {
    this.currYear = 1
    this.currDay = 1
    this.currTime = 600
    this.numTicks = 0
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

  }

  // called upon each frame load
  update() {
    numTicks++
    if (numTicks % 112 == 0) {
      currTime += 10
    }
  }
}