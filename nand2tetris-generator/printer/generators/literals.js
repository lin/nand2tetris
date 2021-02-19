module.exports = {

  StringLiteral (node) {
    let chars = node.chars

    // a new string is created
    this.pushConstant(chars.length)
    this.append('call String.new 1')

    for (var i = 0; i < chars.length; i++) {
      let char = chars[i]
      this.pushConstant(char.charCodeAt())
      this.append('call String.appendChar 2')
    }

  },

  IntegerLiteral (node) {
    this.push('constant ' + node.value)
  },

  ThisLiteral (node) {
    this.pushThis()
  },

  TrueLiteral (node) {
    this.push('constant 1')
    this.append('neg')
  },

  FalseLiteral (node) {
    this.push('constant 0')
  },

  NullLiteral (node) {
    this.push('constant 0')
  },

}
