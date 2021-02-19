const Tokenizer = require('../tokenizer')

const keywordConstants = ['true', 'false', 'null', 'this']
const unaryOps = ['-', '~']
const binaryOps = {
  '|': 2,
  '&': 3,
  '=': 4,
  '<': 5,
  '>': 5,
  '+': 6,
  '-': 6,
  '*': 7,
  '/': 8,
}

class ExpressionParser extends Tokenizer {

  parseExpression () {
    let expr = this.parseExprAtom()

    return this.parseExprOps(expr, -1)
  }

  parseExprAtom () {

    switch (this.state.type) {

      case 'int':
        let intNode = this.startNode()
        intNode.value = this.state.value
        this.next()
        return this.finishNode(intNode, 'IntegerLiteral')
        break;

      case 'string':
        let stringNode = this.startNode()
        stringNode.chars = this.state.value
        this.next()
        return this.finishNode(stringNode, 'StringLiteral')
        break;

      case 'keyword':
        return this.parseKeywordLiteral()
        break;

      case 'symbol':
        if (this.state.value === '(') {
          return this.parseParenExpression()
        }
        if (this.state.value === '-' || this.state.value === '~') {
          return this.parseUnaryExpression()
        }
        break;

      case 'identifier':
        if (this.lookahead().value === '(' || this.lookahead().value === '.') {
          return this.parseCallExpression()
        }
        return this.parseMaybeMemberExpression()
        break;

      default:
        this.raise('Unrecoginzed Term')
        break;

    }
  }

  parseExprOps (expr, minPrec) {

    if (
      this.state.type === 'symbol' &&
      Object.keys(binaryOps).indexOf(this.state.value) !== -1
    ) {

      let prec = binaryOps[this.state.value]

      if (prec && prec > minPrec) {

        let node = this.startNode()

        node.left = expr
        node.operator = this.state.value
        this.next()
        node.right = this.parseExprOps(this.parseExpression(), prec)

        this.finishNode(node, 'BinaryExpression')

        return this.parseExprOps(node)
      }

    }

    return expr

  }

  parseCallExpression () {
    let node = this.startNode()

    if (this.lookahead().value === '.') {
      node.classCallee = this.parseIdentifier()
      this.eat('.')
    }

    node.methodCallee = this.parseIdentifier()

    this.expect('(')

    node.arguments = this.eat(')') ? null : this.parseExprList()

    return this.finishNode(node, 'CallExpression')

  }

  parseMaybeMemberExpression () {
    let id = this.parseIdentifier()

    if (this.eat('[')) {
      let node = this.startNode()
      node.id = id
      node.expression = this.parseExpression()
      this.expect(']')
      return this.finishNode(node, 'MemberExpression')
    }

    return id

  }

  parseUnaryExpression () {

    let node = this.startNode()

    node.operator = this.state.value
    this.next()
    node.expression = this.parseExprAtom()

    return this.finishNode(node, 'UnaryExpression')

  }

  parseParenExpression () {

    let node = this.startNode()

    this.expect('(')
    node.expression = this.parseExpression()
    this.expect(')')

    return this.finishNode(node, 'ParenExpression')

  }

  parseIdentifier () {

    let node = this.startNode()

    node.name = this.state.value

    this.expect(null, 'identifier')

    return this.finishNode(node, 'Identifier')

  }

  parseExprList () {

    let expressions = []

    let first = true
    while (!this.eat(')')) {
      first ? first = false : this.expect(',')
      expressions.push(this.parseExpression());
    }

    return expressions

  }

  parseKeywordLiteral () {

    if (
      this.state.type === 'keyword' &&
      keywordConstants.indexOf(this.state.value) !== -1
    ) {
      let node = this.startNode()

      let value = this.state.value
      let type = value.charAt(0).toUpperCase() + value.slice(1) + 'Literal'
      this.next()

      return this.finishNode(node, type)
    }
  }

}

module.exports = ExpressionParser
