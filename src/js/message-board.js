/**

*/

var MessageBoard = function () {
    TerminalProgram.call(this);
};
MessageBoard.prototype = Object.create(TerminalProgram.prototype);
MessageBoard.prototype.constructor = MessageBoard;

MessageBoard.prototype.start = function () {
    terminal.clear();
    terminal.addLine("Message Board");
    terminal.addLine("-------------------------------------");
    terminal.moveLinesUp(terminal.height - 2);
    terminal.newLine();
};