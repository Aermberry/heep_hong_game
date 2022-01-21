export default class TweenAnimation {

    constructor() { }

    static currentTweenAnimation = null;

    /* 
    eg:
    {
            targets: gameObject,
            ease: 'Bounce',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            loop: 0,
            tweens: [
                {
                    x: 400,
                    onComplete: () => {

                    }
                }],
            onComplete: () => {
            }
        }
     */
    
    static setTweenAnimation(configure) {
        this._tweenAnimationConfigure = configure;
    }


    /**
            * 
            * @param {Phaser.scene} scene 
            */
    static play(scene) {
        this.currentTweenAnimation = scene.tweens.timeline(this._tweenAnimationConfigure)
    }
}