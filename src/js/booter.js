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
    terminal.moveLinesUp(1);
    terminal.addLine("username: ");
    terminal.moveLinesUp(terminal.height - 4);
    this.startUserInputMode(this.getUserName);
};

Booter.prototype.getUserName = function (response) {
    this.welcome(response);
}

Booter.prototype.getMenuSelection = function (response) {

    switch (response) {
    case "q":
        this.quit();
        break;
    case "w":
        loadProgram(new MessageWriter());
        break;
    case "r":
        loadProgram(new MessageBoard());
        break;
    default:
        this.welcome("FIX ME");
        break;
    }

}

Booter.prototype.welcome = function (username) {
    terminal.clear();
    terminal.addLine("Welcome, " + username + "!");
    terminal.moveLinesUp(1);
    terminal.addLine("What would you like to do today?");
    terminal.moveLinesUp(1);
    terminal.addLine("[w] Write a message          [r] Read messages");
    terminal.addLine("[q] Log out");
    terminal.moveLinesUp(terminal.height - 7);
    terminal.newLine();
    this.startUserInputMode(this.getMenuSelection);
}

Booter.prototype.quit = function () {
    terminal.clear();
    terminal.addLine("Goodbye!");
    terminal.moveLinesUp(terminal.height - 1);
    terminal.newLine();
}