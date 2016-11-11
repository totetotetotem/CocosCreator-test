var count = 0;
var effectCount = 0;
var actionNow = false;
cc.Class({
    extends: cc.Component,

    //TODO このめちゃ長いproperties、必要無いものはcc.findとか使ってなんとかする
    properties: {
        cursor: {
            default: null,
            type: cc.Node
        },
        thunder: {
            default: null,
            type: cc.Node
        },
        blizad: {
            default: null,
            type:cc.Node
        },
        actionNameArea: {
            default: null,
            type:cc.Node
        },
        actionName: {
            default: null,
            type:cc.Label
        },
        enemyHPLabel: {
            default: null,
            type:cc.Label
        },
        playerHPLabel: {
            default: null,
            type:cc.Label
        },
        enemyDamageLabel: {
            default: null,
            type:cc.Label
        },
        enemyDamageLabelNode: {
            default: null,
            type:cc.Node
        },
        playerDamageLabelNode: {
            default: null,
            type:cc.Node
        },
        enemyActionLabelArea: {
            default: null,
            type:cc.Node
        },
        enemyHP: 30000,
        playerHP: 300
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.enemyHPLabel.string = this.enemyHP;
        this.playerHPLabel.string = this.playerHP;
        count = 0;
        effectCount = 0;
        actionNow = false;
        this.schedule(this.enemyAttack, 5);
        this.repeat=true;
    },
    
    onKeyDown: function (event) {
            switch(event.keyCode) {
                case cc.KEY.up:
                    this.moveCursor(1);
                    break;
                case cc.KEY.down:
                    this.moveCursor(-1);
                    break;
                case cc.KEY.space:
                    if(count == 130 && actionNow === false) {
                        count = 0;
                        this.doAction();
                    }
                    break;
            }
    },
    
    moveCursor: function(dir) {
        console.log(Math.round(this.cursor.y * 10) /10.0 + dir*0.4);
        console.log(dir);
        if(Math.round(this.cursor.y*10)+ 4 * dir >= -2 && Math.round(this.cursor.y * 10) + 4 * dir <= 6) {
            this.cursor.y += 0.4 * dir;
            this.cursor.y = Math.round(this.cursor.y*10) /10.0;
        }
    },

    doAction: function() {
        console.log(Math.round(this.cursor.y * 10));
        var damage;
        switch(Math.round(this.cursor.y * 10)) {
            case 6:
                //TODO このへんのやつ関数になげる
                console.log("blizad");
                this.blizad.active = true;
                this.actionNameArea.active = true;
                this.actionName.string = "ブリザド";
                damage = 400;
                this.enemyHP -= damage;
                if(this.enemyHP < 0) this.enemyHP = 0;
                this.enemyDamageLabel.string = damage;
                this.enemyHPLabel.string = this.enemyHP;
                break;
            case 2:
                console.log("thunder");
                this.thunder.active = true;
                this.actionNameArea.active = true;
                this.actionName.string = "サンダー";
                damage = 300
                if(Math.random() > 0.7) {
                    damage *= 2;
                }
                this.enemyHP -= damage;
                if(this.enemyHP < 0) this.enemyHP = 0;
                this.enemyDamageLabel.string = damage;
                this.enemyHPLabel.string = this.enemyHP;
                break;
            case -2:
                console.log("cure");
                actionNow = true;
                cc.find('Canvas/Cure').getComponent(cc.Animation).play();
                this.actionNameArea.active = true;
                this.actionName.string = "やくそう";
                this.playerHP += 100;
                if(this.playerHP > 300) this.playerHP = 300;
                this.playerHPLabel.string = this.playerHP;
                this.scheduleOnce(function(){
                    this.actionNameArea.active = false;
                    actionNow = false;
                }, 0.5);
                break;
        }
    },
    
    enemyAttack: function() {
            while(actionNow) {
                cc.delayTime(0.1);
            }
            actionNow = true;
            var stoneAnimation = cc.find('Canvas/StoneEdge').getComponent(cc.Animation);
            this.enemyActionLabelArea.active = true;
            stoneAnimation.play();
            this.playerDamageLabelNode.active = true;
            this.scheduleOnce(function(){
                this.enemyActionLabelArea.active = false;
                }, 0.3)
            this.scheduleOnce(function(){
                this.playerHP -= 200;
                if(this.playerHP < 0) this.playerHP = 0;
                this.playerHPLabel.string = this.playerHP;            
                this.playerDamageLabelNode.active = false;   
                actionNow = false;
            }, 0.5);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.thunder.active || this.blizad.active) {
            actionNow = true;
            effectCount += 1;
            if(effectCount > 60) {
                this.actionNameArea.active = false;
                this.thunder.active = false;
                this.blizad.active = false;
                effectCount = 0;
                this.enemyDamageLabelNode.active = true;
                this.scheduleOnce(function(){
                    this.enemyDamageLabelNode.active = false;
                    actionNow = false;
                }, 0.5);
            }
        }
        if(this.enemyHP === 0) {
            cc.find('Canvas/behemoth').rotation = 270;
            actionNow = true;
            this.scheduleOnce(function() {
                cc.director.loadScene('GameClear');
            }, 2);
        }
        if(this.playerHP === 0) {
            cc.find('Canvas/alice').rotation = 90;
            actionNow = true;
            this.scheduleOnce(function() { 
                cc.director.loadScene('GameOver');
            }, 1);
        }
        if(count < 130) {
            count += 1;
        }
    },
});