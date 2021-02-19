const {Position} = require('../tokenizer/location')

class State {

  constructor() {

    this.pos = 0

    this.lineStart = 0
    this.curLine = 1

    this.type = 'EOF'
    this.value = 'EOF'

    this.start = 0
    this.end = 0
    this.startLoc = this.endLoc = this.curPosition()

    this.lastTokStart = 0
    this.lastTokEnd = 0
    this.lastTokStartLoc = null
    this.lastTokEndLoc = null

  }

  curPosition () {

    return new Position(this.curLine, this.pos - this.lineStart)

  }

  clone () {

    const state = new State()
    const keys = Object.keys(this)

    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i]
      let val = this[key]

      state[key] = val
    }

    return state

  }

}

module.exports = State
