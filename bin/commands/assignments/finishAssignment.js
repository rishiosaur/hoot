const inquirer = require("inquirer")
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const { writeFile, unlinkSync } = require("fs")
const { move } = require("fs-extra")
const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")

async function finishAssignment(subject,assignment){
    let path = `${subject}/${assignment}`
    let pathToAssignmentJSON = getDirectoryPath(`${path}/hoot.json`)
    await verifyDirectory(path)
    await makeDirectory(`${path}/mark`)
    let assignmentHootJSON = require(pathToAssignmentJSON)
    
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
    await move(getDirectoryPath(path), getDirectoryPath(`${subject}/Finished/${assignment}`))
    console.log(`Moved ${subject}/${assignment} to ${subject}/Finished/${assignment}`)
}

module.exports = {
    finishAssignment: finishAssignment
}