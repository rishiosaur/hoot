const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const { getDirectory } = require("../../util/getDirectory")
const { writeFile } = require("fs");
const { askForDirectory } = require("../../util/askForDirectory")
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const chalk = require("chalk")
const shell = require("shelljs");
const inquirer = require("inquirer")

async function makeUnit(name) {
    if (!await verifyDirectory("", true)) {
      console.log(chalk.red("ERROR: ") + chalk.blue("School not found"));
      console.log(chalk.green("Try running ") + chalk.blue("hoot setup"));
      shell.exit(1)
    }
    
    let path = await askForDirectory(2,"unit")

    if (await verifyDirectory(path+"/"+name, true)) {
      console.log(
        chalk.red("ERROR ") + chalk.blue("Unit already exists on file.")
      );
      shell.exit(1)
    }
    
    let writeConfirmation = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: chalk.blue(
        `Just to confirm, you want to make a unit called ${name}?`
      ),
      default: true
    });
  
    if (!writeConfirmation.confirm) {
      console.log("That's fine, bye!");
      shell.exit(1)
    }
  
    console.log("Alright, let's go!");
    await makeDirectory(path+"/"+name)
    console.log("Unit created.")
}

module.exports = {
    makeSubject : makeUnit
}