const { getDirectory } = require("../../util/getDirectory")
const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const { verifyCmd } = require("../../util/verifyCmd")
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const { getGlobalPath } = require("../../util/getGlobalPath")
const chalk = require("chalk")
const shell = require("shelljs");
const inquirer = require("inquirer")
const { writeFile } = require("fs");
const copydir = require('copy-dir');

async function writeAssignmentRC(assignmentName, subjectName) {
  let string =
    "{\n" +
    `"name":` +
    `"${subjectName}"` +
    "\n" +
    "}";
  writeFile(getDirectoryPath(`${subjectName}/${assignmentName}/hoot.json`),
    string,
    err => console.log(err ? err : "")
  );
}

async function makeAssignment(name) {
    await verifyCmd("git")
    await verifyCmd("npm")
    let subjects = await getDirectory("");
    subjects = subjects.filter(subject => subject != "other")
    
    if (subjects.length < 1) {
      console.log(
        chalk.red("ERROR ") +
          chalk.blue("You do not have subjects. Try running ") +
          chalk.green("hoot subject <title>")
      );
      shell.exit(1)
    }
    
    console.log(
      chalk.green(`Alright, let's make your assignment called: ${name}`)
    );

    let answers = await inquirer.prompt([
      {
        type: "list",
        name: "subject",
        message: "Subject",
        choices: subjects
      },
      {
        type: "list",
        name: "type",
        message: "Assignment type",
        choices: ["Report", "Short-answer", "Presentation"]
      },
      {
        type: "confirm",
        name: "research",
        message: "Add research folder",
        default: true
      }
    ]);
  
    if (await verifyDirectory(`${answers.subject}/${name}`, true)) {
      console.log(
        chalk.red("ERROR ") + chalk.blue("Assignment already exists on file.")
      );
      shell.exit(1)
    }

    await makeDirectory(`${answers.subject}/${name}`)
    console.log("Assignment folder created.");
    await writeAssignmentRC(name,answers.subject)
    console.log("hoot.json written.")
    if (answers.research) {
      await makeDirectory(`${answers.subject}/${name}/research`)
      console.log("Research folder created.");
    }
    let a = await getGlobalPath(`/hoot-cli/templates/${answers.type.toLowerCase()}`).catch(err => console.log(err))
    await copydir(a , getDirectoryPath(`${answers.subject}/${name}`), {},
      function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Copied " + answers.type + " folder");
          shell.cd(getDirectoryPath(`${answers.subject}/${name}`)
          );
          console.log("Changed directories to assignment");
          console.log("Initializing Git")
          if (shell.exec("git init").code !== 0) {
            shell.echo("Error: Git commit failed");
            shell.exit(1);
          }
          console.log("Installing NPM packages")
          
          if (shell.exec("npm install").code !== 0) {
            shell.echo("Error: NPM install failed");
            shell.exit(1);
          }
          
        }
      }
    ) //copies directory, even if it has subdirectories or files
  }

module.exports = {
    makeAssignment : makeAssignment
}