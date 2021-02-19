let parser = require('./parser.js')
function transform(ast) {
  let table = {}
  let newAST = []

  addPredefinedSymbols()
  addLabelSymbols()
  replaceSymbols()

  function replaceSymbols(){
    let currentAddress = 16
    for (let i=0; i< newAST.length; i ++) {
      let command = newAST[i]
      switch (command.type) {
        case 'A':
          if(!/^[0-9]+$/.test(command.symbol)){
            if(table.hasOwnProperty(command.symbol)){
              command.symbol = table[command.symbol]
            } else {
              table[command.symbol] = currentAddress.toString()
              command.symbol = currentAddress.toString()
              currentAddress++
            }
          }
          break;
        default:
      }
    }
  }


  function addLabelSymbols(){
    let cursor = 0

    for(let i = 0; i < ast.length; i++) {
      let command = ast[i]
      switch (command.type) {
        case 'A':
          cursor++
          newAST.push(command)
          break
        case 'C':
          cursor++
          newAST.push(command)
          break
        case 'L':
          table[command.symbol] = cursor.toString()
          break
        default:
      }
    }
  }

  function addPredefinedSymbols() {
    let predefinedSymbols = {
      SP: '0',
      LCL: '1',
      ARG: '2',
      THIS: '3',
      THAT: '4',
      SCREEN: '16284',
      KBD: '24576'
    }
    Object.assign(table, predefinedSymbols)
    for(let i = 0; i < 16; i++) {
      table['R' + i] = i.toString()
    }
  }

  return newAST
}

module.exports = transform
