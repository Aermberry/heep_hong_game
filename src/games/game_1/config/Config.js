import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  //width: '100%',
  //height: '100%',
  width: 1920,
  height: 1080,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  audio: {
    disableWebAudio: true
  },
};