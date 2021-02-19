const {inc} = require('../nand2tetris-alu/adder')
const {orMultiWay} = require('../nand2tetris-gates/multiWay')
const {inc16, mux16} = require('../nand2tetris-gates/multi')

class ProgramCounter {

  constructor () {
    this.register = new Register()
  }

  // the in of the register can be:
  // 0 (reset) || out++ (inc) || in (load)
  // if none is true, the load should be empty
  // we should determine the in by flag

  in (inpins, load, inc, reset) {
    let zero = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ]

    let flag = orMultiWay([load, inc, reset], 3)

    let plusOne  = mux16(zero, inc16(this.register.out()), inc)
    let loadOut  = mux16(plusOne, inpins, load)
    let resetOut = mux16(loadOut, zero, reset)

    this.register.in(resetOut, flag)
  }

  out () {
    this.register.out()
  }

}
