module.exports = {

  Program (node) {
    this.print(node.body, node);
  },

  Class (node) {
    this.state.className = node.id.name
    this.printList(node.body, node)
    this.resetClassScope()
  },

  ClassVariablesDeclaration (node) {
    let type = node.varType
    let kind = node.varKind

    for (let i = 0; i < node.declarations.length; i++) {
      let variable = node.declarations[i]
      this.addClassSymbol({name: variable.name, type, kind})
    }
  },

  MethodDeclaration (node) {
    this.state.methodName = node.id.name

    this.printFunctionHeader(node)

    let methodKind = node.methodKind

    if (methodKind === 'method') {
      this.addThisToMethodSymbols()
      this.pushThis()
      this.pop('argument 0')
    }

    if (methodKind === 'constructor') {
      let fieldsCount = this.classSymbols.field.length

      this.pushConstant(fieldsCount)
      this.append('call Memory.alloc 1')
      this.popToThis()
    }

    this.printList(node.params, node)
    this.printList(node.body, node)

    this.resetMethodScope()
  },

  MethodParam (node, parent) {
    this.addMethodParamSymbol({
      name: node.id.name,
      type: node.varType,
    })
  },

  MethodVariablesDeclaration (node, parent) {
    let type = node.varType

    for (let i = 0; i < node.declarations.length; i++) {
      let declar = node.declarations[i]

      this.addMethodLocalSymbol({
        name: declar.name,
        type
      })
    }
  },

}
