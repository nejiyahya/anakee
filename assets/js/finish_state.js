var FinishState = {
    preload: function() {
        engine.game.load.image('bg_result', 'assets/images/result.png');
        engine.game.load.image('btn_mulai_lagi', 'assets/images/btnMulaiLagi.png');
        engine.game.load.image('btn_selesai', 'assets/images/btnSelesai.png');
    },
    create: function() {
        engine.game.camera.setPosition(0,0);
        engine.game.world.setBounds(0, 0, engine.game.width, engine.game.height);
        engine.game.physics.startSystem(Phaser.ARCADE);
        var bg_result = engine.game.add.tileSprite(0, 0, engine.game.width, engine.game.height, 'bg_result');
        bg_result.fixedToCamera = true;

        var btn_mulai_lagi = engine.game.add.sprite(engine.game.world.centerX,engine.game.height-200,'btn_mulai_lagi');
        btn_mulai_lagi.anchor.set(0.5);
        btn_mulai_lagi.inputEnabled = true;
        btn_mulai_lagi.fixedToCamera = true;
        btn_mulai_lagi.events.onInputDown.add(function(){
            engine.game.state.start('game');
        });

         var btn_selesai = engine.game.add.sprite(engine.game.world.centerX,engine.game.height-120,'btn_selesai');
        btn_selesai.anchor.set(0.5);
        btn_selesai.inputEnabled = true;
        btn_selesai.fixedToCamera = true;
        btn_selesai.events.onInputDown.add(function(){
            engine.game.state.start('leaderboard');
        });


        text = engine.game.add.text(engine.game.world.centerX, 250, engine.score);
        text.anchor.set(0.5);
        text.align = 'center';

        text.font = 'Arial Black';
        text.fontSize = 100;
        text.fontWeight = 'bold';
        text.fill = '#FFF200';

        text.setShadow(0, 0, 'rgba(0,0,0,.6)', 8);
       
    },
    update: function() {
         
    }
};