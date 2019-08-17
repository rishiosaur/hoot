const { mkdirSync } = require("fs")
const { getDirectoryPath } = require("./getDirectoryPath")
const { verifyDirectory } = require("./verifyDirectory")

async function makeDirectory (path) {
    await verifyDirectory("", true)
    let dirPath = getDirectoryPath(path)
    await mkdirSync(dirPath);
}

module.exports = {
    makeDirectory : makeDirectory
}