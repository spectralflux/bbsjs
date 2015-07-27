/**
Object representing a piece of "software" running on the bbs terminal platform
*/

var TerminalProgram = function () {
    this.userInputStartCursorRow = undefined;
    this.userInputStartCursorCol = undefined;
    this.userInputMode = false;
    this.userInputCallback = undefined;
};

// start the program.
TerminalProgram.prototype.start = function () {
    terminal.clear();
}

TerminalProgram.prototype.processUserInput = function () {
    console.log("processing user input");
}

TerminalProgram.prototype.startUserInputMode = function (callback) {
    this.userInputStartCursorRow = terminal.cursorRow;
    this.userInputStartCursorCol = terminal.cursorCol;
    this.userInputMode = true;
    this.userInputCallback = callback;
}

TerminalProgram.prototype.stopUserInputMode = function () {
	this.userInputMode = false;
	//execute callback with data from user
	//single row? from userInputStartCursorCol to where cursor is now.
}