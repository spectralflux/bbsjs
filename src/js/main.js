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
    game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
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
        lineHeight: 19
    };

    terminal = new Terminal(80, 18);

    termTextView = game.add.text(0, 0, '', style);
    termTextView.setText(terminal.getFormattedBuffer());
    termTextView.tint = 0xFFFFFF; //0xAAAAAA;

    //set booter program running
    terminalProgram = new Booter();
    terminalProgram.start();
    document.onkeydown = terminalProgram.keyCheck;
    game.input.keyboard.addCallbacks(this, null, null, terminalProgram.keyPress);

}

function update() {
    termTextView.setText(terminal.getFormattedBuffer());
}