const { verifyDirectory } = require("../../util/verifyDirectory");
const { makeDirectory } = require("../../util/makeDirectory");
const { verifyCmd } = require("../../util/verifyCmd");
const { getDirectoryPath } = require("../../util/getDirectoryPath");
const { getGlobalPath } = require("../../util/getGlobalPath");
const { askForDirectory } = require("../../util/askForDirectory");
const { writeError, writeStatus } = require("../../util/messages");
const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");
const { writeFileSync } = require("fs");
const copyDir = require("copy-dir");

async function makeAssignment(name) {

  //
  // INITIAL SETUP
  //

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

  let templates = shell.cd(await getGlobalPath('/hoot-cli/templates'));

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
      name: "makeResearchFolder",
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

  writeStatus("Hoot.json created.")

  if (answers.makeResearchFolder) {
    await makeDirectory(`${path}/Assignments/${name}/research`);
    console.log("Research folder created.");
  }

  const templatePath = await getGlobalPath(
    `/hoot-cli/templates/${answers.type.toLowerCase()}`
  ).catch(err => console.log(err));

  // Copies the selected template to the assignment folder.
  copyDir(
    // Global path to copy
    templatePath,

    // Path to school subdirectory
    getDirectoryPath(`${path}/Assignments/${name}`),

    // No options
    {},

    // Because this is not a promise-based async function call, callbacks are required.
    function (err) {
      if (err) {
        writeError(err);
        shell.exit(1)
      } else {

        writeStatus("Copied " + answers.type + " folder");
        shell.cd(getDirectoryPath(`${path}/Assignments/${name}`));
        writeStatus("Changed directories to assignment");

        // Initializing all the version control and package management systems

        writeStatus("Initializing Git");

        if (shell.exec("git init").code !== 0) {
          shell.echo("Error: Git commit failed");
          shell.exit(1);
        }

        writeStatus("Installing NPM packages");

        if (shell.exec("npm install", { silent: true, fatal: true }).code !== 0) {
          // We can run npm install even if there is no package.json, reducing a large amount of bloating.
          shell.echo("Error: NPM install failed");
          shell.exit(1);
        }

        console.log("Your assignment is stored at: " + chalk.blue(getDirectoryPath(`${path}/Assignments/${name}`).replace(/ /g, "\\ ")))
      }
    }
  );
}

module.exports = {
  makeAssignment: makeAssignment
};