const {not, and, or, nand, generic} = require('./base')

const mux = (a, b, sel_b) => {
  let not_sel_b = not(sel_b)
  return or(and(a, not_sel_b), and(b, sel_b))
}

const dmux = (input, dsel_b) => {
  let not_sel_b = not(sel_b)
  return [and(input, not_sel_b), and(input, sel_b)]
}

module.exports = {mux, dmux}
