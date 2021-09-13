import BasicBtn from './BasicBtn';

export default class RightMoveBtn extends BasicBtn {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.create(scene.add.sprite(0, 0, 'moveBtn', 1).setScale(0.5),
    this.onClick.bind(this))

  }

  onClick() {
    window.history.back();
  }


}