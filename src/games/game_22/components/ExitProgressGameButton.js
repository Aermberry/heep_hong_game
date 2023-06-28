import BasicButton from './BasicButton';

export default class ExitProgressGameButton extends BasicButton {
  constructor(scene, x, y, children) {

    super(scene, x, y, children);

    this.scene = scene;
    let sprite = scene.add.sprite(0, 0, 'gameProgressExitBtn').setScale(0.8);
    this.create(sprite, this.onClick.bind(this))

  }

  onClick() {
    window.history.back();
  }

  down(clickEvent) {

    this.scene.sound.play('buttonEffectSound');
    this.origSprite.setFrame(1);

    super.down(clickEvent)
  }
}