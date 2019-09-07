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
      `find ${getDirectoryPath("").slice(
        0,
        -1
      )} -type d  -not -path '*/\.*' | sort;`,
      { silent: true }
    )
    .stdout.split("\n")
    .slice(0, -1);
}

module.exports = {
  viewItem: viewItem
};
