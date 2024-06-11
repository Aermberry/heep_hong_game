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
    console.log(this.gameObject.x);

    console.log('停在这里')
    // this.gameObject.setX(this.gameObject.x + 50);
    if (this.gameObject.x < 0) {
      // this.gameObject.x = this.gameObject.x + 100;
      this.scene.tweens.add({
        targets: this.gameObject,
        x: 0,
        duration: 500,
        ease: 'Power2',
      })
    }

  }
}