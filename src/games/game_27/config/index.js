import Phaser from 'phaser'


export default {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: { y: 0 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  audio: {
    disableWebAudio: true
  },
};