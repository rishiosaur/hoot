const inquirer = require("inquirer")
const { getDirectory } = require("../../util/getDirectory")
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const shell = require("shelljs")
const { verifyDirectory } = require("../../util/verifyDirectory")
const { makeDirectory } = require("../../util/makeDirectory")

async function finishAssignment(subject,assignment){
    let path = `${subject}/${assignment}`
    await verifyDirectory(path)
    await makeDirectory(`${path}/mark`)
    let assignmentHootJSON = require(getDirectoryPath(`${path}/hoot.json`))
    console.log(assignmentHootJSON)
    // let answers = inquirer.prompt([
    //     {
    //         message: "What was your mark for this assignment?",
    //         type: "number",
            
    //     }
    // ])
}

module.exports = {
    finishAssignment: finishAssignment
}