
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createClawAnimation = (anims) => {
    anims.create({
        key: 'clawAnimation',
        delay: 200,
        frames: anims.generateFrameNames('clawTexture', { prefix: 'claw_', start: 0, end: 18, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
}