const {not, and, or, xor, nand, generic} = require('./base')
const {mux16} = require('./multi')


const or8way = (input) => {
  return orMultiWay(input, 8)
}

const orMultiWay = (input, length) => {
  return multiWay(input, length, or)
}

const andMultiWay = (input, length) => {
  return multiWay(input, length, and)
}

const mux4way16 = (a, b, c, d, sel) => {
  return mux16(
    mux16(a, b, sel[0]),
    mux16(c, d, sel[0]),
    sel[1]
  )
}

const mux8way16 = (a, b, c, d, e, f, g, h, sel) => {

  return mux16(
    mux4way16(a, b, c, d, [sel[0], sel[1]]),
    mux4way16(e, f, g, h, [sel[0], sel[1]]),
    sel[2]
  )
}

const dmux4way = (input, sel) => {
  let sel_0 = sel[0]
  let not_sel_0 = not(sel[0])
  let sel_1 = sel[1]
  let not_sel_1 = not(sel[1])

  return [
    // x, 0, 0
    andMultiWay([input, not_sel_0, not_sel_1], 3),
    // x, 1, 0
    andMultiWay([input, sel_0, not_sel_1], 3),
    // x, 0, 1
    andMultiWay([input, not_sel_0, sel_1], 3),
    // x, 1, 1
    andMultiWay([input, sel_0, sel_1], 3),
  ]

}

const dmux8way = (input, sel) => {
  let sel_0 = sel[0]
  let not_sel_0 = not(sel[0])
  let sel_1 = sel[1]
  let not_sel_1 = not(sel[1])
  let sel_2 = sel[2]
  let not_sel_2 = not(sel[2])

  return [
    // x, 0, 0, 0
    andMultiWay([input, not_sel_0, not_sel_1, not_sel_2], 4),
    // x, 1, 0, 0
    andMultiWay([input, sel_0, not_sel_1, not_sel_2], 4),
    // x, 0, 1, 0
    andMultiWay([input, not_sel_0, sel_1, not_sel_2], 4),
    // x, 1, 1, 0
    andMultiWay([input, sel_0, sel_1, not_sel_2], 4),
    // x, 0, 0, 1
    andMultiWay([input, not_sel_0, not_sel_1, sel_2], 4),
    // x, 1, 0, 1
    andMultiWay([input, sel_0, not_sel_1, sel_2], 4),
    // x, 0, 1, 1
    andMultiWay([input, not_sel_0, sel_1, sel_2], 4),
    // x, 1, 1, 1
    andMultiWay([input, sel_0, sel_1, sel_2], 4),
  ]
}

const multiWay = (input, length, op) => {

  let result = op(input[0], input[1])

  if (length == 2) {
    return result
  }

  for (var i = 2; i < length; i++) {
    result = op(result, input[i])
  }

  return result

}

module.exports = {or8way, orMultiWay, andMultiWay,
  mux4way16, mux8way16, dmux4way, dmux8way}
