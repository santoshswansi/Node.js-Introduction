// INTRODUCTION TO NODE JS
// -----------------------------------------
/*
   -> It is a JS runtime environment
   -> It runs on the V8 JS engine(core of Google Chrome) outside of a
      browser
   -> It can be used for front-end (client-side) as well as back-end
      (server-side) without  the need of other programming language



    NON-BLOCKING NATURE OF NODE JS
   ---------------------------------------
   -> It runs in a single process, without creating a new thread for every
       new request
   -> It provides a set of asynchronous I/O methods in its standard
      library that prevent JavaScript code from blocking
   -> Generally libraries in Node.js are written using non-blocking
       paradigms which makes 'blocking' nature a exception rather than
       norm
   -> When Node.js performs I/O operations ( like reading from the
        network, accessing from database of the file system ), instead
        of blocking the thread and wasting CPU cycles waiting, Node.js
        will resume the operations when the response comes back.
   -> This allows Node.js to handle thousands of concurrent connections
       with a single server without introducing the burden of managing
       thread concurrency, which could be a significant source of bugs.



   POPULAR FRAMEWORKS FOR NODE.JS
   -----------------------------------
   1.) AdonisJS
   2.) Express, etc.



     DIFFERENCES BETWEEN NODE.JS & BROWSER
   -------------------------------------------
   -> Browser can access DOM or other web platforms like API but it does
      not have nice APIs that is provided by Node.js through modules,
      like filesystem access functionality
   -> Node.JS cannot access DOM because it does not have 'window',
      'document' and all the other objects provided by the browser


   -> Node.js uses the CommonJS module while in the browser we are starting
      to see the ES(ECMAScript) Modules standard being implemented

      :: In Node.js, we use require() and "import" in the browser



       RUNTIME V/S BUILD V/S DEVELOPMENT ENVIRONMENTS
      ------------------------------------------------
         :: RUNTIME ENVIRONMENT
         ------------------------
         -> Everything we need to execute a program, but no tools to
            change it

         :: BUILD ENVIRONMENT
         ---------------------
         -> Given some code written by others, everything we need to
            compile it or otherwise prepare an executable that we put
            into runtime environment
         -> Build environments are pretty useless unless we can see
            tests what we have built, so they often include Runtime
            environment also
         -> In Build environment we cannot modify the code


         :: DEVELOPMENT ENVIRONMENT
         ----------------------------
         -> Everything we need to write, compile and test code. It include
            tools like code editors and other such tools
         -> Typically also include Build & Run



      V8 JAVASCRIPT ENGINE
     -------------------------
     -> V8 engine powers Google Chrome, which takes our JavaScript and
        executes it while browsing in Chrome
     -> V8 provide the runtime environment in which JavaScript executes
     -> The DOM, and the other Web Platform APIs are provided by the
        browser
     -> It is independent of the browser in which it is hosted
     -> It is written in C++

     -> Other browser have different JavaScript engines:-
         a.) "SpiderMonkey" for Firefox
         b.) "JavaScriptCore" for Safari
         c.) "Chakra" for Edge



     JAVASCRIPT AND COMPILATION
    ------------------------------
     -> JavaScript is generally considered an interpreted language,
        but modern JavaScript engines no longer just interpret
        JavaScript, they compile it
     -> JavaScript is internally compiled by V8 with just-in-time (JIT)
        compilation to speed up the execution



      RUNNING NODE.JS SCRIPTS IN COMMAND LINE
     -----------------------------------------
       node app.js



      EXIT FROM NODE.JS PROGRAM
     -----------------------------

       a.) CTRL + C
       b.) Programmatically :-
          --------------------
           i)  process.exit()
                     -> The process is immediately forced to terminate
                           (AVOID)
                     -> It means any callback that is pending, any request
                        still being sent, writing to 'stdout' OR 'stderr'
                        will be ungracefully terminated


                       process.exit( exitCode )
                     --------------------------------
                          statusCode = 0 (success)

                      READ ABOUT EXIT CODE: https://nodejs.org/api/process.html#process_exit_codes


                       We can also set exitCode
                     --------------------------------
                         -> SYNTAX
                         -----------
                             process.exitCode = 1;

                         -> When the program will later end, Node.js
                            will return that exit code
                         -> This will make a program exit gracefully


*/

// Starting server like HTTP server
// ----------------------------------------------------------------------


// PROBLEM : This program will run indefinitely
// -------------------------------------------------------------
//  process.exit() will may abort the current process


const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hi!');
});

// Listen on 3000 port
app.listen(3000, () => console.log('Server Ready'));



// SOLUTION:
// -----------------------------------------------------------------------
/*
   We can detect signal
          a.) 'SIGKILL' (Same as process.exit())
          b.) 'SIGTERM' (Graceful exit from the program)
*/
// ------------------------------------------------------------------------

app.get("/", (req, res) => {
   res.send("Hi!");
});

const server = app.listen(3000, () => console.log("Server Ready"));


// Detect 'SIGTERM' event and response to it
process.on('SIGTERM', () => {
   server.close(() => {
      console.log('Process terminated');
   });
});


// SENDING TERMINATING SIGNAL FROM PROGRAM
// -----------------------------------------------------------------------
/*
   -> We can send this signal from
                              a.) inside the program
                              b.) another function
                              c.) other Node.js program
                              d.) any other app running in our system that
                                  knows the pid(process ID) of the process
                                  we want to terminate
*/
process.kill(process.id, 'SIGTERM');


// READ ENVIRONMENT VARIABLES FROM NODE.JS
// ----------------------------------------------------------------------

/*
   'env' property of 'process' hosts all the environment variables that
   were set at the moment the process was started
*/
console.log(process.env);

/*
   Setting process.env.NODE_ENV  =  "production" before the script runs
   will tell Node.js that this is a production environment.
*/
console.log(process.env.NODE_ENV); // Development (by default)





// NODE REPL(Read Evaluate Print Loop)
// ----------------------------------------------------------------------
/*
   -> REPL is a programming language environment that takes single
      expression as user input and returns the result back in the
      console after execution

   -> Type 'node' followed by enter to enter into REPL mode
      -------------------------------------------------------------------
      | REPL WINDOW                                                     |
      -------------------------------------------------------------------
      |  > console.log('HEllo!');                                       |
      |    HEllo!                    // result                          |
      |    undefined                 // return value of  "console.log()"|
      |  >                                                              |
      -------------------------------------------------------------------

   -> Use TAB to auto-complete!



    KNOWING PROPERTIES AND METHODS OF JAVASCRIPT OBJECTS
   -----------------------------------------------------------
    SYNTAX:   javaScriptClassName. and then  press TAB twice
    EXAMPLE:  Number. followed by double TAB


     EXPLORING GLOBALS
    -----------------------
      global. followed by double TAB


    >> TYPE:  .help in Node.js REPL to get help

*/



// ACCEPT ARGUMENTS FROM COMMAND LINE
// ---------------------------------------------------------------------
/*
   SYNTAX FOR PASSING ARGUMENTS
   -------------------------------
     node app.js argsList
         OR
     node app.js --key=value

*/

// LOOPING THROUGH ARGUMENTS
// ---------------------------------
/*
     process.argv
    ---------------
    -> process.argv gives us an array of command line arguments
    -> First two positions are reserved for location paths of Node.js
        & app.js file which is being executed
*/

console.log(process.argv);
console.log(process.argv[0]);
console.log(process.argv[1]);

process.argv.forEach((val, index) => {

   /*
      Putting variable inside string using placeholder ${} and
      ``(back quote sign) instead of ''(quotes)
   */
   console.log(`${index}: ${val}`);
});


// Exact array of command line arguments(exclude first two)
var args = process.argv.slice(2);



// PARSING COMMAND LINE ARGUMENTS USING 'minimist' MODULE
// ----------------------------------------------------------------------
/*
  IN COMMAND LINE
 ------------------
   1.) node app.js --name=Santosh    => args = {_:[], name: Santosh}
   2.) node app.js -n Santosh -abc  10 20 30   => args = {_:[10, 20, 30],
                                                          n: 'Santosh',
                                                          a: true,
                                                          b: true,
                                                          c: true}
*/

// process.argv[0] = "name=Santosh" which we need to parse
const args2 = require('minimist')(process.argv.slice(2));
console.log(args2);



// OUTPUT TO THE COMMAND LINE USING NODE.JS
// ----------------------------------------------------------------------

// console.log()
console.log('Hello');
console.log('Hello', 'World');


// Formatted String
/*
    1.) %s     Format a variable as a String
    2.) %d     Format a variable as a Number
    3.) %i     Format a variable as its Integer part only
    4.) %o     Format a variable as an object

*/
console.log('Hello %s how old are You? %d?', 'Santosh', 19);


// Clear Console
console.clear();


// Counting Elements
/*
       OUTPUT
   ----------------
         orange-1
         orange-2
         apple-1
         orange-3
*/
var fruits = ['orange', 'orange', 'apple', 'orange'];
fruits.forEach((fruit) => {
   console.count(fruit);
});


// Printing Stack Trace
/*
   function2()
   function1()
*/
const function2 = () => console.trace();
const function1 = () => function2();
function1();



// Calculate time taken by a function

const doSomething = () => console.log('Hello');

function calculateTime() {
   time('doSomething()');

   // Do something
   doSomething();

   timeEnd('doSomething()');
}

calculateTime(); // doSomething(): xx.xx sec(s)


// STDERR
// ----------------------------------------------------------------------
/*
   console.error()
   It will not appear in the console, but it will appear in the error log
*/



// COLOR THE OUTPUT USING ESCAPE  SEQUENCES (WITHOUT ANY MODULE)
// ------------------------------------------------------------------------
/*
   -> We can color the output of our text in the console by using
      escape sequences
   -> An escape sequence is a set of characters that identifies a color

    EXAMPLE ( Print hi! in yellow )
   ------------
    console.log('\x1b[33m%s\x1b[0m', 'hi!')
*/



// COLOR THE OUTPUT USING 'chalk' MODULE
// -----------------------------------------------------------------------
const chalk = require('chalk');


console.log(chalk.yellow('hi!'));

console.log(`RAM ${chalk.red('90%')}
             CPU: ${chalk.yellow('80%')}
             DISK: ${chalk.blue('40%')}`);


// blue colored bold 'Hello World' text with background color = 'red'
console.log(chalk.blue.bgRed.bold("Hello world!"));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));



// ES2015
console.log(
   chalk `
      CPU: {red 90%}
      RAM: {green 80%}
      DISK: {rgb(255,131,0) 40%}
      `
);


// DEFINE OUR OWN THEME FOR CODE
// -------------------------------------------------------------------------

const error = chalk.bold.red;
const warning = chalk.keyword("orange");

console.log(error("Error!"));
console.log(warning("Warning!"));

console.log(chalk.green('Hello %s'), 'Santosh');




// CREATING PROGRESS BAR USING 'progress' MODULE
// -----------------------------------------------------------------------

/*
    DEFINING PROGRESS BAR
   -------------------------------------
   -> progressBar(Format using tokens, options)


    OPTIONS
   -----------------


   |  Option        |                 Description                                          |
   -----------------------------------------------------------------------------------------
   | curr           |    current completed index                                           |
   | total          |    total number of ticks to complete                                 |
   | width          |    the displayed width of the progress bar (default = total)         |
   | stream         |    the output stream defaulting to stderr                            |
   | head           |    head character defaulting to complete character                   |
   | complete       |    completion character default: "="                                 |
   | incomplete     |    incomplete character default: "-"                                 |
   | renderThrottle |    minimum time between updates in milliseconds defaulting to 16     |
   | clear          |    option to clear the bar on completion defaulting to false         |
   | callback       |    optional function to call when the progress bar complete          |



    TOKENS  (Used for formatting the progress bar)
   -----------------------------------------------------------------------


   |  token     |     Description                           |
   -----------------------------------------------------------
   | :bar       |    the progress bar itself                |
   | :current   |    current tick number                    |
   | :total     |    total ticks                            |
   | :elapsed   |    time elapsed in seconds                |
   | :percent   |    completion percentage                  |
   | :eta       |    estimated completion time in seconds   |
   | :rate      |    rate of ticks per second               |
*/

const progressBar = require("progress");


// EXAMPLE:

// Defining Progress Bar
const bar = new progressBar(":bar", {
   total: 10
});

// Timer to tick the stick
const timer = setInterval(() => {
   bar.tick();
   if (bar.complete) {
      clearInterval(timer);
   }
}, 100);



/*
   CUSTOM TOKENS
   -------------------
    -> We can add custom tokens by adding {'name': value} object
       parameter to our method (tick(), update(), etc.) calls
*/

var bar2 = new progressBar(':current: :fname :lName', {
   total: 3
});

bar2.tick({
   'fName': 'Santosh',
   'lName': 'Swansi\n'
});


bar2.tick(2, {
   'fName': "Subhash",
   'lName': "Swansi\n",
});

