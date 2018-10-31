//ESTE ES EL QUE MANEJA LOS NIVELES
GameState.Introduccion = function (game) { };
GameState.Introduccion.prototype = {
	create: function () {
		//DECLARAMOS TIPO DE LETRA Y TODO ESO PARA EL CONTADOR Y EL PUNTAJE
		this.timer = 0;

		//CARGAMOS EL FONDO Y EL SPRITE DEL AVIÓN
		this.screen = this.add.sprite(0, 0, 'screen-sky');
		this.airplane = this.add.sprite(150, 300, 'airplane');
		//this.airplane.scale.setTo(-1,1);
		this.humo = this.add.sprite(145, 300, 'humo');
		this.humo.visible = false;

		this.airplane.animations.add('volar', [0, 1, 2, 3, 4]);
		this.airplane.animations.add('rayo', [0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]);
		this.humo.animations.add('smoke');

		this.airplane.animations.play('volar', 10, true);

		//PUSE UN BOTONSITO DE PAUSA PORQUE ESTABA DESPARCHADO :V
		this.pauseButton = this.add.button(GameState._WIDTH - 8, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1, 0);
		this.pauseButton.input.useHandCursor = true;

		//INICIAMOS EL TECLADO PARA JUGAR
		this.keys = this.game.input.keyboard.createCursorKeys();

		//ARRANCA EL TIEMPO 
		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this)

	},
	//LE PONEMOS PAUSA
	managePause: function () {
		this.game.paused = true;
		var pausedText = this.add.text(GameState._WIDTH * 0.5, 250, "Game paused,\ntap anywhere to continue.", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function () {
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	},
	//ACTUALIZAMOS EL CONTADOR DE TIEMPO
	updateCounter: function () {
		this.timer++;
	},
	update: function () {
		//AQUI CREAN EN MI QUE CADA QUE HAGAMOS ALGO VAMOS DEPENDIENDO DE LLAMAMOS LA FUNCIÓN FINISHLEVEL Y CAMBIA DE LVL
		if (this.timer == 3) {
			this.airplane.animations.play('rayo', 10, true);
		}
		else if (this.timer == 5) {
			this.airplane.animations.play('volar', 10, true);
			this.humo.visible = true;
			this.humo.animations.play('smoke', 10, true);
		} 
		else if(this.timer == 7) {
			this.screen.destroy();
			this.screen = this.add.sprite(0, 0, 'island');
		}
	},
	render: function () {
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.hole);
	}
};