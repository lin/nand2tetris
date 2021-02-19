const Bit = require('./Bit')

class Register {

  constructor () {
    // learned this technique from:
    // https://medium.com/@wisecobbler/4-ways-to-populate-an-array-in-javascript-836952aea79f
    this.bits = new Array(16).fill(null).map(_ => new Bit())
  }

  in (inpins, load) {
    for (var i = 0; i < 16; i++) {
      this.bits[i].in(inpins[i], load)
    }
  }

  out () {
    return this.bits.map(bit => bit.out())
  }

  clock () {
    for (var i = 0; i < 16; i++) {
      this.bits[i].clock()
    }
  }

}

// let r1 = new Register()
// r1.in(
//   [1, 0, 1, 0, /**/ 1, 0, 0, 1, /**/ 1, 0, 0, 0, /**/ 0, 0, 0, 1], 1
// )
// r1.clock()

module.exports = Register
