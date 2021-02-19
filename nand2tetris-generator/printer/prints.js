module.exports = {

  // generic print helper

  push (str) {
    this.append('push ' + str)
  },

  pop (str) {
    this.append('pop ' + str)
  },

  append (str) {
    str +='\n'
    this._buf.push(str)
  },

  pushConstant (constant = 0) {
    this.push('constant ' + constant)
  },

  pushThis (i = 0) {
    this.push('pointer ' + i)
  },

  popToThis (i = 0) {
    this.pop('pointer ' + i)
  },

  pushThat () {
    this.push('pointer 1')
  },

  popToThat () {
    this.pop('pointer 1')
  },

  pushSymbol (symbol) {
    this.push(symbol.type + ' ' + symbol.index)
  },

  popSymbol (symbol) {
    this.pop(symbol.type + ' ' + symbol.index)
  },

  // specific print helper

  printFunctionHeader (node) {
    let localsCount = this.getLocalsCount(node.body)

    let str = 'function '

    str += this.state.className + '.' + this.state.methodName + ' '
    str += localsCount

    this.append(str, false)
  },

}
