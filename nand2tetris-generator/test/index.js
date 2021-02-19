const Parser = require('../../nand2tetris-parser/parser')
const generator = require('../index')

let dirPath = './'
let fs = require('fs')

function isDirectory(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

function walkFiles(dirPath, callback) {
  fs.readdirSync(dirPath).forEach(file => {
    if (fs.statSync(dirPath + file).isDirectory()) {
      walkFiles(dirPath + file + '/', callback);
    }
    else {
      if (/\.jack$/.test(file)) callback(file, dirPath)
    }
  })
}

walkFiles(dirPath, (file, dirPath) => {
  let fullPath = dirPath + file
  let content = fs.readFileSync(fullPath, 'utf8')
  let parser = new Parser(content)
  let ast = parser.parse()
  let output = generator(ast)
  let outPath = fullPath.slice(0, -5) + '.vm'
  fs.writeFileSync(outPath, output)
})
