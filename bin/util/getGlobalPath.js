const shell = require("shelljs")

async function getGlobalPath(directory){
    let path = await shell.exec("npm list -g | head -n 1")
    return path.stdout + directory
}

module.exports = {
    getGlobalPath : getGlobalPath
}