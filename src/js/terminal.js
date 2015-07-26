/** terminal.js
 *
 * The terminal itself, and associated objects.
 */

/* Terminal character object. */
var TerminalChar = function (char, fgcolor, bgcolor) {
    this.char = char;
    this.fgcolor = fgcolor;
    this.bgcolor = bgcolor;
    this.isCursor = false;
    this.isFlashing = false; //flashing will alternate char from foreground color to background color.
};


/* Terminal object. */
var Terminal = function (width, height) {
    var i, j;
    this.width = width; //cols
    this.height = height; //rows
    this.cursorCol = 0; //position of cursor
    this.cursorRow = 0; //position of cursor
    this.cursorChar = '_';
    this.blankChar = '';
    this.charbuffer = undefined;
    this.clear();

};

Terminal.prototype.setCursorPosition = function (row, col) {
    var newRow,
        newCol,
        prevRow = this.cursorRow,
        prevCol = this.cursorCol;

    if (col < 0) {
        newCol = 0;
    } else if (col >= this.width) {
        newCol = this.width - 1;
    } else {
        newCol = col;
    }

    if (row < 0) {
        newRow = 0;
    } else if (row >= this.height) {
        newRow = this.height - 1;
    } else {
        if ((row < this.height - 1) && (col >= this.width)) {
            //cursor went over terminal width, carriage return
            newRow = row + 1;
            /*        } else if ((col === 0) && (row > 0)) {
                        //at start of line, go back to last char in previous line
                        newRow = row - 1;
                        newCol = this.width - 1;*/
        } else {
            newRow = row;
        }
    }

    this.charbuffer[prevRow][prevCol].isCursor = false;
    this.charbuffer[newRow][newCol].isCursor = true;
    this.cursorCol = newCol;
    this.cursorRow = newRow;
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
        terminalCharArray.push(new TerminalChar(this.blankChar, constants.BLACK, constants.BLACK));
    }

    this.moveLinesUp(1);
    this.charbuffer[this.charbuffer.length - 1] = terminalCharArray;

    this.setCursorPosition(this.height - 1, 0);

    for (i = 0; i < charArray.length; i++) {
        this.addChar(charArray[i]);
    }

    //    this.setCursorPosition(this.height - 1, charArray.length);
};

// Add a new char at cursor, move cursor one along
Terminal.prototype.addChar = function (char) {
    this.charbuffer[this.cursorRow][this.cursorCol] = new TerminalChar(char, constants.BLACK, constants.BLACK);
    this.setCursorPosition(this.cursorRow, this.cursorCol + 1);
}

Terminal.prototype.deleteChar = function () {
    this.charbuffer[this.cursorRow][this.cursorCol] = new TerminalChar(this.blankChar, constants.BLACK, constants.BLACK);
    this.setCursorPosition(this.cursorRow, this.cursorCol - 1);
}

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
    this.setCursorPosition(this.cursorRow - numLines, this.cursorCol);
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
        line.push(new TerminalChar(this.blankChar, constants.BLACK, constants.BLACK));
    }
    return line;
};

Terminal.prototype.clear = function () {
    this.charbuffer = [];
    for (i = 0; i < this.height; i++) {
        this.charbuffer.push([]);
        for (j = 0; j < this.width; j++) {
            this.charbuffer[i].push(new TerminalChar(this.blankChar, constants.BLACK, constants.BLACK));
        }
    }
    this.setCursorPosition(0, 0);
};