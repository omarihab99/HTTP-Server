const chulk = require("chulk");

/*
 * This is a simple logger for debugging purposes.
 * You can use print statements as follows for debugging.
 */
const LOGGER = {
    header: (msg) => {
        console.log(chulk.bgBlue("Header: ",msg));
    },
    method: (msg) => {
        console.log(chulk.bgGreen("Method: ",msg));
    },
    version: (msg) => {
        console.log(chulk.bgYellow("Version: ",msg));
    },
    path: (msg) => {
        console.log(chulk.bgPurple("Path: ",msg));
    }

}
module.exports = LOGGER;