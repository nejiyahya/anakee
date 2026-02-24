WebFontConfig = {
  custom: {
    families: ['MICHELIN-BLACK'],
    urls: ["https://neji-portfolio.42web.io/anakee/assets/css/font.css"]
  }
};

var LeaderboardState = {
    preload: function() {
        // this.lang = getCookie('language');
        
        if(this.lang == '' || this.lang == undefined || this.lang == null){
            this.lang = "ind";
        }

        this.env = "development";

        engine.game.load.image('kotak_biru', 'assets/images/kotak_biru.png');
        engine.game.load.image('bg_leaderboard', 'assets/images/bg-leaderboard.png');
        engine.game.load.image('btn_done', 'assets/images/done_'+this.lang+'.png');
        engine.game.load.image('btn_play_again', 'assets/images/play_again_'+this.lang+'.png');
    },
    gameResized: function(manager, bounds){
        var scale = Math.min(window.innerHeight / engine.game.height);
        manager.setUserScale(scale, scale, 0, 0);
        engine.game.scale.pageAlignVertically = true;            
        engine.game.scale.pageAlignHorizontally = true; 
    },
    create: function() {
        var self = this;
        engine.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        engine.game.scale.setResizeCallback(this.gameResized, this);

        engine.game.camera.setPosition(-10,0);
        engine.game.world.setBounds(-10, 0, engine.game.width, engine.game.height);
        engine.game.physics.startSystem(Phaser.ARCADE);
        var bg_leaderboard = engine.game.add.tileSprite(-10, 0, engine.game.width, engine.game.height, 'bg_leaderboard');
        bg_leaderboard.fixedToCamera = true;


        var btn_done = engine.game.add.sprite(70,engine.game.height-50,'btn_done');
        btn_done.anchor.set(0.5);
        btn_done.inputEnabled = true;
        btn_done.fixedToCamera = true;
        btn_done.events.onInputDown.add(function(){
            engine.game.state.start('menu');
        });

        var btn_play_again = engine.game.add.sprite(engine.game.width-80,engine.game.height-50,'btn_play_again');
        btn_play_again.anchor.set(0.5);
        btn_play_again.inputEnabled = true;
        btn_play_again.fixedToCamera = true;
        btn_play_again.events.onInputDown.add(function(){
            engine.game.state.start('game');
        });

        var txt = "";
        if(this.lang == "eng"){
            txt = "yeay! you get\n"+engine.score+" points";
        }
        else{
            txt = "yeay! kamu mendapatkan\npoint "+engine.score;
        }

        var wording = engine.game.add.text((engine.game.width/2)-20, 515, txt);
        wording.anchor.set(0.5);
        wording.align = 'center';
        wording.font = 'Arial';
        wording.fontSize = 15;
        wording.fontWeight = 'italic';
        wording.fontVariant = 'small-caps';
        wording.fill = '#FFFFFF';
        wording.setShadow(0, 0, 'rgba(0,0,0,.3)', 5);

        var dummyData = [{"name":"tes 1","point":"100"},{"name":"tes 2","point":"100"},{"name":"tes 3","point":"100"},{"name":"tes 4","point":"100"},{"name":"tes 5","point":"100"},{"name":"tes 6","point":"100"},{"name":"tes 7","point":"100"},{"name":"tes 8","point":"100"},{"name":"tes 9","point":"100"},{"name":"tes 10","point":"100"}]
        console.log(self.env)
        if(self.env === "production"){
             $.ajax({
                type: 'POST',
                url: engine.options.base_url+"app/api.php",
                crossDomain: true,
                data: {
                    type:"public",
                    act:"top_5",
                    game:'Play Game Anakee'
                },
                success: function(responseData, textStatus, jqXHR) {
                    self.setLeaderboard(responseData["data"]);     
                }
            });
        }
        else if(self.env === "development"){
            self.setLeaderboard(dummyData);
        }
    },
    setLeaderboard: function(data){
        var self = this;
        
         var dummyMyScore = {"name":"tes 11","total_point":"100"};

         if(self.env == "production"){
            $.ajax({
                type: 'POST',
                url: engine.options.base_url+"app/api.php",
                crossDomain: true,
                data: {
                    type:"public",
                    act:"total_point",
                    lead_id:atob(getCookie('xkjtk4'))
                },
                success: function(responseData, textStatus, jqXHR) {
                    if(data){
                        var count = (data.length<5)?data.length:5;
                        self.applyLeaderboard(data,0,count,80,responseData);

                        if(data.length>5){
                            self.applyLeaderboard(data,count,data.length,245,responseData);
                        }
                    }
                }
            });
         }
         else if(self.env == "development"){
            if(data){
                var count = (data.length<5)?data.length:5;
                this.applyLeaderboard(data,0,count,80,dummyMyScore);

                if(data.length>5){
                    this.applyLeaderboard(data,count,data.length,245,dummyMyScore);
                }
            }
         }

    },
    isRank: function(data,myData){
        if(data["name"]==myData["name"] && data["point"]==myData["total_point"]){
            return true;
        }
        else{
            return false;
        }
    },
    setMyScore: function(data){
        
        var posY = 455;

        var bg = engine.game.add.sprite(engine.game.world.centerX,posY-1,'kotak_biru');
        bg.anchor.set(0.5);
        bg.fixedToCamera = true;

        var tmp_name = (data["name"]!="")?data["name"]:((this.lang=="ind")?"saya":"me");
        var tmp_point = (data["total_point"]!="")?data["total_point"]:engine.score;

        var my_name = engine.game.add.text((engine.game.width/2)-20, posY, tmp_name);
        my_name.anchor.set(0.5);
        my_name.align = 'center';
        my_name.font = 'Arial';
        my_name.fontSize = 15;
        my_name.fontWeight = 'italic';
        my_name.fontVariant = 'small-caps';
        my_name.fill = '#FFFFFF';
        my_name.setShadow(0, 0, 'rgba(0,0,0,.3)', 5);

        var my_score = engine.game.add.text((engine.game.width/2)-20, posY+30, tmp_point);
        my_score.anchor.set(0.5);
        my_score.align = 'center';
        my_score.font = 'Arial Black';
        my_score.fontSize = 15;
        my_score.fontWeight = 'bold';
        my_score.fill = '#FFF200';
        my_score.setShadow(0, 0, 'rgba(0,0,0,.8)', 5);
    },

    applyLeaderboard: function(data,start,end,posX,myScore){
        var posY=100;
        var flag = true;
        var self = this;

        for (var i = start; i<end; i++) {
            posY+=5;
            var name = engine.game.add.text(posX, posY, data[i]["name"]);
            name.anchor.set(0.5);
            name.align = 'center';
            name.font = 'Arial';
            name.fontSize = 15;
            name.fontWeight = 'italic';
            name.fontVariant = 'small-caps';
            name.fill = '#FFFFFF';
            name.setShadow(0, 0, 'rgba(0,0,0,.3)', 5);

            var score = engine.game.add.text(posX, posY+30, data[i]["point"]);
            score.anchor.set(0.5);
            score.align = 'center';
            score.font = 'Arial Black';
            score.fontSize = 15;
            score.fontWeight = 'bold';
            score.fill = '#FFF200';
            score.setShadow(0, 0, 'rgba(0,0,0,.8)', 5);

            if(this.isRank(data[i],myScore)){
                flag = false;
            }

            posY+=64;
        }

        if(flag){
            self.setMyScore(myScore);
        }
    },
    update: function() {
         
    }
};