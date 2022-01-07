import BasicBtn  from './BasicBtn';

export default class ExitBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children);
    let sprite =  scene.add.sprite(0, 0, 'doneBtn')
    this.create(sprite,this.onClick.bind(this))

  }

  onClick() {
    let run = this.scene.sound.add('pressBtn');
    run.play();
    this.scene.answers.onDoneBtnClicked();
  }

}