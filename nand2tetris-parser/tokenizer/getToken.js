const symbols = '(){}[].,;+-*/&|<>=~'
const digits = '0123456789'
const keywords = 'class, constructor, function, method, field, static, var, \
int, char, boolean, void, true, false, null, this, let, do, \
if, else, while, return'.split(', ')
const MAX_INTEGER = 32767

exports.getToken = function (char) {

  symbols.indexOf(char) !== -1
  ? ( ++this.state.pos, this.finishToken('symbol', char) )

  : digits.indexOf(char) !== -1
  ? this.readInt(char)

  : '\'\"'.indexOf(char) !== -1
  ? this.readString(char)

  : /[_a-zA-Z]/.test(char)
  ? this.readWord(char)

  : this.raise('Unrecognized character' + char)

}

exports.readInt = function (char) {

  let width = 1, ch, value = char

  while (
    digits.indexOf((ch = this.currentChar())) !== -1 &&
    ++this.state.pos < this.input.length &&
    ++width < 6
  ) {
    value += this.currentChar()
  }

  parseInt(value) > 32767
  ? this.raise('Too large an interger')
  : this.finishToken('int', parseInt(value))

}

exports.readString = function (quote) {

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

}

exports.readWord = function (char) {

  let out = '', start = this.state.pos

  while (this.state.pos < this.length) {
    const ch = this.currentChar()

    if(/[0-9a-zA-Z_]/.test(ch)) {
      ++this.state.pos
    } else {
      break
    }
  }

  let word = out + this.input.slice(start, this.state.pos)

  keywords.indexOf(word) !== -1
  ? this.finishToken('keyword', word)
  : this.finishToken('identifier', word)

}
