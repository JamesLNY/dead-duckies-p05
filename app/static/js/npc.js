import { DIALOGUES } from "./constants.js"
const giftPoints = [-40, -20, 20, 45, 80]

export default class NPC {
  constructor(name) {
    this.name = name

    this.points = {"Kiran": 0}
    this.giftnumber = {"Kiran": 0}
    this.talked = {"Kiran": false}
    this.status = {"Kiran": 0}
    
    this.likes = {} // 0-4 for hate-love
    this.normal_dialogue = DIALOGUES[this.name]["normal_dialogue"]
    console.log(this.normal_dialogue)
  }

  // possibly implement birthdays
  gift(player, item) {
    if (!(player in this.points)) {
      this.addPlayer(player)
    }
    if (this.giftnumber[player] == 2) {
      // possibly display msg
      return
    }

    this.points[player] += giftPoints[this.likes[item]]
    this.giftnumber[player] += 1
  }

  talk(player) {
    if (!(player in this.points)) {
      this.addPlayer(player)
      this.points[player] += 20
      console.log("a")
      this.renderDialogue(player, this.normal_dialogue[0]) //default introduction dialogue
    }
    else if (this.talked[player] == false) {
      console.log("b")
      this.points[player] += 20
      this.renderDialogue(player, this.normal_dialogue[Math.ceil(Math.random() * (this.normal_dialogue.length - 1))]) //random dialogue option (excluding intro dialogue stored at index 0 of array)
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
    this.giftnumber[player] = 0
    this.talked[player] = false
    this.status[player] = 0
  }

}

let Pierre = new NPC("Pierre")
Pierre.talk("Kiran")
