GameState.Precargador = function (game) { };
GameState.Precargador.prototype = {
    //CARGA TODOS LOS ELEMENTOS DEL JUEGO
    preload: function () {
        this.progressbarE = this.add.sprite((GameState._WIDTH - 297) * 0.5, (GameState._HEIGHT - 145) * 0.5, 'progressbarE');
        this.progressbarF = this.add.sprite((GameState._WIDTH - 158) * 0.5, (GameState._HEIGHT - 50) * 0.5, 'progressbarF');
        this.load.setPreloadSprite(this.progressbarF);

        //FONDO Y TEXTO
        this.load.image('screen-mainmenu', 'assets/fondo-menu.gif');
        this.load.image('screen-sky', 'assets/sky.gif');
        this.load.image('island', 'assets/isla.gif');
        this.load.image('title', 'assets/titulo1.png');

        //Imagenes de las escenas
        this.load.image('E1','assets/E-1.png');
        //BOTONES
        this.load.image('button-pause', 'assets/button-pause.png');

        //SPRITESHEETS
        this.load.spritesheet('button-start', 'assets/button-start1.png', 286, 84);
        this.load.spritesheet('airplane', 'assets/airplane.png', 150, 100, 10);
        this.load.spritesheet('humo', 'assets/humo.png', 77, 77, 3);
    },
    create: function () {
        //CAMBIO DE ESTADO AL MENU
        this.game.state.start('Menu');
    }
};