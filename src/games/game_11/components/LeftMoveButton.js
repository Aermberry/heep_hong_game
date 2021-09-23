import BasicButton from './BasicButton';

export default class LeftMoveButton extends BasicButton {
  constructor(scene, x, y, gameObject, step) {

    super(scene, x, y);
    this.gameObject = gameObject;
    this.allowableMovingDistance = step * 3;
    this.gameObjectOriginPosition = { "x": gameObject.x, "y": gameObject.y }
    this.step = step
    this.create(scene.add.sprite(0, 0, 'moveBtn', 0).setScale(0.5),
      this.onClick.bind(this))

  }

  onClick() {
    this.moveToLeft()
  }

  /**
     * 往左移动
      */
  moveToLeft() {
    // this.gameObject.setDisplayOrigin(this.gameObject.displayOriginX + 100, this.gameObject.displayOriginY)
    console.log(this.allowableMovingDistance);
    console.log(this.x);
    console.log(this.y);
    console.log(this.gameObject);

    // var currentPosition = { "x": this.gameObject.x, "y": this.gameObject.y };

    if (Math.abs(this.gameObject.x - this.step - this.gameObjectOriginPosition.x) <= this.allowableMovingDistance) {
      this.gameObject.setX(this.gameObject.x - this.step);
    }

  }
}