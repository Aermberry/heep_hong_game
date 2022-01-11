export default class TweenAnimation {

    constructor() { }

    static currentTweenAnimation = null;
    static _tweenAnimationConfigure = null;



    static setTweenAnimation(configure) {
        this._tweenAnimationConfigure = configure;
    }

    static play(scene) {
        return this.currentTweenAnimation = scene.tweens.timeline(this._tweenAnimationConfigure)
    }
}