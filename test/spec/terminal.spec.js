describe("Terminal", function () {
    var terminal,
        width,
        height,
        testLine;

    beforeEach(function () {
        width = 80;
        height = 25;
        testLine = "testing!";
        terminal = new Terminal(width, height);
        terminal.clear();
    });

    it("should have correct width on initialization", function () {
        expect(terminal.width).toEqual(width);
    });

    it("should have correct height on initialization", function () {
        expect(terminal.height).toEqual(height);
    });

    it("should have the correct number of rows in the charbuffer", function () {
        expect(terminal.charbuffer.length).toEqual(height);
    });

    it("should have the correct number of columns in the charbuffer", function () {
        expect(terminal.charbuffer[0].length).toEqual(width);
    });

    it("should add lines to bottom of buffer", function () {
        terminal.addLine(testLine);
        var outLines = terminal.getFormattedBuffer().split('\n');

        // not sure I like that last buffer line has a \n char...
        expect(outLines[outLines.length - 2]).toEqual(testLine);
    });

    it("should be blank after clear()", function () {
        var nonBlankCharCount = 0;
        terminal.charbuffer[0][0] = new TerminalChar('A', constants.BLACK, constants.BLACK);
        terminal.clear();
        for (var i = 0; i < terminal.charbuffer.length; i++) {
            for (var j = 0; j < terminal.charbuffer[i].length; j++) {
                if (terminal.charbuffer[i][j].char !== terminal.blankChar) {
                    nonBlankCharCount++;
                }
            }
        }
        expect(nonBlankCharCount).toEqual(0);
    });

    it("should be able to add a single character at the location of the cursor", function () {
        var cr = terminal.cursorRow;
        var cc = terminal.cursorCol;
        terminal.addChar('A');
        expect(terminal.charbuffer[cr][cc].char).toEqual('A');
    });

    it("should move cursor along one column after adding a char (if line isnt size of terminal width already)", function () {
        var cr = terminal.cursorRow;
        var cc = terminal.cursorCol;
        terminal.addChar('A');
        expect(terminal.cursorRow).toEqual(cr);
        expect(terminal.cursorCol).toEqual(cc + 1);
    });


    describe("Cursor", function () {

        it("should have exactly one cursor", function () {
            var cursorCount = 0;
            for (var i = 0; i < terminal.charbuffer.length; i++) {
                for (var j = 0; j < terminal.charbuffer[i].length; j++) {
                    if (terminal.charbuffer[i][j].isCursor) {
                        cursorCount++;
                    }
                }
            }
            expect(cursorCount).toEqual(1);
        });

        it("should be after the last char of new line if new line is smaller than terminal width", function () {
            terminal.addLine('123');
            expect(terminal.cursorRow).toEqual(terminal.height - 1);
            expect(terminal.cursorCol).toEqual(3); //? check out-by-one here

        });

        it("should go to the last char in previous line if deleting the first char of a line", function () {
            for (var i = 0; i < terminal.width; i++) {
                terminal.addChar('A');
            }
            terminal.addChar('A');
            terminal.deleteChar();
            terminal.deleteChar();
            expect(terminal.cursorRow).toEqual(0);
            expect(terminal.cursorCol).toEqual(terminal.width - 1);
        });

        it("should go to the first char of the next row if newLine() is called", function () {
            terminal.newLine();
            expect(terminal.cursorRow).toEqual(1);
            expect(terminal.cursorCol).toEqual(0);
        });

    });


});