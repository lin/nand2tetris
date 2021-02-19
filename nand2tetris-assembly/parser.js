let parser = function(file) {
   let commands = getCommands(file)
   let cursor = 0
   let ast = []

   // TODO: refine the regular expression
   let symbolRegExp = '([A-Za-z_$.:0-9]+)'
   let spacesRegExp = '(?:\\s*)'
   let commentsRegExp = /^\/\/.*/

   let aInstructionRegExp = new RegExp('^@' + symbolRegExp)
   let cInstructionRegExp = new RegExp('^(?:' + spacesRegExp + symbolRegExp + spacesRegExp
                             + '=' + spacesRegExp + ')?' + '([A-Za-z_$.:0-9+\\-&!|]+)'
                             + '(?:' + spacesRegExp + ';' + spacesRegExp + symbolRegExp + ')?')
   let lInstructionRegExp = new RegExp('^\\(' + symbolRegExp + '\\)')

   while( hasMoreCommands() ) {
     let command = trim(commands[cursor])
     let type = commandType(command)
     let node = {}
     switch (type) {
       case 'A':
        node = {
          type: 'A',
          symbol: symbol(command)
        }
        break
       case 'C':
         node = {
           type: 'C',
           dest: dest(command),
           comp: comp(command),
           jump: jump(command)
         }
         break
       case 'L':
         node = {
           type: 'L',
           symbol: symbol(command)
         }
         break
     }

     if (node) ast.push(node)
     advance()
   }

   function hasMoreCommands() {
     return cursor < commands.length
   }

   function advance() { cursor ++ }

   function commandType(command) {
     if(aInstructionRegExp.test(command)) {
       return 'A'
     } else if (lInstructionRegExp.test(command)) {
       return 'L'
     } else if (cInstructionRegExp.test(command)) {
       return 'C'
     } else {
       return null
     }
   }

    function symbol(command) {
     let match
     if(match = aInstructionRegExp.exec(command)) {
       return match[1]
     } else if(match = lInstructionRegExp.exec(command)) {
       return match[1]
     } else {
       throw SyntaxError('A or L Command Expected!')
     }
   }

   function dest(command) {
     return cCommand(command, 1)
   }

   function comp(command) {
    return cCommand(command, 2)
  }

  function jump(command) {
    return cCommand(command, 3)
  }

  function cCommand(command, index) {
    let match
    if( match = cInstructionRegExp.exec(command)) {
      return match[index]
    } else {
      throw SyntaxError('C Command Expected!')
    }
  }

  function trim(s){
    return ( s || '' ).replace( /^\s+|\s+$/g, '' );
  }

  function getCommands(file) {
    var fs = require('fs')
    var contents = fs.readFileSync(file, 'utf8')

    var lines = contents.split('\n')
    lines.pop()

    return lines
  }

  return ast
}



 module.exports = parser
