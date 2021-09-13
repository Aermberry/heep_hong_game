import BasicBtn from './BasicBtn';

export default class LeftMoveBtn extends BasicBtn {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.create(scene.add.sprite(0, 0, 'moveBtn', 0).setScale(0.5),
     this.onClick.bind(this))

  }

  onClick() {
    window.history.back();
  }
}