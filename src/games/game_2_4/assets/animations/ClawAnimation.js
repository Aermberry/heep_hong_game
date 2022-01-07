
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createClawAnimation = (anims) => {
    anims.create({
        key: 'clawAnimationStretch',
        delay: 200,
        frames: anims.generateFrameNames('clawTexture', { prefix: 'claw_', start: 0, end: 10, zeroPad: 4 }),
        frameRate: 12,
        repeat: 0
    });

    anims.create({
        key: 'clawAnimationTakeBack',
        delay: 200,
        frames: anims.generateFrameNames('clawTexture', { prefix: 'claw_', start: 10, end: 18, zeroPad: 4 }),
        frameRate: 12,
        repeat: 0
    });
}