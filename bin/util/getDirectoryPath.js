const os = require("os")

function getDirectoryPath(subfolder){
    let path = `${os.homedir()}/Documents/School/${subfolder}`
    return path
}

module.exports = {
    getDirectoryPath : getDirectoryPath
}