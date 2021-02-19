module.exports = {

  addClassSymbol ({name, type, kind}) {
    let length = this.classSymbols[kind].length
    this.classSymbols[kind].push({name, type, id: length})
  },

  addThisToMethodSymbols () {
    this.methodSymbols.argument.push({
      name: 'this',
      type: this.state.className,
      id: 0
    })
  },

  addMethodParamSymbol ({name, type}) {
    let length = this.methodSymbols.argument.length
    this.methodSymbols.argument.push({
      name,
      type,
      id: length
    })
  },

  addMethodLocalSymbol ({name, type}) {
    let length = this.methodSymbols.local.length
    this.methodSymbols.local.push({
      name,
      type,
      id: length
    })
  },

  findSymbol (varible) {

    let found = this.methodSymbols.local.find(el => el.name === varible)
    if (found) {
      return {
        type: 'local',
        varType: found.type,
        index: found.id
      }
    }

    found = this.methodSymbols.argument.find(el => el.name === varible)
    if (found) {
      return {
        type: 'argument',
        varType: found.type,
        index: found.id
      }
    }

    found = this.classSymbols.static.find(el => el.name === varible)
    if (found) {
      return {
        type: 'static',
        varType: found.type,
        index: found.id
      }
    }

    found = this.classSymbols.field.find(el => el.name === varible)
    if (found) {
      return {
        type: 'this',
        varType: found.type,
        index: found.id
      }
    }

  }

}
