const fs = require("fs");
const path = require("path");

const getFileContent = (filePath) => {
    return fs.readFileSync(filePath, "utf8");
}
module.exports = {
    getFileContent
}