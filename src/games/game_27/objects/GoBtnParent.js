import Phaser from 'phaser'
export default class GoBtnParent extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children)
        this.origSprite = null
        this.clickEvent = null
    }

    create(sprite, clickEvent) {
        this.origSprite = sprite;
        this.add(this.origSprite)
        this.clickEvent = clickEvent;
        this.origSprite.setInteractive({
            useHandCursor: true
        })
            .on('pointerdown', this.down.bind(this, clickEvent));
    }

    out() {
        this.origSprite.setFrame(0)
    }

    isEnable(bool) {
        if (bool) {
            this.origSprite.setInteractive({
                useHandCursor: true
            })
                .on('pointerdown', this.down.bind(this, this.clickEvent));
        } else {
            this.origSprite.disableInteractive()
        }
    }

    down(clickEvent) {
        this.origSprite.setFrame(0)
        if (typeof clickEvent == 'function') {
            setTimeout(() => {
                clickEvent()
            }, 500)
        }
    }

    goFullscreen() {

        const fullscreenConfig = { navigationUI: 'hide' }

        const elem = document.querySelector('#game-container canvas');
        if (elem.requestFullscreen) {
            elem.requestFullscreen(fullscreenConfig);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(fullscreenConfig);
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(fullscreenConfig);
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(fullscreenConfig);
        }

    }

    goFullscreenOnClick() {

        this.origSprite.on('pointerup', this.goFullscreen.bind(this))

    }

}
