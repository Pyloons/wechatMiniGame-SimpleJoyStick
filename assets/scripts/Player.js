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

    setJumpAction: function () {
        let deltaPosUp = cc.p(0, this.jumpHeight);
        let deltaPosDown = cc.p(0, -this.jumpHeight);
        let jumpUp = cc.moveBy(this.jumpDuration, deltaPosUp).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration, deltaPosDown).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        let jumpUpForm = cc.scaleTo(0.03, 1, 1.1);
        let jumpDownForm = cc.scaleTo(0.04, 1, 0.9);
        let normalForm = cc.scaleTo(0.03, 1, 1);
        return cc.repeatForever(
            cc.sequence(
                jumpUp,
                jumpUpForm,
                normalForm,
                jumpDownForm,
                jumpDown,
                jumpDownForm,
                normalForm,
                jumpUpForm,
                callback
            )
        );
    },

    playJumpSound: function () {
        cc.audioEngine.play(this.jumpAudio, false);
    },

    setInputControl: function () {
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

    onLoad: function () {
        this.node.runAction(this.setJumpAction());

        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;

        this.setInputControl();

        //试验碰撞
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function (other, self) {
        var otherName = other.node.name;
        if (otherName == 'wall-left' || otherName == 'wall-right') {
            if (this.xSpeed > 0) {
                this.xSpeed = -this.xSpeed;
            } else {
                this.xSpeed = -this.xSpeed;
            }
        }
    },

    start() {

    },

    update(dt) {
        if (this.accLeft) {
            this.xSpeed -= this.acceleration * dt;
        } else if (this.accRight) {
            this.xSpeed += this.acceleration * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
    },
});