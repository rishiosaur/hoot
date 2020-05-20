#!/usr/bin/env node

const program = require("commander");
const { makeAssignment }  = require("./commands/assignments/makeAssignment")
const { makeSchool } = require("./commands/school/makeSchool")
const { makeSubject } = require("./commands/subjects/makeSubject")
const { finishAssignment } = require("./commands/assignments/finishAssignment")
const { viewItem } = require("./commands/utility/viewItem")
const { makeUnit } = require("./commands/units/makeUnit")
const { newItem } = require("./commands/utility/newItem")

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
  .command("finish")
  .description("Finish an assignment")
  .alias("f")
  .action(finishAssignment)

program
  .command("unit <name>")
  .description("Create a new unit")
  .alias("u")
  .action(makeUnit)

program
  .command("view")
  .alias("v")
  .description("Lists your unfinished assignments or your subjects.")
  .action(viewItem)

program
  .command("new <item>")
  .alias("n")
  .description("Create a new assignment, subject, unit, note, or piece of homework.")
  .action(newItem)

program.parse(process.argv);
if (process.argv.length < 3) {
  program.help();
}
