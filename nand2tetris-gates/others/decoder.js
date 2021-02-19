// solve a problem in
// https://www.youtube.com/watch?v=7zffjsXqATg&list=PLowKtXNTBypGqImE405J2565dvjafglHU&index=30
// without consider optimization


// const {not, and, or, xor, nand, generic} = require('./base')
// const {or8way, orMultiWay, andMultiWay}  = require('./multiWay')

// config example: 0, 1, 2, 3
// [
//   [[0, 0], [0, 0, 0, 0, 0, 0, 1]],
//   [[0, 1], [1, 0, 0, 1, 1, 1, 1]],
//   [[1, 0], [0, 0, 1, 0, 0, 1, 0]],
//   [[1, 1], [0, 0, 0, 0, 1, 1, 0]],
// ]

// function factory (config) {
//
//   let length = config.length
//
//   return function(input) {
//     let outpins = []
//
//     for (let i = 0; i < length; i++) {
//       outpins[i] = []
//       outpins[i][0] = input[i]
//       outpins[i][1] = not(input[i])
//     }
//
//     let andInPins = []
//
//     // for certain number of for loops
//     for (let i = 0; i < outpins.length; i++) {
//       for (var j = 0; j < outpins[i].length; j++) {
//         andInPins[i] = outpins[i][j]
//       }
//     }
//
//   }
//
// }
//
// factory({length: 4})([0, 1, 1, 0])


// return function (input) {
//
//   let decoded = []
//
//   for (var i = 0; i < input.length; i++) {
//
//
//
//     let pins = []
//     for (var i = 0; i < length; i++) {
//       pins[i] =
//     }
//
//     decoded.push(andMultiWay(pins))
//
//   }
//
// }

// function generateDecoder(length) {
//
//   return function (input) {
//
//     let pins = []
//     for (var i = 0; i < length; i++) {
//       pins[i] = input[i] === 0 ? not(input[i]) : input[i]
//     }
//
//     return andMultiWay(pins)
//   }
//
// }


// const d = factory([
//   [0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 1, 1, 1, 1],
//   [0, 0, 1, 0, 0, 1, 0],
//   [0, 0, 0, 0, 1, 1, 0],
// ])
