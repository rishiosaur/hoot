const chalk  = require('chalk')

function createMessage (color, type) {
    return function(message) {
        console.log(chalk.keyword(color)(type + ": ") + message)
    }
}

const writeError = createMessage("red", "ERROR");

const writeStatus = createMessage("yellow", "STATUS")

module.exports = {
    writeError,
    writeStatus,
    createMessage
}