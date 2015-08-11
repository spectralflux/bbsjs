//global variables
var game, terminal, termTextView, terminalProgram;

//load web fonts
window.WebFontConfig = {
    google: {
        families: ['VT323']
    },

    active: function () {
        main();
    }
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

function main() {
    game = new Phaser.Game(640, 480, Phaser.AUTO, 'container', {
        preload: preload,
        create: create,
        update: update
    });
}

function preload() {

}

function create() {

    var style = {
        font: "19px VT323",
        fill: '#FF9100',
        align: 'left',
        lineHeight: 12
    };

    terminal = new Terminal(80, 18);

    termTextView = game.add.text(0, 0, '', style);
    termTextView.setText(terminal.getFormattedBuffer());
    termTextView.tint = 0xFFFFFF; //0xAAAAAA;

    document.onkeydown = keyCheck;
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    //set booter program running
    loadProgram(new Booter());


}

function update() {
    termTextView.setText(terminal.getFormattedBuffer());
}

function keyPress(char) {
    terminal.addChar(char);
}

// capture non-char keys
function keyCheck() {
    var KeyID = event.keyCode;
    switch (KeyID) {
    case 8:
        event.preventDefault();
        terminal.deleteChar();
        break;
    case 46:
        event.preventDefault();
        terminal.deleteChar();
        break;
    case 13:
        event.preventDefault();
        terminalProgram.processUserInput();
        break;
    default:
        break;

        //also of possible use is enter - code=13
    }
}

function loadProgram(programObject) {
    terminalProgram = programObject;
    terminalProgram.start();
}