import BasicBtn  from './BasicBtn';

export default class ExitBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children);
    let sprite =  scene.add.sprite(0, 0, 'doneBtn')
    this.create(sprite,this.onClick.bind(this))

  }

  onClick() {
    this.scene.answers.onDoneBtnClicked();
  }

}