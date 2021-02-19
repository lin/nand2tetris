const ExpressionParser = require('./expression')

class StatementParser extends ExpressionParser {

  parseStatements (closeChar) {

    let statements = []

    while(!this.eat(closeChar)) {
      statements.push(this.parseStatement())
    }

    return statements

  }

  parseStatement () {

    switch(this.state.value) {

      case 'let':
        return this.parseLetStatement()

      case 'if':
        return this.parseIfStatement()

      case 'while':
        return this.parseWhileStatement()

      case 'do':
        return this.parseDoStatement()

      case 'return':
        return this.parseReturnStatement()

      default:
        this.raise('Statement has to start with a keyword.')
    }

  }

  parseLetStatement () {

    let node = this.startNode()
    this.next()

    node.left = this.parseMaybeMemberExpression()
    this.expect('=')
    node.init = this.parseExpression()
    this.expect(';')

    return this.finishNode(node, 'LetStatement')

  }

  parseIfStatement () {

    let node = this.startNode()
    this.next()

    this.expect('(')
    node.test = this.parseExpression()
    this.expect(')')
    
    this.expect('{')
    node.consequent = this.parseStatements('}')

    if (this.eat('else')) {
      this.expect('{')
      this.alternate = this.parseStatements('}')
    }

    return this.finishNode(node, 'IfStatement')

  }

  parseWhileStatement () {

    let node = this.startNode()
    this.next()

    this.expect('(')
    node.test = this.parseExpression()
    this.expect(')')
    this.expect('{')
    node.body = this.parseStatements('}')

    return this.finishNode(node, 'WhileStatement')

  }

  parseDoStatement () {

    let node = this.startNode()
    this.next()

    node.expression = this.parseCallExpression()
    this.expect(';')

    return this.finishNode(node, 'DoStatement')

  }

  parseReturnStatement () {

    let node = this.startNode()
    this.next()

    if (!this.eat(';')) {
      node.expression = this.parseExpression()
      this.expect(';')
    } else {
      node.expression = null
    }

    return this.finishNode(node, 'ReturnStatement')

  }
}

module.exports = StatementParser
