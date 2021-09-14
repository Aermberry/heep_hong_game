import BasicButton from './BasicButton';

export default class LeftMoveButton extends BasicButton {
  constructor(scene, x, y, gameObject) {

    super(scene, x, y);
    console.log(gameObject)
    console.log('dsd');
    this.gameObject = gameObject;
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
    // this.scene.stageSlaver.setDisplayOrigin(this.scene.stageSlaverSprite.displayOriginX + 100, this.scene.stageSlaverSprite.displayOriginY)
    this.gameObject.setDisplayOrigin(this.gameObject.displayOriginX + 100, this.gameObject.displayOriginY)
  }
}