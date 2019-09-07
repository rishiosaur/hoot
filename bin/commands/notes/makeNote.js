const { verifyDirectory } = require("../../util/verifyDirectory");
const { makeDirectory } = require("../../util/makeDirectory");
const { verifyCmd } = require("../../util/verifyCmd");
const { getDirectoryPath } = require("../../util/getDirectoryPath");
const { getGlobalPath } = require("../../util/getGlobalPath");
const { askForDirectory } = require("../../util/askForDirectory");
const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");
const copyDir = require("copy-dir");

async function makeHomework(name) {
  inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
  await verifyCmd("git");
  console.log(
    chalk.green(`Alright, let's make your note called: ${name}`)
  );
  name = name
  
  let path = await askForDirectory(3, "piece of note");

  if (await verifyDirectory(`${path}/Note/${name}`, true)) {
    console.log(
      chalk.red("ERROR ") + chalk.blue("Note already exists on file.")
    );
    shell.exit(1);
  }

  await makeDirectory(`${path}/Note/${name}`);
  console.log("Note folder created.")
  let templateToCopy = await getGlobalPath(
    `/hoot-cli/templates/hoot-note`
  ).catch(err => console.log(err));
  await copyDir(
    templateToCopy,
    getDirectoryPath(`${path}/Note/${name}`),
    {},
    function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Copied " + "hoot-note" + " folder");
        shell.cd(getDirectoryPath(`${path}/Note/${name}`));
        console.log("Changed directories to assignment");
        console.log("Initializing Git");
        if (shell.exec("git init").code !== 0) {
          shell.echo("Error: Git init failed");
          shell.exit(1);
        }
      }
    }
  ); //copies directory, even if it has subdirectories or files
}

module.exports = {
  makeHomework: makeHomework
};
