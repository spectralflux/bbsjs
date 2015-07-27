/**
Boot program for BBS, subclass of TerminalProgram
    - login
    - main menu
    - logout
*/

var Booter = function () {
    TerminalProgram.call(this);
};
Booter.prototype = Object.create(TerminalProgram.prototype);
Booter.prototype.constructor = Booter;

Booter.prototype.start = function () {
    terminal.clear();
    terminal.addLine("BBS v0.0.1");
    terminal.addLine("----------");
    terminal.getBlankLine();
    terminal.addLine("username: ");
    terminal.moveLinesUp(terminal.height - 3);
    this.startUserInputMode(this.getUserName());
};

Booter.prototype.getUserName = function () {

} 