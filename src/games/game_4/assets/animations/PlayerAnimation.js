
/**
        * 
        * @param {Phaser.Animations.AnimationManager} anims 
        */
export const createPlayerAnimation = (anims) => {
    anims.create({
        key: 'playerOnPlayingAnimation',
        delay: 200,
        frames: anims.generateFrameNames('playerOnPlayingTexture', { prefix: 'player_on_playing_', start: 0, end: 41, zeroPad: 4 }),
        frameRate: 24,
        repeat: -1
    });
}