// OUTPUT
/*
   1: Santosh Swansi!
   3: Subhash Swansi!
*/



// EXAMPLES
// -----------------------------------------------------------------------


// 1. DOWNLOAD
// -----------------------------------------------------------------------
/*
  Each tick has a variable influence, so we pass the chunk length which
  adjusts the progress bar appropriately relative to the total length
*/

var ProgressBar = require("progress");
var https = require("https");

// Defining HTTP request
var req = https.request({
   host: "download.github.com",
   port: 443,
   path: "/visionmedia-node-jscoverage-0d4608a.zip",
});


// When there is a response
req.on("response", function (res) {

   //
   /*
       >> res.headers['content-length']
       ---------------------------------------------------------------------
         -> It refers to the size of the body of the response message

       >> parseInt('string', radix)
       --------------------------------------------------------------------
         -> radix : 2 to 36 (Represents numeral system to be used)
   */
   var len = parseInt(res.headers["content-length"], 10);


   // Defining Progress Bar
   var bar = new ProgressBar("  downloading [:bar] :rate/bps :percent :etas", {
      complete: "=",
      incomplete: " ",
      width: 20,
      total: len,
   });


   // When there is data as a response tick the bar
   res.on("data", function (chunk) {
      bar.tick(chunk.length);
   });

   res.on("end", function () {
      console.log("\n");
   });
});

req.end();


// OUTPUT
// ---------
// downloading [=====             ] 39/bps 29% 3.7s



// 2.) INTERRUPT
// --------------------------------------------------------------
// To display during progress bar execution, use interrupt()

var ProgressBar = require("progress");

var bar2 = new ProgressBar(":bar :current/:total", {
   total: 10
});
var timer2 = setInterval(function () {
   bar2.tick();
   if (bar2.complete) {
      clearInterval(timer2);
   } else if (bar2.curr === 5) {
      bar2.interrupt(
         "this message appears above the progress bar\ncurrent progress is " +
         bar2.curr +
         "/" +
         bar2.total
      );
   }
}, 1000);





// ACCEPT INPUT FROM COMMAND LINES IN NODE.JS
// -----------------------------------------------------------------------

// Create Interface
const readline = require("readline").createInterface({
   input: process.stdin,
   output: process.stdout,
});


/*
  -> question() method shows the first parameter (a question) and waits
     for the user input. It calls the callback function once enter is
     pressed
*/
readline.question(`What's your name?`, (name) => {
   console.log(`Hi ${name}!`);

   // closing the readline interface
   readline.close();
});


// While entering password we don't want to show exact password but *


// inquirer.js  (Replicating above code)
// --------------------------------------------
/*
   -> Inquirer.js lets you do many things like asking multiple choices,
      having radio buttons, confirmations, and more.
*/
const inquirer = require("inquirer");

var questions = [{
   type: "input",
   name: "name",
   message: "What's your name?",
}, ];

inquirer.prompt(questions).then((answers) => {
   console.log(`Hi ${answers.name}!`);
});




// EXPOSING FUNCTIONALITIES FROM ONE NODE.JS FILE USING EXPORTS
// -----------------------------------------------------------------------



// Importing functionalities exposed from library.js file
const library = require('./library');


// Exposing functionalities
/*
   -> Any object or variable defined in the file by default is private &
      not exposed to the outer world
   -> To export use module.exports:-

      1.) module.exports = object or function
      2.) exports.objectName = objectName
          exports.functionName = functionName
          exports.variableName = variableName

   Q. What's the difference between module.exports and exports?
   -------------------------------------------------------------------
    -> 'module.exports' exposes the object it points to
    -> 'exports' exposes the properties of the object it points to

*/

// module.exports
// -----------------------------------------------------------------------

//.. car.js file
const car = {
   brand: "Ford",
   model: "Fiesta",
};

module.exports = car;

//..in the other file
const car2 = require("./car");
console.log(car2.brand);




// exports
//-------------------------------------------------------------------------
//.. items.js file
const car3 = {
   brand: "Ford",
   model: "Fiesta",
};

exports.car = car3;


//..in other file
const items = require("./items");
console.log(items.car);




// INTRODUCTION TO NODE NPM PACKAGE MANAGER
// ------------------------------------------------------------------------

/*
   Installing all dependencies
   ------------------------------
   -> If a project has package.json file, by running:
                 "npm install"

      we can install everything the project needs in 'node_modules'
      folder, creating it if it does not exist


   Installing single package
   --------------------------------
   -> SYNTAX:    npm install <package-name>
   -> FLAGS:
      -------
            i)  --save         Installs & add the entry to 'package.json'
                               'dependencies'
            ii) --save-dev     Installs & add the entry to 'package.json'
                               'devDependencies'

            NOTE: Difference between dependencies & dev-dependencies
           -----------------------------------------------------------
           -> 'devDependencies' are usually development tools like
              testing library
           -> 'dependencies' are bundled with the app in production


   UPDATING PACKAGES
   ------------------
    -> npm will check all packages for a newer version that satisfies
       your versioning constraints
    SYNTAX: npm update


   UPDATE SPECIFIC PACKAGE
   -----------------------------------
    SYNTAX: npm update <package-name>




   NPM VERSIONING
   -----------------------
   -> In addition to plain downloads, npm also manages versioning, so we
      can specify version of a package
   -> Specifying an explicit version of a library also helps to keep
      everyone on the same exact version of a package, so that the
      whole team runs the same version until the package.json file is
      updated


   WHERE DOES NPM INSTALL THE PACKAGES?
   ----------------------------------------
    -> There are two types of Installation:-
         a) Local Install (By default)
         b) Global Install

      a) Local Install
      ----------------------
      -> SYNTAX: npm install <package-name>
      -> It will install the package in the current file tree in
         'node_modules' sub-folder
      -> It will also add its entry to 'dependencies' property of
         'package.json'


      b.) Global Install
      -----------------------
      -> SYNTAX: npm install -g <package-name>
      -> It will install the package in global location
      -> WHERE?
             "npm root -g"   [To know the global location ]
      -> It usually have path:
           C:\Users\YOU\AppData\Roaming\npm\node_modules

      - > If we use 'nvm' to manage Node.js versions, the location
         would differ


   HOW TO USE PACKAGE INSTALLED USING NPM
   ----------------------------------------
    const varName = require('packageName');

   HOW DO WE EXECUTE EXECUTABLES?
   ---------------------------------
     1.) Go to  '.bin'  sub-folder in  'node_modules'  folder
         and then type the  'executableName'
     2.) npx  'executableName'  (It will search the executable
                                 and execute it)

*/


// package.json FILE
// -----------------------------------------------------------------------
/*
      -> It is a kind of manifest of our project
      -> It is a central repository for configurations of tools
         For Example: It is where 'npm' OR 'yarn' store the names &
                      versions of all the installed packages

*/
// EXAMPLE OF package.json FILE
// -----------------------------------------------------------------------
/*
{
   "name": "test-project",
   "version": "1.0.0",
   "description": "A Vue.js project",
   "main": "src/main.js",
   "private": true,
   "scripts": {
      "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "unit": "jest --config test/unit/jest.conf.js --coverage",
      "test": "npm run unit",
      "lint": "eslint --ext .js,.vue src test/unit",
      "build": "node build/build.js"
   },
   "dependencies": {
      "vue": "^2.5.2"
   },
   "devDependencies": {
      "autoprefixer": "^7.1.2",
      "babel-core": "^6.22.1",
      "babel-eslint": "^8.2.1",
      "babel-helper-vue-jsx-merge-props": "^2.0.3",
      "babel-jest": "^21.0.2",
      "babel-loader": "^7.1.1",
      "babel-plugin-dynamic-import-node": "^1.2.0",
      "babel-plugin-syntax-jsx": "^6.18.0",
      "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
      "babel-plugin-transform-runtime": "^6.22.0",
      "babel-plugin-transform-vue-jsx": "^3.5.0",
      "babel-preset-env": "^1.3.2",
      "babel-preset-stage-2": "^6.22.0",
      "chalk": "^2.0.1",
      "copy-webpack-plugin": "^4.0.1",
      "css-loader": "^0.28.0",
      "eslint": "^4.15.0",
      "eslint-config-airbnb-base": "^11.3.0",
      "eslint-friendly-formatter": "^3.0.0",
      "eslint-import-resolver-webpack": "^0.8.3",
      "eslint-loader": "^1.7.1",
      "eslint-plugin-import": "^2.7.0",
      "eslint-plugin-vue": "^4.0.0",
      "extract-text-webpack-plugin": "^3.0.0",
      "file-loader": "^1.1.4",
      "friendly-errors-webpack-plugin": "^1.6.1",
      "html-webpack-plugin": "^2.30.1",
      "jest": "^22.0.4",
      "jest-serializer-vue": "^0.3.0",
      "node-notifier": "^5.1.2",
      "optimize-css-assets-webpack-plugin": "^3.2.0",
      "ora": "^1.2.0",
      "portfinder": "^1.0.13",
      "postcss-import": "^11.0.0",
      "postcss-loader": "^2.0.8",
      "postcss-url": "^7.2.1",
      "rimraf": "^2.6.0",
      "semver": "^5.3.0",
      "shelljs": "^0.7.6",
      "uglifyjs-webpack-plugin": "^1.1.1",
      "url-loader": "^0.5.8",
      "vue-jest": "^1.0.2",
      "vue-loader": "^13.3.0",
      "vue-style-loader": "^3.0.1",
      "vue-template-compiler": "^2.5.2",
      "webpack": "^3.6.0",
      "webpack-bundle-analyzer": "^2.9.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0"
   },
   "engines": {
      "node": ">= 6.0.0",
      "npm": ">= 3.0.0"
   },
   "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}

   PROPERTIES BREAKDOWN
   --------------------------
   1.) name
      --------
        -> Sets the package name
        -> When a package is published in 'npm'  it gets its own URL
           based on this name

         >> Naming Convention
         ------------------------
             -> length < 214
             -> It can contain a-z, _, -


   2.) author
      ----------------
      -> Lists the package author name

        >> Example
        -------------
        a.)
            {
               "author": "Joe <joe@whatever.com> (https://whatever.com)"
            }

        b.)
            {
               "author": {
                  "name": "Joe",
                  "email": "joe@whatever.com",
                  "url": "https://whatever.com"
               }
            }

   3.) contributors
      -------------------
      -> Project can have one or more contributions
      -> It is an array that list contributors


      FORMATTED EXMPLES
      ---------------------------
      a.)
            {
               "contributors": ["Joe <joe@whatever.com> (https://whatever.com)"]
            }

      b.)
            {
               "contributors": [{
                  "name": "Joe",
                  "email": "joe@whatever.com",
                  "url": "https://whatever.com"
               }]
            }

   4.) bugs
      ------------
      -> It links to the package issue tracker, most likely a GitHub
         issues page

      Example
      ----------
         {
            "bugs": "https://github.com/whatever/package/issues"
         }


   5.) homepage
      ------------
      -> Sets the package homepage

      >> Example
      ------------
         {
            "homepage": "https://whatever.com/package"
         }


   6.) version
      -------------
      -> It indicates the current version of the package
      -> It follows semantic versioning(semver) notations for versions,
         => version are always expressed in this form x.y.z

      -> Refer to 'Semantic Versioning Using NPM' for details

      >> Example
      ------------
      "version": "1.0.0"


   7.) license
      --------------
      -> It indicates the license of the package.

       >> Example
      ----------------
      "license": "MIT"


   8.) keywords
     ---------------
     -> It contains an array of keywords that associate with what your
        package does
     -> It helps people in finding them while user browse similar
        packages

      >> Example
      ------------------
      "keywords": [
         "email",
         "machine learning",
         "ai"
      ]


   9.) description
     ------------------
     -> It contains a brief description of the package

     >> Example
     -------------
      "description": "A package to work with strings"


   10.) repository
      --------------
      -> It specifies where this package repository is located.

      >> Example
      --------------
       "repository": "github:whatever/testing",

        -> We can explicitly set the version control system
        ------------------------------------------------------
          "repository": {
             "type": "git",
             "url": "https://github.com/whatever/testing.git"
          }


   11.) main
      --------------
      -> Sets the entry point for the package
      -> When you import this package in an application, that's where
         the application will search for the module exports

      >> Example
      -------------
       "main": "src/main.js"


   12.) private
      --------------
      -> If set to true prevents the app/package to be accidentally
         published on npm

      >> Example
      ----------------------
       "private": true



   13.) scripts
      ---------------
      -> Defines a set of node scripts you can run
      -> These scripts are command line applications
      -> We can run them by calling:
             npm run XXXX  OR  yarn XXXX     [ XXXX = command name ]

      -> Example: npm run dev


      >> Example
      -------------------
         "scripts": {
            "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
            "start": "npm run dev",
            "unit": "jest --config test/unit/jest.conf.js --coverage",
            "test": "npm run unit",
            "lint": "eslint --ext .js,.vue src test/unit",
            "build": "node build/build.js"
         }


   14.) dependencies
      --------------------
      -> It sets a list of npm packages installed as dependencies

      >> Example
      ---------------
         "dependencies": {
            "vue": "^2.5.2"
         }


   15.) devDependencies
      ---------------------
      -> Sets a list of npm packages installed as development
         dependencies
      -> They are not meant for production


      >> Example
      ---------------

         "devDependencies": {
            "autoprefixer": "^7.1.2",
            "babel-core": "^6.22.1"
         }


   16.) engines
      -------------
      -> It sets which versions of Node.js and other commands this
         package/app work on

      >> Example
      ----------------------

         "engines": {
            "node": ">= 6.0.0",
            "npm": ">= 3.0.0",
            "yarn": "^0.13.0"
         }


   17.) browserslist
     ----------------------
     -> It is used to tell which browsers(and their versions) package
        want to support


     >> Example
     -----------------
      -> This configuration means we want to support the last 2 major
         versions of all browsers with at least 1 % of usage(from the
         CanIUse.com stats), except IE8 and lower.

      "browserslist": [
           "> 1%",
           "last 2 versions",
           "not ie <= 8"
        ]


   COMMAND - SPECIFIC PROPERTIES
   ----------------------------------------------------------------------
   -> The package.json file can also host command-specific configuration,
      for example Babel, ESLint, and more.



   PACKAGE VERSIONS
   ----------------------------------------------------------------------
   -> We have seen in the description above version numbers
      like these: ~3.0 .0 or ^ 0.13 .0.
   -> Refer to 'Semantic versioning using NPM'

*/



