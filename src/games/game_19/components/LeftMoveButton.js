import Phaser from 'phaser'
import TweenAnimation from './TweenAnimation';

export default class LeftMoveButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, gameObject, step) {

    super(scene, x, y);

    scene.add.existing(this);

    this.scene = scene;
    this.gameObject = gameObject;
    this.allowableMovingDistance = step+1250;
    this.gameObjectOriginPosition = { "x": gameObject.x, "y": gameObject.y }
    this.step = step

    this.texture = scene.add.sprite(0, 0, 'moveBtn', 0).setScale(0.5);
    // this.texture = scene.add.sprite(0, 0, 'leftButton',1).setScale(0.5);

    this.setSize(this.texture.width, this.texture.height);
    this.add(this.texture);

   this.enableTouchEventListener();
  }

  enableTouchEventListener(){
    this.setInteractive({ useHandCursor: true }).on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        // this.texture.setFrame(0);
        this.onDownClicked();
      }
    )
      .on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          // this.texture.setFrame(1);
          this.onUpClicked();
        }
      );
  }

  unableTouchEventListener() {
    this.disableInteractive();
    this.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
    this.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP);
  }

  onDownClicked() {
    this.scene.sound.play('buttonEffectSound');
    this.moveToLeft();
  }

  onUpClicked() {
  }

  /**
     * 往左移动
      */
  moveToLeft() {

    if (this.isEnableMove()) {
      // TweenAnimation.playHorizontalMoveTweenAnimation(this.scene, this.gameObject, this.gameObject.x - this.step, 1000);
      TweenAnimation.playHorizontalMoveTweenAnimation(this.scene, this.gameObject, this.gameObject.x + this.step, 1000);
    }

  }

  isEnableMove() {
    // return Math.abs(this.gameObject.x - this.step - this.gameObjectOriginPosition.x) <= this.allowableMovingDistance
    return Math.abs(this.gameObject.x + this.step - this.gameObjectOriginPosition.x) <= this.allowableMovingDistance;
  }

}