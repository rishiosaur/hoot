const { getDirectoryPath } = require("./getDirectoryPath")
const { existsSync } = require("fs")
const shell = require("shelljs")
const chalk  = require('chalk')

async function verifyDirectory (subfolder, invert) {
    let path = getDirectoryPath(subfolder)
    if (existsSync(path)) {
        return true
    } else if(invert) {
        return false
    } else {
        console.log(chalk.red("ERROR: ") + chalk.blue(`${subfolder} not found.`));
        console.log(chalk.green("Try running ") + chalk.blue("hoot setup") + " or " + chalk.blue("hoot assignment"));
        shell.exit(1);
        return false
    }
}

module.exports = {
    verifyDirectory: verifyDirectory
}