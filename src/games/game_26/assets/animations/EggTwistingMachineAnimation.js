
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
 export const createEggTwistingMachineAnimation = (anims) => {
    anims.create({
        key: 'eggTwistingMachineAnimation',
        delay: 200,
        frames: anims.generateFrameNames('eggTwistingMachineTexture', { prefix: 'eggTwistingMachine_', start: 0, end: 19, zeroPad: 4 }),
        frameRate: 2,
    });
}