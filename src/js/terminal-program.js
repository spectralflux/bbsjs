/**
Object representing a piece of "software" running on the bbs terminal platform
*/

var TerminalProgram = function () {
    this.userInputStartCursorRow = undefined;
    this.userInputStartCursorCol = undefined;
    this.userInputMode = false;
};

// start the program.
TerminalProgram.prototype.start = function () {
    terminal.clear();
}

TerminalProgram.prototype.processUserInput = function () {
    console.log("processing user input");
}

TerminalProgram.prototype.startUserInputMode = function () {
    this.userInputStartCursorRow = terminal.cursorRow;
    this.userInputStartCursorCol = terminal.cursorCol;
    this.userInputMode = true;
}

TerminalProgram.prototype.stopUserInputMode = function () {}