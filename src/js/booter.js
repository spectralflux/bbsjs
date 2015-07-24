/**
Boot program for BBS, subclass of TerminalProgram
    - login
    - main menu
    - logout
*/

var Booter = function (terminal) {
    TerminalProgram.call(this, terminal);
};
Booter.prototype = Object.create(TerminalProgram.prototype);
Booter.prototype.constructor = Booter;

Booter.prototype.start = function () {
    this.terminal.clear();
    this.terminal.addLine("BBS v0.0.1");
    this.terminal.addLine("----------");
    this.terminal.moveLinesUp(this.terminal.height - 2);
}