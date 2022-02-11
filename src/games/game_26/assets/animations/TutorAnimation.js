
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
 export const createTutorAnimations = (anims) => {
    anims.create({
        key: 'tutor01Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor01Texture', { prefix: 'tutor_1', start: 0, end: 43, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor02Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor02Texture', { prefix: 'tutor_2', start: 0, end: 43, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor03Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor03Texture', { prefix: 'tutor_3', start: 0, end: 43, zeroPad: 4 }),
        repeat: 0,
    });
}