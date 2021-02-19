const ClassParser = require('./class')
const {SourceLocation} = require('../tokenizer/location')

class Node {

  constructor (pos, loc) {
    this.type = ''
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc)
  }

}

class Parser extends ClassParser {

  parse () {
    let node = this.startNode()
    this.next()
    node.body = this.parseClass()
    return this.finishNode(node, 'Program')
  }

  startNode () {
    return new Node(this.state.start, this.state.startLoc);
  }

  finishNode (node, type) {
    node.type = type
    node.end = this.state.lastTokEnd
    node.loc.end = this.state.lastTokEndLoc
    return node
  }

}

module.exports = Parser
