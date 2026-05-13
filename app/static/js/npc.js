import { NPC_INFO, ITEMS, CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js"
const giftPoints = {"hate": -40, "dislike": -20, "neutral": 20, "like": 45, "love": 80}
import Shop from "./shop.js"

export default class NPC {
  constructor(name) {
    this.name = name

    this.points = {"Kiran": 0}
    this.giftNumber = {"Kiran": 0}
    this.talked = {"Kiran": false}
    this.status = {"Kiran": 0}

    this.reactions = {}
    Object.keys(NPC_INFO[this.name]["reactions"]).forEach(reaction => {
      NPC_INFO[this.name]["reactions"][reaction].forEach(item => {
        this.reactions[item] = reaction
      })
    })
    this.normalDialogue = NPC_INFO[this.name]["normal_dialogue"]
    this.giftDialogue = NPC_INFO[this.name]["gift_dialogue"]
    // console.log(this.reactions)
    // console.log(this.normalDialogue)
  }

  getGiftNumber() {
    return this.giftNumber
  }

  getTalked() {
    return this.talked
  }

  // possibly implement birthdays
  gift(player, item) {
    if (!(player in this.points)) {
      this.addPlayer(player)
    }
    if (this.giftNumber[player] == 2) {
      // possibly display msg
      return
    }
    let reaction
    if (item in this.reactions) { // checks npc-specific reactions
      reaction = this.reactions[item]
    }
    else { // defaults to universal reaction
      reaction = ITEMS[item]["reaction"]
    }
    this.points[player] += giftPoints[reaction]
    this.giftNumber[player] += 1
    this.renderDialogue(player, this.giftDialogue[reaction])
  }

  talk(player) {
    if (!(player in this.points)) {
      this.addPlayer(player)
      this.points[player] += 20
      console.log("a")
      this.renderDialogue(player, this.normalDialogue[0]) //default introduction dialogue
    }
    else if (this.talked[player] == false) {
      console.log("b")
      this.points[player] += 20
      this.renderDialogue(player, this.normalDialogue[Math.ceil(Math.random() * (this.normalDialogue.length - 1))]) //random dialogue option (excluding intro dialogue stored at index 0 of array)
    }
    this.talked = true
  }

  renderDialogue(player, dialogue) {
    console.log(dialogue)
    document.getElementById("npc").innerHTML = this.name
    document.getElementById("dialogue").innerHTML = dialogue.replaceAll("@", player)
    document.getElementById("portrait").src = `/static/images/portraits/${this.name}.png`
  }

  addPlayer(player){
    this.points[player] = 0
    this.giftNumber[player] = 0
    this.talked[player] = false
    this.status[player] = 0
  }

  loop() {

  }
}

let Willy = new NPC("Willy")
Willy.gift("Kiran", "fish")
console.log(Willy.points)

const overlayCanvas = document.getElementById('overlay-canvas');
overlayCanvas.width = CANVAS_WIDTH;
overlayCanvas.height = CANVAS_HEIGHT;
