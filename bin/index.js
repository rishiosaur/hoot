#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const os = require("os");
const figlet = require("figlet");
const shell = require("shelljs");

const { mkdirSync, writeFile } = require("fs");
const { copy } = require("fs-extra");
const { resolve } = require("path");
const { getDirectory } = require("./util/getDirectory")
const { verifyDirectory } = require("./util/verifyDirectory")
const { makeDirectory } = require("./util/makeDirectory")
const { verifyCmd } = require("./util/verifyCmd")
const ncp = require("ncp");

const { makeAssignment }  = require("./commands/assignments/makeAssignment")
const { makeSchool } = require("./commands/school/makeSchool")
const { makeSubject } = require("./commands/subjects/makeSubject")
// async function writeSubjectRC(subjectName, subjectType) {
//   let string =
//     "{\n" +
//     "'name':" +
//     subjectName +
//     ",\n" +
//     "'type':" +
//     subjectType +
//     ",\n" +
//     "}";
//   writeFile(
//     `/Users/${
//       os.userInfo().username
//     }/Documents/School/${subjectName}/hoot.json`,
//     string,
//     err => console.log(err)
//   );
// }

// async function setupSchool() {
//   let verification = await verifyDirectory("", true)
//   if (verification) {
//     console.log(
//       chalk.red("ERROR: ") + chalk.blue("You already have a school folder.")
//     );
//     console.log(
//       chalk.green("Note: ") +
//         chalk.blue("hoot setup ") +
//         chalk.yellow("is a one-time command.")
//     );
//     shell.exit(1)
//   }
//   /*
//   create directory with name in current directory
//   */
//   console.log(
//     figlet.textSync("Hoot!", {
//       font: "Standard",
//       horizontalLayout: "default",
//       verticalLayout: "default"
//     })
//   );

//   console.log("Welcome! It's great to have you.");
//   console.log("Let's get you started with Hoot, shall we?");
//   let answers = await inquirer.prompt([
//     {
//       type: "confirm",
//       name: "make",
//       message: "Create school folder?",
//       default: true
//     },
//     {
//       type: "confirm",
//       message: "Make 'other' folder",
//       name: "other",
//       default: true
//     }
//   ]);
//   console.log(answers.make ? "Great!" : "Ok, bye!");

//   await makeDirectory("");
//   if (answers.other) {
//     await makeDirectory("/other");
//   }

//   console.log(
//     `Your school folder has been created. I'll see you soon, ${
//       os.userInfo().username
//     }!`
//   );
// }

// async function makeSubject(name) {
//   if (!await verifyDirectory("", true)) {
//     console.log(chalk.red("ERROR: ") + chalk.blue("School not found"));
//     console.log(chalk.green("Try running ") + chalk.blue("hoot setup"));
//     shell.exit(1)
//   }

//   if (await verifyDirectory(name, true)) {
//     console.log(
//       chalk.red("ERROR ") + chalk.blue("Subject already exists on file.")
//     );
//     shell.exit(1)
//   }

//   let answers = await inquirer.prompt([
//     {
//       type: "list",
//       name: "type",
//       message: "Type of subject",
//       choices: ["Computer Science", "Math"]
//     }
//   ]);

//   console.log(
//     chalk.blue(
//       `Just to confirm, you want to make a subject called ${name}, of type ${
//         answers.type
//       }?`
//     )
//   );

//   let answers2 = await inquirer.prompt({
//     type: "confirm",
//     name: "confirm",
//     messsage: chalk.blue(
//       `Just to confirm, you want to make a subject called ${name}, of type ${
//         answers.subject
//       }?`
//     ),
//     default: true
//   });

//   if (!answers2.confirm) {
//     console.log("That's fine, bye!");
//     shell.exit(1)
//   }

//   console.log("Alright, let's go!");
//   await mkdirSync(`/Users/${os.userInfo().username}/Documents/School/${name}`);
//   console.log("Subject created.");
//   await writeSubjectRC(name, answers.type);
//   console.log(chalk.blue("Hoot.json created. You're all set!"));
// }

program
  .command("assignment <title>")
  .alias("a")
  .description("Add a new assignment in your current year.")
  .action(makeAssignment);

program
  .command("subject <title>")
  .alias("s")
  .description("Add a new subject")
  .action(makeSubject);

program
  .command("setup")
  .description("Setup hoot")
  .action(makeSchool);

program.parse(process.argv);
if (process.argv.length < 3) {
  program.help();
}
