import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  //width: '100%',
  //height: '100%',
  width: 1920,
  height: 1080,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
  },
  audio: {
    disableWebAudio: true
  },
};