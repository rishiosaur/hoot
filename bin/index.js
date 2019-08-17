#!/usr/bin/env node

const pckg = require("./../package.json");
const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const os = require("os");
const figlet = require("figlet");
const shell = require("shelljs");

const { readdirSync, mkdirSync, writeFile, existsSync } = require("fs");
const { copy } = require("fs-extra");
const { resolve } = require("path");
const { promisify } = require("util");
const { getDirectory } = require("./util/getDirectory")
const { verifyDirectory } = require("./util/verifyDirectory")
const ncp = require("ncp");
const copyTemplate = program;

async function verifySchool() {
  try {
    let a = await getDirectories(
      `/Users/${os.userInfo().username}/Documents/School`
    );
    return true;
  } catch (err) {
    return false;
  }
}

async function verifyAssignment(assigName, assigSubject) {
  let path = `/Users/${
    os.userInfo().username
  }/Documents/School/${assigSubject}/${assigName}`;
  if (existsSync(path)) {
    return true;
  }
}

async function getSubjects() {
  try {
    let subjects = await getDirectories(
      `/Users/${os.userInfo().username}/Documents/School`
    ).filter(subject => subject != "other");
    if (subjects.length > 0) {
      return subjects;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

async function writeSubjectRC(subjectName, subjectType) {
  let string =
    "{\n" +
    "'name':" +
    subjectName +
    ",\n" +
    "'type':" +
    subjectType +
    ",\n" +
    "}";
  writeFile(
    `/Users/${
      os.userInfo().username
    }/Documents/School/${subjectName}/hoot.json`,
    string,
    err => console.log(err)
  );
}

async function makeAssignment(name) {
  if (!shell.which("git")) {
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
  }
  let subjects = await getDirectory("");
  subjects = subjects.filter(subject => subject != "other")
  
  if (subjects.length < 1) {
    console.log(
      chalk.red("ERROR ") +
        chalk.blue("You do not have subjects. Try running ") +
        chalk.green("hoot subject <title>")
    );
    return;
  }
  console.log(
    chalk.green(`Alright, let's make your assignment called: ${name}`)
  );
  let answers = await inquirer.prompt([
    {
      type: "list",
      name: "subject",
      message: "Subject",
      choices: subjects
    },
    {
      type: "list",
      name: "type",
      message: "Assignment type",
      choices: ["Report", "Short-answer", "Presentation"]
    },
    {
      type: "confirm",
      name: "research",
      message: "Add research folder",
      default: true
    }
  ]);

  let aVer = await verifyDirectory(`${answers.subject}/${name}`, true);
  if (aVer) {
    console.log(
      chalk.red("ERROR ") + chalk.blue("Assignment already exists on file.")
    );
    return;
  }

  await mkdirSync(
    `/Users/${os.userInfo().username}/Documents/School/${
      answers.subject
    }/${name}`
  );
  console.log("Assignment folder created.");
  await mkdirSync(
    `/Users/${os.userInfo().username}/Documents/School/${
      answers.subject
    }/${name}/mark`
  );
  console.log("Rubric folder created.");
  if (answers.research) {
    await mkdirSync(
      `/Users/${os.userInfo().username}/Documents/School/${
        answers.subject
      }/${name}/research`
    );
    console.log("Research folder created.");
  }
  await copy(
    resolve(`./templates/${answers.type.toLowerCase()}`),
    `/Users/${os.userInfo().username}/Documents/School/${
      answers.subject
    }/${name}/`,
    function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Copied " + answers.type + " folder");
        shell.cd(
          `/Users/${os.userInfo().username}/Documents/School/${
            answers.subject
          }/${name}`
        );
        console.log("Changed directories to assignment");
        console.log("Initializing Git")
        if (shell.exec("git init").code !== 0) {
          shell.echo("Error: Git commit failed");
          shell.exit(1);
        }
        console.log("Installing NPM packages")
        
        if (shell.exec("npm install").code !== 0) {
          shell.echo("Error: NPM install failed");
          shell.exit(1);
        }
        
      }
    }
  ); //copies directory, even if it has subdirectories or files
}

async function setupSchool() {
  let verification = verifyDirectory('', true)
  if (verification) {
    console.log(
      chalk.red("ERROR: ") + chalk.blue("You already have a school folder.")
    );
    console.log(
      chalk.green("Note: ") +
        chalk.blue("hoot setup ") +
        chalk.yellow("is a one-time command.")
    );
    return;
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
      type: "confirm",
      message: "Make 'other' folder",
      name: "other",
      default: true
    }
  ]);
  console.log(answers.make ? "Great!" : "Ok, bye!");
  await mkdirSync(`/Users/${os.userInfo().username}/Documents/School`);
  if (answers.other) {
    await mkdirSync(`/Users/${os.userInfo().username}/Documents/School/other`);
  }
  console.log(
    `Your school folder has been created. I'll see you soon, ${
      os.userInfo().username
    }!`
  );
}

async function makeSubject(name) {
  let verification = await verifyDirectory("")
  if (!verification) {
    console.log(chalk.red("ERROR: ") + chalk.blue("School not found"));
    console.log(chalk.green("Try running ") + chalk.blue("hoot setup"));
    return;
  }

  let answers = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Type of subject",
      choices: ["Computer Science", "Math"]
    }
  ]);
  console.log(
    chalk.blue(
      `Just to confirm, you want to make a subject called ${name}, of type ${
        answers.type
      }?`
    )
  );
  let answers2 = await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    messsage: chalk.blue(
      `Just to confirm, you want to make a subject called ${name}, of type ${
        answers.subject
      }?`
    ),
    default: true
  });

  if (!answers2.confirm) {
    console.log("That's fine, bye!");
    return;
  }
  
  let subjectVerification = await verifyDirectory(name, true);
  if (subjectVerification) {
    console.log(
      chalk.red("ERROR ") + chalk.blue("Subject already exists on file.")
    );
    return;
  }

  console.log("Alright, let's go!");
  await mkdirSync(`/Users/${os.userInfo().username}/Documents/School/${name}`);
  console.log("Subject created.");
  await writeSubjectRC(name, answers.type);
  console.log(chalk.blue("Hoot.json created. You're all set!"));
}

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
  .action(setupSchool);

program.parse(process.argv);
if (process.argv.length < 3) {
  program.help();
}
