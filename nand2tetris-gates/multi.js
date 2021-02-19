const {not, and, or, xor, nand, generic} = require('./base')
const {mux, dmux} = require('./selector')

const not16 = (a, b) => { return factory(a, null, not) }

const and16 = (a, b) => { return factory(a, b, and) }
const or16  = (a, b) => { return factory(a, b, or)  }
const xor16 = (a, b) => { return factory(a, b, xor) }

const factory = (a, b, op) => {
  let output = []
  for (var i = 0; i < 16; i++) {
    b == null
    ? output.push(op(a[i]))
    : output.push(op(a[i], b[i]))
  }
  return output
}

const mux16 = (a, b, sel) => {
  let output = []
  for (var i = 0; i < 16; i++) {
    output.push(mux(a[i], b[i], sel))
  }
  return output
}

module.exports = {not16, and16, or16, xor16, mux16}
