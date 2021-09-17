import BasicButton from './BasicButton';

export default class RightMoveButton extends BasicButton {
  constructor(scene, x, y, gameObject) {

    super(scene, x, y);
    this.gameObject = gameObject;
    this.create(scene.add.sprite(0, 0, 'moveBtn', 1).setScale(0.5),
      this.onClick.bind(this))

  }

  onClick() {
    this.moveToRight()
  }

  /**
     * 往右移动
      */
  moveToRight() {
    // console.log(this.gameObject)
    // this.gameObject.setDisplayOrigin(this.gameObject.displayOriginX - 100, this.gameObject.displayOriginY)
    // this.gameObject.x = this.gameObject.x - 100;
    this.gameObject.setX(this.gameObject.x + 100);
  }


}