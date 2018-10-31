//ESTE ES EL QUE MANEJA LOS NIVELES
GameState.Juego = function (game) { };
GameState.Juego.prototype = {
	create: function () {
		//DECLARAMOS TIPO DE LETRA Y TODO ESO PARA EL CONTADOR Y EL PUNTAJE
		this.fontSmall = { font: "16px Arial", fill: "#e4beef" };
		this.fontBig = { font: "24px Arial", fill: "#e4beef" };
		this.fontMessage = { font: "24px Arial", fill: "#e4beef", align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 5;

		//CARGAMOS EL FONDO Y EL SPRITE DEL AVIÓN
		this.screen = this.add.sprite(0, 0, 'screen-sky');
		this.airplane = this.add.sprite(GameState._WIDTH * 0.5, 90, 'airplane');

		this.airplane.animations.add('walk');

		this.airplane.animations.play('walk', 50, true);

		//PUSE UN BOTONSITO DE PAUSA PORQUE ESTABA DESPARCHADO :V
		this.pauseButton = this.add.button(GameState._WIDTH - 8, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1, 0);
		this.pauseButton.input.useHandCursor = true;

		//DECLARAMOS LOS CONTADORES NECESARIOS
		this.timerText = this.game.add.text(15, 15, "Time: " + this.timer, this.fontBig);
		this.levelText = this.game.add.text(120, 10, "Level: " + this.level + " / " + this.maxLevels, this.fontSmall);
		this.totalTimeText = this.game.add.text(120, 30, "Total time: " + this.totalTimer, this.fontSmall);

		//INICIAMOS LOS NIVELES, LOS MOSTRAMOS Y EL TECLADO PARA JUGAR
		this.initLevels();
		this.showLevel(1);
		this.keys = this.game.input.keyboard.createCursorKeys();

		//ARRANCA EL TIEMPO 
		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
	},
	initLevels: function () {
		//AQUI DEBEMOS DECLARAR LOS DIFERENTES NIVELES QUE TENEMOS, POR AHORA IGNOREN ESE CODIGO NO HACE NADA :v
		this.levels = [];
		//CADA NIVEL TIENE UNA INFORMACIÓN... PUES AQUÍ VA :p
		this.levelData = [
			[
				{ x: 96, y: 224, t: 'airplane' }
			],
			[
				{ x: 72, y: 320, t: 'w' },
				{ x: 200, y: 320, t: 'h' },
				{ x: 72, y: 150, t: 'w' }
			],
			[
				{ x: 64, y: 352, t: 'h' },
				{ x: 224, y: 352, t: 'h' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 200, y: 52, t: 'h' }
			],
			[
				{ x: 78, y: 352, t: 'h' },
				{ x: 78, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 192, y: 240, t: 'w' },
				{ x: 30, y: 150, t: 'w' },
				{ x: 158, y: 150, t: 'w' }
			],
			[
				{ x: 188, y: 352, t: 'h' },
				{ x: 92, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 256, y: 240, t: 'h' },
				{ x: 180, y: 52, t: 'h' },
				{ x: 52, y: 148, t: 'w' }
			]
		];
		//SE AÑADEN TODOS LOS NIVELES AL JUEGO
		for (var i = 0; i < this.maxLevels; i++) {
			var newLevel = this.add.group();
			newLevel.enableBody = true;
			newLevel.physicsBodyType = Phaser.Physics.ARCADE;
			//SE AÑADE LA INFORMACIÓN DE CADA NIVEL
			for (var e = 0; e < this.levelData[i].length; e++) {
				var item = this.levelData[i][e];
				newLevel.create(item.x, item.y, item.t);
			}
			//SE SETEA CADA NIVEL
			newLevel.setAll('body.immovable', true);
			newLevel.visible = false;
			this.levels.push(newLevel);
		}
	},
	//SE MUESTRA CADA NIVEL
	showLevel: function (level) {
		var lvl = level | this.level;
		if (this.levels[lvl - 2]) {
			this.levels[lvl - 2].visible = false;
		}
		this.levels[lvl - 1].visible = true;
	},
	//ACTUALIZAMOS EL CONTADOR DE TIEMPO
	updateCounter: function () {
		this.timer++;
		this.timerText.setText("Time: " + this.timer);
		this.totalTimeText.setText("Total time: " + (this.totalTimer + this.timer));
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
	update: function () {
		//AQUI CREAN EN MI QUE CADA QUE HAGAMOS ALGO VAMOS DEPENDIENDO DE LLAMAMOS LA FUNCIÓN FINISHLEVEL Y CAMBIA DE LVL
		if (this.keys.left.isDown) {
			//FUNCIONA MIERDA
		}
		else if (this.keys.right.isDown) {
			//FUNCIONA MIERDA
		}
		if (this.keys.up.isDown) {
			//FUNCIONA MIERDA
		}
		else if (this.keys.down.isDown) {
			//FUNCIONA MIERDA
		}
	},
	finishLevel: function () {
		//SI EL NIVEL ES MAYOR QUE EL NUMERO DE NIVELES PUES SE ACABO ESTO
		if (this.level >= this.maxLevels) {
			this.totalTimer += this.timer;
			alert('Congratulations, game completed!\nTotal time of play: ' + this.totalTimer + ' seconds!');
			this.game.state.start('Menu');
		}
		else {
			//SINO PUES CAMBIAMOS DE NIVEL
			alert('Congratulations, level ' + this.level + ' completed!');
			this.totalTimer += this.timer;
			this.timer = 0;
			this.level++;
			this.timerText.setText("Time: " + this.timer);
			this.totalTimeText.setText("Total time: " + this.totalTimer);
			this.levelText.setText("Level: " + this.level + " / " + this.maxLevels);
			this.ball.body.x = this.ballStartPos.x;
			this.ball.body.y = this.ballStartPos.y;
			this.ball.body.velocity.x = 0;
			this.ball.body.velocity.y = 0;
			this.showLevel();
		}
	},
	render: function () {
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.hole);
	}
};