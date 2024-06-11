
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createLionLeftRecorderAnimation = (anims) => {
    anims.create({
        key: 'lionLeftRecorderAnimation',
        delay: 200,
        frames: anims.generateFrameNames('lionLeftRecorderTexture', { prefix: 'lion_left_recorder_', start: 0, end: 21, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
}