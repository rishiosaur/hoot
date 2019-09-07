const { getDirectory } = require("../../util/getDirectory");
const { verifyDirectory } = require("../../util/verifyDirectory");
const { makeDirectory } = require("../../util/makeDirectory");
const { verifyCmd } = require("../../util/verifyCmd");
const { getDirectoryPath } = require("../../util/getDirectoryPath");
const { getGlobalPath } = require("../../util/getGlobalPath");
const { askForDirectory } = require("../../util/askForDirectory");
const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");
const { writeFile } = require("fs");
const copyDir = require("copy-dir");

async function makeAssignment(name) {
  await verifyCmd("git");
  await verifyCmd("npm");

  console.log(
    chalk.green(`Alright, let's make your assignment called: ${name}`)
  );
  let path = await askForDirectory(3, "assignment");

  let templateP = await getGlobalPath(
    `/hoot-cli/templates/`
  ).catch(err => console.log(err));
  let templates = await shell.cd(templateP)

  if (await verifyDirectory(`${path}/Assignments/${name}`, true)) {
    console.log(
      chalk.red("ERROR ") + chalk.blue("Assignment already exists on file.")
    );
    shell.exit(1);
  }

  await makeDirectory(`${path}/Assignments/${name}`);
  console.log("Assignment folder created.");
  let assignmentRCJSON = {};
  assignmentRCJSON.name = answers.subject;
  await writeFile(
    getDirectoryPath(`${path}/Assignments/${name}/hoot.json`),
    JSON.stringify(assignmentRCJSON),
    function(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(assignmentRCJSON));
      console.log(
        "Writing to " + getDirectoryPath(`${path}/Assignments/${name}/hoot.json`)
      );
    }
  );
  console.log("hoot.json written.");
  if (answers.research) {
    await makeDirectory(`${path}/Assignments/${name}/research`);
    console.log("Research folder created.");
  }
  let templateToCopy = await getGlobalPath(
    `/hoot-cli/templates/${answers.type.toLowerCase()}`
  ).catch(err => console.log(err));
  await copyDir(
    templateToCopy,
    getDirectoryPath(`${path}/Assignments/${name}`),
    {},
    function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Copied " + answers.type + " folder");
        shell.cd(getDirectoryPath(`${path}/Assignments/${name}`));
        console.log("Changed directories to assignment");
        console.log("Initializing Git");
        if (shell.exec("git init").code !== 0) {
          shell.echo("Error: Git commit failed");
          shell.exit(1);
        }
        console.log("Installing NPM packages");

        if (shell.exec("npm install").code !== 0) {
          shell.echo("Error: NPM install failed");
          shell.exit(1);
        }
      }
    }
  ); //copies directory, even if it has subdirectories or files
}

module.exports = {
  makeAssignment: makeAssignment
};
