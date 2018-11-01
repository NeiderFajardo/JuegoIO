

GameState.dialogos = function (game) { };

var dialogo1 = ["ARTHUR: °No puedo creer que finalmente haya hecho este viaje,",
                "¿qué pensará Sophie de todo esto?°"];


var line = [];
var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 130;
var lineDelay = 400;

var g =
GameState.dialogos.prototype = {
    create: function () {
        this.screen = this.add.sprite(0, 0, 'screen-sky');
        this.ep1 = this.add.sprite(0, 0, 'E1');
        this.text = this.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });

        this.nextLine();

    },
    nextLine: function () {

    if (lineIndex === dialogo1.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = dialogo1[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.time.events.repeat(wordDelay, line.length, this.nextWord, this);

    //  Advance to the next line
    lineIndex++;

},

nextWord: function() {

    //  Add the next word onto the text string, followed by a space
    this.text.text = this.text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        this.text.text = this.text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        this.time.events.add(lineDelay, this.nextLine, this);
    }

},
    update: function(){
        if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            this.create();

        }
    }
}