// package-lock.json
// ---------------------------------------------------------------------
/*
   ->  The goal of the file is to keep track of the exact version of
       every package that is installed so that a product is 100%
       reproducible in the same way even if packages are updated by
       their maintainers
*/



// FIND THE INSTALLED VERSION OF AN NPM PACKAGE
// ----------------------------------------------------------------------
/*
   1.) npm list
      -------------
       -> latest version of all the NPM packages, including
          their dependencies

   2.) npm list -g
      ---------------
       ->  latest version of all globally installed packages


   3.) npm list --depth=0
      -----------------------
      ->  Top level packages ( Packages we installed using NPM & we
          listed in package.json )

   4.) npm list <package-name>
      ---------------------------
      -> version of specific package

   5.) npm view <package-name> version
     ------------------------------------
     -> Latest available version of specific package

*/



// INSTALL AN OLDER VERSION OF AN NPM PACKAGE
// ----------------------------------------------------------------------
/*
    SYNTAX: npm install <package-name>@<version>
                      or
            npm install -g <package-name>@<version>   [For global package]


   VIEW ALL AVAILABLE VERSIONS OF A PACKAGE
   ---------------------------------------------
    npm view <package> versions

*/




// UPDATE ALL NODE.JS DEPENDENCIES TO THEIR LATEST VERSION
// ----------------------------------------------------------------------
/*
   -> When we install package using 'npm install <package-name>', latest
      version of the package is downloaded & is put into 'node_modules'
      folder and corresponding entry is added to 'package.json' &
      'package-lock.json' files that are present in our current folder


    EXAMPLE
    --------
    -> When we install a package(let's say cowsay), this entry is added
       to 'package.json'

         {
            "dependencies": {
              "cowsay": "^1.3.1"
            }
         }

       >> Extract of 'package-lock.json'
       ---------------------------------------
       {
         "requires": true,
         "lockfileVersion": 1,
         "dependencies": {
           "cowsay": {
             "version": "1.3.1",
             "resolved": "https://registry.npmjs.org/cowsay/-/cowsay-1.3.1.tgz",
             "integrity": "sha512-3PVFe6FePVtPj1HTeLin9v8WyLl+VmM1l1H/5P+BTTDkMAjufp+0F9eLjzRnOHzVAYeIYFF5po5NjRrgefnRMQ==",
             "requires": {
               "get-stdin": "^5.0.1",
               "optimist": "~0.6.1",
               "string-width": "~2.1.1",
               "strip-eof": "^1.0.0"
             }
           }
         }
       }

     -> From the two files we can say:
            a.) Installed version : "1.3.1"
            b.) Rule of update: "^1.3.1"
                  Which means patch and minor version updates are
                  updatable

        -> If there is a patch OR minor update then running:
                     [ npm update ]
           would update to the latest version & 'package-lock.json'
           will also gets filled with latest version but,
           'package.json' remains un-updated



   npm outdated
   -------------
   -> It will list all the packages in one repository that was not
      updated for quite a while


   How to update major version update of packages?
   ----------------------------------------------------------
   -> We cannot update major version update using 'npm update'
   -> Steps to follow:
         a.) Install 'npm-check-updates' globally
            -------------------------------------------
             npm install -g npm-check-updates

         b.) Then run
          -----------------
          -> This will upgrade all the version hints in the package.json
             file, to dependencies and devDependencies, so npm can
             install the new major version

            [ ncu -u ]

         c.) Then update
           ---------------
            [npm update]


    NOTE: If we have downloaded a project without  'node_modules'
          dependencies & we want to install new versions, then run:
            [npm install]



*/



// SEMANTIC VERSIONING USING NPM
/*
  -> ALl Node.js packages agree to Semantic Versioning

     >> Decoding x.y.z
     ---------------------
         -> x represents major version
         -> y represents minor version
         -> z represents patch version

         >> Meaning of x.y.z
         ------------------------
         -> A release that only fixes bugs is called patch release (z)
         -> A release that introduces backward-compatible changes (y)
         -> A release that have a breaking changes (z)

   ------------------------------------------------------------------------
   | ~ | If we write ~0.13.0, we want to only update patch releases:
         0.13.1 is ok, but 0.14.0 is not
   | ^ | If we write ^0.13.0, we want to update patch and minor
         releases: 0.13.1, 0.14.0 and so on.
   | * | If we write *, that means we accept all updates, including
         major version upgrades.
   | > | We accept any version higher than the one we specify
   | >=| We accept any version equal to or higher than the one we
         specify
   | <=| We accept any version equal or lower to the one we specify
   | < | We accept any version lower to the one we specify
   | = | we accept that exact version
   | - | we accept a range of versions. Example: 2.1.0 - 2.6.2
   || we combine sets. Example: < 2.1 || > 2.6
   ------------------------------------------------------------------------



   NEW RULES
   ---------------------
   -> no symbol   We accept only that specific version we specify
   -> latest      We want to use the latest version available

   Combination
   --------------
   -> To either use (1.0.0)  OR  (1.1.0) up, but lower than (1.2.0)
      [ 1.0.0 || >= 1.1.0 < 1.2.0 ]
*/



// UNINSTALLING PACKAGES
// ---------------------------------------------------------------------
/*
    1.) npm uninstall <package-name>
      -----------------------------------
      -> To remove specified package from local node_modules folder

    2.) npm uninstall --save(OR -S) <package-name>
      -----------------------------------------------
      -> To remove specified package from local node_modules folder
         as well as 'package.json' file


    3.)  npm uninstall --save-dev(OR -D) <package-name>
      -----------------------------------------------
      -> To remove specified package from local node_modules folder
         as well as 'package-lock.json' file

    4.) npm uninstall -g <package-name>
      -----------------------------------------------
      -> To remove specified package from global path of node_modules
      -> We can run this command anywhere because 'npm' knows the
         global path of 'node_modules' folder
*/



// NPM GLOBAL OR LOCAL PACKAGES
// ----------------------------------------------------------------------
/*
   -> LOCAL PACKAGES: They are installed in the directory where we run
                         [ npm install <package-name> ]
                      and they are put in the node_modules folder under
                      this directory

   -> GLOBAL PACKAGES: They are all put in a single place in your system
                       (exactly where depends on your setup), regardless
                        of where we run
                            npm install -g <package-name>


    WHERE TO INSTALL PACKAGES WHEN?
    --------------------------------
    -> In general, all packages should be installed locally
    -> It is because updating global packages may break our code

    WHEN TO INSTALL GLOBALLY?
    ----------------------------------
    -> When it provides an executable command that we run from the
       shell (CLI), and it's reused across projects
    -> One can also install executable commands locally and run them
       using npx, but some packages are just better installed globally

    -> EXAMPLES OF POPULAR GLOBAL PACKAGES
      ------------------------------------------------------------------
        npm           create-react-app        vue-cli       grunt-cli
        mocha         react-native-cli        gatsby-cli    forever
        nodemon

    -> TO SEE GLOBAL PACKAGES
       ------------------------------
        [npm list -g --depth 0]

*/


// NPM dependencies & devDependencies
// ----------------------------------------------------------------------
/*
    -> When we install package using "npm install <package-name>", we are
       installing it as a dependency
    -> The package is automatically listed on 'package.json' under the
       dependencies list
       ( npm >= 5, before we have to add manually using -S or --save flag )
    -> When we add the -D or --save-dev, we are installing it as a
       development dependency, which adds it to the devDependencies
       list  (Un-needed in production like testing packages, webpack)

    -> When we go in production, if we type
          [ npm install ]
       and the folder contains a 'package.json' file, they are
       installed, as npm assumes this is a development deploy

    -> We need to set the '--production' flag (npm install --production)
       to avoid installing those development dependencies

*/




// NPX - NODE.JS PACKAGE MANAGER
// ----------------------------------------------------------------------
/*
  -> It is available from NPM >= 5.2
  -> NPX lets you run code built with Node.js and published through
     the NPM registry

   EASILY RUN LOCAL COMMANDS
   ------------------------------
   -> Node.js developers used to publish most of the executable commands
      as global packages, in order for them to be in the path and
      executable immediately
   -> This does not allow us to install different versions of the same
      command

   -> Running [ npx command-name ] automatically finds the correct
      reference of the command inside the node_modules folder of
      a project


   INSTALLATION-LESS COMMAND EXECUTION
   --------------------------------------
   -> It allows to run commands without first installing them
   -> Benefits:
      -----------
      a.) We do not need to install anything
      b.) We can run different versions of the same command, using
          the syntax @version

    DEMONSTRATION OF NPX
    -------------------------
    -> Suppose we have installed 'cowsay' package locally, we need to
       first go to the root folder in order to run commands of 'cowsay'
       (which simply print cow saying "what we wrote in the command")

       [ npm cowsay 'Hello']

          _______
         < Hello >
          -------
                 \   ^__^
                  \  (oo)\_______
                     (__)\       )\/\
                         ||----w |
                         ||     ||

      -> Instead we can:
         [npx cowsay 'Hello']  from any path to get the same result

      OTHER SCENARIOS OF USING NPX
      ------------------------------
      -> Running the 'vue' CLI tool to create new applications and
         run them:
                [ npx vue create my-vue-app ]

      -> Creating a new React app using create-react-app:
                [ npx create-react-app my-react-app ]



    RUN SOME CODE USING A DIFFERENT NODE.JS VERSION
    --------------------------------------------------
    -> Use the @ to specify the version, and combine that with the node

         npx node@10 -v #v10.18.1
         npx node@12 -v #v12.14.1


      NOTE: This helps to avoid tools like 'nvm' or the other Node.js
            version management tools


    RUN ARBITRARY CODE SNIPPETS DIRECTLY FROM URL
    -----------------------------------------------------
    -> We can run code that sits in a GitHub gist
    -> For Example:
       --------------
         npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32


     NOTE: We need to be careful when running code that we do not control

*/




