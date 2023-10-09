const fs = require("fs");

/*
    File-related operations.
*/
function getFileContent (filePath){
    return fs.readFileSync(filePath, "utf8");
}
function writeFileContent (filePath, content){
    fs.writeFileSync(filePath, content);
}
module.exports = {getFileContent, writeFileContent};
