const {getLineInfo} = require('../tokenizer/location')

exports.raise = function (message, pos) {

  pos = pos || this.state.pos
  const loc = getLineInfo(this.input, pos);

  message += ` (${loc.line}:${loc.column})`;

  err = new SyntaxError(message)
  err.pos = pos
  err.loc = loc

  throw err
  
}
