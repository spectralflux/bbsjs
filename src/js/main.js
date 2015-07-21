//global variables
var game, term, termTextView;

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
        fill: 'orange',
        align: 'left',
        lineHeight: 19
    };

    term = new Terminal(80, 25);
    term.addLine('BAD `N` RAD BBS v0.01');
    term.addLine('---------------------');
    term.addLine('---------------------');
    term.addLine('---------------------');
    term.addLine('---------------------');
    term.addLine('---------------------');

    console.log(term.cursorCol);
    console.log(term.cursorRow);

    term.moveLinesUp(15);
    termTextView = game.add.text(0, 0, '', style);
    termTextView.setText(term.getFormattedBuffer());
}

function update() {
    termTextView.setText(term.getFormattedBuffer());
}