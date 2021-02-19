const {mux} = require('../nand2tetris-gates/selector')

class DFF {

  constructor () {
    this.inpin = 0
    this.outpin = 0
  }

  clock () {
    this.outpin = this.inpin
  }

  out () {
    return this.outpin
  }

}

class Bit {

  constructor () {
    this.dff = new DFF()
  }

  in (input, load = 0) {
    this.dff.inpin = mux(this.dff.outpin, input, load)
  }

  out () {
    return this.dff.outpin
  }

  clock () {
    this.dff.clock()
  }

}

module.exports = Bit
