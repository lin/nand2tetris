const Register = require('./Register')
const {dmux8way, mux8way16} = require('../nand2tetris-gates/multiWay')
const MEMORY_SIZE_FACTOR = 8

class RAM8 {
  constructor () {
    this.registers = new Array(MEMORY_SIZE_FACTOR).fill(null).map( _ => new Register() )
  }

  in (inpins, load, address) {
    let loads = dmux8way(load, address)

    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.registers[i].in(inpins, loads[i])
    }
  }

  out (address) {
    let outs = []
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      outs.push(this.registers[i].out())
    }

    return mux8way16(...outs, address)
  }

  clock () {
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.registers[i].clock()
    }
  }

}

class RAM64 {

  constructor () {
    this.rams = new Array(MEMORY_SIZE_FACTOR).fill(null).map(_ => new RAM8())
  }

  in (inpins, load, address) {
    let loads = dmux8way(load, address.slice(-3))

    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].in(inpins, loads[i], address.slice(0, 3))
    }
  }

  out (address) {
    let outs = []
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      outs.push(this.rams[i].out(address.slice(0, 3)))
    }

    console.log(outs);

    return mux8way16(...outs, address.slice(-3))
  }

  clock () {
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].clock()
    }
  }

}

class RAM512 {

  constructor () {
    this.rams = new Array(MEMORY_SIZE_FACTOR).fill(null).map(_ => new RAM64())
  }

  in (inpins, load, address) {
    let loads = dmux8way(load, address.slice(-3))

    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].in(inpins, loads[i], address.slice(0, 6))
    }
  }

  out (address) {
    let outs = []
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      outs.push(this.rams[i].out(address.slice(0, 6)))
    }

    return mux8way16(...outs, address.slice(-3))
  }

  clock () {
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].clock()
    }
  }

}

class RAM4K {

  constructor () {
    this.rams = new Array(MEMORY_SIZE_FACTOR).fill(null).map(_ => new RAM512())
  }

  in (inpins, load, address) {
    let loads = dmux8way(load, address.slice(-3))

    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].in(inpins, loads[i], address.slice(0, 9))
    }
  }

  out (address) {
    let outs = []
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      outs.push(this.rams[i].out(address.slice(0, 9)))
    }

    return mux8way16(...outs, address.slice(-3))
  }

  clock () {
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].clock()
    }
  }

}

class RAM16K {

  constructor () {
    this.rams = new Array(MEMORY_SIZE_FACTOR).fill(null).map(_ => new RAM4K())
  }

  in (inpins, load, address) {
    let loads = dmux8way(load, address.slice(-3))

    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].in(inpins, loads[i], address.slice(0, 12))
    }
  }

  out (address) {
    let outs = []
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      outs.push(this.rams[i].out(address.slice(0, 12)))
    }

    return mux8way16(...outs, address.slice(-3))
  }

  clock () {
    for (var i = 0; i < MEMORY_SIZE_FACTOR; i++) {
      this.rams[i].clock()
    }
  }

}

module.exports = {RAM8, RAM64, RAM512, RAM4k, RAM16K}
