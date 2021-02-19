let parser = require('./parser.js')
let transform = require('./transform.js')
let translator = require('./translator.js')

let ast = parser('prog.asm')
let newAST = transform(ast)
let codes = translator(newAST)
let content = codes.join('\n')

// generate output file
var fs = require('fs')
fs.writeFile("./prog.hack", content, () => {})
