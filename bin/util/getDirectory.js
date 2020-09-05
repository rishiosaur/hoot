const { readdirSync } = require("fs")
const { getDirectoryPath } = require("./getDirectoryPath")
const { verifyDirectory } = require("./verifyDirectory")

/**
 * A recursive method that returns the path to a given global directory, with respect to the School dir.
 *
 * @param {string | PathLike} subfolder The subfolder that is appended to the global directory
 * @returns 
 */
async function getDirectory (subfolder) {
    // TODO: Switch to promise.all
    try {
        verifyDirectory(subfolder)
        return readdirSync(getDirectoryPath(subfolder), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
            return dirent.name
        });
    } catch(err) {
        return err
    }
}

module.exports = {
    getDirectory
}
