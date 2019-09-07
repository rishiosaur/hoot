const inquirer = require("inquirer");
const { getDirectory } = require("../../util/getDirectory");
const { getDirectoryPath } = require("../../util/getDirectoryPath");
const os = require("os")
const { joinPath } = require("../../util/joinPath")

const shell = require("shelljs");
const chalk = require("chalk");

async function viewItem() {
  let homedir = await os.homedir()
  console.log(`Format: ${chalk.blue("School")} / ${chalk.green("Term <number>")} / ${chalk.yellow("<Subject>")} / ${chalk.red("<Unit>")} / <Assignments|Finished>`)
  let stuff = await shell.exec(`find ${getDirectoryPath("")} -type d  -not -path '*/\.*';`, {silent: true}).stdout.split("\n").slice(0,-1)
  let formattedStuff = stuff.map(path => {
    return path.replace(homedir + "/Documents", "")
  })
  console.log(formattedStuff)
  // let terms = await getDirectory("");
  //   console.log(chalk.blue("Your assignments:"))
  //   terms.forEach((term, index) => (
  //       getDirectory(term).then(subject => {
  //           console.log(chalk.green(terms[index]))
  //           subject.forEach(subject => {
  //             console.log(chalk.blue(subject))
  //             console.log(getDirectory(getDirectoryPath(joinPath([term,subject]))))
  //           })
  //           //Separator of the subjects
  //           console.log("---")
  //       })
  //   ))

}

module.exports = {
  viewItem: viewItem
};
