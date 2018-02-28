
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = cc.director._winSizeInPoints.width;
        this.node.setPosition(
            0,
            (cc.director._winSizeInPoints.height - this.node.height) / 2
        );
        this.node.children[0].setPosition(-this.node.width / 2, 0);
    },

    start () {

    },

    // update (dt) {},
});
