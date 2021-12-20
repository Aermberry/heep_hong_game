
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createClipAnimations = (anims) => {
    anims.create({
        key: 'loadingTitleAnimation',
        delay: 200,
        frames: anims.generateFrameNames('loadingTitleTexture', { prefix: 'loadingTitle_', start: 0, end: 19, zeroPad: 4 }),
        frameRate: 2,
    });
}