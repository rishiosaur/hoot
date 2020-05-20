const { mkdirSync } = require("fs")
const { getDirectoryPath } = require("./getDirectoryPath")
const { verifyDirectory } = require("./verifyDirectory")

function makeDirectory (path) {
    verifyDirectory("", true)
    let dirPath = getDirectoryPath(path)
    mkdirSync(dirPath);
}

module.exports = {
    makeDirectory
}