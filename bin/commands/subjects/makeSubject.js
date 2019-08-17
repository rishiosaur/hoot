const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const { writeFile } = require("fs");
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const chalk = require("chalk")
const shell = require("shelljs");
const inquirer = require("inquirer")

async function writeSubjectRC(subjectName, subjectType) {
    let string =
      "{\n" +
      "'name':" +
      subjectName +
      ",\n" +
      "'type':" +
      subjectType +
      ",\n" +
      "}";
    writeFile(getDirectoryPath(`${subjectName}/hoot.json`),
      string,
      err => console.log(err ? err : "")
    );
  }

async function makeSubject(name) {
    if (!await verifyDirectory("", true)) {
      console.log(chalk.red("ERROR: ") + chalk.blue("School not found"));
      console.log(chalk.green("Try running ") + chalk.blue("hoot setup"));
      shell.exit(1)
    }
  
    if (await verifyDirectory(name, true)) {
      console.log(
        chalk.red("ERROR ") + chalk.blue("Subject already exists on file.")
      );
      shell.exit(1)
    }
  
    let answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Type of subject",
        choices: ["Computer Science", "Math"]
      }
    ]);
  
    console.log(
      chalk.blue(
        `Just to confirm, you want to make a subject called ${name}, of type ${
          answers.type
        }?`
      )
    );
  
    let answers2 = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      messsage: chalk.blue(
        `Just to confirm, you want to make a subject called ${name}, of type ${
          answers.subject
        }?`
      ),
      default: true
    });
  
    if (!answers2.confirm) {
      console.log("That's fine, bye!");
      shell.exit(1)
    }
  
    console.log("Alright, let's go!");
    await makeDirectory(name)
    console.log("Subject created.");
    await writeSubjectRC(name, answers.type);
    console.log(chalk.blue("Hoot.json created. You're all set!"));
  }

module.exports = {
    makeSubject : makeSubject
}