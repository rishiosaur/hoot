const inquirer = require("inquirer")
const { getDirectory } = require("../../util/getDirectory")
const shell = require("shelljs")
const chalk = require("chalk")

function validateItem(item) {
    let lowercasedItem = item.toLowerCase()
    let arrayToMatch = ["a","s","assignments","subjects"]
    if ( arrayToMatch.includes(lowercasedItem) ) {
        return ["a","assignments"].includes(lowercasedItem) ? true : false
    } else {
        console.log(
            chalk.red("ERROR: ") + chalk.blue("Invalid input for " + chalk.green("hoot view\n") + chalk.blue("Try running ") + chalk.green("hoot view subjects"))
        );
        shell.exit(1)
    }
}

async function viewItem(item){
    let check = validateItem(item)
    let subjects = getDirectory("").then(subjects => console.log(subjects))
    let assignments = getDirectory("").then(subjects => subjects.map(assignment => getDirectory(assignment).then(assignment=>console.log(assignment))))
    if(check) {
        console.log(assignments)
    } else {
        subject.forEach(subject => {
            console.log(subject)
        });
    }


}

module.exports = {
    viewItem : viewItem
}