import BasicButton from './BasicButton';

export default class LeftMoveButton extends BasicButton {
  constructor(scene, x, y, gameObject) {

    super(scene, x, y);

    this.gameObject = gameObject;
    this.create(scene.add.sprite(0, 0, 'btnLt').setDisplaySize(120, 130),
      this.onClick.bind(this))

  }

  onClick() {
    this.moveToLeft()
  }

  /**
     * 往左移动
      */
  moveToLeft() {

    console.log('停在这里')
    if (this.gameObject.x < 0) {
      this.scene.tweens.add({
        targets: this.gameObject,
        x: 0,
        duration: 1500,
        ease: 'Power2',
      })
    }

  }
}