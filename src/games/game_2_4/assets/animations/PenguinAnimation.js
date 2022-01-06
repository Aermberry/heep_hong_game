
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createPenguinAnimation = (anims) => {
    anims.create({
        key: 'penguinAnimation',
        delay: 200,
        frames: anims.generateFrameNames('penguinTexture', { prefix: 'penguin_', start: 0, end: 21, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
}