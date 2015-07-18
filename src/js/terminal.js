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
    for (i = 0; i < this.width; i++) {
        this.charbuffer[i] = [];
        for (j = 0; j < this.height; j++) {
            this.charbuffer[i][j] = new TerminalChar('', [0, 0, 0], [0, 0, 0]);
        }
    }
};

