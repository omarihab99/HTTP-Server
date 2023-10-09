const fs = require("fs");

function getFileContent (filePath){
    if(!fs.existsSync(filePath)) {
        return null;
    }
    return fs.readFileSync(filePath, "utf8");
}
module.exports = getFileContent;
