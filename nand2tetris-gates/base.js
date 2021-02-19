const nand = require('./nand')

// by the def of the nand
const not = _ => nand(_, _)

// by the def of the nand
const and = (a, b) => not(nand(a, b))

// de morgan's law
const or = (a, b) => not(and(not(a), not(b)))

// the same as:
// generic([[0, 1], [1, 0]])
const xor = (a, b) => {
  let not_a = not(a)
  let not_b = not(b)

  let line_1 = and(a, not_b)
  let line_2 = and(b, not_a)

  return or(line_1, line_2)
}

// generic solutions
const factory = function (table) {

  let ones = getOnes(table)

  return function (a, b) {

    let not_a = not(a)
    let not_b = not(b)

    let lines = []
    for (var i = 0; i < ones.length; i++) {
      let line_a = ones[i][0] == 1 ? a : not(a)
      let line_b = ones[i][1] == 1 ? b : not(b)
      lines.push(and(line_a, line_b))
    }

    return or(lines[0], lines[1])
  }

}

// table: [[0, 1], [1, 0]]
function getOnes (table) {
  let ones = []
  for (var i = 0; i < table.length; i++) {
    for (var j = 0; j < table[i].length; j++) {
      if (table[i][j] == 1) ones.push([i, j])
    }
  }
  return ones
}

module.exports = {not, and, or, xor, nand, factory}
