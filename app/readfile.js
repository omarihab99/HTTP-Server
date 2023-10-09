import { readFileSync, writeFileSync } from "fs";

/*
    File-related operations.
*/
function getFileContent (filePath){
    return readFileSync(filePath, "utf8");
}
function writeFileContent (filePath, content){
    writeFileSync(filePath, content);
}
export default {getFileContent, writeFileContent};
