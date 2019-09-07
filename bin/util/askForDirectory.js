const { getDirectoryPath } = require("./getDirectoryPath");
const { joinPath } = require("./joinPath");
const { getDirectory } = require("./getDirectory");
const shell = require("shelljs");
const chalk = require("chalk");
const inquirer = require("inquirer");

async function askDirectoryName(level, use, choices) {
  let answers = await inquirer.prompt({
    type: "list",
    name: "answer",
    message: `What ${level} is this ${use} in?`,
    choices: choices
  });
  return answers;
}

async function askForDirectory(level, use) {
  let finalPath = [];

  var termChoices, termChoice;
  var subjectChoices, subjectChoice;
  var unitChoices, unitChoice;
  var assignmentChoices, assignmentChoice;

  termChoices = await getDirectory("");
  termChoice = await askDirectoryName("term", use, termChoices);
  finalPath.push(termChoice.answer);

  if (level > 1) {
    subjectChoices = await getDirectory(termChoice.answer);

    if (subjectChoices.length == 0) {
      console.log(
        chalk.red("ERROR ") +
          chalk.blue("You do not have any subjects. Try running ") +
          chalk.green("hoot subject")
      );
      shell.exit(1);
    }

    subjectChoice = await askDirectoryName("subject", use, subjectChoices);
    finalPath.push(subjectChoice.answer);
  }

  if (level > 2) {
    unitChoices = await getDirectory(
      joinPath([termChoice.answer, subjectChoice.answer])
    );

    if (unitChoices.filter(folder=>folder!="Finished").length == 0) {
        console.log(
          chalk.red("ERROR ") +
            chalk.blue("You do not have any units. Try running ") +
            chalk.green("hoot unit")
        );
        shell.exit(1);
    }

    unitChoice = await askDirectoryName("unit", use, unitChoices);
    finalPath.push(unitChoice.answer);
  }

  if (level > 3) {
      assignmentChoices = await getDirectory(
          joinPath([termChoice.answer,subjectChoice.answer,unitChoice.answer,"Assignments"])
      )

      if(assignmentChoices.length == 0) {
        console.log(
          chalk.red("ERROR ") +
            chalk.blue("You do not have any subjects. Try running ") +
            chalk.green("hoot subject <name>")
        );
        shell.exit(1);
    }
    assignmentChoice = await askDirectoryName("assignment", use, assignmentChoices);
    finalPath.push("Assignments/"+assignmentChoice.answer);
  }
  
  return joinPath(finalPath)
}

module.exports = {
  askForDirectory: askForDirectory
};
