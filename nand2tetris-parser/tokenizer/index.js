const State = require('./state')

class Tokenizer {

  constructor (input) {
    this.state = new State()
    this.input = input
    this.isLookahead = false
    this.length = input.length
  }

  currentChar () {
    return this.input[this.state.pos]
  }

  nextChar (n) {
    return n ? this.input[this.state.pos + n] : this.input[this.state.pos + 1]
  }

  next () {

    this.state.lastTokEnd = this.state.end
    this.state.lastTokStart = this.state.start
    this.state.lastTokEndLoc = this.state.endLoc
    this.state.lastTokStartLoc = this.state.startLoc

    this.skipSpace()

    this.state.start = this.state.pos;
    this.state.startLoc = this.state.curPosition()

    if (this.state.pos >= this.length) {
      this.finishToken('EOF');
      return;
    }

    this.getToken(this.input[this.state.pos])

  }

  finishToken (type, value, ) {
    this.state.end = this.state.pos;
    this.state.endLoc = this.state.curPosition()

    this.state.type = type
    this.state.value = value !== null ? value : type
  }

  lookahead () {
    const old = this.state
    this.state = old.clone(true)

    this.isLookahead = true
    this.next()
    this.isLookahead = false

    const curr = this.state
    this.state = old
    return curr
  }

  eat (value, type) {
    if (
      (!type || this.state.type === type) &&
      (!value || this.state.value === value)
    ) {
      this.next()
      return true
    } else {
      return false
    }
  }

  expect (value, type) {
    let message = ''
    if (value) message += 'Expect a token with value: ' + value + ';'
    if (type) message += 'Expect a token with type: ' + type + ';'
    this.eat(value, type) || this.raise(message)
  }

}


Object.assign(
  Tokenizer.prototype,
  require('./skip'),
  require('./error'),
  require('./getToken'),
)

module.exports = Tokenizer
