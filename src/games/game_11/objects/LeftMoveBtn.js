import BasicBtn  from './BasicBtn';

export default class LeftMoveBtn extends BasicBtn {
  constructor(scene,x,y,children){
    super(scene, x, y,children);

    let sprite =  scene.add.sprite(0, 0, 'moveBtn',0)
    this.create(sprite,this.onClick.bind(this))

  }

  onClick(){
    window.history.back();
  }
}