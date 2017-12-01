"use strict";
const fs = require("fs");
const chalk = require("chalk");

// Desc:    ServerLogger is a function that prints the http request information
//           to the console and/or keep the logs in a file (Root folder by default).
// Output:  HTTP method, URL path, Remote IP address, Username if the user
//           is logged in and time on which the request was made and log 
//           file to store the data.
// Input:   User and pass in an object to specify the fileName, whether or not print
//           to the console, whether or not output to a file and an integer value
//           corresponds to the output console color.
//           color code: 1. Black, 2. Gray, 3. White, 4. Red, 5. Yellow
//           6. Blue, 7. Magenta, 8. Cyan, Default. Green 
module.exports = (conf) => {
    let fileName = (conf && conf.fileName) ? conf.fileName : "serverlog.csv";
    let toConsole = (conf && conf.toConsole) ? conf.toConsole : true;
    let toFile = (conf && conf.toFile) ? conf.toFile : true;
    let color = (conf && conf.color) ? conf.color : 0;

    return (req, res, next) => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;     // Jan=0, Feb=1, ... , Dec=11
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        let logTime = `${hour}:${minute}:${second},${month}/${date}/${year}`;
        let currUser = (req.user) ? req.user.username : "";  // Check if a is user logged in
        let filePath = __dirname + `/../../${fileName}`;
        let logMsg = `${req.method},${req.url},${req.headers['x-forwarded-for'] || req.connection.remoteAddress},${currUser},${logTime}`;
        let consoleLog = `${req.method}\t${req.headers['x-forwarded-for'] || req.connection.remoteAddress}\t${currUser}\t\t${req.url}`;

        // Print to console set to true by default
        if (toConsole) {
            switch (color) {
                case 1: console.log(chalk.black(consoleLog)); break;
                case 2: console.log(chalk.gray(consoleLog)); break;
                case 3: console.log(chalk.white(consoleLog)); break;
                case 4: console.log(chalk.red(consoleLog)); break;
                case 5: console.log(chalk.yellow(consoleLog)); break;
                case 6: console.log(chalk.blue(consoleLog)); break;
                case 7: console.log(chalk.magenta(consoleLog)); break;
                case 8: console.log(chalk.cyan(consoleLog)); break;
                default: console.log(chalk.green(consoleLog)); break;
            }
        }

        // Log to file set to true by default
        if (toFile) {
            if (fs.existsSync(filePath)) {
                fs.appendFile(filePath, logMsg + "\n", "utf8", (err) => {
                    if (err) throw err;
                });
            } else {
                let logHead = "Method,URL,IP,Username,Time,Date\r\n";
                fs.appendFile(filePath, logHead + logMsg + "\n", "utf8", (err) => {
                    if (err) throw err;
                });
            }
        }
        next();
    };
}