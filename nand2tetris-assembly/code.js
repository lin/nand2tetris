let code = {}

code.dest = function (str) {
  let dict = {
    M: '001',
    D: '010',
    MD: '011',
    A: '100',
    AM: '101',
    AD: '110',
    AMD: '111'
  }
  if (dict.hasOwnProperty(str)) {
    return dict[str]
  } else {
    return '000'
  }
}

code.jump = function (str) {
  let dict = {
    JGT: '001',
    JEQ: '010',

    JGE: '011',
    JLT: '100',
    JNE: '101',
    JLE: '110',
    JMP: '111'
  }
  if (dict.hasOwnProperty(str)) {
    return dict[str]
  } else {
    return '000'
  }
}

code.comp = function (str) {

  let a = str.match(/M/) ? '1' : '0'

  switch (str) {
      case '0':
          return a + '101010';
          break;
      case '1':
          return a + '111111';
          break;
      case '-1':
          return a + '111010';
          break;
      case 'D':
          return a + '001100';
          break;
      case 'A':
      case 'M':
          return a + '110000';
          break;
      case '!D':
          return a + '001101';
      case '!A':
      case '!M':
          return a + '110001';
          break;
      case '-D':
          return a + '001101';
          break;
      case '-A':
      case '-M':
          return a + '110011';
          break;
      case 'D+1':
          return a + '011111';
          break;
      case 'A+1':
      case 'M+1':
          return a + '110111';
          break;
      case 'D-1':
          return a + '001110';
          break;
      case 'A-1':
      case 'M-1':
          return a + '110010';
          break;
      case 'D+A':
      case 'D+M':
          return a + '000010';
          break;
      case 'D-A':
      case 'D-M':
          return a + '010011';
          break;
      case 'A-D':
      case 'M-D':
          return a + '000111';
          break;
      case 'D&M':
      case 'D&A':
          return a+'000000';
          break;
      case 'D|A':
      case 'D|M':
          return a+'010101';
          break;
  }
}

module.exports = code
