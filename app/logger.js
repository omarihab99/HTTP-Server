const chalk = require("chalk");

/*
 * This is a simple logger for debugging purposes.
 * You can use print statements as follows for debugging.
 */

const LOGGER = {
    header: (msg) => {
        console.log(chalk.bgBlue("Header: ",msg));
    },
    method: (msg) => {
        console.log(chalk.bgGreen("Method: ",msg));
    },
    version: (msg) => {
        console.log(chalk.bgYellow("Version: ",msg));
    },
    path: (msg) => {
        console.log(chalk.bgPurple("Path: ",msg));
    }

}
module.exports = LOGGER;