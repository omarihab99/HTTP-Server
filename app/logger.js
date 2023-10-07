const LOGGER = {
    header: (msg) => {
        console.log("Headers: ",msg);
    },
    method: (msg) => {
        console.log("Method: ",msg);
    },
    version: (msg) => {
        console.log("Version: ",msg);
    },
    path: (msg) => {
        console.log("Path: ",msg);
    }

}
module.exports = LOGGER;