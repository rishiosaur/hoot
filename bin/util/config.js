const { readFileSync } = require("fs");

function getConfig () {
    return readFileSync()
}

module.exports = {
    getConfig,

}