import BasicButton from './BasicButton';

export default class StartButton extends BasicButton {
  constructor(scene, x, y, children) {
    super(scene, x, y, children)

    this.scene=scene;
    let sprite = scene.add.sprite(0, 0, 'strBtn')
    this.create(sprite, this.onClick.bind(this))

  }

  onClick() {
    this.scene.sound.play('buttonEffectSound');
    this.scene.scene.start('Game')

  }

  down(clickEvent) {
    this.origSprite.setFrame(1)
    super.down(clickEvent)
  }
}