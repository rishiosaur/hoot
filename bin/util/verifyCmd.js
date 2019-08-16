import chalk from "chalk";

const shell = require("shelljs")

export function verifyCmd(command){
    if(shell.which(command)){
        console.log(chalk.red("ERROR:") + chalk.blue("This script requires") + command)
        shell.exit(1)
    }
}