const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const { writeFileSync } = require("fs");
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const { askForDirectory } = require("../../util/askForDirectory")
const { writeError } = require("../../util/messages")
const chalk = require("chalk")
const shell = require("shelljs");
const inquirer = require("inquirer")

function writeSubjectRC(subjectName, subjectType) {
  let rc = {
    name: subjectName,
    type: subjectType
  }
    writeFileSync(getDirectoryPath(`${subjectName}/hoot.json`),
      JSON.stringify(rc,null,2),
      writeError
    );
}

async function makeSubject(name) {
    if (!await verifyDirectory("", true)) {
      console.log(chalk.red("ERROR: ") + chalk.blue("School not found"));
      console.log(chalk.green("Try running ") + chalk.blue("hoot setup"));
      shell.exit(1)
    }

    let path = await askForDirectory(1,"subject")

    let { subjectType } = await inquirer.prompt([
      {
        type: "list",
        name: "subjectType",
        message: "Type of subject",
        choices: ["Computer Science", "Math", "Literature", "Art"]
      }
    ]);

    console.log(subjectType)
  
    if (await verifyDirectory(`${path}/${name}`, true)) {
        writeError("This subject already exists on disk.")
        shell.exit(1)
    }
    
    let writeConfirmation = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: chalk.blue(
        `Just to confirm, you want to make a subject called ${name}, of type ${
          subjectType
        }?`
      ),
      default: true
    });
  
    if (!writeConfirmation.confirm) {
      console.log("That's fine, bye!");
      shell.exit(1)
    }
  
    console.log("Alright, let's go!");
    await makeDirectory(`${path}/${name}`)
    console.log("Subject created.")
    await writeSubjectRC(`${path}/${name}`, subjectType);
    console.log(chalk.blue("Hoot.json created. You're all set!"));
  }

module.exports = {
    makeSubject : makeSubject
}