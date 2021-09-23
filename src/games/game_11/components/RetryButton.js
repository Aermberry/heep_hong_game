import BasicButton from './BasicButton'

export default class RetryBtn extends BasicButton {

    constructor(scene, x, y, targetScene) {
        super(scene, x, y)

        let sprite = scene.add.sprite(0, 0, 'rplBtn')
        this.targetScene = targetScene;
        this.create(sprite, this.onClick.bind(this))
    }

    onClick() {
        this.scene.scene.start(this.targetScene);
    }

    down(clickEvent) {
        this.origSprite.setFrame(1)
        super.down(clickEvent)
    }
}