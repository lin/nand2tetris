const {not, and, or, xor, nand, factory} = require('../nand2tetris-gates/base')

const halfAdder = (a, b) => {
  return [xor(a, b), and(a, b)] /*sum, carry*/
}

const fullAdder = (a, b, c) => {
  const firstHalfResult = halfAdder(a, b)
  const secondHalfResult = halfAdder(firstHalfResult[0], c)
  return [
    secondHalfResult[0], /* sum */
    or(secondHalfResult[1], firstHalfResult[1]) /* carry */
  ]
}

const adder16 = (a, b) => {
  let sum = []
  let firstResult = halfAdder(a[0], b[0])

  sum.push(firstResult[0])

  let carry = firstResult[1]

  for (var i = 1; i < 16; i++) {
    let interResult = fullAdder(a[i], b[i], carry)
    sum.push(interResult[0])
    carry = interResult[1]
  }
  return [sum, carry]
}

const inc16 = (a) => {
  let b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  return adder16(a, b)
}

module.exports = {halfAdder, fullAdder, adder16, inc16}
