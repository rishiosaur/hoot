const chalk = require("chalk")

const shell = require("shelljs")

async function verifyCmd(command){
    if(!shell.which(command)){
        console.log(chalk.red("ERROR:") + chalk.blue("This script requires") + command)
        shell.exit(1)
    }
}

module.exports = {
    verifyCmd : verifyCmd
}