// NODE.JS EVENT LOOP
// ----------------------------------------------------------------------
/*
    INTRODUCTION
   -----------------
    -> Event loop explains how Node.js can be asynchronous(not concurrent)
       & have non-blocking I/O
    -> Node.js JavaScript code runs on a single thread (There is one
       thing happening at a time)

       [
           We just need to pay attention to how we write our code & avoid
        doing anything that can block our thread, like synchronous
        network calls or infinite loops
                                                                        ]
    -> In general, in most browsers there is an event loop for every
       browser tab, to make every process isolated and avoid a web page
       with infinite loops or heavy processing to block your entire
       browser
    -> The environment manages multiple concurrent event loops, to
       handle API calls for example


    BLOCKING THE EVENT LOOP
    -------------------------------
    -> Any JavaScript code that take too long to return back control to
       the event loop will block the execution of other JavaScript code,
       UI thread, mouse clicks or even scrolling

    -> Almost all the I/O primitives(functions) in JavaScript are non
       blocking
       For Examples: Network requests, filesystem operations, etc
    -> Being blocking is the exception, and this is why JavaScript is
       based so much on callbacks, and more recently on promises and
       async/await


     THE CALL STACK
     ------------------
     -> The call stack is a LIFO queue(Last In, First Out)
     -> The event loop continuously checks the call stack to see
        if there 's any function that needs to run
     -> While doing so, it adds any function call it finds to the
        call stack and executes each one in order


     A SIMPLE EVENT LOOP EXECUTION
     ---------------------------------
        [
            const bar = () => console.log('bar')
            const baz = () => console.log('baz')

            const foo = () => {
               console.log('foo')
               bar()
               baz()
            }

            foo()
                                                   ]



          CALL STACK OF THE ABOVE CODE
         -----------------------------------------------------------------
         1.) foo()              2.)  console.log('foo')        3.)  foo()
                                     foo()

         4.) bar()              5.)  console.log('bar')        6.) bar()
             foo()                   bar()                         foo()
                                     foo()

         7.) foo()               8.) baz()                     9.) console.log('baz')
                                     foo()                         baz()
                                                                  foo()

         10.) baz()              11.) foo()                    10.) Empty
              foo()


     NOTE: Event loop on every iteration looks if there is something
           on the call stack, and executes it until the call stack is
           empty. It even looks at the 'Message Queue' OR 'Callback
           Queue' for remaining task(s) and push them into call stack
           for execution


    *** OTHER EXAMPLE
    --------------------
    [
         const bar = () => console.log('bar')

         const baz = () => console.log('baz')

         const foo = () => {
            console.log('foo')
            setTimeout(bar, 0)
            baz()
         }

         foo()
                                                                  ]


     OUTPUT
    --------------
      foo
      baz
      bar


         CALL STACK OF THE ABOVE CODE
         -----------------------------------------------------------------
         1.) foo()                2.)  console.log('foo')     3.)  foo()
                                       foo()

         4.) setTimeout()         5.) foo()                   6.) baz()
             foo()                                                foo()


         7.) console.log('baz')   8.) baz()                   9.) foo()
             baz()                    foo()
             foo()

         10.) bar()               11.) console.log('bar')     12.) bar()  -> Empty
                                       bar()


        Q. WHY IS THIS HAPPENING?
        ------------------------------------------------

          MESSAGE QUEUE (CALLBACK QUEUE)
          -----------------------------------
          -> Once the callback function is called after time-out is
             finished, it will be queued in 'Message Queue'
          -> 'Message Queue' is where user-initiated events like click
             or keyboard events, or fetch responses or DOM events like
             'onLoad' are queued before our code has the opportunity to
             react to them

         ** The 'Event Loop' gives priority to the 'Call Stack', and it
            first processes everything it finds in the call stack and
            then pick up things in the 'Message Queue'  OR
             'Callback Queue' **


         -> We don't have to wait for functions like 'setTimeout',
            fetch or other things to do their own work, because they
            are provided by the browser (called web APIs), and they
            live on their own threads
         -> For example, if you set the setTimeout to 2 seconds,
            you don't have to wait 2 seconds - the wait happens
            elsewhere

*/


// UNDERSTANDING process.nextTick()
// ----------------------------------------------------------------------
/*
   -> Every time the event loop takes a full trip(finishes the call
      stack), we call it a 'tick'
   -> When we pass a function to 'process.nextTick()', we instruct the
      JavaScript engine the invoke this function at the end of the
      current operation, before the next event loop tick starts


   **
      It's a way we can tell the JS engine to process a function
      asynchronously (after the current function), but as soon as
      possible, not queue it int the 'Callback Queue'
                                                                  **


   NOTE: Calling setTimeout(() => {}, 0) will execute the function at
         the end of next tick, much later than when using nextTick()
         which prioritizes the call and executes it just before the
         beginning of the next tick

*/



// UNDERSTANDING process.setImmediate()
// ----------------------------------------------------------------------
/*
   setImmediate(() => {
      //run something
   })

   -> Any function passed as the setImmediate() argument is a
      callback that's executed in the next iteration of the event loop

   Q.How is setImmediate() different from setTimeout(() => {}, 0)
      and from process.nextTick() ?
   ------------------------------------------------------------------
   -> A function passed to process.nextTick() is going to be executed
      on the current iteration of the event loop, after the current
      operation ends.
      [
         This means it will always execute before 'setTimeout' and
         'setImmediate'
                                                                     ]

    -> A setTimeout() callback with a 0 ms delay is very similar to
       setImmediate().The execution order will depend on various
       factors, but they will be both run in the next iteration of the
       event loop



    **
       Basically nextTick() will put the callback function at the front
       of the 'Callback Queue' & setImmediate() will queue the callback
       function at the end of 'Callback Queue'
                     (Similar to setTimeout(() => {},0))
                                                                     **
*/



// JAVASCRIPT TIMERS
// -----------------------------------------------------------------------

// 1.) setTimeout()
// ----------------------------------------------------------------------
function sayHello(name, gender) {
   console.log(`Hello ${name} and you are a ${gender}!`);
}

// Run sayHello() after 2000ms( = 2 sec)
setTimeout(sayHello, 2000, 'Santosh', 20);



// Clearing the Timeout
const id = setTimeout(sayHello, 2000, 'Santosh', 20);
clearTimeout(id);


// ZERO DELAY
// ----------------------------------------------------------------------
/*
   -> This will schedule sayHello() in 'Callback Queue'
   -> This will be helpful to avoid blocking of CPU specially when
      it is carrying intensive task
   -> Some browsers (IE and Edge) implement a setImmediate() method
      that does this same exact functionality, but it's not standard
      and unavailable on other browsers. But it's a standard function
      in Node.js.
*/
setTimeout(sayHello, 0, "Santosh", 20);




// 2. setInterval()
// ----------------------------------------------------------------------


// NOT SO COMMON
// ----------------------------------------------------------------------
const sayHi = (name) => console.log(`Hi ${name}!`);

const id2 = setInterval(sayHi, 2000); // Run sayHi() every 2 seconds
clearInterval(id); // clear the interval



// MORE COMMON PRACTICE  (Run unless 'App.somethingIWait' has a value of "arrived")
// ----------------------------------------------------------------------
const interval = setInterval(() => {
   if (App.somethingIWait == 'arrived') {
      clearInterval(interval);
      return;
   }

   // Otherwise do something
   sayHi(name);

}, 2000);



// RECURSIVE  "setTimeout()"
// -----------------------------------------------------------------------
/*
   -> setTimeout() runs the callback function every n seconds, without
      any consideration about when a function finished its execution

   -> One function call may take larger time than  the same function
      executed in different time because of network conditions and
      various others

   -> This results in overlapping of one function call over the same
      function called at a different time
      To avoid this, we can use "recursive setTimeout()"

*/

const myFunction = () => {
   // do something

   setTimeout(myFunction, 1000);
};

setTimeout(myFunction, 1000);





// JAVASCRIPT ASYNCHRONOUS PROGRAMMING & CALLBACKS
// ----------------------------------------------------------------------
/*
   ASYNCHRONITY IN PROGRAMMING LANGUAGE
   ----------------------------------------------------------------------
   -> Computers are asynchronous by design
   -> Asynchronous means that things can happen independently of the
      main program flow

   -> In the current consumers' computers, every program for a specific
      time slot and then it pause its execution to let other program
      continue its execution
   -> This things run in a cycle so fast that it is near impossible
      to notice it
   -> FACT: Our thinking of running multiple programs simultaneously
            is just an illusion (EXCEPT on multiprocessor machines)

   -> Programs internally use 'interrupts', a signal that is emitted
      to the processor to gain attention of the system


   POINTS TO REMEMBER
   --------------------
   -> It is usual for programs to be asynchronous & halt their execution
      until they need attention, allowing the computer to execute other
      programs in the meantime
      For Example: When a program is waiting for response from the
                   network, it cannot halt the processor till the
                   request finishes

   -> Normally, programming languages are synchronous and some provide
      a way to manage asynchronicity in the language or through
      libraries
   -> C, Java, C#, PHP, Go, Ruby, Swift, and Python are all synchronous
      by default. Some of them handle async by using threads, spawning
      a new process

      s
   JAVASCRIPT & ASYNCHRONICITY
   ------------------------------
   -> JavaScript is 'Synchronous' by default & is single threaded
   -> This means code cannot create new threads & run in parallel
   -> But JavaScript was born inside the browser, its main job in
      the beginning is to respond to user actions like onClick,
      onMouseOver, onChange, onSubmit and so on

      Q. How could it do this with a synchronous programming model?
      ---------------------------------------------------------------
      -> Browser provides a set of APIs that can handle this kind of
         functionality
      -> More recently, Node.js introduced a non-blocking I/O
         environment to extend this concept to file access,
         network calls and so on

*/


// CALLBACK
// ----------------------------------------------------------------------
/*
   -> We don't know when the user is going to click a button
   -> So we define a event handler for the 'click' event
   -> The set of codes we are going to execute when this event occurs
      is written under a function known as CALLBACK function


   NOTE:
   ----------
   -> A callback is a function passed to another function and it's going
      to execute when the event happens
   -> We can do this because JavaScript has : -
         1.) FIRST CLASS FUNCTION :
         ------------------------------
          We can store a function under a variable

         2.) HIGHER ORDER FUNCTIONS
         ---------------------------
          Functions which accept function as an argument are called
          higher order functions
*/

document.getElementById('button').addEventListener('click', () => {
   console.log(`${this.innerHTML} button was clicked!`);
});



// EXAMPLES OF CALLBACKS IN BUILT-IN FUNCTIONS
// ----------------------------------------------------------------------

// #1
setTimeout(() => {
   // callback function
}, 1000);


// #2
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
   if (xhr.readyState === 4) {
      if(xhr.status === 200)
         console.log(xhr.responseText);
      else
         console.error('error');
   }
};

xhr.open('GET', 'https://yoursite.com');
xhr.send();



// HANDLING ERRORS IN CALLBACK
// ----------------------------------------------------------------------
// -> One common strategy is to use what Node.js adopted
// -> 'err' & 'data' parameters are passed to callback function

const fs = require('fs');

fs.readFile("/file.json", (err, data) => {
   if (err !== null) {
      //handle error
   }

   //no errors, process data
   console.log(data);
});



// PROBLEMS WITH CALLBACKS
// ----------------------------------------------------------------------
/*
 -> Every callback adds a level of nesting, which makes code unreadable
    unnecessarily complicated, etc
*/

// Example of Callback Hell
window.addEventListener("load", () => {
   document.getElementById("button").addEventListener("click", () => {
      setTimeout(() => {
         items.forEach((item) => {
            //your code here
         });
      }, 2000);
   });
});



// ALTERNATIVES TO CALLBACKS
// -----------------------------------------------------------------------
/*
   -> JavaScript introduced several features that help us with
      asynchronous code that do not involve using callbacks :-
        1.) Promises (ES6)
        2.) Async/Await (ES2017)
*/



// UNDERSTANDING JAVASCRIPT PROMISES
// ----------------------------------------------------------------------

/*
   Introduction
   ----------------
   -> The Promise object represents the eventual completion (or failure)
      of an asynchronous operation and its resulting value
   -> A Promise is in one of these states:
        a.) pending: initial state, neither fulfilled nor rejected
        b.) fulfilled: meaning that the operation was completed
                       successfully
        c.) rejected: meaning that the operation failed


   -> Once a promise has been called, it will start pending state
   -> The created promise will eventually end in a "resolved" state, or
      in a "rejected" state, calling the respective callback functions
      (passed to "then" & "catch") upon finishing
*/


// Creating a Promise Using a More Common Example of "Promisifying"
// ---------------------------------------------------------------------


const getFile = (fileName) => {

   return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
         if (err) {

            // This will cause the promise to fail with or without the
            // error passed as an argument
            reject(err);
            return;
         }

         //  Resolve the promise
         resolve(data);
      });
   });
};


// Log the data or error on the Console
getFile('myFile.txt').then(data => console.log(data))
   .catch(err => console.error(err));





// CONSUMING THE PROCESS
// ----------------------------------------------------------------------

const done = true;
const isItDoneYet = new Promise((resolve, reject) => {
   if (done)
      resolve('Done');
   else
      reject('error');
});


const checkIfItsDone = () => {
   isItDoneYet.then(ok => console.log(ok))
      .catch(err => console.error(err));
};


// Running checkIfItsDone() will specify functions to execute when the
// isItDoneYet promise resolves (callback passed to "then") or rejects
// (callback passed to "catch")
checkIfItsDone();




// CHAINING PROMISES
// ----------------------------------------------------------------------
/*
   -> A "promise" can be returned by another promise, creating a chain of
      promises

    fetch() API (Great Example of chaining promises)
    ----------------------------------------------------
    -> fetch() allows you to make network requests similar to
       XMLHttpRequest (XHR)
    -> The main difference is that the Fetch API uses Promises,
       which enables a simpler and cleaner API, avoiding callback
       hell and having to remember the complex API of XMLHttpRequest
*/

// Example of Chaining Promises
// ------------------------------------------------------------------------

// If response status is 'OK' resolve the "Promise" with the response
// Else reject the "Promise" with the error containing "statusText"
const status = (response) => {
   if (response.status >= 200 && response.status < 300)
      return Promise.resolve(response);

   return Promise.reject(new Error(response.statusText));
};


