const os = require("os")

/**
 * A function for formatting paths relative to the ~/School folder.
 *
 * @param {string} subfolder The subfolder that will be parsed.
 * @returns
 */
function getDirectoryPath(subfolder){
    let path = `${os.homedir()}/Documents/School/${subfolder}`
    return path
}

module.exports = {
    getDirectoryPath
}