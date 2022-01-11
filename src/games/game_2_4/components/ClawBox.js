import Phaser from 'phaser'
import TweenAnimation from './TweenAnimation';

export default class ClawBox extends Phaser.GameObjects.Container {

    constructor(scene, point, eggQuestion) {

        super(scene, point.x, point.y);
        scene.add.existing(this);

        this.init(scene, eggQuestion);
    }

    init(scene, eggQuestion) {
        this.texture = scene.add.image(0, 0, 'clawTexture');
        this.setSize(this.texture.displayWidth, this.texture.displayHeight);
        eggQuestion.setPosition(0, 0)

        this.add([eggQuestion, this.texture]);
    }

    showAppearanceAnimation() {
        TweenAnimation.PlayClawBoxAppearanceAnimation(this)
    }
}