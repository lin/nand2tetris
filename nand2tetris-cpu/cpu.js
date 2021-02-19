const {or, not, and} = require('../nand2tetris-gates/base')
const {dmux8way} = require('../nand2tetris-gates/multiWay')

class CPU {

  constructor () {
    this.aRegister = new Register()
    this.dRegister = new Register()
    this.pc = new ProgramCounter()
    this.ALUoutput = null
    this.writeFlag = false
  }

  in (memoryData, instruction, reset) {

    let aOrCFlag     = instruction[0]
    let aConstant    = instruction.slice(1, 16)

    let aRegisterOut = this.aRegister.out()
    let dRegisterOut = this.dRegister.out()

    let aOrMFlag    = instruction[3]
    let computation = instruction.slice(4, 10)
    let loadA       = instruction[10]
    let loadD       = instruction[11]
    let loadM       = instruction[12]
    let jump        = instruction.slice(13, 16)

    let aOrMOut = mux16(aRegisterOut, memoryData, aOrMFlag)

    let ALUResult = ALU(dRegisterOut, aOrMOut, ...computation)

    let outM = this.ALUoutput = ALUresult[0]
    let zr = ALUresult[1]
    let ng = ALUresult[2]

    let jumps = [
      0,
      not(or(ng, zr)),
      zr,
      not(ng),
      ng,
      not(zr),
      or(ng, zr),
      1,
    ]

    let jumpLoad = dmux8way(jumps, jump.reverse())
    let jumpInc  = not(jumpLoad)

    this.pc.in(aRegisterOut, jumpLoad, jumpInc, reset)

    let aRegisterInpins = mux16(aConstant, outM, aOrCFlag)
    this.aRegister.in(aRegisterInpins, loadA)
    this.writeFlag = or(not(aOrCFlag), loadM)
    this.dRegister.in(outM, loadD)
  }

  out () {
    return {
      memoryAddress: this.aRegister.out(),
      outputData: this.ALUoutput,
      writeFlag: this.writeFlag,
      instructionAddress: this.pc.out()
    }
  }

}
