
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createTutorAnimation = (anims) => {
    anims.create({
        key: 'tutorAnimation',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture', { prefix: 'tutor_', start: 0, end: 15, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
    anims.create({
        key: 'tutorAnimation01',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture01', { prefix: 'tutor_', start: 0, end: 39, zeroPad: 4 }),
        repeat: 0
    });
    anims.create({
        key: 'tutorAnimation02',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture02', { prefix: 'tutor_', start: 0, end: 39, zeroPad: 4 }),
        repeat: 0
    });
    anims.create({
        key: 'tutorAnimation03',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture03', { prefix: 'tutor_', start: 0, end: 39, zeroPad: 4 }),
        repeat: 0
    });
}