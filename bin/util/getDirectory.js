const { readdirSync } = require("fs")
const { getDirectoryPath } = require("./getDirectoryPath")
const { verifyDirectory } = require("./verifyDirectory")

function getDirectory (subfolder) {
    try {
        verifyDirectory(subfolder)
        return readdirSync(getDirectoryPath(subfolder), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch(err) {
        return err
    }
}

module.exports = {
    getDirectory : getDirectory
}
