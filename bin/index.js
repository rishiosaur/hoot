#!/usr/bin/env node

const program = require("commander");
const { makeAssignment }  = require("./commands/assignments/makeAssignment")
const { makeSchool } = require("./commands/school/makeSchool")
const { makeSubject } = require("./commands/subjects/makeSubject")
const { finishAssignment } = require("./commands/assignments/finishAssignment")
const { viewItem } = require("./commands/utility/viewItem")
const { makeUnit } = require("./commands/units/makeUnit")

program
  .command("assignment <title>")
  .alias("a")
  .description("Create a new assignment.")
  .action(makeAssignment);

program
  .command("subject <title>")
  .alias("s")
  .description("Create a new subject")
  .action(makeSubject);

program
  .command("setup")
  .description("Setup hoot")
  .action(makeSchool);

program
  .command("finish <subject> <assignment>")
  .description("Finish an assignment")
  .alias("f")
  .action(finishAssignment)

program
  .command("unit <name>")
  .description("Create a new unit")
  .alias("u")
  .action(makeUnit)

program
  .command("view <assignments|subjects>")
  .alias("v")
  .description("Lists your unfinished assignments or your subjects.")
  .action(viewItem)

program.parse(process.argv);
if (process.argv.length < 3) {
  program.help();
}
