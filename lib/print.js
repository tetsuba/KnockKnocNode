function print(id, msg) {
  switch (id) {
    case 'error':
      printLine()
      printError('ERROR!')
      printError(msg)
      printLine()
      break;
    case 'msg':
      printLine()
      printMsg('SUCCESS')
      printMsg(msg)
      printLine()
      break;
    default:
      printMsg('No message found')
  }
}

function printError(msg) {
  console.error(msg)
}

function printMsg(msg) {
  console.log(msg)
}

function printLine() {
  console.log("*********************************************************")
}

module.exports = print