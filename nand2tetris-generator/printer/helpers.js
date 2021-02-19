module.exports = {

  generateUniqueLoopLabel () {
    let label = this.state.className + '_LOOP_LABEL_' + this.labelIndex
    this.labelIndex++
    return label
  },

  getLocalsCount (stmts) {
    let count = 0
    for (var i = 0; i < stmts.length; i++) {
      let stmt = stmts[i]
      if (stmt.type === 'MethodVariablesDeclaration') {
        count += stmt.declarations.length
      }
    }
    return count
  },

}
