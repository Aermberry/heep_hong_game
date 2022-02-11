
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
}