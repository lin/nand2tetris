#!/usr/bin/env node
const VMtranslator = require('./VMtranslator')
if (process.argv[2]) VMtranslator(process.argv[2], process.argv[3])
