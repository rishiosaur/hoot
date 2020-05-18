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

  //
  // INITIAL SETUP
  //

  const templatePath = await getGlobalPath(`/hoot-cli/templates/`);

  // Making sure that all of the useful commands are available concurrently
  await Promise.all([
    verifyCmd("git"),
    verifyCmd("npm")
  ])
  console.log(
    chalk.green(`Alright, let's make your assignment called: ${name}`)
  );


  //
  // USER INPUTS
  //

  let path = await askForDirectory(3, "assignment");

  let templates = shell.cd(templatePath);

  // Once the shell has changed directories into 
  templates = (shell.exec("ls").stdout).split("\n").slice(0, -1);

  let answers = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Assignment type",
      choices: templates
    },
    {
      type: "confirm",
      name: "research",
      message: "Add research folder",
      default: true
    }
  ]);

  if (verifyDirectory(`${path}/Assignments/${name}`, true)) {
    writeError("Assignment already exists on disk.");
    shell.exit(1);
  }

  // Creates assignment directory
  await makeDirectory(`${path}/Assignments/${name}`);

  writeStatus("Assignment folder created.");

  let assignmentRCJSON = {
    name: name,
    completed: false,
    mark: 0
  };

  //
  // APPLICATION LOGIC
  //

  // Blocking filesystem requests are faster than asynchronous ones.
  writeFileSync(
    getDirectoryPath(`${path}/Assignments/${name}/hoot.json`),

    JSON.stringify(assignmentRCJSON),

    (err) => {
      if (err) return write;
      // console.log(JSON.stringify(assignmentRCJSON));
      writeStatus(
        "Writing to " +
          getDirectoryPath(`${path}/Assignments/${name}/hoot.json`)
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
        console.log(getDirectoryPath(`${path}/Assignments/${name}`).replace(/ /g, "\\ "))
      }
    }
  ); //copies directory, even if it has subdirectories or files
}

module.exports = {
  makeAssignment: makeAssignment
};
