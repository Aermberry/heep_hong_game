
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createTutorAnimations = (anims) => {
    anims.create({
        key: 'tutor_Animation',
        delay: 200,
        frames: anims.generateFrameNames('tutorTexture', { prefix: 'tut', start: 0, end: 39, zeroPad: 4 }),
        // frameRate: 20,
        repeat: -1,
    });
}