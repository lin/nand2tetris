const binaryOperatorMap = {
  '+': 'add',
  '-': 'sub',
  '&': 'and',
  '|': 'or',
  '=': 'eq',
  '<': 'lt',
  '>': 'gt',
  '*': 'call Math.multiply 2',
  '/': 'call Math.divide 2',
}

const unaryOperatorMap = {
  '~': 'not',
  '-': 'neg'
}

module.exports = {

  UnaryExpression (node) {
    this.print(node.expression)
    this.append(unaryOperatorMap[node.operator])
  },

  BinaryExpression (node) {
    this.print(node.left)
    this.print(node.right)
    this.append(binaryOperatorMap[node.operator])
  },

  ParenExpression (node) {
    this.print(node.expression)
  },

  MemberExpression (node) {
    let variable = node.id.name
    this.print(node.expression) // i = expr()
    this.pushSymbol(this.findSymbol(variable))
    this.append('add') // a + i
    this.popToThat() // pointer 1 is the address of a[i]
    this.push('that 0') // the value of a[i] is pushed on the stack
  },

  CallExpression (node, parent) {
    let callee = ''
    let argsCount = 0

    if (node.classCallee) {
      let classCallee = node.classCallee.name
      let symbol = this.findSymbol(classCallee)

      if (symbol) {
        this.pushSymbol(symbol)
        argsCount++
        callee += symbol.varType
      } else {
        callee += classCallee
      }
    } else {
      callee += this.state.className
    }

    callee += '.' + node.methodCallee.name

    if (node.arguments) {
      this.printList(node.arguments, node)
      argsCount += node.arguments.length
    }

    this.append('call ' + callee + ' ' + argsCount)
  },

  Identifier (node) {
    let variable = node.name
    this.pushSymbol(this.findSymbol(variable))
  }

}
