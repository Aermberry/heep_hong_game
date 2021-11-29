export default class TweenAnimation{
    constructor(){

    }

     /**
            * 
            * @param {Phaser.scene} scene 
            * @param {Phaser.GameObjects.GameObject} target
            */
      static playHorizontalMoveTweenAnimation(scene, target, x, duration) {
        return this.currentTweenAnimation = scene.add.tween({
            targets: target,
            x: x,
            duration: duration,
            ease: 'Power2'
        });
    }
}