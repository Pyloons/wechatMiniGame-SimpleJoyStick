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
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        maxStarDuration: 0,
        minStarDuration: 0,

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;

        this.timer = 0;
        this.starDuration = 0;

        this.player.getComponent('Player').game = this;

        this.spawnNewStar();

        this.score = 0;
    },

    spawnNewStar: function () {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;

        var randDur = cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.starDuration = this.minStarDuration + randDur;
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var maxX = this.node.width / 2;
        var randX = cc.randomMinus1To1() * maxX;
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        return cc.p(randX, randY);
    },

    start() {

    },

    update(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    gainScore: function () {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        cc.audioEngine.play(this.scoreAudio, false);
    },

    gameOver: function () {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }
});