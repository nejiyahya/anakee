var Engine = function(options){
	this.options = {
		container : document.getElementById('container'),
		base_url : "",
		game : new Phaser.Game(360, window.height, Phaser.CANVAS, 'container', null, true, false)
	};

	$.extend(this.options, options);
	
	this.game = this.options.game;
	this.game.state.add('menu', MenuState);    
	this.game.state.add('game', GameState);   
	this.game.state.add('finish', FinishState);
	this.game.state.add('leaderboard', LeaderboardState);
	this.score = 0;
	this.game.state.start('menu');	
}