var game;

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


function main () {
	game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var testTerm = new Terminal(80, 25);
	console.warn(testTerm.charbuffer[0][1]);
	console.warn(testTerm.charbuffer.length);
	console.warn(testTerm.charbuffer[0].length);
}

function preload () {



}

function create () {

	var style = {
        font: "19px VT323",
        fill: 'orange',
        align: 'left',
        lineHeight: 19
    };

    var text = game.add.text(0, 0, '\nBAD `N` RAD BBS v0.01\nfff\nabcdefghijklmnopqrstuvwxyz0123456789\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 8\n 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 ', style);

    //text.anchor.set(0.5);
}

function update() {
}
