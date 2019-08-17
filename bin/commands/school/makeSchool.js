const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const chalk = require("chalk")
const shell = require("shelljs");
const figlet = require('figlet')
const inquirer = require("inquirer")

async function makeSchool() {
    if (await verifyDirectory("", true)) {
      console.log(
        chalk.red("ERROR: ") + chalk.blue("You already have a school folder.")
      );
      console.log(
        chalk.green("Note: ") +
          chalk.blue("hoot setup ") +
          chalk.yellow("is a one-time command.")
      );
      shell.exit(1)
    }
    /*
    create directory with name in current directory
    */
    console.log(
      figlet.textSync("Hoot!", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    );
  
    console.log("Welcome! It's great to have you.");
    console.log("Let's get you started with Hoot, shall we?");
    let answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "make",
        message: "Create school folder?",
        default: true
      },
      {
        type: "confirm",
        message: "Make 'other' folder",
        name: "other",
        default: true
      }
    ]);
    console.log(answers.make ? "Great!" : "Ok, bye!");
  
    await makeDirectory("");
    if (answers.other) {
      await makeDirectory("/other");
    }
  
    console.log(
      `Your school folder has been created. I'll see you soon, ${
        os.userInfo().username
      }!`
    );
  }

module.exports = {
    makeSchool : makeSchool
}