import BasicButton from './BasicButton';

export default class RightMoveButton extends BasicButton {
  constructor(scene, x, y, gameObject, step) {

    super(scene, x, y);
    this.gameObject = gameObject;
    this.allowableMovingDistance = step ;
    this.gameObjectOriginPosition = { "x": gameObject.x, "y": gameObject.y }
    this.step = step;
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

    console.log(this.allowableMovingDistance);
    console.log(this.x);
    console.log(this.y);
    // this.gameObject.setX(this.gameObject.x + 100);

    if (Math.abs(this.gameObject.x + this.step - this.gameObjectOriginPosition.x) <= this.allowableMovingDistance) {
      this.gameObject.setX(this.gameObject.x + this.step);
    }
  }


}