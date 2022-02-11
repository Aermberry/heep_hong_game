
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createEndAnimation = (anims) => {
    anims.create({
        key: 'endAnimation',
        delay: 200,
        frames: anims.generateFrameNames('endTexture', { prefix: 'end_', start: 0, end: 23, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
}