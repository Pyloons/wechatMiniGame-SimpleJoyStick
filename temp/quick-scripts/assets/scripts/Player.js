(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ed047WLG2hBQqS5U5CNp17T', 'Player', __filename);
// scripts/Player.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        screenWidth: 0,
        //主角跳跃高度
        jumpHeight: 0,
        //跳跃持续时间
        jumpDuration: 0,
        maxMoveSpeed: 0,
        acceleration: 0,

        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },

        joyStick: {
            default: null,
            type: cc.Node
        }
    },

    setJumpAction: function setJumpAction() {
        var deltaPosUp = cc.p(0, this.jumpHeight);
        var deltaPosDown = cc.p(0, -this.jumpHeight);
        var jumpUp = cc.moveBy(this.jumpDuration, deltaPosUp).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, deltaPosDown).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        var jumpUpForm = cc.scaleTo(0.03, 1, 1.1);
        var jumpDownForm = cc.scaleTo(0.04, 1, 0.9);
        var normalForm = cc.scaleTo(0.03, 1, 1);
        return cc.repeatForever(cc.sequence(jumpUp, jumpUpForm, normalForm, jumpDownForm, jumpDown, jumpDownForm, normalForm, jumpUpForm, callback));
    },

    playJumpSound: function playJumpSound() {
        cc.audioEngine.play(this.jumpAudio, false);
    },

    setInputControl: function setInputControl() {
        var self = this;

        this.joyStick.on('VirtualStick', function (event) {
            if (event.detail.moveVector.x < 0) {
                self.accLeft = true;
                self.accRight = false;
            } else if (event.detail.moveVector.x > 0) {
                self.accLeft = false;
                self.accRight = true;
            } else {
                self.accLeft = false;
                self.accRight = false;
            }
        });
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.runAction(this.setJumpAction());

        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;

        this.setInputControl();

        //试验碰撞
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        var otherName = other.node.name;
        if (otherName == 'wall-left' || otherName == 'wall-right') {
            if (this.xSpeed > 0) {
                this.xSpeed = -this.xSpeed;
            } else {
                this.xSpeed = -this.xSpeed;
            }
        }
    },

    start: function start() {},
    update: function update(dt) {
        if (this.accLeft) {
            this.xSpeed -= this.acceleration * dt;
        } else if (this.accRight) {
            this.xSpeed += this.acceleration * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
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
        //# sourceMappingURL=Player.js.map
        