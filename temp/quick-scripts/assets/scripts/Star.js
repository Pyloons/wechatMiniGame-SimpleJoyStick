(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '648f3/1t6ROkYcvnRj5oGEu', 'Star', __filename);
// scripts/Star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,

        plusOne: {
            type: cc.Label,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //试验碰撞
        cc.director.getCollisionManager().enabled = true;
    },


    onCollisionEnter: function onCollisionEnter(other, self) {
        this.onPicked();
    },

    getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function onPicked() {
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    },

    start: function start() {},
    update: function update(dt) {
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 1;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        this.game.progressBar.progress = (this.node.opacity - 1) / 255;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Star.js.map
        