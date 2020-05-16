const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const { writeStatus, writeError } = require("../../util/messages")
const chalk = require("chalk")
const shell = require("shelljs");
const figlet = require('figlet')
const inquirer = require("inquirer")
const os = require("os")

async function makeSchool() {
    if (await verifyDirectory("", true)) {
      writeError(chalk.blue("You already have a school folder.");
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
        type: "number",
        name: "terms",
        message: "How many semesters/terms do you have this year?",
        default: 2
      },
      {
        type: "confirm",
        message: "Make 'other' folder",
        name: "other",
        default: true
      },
      {
        type: "input",
        message: "Are you in a specialized program that requires you to do things specific to it outside of the regular curriculum, such as IB or AP? If you are, put the name here.",
        name: "program"
      },
    ]);

    console.log(answers.make ? "Great!" : "Ok, bye!");
  
    await makeDirectory("");
    
    if (answers.other) {
      await makeDirectory("/other");
    }

    if (answers.program) {
      await makeDirectory(`/${answers.program}`)
    }
    
    let numberOfTerms = answers.terms
    console.log(`Creating ${numberOfTerms} terms.`)

    for (let index = 0; index < numberOfTerms; index++) {
      await makeDirectory(`Term ${index+1}`)
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