const json = (response) => response.json();


fetch("/todos.json")
   // status() is actually called here, and that it 'returns a promise'
   // which will be taken care by following "then-catch" pairs
   .then(status)

   // json() function here returns a promise that resolves with 'data'
   .then(json)
   .then(data =>
      console.log("Request succeeded with JSON response", data))
   .catch(error => console.log("Request failed", error));


// Description of the above Code
// -------------------------------------
/*
   -> We call fetch() to get a list of TODO items from 'todos.json'
      found in root folder and we create a chain of promises

   -> Running fetch() returns a 'response', which has many properties:-
      a.) 'status'         Represents the HTTP status code
      b.) 'statusCode'     Status message, 'OK' for success


   NOTE: 'response' also has a json() method, which returns a promise
         that will resolve with the content of the body processed
         and transformed into JSON


   -> The first promise in the chain is a function we defined,
      called status(), that checks the response status and
      if it's not a success response (between 200 and 299),
      it rejects the promise
   -> This results in skipping all the chained promises and directly
      go to catch() statement  logging the Request failed text along
      with the error message
   -> Else in case of 'success' it calls the json() function
   -> Since the previous promise, when successful, returned the
      response object, we get it as an input to the second promise

*/



// HANDLING ERRORS
// ---------------------------------------------------------------------
/*
   Whenever promise is rejected or concluded into error, the control
   goes to nearest "catch()" statement down the chain
*/

new Promise((resolve, reject) => {
   throw new Error('error');
}).catch(err => console.error(err));


//             OR


new Promise((resolve, reject) => {
   reject('error');
}).catch(err => console.error(err));



// CASCADING ERRORS
// ---------------------------------------------------------------------
// -> If inside a "catch()" statement we raise an error we can catch the
//    error in subsequent "catch()"" statement

new Promise((resolve, reject) => {
      throw new Error('error');
   }).catch(err => {
      throw new Error('error');
   })
   .catch(err => console.error());



// COMMON Promise METHODS
// -----------------------------------------------------------------------


// 1.) Promise.all()
// ----------------------------------------------------------------------
/*
   -> It helps us in passing multiple promises & when all are resolved
      we can execute something
*/

const f1 = fetch('/something.json'); // can use promise also
const f2 = fetch('/something2.json');

Promise.all([f1, f2])
   .then(res => console.log('Array of results: ', res))
   .cath(err => console.error(err));


// ES2015 destructing assignment syntax allows us to also do
Promise.all([f1, f2]).then(([res1, res2]) => {
   console.log("All results: ", res1, res2);
});



// 2.) Promise.race()
// ----------------------------------------------------------------------

/*
   -> It runs when the first of the passed promises resolves, and it runs
      the attached callback just once, with the result of first promise
      resolved
*/

const firstPromise = new Promise((resolve, reject) => {
   setTimeout(resolve, 700, "firstPromise");
});

const secondPromise = new Promise((resolve, reject) => {
   setTimeout(resolve, 300, "secondPromise");
});

Promise.race([firstPromise, secondPromise])
   .then(result => console.log(result));




// COMMON ERRORS
// ----------------------------------------------------------------------

/*
   Uncaught TypeError: undefined is not a promise
   ----------------------------------------------------------------------
    -> If we get the Uncaught TypeError: undefined is not a promise
       error in the console, make sure you use new Promise()
       instead of just Promise()

   UnhandledPromiseRejectionWarning
   ----------------------------------------------------------------------
    -> This means that a promise you called rejected, but there was no
       catch used to handle the error. Add a catch after the offending
       then to handle this properly
*/




// MODERN ASYNCHRONOUS JAVASCRIPT WITH ASYNC & AWAIT
// ----------------------------------------------------------------------

/*
    -> Async functions are a combination of promises and generators,
       and basically, they are a higher level abstraction over promises


    Q. Why were async/await introduced ?
    ----------------------------------------------------------------------
    -> They reduce the boilerplate around promises, and the "don't
       break the chain" limitation of chaining promises
    -> Promises were introduced to solve the famous callback hell
       problem, but they introduced complexity on their own, and
       syntax complexity

*/


/*
    Q. HOW IT WORKS ?
    --------------------------------------------------------------------
     -> Async functions return promise
     -> When we want to async function we need to append "await" & the
        calling will stop until the promise is resolved OR rejected
     -> The client function must be defined as 'async'
*/

// EXAMPLE

// async function
const doSomethingAsync = () => {
   return new Promise((resolve, reject) => {
      setTimeout(() => console.log('did Something!'), 2000);
   });
};

const doSomethingMore = async () => {

   // calling async function
   console.log(await doSomethingAsync());
};

doSomethingMore();



// PRE-PENDING 'async' TO A FUNCTION
// ----------------------------------------------------------------------
/*
   -> Pre-pending 'async' keyword to any function means that the function
      will return a promise
   -> Even if it's not doing so explicitly, it will internally make it
      return a promise
*/

// HENCE following code is same as below
async function firstFunction() {
   return "test";
}

firstFunction().then(data => alert(data));


// same
async function secondFunction() {
   return new Promise("test");
}

secondFunction().then(data => alert(data));




// EASIER TO READ USING ASYNC/WAIT
// ---------------------------------------------------------------------


/*
  -> Getting first User data using plain promises, with chaining &
     callback functions
*/
const getFirstUserData1 = () => {
   return fetch('/users.json') // get users list
      .then(response => response.json()) // parse JSON
      .then(users => users[0]) // pick first user
      .then(user => fetch(`users/${user}`)) // get first user data
      .then(firstUserResponse => firstUserResponse.json()) // parse JSON
      .catch(err => console.error(err));
};

getFirstUserData1();



// Getting first User data using async/await
const getFirstUserData2 = async () => {
   const response = await fetch('/users.json'); // get users list
   const users = await response.json(); // parse JSON
   const user = users[0]; // get first user
   const firstUserResponse = await fetch(`/users/${user}`); // get data of first user
   const firstUserData = firstUserResponse.json(); // parse JSON of first user

   return firstUserData;
};

getFirstUserData2();




// MULTIPLE ASYNC FUNCTIONS IN SERIES
// ----------------------------------------------------------------------
/*
   Async functions can be chained very easily, & syntax is much more
   readable than plain promises
*/

const doSomethingNew = () => {
   return new Promise(resolve => {
      setTimeout(resolve, 1000, "I did something new!");
   });
};

const saySomethingNew = async () => {
   const pathToExpert = await doSomethingNew();
   return pathToExpert + '\n I said something new!';
};


const teachSomethingNew = async () => {
   const pathToExpert = await saySomethingNew();
   return pathToExpert + '\n I taught something new!';
};


teachSomethingNew().then(res => console.log(res));



// EASIER DEBUGGING
// ----------------------------------------------------------------------
/*
   -> Debugging 'promises' is hard because the debugger will not step
      over asynchronous code
   -> 'Async/await' makes this very easy because to the compiler it's
      just like synchronous code but internally asynchronous
*/




// NODE.JS EVENT EMITTER
// ------------------------------------------------------------------------

/*
    'events' MODULE
    --------------------
    -> This module, in particular offers "EventEmitter" class which we
       will use to handle our events
    -> Object of "EventEmitter" class exposes following properties :-
       a.) 'emit'     To trigger event
       b.) 'on'       To respond to a event using a callback function
*/


// Example
// -----------------------

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// handle 'start' event
eventEmitter.on('start', () => console.log('start event occurred!'));


// emit 'start' event
eventEmitter.emit('start');




/*
  We can pass arguments to the event handler by passing them as
  additional arguments to emit()
*/
eventEmitter.on('start', (start, end) => {
   console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);




// OTHER METHODS OF OBJECT OF "EventEmitter" CLASS
// ----------------------------------------------------------------------
/*
   1.) once()                    add a one-time listener
   2.) removeListener()
         OR off()                remove an event listener from an event
   3.) removeAllListeners()      remove all listeners for an event
*/




// BUILD AN HTTP SERVER
// ------------------------------------------------------------------------


const http = require('http');

// Equal to whatever in the environment variable 'PORT'
const port = process.env.PORT;


/*
   -> Whenever a new request is received, the 'request' event is called,
      providing two objects:
          a.) request (http.IncomingMessage object)
          b.) response (http.ServerResponse object)

   -> 'request' provides request details. Through it we can access
       request headers & request data
   -> 'response' is used to populate(fill) the data we are going
       to return to the client's request
*/
const server2 = http.createServer((req, res) => {

   // set statusCode property of response object to 200 to indicate
   // successful response
   res.statusCode = 200;

   // set the Header of 'Content-Type' to 'text/html'
   // If this header already exists in the to-be-sent headers, its
   // value will be replaced
   res.setHeader('Content-Type', 'text/html');


   // This method signals to the server that all of the response
   // headers and body have been sent; that server should consider
   // this message complete
   // END OF THE RESPONSE
   res.end('<h1>Hello World!</h1>');
});


// listen on passed port
server2.listen(port, () => {
   console.log(`Server running at port: ${port}`);
});




// MAKING HTTP REQUEST USING NODE.JS
// ----------------------------------------------------------------------

// perform a GET request
//---------------------------------------------


// Description for the request
const options = {
   hostname: 'myWebsite.com',
   port: 443,
   path: '/skills',
   method: 'GET'
};

const req3 = https.request(options, res => {
   console.log(`Status Code: ${res.statusCode}, ${res.statusText}`);

   res.on('data', data => {

      // console.log() calls process.stdout.write with formatted output
      process.stdout.write(data);
   });
});


req3.on('error', error => console.error(error));
req3.end();




// perform a POST request
// --------------------------------------------------------------------

// data to post
const data = JSON.stringify({
   skills: 'Have minor in Node.JS'
});


// Description of the POST HTTPS request
const options2 = {
   hostname: 'myWebsite.com',
   port: 443,
   path: '/skills',
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
   }
};

const req2 = https.request(options2, res => {
   console.log(`statusCode: ${res2.statusCode}`);

   res2.on('data', data => {
      process.stdout.write(data);
   });
});

req2.on('error', error => {
   console.error(error);
});

req2.write(data);
req2.end();



// HTTP POST request using 'Axios' library (Simpler & easy to write
// and understand)
// ----------------------------------------------------------------------
const axios = require('axios');

axios.post('https://myWebsite.com/skills', {
      skills: 'Have minor in Node.JS'
   })
   .then(res => {
      console.log(`Status Code: ${res.statusCode}, ${res.statusText}`);
      console.log(`Response: ${res}`);
   })
   .catch(error => console.log(error));



// PUT and DELETE
// ------------------------------------------------------------------------
/*
   -> PUT ( Used to send data to a server to create/update a resource
           PUT requests are idempotent. That is, calling the same PUT
           request multiple times will always produce the same result)
      GET (for getting data without changing it)
      POST (used to send data to a server to create/update a resource)
   -> PUT and DELETE requests use the same POST request format, and
      just change the options.method value
*/



// GET HTTP REQUEST BODY DATA USING NODE.JS
// -----------------------------------------------------------------------
/*
   -> When we initialize the HTTP server using http.createServer(),
     the callback is called when the server got all the HTTP headers,
     but not the request body

   -> The request object passed in the connection callback is a stream
      of data
   -> So, we must listen for the body content to be processed, and it's
      processed in chunks
   -> We first get the data by listening to the stream 'data' events, and
      when the data ends, the stream 'end' event is called, once

   -> So to access the data, assuming we expect to receive a string,
      we must put it into an array
*/

const server3 = http.createServer((req, res) => {
   let data = [];
   req.on('data', chunk => {
      data.push(chunk);
   });
   req.on('end', () => {
       console.log(JSON.parse(data).todo); // 'Buy the milk'
   });
});




// FILE DESCRIPTORS IN NODE.JS
// ----------------------------------------------------------------------

/*
   -> File descriptor is returned by fs.open() method
   -> Common flags as Second Parameter of fs.open() method:
         i)    r           - Open the file for reading
         ii)   r+          - Open the file for reading & writing

         iii)  w+          - Open the file for reading and writing
                           - Position the stream at the beginning
                             of the file   (OVERWRITE MODE ON)
                           - The file is created if not existing

         iv) a             - Open the file for writing
                           - Position the stream at the end of the
                             file (OVERWRITE MODE OFF)
                           - The file is created if not existing

         v) a+             - Open the file for reading & writing
                           - Position the stream at the end of the
                             file (OVERWRITE MODE OFF)
                           - The file is created if not existing


*/


// open()
fs.open('/Users/santo/test.txt', 'r', (err, fd) => {
   // fd is file descriptor

   if (err)
      console.error(err);

   console.log(fd);
});


// openSync()
fs.openSync('/Users/santo/test.txt', 'r', (err, fd) => {
   // fd is file descriptor

   if (err)
      console.error(err);

   console.log(fd);
});



