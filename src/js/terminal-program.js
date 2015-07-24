/**
Object representing a piece of "software" running on the bbs terminal platform
*/

var TerminalProgram = function (terminal) {
    this.terminal = terminal;
};

// start the program.
TerminalProgram.prototype.start = function () {
    this.terminal.clear();
}

/*function keyPress(char) {
    term.addChar(char);
}

// capture non-char keys
function KeyCheck() {
    var KeyID = event.keyCode;
    switch (KeyID) {
    case 8:
        alert("backspace");
        break;
    case 46:
        alert("delete");
        break;
    default:
        break;

        //also of possible use is enter - code=13
    }
}*/