
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createStarAnimation = (anims) => {
    anims.create({
        key: 'starAnimation',
        delay: 200,
        frames: anims.generateFrameNames('starTexture', { prefix: 'star_', start: 0, end: 14, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
}