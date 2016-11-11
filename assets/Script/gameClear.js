var count = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        flagLabel: {
            default: null,
            type: cc.Label
        },
       // flag: "TSG{Y0u_4r3_gr34t_ch34t4r}",
        flag: "ÌÊßâÁ©íÆ¬ë«Æÿë«­ìÆûñ«­ì­êä"
    },

    // use this for initialization
    onLoad: function () {
        var flagStr = "";
        var Key = [0x98, 0x99]
        for(var i = 0; i < this.flag.length; i++) {
            console.log(this.flag.charCodeAt(i) ^ Key[i % 2])
            flagStr += String.fromCharCode(this.flag.charCodeAt(i) ^ Key[i % 2]);
        }
        console.log(flagStr);
        this.flagLabel.string = flagStr;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        count = 0;
    },
    
    onKeyDown: function (event) {
        if(count == 100) {
            cc.director.loadScene('battle');
        }
    },
    
    update: function(dt) {
        if(count < 100) {
            console.log(count);
            count += 1;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
