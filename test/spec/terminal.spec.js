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
    });

    it("should have correct width on initialization", function () {
        expect(terminal.width).toEqual(width);
    });

    it("should have correct height on initialization", function () {
        expect(terminal.height).toEqual(height);
    });

    it("should add lines to bottom of buffer", function () {
        terminal.addLine(testLine);
        var outLines = terminal.getFormattedBuffer().split('\n');

        // not sure I like that last buffer line has a \n char...
        expect(outLines[outLines.length -2]).toEqual(testLine);
    });

});