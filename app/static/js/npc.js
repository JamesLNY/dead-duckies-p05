// import list of players

export default class NPC{
  constructor(name){
    this.points = {}
    this.name = name
    this.giftnumber = {}
    this.talked = {}
    this.status = {}
    for (const player of players){
      this.points[player] = 0
      this.giftnumber[player] = 0
      this.talked[player] = false
      this.status[player] = 0
    }
  }

  gift(player, item){
    
  }

  talk(){

  }

  getDialogue(){

  }

}
