import { bgBlue, bgGreen, bgYellow, bgPurple } from "chulk";

/*
 * This is a simple logger for debugging purposes.
 * You can use print statements as follows for debugging.
 */
const LOGGER = {
    header: (msg) => {
        console.log(bgBlue("Header: ",msg));
    },
    method: (msg) => {
        console.log(bgGreen("Method: ",msg));
    },
    version: (msg) => {
        console.log(bgYellow("Version: ",msg));
    },
    path: (msg) => {
        console.log(bgPurple("Path: ",msg));
    }

}
export default LOGGER;