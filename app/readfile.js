const fs = require("fs");

function getFileContent (filePath){
    return fs.readFileSync(filePath, "utf8");
}
module.exports = getFileContent;
