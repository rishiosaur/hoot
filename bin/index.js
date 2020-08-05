#!/usr/bin/env node

const { Command } = require("commander");
const { makeAssignment }  = require("./commands/assignments/makeAssignment")
const { makeSchool } = require("./commands/school/makeSchool")
const { makeSubject } = require("./commands/subjects/makeSubject")
const { finishAssignment } = require("./commands/assignments/finishAssignment")
const { viewItem } = require("./commands/utility/viewItem")
const { makeUnit } = require("./commands/units/makeUnit")
const { newItem } = require("./commands/utility/newItem")

// Command is a little bit more extensible than just raw commander scripts.
const program = new Command("hoot")

// This hoists the version from npm
program.version(require("../package.json").version);

//
// CORE FUNCTIONALITY
//

// The initial setup command. This creates terms and other top-level folders.
program
  .command("setup")
  .description("Setup hoot")
  .action(makeSchool);

// Creation of a subject. This takes up the first level.
program
  .command("subject <title>")
  .alias("s")
  .description("Create a new subject")
  .action(makeSubject);

// Creation of a unit.
program
  .command("unit <name>")
  .description("Create a new unit")
  .alias("u")
  .action(makeUnit)

// Finally, creation of an assignment.
program
  .command("assignment <title>")
  .alias("a")
  .description("Create a new assignment.")
  .action(makeAssignment);

// This command updates the metadata for a given assignment, and moves it into the "Finished" directory.
program
  .command("finish")
  .description("Finish an assignment")
  .alias("f")
  .action(finishAssignment)

//
// SECONDARY COMMANDS
//

// View all folders and subdirectories.
program
  .command("view")
  .alias("v")
  .description("Lists your unfinished assignments or your subjects.")
  .action(viewItem)

program
  .command("new <item> <name>")
  .alias("n")
  .description("Create a new assignment, subject, unit, note, or piece of homework.")
  .action(newItem)

// Top-level async is only supported 
program.parse(process.argv);


if (process.argv.length < 3) {
  makeSchool();
}