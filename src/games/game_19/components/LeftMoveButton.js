import Phaser from 'phaser'
import {
  ButtonStatus
} from './ButtonStatues';
import TweenAnimation from './TweenAnimation';

export default class LeftMoveButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, gameObject, step) {

    super(scene, x, y);

    scene.add.existing(this);

    this.scene = scene;
    this.gameObject = gameObject;
    this.allowableMovingDistance = step + 1250;
    this.gameObjectOriginPosition = {
      "x": gameObject.x,
      "y": gameObject.y
    }
    this.step = step

    // this.texture = scene.add.sprite(0, 0, 'moveBtn', 0).setScale(0.5);
    this.texture = scene.add.sprite(0, 0, 'leftButton', 1).setScale(0.5);

    this.setSize(this.texture.displayWidth, this.texture.displayHeight);
    this.add(this.texture);

    this.enableTouchEventListener();

    this.buttonStatues = ButtonStatus.up;

    this.buttonEffectSound = this.scene.sound.add('buttonEffectSound');

    // this.buttonEffectSound.on('complete', () => {
    //   this.buttonStatues = ButtonStatus.up;
    // })
  }

  enableTouchEventListener() {
    this.setInteractive({
        useHandCursor: true
      }).on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

          this.onDownClicked();
        }
      )
      .on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {

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


    this.texture.setFrame(0);

    this.moveToLeft();

    if (this.buttonStatues == ButtonStatus.up) {
      this.buttonEffectSound.play();
      this.buttonStatues = ButtonStatus.down
    }

  }

  onUpClicked() {
    this.texture.setFrame(1);
    this.buttonStatues = ButtonStatus.up;
  }

  /**
   * 往左移动
   */
  moveToLeft() {
    if (this.isEnableMove()) {
      TweenAnimation.playHorizontalMoveTweenAnimation(this.scene, this.gameObject, this.gameObject.x + this.step, 1000);
    }

  }

  isEnableMove() {
    return Math.abs(this.gameObject.x + this.step - this.gameObjectOriginPosition.x) <= this.allowableMovingDistance;
  }

}