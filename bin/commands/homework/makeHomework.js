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

async function makeHomework(name) {
  inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
  await verifyCmd("git");
  await verifyCmd("npm")
  console.log(
    chalk.green(`Alright, let's make your homework called: ${name}`)
  );
  let {date} = await inquirer.prompt([
    {
      type: 'datetime',
      name: 'date',
      message: 'What date was this homework given?'
    }
  ])

  name = date + name
  
  let path = await askForDirectory(3, "piece of homework");

  if (await verifyDirectory(`${path}/Homework/${name}`, true)) {
    console.log(
      chalk.red("ERROR ") + chalk.blue("Homework already exists on file.")
    );
    shell.exit(1);
  }

  await makeDirectory(`${path}/Homework/${name}`);
  console.log("Homework folder created.")
  let templateToCopy = await getGlobalPath(
    `/hoot-cli/templates/hoot-homework`
  ).catch(err => console.log(err));
  await copyDir(
    templateToCopy,
    getDirectoryPath(`${path}/Homework/${name}`),
    {},
    function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Copied " + "hoot-homework" + " folder");
        shell.cd(getDirectoryPath(`${path}/Assignments/${name}`));
        console.log("Changed directories to assignment");
        console.log("Initializing Git");
        if (shell.exec("git init").code !== 0) {
          shell.echo("Error: Git commit failed");
          shell.exit(1);
        }
      }
    }
  ); //copies directory, even if it has subdirectories or files
}

makeHomework("Thing")

module.exports = {
  makeHomework: makeHomework
};
