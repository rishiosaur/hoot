const shell = require("shelljs")

/**
 * A function that returns the path of a function local to the global npm dependencies.
 *
 * @param {*} directory The path of the relative function
 * @returns A completed path with the global directory, relative to hoot
 */
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