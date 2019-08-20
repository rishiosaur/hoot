const inquirer = require("inquirer");
const { getDirectory } = require("../../util/getDirectory");
const shell = require("shelljs");
const chalk = require("chalk");

function validateItem(item) {
  let lowercasedItem = item.toLowerCase();
  let arrayToMatch = ["a", "s", "assignments", "subjects"];
  if (arrayToMatch.includes(lowercasedItem)) {
    return ["a", "assignments"].includes(lowercasedItem) ? true : false;
  } else {
    console.log(
      chalk.red("ERROR: ") +
        chalk.blue(
          "Invalid input for " +
            chalk.green("hoot view\n") +
            chalk.blue("Try running ") +
            chalk.green("hoot view subjects")
        )
    );
    shell.exit(1);
  }
}

async function viewItem(item) {
  let check = validateItem(item);
  let subjects = await getDirectory("");
  let assignments = await getDirectory("");
  if (check) {
    console.log(chalk.blue("Your assignments:"))
    subjects.forEach((subject, index) => (
        getDirectory(subject).then(assignment => {
            console.log(chalk.green(subjects[index]))

            assignment.forEach(assignment => console.log(assignment))
            //Separator of the subjects
            console.log("--")
        })
    ))
  } else {
    console.log(chalk.green("Your subjects:"));
    subjects.forEach(subject => {
      console.log(subject);
    });
  }
}

module.exports = {
  viewItem: viewItem
};
