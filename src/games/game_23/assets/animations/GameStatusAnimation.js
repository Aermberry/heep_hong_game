
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
 export const createGameStatusAnimations = (anims) => {
    anims.create({
        key: 'gameSuccessAnimation',
        delay: 200,
        frames: anims.generateFrameNames('gameSuccessTexture', { prefix: 'game_success_status_0', start: 0, end: 24, zeroPad: 4 }),
    });

    anims.create({
        key: 'gameFailAnimation',
        delay: 200,
        frames: anims.generateFrameNames('gameFailTexture', { prefix: 'game_fail_status_1', start: 0, end: 24, zeroPad: 4 }),
    });
}