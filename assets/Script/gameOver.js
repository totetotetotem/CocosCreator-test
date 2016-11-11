var count = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        count = 0;
    },
    
    onKeyDown: function (event) {
        if(count == 500) {
            cc.director.loadScene('battle');
        }
    },
    
    update: function(dt) {
        if(count < 500) {
            console.log(count);
            count += 1;
        }
    }
});
