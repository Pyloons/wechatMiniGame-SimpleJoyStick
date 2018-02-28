"use strict";
cc._RF.push(module, '354a0Ac4c5Nab/rDo1gAjH2', 'StartScene');
// scripts/StartScene.js

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

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.preloadScene('Scenes/game');
        cc.director.pause();
    },
    startNow: function startNow() {
        if (cc.director.isPaused()) {
            cc.director.resume();
            cc.director.loadScene('Scenes/game');
        }
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();