import Phaser from 'phaser'


export default {
  type: Phaser.AUTO,
  width: 720,
  height: 400,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
  },
};