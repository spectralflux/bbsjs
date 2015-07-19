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
    this.width = width; //rows
    this.height = height; //cols
    this.cursor = [0, 0]; //position of cursor
    this.cursorChar = new TerminalChar('_', constants.BLACK, constants.BLACK);
    this.charbuffer = undefined;
    this.clear();

};

Terminal.prototype.setCursorPosition = function (row, col) {
    var newRow, newCol;

    if (row < 0) {
        newRow = 0;
    } else if (row >= this.width) {
        newRow = this.width - 1;
    } else {
        newRow = row;
    }

    if (col < 0) {
        newCol = 0;
    } else if (col >= this.height) {
        newCol = this.height - 1;
    } else {
        if ((col < this.height - 1) && (row >= this.width)) {
            //cursor went over terminal width, carriage return
            newCol = col + 1;
        } else {
            newCol = col;
        }
    }

    /*    
        if (row < this.width) {
            if (col < this.height) {
                newRow = row;
            } else {
                newRow = 0;
                newCol = col + 1;
            }
        } else {
            newRow = this.width - 1;
        }
        if (col < this.height) {
            newCol = col;
        } else {
            newCol = this.height - 1;
        }*/
    /*   newCol = 0;
      newRow = 21;*/
    this.charbuffer[newCol][newRow] = this.cursorChar;
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
    this.charbuffer[this.charbuffer.length - 1] = terminalCharArray;

    //set cursor position
    this.setCursorPosition(charArray.length, this.charbuffer.length - 1);
};

// Move all lines up, lines at top will be wiped.
Terminal.prototype.moveLinesUp = function (numLines) {
    var i;
    for (i = 0; i < this.height; i++) {
        if (i + numLines < this.height) {
            this.charbuffer[i] = this.charbuffer[i + numLines];
        } else {
            this.charbuffer[i] = this.getBlankLine();
        }
    }
    //set cursor position
    this.setCursorPosition(this.cursor[0], this.cursor[1] - numLines);
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

Terminal.prototype.clear = function () {
    this.charbuffer = [];
    for (i = 0; i < this.height; i++) {
        this.charbuffer.push([]);
        for (j = 0; j < this.width; j++) {
            this.charbuffer[i].push(new TerminalChar('', constants.BLACK, constants.BLACK));
        }
    }
    this.setCursorPosition(0, 0);
};