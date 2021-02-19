module.exports = {

  LetStatement (node) {
    let variable = node.left.expression ? node.left.id.name : node.left.name
    let symbol = this.findSymbol(variable)
    if (!node.left.expression) {
      this.print(node.init)
      this.popSymbol(symbol)
    } else {
      // let arr[expr] = init
      this.print(node.left.expression) // print expr
      this.pushSymbol(symbol) // push arr
      this.append('add') // arr[expr] address
      this.print(node.init) // print init
      this.pop('temp 0') // temp[0] is the value of init
      this.popToThat() // arr[expr] address is now the in the pointer 1
      this.push('temp 0') // the value of init is on the stack
      this.pop('that 0') // the top of the stack is poped to that reference
    }
  },

  IfStatement (node) {
    let label1 = this.generateUniqueLoopLabel()
    let label2 = this.generateUniqueLoopLabel()

    this.print(node.test)
    this.append('not')
    this.append('if-goto ' + label1)
    this.printList(node.consequent, node)
    this.append('goto ' + label2)
    this.append('label ' + label1, false)
    this.printList(node.alternate, node)
    this.append('label ' + label2, false)
  },

  DoStatement (node) {
    this.print(node.expression)
    this.pop('temp 0')
  },

  WhileStatement (node) {
    let label1 = this.generateUniqueLoopLabel()
    let label2 = this.generateUniqueLoopLabel()

    this.append('label ' + label1, false)
    this.print(node.test)
    this.append('not')
    this.append('if-goto ' + label2)
    this.printList(node.body, node)
    this.append('goto ' + label1)
    this.append('label ' + label2, false)
  },

  ReturnStatement (node, parent) {
    if (parent.methodReturnType === 'void') {
      this.pushConstant()
    }
    if (node.expression) this.print(node.expression)
    this.append('return')
  },

}
