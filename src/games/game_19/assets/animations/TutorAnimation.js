
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createTutorAnimations = (anims) => {
    anims.create({
        key: 'tutor01Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture01', { prefix: 'animationTutor_', start: 0, end: 39, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor02Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture02', { prefix: 'animationTutor_', start: 0, end: 39, zeroPad: 4 }),
        repeat: 0,
    });

    anims.create({
        key: 'tutor03Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture03', { prefix: 'animationTutor_', start: 0, end: 39, zeroPad: 4 }),
        repeat: 0,
    });
  
}