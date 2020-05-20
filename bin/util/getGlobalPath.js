const shell = require("shelljs")

async function getGlobalPath(directory){
    try {
        let a = await shell.exec("npm root -g")
        return a.stdout.substring(0, a.stdout.length - 1).concat(directory)
    } catch(err) {
        return err
    }
}

module.exports = {
    getGlobalPath
}