import Phaser from 'phaser'
import TweenAnimation from './TweenAnimation'
import { ClipTweenAnimationStatus } from './ClipTweenAnimationStatus';


export default class Clip extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, dolls) {

        super(scene, x, y, 'clipTexture');
        // super(scene, x, y);

        this.currentTweenAnimation = null;
        this.currentAnimationState = ClipTweenAnimationStatus.IdleAnimationStatus
        this.setName('Clip');

        scene.add.existing(this);

        this.setToPhysics(scene);
        this.setScale(0.9);

        this.playAnimation("clip_idleStateAnimation");

        this.init(scene, dolls)
    }

    init(scene, dolls) {
        this.on('onCollided', this.onCollideHandler, this);
        this.setColliderDetection(scene, dolls)
    }

    setToPhysics(scene) {
        scene.physics.add.existing(this);
    }

    onCollideHandler(gameObject) {
        console.log(gameObject)
    }

    setColliderDetection(scene, gameDollList) {
        gameDollList.forEach(doll => {
            let collider = scene.physics.add.collider(this, doll, (clip, doll) => {
                scene.time.addEvent({
                    delay: 80,
                    callback: () => {
                        scene.physics.world.removeCollider(collider);

                        clip.currentTweenAnimation.pause();
                        scene.sound.play('clipClampEffectSound');
                        clip.playAnimation("clip_clipStateAnimation");

                        let container = scene.add.container(0, 0, [clip, doll]).setName('onSandwiched');
                        // scene.physics.add.existing(container);
                        this.emit('onCollided', container);
                    }
                })
            })
        });
    }


    playAnimation(animationKey) {
        this.anims.play(animationKey)
    }

    stopAnimation() {
        this.anims.stop();
    }

    playTweenAnimation(tweenAnimation, scene, config) {

        switch (tweenAnimation) {
            case ClipTweenAnimationStatus.FallingTweenAnimationStatus:

                this.currentAnimationState = ClipTweenAnimationStatus.FallingTweenAnimationStatus;

                this.currentTweenAnimation = TweenAnimation.playFallingTweenAnimation(scene, config.target, config.y, config.duration);

                break;
            case ClipTweenAnimationStatus.MovingTweenAnimationStatus:

                this.currentAnimationState = ClipTweenAnimationStatus.MovingTweenAnimationStatus;

                TweenAnimation.playMovingToTargetTweenAnimation(scene, config.target, config.x, config.y, config.duration);
                break;
            default:
                break;
        }
    }
}