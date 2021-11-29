import BasicButton from './BasicButton';

export default class LeftMoveButton extends BasicButton {
  constructor(scene, x, y, gameObject) {

    super(scene, x, y);

    this.gameObject = gameObject;
    // this.allowableMovingDistance = step;
    this.gameObjectOriginPosition = { "x": gameObject.x, "y": gameObject.y }
    this.step = 30
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
    console.log(this.gameObject.x);

    console.log('停在这里')
    // this.gameObject.setX(this.gameObject.x + 50);
    if (this.gameObject.x < 0) {
      // this.gameObject.x = this.gameObject.x + 100;
      this.scene.tweens.add({
        targets: this.gameObject,
        x: 0,
        duration: 1500,
        ease: 'Power2',
      })
    }
    // this.gameObject.x = this.gameObject.x - 50;

    // this.scene.tweens.add({
    //   targets: this.gameObject,
    //   x: this.gameObject.x - 20,
    //   duration: 1500,
    //   ease: 'Power2',
    // });
    // var currentPosition = { "x": this.gameObject.x, "y": this.gameObject.y };
    // this.gameObject.bg_low_long.x = (this.gameObject.x - 20);
    // if (Math.abs(this.gameObject.x - this.step - this.gameObjectOriginPosition.x) <= this.allowableMovingDistance) {

    //   this.gameObject.setX(this.gameObject.x - this.step);
    // }

  }
}