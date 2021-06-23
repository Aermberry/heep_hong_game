import Phaser from 'phaser'

export default {
  type: Phaser.CANVAS,
  width: '100%',
  height: '100%',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};