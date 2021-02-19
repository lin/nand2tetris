const lineBreak = /\r\n?|[\n\u2028\u2029]/g;
// Skip whitespace and comments

exports.skipSpace = function () {
  loop: while (this.state.pos < this.length) {

    switch(this.currentChar()) {

      case ' ':
      case '\t':
      case String.fromCharCode(160):
        ++this.state.pos
        break

      case '\r':
        if (this.nextChar() === '\n') ++this.state.pos
      case '\n':
        ++this.state.pos;
        ++this.state.curLine;
        this.state.lineStart = this.state.pos;
        break

      case '/':

        switch (this.nextChar()) {

          case '*':
            this.skipBlockComment()
            break

          case '/':
            this.skipLineComment()
            break

          default:
            break loop

        }

        break

       default:
        break loop

    }
  }
}

exports.skipBlockComment = function () {

  const start = this.state.pos
  const end = this.input.indexOf("*/", (this.state.pos += 2))
  if (end === -1) this.raise("Unterminated comment")

  this.state.pos = end + 2

  lineBreak.lastIndex = start
  let match;
  while (
    (match = lineBreak.exec(this.input)) &&
    match.index < this.state.pos
  ) {
    ++this.state.curLine
    this.state.lineStart = match.index + match[0].length
  }

}

exports.skipLineComment  = function () {

  let ch = this.nextChar(2);
  this.state.pos++
  this.state.pos++

  if (this.state.pos < this.length) {
    while (
      ch !== '\n' && ch !== '\n' &&
      ++this.state.pos < this.length
    ) {
      ch = this.currentChar()
    }
  }

}
