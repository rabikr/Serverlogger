Express middleware to log the http request data to a csv file and output to the console.

## Install
```console
$ npm install --save serverlogger
```

## Usage
By default, Serverlogger outputs the log file "serverlog.csv" in the root folder, enables log to console, enables write to file, and set console message color to green. 

```js
const serverLogger = require("serverlogger");

app.use(serverLogger());    // Express middleware
```

You can also override the default settings by passing an object.

```js
const serverLogger = require("serverlogger");

// Express middleware
app.use(serverLogger({
    fileName: "log.csv",    // By default, file output location is the root folder
    toConsole: false,       // By default, toConsole is set to true
    toFile: true,           // By default, toFile is set to true
    color: 4                // By default, color set to 0 (green)
})); 
```

Color codes are as follows:

- ![0](https://placehold.it/20/008000/000000?text=+)`0. Green`
- ![1](https://placehold.it/20/000000/000000?text=+)`1. Black`
- ![2](https://placehold.it/20/808080/000000?text=+)`2. Gray`
- ![3](https://placehold.it/20/ffffff/000000?text=+)`3. White`
- ![4](https://placehold.it/20/ff0000/000000?text=+)`4. Red`
- ![5](https://placehold.it/20/ffff00/000000?text=+)`5. Yellow`
- ![6](https://placehold.it/20/0000ff/000000?text=+)`6. Blue`
- ![7](https://placehold.it/20/ff00ff/000000?text=+)`7. Magenta`
- ![8](https://placehold.it/20/00ffff/000000?text=+)`8. Cyan`

## Example
Example of a simple Express server with default serverlogger settings
```js
const express = require("express");             // Get express framework
const serverLogger = require("serverlogger");   // Get serverlogger
const app = express();                          // Initialize a new express app

app.use(serverLogger());                        // Use serverlogger as express middleware

app.get("/", (req, res) => {                    // Express handle get request on '/' route
    res.send("Homepage");
});

const HOST = process.env.IP || "127.0.0.1";     // Only listen to IPv4
app.listen(3000, HOST);                         // Start the server
```
Example of the console when a user requested the "/" route
```console
$ node app.js
GET     127.0.0.1                       /
```
If a user is authenticated using passport.js module, the username will also be displayed
```console
$ node app.js
GET     127.0.0.1                       /
GET     127.0.0.1                       /auth/login
POST    127.0.0.1                       /auth/login
GET     127.0.0.1       rabik           /dashboard
```

### File structure example
By default, serverlogger keeps the log file in the root folder of your project.
```console
|--node_modules
        |--(other modules)
        |--serverlogger
|--package.json
|--index.js
|--serverlog.csv
```

If you wish to change the default file output path, change the fileName settings with the correct path.
```js
app.use(serverLogger({
    fileName: "/logs/log.csv"
})); 
```
```console
|--node_modules
        |--(other modules)
        |--serverlogger
|--logs
    |--log.csv
|--package.json
|--index.js
```

## License
MIT
  