// NODE.JS FILE STATS
// ------------------------------------------------------------------------
/*
   -> Every file comes with a set of details that we can inspect using
      Node.js
*/

fs.stat('/Users/santo/test.txt', (err, stats) => {
   if (err) {
      console.error(err);
      return;
   }

   stats.isFile(); // Is it file or not        (true)
   stats.isDirectory(); // Is it  directory or not  (false)
   stats.isSymbolicLink(); // Is it a symbolic  link   (false)
   console.log(stats.size); // Get the size of it       (xxxxx)
});




// NODE.JS FILE PATHS
// ----------------------------------------------------------------------
/*
   -> Every file in the system has a path
   -> On Linux and macOS, a path might look like:
            /users/joe/file.txt

   -> Windows computers have path:
            C:\users\joe\file.txt

*/

// Getting Information out of a path
//------------------------------------------------

const path = require('path');
const {
   stdout
} = require('process');

const notes = '/Users/santo/test.txt';

path.dirname(notes); // Parent folder of a file ('/Users/santo')
path.basename(notes); // Get the file name    ('test.txt')
path.extname(notes); // Get the extension    ('.txt')


// Get the file name without extension ('test')
path.basename(notes, path.extname(notes));



// Working with Paths
// ----------------------------------------------------------

// i) path.join():  Join two or more parts of path
const name = 'santo';
path.join('/', 'Users', name, 'test.txt'); // '/Users/santo/test.txt'


// ii) path.resolve():
/*
   ABSOLUTE PATH: Full path of a file
   RELATIVE PATH: It starts from some given working directory, avoiding
                  the need to provide the full absolute path
*/

// a) Get the absolute path of a relative path
path.resolve('test.txt'); // '/Users/santo/test.txt'


// b) If we specify second parameter the first will be used as a base
//    for the second
path.resolve('textFiles', 'test.txt'); // '/Users/santo/textFiles/test.txt'



// c) If first parameter starts with a slash, that means it is an
//    absolute path
path.resolve('check', 'test.txt'); //  '/check/test.txt'



// iii) path.normalize()
// -> It try to calculate actual path, when it contains relative
//    specifiers like (.)  or  (..)  or  (//)
path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'


// NOTE:  Both 'resolve' & 'normalize' will not check if path exits
//        They calculate path based on the information they got




// READING FILE WITH NODE.JS
// ----------------------------------------------------------------------

// read file asynchronously
// 'utf8' encoding will return string instead of 'Buffer' object
fs.readFile('/Users/santo/test.txt', 'utf8', (err, data) => {
   if (err) {
      console.error(err);
      return;
   }

   console.log(data);
});



// readFileSync()
try {
   const data = fs.readFileSync('/Users/santo/test.txt', 'utf8');
   console.log(data);
} catch (err) {
   console.error(err);
}



/*
   -> Both fs.readFile() and fs.readFileSync() read the full content
      of the file in memory before returning the data
   -> This means that big files are going to have a major impact on
      your memory consumption and speed of execution of the program
   -> In this case, a better option is to read the file content using
      streams
*/




// WRITING FILES WITH NODE.JS
// ----------------------------------------------------------------------

// fs.writeFile()
const content = 'Added Content!';

fs.writeFile('/Users/santo/test.txt', content, err => {
   if (err) {
      console.log(err);
      return;
   }

   stdout.write('New contents added successfully!');
});



// fs.writeFileSync()
try {
   fs.writeFileSync('/Users/santo/test.txt', content, err => {
      if (err) {
         console.error(err);
         return;
      }

      stdout.write('New contents added successfully!');
   });
} catch (err) {
   console.error(err);
}



/*
   -> By default, existing content will be overridden
   -> We can pass flag (r, r+, w+, a, a+), based on our needs
*/
fs.writeFile('/Users/santo.test.txt', content, {
      flag: 'a+'
   },
   err => console.error(err));



// Better method to append content to the file
fs.appendFile('file.txt', content, err => {
   if (err) {
      console.error(err);
      return;
   }

   console.log('Content appended successfully!');
});



// Using streams
/*
   -> All those methods write the full content to the file before
      returning the control back to your program (in the async version,
      this means executing the callback)

   -> In this case, a better option is to write the file content using
      streams
*/





// WORKING WITH FOLDERS IN NODE.JS
// ---------------------------------------------------------------------


// Check if a folder exists
// ------------------------------
/*
   -> Use fs.access() to check if a folder exists & Node.js can access it
      with its permissions
*/


// Create a new Folder
// ----------------------------------------------------------------------
// fs.mkdir()   OR   fs.mkdirSync()
const folderName = '/Users/santo/test';

try {
   if (!fs.existsSync(folderName))
      fs.mkdirSync(folderName);

} catch (err) {
   console.error(err);
}


// Read the content of a directory
// ----------------------------------------------------------------------
// fs.readdir()   OR     fs.readdirSync()

const folderPath = '/Users/joe';

// We can get the full path
fs.readdirSync(folderPath).map(fileName => {
   return path.join(folderPath, fileName);
});



// We can also filter the results to only return the files, and exclude
// the folders
const isFile = fileName => {
   return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath).map(fileName => {
      return path.join(folderPath, fileName);
   })
   .filter(isFile);



// Rename a folder
// ----------------------------------------------------------------------
// fs.rename() or fs.renameSync() to rename folder

// fs.rename()
fs.rename('/Users/joe', '/Users/roger', err => {
   if (err) {
      console.error(err);
      return;
   }
   //done
});


//fs.renameSync()
try {
   fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
   console.error(err);
}


// Remove a folder
//-----------------------------------------------------------------------
// fs.rmdir() or fs.rmdirSync()

/*
   -> Removing a folder that has content can be more complicated
      than you need
   -> In this case it's best to install the fs-extra module, which is
      very popular and well maintained

      [  It's a drop-in replacement of the fs module, which provides
           more features on top of it                                 ]
*/
const folder = '/Users/joe';

fs.remove(folder, err => {
   console.error(err);
});


// It can also be used with promises
fs.remove(folder)
   .then(() => {
      //done
   })
   .catch(err => {
      console.error(err);
   });


// or with async/await
async function removeFolder(folder) {
   try {
      await fs.remove(folder);
      //done
   } catch (err) {
      console.error(err);
   }
}

const folder2 = '/Users/joe';
removeFolder(folder2);




// NODE.JS 'fs' MODULE
// -------------------------------------------------------------------------
/*
   -> It provides very useful functionalities to access & interact with
      the file system
   -> There is no need to install it as it is a part of the Node.js core


   METHODS
   --------------
   1)  fs.access()    Check if file exits & Node.js can access with its
                      permissions

   2) fs.appendFile()  Append data to a file. If the file does not exist,
                       it's created

   3) fs.chmod()     - Change the permissions of a file specified by the
                       filename passed
                     - Related: fs.lchmod(), fs.fchmod()
`
   4) fs.chown()     - Change the owner and group of a file specified by
                       the filename passed
                     - Related: fs.fchown(), fs.lchown()
   5) fs.close()     - Close a file descriptor
   6) fs.copyFile()  - Copies a file

   7) fs.createReadStream()   - Create a readable file stream
   8) fs.createWriteStream()  - Create a writable file stream

   9) fs.link()               - Create a new hard link to a file
   10) fs.mkdir()              - Create a new folder
   11) fs.mkdtemp()            - Create a temporary directory
   12) fs.open()               - Set the file mode
   13) fs.readdir()            - Read the contents of a directory

   14) fs.readFile()           - read the content of a file
                               - Related: fs.read()

   15) fs.readlink()      - Read the value of a symbolic link
   16) fs.realpath()      - Resolve relative file path pointers
                            (., ..) to the full path

   17) fs.rename()        - Rename a file or folder
   18) fs.rmdir()         - remove a folder

   19) fs.stat()          - Returns the status of the file identified
                            by the filename passed
                          - Related: fs.fstat(), fs.lstat()

   20) fs.symlink()       - Create a new symbolic link to a file

   21) fs.truncate()      - Truncate to the specified length the file
                            identified by the filename passed
                          - Related: fs.ftruncate()

   22) fs.unlink()        - Remove a file or a symbolic link
   23) fs.unwatchFile()   - Stop watching for changes on a file

   24) fs.utimes()        - Change the timestamp of the file identified
                            by the filename passed
                          - Related: fs.futimes()

   25) fs.watchFile()     - Start watching for changes on a file
                          - Related: fs.watch()

   26) fs.writeFile()     - write data to a file
                          - Related: fs.write()

*/


/*
     OBSERVATION
    -------------------
    -> One fact about the 'fs' module is that all the methods are
       asynchronous by default, but they can also work synchronously
       by appending 'Sync'

    -> Examples
       #1                                 #2
          readFile()                         readdir()
          readFileSync()                     readdirSync()

*/

// Synchronous method is used with a callback
fs.rename('test.txt', 'testMarks.txt', err => {
   if (err) {
      console.error(err);
      return;
   }

   console.log("Renamed successfully!");
});


// Asynchronous method is used with a try/catch block to handle errors
// Remaining tasks will until the file is renamed
try {
   fs.renameSync('test.txt', 'testMarks.txt');
   console.log("Renamed successfully!");
} catch (err) {
   console.error(err);
}




// NODE.JS PATH MODULE
// ----------------------------------------------------------------------
/*
   -> The path module provides utilities for working with file and
      directory paths
*/


/*
   i) path.sep
   --------------
    -> Provides the platform-specific path segment separator
        \ on Windows
        / on POSIX

   ii) path.delimiter
   --------------------
    -> Provides the platform-specific path delimiter
         ; for Windows
         : for POSIX
*/

// For example, on POSIX
'/Users/santo/test.txt'.split(path.sep); // Returns ['Users', 'santo', 'test.txt']

// On Windows
'Users\\santo\\test.txt'.split(path.sep); // Returns ['Users', 'santo', 'test.txt']



// On POSIX
// -------------------------------------------------------------------------

// Get all paths of environment variables separated by ':'
// Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
console.log(process.env.PATH);

// Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
process.env.PATH.split(path.delimiter);


// On Windows
// ---------------------------------------------------------------------

// Get all paths of environment variables separated by ';'
// Prints: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'
console.log(process.env.PATH);

// Returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
process.env.PATH.split(path.delimiter);



// COMMON 'path' METHODS
// ----------------------------------------------------------------------
/*
     1) path.basename()      - Get the last portion of the path
                             - Second parameter can filter out extname

     2) path.dirname()       - Return the directory part of a path
     3) path.extname()       - Return the extension of the part of path
     4) path.join()          - Joins two or more parts of a path

     5) path.normalize()     - Tries to calculate the actual path when
                               it contains relative specifiers like .
                                or .., or double slashes

     6) path.resolve()       - We can get the absolute(full) path
                               calculation of a relative path
                             - Specifying second parameter,
                               path.resolve() will use the first as the
                               base for the second
                             - If the first parameter starts with a
                               slash, that means it's an absolute path

*/

// 6) path.isAbsolute()  Returns true if it's an absolute(full) path
require('path').isAbsolute('/test/something'); // true
require('path').isAbsolute('./test/something'); // false


/*
   7) path.relative()
    -> Accepts 2 paths as arguments.
    -> Returns the relative path from the first path to the second,
       based on the current working directory(cwd)
*/
require('path').relative('/Users/santo', '/Users/santo/test.txt'); //'test.txt'
require('path').relative('/Users/santo', '/Users/santo/something/test.txt'); //'something/test.txt'


/*
   8) path.parse()
      -> Parses a path to an object with the segments that compose it
          root:  the root
          dir:   the folder path starting from the root
          base:  the file name + extension
          name:  the file name
          ext:   the file extension
*/

require('path').parse('/users/test.txt');

// OUTPUT
/*
   {
     root: '/',
     dir: '/users',
     base: 'test.txt',
     ext: '.txt',
     name: 'test'
   }
*/




// NODE.JS 'os' MODULE
// -----------------------------------------------------------------------

