
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createClipAnimations = (anims) => {
    anims.create({
        key: 'clip_idleStateAnimation',
        delay: 200,
        frames: anims.generateFrameNames('clipTexture', { prefix: 'clip_1', start: 0, end: 0, zeroPad: 4 }),
        frameRate: 2,
    });
    anims.create({
        key: 'clip_clipStateAnimation',
        frames: anims.generateFrameNames('clipTexture', { prefix: 'clip_1', start: 0, end: 14, zeroPad: 4 }),
        frameRate: 24,
    });

    anims.create({
        key: 'clip_looseStateAnimation',
        delay: 200,
        frames: anims.generateFrameNames('clipTexture', { prefix: 'clip_1', start: 14, end: 29, zeroPad: 4 }),
        frameRate: 10,
    });
}