import BasicButton from './BasicButton';

export default class StartButton extends BasicButton {
  constructor(scene, x, y, children) {
    super(scene, x, y, children)

    this.scene = scene;
    let sprite = scene.add.sprite(0, 0, 'strBtn')
    this.create(sprite, this.onClick.bind(this))

  }

  onClick() {

    this.scene.scene.start('Game')

  }

  down(clickEvent) {
    this.scene.sound.play('buttonEffectSound');
    this.origSprite.setFrame(1);
    this._setFullScreen(this.scene);
    super.down(clickEvent)
  }

  _setFullScreen() {
    const fullscreenConfig = { navigationUI: 'hide' }

    const elem = document.querySelector('#game-container canvas');
    if (elem.requestFullscreen) {
      elem.requestFullscreen(fullscreenConfig);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(fullscreenConfig);
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen(fullscreenConfig);
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(fullscreenConfig);
    }
  }
}