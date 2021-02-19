let code = require('./code.js')

function translator(ast) {

  function translateACode(aCode) {
    let binaryCode = parseInt(aCode).toString(2)

    function addZeros(address) {
      let len = 16
      if (address.length < len) {
        address = '0'.concat(address)
        return addZeros(address)
      } else {
        return address
      }
    }

    return addZeros(binaryCode)
  }

  return ast.map((node) => {
    switch(node.type){
      case 'A':
        return translateACode(node.symbol)
      case 'C':
        return '111'.concat(code.comp(node.comp))
                    .concat(code.dest(node.dest))
                    .concat(code.jump(node.jump))
    }
  })
}

module.exports = translator
