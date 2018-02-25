"use strict";
cc._RF.push(module, 'ed047WLG2hBQqS5U5CNp17T', 'Player');
// scripts/Player.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function playJumpSound() {
        cc.audioEngine.play(this.jumpAudio, false);
    },

    setInputControl: function setInputControl() {
        var self = this; // es5的通病，希望cc能早日全面支持es6
        // 键盘监听
        // cc.eventManager.addListener({
        //     event: cc.EventListener.KEYBOARD,

        //     onKeyPressed: function (keyCode, event) {
        //         switch (keyCode) {
        //             case cc.KEY.a:
        //                 self.accLeft = true;
        //                 self.accRight = false;
        //                 break;
        //             case cc.KEY.d:
        //                 self.accLeft = false;
        //                 self.accRight = true;
        //                 break;
        //         }
        //     },

        //     onKeyReleased: function (keyCode, event) {
        //         switch (keyCode) {
        //             case cc.KEY.a:
        //                 self.accLeft = false;
        //                 break;
        //             case cc.KEY.d:
        //                 self.accRight = false;
        //                 break;
        //         }
        //     }
        // }, self.node);

        this.joyStick.on('VirtualStick', function (event) {
            // console.log(event.detail.moveVector.x);
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
    },

    start: function start() {},
    update: function update(dt) {
        // console.log(this.accLeft, this.accRight);
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