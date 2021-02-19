const StatementParser = require('./statement')

const keywordTypes = ['int', 'char', 'boolean']
const classMethodKinds = ['constructor', 'function', 'method']
const classVarKinds = ['static', 'field']

class ClassParser extends StatementParser {

  parseClass () {

    let node = this.startNode()

    this.expect('class')

    node.id = this.parseIdentifier()

    node.body = []

    this.expect('{')

    while(classVarKinds.indexOf(this.state.value) !== -1) {
      node.body.push(this.parseClassVariablesDeclaration())
    }

    while(classMethodKinds.indexOf(this.state.value) !== -1) {
      node.body.push(this.parseMethodDeclaration())
    }

    this.expect('}')

    return this.finishNode(node, 'Class')

  }

  parseClassVariablesDeclaration () {

    let node = this.startNode()
    node.varKind = this.state.value

    this.next()
    node.varType = this.state.value
    if (keywordTypes.indexOf(this.state.value) !== -1) {
      node.keywordType = true
    }

    this.next()

    node.declarations = []

    let first = true
    do {
      first ? first = false : this.expect(',')
      node.declarations.push(this.parseIdentifier());
    } while (!this.eat(';'))

    return this.finishNode(node, 'ClassVariablesDeclaration')

  }

  parseMethodDeclaration () {

    let node = this.startNode()

    node.methodKind = this.state.value
    this.next()

    node.methodReturnType = this.state.value
    this.next()

    node.id = this.parseIdentifier()

    this.expect("(")

    node.params = this.eat(')') ? null : this.parseMethodParams()

    node.body = this.parseMethodBody()

    return this.finishNode(node, 'MethodDeclaration')

  }

  parseMethodParams () {

    let params = []

    let first = true
    while (!this.eat(')')) {
      first ? first = false : this.expect(',')

      let param = this.startNode()

      param.varType = this.state.value
      this.next()

      param.id = this.parseIdentifier()

      params.push(this.finishNode(param, 'MethodParam'));
    }

    return params

  }

  parseMethodBody () {

    let body = []

    this.expect('{')

    while (this.state.value === 'var') {
      body.push(this.parseMethodVariablesDeclaration())
    }

    return body.concat(this.parseStatements('}'))

  }

  parseMethodVariablesDeclaration () {

    let node = this.startNode()

    this.expect('var')

    node.varType = this.state.value
    this.next()

    node.declarations = []

    let first = true
    do {
      first ? first = false : this.expect(',')
      node.declarations.push(this.parseIdentifier());
    } while (!this.eat(';'))

    return this.finishNode(node, 'MethodVariablesDeclaration')

  }

}

module.exports = ClassParser
