class SymbolTable {

  constructor(scopeName) {
    switch (scopeName) {
      case 'class':
        this.field = []
        this.static = []
        break;

      case 'method':
        this.argument = []
        this.local = []
        break;

      default:
        throw new Error('Unexpected Scope Name')
    }
  }

}


class Printer {

  constructor () {
    this._buf = []
    this.labelIndex = 0
    this.state = {}
    this.state.className = ''
    this.state.methodName = ''
    this.classSymbols = new SymbolTable('class')
    this.methodSymbols =  new SymbolTable('method')
  }

  generate (ast) {
    this.print(ast)
    return this._buf.join('')
  }

  print(node, parent) {
    if (!node) return

    const printMethod = this[node.type]

    printMethod.call(this, node, parent)
  }

  printList(nodes, parent) {
    if (!nodes || !nodes.length) return;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.print(node, parent);
    }
  }

  resetMethodScope () {
    this.state.methodName = ''
    this.state.methodSymbols = new SymbolTable('method')
  }

  resetClassScope () {
    this.state.classdName = ''
    this.state.classdSymbols = new SymbolTable('class')
  }

}

Object.assign(
  Printer.prototype,
  require("./generators"),
  require("./symbols"),
  require("./helpers"),
  require("./prints"),
);

module.exports = Printer
