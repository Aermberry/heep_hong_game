export default class TweenAnimation {

    constructor() { }

    static currentTweenAnimation = null;


    /**
            * 
            * @param {Phaser.scene} scene 
            * @param {Phaser.GameObjects.GameObject} target
            */
    static playFallingTweenAnimation(scene, target, y, duration) {
        return this.currentTweenAnimation = scene.add.tween({
            targets: target,
            y: y,
            duration: duration,
            ease: 'Power2'
        });
    }

    /**
           * 
           * @param {Phaser.scene} scene 
           * @param {Phaser.GameObjects.GameObject} target
           */
    static playMovingToTargetTweenAnimation(scene, target, distanceX, distanceY, duration) {
        this.currentTweenAnimation = scene.tweens.createTimeline(
            {
                targets: target,
                ease: 'Power2',
                duration: duration,
                tweens: [
                    {
                        x: distanceX,
                    },

                    {
                        y: distanceY

                    }
                ]
            });
    }


    /**
            * 
            * @param {Phaser.scene} scene 
            * @param {Phaser.GameObjects.GameObject} target
            */
    static playHorizontalDirectionTweenAnimation(scene, target, positionX, duration, completeCallback) {
        this.currentTweenAnimation = scene.tweens.add({
            targets: target,
            x: positionX,
            duration: duration,
            ease: 'Power2',
            onComplete: completeCallback
        })
    }
}