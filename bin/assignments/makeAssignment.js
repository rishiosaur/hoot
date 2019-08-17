import { getDirectory } from "../util/getDirectory";
const chalk = require("chalk")
const shell = require("shelljs")
const {verifyCmd} = require("../util/verifyCmd")
const {verifyDirectory} = require("../util/verifyDirectory.js")

export default async function makeAssignment(name) {
    verifyCmd("git")
    verifyCmd("npm")
    let schoolVerification = await getDirectory("")
    let subjects = await getSubjects();
    if (!subjects) {
      console.log(
        chalk.red("ERROR ") +
          chalk.blue("You do not have subjects. Try running ") +
          chalk.green("hoot subject <title>")
      );
      return;
    }
  
    if (!verification) {
      console.log(chalk.red("ERROR: ") + chalk.blue("School not found"));
      console.log(chalk.green("Try running ") + chalk.blue("hoot setup"));
      return;
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
  
    let aVer = await verifyAssignment(name, answers.subject);
    if (aVer) {
      console.log(
        chalk.red("ERROR ") + chalk.blue("Assignment already exists on file.")
      );
      return;
    }
  
    await mkdirSync(
      `/Users/${os.userInfo().username}/Documents/School/${
        answers.subject
      }/${name}`
    );
    console.log("Assignment folder created.");
    await mkdirSync(
      `/Users/${os.userInfo().username}/Documents/School/${
        answers.subject
      }/${name}/mark`
    );
    console.log("Rubric folder created.");
    if (answers.research) {
      await mkdirSync(
        `/Users/${os.userInfo().username}/Documents/School/${
          answers.subject
        }/${name}/research`
      );
      console.log("Research folder created.");
    }
    await copy(
      resolve(`./templates/${answers.type.toLowerCase()}`),
      `/Users/${os.userInfo().username}/Documents/School/${
        answers.subject
      }/${name}/`,
      function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Copied " + answers.type + " folder");
          shell.cd(
            `/Users/${os.userInfo().username}/Documents/School/${
              answers.subject
            }/${name}`
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
    ); //copies directory, even if it has subdirectories or files
  }