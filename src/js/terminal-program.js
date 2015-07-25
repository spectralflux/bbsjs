/**
Object representing a piece of "software" running on the bbs terminal platform
*/

var TerminalProgram = function () {};

// start the program.
TerminalProgram.prototype.start = function () {
    terminal.clear();
}

TerminalProgram.prototype.keyPress = function keyPress(char) {
    terminal.addChar(char);
}

// capture non-char keys
TerminalProgram.prototype.keyCheck = function keyCheck() {
    var KeyID = event.keyCode;
    switch (KeyID) {
    case 8:
        terminal.deleteChar();
        break;
    case 46:
        terminal.deleteChar();
        break;
    default:
        break;

        //also of possible use is enter - code=13
    }
}