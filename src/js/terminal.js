/** terminal.js
 *
 * The terminal itself, and associated objects.
 */


/* Terminal character object. */
var TerminalChar = function (char, fgcolor, bgcolor) {
    this.char = char;
    this.fgcolor = fgcolor;
    this.bgcolor = bgcolor;
    this.isFlashing = false; //flashing will alternate char from foreground color to background color.
};


/* Terminal object. */
var Terminal = function (width, height) {
    var i, j;   
    this.width = width;
    this.height = height;

    // initialize terminal char buffer (i.e. current screen)
    this.charbuffer = [];
    for (i = 0; i < this.height; i++) {
        this.charbuffer.push([]);
        for (j = 0; j < this.width; j++) {
            this.charbuffer[i].push(new TerminalChar('', constants.BLACK, constants.BLACK));
        }
    }
    var sdfsdf = 0;
};

// Add a new line (as a string) to bottom of buffer
Terminal.prototype.addLine = function (line) {
    var i;
    if (line.length > this.width) {
        console.error('Line length is too large.');
    }
    var charArray = line.split('');
    var terminalCharArray = [];
    for (i = 0; i < this.width; i++) {
        if (i < charArray.length) {
            terminalCharArray.push(new TerminalChar(charArray[i], constants.BLACK, constants.BLACK));
        } else {
            terminalCharArray.push(new TerminalChar('', constants.BLACK, constants.BLACK));
        }
    }
    this.moveLinesUp(1);
    this.charbuffer[this.charbuffer.length -1] = terminalCharArray;
};

// Move all lines up, lines at top will be wiped.
Terminal.prototype.moveLinesUp = function (numLines) {
    var i;
    for (i = 0; i < this.height; i++) {
        if (i + numLines < this.height) {
            this.charbuffer[i] = this.charbuffer[i+numLines];
        } else {
            this.charbuffer[i] = this.getBlankLine();
        }
    }
};

Terminal.prototype.getFormattedBuffer = function () {
    var i, j;
    var outputString = '';
    for (i = 0; i < this.height; i++) {
        for (j = 0; j < this.width; j++) {
            outputString = outputString + this.charbuffer[i][j].char;
        }
        outputString = outputString + '\n';
    }
    return outputString;
};

Terminal.prototype.getBlankLine = function () {
    var i;
    var line = [];
    for (i = 0; i < this.width; i++) {
        line.push(new TerminalChar('', constants.BLACK, constants.BLACK));
    }
    return line;
};

