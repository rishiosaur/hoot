const { getDirectoryPath } = require("./getDirectoryPath")
const { existsSync } = require("fs")
const shell = require("shelljs")
const chalk  = require('chalk')

/**
 * Verifies whether or not a directory actually exists.
 *
 * @param {string} subfolder The subfolder path
 * @param {boolean} invert When creating a folder, you will often want to verify the existence of a folder in that path. Set this to true.
 * @returns Whether or not the directory already exists
 */
function verifyDirectory (subfolder, invert = false) {
    // Formatted path
    let path = getDirectoryPath(subfolder)
    console.log(path.replace(/\s/g, "\\ "))
    if (existsSync(path)) {
        return true
    } else if(invert) {
        return false
    } else {
        // If the code does not specifically warrant an inverse, then throw an error.
        console.log(chalk.red("ERROR: ") + chalk.blue(`${subfolder} not found.`));
        console.log(chalk.green("Try running ") + chalk.blue("hoot setup") + " or " + chalk.blue("hoot assignment"));
        shell.exit(1);
    }
}

module.exports = {
    verifyDirectory
}