/*
   -> It provides OS-related utility methods and properties
   -> It is used to retrieve information from the underlying
      operating system

     USEFUL PROPERTIES
    -------------------------

    1) os.EOL
                The OS-specific end-of-line marker
                     \n on POSIX
                     \r\n on Windows

    2) os.constants.signals
                  It tells us all the constants related to handling
                  process signals, like SIGHUP, SIGKILL and so on

    3) os.constants.errno
                  It sets the constants for error reporting, like
                  EADDRINUSE, EOVERFLOW and more


    METHODS
   ----------------------------------------------------------------------

   1) os.arch()         - Returns the operating system CPU architecture
                        - Possible values are 'arm', 'arm64', 'ia32',
                          'mips', 'mipsel', 'ppc', 'ppc64', 's390',
                          's390x', 'x32', and 'x64'

   2) os.cpus()         - Returns an array of objects containing
                          information about each logical CPU core

   3) os.endianness()   - Returns a string identifying the endianness
                          of the CPU
                        - 'BE' for Big Endian
                        - 'LE' for Little Endian

      WHAT ARE THESE?
      [
        -> Little and big endian are two ways of storing multi-byte
           data-types ( int, float, etc)
        -> In little endian machines, last byte of "binary representation
           of the multi-byte data-type" is stored first
        -> In big endian machines, first byte of "binary representation
           of the multi-byte data-type" is stored first
      ]

   4) os.freemem()         - Returns the amount of free system memory
                             in bytes as an integer

   5) os.homedir()         - Returns the path of the current user's
                             home directory
                           - Example: '/Users/joe'

   6) os.loadavg()         - Returns an array containing  1, 5, and 15
                             minutes load averages
                           - The load average is a measure of system
                             activity calculated by the operating
                             system and expressed as a fractional number
                           - The load average is a Unix-specific concept
                           - On Windows, the return value is always
                              [0, 0, 0]

   7) os.networkInterfaces()   - Returns an object containing network
                                 interfaces that have been assigned a
                                 network address
                               - Each key on the returned object
                                 identifies a network interface
                               - The associated value is an array of
                                 objects that each describe an assigned
                                 network address

   8) os.platform()         - Returns a string identifying the operating
                              system platform
                            - Possible values are 'aix', 'darwin',
                              'freebsd', 'linux', 'openbsd', 'sunos',
                              and 'win32'

   9) os.release()          - Returns the operating system as a string

   10) os.tmpdir()          - Returns the operating system's default
                              directory for temporary files as a string

   11) os.totalmem()        - Returns the total amount of system memory
                              in bytes as an integer

   12) os.type()            - Returns the operating system name
                            - For example:
                                         'Linux' on Linux,
                                         'Darwin' on macOS
                                         'Windows_NT' on Windows

   13) os.uptime()          - Returns the system uptime(time since last
                              reboot) in number of second

   14) os.userInfo()        - Returns information about the currently
                              effective user

*/




// NODE.JS 'events' MODULE
// ----------------------------------------------------------------------
/*
   -> 'events' module provides us the 'EventEmitter' class, which to key
      to working with events in Node.js
*/



// METHODS
// ------------------------------------------------------------------------


// 1) addListener()     -Alias of  on(eventName, callback)

/*
 2) emit(eventName)   - Synchronously calls each of the listeners
                        registered for the event named 'eventName', in
                        the order they were registered, passing the
                        supplied arguments to each
                      - Returns true if the event had listeners,
                        false otherwise
*/
eventEmitter.emit('call'); // emit 'call' event


/*
   3) eventNames()       - Returns an array of strings that represents
                           the events registered on the current
                           'eventEmitter' object
*/
eventEmitter.eventNames();


/*
   4) getMaxListeners()   - Get the maximum count of listeners one can
                            to 'eventEmitter' object
                          - DEFAULT: 10
                          - It can be lowered or increased using
                            setMaxListeners()
*/
eventEmitter.getMaxListeners();
eventEmitter.setMaxListeners(50);



// 5) listenerCount()   - Returns the total listener linked to an event
eventEmitter.listenerCount('call');


// 6) listeners()  - Get an array of listeners of the event
eventEmitter.listeners('call');


// 7) off()          - Alias for removeListener()


// 8) on()           - Respond to a event
eventEmitter.on('call', () => console.log('call event occurred!'));


// 9) once()         - Respond to a event for the once(first time)
eventEmitter.once('call', () => console.log('Only once!'));


/*
  10) prependListener()  - When we add listener using 'on' OR
                           'addListener', it is added to the last of
                           the queue of listeners & called last
                         - Using it, listener is added & called before
                           other listeners

  11) prependOnceListener()  - Listener added through 'once' will be
                               added & listened at last of queue of
                               listeners
                             - Using it, listener will be added & called
                               before other listeners


   12) removeAllListeners()  - Removes all listeners of an 'eventListener'
                               object listening to a specific event

   13) removeListener()     - Remove a specific listener
                            - We can do this by saving the callback
                              function to a variable, when added,
                              so you can reference it later

*/


// removeAllListeners()
eventEmitter.removeAllListeners('open');


// removeListener()
const doSomethingDifferent = () => {
   setTimeout(() => {
      console.log('Did Something!');
   }, 2000);
};

eventEmitter.on('open', doSomethingDifferent);
eventEmitter.removeListener('open', doSomethingDifferent);




// NODE.JS HTTP MODULE
// -----------------------------------------------------------------------
// -> It is a key module to Node.js networking


// POPULAR 'http' PROPERTIES
// -----------------------------------


// 1) http.METHODS         - It lists all the HTTP methods supported
console.log(http.METHODS);


// 2) http.STATUS_CODES    - It lists all the HTTP status codes & their
//                           description
console.log(http.STATUS_CODES);



/*
   3) http.globalAgent

        - Points to the global instance of the Agent object, which is an
          instance of the http.Agent class

        - It's used to manage connections persistence and reuse for HTTP
          clients, and it's a key component of Node.js HTTP networking

*/



// POPULAR 'http' METHODS
// ---------------------------------------------------------------------

// 1) http.createServer()  - Returns a new instance of http.Server class
const server4 = http.createServer((req, res) => {
   // Handle every request with  this callback
});



/*
  2) http.request()   - Makes an HTTP request to a server, creating an
                        instance of the http.ClientRequest class

  3) http.get()       - Similar to http.request(), but automatically sets
                        the HTTP method to GET, and calls req.end()
                        automatically
*/



// 'http' CLASSES
// ---------------------------------------------------------------------------
/*
   1) http.Agent
   2) http.ClientRequest
   3) http.Server
   4) http.ServerResponse
   5) http.IncomingMessage


   1) http.Agent
   -----------------------------------------------------------------------
    -> Node.js creates a global instance of the http.Agent class to
       manage connections persistence & reuse for HTTP clients
    -> This object makes sure that every request is queued & a single
       socket is reused
    -> It also maintains pool of sockets. This is key for performance
       reasons


   2) http.ClientRequest
   ------------------------------------------------------------------------
    -> Its object is created when http.request()  OR http.get() are called
    -> When response is received, the 'response' event is called with
       an 'http.IncomingMessage' instance as an argument
    -> Returned data can be read in two ways :-
         i)  You can call 'response.read()' method
         ii) In the  'response' event handler we can setup event listener
             for the 'data' event, so we can listen for the data streamed
             into



   3) http.Server
   -------------------------------------------------------------------------
    -> This class is commonly instantiated and returned when creating a
       new server using http.createServer()

    -> Once we have a server object, we have access to its methods:
         i)  close()    Stops the server from accepting new connections
         ii) listen()   Starts the HTTP server and listens for connections

*/


/*
   4) http.ServerResponse
   -------------------------------------------------------------------------
    -> Created by an 'http.Serve'r and passed as the second parameter to
       the 'request' event it fires
    -> Commonly known and used in code as 'res'

*/

const server5 = http.createServer((req, res) => {
   // res is an http.ServerResponse object

   res.end();
});



/*
   4) http.ServerResponse()
   ------------------------------------------------------------------------
   -> The method you'll always call in the handler is end(), which closes
      the response, the message is complete and the server can send it
      to the client
      It must be called on each response


   METHODS TO INTERACT WITH HTTP HEADERS
   -------------------------------------------------------------------------

    1) getHeaderNames()    - Get the list of names of HTTP headers already
                             set

    2) getHeaders()        - Get a copy of the HTTP headers already set

    3) setHeader('header-name', value)    - Sets an HTTP's header value

    4) getHeader('header-name')         - Gets an value of HTTP's header
                                         already set

    5) removeHeader('header-name')      - Removes an HTTP header already set
    6) hasHeader('header-name)          - Returns 'true' if the response
                                         has that header set

    7) headersSent()                   - Returns 'true' if the headers have
                                         already been sent to the client


   -> After processing the headers, we can send them to the client calling
      'response.writeHead(statusCode, statusMessage{optional}, headers object)'

   -> To send data to the client in the response body:
         - We can use write()
         - It will send  buffered data to the HTTP response stream

   - > If the headers were not sent yet using 'response.writeHead()', it
       will send the headers first, with the status code and message that's
       set in the request, which you can edit by setting the statusCode and
       statusMessage properties values   (SEE BELOW)
*/
response.statusCode = 500;
response.statusMessage = 'Internal Server Error';



/*
   5) http.IncomingMessage
   -------------------------------------------------------------------------
   -> An 'http.IncomingMessage' object is created by :
         i) 'http.Server' when listening to the 'request' event
         ii) 'http.ClientRequest' when listening to the 'response' event


   -> It can be used to access the response-:

        i)   status               Using its statusCode() and statusMessage()
        ii)  headers              Using its headers() or rawHeaders()
        iii) HTTP method          Using its method()
        iv)  HTTP version         Using the httpVersion()
        v)   URL                  Using the url()
        vi)  underlying socket    Using the socket()

    -> The data is accessed using streams, since 'http.IncomingMessage'
       implements the Readable Stream interface
*/


// NODE.JS BUFFERS
// ------------------------------------------------------------------------

/*
    Q. WHAT IS A BUFFER?
   -----------------------------------------------------------------------
    -> A buffer is an area of memory
    -> We can think of it as an array of integers, which each represent a
       byte of data
    -> It represents a fixed-size chunk of memory(can't be resized)
       allocated outside of the V8 JavaScript engine
    -> It is implemented by the Node.js Buffer class


    Q. WHY DO WE NEED BUFFER?
   ----------------------------------------------------------------------
    -> Buffers were introduced to help developers deal with binary data,
       in an ecosystem that traditionally only dealt with strings rather
       than binaries
    -> 'Buffers' are deeply linked with 'Streams'
       -----------------------------------------
        When a stream processor receives data faster than it can handle,
        it puts the data in buffer

     ->  Example
        ---------------
         When we are watching YouTube video & red line goes beyond our
         visualization point:
               We are downloading data faster than we are viewing it, &
               our browser buffers it

*/


/*
   CREATING BUFFERS
   -------------------------------------------------------------------------
    -> Buffers can be created using :-
               i)   Buffer.from()
               ii)  Buffer.alloc()
               iii) Buffer.allocUnsafe()

*/

// Buffer.from(string[, encoding  {Default: 'utf8'}])
const buffer = Buffer.from('Hello Buffer!');

const buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');



//  Buffer.from(buffer)
//              Copies the passed buffer data onto a new Buffer instance
const buffer2 = Buffer.from(buffer);



// Buffer.from(array)
//                 - Allocates a new Buffer using an array of bytes in the
//                    range 0 – 255
//                 - Array entries outside that range will be truncated to
//                    fit into it

// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'
//  0xNNN     hexadecimal number of characters
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);




// Creating Buffer of 1KB size
const customBuffer = Buffer.alloc(1024);

//          OR
const customBuffer2 = Buffer.allocUnsafe(1024);


// DIFFERENCES BETWEEN  'alloc' & 'allocUnsafe'
// --------------------------------------------------------------------------
/*
   -> While both 'alloc' & 'allocUnsafe' allocates a Buffer of specified
      size in bytes, the 'Buffer' created by 'alloc' will be initialized
      with zeroes & one created by 'allocUnsafe' will be uninitialized

   -> This means that while 'allocUnsafe' would be quite fast in comparison
      to 'alloc', the allocated segment of memory may contain old data
      which could potentially be sensitive

   -> Older data, if present in the memory, can be accessed or leaked when
      the Buffer memory is read
      This is what really makes allocUnsafe unsafe and extra care must be
      taken while using it
*/



// USING THE BUFFER
// --------------------------------------------------------------------------


// ACCESS THE CONTENT OF A BUFFER
// ----------------------------------------
/*
   -> A buffer, being an array of bytes, can be accessed like an array
   -> Returned numbers are the Unicode Code that identifies the character
      in the buffer position (H => 72, e => 101)
*/

const buffer7 = Buffer.from('Hello!');
console.log(buffer7[0]);    // 72
console.log(buffer7[1]);    // 101

// print the full content of the buffer
console.log(buffer7.toString());


// NOTE: If we initialize a buffer with a number that sets its size, we
//       will get access to pre-initialized memory that will contain
//       random data, not an empty buffer


// Get the length  of the buffer
// --------------------------------------------------
const buffer6 = Buffer.from('Hello!');
console.log(buffer6.length);  // 6


// Iterate over the contents of a buffer
// -------------------------------------------------
for(const item of buffer){
   console.log(item);  //  72 101 108 108 111 33
}



// Changing the content of a buffer
// --------------------------------------------
const buffer3 = Buffer.alloc(4);
buffer3.write('Hello!');  // writing to buffer a whole string of data

buffer[0] = 71;    // G
console.log(buffer3.toString());     // Gello



// Copy a Buffer
// -----------------------------

// copy whole buffer
const buffer4 = Buffer.from('Hello!');
const bufferCopy = Buffer.alloc(4);
buffer4.copy(bufferCopy);


