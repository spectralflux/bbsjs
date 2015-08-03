/**
Object representing a piece of "software" running on the bbs terminal platform
*/

var TerminalProgram = function () {
    this.userInputStartCursorRow = undefined;
    this.userInputStartCursorCol = undefined;
    this.userInputMode = false;
    this.userInputCallback = undefined;
};

//not sure if states are needed yet...
/*TerminalProgram.prototype.STATE = {
    STARTED: 0,
};*/


// start the program.
TerminalProgram.prototype.start = function () {
    terminal.clear();
}

TerminalProgram.prototype.processUserInput = function () {
    console.log("processing user input");
    this.stopUserInputMode();
}

TerminalProgram.prototype.startUserInputMode = function (callback) {
    this.userInputStartCursorRow = terminal.cursorRow;
    this.userInputStartCursorCol = terminal.cursorCol;
    this.userInputMode = true;
    this.userInputCallback = callback;
}

TerminalProgram.prototype.stopUserInputMode = function () {
    var userInput = '';
    this.userInputMode = false;
    //execute callback with input from user
    for (var i = this.userInputStartCursorCol; i < terminal.cursorCol; i++) {
        userInput = userInput + terminal.charbuffer[this.userInputStartCursorRow][i].char;
    }
    this.userInputCallback(userInput);
    //single row? from userInputStartCursorCol to where cursor is now.
}