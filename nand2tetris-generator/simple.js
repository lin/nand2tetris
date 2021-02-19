const Parser = require('../nand2tetris-parser/parser')
const generator = require('./index')

let content = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/11/Average/Main.jack

// (Same as projects/09/Average/Main.jack)

// Inputs some numbers and computes their average
class Main {
   function void main() {
     var Array a;
     var int length;
     var int i, sum;

     let length = Keyboard.readInt("a");
     let a = Array.new(length); // constructs the array

     let i = 0;
     while (i < length) {
        let a[i] = Keyboard.readInt("b");
        let sum = sum + a[i];
        let i = i + 1;
     }

     do Output.printString("c");
     do Output.printInt(sum / length);
     return;
   }
}
`

let parser = new Parser(content)
let ast = parser.parse()
let output = generator(ast)

console.log(output);
