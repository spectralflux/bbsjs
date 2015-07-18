var game, term, termTextView;

game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
	
}

function preload () {
	term = new Terminal(80, 25);
	console.warn(term.charbuffer[0][1]);
	console.warn(term.charbuffer.length);
	console.warn(term.charbuffer[0].length);

	var style = {
        font: "19px VT323",
        fill: 'orange',
        align: 'left',
        lineHeight: 19
    };

    termTextView =  game.add.text(0, 0, '', style);
	
}

function create () {
//'\nBAD `N` RAD BBS v0.01\nfff\nabcdefghijklmnopqrstuvwxyz0123456789\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 8\n 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 '
	var line1 = 'BAD `N` RAD BBS v0.01';
	term.addLine(line1);


}

function update() {
	termTextView.setText(term.getFormattedBuffer());
}
