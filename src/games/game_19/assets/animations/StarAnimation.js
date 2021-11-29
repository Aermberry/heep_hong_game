
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createStarAnimations = (anims) => {
    anims.create({
        key: 'star_idleStateAnimation',
        delay: 200,
        frames: anims.generateFrameNames('starTexture', { prefix: 'star', start: 0, end: 14, zeroPad: 4 }),
        frameRate: 2,
        repeat: -1,
    });
}