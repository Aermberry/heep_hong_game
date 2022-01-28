
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createTutorAnimations = (anims) => {
    anims.create({
        key: 'tutor01Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor01Texture', { prefix: 'tutor_step_1', start: 0, end: 14, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor02Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor02Texture', { prefix: 'tutor_step_2', start: 0, end: 9, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor03Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor03Texture', { prefix: 'tutor_step_3', start: 0, end: 29, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor04Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor04Texture', { prefix: 'tutor_step_4', start: 0, end: 16, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor05Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutor05Texture', { prefix: 'tutor_step_5', start: 0, end: 16, zeroPad: 4 }),
        repeat: 0,
    });
}