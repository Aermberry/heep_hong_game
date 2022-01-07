import Phaser from 'phaser'
import TweenAnimation from './TweenAnimation';

export default class ClawBox extends Phaser.GameObjects.Container {

    constructor(scene, point) {

        super(scene, point.x, point.y);
        scene.add.existing(this);
        
        this.init(scene);
    }

    init(scene) {
        this.texture = scene.add.image(0, 0, 'clawTexture');
        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.add([this.texture]);
    }

    showAppearanceAnimation() {
        TweenAnimation.PlayClawBoxAppearanceAnimation(this)
    }
}