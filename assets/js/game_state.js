var GameState = {

    preload: function() {
        engine.game.load.pack('level1', 'pack.json', null, this);
        engine.game.load.physics("physicsData", "physics.json");
        engine.game.load.image('btnLeft', 'assets/images/btnLeft.png');
        engine.game.load.image('btnRight', 'assets/images/btnRight.png');
    },

    create: function() {
        var self = this;
        engine.score = 0;

        this.totalInView = 30;
        this.posDistance = 80;
        this.totalObstacle = 8;
        this.posY = engine.game.height/2;
        this.speed = 2;

        engine.game.camera.enableScrollDelta = false;
        engine.game.camera.lerp = new Phaser.Point(0, 1);

        engine.game.world.setBounds(0, 0, engine.game.width, this.totalInView+(this.posDistance*this.totalInView));
        this.checkHeight = engine.game.world.height-engine.game.height;
        engine.game.physics.startSystem(Phaser.Physics.P2JS);
        engine.game.physics.p2.gravity.y = 2000;
        engine.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        engine.game.physics.p2.world.setGlobalStiffness(1e5);

        this.keyLeft = this.keyRight = false;
        this.isFinish = false;
        
        this.bgGame = engine.game.add.tileSprite(0, 0, engine.game.width, engine.game.height, 'background');
        this.bgGame.fixedToCamera = true;



        this.player=engine.game.add.sprite(0,engine.game.height/2,'player');
        this.player.anchor.set(0,0);
        engine.game.physics.p2.enable(this.player,false);
        this.player.body.clearShapes();
        this.player.body.setCircle(15);
        this.player.body.gravity.y = 5000;
        this.player.body.damping = 0.5;
        this.player.smooth = true;
        this.player.cameraLerp = 0.1;
        this.player.smoothBounds = true;

        this.obstacles = engine.game.add.group();

        for (var i=1; i<=this.totalInView; i++) {
            this.createOneObstacle();
        }

        this.header = engine.game.add.sprite(engine.game.world.centerX,0,'header');
        this.header.anchor.set(0.5,0);
        this.header.fixedToCamera = true;

        this.footer = engine.game.add.sprite(engine.game.world.centerX,engine.game.height,'footer');
        this.footer.anchor.set(0.5,1);
        this.footer.fixedToCamera = true;

        this.btnLeft = engine.game.add.sprite(engine.game.world.centerX-70,engine.game.height-2,'btnLeft');
        this.btnLeft.anchor.set(0.5,1);
        this.btnLeft.inputEnabled = true;
        this.btnLeft.fixedToCamera = true;
        this.btnLeft.events.onInputDown.add(function(){
            self.keyLeft = true;
        });
         this.btnLeft.events.onInputUp.add(function(){
            self.keyLeft = false;
        });

        this.btnRight = engine.game.add.sprite(engine.game.world.centerX+70,engine.game.height-2,'btnRight');
        this.btnRight.anchor.set(0.5,1);
        this.btnRight.inputEnabled = true;
        this.btnRight.fixedToCamera = true;
        this.btnRight.events.onInputDown.add(function(){
            self.keyRight = true;
        });
         this.btnRight.events.onInputUp.add(function(){
            self.keyRight = false;
        });

        engine.game.time.events.loop(1000,this.countScore, this);
        this.cursors = engine.game.input.keyboard.createCursorKeys();
    },
    countScore: function(){
        engine.score+=1;
        if(engine.score%20 == 0){
            this.speed+=1;
        }
    },
    createOneObstacle: function(){
        var self = this;
        var rand = Math.floor(Math.random()*this.totalObstacle)+1;
        var obstacle = this.obstacles.create(engine.game.world.centerX,this.posY,'row-'+rand);
        obstacle.anchor.set(0.5,0.5);
        engine.game.physics.p2.enable(obstacle,false);
        obstacle.body.clearShapes();
        obstacle.body.loadPolygon('physicsData', 'row-'+rand);
        obstacle.body.static = true;
        obstacle.outOfBoundsKill = true;
        this.posY+=this.posDistance;
    },
    update: function() {
        var self = this;
        
        if(this.player.body.y>engine.game.camera.y+engine.game.height-200){
            engine.game.camera.setPosition(0,engine.game.camera.y+12);
            engine.game.camera.setSize(engine.game.width,engine.game.height);
        }
        else{
           engine.game.camera.setPosition(0,engine.game.camera.y+this.speed);
           engine.game.camera.setSize(engine.game.width,engine.game.height);
        }

        if(this.player.body.y-10<=engine.game.camera.y){
            self.gameOver();
        }


        var obj = this.obstacles.getFirstAlive();
        if(obj.body.y<engine.game.camera.y){
            obj.destroy();
            self.createOneObstacle();
        }
        if(this.checkHeight<engine.game.camera.y+engine.game.height){
            this.checkHeight+=engine.game.height;
            engine.game.world.setBounds(0, engine.game.camera.y, engine.game.width, this.totalInView+(this.posDistance*this.totalInView));
        }

        this.player.body.velocity.x = 0;
        this.player.body.angularVelocity = 0;
        if (this.cursors.left.isDown || this.keyLeft)
        {
            this.player.body.velocity.x = -200;
            this.player.body.angularVelocity = -20;
        }
        else if (this.cursors.right.isDown || this.keyRight)
        {
            this.player.body.angularVelocity = +20;
            this.player.body.velocity.x = 200;
        }
    }, 
    sendScore: function(){
        var self = this;

        // $.ajax({
        //     type: 'POST',
        //     url: engine.options.base_url+"app/api.php",
        //     crossDomain: true,
        //     data: {
        //         type:"public",
        //         act:"save_point",
        //         name:'Play Game Anakee',
        //         point:engine.score,
        //         action:'PlayGame',
        //         url:engine.options.base_url+'games/anakee',
        //         url_http_referrer:engine.options.base_url,
        //         label:'Game',
        //         lead_id:atob(getCookie('xkjtk4'))
        //     },
        //     success: function(responseData, textStatus, jqXHR) {
                engine.game.state.start('finish');
        //     },
        //     error: function (responseData, textStatus, errorThrown) {
        //         engine.game.state.start('finish'); 
        //     }
        // });
    },
    gameOver: function(player, othercars) {
        if(!this.isFinish){
            this.isFinish = true;
            this.sendScore();
        }
    }
};