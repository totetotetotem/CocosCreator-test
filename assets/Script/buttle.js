var count = 0;
var effectCount = 0;
cc.Class({
    extends: cc.Component,

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
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
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
                if(count == 300) {
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
        switch(Math.round(this.cursor.y * 10)) {
            case 6:
                console.log("thunder");
                this.thunder.active = true;
                this.actionNameArea.active = true;
                break;
            case 2:
                console.log("blizad");
                this.blizad.active = true;
                break;
            case -2:
                break;
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.thunder.active || this.blizad.active) {
            effectCount += 1;
            if(effectCount > 100) {
                this.thunder.active = false;
                this.blizad.active = false;
                effectCount = 0;
            }
        }
        if(count < 300) {
            count += 1;
        }
    },
});
