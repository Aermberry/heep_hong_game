import BasicBtn  from './BasicBtn';

export default class ExitBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children);

    let sprite =  scene.add.sprite(0, 0, 'extSmBtn')
    this.create(sprite,this.onClick.bind(this))

    this.isPause = false

  }

  onClick(){

  if(this.isPause) {
      this.scene.scene.resume('Game')
  }else {
      this.scene.scene.pause()
  }

  this.isPause = !this.isPause

    // window.history.back();
  }
}