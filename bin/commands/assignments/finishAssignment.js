const inquirer = require("inquirer")
const { getDirectory } = require("../../util/getDirectory")
const { getDirectoryPath } = require("../../util/getDirectoryPath")
const shell = require("shelljs")
const { verifyDirectory } = require("../../util/verifyDirectory")

async function finishAssignment(path){
    await verifyDirectory(path)
    console.log('hi')
}

module.exports = {
    finishAssignment: finishAssignment
}