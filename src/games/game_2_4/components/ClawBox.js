import Phaser from 'phaser'
import TweenAnimation from './TweenAnimation';
// import EggQuestion from "../components/EggQuestion";

export default class ClawBox extends Phaser.GameObjects.Container {

    constructor(scene, point, eggQuestion) {

        super(scene, point.x, point.y);
        scene.add.existing(this);

        this.setName("ClawBox");

        this.init(scene, eggQuestion);
    }

    init(scene, eggQuestion) {

        this.texture = scene.add.image(0, 0, 'clawTexture').setName("clawTexture");
        this.eggQuestion = eggQuestion;
        // eggQuestion.setPosition(-200, 0);

        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.add([this.eggQuestion, this.texture]);
    }

    showAppearanceAnimation(x) {

        TweenAnimation.setTweenAnimation({
            targets: this,
            ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            loop: 0,
            tweens: [
                {
                    x: x,
                    onComplete: () => {

                    }
                }],
            onComplete: () => {
            }
        }
        );

        TweenAnimation.play(this.scene);
    }

    setFlipX() {
        
        this.texture.setFlipX(true);
        this.eggQuestion.getByName("background").setFlipX(true);
    }
}