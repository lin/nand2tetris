// it appears much easier for solving it for the second time
const {or, and} = require('../nand2tetris-gates/base')
const {not16, and16, or16, mux16} = require('../nand2tetris-gates/multi')
const {or8way} = require('../nand2tetris-gates/multiWay')
const {adder16} = require('./adder')

function ALU (x, y, zx, nx, zy, ny, f, no) {
   let zero = [0, 0, 0, 0,/*_*/ 0, 0, 0, 0,/*_*/ 0, 0, 0, 0,/*_*/ 0, 0, 0, 0]
   let one = [0, 0, 0, 0,/*_*/ 0, 0, 0, 0,/*_*/ 0, 0, 0, 0,/*_*/ 0, 0, 0, 1]

   let maybeZeroX = mux16(x, zero, zx)
   let maybeZeroY = mux16(y, zero, zy)

   let outX = mux16(maybeZeroX, not16(maybeZeroX), nx)
   let outY = mux16(maybeZeroY, not16(maybeZeroY), ny)

   let andXY = and16(outX, outY)
   let addXY = adder16(outX, outY)[0]

   let outXY = mux16(andXY, addXY, f)

   outXY = mux16(outXY, not16(outXY), no)

   let isNotZero = or(or8way(outXY.slice(0, 8)), or8way(outXY.slice(-8)))
   let zr = mux16(zero, one, isNotZero)

   let isNeg = and(outXY[15], 1) // for all x, x & 1 = x
   let ng = mux16(zero, one, isNeg)

   return [outXY, zr, ng]
}

module.exports = ALU
