/**

*/

var MessageWriter = function () {
    TerminalProgram.call(this);
};
MessageWriter.prototype = Object.create(TerminalProgram.prototype);
MessageWriter.prototype.constructor = MessageWriter;

MessageWriter.prototype.start = function () {
    terminal.clear();
    terminal.addLine("Type /s on a new line to end message. (/q to quit without saving)");
    terminal.addLine("-------------------------------------");
    terminal.moveLinesUp(terminal.height - 2);
    terminal.newLine();
    this.startUserInputMode(this.parseMessageLine);
};

MessageWriter.prototype.parseMessageLine = function (line) {
    //check for /s or /q
    switch (line) {
    case "/q":
        loadProgram(new Booter());
        break;
    case "/s":
        loadProgram(new Booter());
        break;
    default:
        break;
    }
}