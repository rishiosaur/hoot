const { getDirectoryPath } = require("../../util/getDirectoryPath");
const os = require("os");

const shell = require("shelljs");
const chalk = require("chalk");

async function viewItem() {
  let homedir = await os.homedir();
  console.log(
    `Format: ${chalk.blue("School")} / ${chalk.green(
      "Term <number>"
    )} / ${chalk.yellow("<Subject>")} / ${chalk.red(
      "<Unit>"
    )} / <Assignments|Finished>`
  );
  let stuff = await shell
    .exec(
      `find ${getDirectoryPath("").slice(0, -1)} -type d  -not -path '*/\.*';`,
      { silent: true }
    )
    .stdout.split("\n")
    .slice(0, -1);
  stuff.map(path => {
    let tempPath = path
      .replace(homedir + "/Documents", "")
      .substring(1)
      .split("/");
    tempPath.map((folder, index) => {
      if (index == 0) {
        tempPath[index] = chalk.blue(folder);
      }
      if (index == 1) {
        tempPath[index] = chalk.green(folder);
      }
      if (index == 2) {
        tempPath[index] = chalk.yellow(folder);
      }
      if (index == 3) {
        tempPath[index] = chalk.red(folder);
      }
    });
    console.log(tempPath.join("/"));
    return tempPath;
  });
}

module.exports = {
  viewItem: viewItem
};
