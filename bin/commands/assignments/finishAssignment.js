const inquirer = require("inquirer")
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const { writeFile, unlinkSync } = require("fs")
const { move } = require("fs-extra")
const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")
const { askForDirectory } = require("../../util/askForDirectory")

async function finishAssignment(){
    let path = await askForDirectory(4, "finished assignment")
    console.log(path)
    let pathToAssignmentJSON = getDirectoryPath(`${path}/hoot.json`)
    await verifyDirectory(path)
    let assignmentHootJSON = require(pathToAssignmentJSON)
    
    let splitPath = path.split("/")
    let answers = await inquirer.prompt([
        {
            message: "What was your mark for this assignment?",
            type: "number",
            name: "mark"
        }
    ])
    assignmentHootJSON.mark = answers.mark
    unlinkSync(pathToAssignmentJSON)
    await writeFile(pathToAssignmentJSON, JSON.stringify(assignmentHootJSON), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(assignmentHootJSON));
        console.log('Writing to ' + pathToAssignmentJSON);
        console.log("I'll now move this assignment to the finished folder.")
    });
    await move(getDirectoryPath(path), getDirectoryPath(`${splitPath.slice(0,-1).join("/")}/Finished/${splitPath.pop()}`))
    console.log(`Finished.`)
}

module.exports = {
    finishAssignment: finishAssignment
}