// Copy parts of buffer with additional three parameters(startPosition,
//  endPosition, bufferLength)
buffer4.copy(bufferCopy, 0, 0, 2);
console.log(bufferCopy.toString());    // 'He'



// Slice a Buffer
// -------------------------------------------------------
/*
   -> If we want to create the partial visualization of Buffer, we can
      create a slice
   -> It is not a copy, if buffer changes slice also change
   -> slice(startPosition, endPosition{optional})
*/

const buffer5 = Buffer.from('Hey!');
console.log(buffer5.slice(0).toString());   //Hey!

console.log(buffer5.slice(0, 2).toString());  // He

buffer5[1] = 111; //o
console.log(slice.toString()); //Ho





// NODE.JS STREAMS
// -------------------------------------------------------------------------

/*
    Q. WHAT ARE STREAMS?
   --------------------------------------------------------------------------
    -> They are a way to handle reading/writing files, network
       communications, or any kind of end-to-end information exchange
       in an efficient way

    -> They were introduced in the Unix operating system decades ago,
      and programs can interact with each other passing streams through
      the pipe operator ( | )

    -> FOR EXAMPLE
       -----------------
         i) Traditional Way:  When we tell the program to read a file,
                              the entire file is read into memory,
                              before we can process it

         ii) Using Streams:  We can process the contents of the file
                             byte-by-byte without the need of entire
                             file to be kept in memory


     Q. WHY STREAMS?
     ------------------------------------------------------------------------
      -> Two basic advantages :-
           i) Memory Efficiency: We do not need to load large amounts
                                 of data in memory before we are able
                                 to process it

           ii) Time Efficiency: It takes a way less time to process the
                               data than the usual way

*/



// EXAMPLE OF STREAM (READING FILES FROM DISK)
// ------------------------------------------------------------------------

// Without Streams (It will first load the entire file then send)
fs.readFile(__dirname + '/data.txt', (err, data) => {
   fs.writeFile(__dirname + '/writeData.txt', data, () => {
      console.log('Data written successfully!');
   });
});


// With Streams  
// -------------------------------------
//  Instead of waiting until the file is fully read, we start streaming 
//  it to the HTTP client as soon as we have chunk of data ready to be sent

// Creating a Read Stream of 'data.txt' file
const readStream = fs.createReadStream(__dirname + '/data.txt');

// Create a Write Stream of 'res'
const writeStream = fs.createWriteStream(res);


readStream.on('data', (chunk) => {
    console.log('Chunk of data written');
    writeStream.write(chunk);
});





// pipe()
// ---------------------------------------------------------------------------
/*
   -> It takes the source, & pipes it into destination
   -> We call it on the source stream
   -> It return write stream, which can be used to further pipe into 
      another destination

       src.pipe(dest1).pipe(dest2);

           OR
       
       src.pipe(dest1);
       dest1.pipe(dest2);     
*/

const server7 = http.createServer((req, res) => {
   const readStream = fs.createReadStream(__dirname + '/data.txt');

   // pipe the file stream to the HTTP response  
   readStream.pipe(res);
});

server7.listen(3000, () => console.log('Listening on port: 3000'));



// STREAMS POWERED NODE.JS APIs
// ---------------------------------------------------------------------------
/*
    i)    process.stdin               Returns a stream connected to stdin
    ii)   process.stdout              Returns a stream connected to stdout
    iii)  process.stderr              Returns a stream connected to stderr
    iv)   fs.createReadStream()       Creates a readable stream to a file
    v)    fs.createWriteStream()      Creates a writable stream to a file
    vi)   net.connect()               Initiates a stream - based connection

    vii)  http.request()              Returns an instance of the 
                                      http.ClientRequest class, which is a
                                      writable stream
                                      
    viii) zlib.createGzip()           Compress data using gzip(a 
                                      compression algorithm) into a stream

    ix)   zlib.createGunzip()         Decompress a gzip stream
    
    x)    zlib.createDeflate()        Compress data using deflate(a 
                                      compression algorithm) into a stream

    xi)   zlib.createInflate()        Decompress a deflate stream

*/



/*
     DIFFERENT TYPES OF STREAMS
    ------------------------------------------------------------------------
    -> There are four classes of streams:
        i)   Readable       - A stream you can pipe from, but not pipe 
                             into(you can receive data, but not send data to 
                             it)
                            - When you push data into a readable stream,
                             it is buffered, until a consumer starts to read 
                             the data

        ii)  Writable       - A stream you can pipe into, but not pipe from
                              (you can send data, but not receive from it)

        iii) Duplex         - A stream you can both pipe into and pipe from,
                              basically a combination of a Readable and
                              Writable stream

        iv)  Transform      - A Transform stream is similar to a Duplex, 
                              but the output is a transform ofs its input

*/




// HOW TO CREATE READABLE STREAM
// -------------------------------------------------------------------------
// -> We get the 'Readable' stream from 'stream' module, & we initialize it
//    & implement it with 'readable._read()' method


// Create a stream object
const stream = require('stream');
const readableStream = stream.Readable();

// Then implement _read
readableStream._read = () => {};


// OR, we can implement _read using option read
const readableStream2 = new stream.Readable({
   read() {}
});


// Now the stream is initialized, we can send data to it
readableStream.push('Hi!');
readableStream.push('Hello!');



//  HOW TO CREATE A WRITABLE STREAM
// -------------------------------------------------------------------------

// create a writableStream object
const writableStream = new stream.Writable();

// Then implement _write
writableStream._write = (chunk, encoding, next) => {
   console.log(chunk.toString());
   next();
};


// We can now pipe a readable stream
process.stdin.pipe(writableStream);




// HOW TO GET DATA FROM A READABLE STREAM
// ---------------------------------------------------------------

const readableStream3 = new stream.Readable({
   read() {}
});

const writableStream3 = new stream.Writable();


writableStream3._write((chunk, encoding, next) => {
   console.log(chunk);
   next();
});


readableStream3.pipe(writableStream3);

readableStream3.push('Hi!');
readableStream3.push('Hello!');



// Also we can consume readable stream directly, using readable event
readableStream3.on('readable', () => {
   console.log(readableStream3.read());
});




// HOW TO SEND DATA TO A WRITABLE STREAM
// --------------------------------------------------------------------------
writableStream3.write('Hi!');



// SIGNALLING WE ARE ENDING WRITABLE STREAM  (use 'end()' )
// ------------------------------------------------------------------------


const readableStream4 = new Stream.Readable({
   read() {}
});

const writableStream4 = new Stream.Writable();

writableStream4._write = (chunk, encoding, next) => {
   console.log(chunk.toString());
   next();
};

readableStream.pipe(writableStream);

readableStream.push('hi!');
readableStream.push('ho!');

writableStream.end();




// NODE.JS (DIFFERENCE BETWEEN DEVELOPMENT & PRODUCTION)
// -----------------------------------------------------------------------
/*
   -> We can have different configurations for 'development' & 'production'
      environments
   -> Node.js assumes that it's always running in a 'development' environment
   
   -> We can signal to 'Node.js' that we are running in 'production' by
      setting  [ 'NODE_ENV = production' ]  environment variable

      - This is usually done by executing following command
             [ export NODE_ENV = production ] in the shell
      - But it is better to put it in our shell configuration        
                (Example  '.bash_profile' with the Bash Shell)
        so that setting persist in case of system restart  
        
        
   -> We can also apply the environment variable by pre-pending to our
      Node.js application initialization command    
                    [ NODE_ENV=production node app.js ]
                    
       - This environment variable is a convention that is widely used 
         in external libraries as well  
         
         
   Q. WHAT DOES SETTING ENVIRONMENT VARIABLE OF NODE.JS APPLICATION TO 
      PRODUCTION MEAN?
   ------------------------------------------------------------------------   
    -> It generally ensures:-
        i)  logging is kept to minimum (essential level)
        ii) more caching levels takes place to optimize performance


    For Example:
    ---------------
     -> Pug(template library used by Express), compiles in debug mode;
        if  [ NODE_ENV != production ]
     -> In 'development mode' Express views are compiled in every request
        while in 'production mode' they are cached       
*/


// We can use conditional statements to execute code in different
// environments
if(process.env.NODE_ENV === 'development'){

}

if (process.env.NODE_ENV === 'production') {

}

// If NODE_ENV is either production or staging
if (['production', 'staging'].indexOf(process.env.NODE_ENV) >= 0) {

}



// FOR EXAMPLE: In an Express app, we can use this to set different error
//              handlers according the environment
if(process.env.NODE_ENV === 'development'){
   app.use(express.handler({dumpExceptions: true, showStack: true}));
}

if(process.env.NODE_ENV === 'production'){
   app.use(express.errorHandler());
}




// ERROR HANDLING IN NODE.JS
// --------------------------------------------------------------------------

/* 
   -> Errors in Node.js are handled through exceptions

    CREATING EXCEPTIONS
   -------------------------------------------------------------------------
    -> An exception is created using the 'throw' keyword
                     [ throw value ]

    -> As soon as JavaScript executes this line, the normal flow of program
       is halted & the control is held back to the nearest 
       'exception handler'
       
    -> Usually in client-side code 'value' can be any JavaScript value
       including a string, a number or an object
    -> In Node.js we don't throw strings, we just throw Error objects   

*/


// ERROR OBJECTS
// ------------------------------------------------------------------------------

/*
  -> An error object is an object that is either an instance of Error
     object, or extends the Error class
*/

var coffeeLeft = 12;

if(coffeeLeft === 0)
   throw new Error('Ran out of coffee');
else
   console.log(`${coffeeLeft} liters of coffee left`);


// OR

class NotEnoughCoffeeError extends Error {
   constructor(message){
      super(message);
      this.name = 'Not Enough Coffee Error';
   } 
}

if(coffeeLeft === 0)
   throw new NotEnoughCoffeeError();
else
   console.log(`${coffeeLeft} liters of coffee left`);



// HANDLING EXCEPTIONS
// ---------------------------------------------------------------------------
try{
   // Do something which may result into error
}catch(e){
   console.log(e.message);
}   


// NOTE: We can have multiple catch statements to handle different errors
//       differently



// CATCHING UNCAUGHT EXCEPTIONS
// --------------------------------------------------------------------------

/*
   -> If an uncaught exception gets thrown during the execution of a 
      program, our application may crash
   -> To handle it we can listen for 'uncaughtException' event on the 
      'process' object
*/

process.on('uncaughtException', err => {
   console.error('There was an uncaught error', err);
   process.exit(1);    // Mandatory
});



// EXCEPTIONS WITH PROMISES
// -------------------------------------------------------------------------------


// Using promises, we can chain different operations, and handle errors 
// at the end
const doSomethingForOneMinute = () => {
   setTimeout(() => {
      console.log('One minute finished!');
   }, 1000);
};

const doSomethingForTwoMinute = () => {
   setTimeout(() => {
      console.log('Two more minute finished!');
   }, 2000);
};

doSomethingForOneMinute()
      .then(doSomethingForTwoMinute)
      .then(() => console.log('Hello, how are you?'))
      .catch(err => {
         console.error(err.message);
      });


// Handling Errors locally (To know the error causing set of codes)
const doSomethingMoreThanUsual = () => {
   //...

   try{
      // ...
   }catch(err){

      // Handle it locally
      throw new Error(err.message);
   }

   //...
};



// To be able to handle errors locally without handling them in the function
doSomethingForOneMinute()
      .then(doSomethingForTwoMinute.catch(err => {
         throw err;   // break the chain
      }))
      .then(doSomethingDifferent.catch(err => {
         throw err;   // break the chain
      }))
      .catch(err => console.log(err));



// ERROR HANDLING WITH ASYNC/AWAIT
// -----------------------------------------------------------------------------

// async function which returns always a resolved Promise
const someOtherFunction = async () => {
   return 1;
};


async function someFunction() {
   try{
      await someOtherFunction();
   }catch(err){
      console.error(err.message);
   }
}



// HOW TO LOG AN OBJECT IN NODE.JS
// ---------------------------------------------------------------------------
/*
   -> When we print a large JavaScript in browser, we get to see the whole
      object by expanding it
   -> Now, all is fine until a certain level of nesting
      After two levels of nesting, Node.js gives up and prints[Object] as 
      a placeholder
*/


// How to print the whole object?
const obj = {
   name: 'joe',
   age: 35,
   person1: {
      name: 'Tony',
      age: 50,
      person2: {
         name: 'Albert',
         age: 21,
         person3: {
            name: 'Peter',
            age: 23
         }
      }
   }
};


console.log(obj);    // It will not print whole object


// Method-1
// 2 is the number of spaces for indentation
console.log(JSON.stringify(obj, null, 2));



// Method-2
/*
   -> But the problem is that the nested objects after level 2 are now
      flattened(Regular indentation is not there), and this might be
      a problem with complex objects
*/
require('util').inspect.defaultOptions.depth = null;
console.log(obj);







