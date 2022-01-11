import BasicBtn from './BasicBtn';

export default class ExitBtn extends BasicBtn {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    this.scene = scene;
    let sprite = scene.add.sprite(0, 0, 'nextBtn').setScale(0.5);
    this.create(sprite, this.onClick.bind(this))
    scene.add.existing(this);

  }

  onClick() {
    if (this.scene.currentLevel == 5) {
      this.scene.scene.start('End')
    } else {
      this.scene.scene.start('Game', {
        level: this.scene.currentLevel + 1,
        pastProblems: this.scene.pastProblems
      })
    }
  }

}