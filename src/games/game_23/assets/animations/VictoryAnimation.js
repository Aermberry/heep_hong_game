
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createVictoryAnimations = (anims) => {
    anims.create({
        key: 'victoryAnimation',
        delay: 200,
        frames: anims.generateFrameNames('victoryTexture', { prefix: 'victory', start: 0, end: 16, zeroPad: 4 }),
        repeat: 0,
    });
}