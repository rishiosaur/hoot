const os = require("os")

function getDirectoryPath(subfolder){
    let path = `/Users/${os.userInfo().username}/Documents/School/${subfolder}`
    return path
}

module.exports = {
    getDirectoryPath : getDirectoryPath
}