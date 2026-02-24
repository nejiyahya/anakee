var MenuState = {
    preload: function() {
        var lang = '';
        if(lang == '' || lang == undefined || lang == null){
            lang = "ind";
        }
        engine.game.load.image('background_menu', 'assets/images/menu_bg_'+lang+'.png');
        engine.game.load.image('btn_join', 'assets/images/btn_join.png');
    },
    gameResized: function(manager, bounds){
        var scale = Math.min(window.innerHeight / engine.game.height);
        manager.setUserScale(scale, scale, 0, 0);
        engine.game.scale.pageAlignVertically = true;            
        engine.game.scale.pageAlignHorizontally = true; 
    },
    create: function() {

        engine.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        engine.game.scale.setResizeCallback(this.gameResized, this);

        engine.game.camera.setPosition(0,0);

        var bg_menu = engine.game.add.tileSprite(-10, 0, engine.game.width, engine.game.height, 'background_menu');
        
        var btn_join = engine.game.add.sprite(engine.game.world.centerX,engine.game.height-100,'btn_join');
        btn_join.anchor.set(0.5);
        btn_join.inputEnabled = true;
        btn_join.fixedToCamera = true;
        btn_join.events.onInputDown.add(this.listener);
    },
    listener: function(){
        engine.game.state.start('game');
    },
    update: function() {

    }
};