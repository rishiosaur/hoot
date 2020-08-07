const { readFileSync } = require("fs");

const getConfig = async () => {
    const config = await readFileSync("~/.hoot.json");
}

module.exports = {
    getConfig,

}