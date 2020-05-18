const chalk  = require('chalk')

/**
 * A function that curries together a status update.
 *
 * @param {*} color The color you would like the update to be.
 * @param {*} type The type of update that will be deployed
 * @returns A function that wil log a given message using the format to the console.
 */
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