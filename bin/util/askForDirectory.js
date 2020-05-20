const { getDirectoryPath } = require("./getDirectoryPath");
const { joinPath } = require("./joinPath");
const { getDirectory } = require("./getDirectory");
const { writeError } = require('../util/messages')
const shell = require("shelljs");
const chalk = require("chalk");
const inquirer = require("inquirer");

/**
 * A utility function for askForDirectoryPath. This just asks for a singular 
 *
 * @param {*} level
 * @param {*} use
 * @param {*} choices
 * @returns
 */
const askDirectoryName = (use) => (level) => (choices) => (
   inquirer.prompt({
    type: "list",
    name: "answer",
    message: `What ${level} is this ${use} in?`,
    choices: choices
  }))
/**
 * Asks the user for the path to a given directory through a series of questions.
 *
 * @param {number} level The level up to which you'd like to ask. 1 - subject, 2 - unit, 3 - assignments
 * @param {string} use The place that this directory path will be used.
 * @returns
 */
async function askForDirectoryPath(level, use) {
  // This is the path that everything gets pushed to; all of the custom directories go here.
  let finalPath = [];

  // To reduce repetition, this curried function saves the use inside its closure.
  const askDirContext = askDirectoryName(use);
  
  // Getting the directory process started.
  termChoices = getDirectory("");
  termChoice = await askDirContext("term")(termChoices);
  finalPath.push(termChoice.answer);

  // TODO: Convert argument checking to a for loop, or refactor into a separate function

  // All of the entries are 0-indexed, so the numbers are always one more than what they 'should' be.
  // Level 1 is full of subjects
  if (level > 1) {
    const subjectChoices = getDirectory(termChoice.answer);

    if (subjectChoices.length == 0) {
      writeError(chalk.blue("You do not have any subjects. Try running ") +
        chalk.green("hoot new subject <name>"))
      shell.exit(1);
    }

    const subjectChoice = await askDirContext("subject")(subjectChoices);
    finalPath.push(subjectChoice.answer);
  }

  // Level 2 is full of units
  if (level > 2) {
    const unitChoices = getDirectory(
      joinPath(finalPath)
    );

    if (unitChoices.filter(folder => folder != "Finished").length == 0) {
      writeError(chalk.blue("You do not have any units in this subject. Try running ") +
        chalk.green("hoot new unit <name>"));
      shell.exit(1);
    } 

    const { answer } = await askDirContext("unit")(unitChoices);
    finalPath.push(answer);
    
  }

  // Level 3 is full of assignments
  if (level > 3) {
    finalPath.push("Assignments")

    assignmentChoices = getDirectory(
      joinPath(finalPath)
    )

    if (assignmentChoices.length == 0) {
      writeError(chalk.blue("You do not have any subjects. Try running ") +
        chalk.green("hoot new subject <name>"))
      shell.exit(1);
    }

    assignmentChoice = await askDirContext(assignments)(assignmentChoices);

    finalPath.push(assignmentChoice.answer);
  }

  console.log(joinPath(finalPath))
  return joinPath(finalPath)
}

module.exports = {
  askForDirectory: askForDirectoryPath
};
