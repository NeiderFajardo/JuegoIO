GameState.Instrucciones = function(game) { };
GameState.Instrucciones.prototype = {
	create: function() {
		//AQUÍ IRÍAN LAS INSTRUCCIONES, SI LAS TUVERAAA :'v
	},
	startGame: function() {
        //CAMBIO DE ESTADO A JUEGO
		this.game.state.start('Juego');
	}
};