
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createPenguinAnimation = (anims) => {
    anims.create({
        key: 'penguinIdle',
        delay: 200,
        frames: anims.generateFrameNames('penguinTexture', { prefix: 'penguin_', start: 0, end: 14, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });

    anims.create({
        key: 'penguinFallDown',
        delay: 200,
        frames: anims.generateFrameNames('penguinTexture', { prefix: 'penguin_', start: 15, end: 18, zeroPad: 4 }),
        frameRate: 4,
        repeat: -1
    });
}