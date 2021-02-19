// not used at all
class SymbolTable {
  constructor(){
    this.table = {}
  }

  addEntry (symbol, address) {
    this.table[symbol] = address
  }

  contains (symbol) {
    return this.table.hasOwnProperty(symbol)
  }

  GetAddress (symbol) {
    return this.table[symbol]
  }
}

module.exports = SymbolTable
