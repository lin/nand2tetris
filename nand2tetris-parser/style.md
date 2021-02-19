1. if the function is long, make the first line and last line empty. So that you don't think it's too crowded.

```javascript
exports.readString = function (quote) {
  // empty line here
  let ch, out = "", start = ++this.state.pos

  while (true) {
    const ch = this.currentChar()

    if (this.state.pos >= this.length) {
      this.raise("Unterminated string constant");
    }

    if (ch === quote) break;
    ++this.state.pos
  }

  out += this.input.slice(start, this.state.pos++)
  this.finishToken('string', out)
  // empty line here
}
```

But it's ok for the short ones, like three to five lines

For class it should be always have two empty lines, since it's big most of the time.

2. new line to group the functionality. Normally, while and if will have a new line before and after, unless some logic is strongly related to the loop.

```javascript
parseExprList() {

  let node = this.startNode()

  node.expressions = []
  // this `first` is located right above
  // the while, since it's strongly related
  // to while loop
  let first = true
  while (!this.eat(')')) {
    first ? first = false : this.expect(',')
    node.expressions.push(this.parseExpression());
  }

  return this.finishNode(node, 'ExpressionList')

}
```
