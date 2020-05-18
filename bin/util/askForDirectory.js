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
async function askDirectoryName(level, use, choices) {
  let answers = await inquirer.prompt({
    type: "list",
    name: "answer",
    message: `What ${level} is this ${use} in?`,
    choices: choices
  });
  return answers;
}

/**
 * Asks the user for the path to a given directory through a series of questions.
 *
 * @param {number} level The level up to which you'd like to ask. 1 - subject, 2 - unit, 3 - assignments
 * @param {string} use The place that this directory path will be used.
 * @returns
 */
async function askForDirectoryPath(level, use) {
  let finalPath = [];

  var unitChoices, unitChoice;
  var subjectChoices, subjectChoice;
  var assignmentChoices, assignmentChoice;
  var termChoices, termChoice;

  termChoices = getDirectory("");
  termChoice = await askDirectoryName("term", use, termChoices);
  finalPath.push(termChoice.answer);

  if (level > 1) {

    subjectChoices = getDirectory(termChoice.answer);

    if (subjectChoices.length == 0) {
      writeError(chalk.blue("You do not have any subjects. Try running ") +
        chalk.green("hoot new subject <name>"))
      shell.exit(1);
    }

    subjectChoice = await askDirectoryName("subject", use, subjectChoices);
    finalPath.push(subjectChoice.answer);
  }

  if (level > 2) {

    unitChoices = getDirectory(
      joinPath([termChoice.answer, subjectChoice.answer])
    );

    if (unitChoices.filter(folder => folder != "Finished").length == 0) {
      writeError(chalk.blue("You do not have any units. Try running ") +
        chalk.green("hoot new unit <name>"));
      shell.exit(1);
    }

    const { answer } = await askDirectoryName("unit", use, unitChoices);
    finalPath.push(answer);
  }

  if (level > 3) {

    assignmentChoices = getDirectory(
      joinPath([termChoice.answer, subjectChoice.answer, unitChoice.answer, "Assignments"])
    )

    if (assignmentChoices.length == 0) {
      writeError(chalk.blue("You do not have any subjects. Try running ") +
      chalk.green("hoot new subject <name>"))
      shell.exit(1);
    }
    assignmentChoice = await askDirectoryName("assignment", use, assignmentChoices);
    finalPath.push("Assignments/" + assignmentChoice.answer);
  }

  return joinPath(finalPath)
}

module.exports = {
  askForDirectory: askForDirectoryPath
};
